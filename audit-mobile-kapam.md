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
| S4 | **P0** | `8850:133497`, `8850:134135`, `8850:134830`, `8850:135529` (`S12 — CTA + Footer`) · `8850:141990` (`Banner Section`) | Frames **détachées** (type FRAME, aucun master). Le footer des 4 fiches Réalisation n'est plus une instance. | ⚠️ **Arbitrage requis** — reconstruire sur `Footer — Mobile` implique de rejouer les overrides. Non corrigé. |
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
| S3 — breadcrumbs desktop | **NON CORRIGÉ** | 34 instances subsistent — composant mobile manquant, arbitrage requis. |
| S4 — sections détachées | **NON CORRIGÉ** | 4 frames Réalisation conservent `S12 — CTA + Footer` détaché, arbitrage requis. |
| S9 — mode Mobile vide | **NON CORRIGÉ** | Arbitrage requis. |
| S10 — pas de variante `Sur-image` mobile | **NON CORRIGÉ** | Arbitrage requis. |
| Familles C (tokens, typo, cibles tactiles, espacements, rayons, nommage) | **NON TRAITÉ** | Volume : ~450 textes sans style, ~500 fills en dur, ~700 espacements hors échelle sur 53 frames. À planifier après arbitrage S9 — l'échelle typo mobile conditionne le travail de typo. |

