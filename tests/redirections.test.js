import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { anciennesAdresses, fichierRedirections } from '../src/data/redirections.js';

const pageExiste = (url) => url === '/' || existsSync(new URL(`../src/pages${url.replace(/\/$/, '')}.astro`, import.meta.url));

test('anciennes adresses : une par page .html, vers une page qui existe', () => {
  const sources = anciennesAdresses.map(([de]) => de);
  assert.equal(new Set(sources).size, sources.length, 'pas de doublon');
  for (const [de, vers] of anciennesAdresses) {
    assert.match(de, /^\/[a-z-]+\.html$/);
    assert.ok(pageExiste(vers), `${vers} existe`);
  }
  assert.ok(!sources.includes('/index.html'), 'Cloudflare Pages renvoie déjà /index.html vers /');
});

test('fichier _redirects : 301 pour les anciennes adresses, /pro/* seulement en veille', () => {
  const veille = fichierRedirections({ espaceProOuvert: false });
  assert.match(veille, /^\/la-ferme\.html \/la-ferme\/ 301$/m);
  assert.match(veille, /^\/pro\/\* \/professionnels\/ 302$/m);
  assert.doesNotMatch(fichierRedirections({ espaceProOuvert: true }), /\/pro\//);
});

test('.htaccess du passage : même correspondance que _redirects', () => {
  const htaccess = readFileSync(new URL('../bascule/ionos/.htaccess', import.meta.url), 'utf8');
  for (const [de, vers] of anciennesAdresses) {
    const nom = de.slice(1).replace('.html', '');
    const regle = htaccess.split('\n').find((l) => l.startsWith('RewriteRule') && l.includes(nom));
    assert.ok(regle, `règle pour ${de}`);
    assert.ok(regle.includes(`https://www.augrandjardin.fr${vers} `), `${de} → ${vers}`);
  }
});
