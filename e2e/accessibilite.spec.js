// Accessibilité (axe-core, règles WCAG 2.1 A et AA) sur chaque page
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Contrôle de l'état final des pages : sans les apparitions au défilement (testées dans animations.spec.js).
test.use({ contextOptions: { reducedMotion: 'reduce' } });

// Page Pommes de terre : seulement pendant la période de commande (case « Commandes de pommes de terre
// ouvertes ») ; testée sur une construction ouverte (COMMANDE_PDT=ouverte, E2E_OUVERT=1).
const PDT = !!process.env.E2E_OUVERT;
const PAGES = ['/', '/produits/', '/la-ferme/', '/pommes-de-terre/', '/professionnels/', '/horaires-contact/', '/calendrier-de-saison/', '/mentions-legales/', '/pro/tarifs/']
  .filter((chemin) => PDT || chemin !== '/pommes-de-terre/');

for (const chemin of PAGES) {
  test(`accessibilité ${chemin}`, async ({ page }) => {
    await page.goto(chemin);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(graves.map((v) => `${v.id} : ${v.help} (${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')})`)).toEqual([]);
  });
}
