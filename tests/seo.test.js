// Données structurées : nom du site pour Google (WebSite) et fiche de la ferme (LocalBusiness).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { schemaSite, schemaFerme } from '../src/lib/seo.js';

test('seo : le site s’appelle « Au Grand Jardin » pour Google et renvoie à la fiche de la ferme', () => {
  const site = schemaSite();
  assert.equal(site['@type'], 'WebSite');
  assert.equal(site.name, 'Au Grand Jardin');
  assert.equal(site.url, 'https://www.augrandjardin.fr/');
  assert.equal(site.publisher['@id'], schemaFerme()['@id']);
});

test('seo : la fiche de la ferme donne l’adresse, le plan et la page Facebook', () => {
  const f = schemaFerme();
  assert.equal(f['@type'], 'LocalBusiness');
  assert.equal(f.address.postalCode, '57670');
  assert.match(f.hasMap, /^https:\/\/www\.google\.com\/maps\//);
  assert.ok(f.sameAs.some((u) => u.includes('facebook.com')));
  assert.equal(f.openingHoursSpecification, undefined, 'sans créneau, pas d’horaires inventés');
});
