// Accueil : bande vidéo (boucle de 11 s, sans son) et icônes des cartes des engagements (Thomas, 28/10/2026).
import { test, expect } from '@playwright/test';

const etatVideo = (page) => page.evaluate(() => {
  const bande = document.querySelector('[data-video-accueil]');
  const v = bande.querySelector('video');
  const b = bande.querySelector('[data-video-pause]');
  return { src: v.currentSrc || v.getAttribute('src') || '', paused: v.paused, lue: bande.classList.contains('video-lue'), bouton: !b.hidden, label: b.getAttribute('aria-label') };
});

test('vidéo de l’accueil : se charge à l’approche, la bonne taille, en boucle, sans son, avec un bouton pause', async ({ page }, info) => {
  await page.goto('/');
  const bande = page.locator('[data-video-accueil]');
  // L'image fixe est là d'emblée (et reste seule sans vidéo).
  await expect(bande.locator('img')).toHaveAttribute('alt', /tunnels de la ferme/);
  const video = bande.locator('video');
  await expect(video).toHaveJSProperty('muted', true);
  await expect(video).toHaveJSProperty('loop', true);
  await expect(video).toHaveAttribute('preload', 'none');
  await bande.scrollIntoViewIfNeeded();
  const lisible = await video.evaluate((v) => v.canPlayType('video/mp4; codecs="avc1.640028"') !== '');
  test.skip(!lisible, 'ce navigateur ne lit pas le H.264 : l’image fixe reste (comportement voulu)');
  await expect.poll(async () => (await etatVideo(page)).lue, { timeout: 15_000 }).toBe(true);
  const taille = info.project.name === 'telephone' ? 'tel' : 'ordi';
  expect((await etatVideo(page)).src).toMatch(new RegExp(`/videos/accueil-\\d{4}-\\d{2}-${taille}\\.mp4$`));

  const bouton = page.getByRole('button', { name: 'Mettre la vidéo en pause' });
  await expect(bouton).toBeVisible();
  await bouton.click();
  await expect(page.getByRole('button', { name: 'Lire la vidéo' })).toBeVisible();
  expect((await etatVideo(page)).paused).toBe(true);
  // La pause demandée tient, même si l'on sort de l'écran et que l'on revient.
  await page.locator('footer').scrollIntoViewIfNeeded();
  await bande.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  expect((await etatVideo(page)).paused).toBe(true);
  await page.getByRole('button', { name: 'Lire la vidéo' }).click();
  await expect.poll(async () => (await etatVideo(page)).paused).toBe(false);
});

test.describe('sans animations', () => {
  test.use({ reducedMotion: 'reduce' });
  test('vidéo de l’accueil : rien ne se charge pour qui refuse les animations', async ({ page }) => {
    await page.goto('/');
    const bande = page.locator('[data-video-accueil]');
    await bande.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const etat = await etatVideo(page);
    expect(etat.src).toBe('');
    expect(etat.bouton).toBe(false);
    await expect(bande.locator('img')).toBeVisible();
  });
});

test('cartes des engagements : une icône décorative par carte, entière une fois apparue', async ({ page }) => {
  await page.goto('/');
  const cartes = page.locator('.cartes-douces li');
  await expect(cartes).toHaveCount(4);
  await cartes.first().scrollIntoViewIfNeeded();
  for (let i = 0; i < 4; i++) {
    const ico = cartes.nth(i).locator('svg.carte__ico');
    await expect(ico).toHaveAttribute('aria-hidden', 'true');
    await expect(ico).toBeVisible();
  }
  // Le tracé se termine : plus aucun trait en pointillés.
  await expect.poll(() => page.locator('.cartes-douces .t[stroke-dashoffset]').count(), { timeout: 6000 }).toBe(0);
  await expect(page.locator('.cartes-douces .carte--coccinelle .point')).toHaveCount(4);
});
