// Données structurées (schema.org) pour le référencement local.
import { ferme } from '../data/ferme.js';
import { heureIso } from './vente.js';

// Même adresse que `site` d'astro.config.mjs (www.augrandjardin.fr, ou la variable SITE_URL).
const SITE = String(import.meta.env?.SITE || 'https://www.augrandjardin.fr').replace(/\/+$/, '');

export function schemaFerme(creneaux = []) {
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
    description: 'Ferme maraîchère bio à Lostroff (Moselle), certifiée par Ecocert : légumes de saison, vente à la ferme le samedi, pommes de terre en ligne, livraison des professionnels.',
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
    sameAs: [ferme.facebook],
    ...(horaires.length ? { openingHoursSpecification: horaires } : {}),
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
