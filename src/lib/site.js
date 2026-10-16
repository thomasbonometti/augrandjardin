import produitsBruts from '../../data/produits.json';
import planning from '../../data/planning.json';
import reglages from '../../data/reglages.json';
import meta from '../../data/meta.json';
import fs from 'node:fs';
import path from 'node:path';

export { planning, reglages, meta };

const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
export const fmtEuro = (n) => euro.format(n);

const syncDate = new Date(meta.syncedAt);
const JOURS_NOUVEAUTE = 10;

const imgDir = path.resolve('public/produits-img');
const hasImage = (ref) => ref != null && fs.existsSync(path.join(imgDir, `${ref}.webp`));

// Prix affiché, selon la façon dont le produit est vendu dans Notion
function prix(p) {
  if (p.venduA === '/kg' && p.prixKg != null) return { montant: p.prixKg, unite: 'le kg' };
  if (p.prixUnitaire != null) return { montant: p.prixUnitaire, unite: p.venduA ?? '' };
  if (p.prixKg != null && p.poids) return { montant: Math.round(p.prixKg * p.poids * 100) / 100, unite: p.venduA ?? '', auKg: p.prixKg };
  return null;
}

export const produits = produitsBruts.map((p) => {
  const d = p.dateNouveaute ? new Date(p.dateNouveaute) : null;
  const recent = d && (syncDate - d) / 86400000 <= JOURS_NOUVEAUTE && syncDate >= d;
  return {
    ...p,
    nom: p.nom.replace(/\s+/g, ' ').trim(),
    prix: prix(p),
    estNouveau: p.nouveau || Boolean(recent),
    image: hasImage(p.ref) ? `produits-img/${p.ref}.webp` : null,
  };
});

// Rayons dans l'ordre de la vente (celui du menu « categorie spéciale » dans Notion)
const ORDRE = ['🥕', '🥬', '🧑‍🌾', '🧅', '🍅', '🍃', '🍎', '🍓', '🧺', '🌱', '🍯'];
const nettoyer = (r) => (r ?? 'Divers').replace(/^\S+\s+/, '').replace('Nos légumes Bio disponibles cette semaine', 'Légumes');
export const rayons = Object.values(
  produits.reduce((acc, p) => {
    const key = p.rayon ?? '🧺 Divers';
    (acc[key] ??= { cle: key, titre: nettoyer(key), slug: nettoyer(key).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\W+/g, '-'), items: [] }).items.push(p);
    return acc;
  }, {}),
).sort((a, b) => ORDRE.findIndex((e) => a.cle.startsWith(e)) - ORDRE.findIndex((e) => b.cle.startsWith(e)));

export const misAJour = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
}).format(syncDate);

// Créneaux de vente cochés « Cette semaine » dans le Planning Notion
const JOURS = { Dimanche: 0, Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4, Vendredi: 5, Samedi: 6 };
const parseHeure = (s) => {
  const m = s.match(/(\d{1,2})h(\d{2})?/);
  return m ? Number(m[1]) * 60 + Number(m[2] ?? 0) : null;
};
export const creneaux = planning
  .filter((c) => c.cetteSemaine)
  .map((c) => {
    const [debut, fin] = (c.horaire.match(/\d{1,2}h\d{0,2}/g) ?? []).map(parseHeure);
    return { ...c, jourNum: JOURS[c.jour], debut, fin, lieu: c.aLaFerme ? `à la ferme, ${c.ville ?? 'Lostroff'}` : `${c.ou}${c.ville ? `, ${c.ville}` : ''}` };
  })
  .sort((a, b) => ((a.jourNum + 6) % 7) - ((b.jourNum + 6) % 7));

export const fmtHeure = (min) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, '0') : ''}`;
