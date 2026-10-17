# Site Au Grand Jardin 2026 — passation

À lire en premier avant de reprendre le nouveau site augrandjardin.fr. État au 17 octobre 2026.

Le site est en ligne sur l'adresse de test **https://agj-site-2026.pages.dev**. Il suit les maquettes Figma (bureau et téléphone) et lit Notion. On peut y commander des pommes de terre, en mode test. Le site actuel (branche `main`, GitHub Pages) n'a pas bougé.

`README.md` décrit le fonctionnement technique : pages, sources de données, fonctions, secrets, travail en local.

---

## 1. Où sont les choses

| Quoi | Où |
|---|---|
| Code | Dépôt `thomasbonometti/augrandjardin`, **branche `site-2026`**. Ne pas toucher à `main` avant la bascule. |
| Hébergement | Cloudflare Pages, projet `agj-site-2026`. Il est relié à la branche `site-2026` : un push reconstruit le site. |
| Adresse de test | https://agj-site-2026.pages.dev (`noindex`, et `robots.txt` interdit tout tant que `SITE_INDEXABLE` ne vaut pas `oui`) |
| Maquettes | Figma « Au Grand Jardin \| Site 2026 » (`zrlhOtAHZaw02nvLTnaswz`). Bureau : `13:2` Accueil, `14:2` Produits, `15:2` La ferme (Sol Vivant `15:116`), `16:2` Pommes de terre, `17:2` Professionnels, `18:2` Espace pro, `19:2` Horaires & contact. Téléphone : `38:2`, menu `37:2`, `39:2` à `44:2`, dans le même ordre. |
| Outil de commande | Dépôt `thomasbonometti/brief`, Worker `formulaires` (https://formulaires.hey-d8b.workers.dev). Le site relaie son API, sans lire ni écrire ses bases Notion. |
| Notion lu par le site | « Produits de la ferme » (`collection://5fb0d75e-67d6-4840-a703-2c6e0b3eaa11`, lignes « En vente ») et « 📅 Planning semaine » (`collection://152a41f4-8718-45e1-9025-40f3da0572e3`). |
| Notion écrit par le site | Page « Site augrandjardin.fr » (`3fb70bd669cd81a5a2a0cfc84d7016a2`) : bases « Inscriptions SMS » (`collection://1f9db94f-6b9f-4ba2-aae7-d67ea66cae6f`) et « Demandes d'accès pro » (`collection://95af73b3-86bc-4013-adb6-ccbe215a44d0`). Ce qui vient de l'adresse de test est coché « Test ». |
| Intégration Notion | « Site Au Grand Jardin » (lecture et insertion). Elle doit être connectée à la base Produits, à la base Planning et à la page « Site augrandjardin.fr ». Sans l'une d'elles, la construction échoue avec un message qui nomme la base. |

## 2. Ce qui a été décidé

- **Astro en site statique**, sans framework envoyé au navigateur. Polices Geist auto-hébergées. Photos en WebP de 400 et 800 px, produites à la construction.
- **Notion lu à la construction.** Si Notion répond mal, la construction échoue et Cloudflare garde la version précédente. Le bouton Notion « Publier » appelle l'adresse de reconstruction (deploy hook) du projet Cloudflare.
- **Commande de pommes de terre.** La page dessine la maquette, mais tout le reste vient de l'outil de commande :
  - Fonctions de relais Cloudflare (`/api/agj/catalog`, `/api/agj/order`, `/agj/config.json`, `/agj/lib/cart.js`). Le navigateur reste sur la même adresse et rien ne change côté `brief`.
  - Vrai catalogue : filets de 7 et 15 kg, oignons, échalions, et non trié quand Pierre le met en vente.
  - Prix au kilo, avertissements du panier, stock relu en direct.
  - Le client choisit son jour plus tard, par le lien du mail « prête ». La page l'explique en 3 étapes.
- **Espace pro.** Un mot de passe partagé (`PRO_PASSWORD`) et un cookie signé de 60 jours (`PRO_SECRET`). Les prix HT sont calculés depuis le TTC (TVA 5,5 %). « Imprimer / PDF » et « Se déconnecter » sont sur la page.
- **Bio.** Validé par Thomas le 16/10 : « il est bien en bio ». Les produits cochés « Pas bio » dans Notion portent leur mention.
- **Accessibilité.** Niveau WCAG AA vérifié avec axe sur toutes les pages, au téléphone et à l'ordinateur.
- **Référencement local.** Fiche LocalBusiness (JSON-LD), avec horaires lus dans le Planning, fil d'Ariane, sitemap, adresses canoniques sur augrandjardin.fr.

## 3. Écarts avec la maquette (volontaires)

- **Pommes de terre.**
  - Vrai catalogue de l'outil au lieu des sacs de 15 et 25 kg de la maquette.
  - Pastille « Commandes ouvertes » au lieu de « Réservations ouvertes jusqu'au 15 novembre », et bouton « Commander ».
  - Pas de « jour de retrait préféré » : le jour se choisit par le mail « prête ».
  - Bandeau « Mode test » tant que l'outil est en test : il disparaît tout seul en réel.
  - « Cultivées à Lostroff » au lieu de « Cultivées sans traitement chimique à Lostroff », en attendant la validation de Pierre.
- **Produits mis en avant (accueil, menu).** Choisis automatiquement : « À mettre en avant », puis « Nouveau », puis « Produit d'appel », puis « Promo », toujours avec photo. La maquette en montrait 4 fixes.
- **Contraste.**
  - Le vert vif `#00A544` reste sur fond sombre, mais devient `#00843A` sous un texte blanc (pastilles, boutons).
  - Gris un peu plus foncés.
  - Créneaux passés en gris au lieu d'une transparence.
  - Prix barrés en gris secondaire.
- **Ajouts.**
  - Mention RGPD sous les formulaires.
  - Lien « Se déconnecter » de l'espace pro.
  - Page Mentions légales (Pierre Fouquet, EI, SIRET 882 325 004 00019) et page 404.
  - Date « Liste mise à jour le… » sur la page Produits.

## 4. Vérifications faites

- Tests unitaires (`npm test`) : 9 sur 9.
- Tests navigateur en local (`npm run e2e`, Pixel 7 et 1440 × 900), contre l'outil simulé : 39 réussis et 1 ignoré, dont la commande de bout en bout. Accessibilité : 14 sur 14.
- Commande de test depuis l'adresse de test, le 17/10 :
  - **AGJ-3** (1 filet 7 kg Chérie et 1 filet 5 kg d'oignons jaunes, 26,00 €), cochée « Test » dans Commandes AGJ, source « site ».
  - Deux mails reçus sur hey@ : « [TEST → hey@…] Votre commande AGJ-3 est bien enregistrée » et « [TEST → pierre@…] Nouvelle commande AGJ-3 ».
  - Archivée ensuite par `/agj/pierre/diagnostic` : commande AGJ-3 et client « Test Site 2026 », ligne de statistiques retirée, stock rendu. Commandes AGJ et Clients AGJ sont vides.
- Formulaires depuis l'adresse de test, le 17/10 :
  - l'inscription SMS (06 00 00 00 01) et la demande pro « Test (à supprimer) » ont créé leurs lignes « Test » dans Notion ;
  - ces deux lignes ont ensuite été mises à la corbeille.
- Espace pro : un mauvais mot de passe est refusé (401), et `/pro/tarifs/` renvoie vers la connexion. La connexion avec le vrai mot de passe est à tester par Thomas.
- Publication du 17/10 à 8 h 51, avec les données Notion : 32 produits (30 photos), 9 créneaux, 16 produits de l'outil.
- Revue Figma / site, page par page, au téléphone et à l'ordinateur : artifact « Revue site AGJ 2026 », https://claude.ai/artifact/QCPcPS8N1G7SwUF6TDYSWw

## 5. Règles

- Outil de commande en **mode test** (`AGJ_LIVE` = "0") : commandes « Test », mails seulement vers hey@thomasbonometti.fr. Ne jamais toucher aux vraies commandes, à « Commandes 2025 » ni aux scénarios Make.
- Secrets uniquement dans Cloudflare (`NOTION_TOKEN`, `PRO_PASSWORD`, `PRO_SECRET`), et `.dev.vars` en local (ignoré par git).
- Modifications du dépôt `brief` par pull request, que Thomas fusionne.

## 6. Points ouverts

- **Espace pro** : Thomas teste la connexion avec le mot de passe pro, et remplace `PRO_SECRET` dans Cloudflare (il a circulé dans une conversation).
- **« Sans traitement chimique »** sur la page Pommes de terre : à valider avec Pierre.
- **Horaires** : le Planning ne coche que le samedi 10h – 12h30 ; l'ancien site affichait aussi le mercredi.
- **Photos** : quelques produits sans photo dans Notion affichent une initiale.
- **Bascule** (voir README) :
  - fusionner `site-2026` dans `main` et passer la production Cloudflare sur `main` ;
  - `SITE_INDEXABLE=oui` ;
  - domaine augrandjardin.fr sur le projet Pages ;
  - rediriger `produits.augrandjardin.fr` (lien des SMS) vers `/produits/` ;
  - éteindre le scénario Make « Notion -> Github » (Thomas).
- **Plus tard** : habiller les pages de l'outil (`/agj/retrait/`, bon de commande) à la charte du site, en CSS seul dans `brief`.
