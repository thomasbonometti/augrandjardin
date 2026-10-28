// Réglages du site (mode fermé, message de la semaine), questions fréquentes, historique des listes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lireFermeture, lireAnnonce, texteReprise, reponseHtml, reponseTexte, questionsPour, schemaFaq, MESSAGE_FERMETURE } from '../src/lib/reglages.js';
import { semaineIso, horodatageParis, ligneProduit, contenuListe, morceauxTexte } from '../src/lib/historique.js';

const MARDI = new Date('2026-11-17T10:00:00+01:00');

test('mode fermé : fermé jusqu’à la reprise, qui rouvre le site toute seule', () => {
  assert.equal(lireFermeture({ ferme: false, repriseLe: '2027-03-06' }, MARDI), null, 'case décochée : ouvert');
  const f = lireFermeture({ ferme: true, repriseLe: '2027-03-06', messageFermeture: '  Bonne pause !  ' }, MARDI);
  assert.equal(f.reprise, '2027-03-06');
  assert.equal(f.repriseLong, 'samedi 6 mars');
  assert.equal(f.repriseCourt, 'sam. 6 mars');
  assert.equal(f.repriseChiffre, '6 mars');
  assert.equal(f.message, 'Bonne pause !');
  assert.equal(texteReprise(f), 'Reprise le samedi 6 mars');
  assert.equal(texteReprise(f, true), 'Reprise le sam. 6 mars');
  // Le jour de la reprise (heure de Paris), le site est de nouveau ouvert
  assert.equal(lireFermeture({ ferme: true, repriseLe: '2027-03-06' }, new Date('2027-03-06T00:30:00+01:00')), null);
  assert.ok(lireFermeture({ ferme: true, repriseLe: '2027-03-06' }, new Date('2027-03-05T23:30:00+01:00')), 'la veille au soir : encore fermé');
  // Sans date : fermé, message par défaut
  const sansDate = lireFermeture({ ferme: true, repriseLe: null, messageFermeture: '' }, MARDI);
  assert.equal(sansDate.reprise, null);
  assert.equal(sansDate.message, MESSAGE_FERMETURE);
  assert.equal(texteReprise(sansDate), 'Reprise bientôt');
  // Une date avec heure (Notion) compte pour son jour
  assert.equal(lireFermeture({ ferme: true, repriseLe: '2027-03-06T09:00:00.000+01:00' }, MARDI).reprise, '2027-03-06');
});

test('mode fermé : la semaine de la reprise, la publication de la liste rouvre le site', () => {
  const r = { ferme: true, repriseLe: '2027-03-06' };
  const jeudi = new Date('2027-03-04T18:00:00+01:00');
  assert.ok(lireFermeture(r, jeudi), 'sans vente au Planning : fermé jusqu’au jour de la reprise');
  assert.equal(lireFermeture(r, jeudi, { venteIso: '2027-03-06' }), null, 'prochaine vente le jour de la reprise : ouvert');
  assert.equal(lireFermeture({ ferme: true, repriseLe: '2027-03-04' }, new Date('2027-03-02T09:00:00+01:00'), { venteIso: '2027-03-06' }), null, 'vente après la reprise : ouvert');
  assert.ok(lireFermeture(r, MARDI, { venteIso: '2026-11-21' }), 'Planning resté coché, vente avant la reprise : fermé');
  assert.ok(lireFermeture({ ferme: true, repriseLe: null }, jeudi, { venteIso: '2027-03-06' }), 'sans date de reprise : fermé tant que la case est cochée');
});

test('message de la semaine : seulement si « Afficher le message » est coché et qu’il y a un texte', () => {
  assert.equal(lireAnnonce({ afficherMessage: true, message: '  Pas de vente\nsamedi 1er novembre  ' }), 'Pas de vente samedi 1er novembre');
  assert.equal(lireAnnonce({ afficherMessage: false, message: 'Pas de vente' }), null);
  assert.equal(lireAnnonce({ afficherMessage: true, message: '   ' }), null);
  assert.equal(lireAnnonce(undefined), null);
});

