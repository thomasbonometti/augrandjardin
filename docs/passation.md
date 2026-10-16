# Site Au Grand Jardin — passation (maquettes Figma + commandes en ligne)

À lire en premier dans toute session qui construit le nouveau site augrandjardin.fr. État au 16 octobre 2026.

Objectif de la prochaine étape : un site fonctionnel, sur une adresse de test, qui suit les maquettes Figma (desktop et mobile), branché sur Notion, et sur lequel on peut **passer une commande de pommes de terre**. La commande passe par l'outil de commande déjà en ligne : le site en dessine les écrans d'après la maquette, mais la logique (prix, stock, Notion, mails, choix du créneau, page de Pierre) reste dans l'outil.

---

## 1. Où sont les choses

| Quoi | Où |
|---|---|
| Maquettes (desktop + mobile) | Figma « Au Grand Jardin \| Site 2026 » : https://www.figma.com/design/zrlhOtAHZaw02nvLTnaswz/Au-Grand-Jardin-%7C-Site-2026 (fileKey `zrlhOtAHZaw02nvLTnaswz`) |
| Direction artistique d'origine | Template Figma « Aurova » : https://www.figma.com/design/dL9PHLW6ssT9ipNNvpo5jq/aurova (fileKey `dL9PHLW6ssT9ipNNvpo5jq`) |
| Conversation de conception du site | « Au Grand Jardin website redesign » : https://claude.ai/chat/4568c40d-bffc-431d-a746-08e497d4639a |
| Code du nouveau site | Dépôt GitHub `thomasbonometti/augrandjardin`, **branche `site-2026`** (la branche `main` sert le site actuel, ne pas y toucher). Contient `docs/passation.md` (ce texte) et `reference/prototype-2026-10-16/` (pages construites du prototype, pour référence). |
| Prototype en ligne (pages construites) | Artifact « Prototype Au Grand Jardin » : https://claude.ai/artifact/8RjGeRvKVXXHnPWbRVzAG5 |
| Site actuel | https://augrandjardin.fr : branche `main` du même dépôt, servie par GitHub Pages (`CNAME`). `products.json` y est mis à jour par le scénario Make « Au Grand Jardin \| Notion -> Github (Optimisé) ». |
| Outil de commande en ligne | Dépôt GitHub `thomasbonometti/brief` (`public/agj/`, `lib/agj/`, `src/agj/`, config `agj.config.json`, mode d'emploi pour Claude dans `CLAUDE.md`). Cloudflare Workers, Worker `formulaires` : https://formulaires.hey-d8b.workers.dev/agj/ |
| Liste de bascule de l'outil de commande | Doc « Commandes AGJ : mise en ligne et bascule » : https://claude.ai/code/artifact/50cebfb8-691a-4776-ab38-1f3529b25293 |

### Frames Figma (node IDs)

Page « 🖥 Desktop » (`0:1`), frames de 1440 px :

| Page | Node |
|---|---|
| Accueil | `13:2` |
| Produits de la semaine | `14:2` |
| La ferme | `15:2` (section Sol Vivant : `15:116`) |
| Pommes de terre | `16:2` |
| Professionnels | `17:2` |
| Espace pro — Grille tarifaire | `18:2` |
| Horaires & contact | `19:2` |

Page « 📱 Mobile » (`27:2`), frames de 390 px : Accueil `38:2`, Menu ouvert `37:2`, Produits de la semaine `39:2`, La ferme `40:2` (Sol Vivant `40:102`), Pommes de terre `41:2`, Professionnels `42:2`, Espace pro `43:2`, Horaires & contact `44:2`.

Page « 🎨 Ressources » (`26:2`) : nuancier pour Figma Weave et illustration « Maraîchage Sol Vivant » détourée (`48:2`).

### Bases Notion utiles au site

- **Produits de la ferme** (produits de la semaine, partagés avec le pipeline Facebook) : `collection://5fb0d75e-67d6-4840-a703-2c6e0b3eaa11`. Champs : Nom, Prix au kg, Prix unitaire, Poids, Vendu à, Pas bio, Promo, Prix promo (TTC), categorie spéciale, Nouveau, Quantité limitée, Produit d'appel, Référence, En vente.
- **Planning** (horaires de vente) : https://www.notion.so/thomasbonometti/e03d71b964dd43a4be5595d72c401383
- Bases de l'outil de commande (le site ne les lit ni ne les écrit directement : il passe par l'API de l'outil) : **Produits AGJ** `collection://1c95945b-8c87-4464-b5d3-39af72b115ef`, **Dates de retrait AGJ** `collection://f3635e7d-b21a-4ac7-85cb-e3c337a142c3`, **Commandes AGJ** `collection://b253288c-dc96-46af-aaad-7f55063d083b`, **Clients AGJ** `collection://ef3fb3a2-d167-4cc4-9882-b1cbeb9f5396`. Elles sont sous la page Notion « Commandes en ligne ».

---

## 2. Décisions déjà prises pour le site

- **Architecture (option A)** : Notion est la seule source. Le site est statique et hébergé gratuitement sur Cloudflare. Pas de CMS, pas de Webflow. Pierre a peu de budget.
- **Mise à jour** : un bouton « Publier » dans Notion appelle l'adresse de reconstruction Cloudflare (deploy hook), et le site est à jour une minute après. Il remplace le scénario Make « Notion -> Github » et son jeton GitHub écrit en clair. Pas de tâche automatique en fond : Thomas a choisi le bouton seul. Si le clic est oublié, le site garde la liste précédente avec sa date « Mis à jour le… » visible.
- **Pages** : Accueil, Produits de la semaine, La ferme, Pommes de terre, Professionnels, Espace pro (grille tarifaire derrière un mot de passe), Horaires & contact. Barre d'info en haut avec la prochaine vente et le téléphone.
- **Charte (dans le fichier Figma)** : police Geist ; couleurs vert vif `#00A544`, vert forêt `#0C4B31`, vert très foncé `#083B26`, crème `#FBF9F3`, sable `#F0E7D1`, vert clair `#7BE39B`. Variables de couleur et styles de texte posés dans le fichier (11 styles « Mobile/… » en plus pour le mobile).
- **Section Sol Vivant** (page La ferme) : illustration Weave détourée, sur fond sable, 720 px en desktop, pleine largeur en mobile.
- **Mobile** : en-tête avec logo, bouton « Produits » toujours visible et menu. Les produits mis en avant, la galerie et les partenaires défilent de côté. Le catalogue est sur 2 colonnes, avec des filtres par rayon. La grille pro devient une liste (HT en gros, TTC dessous).
- **Prototype technique de la conversation du site** : Astro 5 + sharp, script `scripts/sync-notion.mjs` qui lit Notion au moment de la construction, fonctions Cloudflare Pages (mot de passe pros, réservation). Son code source (`agj-site`, avec les générateurs de maquettes `build.py`, `pages_interieures.py`, `build_mobile.py`) était dans l'espace de travail de cette conversation ; s'il a été poussé, il est sur la branche `site-2026`. Sinon, on repart des maquettes Figma et des pages construites dans `reference/`.
- ⚠️ La réservation de pommes de terre du prototype écrivait dans l'ancienne base « Commandes clients ». **Ne pas la reprendre** : la commande passe par l'outil de commande (section 3).

---

## 3. Commandes en ligne : ce qui existe et comment le site s'y branche

### Le fonctionnement (en ligne depuis le 16/10/2026, en mode test)

1. Le client commande en 3 étapes (produits, coordonnées, validation), **sans choisir de jour**. Mails : confirmation au client, alerte à Pierre.
2. Pierre prépare puis touche « Prête » sur sa page (`/agj/pierre`). Le client reçoit un mail avec un lien signé vers `/agj/retrait/` pour choisir son créneau parmi les dates ouvertes de « Dates de retrait AGJ ».
3. Capacité par créneau (« Commandes max »). Le client peut changer de jour jusqu'à 24 h avant le début du jour (samedi : jusqu'au jeudi soir).
4. Sans choix au bout de 3 jours, un rappel part une seule fois (tâche quotidienne Cloudflare, 8 h UTC).
5. Pierre touche « Retirée » au retrait. Paiement sur place.

