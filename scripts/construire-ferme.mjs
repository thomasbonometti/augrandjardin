// Construit le site en mode fermé, avec un message de la semaine, dans dist-ferme/ :
// sert aux tests navigateur du mode fermé (E2E_FERME=1, voir e2e/fermeture.spec.js).
// data/reglages.json est remis tel quel à la fin, même si la construction échoue.
//
//   node scripts/construire-ferme.mjs
//   npx wrangler pages dev dist-ferme --port 8790 --compatibility-date=2026-09-15 --binding AGJ_URL=https://formulaires.hey-d8b.workers.dev
//   E2E_FERME=1 BASE_URL=http://localhost:8790 npx playwright test e2e/fermeture.spec.js
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const chemin = new URL('../data/reglages.json', import.meta.url);
const avant = await readFile(chemin, 'utf8');

// Reprise : le premier samedi dans au moins 90 jours
const d = new Date(Date.now() + 90 * 86400000);
d.setUTCDate(d.getUTCDate() + ((6 - d.getUTCDay() + 7) % 7));
const reprise = d.toISOString().slice(0, 10);

await writeFile(chemin, JSON.stringify({
  ferme: true,
  repriseLe: reprise,
  messageFermeture: 'Message de fermeture de test : la ferme fait une pause.',
  afficherMessage: true,
  message: 'Message de la semaine de test : rendez-vous au marché de Noël.',
}, null, 2));
try {
  execSync('npx astro build --outDir dist-ferme', { stdio: 'inherit' });
  console.log(`✓ dist-ferme/ construit en mode fermé (reprise le ${reprise})`);
} finally {
  await writeFile(chemin, avant);
}
