# Site Au Grand Jardin 2026 — consignes pour Claude

Nouveau site d'Au Grand Jardin, la ferme maraîchère bio de Pierre Fouquet (43 rue Principale, 57670 Lostroff). Il est construit d'après les maquettes Figma et lit Notion. Il prend des commandes de pommes de terre grâce à l'outil de commande du dépôt `brief`.

- **En ligne en test :** https://agj-site-2026.pages.dev (non indexé).
- **Branche :** `site-2026`. La branche `main` sert produits.augrandjardin.fr (la liste de la semaine, GitHub Pages, mise à jour par Make) ; augrandjardin.fr et www sont l'ancien site, hébergé chez IONOS (vérifié le 27/10). Ni `main` ni IONOS ne bougent avant le passage (plan : `docs/plan-bascule.md`).
- **Interlocuteur :** Thomas Bonometti, designer freelance. Il gère la communication de la ferme et pilote le site. Pierre n'est pas technique : il ne touche qu'à Notion et à sa page de commandes.

Avant de modifier quoi que ce soit, lire :
- ce fichier ;
- `docs/passation.md` (décisions, écarts avec la maquette, vérifications, points ouverts) ;
- `docs/idees.md` (pistes d'évolution déjà proposées) ;
- `README.md` (fonctionnement technique, secrets, bascule) et `docs/plan-bascule.md` (passage sur www.augrandjardin.fr, clic par clic).

---

## Règles fixées par Thomas (non négociables)

- **Où travailler :**
  - Seulement sur la branche `site-2026`, jamais sur `main`.
  - Petites étapes commitées, messages de commit en français.
  - Après chaque push, vérifier que Cloudflare a bien publié.
- **Dépôt `brief` (outil de commande) :** modifications seulement par pull request, que Thomas fusionne. Lire son `CLAUDE.md` avant d'y toucher.
- **Secrets :**
  - Uniquement dans Cloudflare, ou dans `.dev.vars` en local (fichier ignoré par git).
  - Jamais dans le dépôt, les docs, Notion ou la mémoire.
  - Thomas saisit lui-même les secrets et mots de passe. Claude ne tape jamais un mot de passe dans son navigateur et n'accepte pas de consentement (cookies, conditions) à sa place.
- **Outil de commande en mode test** (`AGJ_LIVE` = "0") :
  - Les commandes sont cochées « Test » et les mails ne partent qu'à hey@thomasbonometti.fr.
  - Ne jamais toucher aux vraies commandes, à l'ancienne base « Commandes 2025 » ni aux scénarios Make (Thomas les éteint lui-même).
  - **Ne jamais écrire directement dans les bases Notion de l'outil** : passer par son API.
- **Notion « Produits de la ferme » en lecture seule :** elle alimente aussi les publications Facebook (Notion → Make → Metricool). Pas de champ renommé ni supprimé ; un nouveau champ seulement avec l'accord de Thomas. Seule exception : « Ma semaine », dans la page de Pierre (outil de commande, lot 4, décision 6 du plan), écrit seulement les champs de cette décision : « En vente » (en réel depuis le 27/10), et avec la pull request n° 13 de `brief` les prix, la promo, « Nouveau », « Quantité limitée », « Dernière semaine » et la photo (« Image principale »).
- **Textes de la ferme :**
  - « Bio » est validé par Thomas (16/10) ; les produits cochés « Pas bio » n'ont pas la mention.
  - Validé par Pierre à la revue du 26/10/2026 (compte rendu dans Notion, lien dans le document du projet `site-web/retours-pierre-26-10.md`) : en conversion bio dès 2020, certifiée par Ecocert depuis 2023 ; semences paysannes **et** hybrides ; protection biologique intégrée (insectes prédateurs contre les pucerons, pas de traitement, même au savon noir) ; paillage, haies, fleurs, respect des saisons ; sol nourri de matière organique, travaillé le moins possible, toujours couvert ; variétés testées pour le goût ; tout ce qui est vendu vient de la ferme ; « maraîcher bio à Lostroff depuis 2020 ».
  - **Ne plus écrire** : « aucun produit chimique » ou « sans traitement chimique », « zéro semence hybride F1 », « 100 % semences paysannes », permaculture, « pas de labour », le nom « Maraîchage Sol Vivant », partenaires, le pain, « commander ou réserver par SMS ». Toute autre affirmation attend la validation de Pierre.
  - Aucun chiffre ni nom inventé : une surface, une ville ou une orthographe inconnue reste absente (la phrase tient sans), jamais devinée.
- **Technique :** pas de framework lourd. Astro en site statique et un peu de JavaScript ; GSAP est autorisé, à la demande de Thomas. Site rapide, accessible (WCAG AA) et bon référencement local.
- **Communication :**
  - Répondre en français.
  - Quand une action est du côté de Thomas (Cloudflare, Notion), donner les étapes clic par clic avec les liens.
  - Pour Pierre, des mots simples.

---

## Où sont les choses

| Quoi | Où |
|---|---|
| Hébergement | Cloudflare Pages, projet `agj-site-2026`, branche de production `site-2026`. Un push sur la branche lance une construction d'environ 1 min 30. Tableau de bord : https://dash.cloudflare.com/d8b8981d6131714bee280d9a814f9230/pages/view/agj-site-2026 |
| Construction | `npm run build` (synchro Notion + outil de commande, puis Astro), sortie `dist/`, Node 22 (`.node-version`) |
| Secrets Cloudflare | `NOTION_TOKEN` (intégration Notion « Site Au Grand Jardin »). `PRO_PASSWORD` et `PRO_SECRET` ne servent plus depuis le lot 2 (accès pros gérés par l'outil). Variables facultatives : `SITE_INDEXABLE=oui` (à la mise en ligne réelle), `AGJ_URL`, `ESPACE_PRO` (`ouvert` ou `ferme`, passe avant la case de Réglages du site : seulement dans l'environnement « Preview », pour tester l'espace pro sur un aperçu), et de même `COMMANDE_PDT` et `INSCRIPTION_LISTE` (`ouverte` ou `fermee`) |
| Bouton « Publier » | Dans la page Notion « Site augrandjardin.fr » : il appelle l'adresse de reconstruction (deploy hook) de Cloudflare. Essayé par Thomas le 21/10 : la construction de 20 h 27, lancée sans push, est passée. « Publier » de « Ma semaine » (page de Pierre) relance aussi la construction, par sa propre adresse de reconstruction (secret `SITE_DEPLOY_HOOK` du Worker de l'outil) |
| Intégration Notion | « Site Au Grand Jardin » (lecture et insertion). Elle doit rester connectée à la base Produits de la ferme, à la base 📅 Planning semaine et à la page « Site augrandjardin.fr ». Sans l'une d'elles, la construction échoue avec un message qui nomme la base |
| Notion lu | Produits de la ferme `collection://5fb0d75e-67d6-4840-a703-2c6e0b3eaa11` (lignes « En vente », et pour le calendrier toutes les lignes qui ont un « Légume ») ; Planning `collection://152a41f4-8718-45e1-9025-40f3da0572e3` (base https://www.notion.so/thomasbonometti/e03d71b964dd43a4be5595d72c401383). Sous la page « Site augrandjardin.fr » : Réglages du site `collection://cc35fc8e-c976-44f0-b213-31eed14e3bee` (une seule ligne : mode fermé, message de la semaine, « Afficher les marchés », « Espace pro ouvert », « Commandes de pommes de terre ouvertes », « Inscription à la liste ouverte » ; l'outil de commande la lit aussi : les trois colonnes du mode fermé et, avec la pull request n° 14 de `brief`, « Commandes de pommes de terre ouvertes ») et Questions fréquentes `collection://a8d7a11c-2204-4c8b-ab4e-23c749bd4452` (lignes « Publiée ») |
| Notion écrit par le site | Page « Site augrandjardin.fr » `3fb70bd669cd81a5a2a0cfc84d7016a2` : bases Inscriptions SMS `collection://1f9db94f-6b9f-4ba2-aae7-d67ea66cae6f` (avec « Canal » : WhatsApp ou SMS, depuis le 26/10) et Demandes d'accès pro `collection://95af73b3-86bc-4013-adb6-ccbe215a44d0`. Ce qui vient de l'adresse de test est coché « Test ». Historique des listes `collection://5fced6cb-eabb-46cd-beb2-00ee278afd91` : écrit par la construction (voir Tâches courantes) |
| Statistiques de visite | Cloudflare Web Analytics, activé par Thomas le 21/10 : Cloudflare ajoute lui-même son script (`static.cloudflareinsights.com`), rien dans le code. `public/_headers` n'a pas de Content-Security-Policy ; si on en ajoute une, autoriser ce script et `cloudflareinsights.com`. Une ligne des mentions légales en parle |
| Plan d'évolutions | Document du projet Claude « Au Grand Jardin » : `site-web/plan-evolutions.md`. Il fait foi, un lot à la fois. Lot 1 livré le 21/10, lot 2 (espace pro, espace de Pierre) le 26/10, lot 3 (panneau produit, calendrier de saison) en ligne le 26/10 ; état du lot 3 : `site-web/lot-3-en-cours.md`. Retours de Pierre du 26/10 appliqués le même soir : `site-web/retours-pierre-26-10.md` |
| Affichette QR codes | Artifact « Affichette QR codes Au Grand Jardin » (A5 à imprimer) : https://claude.ai/artifact/VeEkgWUy3TQc5uHP3j2pR2. Codes vers `https://produits.augrandjardin.fr/?src=qr` et l'avis Google `https://g.page/r/CVcpGhGHIj7rEAE/review` |
| Outil de commande | Dépôt `thomasbonometti/brief`, Worker `formulaires` : https://formulaires.hey-d8b.workers.dev. Page de Pierre `/agj/pierre` (rubriques Ma semaine, À préparer, Pros, Pommes de terre, Chiffres), vérification et archivage des données de test `/agj/pierre/diagnostic`. Espace pro : accès, grille, commandes pros et mails planifiés sont dans l'outil (bases « Accès pros », « Commandes pros », « Réglages pros »). Son intégration Notion s'appelle « Formulaire brief » (connectée à « Commandes en ligne », à « Réglages du site » pour le mode fermé, et depuis le 22/10 à « Produits de la ferme » en lecture et à « Demandes d'accès pro » pour leur statut). Dans Notion, les connexions d'une page sont sous ••• → Plus → Connexions |
| Maquettes | Figma « Au Grand Jardin \| Site 2026 », fileKey `zrlhOtAHZaw02nvLTnaswz`. Bureau : 13:2 Accueil, 14:2 Produits, 15:2 La ferme, 16:2 Pommes de terre, 17:2 Professionnels, 18:2 Espace pro (avant le lot 2), 19:2 Horaires & contact. Téléphone : 38:2, menu 37:2, 39:2 à 44:2 dans le même ordre. Lot 2 : grille pro 65:50 (bureau), 68:286 et 68:1046 (téléphone) ; espace de Pierre sur la page « 🛠 Espace de Pierre (lot 2) » |
| Revue Figma / site | Artifact « Revue site AGJ 2026 » : https://claude.ai/artifact/QCPcPS8N1G7SwUF6TDYSWw (captures du 17/10) |
| Idées d'évolution | `docs/idees.md` ; les idées 1 à 30 sont aussi dans la note Notion « Au Grand Jardin — 30 idées de services pour le nouveau site » (base Notes Studio) : https://app.notion.com/p/3fd70bd669cd81cf8fccdc15dc3d6834 |

---

## Plan du code

- `scripts/sync-notion.mjs` : lit Produits, Planning, Réglages du site et Questions fréquentes, télécharge les photos, écrit `data/*.json` (dont `reglages.json` et `faq.json`) et les photos WebP, puis copie la liste dans Historique des listes (sur Cloudflare seulement). Sans `NOTION_TOKEN`, garde l'instantané de `data/`. La correspondance des champs est dans `mapProduit`, `mapPlanning`, `mapReglages` et `mapQuestion`.
- `scripts/construire-ferme.mjs` : construit le site en mode fermé dans `dist-ferme/`, pour les tests du mode fermé.
- `scripts/fetch-agj.mjs` : catalogue et configuration de l'outil de commande dans `data/agj-*.json`. Si l'outil ne répond pas, la copie précédente est gardée.
- `src/data/ferme.js` : coordonnées, mentions légales, partenaires, restaurants, points de vente (chaque lieu avec `actif` ; `ville: null` quand elle est inconnue), navigation, lien de la carte Google (`carteGoogle`).
- `src/lib/` :
  - `vente.js` : prix, rayons, créneaux, lieux (`lireLieux`), prochaine vente, nouveautés et vedettes ;
  - `saisons.js` : fiches par légume (mois et conseils réunis sur toutes les lignes du même « Légume »), calendrier, résumé du mois, plages de mois en français, ancres des panneaux (`#carotte-vrac`) ;
  - `donnees.js` : charge les données ;
  - `pdt.js` : résumé du catalogue des pommes de terre ;
  - `commande-rendu.js` : rendu HTML de la liste de commande, partagé entre construction et navigateur ;
  - `pro-grille.js` : espace pro, aperçu du panier (paliers, TVA) et rendu de la grille et des prévisions (l'outil recalcule tout à l'envoi) ;
  - `typo.js` : espaces insécables ;
  - `reglages.js` : mode fermé (`lireFermeture`), message de la semaine (`lireAnnonce`), marchés masqués (`creneauxAffiches`), espace pro ouvert ou en veille (`lireEspacePro`), commandes de pommes de terre ouvertes ou non (`lireCommandesPdt`), inscription à la liste ouverte ou non (`lireInscriptionListe`), questions fréquentes (réponse Notion en HTML sûr, données structurées FAQPage) ;
  - `historique.js` : texte et JSON de la liste copiée dans Historique des listes ;
  - `seo.js` : données structurées ;
  - `agj/cart.js` : copie de secours du panier de l'outil.
- `src/layouts/Base.astro` : `<head>`, menu mobile, en-tête collant (caché en descendant, de retour en remontant), chargement des animations.
- `src/components/` : barre verte (avec le message de la semaine), en-tête, pied de page, photo, carte produit, formulaire SMS, icônes, logo, `EncartFermeture.astro` (encart « Ventes en pause » à la place d'une liste, de la commande ou de la grille pro), `QuestionsFrequentes.astro` (accordéon `<details>` et données structurées), `PanneauProduit.astro` (un `<dialog>` par produit en vente : photo, prix, prochaine vente, saison, cuisson, conservation, avis de Pierre ; ouvert par le script de `produits.astro`).
- `src/scripts/` :
  - `formulaires.ts` : formulaires SMS, demande pro, connexion pro (`data-redirection` : l'adresse ouverte après un envoi réussi) ;
  - `espace-pro.ts` : espace pro (`/pro/tarifs/`) : grille du pro, quantités, panneau « Votre commande » (fenêtre du bas sur téléphone), envoi, « Comme la semaine dernière », prévisions, mode fermé ;
  - `commande.ts` : commande de pommes de terre ;
  - `animer.ts` : GSAP, chargé seulement si le visiteur accepte les animations.
- `src/pages/` : les 7 pages, `calendrier-de-saison.astro` (hors du menu), mentions légales, 404, `sitemap.xml`, `robots.txt`. `pro/tarifs.astro` est une page sans prix : tout vient de l'outil pour le pro connecté.
- `functions/` (Cloudflare Pages Functions) :
  - relais vers l'outil (`/api/agj/catalog`, `/api/agj/order`, `/agj/config.json`, `/agj/lib/cart.js`) ;
  - relais de l'espace pro `api/agj/pro/[action].js` (`login`, `logout`, `grille`, `commande`) : seul le cookie `agj_pro` part vers l'outil, et sa réponse `Set-Cookie` revient ; la connexion efface l'ancien cookie du mot de passe partagé ;
  - `api/inscription-sms.js` (numéro et canal WhatsApp ou SMS, `_lib/canal.js`), `api/demande-pro.js` (écriture dans Notion).
- `astro.config.mjs` : adresse du site (`site` : https://www.augrandjardin.fr, ou la variable `SITE_URL`) ; l'intégration « typographie-francaise » pose les espaces insécables sur chaque page construite ; « redirections » écrit `dist/_redirects` : les anciennes adresses `.html` du site d'avant 2026 vers les nouvelles pages (301, liste dans `src/data/redirections.js`), `/pro/*` → `/professionnels/` quand l'espace pro est en veille, et `/pommes-de-terre/*` → `/` quand les commandes de pommes de terre sont fermées (la page est alors retirée de `dist/`).
- `public/_headers` : en-têtes de sécurité et de cache ; `X-Robots-Tag: noindex` sur `*.pages.dev`, pour que l'adresse de test ne soit jamais indexée, même après le passage.
- `bascule/` : fichiers prêts pour le jour du passage, hors du site construit : `ionos/.htaccess` (augrandjardin.fr sans www → www, à déposer chez IONOS) et `produits/` (`index.html`, `404.html` : produits.augrandjardin.fr → `/produits/`, pour la branche `main`). Voir `docs/plan-bascule.md`.
- `tests/` : tests unitaires (`npm test`). `e2e/` : tests navigateur Playwright, sur téléphone (Pixel 7) et ordinateur (1440 × 900).

---

## Tâches courantes

- **Changer un texte :**
  - Dans la page `.astro` concernée, ou dans `src/data/ferme.js` pour les coordonnées et les listes.
  - Les espaces insécables se posent tout seuls.
  - Les textes des produits viennent de Notion : ne pas les recopier dans le code.
- **Lieux (restaurants, points de vente, partenaires) :** dans `src/data/ferme.js`. Pierre ne veut rien effacer : un lieu qui ne travaille plus avec la ferme passe à `actif: false`, et revient avec `true`. La page La ferme n'affiche les cartes de partenaires que s'il y en a d'actifs (aucun depuis le 26/10) ; le nombre de « restaurants clients » de la page Professionnels compte les actifs.
- **Marchés et fêtes :** Pierre n'en fait plus (26/10). Le site ne montre que les créneaux « à la ferme » du Planning (barre verte, Horaires & contact, pied de page, fiche Google, historique). Pour les rouvrir : case « Afficher les marchés » de Réglages du site, puis « Publier » ; les textes de Horaires & contact et de l'accueil remettent « et les marchés ». Ne rien changer dans le Planning (Make le lit).
- **Liste de la semaine :** aujourd'hui, Pierre l'envoie lui-même, sur WhatsApp ou par SMS pour qui n'a pas WhatsApp, de début avril à fin décembre, sans réservation (sauf les pommes de terre). Le formulaire (`FormulaireSms.astro`) demande le numéro et le canal (WhatsApp par défaut) ; la fonction l'écrit dans « Canal ». Case « Inscription à la liste ouverte » de Réglages du site : **cochée par Thomas le 28/10 (11 h)**, pour que Pierre ne reçoive pas d'appels ; décochée, le formulaire laisse la place à « demandez-la à Pierre à la vente, ou appelez-le » et son numéro. Suivi des inscrits : vue « À ajouter à la liste » de la base Inscriptions SMS (« Statut » Nouveau, hors « Test ») ; une fois le numéro ajouté à la liste de Pierre, « Statut » passe à « Ajouté à la liste ». Un formulaire Brevo intégré a été écarté (28/10 : pas de compte Brevo de la ferme, formulaire tiers moins accessible). L'envoi automatique (lot 4) attend la décision de Thomas sur WhatsApp.
- **Commandes de pommes de terre (période choisie par Pierre, Thomas le 28/10) :** case « Commandes de pommes de terre ouvertes » de Réglages du site. Cochée : page Pommes de terre, commande en ligne (exceptionnellement par téléphone). Décochée (aujourd'hui) : plus de commande du tout. La page n'est pas construite, `/pommes-de-terre/` renvoie vers l'accueil, et elle disparaît du menu (`navigationAffichee` de `donnees.js`), du plan du site, de l'accueil (« Trois façons ») et des descriptions. L'outil de commande lit la même case et refuse les commandes en ligne (pull request n° 14 de `brief`). Ouvrir : outil en réel, vrais prix, stock et dates de retrait, cocher, « Publier ». Fermer : décocher, « Publier ». Tout texte affiché hors de la page Pommes de terre doit rester juste quand elle n'existe pas (pas de lien vers elle).
- **Fonctions de côté (décision de Thomas du 28/10, jusqu'à nouvel ordre) :** l'espace pro (voir plus bas). L'inscription à la liste, de côté le matin du 28/10, est rouverte depuis 11 h (ci-dessus) ; la commande de pommes de terre suit la période de Pierre. Pour rouvrir : cocher la case, remettre les réponses des questions fréquentes notées dans `docs/passation.md`, « Publier ». Pour essayer sans rouvrir : aperçu Cloudflare avec `COMMANDE_PDT=ouverte` ou `INSCRIPTION_LISTE=ouverte` en « Preview ». Ne pas écrire « inscrivez-vous » dans un texte qui s'affiche quand l'inscription est de côté.
- **Espace pro en veille (jusqu'au printemps 2027) :** case « Espace pro ouvert » de Réglages du site, décochée. La page Professionnels affiche en haut l'encart « contactez Pierre » (téléphone, mail), sans étapes ni formulaires, et `/pro/*` renvoie vers elle. Au printemps : cocher la case, « Publier », remettre la question fréquente des restaurateurs sur la demande d'accès. Pour tester avant : une branche poussée sur GitHub donne un aperçu Cloudflare ; y mettre `ESPACE_PRO=ouvert` dans l'environnement « Preview » (Settings → Variables and Secrets), jamais en « Production ». Ne pas créer de vrais accès pros avant la réouverture.
- **Ajouter un champ Notion au site :**
  - Le champ doit exister dans Notion. Pour Produits de la ferme, il faut l'accord de Thomas.
  - Ajouter la correspondance dans `mapProduit` ou `mapPlanning`, l'utiliser dans `src/lib/`, puis mettre à jour l'instantané `data/` si besoin.
- **Ajouter une page :**
  - Créer le fichier dans `src/pages/`.
  - L'ajouter à `navigation` dans `src/data/ferme.js` si elle va dans le menu, à `PAGES` dans `src/pages/sitemap.xml.js` et aux listes de pages des tests e2e (`pages.spec.js`, `accessibilite.spec.js`, `animations.spec.js`).
- **Animations :**
  - Attributs `data-anim` (valeurs `monte`, `pop`, `cartes`, `photo`, `mots`, `tampon`, `epingle`), `data-anim-groupe` (les enfants apparaissent l'un après l'autre), `data-compteur` (les nombres comptent depuis 0) et `data-parallaxe` (`="flotte"` pour l'élément lui-même). Le mode d'emploi est en tête de `src/scripts/animer.ts`.
  - Ne pas mettre `data-anim-groupe` sur un conteneur qu'un script réécrit : un garde-fou existe, mais l'animation serait perdue.
  - Le formulaire de commande et la grille pro ne s'animent pas.
- **En-tête collant :** les hauteurs sont `--h-barre` et `--h-entete` dans `src/styles/global.css`. Les changer si la barre verte ou l'en-tête change de hauteur. La classe `html.entete-cache` indique que l'en-tête est caché.
- **Carte Google (Horaires & contact) :**
  - Le lien est dans `ferme.carteGoogle`.
  - La carte se charge au clic, et le choix est retenu (`localStorage` `agj-carte-google`). Les mentions légales en parlent.
  - Sur ordinateur, le haut de la carte est rogné de `--rogne` (160 px) pour masquer la fiche Google sous la nôtre.
- **Mode fermé (pause d'hiver, congés) :**
  - Dans Notion, base « Réglages du site » (page « Site augrandjardin.fr ») : cocher « Fermé », remplir « Reprise le » et, si besoin, « Message de fermeture » (sinon un texte par défaut), puis « Publier ».
  - Sur le site : barre verte « Ventes en pause, reprise le … » ; la liste de la semaine, la commande de pommes de terre et la grille pro laissent la place à `EncartFermeture` (inscription à la liste de la semaine, Facebook) ; chiffres « reprise des ventes » ; aucun lieu « Cette semaine » ; pas de copie dans l'historique.
  - L'outil de commande lit la même case, en direct (pull request n° 4 du dépôt `brief`) : `/agj` fermé jusqu'au jour de la reprise, commandes par téléphone toujours possibles, mails des commandes en cours maintenus.
  - Réouverture : le site est statique, il rouvre à une publication. Celle de la semaine de la reprise suffit (la prochaine vente du Planning tombe le jour de la reprise ou après), comme toute publication faite à partir du jour de la reprise. Sans date de reprise, décocher « Fermé ». La semaine de la reprise, mettre la liste à jour avant de publier : elle s'affiche aussitôt.
- **Message de la semaine :** même base, « Afficher le message » coché et « Message de la semaine » rempli : un bandeau « À noter » sous la barre verte, sur toutes les pages, à la publication suivante. Décocher pour l'enlever.
- **Questions fréquentes :**
  - Base « Questions fréquentes » (page « Site augrandjardin.fr ») : `Question`, `Réponse` (gras, italique et liens gardés ; un retour à la ligne = un paragraphe), `Pages` (où elle s'affiche : Accueil, Produits, La ferme, Pommes de terre, Professionnels, Horaires & contact), `Ordre` (petit = en haut), `Publiée`.
  - Seules les lignes « Publiée » partent sur le site, à la publication suivante. Si la base est illisible, la construction garde `data/faq.json`.
  - Premier jet de Claude, validation de Pierre : ne cocher « Publiée » qu'après son accord (6 brouillons attendent au 21/10).
  - Nouvelle page : ajouter l'option dans `Pages`, puis `<QuestionsFrequentes page="…" />` dans la page.
- **Espace pro :**
  - Les accès se créent dans la page de Pierre (`/agj/pierre`, rubrique « Pros » → « + Nouvel accès », ou « Créer l'accès » sur une demande du site). Le mot de passe s'affiche une seule fois ; « Envoyer par mail » l'envoie au pro (en mode test, à hey@thomasbonometti.fr).
  - Le site ne fait que relayer : prix, remise, paliers, livraison, mode fermé et prévisions sont calculés par l'outil, en direct (cache d'une minute). Un changement dans « Produits de la ferme » ou « Réglages pros » apparaît sans publier le site.
  - Le lien des mails aux pros est `AGJ_SITE_URL` (`wrangler.jsonc` de `brief`) + `/pro/tarifs/` : à changer à la bascule.
  - En local : l'outil simulé crée les pros (`POST /api/agj/admin/pros/creer` connecté comme Pierre, mot de passe `pierre`), voir `e2e/espace-pro.spec.js`.
- **Conseils et calendrier de saison (lot 3) :**
  - Dans « Produits de la ferme », le champ « Légume » regroupe les lignes d'un même légume (vrac, botte, 500 g). « Mois de récolte », « Cuisson », « Conservation » et « Avis de Pierre » valent pour tout le légume : il suffit de les remplir sur une ligne (s'il y en a plusieurs, la ligne en vente l'emporte). Visible à la publication suivante.
  - Le panneau s'ouvre pour chaque produit en vente (`/produits/#<ancre>`) ; chaque partie n'apparaît que si elle est remplie. Produits sans « Légume » (partenaires, transformés) : photo, prix et description seulement.
  - Le calendrier montre les légumes de la ferme (« Producteur » = Au Grand Jardin, catégories Légumes, Plantes aromatiques, Fruits) qui ont au moins un mois. Un légume sans mois n'y est pas. Mois en cours et cartes « De saison », « Arrive en », « Dernières semaines » : calculés à la construction.
  - « Avis de Pierre » : seulement ses mots à lui (questions à lui poser dans le document des conseils).
- **Ma semaine (page de Pierre, lot 4) :** Pierre met un produit en vente ou le retire (en réel depuis le 27/10, pull requests n° 10 et 11 de `brief`) ; avec la pull request n° 13, il change aussi le prix, la promo, les mentions (« Nouveau », « Quantité limitée », « Dernière semaine ») et la photo. Puis « Publier » : l'outil écrit ces champs dans « Produits de la ferme » (décision 6, rien d'autre) et relance la construction du site. Les vignettes de la rubrique sont celles du site (`/produits-img/<id>-400.webp`, en cache 5 minutes pour qu'une nouvelle photo se voie vite) : ne pas changer ce chemin sans prévenir l'outil. Le code et le mode essai sont dans le dépôt `brief`.
- **Historique des listes :** rien à faire. Chaque construction sur Cloudflare (branches `site-2026` et `main`) ajoute une ligne quand la liste a changé depuis la dernière (texte lisible et JSON), sauf en mode fermé. Il servira au bilan de saison (B2).
- **Données de test :**
  - Une commande de test depuis l'adresse de test est permise (outil en mode test).
  - Ensuite, archiver par `/agj/pierre/diagnostic`, « Archiver les données de test », puis « Oui, archiver » (confirmation dans la page depuis la pull request n° 7 de `brief` ; avant sa fusion, le bouton ouvre un `confirm()` qui bloque l'outil Chrome : remplacer d'abord `window.confirm = () => true` dans la page, ou demander à Thomas). Les accès pros et commandes pros « Test » sont archivés aussi.
  - Mettre à la corbeille les lignes « Test » des deux bases du site.
  - Lister à Thomas ce qui a été archivé.

---

## Vérifier avant de rendre

1. `npm test` (tests unitaires), puis `npm run build:local` (construit avec l'instantané `data/`, sans jeton Notion).
2. Servir le site en local avec les fonctions, sur le catalogue réel de l'outil (lecture seule) :
   `npx wrangler pages dev dist --port 8789 --compatibility-date=2026-09-15 --binding AGJ_URL=https://formulaires.hey-d8b.workers.dev`
   puis `npx playwright test` (`BASE_URL` vaut `http://localhost:8789` par défaut). Les tests de la page Pommes de terre (`commande.spec.js`, et cette page dans `pages.spec.js`, `accessibilite.spec.js`, `animations.spec.js`, `faq.spec.js`) et de l'inscription ne tournent que si leur case est cochée (`e2e/etat.js` lit `data/reglages.json` ; `E2E_OUVERT=1` : tout ouvert ; `E2E_PDT` ou `E2E_INSCRIPTION` = `ouverte`/`fermee` pour un aperçu) ; case décochée, `e2e/de-cote.spec.js` vérifie l'absence de la page ou le bloc « demandez-la à Pierre ». Pour la page Pommes de terre (fermée aujourd'hui) : `COMMANDE_PDT=ouverte INSCRIPTION_LISTE=ouverte npx astro build --outDir dist-ouvert`, servir `dist-ouvert` de la même façon (autre port), puis `E2E_OUVERT=1 BASE_URL=http://localhost:<port> npx playwright test e2e/commande.spec.js e2e/pages.spec.js`. Si Playwright ne trouve pas son navigateur dans le conteneur, installer la version du Chromium préinstallé sans toucher au projet : `npm i --no-save @playwright/test@1.63.0`. Arrêter ensuite le serveur par numéro de processus : un `pkill -f` sur la commande tue aussi le shell.
3. Commande de bout en bout sans toucher à l'outil en ligne :
   - Dans le dépôt `brief`, lancer `AGJ_FAKE=1 npm run dev` (outil simulé sur le port 8787).
   - Ici, servir sans `--binding` : `.dev.vars` pointe vers `localhost:8787`.
   - Lancer `E2E_OUVERT=1 E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 npx playwright test e2e/commande.spec.js` sur `dist-ouvert` (commande de pommes de terre).
   - Espace pro (en veille depuis le 26/10) : construire avec l'espace ouvert, `ESPACE_PRO=ouvert npx astro build --outDir dist-pro`, servir `dist-pro` sans `--binding`, puis `E2E_PRO=1 E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 npx playwright test e2e/espace-pro.spec.js` (`e2e/espace-pro.spec.js` crée un pro dans l'outil simulé). Sur la construction normale, `e2e/pro-veille.spec.js` vérifie la veille.
   - Sur le catalogue réel de l'outil (point 2), le test « panier : quantités » de `commande.spec.js` échoue tant que le stock de test n'a qu'un filet de 7 kg de Chérie : il passe contre l'outil simulé.
4. Mode fermé : `node scripts/construire-ferme.mjs` (version fermée dans `dist-ferme/`, reprise dans 90 jours, `data/reglages.json` remis tel quel), la servir sur le port 8790 comme au point 2, puis `E2E_FERME=1 BASE_URL=http://localhost:8790 npx playwright test e2e/fermeture.spec.js`.
5. Push sur `site-2026`, puis vérifier dans Cloudflare (Deployments) que la construction a réussi. Le journal de construction indique « Site ouvert » ou « mode fermé », le nombre de questions fréquentes et ce qui est arrivé à l'historique des listes.
6. Le conteneur de travail n'atteint pas `*.pages.dev` : vérifier l'adresse de test avec Claude in Chrome, dans le Chrome de Thomas. Ouvrir son propre onglet, et ne laisser aucune trace (pas de choix mémorisé, pas de mot de passe).
7. Si la construction Cloudflare échoue :
   - Ouvrir le déploiement et faire défiler le panneau « Build log » avec des captures (lire le texte par JavaScript est bloqué sur le tableau de bord).
   - Une erreur Notion 404 nomme la base à connecter à l'intégration.

## Pièges déjà rencontrés

- Le CSS d'un composant Astro ne s'applique pas au HTML injecté par un script : utiliser `:global(...)`.
- La classe `.ligne` est un séparateur global : ne pas la réutiliser pour autre chose (la grille pro utilise `.rangee`).
- `picture { display: contents }` et `picture > source { display: none }` sont voulus : les images remplissent ainsi leur cadre.
- L'audit d'accessibilité (axe) tourne sur l'état final, avec les animations coupées (`reducedMotion: 'reduce'`). Sinon, il signale des contrastes en pleine animation.
- `commande.ts` ne réécrit le titre et les prix de la page Pommes de terre que s'ils ont changé, pour ne pas couper l'animation d'arrivée.
- Un `confirm()` ou un `alert()` déclenché dans le Chrome de Thomas bloque l'outil Chrome.
- Le cookie de l'espace pro (`agj_pro`) a pour chemin `/api/agj/pro` : il n'est envoyé qu'au relais, jamais aux pages. L'ancien cookie du mot de passe partagé portait le même nom au chemin `/` ; le relais lit le premier (le plus précis) et la connexion efface l'ancien.
- Les heures de vente sont calculées à la construction. Après la vente du samedi, la barre annonce le samedi suivant dès la prochaine publication ; entre-temps, un script retire la date passée.
- Le mode fermé aussi est calculé à la construction : la date de reprise ne rouvre le site qu'à une publication (voir Tâches courantes).
- Notion change parfois les espaces insécables d'un texte : l'historique compare les listes sans tenir compte des espaces.
