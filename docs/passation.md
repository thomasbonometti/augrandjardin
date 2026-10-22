# Site Au Grand Jardin 2026 — passation

À lire en premier avant de reprendre le nouveau site augrandjardin.fr. État au 22 octobre 2026, lot 1 du plan d'évolutions compris.

Le site est en ligne sur l'adresse de test **https://agj-site-2026.pages.dev**. Il suit les maquettes Figma (bureau et téléphone) et lit Notion. On peut y commander des pommes de terre, en mode test. Le site actuel (branche `main`, GitHub Pages) n'a pas bougé.

Autres documents :
- `CLAUDE.md` à la racine : règles, emplacements, plan du code, tâches courantes et méthode de vérification. C'est le mode d'emploi pour toute session qui modifie le site.
- `README.md` : fonctionnement technique (pages, sources de données, fonctions, secrets, travail en local, bascule).
- `docs/idees.md` : 60 idées d'évolution. Les idées 31 à 60 sont à trier avec Thomas.

---

## 1. Où sont les choses

| Quoi | Où |
|---|---|
| Code | Dépôt `thomasbonometti/augrandjardin`, **branche `site-2026`**. Ne pas toucher à `main` avant la bascule. |
| Hébergement | Cloudflare Pages, projet `agj-site-2026`. Il est relié à la branche `site-2026` : un push reconstruit le site. |
| Adresse de test | https://agj-site-2026.pages.dev (`noindex`, et `robots.txt` interdit tout tant que `SITE_INDEXABLE` ne vaut pas `oui`) |
| Maquettes | Figma « Au Grand Jardin \| Site 2026 » (`zrlhOtAHZaw02nvLTnaswz`). Bureau : `13:2` Accueil, `14:2` Produits, `15:2` La ferme (Sol Vivant `15:116`), `16:2` Pommes de terre, `17:2` Professionnels, `18:2` Espace pro, `19:2` Horaires & contact. Téléphone : `38:2`, menu `37:2`, `39:2` à `44:2`, dans le même ordre. |
| Outil de commande | Dépôt `thomasbonometti/brief`, Worker `formulaires` (https://formulaires.hey-d8b.workers.dev). Le site relaie son API, sans lire ni écrire ses bases Notion. |
| Notion lu par le site | « Produits de la ferme » (`collection://5fb0d75e-67d6-4840-a703-2c6e0b3eaa11`, lignes « En vente ») et « 📅 Planning semaine » (`collection://152a41f4-8718-45e1-9025-40f3da0572e3`). Sous la page « Site augrandjardin.fr » : « Réglages du site » (`collection://cc35fc8e-c976-44f0-b213-31eed14e3bee`) et « Questions fréquentes » (`collection://a8d7a11c-2204-4c8b-ab4e-23c749bd4452`). |
| Notion écrit par le site | Page « Site augrandjardin.fr » (`3fb70bd669cd81a5a2a0cfc84d7016a2`) : bases « Inscriptions SMS » (`collection://1f9db94f-6b9f-4ba2-aae7-d67ea66cae6f`) et « Demandes d'accès pro » (`collection://95af73b3-86bc-4013-adb6-ccbe215a44d0`). Ce qui vient de l'adresse de test est coché « Test ». « Historique des listes » (`collection://5fced6cb-eabb-46cd-beb2-00ee278afd91`), écrit par chaque construction Cloudflare. |
| Plan d'évolutions | Document du projet Claude « Au Grand Jardin » : `site-web/plan-evolutions.md` (fait foi, un lot à la fois). |
| Statistiques de visite | Cloudflare Web Analytics, activé par Thomas le 21/10 sur le projet. Le script est ajouté par Cloudflare, rien dans le code. |
| Affichette QR codes | https://claude.ai/artifact/VeEkgWUy3TQc5uHP3j2pR2 (A5 à imprimer pour la vente à la ferme). |
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
- **Apparitions au défilement (GSAP, demandé par Thomas le 17/10).** Le script est dans `src/scripts/animer.ts`, et chaque page porte des attributs `data-anim`, `data-anim-groupe`, `data-compteur` ou `data-parallaxe` (le mode d'emploi est en tête du script).
  - GSAP n'est téléchargé que si le visiteur accepte les animations (`prefers-reduced-motion`). Le contenu reste visible sans JavaScript, et tout réapparaît si GSAP ne se charge pas en 3 secondes.
  - Le formulaire de commande et la grille pro ne bougent pas, à part le total qui rebondit.
  - Le pied de page n'a plus d'arrondis.
- **Horaires & contact (17/10, à la demande de Thomas).**
  - **Carte Google Maps** à la place du plan dessiné.
    - Elle ne se charge qu'après un clic sur « Afficher la carte Google Maps », parce que Google dépose ses propres cookies et que les mentions légales promettent « aucun cookie ». Le choix est retenu dans le navigateur (`localStorage`, clé `agj-carte-google`), et les mentions légales le disent.
    - L'adresse de la carte est dans `src/data/ferme.js` (`carteGoogle`).
    - Sur ordinateur, le haut de la carte Google est rogné, pour que sa fiche de lieu ne dépasse pas sous la nôtre. Le logo et les mentions de Google restent visibles.
  - **« Où nous retrouver »** remplace la liste des créneaux : les lieux du Planning sans jours ni horaires (fonction `lireLieux`), la ferme en tête, avec la pastille « Cette semaine » sur les lieux de la semaine.
- **En-tête collant (17/10, demandé par Thomas).** La barre verte « Prochaine vente » reste toujours visible en haut. Le menu glisse dessous quand on descend et revient dès qu'on remonte (script dans `Base.astro`, hauteurs `--h-barre` et `--h-entete` dans `global.css`).
  - Le menu reste affiché en haut de page, quand le menu mobile est ouvert, et quand on y navigue au clavier.
  - Il reste caché pendant un saut vers une ancre de la page.
- **Typographie française.** Espaces insécables autour des guillemets, avant « : ; ! ? », entre un nombre et son unité, et dans les plages horaires.
  - Ils sont posés à la construction sur toutes les pages (intégration dans `astro.config.mjs`, règles dans `src/lib/typo.js`).
  - Les textes écrits par les scripts (commande, formulaires) passent aussi par ces règles.
- **Accessibilité.** Niveau WCAG AA vérifié avec axe sur toutes les pages, au téléphone et à l'ordinateur.
- **Référencement local.** Fiche LocalBusiness (JSON-LD), avec horaires lus dans le Planning, fil d'Ariane, sitemap, adresses canoniques sur augrandjardin.fr.
- **Lot 1 du plan d'évolutions (21/10, demandé par Thomas : « Lance le lot 1 »).**
  - **Mode fermé (idée 28)** : case « Fermé » de « Réglages du site », avec « Reprise le » et « Message de fermeture ». Barre verte « Ventes en pause, reprise le … », encart à la place de la liste, de la commande de pommes de terre et de la grille pro, chiffres « reprise des ventes », pas de lieu « Cette semaine ». Le site rouvre à la publication de la semaine de la reprise (prochaine vente du Planning le jour de la reprise ou après) ou à toute publication à partir de ce jour.
  - **Message de la semaine (idée 12)** : bandeau « À noter » sous la barre verte, quand « Afficher le message » est coché.
  - **Questions fréquentes (idée 11)** : accordéon `<details>` en bas de 6 pages, données structurées FAQPage, base Notion « Questions fréquentes ». 14 questions écrites par Claude d'après les sujets validés par Thomas : 8 publiées, qui ne reprennent que des informations déjà sur le site, et 6 brouillons qui attendent Pierre (paiement, parking, sacs, conservation des pommes de terre, zone de livraison et facturation des pros).
  - **Statistiques (B1)** : Cloudflare Web Analytics, sans cookie ; une ligne des mentions légales en parle.
  - **Historique des listes (B2, démarrage)** : chaque construction Cloudflare copie la liste dans Notion si elle a changé, pour le bilan de saison.
  - **Outil de commande (pull request n° 4 du dépôt `brief`, fusionnée par Thomas le 22/10)** : mode fermé de `/agj` (même case), rappel la veille du retrait (idée 9), alerte de stock bas à Pierre (idée 30), merci avec lien d'avis Google à chaque retrait (idée 27).
  - **Choix de Thomas du 22/10 (pull request n° 5, fusionnée le 22/10)** : alerte sous 30 kg par variété (au lieu de 10 kg), pour les pommes de terre triées ou non et pour les oignons et échalotes ; merci à chaque retrait, habitués compris.
  - **Stock de test (22/10, à la demande de Thomas)** : colonne « Stock » de Produits AGJ remplie sur les 16 formats en vente, avec des valeurs de test. Chérie (37 kg) et oignons jaunes (35 kg) sont juste au-dessus du seuil pour essayer l'alerte ; les autres variétés ont 110 à 190 kg. Les formats pas en vente restent vides.
  - **Affichette A5 (idée 27)** : deux QR codes, la liste de la semaine (`https://produits.augrandjardin.fr/?src=qr`) et l'avis Google (`https://g.page/r/CVcpGhGHIj7rEAE/review`).

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
- **Lot 1, le 21/10 :**
  - Tests unitaires : 19 sur 19 (mode fermé et réouverture, message de la semaine, questions fréquentes, historique). Tests navigateur des questions fréquentes, du mode fermé (`E2E_FERME=1`, site construit fermé) et de la commande contre l'outil simulé : verts, au téléphone et à l'ordinateur.
  - Construction Cloudflare du commit `8eb6e1f` : 8 questions fréquentes, « Site ouvert », copie de la liste dans l'historique (32 produits, semaine 2026-S43), ligne vue dans Notion.
  - Adresse de test, dans Chrome : accordéon des questions sur Produits et Horaires & contact ; script Cloudflare Web Analytics chargé, et mesure envoyée.
  - Lien d'avis Google ouvert : il mène bien à la fiche Au Grand Jardin (rien n'a été saisi).
  - QR codes de l'affichette décodés après affichage dans un navigateur : ils mènent aux deux adresses ci-dessus.
  - Outil (pull request n° 4) : 82 tests unitaires et d'API, parcours Playwright au téléphone et à l'ordinateur, tous verts.
  - Alerte de stock en ligne, le 22/10 à 8 h 53 (à la demande de Thomas) : commande test AGJ-5, 1 filet de 15 kg de Chérie (37 → 22 kg). Trois mails reçus sur hey@ : confirmation, nouvelle commande et « Stock bas : Chérie, il reste 22 kg ». Commande et client de test archivés ensuite, stock rendu ; Commandes AGJ et Clients AGJ sont vides.

## 5. Règles

- Outil de commande en **mode test** (`AGJ_LIVE` = "0") : commandes « Test », mails seulement vers hey@thomasbonometti.fr. Ne jamais toucher aux vraies commandes, à « Commandes 2025 » ni aux scénarios Make.
- Secrets uniquement dans Cloudflare (`NOTION_TOKEN`, `PRO_PASSWORD`, `PRO_SECRET`), et `.dev.vars` en local (ignoré par git).
- Modifications du dépôt `brief` par pull request, que Thomas fusionne.
- « Réglages du site » est lue par le site et par l'outil de commande ; ni l'un ni l'autre n'y écrit.
- Questions fréquentes : « Publiée » seulement après l'accord de Pierre.

## 6. Points ouverts

- **Lot 1, côté Thomas** : imprimer l'affichette A5 (artifact ci-dessus, export PDF). Le reste est fait le 22/10 : pull requests n° 4 et 5 fusionnées et en ligne (configuration `2026-10-22.1`), « Formulaire brief » connectée à « Réglages du site » par Claude à la demande de Thomas (la page de vérification de l'outil ne signale plus rien).
- **Lot 1, côté Pierre** : relire les 6 questions en brouillon et les publier.
- **Avant le passage en réel de l'outil** : remplacer le stock de test de Produits AGJ par le vrai stock de Pierre, ou vider la colonne (vide = pas de limite, pas d'alerte).
- **Accès Notion du site** : l'intégration « Site Au Grand Jardin » est connectée à toute la page « Au Grand Jardin » (vu le 22/10), donc elle voit aussi les commandes et les clients de l'outil, dont le site n'a pas besoin. À restreindre plus tard aux pages que le site lit et écrit, en vérifiant ensuite qu'une publication passe.
- **Lot 2** à lancer quand Thomas le demande (voir le plan d'évolutions).

- **Espace pro** : Thomas teste la connexion avec le mot de passe pro, et remplace `PRO_SECRET` dans Cloudflare (il a circulé dans une conversation).
- **Bouton Notion « Publier »** : essayé par Thomas le 21/10 ; la construction de 20 h 27, lancée sans push, est passée. Un clic fait apparaître une nouvelle construction dans Cloudflare environ une minute plus tard.
- **Revue Figma / site** (artifact « Revue site AGJ 2026 ») : les captures datent du 17/10 au matin, avant le pied de page sans arrondis, les animations, l'en-tête collant, la carte Google et la liste des lieux. Elle est à refaire si Thomas veut une revue à jour.
- **Idées d'évolution** : trier les idées 31 à 60 avec Thomas (`docs/idees.md`), puis les ajouter à la note Notion.
- **« Sans traitement chimique »** sur la page Pommes de terre : à valider avec Pierre.
- **Horaires** : le Planning ne coche que le samedi 10h – 12h30 ; l'ancien site affichait aussi le mercredi.
- **Photos** : quelques produits sans photo dans Notion affichent une initiale.
- **Bascule** (voir README) :
  - fusionner `site-2026` dans `main` et passer la production Cloudflare sur `main` ;
  - `SITE_INDEXABLE=oui` ;
  - domaine augrandjardin.fr sur le projet Pages ;
  - rediriger `produits.augrandjardin.fr` (lien des SMS et QR code de l'affichette) vers `/produits/`, en gardant les paramètres de l'adresse (`?src=qr`) ;
  - éteindre le scénario Make « Notion -> Github » (Thomas).
- **Plus tard** : habiller les pages de l'outil (`/agj/retrait/`, bon de commande) à la charte du site, en CSS seul dans `brief`.
