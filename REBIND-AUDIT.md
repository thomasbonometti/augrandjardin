# REBIND-AUDIT — « Bono. | Portfolio 2025 » (A8Cw64PpbBzUGmEJhSoG2M)

**Statut : Phase 1 terminée (lecture seule). Aucune écriture n'a été faite dans le fichier.**
Fichier de travail : l'original (pas de copie/branche communiquée). Les phases 2-3 écrivent : à décider avant le « go ».

## 0. Points saillants (à lire en premier)

1. **Peu de correspondances exactes en couleur.** Les seules valeurs en dur égales à un token sont `#ffffff`, `#350c04`, `#f63f1b` (+ quelques `#d4ccc2`). Tout le reste (`#4c101d`, `#251822`, `#101828`, `#000000`, `#fef1a3`…) est hors tokens, avec 5 à 125 d'écart. La Phase 3 couleurs sera donc petite si on s'en tient aux exactes.
2. **`jade/*` est utilisé** : `jade/50`, `/500`, `/950` sur les deux pages Studio (HORS SITE), 284 usages. La Phase 2c (déplacer vers `zz-deprecated/`) n'est donc pas applicable en l'état. Voir §6.
3. **`zz-deprecated/prototype/mobile-width` = 393 px, alors que `layout/frame/width` (Mobile) = 390 px.** Le rebinding changerait la largeur de 3 px. Il est exclu par la règle 4 sans ton accord. En plus, le nœud concerné est classé « contenu » par mes critères. Voir §6.
4. **Textes PP Neue Montreal : 27 trouvés, pas 23.** Home 17 ✓, Qonto 4 ✓, Hasamélis **6** (2 attendus). Voir §5.
5. **Qonto = 107 et Pokaa = 110 éléments de premier niveau** ✓ (plus de 100 chacune). Les nœuds sont dispersés sur ±40 000 px : l'encapsulation en sections implique de les déplacer. Voir §7.
6. **UI KIT est entièrement en dur en couleurs** (0 fill/stroke lié, palette Untitled UI `#101828`/`#475467`/`#e4e7ec`). Seul l'espacement y est partiellement lié.
7. Limite de l'audit : les **instances ne sont pas parcourues** (leurs valeurs viennent des composants). Les instances de bibliothèques distantes (icônes `check`, `arrow-*`, `x-close`…) sont comptées à part et ne sont pas du contenu client.
8. Faux positifs probables de ma détection « contenu » (à trancher) : Components `7127:79035` (texte nommé avec « capturer » = témoignage, pas un mockup) ; Home `8586:16932` « Cookie wireframe » (Inter) ; UI KIT `6304:9` « Pomegranate » (Inter).
9. `page.children.length` renvoie des valeurs fausses tant que la page n'est pas chargée (ex. Qonto 28 au lieu de 107). Tous les décomptes ci-dessous viennent de pages chargées.

**Critères de classement « contenu »** : nom ∈ {mock, screen, device, capture, screenshot, iphone, android, browser, phone, macbook, laptop, safari, chrome, ipad} ; OU ≥ 3 textes dont ≥ 80 % hors Geist / Bricolage / PP Neue ; OU instance de bibliothèque distante (comptée à part comme « icône/composant de bibliothèque »). Un nœud contenu exclut tout son sous-arbre.

---

## 1. Carte du contenu client (liste à valider)

### ↳ Desktop Homepage (4 900 nœuds ; 18 racines contenu ; 53 instances de bibliothèque distante)
| ID | Nom | Taille | Raison |
|---|---|---|---|
| 6338:2259 | browser | 1056×585 | nom (contient 5 textes PP Neue Montreal) |
| 8586:16932 | Cookie wireframe (SECTION) | 800×1237 | Inter 17/17 — **à confirmer** |
| 6320:529 | section/project-feature | 1440×812 | Rubik/Inter 27/31 |
| 7016:57221 | card | 437×642 | Rubik/Inter 27/29 |
| 7828:33805 | thumbnail-rocket-tower | 437×546 | Rubik/Inter 27/27 |
| 7016:57357, 7016:57339 | browser | 352×261 | nom |
| 8144:6800, 8144:7279 | browser (GROUP) | ~118×168 | nom |
| 7216:112145, 7216:112146 | mockup 13 1 / 13 2 | RECT | nom |
| 8865:51090 | rue89-mockup 1 | RECT | nom |
| 8144:6794, 8144:9632, 8479:6497, 8479:6498, 8403:7287, 8144:6795 | mockup-koryo / falmec / soco-cata / on-mag / MacBook_on_Armchair / schroll | RECT | nom |

Instances de bibliothèque (non rebindables, hors contenu client) : check ×13, x-close ×10, arrow-up-right ×9, phone-call-01 ×6, arrow-right ×5, arrow-down-right ×5, Social Icons ×3, calendar ×1, message-dots-square ×1.

### ↳ SEO · images OG (398 nœuds ; 10 racines)
8607:21569, 8607:21592 (mockup 13 2) ; browser : 8607:92909, 8607:92898, 8607:100893, 8607:100905, 8607:101100, 8607:101115, 8607:101282, 8607:101292.

