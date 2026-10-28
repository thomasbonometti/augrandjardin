# Site Au Grand Jardin 2026 — passation

À lire en premier avant de reprendre le nouveau site augrandjardin.fr. État au 26 octobre 2026 au soir : lots 1 et 2 du plan d'évolutions livrés ; lot 3 en ligne sur l'adresse de test (panneau produit, calendrier de saison), bilan B2 en cours ; **retours de Pierre de la revue du 26/10 appliqués et en ligne** (textes, lieux, liste de la semaine, marchés masqués, espace pro en veille). Le lien de test part chez Pierre le 27 ou le 28/10 pour relecture.

Le site est en ligne sur l'adresse de test **https://agj-site-2026.pages.dev**. Il suit les maquettes Figma (bureau et téléphone) et lit Notion. On peut y commander des pommes de terre, et les pros commandent depuis leur espace (lot 2), en mode test. Le site actuel (branche `main`, GitHub Pages) n'a pas bougé.

Autres documents :
- `CLAUDE.md` à la racine : règles, emplacements, plan du code, tâches courantes et méthode de vérification. C'est le mode d'emploi pour toute session qui modifie le site.
- `README.md` : fonctionnement technique (pages, sources de données, fonctions, secrets, travail en local, bascule).
- `docs/idees.md` : 60 idées d'évolution. Les idées 31 à 60 sont à trier avec Thomas.

---

## 1. Où sont les choses

