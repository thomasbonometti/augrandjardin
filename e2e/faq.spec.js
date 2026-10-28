// Questions fréquentes en bas des pages (base Notion « Questions fréquentes », instantané data/faq.json)
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const faq = JSON.parse(readFileSync(new URL('../data/faq.json', import.meta.url), 'utf8'));

// Page Pommes de terre : seulement pendant la période de commande (case « Commandes de pommes de terre
// ouvertes ») ; testée sur une construction ouverte (COMMANDE_PDT=ouverte, E2E_OUVERT=1).
const PDT = !!process.env.E2E_OUVERT;
const PAGES = [
  ['/', 'Accueil'],
  ['/produits/', 'Produits'],
  ['/pommes-de-terre/', 'Pommes de terre'],
  ['/professionnels/', 'Professionnels'],
  ['/horaires-contact/', 'Horaires & contact'],
  ['/la-ferme/', 'La ferme'],
].filter(([chemin]) => PDT || chemin !== '/pommes-de-terre/');

for (const [chemin, nom] of PAGES) {
  const attendues = faq.filter((q) => q.pages.includes(nom));
  test(`questions fréquentes ${chemin} : accordéon fermé au départ, s’ouvre au clic et au clavier`, async ({ page }) => {
    test.skip(!attendues.length, `aucune question publiée pour « ${nom} »`);
    await page.goto(chemin);
    const bloc = page.locator(`[data-faq="${nom}"]`);
    await expect(bloc.getByRole('heading', { level: 2 })).toBeVisible();
    const items = bloc.locator('details.faq__item');
    await expect(items).toHaveCount(attendues.length);
    await expect(items.first().locator('summary')).toHaveText(attendues.sort((a, b) => a.ordre - b.ordre)[0].question);
    // Fermé : la réponse n'est pas visible ; un clic l'ouvre, un second la referme
    const premier = items.first();
    await expect(premier.locator('.faq__reponse')).toBeHidden();
    await premier.locator('summary').click();
    await expect(premier.locator('.faq__reponse')).toBeVisible();
    await premier.locator('summary').click();
    await expect(premier.locator('.faq__reponse')).toBeHidden();
    // Au clavier
    await premier.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(premier).toHaveAttribute('open', '');
    // Données structurées FAQPage, une par page
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqPage = schemas.map((s) => JSON.parse(s)).filter((s) => s['@type'] === 'FAQPage');
    expect(faqPage).toHaveLength(1);
    expect(faqPage[0].mainEntity).toHaveLength(attendues.length);
  });
}
