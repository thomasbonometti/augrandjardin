// Conseils et saisons des légumes (lot 3)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indicesMois, fichesLegumes, calendrier, resumeMois, plageMois, etatSaison, listeNoms, ancresProduits } from '../src/lib/saisons.js';

const lignes = [
  { id: 'c1', nom: 'Carotte vrac', legume: 'Carotte', categorie: 'Légumes', producteur: 'Au Grand Jardin', enVente: true, mois: ['Janvier', 'Juin', 'Octobre'], cuisson: '', conservation: 'Au frais.' },
  { id: 'c2', nom: 'Carotte - Botte', legume: 'Carotte', categorie: 'Légumes', producteur: 'Au Grand Jardin', enVente: false, mois: ['Mai', 'Juin'], cuisson: 'Râpée.', conservation: 'Ancien texte' },
  { id: 'b1', nom: 'Basilic', legume: 'Basilic', categorie: 'Plantes aromatiques', producteur: 'Au Grand Jardin', enVente: true, mois: ['Juillet'] },
  { id: 'm1', nom: 'Mâche', legume: 'Mâche', categorie: 'Légumes', producteur: 'Au Grand Jardin', enVente: false, mois: [] },
  { id: 'r1', nom: 'Rhubarbe', legume: 'Rhubarbe', categorie: 'Fruits', producteur: 'Au Grand Jardin', enVente: false, mois: ['Mai'] },
  { id: 'x1', nom: 'Sans légume', legume: null, categorie: 'Légumes', mois: ['Mai'] },
];

test('mois Notion → index, sans doublon et triés', () => {
  assert.deepEqual(indicesMois(['Juin', 'janvier', 'Juin', 'Inconnu']), [0, 5]);
  assert.deepEqual(indicesMois(null), []);
});

test('fiches : mois réunis, conseils de la ligne en vente d’abord, puis des autres', () => {
  const f = fichesLegumes(lignes);
  assert.deepEqual([...f.keys()].sort(), ['Basilic', 'Carotte', 'Mâche', 'Rhubarbe']);
  const c = f.get('Carotte');
  assert.deepEqual(c.mois, [0, 4, 5, 9]);
  assert.equal(c.conservation, 'Au frais.');
  assert.equal(c.cuisson, 'Râpée.');
  assert.equal(c.enVente, true);
  assert.deepEqual(c.produitsEnVente, ['c1']);
  assert.equal(c.ancre, 'carotte');
  assert.equal(f.get('Basilic').groupe, 'Aromates');
});

test('calendrier : seulement les légumes de la ferme qui ont des mois, par groupe', () => {
  const groupes = calendrier(fichesLegumes(lignes));
  assert.deepEqual(groupes.map((g) => g.titre), ['Légumes', 'Aromates', 'Fruits']);
  assert.deepEqual(groupes[0].legumes.map((f) => f.nom), ['Carotte']);
  const partenaire = fichesLegumes([{ id: 'p', nom: 'Miel', legume: 'Miel', categorie: 'Produits transformés', producteur: 'Joël Corre', mois: ['Mai'] }]);
  assert.deepEqual(calendrier(partenaire), []);
});

test('résumé du mois : de saison, arrive, dernières semaines', () => {
  const legumes = [{ nom: 'Poireau', mois: [9, 10] }, { nom: 'Mâche', mois: [10, 11] }, { nom: 'Tomate', mois: [6, 7, 8, 9] }];
  const r = resumeMois(legumes, 9);
  assert.deepEqual(r.deSaison, ['Poireau', 'Tomate']);
  assert.deepEqual(r.arrive, ['Mâche']);
  assert.deepEqual(r.termine, ['Tomate']);
  assert.equal(r.moisSuivant, 'novembre');
  assert.deepEqual(resumeMois([{ nom: 'Chou', mois: [11, 0] }], 11).termine, [], 'décembre → janvier se suit');
});

test('plage de mois en français, avec le passage de l’année', () => {
  assert.equal(plageMois([0, 1, 2, 5, 6, 7, 8, 9, 10, 11]), 'de juin à mars');
  assert.equal(plageMois([4]), 'en mai');
  assert.equal(plageMois([4, 5]), 'en mai et juin');
  assert.equal(plageMois([4, 5, 6, 8, 9]), 'de mai à juillet et en septembre et octobre');
  assert.equal(plageMois([...Array(12).keys()]), 'toute l’année');
  assert.equal(plageMois([]), '');
});

test('état de saison pour le panneau', () => {
  assert.equal(etatSaison({ mois: [6, 7, 8, 9] }, 9), 'Dernières semaines');
  assert.equal(etatSaison({ mois: [9, 10] }, 9), 'De saison');
  assert.equal(etatSaison({ mois: [10, 11] }, 9), 'Arrive en novembre');
  assert.equal(etatSaison({ mois: [3] }, 9), null);
  assert.equal(etatSaison({ mois: [...Array(12).keys()] }, 9), 'De saison');
});

test('listes lisibles', () => {
  assert.equal(listeNoms(['Ail', 'Betterave', 'Carotte']), 'Ail, betterave et carotte');
  assert.equal(listeNoms(['Ail']), 'Ail');
  assert.equal(listeNoms(['A', 'B', 'C', 'D'], 2), 'A, b et 2 autres');
});

test('ancres des produits : lisibles, uniques, sans collision avec les rayons', () => {
  const a = ancresProduits([{ id: '1', nom: 'Carotte vrac' }, { id: '2', nom: 'Tomates' }, { id: '3', nom: 'Carotte vrac' }], ['tomates']);
  assert.equal(a.get('1'), 'carotte-vrac');
  assert.equal(a.get('2'), 'produit-tomates');
  assert.equal(a.get('3'), 'carotte-vrac-2');
});
