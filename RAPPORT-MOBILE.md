# RAPPORT-MOBILE — Déclinaison mobile Kapam

Fichier Figma : `oGJVoOgpCvgf0DnCJTBLdU`
Canvas mobile : `8468:31767` — « Mobile (en cours) »
Largeur de référence : **390 px**
Session : nuit du 22/09/2026

---

## Phase 0 — Inventaire

### Constat d'entrée

La base mobile est **nettement plus avancée que ne le suppose le brief**. Le canvas
`8468:31767` contient déjà **14 sections** et **53 frames de page** à 390 px, plus
8 masters mobiles. Il ne s'agit donc pas de « décliner » mais de **compléter les
manques de fondation puis auditer et corriger l'existant**.

### 0.1 — Correspondance desktop ↔ mobile

| # | Page desktop | ID desktop | Mobile | ID mobile | État |
|---|---|---|---|---|---|
| 1 | Homepage | `6904:192` | ✅ | `8469:33059` | à auditer |
| 2 | Boutique — Index v5 | `8636:46929` | ✅ | `8826:134088` | à auditer |
| 3 | Catégorie v6 ① Défaut | `8820:49455` | ✅ | `8829:5471` | à auditer |
| 3 | Catégorie v6 ② Filtres actifs | `8824:134285` | ✅ | `8850:151082` | à auditer |
| 3 | Catégorie v6 ③ Aucun résultat | `8824:134421` | ✅ | `8850:151214` | à auditer |
| 3 | Catégorie v6 ④ Catalogue dense | `8824:134557` | ✅ | `8850:151346` | à auditer |
| 4 | Produit — Kit (template) | `7025:10460` | ✅ | `8850:141990` | à auditer |
| 5 | Page offre (formules) | `7559:4971` | ✅ | `8850:140342` | à auditer |
| 6 | Formule / Kit à monter | `7777:57428` | ✅ | `8850:11970` | à auditer |
| 6 | Formule / Kit posé en atelier | `7780:12445` | ✅ | `8850:12608` | à auditer |
| 6 | Formule / Van aménagé | `7780:12561` | ✅ | `8850:13198` | à auditer |
| 7 | Produit — Trafic L1H1 | `7407:16925` | ✅ | `8850:143475` | à auditer |
| 8 | Catégorie / Kit aménagement van | `7008:11154` | ✅ | `8850:144076` | à auditer |
| 8 | Catégorie / Kit aménagement Trafic | `7407:586` | ✅ | `8850:145939` | à auditer |
| 8 | Catégorie / Kit aménagement fourgon | `7402:15` | ✅ | `8850:146643` | à auditer |
| 8 | Catégorie / Véhicules à vendre | `7407:789` | ✅ | `8850:147344` | à auditer |
| 9 | Réalisations / Index | `7569:5219` | ✅ | `8850:133165` | à auditer |
| 9 | Réalisation / Julien & Marie | `7843:19916` | ✅ | `8850:133497` | à auditer |
| 9 | Réalisation / Ford Transit Custom | `8276:47791` | ✅ | `8850:134135` | à auditer |
| 9 | Réalisation / VW T5-T6 | `8293:48968` | ✅ | `8850:134830` | à auditer |
| 9 | Réalisation / VW Combi T2-T3 | `8297:50428` | ✅ | `8850:135529` | à auditer |
| 10 | Institutionnel / À propos | `7915:36607` | ✅ | `8848:9678` | à auditer |
| 10 | Institutionnel / FAQ | `7517:4378` | ✅ | `8848:12463` | à auditer |
| 10 | Institutionnel / Contact | `7524:4488` | ✅ | `8848:12741` | à auditer |
| 10 | Institutionnel / Revendeurs | `7531:4699` | ✅ | `8848:13041` | à auditer |
| 11 | Actualités / Blog (listing) | `7567:5111` | ✅ | `8849:131017` | à auditer |
| 11 | Actualités / Catégorie | `8423:29369` | ✅ | `8849:131319` | à auditer |
| 11 | Actualités / Article — Compatibilité | `8836:38353` | ✅ | `8849:131590` | à auditer |
| 11 | Actualités / Article — Template | `7782:14033` | ✅ | `8849:131837` | à auditer |
| 12 | Devis / Checkout | `6972:1887` | ✅ | `8850:13790` | à auditer |
| 12 | Devis / Confirmation | `6975:1968` | ✅ | `8850:14001` | à auditer |
| 13 | Recherche 1 · Panneau | `7975:20780` | ❌ | — | **MANQUANT** |
| 13 | Recherche 2 · Suggestions | `7975:33971` | ❌ | — | **MANQUANT** |
| 13 | Recherche 3 · Chargement | `7781:66157` | ✅ | `8850:139206` | à auditer |
| 13 | Recherche 4 · Résultats | `7781:13141` | ✅ | `8850:139415` | à auditer |
| 13 | Recherche 5 · Résultats filtrés | `7969:20487` | ✅ | `8850:139661` | à auditer |
| 13 | Recherche 6 · Aucun résultat | `7781:65971` | ✅ | `8850:139882` | à auditer |
| 13 | Recherche 7 · Sans JavaScript | `7969:33903` | ✅ | `8850:140116` | à auditer |
| 14 | Ressources / Guides | `8427:30000` | ✅ | `8849:9679` | à auditer |
| 14 | Ressources / Compatibilité | `8427:30121` | ✅ | `8849:9992` | à auditer |
| 14 | Ressources / Installation | `8427:30163` | ✅ | `8849:11621` | à auditer |
| 14 | Ressources / Garantie | `8427:30205` | ✅ | `8849:11819` | à auditer |
| 14 | Légal / Mentions légales | `7527:4605` | ✅ | `8843:8019` | à auditer |
| 14 | Légal / CGV | `7776:11317` | ✅ | `8844:8161` | à auditer |
| 14 | Légal / Confidentialité | `7777:21258` | ✅ | `8844:8359` | à auditer |
| 14 | Légal / Cookies | `7778:11864` | ✅ | `8844:8556` | à auditer |
| 14 | Légal / Retours & SAV | `7779:21821` | ✅ | `8844:8809` | à auditer |
| 14 | Système / 404 | `7780:22674` | ✅ | `8844:9022` | à auditer |
| — | Landing / LP Bordeaux | `7407:18100` | ✅ | `8850:136229` | hors priorité |
| — | Config v4 (6 écrans) | — | ✅ | section `8850:147963` | **hors périmètre** |

