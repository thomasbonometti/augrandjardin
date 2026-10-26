// Espace pro : aperçu du panier et rendu de la grille (l'outil recalcule tout à l'envoi).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prixUnitaire, panier, lireQuantite, detailLigne, texteListePaliers, resumePrevision, rendreGrille, rendrePrevisions, jourMois } from '../src/lib/pro-grille.js';

// Une ligne comme l'outil la renvoie (carotte 3,10 € TTC, remise 5 %).
const carotte = { id: 'f-carotte', nom: 'Carotte vrac', rayon: 'Légumes', kind: 'kg', unite: 'le kg', ttcCents: 310, htCents: 279, ttcProCents: 294, paliers: [{ seuil: 5, pct: 3, htCents: 271 }, { seuil: 10, pct: 5, htCents: 265 }], nouveau: true };
const basilic = { id: 'f-basilic', nom: 'Basilic', rayon: 'Aromates', kind: 'u', unite: 'le bouquet', ttcCents: 150, htCents: 135, ttcProCents: 142, paliers: [{ seuil: 10, pct: 3, htCents: 131 }, { seuil: 20, pct: 5, htCents: 128 }] };
const pas = { kg: 0.5, unit: 1 };

test('prix du palier atteint, comme l’outil', () => {
  assert.equal(prixUnitaire(carotte, 4.5).unitHtCents, 279);
  assert.equal(prixUnitaire(carotte, 5).unitHtCents, 271);
  assert.equal(prixUnitaire(carotte, 12).unitHtCents, 265);
  assert.equal(prixUnitaire(carotte, 12).palier.seuil, 10);
});

test('panier : totaux HT, TVA 5,5 %, TTC', () => {
  const p = panier([carotte, basilic], { 'f-carotte': 12, 'f-basilic': 10 });
  assert.equal(p.lignes.length, 2);
  assert.equal(p.totalHtCents, 3180 + 1310);
  assert.equal(p.tvaCents, Math.round(4490 * 0.055));
  assert.equal(p.totalTtcCents, 4490 + p.tvaCents);
  assert.equal(panier([carotte], {}).lignes.length, 0);
});

test('quantités saisies : virgule, demi-kilos, unités entières, maximum', () => {
  assert.equal(lireQuantite('12,5', carotte, { pas }), 12.5);
  assert.equal(lireQuantite('12.5 kg', carotte, { pas }), 12.5);
  assert.equal(lireQuantite('2,3', carotte, { pas }), 2.5, 'arrondi au demi-kilo');
  assert.equal(lireQuantite('1,5', basilic, { pas }), 2, 'pas de demi-bouquet');
  assert.equal(lireQuantite('', carotte, { pas }), 0);
  assert.equal(lireQuantite('beaucoup', carotte, { pas }), null);
  assert.equal(lireQuantite('-2', carotte, { pas }), null);
  assert.equal(lireQuantite('500', carotte, { pas, max: 200 }), 200);
});

test('détail d’une ligne et paliers en texte', () => {
  const [c, b] = panier([carotte, basilic], { 'f-carotte': 12, 'f-basilic': 3 }).lignes;
  assert.equal(detailLigne(c).replace(/\s/g, ' '), '12 kg × 2,65 € (palier 10 kg)');
  assert.equal(detailLigne(b).replace(/\s/g, ' '), '3 bouquets × 1,35 €');
  assert.equal(texteListePaliers(carotte.paliers, 'kg'), '−3 % dès 5 kg, −5 % dès 10 kg');
});

test('grille : un rayon par groupe, quantité choisie, palier atteint coché, rien d’injecté', () => {
  const html = rendreGrille([carotte, basilic, { ...basilic, id: 'x', nom: '<b>Piège</b>' }], { 'f-carotte': 12 });
  assert.equal((html.match(/class="rayon-pro"/g) || []).length, 2);
  assert.match(html, /ligne-pro ligne-pro--choisie" data-id="f-carotte"/);
  assert.match(html, /palier palier--atteint">2,65\s€ dès 10\skg/);
  assert.ok(!html.includes('<b>Piège</b>'));
  assert.match(html, /Ajouter 1\skg de Carotte vrac/);
  assert.match(rendreGrille([carotte], {}, { verrou: true }), /data-qte disabled/);
});

test('prévisions : résumé pour le téléphone, tableau pour l’ordinateur', () => {
  const semaines = ['2026-11-02', '2026-11-09', '2026-11-16', '2026-11-23'].map((iso) => ({ iso, label: iso }));
  const d = (kind, text = kind === 'dispo' ? 'Disponible' : '') => ({ kind, text });
  assert.deepEqual(resumePrevision({ nom: 'Mâche', cells: [d(''), d('arrive', 'Arrive vers le 14 nov.'), d('dispo'), d('dispo')] }, semaines), { kind: 'arrive', texte: 'Arrive vers le 14 nov.' });
  assert.deepEqual(resumePrevision({ nom: 'Courgette', cells: [d('derniere', 'Dernière semaine'), d(''), d(''), d('')] }, semaines), { kind: 'derniere', texte: 'Dernière semaine' });
  assert.equal(resumePrevision({ nom: 'Poireau', cells: [d('dispo'), d('dispo'), d(''), d('')] }, semaines).texte, 'Jusqu’à la semaine du 9 novembre');
  const html = rendrePrevisions({ weeks: semaines, rows: [{ nom: 'Mâche', cells: [d(''), d('arrive', 'Arrive vers le 14 nov.'), d('dispo'), d('dispo')] }] });
  assert.match(html, /Semaine du 2\snovembre/);
  assert.match(html, /Du 9\snovembre/);
  assert.equal(rendrePrevisions({ weeks: semaines, rows: [] }), '');
  assert.equal(jourMois('2026-11-02'), '2 novembre');
});