test('questions fréquentes : réponse Notion en HTML sûr, paragraphes, gras et liens', () => {
  const html = reponseHtml([
    { texte: 'Sur place, ' },
    { texte: 'au retrait', gras: true },
    { texte: '.\nVoir la ' },
    { texte: 'page Facebook', lien: 'https://www.facebook.com/237722416967635' },
    { texte: ' ou <script>alert(1)</script> ' },
    { texte: 'piège', lien: 'javascript:alert(1)' },
  ]);
  assert.equal(html, '<p>Sur place, <strong>au retrait</strong>.</p><p>Voir la <a href="https://www.facebook.com/237722416967635" rel="noopener">page Facebook</a> ou &lt;script&gt;alert(1)&lt;/script&gt; piège</p>');
  assert.equal(reponseHtml([{ texte: 'Un\n\n\nDeux' }]), '<p>Un</p><p>Deux</p>', 'pas de paragraphe vide');
  assert.equal(reponseHtml([{ texte: 'Écrire', lien: '/horaires-contact/' }]), '<p><a href="/horaires-contact/">Écrire</a></p>');
  assert.equal(reponseTexte([{ texte: 'Un\n' }, { texte: 'deux' }]), 'Un deux');
});

test('questions fréquentes : par page, dans l’ordre, sans question vide', () => {
  const faq = [
    { id: 'c', question: 'C ?', reponse: [{ texte: 'c' }], pages: ['Produits'], ordre: 30 },
    { id: 'a', question: 'A ?', reponse: [{ texte: 'a' }], pages: ['Produits', 'Accueil'], ordre: 10 },
    { id: 'b', question: 'B ?', reponse: [{ texte: 'b' }], pages: ['Accueil'], ordre: 20 },
    { id: 'd', question: 'D ?', reponse: [{ texte: ' ' }], pages: ['Produits'], ordre: 5 },
    { id: 'e', question: 'E ?', reponse: [{ texte: 'e' }], pages: ['Produits'], ordre: null },
  ];
  assert.deepEqual(questionsPour(faq, 'Produits').map((q) => q.id), ['a', 'c', 'e']);
  assert.deepEqual(questionsPour(faq, 'Pommes de terre'), []);
  const schema = schemaFaq(questionsPour(faq, 'Accueil'));
  assert.equal(schema['@type'], 'FAQPage');
  assert.deepEqual(schema.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), [['A ?', 'a'], ['B ?', 'b']]);
  assert.equal(schemaFaq([]), null);
});

test('historique : semaine ISO et heure de Paris', () => {
  assert.equal(semaineIso('2026-10-21'), '2026-S43');
  assert.equal(semaineIso('2026-01-01'), '2026-S01');
  assert.equal(semaineIso('2027-01-01'), '2026-S53', 'le 1er janvier 2027 (vendredi) est dans la dernière semaine de 2026');
  assert.equal(semaineIso('2024-12-30'), '2025-S01');
  assert.equal(horodatageParis(new Date('2026-10-21T16:05:30Z')), '2026-10-21T18:05:00+02:00');
  assert.equal(horodatageParis(new Date('2026-12-02T08:00:00Z')), '2026-12-02T09:00:00+01:00');
});