### 0.2 — Masters mobiles existants (`8477:2871`)

| Master | ID | Largeur | Mode variable |
|---|---|---|---|
| Nav / Header — Mobile (2 tons) | `8883:34` | 390 | ⚠️ `NONE` |
| Footer — Mobile | `8843:127257` | 390 | ⚠️ `NONE` |
| Navigation / Breadcrumbs — Mobile | `8883:147219` | 390 | ⚠️ `NONE` |
| Filtres et tri — Drawer — Mobile (2 états) | `8899:28569` | 390 | ⚠️ `NONE` |
| Card / Formule — Mobile | `8553:2936` | 268 | ⚠️ `NONE` |
| Card / Véhicule — Mobile | `8554:2936` | 268 | ⚠️ `NONE` |
| Card / Produit — condensée — Mobile | `8829:139187` | 165 | ⚠️ `NONE` |
| Carrousel / Navigation — Mobile | `8569:2887` | 342 | ⚠️ `NONE` |

### 0.3 — Composants du DS sans version mobile

Le DS desktop (`2354:673`) compte **119 composants / sets**. Manquent en mobile :

| Composant desktop | ID | Largeur | Besoin mobile |
|---|---|---|---|
| `Drawer / Mon devis` | `6950:574` | 936 | **Plein écran 390** — exigence CDC |
| `Drawer / Formulaire devis` | `6952:515` | 420 | Plein écran 390 |
| `Navigation / Mega menu` | `6938:383` | 1440 | **Navigation empilée à niveaux** |
| `Menu / Item` | `7037:662` | 1809 | Ligne de menu empilée |
| `Panneau / Filtres — Catégorie` | `8562:5456` | 1064 | partiellement couvert par `8899:28569` |
| `Modal / Véhicules compatibles` | `7322:1175` | 420 | feuille basse |
| `Modal / Onboarding devis` | `6947:449` | 400 | feuille basse |
| `Modal / Info devis` | `6947:458` | 420 | feuille basse |
| `Toast / Ajout devis` | `6947:444` | 303 | toast 390 |
| `Slider / Produit` | `7191:15093` | 2064 | carrousel 390 |
| `Table / Cellule` | `7117:3990` / `6954:8783` | 291 / 240 | bascule en cartes |
| `Réassurances / Nos engagements` | `7913:1176` | 1440 | empilé |
| `Stepper / Configurateur` | `6952:8850` / `7883:1557` | 1200 / 1328 | hors périmètre (config) |

### 0.4 — Collections de variables

| Collection | Modes | Variables |
|---|---|---|
| `0. Primitives - Measures` | Value | 18 |
| `1. Primitives - Colors` | Value | 16 |
| `2. Primitives - Typography` | **Desktop / Mobile** | 20 |
| `3. Responsive - Grid` | Mode 1 | 36 |
| `4. Tokens - Colors` | Default | 42 |
| `5. Tokens - Spacing` | **Desktop / Mobile** | 17 |
| `6. Tokens - Radius` | Default | 6 |
| `7. Tokens - Border` | Default | 2 |

Les 53 frames de page mobiles portent bien `Typography=Mobile` et `Spacing=Mobile`.
Les 8 masters mobiles ne les portent pas — ils s'affichent en typo/espacement Desktop.

---

## Phase 1 — Fondations

### 1.1 — Modes de variables des masters ✅

Les 8 masters mobiles n'avaient aucun mode explicite : ils s'affichaient en typographie et
espacement **Desktop**. `Typography=Mobile` et `Spacing=Mobile` posés sur les 8.

### 1.2 — Header mobile ✅ `8883:34`

**Avant** : logo + loupe (24 px) + burger (24 px). Pas d'accès « Mon devis ».

**Après**, sur les deux tons (`Ton=Clair` `8472:2950`, `Ton=Sur-image` `8883:14`) :

- 3 boutons de **44 × 44 px** (`Btn / Recherche`, `Btn / Mon devis`, `Btn / Menu`) — la cible
  tactile passe de 24 à 44 px.
- Accès **« Mon devis » avec compteur** : icône Phosphor `Receipt` + badge `Compteur` 18 px,
  positionné en absolu sur le coin haut-droit du bouton.
