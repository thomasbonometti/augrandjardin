// Copie de lib/agj/cart.js du dépôt thomasbonometti/brief (outil de commande), au 2026-11-01
// (pull request n° 15 : stock par variété en kilos, 60 kg au plus par commande).
// Sert de secours si /agj/lib/cart.js (relayé en direct depuis l'outil) ne répond pas.
// Le serveur recalcule toujours prix, totaux et avertissements : il fait foi.

// Catalogue and cart: pure functions shared by the order page (browser) and
// the server (which always recomputes; it never trusts the browser's totals).
// Money is handled in cents.

export const cents = euros => Math.round(Number(euros) * 100);

const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
export const euros = c => EUR.format((Number(c) || 0) / 100).replace(/ /g, ' ');
export const kg = n => `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n)} kg`;

// A product can be ordered when it is "En vente", has a price, and is not
// out of stock (an empty stock means "no limit"). When its variety keeps its
// stock in kilos (base « Pommes de terre — stocks », `varietyKg`, Pierre's way
// of counting: bags are filled on demand), there must be enough for one bag.
export function isAvailable(p) {
  return !!(p && p.enVente && p.name && p.priceCents > 0 && (p.stock == null || p.stock > 0)
    && (p.varietyKg == null || !(p.weightKg > 0) || p.varietyKg + 1e-9 >= p.weightKg));
}

// A variety = a category + a product (« Goldmarie » in bags and « Goldmarie »
// unsorted are two varieties), as for the low stock alert.
export const varietyKey = p => `${p?.category || 'Autres'}|${p?.product || p?.name || ''}`;

// Price per kilo, in cents (for "soit 1,20 €/kg"), or null without a weight.
export const perKgCents = p => (p?.weightKg > 0 && p.priceCents > 0 ? Math.round(p.priceCents / p.weightKg) : null);

// Raw products → { categories: [{ name, intro, products: [{ name, description, formats: [...] }] }] }
// `categories` (agj.config.json) gives the order of the categories and their
// intro text; a category missing from it comes after, in product order.
export function catalogView(products, categories = []) {
  const list = products.filter(isAvailable)
    .sort((a, b) => (a.ordre ?? 9999) - (b.ordre ?? 9999) || a.name.localeCompare(b.name, 'fr'));
  const cats = [];
  for (const p of list) {
    const catName = p.category || 'Autres';
    let cat = cats.find(c => c.name === catName);
    if (!cat) cats.push(cat = { name: catName, intro: categories.find(c => c.name === catName)?.intro || '', products: [] });
    const prodName = p.product || p.name;
    let prod = cat.products.find(x => x.name === prodName);
    if (!prod) cat.products.push(prod = { name: prodName, description: p.description || '', formats: [] });
    prod.formats.push(p);
  }
  const rank = name => { const i = categories.findIndex(c => c.name === name); return i < 0 ? categories.length : i; };
  return { categories: cats.sort((a, b) => rank(a.name) - rank(b.name)) };
}

// Notices shown in the recap and in the confirmation mail. A notice names a
// category (or several); with "weightOverKg" it shows above that weight,
// without it as soon as the basket holds that category.
export function noticesFor(rules, lines) {
  const weightBy = {};
  for (const l of lines) weightBy[l.category] = (weightBy[l.category] || 0) + (l.weightKg || 0);
  const total = lines.reduce((s, l) => s + (l.weightKg || 0), 0);
  return (rules?.notices || []).filter(n => {
    const cats = [].concat(n.category || []);
    if (n.weightOverKg > 0) return (cats.length ? cats.reduce((s, c) => s + (weightBy[c] || 0), 0) : total) > n.weightOverKg;
    return cats.length ? cats.some(c => c in weightBy) : lines.length > 0;
  }).map(n => n.text);
}

// Bags of this format that the variety's stock in kilos can still fill.
export const bagsLeft = p => (p?.varietyKg != null && p.weightKg > 0 ? Math.floor((p.varietyKg + 1e-9) / p.weightKg) : null);

export function maxFor(p, rules = {}) {
  const caps = [rules.maxQtyPerLine || 99];
  if (p.maximum > 0) caps.push(p.maximum);
  if (p.stock != null) caps.push(p.stock);
  if (bagsLeft(p) != null) caps.push(bagsLeft(p));
  return Math.max(0, Math.min(...caps));
}

