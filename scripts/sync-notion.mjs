// Lit Notion au moment de la construction et prépare les données du site.
//
// Sur Cloudflare (NOTION_TOKEN défini) : interroge les bases « Produits de la ferme », « Planning »,
// « Réglages du site » et « Questions fréquentes », réécrit data/produits.json, data/legumes.json,
// data/planning.json, data/reglages.json, data/faq.json, data/meta.json et télécharge les photos.
// data/legumes.json : toutes les lignes qui ont un « Légume » (en vente ou non), pour les conseils
// et le calendrier de saison (src/lib/saisons.js). Sur le site en ligne,
// garde aussi une copie de la liste dans « Historique des listes » quand elle a changé.
// En local, sans jeton : garde l'instantané de data/ tel quel.
// Dans les deux cas, les photos de data/img-src/ sont converties en WebP (400 et 800 px) dans public/produits-img/.
//
// Si Notion ne répond pas, la construction échoue : Cloudflare garde alors la version en ligne précédente.
// Exceptions : les questions fréquentes (on garde la copie précédente) et l'historique (simple avertissement).

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { lireCreneaux, prochaineVente } from '../src/lib/vente.js';
import { lireFermeture } from '../src/lib/reglages.js';
import { contenuListe, morceauxTexte } from '../src/lib/historique.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DATA = path.join(ROOT, 'data');
const IMG_SRC = path.join(DATA, 'img-src');
const IMG_OUT = path.join(ROOT, 'public', 'produits-img');

const NOTION_VERSION = '2025-09-03';
const PRODUITS_DS = process.env.NOTION_PRODUITS_DS || '5fb0d75e-67d6-4840-a703-2c6e0b3eaa11';
const PLANNING_DS = process.env.NOTION_PLANNING_DS || '152a41f4-8718-45e1-9025-40f3da0572e3';
// Bases de la page « Site augrandjardin.fr » (l'intégration y a accès par la page)
const REGLAGES_DS = process.env.NOTION_REGLAGES_DS || 'cc35fc8e-c976-44f0-b213-31eed14e3bee';
const FAQ_DS = process.env.NOTION_FAQ_DS || 'a8d7a11c-2204-4c8b-ab4e-23c749bd4452';
const HISTORIQUE_DS = process.env.NOTION_HISTORIQUE_DS || '5fced6cb-eabb-46cd-beb2-00ee278afd91';
// Branches publiées sur le vrai site (l'historique ne garde que leurs listes)
const BRANCHES_EN_LIGNE = ['site-2026', 'main'];

async function notionAppel(nomBase, chemin, body) {
  const res = await fetch(`https://api.notion.com/v1/${chemin}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion ${res.status} sur « ${nomBase} » : ${await res.text()}`);
  return res.json();
}

async function notionQuery(nomBase, dataSourceId, body) {
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }),
    });
    if (!res.ok) {
      const detail = await res.text();
      const aide =
        res.status === 404
          ? `\n→ L'intégration Notion « Site Au Grand Jardin » n'a pas accès à la base « ${nomBase} » : ouvrir la base dans Notion → ••• → Connexions → ajouter « Site Au Grand Jardin ».`
          : res.status === 401
            ? '\n→ NOTION_TOKEN refusé : vérifier le secret dans Cloudflare (projet agj-site-2026 → Settings → Variables and Secrets).'
            : '';
      throw new Error(`Notion ${res.status} sur « ${nomBase} » : ${detail}${aide}`);
    }
    const json = await res.json();
    rows.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return rows;
}

// Lecture tolérante des propriétés Notion
const p = (page, name) => page.properties?.[name];
const text = (prop) => (prop?.title ?? prop?.rich_text ?? []).map((t) => t.plain_text).join('').trim();
const num = (prop) => (typeof prop?.number === 'number' ? prop.number : null);
const sel = (prop) => prop?.select?.name ?? null;
const chk = (prop) => prop?.checkbox === true;
const date = (prop) => prop?.date?.start ?? null;
const multi = (prop) => (prop?.multi_select ?? []).map((o) => o.name);
const fileUrl = (prop) => {
  const f = prop?.files?.[0];
  return f ? (f.type === 'file' ? f.file.url : f.external?.url) ?? null : null;
};

function mapProduit(page) {
  return {
    id: page.id.replaceAll('-', ''),
    nom: text(p(page, 'Nom')),
    ref: num(p(page, 'Référence')),
    categorie: sel(p(page, 'Catégorie')),
    rayon: sel(p(page, 'categorie spéciale')),
    producteur: sel(p(page, 'Producteur')),
    venduA: sel(p(page, 'Vendu à')),
    prixUnitaire: num(p(page, 'Prix unitaire')),
    prixKg: num(p(page, 'Prix au kg')),
    poids: num(p(page, 'Poids')),
    prixPromo: num(p(page, 'Prix promo (TTC)')),
    promo: chk(p(page, 'Promo')),
    nouveau: chk(p(page, 'Nouveau')),
    dateNouveaute: date(p(page, 'Date nouveauté')),
    quantiteLimitee: chk(p(page, 'Quantité limitée')),
    derniereSemaine: chk(p(page, 'Dernière semaine')),
    produitAppel: chk(p(page, "Produit d'appel")),
    aLaUne: chk(p(page, 'À mettre en avant')),
    pasBio: chk(p(page, 'Pas bio')),
    description: text(p(page, 'Description')),
    legume: sel(p(page, 'Légume')),
    imageUrl: fileUrl(p(page, 'Image principale')),
  };
}

