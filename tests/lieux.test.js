// Lieux : base Notion « Lieux », copiée dans data/lieux.json, triée et filtrée par src/lib/lieux.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { listesLieux, TYPES } from '../src/lib/lieux.js';

const instantane = JSON.parse(fs.readFileSync(new URL('../data/lieux.json', import.meta.url), 'utf8'));
const { tous, restaurants, pointsDeVente, partenaires } = listesLieux(instantane);

// Revue de Pierre du 26/10/2026 : les lieux décochés restent dans Notion mais pas sur le site.
test('lieux : seuls les lieux actifs sont affichés, dans l’ordre de Notion', () => {
  for (const liste of [partenaires, restaurants, pointsDeVente]) assert.ok(liste.every((l) => l.actif === true));
  assert.equal(partenaires.length, 0);
  assert.deepEqual(restaurants.map((r) => r.nom), ['Hôtel Notre-Dame de Bonne Fontaine', 'À la Croix de Lorraine', 'Le Bistrot des Oiseaux']);
  assert.deepEqual(pointsDeVente.map((r) => r.nom), ['Inventerre du Pré Vert', 'Ma Petite Cuillère']);
});

test('lieux : rien n’est effacé, chaque lieu a un état', () => {
  for (const liste of Object.values(tous)) assert.ok(liste.every((l) => typeof l.actif === 'boolean' && l.nom));
  assert.ok(tous.restaurants.some((r) => r.nom === 'La Toque Blanche' && !r.actif));
  assert.ok(tous.pointsDeVente.some((r) => r.nom === 'Marché de Bénestroff' && !r.actif));
});

test('lieux : aucune ville devinée', () => {
  // Villes lues sur les fiches Google Maps envoyées par Thomas le 28/10/2026.
  assert.equal(restaurants.find((r) => r.nom === 'Le Bistrot des Oiseaux').ville, 'Tarquimpol');
  assert.equal(restaurants.find((r) => r.nom === 'À la Croix de Lorraine').ville, 'Loudrefing');
  assert.ok(!tous.restaurants.some((r) => r.nom === 'Le Greffin'), 'nom erroné, corrigé par Thomas');
  assert.equal(pointsDeVente.find((r) => r.nom === 'Ma Petite Cuillère').ville, null);
});

test('lieux : tri, nom court, champs vides et lignes incomplètes', () => {
  const l = listesLieux([
    { nom: 'Zèbre', type: TYPES.restaurant, actif: true, ordre: null },
    { nom: 'Abeille', type: TYPES.restaurant, actif: true, ordre: null },
    { nom: ' Bistrot ', court: '', type: TYPES.restaurant, ville: '  ', actif: true, ordre: 2 },
    { nom: 'Café du coin', court: 'Café', type: TYPES.restaurant, actif: true, ordre: 1 },
    { nom: 'Sans type', type: null, actif: true },
    { nom: '', type: TYPES.restaurant, actif: true },
    { nom: 'Coché ?', type: TYPES.pointDeVente, actif: 'oui' },
  ]);
  assert.deepEqual(l.restaurants.map((r) => r.nom), ['Café du coin', 'Bistrot', 'Abeille', 'Zèbre']);
  assert.equal(l.restaurants[0].court, 'Café');
  assert.equal(l.restaurants[1].court, 'Bistrot');
  assert.equal(l.restaurants[1].ville, null);
  assert.equal(l.pointsDeVente.length, 0, 'seul « Actif » coché (true) affiche un lieu');
  assert.equal(l.tous.restaurants.length, 4, 'une ligne sans nom ou sans type est ignorée');
});
