// Commande de pommes de terre depuis le site, vers l'outil de commande (mode test : commandes « Test »,
// mails seulement vers hey@thomasbonometti.fr).
import { test, expect } from '@playwright/test';

// Commande en ligne gardée de côté (case « Commande de pommes de terre en ligne » décochée) : ces tests
// tournent sur une construction ouverte (COMMANDE_PDT=ouverte, E2E_OUVERT=1). Sinon : e2e/de-cote.spec.js.
test.skip(!process.env.E2E_OUVERT, 'commande en ligne de côté : construire avec COMMANDE_PDT=ouverte et lancer avec E2E_OUVERT=1');

const ECRIRE = !!process.env.E2E_COMMANDE;
const OUTIL_LOCAL = process.env.AGJ_DEV_URL; // outil simulé du dépôt brief (http://localhost:8787)

test.beforeEach(async ({ page }) => {
  await page.goto('/pommes-de-terre/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('#commande')).toBeVisible();
});

test('catalogue réel affiché, non trié en tête, mode test signalé', async ({ page }) => {
  const categories = page.locator('.categorie__titre');
  await expect(categories.first()).toBeVisible();
  const noms = await categories.allInnerTexts();
  if (noms.some((n) => /non tri/i.test(n))) {
    expect(noms[0]).toMatch(/non tri/i);
    await expect(page.locator('.categorie--non-trie .categorie__intro')).toBeVisible();
    await expect(page.locator('.categorie--non-trie')).toContainText('/kg');
  }
  await expect(page.locator('.format').first()).toBeVisible();
  // Pas de sacs de 15/25 kg de la maquette ni de jour de retrait à choisir sur cette page
  await expect(page.locator('body')).not.toContainText('Un jour de retrait préféré');
  await expect(page.locator('.etapes')).toContainText('choisir votre créneau de retrait');
  const live = await page.evaluate(() => fetch('/api/agj/catalog').then((r) => r.json()).then((d) => d.live));
  if (!live) await expect(page.locator('[data-bandeau-test]')).toBeVisible();
});

test('panier : quantités, total, avertissements, panier gardé au rechargement', async ({ page }) => {
  const premier = page.locator('.format:not(.format--epuise)').first();
  await premier.getByRole('button', { name: /Ajouter un/ }).click();
  await premier.getByRole('button', { name: /Ajouter un/ }).click();
  await expect(premier.locator('output')).toHaveText('2');
  await expect(page.locator('[data-recap-lignes] .recap__ligne')).toHaveCount(1);
  const total = await page.locator('[data-total]').innerText();
  expect(total).not.toBe('0,00 €');
  await premier.getByRole('button', { name: /Enlever un/ }).click();
  await expect(premier.locator('output')).toHaveText('1');
  await page.reload();
  await expect(page.locator('.format:not(.format--epuise)').first().locator('output')).toHaveText('1');
  await expect(page.locator('[data-recap-lignes] .recap__ligne')).toHaveCount(1);
});

test('validation : panier vide puis coordonnées manquantes', async ({ page }) => {
  await page.getByRole('button', { name: 'Commander' }).click();
  await expect(page.locator('[data-erreur-envoi]')).toContainText('Choisissez au moins un produit');
  await page.locator('.format:not(.format--epuise)').first().getByRole('button', { name: /Ajouter un/ }).click();
  await page.getByRole('button', { name: 'Commander' }).click();
  await expect(page.locator('#prenom')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#prenom')).toBeFocused();
  await page.fill('#prenom', 'Test');
  await page.fill('#nom', 'Site');
  await page.fill('#email', 'pas-un-mail');
  await page.fill('#telephone', '06 00');
  await page.getByRole('button', { name: 'Commander' }).click();
  await expect(page.locator('[data-erreur="email"]')).toContainText('e-mail');
  await expect(page.locator('[data-erreur="telephone"]')).toContainText('téléphone');
  await expect(page.locator('[data-fin]')).toBeHidden();
});

test('commande de bout en bout (écrit dans l’outil : E2E_COMMANDE=1)', async ({ page, request }, info) => {
  test.skip(!ECRIRE, 'commande désactivée (E2E_COMMANDE=1 pour l’activer)');
  // Plusieurs filets pour déclencher les avertissements quand il y a du non trié
  const formats = page.locator('.format:not(.format--epuise)');
  await formats.nth(0).getByRole('button', { name: /Ajouter un/ }).click();
  await formats.nth(1).getByRole('button', { name: /Ajouter un/ }).click();
  const totalAffiche = await page.locator('[data-total]').innerText();
  await page.fill('#prenom', 'Test');
  await page.fill('#nom', `Site ${info.project.name}`);
  await page.fill('#email', 'hey@thomasbonometti.fr');
  await page.fill('#telephone', '06 00 00 00 00');
  await page.fill('#commentaire', 'Commande de test du nouveau site (à archiver)');
  await page.getByRole('button', { name: 'Commander' }).click();
  const fin = page.locator('[data-fin]');
  await expect(fin).toBeVisible({ timeout: 20_000 });
  await expect(fin).toBeFocused();
  await expect(page.locator('[data-fin-numero]')).toContainText(/Commande AGJ-\d+/);
  await expect(page.locator('[data-fin-numero]')).toContainText(totalAffiche);
  await expect(page.locator('[data-fin-bon]')).toHaveAttribute('href', /\/agj\/bon\/\?c=.+&t=.+/);
  await expect(page.locator('#commande')).toBeHidden();
  // Le panier est vidé pour une prochaine commande
  await page.getByRole('button', { name: 'Passer une autre commande' }).click();
  await expect(page.locator('[data-recap-lignes] .recap__ligne')).toHaveCount(0);
  if (OUTIL_LOCAL) {
    const boite = await (await request.get(`${OUTIL_LOCAL}/__dev/outbox`)).json();
    const sujets = (Array.isArray(boite) ? boite : boite.mails || []).map((m) => m.subject);
    expect(sujets.some((s) => /TEST → .*Votre commande AGJ-\d+/.test(s))).toBe(true);
    expect(sujets.some((s) => /Nouvelle commande AGJ-\d+/.test(s))).toBe(true);
  }
});
