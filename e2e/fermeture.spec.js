// Mode fermé et message de la semaine (Notion « Réglages du site »).
// À lancer sur une construction faite par scripts/construire-ferme.mjs (voir l'en-tête de ce script) :
//   E2E_FERME=1 BASE_URL=http://localhost:8790 npx playwright test e2e/fermeture.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.skip(!process.env.E2E_FERME, 'mode fermé : seulement sur la construction dist-ferme (E2E_FERME=1)');

test('barre verte : date de reprise, et message de la semaine en dessous', async ({ page }) => {
  await page.goto('/la-ferme/');
  await expect(page.locator('.barre-info')).toContainText(/en pause/i);
  await expect(page.locator('.barre-info')).toContainText(/reprise le/i);
  const annonce = page.getByRole('complementary', { name: 'Message de la semaine' });
  await expect(annonce).toBeVisible();
  await expect(annonce).toContainText('marché de Noël');
  await expect(page.locator('footer.pied')).toContainText('Ventes en pause');
  // L'en-tête vient se coller sous la barre verte, le message défile avec la page
  await page.mouse.wheel(0, 900);
  await expect.poll(async () => page.locator('.annonce').evaluate((el) => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(50);
});

test('produits : la liste est remplacée par le message de fermeture', async ({ page }) => {
  await page.goto('/produits/');
  await expect(page.locator('h1')).toHaveText('Produits de la semaine');
  await expect(page.locator('section.rayon')).toHaveCount(0);
  await expect(page.locator('.filtres')).toHaveCount(0);
  await expect(page.locator('[data-fermeture]')).toContainText('la ferme fait une pause');
  await expect(page.locator('[data-fermeture]')).toContainText(/Reprise le/);
});

test('accueil : pas de produits de la semaine, bouton pour être prévenu', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.semaine--pause')).toBeVisible();
  await expect(page.locator('.vedette')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Être prévenu de la reprise' })).toHaveAttribute('href', '#sms');
  await expect(page.locator('.stats')).toContainText('reprise des ventes');
});

test('pommes de terre : commande fermée, même quand l’outil répond « ouvert »', async ({ page }) => {
  const catalogue = page.waitForResponse((r) => r.url().includes('/api/agj/catalog')).catch(() => null);
  await page.goto('/pommes-de-terre/');
  await catalogue;
  await page.waitForTimeout(500);
  await expect(page.locator('#commande')).toBeHidden();
  await expect(page.locator('[data-fermee]')).toBeVisible();
  await expect(page.locator('[data-fermee-titre]')).toContainText(/Les commandes reprendront le/);
  await expect(page.locator('[data-statut]')).toHaveText('Commandes fermées pour le moment');
});

test('horaires : pas de prochaine vente ni de lieu « cette semaine », pas d’horaires dans les données structurées', async ({ page }) => {
  await page.goto('/horaires-contact/');
  await expect(page.locator('.vente')).toContainText('Ventes en pause');
  await expect(page.locator('.lieu__etat')).toHaveCount(0);
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((s) => JSON.parse(s));
  const ferme = schemas.find((s) => s['@type'] === 'LocalBusiness');
  expect(ferme).toBeTruthy();
  expect(ferme.openingHoursSpecification).toBeUndefined();
});

test('espace pro : pas de grille, la date de reprise à la place', async ({ page }) => {
  test.skip(!process.env.E2E_PRO_PASSWORD, 'mot de passe pro non fourni (E2E_PRO_PASSWORD)');
  await page.goto('/professionnels/');
  await page.getByLabel('Mot de passe').fill(process.env.E2E_PRO_PASSWORD);
  await page.getByRole('button', { name: 'Voir la grille tarifaire' }).click();
  await expect(page).toHaveURL(/\/pro\/tarifs\/$/);
  await expect(page.locator('table.grille')).toHaveCount(0);
  await expect(page.locator('[data-fermeture]')).toContainText(/Pas de grille en ce moment, reprise le/);
  await expect(page.locator('.tete__actions').getByRole('link', { name: /Appeler/ })).toBeVisible();
});

test.describe('accessibilité en mode fermé', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  for (const chemin of ['/', '/produits/', '/pommes-de-terre/', '/horaires-contact/']) {
    test(`axe ${chemin}`, async ({ page }) => {
      await page.goto(chemin);
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const graves = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
      expect(graves.map((v) => `${v.id} : ${v.help} (${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')})`)).toEqual([]);
    });
  }
});
