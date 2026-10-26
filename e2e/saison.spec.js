// Lot 3 : panneau produit (page Produits) et calendrier de saison
import { test, expect } from '@playwright/test';

test.describe('panneau produit', () => {
  test('s’ouvre depuis la carte, suit l’adresse, se ferme par Échap et rend le focus', async ({ page }) => {
    const erreurs = [];
    page.on('pageerror', (e) => erreurs.push(e.message));
    await page.goto('/produits/');
    const lien = page.locator('.carte-produit__lien').first();
    const nom = (await lien.textContent()).trim();
    const ancre = (await lien.getAttribute('href')).slice(1);
    await lien.click();
    const panneau = page.locator(`dialog#${ancre}`);
    await expect(panneau).toHaveAttribute('open', '');
    await expect(panneau.getByRole('heading', { level: 2 })).toHaveText(nom);
    expect(new URL(page.url()).hash).toBe(`#${ancre}`);
    await page.keyboard.press('Escape');
    await expect(panneau).not.toHaveAttribute('open', '');
    await expect.poll(() => new URL(page.url()).hash).toBe('');
    await expect(lien).toBeFocused();
    expect(erreurs).toEqual([]);
  });

  test('« Retour » du navigateur ferme le panneau ; la croix aussi', async ({ page }) => {
    await page.goto('/produits/');
    const lien = page.locator('.carte-produit__lien').nth(1);
    const ancre = (await lien.getAttribute('href')).slice(1);
    const panneau = page.locator(`dialog#${ancre}`);
    await lien.click();
    await expect(panneau).toHaveAttribute('open', '');
    await page.goBack();
    await expect(panneau).not.toHaveAttribute('open', '');
    expect(new URL(page.url()).pathname).toBe('/produits/');
    await lien.click();
    await panneau.getByRole('button', { name: 'Fermer' }).click();
    await expect(panneau).not.toHaveAttribute('open', '');
    await expect.poll(() => new URL(page.url()).hash).toBe('');
  });

  test('une adresse partagée (#ancre) ouvre directement le panneau', async ({ page }) => {
    await page.goto('/produits/');
    const ancre = (await page.locator('.carte-produit__lien').last().getAttribute('href')).slice(1);
    await page.goto(`/produits/#${ancre}`);
    await expect(page.locator(`dialog#${ancre}`)).toHaveAttribute('open', '');
    // Sans historique propre au panneau, la fermeture garde l'utilisateur sur la page
    await page.keyboard.press('Escape');
    await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).hash).toBe('/produits/');
  });

  test('le lien « Voir le calendrier de saison » mène à la ligne du légume', async ({ page }) => {
    await page.goto('/produits/');
    const lienSaison = page.locator('dialog[data-panneau] .panneau__lien').first();
    test.skip(!(await lienSaison.count()), 'Aucun produit avec des mois de récolte');
    const href = await lienSaison.getAttribute('href');
    expect(href).toMatch(/^\/calendrier-de-saison\/#[a-z0-9-]+$/);
    await page.goto(href);
    await expect(page.locator(`#${href.split('#')[1]}.cal-ligne`)).toBeVisible();
  });
});

test.describe('calendrier de saison', () => {
  test('les lignes « En vente » ouvrent un panneau qui existe', async ({ page }) => {
    await page.goto('/calendrier-de-saison/');
    const liens = await page.$$eval('.cal-ligne__lien', (as) => as.map((a) => a.getAttribute('href')));
    test.skip(!liens.length, 'Aucun légume en vente (mode fermé ?)');
    await page.goto('/produits/');
    const panneaux = await page.$$eval('dialog[data-panneau]', (ds) => ds.map((d) => `/produits/#${d.id}`));
    for (const l of liens) expect(panneaux, l).toContain(l);
    await page.goto('/calendrier-de-saison/');
    await page.locator('.cal-ligne__lien').first().click();
    await expect(page).toHaveURL(/\/produits\/#/);
    await expect(page.locator('dialog[data-panneau][open]')).toHaveCount(1);
  });

  test('filtres : par groupe et « En vente cette semaine »', async ({ page }) => {
    await page.goto('/calendrier-de-saison/');
    const groupes = page.locator('[data-groupe]');
    const nbGroupes = await groupes.count();
    expect(nbGroupes).toBeGreaterThan(0);
    // Un groupe seul
    const premier = page.locator('a.cal-filtre[data-filtre]:not([data-filtre=""])').first();
    await premier.click();
    await expect(premier).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('[data-groupe]:visible')).toHaveCount(1);
    // Retour à tout
    await page.locator('a.cal-filtre[data-filtre=""]').click();
    await expect(page.locator('[data-groupe]:visible')).toHaveCount(nbGroupes);
    // En vente seulement
    const enVente = page.locator('[data-en-vente-filtre]');
    if (await enVente.count()) {
      await enVente.click();
      await expect(enVente).toHaveAttribute('aria-pressed', 'true');
      const sansVente = await page.locator('.cal-ligne:not([data-en-vente]):visible').count();
      expect(sansVente).toBe(0);
      await enVente.click();
      await expect(enVente).toHaveAttribute('aria-pressed', 'false');
    }
  });

  test('chaque ligne dit en toutes lettres les mois de récolte', async ({ page }) => {
    await page.goto('/calendrier-de-saison/');
    const textes = await page.$$eval('.cal-ligne .visually-hidden', (s) => s.map((x) => x.textContent.trim()));
    expect(textes.length).toBeGreaterThan(0);
    for (const t of textes) expect(t).toMatch(/récolte (de|en|toute)/);
  });
});
