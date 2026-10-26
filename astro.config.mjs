import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { typographierHtml } from './src/lib/typo.js';
import { lireEspacePro } from './src/lib/reglages.js';

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

// Espace pro en veille (case « Espace pro ouvert » de Réglages du site, ou variable ESPACE_PRO) :
// /pro/* renvoie vers /professionnels/ par une vraie redirection Cloudflare (fichier _redirects).
const espacePro = {
  name: 'espace-pro-en-veille',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const reglages = JSON.parse(await readFile(new URL('./data/reglages.json', import.meta.url), 'utf8'));
      const fichier = path.join(fileURLToPath(dir), '_redirects');
      if (lireEspacePro(reglages, process.env.ESPACE_PRO)) {
        console.log('→ Espace pro ouvert');
        return;
      }
      await writeFile(fichier, '# Espace pro en veille (Réglages du site) : écrit à la construction\n/pro/* /professionnels/ 302\n');
      console.log('→ Espace pro en veille : /pro/* renvoie vers /professionnels/');
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
  integrations: [typographie, espacePro],
  devToolbar: { enabled: false },
});
