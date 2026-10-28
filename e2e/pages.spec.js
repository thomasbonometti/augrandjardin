import { test, expect } from '@playwright/test';
import { anciennesAdresses } from '../src/data/redirections.js';

const PAGES = [
  ['/', /Des légumes bio cueillis à Lostroff/],
  ['/produits/', /Produits de la semaine/],
  ['/la-ferme/', /Pierre Fouquet, maraîcher bio à Lostroff/],
  ['/pommes-de-terre/', /Pommes de terre de garde/],
  ['/professionnels/', /Des légumes bio de Lostroff, livrés chaque semaine/],
  ['/horaires-contact/', /Venir à la ferme/],
  ['/calendrier-de-saison/', /Légumes de saison en Moselle/],
  ['/mentions-legales/', /Mentions légales/],
];

for (const [chemin, titre] of PAGES) {
  test(`page ${chemin} : s’affiche sans erreur ni débordement`, async ({ page }) => {
    const erreurs = [];
    page.on('pageerror', (e) => erreurs.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text()); });
    const rep = await page.goto(chemin);
    expect(rep.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(titre);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).toContain('Au Grand Jardin');
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
    // Pas de défilement horizontal
    const deborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(deborde).toBeLessThanOrEqual(0);
    // Toutes les images visibles sont chargées et ont un texte alternatif (vide si décoratives)
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    });
    const cassees = await page.evaluate(() => [...document.images].filter((i) => i.getClientRects().length && !i.naturalWidth).map((i) => i.currentSrc || i.src));
    expect(cassees).toEqual([]);
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    // La barre d'info annonce la prochaine vente, l'en-tête et le pied de page sont là
    await expect(page.locator('.barre-info')).toContainText(/Vente|vente/);
    await expect(page.locator('footer.pied')).toContainText('43 rue Principale');
    expect(erreurs).toEqual([]);
  });
}

test('liens internes : aucun lien cassé', async ({ page, request }) => {
  const vus = new Set();
  for (const [chemin] of PAGES) {
    await page.goto(chemin);
    const liens = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('#')[0]).filter(Boolean));
    liens.forEach((l) => vus.add(l));
  }
  for (const lien of vus) {
    const rep = await request.get(lien, { maxRedirects: 0 });
    expect([200, 302], `${lien} → ${rep.status()}`).toContain(rep.status());
  }
});

test('navigation : menu mobile ou barre de navigation', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const burger = page.getByRole('button', { name: 'Ouvrir le menu' });
    await expect(burger).toBeVisible();
    await expect(page.locator('.entete__nav')).toBeHidden();
    await burger.click();
    const menu = page.locator('#menu-mobile');
    await expect(menu).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('link', { name: /Produits de la semaine/ })).toBeVisible();
    await expect(menu).toContainText('Prochaine vente');
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await burger.click();
    await menu.getByRole('link', { name: 'La ferme', exact: true }).click();
    await expect(page).toHaveURL(/\/la-ferme\/$/);
    await expect(page.locator('#menu-mobile')).toBeHidden();
  } else {
    await expect(page.locator('.burger')).toBeHidden();
    await page.locator('.entete__nav').getByRole('link', { name: 'Pommes de terre' }).click();
    await expect(page).toHaveURL(/\/pommes-de-terre\/$/);
    await expect(page.locator('.entete__nav a[aria-current="page"]')).toHaveText('Pommes de terre');
  }
});

test('produits : les filtres par rayon masquent les autres rayons', async ({ page }) => {
  await page.goto('/produits/');
  const rayons = page.locator('section.rayon');
  const total = await rayons.count();
  expect(total).toBeGreaterThan(1);
  const filtre = page.locator('.filtre[data-filtre]:not([data-filtre=""])').first();
  const slug = await filtre.getAttribute('data-filtre');
  await filtre.click();
  await expect(page.locator(`section.rayon[data-rayon="${slug}"]`)).toBeVisible();
  await expect(page.locator('section.rayon:visible')).toHaveCount(1);
  await page.locator('.filtre[data-filtre=""]').click();
  await expect(page.locator('section.rayon:visible')).toHaveCount(total);
});

