#!/usr/bin/env node
/**
 * Kapam — configurateur : script de resynchronisation Notion → catalogue.json
 *
 * Lit les quatre bases Notion de la page « 🧭 Configurateur — Données de référence »,
 * les normalise, et écrit public/catalogue.json.
 *
 * Le token Notion est lu dans la variable d'environnement NOTION_TOKEN.
 * Il n'est JAMAIS écrit dans catalogue.json ni dans le prototype.
 *
 *   NOTION_TOKEN=ntn_xxx node notion-sync/sync.mjs
 *
 * Le script échoue bruyamment : si une propriété attendue manque dans une base,
 * il s'arrête et dit laquelle. Il ne devine rien.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SORTIE = resolve(RACINE, 'public/catalogue.json')

const NOTION_VERSION = '2022-06-28'
const API = 'https://api.notion.com/v1'

/** Les quatre bases. Surchargables par variables d'environnement. */
const BASES = {
  options: process.env.NOTION_DB_OPTIONS ?? 'd500c296202f4d839b713b111d42aaef',
  vehicules: process.env.NOTION_DB_VEHICULES ?? 'c3bc935f905945d3b2ab1c298ff00ccd',
  kits: process.env.NOTION_DB_KITS ?? 'b1ff36d6e86d41bda7332ef13eb9f45e',
  regles: process.env.NOTION_DB_REGLES ?? '6d38d6c60617456ea12949f707d68f6c',
}

/** Propriétés obligatoires, base par base. Une seule manquante = arrêt. */
const PROPRIETES_ATTENDUES = {
  options: [
    'Nom', 'Section', 'Ordre', 'Prix TTC', 'Sous-libellé', 'Variantes',
    'Kits compatibles', 'Longueurs compatibles', 'Plateformes requises', 'Finitions requises',
    'Statut', 'Prix source', 'Motif si non disponible',
    'Dépend de', 'Incompatible avec', 'Règles liées', 'Commentaire Willy', 'Visuel',
  ],
  vehicules: [
    'Modèle', 'Marque', 'Millésime', 'Longueurs disponibles',
    'Nomenclature affichée', 'Plateforme', 'Kits compatibles',
    'Statut', 'Commentaire Willy',
  ],
  kits: [
    'Nom', 'Type', 'Prix TTC', 'Sous-libellé', "Nombre d'options",
    'Véhicules compatibles', 'Statut', 'Prix source', 'Commentaire Willy',
  ],
  regles: [
    'Règle', 'Type', 'Condition', 'Effet', 'Source', 'Statut', 'Commentaire Willy',
  ],
}

class ErreurSync extends Error {}

function exigerToken() {
  const token = process.env.NOTION_TOKEN
  if (!token) {
    throw new ErreurSync(
      "NOTION_TOKEN n'est pas défini.\n" +
      "  export NOTION_TOKEN=ntn_…   puis relancez le script.\n" +
      "  Le token doit appartenir à une intégration interne Notion ayant accès\n" +
      "  à la page « 🧭 Configurateur — Données de référence »."
    )
  }
  return token
}

async function appelNotion(chemin, options = {}) {
  const reponse = await fetch(`${API}${chemin}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${exigerToken()}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  if (!reponse.ok) {
    const corps = await reponse.text()
    throw new ErreurSync(`Notion a répondu ${reponse.status} sur ${chemin}\n${corps}`)
  }
  return reponse.json()
}

/** Récupère toutes les lignes d'une base, en suivant la pagination. */
async function lireBase(idBase) {
  const lignes = []
  let curseur
  do {
    const page = await appelNotion(`/databases/${idBase}/query`, {
      method: 'POST',
      body: JSON.stringify({ page_size: 100, ...(curseur ? { start_cursor: curseur } : {}) }),
    })
    lignes.push(...page.results)
    curseur = page.has_more ? page.next_cursor : undefined
  } while (curseur)
  return lignes
}

function verifierSchema(nomBase, lignes) {
  if (lignes.length === 0) {
    throw new ErreurSync(`La base « ${nomBase} » est vide. Rien à synchroniser.`)
  }
  const presentes = new Set(Object.keys(lignes[0].properties))
  const manquantes = PROPRIETES_ATTENDUES[nomBase].filter((p) => !presentes.has(p))
  if (manquantes.length > 0) {
    throw new ErreurSync(
      `La base « ${nomBase} » n'a pas les propriétés attendues.\n` +
      `  Manquantes : ${manquantes.join(', ')}\n` +
      `  Présentes  : ${[...presentes].join(', ')}\n` +
      `  Le script ne devine pas : corrigez la base ou mettez à jour PROPRIETES_ATTENDUES.`
    )
  }
}

