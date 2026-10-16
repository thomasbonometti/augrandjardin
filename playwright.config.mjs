// Tests navigateur, profils téléphone et ordinateur.
//   En local : outil de commande simulé (dépôt brief : AGJ_FAKE=1 npm run dev) puis npm run preview,
//   et  E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 npm run e2e
//   Sur l'adresse de test : BASE_URL=https://agj-site-2026.pages.dev npm run e2e
//   (la commande de bout en bout et les formulaires n'écrivent rien sans E2E_COMMANDE=1 / E2E_ECRIRE=1)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8789',
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    screenshot: 'only-on-failure',
  },
  outputDir: 'e2e/resultats',
  projects: [
    { name: 'telephone', use: { ...devices['Pixel 7'] } },
    { name: 'ordinateur', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