### CS Hasamélis (20 117 nœuds, 17 racines — presque tout est contenu)
6471:8198 case-study--hasamelis (Noto Sans / Source Serif) · 8626:319684 et 8626:319693 (hasamelis-asset-mobile-03/04) · browser 8626:319677, 6608:46817, 6608:46797, 6608:46772 · 6543:44775 fiche depart / inspiration · wireframes 6684:50825, 7604:33552, 7834:33874, 7604:29843, 7834:34680 (Inter/Noto) · 7070:53792 Accueil · 7071:23977 Frame 439 · 7070:54443 fiche depart / prochain départ · 9047:16311 « assets — ex-homepage » (SECTION 27 618×26 070, contient 2 PP Neue).

### CS Hasamélis — Mobile (3 249 nœuds, 6 racines)
6446:10197 et 6446:11518 (case-study--hasamelis 1440 / 393), 6456:18206, 6446:14479 (container), 6446:11563, 6446:13323 (row).

### CS Qonto (2 940 nœuds, 11 racines)
6508:2663 container · 6508:3145 mockup-ipad-carnet 1 · screen mask 6508:2806, 6508:2811 · browser 6543:45984, 6497:3866, 6497:3875 · 6497:3936 Highlight-text/Right-1023 · 6490:4992 img · hero-img 6487:3921, 6479:2977. Instances de bibliothèque : 21 (illustrations Qonto `*_b&w`, arrow-*).

### CS Rocket Tower (10 128 nœuds, 19 racines)
browser 6529:13898, 6532:24319, 6532:24329, 6532:24339, 7887:18905, 7915:7989 · container 6508:4074, 6532:29729 · website 6532:24334 · 6532:27879 case-study--rocket-tower · img 6676:9390 · HOMEPAGE 6532:15078, 6532:17700 · COWORKING 6532:20278 · BUREAU 6532:20532 · FICHE 6532:20778 · 6532:24727 · section 6532:32027, 6532:32397.

### CS Pokaa (10 792 nœuds, 27 racines)
browser 6674:39661, 6684:45737, 8010:18955 · website 6894:15025, 6894:17733, 6894:17853, 6894:17973, 6898:18214 · « Pokaa - homepage taille M » 6898:18348, 6898:18378, 6898:18408, 6665:16677 (COMPONENT), 6674:13547 · pokaa/typeface 6674:39513 · pokaa/hero-img 6665:43160 · 6787:97907 · hero-img 6665:27110, 6665:40191 · Pokaa - article - sorties 6665:35322 (+ instance 6665:39054) · ui/elements 6674:14658 · homepage mobile 6674:15082 · card/horizontal/M 7184:100317 · 6836:200981 · mockup 13 1 / 13 2 : 6348:2969, 6967:294270 · responsive-pokaa 8630:320667. Note : polices illisibles (`?`) sur la plupart, police client « Obviously ».

### CS Caats (37 607 nœuds, 83 racines — liste complète)
- `caats/mobile-set` : 6756:66646, 6756:66643, 8648:74570, 8648:79490, 8171:33183
- `iphone-frame` ×32 : 9017:38145, 9017:42951, 9017:42940, 9017:38151, 9017:42954, 9017:42932, 6756:36105–36111, 8648:73616–73629, 8648:79410–79423
- MENU SELECTOR : 8171:55486, 7509:157526, 6756:66803, 6766:161162 · MENU : 6756:36935, 6756:38812 (KIT UNIQUE), 6756:64168 (OPTIM AVEC CTA)
- Écrans funnel / mobile : UPSELL 6756:37109, 6756:40813 ; funnnel 6756:37668, 6756:37834, 6756:37847, 6756:46878, 6756:46965, 6756:47043, 6756:47121, 6756:47240 ; checkout start 6756:47220 ; CTA ×7 (7513:24254, 7513:24272, 7513:24290, 7513:24308, 7507:125828, 7507:125856, 7507:125884) ; 7500:103527, 7500:113213 ; 6766:146899 ; 6766:152137 ; 6789:166344
- dashboard : caats/dashboard/mockup 6766:164542, 6766:164539, 8648:79397, 8648:79467 ; mockup 8115:24283 ; hero-img 6793:168381 ; component 6766:164531, 6766:165585, 6766:165644, 6766:165698 ; img 6728:26531
- browser : 6789:165790, 6766:164505, 6728:26617, 6766:162866, 8648:74595, 8648:79460, 8648:79390, 8648:79473 · video hero 6766:164486 · mockup-caats-v2 1 8115:30675