- Badge lié aux tokens : `bg/invert` + `text/on-invert` sur Clair, `bg/default` + `text/primary`
  sur Sur-image, rayon `radius/pill`.
- Icône `Receipt` liée à `text/primary` (Clair) et `text/on-invert` (Sur-image), comme ses
  icônes sœurs — Phosphor livrait un `#343330` en dur.
- Hauteur du header inchangée (56 px), padding vertical ramené à 6 px.

### 1.3 — Menu mobile à niveaux ✅ `9045:29073` — **créé**

`Nav / Menu mobile — Mobile`, plein écran 390 × 844, 3 variantes :

| Variante | ID | Contenu |
|---|---|---|
| `Niveau=1 · Racine` | `9045:29070` | 5 entrées du header desktop + CTA « Demander un devis » |
| `Niveau=2 · Aménagements` | `9045:29071` | mega-menu `7008:10984` déplié en liste |
| `Niveau=2 · Catalogue` | `9045:29072` | mega-menu `7008:11067` déplié en liste |

**Décisions structurelles** (Temps 2) :

- Le mega-menu desktop **n'est pas écrasé** : il devient une navigation à deux niveaux, avec
  retour fléché et titre de niveau en barre haute.
- Les lignes portent titre + description, comme le desktop — l'information n'est pas perdue.
- L'encart « Notre configurateur » est conservé en carte `bg/subtle` : c'est le point d'entrée
  principal du parcours, il ne peut pas devenir une ligne de liste banale.
- **Ce qui disparaît** : les 3 réalisations mises en avant (Aménagements) et les 2 bestsellers
  (Catalogue). Ce sont des blocs éditoriaux et marchands, pas de la navigation ; sur 390 px ils
  transformeraient le menu en page. Les liens « Toutes nos réalisations » et « Voir toute la
  boutique » restent et mènent aux pages qui portent ce contenu.
- Le CTA de conversion est épinglé en bas des trois niveaux, conformément à la hiérarchie
  à 4 niveaux du projet.
- Zone de contenu en `overflowDirection = VERTICAL` : le niveau Aménagements défile
  (951 px de contenu pour 699 px de fenêtre), les deux autres tiennent dans l'écran.

**Critique et corrections** :

- ❌ La dernière ligne de chaque liste portait un filet qui se cognait à la bordure du bloc CTA
  → filet supprimé sur les 3 niveaux.
- ⚠️ Niveau 1 : 400 px de vide entre la dernière entrée et le CTA. **Assumé** — le CTA de
  conversion doit rester en bas, et une navigation racine à 5 entrées n'a pas à être meublée.
- ⚠️ Le label du bouton desktop est `"Configurer mon projet "` avec une espace finale. Repris
  tel quel (interdit de réécrire les textes). **À corriger en amont, côté desktop.**

### 1.4 — Drawer « Mon devis » plein écran ✅ `9047:29054` — **créé**

`Drawer / Mon devis — Mobile`, 390 × 844, deux états :

| Variante | ID |
|---|---|
| `État=Vide` | `9047:29052` |
| `État=Rempli` | `9047:29053` |

Le drawer desktop de 936 px (`6950:574`) passe en **plein écran**, exigence CDC. Contenu et
lignes de devis **clonés du master desktop** : aucune copie réécrite, aucune ligne reconstruite.
Barre haute (titre + compteur + fermeture), contenu défilant, CTA d'envoi épinglé en bas.
Les séparateurs `Divider` du desktop sont supprimés au profit des gaps `component/gap/sm`.

**Critique et corrections** :

- ❌ **Deux croix de fermeture** (celle du header desktop cloné + la nouvelle) → celle du
  desktop supprimée, la nouvelle fait 44 px.
- ❌ « Comment fonctionne le devis Kapam ? » restait **centré** (héritage desktop) → aligné à
  gauche comme le reste de l'état vide.
- ❌ **Cibles tactiles héritées non conformes**, non corrigeables sans toucher au master
  desktop : croix `Supprimer` **16 × 16**, boutons `minus` / `plus` du stepper **14 × 14**.
  → **Suivi manuel : il faut une variante mobile de `Devis / Line item` (`6943:443`).**

### 1.5 — Footer mobile ✅ `8843:127257`

**Avant** : 4 colonnes de liens en wrap 2 × 2, **732 px** de haut, liens de **21 px**.

**Après** : 4 **sections repliables** (`Explorez`, `Créer`, `Ressources`, `Légal`).

- Hauteur repliée **478 px** (−35 %), 714 px avec une section ouverte.
- Entêtes à **49 px**, lignes de liens à **44 px** — cible tactile conforme.
- Séparateurs liés à `border/on-brand` en opacité 0,16 : `border/invert` valait `12,10,9`,
  exactement la couleur du fond, donc invisible.
- Les frames `Liens` sont masquées à l'état replié ; comportement documenté dans la
  `description` du composant.

**Non corrigé** : l'unique icône sociale est un caractère texte `"f"` — placeholder hérité du
desktop, laissé tel quel.


### 1.6 — Recherche 1 et 2 ✅ — **créés**

Les écrans 3 à 7 existaient, les deux écrans d'entrée manquaient.

| Écran | ID mobile | Source desktop |
|---|---|---|
| `Recherche — 1 · Panneau` | `9053:28810` | `7975:20780` |
| `Recherche — 2 · Suggestions` | `9053:28882` | `7975:33971` |