// ---------------------------------------------------------------- extracteurs

const sansTirets = (id) => id.replaceAll('-', '')

function texte(prop) {
  if (!prop) return ''
  const morceaux = prop.type === 'title' ? prop.title : prop.rich_text
  if (!Array.isArray(morceaux)) return ''
  return morceaux.map((m) => m.plain_text).join('').trim()
}

const nombre = (prop) => (prop && typeof prop.number === 'number' ? prop.number : null)
const selection = (prop) => (prop && prop.select ? prop.select.name : null)
const multi = (prop) => (prop && Array.isArray(prop.multi_select) ? prop.multi_select.map((o) => o.name) : [])
const relation = (prop) => (prop && Array.isArray(prop.relation) ? prop.relation.map((r) => sansTirets(r.id)) : [])
const fichiers = (prop) => {
  if (!prop || !Array.isArray(prop.files)) return []
  return prop.files.map((f) => f.type === 'external' ? f.external.url : f.file?.url).filter(Boolean)
}

// --------------------------------------------------------------- vocabulaire

/**
 * Le catalogue Kapam emploie six nomenclatures de longueur pour trois gabarits
 * physiques. On ramène tout à court / moyen / long pour que les règles de
 * compatibilité soient comparables d'une marque à l'autre.
 * La nomenclature d'origine reste affichée au client, telle quelle.
 */
const GABARITS = {
  'L1H1': 'court', 'L1': 'court', 'Court': 'court', 'S': 'court', 'Compact': 'court',
  'M': 'moyen', 'Standard': 'moyen',
  'L2H1': 'long', 'L2': 'long', 'L3': 'long', 'Long': 'long', 'L': 'long', 'XL': 'long',
  'Sans objet': 'sans-objet',
}

function gabarit(etiquette) {
  const g = GABARITS[etiquette]
  if (!g) {
    throw new ErreurSync(
      `Longueur inconnue : « ${etiquette} ».\n` +
      `  Ajoutez-la à la table GABARITS de sync.mjs avant de continuer.`
    )
  }
  return g
}

/** « Kit Travel » → « Travel ». Les options désignent les kits par ce code court. */
const codeKit = (nom) => nom.replace(/^Kit\s+/i, '').trim()

/** « Renault X82 » → « X82 ». Les options désignent les plateformes par ce code. */
function codePlateforme(plateforme) {
  if (!plateforme || plateforme === 'Non tracée') return null
  const mots = plateforme.split(/\s+/)
  return mots[mots.length - 1]
}

// --------------------------------------------------------------- conversions

function convertirKit(ligne) {
  const p = ligne.properties
  const nom = texte(p['Nom'])
  return {
    id: sansTirets(ligne.id),
    nom,
    code: codeKit(nom),
    type: selection(p['Type']),
    prix_ttc: nombre(p['Prix TTC']),
    sous_libelle: texte(p['Sous-libellé']),
    nombre_options: nombre(p["Nombre d'options"]),
    vehicules_compatibles: relation(p['Véhicules compatibles']),
    statut: selection(p['Statut']),
    prix_source: selection(p['Prix source']),
    commentaire: texte(p['Commentaire Willy']),
  }
}

function convertirVehicule(ligne, kitsParId) {
  const p = ligne.properties
  const longueurs = multi(p['Longueurs disponibles'])
  const plateforme = selection(p['Plateforme'])
  return {
    id: sansTirets(ligne.id),
    marque: selection(p['Marque']),
    modele: texte(p['Modèle']),
    millesime: texte(p['Millésime']),
    longueurs: longueurs.map((etiquette) => ({ etiquette, gabarit: gabarit(etiquette) })),
    nomenclature: texte(p['Nomenclature affichée']),
    plateforme,
    plateforme_code: codePlateforme(plateforme),
    kits: relation(p['Kits compatibles'])
      .map((id) => kitsParId.get(id)?.code)
      .filter(Boolean),
    statut: selection(p['Statut']),
    commentaire: texte(p['Commentaire Willy']),
  }
}

