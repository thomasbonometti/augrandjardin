# Au Grand Jardin — site 2026

Nouveau site d'augrandjardin.fr, construit d'après les maquettes Figma « Au Grand Jardin | Site 2026 » (frames desktop 1440 px et mobile 390 px).
La branche `main` sert produits.augrandjardin.fr (la liste de la semaine, GitHub Pages, mise à jour par Make) ; augrandjardin.fr et www sont l'ancien site, hébergé chez IONOS. **Ne toucher ni à `main` ni à IONOS avant le passage.** Tout le travail se fait sur `site-2026`.

- Hébergement : Cloudflare Pages, projet `agj-site-2026` (branche de production `site-2026`), adresse de test `*.pages.dev`.
- Données : Notion, lu au moment de la construction. Bouton « Publier le site » dans la page Notion **Site augrandjardin.fr** → adresse de reconstruction Cloudflare → site à jour environ une minute après.
- Commandes de pommes de terre : outil de commande du dépôt `thomasbonometti/brief` (Worker `formulaires`). Le site n'en dessine que l'écran ; prix, stock, Notion, mails et choix du créneau restent dans l'outil.
- Aucun framework envoyé au navigateur : pages HTML statiques (Astro), un peu de JavaScript seulement pour le menu mobile, les filtres, les formulaires et la commande.

`docs/passation.md` : décisions, écarts avec la maquette, points ouverts. À lire avant de reprendre.

## Pages

| Page | Adresse | Frames Figma |
|---|---|---|
| Accueil | `/` | 13:2 / 38:2 |
| Produits de la semaine | `/produits/` | 14:2 / 39:2 |
| La ferme | `/la-ferme/` | 15:2 / 40:2 |
| Pommes de terre (commande) | `/pommes-de-terre/` | 16:2 / 41:2 |
| Professionnels | `/professionnels/` | 17:2 / 42:2 |
| Espace pro (mot de passe) | `/pro/tarifs/` | 18:2 / 43:2 |
| Horaires & contact | `/horaires-contact/` | 19:2 / 44:2 |
| Menu mobile | (toutes les pages) | 37:2 |
| Mentions légales, 404 | `/mentions-legales/` | — |

## D'où viennent les données

| Donnée | Source | Quand |
|---|---|---|
| Produits de la semaine, prix, photos, « Nouveau », « Quantité limitée », « Pas bio » | Notion « Produits de la ferme » (`En vente` coché) | à la construction |
| Horaires, prochaine vente (barre du haut, accueil, contact) | Notion « Planning » (`Cette semaine`) | à la construction |
| Catalogue de commande (filets, non trié, prix, stock) | API de l'outil `/api/agj/catalog` | à la construction, puis relu en direct dans la page |
| Grille pro (HT = TTC ÷ 1,055) | Notion « Produits de la ferme » | à la construction |
| Mode fermé (« Fermé », « Reprise le », « Message de fermeture ») et message de la semaine | Notion « Réglages du site » (page Site augrandjardin.fr, une seule ligne), lue aussi par l'outil de commande | à la construction |
| Questions fréquentes (accordéon en bas des pages) | Notion « Questions fréquentes » (lignes « Publiée ») | à la construction |
| Inscriptions SMS, demandes d'accès pro | écrit par le site dans Notion « Inscriptions SMS », « Demandes d'accès pro » (page Site augrandjardin.fr) | à l'envoi du formulaire |
| Historique des listes (une ligne par liste publiée qui a changé) | écrit par la construction dans Notion « Historique des listes » (page Site augrandjardin.fr), sur Cloudflare seulement | à la construction |
| Adresse, téléphone, partenaires, restaurants, mentions légales | `src/data/ferme.js` | dans le code |

Si Notion ne répond pas pendant une construction, elle échoue et Cloudflare garde la version en ligne précédente (les questions fréquentes font exception : la copie précédente de `data/faq.json` est gardée). Si l'outil de commande ne répond pas, la construction continue avec la copie précédente du catalogue (`data/agj-*.json`).

## Fonctions Cloudflare (`functions/`)

| Adresse | Rôle |
|---|---|
| `/api/agj/catalog`, `/api/agj/order`, `/agj/config.json`, `/agj/lib/cart.js` | relais vers le Worker `formulaires` (même adresse pour le navigateur, rien à changer côté outil) |
| `/api/inscription-sms`, `/api/demande-pro` | écriture dans les deux bases Notion du site ; lignes du site de test cochées « Test » |
| `/api/agj/pro/login`, `logout`, `grille`, `commande` | espace pro : relais vers l'outil, avec le seul cookie de session `agj_pro` (posé par l'outil, 60 jours). `/pro/tarifs/` est une page sans prix |

## Secrets (Cloudflare → projet → Settings → Variables and Secrets, type Secret)

