# Passage du nouveau site sur www.augrandjardin.fr — plan clic par clic

Préparé le 28/10/2026 par Claude, à la demande de Thomas. **Option A retenue par Thomas le 28/10** (« on passe sur ta recommandation »). Copie dans le projet Claude « Au Grand Jardin » : `site-web/plan-bascule.md`. Fichiers prêts dans `bascule/` (dépôt `augrandjardin`, branche `site-2026`).

## Ce qui sert quoi aujourd'hui (vérifié le 27/10)

| Adresse | Ce qu'on y trouve | Où |
|---|---|---|
| augrandjardin.fr et www.augrandjardin.fr | L'ancien site (pages `.html` : `produits`, `partenaires`, `la-ferme`, `actualites`, `contact-horaires`, `mentions-legales`, `checkout`). Il dit encore ce que Pierre a demandé de retirer : « aucun produit chimique », pas d'hybrides F1, partenaires, SMS du 15 avril au 15 novembre, vente du mercredi. | Hébergement IONOS (adresse `217.160.0.25`). DNS et mail (pierre@augrandjardin.fr) chez IONOS. |
| produits.augrandjardin.fr | La liste de la semaine, lien des SMS et du QR code de l'affichette (`?src=qr`). | GitHub Pages, branche `main` du dépôt `augrandjardin` (fichier `CNAME`), mise à jour par le scénario Make « Au Grand Jardin \| Notion -> Github (Optimisé) ». |
| agj-site-2026.pages.dev | Le nouveau site, en test (non indexé). | Cloudflare Pages, projet `agj-site-2026`, branche `site-2026`. |

## L'adresse choisie : www.augrandjardin.fr

- Cloudflare Pages n'accepte le domaine **sans www** que si tout le DNS passe chez Cloudflare. Un sous-domaine comme **www** se branche par un simple enregistrement CNAME, en gardant le DNS chez IONOS.
- Le code est déjà réglé sur `https://www.augrandjardin.fr` : adresses canoniques, plan du site, données structurées (fiche Google). La variable Cloudflare `SITE_URL` la remplace si besoin.
- Les anciennes pages `.html` sont redirigées en 301 vers les nouvelles (`src/data/redirections.js`, fichier `_redirects` écrit à la construction). Les adresses de test `*.pages.dev` restent non indexées après le passage (en-tête `X-Robots-Tag: noindex` dans `public/_headers`).

## augrandjardin.fr (sans www) : option A retenue (Thomas, 28/10)

**A. Retenue : garder DNS, mail et hébergement chez IONOS.**
- www pointe vers Cloudflare (CNAME). augrandjardin.fr reste sur l'hébergement IONOS, qui renvoie vers www grâce au fichier `bascule/ionos/.htaccess` : redirection définitive (301), chemin et paramètres gardés, anciennes pages vers les nouvelles.
- Le mail n'est pas touché.
- Condition : l'ancien site est sur un hébergement IONOS où l'on peut déposer un fichier (gestionnaire de fichiers ou FTP). À vérifier par Thomas : IONOS → Hébergement. L'abonnement d'hébergement est à garder.
- À éviter : la « redirection de domaine » proposée par IONOS. Des sources tierces la disent temporaire (302), sans garantie de garder le chemin, et sans certificat SSL inclus. Seulement s'il n'y a pas d'hébergement.

**B. Passer le DNS chez Cloudflare (gratuit) : pas pour le passage, éventuellement plus tard.**
- Tout est au même endroit, augrandjardin.fr est servi directement, les redirections se font dans Cloudflare.
- Mais il faut recopier à l'identique les enregistrements du mail (MX, SPF, DMARC, autodiscover), puis plus tard ceux de Brevo. Une erreur coupe pierre@augrandjardin.fr et les mails de l'outil de commande.
- Faisable plus tard, à tête reposée, même si on part sur A.

## Ce qui reste de côté au passage (décision de Thomas du 28/10)

Le jour J, le site part tel qu'il est sur l'adresse de test, sauf ces trois fonctions, qui attendent. Chacune a sa case dans la base Notion « Réglages du site » (page « Site augrandjardin.fr ») ; rien n'est à faire le jour J.

