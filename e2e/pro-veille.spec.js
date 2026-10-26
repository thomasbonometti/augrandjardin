// Espace pro en veille jusqu'au printemps 2027 (revue de Pierre du 26/10/2026, case « Espace pro ouvert » décochée) :
// la page Professionnels propose de contacter Pierre, sans étapes ni formulaires, et /pro/* y renvoie.
// Avec une construction ESPACE_PRO=ouvert (E2E_PRO=1), ces tests sont ignorés : voir e2e/espace-pro.spec.js.
import { test, expect } from '@playwright/test';

test.skip(!!process.env.E2E_PRO, 'espace pro ouvert dans cette construction');

test('Professionnels : contacter Pierre en haut de page, sans espace en ligne', async ({ page }) => {
  await page.goto('/professionnels/');
  const encart = page.locator('[data-contact-pro]');
  await expect(encart).toBeVisible();
  await expect(encart).toContainText('contactez Pierre');
  await expect(encart.getByRole('link', { name: /06 42 42 42 93/ })).toHaveAttribute('href', 'tel:+33642424293');
  await expect(encart.getByRole('link', { name: 'Écrire à Pierre' })).toHaveAttribute('href', /^mailto:pierre@augrandjardin\.fr/);
  // L'encart est dans le premier écran
  const boite = await encart.boundingBox();
  expect(boite.y).toBeLessThan(page.viewportSize().height * 1.6);
  await expect(page.getByRole('heading', { name: 'Ils cuisinent nos légumes' })).toBeVisible();
  await expect(page.locator('#demande, #acces')).toHaveCount(0);
  await expect(page.getByText('Comment ça marche')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Demander un accès' })).toHaveCount(0);
});

test('/pro/tarifs/ renvoie vers la page Professionnels', async ({ page }) => {
  await page.goto('/pro/tarifs/');
  await page.waitForURL(/\/professionnels\/$/, { timeout: 10_000 });
  await expect(page.locator('[data-contact-pro]')).toBeVisible();
});
