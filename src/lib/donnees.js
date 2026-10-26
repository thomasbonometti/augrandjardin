// Données du site, lues à la construction dans data/ (écrit par scripts/sync-notion.mjs et scripts/fetch-agj.mjs).
import fs from 'node:fs';
import path from 'node:path';
import produitsBruts from '../../data/produits.json';
import planningBrut from '../../data/planning.json';
import meta from '../../data/meta.json';
import agjCatalogue from '../../data/agj-catalogue.json';
import agjConfig from '../../data/agj-config.json';
import reglages from '../../data/reglages.json';
import faqBrute from '../../data/faq.json';
import lignesLegumes from '../../data/legumes.json';
import {
  nettoyerNom, prixProduit, estNouveau, grouperRayons, vedettes as choisirVedettes,
  lireCreneaux, prochaineVente as calculerProchaineVente, dateHeure, partiesParis,
} from './vente.js';
import { lireFermeture, lireAnnonce, questionsPour } from './reglages.js';
import { fichesLegumes, calendrier as grouperCalendrier, ancresProduits } from './saisons.js';

export { meta, agjCatalogue, agjConfig, reglages };

const syncDate = new Date(meta.syncedAt);
// Date de construction : sert à calculer la prochaine vente
export const construitLe = new Date();
// Mois de la construction à Paris (0 = janvier) : mois en cours du calendrier de saison et des panneaux
export const moisCourant = partiesParis(construitLe).mois - 1;

const creneauxPlanning = lireCreneaux(planningBrut);
// Mode fermé (« Réglages du site » dans Notion) : null quand le site est ouvert.
// Fermé : pas de prochaine vente, aucun lieu « cette semaine », commandes en ligne fermées.
// La semaine de la reprise (prochaine vente du Planning le jour de la reprise ou après), le site rouvre.
export const fermeture = lireFermeture(reglages, construitLe, { venteIso: calculerProchaineVente(creneauxPlanning, construitLe)?.iso });
// Message de la semaine, sous la barre verte (null s'il n'est pas affiché)
export const annonce = lireAnnonce(reglages);
// Questions fréquentes publiées, pour une page (« Produits », « Pommes de terre »…)
export const faqPour = (page) => questionsPour(faqBrute, page);

const dossierImages = path.resolve('public/produits-img');
const image = (id) => (fs.existsSync(path.join(dossierImages, `${id}-800.webp`))
  ? { petit: `/produits-img/${id}-400.webp`, grand: `/produits-img/${id}-800.webp` }
  : null);

export const produits = produitsBruts
  .map((p) => {
    const nom = nettoyerNom(p.nom);
    return { ...p, nom, prix: prixProduit(p), estNouveau: estNouveau(p, syncDate), image: image(p.id), initiale: nom.charAt(0).toUpperCase() };
  })
  .filter((p) => p.nom);

// Lot 3 : fiche du légume (mois, conseils) et ancre du panneau produit (#carotte-vrac)
export const fiches = fichesLegumes(lignesLegumes);
const ancres = ancresProduits(produits, grouperRayons(produits).map((r) => r.slug));
for (const p of produits) {
  p.ancre = ancres.get(p.id);
  p.fiche = (p.legume && fiches.get(p.legume)) || null;
}
// Calendrier de saison : les légumes de la ferme qui ont des mois de récolte, par groupe.
// Le lien « En vente » mène au panneau du premier produit en vente du légume.
export const calendrier = grouperCalendrier(fiches).map((g) => ({
  ...g,
  legumes: g.legumes.map((f) => {
    const p = fermeture ? null : produits.find((x) => x.legume === f.nom);
    return { ...f, lien: p ? `/produits/#${p.ancre}` : null };
  }),
}));

export const rayons = grouperRayons(produits);
export const vedettes = choisirVedettes(produits);
export const nbQuantiteLimitee = produits.filter((p) => p.quantiteLimitee).length;

export const creneaux = creneauxPlanning.map((c) => (fermeture ? { ...c, cetteSemaine: false } : c));
export const prochaineVente = fermeture ? null : calculerProchaineVente(creneaux, construitLe);

// « vendredi 16 octobre à 16h24 »
const mj = dateHeure(meta.syncedAt);
export const misAJour = { ...mj, texte: `${mj.jour} à ${mj.heure}`, virgule: `${mj.jour}, ${mj.heure}` };
