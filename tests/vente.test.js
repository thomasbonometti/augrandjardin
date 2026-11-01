// Tests des fonctions pures du site : node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prixProduit, titreRayon, grouperRayons, parseHoraire, lireCreneaux, prochaineVente, prixHT, estNouveau, vedettes, produitsPros } from '../src/lib/vente.js';
import { resumePdt, grouperCatalogue } from '../src/lib/pdt.js';
import { rendreCategories, textePoids, maximum, echapper, peutAjouter } from '../src/lib/commande-rendu.js';

test('prix : au kilo, à l’unité, au poids, en promo', () => {
  assert.deepEqual(prixProduit({ venduA: '/kg', prixKg: 3.8 }), { montant: 3.8, ancien: null, unite: 'le kg' });
  assert.deepEqual(prixProduit({ venduA: 'le bouquet', prixUnitaire: 1.5, prixKg: 30 }), { montant: 1.5, ancien: null, unite: 'le bouquet' });
  assert.equal(prixProduit({ venduA: 'les 250g', prixKg: 12.3, poids: 0.25 }).montant, 3.08);
  assert.deepEqual(prixProduit({ venduA: '/kg', prixKg: 4, promo: true, prixPromo: 3 }), { montant: 3, ancien: 4, unite: 'le kg' });
  assert.equal(prixProduit({ venduA: 'le pot' }), null);
});

test('rayons : titres nettoyés et ordre de la vente', () => {
  assert.equal(titreRayon('🥕 Nos légumes Bio disponibles cette semaine'), 'Légumes');
  assert.equal(titreRayon('🌱  Plants'), 'Plants');
  const r = grouperRayons([{ rayon: '🧺 Divers' }, { rayon: '🍅 Tomates' }, { rayon: '🥕 Nos légumes Bio disponibles cette semaine' }]);
  assert.deepEqual(r.map((x) => x.titre), ['Légumes', 'Tomates', 'Divers']);
});

test('horaires du Planning', () => {
  assert.deepEqual(parseHoraire('de 10h à 12h30'), { debut: 600, fin: 750 });
  assert.deepEqual(parseHoraire('8h - 12h'), { debut: 480, fin: 720 });
});

test('prochaine vente : samedi de la semaine, puis la semaine suivante une fois passée', () => {
  const creneaux = lireCreneaux([
    { jour: 'Samedi', horaire: 'de 10h à 12h30', aLaFerme: true, ville: 'Lostroff', cetteSemaine: true },
    { jour: 'Mercredi', horaire: 'de 17h à 19h', aLaFerme: true, ville: 'Lostroff', cetteSemaine: false },
  ]);
  const vendredi = prochaineVente(creneaux, new Date('2026-10-16T18:00:00+02:00'));
  assert.equal(vendredi.iso, '2026-10-17');
  assert.equal(vendredi.jourDate, 'samedi 17 octobre');
  assert.equal(vendredi.heures, '10h – 12h30');
  assert.equal(vendredi.jourCourt, 'Sam. 10h');
  const samediMidi = prochaineVente(creneaux, new Date('2026-10-17T11:00:00+02:00'));
  assert.equal(samediMidi.iso, '2026-10-17');
  const samediSoir = prochaineVente(creneaux, new Date('2026-10-17T13:00:00+02:00'));
  assert.equal(samediSoir.iso, '2026-10-24');
  assert.equal(prochaineVente([], new Date()), null);
});

test('prix HT pour la grille pro (TVA 5,5 %)', () => {
  assert.equal(prixHT(3.08 * 1), 2.92);
  assert.equal(prixHT(4.9), 4.64);
  assert.equal(prixHT(2), 1.9);
});

test('nouveautés et produits mis en avant', () => {
  const ref = new Date('2026-10-16T12:00:00Z');
  assert.equal(estNouveau({ dateNouveaute: '2026-10-15' }, ref), true);
  assert.equal(estNouveau({ dateNouveaute: '2026-09-01' }, ref), false);
  const v = vedettes([
    { nom: 'A', image: {}, prix: {} },
    { nom: 'B', image: {}, prix: {}, aLaUne: true },
    { nom: 'C', image: null, prix: {}, aLaUne: true },
  ]);
  assert.deepEqual(v.map((p) => p.nom), ['B', 'A']);
});

const catalogue = {
  open: true,
  products: [
    { id: 'a7', name: 'Agria — filet 7 kg', product: 'Agria', format: 'Filet 7 kg', category: 'Pommes de terre', priceCents: 1200, weightKg: 7, stock: null, ordre: 10, enVente: true },
    { id: 'a15', name: 'Agria — filet 15 kg', product: 'Agria', format: 'Filet 15 kg', category: 'Pommes de terre', priceCents: 2500, weightKg: 15, stock: 0, ordre: 11, enVente: true },
    { id: 'nt5', name: 'Chérie — sac 5 kg', product: 'Chérie', format: 'Sac 5 kg', category: 'Pommes de terre non triées', priceCents: 600, oldPriceCents: 1000, weightKg: 5, stock: null, ordre: 1, enVente: true },
    { id: 'off', name: 'Caché', product: 'Caché', format: 'Sac', category: 'Pommes de terre', priceCents: 900, weightKg: 5, enVente: false },
    { id: 'o5', name: 'Oignons jaunes — filet 5 kg', product: 'Oignons jaunes', format: 'Filet 5 kg', category: 'Oignons et échalotes', priceCents: 1400, weightKg: 5, enVente: true, ordre: 200 },
  ],
};
const categories = [{ name: 'Pommes de terre non triées', intro: 'Mélange de choix.' }, { name: 'Pommes de terre' }, { name: 'Oignons et échalotes' }];

