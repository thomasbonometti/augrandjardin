import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { typographierHtml } from './src/lib/typo.js';

// Espaces insécables de la typographie française (« », : ; ! ?, unités, plages horaires) posés sur chaque page construite.
const typographie = {
  name: 'typographie-francaise',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const racine = fileURLToPath(dir);
      for (const fichier of await readdir(racine, { recursive: true })) {
        if (!fichier.endsWith('.html')) continue;
        const chemin = path.join(racine, fichier);
        const avant = await readFile(chemin, 'utf8');
        const apres = typographierHtml(avant);
        if (apres !== avant) await writeFile(chemin, apres);
      }
    },
  },
};

// Site statique : chaque page est un fichier HTML, sans JavaScript de framework.
// L'adresse définitive est augrandjardin.fr ; en test, Cloudflare la sert sur *.pages.dev.
export default defineConfig({
  site: process.env.SITE_URL || 'https://augrandjardin.fr',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Les photos sont recadrées et converties (AVIF/WebP) à la construction.
    responsiveStyles: false,
  },
  integrations: [typographie],
  devToolbar: { enabled: false },
});
