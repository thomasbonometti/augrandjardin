// Fonctions gardées de côté (décision de Thomas du 28/10/2026, cases de « Réglages du site » décochées) :
// commande de pommes de terre en ligne (→ par téléphone) et inscription à la liste (→ « demandez-la à Pierre »).
// Sur une construction ouverte (COMMANDE_PDT=ouverte, INSCRIPTION_LISTE=ouverte, E2E_OUVERT=1), ces tests
// sont sautés et ce sont commande.spec.js et les tests d'inscription de pages.spec.js qui tournent.
import { test, expect } from '@playwright/test';

test.skip(!!process.env.E2E_OUVERT, 'construction ouverte : voir commande.spec.js et pages.spec.js');

for (const chemin of ['/', '/produits/', '/calendrier-de-saison/']) {
  test(`liste de la semaine : pas de formulaire, renvoi vers Pierre (${chemin})`, async ({ page }) => {
    await page.goto(chemin);
    const bloc = page.locator('#sms');
    await expect(bloc.locator('form')).toHaveCount(0);
    await expect(bloc.locator('[data-liste-pierre]')).toContainText('demandez-la à Pierre');
    await expect(bloc.getByRole('link', { name: /06\s42\s42\s42\s93/ })).toHaveAttribute('href', 'tel:+33642424293');
  });
}

test('pommes de terre : commandes par téléphone, sans formulaire ni étapes en ligne', async ({ page }) => {
  page.on('pageerror', (e) => { throw e; });
  await page.goto('/pommes-de-terre/');
  await expect(page.locator('[data-statut]')).toHaveText('Commandes par téléphone');
  await expect(page.locator('[data-fermee-titre]')).toHaveText('Commandes par téléphone pour le moment');
  await expect(page.locator('[data-fermee-texte]')).toContainText(/Appelez Pierre au 06\s42\s42\s42\s93/);
  await expect(page.getByRole('link', { name: 'Appeler Pierre' })).toHaveAttribute('href', 'tel:+33642424293');
  // Le script relit le catalogue en direct : il ne doit pas rouvrir le formulaire.
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#commande')).toBeHidden();
  await expect(page.locator('[data-statut]')).toHaveText('Commandes par téléphone');
  await expect(page.locator('.etapes')).toHaveCount(0);
  await expect(page.locator('[data-bandeau-test]')).toBeHidden();
  await expect(page).toHaveTitle(/^Pommes de terre de garde en filets/);
});

test('accueil : la carte Pommes de terre annonce le téléphone', async ({ page }) => {
  await page.goto('/');
  const carte = page.locator('a.facon[href="/pommes-de-terre/"]');
  await expect(carte.locator('.facon__chip')).toHaveText('Par téléphone');
  await expect(carte).not.toContainText('en ligne');
});