Le reste : page « Prêtes » groupée (à choisir, puis par jour), commandes par téléphone, impression des bons, chiffres et export comptable, statistiques sans donnée personnelle. Mails envoyés depuis pierre@augrandjardin.fr (IONOS).

**Catalogue réel** (base Produits AGJ) : filets triés de 7 et 15 kg par variété, oignons et échalotes, et une catégorie **Pommes de terre non triées** (sacs de 5 kg à 6 € et 10 kg à 12 €, prix barrés 10 € et 20 €, soit 1,20 €/kg ; 12 sacs créés décochés, Pierre les met en vente). Texte du non trié (taupin, 1er/2e/3e choix mélangés, à consommer dans les semaines qui viennent) et avertissements du panier dans `agj.config.json` (`categories`, `rules.notices`).

### L'API de l'outil (même moteur que la page `/agj`)

- `GET /api/agj/catalog` → `{ open, live, products: [{ id, name, product, format, category, description, priceCents, oldPriceCents, weightKg, stock, minimum, maximum, ordre, enVente }] }`. Cache d'une minute, vidé après chaque commande.
- `POST /api/agj/order` avec `{ ref, sid, items: { <id produit>: quantité }, customer: { prenom, nom, email, telephone, sms }, comment, meta: { source }, website }` → `{ ok, numero, bonUrl, order }`, ou erreur 400 `{ error, fields, cart }`. `ref` = identifiant unique par commande (un double clic ne crée qu'une commande). `website` = champ piège anti-robot, à laisser vide. `meta.source` : `site`, `facebook`, `qr`… (statistiques). Le serveur recalcule tous les prix.
- `GET /agj/config.json` : textes publics (intro, catégories et leur texte, règles, avertissements). `/agj/lib/cart.js` : fonctions du panier en module ES (`computeCart`, `catalogView`, `noticesFor`, `perKgCents`, `euros`), réutilisables tel quel pour afficher le même total et les mêmes avertissements que le serveur.
- Pas d'en-tête CORS sur ces adresses. Deux façons de faire : une fonction Cloudflare du site qui relaie `/api/agj/*` et `/agj/config.json` vers `https://formulaires.hey-d8b.workers.dev` (même origine pour le navigateur, rien à changer côté outil), ou un en-tête CORS ajouté dans le dépôt `brief` (pull request fusionnée par Thomas).

### Ce que le site doit faire

- **Page Pommes de terre** : les écrans de la maquette (frames `16:2` et `41:2`), remplis avec le vrai catalogue et branchés sur l'API ci-dessus. Le client choisit ses sacs, donne ses coordonnées, valide, voit la page de confirmation avec son numéro et le lien vers son bon de commande.
- **Après la commande** : mails, choix du créneau (`/agj/retrait/`, lien du mail « prête »), bon de commande et page de Pierre restent ceux de l'outil.
- **Domaine** : si l'outil passe sur un sous-domaine (par exemple `commande.augrandjardin.fr` en domaine personnalisé du Worker `formulaires`), changer `AGJ_PUBLIC_URL` dans `wrangler.jsonc` du dépôt `brief`, sinon les liens des mails pointent vers l'ancienne adresse.
- **Plus tard** : habiller les pages de l'outil (`/agj/retrait/`, bon) à la nouvelle charte. C'est du CSS seul (`public/agj/agj.css`), et les tests navigateur du dépôt `brief` (`npm run e2e`) vérifient les parcours.

### Écarts entre la maquette « Pommes de terre » et l'outil réel (la réalité gagne)

- Formats et prix : la maquette montre des sacs de 15 et 25 kg à 1,90 et 1,80 €/kg, et « Réservations ouvertes jusqu'au 15 novembre ». En réalité : catalogue lu dans Produits AGJ (formats et prix ci-dessus), ouvert tant qu'un produit est en vente.
- Jour de retrait : la maquette propose « un jour de retrait préféré » en commentaire. En réalité, le client choisit son créneau par lien une fois la commande prête ; la page doit l'expliquer (comme `texts.intro.how` de l'outil).
- Catégorie non triée : absente de la maquette ; elle doit apparaître en tête avec son texte et le prix au kilo.
- « Bio » : « Ferme maraîchère bio » apparaît dans la maquette (pied de page notamment). D'après Pierre (message du 15/10), **les pommes de terre ne sont pas bio** ; la base Produits de la ferme a un champ « Pas bio ». Ne rien dire « bio » sans validation de Pierre. « Bio » a déjà été retiré des pages de commande.

