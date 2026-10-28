// Fonctions qu'une case de « Réglages du site » met de côté (décision de Thomas du 28/10/2026) :
// page Pommes de terre hors de la période de commande (→ pas de page du tout) et inscription à la liste
// (→ « demandez-la à Pierre »). Chaque groupe ne tourne que si sa case est décochée (voir e2e/etat.js) ;
// case cochée, ce sont commande.spec.js et les tests d'inscription de pages.spec.js qui tournent.
import { test, expect } from '@playwright/test';
import { PDT, INSCRIPTION } from './etat.js';

test.describe('inscription à la liste de côté', () => {
  test.skip(INSCRIPTION, 'inscription ouverte : voir les tests d’inscription de pages.spec.js');

  for (const chemin of ['/', '/produits/', '/calendrier-de-saison/']) {
    test(`liste de la semaine : pas de formulaire, renvoi vers Pierre (${chemin})`, async ({ page }) => {
      await page.goto(chemin);
      const bloc = page.locator('#sms');
      await expect(bloc.locator('form')).toHaveCount(0);
      await expect(bloc.locator('[data-liste-pierre]')).toContainText('demandez-la à Pierre');
      await expect(bloc.getByRole('link', { name: /06\s42\s42\s42\s93/ })).toHaveAttribute('href', 'tel:+33642424293');
    });
  }
});

test.describe('pommes de terre hors période de commande', () => {
  test.skip(PDT, 'commandes ouvertes : voir commande.spec.js');

  test('pommes de terre hors période de commande : pas de page, l’adresse renvoie vers l’accueil', async ({ page, request }) => {
    const rep = await request.get('/pommes-de-terre/', { maxRedirects: 0 });
    expect(rep.status()).toBe(302);
    expect(new URL(rep.headers().location, 'http://x').pathname).toBe('/');
    await page.goto('/pommes-de-terre/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toHaveText(/Des légumes bio cueillis à Lostroff/);
  });

  test('pommes de terre hors période : aucun lien, ni dans le menu, ni sur l’accueil, ni dans le plan du site', async ({ page, request }) => {
    for (const chemin of ['/', '/produits/', '/horaires-contact/', '/professionnels/']) {
      await page.goto(chemin);
      await expect(page.locator('a[href^="/pommes-de-terre"]'), chemin).toHaveCount(0);
    }
    await page.goto('/');
    await expect(page.locator('#facons-titre')).toHaveText('Trois façons de manger nos légumes');
    await expect(page.locator('a.facon')).toHaveCount(3);
    const plan = await (await request.get('/sitemap.xml')).text();
    expect(plan).not.toContain('/pommes-de-terre/');
    expect(plan).toContain('/produits/');
  });
});
