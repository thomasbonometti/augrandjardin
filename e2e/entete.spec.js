// En-tête collant : la barre verte reste en haut, le menu se cache en descendant et revient en remontant.
import { test, expect } from '@playwright/test';

const defiler = (page, y) => page.evaluate(async (cible) => {
  const pas = cible > scrollY ? 120 : -120;
  while (Math.abs(cible - scrollY) > Math.abs(pas)) { window.scrollBy(0, pas); await new Promise((r) => setTimeout(r, 30)); }
  window.scrollTo(0, cible);
  await new Promise((r) => setTimeout(r, 400));
}, y);

test('barre verte toujours visible, menu caché en descendant, de retour en remontant', async ({ page }) => {
  await page.goto('/produits/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/entete-cache/);
  await defiler(page, 1600);
  await expect(html).toHaveClass(/entete-cache/);
  expect((await page.locator('.barre-info').boundingBox()).y).toBe(0);
  await expect(page.locator('.barre-info')).toContainText(/vente/i);
  await defiler(page, 1300);
  await expect(html).not.toHaveClass(/entete-cache/);
  const barre = await page.locator('.barre-info').boundingBox();
  const entete = await page.locator('.entete').boundingBox();
  expect(barre.y).toBe(0);
  expect(Math.round(entete.y)).toBe(Math.round(barre.height));
  await defiler(page, 0);
  await expect(html).not.toHaveClass(/entete-cache/);
});

test('un saut vers une ancre de la page ne fait pas réapparaître le menu par-dessus la cible', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.facon[href="#sms"]').click();
  await page.waitForTimeout(900);
  const titre = await page.locator('#sms-titre').boundingBox();
  const barre = await page.locator('.barre-info').boundingBox();
  expect(titre.y).toBeGreaterThan(barre.height);
});
