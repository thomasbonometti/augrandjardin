import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://augrandjardin.fr',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Une page = un fichier .html, styles intégrés à la page :
    // le site tient sans aucune dépendance externe et s'héberge n'importe où.
    format: 'file',
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});