**Décision structurelle** : contrairement aux écrans 3-7 qui sont des **pages** (avec header et
footer), les écrans 1 et 2 sont traités en **panneaux plein écran 390 × 844**. Sur desktop ce
sont des overlays qui tombent sous le header ; sur mobile, un overlay de recherche occupe
l'écran entier. Ils sont insérés avant l'écran 3 dans la section, les 5 existants décalés.

**Ce qui disparaît** : la ligne « Entrée pour lancer la recherche · Échap pour fermer ».
Il n'y a pas de clavier physique sur mobile — cette aide n'a pas d'objet.

**Critique et corrections** :

- ❌ Le champ de l'écran 1 héritait de la valeur `"kit cuisine"` du gabarit cloné → remplacé
  par le placeholder desktop.
- ❌ Les chips « recherches fréquentes » étaient clonés en état **sélectionné** (`Style=Invert`,
  fond noir) → passés en `Style=Muted`.
- ⚠️ **Texte trop long pour le format** : `Rechercher un kit, un véhicule, un article…`
  ne tient pas dans le champ (302 px utiles moins le padding ≈ 34 caractères pour 43).
  **Non coupé, non réécrit** — à trancher par Thomas. Piste : `Rechercher un kit, un van…`.
- ⚠️ Les chips de filtre font **34 px** sur tous les écrans Recherche mobile (convention déjà
  en place, non modifiée ici — voir § 2.3).

---

## Phase 2 — Audit et corrections page par page

### 2.1 — Méthode

Les critères mesurables de la grille de critique (débordement, cibles tactiles, valeurs brutes)
ont été audités **programmatiquement sur les 53 pages**, plutôt que page par page à l'œil : sur
un corpus de cette taille, la mesure trouve ce que la capture rate. La critique visuelle a été
menée sur les pages du haut de l'ordre de priorité.

La règle de débordement ne compte que les nœuds **sans ancêtre clippant ou défilant** :
un carrousel assumé n'est pas un défaut.

### 2.2 — Résultats

| Indicateur | Avant | Après |
|---|---|---|
| Pages totalement propres | 23 / 53 | **34 / 53** |
| Débordements hors zone de scroll | 88 | **29** (dont 26 sur LP Bordeaux) |
| Cibles tactiles sous 44 px | ~200 | **0** |
| Couleurs de texte en valeur brute | 273 | **0** |
| Fonds et bordures en valeur brute | ~90 | 57 |

### 2.3 — Corrections appliquées

**Carrousels non clippés** — 8 rangées horizontales (homepage ×4, boutique index ×3, rail
marques catégorie ×4) étaient en auto-layout horizontal **sans `clipsContent` ni
`overflowDirection`** : les cartes fuyaient jusqu'à 1 416 px hors écran. Passées en zone de
défilement horizontale. Les 8 disposent déjà d'un `Carrousel / Navigation — Mobile`.

> J'ai d'abord sur-appliqué la correction à 9 conteneurs étroits (blocs de prix, notes en
> étoiles, cellules de tableau). Les clipper **masquait du contenu** : correction annulée sur
> ces 9, et reclassées en défauts de gabarit (voir § 2.4).

**Homepage — footer desktop** `8469:33059` : la homepage était la **seule page sur 53** à
instancier le footer **desktop** `6888:325` compressé à 390 px, au lieu de `Footer — Mobile`.
Remplacé. Page : 11 278 → 11 012 px.

**Homepage — hero illisible** `8469:33061` : défaut le plus grave trouvé cette nuit, sur la
section la plus vue du site.

- Le média était rétréci à 390 × 360 et **poussé sous le bloc de texte** ; l'ellipse décorative
  héritée du desktop était hors cadre à `x=-245, y=-312`. Résultat : **titre blanc sur fond
  blanc**, et le bouton secondaire `Inverse` (blanc) invisible sur blanc.
- Vérifié sur le desktop (`6904:223`) : le média y couvre 1 440 × 804 **derrière** le texte.
  L'intention est bien « texte sur visuel ».
- Corrigé : média plein cadre 390 × 786, `Voile sombre` 34 % **lié à `bg/invert`** (convention
  déjà utilisée sur Boutique Index et Catégorie v6), ellipse masquée, ligne de note passée en
  `text/on-invert`.
- Le voile reste **solide** et non dégradé : un dégradé imposerait des arrêts de couleur en
  valeur brute. Le compromis assombrit légèrement la photo basse — à arbitrer.

**Cibles tactiles** — 74 contrôles réellement interactifs portés à 44 px :

- 10 instances `Button` en `Size=sm` (37 px) → `Size=md` (**48 px**).
- 64 contrôles de type lien (`Link / text`, `Lien famille`, `Tri`, `Bouton / Filtres et tri`,
  `Bouton / Devis sur mesure`, boutons `Hierarchy=Link`) → padding vertical porté à 44 px.
  Les variantes `Link` plafonnent à 27 px : aucun réglage de variante ne pouvait suffire.
- `minHeight` n'est **pas surchargeable sur une instance** : le padding vertical l'est, ce qui
  évite d'emballer 64 nœuds dans des conteneurs supplémentaires.

À ce stade il restait 16 contrôles sous 44 px, que j'avais pris pour des badges décoratifs.
**C'était faux** — voir § 2.5, ils ont tous été traités.

