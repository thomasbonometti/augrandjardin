import { defineConfig } from 'astro/config';

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
  devToolbar: { enabled: false },
});
