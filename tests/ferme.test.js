import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  partenaires, restaurants, pointsDeVente,
  tousLesPartenaires, tousLesRestaurants, tousLesPointsDeVente,
} from '../src/data/ferme.js';

// Revue de Pierre du 26/10/2026 : les lieux passés à « actif: false » restent dans le fichier mais pas sur le site.
test('lieux : seuls les lieux actifs sont affichés', () => {
  for (const liste of [partenaires, restaurants, pointsDeVente]) {
    assert.ok(liste.every((l) => l.actif === true));
  }
  assert.equal(partenaires.length, 0);
  assert.deepEqual(restaurants.map((r) => r.nom), ['Hôtel Notre-Dame de Bonne Fontaine', 'Le Greffin', 'Le Bistrot des Oiseaux']);
  assert.deepEqual(pointsDeVente.map((r) => r.nom), ['Inventerre du Pré Vert', 'Ma Petite Cuillère']);
});

test('lieux : rien n’est effacé, chaque lieu a un état', () => {
  for (const liste of [tousLesPartenaires, tousLesRestaurants, tousLesPointsDeVente]) {
    assert.ok(liste.every((l) => typeof l.actif === 'boolean' && l.nom));
  }
  assert.ok(tousLesRestaurants.some((r) => r.nom === 'La Toque Blanche' && !r.actif));
  assert.ok(tousLesPointsDeVente.some((r) => r.nom === 'Marché de Bénestroff' && !r.actif));
});

test('lieux : aucune ville devinée pour les nouveaux lieux', () => {
  for (const nom of ['Le Greffin', 'Le Bistrot des Oiseaux']) assert.equal(restaurants.find((r) => r.nom === nom).ville, null);
  assert.equal(pointsDeVente.find((r) => r.nom === 'Ma Petite Cuillère').ville, null);
});
