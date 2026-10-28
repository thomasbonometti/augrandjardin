import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lirePortable, ERREUR_INCOMPLET, ERREUR_FIXE } from '../functions/_lib/telephone.js';

const numero = (saisie) => lirePortable(saisie).telephone;

test('portable français : toujours rangé « 06 12 34 56 78 », quelle que soit la saisie', () => {
  for (const saisie of ['0612345678', '06 12 34 56 78', '06.12.34.56.78', '+33612345678', '+33 6 12 34 56 78', '+33 (0)6 12 34 56 78', '0033 6 12 34 56 78', '33612345678']) {
    assert.equal(numero(saisie), '06 12 34 56 78', saisie);
  }
  assert.equal(numero('07 98 76 54 32'), '07 98 76 54 32');
  assert.equal(numero('+33 7 98 76 54 32'), '07 98 76 54 32');
});

test('fixe ou numéro spécial français : refusé, avec un message qui demande un portable', () => {
  for (const saisie of ['03 87 00 00 00', '01 23 45 67 89', '09 70 00 00 00', '08 00 00 00 00', '+33 3 87 00 00 00']) {
    assert.deepEqual(lirePortable(saisie), { ok: false, erreur: ERREUR_FIXE }, saisie);
  }
});

test('numéro étranger avec indicatif : gardé, rangé sans espaces', () => {
  assert.equal(numero('+49 151 12345678'), '+4915112345678');
  assert.equal(numero('0049 151 12345678'), '+4915112345678');
  assert.equal(numero('+352 621 123 456'), '+352621123456');
  assert.equal(numero('+32 470 12 34 56'), '+32470123456');
});

test('numéro incomplet ou vide : refusé', () => {
  for (const saisie of ['06 12', '06 12 34 56 7', '612345678', '+33 6 12 34', '+49 151', '', null, undefined, 'abc']) {
    assert.deepEqual(lirePortable(saisie), { ok: false, erreur: ERREUR_INCOMPLET }, String(saisie));
  }
});