| Quoi | Où |
|---|---|
| Code | Dépôt `thomasbonometti/augrandjardin`, **branche `site-2026`**. Ne pas toucher à `main` avant la bascule : elle sert produits.augrandjardin.fr (liste de la semaine, GitHub Pages, Make). |
| Ancien site | augrandjardin.fr et www, hébergement IONOS (`217.160.0.25`, vérifié le 27/10), DNS et mail chez IONOS. Passage : `docs/plan-bascule.md`. |
| Hébergement | Cloudflare Pages, projet `agj-site-2026`. Il est relié à la branche `site-2026` : un push reconstruit le site. |
| Adresse de test | https://agj-site-2026.pages.dev (`noindex`, et `robots.txt` interdit tout tant que `SITE_INDEXABLE` ne vaut pas `oui`) |
| Maquettes | Figma « Au Grand Jardin \| Site 2026 » (`zrlhOtAHZaw02nvLTnaswz`). Bureau : `13:2` Accueil, `14:2` Produits, `15:2` La ferme (Sol Vivant `15:116`), `16:2` Pommes de terre, `17:2` Professionnels, `18:2` Espace pro, `19:2` Horaires & contact. Téléphone : `38:2`, menu `37:2`, `39:2` à `44:2`, dans le même ordre. Lot 2 : grille pro `65:50` (bureau), `68:286` et `68:1046` (téléphone) ; espace de Pierre sur la page « 🛠 Espace de Pierre (lot 2) ». |
| Outil de commande | Dépôt `thomasbonometti/brief`, Worker `formulaires` (https://formulaires.hey-d8b.workers.dev). Le site relaie son API (commande de pommes de terre, espace pro), sans lire ni écrire ses bases Notion. Ses décisions et points ouverts : `docs/passation.md` du dépôt `brief`. |
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
- **Espace pro (lot 2, 26/10).** Un accès par pro, géré par l'outil de commande (base « Accès pros ») : connexion par e-mail et mot de passe, cookie de session de 60 jours posé par l'outil (`agj_pro`, chemin `/api/agj/pro`). La page `/pro/tarifs/` ne contient aucun prix : la grille du pro (prix public TTC, son prix HT avec sa remise, son prix TTC, les paliers), sa commande pour le lundi, « Comme la semaine dernière », les prévisions et le mode fermé viennent de l'outil par le relais `/api/agj/pro/*`. L'ancien mot de passe partagé (`PRO_PASSWORD`, `PRO_SECRET`, middleware `/pro/*`) est supprimé (décision 5 de Thomas, sans transition).
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
- **Lot 2 du plan d'évolutions (22-26/10, demandé par Thomas : « Lance le lot 2 »).** Espace pro et espace de Pierre ; décisions de Thomas du 22/10 dans `docs/passation.md` du dépôt `brief`. Maquettes Figma validées le 26/10 (grille pro : 65:50 bureau, 68:286 et 68:1046 téléphone ; espace de Pierre refait dans la DA du site à sa demande).
  - **Site** : `/pro/tarifs/` relié à l'outil (`src/scripts/espace-pro.ts`, `src/lib/pro-grille.js`, `functions/api/agj/pro/[action].js`), connexion par e-mail sur la page Professionnels et sur `/pro/tarifs/`, étapes « Vous recevez votre accès » et « Vous commandez » mises à jour.
  - **Outil** (pull requests n° 6, fusionnée le 26/10, et n° 7) : accès pros, grille et commande, mails planifiés (grille du jeudi 18 h, relance du samedi 9 h, « À récolter » du samedi 18 h), prévisions, page de Pierre en quatre rubriques.
- **Lot 3 du plan d'évolutions (26/10, demandé par Thomas : « attaque le lot 3 »)**. Décisions de Thomas du 26/10 (« Ok pour tout le reste », sauf la 5 qu'il a précisée) :
  1. Champ « Légume » (sélection) dans « Produits de la ferme », prérempli par Claude : il regroupe les lignes d'un même légume (vrac, botte, 500 g). Conseils et mois valent pour tout le légume.
  2. Mois du calendrier = ventes réelles de 2026 (publications Facebook), plus la saisonnalité de Moselle en hiver ; Claude ne touche pas aux 32 lignes préremplies au lot 2 et signale seulement les écarts.
  3. Calendrier = légumes, aromates et fruits de la ferme vendus en 2026 ; pas de plants, de produits transformés ni de partenaires.
  4. « Cuisson » et « Conservation » : premier jet de Claude, en ligne après relecture de Thomas. « Avis de Pierre » reste vide (Pierre l'écrit). Chaque partie n'apparaît que si elle est remplie.
  5. Un légume pas en vente n'apparaît que dans le calendrier. Le panneau s'ouvre pour les produits en vente, depuis leur carte et depuis les lignes « En vente » du calendrier, avec sa propre adresse (`/produits/#carotte-vrac`) ; contenu dans le HTML.
  6. Page `/calendrier-de-saison/` « Légumes de saison en Moselle », hors du menu : liens dans le pied de page, la page Produits, le panneau et l'encart « Ventes en pause ».
  7. Bilan B2 : document partageable, exportable en PDF.
  - **Code** (commits `536ac35`, `34ede20`, `fe9dce6`, poussés le 26/10 après la validation des maquettes par Thomas) : `src/lib/saisons.js` (fiches par légume, calendrier, résumé du mois, plages de mois, ancres), `scripts/sync-notion.mjs` (lignes avec « Légume » → `data/legumes.json`), `src/components/PanneauProduit.astro` (un `<dialog>` par produit, script dans `produits.astro` : adresse, « Retour », Échap, clic sur le voile, focus rendu), `src/pages/calendrier-de-saison.astro` (trois cartes du mois, filtres, frises, bande du mois en cours).
  - **Maquettes** : panneau 89:294 (bureau) et 91:1112 (téléphone), calendrier 90:323 et 91:1205, composants 88:286, notes 91:2595. Validées par Thomas le 26/10.
  - **Notion, le 26/10 (accord de Thomas : « Vas-y je te fais confiance »)** : « Cuisson » et « Conservation » des 34 légumes vendus en 2026, sur une ligne par légume (la ligne en vente quand il y en a une) ; « Mois de récolte » de 23 lignes pas en vente, d'après les ventes 2026 (pas sur « Pomme de terre - chair fondante », remise en vente entre-temps : ses mois piloteraient les prévisions pro) ; « Légume » = Carotte sur « Carottes multicolores en Botte (petite) ». Les 32 lignes préremplies au lot 2 n'ont pas été touchées.
  - **Bilan B2** : document « Bilan de la saison 2026 — Au Grand Jardin » (https://claude.ai/artifact/KbKZhnHAqTwnXv9sqkrt6A), tiré des 26 publications « Jour J » du Calendrier éditorial. La partie pommes de terre attend la réponse de Thomas sur « Commandes 2025 ».

- **Retours de Pierre, revue du 26/10/2026** (réunion « Thomas x Pierre » dans Notion, document du projet `site-web/retours-pierre-26-10.md`). Réponses de Thomas aux 5 questions, le 26/10 : « Ok pour tes recommandations ».
  1. **Liste de la semaine** : le site dit ce qui se passe aujourd'hui (Pierre envoie la liste lui-même, WhatsApp d'abord, SMS pour qui n'a pas WhatsApp, de début avril à fin décembre, sans réservation). Le formulaire propose WhatsApp (par défaut) ou SMS, rangé dans la nouvelle colonne « Canal » de « Inscriptions SMS ». La décision 1 du lot 4 (SMS court + mail, clients WhatsApp au mail) est **rouverte** avant d'en coder l'envoi.
  2. **Espace pro en veille** : case « Espace pro ouvert » de Réglages du site, décochée ; page Professionnels gardée au menu, avec l'encart « contactez Pierre » en haut ; `/pro/*` → `/professionnels/` (`dist/_redirects` écrit à la construction). Variable `ESPACE_PRO=ouvert` pour un aperçu Cloudflare.
  3. **Marchés et fêtes** : seuls les créneaux « à la ferme » s'affichent ; case « Afficher les marchés » pour les rouvrir. Planning inchangé.
  4. **Notion** : questions fréquentes du site corrigées (6 réponses publiées), « Canal » ajouté à « Inscriptions SMS », les deux cases à « Réglages du site », message de fermeture repris. Rien dans les bases de l'outil ni dans Planning.
  5. **Relecture** : textes en ligne sur l'adresse de test, tableau avant/après pour Thomas (document « Site Au Grand Jardin — textes avant / après (revue de Pierre du 26/10) », https://claude.ai/artifact/CfC1odVPJY9iaJ3kjg226J), puis lien envoyé à Pierre.
  - **Textes** (commits `680a1d1` à `cc90fdf`) : bio Ecocert (conversion 2020, certification 2023), goût, sol, protection biologique intégrée, « maraîcher bio à Lostroff depuis 2020 », production 100 % de la ferme ; retirés : hybrides F1, « aucun produit chimique », permaculture, label Maraîchage Sol Vivant, partenaires, pain, réservation par SMS, 15 avril – 15 novembre, marchés.
  - **Lieux** (`src/data/ferme.js`, propriété `actif`) : restaurants Hôtel Notre-Dame de Bonne Fontaine, Le Greffin, Le Bistrot des Oiseaux ; points de vente Inventerre du Pré Vert, Ma Petite Cuillère ; partenaires et anciens lieux désactivés, pas effacés. Villes inconnues laissées vides. Photo de La Toque Blanche remplacée sur l'accueil par celle de Pierre.
  - **Outil** (dépôt `brief`) : pull request n° 9 « Page de Pierre installable sur son téléphone » (manifeste, icône feuille), à fusionner par Thomas.

- **Noms des bases de la commande de pommes de terre (27/10, demande de Thomas)** : pour ne plus confondre « Produits AGJ » et « Produits de la ferme », les quatre bases de l'outil sous « Commandes en ligne » s'appellent « Pommes de terre — catalogue » (avant « Produits AGJ »), « Pommes de terre — dates de retrait », « Pommes de terre — commandes », « Pommes de terre — clients ». Titres seulement (renommés par Claude avec l'accord de Thomas) : l'outil et Make les trouvent par leur identifiant. Les textes de l'outil qui les citent : pull request n° 12 de `brief`. Les sections plus haut et plus bas gardent parfois les anciens noms (historique).
- **« Ma semaine » en réel (27/10)** : pull requests n° 10 et 11 de `brief`, configuration Cloudflare vérifiée par Claude ; premier vrai « Publier » fait par Thomas le 27/10 (aubergines retirées) : Notion et site à jour.
- **« Ma semaine », deuxième partie (28/10)** : pull request n° 13 de `brief` (fiche produit : prix, promo, « Nouveau », « Quantité limitée », « Dernière semaine », photo ; tableau sur ordinateur), à fusionner par Thomas. Rien à changer dans le site : ces champs sont ceux qu'il lit déjà, à la construction suivante. Seul ajout : vignettes `/produits-img/*` en cache 5 minutes au lieu d'un jour (`public/_headers`, commit `1b7c2d8`), pour qu'une nouvelle photo se voie vite dans « Ma semaine ». Sur les pull requests de `brief`, la vérification « Workers Builds: formulaires » est rouge sur la branche (déjà le cas pour les n° 10, 11 et 12) : la mise en ligne se fait à la fusion sur `main`, qui est passée à chaque fois.

- **Préparation du passage (28/10, demande de Thomas)** : adresse définitive **www.augrandjardin.fr** dans le code (`site` d'`astro.config.mjs`, `src/lib/seo.js`) ; les 7 anciennes pages `.html` redirigées en 301 (`src/data/redirections.js`, intégration « redirections », paramètres gardés, vérifié en local) ; `X-Robots-Tag: noindex` sur `*.pages.dev` (`public/_headers`) ; fichiers du jour J dans `bascule/` ; plan clic par clic `docs/plan-bascule.md`. La doc disait à tort que `main` servait augrandjardin.fr : elle sert produits.augrandjardin.fr, l'ancien site est chez IONOS.
- **Potiron Bleu de Hongrie et potimarron (28/10)** : « Mois de récolte » (octobre à décembre), « Cuisson » et « Conservation » écrits par Claude dans « Produits de la ferme » à la demande de Thomas (premier jet, à corriger par Pierre). Le potiron porte les conseils du légume « Courge » (toutes les courges) ; « Avis de Pierre » reste vide.
- **Passage sur www : option A, et trois fonctions de côté (28/10, décision de Thomas)** : DNS, mail et hébergement restent chez IONOS (plan : `docs/plan-bascule.md`). Au passage, l'espace pro reste en veille sur le site seulement (la page de Pierre garde sa rubrique « Pros »), et deux fonctions attendent, chacune avec sa case dans « Réglages du site » (ajoutées par Claude le 28/10, décochées) :
  - **« Commande de pommes de terre en ligne »** (variable d'aperçu `COMMANDE_PDT`) : décochée, la page Pommes de terre affiche « Commandes par téléphone pour le moment » et le numéro de Pierre, sans formulaire, sans étapes du parcours en ligne ni bandeau de test ; le script ne rouvre pas le formulaire même si l'outil répond « ouvert » ; accueil : « Par téléphone ». À rouvrir quand l'outil passe en réel.
  - **« Inscription à la liste ouverte »** (variable `INSCRIPTION_LISTE`) : décochée, `FormulaireSms.astro` affiche « Pour la recevoir, demandez-la à Pierre à la vente, ou appelez-le » et son numéro. À rouvrir avec l'envoi automatique (lot 4), ou si Pierre traite lui-même les inscriptions de la base « Inscriptions SMS ».
  - Textes rendus justes dans les deux cas : message de fermeture (Notion et texte par défaut : « recevez la liste de la semaine »), descriptions des pages, données structurées (« pommes de terre de garde »). Questions fréquentes revues dans Notion (premier jet de Claude, à valider par Pierre) ; à la réouverture, remettre ces réponses d'avant :
    - « Comment commander des pommes de terre ? » : « Choisissez vos filets sur cette page et validez : vous recevez un e-mail de confirmation. Quand Pierre a préparé votre commande, un second e-mail vous permet de choisir votre jour de retrait à la ferme. / Vous réglez sur place, au retrait. » (aujourd'hui : par téléphone).
    - « Comment recevoir la liste de la semaine ? » : « Inscrivez-vous avec le formulaire du site : Pierre envoie la liste une fois par semaine, de début avril à fin décembre, sur WhatsApp, ou par SMS si vous n'avez pas WhatsApp. La liste est aussi publiée sur ce site et sur la page Facebook de la ferme. » (aujourd'hui : « demandez-la-lui à la vente ou par téléphone »).
    - « Peut-on réserver ses légumes ? » et « La ferme est-elle ouverte toute l'année ? » : réponses rendues justes dans les deux cas (« tout est expliqué sur la page Pommes de terre », « recevez la liste de la semaine »), rien à remettre.

## 3. Écarts avec la maquette (volontaires)

- **Espace pro (lot 2).**
  - En-tête : « Prix du lundi 26 octobre » (jour d'affichage) au lieu de « Grille du jeudi … » : les prix sont calculés en direct par l'outil, il n'y a pas de grille figée.
  - Quantités : les boutons + et − avancent d'un kilo ou d'une unité, et le chiffre se tape aussi (demi-kilos acceptés, arrondis au demi-kilo le plus proche). Avec des pas de 0,5 kg aux boutons, 12 kg demandaient 24 appuis.
  - « Comme la semaine dernière » n'apparaît que s'il y a une commande précédente encore commandable.
  - Après l'envoi, le panneau dit « Commande envoyée (PRO-n) » et le bouton devient « Mettre à jour la commande » (modifiable jusqu'au samedi 18 h, tant que Pierre ne l'a pas préparée) ; une fois préparée, la grille passe en lecture seule.
  - Prévisions au téléphone : une seule mention par produit (le premier changement), comme la maquette ; à l'ordinateur, les 4 semaines.
  - Les quantités pas encore envoyées sont gardées dans le navigateur (rechargement, retour sur la page).

- **Professionnels (espace pro en veille depuis le 26/10).** Encart « Pour travailler avec la ferme, contactez Pierre » à la place des boutons ; pas de « Comment ça marche » ni de formulaires ; « restaurants clients » au lieu de « restaurants partenaires ». La maquette reste la cible au printemps.
- **Accueil et La ferme (revue du 26/10).** Chiffres et cartes d'engagement réécrits (Ecocert, 100 % de la ferme, goût, PBI) ; section « Maraîchage Sol Vivant » renommée « Prendre soin du sol » ; section partenaires remplacée par « Où retrouver nos légumes » (les deux listes) ; formulaire de la liste avec le choix WhatsApp ou SMS.
- **Pommes de terre.**
  - Vrai catalogue de l'outil au lieu des sacs de 15 et 25 kg de la maquette.
  - Pastille « Commandes ouvertes » au lieu de « Réservations ouvertes jusqu'au 15 novembre », et bouton « Commander ».
  - Pas de « jour de retrait préféré » : le jour se choisit par le mail « prête ».
  - Bandeau « Mode test » tant que l'outil est en test : il disparaît tout seul en réel.
  - « Cultivées à Lostroff » au lieu de « Cultivées sans traitement chimique à Lostroff » : Pierre ne veut plus de « sans traitement chimique » (revue du 26/10).
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

- **Fonctions de côté, le 28/10 :** 43 tests unitaires (cases et variables dans `tests/reglages.test.js`). Playwright sur la construction normale (cases décochées) contre le catalogue réel : 116 verts, dont `e2e/de-cote.spec.js` et l'audit axe ; construction ouverte (`COMMANDE_PDT=ouverte INSCRIPTION_LISTE=ouverte`, `dist-ouvert/`, `E2E_OUVERT=1`) : inscription et commande vertes, sauf les 2 échecs connus du stock de test sur le catalogue réel, et commande de bout en bout verte contre l'outil simulé (8 sur 8) ; mode fermé (`E2E_FERME=1`) : 18 verts. Captures téléphone et ordinateur vérifiées.

- **Retours de Pierre, le 26/10 au soir :** 39 tests unitaires (dont `tests/ferme.test.js` : lieux actifs, canal ; marchés et espace pro dans `tests/reglages.test.js`). Playwright sur la construction normale (espace en veille) contre le catalogue réel : 100 verts, 2 échecs connus de `commande.spec.js` (stock de test : 1 seul filet de 7 kg de Chérie) ; mode fermé + veille pro (`E2E_FERME=1`, `e2e/pro-veille.spec.js`) : 22 verts ; construction `ESPACE_PRO=ouvert` contre l'outil simulé (`E2E_PRO=1 E2E_COMMANDE=1`, espace pro, commande, pages, en-tête) : 52 verts. Captures téléphone et ordinateur des sections changées vérifiées.
  - En ligne (construction Cloudflare de `cc90fdf`, 21 h 41) : Notion lu (34 produits, 9 créneaux, 8 questions fréquentes), « Site ouvert », règle `/pro/* /professionnels/ 302` dans l'onglet Redirects. Dans Chrome : `/pro/tarifs/` arrive sur Professionnels avec l'encart, aucune ancienne formule sur les 8 pages (F1, chimique, permaculture, Sol Vivant, partenaires, pain, 15 avril, réservation, anciens lieux, marchés), Horaires & contact ne montre que la ferme.
  - Outil, pull request n° 9 : 111 tests unitaires et 30 Playwright verts ; sur Cloudflare, les tests passent mais le déploiement d'aperçu de la branche échoue (« previews » absent de `wrangler.jsonc`), comme pour la n° 8 : la fusion sur `main` déploie normalement.

- **Lot 3, le 26/10 :** 33 tests unitaires (dont `tests/saisons.test.js`) ; Playwright au téléphone et à l'ordinateur sur l'instantané `data/` : 99 verts, dont `e2e/saison.spec.js` (panneau : clic, adresse, Échap et focus, « Retour », croix, lien partagé, lien vers le calendrier ; calendrier : liens « En vente », filtres, texte des mois), axe sur `/calendrier-de-saison/`. Un échec intermittent au téléphone sur `commande.spec.js` (« panier : quantités ») existe aussi sans le lot 3 : le catalogue réel de l'outil recharge la liste pendant le test.
  - En ligne (construction Cloudflare de `fe0de24`, vérifiée dans Chrome) : calendrier avec 34 légumes (30 légumes, 2 aromates, 2 fruits), 21 « En vente » ; 34 panneaux sur la page Produits, dont 27 avec saison et conseils (les 7 autres : potiron et potimarron sans mois ni conseils, confitures, jus et produits transformés) ; `/produits/#carotte-vrac` ouvre le panneau, Échap le ferme, l'adresse revient à `/produits/` et le focus sur la carte.
  - Pour les tests navigateur ici, le Playwright du projet (1.56) ne trouve pas le Chromium préinstallé : installer `@playwright/test@1.63.0` avec `npm i --no-save` avant `npx playwright test`.

- Tests unitaires (`npm test`) : 9 sur 9.
- Tests navigateur en local (`npm run e2e`, Pixel 7 et 1440 × 900), contre l'outil simulé : 39 réussis et 1 ignoré, dont la commande de bout en bout. Accessibilité : 14 sur 14.
- Commande de test depuis l'adresse de test, le 17/10 :
  - **AGJ-3** (1 filet 7 kg Chérie et 1 filet 5 kg d'oignons jaunes, 26,00 €), cochée « Test » dans Commandes AGJ, source « site ».
  - Deux mails reçus sur hey@ : « [TEST → hey@…] Votre commande AGJ-3 est bien enregistrée » et « [TEST → pierre@…] Nouvelle commande AGJ-3 ».
  - Archivée ensuite par `/agj/pierre/diagnostic` : commande AGJ-3 et client « Test Site 2026 », ligne de statistiques retirée, stock rendu. Commandes AGJ et Clients AGJ sont vides.
- Formulaires depuis l'adresse de test, le 17/10 :
  - l'inscription SMS (06 00 00 00 01) et la demande pro « Test (à supprimer) » ont créé leurs lignes « Test » dans Notion ;
  - ces deux lignes ont ensuite été mises à la corbeille.
- Espace pro (avant le lot 2, mot de passe partagé) : un mauvais mot de passe était refusé (401). Remplacé au lot 2 par les accès de l'outil.
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

- **Lot 2, le 26/10 :**
  - Site : 25 tests unitaires (dont `tests/pro-grille.test.js`) ; Playwright au téléphone et à l'ordinateur contre l'outil simulé (`E2E_COMMANDE=1`) : 90 verts, dont `e2e/espace-pro.spec.js` (connexion refusée, grille, paliers, demi-kilos, envoi, modification, « Comme la semaine dernière », prévisions, déconnexion, mode fermé, axe) ; mode fermé (`E2E_FERME=1`) : 18 verts.
  - Outil : 108 tests unitaires et d'API, 28 tests Playwright, audit axe de la page de Pierre : tous verts.

## 5. Règles

- Outil de commande en **mode test** (`AGJ_LIVE` = "0") : commandes « Test », mails seulement vers hey@thomasbonometti.fr. Ne jamais toucher aux vraies commandes, à « Commandes 2025 » ni aux scénarios Make.
- Secrets uniquement dans Cloudflare (`NOTION_TOKEN`), et `.dev.vars` en local (ignoré par git). Les mots de passe des pros sont gérés par l'outil (empreintes seulement, dans « Accès pros »).
- Modifications du dépôt `brief` par pull request, que Thomas fusionne.
- « Réglages du site » est lue par le site et par l'outil de commande ; ni l'un ni l'autre n'y écrit.
- Questions fréquentes : « Publiée » seulement après l'accord de Pierre.

## 6. Points ouverts

- **Retours de Pierre (26/10), côté Thomas** : envoyer le lien à Pierre (brouillon « Le nouveau site, à relire » dans Spark) ; dans « Pommes de terre — catalogue » et « Pommes de terre — dates de retrait » (Thomas, pas Claude) : mettre le vrai stock et les prix de la saison, ouvrir les dates de retrait (pull request n° 9 fusionnée le 26/10 ; échalions retirés par Thomas le 27/10) ; fusionner la pull request n° 12 de `brief` (noms des bases).
- **Retours de Pierre, côté Pierre** (questions dans le mail) : surfaces (parcelle, légumes) ; noms et villes du Greffin, du Bistrot des Oiseaux, de Ma Petite Cuillère ; pommes de terre bio ou non (toutes cochées « Pas bio » dans Notion depuis 2023, le site affiche donc « Non certifié bio » sur elles à côté de « 100 % légumes bio ») ; variétés et prix des pommes de terre (1,60 € ou 1,50 € le kilo) ; le boulanger vient-il encore (les publications Facebook le citent) ; vue aérienne IGN provisoire.
- **Lot 4** : décision 4 du plan rouverte (WhatsApp d'abord). Options A, B, C chiffrées le 27/10 ; Thomas penche pour B (SMS et WhatsApp automatiques par Brevo), que Pierre préfère pour ne plus s'en occuper, sous réserve de ses réponses (deuxième numéro, réponses des clients dans l'appli Brevo). Souhaits de Pierre pour « Ma semaine » : voir `site-web/lot-4-demarrage.md`.
- **Avant le passage sur www** : les prix des filets de « Pommes de terre — catalogue » s'affichent même avec la commande par téléphone : ils doivent être les vrais (Thomas, avec Pierre). Pierre valide « demandez-la à Pierre » (liste) et « commandes par téléphone » (pommes de terre), sur le site et dans les questions fréquentes.
- **Printemps 2027** : rouvrir l'espace pro (case, « Publier », question fréquente des restaurateurs), après des tests sur un aperçu (`ESPACE_PRO=ouvert`) ; choix des produits proposés aux pros (nouveau champ et onglet, à ajouter au plan).
- **Photo aérienne** (`aerien`, La ferme) : pas à jour ; vue IGN provisoire si Pierre est d'accord, drone de son frère au printemps ou en été.

- **Lot 1, côté Thomas** : imprimer l'affichette A5 (artifact ci-dessus, export PDF). Le reste est fait le 22/10 : pull requests n° 4 et 5 fusionnées et en ligne (configuration `2026-10-22.1`), « Formulaire brief » connectée à « Réglages du site » par Claude à la demande de Thomas (la page de vérification de l'outil ne signale plus rien).
- **Lot 1, côté Pierre** : relire les 6 questions en brouillon et les publier.
- **Avant le passage en réel de l'outil** : remplacer le stock de test de « Pommes de terre — catalogue » par le vrai stock de Pierre, ou vider la colonne (vide = pas de limite, pas d'alerte).
- **Accès Notion du site** : l'intégration « Site Au Grand Jardin » est connectée à toute la page « Au Grand Jardin » (vu le 22/10), donc elle voit aussi les commandes et les clients de l'outil, dont le site n'a pas besoin. À restreindre plus tard aux pages que le site lit et écrit, en vérifiant ensuite qu'une publication passe.
- **Lot 2, côté Thomas** : (pull request n° 7 fusionnée le 26/10 ; `PRO_PASSWORD` et `PRO_SECRET` supprimés le 27/10) à la bascule, `AGJ_SITE_URL` = https://augrandjardin.fr dans `wrangler.jsonc` de `brief`.
- **Lot 3, côté Thomas** : autoriser la lecture des commandes de pommes de terre 2026 pour le bilan. Elles ne sont pas dans « Commandes 2025 » : le scénario Make actif « AGJ | 1 - PDT création de commandes » les écrit dans la base « Commandes clients » (Au Grand Jardin 2025 › Commandes de sacs), que Claude n'a pas ouverte. Dire à quelle période Pierre commande ses semences (date limite du bilan).
- **Lot 3, nouveautés en vente le 26/10** : « Potiron Bleu de Hongrie » (légume « Courge ») et « Potimarron (orange) » n'ont ni mois ni conseils : ils n'entrent pas au calendrier et leur panneau n'a que photo, prix et vente.
- **Lot 3, côté Pierre** : écrire « Avis de Pierre », corriger les conseils et les mois ; « Betterave cuite » porte le légume « Betterave » (conseils de la betterave crue) : vider son « Légume » si on préfère ne pas afficher ces conseils sur ce produit.
- **Lot 2, côté Pierre** : corriger « Mois de récolte » dans « Produits de la ferme », remplir « Récolte prévue le » quand il la connaît, régler le minimum de commande dans « Réglages pros » s'il en veut un, puis créer les accès de ses pros (en réel seulement, après le passage de l'outil en réel).

- **Bouton Notion « Publier »** : essayé par Thomas le 21/10 ; la construction de 20 h 27, lancée sans push, est passée. Un clic fait apparaître une nouvelle construction dans Cloudflare environ une minute plus tard.
- **Revue Figma / site** (artifact « Revue site AGJ 2026 ») : les captures datent du 17/10 au matin, avant le pied de page sans arrondis, les animations, l'en-tête collant, la carte Google et la liste des lieux. Elle est à refaire si Thomas veut une revue à jour.
- **Idées d'évolution** : trier les idées 31 à 60 avec Thomas (`docs/idees.md`), puis les ajouter à la note Notion.
- **Horaires** : le Planning ne coche que le samedi 10h – 12h30 ; l'ancien site affichait aussi le mercredi.
- **Photos** : quelques produits sans photo dans Notion affichent une initiale.
- **Bascule** : plan clic par clic dans `docs/plan-bascule.md` (28/10). Adresse www.augrandjardin.fr (déjà dans le code) ; anciennes pages `.html` redirigées (`_redirects`) ; augrandjardin.fr sans www renvoyé vers www par `bascule/ionos/.htaccess` (option A, recommandée) ou DNS chez Cloudflare (option B) : **choix de Thomas** ; produits.augrandjardin.fr renvoyé vers `/produits/` par `bascule/produits/` sur la branche `main` (après l'arrêt du scénario Make « Notion -> Github » par Thomas) ; la commande de pommes de terre passe en réel le même jour ou reste fermée ; `AGJ_SITE_URL` de l'outil vers www.
- **Plus tard** : habiller les pages de l'outil (`/agj/retrait/`, bon de commande) à la charte du site, en CSS seul dans `brief`.
