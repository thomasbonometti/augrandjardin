# Audit Figma — « Bono. | Portfolio 2025 » → base Folio 2027

- Fichier source : `A8Cw64PpbBzUGmEJhSoG2M`
- Plan de site de référence : `hfsKTviInAQWk6WD68NL2a`, node `11301:1950`
- Date : 25/09/2026
- Phase : **1 — Audit (lecture seule, aucune écriture dans Figma)**

> Méthode : lecture via `get_metadata`, `get_screenshot`, `get_libraries` et scripts `use_figma` en lecture seule (aucune mutation).
> Le skill `figma-use` a été chargé avant chaque lot d'appels `use_figma`. Quand plusieurs appels partaient en parallèle dans un même message, un seul chargement les précédait.

---

## 0. Synthèse en 10 points

1. Le fichier compte **47 pages** (46 + « 🗑️ Archives »). **12 sont des séparateurs vides**, **2 pages de travail sont vides** (Wireframe, Design) et **« ⚙️ Components » est vide** : aucun composant n'y vit.
2. Tout le site vit sur **« ↳ Desktop Homepage » (1:7)** : **293 éléments de premier niveau** répartis sur ~150 000 px de large. Seuls 6 frames de page et une douzaine de composants forment le « site ». Le reste, ce sont des explorations, des assets clients et des visuels réseaux sociaux.
3. **Une rangée de référence cohérente existe déjà** (y = 648, x = 5 664 → 17 342) : Accueil, Projets, À propos, Expertises, FAQ, Mentions légales. Toutes partagent `nav` et `footer`. C'est elle qu'on garde.
4. **Composants locaux** : 16 sur Homepage, 21 sur Studio, 6 sur Studio Mobile, 1 sur Shooting, soit **44 hors contenus clients** (tu en comptais 35 : l'écart vient des composants cachés dans des frames, comme `CTA` dans FAQ ou `review-v2` dans À propos). Il faut y ajouter **~80 composants de contenu** dans les études de cas. **5 familles en doublon** (nav ×3, portrait ×3, Features Container ×2, Container pricing ×3, case-study ×2).
5. **Bibliothèques distantes** : 2 abonnées, **❖ Untitled UI Icons – PRO (v1.6)** et **Social Icons (Community)**. Les ~1 200 instances distantes de la Homepage viennent **aux deux tiers d'Untitled UI Icons** (asterisk, chevron, arrow, check…). Le dernier tiers vient d'une **bibliothèque client Hasamélis non abonnée** (`_button base`, `button`, `link`, `card/destination`, `card voyage VERSION ULTIME`, `theme voyage`, `Fixed-ratio 3:2`, `blog card`, `logo hasamelis`, `breadcrumbs`, `footer-extended`…). Ces instances sont toutes dans les assets Hasamélis (contenu).
6. **Hygiène des 6 pages de référence** (hors contenus clients) : ~227 calques « Frame N / Group N », ~23 frames multi-enfants sans auto-layout, ~128 fills en dur (dont ~82 `#ffffff` et 6 `#000000` qu'on peut binder), ~150 textes sans style.
7. **Polices** : le périmètre site est à 100 % en PP Neue Montreal. Rubik et Inter n'apparaissent **que dans les vignettes projets** (instances `thumbnail-pokaa`, `thumbnail/rue-89`), donc du contenu. Degular Display ne sert qu'à la cover et aux OG.
8. **Variables** : bonne base couleurs (primitives + sémantique Light/Dark) et typo, mais **aucune variable d'espacement, de rayon ni de breakpoint**. Aucun mode responsive. Toutes les couleurs sont en `ALL_SCOPES`. Des couleurs client Qonto traînent dans la collection sémantique.
9. **Aucune version mobile des pages Folio** : la page « ↳ Mobile » ne contient que l'étude de cas Hasamélis mobile.
10. Par rapport au plan de site, il manque **toutes les pages d'acquisition** (pages offre, article, liste ressources, page locale), plus Contact, Merci, 404, CGV et Confidentialité.

---

## 1. Cartographie des 47 pages

Légende : **SITE** = site Folio 2027 · **CS** = étude de cas · **HORS** = hors site · **OBS** = obsolète / vide · **SEP** = séparateur

| # | ID | Nom actuel | Classe | Rôle / contenu constaté |
|---|----|-----------|--------|-------------------------|
| 0 | 0:1 | 🏞️ Cover | SITE (méta) | Vignette du fichier (1920×1080, Degular Display) |
| 1 | 1:2 | `--` | SEP | vide |
| 2 | 1:3 | Wireframe | OBS | **vide** |
| 3 | 4579:7414 | `---` | SEP | vide |
| 4 | 4579:7415 | Design | OBS | **vide** (titre de section utilisé comme page) |
| 5 | 1:7 | ↳ Desktop Homepage | **SITE** | Toutes les pages du site + composants + ~250 éléments orphelins (voir §2) |
| 6 | 6471:7790 | ↳ CS Hasamélis ⏳ | CS | `case-study--hasamelis` (6471:8198) + assets 1080² |
| 7 | 6471:15681 | ↳ CS Qonto ⏳ | CS | `case-study--qonto` (6508:2627) + 106 éléments épars |
| 8 | 6508:3970 | ↳ CS Rocket Tower ⏳ | CS | 2 versions : 6508:3971 et 6532:27879, + 204 éléments épars |
| 9 | 6543:33653 | ↳ CS Pokaa ⏳ | CS | `case-study--pokaa` (6581:46438) + 109 éléments |
| 10 | 6684:63874 | ↳ CS Caats ⏳ | CS | `case-study--caats-menu` (6684:63875) + dashboard, 150 éléments |
| 11 | 6793:168751 | ↳ CS Rue89 ⏳ | CS | 2 versions : 6793:168756 et 6821:177571, + 237 éléments |
| 12 | 6793:171267 | ↳ CS Kiosk ⏳ | CS | `case-study--kiosk` (6926:291149), propre (PP Neue Montreal only) |
| 13 | 6793:172205 | ↳ CS Signore Giuseppe ⏳ | CS | `case-study--signore-giuseppe` (6793:172206) |
| 14 | 6793:174081 | `- - - En cours` | SEP | vide |
| 15 | 7216:111158 | ↳ Studio — Landing page | HORS (bono.studio en veille) | Landing Studio (7516:6450), Wireframe, section « Recherche » géante (7618:34238), 21 composants |
| 16 | 8204:3994 | ↳ Mobile (Studio) | HORS | Landing Studio mobile + 6 composants mobiles |
| 17 | 6793:174082 | `- - - A faire` | SEP | vide |
| 18 | 6793:173143 | ↳ CS Falmec | CS (à faire) | **copie brute du gabarit `case-study--rue89`** (6793:173144), non personnalisée |
| 19 | 8657:258741 | ↳ GUF | CS (à faire) | 1 frame + 3 photos HD, pas de gabarit |
| 20 | 6793:174083 | ↳ Est Repro | CS (à faire) | gabarit rue89 non personnalisé + **9 assets `archybald-0x`** (le nom de page ne colle pas au contenu) |
| 21 | 8659:259536 | ↳ BDOR | CS (à faire) | gabarit rue89 non personnalisé + 23 assets `bdor-*` |
| 22 | 8727:24751 | ↳ Schroll | CS (à faire) | **vide** |
| 23 | 6793:175021 | ↳ CS Le Courrier des Balkans | CS (à faire) | gabarit rue89 non personnalisé |
| 24 | 6831:199862 | ↳ CS Rue89 Impactomètre | CS (à faire) | gabarit rue89 non personnalisé |
| 25 | 6847:228789 | ↳ CS TwoFilms | CS (à faire) | gabarit rue89 non personnalisé + 3 assets |
| 26 | 4579:7413 | ↳ Mobile | CS | **uniquement** `case-study--hasamelis` mobile (6446:11518) + desktop (6446:10197) |
| 27 | 8607:8795 | SEO | HORS | 22 images OG Facebook/Twitter (générales + par étude de cas), composant `NOM` |
| 28 | 9006:5 | `---` | SEP | vide |
| 29 | 9006:4 | Malt | HORS | 7 vignettes `malt/*` 600×375 |
| 30 | 8189:11972 | `---` | SEP | vide |
| 31 | 8523:7295 | Shooting | HORS | vide (en-tête de groupe) |
| 32 | 8189:12642 | ↳ Brief | HORS | 99 planches `SG-moodboard-*` (police Degular) |
| 33 | 8523:9585 | ↳ Photos | HORS | photos Bartosch Salmanski + composant `portrait-shooting` |
| 34 | 8523:9584 | `---` | SEP | vide |
| 35 | 8503:18871 | visage | HORS | portrait + 2 favicons 32×32 |
| 36 | 8999:4 | `---` | SEP | vide |
| 37 | 8999:17 | 📩 Email signature | HORS | 20 variantes de signature (Helvetica) |
| 38 | 8616:39764 | `---` | SEP | vide |
| 39 | 8616:40434 | Showreel 2025 | HORS | Intro 1920×1080, écrans de fin |
| 40 | 2337:12756 | `--` | SEP | vide |
| 41 | 2337:12757 | Search | OBS | anciennes versions CS Hasamélis ×2, Qonto, Pokaa (doublons) |
| 42 | 1:4 | `--` | SEP | vide |
| 43 | 2301:1646 | UI KIT | SITE (bibliothèque) | Planche palette/typo (`Section` 2301:1722, `Pomegranate` 6304:9), aucun composant |
| 44 | 2301:1647 | `--` | SEP | vide |
| 45 | 1:5 | ⚙️ Components | SITE (bibliothèque) | **vide** |
| 46 | 1:6 | 🗑️ Archives | OBS | 3 explorations `a-propos` (7088:66853 / 66917 / 66948) + 6 fragments |

**Écarts avec le plan de site :**
- Slugs conservés (pokaa, qonto, caats-menu, rue89, hasamelis, rocket-tower, kiosk, signore-giuseppe) : les 8 existent en CS ⏳.
- À ajouter : **ladial** (aucune page), **archybald** (assets sur la page « Est Repro »), **leveragers** (aucune page).
- Pages CS présentes mais absentes du plan : Falmec, GUF, BDOR, Schroll, Courrier des Balkans, Rue89 Impactomètre, TwoFilms. **À trancher : V2 ou archive.**

---

## 2. Page « ↳ Desktop Homepage » (1:7)

### 2.1 Versions de référence retenues (rangée y = 648)

| Page du plan | Frame de référence | Taille | Sections (IDs) |
|---|---|---|---|
| Accueil `/` | **6320:494** `homepage` | 1440×8080 | nav 6398:210 · hero (hero-slider + 3 projets phares) 6320:514 · section projet 6320:521 · 6320:529 · 6320:534 · lien « Voir tous les projets » 6320:542 · « Sur-mesure / Free & impliqué / Reviews » 6320:690 · side projects 6331:1358 · footer 7805:22616 |
| Projets `/projets` | **7008:56666** `projets` | 1440×5248 | nav · hero + grille projets (GRID) 7008:56669 · `project-list` (composant) 8143:6645 · CTA 7137:93212 · footer |
| À propos `/a-propos` | **7077:56007** `a-propos` | 1440×5910 | nav · hero + méthode 7077:56010 · avis clients 7127:78976 · side projects + CTA 7127:78752 · footer |
| Expertises `/expertises` (hub) | **7098:69750** `expertises` | 1440×7836 | nav · hero 7098:69753 · showreel 7101:77726 · 3 expertises + citations + chiffres + CTA 7101:77730 · footer |
| FAQ `/faq` | **7137:93289** `FAQ` | 1440×6126 | nav · FAQ (13 instances `FAQ`) + composant `CTA` 7137:93292 · footer |
| Mentions légales | **7158:94546** | 1440×1278 | nav · contenu 7158:94549 · footer |

Éléments partagés à garder : `nav` 8854:19983 (instance de travail), `footer` 6368:4020 (composant).

### 2.2 Doublons identifiés

| Type | Référence retenue | Doublons à archiver | Remarque |
|---|---|---|---|
| Homepage | 6320:494 | **6307:63** (maquette v1 à placeholders orange, x −38 232) | |
| Expertises (4) | 7098:69750 | **7137:91886** (variante avec portraits), **7137:91034** (antérieure), **7026:57668** (squelette 900 px vide) | 7137:91886 a des témoignages avec photo qui manquent dans la référence : à trancher |
| À propos (2) | 7077:56007 | **7127:78563** | + 3 autres versions déjà dans Archives (7088:66853/66917/66948) |
| Heroes | ceux des pages de référence | **7137:92542** `hero` (section expertises isolée), **7132:85229** `hero`, **7132:85224** `headline`, **6326:1044**, **6322:755** `hero`, 7132:85228 / 85227 / 85634 / 85658 `headline` | explorations |
| project-list | composant 8143:6645 (dans Projets) | instance orpheline **8143:6646** (x −6 223) | |
| Reviews | `review-v2` (7127:79065) dans À propos + `reviews-V1` dans Accueil | **7158:95646** `reviews-V1` orphelin | |
| Footer | composant 6368:4020 | **6345:2822** `footer` (v1, frame) | |
| Nav | composant `nav` 7216:112189 | **6307:64** `nav` (v1), `nav-link` 6307:103 (composant v1, 6 instances toutes dans 6307:64), frames `nav-link` 6320:507 / 7098:70351 / 6320:509, `nav links` 8857:20002 | |

### 2.3 Éléments orphelins : regroupement proposé pour l'archivage

Environ 250 éléments. Je propose 5 lots, nommés selon leur provenance :

| Lot / section d'archive | Zone du canvas | Volume | Exemples d'IDs | Destination proposée |
|---|---|---|---|---|
| **A. `homepage — v1 & explorations 2024`** | x < −20 000 | ~95 | 6307:63, 6307:64, 6314:200 `card`, 6307:148, 6364:3086 (le hero-slider **utilisé** par la home : à conserver), 6326:*, 6331:*, 6336:*, 6338:*, 6342:*, 6344:*, 6348:*, 6351:*, 6355:*, 6358:*, 6368:4125-4140 (visuels), 6430:9509 / 6464:5858 (CS Hasamélis v1), 6446:*, 6456:*, 6461:*, 6967:2941xx, 7008:55657, 7101:78047, 7127:79978 / 80576, 7137:86509 | 🗑️ Archives |
| **B. `homepage — explorations expertises & a-propos`** | x > 75 000 | ~31 | 7127:78563, 7137:91886, 7137:91034, 7026:57668, 7137:92542, 7132:85224, 7137:92417/92392/92385, 7137:91859/91840, 7132:85638/85634/85654/85658/85625/85229/85228/85227/85731, 7137:91321, 7098:69754, 7098:69916, 7101:77735, 7101:70461/70462, 7127:79051, 7132:86494/86497, 7137:86767, 7137:91425 | 🗑️ Archives |
| **C. `assets hasamélis`** (contenu client) | x 44 000 → 70 000 | ~45 | 6409:2167 `Accueil`, 6409:5042 `Accueil` (composant, 0 instance), 6409:4310 `browser`, 6422:1900 / 6435:10068 `fiche destination`, 6424:5855, 6424:7915 / 9168, 6409:508 `hero-img` (composant, 5 instances dans les CS Hasamélis), 6409:9022, 6412:99xx, 6424:5444 `img` (0 instance), 6424:*, 6409:3xx, 6464:7xxx / 6470:7xxx (blocs CS) | **à trancher** : page CS Hasamélis (c'est du contenu) ou Archives |
| **D. `homepage — assets réseaux sociaux`** | dispersé | ~25 | 8141:629xx / 631xx `linkedin-0x`, 6331:1703 `linkedin-case-study-qonto-08`, 6338:2242, 8062:9563, 8607:6505/6506 `og-*` (doublons de la page SEO), 8413:7262, CleanShots 8403:7273 / 7279, 8859:20029 | 🗑️ Archives (ou page SEO pour les OG) |
| **E. `homepage — sources & assets site`** (à ranger, pas archiver) | x −8 000 → 5 600 et 17 000 → 22 000 | ~45 | vignettes projets 400×500 `8143:6573…6790` (koryo, falmec, wing, schroll…), illus `wing-illu-*` 8144:*, `thumbnail-rocket-tower` 7828:33805, `rue89` 8865:51073, side projects `kraft` / `fof-figma` / `linkedin` 8614:3953x, photos à-propos `about-*` 7825:25664 / 7823:*, galerie 8724:*, `ligthbox video` 8736:25390 / 27687, logo Thomas Bonometti (vecteurs 8726:22188/22190 + lettres 8655/8656:*), 14 textes `headline` 8320:34818→34831 (noms de clients), sections **Cookie wireframe / Cookie design** 8586:16932/16933 | à garder sur la page Homepage, dans une section `assets` ; **Cookie** = futur bloc bibliothèque |

---

## 3. Composants

### 3.1 Où vivent-ils ?

La page « ⚙️ Components » (1:5) **ne contient rien**. Inventaire des composants hors contenus clients :

**Page Desktop Homepage (16)**

| ID | Nom | Type / variantes | Instances | Où est le maître | Statut |
|---|---|---|---|---|---|
| 7216:112189 | `nav` | SET `URL=Default/Out` | 38 | canvas | ✅ garder |
| 6368:4020 | `footer` | COMP | 37 | canvas | ✅ garder |
| 7158:93819 | `FAQ` | SET `open=true/false` | 86 | canvas | ✅ garder |
| 7158:96075 | `CTA` | COMP | 3 | **dans la page FAQ** (7137:93292) | ✅ garder, à sortir de la page |
| 7127:79065 | `review-v2` | COMP | 53 | **dans la page À propos** | ✅ garder, à sortir |
| 8143:6645 | `project-list` | COMP | 1 | **c'est une section de la page Projets** | ✅ garder, à sortir (remplacer par une instance) |
| 6461:20697 | `list item` | COMP | 344 | **dans un frame archivable** 6446:5017 | ✅ garder, à sortir en priorité |
| 6364:3086 | `hero-slider` | SET `Pour qui=` ×5 | 1 | canvas | ✅ garder |
| 7158:96257 | `portrait` | COMP | 4 | canvas | ⚠️ doublon |
| 7158:95850 | `portrait` | SET `portrait=1…6` | 1 | canvas | ⚠️ doublon |
| 6314:200 | `card` | COMP | 7 (home v1) | canvas | 🗑️ v1 |
| 6307:103 | `nav-link` | SET | 6 (nav v1) | canvas | 🗑️ v1 |
| 6307:148 | `headline selector` | SET | 1 (home v1) | canvas | 🗑️ v1 |
| 6409:508 | `hero-img` | COMP | 5 (CS Hasamélis) | canvas | contenu Hasamélis |
| 6424:5444 | `img` | COMP | 0 | canvas | contenu Hasamélis, inutilisé |
| 6409:5042 | `Accueil` | COMP | 0 | canvas | contenu Hasamélis, inutilisé |

**Page Studio — Landing page (21)** (hors site, mais réutilisables)

| ID | Nom | Instances | Remarque |
|---|---|---|---|
| 7542:16223 | `nav` SET `Mode=Light/dark` | 5 | ⚠️ doublon de `nav` 7216:112189 |
| 8923:5248 | `btn` SET (brand / fill / fill-user × Default/Hover) | 16 | **seul vrai bouton local** → `element/button` |
| 7559:2128 | `feature` SET `included=` | 255 | dans « Recherche » |
| 7517:15731 | `point` | 69 | dans « Recherche » |
| 7517:12841 | `case-study` | 21 | ⚠️ doublon de 7692:7274 (3 instances, dans « Recherche ») |
| 7517:15413 | `carrousel` | 4 | |
| 7308:114270 / 7308:114638 | `Features Container - formule 1/2` | 4 / 5 | ⚠️ doublons de 7559:1426 (1) / 7559:1495 (0) |
| 7308:113566 | `Container pricing` | **0** | ⚠️ famille pricing ×3 |
| 7308:115240 | `Container pricing v2` | 2 | ⚠️ |
| 7595:33725 | `Container pricing v2` SET | 2 | ⚠️ |
| 7595:34732 | `features-offer` | 1 | |
| 7158:97528 | `service` | 6 | dans Wireframe |
| 8938:14443 | `asset - 1` SET, 8938:14429 / 14799 / 14944 / 14970 `asset - 2…5` | 1 chacun | illustrations |

**Studio Mobile (6)** : `slide-content` 8209:12440, `feature-mobile/structure|project-management|design-dev` 8204:11421 / 11533 / 11631, `menu` 8209:13192, `nav-fixed` 8209:13390.
**Shooting › Photos (1)** : `portrait-shooting` 8523:6511 (SET, 2032×432, même gabarit que `portrait` 7158:95850 ⇒ ⚠️ doublon).
**Autres hors site** : `NOM` 8607:21590 (SEO), `signature mail` 8999:6349, `intro` 8616:40440 (Showreel).

**Composants de contenu (à ne pas tokeniser)** : ~80, dans les CS (`pokaa/*` ×11, `caats/*` ×18, rue89 ×16, kiosk ×11, signore-giuseppe ×6, rocket-tower ×7, `next-project` 6967:294009, `hasamelis/wireframe` 6684:58250, `thumbnail*`…).

### 3.2 Doublons à fusionner

| Famille | Membres | Proposition |
|---|---|---|
| nav | 7216:112189 (site) · 7542:16223 (Studio light/dark) · 8209:13390 `nav-fixed` + 8209:13192 `menu` (mobile) | garder 7216:112189 comme `section/nav`. Fusion en variantes `theme=light/dark` : **à trancher** (le Studio a une DA différente) |
| portrait | 7158:96257 · 7158:95850 (SET ×6) · 8523:6511 `portrait-shooting` | mêmes dimensions 2032×432 pour les 2 SET ⇒ fusion évidente des 2 SET ; 7158:96257 (1328×1387) est une autre mise en page, à lister |
| Features Container | 7308:114270 ≡ 7559:1426 ; 7308:114638 ≡ 7559:1495 | garder 7308:* (plus d'instances), archiver 7559:* après bascule des instances |
| Container pricing | 7308:113566 (0) · 7308:115240 · 7595:33725 SET | garder le SET 7595:33725, archiver les deux autres. **À trancher** (hors site) |
| case-study | 7517:12841 (21) · 7692:7274 (3) | garder 7517:12841 |

### 3.3 Bibliothèques distantes

- **❖ Untitled UI Icons – PRO (v1.6)** (abonnée) : l'essentiel des ~1 200 instances distantes de la Homepage (`link` 141, `asterisk-02` 98, `chevron-right` 69, `arrow-up-right` 58, `phone-call-01` 47, `arrow-narrow-right` 48, `check` 27, `x-close` 23, `calendar` 23…). Sur les pages de référence, seules 6 icônes servent : `arrow-up-right`, `arrow-down-right`, `check`, `x-close`, `calendar`, `message-dots-square` (+ `phone-call-01` / `users-01` dans les vignettes).
- **Social Icons (Community)** (abonnée) : `Social Icons` (20).
- **Bibliothèque client Hasamélis (non abonnée, instances « orphelines »)** : `_button base` 58, `button` 53, `_fixed-ratio spacer 2` 46, `card/destination` 40, `Fixed-ratio 3:2` 34, `theme voyage` 34, `card voyage VERSION ULTIME` 32, `input` 15, `blog card` 12, `logo hasamelis` 11, `breadcrumbs` 6, `card/thématique` 6, `review card` 6, `mobile-menu` 5, `footer-extended` 5… **Toutes dans les assets du lot C** : c'est du contenu, pas une dépendance du site.

---

## 4. Correspondance composants existants → bibliothèque Folio 2027

| Section cible | Existant réutilisable (ID) | Nom cible proposé | État |
|---|---|---|---|
| Nav | `nav` 7216:112189 | `section/nav` | ✅ composant |
| Footer | `footer` 6368:4020 | `section/footer` | ✅ composant |
| Hero | `hero-slider` 6364:3086 (Accueil) ; heroes texte des pages Projets / Expertises / À propos (frames) | `section/hero-home`, `section/hero-page` | ⚠️ seul le slider est un composant |
| Grille projets | frame GRID 7016:57101 (Projets) ; sections projet de l'Accueil 6320:521/529/534 | `section/project-grid` | ❌ frames, à componentiser |
| Carte projet | cartes dans 7016:57101 ; `thumbnail*` (CS) ; `case-study` 7517:12841 (Studio) | `block/project-card` | ❌ pas de composant côté site |
| Liste projets (tableau) | `project-list` 8143:6645 | `section/project-table` | ✅ composant (à sortir de la page) |
| Preuve sociale / avis | `review-v2` 7127:79065 ; `reviews-V1` 7158:95694 (Accueil) ; `review card` (Hasamélis, contenu) | `block/review`, `section/reviews` | ✅ bloc / ❌ section |
| Logos clients | aucun (les 14 textes `headline` 8320:348xx sont des noms de clients) | `section/logos` | ❌ **manquant** |
| Bloc méthode | À propos 7077:56038 « Mon travail commence toujours par… » + `list item` 6461:20697 ; Expertises 7101:77730 | `section/method`, `element/list-item` | ⚠️ frames + 1 composant |
| FAQ | `FAQ` 7158:93819 (open/closed) | `block/faq-item`, `section/faq` | ✅ bloc / ❌ section |
| CTA | `CTA` 7158:96075 ; `btn` 8923:5248 (Studio) | `section/cta`, `element/button` | ✅ |
| Encart étude de cas | `case-study` 7517:12841 (Studio) ; `next-project` 6967:294009 (CS Hasamélis) | `block/case-study-teaser`, `section/next-project` | ⚠️ hors périmètre site aujourd'hui |
| Avant / après | aucun | `section/before-after` | ❌ **manquant** |
| Résultats chiffrés | chiffres « +100 % / +30 % » en dur dans Expertises 7101:77730 et 7137:91886 | `block/stat`, `section/results` | ❌ frames |
| Citation | citations en dur dans Expertises ; `review-v2` | `block/quote` | ❌ frames |
| Portrait / signature | `portrait` 7158:96257 / 7158:95850 | `block/portrait` | ⚠️ doublons |
| Showreel / vidéo | 7101:77726 `img` (Expertises), `ligthbox video` 8736:25390 | `section/showreel`, `block/lightbox` | ❌ frames |
| Side projects | Accueil 6331:1358, À propos 7127:78797 | `section/side-projects` | ❌ frames |
| Bandeau cookies | Cookie wireframe / design 8586:16932/16933 | `block/cookie-banner` | ⚠️ sections de travail |

**Sections manquantes pour tenir le plan de site** (à concevoir) :
1. `section/logos` (bandeau logos clients) — Accueil
2. `section/before-after` — étude de cas
3. `section/results` + `block/stat` en composants — étude de cas, pages offre
4. `block/quote` en composant — étude de cas
5. `section/offer-hero` + `section/symptoms` (symptômes / problème) + `section/deliverables` (livrables) — pages offre `/expertises/*`
6. `section/related-cases` (études de cas liées) — pages offre et articles
7. `section/article-header` (auteur, date, temps de lecture) + `section/article-body` (rich text) + `block/toc` + `block/article-card` + `section/article-list` — ressources
8. `section/contact-form` (formulaire qualifiant : type, budget, échéance) + `element/input`, `element/select`, `element/radio` — contact
9. `section/thank-you` (prochaines étapes + 2 études de cas) — merci
10. `section/404`
11. `section/legal` (gabarit texte long réutilisable CGV / confidentialité / mentions)
12. `block/filter-bar` (filtres de la grille projets)
13. `block/breadcrumbs` (côté site ; aujourd'hui seulement en instance Hasamélis)
14. `section/local-proof` (page locale Strasbourg / Alsace, V2)
15. **Versions mobiles** (ou modes responsive) de toutes les sections ci-dessus : **aucune n'existe pour le site**

---

## 5. Hygiène — périmètre site uniquement

Périmètre mesuré : les 6 pages de référence (§2.1), plus `nav` et `footer`. Les calques à l'intérieur des instances sont exclus (non éditables), tout comme les vignettes clients (contenu).

| Frame | Nœuds | Textes | Textes sans style | Calques « Frame/Group N » | Frames multi-enfants sans AL | Fills en dur | Fills bindés |
|---|---|---|---|---|---|---|---|
| homepage 6320:494 | 443 | 136 | 30 | 64 | 8 | 49 | 112 |
| projets 7008:56666 | 385 | 132 | **88** | **75** | 9 | 51 | 106 |
| a-propos 7077:56007 | 265 | 75 | 9 | 25 | 1 | 1 | 31 |
| expertises 7098:69750 | 368 | 97 | 18 | 43 | 4 | 14 | 57 |
| FAQ 7137:93289 | 219 | 55 | 3 | 15 | 1 | 13 | 10 |
| Mentions légales 7158:94546 | 66 | 28 | 2 | 0 | 0 | 0 | 8 |
| nav (instance) | 17 | 7 | 1 | 0 | 0 | 0 | 7 |
| footer 6368:4020 | 34 | 14 | 0 | 5 | 0 | 0 | 14 |
| **Total** | **1 797** | **544** | **~151** | **~227** | **~23** | **~128** | **~345** |

Remarques :
- Une partie des textes sans style et des « Frame N » de l'Accueil et de Projets se trouve **dans les cartes projets** (captures clients). Ceux-là restent hors nettoyage. En phase 2, je filtrerai par nœud, pas par frame.
- **Fills en dur** (hors contenu) :
  - `#ffffff` ×82 → `Basics/white` (bindable ; attention, `Basics/transparent` a aussi #ffffff mais avec alpha 0)
  - `#000000` ×6 → `Basics/black`
  - `#cef6e9` ×3 → `qonto/green/green-light` : **contenu Qonto, ne pas binder**
  - `#1d1d1b` ×15, `#251822` ×6, `#d9d9d9` ×3, `#756608` ×13 (FAQ) → **aucune variable correspondante** (à lister, ne pas créer)
- **Polices hors système dans le périmètre site** : aucune. Rubik (19) et Inter (8) sur Accueil / Projets sont dans les instances `thumbnail-pokaa` / `thumbnail/rue-89` (contenu).
- Pages entières hors périmètre mais à signaler : Studio (1 295 calques génériques, 16 frames sans AL), Homepage entière (2 034 calques génériques, 150 frames sans AL, 1 202 textes sans style, 3 202 fills en dur), mais surtout dans les zones à archiver.

---

## 6. Variables et styles

### 6.1 Collections (5)

| Collection | Modes | Variables | Constat |
|---|---|---|---|
| **Colors** (primitives) | 1 | 47 : Basics (3), Pomegranate 50→950, Gray/Zinc 50→950, Gray/Cararra 50→950, Jade 50→950 | ✅ propre. ⚠️ toutes en `ALL_SCOPES` ; les primitives devraient être masquées (scopes vides) pour forcer l'usage du sémantique |
| **Color Mode** (sémantique) | Light / Dark | 23 : bg/* (5), text/* (6), border/* (4), **qonto/* (8)** | ⚠️ `qonto/*` = couleurs client dans la collection du site (à déplacer ou marquer « contenu ») ; ⚠️ `ALL_SCOPES` partout ; ⚠️ `bg/secondary` Dark = valeur brute et non alias ; ⚠️ `border/secondary` Dark → alias vers `bg/secondary` (sémantique → sémantique) ; ❌ pas de `bg/brand` foncé, `text/on-brand`, `border/strong`, états (hover / focus / error / success) |
| **Typography** | 1 (« Mode 1 ») | 54 : familles (display / body / accent = Degular Display), 8 graisses, tailles xxs→9xl, interlignages, espacements de paragraphe | ⚠️ **aucun mode responsive** (desktop / tablet / mobile) ; ⚠️ `Paragraph spacing/sm` a le scope `PARAGRAPH_INDENT` (erreur) ; ⚠️ `Line height/xxs = 10` pour 10 px (interligne 100 %, serré pour du texte) ; 2xl→9xl interligne = taille (100 %) |
| **Guides** | 1 | 17 : colonnes desktop 1→12 (78→1200), `Landing/container` 1374, tailles prototype | ⚠️ grille desktop seule ; ⚠️ `Landing/container` et `Prototype/*` en `ALL_SCOPES` |
| **Social** | 1 | 4 : tailles OG Facebook / Twitter | hors site (SEO) |

**Trous à combler (à ne pas créer sans ton accord)** :
- ❌ **Espacements** (gap / padding de section : 4, 8, 12, 16, 24, 32, 40, 64, 80, 120…) : aucune variable. Les pages utilisent 40 px de marge latérale (1440 − 1360) et des paddings verticaux en dur.
- ❌ **Rayons** : aucune variable.
- ❌ **Tailles responsive** : pas de modes ni de collection breakpoints (le plan Webflow en aura besoin : desktop / tablet / mobile landscape / mobile portrait).
- ❌ **Largeurs de conteneur** en variables sémantiques (1360 site vs 1200 grille vs 1374 landing : trois valeurs en concurrence).
- ❌ Ombres / effets : aucun style.

### 6.2 Styles

- **29 styles texte**, tous en PP Neue Montreal et tous bindés aux variables Typography :
  - `text/` xxs, xs (regular / bold), sm (regular / medium / bold / *regular stroked*), md / lg / xl (regular / medium / bold) → 17
  - `display/` 2xl (regular / bold), 3xl, 4xl, 5xl regular, 6xl / 7xl / 8xl (regular / bold), 9xl regular → 12
  - ⚠️ `display/6xl|7xl|8xl/bold` utilisent en réalité **Medium** ; 7xl et 8xl ont `fontStyle` **non bindé** (dérive possible)
  - ❌ pas de 3xl / 4xl / 5xl bold ni de 9xl bold ; pas de style italique alors que les variables de graisse italique existent ; aucun style pour Degular Display (accent)
  - ❌ pas de styles responsive (ex. `display/7xl` desktop → `display/4xl` mobile)
- **0 style couleur, 0 style d'effet**, 1 style de grille `desktop/12-col`.

---

## 7. Actions priorisées pour la phase 2 (volumes estimés)

Chaque lot = 1 à 3 appels `use_figma`, IDs retournés, screenshot de contrôle après chaque lot.

| # | Lot | Contenu | Volume | Risque visuel |
|---|---|---|---|---|
| **P1** | 2a — Structure des pages | Renommer les séparateurs en en-têtes de blocs (`— FOLIO 2027 · PAGES —`, `— ÉTUDES DE CAS —`, `— BIBLIOTHÈQUE —`, `— HORS SITE —`, `— ARCHIVES —`), réordonner les 47 pages, pousser les pages hors site en fin sous séparateur. Pages vides Wireframe / Design / Schroll : **déplacées dans le bloc Archives, pas supprimées** | 47 pages, ~2 appels | nul |
| **P2** | 2c-1 — Sortir les composants coincés dans des frames archivables | `list item` 6461:20697 (dans 6446:5017), sinon l'archivage de ce frame emporterait le maître | 1 composant, 1 appel | nul (déplacement du maître) |
| **P3** | 2b — Homepage : archivage | Créer 4 sections sur 🗑️ Archives (lots A, B, D + versions doublons), y déplacer ~150 éléments ; lot C (Hasamélis) selon ta décision ; lot E rangé dans une section `assets` sur la Homepage | ~250 éléments, 5-6 appels de ~40-50 éléments | nul (déplacement) |
| **P4** | 2b — Homepage : grille | Ranger les 6 pages de référence sur une rangée, gouttière 200 px, dans une section `Folio 2027 — Desktop` ; nav / footer / composants au-dessus | 6 frames, 1 appel | nul |
| **P5** | 2c-2 — Rapatrier les composants sur ⚙️ Components | 12 composants site (nav, footer, FAQ, CTA, review-v2, project-list, list item, hero-slider, portrait ×2, + v1 à archiver) + 8 Studio réutilisables (btn, feature, point, case-study, carrousel…). `CTA`, `review-v2`, `project-list` sont **posés dans les pages** : remplacer chaque maître par une instance à la même place avant de le déplacer | ~20 composants, 3 appels | faible (vérifier au screenshot) |
| **P6** | 2c-3 — Fusions évidentes | `portrait` SET ×2 → 1 SET ; Features Container 7559:* → 7308:* ; case-study 7692:7274 → 7517:12841. Le reste est listé | 3 fusions, 2 appels | moyen, vérification instance par instance |
| **P7** | 2d — Nommage composants | kebab-case préfixé : `section/nav`, `section/footer`, `section/cta`, `section/project-table`, `section/hero-slider`, `block/review`, `block/faq-item`, `block/portrait`, `element/list-item`, `element/button`… | ~25 renommages, 1 appel | nul (les instances suivent) |
| **P8** | 2d — Nommage calques du périmètre site | « Frame N / Group N » → rôle (`container`, `row`, `col`, `card`, `stats`, `quote`, `media`…), sections des pages → `section/hero`, `section/projects`… Hors captures clients | ~227 calques, 6 appels (1 par page) | nul |
| **P9** | 2e — Tokens couleurs | `#ffffff` → `Basics/white`, `#000000` → `Basics/black` sur le périmètre site ; les autres valeurs sont listées | ~88 bindings, 2 appels | nul si la valeur est identique |
| **P10** | 2e — Styles texte | Appliquer un style texte **uniquement si** famille, graisse, taille, interligne et interlettrage correspondent exactement ; sinon lister | ~151 textes candidats, estimation ~60-90 appliqués, 3 appels | nul si correspondance exacte |
| **P11** | 2f — Auto-layout | Convertir les ~23 frames sans AL quand les enfants sont alignés sur un axe avec un gap constant (tolérance 0 px) ; sinon lister | ~23 frames, estimation 10-15 convertis, 2-3 appels | **moyen**, screenshot avant / après systématique |

**Hors périmètre de la phase 2 (à ne pas toucher)** : contenus des CS (polices Noto Sans, Rubik, Source Serif 4, Inter, Lato, EB Garamond, PT Serif, Obviously, PolySans Qonto, Roboto Condensed, Space Grotesk), création de variables ou de styles, pages hors site (sauf déplacement).

---

## 8. À trancher par toi avant la phase 2

1. **Lot C, assets Hasamélis** (~45 éléments, x 44 000 → 70 000) : les déplacer sur la page « CS Hasamélis » (c'est du contenu), ou dans Archives ?
2. **Studio / bono.studio** : le plan dit « en veille ». On le classe en « Hors site », mais ses composants `btn`, `FAQ`, `feature`, `case-study` et `review-v2` servent aussi au site. Je les rapatrie sur ⚙️ Components ?
3. **Expertises** : la variante 7137:91886 a des témoignages avec portrait qui manquent dans la référence 7098:69750. On garde 7098:69750 comme référence et on archive la variante ?
4. **CS hors plan** (Falmec, GUF, BDOR, Schroll, Courrier des Balkans, Rue89 Impactomètre, TwoFilms) : les garder dans « Études de cas » avec un marqueur V2, ou les archiver ? Faut-il renommer « Est Repro » en « Archybald » (le contenu de la page est Archybald) ?
5. **Page SEO** (images OG) : tu la classes hors site, mais les OG seront utiles sur Webflow. « Hors site » ou « Folio 2027 — assets » ?
6. **nav Studio (light / dark) vs nav site** : on fusionne en variantes `theme=` ou on garde séparé ?
7. **Couleurs sans variable** (`#1d1d1b`, `#251822`, `#d9d9d9`, `#756608`) : je les liste seulement (conforme à la consigne). Confirme qu'on ne crée rien.

---

## 9. Journal phase 2 (25/09/2026)

### 9.0 Tes décisions (retour du §8)
1. Assets Hasamélis de la Homepage → page CS Hasamélis.
2. Composants Studio réutilisables → ⚙️ Components (sans toucher à la landing Studio).
3. Expertises : 7098:69750 reste la référence, la variante 7137:91886 part en archive.
4. CS hors plan (Falmec, GUF, Est Repro, BDOR, Schroll, Courrier des Balkans, Impactomètre, TwoFilms) : ignorées pour l'instant.
5. SEO : je recommande une page dédiée, rangée dans le bloc Folio 2027 (les OG serviront dans Webflow). Page renommée « ↳ SEO · images OG ».
6. Landing Studio (7216:111158) : ignorée (tu penses la supprimer).
7. Couleurs sans variable : je les liste, je ne crée rien.

### 9.1 ⚠️ Blocage technique : les polices du système ne sont pas accessibles au MCP Figma
> **Mise à jour (lot 3, §9.8)** : PP Neue Montreal est depuis devenue chargeable côté API. Tous les déplacements ont donc pu être faits. Seule **Degular / Degular Display** reste indisponible : 1 élément bloqué.
- `figma.loadFontAsync` renvoie **« The font family "PP Neue Montreal" does not exist »** (même chose pour Degular Display et Degular). Ces polices sont installées sur ton poste, mais pas côté serveur Figma, là où tourne l'API.
- Or l'API Plugin exige que toutes les polices d'un nœud soient chargées pour **déplacer ce nœud (appendChild / insertChild), y compris une page entière**, lui appliquer un style texte ou modifier un auto-layout qui fait recomposer du texte.
- **Opérations qui fonctionnent quand même** : renommer (pages, calques, composants), repositionner x/y sur le canvas, binder des variables de couleur, déplacer des pages ou des nœuds sans texte, créer des sections vides et des textes en Inter.
- **Opérations bloquées** : déplacer des pages contenant du texte, archiver sur une autre page, rapatrier des composants sur ⚙️ Components, appliquer des styles texte, convertir en auto-layout.
- Le premier essai de réordonnancement a échoué et Figma a annulé tout l'appel : **rien n'a été modifié ni perdu**.
- **Solutions possibles** : (a) faire les déplacements toi-même dans Figma desktop, où tu as les polices ; tout est préparé pour que chaque lot tienne en 1 sélection et 1 couper/coller (§9.4) ; (b) si ton plan Figma le permet (Organization ou Enterprise), publier PP Neue Montreal et Degular en « shared fonts » pour l'équipe. L'API pourrait alors peut-être les charger : à tester, sans garantie.

### 9.2 Lots appliqués

| Lot | Opération | IDs | Avant → après | Contrôle |
|---|---|---|---|---|
| **2a-1** | Renommage des séparateurs en en-têtes de blocs | 1:2, 4579:7414, 2337:12756, 1:4, 2301:1647, 9006:5, 8189:11972, 8616:39764, 6793:174082 | `--` / `---` → `— FOLIO 2027 · PAGES —`, `— ÉTUDES DE CAS —`, `— BIBLIOTHÈQUE —`, `— HORS SITE —`, `— ARCHIVES —`, `— HORS SITE · Studio (en veille) —`, `— FOLIO 2027 · ASSETS —`, `— OBSOLÈTE —`, `- - - A faire (études de cas)` | liste des pages relue |
| **2a-2** | Renommage de 2 pages | 4579:7413, 8607:8795 | `↳ Mobile` → `↳ CS Hasamélis — Mobile` ; `SEO ` → `↳ SEO · images OG` | idem |
| **2a-3** | Réordonnancement des pages (seules les 20 pages vides ou sans police custom ont été déplacées ; les 27 autres gardent leur ordre relatif) | 47 pages, aucune supprimée | voir l'ordre obtenu ci-dessous | `ok: true` (ordre obtenu = ordre cible) |
| **2e-1** | Binding `#ffffff` → `Basics/white` sur les overrides d'instances du site | 7158:95892 (portrait-shooting), 7158:95948 (portrait), 7158:95754, 7158:95826, 7158:95835, 7127:79057 (Social Icons dans les avis) | fill brut → variable | screenshot `reviews-V1` 7158:95694 identique |
| **2e-0** | ⚠️ Test annulé : 2 fills bindés par erreur dans des maquettes client, puis remis en valeur brute | 6342:2507 (card > img > mobile), 6348:2904 (card > img > … > Title) | brut → variable → **brut** (état initial) | vérifié `bound=[false]` |
| **2d-1** | Nommage des 6 pages de référence, de leurs sections et des composants du site | voir tableau §9.3 | ex. `homepage` → `page/home`, `hero` → `section/hero-home`, `FAQ` → `block/faq-item` | 33 renommages |
| **2d-2** | Calques « Frame N / Group N » → rôle (Accueil, Projets) | 118 calques (ex. 7137:86547 `Frame 815` → `row`, 7016:57585 `Frame 427318443` → `text-row`) | règles : `row` / `stack` / `grid` / `item` (icône + texte) / `text-row` / `text-block` / `media` (conteneur de visuel) / `wrapper` (sans AL) / `group` | screenshot page/home identique |
| **2d-3** | Idem (À propos, Expertises, FAQ, Mentions, footer) + colonnes du tableau projets | 77 calques + 7016:57577/57581/57642 → `col-year` / `col-client` / `col-type` | idem | screenshot page/expertises identique |
| **2b-1** | Réorganisation du canvas de la Homepage (positions uniquement, aucun reparentage) | 293 éléments de premier niveau | voir zones §9.4 | screenshot page/home identique ; comptage 6+6+66+2+11+13+42+31+116 = 293 |
| **2b-2** | 9 étiquettes de zone (Inter Bold 320) sur la Homepage | 9045:6088 → 9045:6096 (`label/*`) | nouveaux nœuds d'annotation, **à supprimer quand les zones seront vidées** | — |
| **2b-3** | Sections de destination vides | Archives : 9047:6408 (`homepage — v1 & explorations 2024`), 9047:6409 (`homepage — explorations expertises & a-propos`), 9047:6410 (`homepage — doublons & orphelins`), 9047:6411 (`homepage — visuels réseaux sociaux & captures`) · CS Hasamélis : 9047:16311 (`assets — ex-homepage`) · Components : 9047:16312 `section/`, 9047:16313 `block/`, 9047:16314 `element/` | — | IDs retournés |

**Ordre des pages obtenu :** Cover · — FOLIO 2027 · PAGES — · Desktop Homepage · — ÉTUDES DE CAS — · En cours · 8 CS ⏳ · — HORS SITE · Studio (en veille) — · Studio · Studio Mobile · A faire (études de cas) · Falmec · GUF · Est Repro · BDOR · Schroll · Courrier des Balkans · Impactomètre · TwoFilms · CS Hasamélis — Mobile · — FOLIO 2027 · ASSETS — · SEO · images OG · — HORS SITE — · Malt · --- · Shooting · Brief · Photos · visage · --- · Email signature · Showreel 2025 · — OBSOLÈTE — · Search · Wireframe · Design · — BIBLIOTHÈQUE — · UI KIT · ⚙️ Components · — ARCHIVES — · 🗑️ Archives.
**À glisser à la main (pages bloquées par les polices) pour obtenir l'ordre idéal :** « SEO · images OG » juste sous la Homepage ; « CS Hasamélis — Mobile » juste sous « CS Hasamélis » ; « Studio » et « Studio Mobile » (avec leur en-tête) sous « — HORS SITE — ».

### 9.3 Nommage appliqué (composants et sections)

| ID | Avant | Après |
|---|---|---|
| 6320:494 / 7008:56666 / 7077:56007 / 7098:69750 / 7137:93289 / 7158:94546 | homepage / projets / a-propos / expertises / FAQ / Mentions légales | page/home, page/projets, page/a-propos, page/expertises, page/faq, page/mentions-legales |
| 6320:514 · 6320:521, 6320:529, 6320:534 · 6320:542 · 6320:690 · 6331:1358 | hero · section ×3 · section · hero · section | section/hero-home · section/project-feature ×3 · section/projects-link · section/services-reviews · section/side-projects |
| 7008:56669 · 7137:93212 | hero · hero | section/project-grid · section/cta |
| 7077:56010 · 7127:78976 · 7127:78752 | hero ×3 | section/about-intro · section/reviews · section/side-projects |
| 7098:69753 · 7101:77726 · 7101:77730 | hero · img · hero | section/hero-page · section/showreel · section/expertises-list |
| 7137:93292 · 7158:94549 | hero · hero | section/faq · section/legal |
| 7216:112189 | nav (SET) | **section/nav** |
| 6368:4020 | footer | **section/footer** |
| 7158:96075 | CTA | **section/cta** |
| 8143:6645 | project-list | **section/project-table** |
| 6364:3086 | hero-slider (SET) | **section/hero-slider** |
| 7158:93819 | FAQ (SET open/closed) | **block/faq-item** |
| 7127:79065 | review-v2 | **block/review** |
| 7158:95850 | portrait (SET ×6 photos) | **block/portrait-photo** |
| 7158:96257 | portrait | **element/avatar-illustration** (c'est l'avatar dessiné, **pas un doublon** : correction de l'audit §3.2) |
| 6461:20697 | list item | **element/list-item** |

Studio non renommé (ignoré à ta demande). `btn` 8923:5248 deviendra `element/button` au moment du rapatriement.

### 9.4 Homepage : nouvelle organisation du canvas (historique : les déplacements ont été faits au §9.8)

Zones (coordonnées du coin haut-gauche) :

| Zone | Position | Contenu | Action manuelle (Figma desktop) |
|---|---|---|---|
| FOLIO 2027 — PAGES DE RÉFÉRENCE | 0, 0 | 6 pages, gouttière 200 px | ✅ rien à faire |
| COMPOSANTS SITE | 0, 9 000 | section/nav, section/footer, block/faq-item, section/hero-slider, block/portrait-photo, element/avatar-illustration | sélection → ⌘X → page ⚙️ Components → sélectionner la section `section/` (ou `block/` / `element/`) → ⌘V. Couper/coller un composant maître dans le même fichier **garde les instances liées**. |
| ASSETS SITE (lot E, 66 éléments) | 0, 13 500 | vignettes projets 400×500, photos à-propos, logo, galerie, lightbox, bannière cookies… | ✅ reste sur la Homepage (sources du site) |
| À COUPER → SEO | 38 856, 0 | og-facebook / og-twitter (8607:6505/6506) | ⌘X → page SEO → ⌘V |
| À ARCHIVER — doublons & orphelins (11) | 38 856, 2 675 | nav working copy 8854:19983, nav links, reviews-V1 orphelin, headlines, nav-link v1, instance project-list 8143:6646 | ⌘X → Archives → section 9047:6410 → ⌘V |
| À ARCHIVER — visuels réseaux sociaux (13) | 38 856, 6 902 | linkedin-0x, CleanShots… | → section 9047:6411 |
| À COUPER → CS Hasamélis (lot C, 42) | 52 856, 0 | Accueil, fiches destination, browser, hero-img (composant), blocs CS | → page CS Hasamélis, section 9047:16311 |
| À ARCHIVER — explorations expertises & à-propos (lot B, 31) | 87 674, 0 | dont 7137:91886, 7137:91034, 7026:57668, 7127:78563, 7137:92542 | → section 9047:6409 |
| À ARCHIVER — v1 & explorations 2024 (lot A, 116) | 111 522, 0 | homepage v1 6307:63, anciens composants v1 (card, nav-link, headline selector), CS Hasamélis v1… | → section 9047:6408 |

Les composants imbriqués dans des pages (`section/cta` dans FAQ, `block/review` dans À propos, `section/project-table` dans Projets, `element/list-item` dans un frame du lot A) doivent être **remplacés par une instance à leur place avant d'être déplacés**, sinon la page perd la section. Pour chacun : clic droit → « Create instance », placer l'instance à la place du maître, puis couper/coller le maître sur ⚙️ Components. `element/list-item` (344 instances) se trouve **dans le lot A** : sors-le avant d'archiver ce lot.
Après les déplacements, supprime les 9 étiquettes `label/*` (9045:6088 → 9045:6096).

### 9.5 Tokens et auto-layout : résultat réel sur le périmètre site
- **Fills en dur** : sur les ~128 comptés dans l'audit, **plus de 120 sont dans des maquettes clients** (`card > img`, `thumbnail`, `browser`, logos Qonto / Rocket Tower). Ils restent bruts, conformément à ta règle 4. Côté site, **6 overrides** ont été bindés (§9.2). Restent sans variable, listés sans rien créer :
  - `#756608` ×13 : vecteurs de l'illustration dans `section/cta` 7158:96075 (7158:93912 → 93925)
  - `#1d1d1b`, `#251822`, `#d9d9d9`, `#cef6e9` : uniquement dans des maquettes clients
- **Styles texte** : 83 textes du site n'ont pas de style, et **aucun ne correspond exactement à un style existant** (application de toute façon bloquée par les polices). Il manque ces combinaisons :
  - PP Neue Montreal Regular **36 / 48**, −2 % : ×70 (lignes du tableau projets, titres de section) ⇒ il manque un `display/4xl` avec interligne 48 (l'existant est 36/36)
  - Regular **32 / 44**, −2 % : ×6 (chiffres « +100 % » dans Expertises)
  - Regular **40 / 48**, −2 % : ×3 (titres « Sur-mesure », etc.)
  - Regular **24 / 32**, −2 % : ×3 (citations dans Expertises)
  - 1 texte à styles mixtes (7077:56014)
- **Auto-layout** : **0 frame multi-enfants sans auto-layout** dans le périmètre site une fois les maquettes clients exclues. Les 23 de l'audit étaient tous dans des visuels clients. Rien à convertir.

### 9.6 Ce qui reste à trancher par toi
1. ~~Couper/coller du §9.4~~ : **fait** (§9.8). Reste 1 élément bloqué par Degular : `linkedin-hero-v2-01` 6338:2242, à glisser à la main dans Archives › section `homepage — visuels réseaux sociaux & captures` (puis supprimer la note `note/a-archiver-degular` 9045:6096).
2. ~~Ordre des pages~~ : **fait**, ordre idéal obtenu (§9.8).
3. Créer ou non les 4 styles texte manquants (36/48, 32/44, 40/48, 24/32) et une variable pour `#756608` (illustration CTA).
4. Fusion `block/portrait-photo` 7158:95850 ↔ `portrait-shooting` 8523:6511 (page Photos, hors site) : même gabarit 2032×432. À fusionner une fois `portrait-shooting` rapatrié ou archivé.
5. Doublons Studio (Features Container ×2, Container pricing ×3, case-study ×2) : en attente de ta décision sur la landing.
6. Sections « Cookie wireframe / Cookie design » (assets) : à transformer en `block/cookie-banner` ?

### 9.7 Sections manquantes à concevoir pour Folio 2027
Reprises du §4 et confirmées par le nettoyage :
1. `section/logos` (bandeau logos clients) — Accueil
2. `section/before-after` — étude de cas
3. `section/results` + `block/stat` (les chiffres « +100 % » d'Expertises sont en dur, sans style)
4. `block/quote` (citations d'Expertises en dur, 24/32 sans style)
5. `section/offer-hero`, `section/symptoms`, `section/deliverables` — pages offre `/expertises/*`
6. `section/related-cases` — pages offre et articles
7. `section/article-header`, `section/article-body`, `block/toc`, `block/article-card`, `section/article-list` — ressources
8. `section/contact-form` + `element/input`, `element/select`, `element/radio` — contact
9. `section/thank-you` — merci
10. `section/404`
11. `section/legal` générique (CGV, confidentialité ; aujourd'hui seulement Mentions légales)
12. `block/filter-bar` — grille projets
13. `block/breadcrumbs`
14. `section/local-proof` — page locale (V2)
15. `element/button` côté site (seul `btn` existe, dans le Studio)
16. **Versions mobiles / modes responsive** de toutes les sections (aucune n'existe pour le site)

### 9.8 Lot 3 : déplacements réalisés par l'API (PP Neue Montreal chargeable)

| Lot | Opération | IDs | Résultat | Contrôle |
|---|---|---|---|---|
| 3-1 | 11 doublons et orphelins → Archives, section `homepage — doublons & orphelins` 9047:6410 | 7158:95057, 8854:19983, 8857:20002, 7158:95646, 7132:82017, 7132:85778, 7158:94774, 7137:92991, 6320:507, 7098:70351, 8143:6646 | rangés en grille | screenshot de la section |
| 3-2 | 13 visuels réseaux sociaux / captures → Archives, section 9047:6411 | 8141:62979/62986/63115/62987/62988/63107/63110/63113, 8062:9563, 8413:7262, 8403:7273/7279, 8859:20029 | grille | screenshot de la section |
| 3-3 | 2 OG → page « SEO · images OG » | 8607:6505, 8607:6506 | posés à droite des OG existants | — |
| 3-4 | Lot C, 42 assets Hasamélis → page CS Hasamélis, section `assets — ex-homepage` 9047:16311 | 6409:2167, 6409:5042, 6409:508 (composant hero-img), 6422:1900, 6435:10068, 6424:*, 6412:*, 6464:*, 6470:*… | disposition relative conservée | screenshot de la section |
| 3-5 | Lot B, 31 explorations Expertises / À propos → Archives, section 9047:6409 | dont 7137:91886, 7137:91034, 7026:57668, 7127:78563, 7137:92542 | disposition conservée | screenshot 7137:91886 intact |
| 3-6 | `element/list-item` 6461:20697 remplacé par l'instance **9052:105091** dans `list` 6461:20671, maître → Components › `element/` | — | 616×56 identiques, liste intacte | screenshot 6461:20671 |
| 3-7 | Lot A, 115 éléments (v1 et explorations 2024) → Archives, section 9047:6408 | homepage v1 6307:63, composants v1 (card, nav-link, headline selector), CS Hasamélis v1… | disposition conservée | screenshot 6307:63 intact |
| 3-8 | ⚠️ **6338:2242** `linkedin-hero-v2-01` **non déplacé** (Degular Display indisponible) | — | reste sur la Homepage avec une note | — |
| 3-9 | Composants maîtres → ⚙️ Components (sections `section/` 9047:16312, `block/` 9047:16313, `element/` 9047:16314) | section/nav 7216:112189, section/footer 6368:4020, section/hero-slider 6364:3086, section/cta 7158:96075, section/project-table 8143:6645, block/faq-item 7158:93819, block/portrait-photo 7158:95850, block/review 7127:79065, element/avatar-illustration 7158:96257, element/list-item 6461:20697 | 10 maîtres, instances liées conservées | — |
| 3-10 | Maîtres imbriqués remplacés sur place par une instance avant déplacement | section/cta → **9053:765** (dans section/faq) ; section/project-table → **9053:804** (dans page/projets) ; block/review → **9053:931** (dans À propos) | tailles identiques (sizeOk) | screenshots page/faq (6126 px), page/projets (5248 px), page/a-propos (5910 px) identiques |
| 3-11 | Homepage : 6 pages → section **9054:935** `Folio 2027 — pages desktop (référence)` ; 64 assets → section **9054:936** `Folio 2027 — assets site (sources)` ; sections Cookie wireframe / design laissées à côté | — | 8 étiquettes temporaires supprimées (9045:6088 → 6095, créées par moi) ; 1 note gardée (9045:6096) | screenshot 9054:935 |
| 3-12 | Réordonnancement des pages à l'ordre idéal (plus aucune page bloquée) ; séparateur 9006:5 → `- - - Studio (en veille)` | 47 pages | Cover · FOLIO PAGES · Homepage · FOLIO ASSETS · SEO · ÉTUDES DE CAS · En cours · Hasamélis · Hasamélis Mobile · 7 CS · À faire · 8 CS · BIBLIOTHÈQUE · UI KIT · Components · HORS SITE · Studio (en veille) · Studio · Studio Mobile · Malt · Shooting… · Showreel · OBSOLÈTE · Search · Wireframe · Design · ARCHIVES · Archives | `failedPages: []` |

**État final de la Homepage** : 2 sections (pages de référence, assets), 2 sections Cookie, 1 élément bloqué et sa note. On part de 293 éléments de premier niveau pour arriver à 6.
**Rien n'a été supprimé** hormis mes 8 étiquettes d'annotation temporaires.
