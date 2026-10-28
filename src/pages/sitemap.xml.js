// Plan du site pour les moteurs de recherche (l'espace pro en est exclu, et la page Pommes de terre hors
// de la période de commande)
import { meta, commandesPdtOuvertes } from '../lib/donnees.js';

const PAGES = [
  { url: '/', freq: 'weekly', priorite: '1.0' },
  { url: '/produits/', freq: 'weekly', priorite: '0.9' },
  { url: '/pommes-de-terre/', freq: 'weekly', priorite: '0.9' },
  { url: '/horaires-contact/', freq: 'weekly', priorite: '0.8' },
  { url: '/la-ferme/', freq: 'monthly', priorite: '0.7' },
  { url: '/calendrier-de-saison/', freq: 'monthly', priorite: '0.6' },
  { url: '/professionnels/', freq: 'monthly', priorite: '0.6' },
  { url: '/mentions-legales/', freq: 'yearly', priorite: '0.2' },
];

export function GET({ site }) {
  const date = meta.syncedAt.slice(0, 10);
  const corps = PAGES.filter((p) => p.url !== '/pommes-de-terre/' || commandesPdtOuvertes).map((p) => `  <url><loc>${new URL(p.url, site).href}</loc><lastmod>${date}</lastmod><changefreq>${p.freq}</changefreq><priority>${p.priorite}</priority></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${corps}\n</urlset>\n`, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