**Conteneurs effondrés** — sur les 4 pages catégorie, le bloc `configurateur` et 69 frames
descendantes étaient **à 1 px de large** pour un contenu de 278 à 616 px. Repassés en `FILL`.

**Grilles de cartes à 3 colonnes** — `section / Container / Content` était une grille de
3 colonnes dans 358 px, soit des `Card / Réalisation` de **103 à 114 px** de large pour un
contenu de 493 à 630 px. Converties en **liste empilée** sur 5 pages (4 catégories + À propos),
cartes à 358 px, hauteur rendue automatique.

> Décision : **empiler plutôt que scroller**. Le brief pose le principe pour les tableaux
> comparatifs ; il vaut aussi ici. Ces blocs sont secondaires et n'ont pas de contrôle de
> carrousel : un scroll horizontal y cacherait du contenu sans le signaler.

**Témoignages À propos** — `Testimonial / Section` (`8848:12039`), instance desktop de
**1 168 px de contenu dans 358 px**. `overflowDirection` n'étant pas surchargeable sur une
instance, elle est enveloppée dans une frame `Zone défilante` clippée en scroll horizontal.

**Valeurs brutes** — 488 fills liés aux tokens :

- **272 textes en noir pur `#000000`** sur 14 pages, alors que `text/primary` vaut `#0C0A09`.
  C'est précisément la valeur brute que le brief interdit. Tous basculés sur le token.
  Pages les plus touchées : Ressources Guides (59), Blog listing (58), Actualités Catégorie
  (38), Page offre (37), Réalisations Index (27), Contact (17).
- 216 fonds et bordures appariés par **correspondance exacte de couleur** avec un token
  (`bg/default` ×215, `text/on-invert` ×1).
- Les 57 restants sont des couleurs d'**illustration** (noir pur vectoriel ×648, teintes
  bleu-vert des visuels) : elles n'ont pas de token, et c'est normal.

### 2.4 — Défauts constatés et **non corrigés**

| Page | Défaut | Pourquoi non corrigé |
|---|---|---|
| `Kapam / Produit / Trafic L1H1` `8850:143475` | Section `S2 — Comparatif kits` (5 109 px) **masquée**, contenant 2 tableaux en grille 5 colonnes à 65 px et une grille de 4 `Card / Véhicule` à 72 px | Section parquée, pas en production. **À basculer en cartes empilées avant de la réactiver.** |
| 4 pages Catégorie v6 | `Panneau / Filtres — Catégorie (mobile)` (826 px) masqué | idem — état de maquette, non actif |
| `Institutionnel / À propos` | 3 blocs masqués (`section` 1 226 px, `configurateur` 640 px, `Container` 748 px) | idem |
| `Landing / LP Bordeaux` | 26 débordements, 1 043 fills bruts | **Hors ordre de priorité** du brief. Page de 14 240 px à reprendre à part. |
| `Boutique / Page offre` | `Prices Container` : 3 prix (158 px) dans un conteneur de 112 px | Défaut de gabarit hérité, à trancher : le prix barré doit-il passer sous le prix courant ? |
| `Produit / Trafic L1H1` | `Frame 2147227155/159` : libellés de 126 à 171 px dans des cellules de 65 px | Dans la section masquée, même arbitrage |
| Homepage, À propos, LP Bordeaux | Note en étoiles : `Frame 2147227094` de 16 px pour 24 px de contenu | Technique de demi-étoile, présente aussi sur desktop |
| Drawer Mon devis mobile | Croix `Supprimer` 16 px, stepper `minus`/`plus` 14 px | Hérité de `Devis / Line item` desktop — **interdit de modifier un master desktop** |
| Footer mobile | Icône sociale = caractère texte `"f"` | Placeholder hérité du desktop |


### 2.5 — Seconde passe (après première rédaction du rapport)

**Cibles tactiles : 16 → 0.** Les 16 contrôles que j'avais classés « tags et chips à arbitrer »
étaient en réalité **tous de vrais contrôles**. Mon filtre de noms les avait manqués : il
cherchait `Button` exact et `Lien` exact, alors que le fichier nomme ses nœuds
`Button — VOIR LE PROJET`, `Lien — DÉCOUVRIR L'ATELIER`, `Chip / Renault (supprimable)`.

- 2 `Button` en `Size=sm` (37 px) → `Size=md` (48 px) sur Boutique Index.
- 10 contrôles `Hierarchy=Link` / `Link inverse` (24 px) → padding vertical à 44 px :
  5 × `Button — VOIR LE PROJET`, `Lien — DÉCOUVRIR L'ATELIER`, `Lien — Voir tous les kits`,
  `Lien — Voir tous les accessoires`.
- 4 chips de filtre supprimables (25 px) → 44 px.

**Vérification finale avec la bonne règle** (un contrôle est conforme si un conteneur
tappable d'au moins 44 px l'englobe) : **0 contrôle sous 44 px sur les 53 pages**.
Les liens `Lien — KITS D'AMÉNAGEMENT` et consorts restent à 24 px mais sont enveloppés
dans un `Lien famille` de 44 px — la cible est bonne.