### CS Rue89 (25 176 nœuds, 43 racines — liste complète)
browser : 6793:168766, 6793:170601, 6821:176287, 6821:176301, 6821:177410, 6821:177468, 7370:149261, 6831:199782, 6821:177801, 6821:176057, 6841:202719, 6842:206882, 8066:68874/76/78/80 · hero 6793:169258 · mockup-recherche 6847:229733, 6847:229730 · cards 6842:204251, 6842:205205, 8624:261902 · Group 6842:205839, 6842:205652, 6842:204023, 6842:204504, 6842:204854, 6899:288989 · container 6821:176063 · SECTION « évolutions page d'accueil » 6831:182359 (Inter ×6 067) · card ×9 (6842:204287, 204289, 204328, 204330, 204291, 204285, 204250…) · ecran-1 6847:211580, 6847:211675 · 7293:41283 · Mobile Article 6870:240719 · comment-section 6870:280881, 6870:281577. Bibliothèque : arrow-* ×25, Manchette ×6, ui-design/toolbar ×4, etc.

### CS Kiosk (533 nœuds, 13 racines) — tous « browser »
6926:291272, 8652:216926, 8652:216878, 8648:181051, 8128:61915, 8115:61861, 8115:61833, 8115:61805, 8115:61672, 7657:24363, 8115:61754, 8115:61719, 8727:23685.

### CS Signore Giuseppe (361 nœuds, 7 racines) — tous « browser »
6937:293565, 6937:293590, 8128:62099, 8128:62080, 8128:62053, 6937:293655, 6937:293639.

### ⚙️ Components (355 nœuds) — 1 racine, probablement un faux positif
7127:79035 (texte de témoignage). Instances de bibliothèque : arrow-up-right, calendar, message-dots-square, minus, plus, Social Icons, Icon. Racines : sections `section/` 9047:16312, `block/` 9047:16313, `element/` 9047:16314.

### UI KIT (230 nœuds) — audit seul
6304:9 « Pomegranate » (Inter ×22) — à confirmer.

---

## 2. Fills et strokes en dur (hors contenu et hors instances)

Légende : « exact » = valeur résolue Light identique (RGB + alpha). Dans un rôle donné, plusieurs tokens peuvent partager la valeur ; je tranche par le rôle du nœud (ex. frame de page `#ffffff` → `bg/page`). « Vecteur » = fills de VECTOR/LINE/BOOLEAN (icônes, logos dessinés) : rôle ambigu, **je ne les proposerais pas au rebinding** sans ton accord.

Déjà liés (avant) : fills / strokes. Hors tokens : texte / frame / forme / vecteur / stroke.

| Page | Liés avant (fills / strokes) | Texte | Frame | Forme | Vecteur | Stroke |
|---|---|---|---|---|---|---|
| Home | 291 / 24 | 7 | 30 | 0 | 1 773 | 1 300 |
| SEO · OG | 127 / 146 | 0 | 29 | 0 | 10 | 4 |
| Hasamélis | 15 / 0 | 0 | 5 | 0 | 0 | 0 |
| Hasamélis Mobile | 10 / 0 | 0 | 0 | 0 | 0 | 0 |
| Qonto | 121 / 79 | 0 | 26 | 8 | 72 | 2 |
| Rocket Tower | 507 / 1 | 0 | 128 | 0 | 245 | 7 |
| Pokaa | 63 / 1 (+18 styles) | 0 | 44 | 3 | 245 | 1 |
| Caats | 141 / 9 | 1 | 94 | 0 | 46 | 39 |
| Rue89 | 215 / 12 | 4 | 201 | 5 | 111 | 43 |
| Kiosk | 71 / 1 | 1 | 33 | 0 | 26 | 6 |
| Signore Giuseppe | 65 / 1 | 1 | 30 | 0 | 0 | 8 |
| ⚙️ Components | 130 / 10 | 0 | 9 | 0 | 25 | 66 |
| UI KIT (audit) | 0 / 0 | 114 | 9 | 0 | 0 | 14 |

### 2a. Correspondances exactes
| Valeur | Rôle | Token proposé | Où |
|---|---|---|---|
| `#ffffff` | fill de frame | `bg/page` (autres tokens de même valeur : `input/bg/default`, `nav/bg/default`, `btn/invert/bg/hover` → non retenus sauf nœud nav / champ) | Home 15, SEO 9, Qonto 3, Pokaa 28, Caats 59, Rue89 177, Kiosk 18, SG 22, Components 6, UI KIT 9 |
| `#ffffff` | vecteur | `bg/page` ou `text/on-brand` — **ambigu** | Home 15, Rocket 8 |
| `#350c04` | vecteur | `text/primary` (icône) ou `bg/invert` — **ambigu** | Rocket Tower 75 |
| `#f63f1b` | vecteur | `bg/brand` / `border/brand-strong` / `border/focus` — **ambigu** | Rocket Tower 46 |
| `#d5c8fb #cef6e9 #b0f0da #9b81f6 #ffeadd #ffd6bc #f4f8ac #f1f78e` | forme (pastilles) | **variables `Projects/qonto/*`** (exactes, hors collection tokens) | Qonto 8 (Ellipse 1–8, 6487:3610–3624) ; aussi `#cef6e9` frame ×8 / `#ffd6bc` frame ×1 |
| `#d4ccc2` | fill de frame | aucun token bg exact (valeur = `neutral/300`, `border/strong`, `text/on-invert-secondary`…). **Token manquant** (§9) | Home 3, Caats 1, Rue89 1, Components 3 |

