// Rendu HTML de la liste de commande (page Pommes de terre), partagé entre la construction
// (HTML déjà rempli, lisible sans JavaScript) et le navigateur (catalogue relu en direct).
// Chaînes HTML échappées, avec les espaces insécables de la typographie française.
import { espacesInsecables } from './typo.js';

const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
export const euros = (c) => EUR.format((Number(c) || 0) / 100).replace(/\s/g, ' ');
const nombre = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);
export const kg = (n) => `${nombre(n)} kg`;
const parKg = (p) => (p?.weightKg > 0 && p.priceCents > 0 ? Math.round(p.priceCents / p.weightKg) : null);

export function echapper(s) {
  return espacesInsecables(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Affichable : en vente, nommé, avec un prix (un format épuisé reste visible, grisé).
const affichable = (p) => !!(p && p.enVente && p.name && p.priceCents > 0);
export const commandable = (p) => affichable(p) && (p.stock == null || p.stock > 0);

export function maximum(p, rules = {}) {
  const plafonds = [rules.maxQtyPerLine || 99];
  if (p.maximum > 0) plafonds.push(p.maximum);
  if (p.stock != null) plafonds.push(p.stock);
  return Math.max(0, Math.min(...plafonds));
}

// Même regroupement que l'outil (catalogView) : catégories dans l'ordre de agj.config.json, puis produits et formats.
export function regrouper(products = [], categories = []) {
  const liste = products.filter(affichable)
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
  return cats.sort((a, b) => rang(a.name) - rang(b.name));
}

const icone = (d) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
const MOINS = icone('<path d="M5 12h14"/>');
const PLUS = icone('<path d="M5 12h14"/><path d="M12 5v14"/>');
const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function format(p, produit, items, rules, nonTrie) {
  const qte = items[p.id] || 0;
  const max = maximum(p, rules);
  const epuise = p.stock != null && p.stock <= 0;
  const libelle = `${p.format || p.name}`;
  const nomComplet = `${libelle.toLowerCase()} de ${produit.name}`;
  const kgc = parKg(p);
  return `<div class="format${qte ? ' format--choisi' : ''}${epuise ? ' format--epuise' : ''}" data-id="${echapper(p.id)}">
    <p class="sm muted format__nom">${echapper(libelle)}</p>
    <div class="stepper" role="group" aria-label="${echapper(`Quantité, ${nomComplet}`)}">
      <button type="button" data-action="moins" aria-label="${echapper(`Enlever un ${nomComplet}`)}"${qte <= 0 ? ' disabled' : ''}>${MOINS}</button>
      <output aria-live="polite">${qte}</output>
      <button type="button" data-action="plus" aria-label="${echapper(`Ajouter un ${nomComplet}`)}"${qte >= max || epuise ? ' disabled' : ''}>${PLUS}</button>
    </div>
    <p class="xs format__prix"><span class="fonce">${euros(p.priceCents)}</span>${p.oldPriceCents > p.priceCents ? ` <s aria-label="${echapper(`au lieu de ${euros(p.oldPriceCents)}`)}">${euros(p.oldPriceCents)}</s>` : ''}</p>
    ${nonTrie && kgc ? `<p class="xs muted">soit ${euros(kgc)}/kg</p>` : ''}
    ${epuise ? '<p class="xs format__stock">Épuisé</p>' : p.stock != null && p.stock <= 5 ? `<p class="xs format__stock">Plus que ${p.stock}</p>` : ''}
  </div>`;
}

function produit(prod, items, rules, nonTrie) {
  const tousEpuises = prod.formats.every((p) => p.stock != null && p.stock <= 0);
  const peuDeStock = !tousEpuises && prod.formats.some((p) => p.stock != null && p.stock > 0 && p.stock <= 5);
  const lignes = prod.description.split('\n').map((l) => l.trim()).filter(Boolean);
  const etiquette = tousEpuises
    ? '<span class="chip chip-epuise chip-petit">Épuisée</span>'
    : peuDeStock ? '<span class="chip chip-peche chip-petit">Bientôt épuisée</span>' : '';
  return `<li class="variete${tousEpuises ? ' variete--epuisee' : ''}">
    <div class="variete__infos">
      <div class="variete__nom"><h4>${echapper(prod.name)}</h4>${etiquette}</div>
      ${lignes.map((l, i) => `<p class="sm ${i === 0 ? 'muted' : 'variete__avis'}">${echapper(l)}</p>`).join('')}
    </div>
    <div class="variete__formats">${prod.formats.map((p) => format(p, prod, items, rules, nonTrie)).join('')}</div>
  </li>`;
}

export function rendreCategories(catalogue, config, items = {}) {
  const cats = regrouper(catalogue?.products, config?.categories);
  if (!cats.length) return '<p class="muted">Aucun produit n’est en vente pour le moment.</p>';
  return cats.map((cat) => {
    const nonTrie = /non tri/i.test(cat.name);
    return `<section class="categorie${nonTrie ? ' categorie--non-trie' : ''}" aria-labelledby="cat-${slug(cat.name)}">
    <h3 class="categorie__titre" id="cat-${slug(cat.name)}">${echapper(cat.name)}</h3>
    ${cat.intro ? `<p class="categorie__intro sm">${echapper(cat.intro)}</p>` : ''}
    <ul class="varietes" role="list">${cat.products.map((p) => produit(p, items, config?.rules || {}, nonTrie)).join('')}</ul>
  </section>`;
  }).join('');
}

// « 22 kg de pommes de terre et 5 kg d'oignons et d'échalotes »
export function textePoids(lignes) {
  const pdt = lignes.filter((l) => /^Pommes de terre/i.test(l.category)).reduce((s, l) => s + (l.weightKg || 0), 0);
  const oignons = lignes.filter((l) => /oignon|échalote/i.test(l.category)).reduce((s, l) => s + (l.weightKg || 0), 0);
  const autres = lignes.reduce((s, l) => s + (l.weightKg || 0), 0) - pdt - oignons;
  const parts = [];
  if (pdt) parts.push(`${kg(pdt)} de pommes de terre`);
  if (oignons) parts.push(`${kg(oignons)} d’oignons et d’échalotes`);
  if (autres > 0.001) parts.push(`${kg(autres)} d’autres produits`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} et ${parts.at(-1)}` : parts.join('');
}

export function rendreLignesRecap(lignes) {
  if (!lignes.length) return '<p class="muted recap__vide">Votre panier est vide : choisissez vos produits.</p>';
  return lignes.map((l) => `<div class="recap__ligne"><p>${l.qty}&nbsp;× ${echapper(l.format ? `${l.format.toLowerCase()} · ${l.product}` : l.name)}</p><p class="nowrap">${euros(l.totalCents)}</p></div>`).join('');
}