- `NOTION_TOKEN` : intégration Notion « Site Au Grand Jardin » (lecture + insertion), connectée aux pages « Au Grand Jardin 2025 » et « Site augrandjardin.fr » (Réglages du site, Questions fréquentes et Historique des listes compris). Dans Notion, elle est en fait connectée à toute la page « Au Grand Jardin » (vu le 22/10) : elle voit donc aussi les bases de l'outil de commande, mais le code du site ne les lit ni ne les écrit (il passe par l'API de l'outil).
- Les accès des pros (e-mail et mot de passe) sont gérés par l'outil de commande depuis le lot 2 : `PRO_PASSWORD` et `PRO_SECRET` ne servent plus et peuvent être supprimés.

Variables facultatives : `SITE_INDEXABLE=oui` (à la mise en ligne sur augrandjardin.fr : autorise l'indexation), `AGJ_URL` (adresse de l'outil, par défaut `https://formulaires.hey-d8b.workers.dev`), `ESPACE_PRO` (`ouvert` ou `ferme` : passe avant la case « Espace pro ouvert » de Réglages du site ; à mettre seulement dans l'environnement « Preview » pour tester l'espace pro sur un aperçu pendant qu'il est en veille), et de même `COMMANDE_PDT` et `INSCRIPTION_LISTE` (`ouverte` ou `fermee` : cases « Commandes de pommes de terre ouvertes » et « Inscription à la liste ouverte », décochées depuis le 28/10).
Jamais de secret dans le dépôt : en local, `.dev.vars` (ignoré par git).

## Travailler en local

```
npm install
npm run build:local      # construit avec l'instantané de data/ (sans jeton Notion)
npm run build            # lit Notion (NOTION_TOKEN) et l'outil de commande, puis construit
npm run preview          # sert dist/ avec les fonctions Cloudflare (http://localhost:8788)
npm test                 # fonctions du site
npm run e2e              # tests navigateur, téléphone et ordinateur
```

Pour tester la commande sans toucher à l'outil en ligne : dans le dépôt `brief`, `AGJ_FAKE=1 npm run dev` (outil simulé sur le port 8787), puis ici un `.dev.vars` avec `AGJ_URL=http://localhost:8787`, et
`E2E_COMMANDE=1 AGJ_DEV_URL=http://localhost:8787 npm run e2e` (commande de pommes de terre et espace pro, avec un pro créé dans l'outil simulé).
Les tests des fonctions qu'une case de « Réglages du site » ouvre ou ferme (commandes de pommes de terre, inscription à la liste) suivent `data/reglages.json` (`e2e/etat.js`). Les commandes de pommes de terre sont fermées aujourd'hui (pas de page) : leurs tests tournent sur une construction ouverte, `COMMANDE_PDT=ouverte INSCRIPTION_LISTE=ouverte npx astro build --outDir dist-ouvert`, servie comme `dist/`, avec `E2E_OUVERT=1`. Case décochée, `e2e/de-cote.spec.js` vérifie l'absence de la page Pommes de terre, ou le bloc « demandez-la à Pierre » à la place du formulaire d'inscription.
Sur l'adresse de test : `BASE_URL=https://agj-site-2026.pages.dev npm run e2e` (lecture seule ; `E2E_COMMANDE=1` passe une vraie commande « Test »).

## Bascule (plus tard)

Plan clic par clic : `docs/plan-bascule.md`. En résumé :

1. Pierre a relu les textes. Option A retenue (Thomas, 28/10). Restent de côté : l'espace pro et les commandes de pommes de terre (pas de page tant que la case est décochée) ; l'inscription à la liste, rouverte par Thomas le 28/10, part avec le site ; rien à faire le jour J.
2. Adresse : **www.augrandjardin.fr** (déjà dans le code). Domaine `www.augrandjardin.fr` sur le projet Cloudflare Pages, puis CNAME `www` → `agj-site-2026.pages.dev` chez IONOS ; `SITE_INDEXABLE=oui` ; « Publier ».
3. augrandjardin.fr (sans www) : `bascule/ionos/.htaccess` déposé sur l'hébergement IONOS (301 vers www, chemin gardé). Le DNS chez Cloudflare (option B du plan) reste possible plus tard.
4. Les anciennes pages `.html` sont déjà redirigées par `_redirects` (`src/data/redirections.js`).
5. produits.augrandjardin.fr (lien des SMS, QR code de l'affichette) : la branche `main` reçoit `bascule/produits/` (renvoi vers `/produits/` avec `?src=qr`), après l'arrêt du scénario Make « Au Grand Jardin | Notion -> Github (Optimisé) » (Thomas). La production Cloudflare reste sur `site-2026`.
6. `AGJ_SITE_URL` = https://www.augrandjardin.fr dans l'outil de commande ; Search Console, fiche Google et page Facebook vers www.