**Voile du hero : solide → dégradé.** Les tuiles familles de Boutique Index
(`IMG / INDEX / FAMILLE-*`) utilisent des `Scrim bas` en **dégradé linéaire**
(alpha `0.00 → 0.28 → 0.88`), sans liaison à un token — c'est la convention du fichier pour
les voiles, et aucun token ne couvre les arrêts de dégradé.

Le voile solide à 34 % que j'avais posé sur le hero assombrissait uniformément la photo du van.
Remplacé par un dégradé haut → bas calé sur la fin réelle du bloc de texte
(`0.00:a0.70 → 0.54:a0.52 → 0.68:a0.00`) : la copie et la ligne de note restent lisibles,
la photo redevient propre sous le bloc de contenu.

### 2.6 — Critique visuelle · Boutique — Index `8826:134088`

| Critère | Verdict |
|---|---|
| Hiérarchie | ✅ Hero « texte sur visuel », promesse lisible en trois secondes |
| Densité | ✅ 14 sections pour 7 965 px, alternance visuel / texte / carrousel |
| Rythme | ✅ Pas de répétition : hero, statement, bande de tuiles, carrousel, bandeau édito, 50/50 |
| Cibles tactiles | ✅ Après correction — CTA du hero à 48 px, liens de section à 44 px |
| Texte | ✅ Aucune ligne excessive |
| Débordement | ✅ 0 — les 3 rails sont des zones de défilement assumées, avec navigation |
| CTA | ✅ `Inverse` + `Secondary inverse` dans le hero, CTA final en bas de page |
| Images | ✅ Ratios 4:5 tenus, voiles dégradés identiques sur les 4 tuiles |

Deux points relevés, aucun bloquant :

- La bande de tuiles familles est **bord à bord, sans gouttière** (nom de la frame :
  « Bande familles (bord à bord, sans gouttière) ») alors que le reste de la page respecte la
  gouttière de 16 px. C'est un choix assumé dans le nommage, pas un accident.
- Les libellés de tuile sont collés au bas de leur tuile. Lisibles grâce au dégradé, mais
  un retrait de 12 px leur donnerait de l'air.


---

## Phase 3 — LP Bordeaux et câblage du prototype

### 3.1 — LP Bordeaux `8850:136229`

Les 26 débordements relevés étaient **exactement les trois mêmes défauts** que sur les pages
catégorie, et les « 1 043 fills bruts » un faux positif : **982 sont des fills vectoriels
d'illustration**, qui n'ont pas de token et n'en auront jamais. Seuls 3 fills de frame étaient
réellement en cause.

| Défaut | Correction |
|---|---|
| `configurateur / Content Left` et 5 frames descendantes **effondrées à 1 px** | repassées en `FILL` |
| Grille de 6 `Card / Réalisation` en 3 colonnes à **103 px** | empilée, cartes à 358 px, hauteur automatique |
| `Testimonial / Section` : **1 168 px de contenu dans 358 px** | enveloppée dans une `Zone défilante` clippée |

