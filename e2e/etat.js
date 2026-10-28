// Fonctions qu'une case de « Réglages du site » ouvre ou ferme : quels tests lancer.
// - E2E_OUVERT=1 : construction tout ouverte (COMMANDE_PDT=ouverte INSCRIPTION_LISTE=ouverte, dist-ouvert).
// - Sinon : l'instantané data/reglages.json, celui de la construction testée (npm run build:local, ou la
//   dernière synchro Notion). E2E_PDT et E2E_INSCRIPTION (« ouverte » ou « fermee ») forcent un état,
//   pour un aperçu construit avec COMMANDE_PDT ou INSCRIPTION_LISTE.
// Pas un fichier de tests (il ne finit pas par .spec.js) : les tests l'importent.
import fs from 'node:fs';
import { lireCommandesPdt, lireInscriptionListe } from '../src/lib/reglages.js';

const reglages = JSON.parse(fs.readFileSync(new URL('../data/reglages.json', import.meta.url), 'utf8'));
const toutOuvert = process.env.E2E_OUVERT ? 'ouverte' : undefined;

// Commandes de pommes de terre ouvertes : la page /pommes-de-terre/ existe.
export const PDT = lireCommandesPdt(reglages, toutOuvert ?? process.env.E2E_PDT);
// Inscription à la liste de la semaine ouverte : le formulaire (WhatsApp ou SMS) remplace « demandez-la à Pierre ».
export const INSCRIPTION = lireInscriptionListe(reglages, toutOuvert ?? process.env.E2E_INSCRIPTION);
