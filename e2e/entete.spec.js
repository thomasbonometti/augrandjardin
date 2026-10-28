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

// Feuille du logo (Thomas, 28/10/2026) : un balancement complet au survol ou au focus clavier, rien sans animations.
const feuille = (page) => page.evaluate(() => ({
  classe: document.querySelector('.entete__logo').classList.contains('feuille-au-vent'),
  anims: document.getAnimations().filter((a) => a.animationName === 'feuille-au-vent').length,
}));

test('feuille du logo : se balance au survol, va jusqu’au bout, puis se repose', async ({ page }) => {
  await page.goto('/');
  const logo = page.locator('.entete__logo');
  await expect(logo.locator('.logo__feuille path')).toHaveCount(1);
  await logo.hover();
  expect(await feuille(page)).toEqual({ classe: true, anims: 1 });
  // La souris s'en va tout de suite : le balancement continue jusqu'au bout au lieu de sauter.
  await page.mouse.move(700, 600);
  await page.waitForTimeout(200);
  expect(await feuille(page)).toEqual({ classe: true, anims: 1 });
  await expect.poll(() => feuille(page), { timeout: 3000 }).toEqual({ classe: false, anims: 0 });
});

test('feuille du logo : se balance aussi au focus clavier', async ({ page }, info) => {
  test.skip(info.project.name === 'telephone', 'au clavier, sur ordinateur');
  await page.goto('/');
  for (let i = 0; i < 6 && !(await page.locator('.entete__logo').evaluate((l) => l === document.activeElement)); i++) await page.keyboard.press('Tab');
  await expect(page.locator('.entete__logo')).toBeFocused();
  expect((await feuille(page)).classe).toBe(true);
});

test.describe('feuille du logo, animations refusées', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  test('rien ne bouge au survol', async ({ page }) => {
    await page.goto('/');
    await page.locator('.entete__logo').hover();
    expect(await feuille(page)).toEqual({ classe: false, anims: 0 });
  });
});
