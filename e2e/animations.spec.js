// Apparitions au défilement (GSAP) : rien ne reste masqué, et rien ne bouge pour qui refuse les animations.
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/produits/', '/la-ferme/', '/pommes-de-terre/', '/professionnels/', '/horaires-contact/'];
const masques = () => [...document.querySelectorAll('[data-anim], [data-anim-groupe] > *')]
  .filter((e) => e.getClientRects().length && parseFloat(getComputedStyle(e).opacity) < 0.85)
  .map((e) => `${e.tagName.toLowerCase()} ${(e.textContent || '').trim().slice(0, 40)}`);

for (const chemin of PAGES) {
  test(`animations ${chemin} : tout apparaît en descendant la page`, async ({ page }) => {
    const erreurs = [];
    page.on('pageerror', (e) => erreurs.push(e.message));
    await page.goto(chemin, { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveClass(/anime-pret/);
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
    });
    await expect.poll(() => page.evaluate(masques), { timeout: 6000 }).toEqual([]);
    expect(erreurs).toEqual([]);
  });
}

test.describe('animations refusées', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  test('tout est visible au chargement et GSAP n’est pas téléchargé', async ({ page }) => {
    const scripts = [];
    page.on('request', (r) => { if (r.resourceType() === 'script') scripts.push(r.url()); });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).not.toHaveClass(/anime/);
    expect(await page.evaluate(masques)).toEqual([]);
    expect(scripts.filter((u) => /animer/.test(u))).toEqual([]);
  });
});