test('page Pommes de terre : résumé du catalogue réel', () => {
  const r = resumePdt(catalogue);
  assert.equal(r.ouvert, true);
  assert.equal(r.varietes, 1);
  assert.equal(r.formatsTitre, 'en filets de 7 kg'); // le filet de 15 kg épuisé n'est pas annoncé
  assert.equal(r.cartes[0].detail, 'non triées · sac 5 kg · 6,00 €');
  assert.equal(r.cartes[0].parKg, '1,20 €/kg');
  assert.equal(resumePdt({ open: false, products: [] }).ouvert, false);
});

test('liste de commande : non trié en tête avec son texte et le prix au kilo, produits cachés absents', () => {
  const html = rendreCategories(catalogue, { categories, rules: { maxQtyPerLine: 20 } }, { a7: 2 });
  assert.ok(html.indexOf('Pommes de terre non triées') < html.indexOf('>Pommes de terre<'));
  assert.match(html, /Mélange de choix\./);
  assert.match(html, /soit 1,20 €\/kg/);
  assert.doesNotMatch(html, /Caché/);
  assert.match(html, /data-id="a15"[^]*?Épuisé/);
  assert.match(html, /data-id="a7"[^]*?<output aria-live="polite">2<\/output>/);
  const g = grouperCatalogue(catalogue.products, categories);
  assert.deepEqual(g.categories.map((c) => c.name), ['Pommes de terre non triées', 'Pommes de terre', 'Oignons et échalotes']);
});

test('panier : maximum par ligne, poids, échappement', () => {
  assert.equal(maximum({ stock: 3 }, { maxQtyPerLine: 20 }), 3);
  assert.equal(maximum({ maximum: 4 }, { maxQtyPerLine: 20 }), 4);
  assert.equal(maximum({}, { maxQtyPerLine: 20 }), 20);
  assert.equal(textePoids([{ category: 'Pommes de terre', weightKg: 14 }, { category: 'Oignons et échalotes', weightKg: 5 }]), '14 kg de pommes de terre et 5 kg d’oignons et d’échalotes');
  assert.equal(echapper('<b>"&'), '&lt;b&gt;&quot;&amp;');
});

test('produits des pros : de la ferme et avec un prix, comme la grille de l’outil', () => {
  const produits = [
    { nom: 'Carotte vrac', producteur: 'Au Grand Jardin', venduA: '/kg', prixKg: 3.1 },
    { nom: 'Basilic', producteur: 'Au Grand Jardin', venduA: 'le bouquet', prixUnitaire: 1.5 },
    { nom: 'Pain de campagne', producteur: 'Boulanger', venduA: '/pièce', prixUnitaire: 4 },
    { nom: 'Courge sans prix', producteur: 'Au Grand Jardin', venduA: '/kg' },
    { nom: 'Prix à zéro', producteur: 'Au Grand Jardin', venduA: '/pièce', prixUnitaire: 0 },
    { nom: 'Tomate en promo', producteur: 'Au Grand Jardin', venduA: '/kg', prixKg: 5, promo: true, prixPromo: 4 },
  ];
  assert.deepEqual(produitsPros(produits).map((p) => p.nom), ['Carotte vrac', 'Basilic', 'Tomate en promo']);
});

test('commande : stock de la variété en kilos et 60 kg de pommes de terre au plus (outil, 01/11/2026)', () => {
  const rules = { maxQtyPerLine: 20, maxWeight: { kg: 60, categories: ['Pommes de terre'], text: '60 kg…' } };
  const F = (id, kg, extra = {}) => ({ id, name: id, product: 'Chérie', category: 'Pommes de terre', weightKg: kg, priceCents: 1000, enVente: true, varietyKg: 40, ...extra });
  const produits = [F('c7', 7), F('c15', 15), F('g15', 15, { product: 'Goldmarie', varietyKg: null }), F('o10', 10, { product: 'Oignons', category: 'Oignons et échalotes', varietyKg: null })];
  const [c7, c15, g15, o10] = produits;
  assert.equal(maximum(c15, rules), 2, '40 kg : deux filets de 15 kg');
  assert.equal(peutAjouter(c7, { c15: 2 }, produits, rules), true, '30 + 7 = 37 kg sur 40');
  assert.equal(peutAjouter(c7, { c15: 2, c7: 1 }, produits, rules), false, '44 kg > 40 : la variété est pleine');
  assert.equal(peutAjouter(g15, { g15: 4 }, produits, rules), false, '60 kg de pommes de terre atteints');
  assert.equal(peutAjouter(g15, { g15: 3 }, produits, rules), true);
  assert.equal(peutAjouter(o10, { g15: 4 }, produits, rules), true, 'les oignons ne comptent pas');
  assert.equal(peutAjouter(g15, { g15: 3 }, produits, { maxQtyPerLine: 20 }), true, 'sans limite (outil pas encore à jour) : comme avant');
});
