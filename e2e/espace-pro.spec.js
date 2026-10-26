// Espace pro (lot 2) : connexion par e-mail et mot de passe, grille du pro (remise et paliers),
// commande, « Comme la semaine dernière », mode fermé. Les prix et la commande viennent de l'outil.
//   Sans outil local : seulement ce qui ne demande pas de compte (page sans prix, connexion refusée).
//   Avec l'outil simulé du dépôt brief (AGJ_FAKE=1 npm run dev, port 8787) et .dev.vars → AGJ_URL :
//   E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 npx playwright test e2e/espace-pro.spec.js
import { test, expect, request as pwRequest } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const OUTIL = process.env.AGJ_DEV_URL;
const LOCAL = !!(process.env.E2E_COMMANDE && OUTIL);

test('sans connexion : aucune grille, le formulaire de connexion ; mauvais mot de passe refusé', async ({ page, request }) => {
  const html = await (await request.get('/pro/tarifs/')).text();
  expect(html, 'la page statique ne contient aucun prix').not.toMatch(/\d+,\d{2}\s?€/);
  expect((await request.get('/api/agj/pro/grille')).status()).toBe(401);
  await page.goto('/pro/tarifs/');
  await expect(page.locator('[data-connexion]')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Espace professionnels');
  await expect(page.locator('[data-commande]')).toBeHidden();
  await page.goto('/professionnels/');
  await page.getByRole('link', { name: /J’ai déjà un accès/ }).click();
  await page.locator('#acces-email').fill('personne@exemple.fr');
  await page.locator('#acces-mdp').fill('pas-le-bon');
  await page.getByRole('button', { name: 'Voir mes prix' }).click();
  await expect(page.locator('#acces .message-form')).toContainText('E-mail ou mot de passe incorrect');
  await expect(page).toHaveURL(/\/professionnels\//);
});

test.describe('avec l’outil simulé', () => {
  test.skip(!LOCAL, 'outil simulé non fourni (E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787)');
  let outil;
  let acces;
  const pro = { etablissement: 'La Table du Moulin', contact: 'Claire Weber', email: 'cuisine@table-moulin.test', telephone: '06 11 22 33 44', adresse: '12 place du Marché, Sarrebourg' };

  test.beforeEach(async () => {
    outil = await pwRequest.newContext({ baseURL: OUTIL });
    await outil.post('/__dev/reset');
    await outil.post('/api/agj/login', { data: { password: 'pierre' } });
    const r = await outil.post('/api/agj/admin/pros/creer', { data: pro });
    expect(r.ok()).toBeTruthy();
    acces = await r.json();
  });
  test.afterEach(async () => { await outil.post('/__dev/settings', { data: { closed: false } }); await outil.dispose(); });

  async function connecter(page, { grille = true } = {}) {
    await page.goto('/professionnels/#acces');
    await page.locator('#acces-email').fill(pro.email);
    await page.locator('#acces-mdp').fill(acces.password);
    await page.getByRole('button', { name: 'Voir mes prix' }).click();
    await expect(page).toHaveURL(/\/pro\/tarifs\/$/);
    if (grille) await expect(page.locator('[data-commande]')).toBeVisible();
  }

  test('grille du pro, quantités et paliers, commande, modification', async ({ page }, info) => {
    await connecter(page);
    await page.evaluate(() => localStorage.clear());
    await expect(page.locator('h1')).toHaveText('Votre grille de la semaine');
    await expect(page.locator('[data-intro]')).toContainText('Bonjour La Table du Moulin');
    await expect(page.locator('[data-remise]')).toHaveText('5 %');
    await expect(page.locator('[data-paliers]')).toContainText('dès 5 kg');
    // Carotte 3,10 € TTC → 2,79 € HT avec 5 % ; 2,65 € dès 10 kg.
    const carotte = page.locator('.ligne-pro', { hasText: 'Carotte vrac' });
    await expect(carotte.locator('.lp__ht')).toContainText('2,79');
    const saisie = carotte.locator('[data-qte]');
    await saisie.fill('12');
    await saisie.press('Enter');
    await expect(carotte.locator('.palier--atteint').first()).toContainText('dès 10');
    const basilic = page.locator('.ligne-pro', { hasText: 'Basilic' });
    for (let i = 0; i < 3; i++) await basilic.getByRole('button', { name: /Ajouter 1 de Basilic/ }).click();
    await expect(basilic.locator('[data-qte]')).toHaveValue('3');
    // Demi-kilo permis, quart de kilo arrondi.
    const poireau = page.locator('.ligne-pro', { hasText: 'Poireau' });
    await poireau.locator('[data-qte]').fill('2,5');
    await poireau.locator('[data-qte]').press('Enter');
    await expect(poireau.locator('[data-qte]')).toHaveValue('2,5');
    await page.screenshot({ path: `e2e/resultats/pro-grille-${info.project.name}.png`, fullPage: true });

    // Envoi (sur téléphone, depuis la fenêtre du bas).
    if (info.project.name === 'telephone') {
      await expect(page.locator('[data-barre-resume]')).toContainText('3 produits');
      await page.getByRole('button', { name: 'Voir et envoyer' }).click();
      await expect(page.locator('dialog[open] [data-panneau]')).toBeVisible();
      await page.screenshot({ path: `e2e/resultats/pro-feuille-${info.project.name}.png` });
    }
    const panneau = page.locator('[data-panneau]');
    await expect(panneau.locator('.panneau__lignes li')).toHaveCount(3);
    await expect(panneau).toContainText('12 kg × 2,65 € (palier 10 kg)');
    await panneau.locator('[data-mot]').fill('Poireaux pas trop gros');
    await panneau.getByRole('button', { name: 'Envoyer la commande' }).click();
    await expect(panneau.locator('[data-etat]')).toContainText(/Commande envoyée \(PRO-1\)/);
    await expect(panneau.getByRole('button', { name: 'Mettre à jour la commande' })).toBeDisabled();
    const commandes = await (await outil.get('/__dev/repo')).json();
    expect(commandes.proOrders).toHaveLength(1);
    expect(commandes.proOrders[0].lines.find((l) => l.id === 'f-carotte').unitHtCents).toBe(265);
    expect(commandes.proOrders[0].mot).toBe('Poireaux pas trop gros');
    if (info.project.name === 'telephone') await panneau.getByRole('button', { name: 'Fermer' }).click();

    // Rechargement : la commande envoyée revient ; un changement la met à jour.
    await page.reload();
    await expect(page.locator('.ligne-pro', { hasText: 'Carotte vrac' }).locator('[data-qte]')).toHaveValue('12');
    await page.locator('.ligne-pro', { hasText: 'Carotte vrac' }).getByRole('button', { name: /Ajouter 1 kg de Carotte vrac/ }).click();
    if (info.project.name === 'telephone') await page.getByRole('button', { name: 'Voir et envoyer' }).click();
    await expect(panneau.locator('[data-etat]')).toContainText('pas encore envoyés');
    await panneau.getByRole('button', { name: 'Mettre à jour la commande' }).click();
    await expect(panneau.locator('[data-etat]')).toContainText('Commande mise à jour (PRO-1)');
    const apres = await (await outil.get('/__dev/repo')).json();
    expect(apres.proOrders).toHaveLength(1);
    expect(apres.proOrders[0].lines.find((l) => l.id === 'f-carotte').qty).toBe(13);
    const mails = await (await outil.get('/__dev/outbox')).json();
    expect(mails.length).toBeGreaterThan(0);
    expect(mails.every((m) => m.to === 'test@exemple.fr'), 'mails seulement vers l’adresse de test').toBeTruthy();
  });

  test('comme la semaine dernière, prévisions, déconnexion', async ({ page }) => {
    // Une commande pour le lundi précédent, rangée par l'outil simulé.
    const c = await pwRequest.newContext({ baseURL: OUTIL });
    await c.post('/api/agj/pro/login', { data: { email: pro.email, password: acces.password } });
    await c.post('/api/agj/pro/commande', { data: { ref: 'precedente', items: { 'f-carotte': 10, 'f-oignon': 5 } } });
    await c.dispose();
    const repo = await (await outil.get('/__dev/repo')).json();
    const id = repo.proOrders[0].id;
    // Déplace la commande d'une semaine en arrière (outil simulé).
    expect((await outil.post('/__dev/pro-commande', { data: { id, decalerJours: -7 } })).ok()).toBeTruthy();

    await connecter(page);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole('button', { name: 'Comme la semaine dernière' }).click();
    await expect(page.locator('[data-message]')).toContainText('Quantités reprises de votre commande du');
    await expect(page.locator('.ligne-pro', { hasText: 'Carotte vrac' }).locator('[data-qte]')).toHaveValue('10');
    await expect(page.locator('.ligne-pro', { hasText: 'Oignon jaune' }).locator('[data-qte]')).toHaveValue('5');
    await expect(page.locator('[data-previsions]')).toBeVisible();
    await expect(page.locator('[data-previsions]')).toContainText('Mâche');
    await page.getByRole('button', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL(/\/professionnels\/$/);
    expect((await page.request.get('/api/agj/pro/grille')).status()).toBe(401);
  });

  test('mode fermé : pas de grille, la date de reprise', async ({ page }) => {
    await outil.post('/__dev/settings', { data: { closed: true, reopensOn: '2027-01-09', message: '' } });
    await connecter(page, { grille: false });
    await expect(page.locator('[data-pause]')).toBeVisible();
    await expect(page.locator('[data-pause-titre]')).toContainText('Les commandes reprendront le');
    await expect(page.locator('[data-commande]')).toBeHidden();
  });

  test('accessibilité de la grille', async ({ page }) => {
    await connecter(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const graves = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(graves.map((v) => `${v.id} : ${v.help} (${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')})`)).toEqual([]);
  });
});
