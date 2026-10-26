// Conseils et saisons des légumes (lot 3) : fonctions pures, testées par tests/saisons.test.js.
//
// Dans Notion (« Produits de la ferme »), plusieurs lignes peuvent décrire le même légume
// (vrac, botte, 500 g…) : le champ « Légume » les regroupe. Une fiche de légume réunit :
// - les mois de récolte de toutes ses lignes (« Mois de récolte ») ;
// - ses conseils (« Cuisson », « Conservation », « Avis de Pierre ») : il suffit de les remplir sur
//   une ligne ; si plusieurs lignes en ont, celle qui est en vente l'emporte, puis l'ordre alphabétique.
import { slug } from './vente.js';

export const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export const MOIS_COURT = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
const MOIS_MIN = MOIS.map((m) => m.toLowerCase());

// Groupes du calendrier, dans l'ordre de la page, d'après la « Catégorie » Notion
const GROUPES = { 'Légumes': 'Légumes', 'Plantes aromatiques': 'Aromates', 'Fruits': 'Fruits' };
export const ORDRE_GROUPES = ['Légumes', 'Aromates', 'Fruits'];
// Seuls les produits de la ferme vont dans le calendrier (pas ceux des partenaires)
export const PRODUCTEUR = 'Au Grand Jardin';

const comparer = (a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' });
const texteOuVide = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

// Index de mois (0 = janvier) depuis les noms Notion, sans doublon, triés
export function indicesMois(noms) {
  const set = new Set((noms ?? []).map((n) => MOIS_MIN.indexOf(String(n).toLowerCase())).filter((i) => i >= 0));
  return [...set].sort((a, b) => a - b);
}

// Lignes Notion → fiches par légume (Map nom du légume → fiche)
export function fichesLegumes(lignes) {
  const fiches = new Map();
  const triees = [...(lignes ?? [])].filter((l) => l && l.legume).sort((a, b) => Number(!!b.enVente) - Number(!!a.enVente) || comparer(a.nom ?? '', b.nom ?? ''));
  for (const l of triees) {
    if (!fiches.has(l.legume)) {
      fiches.set(l.legume, {
        nom: l.legume,
        ancre: slug(l.legume),
        groupe: null,
        deLaFerme: false,
        mois: new Set(),
        cuisson: '',
        conservation: '',
        avisPierre: '',
        enVente: false,
        produitsEnVente: [],
      });
    }
    const f = fiches.get(l.legume);
    for (const i of indicesMois(l.mois)) f.mois.add(i);
    if (!f.groupe && GROUPES[l.categorie]) f.groupe = GROUPES[l.categorie];
    if (l.producteur === PRODUCTEUR) f.deLaFerme = true;
    for (const champ of ['cuisson', 'conservation', 'avisPierre']) if (!f[champ]) f[champ] = texteOuVide(l[champ]);
    if (l.enVente) { f.enVente = true; f.produitsEnVente.push(l.id); }
  }
  for (const f of fiches.values()) f.mois = [...f.mois].sort((a, b) => a - b);
  return fiches;
}

// Le calendrier : les légumes de la ferme qui ont au moins un mois, par groupe, dans l'ordre alphabétique
export function calendrier(fiches) {
  const groupes = new Map(ORDRE_GROUPES.map((g) => [g, []]));
  for (const f of fiches.values()) {
    if (!f.deLaFerme || !f.mois.length || !groupes.has(f.groupe ?? 'Légumes')) continue;
    groupes.get(f.groupe ?? 'Légumes').push(f);
  }
  return [...groupes.entries()]
    .filter(([, legumes]) => legumes.length)
    .map(([titre, legumes]) => ({ titre, ancre: slug(titre), legumes: legumes.sort((a, b) => comparer(a.nom, b.nom)) }));
}

// Mois de saison, pour le mois `m` (0 à 11) : de saison, arrive le mois suivant, dernières semaines
export function resumeMois(legumes, m) {
  const suivant = (m + 1) % 12;
  const de = (f, i) => f.mois.includes(i);
  return {
    mois: MOIS_MIN[m],
    moisSuivant: MOIS_MIN[suivant],
    deSaison: legumes.filter((f) => de(f, m)).map((f) => f.nom),
    arrive: legumes.filter((f) => !de(f, m) && de(f, suivant)).map((f) => f.nom),
    termine: legumes.filter((f) => de(f, m) && !de(f, suivant)).map((f) => f.nom),
  };
}

// « de juin à mars », « en mai », « en mai et juin », « toute l'année »,
// ou plusieurs périodes : « de mai à juin et de septembre à octobre »
export function plageMois(indices) {
  const m = [...new Set(indices ?? [])].filter((i) => i >= 0 && i < 12).sort((a, b) => a - b);
  if (!m.length) return '';
  if (m.length === 12) return 'toute l’année';
  // Périodes de mois qui se suivent, en passant de décembre à janvier
  const dans = new Set(m);
  const debuts = m.filter((i) => !dans.has((i + 11) % 12));
  const periodes = debuts.map((d) => {
    let f = d;
    while (dans.has((f + 1) % 12) && (f + 1) % 12 !== d) f = (f + 1) % 12;
    return [d, f];
  });
  const dire = ([d, f]) => (d === f ? `en ${MOIS_MIN[d]}` : (f === (d + 1) % 12 ? `en ${MOIS_MIN[d]} et ${MOIS_MIN[f]}` : `de ${MOIS_MIN[d]} à ${MOIS_MIN[f]}`));
  const textes = periodes.map(dire);
  return textes.length === 1 ? textes[0] : `${textes.slice(0, -1).join(', ')} et ${textes.at(-1)}`;
}

// Où en est le légume ce mois-ci (pour le panneau)
export function etatSaison(f, m) {
  if (!f?.mois?.length) return null;
  const suivant = (m + 1) % 12;
  if (f.mois.includes(m) && !f.mois.includes(suivant) && f.mois.length < 12) return 'Dernières semaines';
  if (f.mois.includes(m)) return 'De saison';
  if (f.mois.includes(suivant)) return `Arrive en ${MOIS_MIN[suivant]}`;
  return null;
}

// Liste lisible : « Ail, betterave, carotte et 12 autres »
export function listeNoms(noms, max = 10) {
  const l = noms.map((n, i) => (i ? n.charAt(0).toLowerCase() + n.slice(1) : n));
  if (!l.length) return '';
  if (l.length > max) return `${l.slice(0, max).join(', ')} et ${l.length - max} autres`;
  return l.length === 1 ? l[0] : `${l.slice(0, -1).join(', ')} et ${l.at(-1)}`;
}

// Ancre d'un produit dans la page Produits (#carotte-vrac), sans collision avec les rayons ni entre produits
export function ancresProduits(produits, interdites = []) {
  const reservees = new Set(interdites);
  const prises = new Set(interdites);
  const ancres = new Map();
  for (const p of produits) {
    let a = slug(p.nom) || `produit-${p.id}`;
    if (reservees.has(a)) a = `produit-${a}`;
    let n = 2;
    const base = a;
    while (prises.has(a)) a = `${base}-${n++}`;
    prises.add(a);
    ancres.set(p.id, a);
  }
  return ancres;
}
