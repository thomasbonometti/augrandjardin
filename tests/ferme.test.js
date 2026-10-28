import { test } from 'node:test';
import assert from 'node:assert/strict';

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
