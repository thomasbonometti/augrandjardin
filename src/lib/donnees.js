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
import {
  nettoyerNom, prixProduit, estNouveau, grouperRayons, vedettes as choisirVedettes,
  lireCreneaux, prochaineVente as calculerProchaineVente, dateHeure,
} from './vente.js';
import { lireFermeture, lireAnnonce, questionsPour } from './reglages.js';

export { meta, agjCatalogue, agjConfig, reglages };

const syncDate = new Date(meta.syncedAt);
// Date de construction : sert à calculer la prochaine vente
export const construitLe = new Date();

// Mode fermé (« Réglages du site » dans Notion) : null quand le site est ouvert.
// Fermé : pas de prochaine vente, aucun lieu « cette semaine », commandes en ligne fermées.
export const fermeture = lireFermeture(reglages, construitLe);
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

export const rayons = grouperRayons(produits);
export const vedettes = choisirVedettes(produits);
export const nbQuantiteLimitee = produits.filter((p) => p.quantiteLimitee).length;

export const creneaux = lireCreneaux(planningBrut).map((c) => (fermeture ? { ...c, cetteSemaine: false } : c));
export const prochaineVente = fermeture ? null : calculerProchaineVente(creneaux, construitLe);

// « vendredi 16 octobre à 16h24 »
const mj = dateHeure(meta.syncedAt);
export const misAJour = { ...mj, texte: `${mj.jour} à ${mj.heure}`, virgule: `${mj.jour}, ${mj.heure}` };