---

## 4. État au 16 octobre 2026 et règles à respecter

- Outil de commande **en mode test** (`AGJ_LIVE` = "0") : toutes les commandes sont marquées « Test » et tous les mails partent seulement à hey@thomasbonometti.fr. Fillout reste en service jusqu'à la bascule.
- Données de test archivées : bases Commandes, Clients et Dates de retrait AGJ vides. Aucune date ouverte. Pour un test de bout en bout, ouvrir une date de test nommée « TEST — … (à supprimer) » puis la supprimer, et archiver les données de test par `/agj/pierre/diagnostic` (« Archiver les données de test »).
- Avant de passer en réel : Pierre ouvre ses créneaux, coche « En vente » sur les sacs non triés qu'il veut, puis on suit les étapes « Bascule » de la liste.
- Ne jamais toucher aux vraies commandes, à l'ancienne base « Commandes 2025 », ni aux scénarios Make : Thomas les éteint lui-même après la bascule.
- Secrets uniquement dans Cloudflare (jamais dans le code). Modifications du dépôt `brief` par pull request, fusionnées par Thomas (Cloudflare redéploie sur `main`). Ne pas toucher la branche `main` du dépôt `augrandjardin` (site en ligne).

## 5. Points ouverts

- **Bio** : liste exacte des produits bio et formulation à valider avec Pierre.
- **Horaires** : l'ancien site affiche mercredi 17h–19h30 et samedi 10h–13h ; le Planning Notion ne coche que samedi 10h–12h30. Le nouveau site lit le Planning.
- **Photos** : 5 produits sans photo sur le site actuel (Betterave cuite, Ketchup, Tartinade, les deux Radis noirs) ; le prototype affiche une initiale.
- **Illustration** : la piste Weave « maraîcher qui paille sa planche » n'a pas été générée ; à relancer si Thomas la veut.
- **Mise en ligne** : projet Cloudflare Pages relié à la branche `site-2026` (adresse de test `*.pages.dev`), intégration Notion avec son jeton en secret Cloudflare, adresse de reconstruction dans le bouton Notion « Publier ». Thomas fait les clics, Claude guide écran par écran.
