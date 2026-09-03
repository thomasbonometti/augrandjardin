# Audit — Déclinaisons mobile Kapam

Fichier : `oGJVoOgpCvgf0DnCJTBLdU` · Page mobile auditée : `8468:31767` (« Mobile (en cours) »)
Desktop de référence : page `2353:1248` (« 🖥️ Pages (Desktop) »)
Périmètre : 53 frames mobile + 6 masters mobile (section `8477:2871`)

Sévérités : **P0** bloquant · **P1** visible · **P2** propreté

---

## PASSE A — AUDIT

### A. Défauts systémiques (touchent la quasi-totalité des frames)

| # | Sév | Node | Constat (valeur trouvée) | Attendu |
|---|-----|------|--------------------------|---------|
| S1 | **P0** | `8472:2950` — master `Nav / Header — Mobile` | Le master est **intégralement invisible** : logo (8 vecteurs) lié à la variable `white` `#ffffff` ; strokes loupe + burger en `#ffffff` **codés en dur** ; composant sans fond (`fills = none`). Rendu réel : image 390×56 entièrement blanche. | Logo lié à `text/primary` `#0c0a09` (comme le master desktop) ; strokes icônes liés à `text/primary` ; fond du composant lié à la même variable que la variante desktop `Nav / Header · Ton=Clair`. |
| S2 | **P0** | 34 frames (voir liste B) | Utilisent l'instance du master **desktop** `Nav / Header · Ton=Clair` (1280 de large, padding latéral **96/96**) compressée à 390. Conséquence mesurée sur `8844:9022` : **logo et les 5 liens de nav ont disparu**, il ne reste que la loupe et le bouton « Demander un devis ». | Instance de `Nav / Header — Mobile` (390×56, padding **24/24**, logo + loupe + burger). |
| S3 | **P0** | 34 instances | Utilisent l'instance desktop `Navigation / Breadcrumbs` avec padding latéral **96/96** dans une frame de 390 → 198 px de contenu utile. **Aucune variante mobile n'existe** dans le fichier. | ⚠️ **Arbitrage requis** — composant manquant. Non corrigé (règle 2 : pas de bricolage d'instance). |
| S9 | **P0** | Collections `2. Primitives - Typography` et `5. Tokens - Spacing` | Ces deux collections ont bien un mode **Mobile**, mais **il n'a jamais été renseigné** : toutes ses valeurs sont identiques au mode Desktop (`section/gutter` = **96** en Desktop **et** en Mobile, `size/48` = 48 dans les deux). Aucune frame mobile ne déclare le mode Mobile — mais le déclarer ne changerait rien en l'état. | ⚠️ **Arbitrage requis** — remplir le mode Mobile suppose de décider l'échelle typo mobile et la gouttière mobile. La collection `3. Responsive - Grid` propose `mobile/Margin = 16` et `layout/padding/mobile = 16`, alors que les pages utilisent **24** en dur. Je ne crée ni ne modifie de token sans ton accord. |
| S10 | **P0** | `8472:2950` | `Nav / Header — Mobile` n'a **qu'un seul état**. Le master desktop a deux variantes (`Ton=Clair`, `Ton=Sur-image`). Trois frames posent le header sur un héros en image : Homepage `8469:33059`, À propos `8848:9678`, LP Bordeaux `8850:136229` — elles utilisaient la variante `Ton=Sur-image`. | ⚠️ **Arbitrage requis** — créer une variante mobile `Sur-image` (logo blanc) ou assumer un header opaque. Non tranché. |
| S4 | ~~P0~~ | `8850:133497`, `8850:134135`, `8850:134830`, `8850:135529` | ❌ **FAUX POSITIF de la passe A — corrigé en passe C.** Mon détecteur testait le nom des enfants directs sur `/footer/i` et matchait le conteneur `S12 — CTA + Footer`, qui est une simple frame de regroupement. Vérification faite : elle contient bien une **instance** de `Footer — Mobile` (390×729). Rien n'est détaché sur ces 4 frames. | Sans objet. |
| S11 | **P0** | `8850:142316` — `Banner Section` de `8850:141990` (Produit — Kit) | Bloc de **720 px de haut entièrement blanc**. Bandeau sombre desktop transplanté : image de fond réduite à **390×217** au lieu de couvrir la section, textes restés en **blanc** → blanc sur blanc. La grille desktop 2 colonnes a survécu : colonne de texte à **136 px** de large pour 656 de haut. | Image de fond couvrant la section, colonne de texte en pleine largeur, contraste rétabli. |
| S5 | **P1** | `8826:134088`, `8829:5471`, `8850:151082`, `8850:151214`, `8850:151346` | Utilisent le master **desktop** `Footer` (h=409) alors que `Footer — Mobile` (`8843:127257`, h=729) existe. | Instance de `Footer — Mobile`. |
| S6 | **P1** | Toutes les frames portant `Footer — Mobile` | Padding latéral du footer = **15/15** alors que le padding de page est **24/24** partout. Décalage visible de 9 px sur les colonnes « Explorez / Créer ». | Padding latéral **24/24**, aligné sur la gouttière de page. |
| S7 | **P1** | Instances `Nav / Header — Mobile` | `paddingTop` / `paddingBottom` = **14** — hors échelle d'espacement (8/12/16/24…). | 12 ou 16, lié à une variable d'espacement. |
| S8 | **P1** | `Carrousel / Navigation — Mobile` (toutes occurrences) | `itemSpacing` = **14** — hors échelle. | 12 ou 16. |

### B. Frames utilisant la nav desktop (défaut S2)

`8850:140342`, `8850:141990`, `8850:143475`, `8850:144076`, `8850:145939`, `8850:146643`,
`8850:147344`, `8850:11970`, `8850:12608`, `8850:13198`, `8850:133165`, `8850:133497`,
`8850:134135`, `8850:134830`, `8850:135529`, `8843:8019`, `8844:8161`, `8844:8359`,
`8844:8556`, `8844:8809`, `8844:9022`, `8850:139206`, `8850:139415`, `8850:139661`,
`8850:139882`, `8850:140116`, `8850:13790`, `8850:14001`, `8849:9679`, `8849:9992`,
`8849:11621`, `8849:11819`, `8848:12463`, `8848:12741`, `8848:13041`, `8849:131017`,
`8849:131319`, `8849:131590`, `8849:131837`

Frames **sans aucun header** : `8469:33059` (Homepage — porte en plus un calque masqué
`Nav / Header (desktop — masqué)` `8469:33062`), `8848:9678` (À propos), `8850:136229` (LP Bordeaux),
et les 6 frames Configurateur (`8850:147964`, `8850:149265`, `8850:149370`, `8850:149515`,
`8850:150850`, `8850:150980`).

### C. Défauts par famille — frames les plus touchées

| Famille | Sév | Frames concernées (compte) |
|---|---|---|
| **Texte sans style DS** (`textStyleId` vide) | **P0** | `8849:9679` Guides (59) · `8849:131017` Blog (58) · `8849:131319` Actus Catégorie (38) · `8850:140342` Page offre (35) · `8850:133165` Réalisations Index (27) · `8848:12741` Contact (22) · `8849:9992` Compatibilité (20) · `8848:13041` Revendeurs (17) |
| **Couleur en dur** (fill non lié à variable) | **P0** | Guides (70) · Blog (69) · Actus Catégorie (45) · Réalisations Index (41) · Page offre (33) · Produit Kit (29) · Contact (25) · Compatibilité (21) · Revendeurs (21) · FAQ (18) · LP Bordeaux (17) |
| **Typo desktop non déclinée** (texte ≥ 32 px) | **P1** | Réalisations Index (6) · Page offre (5, dont `Kit DIY` à **40 px**) · Guides (3) · Revendeurs (3) · Cat. van / Trafic / fourgon / Véhicules (`Heading` à **48 px**) |
| **Cibles tactiles < 44 px** | **P1** | Boutique Index (16, boutons h=**37**, liens h=**24**) · Catégorie v6 ①-④ (10 à 13, chips h=**25**) · Revendeurs (11) · Contact (10) · Recherche 6 & 7 (5) · Config 3.1 (3) |
| **Espacement hors échelle** | **P1** | Config 3.1 (57) · Config 3.2 (43) · Config 2.1 (41) · VW T5-T6 (46) · Combi T2-T3 (46) · Ford Transit (42) · Guides / Blog (39) · Cat. Trafic (33) · Cat. van (32) |
| **Espacement négatif** (hack de chevauchement) | **P1** | `8850:145939` `itemSpacing = -376` · `8850:144076` `-8` · Page offre / Produit Kit / Cat. fourgon `-1` |
| **Rayon en dur** (non lié à variable) | **P2** | Config 2.1 (69) · Recherche 3 (21) · VW T5-T6 / Combi (21) · Ford (19) · À propos (22) · Guides / Blog (20) |
| **Nommage générique** (`Frame 2147227190`…) | **P2** | Produit Kit (94) · Guides / Blog (33) · Homepage (27) · LP Bordeaux (27) · Actus Catégorie (17) · Réalisations Index (18) |
| **Calques masqués résiduels** | **P2** | Boutique Index (15) · Catégorie v6 ①-④ (12 chacune) · Homepage (7) · À propos (7) · Véhicules à vendre (6) |
| **Texte tronqué** (`textTruncation = ENDING`) | **P1** | Les 5 frames Configurateur 1.1 → 3.1 (1 chacune) |
| **Position absolue résiduelle** | **P1** | Boutique Index (11) · Catégorie v6 ①-④ (8 chacune) · Homepage (7) · LP Bordeaux (6) · À propos (5) |

### D. Défauts ponctuels relevés au screenshot

| # | Sév | Node | Constat | Attendu |
|---|-----|------|---------|---------|
| D1 | **P1** | `8844:9022` (404) | Champ de recherche : texte coupé — « Un kit, un modèle de van, une réalisatio ». | Placeholder raccourci ou champ en pleine largeur sans troncature. |
| D2 | **P1** | `8844:9022` (404) | Rangée « Accueil · Aménagements · Boutique · Contact » sur une seule ligne, hauteur de cible ~24 px. | Empilement ou hauteur de cible ≥ 44 px. |
| D3 | **P1** | `8469:33059` — `HERO / ANIM VENT` | Titre du héros en **blanc sur un ciel clair** : « Kapam aménage et transforme le van de votre utilitaire » est quasi illisible. | Voile assombrissant, ou passage du titre sur `text/primary`. |
| D4 | **P2** | `Footer — Mobile` `8843:127257` | Les 4 colonnes du bloc liens étaient en **largeur fixe 172**, calées au pixel sur une gouttière de 15. Toute variation de largeur de frame (375 / 430) faisait dépiler la grille 2×2 en 4 lignes. | Largeurs recalculées sur la gouttière de page. Reste en fixe : Figma ne gère pas `FILL` dans un auto-layout `WRAP` sans tout mettre sur une ligne. |

### E. Non couvert par cette passe

- **Fidélité de contenu au desktop** (famille 1 de la checklist : sections présentes, ordre,
  hiérarchie de titres, ordre d'empilement des colonnes) : vérifiée uniquement sur les frames
  traitées en passe B. Les 53 frames n'ont pas été comparées texte à texte à leur homologue desktop.
- **Contraste sur blocs sombres / images de fond** : non mesuré.
- **Ratios d'images** : non mesuré.

---

## PASSE B — CORRECTIONS

**Lot 1 — master `Nav / Header — Mobile` `8472:2950` (défaut S1)**
- Logo (8 vecteurs `8472:2952` → `8472:2959`) : fill `white` → variable **`text/primary`**.
- Strokes loupe + burger (`I8472:2961;…`, `I8472:2965;…`) : `#ffffff` en dur → variable **`text/primary`**.
- Fond : un fond `bg/default` a d'abord été posé, **puis retiré** — poser un fond opaque sur un header
  jusque-là transparent est un parti pris (voir S10). Seule la correction de couleur est conservée.

**Lot 2 — nav desktop → nav mobile (défaut S2)**
- `swapComponent` de `Nav / Header · Ton=Clair` vers `Nav / Header — Mobile` sur **39 frames**
  (3 + 18 + 18), instances conservées, aucune détachée, `layoutSizingHorizontal = FILL`.
- 2 instances supplémentaires trouvées **imbriquées dans les héros** (non détectées au premier passage
  car pas enfants directs) : `8848:9681` (À propos) et `8850:136232` (LP Bordeaux), variante
  `Ton=Sur-image` → basculées elles aussi.
- Calque masqué résiduel `8469:33062` « Nav / Header (desktop — masqué) » : **supprimé**.

**Lot 3 — footer (défauts S5 et S6)**
- `swapComponent` de `Footer` desktop vers `Footer — Mobile` sur **5 frames** :
  `8826:134088`, `8829:5471`, `8850:151082`, `8850:151214`, `8850:151346`.
- Master `Footer — Mobile` `8843:127257` : `paddingLeft` / `paddingRight` **15 → variable `measure/24`**,
  aligné sur la gouttière de page.
- **Régression provoquée puis corrigée** (voir D4) : le passage à 24 a fait dépiler la grille 2×2 des
  liens (colonnes fixes à 172, hauteur du footer 732 → 1214). Colonnes recalculées à **163**
  (`(342 − 16) / 2`) — footer revenu à 732, grille 2×2 rétablie.

**Lot 4 — paddings du header (défaut S7)**
- Master `8472:2950` : les 4 paddings étaient des valeurs brutes (24/24/14/14).
  Liés aux variables **`measure/24`** (latéral) et **`measure/12`** (vertical, 14 → 12, remis sur l'échelle).

**Lot 5 — variante `Ton=Sur-image` du header mobile (défaut S10)**
- `8472:2950` cloné et recoloré sur la variable `white`, puis `combineAsVariants` :
  set **`Nav / Header — Mobile` `8883:34`** avec `Ton=Clair` et `Ton=Sur-image`, description renseignée.
- Appliquée **uniquement à `8848:9681`** (À propos), dont le héros est noir — le logo noir y était
  invisible, c'était une régression introduite par le lot 1 sur cette frame précise.
- Homepage et LP Bordeaux **restent en `Ton=Clair`** : leurs héros sont clairs, un logo blanc y
  serait invisible. Répartition finale : 46 `Ton=Clair`, 1 `Ton=Sur-image`.

**Lot 6 — `Navigation / Breadcrumbs — Mobile` (défaut S3)**
- Nouveau composant **`8883:147219`** cloné du master desktop `6932:380` : largeur 390,
  paddings liés à `measure/24` (latéral) et `measure/12` (vertical).
- **34 instances** basculées. Bascule testée sur une instance d'abord :
  **aucun libellé perdu** sur les 34 (vérifié texte à texte avant/après).

**Lot 7 — `Banner Section` de Produit — Kit (défaut S11)**
- Grille desktop `GRID` → `VERTICAL`, colonne de texte et textes passés en **fill** (136 → 326 px).
- Section en hug : hauteur **720 → 272 px** (fini les 448 px de vide).
- Image de fond redimensionnée pour couvrir la section, `scaleMode = FILL` (ratio conservé, recadrage
  plutôt que déformation).
- Voile `8884:147451` ajouté sur le pattern maison `Voile sombre`, fill lié à la variable **`ink`**.
  Écart assumé : **50 %** d'opacité au lieu des 30 % du pattern existant — à 30 % le texte blanc
  restait illisible sur cette image claire.

## PASSE C — VÉRIFICATION

Relecture à neuf de Figma après corrections (`use_figma` en lecture + `get_screenshot`), pas de mémoire de la passe B.

| Défaut | Verdict | Preuve |
|---|---|---|
| S1 — header mobile invisible | **CORRIGÉ** | Screenshot du master : logo Kapam noir, loupe et burger visibles. Avant : PNG 390×56 entièrement blanc (335 octets). |
| S2 — nav desktop sur les frames mobile | **CORRIGÉ** | Re-lecture des 53 frames : **0** instance de `Nav / Header` desktop restante, 47 frames portent `Nav / Header — Mobile`. Screenshot `8844:9022` avant/après : logo et burger réapparus. |
| S5 — footer desktop | **CORRIGÉ** | **0** instance de `Footer` desktop restante ; 42 frames portent `Footer — Mobile`. |
| S6 — gouttière du footer | **CORRIGÉ** | `paddingLeft/Right` = 24, liés à `measure/24`. Screenshot `8829:5606` : colonnes alignées sur la gouttière de page. |
| S7 — paddings header hors échelle | **CORRIGÉ** | Master : 4 paddings liés à des variables, vertical 14 → 12. |
| D4 — grille footer dépilée | **RÉGRESSION corrigée dans la même passe** | Footer 1214 → **732**, grille 2×2 rétablie (screenshot). |
| Calque masqué Homepage | **CORRIGÉ** | `8469:33062` absent à la relecture. |
| S3 — breadcrumbs desktop | **CORRIGÉ** | Composant mobile créé, 34 instances basculées, 0 libellé perdu, padding 96 → 24. |
| S4 — sections détachées | **FAUX POSITIF** | Relecture : les 4 frames portent bien une instance `Footer — Mobile`. Rien à corriger. |
| S10 — pas de variante `Sur-image` | **CORRIGÉ** | Variant set `8883:34` créé, appliqué à la seule frame à héros sombre. Screenshot : logo blanc lisible sur le héros noir de À propos. |
| S11 — Banner Section blanche | **CORRIGÉ** | Screenshot : bandeau lisible, 720 → 272 px. |
| S9 — mode Mobile vide | **CORRIGÉ** | Échelle validée et écrite ; 53/53 frames déclarent le mode Mobile ; 135 gouttières de section reliées à `measure/16`. |
| Familles C (tokens, typo, cibles tactiles, espacements, rayons, nommage) | **NON TRAITÉ** | Volume : ~450 textes sans style, ~500 fills en dur, ~700 espacements hors échelle sur 53 frames. À planifier après arbitrage S9 — l'échelle typo mobile conditionne le travail de typo. |



---

## LOT 8 — Échelle mobile (défaut S9, arbitrage validé)

**Typographie** — mode Mobile de `2. Primitives - Typography` renseigné.
Les 38 styles de texte étant tous liés aux `size/*`, le rescale se propage automatiquement.

| Variable | Desktop | Mobile |
|---|---|---|
| `size/72` · `size/64` · `size/56` | 72 · 64 · 56 | **40 · 36 · 32** |
| `size/48` · `size/40` | 48 · 40 | **30 · 28** |
| `size/36` · `size/30` · `size/24` | 36 · 30 · 24 | **24 · 22 · 20** |
| `size/20` → `size/12` | inchangés | inchangés |

**Espacement** — mode Mobile de `5. Tokens - Spacing` renseigné.

| Token | Desktop | Mobile |
|---|---|---|
| `section/gutter` | `measure/96` | **`measure/16`** |
| `section/gap/sm` · `md` · `lg` · `xl` | 64 · 80 · 112 · 128 | **32 · 40 · 48 · 64** |
| `component/*` | 0–24 | inchangés |

**Déploiement**
- Mode Mobile déclaré sur les **53 frames** (`setExplicitVariableModeForCollection`).
- Goutttière retenue : **16**, conformément à la collection `3. Responsive - Grid`
  (`mobile/Margin = 16`, `layout/padding/mobile = 16`). Les pages étaient à 24 en dur.
- **135 conteneurs de section** repassés de 24 à `measure/16`.
- Les 3 masters mobile (header ×2 variantes, breadcrumbs, footer) repassés de `measure/24`
  à `measure/16` — ce qui annule l'écriture du lot 3, faite avant l'arbitrage.
- Colonnes du footer recalculées : 163 → **171** (`(358 − 16) / 2`).
- `Banner Section` : padding 32 → `measure/16`.

**Réserve mesurée** : l'impact visuel du rescale typo est faible (404 : 1415 → 1407 px).
Normal — il n'agit que sur les textes portant un style DS, or **316 textes n'en ont aucun**.
Les gros titres fautifs (`Heading` 48 px, `Kit DIY` 40 px) sont des valeurs en dur : ils ne
bougeront qu'après application des styles, frame par frame.

---

## ÉTAT FINAL — ce qui reste (scan des 53 frames)

| Famille | Avant | Après | Statut |
|---|---|---|---|
| Padding desktop (≥ 48) sur mobile | ~80 | **0** | ✅ éliminé |
| Nav / footer / breadcrumbs desktop | 41 / 5 / 34 | **0 / 0 / 0** | ✅ éliminé |
| Couleur en dur | ~524 | 524 | ⬜ non traité |
| Texte sans style DS | 316 | 316 | ⬜ non traité |
| Espacement hors échelle | ~751 | 751 | ⬜ non traité |
| Rayon en dur | ~484 | 484 | ⬜ non traité |
| Cibles tactiles < 44 px | ~118 | 118 | ⬜ non traité |
| Nommage générique | ~397 | 397 | ⬜ non traité |
| Calques masqués | ~116 | 116 | ⬜ non traité |
| Position absolue résiduelle | ~95 | 95 | ⬜ non traité |
| Texte tronqué | 5 | 5 | ⬜ non traité |
| Espacement négatif | 6 | 6 | ⬜ non traité |

Ces familles sont du travail de fond, frame par frame, non tranchable au niveau du système :
elles supposent de choisir pour chaque nœud le style et le token justes. L'ordre le plus rentable
serait : styles de texte → couleurs → espacements → cibles tactiles → nommage, en commençant par
Guides, Blog, Actualités Catégorie, Page offre et Réalisations Index, qui concentrent l'essentiel.


---

## LOT 9 — Styles de texte sur les 5 pages les plus lourdes

**227 textes stylés**, 0 non mappé, 0 ignoré. Les 5 pages passent de 227 textes sans style à **0**.

| Frame | Avant | Après |
|---|---|---|
| `8849:9679` Guides | 60 sans style | 0 |
| `8849:131017` Blog (listing) | 59 | 0 |
| `8849:131319` Actualités / Catégorie | 44 | 0 |
| `8850:140342` Page offre | 36 | 0 |
| `8850:133165` Réalisations / Index | 28 | 0 |

**Mapping appliqué** — 8 combinaisons tombaient exactement sur un style du DS, les 9 autres ont été
normalisées sur l'échelle en préservant la hiérarchie (deux niveaux de titre distincts ne sont jamais
écrasés sur le même style) :

| Trouvé | Style | Rendu mobile |
|---|---|---|
| Geist Regular 12 / 13 / 14 | `text/xs/regular` · `text/sm/regular` ×2 | 12 / 14 / 14 |
| Geist Regular 15 / 16 / 18 | `text/md/regular` ×2 · `text/lg/regular` | 16 / 16 / 18 |
| Geist Mono 10 SemiBold / 11 / 12 Medium | `accent/sm` | 12 |
| Rethink Bold 16 / 18 / 20 | `display/2xl/bold` | 20 |
| Rethink Bold 26 | `display/3xl/bold` | 22 |
| Rethink Regular 32 / 40 / 48 | `display/4xl` · `5xl` · `6xl` /regular | 24 / 28 / 30 |
| Rethink Bold 64 | `display/8xl/bold` | 36 |

**Tailles résultantes** sur les 520 textes des 5 pages : 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 30 · 36.
Plus aucun 10, 11, 13, 15, 26, 32, 40, 48 ni 64 — l'échelle est propre.

**Défaut découvert au contrôle visuel et corrigé** — `8849:9732`, `8849:131067`, `8849:131336` :
les grilles de cartes étaient restées en **auto-layout horizontal desktop** (`WRAP`), avec 6 cartes
`Article` en largeur **fixe 376** dans une zone de 358. Chaque carte débordait de 18 px et son texte
était rogné à droite (« …avant de lancer le proje »). Conteneurs passés en `VERTICAL`, cartes en
**fill** (376 → 358), `primaryAxisSizingMode` remis en `AUTO`. Vérifié : **0 texte > 358 px** sur les
5 pages. Interligne de rang conservé (40 px).

Le même motif — conteneur horizontal dont les enfants débordent — existe sur **203 conteneurs** de la
page mobile, mais la grande majorité est du bruit d'icônes (dépassement de 2 px). Seuls ces 3 étaient
des grilles de cartes réellement rognées.


---

## LOT 10 — Passe de fidélité au desktop (53 paires)

Méthode : diff du contenu texte de chaque frame mobile contre son homologue desktop, normalisé
(espaces, casse). **Première tentative écartée** : `findAllWithCriteria` ne descend pas dans les
instances — sur Mentions légales elle ne voyait que 2 textes sur ~30. Refaite avec une traversée
manuelle complète, chrome exclu (header, footer, fil d'ariane, bandeau haut) puisqu'il diverge
légitimement entre desktop et mobile.

**49 frames sur 53 : fidélité parfaite** — 0 texte manquant, 0 texte ajouté. Cela couvre
notamment les 4 fiches Réalisation (105 à 113 textes chacune), les 6 écrans Configurateur
(jusqu'à 187 textes), LP Bordeaux (120), Produit — Kit (216).

### Les 4 écarts

| # | Sév | Frames | Constat | Action |
|---|-----|--------|---------|--------|
| F1 | **P0** | `8829:5471`, `8850:151082`, `8850:151214`, `8850:151346` (Catégorie v6 ①→④) | **15 à 20 textes desktop absents** : tout le panneau de filtres — « rechercher un produit », « votre véhicule », « tout effacer », « 4 kits sur 4 »… Le calque `Panneau / Filtres — Catégorie` est masqué, avec la note « mobile : passe dans le drawer *Filtres et tri* ». Le bouton « Filtres et tri » existe bien sur mobile — **mais le drawer, lui, n'existe nulle part dans le fichier**. Les filtres sont donc inaccessibles sur mobile. | ⚠️ **Arbitrage** — composant à créer. Non exécuté (règle 4). |
| F2 | **P1** | `8469:33059` (Homepage) | Section **« Explorez nos catégories »** (4 cartes : Kits aménagement, Accessoires, Pièces & électricité, Nouveautés) **absente de la Homepage desktop** — et absente de *toute* page desktop (vérifié sur Homepage, Boutique Index et Catégorie). Section inventée par la déclinaison mobile. | ⚠️ **Arbitrage** — la garder et la remonter au desktop, ou la retirer. Non exécuté (règle 4). |
| F3 | **P1** | `8469:33059` (Homepage) | Dans cette même section, **8 textes de gabarit non remplis et visibles** : `description` ×4 et `slot : boutique — carte catégorie · …` ×4 (`I8554:37247;7438:7867`, `I8554:37247;7438:7879`, et les 3 cartes suivantes). | À remplir ou à retirer avec la section (dépend de F2). |
| F4 | **P2** | `8469:33059` (Homepage) | Texte desktop « en savoir + » absent du mobile. | À rétablir. |
| F5 | **P2** | Catégorie v6 ①→④ | Label « réalisation client » ajouté sur la rupture éditoriale, absent du desktop. | Sans gravité — à confirmer. |

### Placeholders visibles restants sur la page mobile

`8469:33059` Homepage ×8 (voir F3) · `8850:11970` / `8850:12608` / `8850:13198` Formules ×1 chacune ·
`8843:8019` Mentions légales ×1 (note de template légitime, à garder jusqu'à rédaction juridique).


---

## LOT 11 — Drawer « Filtres et tri » (défaut F1)

**Composant créé : `8899:28569` — `Filtres et tri — Drawer — Mobile`**, dans la section
`🦴 Masters — Mobile`. 390 de large, hauteur en hug (885 px).

Structure, calquée sur le pattern drawer déjà en place dans le fichier
(`Kapam / Config v4 / Drawer — Résumé`) :
- `head` — titre « Filtres et tri » en `display/2xl/regular` + icône `x-close` (le même composant
  que les drawers existants). Paddings liés à `measure/16`.
- `body` — **une instance** du master `Panneau / Filtres — Catégorie`, en fill (358 px).

Le corps n'est pas une recopie : c'est l'instance du panneau desktop existant. Aucun contenu
n'a été écrit à la main, aucune instance détachée, et toute évolution du panneau se propagera
au drawer.

**Deux variantes**, calquées sur celles du panneau :

| Variante | Corps | Couvre |
|---|---|---|
| `État=Déployé` | `Panneau / Filtres — Catégorie · État=Déployé` | Catégorie ① et ④ (compteur « 4 kits sur 4 ») |
| `État=Filtres actifs` | `Panneau / Filtres — Catégorie · État=Filtres actifs` | Catégorie ② et ③ (« 2 kits sur 4 », Renault / Trafic / L1H1) |

**Vérification** — recomptage des textes desktop absents du mobile, drawer inclus :

| Frame | Manquants avant | Restants |
|---|---|---|
| Catégorie ① | 16 | **0** |
| Catégorie ② | 15 | **0** |
| Catégorie ③ | 15 | **0** |
| Catégorie ④ | 20 | **4** |

Les 4 restants sur Catégorie ④ ne relèvent pas des filtres : « dans l'atelier »,
« découpé, poncé, contrôlé à saint-gervais », « voir l'atelier → », « suivant → ».
C'est une **section desktop distincte (bloc atelier + pagination) absente de cette seule frame**
→ à arbitrer, non exécuté.

**Non traité** : le bouton déclencheur `Bouton / Filtres et tri` fait **37 px** de haut
(< 44 px). Relève de la famille cibles tactiles, non demandée sur ce lot.

## LOT 12 — Styles de texte sur les 48 frames restantes

**648 textes stylés**, 1 seul ignoré. Combiné au lot 9 : **5440 textes stylés sur 5441**.

| | Avant | Après |
|---|---|---|
| Textes sans style (53 frames) | 649 | **1** |
| Familles de polices | Geist, Geist Mono, Rethink Sans, **DM Sans** | Geist, Geist Mono, Rethink Sans |
| Tailles | 10 → 64, hors échelle | 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 30 · 32 · 36 |

Le seul restant est `8850:149591` (« Personnalisation · incluse », Config 2.1) : nœud à **polices
mixtes** dans un même bloc — il faut trancher la graisse à la main.

**Trois points de vigilance sur le mapping**, à valider :
- **DM Sans** (7 textes, LP Bordeaux) : police absente du design system. Normalisée sur
  `text/lg/regular` (Geist 18) — cela **change la police** de ces textes.
- **Rethink Sans Medium** (81 textes) : le DS ne ships que Regular et Bold en display.
  Mappé sur `display/*/regular` — la graisse Medium est perdue.
- **Geist SemiBold** (18 textes) : idem, mappé sur `text/md/bold`.

**Défauts de rendu découverts au contrôle visuel et corrigés**
- `8848:12755` (Contact) : ligne « Réponse sous 48h · Devis gratuit · Sans engagement » en largeur
  **hug à 454 px** dans un conteneur de 358 qui clippe → texte coupé. Passée en fill + retour à la
  ligne, sur 2 lignes.
- `8848:11915` (À propos) et `8848:13088` (Revendeurs) : blocs de texte **collés aux bords de
  l'écran** (conteneur 390, padding 0). Gouttière `measure/16` posée.
- `8848:9690` (À propos) : conteneur « Preuve sociale » **plus large que son parent** (361 > 342),
  donc rogné. Passé en fill.

Vérifié après correction : plus aucun texte natif au-delà de 358 px sur les 53 frames.

**Signalé, non corrigé** — `8848:12764` (Contact) : le `Segmented control` « Type de projet »
(master `7008:5260`, 197 px, **sans variante mobile**) porte 4 segments totalisant **547 px** dans
358, en `NO_WRAP` → coupé en plein mot. Le passer en `WRAP` ou le convertir en groupe de chips
change le contrat du composant : arbitrage, pas bricolage d'instance (règle 2).
