// Lit Notion au moment de la construction et prépare les données du site.
//
// Sur Cloudflare (NOTION_TOKEN défini) : interroge les bases « Produits de la ferme » et « Planning »,
// réécrit data/produits.json, data/planning.json, data/meta.json et télécharge les photos.
// En local, sans jeton : garde l'instantané de data/ tel quel.
// Dans les deux cas, les photos de data/img-src/ sont converties en WebP (400 et 800 px) dans public/produits-img/.
//
// Si Notion ne répond pas, la construction échoue : Cloudflare garde alors la version en ligne précédente.

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

async function notionQuery(nomBase, dataSourceId, body) {
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
    if (!res.ok) {
      const detail = await res.text();
      const aide =
        res.status === 404
          ? `\n→ L'intégration Notion « Site Au Grand Jardin » n'a pas accès à la base « ${nomBase} » : ouvrir la base dans Notion → ••• → Connexions → ajouter « Site Au Grand Jardin ».`
          : res.status === 401
            ? '\n→ NOTION_TOKEN refusé : vérifier le secret dans Cloudflare (projet agj-site-2026 → Settings → Variables and Secrets).'
            : '';
      throw new Error(`Notion ${res.status} sur « ${nomBase} » : ${detail}${aide}`);
    }
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
    await notionQuery('Produits de la ferme', PRODUITS_DS, {
      filter: { property: 'En vente', checkbox: { equals: true } },
      sorts: [{ property: 'Nom', direction: 'ascending' }],
    })
  ).map(mapProduit);
  const planning = (await notionQuery('Planning semaine', PLANNING_DS, {})).map(mapPlanning);

  // Les liens de fichiers Notion expirent au bout d'une heure : on télécharge maintenant.
  await fs.rm(IMG_SRC, { recursive: true, force: true });
  await fs.mkdir(IMG_SRC, { recursive: true });
  let photos = 0;
  for (const prod of produits) {
    if (prod.imageUrl) {
      const res = await fetch(prod.imageUrl);
      if (res.ok) {
        await fs.writeFile(path.join(IMG_SRC, `${prod.id}.img`), Buffer.from(await res.arrayBuffer()));
        photos++;
      } else console.warn(`  photo de « ${prod.nom} » illisible (${res.status})`);
    }
    delete prod.imageUrl; // le lien serait mort de toute façon
  }

  await fs.writeFile(path.join(DATA, 'produits.json'), JSON.stringify(produits, null, 2));
  await fs.writeFile(path.join(DATA, 'planning.json'), JSON.stringify(planning, null, 2));
  await fs.writeFile(path.join(DATA, 'meta.json'), JSON.stringify({ syncedAt: new Date().toISOString(), source: 'Notion' }, null, 2));
  console.log(`✓ ${produits.length} produits en vente (${photos} photos), ${planning.length} créneaux`);
}

async function buildImages() {
  await fs.rm(IMG_OUT, { recursive: true, force: true });
  await fs.mkdir(IMG_OUT, { recursive: true });
  const files = (await fs.readdir(IMG_SRC).catch(() => [])).filter((f) => !f.startsWith('.'));
  let ok = 0;
  for (const f of files) {
    const id = f.replace(/\.\w+$/, '');
    try {
      const src = sharp(path.join(IMG_SRC, f)).rotate();
      for (const w of [400, 800]) {
        await src.clone().resize(w, w, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(IMG_OUT, `${id}-${w}.webp`));
      }
      ok++;
    } catch (e) {
      console.warn(`  photo ${f} ignorée : ${e.message}`);
    }
  }
  console.log(`✓ ${ok} photos produits optimisées`);
}

if (process.env.NOTION_TOKEN) await syncLive();
else console.log('→ Pas de NOTION_TOKEN : on garde l’instantané de data/');
await buildImages();