test('historique : une ligne par produit, triée, avec prix et étiquettes ; texte découpé pour Notion', () => {
  const maintenant = new Date('2026-10-21T16:05:00Z');
  const produits = [
    { nom: 'Tomates  anciennes', ref: 24, rayon: '🍅 Tomates', venduA: '/kg', prixKg: 4.5, promo: true, prixPromo: 3.9, quantiteLimitee: true },
    { nom: 'Ail', ref: 1, rayon: '🥕 Légumes', venduA: 'les 250g', prixKg: 12.3, poids: 0.25, nouveau: true },
    { nom: 'Miel', ref: 300, venduA: 'le pot', prixUnitaire: 9.6, pasBio: true, producteur: 'Joël Corre' },
    { nom: '  ' },
  ];
  const sp = (t) => t.replace(/\u00a0/g, ' '); // les prix gardent leur espace insécable
  assert.equal(sp(ligneProduit(produits[0], maintenant)), 'Tomates anciennes — 3,90 € le kg · Quantité limitée · Promo (au lieu de 4,50 €)');
  const c = contenuListe(produits, { prochaineVente: { jourDate: 'samedi 24 octobre', heures: '10h – 12h30' }, maintenant });
  assert.equal(c.nombre, 3);
  assert.equal(c.semaine, '2026-S43');
  assert.equal(c.publieeLe, '2026-10-21T18:05:00+02:00');
  assert.equal(c.titre, 'Liste du 21 octobre 2026 (18h05)');
  assert.equal(c.prochaineVente, 'samedi 24 octobre, 10h – 12h30');
  assert.deepEqual(c.texte.split('\n').map((l) => l.split(' — ')[0]), ['Ail', 'Miel', 'Tomates anciennes']);
  assert.match(sp(c.texte), /^Ail — 3,08 € les 250g · Nouveau$/m);
  assert.match(sp(c.texte), /^Miel — 9,60 € le pot · Non certifié bio$/m);
  const donnees = JSON.parse(c.json);
  assert.deepEqual(donnees.map((d) => [d.ref, d.prix, d.ancienPrix]), [[1, 3.08, null], [300, 9.6, null], [24, 3.9, 4.5]]);
  const morceaux = morceauxTexte('x'.repeat(4000));
  assert.deepEqual(morceaux.map((m) => m.text.content.length), [1900, 1900, 200]);
  assert.deepEqual(morceauxTexte(''), []);
});

// Revue de Pierre du 26/10/2026 : plus de marchés ni de fêtes, espace pro en veille jusqu'au printemps.
test('marchés masqués : seules les ventes à la ferme, sauf si « Afficher les marchés » est coché', async () => {
  const { creneauxAffiches, afficherMarches } = await import('../src/lib/reglages.js');
  const creneaux = [{ nom: 'Vente du samedi', aLaFerme: true }, { nom: 'Marché de Bénestroff', aLaFerme: false }];
  assert.deepEqual(creneauxAffiches(creneaux, { afficherMarches: false }).map((c) => c.nom), ['Vente du samedi']);
  assert.deepEqual(creneauxAffiches(creneaux, {}).map((c) => c.nom), ['Vente du samedi'], 'case absente : marchés masqués');
  assert.equal(creneauxAffiches(creneaux, { afficherMarches: true }).length, 2);
  assert.equal(afficherMarches(null), false);
});

test('espace pro : la case « Espace pro ouvert », que la variable ESPACE_PRO peut forcer', async () => {
  const { lireEspacePro } = await import('../src/lib/reglages.js');
  assert.equal(lireEspacePro({ espaceProOuvert: false }), false);
  assert.equal(lireEspacePro({}), false, 'case absente : en veille');
  assert.equal(lireEspacePro({ espaceProOuvert: true }), true);
  assert.equal(lireEspacePro({ espaceProOuvert: false }, 'ouvert'), true, 'aperçu Cloudflare : ouvert');
  assert.equal(lireEspacePro({ espaceProOuvert: true }, 'ferme'), false);
  assert.equal(lireEspacePro({ espaceProOuvert: true }, ''), true, 'variable vide : la case décide');
});

test('commandes de pommes de terre et inscription à la liste : cases de Réglages du site et variables', async () => {
  const { lireCommandesPdt, lireInscriptionListe } = await import('../src/lib/reglages.js');
  assert.equal(lireCommandesPdt({}), false, 'case absente : commandes fermées, pas de page');
  assert.equal(lireCommandesPdt({ commandesPdtOuvertes: true }), true);
  assert.equal(lireCommandesPdt({ commandesPdtOuvertes: false }, 'ouverte'), true, 'aperçu Cloudflare : COMMANDE_PDT=ouverte');
  assert.equal(lireCommandesPdt({ commandesPdtOuvertes: true }, 'fermée'), false);
  assert.equal(lireInscriptionListe({}), false, 'case absente : « demandez-la à Pierre »');
  assert.equal(lireInscriptionListe({ inscriptionListeOuverte: true }), true);
  assert.equal(lireInscriptionListe({ inscriptionListeOuverte: false }, 'oui'), true);
  assert.equal(lireInscriptionListe({ inscriptionListeOuverte: true }, ' '), true, 'variable vide : la case décide');
  assert.ok(!/inscrivez-vous/i.test(MESSAGE_FERMETURE), 'message de fermeture par défaut juste avec ou sans formulaire');
});