function maxMessage(p, max) {
  if (p.stock != null && max === p.stock) return `${p.name} : plus que ${p.stock} disponible${p.stock > 1 ? 's' : ''}.`;
  if (bagsLeft(p) != null && max === bagsLeft(p)) return `${p.product || p.name} : plus que ${kg(p.varietyKg)} disponibles.`;
  return `${p.name} : ${max} maximum par commande.`;
}

// Weight counted by the limit per order (rules.maxWeight: { kg, categories, text }).
export function limitedWeight(rules, weightByCategory, weightKg) {
  const cats = [].concat(rules?.maxWeight?.categories || []);
  return cats.length ? cats.reduce((s, c) => s + (weightByCategory[c] || 0), 0) : weightKg;
}

// items: { [productId]: qty }  →  lines, totals, errors, notices
export function computeCart(products, items, rules = {}) {
  const byId = new Map(products.map(p => [p.id, p]));
  const lines = [];
  const errors = [];
  for (const [id, raw] of Object.entries(items || {})) {
    const qty = Number(raw);
    if (!qty) continue;
    const p = byId.get(id);
    if (!Number.isInteger(qty) || qty < 0) { errors.push({ id, code: 'quantite', message: 'Quantité invalide.' }); continue; }
    if (!isAvailable(p)) { errors.push({ id, code: 'indisponible', message: `${p?.name || 'Un produit'} n'est plus disponible.` }); continue; }
    const max = maxFor(p, rules);
    if (qty > max) {
      errors.push({ id, code: 'maximum', message: maxMessage(p, max) });
    }
    if (p.minimum > 0 && qty < p.minimum) errors.push({ id, code: 'minimum', message: `${p.name} : ${p.minimum} minimum.` });
    lines.push({
      id, name: p.name, product: p.product || p.name, format: p.format || '', category: p.category || 'Autres',
      qty, unitCents: p.priceCents, totalCents: p.priceCents * qty, weightKg: (p.weightKg || 0) * qty,
    });
  }
  lines.sort((a, b) => (byId.get(a.id).ordre ?? 9999) - (byId.get(b.id).ordre ?? 9999));
  const totalCents = lines.reduce((s, l) => s + l.totalCents, 0);
  const weightKg = lines.reduce((s, l) => s + l.weightKg, 0);
  const weightByCategory = {};
  for (const l of lines) weightByCategory[l.category] = (weightByCategory[l.category] || 0) + l.weightKg;
  // Several formats of one variety share its stock in kilos.
  const varieties = new Map();
  for (const l of lines) {
    const p = byId.get(l.id);
    if (bagsLeft(p) == null) continue;
    const v = varieties.get(varietyKey(p)) || { name: p.product || p.name, kg: p.varietyKg, taken: 0 };
    v.taken += l.weightKg;
    varieties.set(varietyKey(p), v);
  }
  for (const v of varieties.values()) {
    const message = `${v.name} : plus que ${kg(v.kg)} disponibles.`;
    if (v.taken > v.kg + 1e-9 && !errors.some(e => e.message === message)) errors.push({ code: 'stock', message });
  }
  // Limit per order (Pierre, 01/11/2026 : 60 kg of potatoes, all varieties together).
  const mw = rules.maxWeight;
  if (mw?.kg > 0 && lines.length) {
    const w = limitedWeight(rules, weightByCategory, weightKg);
    if (w > mw.kg + 1e-9) errors.push({ code: 'poidsMax', message: `${mw.text || `${kg(mw.kg)} maximum par commande.`} Votre commande en fait ${kg(w)}.` });
  }
  if (!lines.length) errors.push({ code: 'vide', message: 'Choisissez au moins un produit.' });
  if (rules.minTotal > 0 && lines.length && totalCents < cents(rules.minTotal)) {
    errors.push({ code: 'minTotal', message: `Commande minimum : ${euros(cents(rules.minTotal))}.` });
  }
  const notices = noticesFor(rules, lines);
  return { lines, totalCents, weightKg, weightByCategory, count: lines.reduce((s, l) => s + l.qty, 0), errors, notices };
}

export const recapLines = lines => lines.map(l => `${l.qty} × ${l.name} (${euros(l.unitCents)})  ${euros(l.totalCents)}`);

// Totals per product, to know how much to get ready (Pierre's page, printing).
export function totalsByProduct(orders) {
  const map = new Map();
  for (const o of orders) for (const l of o.lines || []) {
    const t = map.get(l.id) || { id: l.id, name: l.name, qty: 0, weightKg: 0, orders: 0 };
    t.qty += l.qty; t.weightKg += l.weightKg || 0; t.orders += 1;
    map.set(l.id, t);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