| Fonction | Ce que voit le visiteur | Pour la rouvrir plus tard |
|---|---|---|
| **Espace pro** (case « Espace pro ouvert », décochée, jusqu'au printemps 2027) | Page Professionnels : « contactez Pierre » (téléphone, mail) ; `/pro/` renvoie vers elle. La page de Pierre garde sa rubrique « Pros » (choix de Thomas). | Cocher, « Publier », remettre la question fréquente des restaurateurs sur la demande d'accès (voir `docs/passation.md`). |
| **Commandes de pommes de terre** (case « Commandes de pommes de terre ouvertes », décochée : Pierre décide de la période) | Pas de page Pommes de terre : ni dans le menu, ni sur l'accueil, ni dans le plan du site ; `/pommes-de-terre/` renvoie vers l'accueil. L'outil refuse les commandes en ligne (pull request n° 14 de `brief`). | Passer l'outil en réel (`AGJ_LIVE` = `"1"`, pull request de `brief`), avec les vrais prix, le vrai stock et des dates de retrait ouvertes ; cocher la case ; « Publier ». À la fin de la période : décocher, « Publier ». |
| **Inscription à la liste de la semaine** (case « Inscription à la liste ouverte », décochée, tant que l'envoi automatique n'existe pas) | À la place du formulaire (accueil, Produits, Calendrier) : « Pour la recevoir, demandez-la à Pierre à la vente, ou appelez-le », avec son numéro. | Cocher, remettre la réponse de la question « Comment recevoir la liste de la semaine ? » (texte dans `docs/passation.md`), « Publier ». |

Pour essayer une fonction sans l'ouvrir sur le site : une branche poussée sur GitHub donne un aperçu Cloudflare ; y mettre la variable `ESPACE_PRO=ouvert`, `COMMANDE_PDT=ouverte` ou `INSCRIPTION_LISTE=ouverte` dans l'environnement « Preview » (Settings → Variables and Secrets), jamais en « Production ».

## Avant le jour J

1. **Pierre a relu les textes** (mail « Le nouveau site, à relire ») et ses réponses sont dans le site.
2. **Les pommes de terre.** Les commandes restent fermées (voir plus haut) : pas de page, l'outil reste en mode test. Le scénario Make « AGJ | 1 - PDT création de commandes » sert l'ancien parcours : Thomas l'éteint quand il veut après le passage.
3. **Accès à l'hébergement IONOS** (option A) : Thomas vérifie qu'il peut déposer un fichier à la racine de l'espace web de augrandjardin.fr (gestionnaire de fichiers ou FTP).
4. **Thomas note les enregistrements www actuels** chez IONOS (type et valeur, par exemple A `217.160.0.25`) : ils servent au retour en arrière.

## Jour J, option A (environ une heure, plus l'attente du DNS)

### 1. Cloudflare : déclarer www.augrandjardin.fr (avant de toucher au DNS)

1. Ouvrir https://dash.cloudflare.com/d8b8981d6131714bee280d9a814f9230/pages/view/agj-site-2026
2. Onglet **Custom domains** → **Set up a custom domain**.
3. Taper `www.augrandjardin.fr` → **Continue**.
4. Cloudflare indique de créer chez le fournisseur DNS un **CNAME** `www` → `agj-site-2026.pages.dev`. Laisser la page ouverte.

Dans cet ordre : un CNAME créé avant cette étape donne une erreur 522.

### 2. Cloudflare : rendre le site indexable

1. Même projet → **Settings** → **Variables and Secrets** → environnement **Production** → **Add**.
2. Nom `SITE_INDEXABLE`, valeur `oui`, type texte → **Save**.

### 3. IONOS : pointer www vers Cloudflare

1. https://my.ionos.fr → **Domaines & SSL** → `augrandjardin.fr` → onglet **DNS**.
2. Repérer les enregistrements dont le nom d'hôte est `www` (A, et AAAA s'il y en a un). Les noter, puis les supprimer.
3. **Ajouter un enregistrement** → **CNAME** → nom d'hôte `www` → pointe vers `agj-site-2026.pages.dev` → TTL le plus court proposé → **Enregistrer**.
4. Ne toucher à rien d'autre : ni `@` (augrandjardin.fr), ni `produits`, ni MX, TXT, `_dmarc`, `autodiscover`.

Si IONOS refuse parce que www est relié à l'espace web, changer d'abord la destination de www (réglage « Utilisation du domaine » ou « Destination » de www) pour un DNS personnalisé, puis recommencer.

### 4. Attendre que Cloudflare passe www en « Active »

De quelques minutes à quelques heures. Le certificat HTTPS est automatique. On peut suivre l'avancement dans **Custom domains**.

### 5. IONOS : rediriger augrandjardin.fr vers www

