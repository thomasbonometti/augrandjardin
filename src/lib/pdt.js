// Catalogue de l'outil de commande (API /api/agj/catalog) : regroupement et résumés pour la page Pommes de terre.
// Même règle d'affichage que l'outil (lib/agj/cart.js du dépôt brief) : en vente, avec un prix, pas épuisé.

export const estDisponible = (p) => !!(p && p.enVente && p.name && p.priceCents > 0 && (p.stock == null || p.stock > 0));
export const prixKgCentimes = (p) => (p?.weightKg > 0 && p.priceCents > 0 ? Math.round(p.priceCents / p.weightKg) : null);

const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
export const eurosCentimes = (c) => EUR.format((Number(c) || 0) / 100).replace(/\s/g, ' ');
const nombre = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);

// { categories: [{ name, intro, products: [{ name, description, formats: [...] }] }] }
export function grouperCatalogue(products = [], categories = []) {
  const liste = products.filter(estDisponible)
    .sort((a, b) => (a.ordre ?? 9999) - (b.ordre ?? 9999) || a.name.localeCompare(b.name, 'fr'));
  const cats = [];
  for (const p of liste) {
    const nomCat = p.category || 'Autres';
    let cat = cats.find((c) => c.name === nomCat);
    if (!cat) cats.push((cat = { name: nomCat, intro: categories.find((c) => c.name === nomCat)?.intro || '', products: [] }));
    const nomProd = p.product || p.name;
    let prod = cat.products.find((x) => x.name === nomProd);
    if (!prod) cat.products.push((prod = { name: nomProd, description: p.description || '', formats: [] }));
    prod.formats.push(p);
  }
  const rang = (n) => { const i = categories.findIndex((c) => c.name === n); return i < 0 ? categories.length : i; };
  return { categories: cats.sort((a, b) => rang(a.name) - rang(b.name)) };
}

const estPdt = (p) => /^Pommes de terre/i.test(p.category || '');
const motFormat = (f) => (f || '').trim().split(/\s+/)[0]?.toLowerCase() || 'sac';
const pluriel = (m) => (m.endsWith('s') ? m : `${m}s`);
const liste = (xs, et) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${et} ${xs.at(-1)}`);

// Résumé des pommes de terre en vente : variétés, formats, prix au kilo (accueil et en-tête de page).
export function resumePdt(catalogue) {
  const dispo = (catalogue?.products || []).filter((p) => estDisponible(p) && estPdt(p));
  const triees = dispo.filter((p) => p.category === 'Pommes de terre');
  const nonTriees = dispo.filter((p) => p.category !== 'Pommes de terre');
  const varietes = new Set(triees.map((p) => p.product || p.name)).size;
  const base = triees.length ? triees : dispo;
  const mots = [...new Set(base.map((p) => motFormat(p.format)))];
  const poids = [...new Set(base.map((p) => p.weightKg).filter((w) => w > 0))].sort((a, b) => a - b);
  const formats = (et) => (poids.length
    ? `${mots.length === 1 ? `en ${pluriel(mots[0])}` : 'en filets et en sacs'} de ${liste(poids.map(nombre), et)}\u00a0kg`
    : '');
  // Une carte de prix par format (le prix au kilo le plus bas du format)
  const parFormat = new Map();
  for (const p of base) {
    const cle = p.format || `${p.weightKg} kg`;
    const kgc = prixKgCentimes(p);
    if (kgc && (!parFormat.has(cle) || kgc < prixKgCentimes(parFormat.get(cle)))) parFormat.set(cle, p);
  }
  const cartes = [...parFormat.values()]
    .sort((a, b) => a.weightKg - b.weightKg)
    .map((p) => ({ parKg: `${eurosCentimes(prixKgCentimes(p))}/kg`, detail: `${(p.format || '').toLowerCase()} · ${eurosCentimes(p.priceCents)}` }));
  const nonTrie = nonTriees.length
    ? (() => {
        const p = nonTriees.reduce((m, x) => (prixKgCentimes(x) < prixKgCentimes(m) ? x : m));
        return { parKg: `${eurosCentimes(prixKgCentimes(p))}/kg`, detail: `non triées · ${(p.format || '').toLowerCase()} · ${eurosCentimes(p.priceCents)}` };
      })()
    : null;
  return {
    ouvert: !!catalogue?.open && dispo.length > 0,
    varietes,
    formatsTitre: formats('et'),
    formatsCarte: formats('ou'),
    cartes: nonTrie ? [nonTrie, ...cartes].slice(0, 3) : cartes.slice(0, 2),
  };
}
