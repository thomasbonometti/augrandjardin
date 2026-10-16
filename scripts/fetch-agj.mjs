// Lit le catalogue et les textes publics de l'outil de commande (Worker « formulaires »)
// pour que la page Pommes de terre soit déjà remplie dans le HTML (référencement, affichage sans JavaScript).
// Dans le navigateur, la page relit ensuite le catalogue en direct (stock, prix à jour).
// Si l'outil ne répond pas, on garde la copie précédente de data/ : la construction continue.

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DATA = path.join(ROOT, 'data');
const BASE = (process.env.AGJ_URL || 'https://formulaires.hey-d8b.workers.dev').replace(/\/$/, '');

async function lire(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} sur ${url}`);
  return res.json();
}

try {
  const [catalogue, config] = await Promise.all([lire(`${BASE}/api/agj/catalog`), lire(`${BASE}/agj/config.json`)]);
  const publicConfig = { version: config.version, farm: config.farm, texts: config.texts, categories: config.categories, fields: config.fields, rules: config.rules };
  await fs.writeFile(path.join(DATA, 'agj-catalogue.json'), JSON.stringify({ ...catalogue, luLe: new Date().toISOString() }, null, 2));
  await fs.writeFile(path.join(DATA, 'agj-config.json'), JSON.stringify(publicConfig, null, 2));
  console.log(`✓ Outil de commande : ${catalogue.products.length} produits, commandes ${catalogue.open ? 'ouvertes' : 'fermées'}`);
} catch (e) {
  console.warn(`⚠ Outil de commande injoignable (${e.message}) : on garde la copie précédente de data/`);
}