1. Récupérer le fichier `bascule/ionos/.htaccess` (Claude l'envoie au besoin).
2. IONOS → **Hébergement** → gestionnaire de fichiers (ou FTP) de l'espace web de augrandjardin.fr.
3. Déposer `.htaccess` à la racine, à côté de l'`index.html` de l'ancien site. S'il existe déjà un `.htaccess`, le garder de côté et prévenir Claude.
4. Les fichiers de l'ancien site peuvent rester : ils ne sont plus servis.

Le fichier contient une protection : tant que www arrive encore chez IONOS (propagation du DNS), il ne le renvoie pas vers lui-même.

### 6. Reconstruire le site

Bouton **« Publier »** de la page Notion « Site augrandjardin.fr ». La construction prend `SITE_INDEXABLE` en compte : `robots.txt` autorise les moteurs et donne le plan du site.

### 7. Outil de commande (Claude, pull request dans `brief`, fusion par Thomas)

- `AGJ_SITE_URL` = `https://www.augrandjardin.fr` dans `wrangler.jsonc` : liens des mails aux pros, vignettes de « Ma semaine ».
- L'adresse de reconstruction de « Ma semaine » ne change pas (même projet Cloudflare).

### 8. produits.augrandjardin.fr (Claude, avec l'accord de Thomas)

1. Thomas éteint le scénario Make « Au Grand Jardin | Notion -> Github (Optimisé) » : sinon il réécrit la liste dans la branche `main`.
2. Claude remplace le contenu de la branche `main` par les deux fichiers de `bascule/produits/` (`index.html` et `404.html`), et garde `CNAME`. Ils renvoient vers https://www.augrandjardin.fr/produits/ en gardant les paramètres (`?src=qr`).
3. Le DNS de produits ne change pas. La branche de production Cloudflare reste `site-2026` : on ne fusionne plus `site-2026` dans `main`.

### 9. Google

- **Search Console** (https://search.google.com/search-console) : ajouter la propriété `https://www.augrandjardin.fr/` (ou le domaine entier, vérifié par un enregistrement TXT chez IONOS), puis **Sitemaps** → `https://www.augrandjardin.fr/sitemap.xml`.
- **Fiche Google de la ferme** (Google Business Profile) : site web → `https://www.augrandjardin.fr/` ; horaires : seulement le samedi (le mercredi n'existe plus).

### 10. Facebook et liens

Page Facebook → **Modifier les infos** → site web : `https://www.augrandjardin.fr/`. Les anciens liens vers produits.augrandjardin.fr continuent de marcher (étape 8).

### 11. Vérifications (Claude, dans Chrome)

- https://www.augrandjardin.fr : les 8 pages, la liste, les questions fréquentes, la carte.
- https://augrandjardin.fr/la-ferme.html → https://www.augrandjardin.fr/la-ferme/ ; https://augrandjardin.fr → www.
- https://produits.augrandjardin.fr/?src=qr → https://www.augrandjardin.fr/produits/?src=qr (le QR code de l'affichette).
- Pommes de terre : pas de page (`/pommes-de-terre/` → accueil) ; liste de la semaine : « demandez-la à Pierre » ; Professionnels : « contactez Pierre ».
- « Ma semaine » : un « Publier » met bien le site à jour.
- agj-site-2026.pages.dev répond avec l'en-tête `X-Robots-Tag: noindex`.

## Jour J, option B (DNS chez Cloudflare) : ce qui change

1. Cloudflare → **Add a domain** → `augrandjardin.fr` → offre **Free**. Cloudflare importe les enregistrements existants : comparer avec la liste IONOS, en particulier les MX, le TXT SPF, `_dmarc`, `autodiscover`, et `produits` (CNAME vers `thomasbonometti.github.io`, en « DNS only »).
2. Chez IONOS : **Domaines & SSL** → `augrandjardin.fr` → **Serveurs de noms** → serveurs personnalisés → ceux donnés par Cloudflare. Attendre que Cloudflare affiche le domaine « Active ».
3. Pages → **Custom domains** : `www.augrandjardin.fr` et `augrandjardin.fr`. Puis une règle de redirection (Rules → Redirect Rules) de augrandjardin.fr vers www, qui garde le chemin et les paramètres.
4. Pas de `.htaccess`. Ensuite, étapes 2 et 6 à 11 comme pour A.
5. Envoyer un mail de test vers et depuis pierre@augrandjardin.fr juste après.

## Retour en arrière

- www : chez IONOS, supprimer le CNAME `www` et remettre les enregistrements notés avant (A `217.160.0.25`…), retirer `.htaccess` de l'hébergement.
- produits : revenir au commit précédent de `main` et rallumer le scénario Make.
- `SITE_INDEXABLE` : le supprimer dans Cloudflare, puis « Publier ».

## Après le passage

- Mettre à jour `CLAUDE.md`, `README.md`, `docs/passation.md` et les documents du projet : adresse en ligne, `main` = redirection de produits.augrandjardin.fr.
- Plus tard, si Thomas le veut : passer le DNS chez Cloudflare (option B), restreindre l'accès Notion de l'intégration du site.
- Rouvrir les fonctions de côté le moment venu (tableau plus haut).
