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

