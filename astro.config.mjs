import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { typographierHtml } from './src/lib/typo.js';
import { lireEspacePro, lireCommandesPdt } from './src/lib/reglages.js';
import { anciennesAdresses, fichierRedirections } from './src/data/redirections.js';

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

// Redirections Cloudflare (fichier _redirects, écrit à la construction) :
// - les anciennes adresses du site (pages .html) vers les nouvelles pages (src/data/redirections.js) ;
// - espace pro en veille (case « Espace pro ouvert » de Réglages du site, ou variable ESPACE_PRO) :
//   /pro/* renvoie vers /professionnels/ ;
// - commandes de pommes de terre fermées (case « Commandes de pommes de terre ouvertes », ou variable
//   COMMANDE_PDT) : la page Pommes de terre est retirée de dist/ et son adresse renvoie vers l'accueil.
const redirections = {
  name: 'redirections',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const reglages = JSON.parse(await readFile(new URL('./data/reglages.json', import.meta.url), 'utf8'));
      const espaceProOuvert = lireEspacePro(reglages, process.env.ESPACE_PRO);
      const commandesPdtOuvertes = lireCommandesPdt(reglages, process.env.COMMANDE_PDT);
      if (!commandesPdtOuvertes) await rm(path.join(fileURLToPath(dir), 'pommes-de-terre'), { recursive: true, force: true });
      await writeFile(path.join(fileURLToPath(dir), '_redirects'), fichierRedirections({ espaceProOuvert, commandesPdtOuvertes }));
      console.log(`→ ${anciennesAdresses.length} anciennes adresses redirigées vers les nouvelles pages`);
      console.log(espaceProOuvert ? '→ Espace pro ouvert' : '→ Espace pro en veille : /pro/* renvoie vers /professionnels/');
      console.log(commandesPdtOuvertes ? '→ Commandes de pommes de terre ouvertes' : '→ Commandes de pommes de terre fermées : pas de page Pommes de terre, /pommes-de-terre/ renvoie vers l’accueil');
    },
  },
};

// Site statique : chaque page est un fichier HTML, sans JavaScript de framework.
// Adresse définitive : www.augrandjardin.fr (plan de passage : site-web/plan-bascule.md, README) ;
// en test, Cloudflare la sert sur *.pages.dev. SITE_URL (variable Cloudflare) la remplace si besoin.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.augrandjardin.fr',
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
  integrations: [typographie, redirections],
  devToolbar: { enabled: false },
});