function convertirOption(ligne) {
  const p = ligne.properties
  return {
    id: sansTirets(ligne.id),
    nom: texte(p['Nom']),
    section: selection(p['Section']),
    ordre: nombre(p['Ordre']) ?? 999,
    prix_ttc: nombre(p['Prix TTC']),
    sous_libelle: texte(p['Sous-libellé']),
    variantes: texte(p['Variantes']),
    kits_compatibles: multi(p['Kits compatibles']),
    longueurs_compatibles: multi(p['Longueurs compatibles']).map(gabarit),
    plateformes_requises: multi(p['Plateformes requises']).filter((v) => v !== 'aucune'),
    finitions_requises: multi(p['Finitions requises']),
    statut: selection(p['Statut']),
    prix_source: selection(p['Prix source']),
    motif_si_non_disponible: texte(p['Motif si non disponible']),
    depend_de: relation(p['Dépend de']),
    incompatible_avec: relation(p['Incompatible avec']),
    regles: relation(p['Règles liées']),
    commentaire: texte(p['Commentaire Willy']),
    visuels: fichiers(p['Visuel']),
  }
}

function convertirRegle(ligne) {
  const p = ligne.properties
  return {
    id: sansTirets(ligne.id),
    regle: texte(p['Règle']),
    type: selection(p['Type']),
    condition: texte(p['Condition']),
    effet: texte(p['Effet']),
    source: texte(p['Source']),
    statut: selection(p['Statut']),
    commentaire: texte(p['Commentaire Willy']),
  }
}

// -------------------------------------------------------------------- courses

const parOrdre = (a, b) => (a.ordre - b.ordre) || a.nom.localeCompare(b.nom, 'fr')

async function main() {
  exigerToken()

  const [lignesKits, lignesVehicules, lignesOptions, lignesRegles] = await Promise.all([
    lireBase(BASES.kits),
    lireBase(BASES.vehicules),
    lireBase(BASES.options),
    lireBase(BASES.regles),
  ])

  verifierSchema('kits', lignesKits)
  verifierSchema('vehicules', lignesVehicules)
  verifierSchema('options', lignesOptions)
  verifierSchema('regles', lignesRegles)

  const tousKits = lignesKits.map(convertirKit)
  const kitsParId = new Map(tousKits.map((k) => [k.id, k]))

  const catalogue = {
    genere_le: new Date().toISOString(),
    genere_par: 'notion-sync/sync.mjs',
    bases: BASES,
    vehicules: lignesVehicules
      .map((l) => convertirVehicule(l, kitsParId))
      .sort((a, b) => a.marque.localeCompare(b.marque, 'fr') || a.modele.localeCompare(b.modele, 'fr')),
    kits: tousKits.filter((k) => k.type === 'Kit'),
    finitions: tousKits.filter((k) => k.type === 'Finition'),
    options: lignesOptions.map(convertirOption).sort(parOrdre),
    regles: lignesRegles.map(convertirRegle),
  }

  await mkdir(dirname(SORTIE), { recursive: true })
  await writeFile(SORTIE, JSON.stringify(catalogue, null, 2) + '\n', 'utf8')

  resume(catalogue)
}

function resume(c) {
  const aValider = (lignes) => lignes.filter((l) => l.statut === 'À valider Willy').length
  const sansVisuel = c.options.filter((o) => o.visuels.length === 0).length
  const prixNonTraces = [...c.kits, ...c.finitions, ...c.options]
    .filter((l) => l.prix_source === 'Non tracé').length

  const lignes = [
    '',
    'catalogue.json écrit — ' + SORTIE,
    '',
    `  Véhicules          ${String(c.vehicules.length).padStart(3)}   dont ${aValider(c.vehicules)} à valider Willy`,
    `  Kits               ${String(c.kits.length).padStart(3)}   dont ${aValider(c.kits)} à valider Willy`,
    `  Finitions          ${String(c.finitions.length).padStart(3)}   dont ${aValider(c.finitions)} à valider Willy`,
    `  Options            ${String(c.options.length).padStart(3)}   dont ${aValider(c.options)} à valider Willy`,
    `  Règles             ${String(c.regles.length).padStart(3)}   dont ${aValider(c.regles)} à valider Willy`,
    '',
    `  Lignes sans visuel ${String(sansVisuel).padStart(3)} / ${c.options.length}`,
    `  Prix non tracés    ${String(prixNonTraces).padStart(3)}   (n'existent que dans les maquettes)`,
    '',
  ]
  console.log(lignes.join('\n'))
}

main().catch((erreur) => {
  console.error('\n✖ Resynchronisation interrompue.\n')
  console.error(erreur instanceof ErreurSync ? erreur.message : erreur)
  console.error('')
  process.exitCode = 1
})