**Débordements : 26 → 0.** Page à 15 505 px (l'empilement des cartes ajoute de la hauteur,
c'est le prix de la lisibilité).

### 3.2 — Câblage du prototype

**Découverte préalable.** Le prototype mobile existait déjà (1 085 interactions) mais
**51 de ses 52 liens inter-écrans pointaient vers des frames desktop de 1 440 px** : les pages
mobiles avaient été dupliquées depuis le desktop en conservant leurs destinations. Un clic sur
« Contact » depuis un écran mobile renvoyait sur le Contact desktop.

**Rebranchement — 45 liens.** Lecture des `reactions`, clonage, substitution du seul
`destinationId`, `setReactionsAsync`. Les 492 états de survol et les 1 026 `CHANGE_TO` existants
sont intacts.

| Destination desktop | → mobile | Liens |
|---|---|---|
| `6904:192` Homepage | `8469:33059` | 11 |
| `7553:4943` HUB — Devis Step 1 | `9065:29387` **(créé)** | 14 |
| `7407:16925` Produit Trafic L1H1 | `8850:143475` | 8 |
| `7524:4488` Contact | `8848:12741` | 6 |
| `7008:11154` Catégorie Kit van | `8850:144076` | 3 |
| `7567:5111` Blog (listing) | `8849:131017` | 1 |
| `8267:62041` Config v4 1.1 | `8850:147964` | 1 |
| `7834:19574` Prise de rendez-vous | `9065:29501` **(créé)** | 1 |

**Restent 6 liens vers le desktop**, tous vers `Config v4 / Drawer Option` — le configurateur
est hors périmètre de cette session.

**Écrans d'overlay — nouvelle section `🧭 Overlays — Mobile 390` (`9063:156305`).**
Figma **refuse une variante de composant comme destination d'overlay** : les masters ne
pouvaient pas servir directement. Sept frames dédiées de 390 × 844 portent donc une instance :

| Écran | ID |
|---|---|
| Menu mobile — Niveau 1 · Racine | `9063:156306` |
| Menu mobile — Niveau 2 · Aménagements | `9063:156342` |
| Menu mobile — Niveau 2 · Catalogue | `9063:156408` |
| Drawer Mon devis — Rempli | `9063:156461` |
| Drawer Mon devis — Vide | `9063:156560` |
| Modal / HUB — Devis Step 1 — Mobile 390 | `9065:29387` |
| Overlay / Prise de rendez-vous — Mobile 390 | `9065:29501` |

**18 interactions posées :**

- Header (les deux tons, donc les 53 pages d'un coup) : burger → menu (`MOVE_IN` droite),
  loupe → panneau de recherche (`DISSOLVE`), Mon devis → drawer (`MOVE_IN` bas).
- Menu : `Aménagements` et `Catalogue` → `CHANGE_TO` vers le niveau 2 en `SMART_ANIMATE`,
  retour → niveau 1, fermeture → `CLOSE`.
- Drawer et panneaux de recherche : fermeture → `CLOSE`.
- Recherche 1 · saisie → Recherche 2.

Total : **1 085 → 1 258 interactions**, dont 162 overlays et 14 fermetures. Aucun survol perdu.

**Deux modales du parcours devis créées** (copie clonée du desktop, rien de réécrit) :

- `Modal / HUB — Devis Step 1 — Mobile 390` — les 3 formules empilées, chacune avec son CTA,
  barre haute avec titre et fermeture à 44 px. C'était le **maillon manquant le plus utilisé**
  du parcours de conversion : 14 liens y menaient.
- `Overlay / Prise de rendez-vous — Mobile 390` — les créneaux passent de 4 colonnes de 114 px
  à **2 colonnes de 159 px** via `layoutWrap`, chaque créneau à 44 px de haut.

> Trois itérations ont été nécessaires sur la grille de créneaux : 4 par rangée à 76 px (trop
> étroit), puis 3 avec un orphelin étiré sur toute la largeur, puis 2 par rangée qui divise
> exactement les 4 créneaux. La largeur utile du bloc est 326 px, pas 358.

**Non réalisable par l'API, à poser à la main :**

- `overlayPositionType`, `overlayBackground` et `overlayBackgroundInteraction` sont en
  **lecture seule** : le positionnement et le fond des overlays gardent le réglage par défaut
  de Figma. **À régler à la main** (position centrée, fond sombre, fermeture au clic extérieur).
- `INSTANCE_SWAP`, comme signalé plus haut.

### 3.3 — Fil d'Ariane `8883:147219`

Les noms de page longs sortaient de l'écran : « Vérifier la compatibilité de son modèle »
(251 px à partir de x=157) et « Van aménagé, prêt à partir » (249 px à partir de x=228).

Passé en **zone de défilement horizontale** plutôt qu'en troncature : aucun texte n'est coupé,
conformément au brief, et rien ne déborde. Débordements sur les deux pages : 2 → 0.

### 3.4 — État final

| Indicateur | Début de session | Fin |
|---|---|---|
| Écrans mobiles | 53 | **60** (7 overlays créés) |
| Écrans totalement propres | 23 / 53 | **43 / 60** |
| Débordements | 88 | **1** |
| Cibles tactiles sous 44 px | ~200 | **0** |
| Couleurs de texte en valeur brute | 273 | **0** |
| Fonds et bordures non liés | ~90 | **44** (hors palette, voir ci-dessous) |
| Liens du prototype pointant vers le desktop | 51 | **6** (configurateur, hors périmètre) |

**Le débordement restant** : `Frame` de 1 px sur Page offre — la technique de demi-étoile de la
note, présente aussi sur desktop.

**Les 44 fonds restants sont hors palette** et demandent un arbitrage, pas un calage
automatique. Les écarts imperceptibles (Δ ≤ 12) ont été liés, les autres sont listés tels quels :

| Nœud | Valeur | Token le plus proche | Écart | Occurrences |
|---|---|---|---|---|
| `Frame` | `242,242,240` | `bg/subtle` `247,247,245` | Δ15 | 26 |
| `Cta`, `S7 — CTA final`, `S12 — CTA final` | `155,155,155` | aucun gris neutre au DS | — | 9 |
| `Navigation Button` | `17,17,17` | `bg/invert` `12,10,9` | Δ20 | 4 |
| `Ellipse 5` à `Ellipse 8` | `217,217,217` | `border/default` `219,216,205` | Δ15 | 4 |
| `CTA dark` | `23,23,23` | `bg/invert` `12,10,9` | Δ38 | 1 |

Le gris `155,155,155` mérite une décision : la palette Kapam est **chaude**
(`bg/placeholder/medium` vaut `196,192,173`), ces gris neutres lui sont étrangers. Soit ce sont
des placeholders d'image à basculer sur `bg/placeholder/*`, soit il manque un token de gris
neutre au DS.

---

## Composants du DS toujours sans version mobile

Créés cette nuit : `Nav / Menu mobile — Mobile`, `Drawer / Mon devis — Mobile`.

Restent à faire :

| Composant desktop | ID | Besoin mobile | Priorité |
|---|---|---|---|
| `Devis / Line item` | `6943:443` | **Cibles tactiles 44 px** (suppr. 16 px, stepper 14 px) | **haute** — bloque le drawer mobile |
| `Testimonial / Section` | `6899:331` | Version mobile empilée ou carrousel natif | haute |
| `Drawer / Formulaire devis` | `6952:515` | Plein écran 390 | haute |
| ~~`HUB — Devis Step 1`~~ | `7553:4943` | ✅ créé — `9065:29387` | — |
| ~~`A4 · Prise de rendez-vous`~~ | `7834:19574` | ✅ créé — `9065:29501` | — |
| `Table / Cellule` | `7117:3990`, `6954:8783` | Bascule en cartes empilées | haute |
| `Modal / Véhicules compatibles` | `7322:1175` | Feuille basse | moyenne |
| `Modal / Onboarding devis` | `6947:449` | Feuille basse | moyenne |
| `Modal / Info devis` | `6947:458` | Feuille basse | moyenne |
| `Toast / Ajout devis` | `6947:444` | Toast 390 | moyenne |
| `Slider / Produit` | `7191:15093` | Carrousel 390 | moyenne |
| `Réassurances / Nos engagements` | `7913:1176` | Empilé | basse |
| `Card / Réalisation` | `6991:612` | Variante mobile 358 (utilisée redimensionnée) | basse |
| `Stepper / Configurateur` | `6952:8850`, `7883:1557` | — | hors périmètre |

`INSTANCE_SWAP` ne peut pas être créé par l'API : les composants mobiles ci-dessus qui en
auraient besoin devront être montés à la main.

---

## Textes signalés comme trop longs pour le format

Aucun n'a été coupé ni réécrit.

| Page | Texte | Problème |
|---|---|---|
| `Recherche — 1 · Panneau` | `Rechercher un kit, un véhicule, un article…` | ~43 caractères pour ~34 utiles dans le champ |
| `Système / 404` | `Un kit, un modèle de van, une réalisation…` | tronqué dans le champ de recherche |
| Menu mobile / mega-menu desktop | `Configurer mon projet ` | **espace finale** dans le label — défaut de la copie desktop |
| Homepage hero | `L'aménagement pour van et fourgon de Kapam est la solution simple, modulable et personnalisable pour faire de votre utilitaire un van aménagé, véritable camping-car prêt pour toutes vos escapades.` | 5 lignes centrées au-dessus de la ligne de flottaison |
| Menu / Aménagements | `Construit avec nos artisans dans notre atelier de Bordeaux` | passe sur 2 lignes en description de ligne |

---

## Note sur la tablette — où le desktop casse en se contractant

Hors périmètre, décision non prise. Le travail de cette nuit a produit la liste des points de
rupture, qui est exactement ce qu'il faut pour trancher entre « on maquette la tablette » et
« on écrit une règle de comportement dans le CDC ».

**Les frames mobiles sont nommées et structurées pour qu'un palier intermédiaire s'insère** :
sections thématiques, un frame par page à 390 px, masters mobiles séparés des masters desktop.

| Élément | Largeur desktop | Où il casse | Palier tablette probable |
|---|---|---|---|
| `Nav / Header` + mega-menu | 1440 | dès que les 5 liens + CTA ne tiennent plus, vers **900 px** | burger dès 900, mega-menu conservé jusque-là |
| Footer 4 colonnes | 1280 | les colonnes deviennent illisibles sous **700 px** | 2 colonnes de 700 à 1024, accordéons sous 700 |
| `Drawer / Mon devis` | 936 | le drawer mange l'écran sous **768 px** | plein écran sous 768 |
| Grilles de cartes 3 colonnes | 1248 | cartes sous 240 px, donc sous **800 px** | 2 colonnes de 600 à 1024, 1 colonne sous 600 |
| Tableaux comparatifs 5 colonnes | 1248 | cellules sous 120 px, donc sous **700 px** | **cartes empilées sous 900** — ne pas tenter le scroll horizontal |
| `Testimonial / Section` 3 cartes | 1168 | sous **1200 px** | carrousel dès 1024 |
| Carrousels produits | 4 cartes visibles | 2 cartes sous **900 px** | 2 à 3 cartes de 768 à 1024 |
| Hero « texte sur visuel » | 1440 | le texte dépasse 60 caractères par ligne au-dessus de **1100 px** ; sous 600 px la photo doit passer en fond plein cadre | largeur de texte plafonnée à 60ch de 768 à 1024 |
| `Panneau / Filtres — Catégorie` | 1064 | colonne latérale sous **900 px** | drawer dès 900 |

**Recommandation** : les points de rupture se concentrent entre **700 et 900 px**. Une règle de
comportement au CDC suffirait pour le header, le footer et les carrousels. En revanche les
**tableaux comparatifs** et le **panneau de filtres** changent de nature, pas seulement de
taille : ces deux-là méritent d'être maquettés.

---

## Ce que je n'ai pas pu faire

- **La critique visuelle des 53 pages une par une.** À raison de 5 à 12 captures par page pour
  des gabarits de 3 000 à 17 500 px, ce n'était pas tenable en une session. J'ai compensé par
  un audit mesuré sur l'intégralité du corpus et une critique visuelle sur le haut de l'ordre
  de priorité (Homepage, Boutique Index, Catégorie v6, 404, Contact, Revendeurs, cartes
  Réalisation, témoignages).
- ~~LP Bordeaux~~ → **traité**, voir § 3.1.
- **Les sections masquées** listées en § 2.4 : les réactiver relève d'une décision produit.
- **Le configurateur** : exclu par le brief.
- ~~Aucune interaction de prototype ajoutée~~ → **câblées**, voir § 3.2.

## Garanties

- **Aucune page desktop, aucun master desktop n'a été modifié.** Les seules lectures côté
  desktop ont servi à reprendre la copie et l'intention (hero, mega-menus, drawer).
- Aucune interaction existante n'a été touchée.
- Aucune image générée, aucun placeholder remplacé.
- Aucun texte réécrit : les textes trop longs sont signalés, pas coupés.
