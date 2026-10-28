// Données structurées (schema.org) pour le référencement local.
import { ferme } from '../data/ferme.js';
import { heureIso } from './vente.js';

// Même adresse que `site` d'astro.config.mjs (www.augrandjardin.fr, ou la variable SITE_URL).
const SITE = String(import.meta.env?.SITE || 'https://www.augrandjardin.fr').replace(/\/+$/, '');

// pommesDeTerre : commandes de pommes de terre ouvertes (Réglages du site).
export function schemaFerme(creneaux = [], { pommesDeTerre = false } = {}) {
  const horaires = creneaux
    .filter((c) => c.aLaFerme && c.cetteSemaine && c.debut != null && c.fin != null)
    .map((c) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${c.jourEn}`,
      opens: heureIso(c.debut),
      closes: heureIso(c.fin),
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#ferme`,
    name: ferme.nom,
    description: `Ferme maraîchère bio à Lostroff (Moselle), certifiée par Ecocert : légumes de saison, vente à la ferme le samedi, ${pommesDeTerre ? 'pommes de terre en ligne, ' : ''}livraison des professionnels.`,
    url: `${SITE}/`,
    image: `${SITE}/og.jpg`,
    telephone: ferme.telephoneIntl,
    email: ferme.email,
    founder: { '@type': 'Person', name: ferme.maraicher },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ferme.rue,
      postalCode: ferme.codePostal,
      addressLocality: ferme.ville,
      addressRegion: 'Grand Est',
      addressCountry: 'FR',
    },
    hasMap: ferme.itineraire,
    sameAs: [ferme.facebook],
    ...(horaires.length ? { openingHoursSpecification: horaires } : {}),
  };
}

// Nom du site affiché par Google au-dessus des résultats (« Au Grand Jardin » plutôt que l'adresse),
// seulement sur l'accueil, comme Google le demande.
export function schemaSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#site`,
    name: ferme.nom,
    alternateName: 'augrandjardin.fr',
    url: `${SITE}/`,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE}/#ferme` },
  };
}

export function fileAriane(elements) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ nom: 'Accueil', url: '/' }, ...elements].map((e, i) => ({
      '@type': 'ListItem', position: i + 1, name: e.nom, item: `${SITE}${e.url}`,
    })),
  };
}