### 2b. Sans token exact (token le plus proche / écart max. canal+alpha, échelle 0-255)
| Valeur | Occurrences (pages) | Plus proche | Écart |
|---|---|---|---|
| `#000000` texte | Home 7, Caats 1, Rue89 4, Kiosk 1, SG 1 | `text/primary` #350c04 | 53 |
| `#4c101d` frame | Hasamélis 4, Qonto 5, Caats 11, Rue89 8, Kiosk 10, SG 7, Rocket 16 (`#4f0a0d`) | `bg/invert` #350c04 | 25-26 |
| `#251822` frame | Home 4, Kiosk 2, SG 1 | `bg/invert` | 30 |
| `#331215` / `#2a2520` / `#1d1d1b` frame | Home 1, Hasamélis 1, Qonto 5 | `bg/invert` | 17-28 |
| `#cef6e9` frame | Home 4, Qonto 8 | `btn/primary/bg/disabled` | 24 |
| `#fef1a3` / `#ffcfcf` / `#b0ffcb` frame | Qonto, Rocket, Pokaa, Caats, Rue89, Kiosk (≈ 1-3 chacune) | `bg/brand-muted` / `bg/brand-subtle` / disabled | 20-54 |
| `#edece6` frame | SEO 4, Pokaa 4, Kiosk 1 | `bg/sunken` #f3f0ec | 6 |
| `#e5effd` frame | Home 1 | `feedback/info/bg` | 5 |
| `#fdf0c4` frame | SEO 8, Caats 4, Home | `btn/invert/bg/default` | 14 |
| Couleurs de marque projet (`#ff5213`, `#ffd130`, `#ccf547`, `#025940`, `#ffb6d1`, `#fcf5ed`…) | Rocket Tower 128 frames | `bg/brand` etc. | 8-123 |
| `#101828` stroke | Home 1 266 (vecteurs d'illustration) | `btn/secondary/border/default` | 37 |
| `#000000` stroke | Home 15, Caats 38, Rue89 42, Components 59, Kiosk 6, SG 8 | idem | 53 |
| `#000000` alpha 0.1 stroke | Home 3, Rocket 3, Components 3… | `border/subtle` #350c04/0.15 | 66 |
| `#101828` / `#475467` / `#e4e7ec` (UI KIT) | 78 / 36 / 14 | `text/primary` / `text/secondary` / `border/default` | 37 / 34 / 18 |
| `#8a38f5`, `#9747ff` stroke | Components 4 | — | décor Figma des component sets, à ignorer |

**Conclusion §2** : sans nouveaux tokens ni accord sur des écarts, la Phase 3 couleurs ne rebindera que les `#ffffff` de frames (≈ 360) et quelques exacts ponctuels. Aucune valeur « proche » n'est appliquée.

---

## 3. Espacements, rayons, épaisseurs de trait en dur

Aucun gap/padding/rayon/épaisseur n'est lié aujourd'hui (hors UI KIT : 42 gaps, 18 paddings, 8 rayons liés). Mode des collections : Desktop (les nœuds n'ont pas de mode explicite ; `Hasamélis Mobile` non plus). Les valeurs ci-dessous sont comparées au mode **Desktop**. Niveau : S = nœud ≥ 1000 px ou enfant direct de page/section → `section/*`, C = `component/*`.

### Table de correspondance (Desktop)
| Valeur | gap | padding | rayon | trait |
|---|---|---|---|---|
| 0 | `component/gap/none` (C), `section/gap/none` (S) | `component/padding/none` | — | `border/width/none` |
| 1 | — | — | — | `border/width/default` |
| 2 | — | — | — | `border/width/strong` ou `/focus` (ambigu) |
| 4 | `component/gap/xs` | — | **hors échelle** | — |
| 6 | — | — | `radius/control` (+ `component/button|input|checkbox/radius`) | — |
| 8 | `component/gap/sm` | `component/padding/xs` | `radius/surface` (+ `component/card/radius`) | — |
| 12 | hors échelle en Desktop (= `gap/md` Tablet/Mobile) | `component/padding/sm` | `radius/surface-lg` (+ `component/modal/radius`) | — |
| 16 | `component/gap/md` | `component/padding/md` | `radius/media` (+ `component/image/radius`) | — |
| 24 | `component/gap/lg` ; `section/gap/*` n'a pas 24 en Desktop | `component/padding/lg` | — | — |
| 32 | `component/gap/xl` (C) / `section/gap/sm` (S) | `component/padding/xl` | — | — |
| 48 | `section/gap/md` | `section/padding/sm` | — | — |
| 64 | `section/gap/lg` | — (hors échelle) | — | — |
| 96 | `section/gap/xl` (Desktop) | `section/padding/md` | — | — |
| 128 | hors échelle en Desktop (= `section/gap/xl` Desktop XL) | `section/padding/lg` | — | — |
| 40 | — | `layout/margin` (3. Responsive - Layout, Desktop = 40) — pas dans Tokens - Spacing | — | — |
| 9999 | — | — | `radius/pill` | — |

À noter : un même nombre renvoie plusieurs tokens (8, 16, 24, 32…). Je tranche par la propriété (gap ≠ padding) puis par le niveau (C/S). Sur un rayon, `radius/surface` vs `component/card/radius` est ambigu : je ne rebindrai que sur rôle clair (card nommée « card »).

### Valeurs dominantes par page (nombre d'occurrences)
| Page | Gaps (exact) | Paddings (exact) | Rayons | Traits |
|---|---|---|---|---|
| Home | C8 ×86, C16 ×48, C32 ×43, C4 ×33, S8 ×15, S96 ×12, S24 ×12, S128 ×11, S64 ×11, C64 ×13 | 0 ×1 153 ; **S40 ×70** (layout/margin) ; C4 ×64, C24 ×26, S24 ×20, C64 ×15, C8 ×14, S96 ×13, S128 ×9 | 4 ×31 (hors échelle), 8 ×22, 16 ×12, 2 ×3, 40 ×2, 144, 85.33 | 0.67 ×1 101, 2.02 ×74, 0.34 ×44, 1.01 ×31, 1.34 ×28 (**vecteurs mis à l'échelle**, hors échelle), 0 ×23, 1 ×15, 2 ×4 |
| SEO · OG | S8 ×18, S0 ×18 | S96 ×54, S64 ×18, 0 ×96 ; 9.81 ×16 | 0.82/0.41/46.17/4.77 (échelle d'export) | 0.41 ×118, 0.82 ×28, 9.81 ×4 |
| Hasamélis | S13.85 ×1 | S13.85 ×4 | 8 ×3, 6.92 | — |
| Hasamélis Mobile | C8 ×5, S16 ×1, C4 ×1 | 0 ×28 | — | — |
| Qonto | C8 ×17, C16 ×8, S128 ×7, S64 ×6, C4 ×6, S24 ×6 | 0 ×235, S40 ×9, S96 ×5, C24 ×5 | 8 ×20, 4 ×7, 12 ×7, 1.38 ×12, 7.45 ×8, 10.54 ×7 | 0.69 ×59, 1.38 ×14, 1 ×4 |
| Rocket Tower | C8 ×96, 0 ×59, S128 ×9, C24 ×7, S64 ×6 | **C32 ×328**, 0 ×449, S32 ×84, S40 ×9, S64 ×7 | 8 ×15, 34.13 ×9 | 10.5 ×4, 1 ×3 |
| Pokaa | C8 ×15, S64 ×6, S24 ×5 | 0 ×236, S40 ×9, 24.72 ×16 | 8 ×14, 4.12 ×4, 34.13 ×3 | — |
| Caats | C8 ×54, C16 ×15, S64/S128 ×12, C32 ×9 | 0 ×528 ; nombreuses valeurs décimales (13.53 ×36, 14.67 ×24, 11.75 ×24…) | 8 ×53, 63.67 ×9, 55.3 ×8 | 13.53 ×9, 1 ×8, 11.75 ×8 |
| Rue89 | C8 ×62, S24 ×26, C16 ×26, S128 ×17, C4 ×20 | 0 ×755, 14.67 ×80, C128 ×26, S40 ×18 | 8 ×64, 69.03 ×20, 34.13 ×9 | 14.67 ×20, 1 ×9, 6.85 ×8 |
| Kiosk | C8 ×18, C16 ×9, S24 ×7, S64 ×6 | 0 ×279, 14.67 ×16, S40 ×9 | 8 ×15, 69.03 ×4 | 14.67 ×4, 28.73 ×2 |
| Signore Giuseppe | C8 ×7, S64 ×6, C4/S16/S24 | 0 ×135, 14.67 ×32, S40 ×9 | 8 ×19, 69.03 ×8 | 14.67 ×8 |
| ⚙️ Components | C8 ×79, C32 ×10, S8 ×11, C4 ×8 | C16 ×154, **C40 ×83**, 0 ×255, C4 ×20, C2 ×16 | 5 ×4, 2 ×3, 4 ×1 | 1 ×64, 0 ×12 |

**Hors échelle notables** : rayon 4 (Home ×31, Qonto ×7, Components) et rayon 2 / 5 ; padding `C16` mais aussi `C40` (Components ×83) et `S40` (marge de page → `layout/margin`) ; gap/padding à valeur décimale = frames redimensionnées (échelle d'export) ; gap `S128` / `C64` ; épaisseurs 0.67 / 14.67 etc. = traits mis à l'échelle (vecteurs, mockups).

**Valeurs négatives** (Home `C-56`, `C-32`, `C-58.6` ; Rocket/Qonto `C-10.67`) : gaps négatifs, jamais rebindables.

---

## 4. Textes sans style de texte (hors contenu)

| Page | Avec style | Sans style | Mixtes |
|---|---|---|---|
| Home | 204 | **18** | 1 |
| SEO · OG | 0 | 11 | 0 |
| Hasamélis / Mobile | 10 / 10 | 0 / 0 | 0 |
| Qonto | 41 | 1 | 0 |
| Rocket Tower | 485 | 0 | 0 |
| Pokaa | 45 | 8 | 0 |
| Caats | 73 | 1 | 0 |
| Rue89 | 127 | 8 | 0 |
| Kiosk | 31 | 3 | 0 |
| Signore Giuseppe | 28 | 0 | 0 |
| ⚙️ Components | 69 | **59** | 0 |
| UI KIT (audit) | 62 | 52 | 0 |

Signatures sans style et style proposé (aucune n'a de correspondance exacte sauf indiqué) :
| Signature (famille / graisse / taille / interligne / interlettrage*) | Pages (n) | Proposition | Statut |
|---|---|---|---|
| Bricolage 48pt Condensed Regular 36 / 54 / -2 | Components (58) | `display/4xl/regular` (36/42/-0.36) | **ambigu** : interligne 54 vs 42, interlettrage ≠ |
| Bricolage Regular 32 / 44 / -2 ; 40 / 48 / -2 | Home (6 ; 3) | `display/3xl` (30) ou `display/4xl` (36) ; `display/4xl` | **ambigu** (taille hors échelle) |
| Bricolage Medium 24 / 36 / -2 | Rue89 (6), Kiosk (3) | `display/2xl/regular` (24/30) — pas de variante medium | **ambigu** |
| Geist Bold 112.78 / 157.9 ; 118 / 165 ; 128 / 100 % ; Medium 28.8 / 130 % | SEO (9) | aucune (tailles d'export OG) | hors échelle |
| Geist Regular 45.9 / 64.3 | Caats (1) | aucune | hors échelle |
| Degular Display Black 94 ; Bold 28 / 47 ; Inter Bold 160 ; Obviously Narrow Bold 20.6–24.7 | Home 2, Qonto 1, Rue89, Pokaa 8 | **police client** → contenu, pas de style | exclu (contenu probable) |
| Geist Regular 16/24, 14/21, 12/18, 10/14, 20/30, 18/28, Medium/Bold… | UI KIT | exacts : `text/md|sm|xs|xxs|lg|xl/*` (16/24 = `text/md/regular` **ou** `prose/sm`) | UI KIT, à décider |

\* L'unité de l'interlettrage -2 n'est pas vérifiée (probablement -2 %, alors que les styles `display/*` sont en px, ex. -0.36 px pour 36). À contrôler avant toute application.

Aucun texte non ambigu en Home/Components/Rue89/Kiosk : **rien à appliquer sur les textes tant que tu ne tranches pas les styles manquants** (§9).

---

## 5. Textes PP Neue Montreal (27 trouvés)

Presque tous sont **dans des instances** (override sur le nœud texte `…;6461:20664` du composant). Le correctif propre est à faire sur le nœud maître, ou sur chaque instance. Je n'ai pas encore localisé le composant maître (`6461:20664`) : à faire en Phase 2.

### Home (17) — attendus 17 ✓
| ID | Texte | Style actuel | Police | Proposition |
|---|---|---|---|---|
| 6338:2249 | « Hero de page d'accueil » | style distant | 56 Bold | `display/6xl/medium` (60/66) — **ambigu** (taille) |
| 6338:2255 | « Thomas Bonometti » | style distant | 48 Bold | `display/5xl/regular` (48/54) — pas de bold, **ambigu** |
| 6338:2256 | « UI&UX Designer Senior Freelance » | aucun | 32 Regular | **ambigu** (`display/3xl` 30 ou `display/4xl` 36) |
| 6338:2261, 6338:2263, 6338:2265, 6338:2267, 6338:2269 | « 1 » … « 4 », « ? » | aucun | 31.63 Bold | **ambigu** |
| I7085:56168;6461:20664 | « Clarifier l'offre » | aucun | 20 Regular | `text/xl/regular` (exact taille+interligne) |
| I7085:56171;6461:20664 | « Donner confiance… » | aucun | 20 Regular | `text/xl/regular` |
| I7158:96044;6461:20664 | « Vous perdez des leads… » | aucun | 20 Bold | `text/xl/bold` |
| 8655:216955, 8656:216966, 8655:216956, 8656:216967, 8655:216957, 8655:216958 | t, b, T, B, Thomas Bonometti, thomasbonometti.fr | aucun | 20 Medium | `text/xl/medium` |

(5 de ces textes sont aussi comptés par ailleurs dans le frame « browser » 6338:2259, classé contenu ; en fait les 5 de `6338:2261…2269` / hero sont dans le frame LinkedIn `linkedin-hero-v2-01` 6338:2242.)

### CS Qonto (4) — attendus 4 ✓
| ID | Police | Proposition |
|---|---|---|
| I6508:2799;6461:20664 | 20 Bold | `text/xl/bold` |
| I6508:2800;6461:20664 | 20 Medium | `text/xl/medium` |
| I6508:2801;6461:20664 | 20 Bold | `text/xl/bold` |
| I6508:2802;6461:20664 | 20 Bold | `text/xl/bold` |

### CS Hasamélis (6) — attendus 2 ✗
| ID | Style actuel | Police | Proposition |
|---|---|---|---|
| I6464:7431;6461:20664, I6464:7432;6461:20664 (dans « assets — ex-homepage ») | `text/xl/regular` | Bold (mixte) | `text/xl/bold` — **ce sont probablement les 2 attendus** |
| I6471:8688…8691;6461:20664 (dans case-study--hasamelis) | `text/xl/regular` | graisse mixte | style déjà posé, mais des runs en PP Neue persistent : **à confirmer** |

Les 6 sont dans des racines classées contenu client (case-study--hasamelis, assets). Si tu confirmes que ces racines sont du contenu, il faut les exclure (règle 2) ; il resterait alors **0 sur Hasamélis**.

---

## 6. Hygiène des variables

### 6.1 `zz-deprecated/prototype/mobile-width` (393)
- Utilisé sur **CS Hasamélis — Mobile** : **1 nœud**, `6446:11518` « case-study--hasamelis » (FRAME 393×6227), propriétés `width` **et** `minHeight` (deux usages ✓). Le `minHeight` est lié à `mobile-width` (393), pas à `mobile-height` : probable erreur d'origine.
- Utilisé aussi **2 fois sur « Studio — Mobile »** (HORS SITE, non modifiable).
- Remplaçant le plus proche : `layout/frame/width` en mode Mobile = **390** (Desktop 1440, XL 1920, Tablet 768). **393 ≠ 390** → rebinding refusé par la règle 4 : la frame passerait de 393 à 390 px (Light inchangé en couleur, mais géométrie modifiée), sur un nœud lui-même classé contenu.
- Pour `minHeight` : `layout/frame/height` Mobile = 844 ≠ 393, aucun équivalent.
- **Décision demandée** : (a) accepter 390 px, (b) créer un token « 393 » (ex. `layout/frame/width-ios`), (c) laisser tel quel.

### 6.2 Primitives `jade/*` (11) — usage sur TOUT le fichier
| Variable | Usages | Où |
|---|---|---|
| jade/50 | 8 + 4 | Studio — Landing page (8), Studio — Mobile (4) |
| jade/500 | 136 + 48 | idem |
| jade/950 | 68 + 20 | idem |
| jade/100, 200, 300, 400, 600, 700, 800, 900 | **0** | — |
Aucune référence par un alias de variable ni par un style. **Phase 2c bloquée** : 3 sur 11 sont utilisées (284 usages, pages « Studio (en veille) » hors périmètre). Option : déplacer seulement les 8 inutilisées dans `zz-deprecated/jade/` (nécessite ton accord, c'est un renommage) ; les 3 autres resteraient.

### 6.3 `zz-deprecated/*` — usages sur TOUT le fichier
| Variable | Usages |
|---|---|
| zz-deprecated/landing-container | **139** (Studio — Landing page 95, Studio — Mobile 44) |
| zz-deprecated/prototype/mobile-width | **4** (Hasamélis Mobile 2, Studio Mobile 2) |
| zz-deprecated/zinc/700 | **8** (CS Caats) |
| zz-deprecated/zinc/100 | **2** (CS Caats) |
| zz-deprecated/zinc/200 | **2** (CS Caats) |
| zinc/50, 300, 400, 500, 600, 800, 900, 950 | 0 |
| cararra/50…950 (11) | 0 |
| qonto/purple, orange, yellow, green × light/dark (8, dans 4. Tokens - Colors) | 0 (les pastilles Qonto utilisent des valeurs en dur égales à `Projects/qonto/*`) |
| prototype/mobile-height | 0 |
| Font weight : bold-italic, semibold-italic, medium-italic, regular-italic | 0 |
Les usages de zinc sur Caats portent sur des nœuds en `visited` ou en contenu : à localiser avant Phase 4.
(Total : 39 variables `zz-deprecated/*`, dont 33 sans aucun usage.)

---

## 7. Rangement — CS Qonto (107 éléments) et CS Pokaa (110)

Contraintes à connaître : les nœuds sont dispersés (Qonto : x de -14 947 à 38 000, y de -19 272 à 16 114 ; Pokaa : x de -23 419 à 24 000). Créer une section autour d'un groupe en gardant les positions produirait des sections géantes qui se chevauchent. Il faut donc **déplacer** les nœuds de premier niveau (pas leur contenu) dans une grille propre par section. Fond de chaque section : `#d4ccc2` (neutral/300, pas de blanc sur blanc). Le canvas des deux pages est gris `#e0e0e0`.

### CS Qonto — regroupement proposé
| Section | Contenu (IDs / motif) | n |
|---|---|---|
| 1. Page finale | 6508:2627 case-study--qonto | 1 |
| 2. Héros (hero-img) | 6487:3921, 6487:4187, 6487:4653, 6479:2977, 6479:2778, 6479:1753, 6479:1117, 6479:138, 6471:17373, 6471:17061, 6479:104, 6543:45778 | 12 |
| 3. Images / sections de page (img, container, row) | 6543:45968, 6508:12069, 6497:3715, 6503:2535, 6503:2511, 6497:3864, 6497:3882, 6497:4229, 6497:3936, 6471:17177, 6490:6784, 6490:6780, 6490:4992, 6471:17089, 6471:17337 | 15 |
| 4. Composants / illustrations en instance | 6479:3376, 6479:1761, 6497:3781, 6497:3846 | 4 |
| 5. Carrousels et posts LinkedIn | 6543:45959, 6503:2521, 6490:5060, 6490:5070, 6490:5152, 6766:157669–157674 (Carrousel - Post 1200 × 1200 ×6), 6487:3914–3917 (slide-2/7/4/5) | ~17 |
| 6. Illustrations sources (rectangles `*-iso-hero-*`, `*-hero-misc*`) | 6487:3906–3913, 6505:2587–2619 (33), 6771:11142 | ~42 |
| 7. Pastilles couleur (Ellipse 1-11) | 6487:3610–3624, 6487:3918–3920 | 11 |
| 8. Images vrac | 8623:99966, 6487:3904, 6490:6771, 6503:2509, 6503:2533, 6543:45958, 6543:45955 | 7 |

### CS Pokaa — regroupement proposé
| Section | Contenu | n |
|---|---|---|
| 1. Page finale | 6581:46438 case-study--pokaa | 1 |
| 2. Héros & vignettes | 8010:18961, 8010:18952, 6665:27110, 6665:40191, 6665:41200, 6665:43160, 6674:13518, 8010:18938, 8609:19103 | 9 |
| 3. Maquettes site (website / homepage M) | 6894:15025, 6894:17733, 6894:17853, 6894:17973, 6898:18348, 6898:18378, 6898:18408, 6898:18214, 6843:24094, 6936:13641, 6836:202449, 6894:16852, 6894:16944, 6894:17746, 6894:17873 | 15 |
| 4. Composants Pokaa (`pokaa/*`, pages, mobile) | 6665:16677, 6665:35322, 6665:39054, 6674:13547, 6674:14658, 6674:15082, 6674:38985, 6674:39513, 6674:39565, 6674:39578, 6684:44838, 6684:44672, 6684:45409, 6674:14546, 6674:14527, 8683:272816 | ~17 |
| 5. Bibliothèque de cartes (card/*, flèches →) | 6684:44977–44986, 8630:320411–320421, 6961:13409, 7184:100317, 6684:45313–45350 (flèches), 8630:320422–320430, 7184:100353 | ~40 |
| 6. Exports RS (pokaa-mobile-01…05, pokaa-desktop-01…09, responsive-pokaa) | 8683:262687–262691, 8683:268977–268985, 8630:320667, 8636:333510 | 16 |
| 7. Images vrac | 6849:34733, 6674:39491, 6674:16133, 6674:38361, 6787:95793, 6787:97907, 6836:200981, 8609:19101, 6581:46509, 8280:23141, 6674:39486, 8010:18961 | ~12 |

(Listes à finaliser avec les IDs exacts au moment de la Phase 2d ; je ne déplace rien avant ton accord.)

---

## 8. Ce qui n'a pas encore été fait
- Aucune capture avant/après, aucun test mode Dark : réservés aux Phases 2-3.
- Pas de rebinding, pas de renommage, pas de déplacement.

## 9. Points à trancher par toi
1. **Branche / copie** : travaille-t-on sur l'original ou sur une copie (donne la fileKey) ?
2. **Carte du contenu client (§1)** : validation, en particulier les faux positifs (Components 7127:79035, Home 8586:16932, UI KIT 6304:9), les `case-study--*` (site de Thomas habillé avec des polices client ?) et les `Pokaa - homepage…` (polices illisibles).
3. **mobile-width (393) → 390 ?** Voir §6.1.
4. **jade/*** : laisser, ou déplacer les 8 inutilisées ? Voir §6.2.
5. **Tokens manquants à créer** (si tu veux élargir la Phase 3) : fond `#d4ccc2` (neutral/300 en bg), fond sombre de marque (`#4c101d`, `#251822` ≈ `bg/invert` à 25-30), `#000000` / `#101828` pour traits d'icônes/illustrations, rayons 2/4/5, espacement 40 (marge de page), 12 en gap.
6. **Valeurs hors échelle** à arrondir ou ajouter : rayon 4 ; gaps 12 / 128 ; paddings 40 ; interlettrage -2 des styles Bricolage.
7. **Textes** : styles pour Bricolage 32/40 px (Home), 36/54 (Components), Medium 24/36 (Rue89/Kiosk) ; PP Neue Montreal Home (56 / 48 / 32 / 31.6).
8. **PP Neue Montreal Hasamélis** : 2 ou 6 ? (§5)
9. **Rangement Qonto / Pokaa** : accord pour déplacer les nœuds de premier niveau dans une grille ; noms de sections.
10. **UI KIT** : audit seul (colors 100 % en dur) — tu décides.
