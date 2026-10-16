// Lit Notion au moment du build et prépare les données du site.
//
// Mode « live » (sur Cloudflare) : NOTION_TOKEN est défini → on interroge l'API Notion,
// on réécrit data/produits.json, data/planning.json, data/meta.json et on télécharge les photos.
// Mode « instantané » (en local, sans jeton) : on garde les fichiers data/ tels quels.
// Dans les deux cas, les photos de data/img-src/ sont converties en WebP légers dans public/.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DATA = path.join(ROOT, 'data');
const IMG_SRC = path.join(DATA, 'img-src');
const IMG_OUT = path.join(ROOT, 'public', 'produits-img');

const NOTION_VERSION = '2025-09-03';
const PRODUITS_DS = process.env.NOTION_PRODUITS_DS || '5fb0d75e-67d6-4840-a703-2c6e0b3eaa11';
const PLANNING_DS = process.env.NOTION_PLANNING_DS || '152a41f4-8718-45e1-9025-40f3da0572e3';

async function notionQuery(dataSourceId, body) {
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
    if (!res.ok) throw new Error(`Notion ${res.status} : ${await res.text()}`);
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
    imageUrl: fileUrl(p(page, 'Image principale')),
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

async function syncLive() {
  console.log('→ Lecture de Notion…');
  const produits = (
    await notionQuery(PRODUITS_DS, {
      filter: { property: 'En vente', checkbox: { equals: true } },
      sorts: [{ property: 'Nom', direction: 'ascending' }],
    })
  ).map(mapProduit);
  const planning = (await notionQuery(PLANNING_DS, {})).map(mapPlanning);

  // Les liens de fichiers Notion expirent au bout d'une heure : on télécharge maintenant.
  await fs.mkdir(IMG_SRC, { recursive: true });
  for (const prod of produits) {
    if (!prod.imageUrl || prod.ref == null) continue;
    const res = await fetch(prod.imageUrl);
    if (res.ok) await fs.writeFile(path.join(IMG_SRC, `${prod.ref}.jpg`), Buffer.from(await res.arrayBuffer()));
    prod.imageUrl = null; // inutile après téléchargement, et le lien serait mort de toute façon
  }

  await fs.writeFile(path.join(DATA, 'produits.json'), JSON.stringify(produits, null, 2));
  await fs.writeFile(path.join(DATA, 'planning.json'), JSON.stringify(planning, null, 2));
  await fs.writeFile(
    path.join(DATA, 'meta.json'),
    JSON.stringify({ syncedAt: new Date().toISOString(), source: 'Notion (live)' }, null, 2),
  );
  console.log(`✓ ${produits.length} produits en vente, ${planning.length} créneaux`);
}

async function buildImages() {
  await fs.mkdir(IMG_OUT, { recursive: true });
  const files = (await fs.readdir(IMG_SRC).catch(() => [])).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  for (const f of files) {
    const out = path.join(IMG_OUT, f.replace(/\.\w+$/, '.webp'));
    await sharp(path.join(IMG_SRC, f)).rotate().resize(560, 560, { fit: 'cover' }).webp({ quality: 72 }).toFile(out);
  }
  console.log(`✓ ${files.length} photos optimisées`);
}

if (process.env.NOTION_TOKEN) await syncLive();
else console.log('→ Pas de NOTION_TOKEN : on utilise l’instantané de data/');
await buildImages();