// Ligne vue par le calendrier et les conseils (lot 3) : une par format, regroupées par « Légume »
function mapLigneLegume(page) {
  return {
    id: page.id.replaceAll('-', ''),
    nom: text(p(page, 'Nom')),
    legume: sel(p(page, 'Légume')),
    categorie: sel(p(page, 'Catégorie')),
    producteur: sel(p(page, 'Producteur')),
    enVente: chk(p(page, 'En vente')),
    mois: multi(p(page, 'Mois de récolte')),
    cuisson: text(p(page, 'Cuisson')),
    conservation: text(p(page, 'Conservation')),
    avisPierre: text(p(page, 'Avis de Pierre')),
  };
}

function mapPlanning(page) {
  return {
    nom: text(p(page, 'Name')),
    jour: sel(p(page, 'Jour')),
    horaire: text(p(page, 'Horaire')),
    ou: sel(p(page, 'Où')),
    ville: sel(p(page, 'Ville')),
    aLaFerme: chk(p(page, 'A la ferme')),
    cetteSemaine: chk(p(page, 'Cette semaine')),
  };
}

// « Réglages du site » : une seule ligne (la plus ancienne si quelqu'un en a ajouté une).
function mapReglages(page) {
  return {
    ferme: chk(p(page, 'Fermé')),
    repriseLe: date(p(page, 'Reprise le')),
    messageFermeture: text(p(page, 'Message de fermeture')),
    afficherMessage: chk(p(page, 'Afficher le message')),
    message: text(p(page, 'Message de la semaine')),
  };
}

// Réponse en texte riche : on garde le gras, l'italique et les liens.
const segments = (prop) =>
  (prop?.rich_text ?? []).map((t) => ({
    texte: t.plain_text,
    ...(t.annotations?.bold ? { gras: true } : {}),
    ...(t.annotations?.italic ? { italique: true } : {}),
    ...(t.href ? { lien: t.href } : {}),
  }));

function mapQuestion(page) {
  return {
    id: page.id.replaceAll('-', ''),
    question: text(p(page, 'Question')),
    reponse: segments(p(page, 'Réponse')),
    pages: (p(page, 'Pages')?.multi_select ?? []).map((o) => o.name),
    ordre: num(p(page, 'Ordre')),
  };
}

// Historique des listes : une ligne par liste publiée, seulement si elle a changé depuis la dernière.
async function enregistrerHistorique(produits, planning, reglages) {
  const branche = process.env.CF_PAGES_BRANCH;
  if (process.env.CF_PAGES !== '1' || !BRANCHES_EN_LIGNE.includes(branche)) {
    console.log('→ Historique des listes : seulement sur le site en ligne (Cloudflare, branche de production)');
    return;
  }
  const maintenant = new Date();
  const vente = prochaineVente(lireCreneaux(planning), maintenant);
  if (lireFermeture(reglages, maintenant, { venteIso: vente?.iso })) return console.log('→ Historique des listes : site fermé, rien à garder');
  if (!produits.length) return console.log('→ Historique des listes : aucun produit en vente');
  const ligne = contenuListe(produits, { prochaineVente: vente, maintenant });
  const derniere = await notionAppel('Historique des listes', `data_sources/${HISTORIQUE_DS}/query`, {
    sorts: [{ property: 'Publiée le', direction: 'descending' }],
    page_size: 1,
  });
  // Comparaison sans tenir compte des espaces (Notion peut changer les espaces insécables)
  const normaliser = (s) => String(s).replace(/\s+/g, ' ').trim();
  if (normaliser(text(p(derniere.results[0] ?? {}, 'Produits'))) === normaliser(ligne.texte)) {
    return console.log('→ Historique des listes : liste inchangée depuis la dernière copie');
  }
  await notionAppel('Historique des listes', 'pages', {
    parent: { type: 'data_source_id', data_source_id: HISTORIQUE_DS },
    properties: {
      Liste: { title: morceauxTexte(ligne.titre) },
      'Publiée le': { date: { start: ligne.publieeLe } },
      Semaine: { rich_text: morceauxTexte(ligne.semaine) },
      'Prochaine vente': { rich_text: morceauxTexte(ligne.prochaineVente) },
      'Nombre de produits': { number: ligne.nombre },
      Produits: { rich_text: morceauxTexte(ligne.texte) },
      'Données (JSON)': { rich_text: morceauxTexte(ligne.json) },
    },
  });
  console.log(`✓ Historique des listes : copie de la liste (${ligne.nombre} produits, ${ligne.semaine})`);
}

