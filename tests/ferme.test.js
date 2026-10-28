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
  assert.deepEqual(restaurants.map((r) => r.nom), ['Hôtel Notre-Dame de Bonne Fontaine', 'À la Croix de Lorraine', 'Le Bistrot des Oiseaux']);
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
  // Villes lues sur les fiches Google Maps envoyées par Thomas le 28/10/2026.
  assert.equal(restaurants.find((r) => r.nom === 'Le Bistrot des Oiseaux').ville, 'Tarquimpol');
  assert.equal(restaurants.find((r) => r.nom === 'À la Croix de Lorraine').ville, 'Loudrefing');
  assert.ok(!tousLesRestaurants.some((r) => r.nom === 'Le Greffin'), 'nom erroné, corrigé par Thomas');
  assert.equal(pointsDeVente.find((r) => r.nom === 'Ma Petite Cuillère').ville, null);
});

test('inscription : canal WhatsApp par défaut, SMS au choix', async () => {
  const { lireCanal, parCanal } = await import('../functions/_lib/canal.js');
  assert.equal(lireCanal(undefined), 'WhatsApp');
  assert.equal(lireCanal(''), 'WhatsApp');
  assert.equal(lireCanal('sms'), 'SMS');
  assert.equal(lireCanal('WhatsApp'), 'WhatsApp');
  assert.equal(lireCanal('pigeon'), 'WhatsApp');
  assert.equal(parCanal('SMS'), 'par SMS');
  assert.equal(parCanal('WhatsApp'), 'sur WhatsApp');
});
