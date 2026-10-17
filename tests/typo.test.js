import { test } from 'node:test';
import assert from 'node:assert/strict';
import { espacesInsecables, typographierHtml } from '../src/lib/typo.js';
import { lireLieux } from '../src/lib/vente.js';

const N = ' ';

test('guillemets, ponctuation double, unités et plages horaires restent collés', () => {
  assert.equal(espacesInsecables('Ceux marqués « Quantité limitée » partent vite : venez tôt !'),
    `Ceux marqués «${N}Quantité limitée${N}» partent vite${N}: venez tôt${N}!`);
  assert.equal(espacesInsecables('Déjà client ? Filet 15 kg, 48 h, 100 %'), `Déjà client${N}? Filet 15${N}kg, 48${N}h, 100${N}%`);
  assert.equal(espacesInsecables('Samedi · 10h – 12h30'), `Samedi · 10h${N}–${N}12h30`);
  assert.equal(espacesInsecables('le 15 avril, 32 produits'), 'le 15 avril, 32 produits');
});

test('sur une page, seul le texte change (balises, scripts et styles intacts)', () => {
  const html = '<p title="a : b">Total : « oui »</p><script>const x = a ? b : c;</script><style>a :hover{}</style>';
  assert.equal(typographierHtml(html), `<p title="a : b">Total${N}: «${N}oui${N}»</p><script>const x = a ? b : c;</script><style>a :hover{}</style>`);
});

test('lieux : la ferme une seule fois et en tête, sans jours ni horaires', () => {
  const lieux = lireLieux([
    { lieu: 'Marché du Terroir, Richeling', cetteSemaine: false },
    { lieu: 'Vente à la ferme, Lostroff', aLaFerme: true, cetteSemaine: false },
    { lieu: 'Vente à la ferme, Lostroff', aLaFerme: true, cetteSemaine: true },
    { lieu: 'Haraucourt-s/-Seille', cetteSemaine: false },
  ]);
  assert.deepEqual(lieux.map((l) => [l.nom, l.ville, l.cetteSemaine]), [
    ['Vente à la ferme', 'Lostroff', true],
    ['Haraucourt-sur-Seille', '', false],
    ['Marché du Terroir', 'Richeling', false],
  ]);
});
