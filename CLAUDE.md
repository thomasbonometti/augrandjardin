# Site Au Grand Jardin 2026 — consignes pour Claude

Nouveau site d'Au Grand Jardin, la ferme maraîchère bio de Pierre Fouquet (43 rue Principale, 57670 Lostroff). Il est construit d'après les maquettes Figma et lit Notion. Il prend des commandes de pommes de terre grâce à l'outil de commande du dépôt `brief`.

- **En ligne en test :** https://agj-site-2026.pages.dev (non indexé).
- **Branche :** `site-2026`. La branche `main` sert encore l'ancien site augrandjardin.fr (GitHub Pages) et ne doit pas bouger avant la bascule.
- **Interlocuteur :** Thomas Bonometti, designer freelance. Il gère la communication de la ferme et pilote le site. Pierre n'est pas technique : il ne touche qu'à Notion et à sa page de commandes.

Avant de modifier quoi que ce soit, lire :
- ce fichier ;
- `docs/passation.md` (décisions, écarts avec la maquette, vérifications, points ouverts) ;
- `docs/idees.md` (pistes d'évolution déjà proposées) ;
- `README.md` (fonctionnement technique, secrets, bascule).

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
- **Notion « Produits de la ferme » en lecture seule :** elle alimente aussi les publications Facebook (Notion → Make → Metricool). Pas de champ renommé ni supprimé ; un nouveau champ seulement avec l'accord de Thomas.
- **Textes de la ferme :**
  - « Bio » est validé par Thomas (16/10) ; les produits cochés « Pas bio » n'ont pas la mention.
  - Toute autre affirmation (par exemple « sans traitement chimique ») attend la validation de Pierre.
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
| Secrets Cloudflare | `NOTION_TOKEN` (intégration Notion « Site Au Grand Jardin »), `PRO_PASSWORD`, `PRO_SECRET`. Variables facultatives : `SITE_INDEXABLE=oui` (à la mise en ligne réelle), `AGJ_URL` |
| Bouton « Publier » | Dans la page Notion « Site augrandjardin.fr » : il appelle l'adresse de reconstruction (deploy hook) de Cloudflare. Pas encore testé par Claude |
| Intégration Notion | « Site Au Grand Jardin » (lecture et insertion). Elle doit rester connectée à la base Produits de la ferme, à la base 📅 Planning semaine et à la page « Site augrandjardin.fr ». Sans l'une d'elles, la construction échoue avec un message qui nomme la base |
| Notion lu | Produits de la ferme `collection://5fb0d75e-67d6-4840-a703-2c6e0b3eaa11` (lignes « En vente ») ; Planning `collection://152a41f4-8718-45e1-9025-40f3da0572e3` (base https://www.notion.so/thomasbonometti/e03d71b964dd43a4be5595d72c401383) |
| Notion écrit par le site | Page « Site augrandjardin.fr » `3fb70bd669cd81a5a2a0cfc84d7016a2` : bases Inscriptions SMS `collection://1f9db94f-6b9f-4ba2-aae7-d67ea66cae6f` et Demandes d'accès pro `collection://95af73b3-86bc-4013-adb6-ccbe215a44d0`. Ce qui vient de l'adresse de test est coché « Test » |
| Outil de commande | Dépôt `thomasbonometti/brief`, Worker `formulaires` : https://formulaires.hey-d8b.workers.dev. Page de Pierre `/agj/pierre`, vérification et archivage des données de test `/agj/pierre/diagnostic` |
| Maquettes | Figma « Au Grand Jardin \| Site 2026 », fileKey `zrlhOtAHZaw02nvLTnaswz`. Bureau : 13:2 Accueil, 14:2 Produits, 15:2 La ferme, 16:2 Pommes de terre, 17:2 Professionnels, 18:2 Espace pro, 19:2 Horaires & contact. Téléphone : 38:2, menu 37:2, 39:2 à 44:2 dans le même ordre |
| Revue Figma / site | Artifact « Revue site AGJ 2026 » : https://claude.ai/artifact/QCPcPS8N1G7SwUF6TDYSWw (captures du 17/10) |
| Idées d'évolution | `docs/idees.md` ; les idées 1 à 30 sont aussi dans la note Notion « Au Grand Jardin — 30 idées de services pour le nouveau site » (base Notes Studio) : https://app.notion.com/p/3fd70bd669cd81cf8fccdc15dc3d6834 |

---

## Plan du code

- `scripts/sync-notion.mjs` : lit Produits et Planning, télécharge les photos, écrit `data/*.json` et les photos WebP. Sans `NOTION_TOKEN`, garde l'instantané de `data/`. La correspondance des champs est dans `mapProduit` et `mapPlanning`.
- `scripts/fetch-agj.mjs` : catalogue et configuration de l'outil de commande dans `data/agj-*.json`. Si l'outil ne répond pas, la copie précédente est gardée.
- `src/data/ferme.js` : coordonnées, mentions légales, partenaires, restaurants, points de vente, navigation, lien de la carte Google (`carteGoogle`).
- `src/lib/` :
  - `vente.js` : prix, rayons, créneaux, lieux (`lireLieux`), prochaine vente, nouveautés et vedettes ;
  - `donnees.js` : charge les données ;
  - `pdt.js` : résumé du catalogue des pommes de terre ;
  - `commande-rendu.js` : rendu HTML de la liste de commande, partagé entre construction et navigateur ;
  - `typo.js` : espaces insécables ;
  - `seo.js` : données structurées ;
  - `agj/cart.js` : copie de secours du panier de l'outil.
- `src/layouts/Base.astro` : `<head>`, menu mobile, en-tête collant (caché en descendant, de retour en remontant), chargement des animations.
- `src/components/` : barre verte, en-tête, pied de page, photo, carte produit, formulaire SMS, icônes, logo.
- `src/scripts/` :
  - `formulaires.ts` : formulaires SMS, demande pro, connexion pro ;
  - `commande.ts` : commande de pommes de terre ;
  - `animer.ts` : GSAP, chargé seulement si le visiteur accepte les animations.
- `src/pages/` : les 7 pages, mentions légales, 404, `sitemap.xml`, `robots.txt`. `pro/tarifs.astro` est protégée par `functions/pro/_middleware.js`.
- `functions/` (Cloudflare Pages Functions) :
  - relais vers l'outil (`/api/agj/catalog`, `/api/agj/order`, `/agj/config.json`, `/agj/lib/cart.js`) ;
  - `api/inscription-sms.js`, `api/demande-pro.js` (écriture dans Notion) ;
  - `api/pro-login.js` et `_lib/auth.js` (cookie signé de 60 jours).
- `astro.config.mjs` : l'intégration « typographie-francaise » pose les espaces insécables sur chaque page construite.
- `public/_headers` : en-têtes de sécurité et de cache.
- `tests/` : tests unitaires (`npm test`). `e2e/` : tests navigateur Playwright, sur téléphone (Pixel 7) et ordinateur (1440 × 900).

---

## Tâches courantes

- **Changer un texte :**
  - Dans la page `.astro` concernée, ou dans `src/data/ferme.js` pour les coordonnées et les listes.
  - Les espaces insécables se posent tout seuls.
  - Les textes des produits viennent de Notion : ne pas les recopier dans le code.
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
- **Données de test :**
  - Une commande de test depuis l'adresse de test est permise (outil en mode test).
  - Ensuite, archiver par `/agj/pierre/diagnostic`, « Archiver les données de test ». Le bouton ouvre un `confirm()` qui bloque l'outil Chrome : remplacer d'abord `window.confirm = () => true` dans la page, ou demander à Thomas.
  - Mettre à la corbeille les lignes « Test » des deux bases du site.
  - Lister à Thomas ce qui a été archivé.

---

## Vérifier avant de rendre

1. `npm test` (tests unitaires), puis `npm run build:local` (construit avec l'instantané `data/`, sans jeton Notion).
2. Servir le site en local avec les fonctions, sur le catalogue réel de l'outil (lecture seule) :
   `npx wrangler pages dev dist --port 8789 --compatibility-date=2026-09-15 --binding AGJ_URL=https://formulaires.hey-d8b.workers.dev`
   puis `npx playwright test` (`BASE_URL` vaut `http://localhost:8789` par défaut). Arrêter ensuite le serveur par numéro de processus : un `pkill -f` sur la commande tue aussi le shell.
3. Commande de bout en bout sans toucher à l'outil en ligne :
   - Dans le dépôt `brief`, lancer `AGJ_FAKE=1 npm run dev` (outil simulé sur le port 8787).
   - Ici, servir sans `--binding` : `.dev.vars` pointe vers `localhost:8787`.
   - Lancer `E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 E2E_PRO_PASSWORD=<valeur de .dev.vars> npx playwright test`.
4. Push sur `site-2026`, puis vérifier dans Cloudflare (Deployments) que la construction a réussi.
5. Le conteneur de travail n'atteint pas `*.pages.dev` : vérifier l'adresse de test avec Claude in Chrome, dans le Chrome de Thomas. Ouvrir son propre onglet, et ne laisser aucune trace (pas de choix mémorisé, pas de mot de passe).
6. Si la construction Cloudflare échoue :
   - Ouvrir le déploiement et faire défiler le panneau « Build log » avec des captures (lire le texte par JavaScript est bloqué sur le tableau de bord).
   - Une erreur Notion 404 nomme la base à connecter à l'intégration.

## Pièges déjà rencontrés

- Le CSS d'un composant Astro ne s'applique pas au HTML injecté par un script : utiliser `:global(...)`.
- La classe `.ligne` est un séparateur global : ne pas la réutiliser pour autre chose (la grille pro utilise `.rangee`).
- `picture { display: contents }` et `picture > source { display: none }` sont voulus : les images remplissent ainsi leur cadre.
- L'audit d'accessibilité (axe) tourne sur l'état final, avec les animations coupées (`reducedMotion: 'reduce'`). Sinon, il signale des contrastes en pleine animation.
- `commande.ts` ne réécrit le titre et les prix de la page Pommes de terre que s'ils ont changé, pour ne pas couper l'animation d'arrivée.
- Un `confirm()` ou un `alert()` déclenché dans le Chrome de Thomas bloque l'outil Chrome.
- Les heures de vente sont calculées à la construction. Après la vente du samedi, la barre annonce le samedi suivant dès la prochaine publication ; entre-temps, un script retire la date passée.