test('inscription SMS : numéro incomplet refusé', async ({ page }) => {
  test.skip(!process.env.E2E_OUVERT, 'inscription de côté : formulaire absent (voir e2e/de-cote.spec.js)');
  await page.goto('/');
  const form = page.locator('#sms form');
  await form.locator('input[type="tel"]').fill('06 12');
  await form.getByRole('button', { name: 'M’inscrire' }).click();
  await expect(form.locator('.message-form')).toContainText(/numéro/);
  await expect(form.locator('input[type="tel"]')).toHaveAttribute('aria-invalid', 'true');
});

test('inscription : WhatsApp par défaut, SMS au choix, canal envoyé (sans écrire dans Notion)', async ({ page }) => {
  test.skip(!process.env.E2E_OUVERT, 'inscription de côté : formulaire absent (voir e2e/de-cote.spec.js)');
  await page.goto('/produits/');
  const form = page.locator('#sms form');
  const whatsapp = form.getByRole('radio', { name: 'WhatsApp' });
  const sms = form.getByRole('radio', { name: 'SMS' });
  await expect(form.getByRole('group', { name: 'Recevoir la liste sur' })).toBeVisible();
  await expect(whatsapp).toBeChecked();
  await expect(sms).not.toBeChecked();
  let corps = null;
  await page.route('**/api/inscription-sms', async (route) => {
    corps = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true, message: 'C’est noté : la liste arrivera par SMS au 06 00 00 00 02.' } });
  });
  await form.locator('label.canal', { hasText: 'SMS' }).click();
  await expect(sms).toBeChecked();
  await form.locator('input[type="tel"]').fill('06 00 00 00 02');
  await form.getByRole('button', { name: 'M’inscrire' }).click();
  await expect(form.locator('.message-form')).toContainText('par SMS');
  expect(corps).toMatchObject({ canal: 'SMS', telephone: '06 00 00 00 02', source: 'produits' });
  // Après l'envoi, le formulaire revient à WhatsApp.
  await expect(whatsapp).toBeChecked();
});

test('inscription SMS : envoi (écrit dans Notion, seulement avec E2E_ECRIRE=1)', async ({ page }, info) => {
  test.skip(!process.env.E2E_OUVERT, 'inscription de côté : formulaire absent (voir e2e/de-cote.spec.js)');
  test.skip(!process.env.E2E_ECRIRE, 'écriture désactivée');
  test.skip(info.project.name !== 'telephone', 'une seule inscription suffit');
  await page.goto('/produits/');
  const form = page.locator('#sms form');
  await form.locator('input[type="tel"]').fill('06 00 00 00 01');
  await form.getByRole('button', { name: 'M’inscrire' }).click();
  await expect(form.locator('.message-form')).toContainText(/06 00 00 00 01/);
});

// Espace pro (connexion, grille, commande) : e2e/espace-pro.spec.js.

test('demande d’accès pro : champs obligatoires', async ({ page }) => {
  test.skip(!process.env.E2E_PRO, 'espace pro en veille : formulaire absent (voir e2e/pro-veille.spec.js)');
  await page.goto('/professionnels/');
  await page.getByRole('button', { name: 'Envoyer la demande' }).click();
  await expect(page.locator('#demande .message-form')).toContainText(/Vérifiez/);
  await expect(page.locator('#d-nom')).toHaveAttribute('aria-invalid', 'true');
});

test('référencement : données structurées de la ferme et plan du site', async ({ page, request }) => {
  await page.goto('/horaires-contact/');
  const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)));
  const ferme = ld.find((x) => x['@type'] === 'LocalBusiness');
  expect(ferme.address.addressLocality).toBe('Lostroff');
  expect(ferme.telephone).toBe('+33642424293');
  const plan = await request.get('/sitemap.xml');
  expect(plan.status()).toBe(200);
  expect(await plan.text()).toContain('/pommes-de-terre/');
  expect(await plan.text()).not.toContain('/pro/');
});

// Anciennes adresses du site d'avant 2026 (pages .html) : redirection définitive vers la nouvelle page.
for (const [ancienne, nouvelle] of anciennesAdresses) {
  test(`ancienne adresse ${ancienne} → ${nouvelle}`, async ({ request }) => {
    const rep = await request.get(`${ancienne}?src=qr`, { maxRedirects: 0 });
    expect(rep.status()).toBe(301);
    expect(new URL(rep.headers().location, 'http://x').pathname).toBe(nouvelle);
  });
}