async function syncLive() {
  console.log('→ Lecture de Notion…');
  const produits = (
    await notionQuery('Produits de la ferme', PRODUITS_DS, {
      filter: { property: 'En vente', checkbox: { equals: true } },
      sorts: [{ property: 'Nom', direction: 'ascending' }],
    })
  ).map(mapProduit);
  const legumes = (
    await notionQuery('Produits de la ferme', PRODUITS_DS, {
      filter: { property: 'Légume', select: { is_not_empty: true } },
      sorts: [{ property: 'Nom', direction: 'ascending' }],
    })
  ).map(mapLigneLegume);
  const planning = (await notionQuery('Planning semaine', PLANNING_DS, {})).map(mapPlanning);
  const lignesReglages = await notionQuery('Réglages du site', REGLAGES_DS, { sorts: [{ timestamp: 'created_time', direction: 'ascending' }] });
  const reglages = lignesReglages.length ? mapReglages(lignesReglages[0]) : { ferme: false, repriseLe: null, messageFermeture: '', afficherMessage: false, message: '' };
  let faq = null;
  try {
    faq = (
      await notionQuery('Questions fréquentes', FAQ_DS, {
        filter: { property: 'Publiée', checkbox: { equals: true } },
        sorts: [{ property: 'Ordre', direction: 'ascending' }, { property: 'Question', direction: 'ascending' }],
      })
    ).map(mapQuestion).filter((q) => q.question);
  } catch (e) {
    console.warn(`⚠ Questions fréquentes illisibles, on garde la copie précédente de data/faq.json : ${e.message}`);
  }

  // Les liens de fichiers Notion expirent au bout d'une heure : on télécharge maintenant.
  await fs.rm(IMG_SRC, { recursive: true, force: true });
  await fs.mkdir(IMG_SRC, { recursive: true });
  let photos = 0;
  for (const prod of produits) {
    if (prod.imageUrl) {
      const res = await fetch(prod.imageUrl);
      if (res.ok) {
        await fs.writeFile(path.join(IMG_SRC, `${prod.id}.img`), Buffer.from(await res.arrayBuffer()));
        photos++;
      } else console.warn(`  photo de « ${prod.nom} » illisible (${res.status})`);
    }
    delete prod.imageUrl; // le lien serait mort de toute façon
  }

  await fs.writeFile(path.join(DATA, 'produits.json'), JSON.stringify(produits, null, 2));
  await fs.writeFile(path.join(DATA, 'legumes.json'), JSON.stringify(legumes, null, 2));
  await fs.writeFile(path.join(DATA, 'planning.json'), JSON.stringify(planning, null, 2));
  await fs.writeFile(path.join(DATA, 'reglages.json'), JSON.stringify(reglages, null, 2));
  if (faq) await fs.writeFile(path.join(DATA, 'faq.json'), JSON.stringify(faq, null, 2));
  await fs.writeFile(path.join(DATA, 'meta.json'), JSON.stringify({ syncedAt: new Date().toISOString(), source: 'Notion' }, null, 2));
  const fermeture = lireFermeture(reglages, new Date(), { venteIso: prochaineVente(lireCreneaux(planning))?.iso });
  console.log(`✓ ${produits.length} produits en vente (${photos} photos), ${planning.length} créneaux, ${faq ? faq.length : 'copie des'} questions fréquentes`);
  const nbLegumes = new Set(legumes.filter((l) => l.mois.length).map((l) => l.legume)).size;
  const nbConseils = new Set(legumes.filter((l) => l.cuisson || l.conservation || l.avisPierre).map((l) => l.legume)).size;
  console.log(`✓ Calendrier de saison : ${nbLegumes} légumes avec des mois de récolte, ${nbConseils} avec des conseils (${legumes.length} lignes)`);
  console.log(fermeture ? `✓ Site en mode fermé (${fermeture.reprise ? `reprise le ${fermeture.reprise}` : 'sans date de reprise'})` : '✓ Site ouvert');
  if (reglages.afficherMessage && reglages.message) console.log(`✓ Message de la semaine : « ${reglages.message} »`);

  await enregistrerHistorique(produits, planning, reglages).catch((e) => console.warn(`⚠ Historique des listes non enregistré : ${e.message}`));
}

async function buildImages() {
  await fs.rm(IMG_OUT, { recursive: true, force: true });
  await fs.mkdir(IMG_OUT, { recursive: true });
  const files = (await fs.readdir(IMG_SRC).catch(() => [])).filter((f) => !f.startsWith('.'));
  let ok = 0;
  for (const f of files) {
    const id = f.replace(/\.\w+$/, '');
    try {
      const src = sharp(path.join(IMG_SRC, f)).rotate();
      for (const w of [400, 800]) {
        await src.clone().resize(w, w, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(IMG_OUT, `${id}-${w}.webp`));
      }
      ok++;
    } catch (e) {
      console.warn(`  photo ${f} ignorée : ${e.message}`);
    }
  }
  console.log(`✓ ${ok} photos produits optimisées`);
}

if (process.env.NOTION_TOKEN) await syncLive();
else console.log('→ Pas de NOTION_TOKEN : on garde l’instantané de data/');
await buildImages();
