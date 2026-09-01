# Kapam — Boutique / Index v5 (loop) — Journal

## Préflight

| Point | État |
|---|---|
| App Figma desktop ouverte sur `Kapam` | **vert** — le MCP renvoie la sélection courante, donc le fichier est bien ouvert |
| Skill `figma-use` chargé avant tout `use_figma` | **vert** — chargé via `skill://figma/figma-use/SKILL.md`, passé en `skillNames` à chaque appel |
| Branche de travail v5 | **vert** — voir ci-dessous |
| Weave publié et pilotable | **vert** — `weave_get_tool_inputs` relu au démarrage, contrat conforme |

**Branche de travail.** La frame `8537:32271` a été dupliquée sous le nom
`Kapam / Boutique — Index — v5 (loop)`. **La v4 n'a pas été touchée**, elle reste intacte comme point
de comparaison pour Willy.

```
fileKey       oGJVoOgpCvgf0DnCJTBLdU
racine v4     8537:32271   (1440 x 7097)   — intacte
racine v5     8636:46929   (1440 x 8272)   — travail
archive       8636:47137   "_Archive v5"
page          🖥️ Pages (Desktop)
```

**Écart constaté avec le brief :** la racine v4 fait **1440 × 7097**, pas 1440 × 7663 comme indiqué
au §1. Sans conséquence, mais le brief est en retard sur le fichier — ce ne sera pas le seul cas
(voir A6).

### Correspondance des sections en v5

| Section | Node v4 (brief) | **Node v5** |
|---|---|---|
| S2 Hero triptyque | `8537:32375` | `8636:46932` |
| S3 Statement | `8537:32376` | `8636:46951` |
| S4 Familles | `8537:32377` | `8636:46954` |
| S5 Carrousel kits | `8537:32378` | `8636:46976` |
| S6 Bandeau réalisation | `8537:32379` | `8636:46991` *(non touché — référence)* |
| S7 Carrousel accessoires | `8537:32380` | `8636:47001` |
| S8 Atelier | `8537:32381` | `8636:47016` |
| **S8b Personnalisation** | — | **`8667:149`** *(section créée en A5)* |
| S9 Les trois formules | `8537:32382` | `8636:47031` |
| S10 Le Journal | `8537:32383` | `8636:47055` |
| S11 Avant de commander | `8537:32384` | `8636:47096` |
| S12 CTA final + newsletter | `8537:32385` | `8636:47120` |

### Styles ajoutés au fichier

Trois styles de fond ont été **créés** (aucun style existant modifié) :

- `overlay/scrim-top` — miroir de `overlay/scrim-bottom`. Utilisé en A1 (CTA final) et A5 (atelier).
- `overlay/scrim-bottom-strong` — scrim bas renforcé, utilisé en A3 (hero) uniquement.

À valider par Thomas : ce sont des ajouts au design system.

### Méthode de vérification du contraste

Tous les contrastes annoncés dans ce journal sont **mesurés, pas estimés** : le bloc de texte est
masqué temporairement, la section est capturée en pleine résolution, et la luminance relative WCAG
est calculée pixel par pixel sur la zone exacte du texte. Trois valeurs sont données : moyenne, 95ᵉ
percentile, et **pire pixel** — c'est le pire pixel qui fait foi.

---

# Kapam — Boutique / Index v5 (loop) — Journal

## Préflight

| Point | État | Détail |
|---|---|---|
| App Figma desktop ouverte sur `Kapam` | ✅ | `get_metadata` remonte la sélection courante (`8537:32271`), donc la Plugin API est pilotable. |
| Skills Figma chargés | ✅ | `figma-use` chargé via `skill://figma/figma-use/SKILL.md` avant tout `use_figma`. |
| Branche de travail | ✅ | v4 dupliquée en `Kapam / Boutique — Index — v5 (loop)`. La v4 est intacte. |
| Weave pilotable | ✅ | `recipeId` `ZKHDFL26skiQsJKpVck1M5`, **version 3**, entrée `Prompt` = `f0ebc438-6222-4e73-9e9e-23625e33ef78`, 1 sortie image. Conforme au brief. |

### Écarts constatés au brief (à signaler)

- **Hauteur racine** : la v4 fait `1440 × 7097`, pas `1440 × 7663` comme indiqué au §1. Aucune conséquence, mais le brief est en retard sur le fichier.
- **Nom du placeholder CTA-FINAL** : le frame s'appelle `CTA-FINAL — 3.4:1 — Van seul au crépuscule, lumière intérieure chaude`, alors que le plan lumière §3.2 impose **plein jour, route ouverte** pour S12. Le prompt par défaut du flow Weave est bien en plein jour — c'est donc le nom du frame qui est périmé, il sera renommé en boucle B.

## Constantes v5

```
fileKey    oGJVoOgpCvgf0DnCJTBLdU
racine v5  8636:46929   (1440 × 7097)
archive    8636:47137   (_Archive v5)
page       🖥️ Pages (Desktop)
```

| Section | Node v4 | Node v5 |
|---|---|---|
| S2 Hero triptyque | `8537:32375` | `8636:46932` |
| S3 Statement | `8537:32376` | `8636:46951` |
| S4 Familles | `8537:32377` | `8636:46954` |
| S5 Carrousel kits | `8537:32378` | `8636:46976` |
| S6 Bandeau réalisation | `8537:32379` | `8636:46991` |
| S7 Carrousel accessoires | `8537:32380` | `8636:47001` |
| S8 Atelier / Personnalisation | `8537:32381` | `8636:47016` |
| S9 Les trois formules | `8537:32382` | `8636:47031` |
| S10 Le Journal | `8537:32383` | `8636:47055` |
| S11 En savoir plus | `8537:32384` | `8636:47096` |
| S12 CTA final + newsletter | `8537:32385` | `8636:47120` |

## Ressources du fichier (garde-fou « aucune valeur brute »)

- Variables : `4. Tokens - Colors` (bg/*, text/*, border/*, btn/*), `5. Tokens - Spacing` (section/*, component/*), `6. Tokens - Radius`, `0. Primitives - Measures` (`measure/0…128`), `2. Primitives - Typography` (`size/12…72`, `weight/*`).
- Styles de texte : `display/2xl…9xl` (Rethink Sans), `text/xs…xl` (Geist), `accent/sm`, `accent/md` (Geist Mono).
- Styles de fond : `overlay/scrim-bottom`, `overlay/scrim-full`.

---

# Boucle A — mise en page

## A1 — CTA final : boutons collés · P1 · `8636:47120`

**Diagnostic corrigé.** Le frame `Boutons` avait **déjà** un auto-layout horizontal, gap 16, centré
par le `counterAxisAlignItems: CENTER` du parent. Les boutons ne se touchaient pas : c'est la porte
éclairée du van qui traversait exactement l'interstice de 16 px et soudait visuellement les deux
boutons. Le défaut réel était donc uniquement la position du bloc.

**Fait :**
- Bloc `Temps 1 — CTA de conversion` remonté de `y=128` à `y=24`, dans la moitié haute — qui est
  aussi la zone calme que le prompt Weave réserve pour ce slot. Contraintes passées en
  `horizontal: CENTER` pour que le centrage survive à un redimensionnement.
- Gap des boutons lié au token `component/gap/md` (16) au lieu d'une valeur brute.
- Style de fond `overlay/scrim-top` **créé** (miroir de `overlay/scrim-bottom`) et appliqué en
  pleine image : le visuel CTA-FINAL doit passer en plein jour (§3.2), le texte blanc y serait
  illisible sans scrim.

**Critères :** gap visible **OK** · aucun élément d'UI par-dessus le van **OK** · texte lisible sur le ciel **OK**
**Captures :** `before-A1.png` / `zoom-A1-boutons.png` / `after-A1.png`

---

## A2 — En savoir plus : liens désalignés · P1 · `8636:47096`

**Diagnostic :** blocs à 474 / 450 / 450 px, liens `EN SAVOIR PLUS` aux y absolus 456 / 432 / 432.

**Fait :**
- Image + titre + texte regroupés dans un sous-frame `Contenu` (hug), gap lié à `component/gap/md`.
- Blocs passés en `layoutSizingVertical: FILL` + `primaryAxisAlignItems: SPACE_BETWEEN` → hauteur
  uniforme, lien poussé en pied.
- **Correctif de deuxième passe :** en `SPACE_BETWEEN` seul, le lien du bloc 1 venait toucher sa
  description. Chaque lien a été enveloppé dans `Lien — pied de bloc`, `paddingTop` lié à
  `component/gap/lg` (24), ce qui garantit une respiration minimale sans casser la ligne de base.

**Critères :** les trois liens sur une même ligne de base au pixel — **OK**, y absolu **36200** pour les trois,
blocs tous à 482 px, écart contenu→lien de 24 px minimum.
**Captures :** `before-A2.png` / `after-A2.png`

---

## A3 — Hero : le titre traverse la couture · P1 · `8636:46932`

**Fait :**
- Bloc texte contraint à **360 px** (panneau 1 = 480, moins la marge de grille 120). Bord droit à
  x=480 exactement, soit la couture : plus rien ne la traverse.
- Titre : `display/7xl/regular` (56) → `display/3xl/regular` (30). Mesuré : 40 px et 36 px donnent
  **3 lignes** dans 360 px ; 30 px est le seul corps qui tient en **2 lignes**.
- CTA : les deux boutons passés en `Size=sm` (variante d'instance, aucun détachement) → 343 px,
  ils tiennent sur une seule ligne dans le panneau. `layoutWrap: WRAP` posé en sécurité.
- Scrim : style `overlay/scrim-bottom-strong` **créé** et appliqué au hero. `overlay/scrim-bottom`
  n'a pas été modifié, il reste intact pour les autres sections qui l'utilisent.
- **Correctif de deuxième passe :** l'eyebrow (392 px) se faisait tronquer par le bloc à 360 px
  (« GIRO »). Passé en `FILL` + `textAutoResize: HEIGHT`, il se replie sur 2 lignes.

**Critères :** aucun caractère à cheval sur une couture **OK** · contraste validé **OK** — mesuré sur le fond
réel (bloc texte masqué, capture 1440 px, luminance relative WCAG) :

| Zone | moyen | p95 | **pire pixel** |
|---|---|---|---|
| eyebrow | 16,5:1 | 14,0:1 | **12,7:1** |
| titre 2 lignes | 18,1:1 | 16,7:1 | **15,6:1** |
| boutons | 18,6:1 | 17,6:1 | **16,6:1** |

Seuil 4,5:1 franchi partout, y compris au pixel le plus clair.
**Captures :** `before-A3.png` / `after-A3.png` / `A3-fond-nu.png`

**⚠ Arbitrage Thomas :** le titre du hero tombe à 30 px, soit **moins que les titres de section**
(40 px, `display/5xl`). C'est la seule valeur qui satisfait « 2 lignes dans le panneau », mais ça
inverse la hiérarchie typographique de la page. Trois sorties possibles, toutes hors boucle :
raccourcir la ligne (contenu, donc Willy), accepter 3 lignes à 40 px, ou laisser le titre déborder
sur le panneau 2 en assumant la couture.

---

## A4 — S9 : la section n'a pas de titre · P1 · `8636:47031`

**Fait :**
- Bloc `Titre de section` ajouté : sur-titre `LES TROIS FORMULES` (`accent/md`, `text/secondary`)
  + titre `Vous en êtes où ?` (`display/5xl/bold`, `text/primary`). Paddings liés à
  `desktop/Margin` (120), `section/gap/md` (80) et `measure/40`. Les deux textes démarrent à
  **x=120 exactement**, mesuré.
- Hiérarchie des tuiles : le prix était noyé dans la phrase, au même corps (14 px). Il en a été
  **extrait** (découpe sur le tiret cadratin, aucun mot réécrit) et promu en `display/3xl/bold`
  (30 px, gras) — désormais l'élément le plus lourd de chaque tuile, sur une seule ligne.
  Ordre : label → prix → phrase client.
- Textes alignés à gauche (`textAlignHorizontal: LEFT`), blocs calés sur une marge interne de 48 px.
- **Ancre :** le bouton `VOUS EN ÊTES OÙ ?` du hero **n'avait aucune réaction** — l'ancre
  `#vous-en-etes-ou` n'existait pas. Créée : `ON_CLICK → SCROLL_TO → 8636:47031`.
  (`SCROLL_TO` n'accepte pas de transition : `transition: null` est obligatoire.)

**Critères :** titre présent **OK** · le prix est l'élément le plus lourd **OK** · l'ancre pointe sur ce node **OK**
Contraste des blocs de tuile vérifié après remontée — pire pixel **5,4:1** (T2), **6,1:1** (T1),
**6,2:1** (T3). Scrim inchangé, aucun renfort nécessaire.
**Captures :** `before-A4.png` / `after-A4.png` / `A4-fond-nu.png`

---

## A5 — S8 : scinder les deux sujets · P2 · `8636:47016` + `8667:149`

**Fait :**
- **Personnalisation sortie en section autonome pleine largeur** : `S8b — Personnalisation`
  (`8667:149`), insérée juste après S8, fond clair repris du panneau d'origine. Le bloc titre et le
  bouton `CONFIGURER MON VAN` ont été **déplacés** (pas recréés), le bouton est en pied de bloc.
- **Nuancier ajouté** : 12 pastilles liées aux primitives `stone/50 → stone/950` + `ink`, rayon lié
  à `radius/surface`, filet lié à `border/default` et `border/width/default`. Le filet a été ajouté
  en deuxième passe : sans lui, `stone/100` se confondait avec le fond et faisait un trou dans la
  rangée.
- **Atelier redevenu un 50/50 simple** : le bloc texte a quitté l'image pour le panneau droit
  libéré, recoloré en `text/primary` / `text/secondary`, centré verticalement.
- **Badge** `BOIS PEFC · LABEL A+` : **il n'était pas coupé** — 556 + 140 = 696 pour une image de
  720, soit 24 px de marge. Il a quand même été ancré `constraints: MAX` à 24 px du bord droit,
  pour qu'il ne puisse pas se faire rogner si l'image change de largeur.
- **Eyebrow illisible** : c'est bien le défaut réel. Corrigé par un `Scrim haut` (style
  `overlay/scrim-top`) posé sur l'image de l'atelier.

**Critères :** un seul message par section **OK** · plus aucun vide > 120 px entre titre et CTA **OK**
(Personnalisation : 64 / 64 ; Atelier : 96 titre→lien) · badge entièrement dans le cadre **OK**
Contraste de l'eyebrow après scrim : moyen 14,2:1, p95 11,7:1, **pire pixel 10,6:1**.
**Captures :** `before-A5.png` / `after-A5-atelier.png` / `after-A5-perso.png` / `A5-fond-eyebrow.png`

**À signaler :**
- La « phrase » de l'Atelier demandée par le ticket **n'existait pas** dans le contenu validé. Un
  emplacement `[À valider Willy]` a été posé plutôt que d'inventer une phrase — conforme au
  garde-fou sur le contenu rédactionnel et à la convention déjà utilisée en S10.
- Le nuancier utilise la rampe `stone` du design system, pas les vraies références Kapam. La légende
  `[À VALIDER WILLY]` le dit explicitement. Montrer 12 coloris inventés comme s'ils étaient réels
  serait le même piège que générer un kit inventé en boucle B.
- Le `Scrim bas` de l'image atelier n'a plus d'objet depuis que le texte a quitté l'image. Laissé en
  place (hors périmètre du ticket), à supprimer si Thomas le confirme.

---

## A6 — S5 / S7 : nettoyer les carrousels · P2 · `8636:46976`, `8636:47001`

**⚠ Le ticket décrit une card qui n'existe pas dans le fichier.** Audit fait sur les 100 % des
nœuds texte de la page (`findAllWithCriteria`) avant toute écriture. Le composant
`Card / Produit — condensée` (`8631:49450`) contient exactement : `Media` (placeholder + badge) et
`Content` (`Nom`, `Prix`). Rien d'autre.

| Sous-tâche du ticket | Occurrences trouvées dans la page | Verdict |
|---|---|---|
| Remonter `Compatible 40+ modèles` | **0** | sans objet |
| Remonter `2 à 3 semaines` | **0** | sans objet |
| Remonter `découpé aux gabarits` | 0 sur les cards (2 en S8 et S11, dans des phrases rédigées) | sans objet |
| Garder `Ajouter à mon devis`, un seul CTA par card | **0** — les cards n'ont aucun CTA | sans objet |
| Retirer `Prix indicatif. Devis personnalisé sous 48h.` des cards | **0** sur les cards, **1** en S9 | déjà conforme |
| Doublon `VOIR TOUS LES KITS` | **2** (tuile éditoriale + en-tête de section) | **corrigé** |

**Fait :**
- Les deux tuiles éditoriales de tête (`Tuile éditoriale — Kits`, `— Accessoires`, 400 × 420 dans un
  rail de 442) ont été **déplacées dans `_Archive v5`** et préfixées `[v5 retiré]` — jamais
  supprimées. Ça règle le trou d'alignement **et** le doublon de lien, comme prévu par le ticket.
- **S7 converti en grille statique de 4** : `Grille accessoires (4 colonnes)`, largeur FILL,
  paddings liés à `desktop/Margin` (120), gouttière liée à `desktop/Gutter` (24). Cards en FILL →
  282 px chacune, de x=120 à x=1320.
- S5 reste un rail (cards à 304 px, padding gauche 120), conformément au ticket.

**Critères :**
- cards alignées en haut ET en bas — **OK**, mesuré : S5 les 4 cards à top `31775` / bottom `32217` ;
  S7 les 4 à top `33084` / bottom `33526`.
- 4 cards visibles sans scroll horizontal sur S7 — **OK** (grille 1440 = largeur de section).
- la mention 48h n'apparaît plus qu'une fois — **OK pour la mention visée** :
  `Prix indicatifs. Devis personnalisé sous 48h.` n'existe qu'une fois, en S9. La chaîne « 48h »
  apparaît 2 fois de plus, mais dans le CTA de S12 (`Décrivez votre van, on vous répond sous 48h.`
  et `Réponse sous 48h · Devis gratuit · Sans engagement`) — du contenu rédactionnel validé qu'aucun
  ticket n'autorise à toucher.

**Captures :** `after-A6-S5.png` / `after-A6-S7.png`

**⛔ Bloqué sur le composant — décision Thomas.** En passant les cards de S7 à 282 px, le média perd
son ratio 4:5 : il reste à **282 × 380** (1:1,348) au lieu de 282 × 353. La hauteur du `Media` est
verrouillée par le composant `Card / Produit — condensée` : l'override sur l'instance est **refusé
silencieusement** (testé en `resize()`, `layoutSizingVertical`, `set({height})` — la valeur revient
à 380 sans lever d'erreur). Conformément au garde-fou, aucune instance n'a été détachée.
→ Pour une grille alignée sur la marge de 120, il faut que le `Media` du composant tienne un ratio
plutôt qu'une hauteur fixe. C'est une modification de composant partagé.

**⚠ Arbitrage Thomas :** une fois la tuile éditoriale retirée, S5 contient 4 cards qui **tiennent
entièrement à l'écran** (rail à 1408 px pour une section de 1440). Ce n'est donc plus un rail, et la
différenciation S5/S7 demandée par le ticket ne repose plus que sur la largeur des cards. Effet de
bord visible : le rail S5 déborde jusqu'à x=1408 alors que son titre et son lien s'arrêtent à
x=1320 — le bord droit ne s'aligne plus. Trois sorties : aligner S5 aussi sur la grille (mais S5 et
S7 deviennent identiques), garder le rail et assumer le débord, ou remettre un 5ᵉ élément en S5.

---

## A7 — S4 : rendre les familles distinctes · P2 · `8636:46954`

**Fait :**
- Les 4 tuiles passent de **1:1 (357 × 357) à 4:5 (357 × 446)**, ratio mesuré 1,249. La bande et la
  section suivent (446 px).
- Labels **alignés à gauche, en bas** : les instances `Lien` étaient centrées (x ≈ 93–124) et
  ancrées en `MIN`. Elles sont passées à `x = 32`, `y = h − 32 − hauteur`, avec
  `constraints: { horizontal: MIN, vertical: MAX }` pour rester collées en bas à gauche.
- **Flèche ajoutée** : les « liens » sont en réalité des instances du composant `Button`. La
  propriété `Icon trailing#7110:98` est passée à `true` sur les 4 — aucune instance détachée.
- **Hover réellement câblé** : `ON_HOVER → CHANGE_TO → Button / Hierarchy=Link inverse,
  State=Hover, Size=md`, avec transition `SMART_ANIMATE` 150 ms, sur les 4 tuiles.
- **Hover documenté** : annotation Figma native posée sur la bande (visible en Dev Mode), qui
  spécifie le `scale(1.03)` du visuel, le gain d'opacité du scrim, le décalage de 4 px de la flèche
  et le fait que toute la tuile est cliquable.
- Libellés de placeholder mis à jour (`357 × 357 · 1:1` → `357 × 446 · 4:5`).

**Scrim — correction de deuxième passe.** J'avais d'abord appliqué `overlay/scrim-bottom-strong` :
le contraste montait à 18:1 mais le tiers bas des photos devenait **noir**, capture à l'appui.
Retour à `overlay/scrim-bottom`, qui reste largement suffisant.

**Critères :** contraste du label ≥ 4.5:1 sur les 4 tuiles — **OK**, mesuré labels masqués sur le
fond réel :

| Tuile | moyen | p95 | **pire pixel** |
|---|---|---|---|
| KITS D'AMÉNAGEMENT | 17,1:1 | 16,2:1 | **14,9:1** |
| ACCESSOIRES | 18,9:1 | 16,2:1 | **15,1:1** |
| PIÈCES & ÉLECTRICITÉ | 19,7:1 | 19,3:1 | **15,0:1** |
| VÉHICULES À VENDRE | 19,0:1 | 17,6:1 | **13,3:1** |

hover documenté — **OK** (annotation + interaction réelle).
**Captures :** `A7-fond-nu.png`

**Confirmé pour la boucle B :** la capture confirme le diagnostic du ticket — les tuiles 1 et 2
montrent quasiment la même scène (intérieur bois, filet, tablette). C'est un défaut de visuel, pas
de mise en page : il se règle sur les slots `FAMILLE-*`, qui sont des slots **ancrés** (⛔) et donc
hors de cette passe.

---

## A8 — S3 : resserrer le statement · P2 · `8636:46951`

**Fait :**
- Statement resserré de **1120 px à 560 px**, largeur liée au token `width/text-md` (≤ 800 demandé),
  texte centré.
- **Eyebrow du hero supprimé** : `ATELIER ARTISAN DEPUIS 2011 · GIRONDE` déplacé dans `_Archive v5`
  et préfixé `[v5 retiré]`. Le bloc hero ne contient plus que titre + boutons.
- **Lien `DÉCOUVRIR L'ATELIER`** : il n'était **pas** souligné (`textDecoration: NONE`). Passé en
  `UNDERLINE`, corps 16 px conservé (déjà lisible).

**Critères :**
- « depuis 2011 / Gironde » n'apparaît plus que 2 fois — **OK**, audité sur tous les nœuds texte de
  la page : S3 (ici) et S11 « Notre histoire ». Exactement les deux prévus.
- largeur max 800 — **OK** (560).
- texte centré — **OK** (3 lignes centrées à x = 719–721).
- **rag équilibré — OK** : lignes à **509 / 473 / 452 px**, soit **11,2 %** d'écart maximum.
- **⛔ « les deux lignes à ±20 % » — NON ATTEINT, et géométriquement impossible.**

**Pourquoi c'est bloqué.** La phrase fait 92 caractères. Balayage de largeur fait sur le nœud réel,
puis vérifié au pixel sur le rendu :

| Corps | Largeur minimale pour tenir en **2 lignes** | Dans la limite de 800 ? |
|---|---|---|
| `display/4xl` (36 px) | **1000 px** | non |
| `display/3xl` (30 px) | **840 px** | non |
| `display/2xl` (24 px) | 680 px | oui, **mais** rag mesuré à **54,5 %** (659 / 301 px) |

Aucun réglage ne satisfait « largeur ≤ 800 » **et** « 2 lignes à ±20 % » simultanément. À 24 px —
seul corps qui tienne en 2 lignes sous 800 — les deux lignes sont à 54,5 % d'écart, et le statement
tomberait au corps d'un titre de card (24 px) alors qu'il est censé porter la page.
J'ai aussi testé une **césure typographique explicite** (mêmes mots, même ordre, juste un retour
forcé) après `fabriqués` puis après `modèle,` : les deux repartent en 3 lignes à 768 px.
Conformément à la règle des deux passes, je me suis arrêté et j'ai retenu l'état **le mieux
équilibré mesuré** : 36 px sur 560, 3 lignes à 11,2 % d'écart — ce qui sert l'intention du ticket
(« rag équilibré ») sans sacrifier la hiérarchie typographique.

→ **Arbitrage Thomas** : soit on raccourcit la phrase (contenu, donc Willy), soit on accepte 3
lignes équilibrées, soit on relève la largeur max à 1000 px pour 2 lignes à 36 px.

**Captures :** `after-A8.png`

---

## A9 — S10 : 4 colonnes → 3 · P3 · `8636:47055`

**Fait :**
- `Article — JOURNAL-04` déplacé dans `_Archive v5`, préfixé `[v5 retiré]`.
- Frame renommé `Quatre articles` → `Trois articles`, cards en `FILL` → **384 px** chacune.
- Visuels remis au ratio 4:3 : **384 × 288** (ils seraient restés à 288 × 212 sinon). Ici c'étaient
  des frames simples, pas des instances : le redimensionnement passe.

**Critères :**
- même largeur de colonne que S11 — **OK au pixel** : S10 x = 0 / 408 / 816, largeur 384 ;
  S11 x = 0 / 408 / 816, largeur 384. Identiques.
- titres sur 2 lignes max — **OK**, vérifié au rendu sur les trois articles.

**Capture :** `after-A9.png`

---

## A10 — S11 : dégénériser · P3 · `8636:47096`

**Fait :**
- Titre de section : `En savoir plus` → **`Avant de commander`**.
- **Structure entièrement différenciée de S10** : S11 n'est plus une grille de 3 cards mais un
  **bloc image large à gauche + liste verticale à droite** (588 / 24 / 588). Les items n'ont plus
  d'image, ils sont séparés par des filets liés à `border/default` + `border/width/default`, avec un
  `paddingTop` lié à `measure/32`. Les wrappers `Contenu` / `Lien — pied de bloc` créés en A2 ont été
  aplatis, devenus inutiles dans une liste.
- Les deux vignettes sans emploi (`SAVOIR-COMPATIBILITE`, `SAVOIR-HISTOIRE`) sont dans `_Archive v5`.

**Choix délibéré à signaler :** l'image large retenue est **`SAVOIR-VASP`**, pas la première de la
rangée. `SAVOIR-VASP` fait partie des 8 slots d'ambiance à générer en boucle B (§3.4) ; archiver
celui-là aurait vidé le slot de son emplacement et rendu sa génération inutile. Il gagne au passage
une place beaucoup plus visible.

**Critères :** S10 et S11 ne partagent plus la même structure de card — **OK** (S10 = grille de 3
cards image+texte ; S11 = 1 image large + liste sans image).
**Capture :** `after-A10.png`

---

## A11 — S12 : bloc newsletter · P3 · `8636:47120`

**Fait :**
- **Titre ajouté** au bloc : eyebrow `[À VALIDER WILLY]` + `Les nouveautés de l'atelier, une fois
  par mois.` — on dit enfin à quoi on s'inscrit. Le couple eyebrow-marqueur + titre reprend la
  convention déjà en place en S10 pour le contenu en attente de Willy.
- **Mention RGPD ajoutée** sous le formulaire (`text/xs/regular`), avec marqueur de validation
  juridique.
- **Vide comblé** : le formulaire, le titre et la mention sont regroupés dans `Bloc newsletter`
  (colonne gauche), le logo KAPAM reste à droite et se centre verticalement. Le bandeau passe de
  200 à 302 px, rempli au lieu d'être creux.
- **Rupture visuelle** : frame `Respiration` en `bg/default` (hauteur liée à `section/gap/md` = 80)
  insérée entre la photo nocturne et le bandeau noir. La masse sombre continue de fin de page passe
  de **1029 px** (420 photo + 200 bandeau + 409 footer) à deux blocs séparés par une bande claire.

**Critères :** titre présent **OK** · mention RGPD présente **OK** · une rupture visuelle entre photo
et bandeau **OK**
**Capture :** `after-A11.png`

---

# Boucle B — visuels

## Préflight Weave

Contrat relu au démarrage, **conforme au brief** : `recipeId ZKHDFL26skiQsJKpVck1M5`, **version 3**,
entrée unique `Prompt` (texte) sur `f0ebc438-6222-4e73-9e9e-23625e33ef78`, 1 sortie image.
L'entrée a bien été passée **explicitement à chacun des 24 runs** — sans ça, la valeur par défaut du
flow (un vrai prompt CTA-FINAL) aurait regénéré silencieusement le mauvais slot.

**Coût et approbation :** 33 crédits par slot (3 propositions), 8 slots = **264 crédits**. Coût
présenté et approuvé explicitement par Thomas avant lancement, solde confirmé de son côté.
**Solde après les 24 runs : 947 crédits.** Aucun run n'a échoué.

## ⚠ Découverte : le flow sort en carré

Le flow rend du **2048 × 2048**, quel que soit le cadrage décrit dans le prompt (`vertical 2:3`,
`3.4:1`, etc. sont ignorés par le format de sortie). C'est cohérent avec l'avertissement du brief
(« le format est figé dans le flow »), mais plus contraignant que prévu : **tout est recadré par
`scaleMode: FILL`**, et sur les slots aux ratios extrêmes la perte est majeure.

| Slot | Cadre Figma | Ratio | Part de l'image carrée conservée |
|---|---|---|---|
| `CTA-FINAL` | 1440 × 420 | 3.43:1 | **29 %** de la hauteur |
| `EDITO-REALISATION` | 1440 × 603 | 2.39:1 | **42 %** de la hauteur |
| `HERO-01` / `HERO-03` | 480 × 720 | 2:3 | 67 % de la largeur |
| `FORMULE-CLE` | 480 × 620 | ~3:4 | 77 % de la largeur |
| `FAMILLE-VEHICULES` | 357 × 446 | 4:5 | 80 % de la largeur |
| `SAVOIR-VASP` | 588 × 470 | 5:4 | 80 % de la hauteur |
| `ATELIER-5050` | 720 × 560 | 9:7 | 78 % de la hauteur |

Des planches de sélection ont été montées pour les 8 slots (`planche_*.png`) : elles montrent, pour
chaque proposition, **la zone réellement conservée en clair et la zone perdue assombrie**. C'est le
seul moyen de juger avant la pose.

**Cas concret déjà visible :** sur `EDITO-REALISATION`, le recadrage 2.39:1 centré fait tomber le van
de l'option 2 **sous la bande conservée**. L'option 2 n'est récupérable qu'en décalant le recadrage
vers le bas à la pose (le `FILL` de Figma est centré par défaut, mais la transformation d'image est
ajustable). Les options 1 et 3 passent en recadrage centré.

## Sélection et pose — FAIT

**Thomas a retenu l'option 1 pour les 8 slots.** Les 8 images ont été posées via `upload_assets`
avec `scaleMode: FILL` sur les nœuds cibles. Aucun crédit supplémentaire dépensé : les corrections
de recadrage ont été faites côté fichier, pas en régénérant. **Solde inchangé : 947 crédits.**

| Slot | Nœud cible | Cadre | État |
|---|---|---|---|
| `HERO-01` | `8636:46935` | 480 × 720 | posé — van recadré serré, voir plus bas |
| `HERO-03` | `8636:46941` | 480 × 720 | posé **après rognage** des bandes blanches |
| `FAMILLE-VEHICULES` | `8636:46971` | 357 × 446 | posé |
| `EDITO-REALISATION` | `8636:46992` | 1440 × 603 | posé + **overlay S6 déplacé** |
| `ATELIER-5050` | `8636:47018` | 720 × 560 | posé |
| `FORMULE-CLE` | `8636:47047` | 480 × 620 | posé |
| `SAVOIR-VASP` | `8636:47107` | 588 × 470 | posé |
| `CTA-FINAL` | `8636:47121` | 1440 × 420 | posé **après re-cadrage** de la bande |

Vérification des remplissages après pose : les 8 nœuds portent **une seule image**, `scaleMode FILL`,
transformation identité, `clipsContent` actif. Les anciens fills de placeholder ont bien été
remplacés, et les rectangles de scrim (enfants séparés) ont survécu.

### Trois corrections nécessaires après la pose

**1. `HERO-03` — bandes blanches incrustées dans l'image.** Le modèle a rendu un vrai 2:3
*letterboxé au centre du carré* plutôt que de remplir le carré : 51 px de blanc en haut, 49 px en
bas, 340 px de chaque côté. Résultat à la pose : bandes claires visibles en haut et en bas du
panneau. Détecté par analyse des bordures uniformes sur les 8 fichiers — **`HERO-03` est le seul
concerné**. Image rognée à 1368 × 1948 (soit le 2:3 réellement demandé) et reposée.

**2. `CTA-FINAL` — le recadrage centré ne gardait que le toit du van.** La bande 3.43:1 ne conserve
que 597 px sur 2048, et le van occupe y 1180–1820 dans la source : le crop centré (y 725–1322)
s'arrêtait juste sous le toit. Bande repositionnée à **y 950–1547**, ce qui garde le ciel pour le
texte *et* montre le corps du van, la lunette arrière et la route qui s'éloigne.
**À savoir : le van fait 640 px de haut pour une bande de 597 — il ne peut pas rentrer entier**,
quel que soit le décalage. Le van est donc coupé en bas par le cadre, ce qui se lit comme un
recadrage éditorial assumé.

**3. `EDITO-REALISATION` — le texte tombait sur le van et sur les deux personnes.** Le recadrage
2.39:1 centré a mangé la zone calme (le ciel), exactement le risque annoncé au §3.0. Conformément
au §3.1 (« Si ça coince, ajuste le bloc texte, pas l'image »), **l'overlay a été déplacé**, pas
l'image : `Édito — texte centré` passe de `y=198` centré vertical à **`y=40`** ancré en haut,
contrainte verticale `CENTER` → `MIN`.
Un premier essai à `y=48` laissait la ligne « nom du client » dans la lueur du couchant à **4,02:1**
— sous le seuil. Balayage de position effectué sur le fond nu : `y=40` la remonte à **7,40:1** sans
dégrader la citation. Le principe de la section est intact : bandeau pleine largeur, citation
client, lien.

### Contraste revérifié après pose

Les visuels ayant changé, les mesures de la boucle A ont été refaites là où du texte repose sur une
image neuve :

| Zone | moyen | p95 | **pire pixel** |
|---|---|---|---|
| S4 tuile 4 `VÉHICULES À VENDRE` (fond devenu clair) | 11,0:1 | 9,9:1 | **9,8:1** |
| S9 tuile 3 `FORMULE-CLE` (label + prix + phrase) | 13,6:1 | 11,2:1 | **9,8:1** |
| S8 eyebrow atelier | 15,3:1 | 13,3:1 | **12,6:1** |
| S6 citation | 12,8:1 | 9,3:1 | **8,4:1** |
| S6 ligne « nom du client » | — | — | **7,4:1** |

Seuil 4,5:1 franchi partout. Le scrim bas de S4 absorbe sans problème le passage à un fond clair.

### Trois points à ton arbitrage sur les visuels posés

- **`HERO-01` : le van est coupé des deux côtés.** Le crop 2:3 ne garde que 67 % de la largeur du
  carré, et le van est plus large que ça. L'action de chargement (porte ouverte, duvets, sacs) reste
  lisible et le tiers bas est calme pour le texte, mais c'est un cadrage serré subi, pas choisi.
- **`SAVOIR-VASP` porte un badge « CAMP LIFE » inventé** sur le flanc, malgré le `avoid: visible
  branding` du prompt. Une marque fictive sur une maquette client, ça se retouche ou ça se
  régénère.
- **Les libellés de placeholder restent affichés** sur les visuels posés (`ATELIER-5050`,
  `720 × 560 · 9:7`, etc.). C'est la convention déjà en place dans le fichier — les placeholders v4
  les affichaient aussi par-dessus leurs photos. À retirer d'un coup quand les 14 slots seront
  servis, pas avant, pour ne pas créer d'incohérence entre slots traités et slots ancrés.

## ⛔ Les 6 slots ancrés — non traités, action requise de Thomas

`HERO-02`, `FAMILLE-KITS`, `FAMILLE-ACCESSOIRES`, `FAMILLE-PIECES`, `FORMULE-DIY`, `FORMULE-ATELIER`
restent en **placeholder**, comme le prescrit le brief. Le flow n'accepte qu'une entrée texte : sans
image de référence, le modèle inventerait le mobilier Kapam.
→ **Pour les débloquer, Thomas doit exposer `Image 1` et `Image 2` en entrées du flow, puis
republier.** Le MCP exécute un flow, il n'en construit pas : je ne peux pas ajouter l'entrée.

## Note honnête à porter à Thomas

Les visuels générés servent de hero et d'ambiance. Sur les fiches produit et partout où le client
compare pour acheter, il faut de vraies photos à côté — un rendu IA n'est pas de la documentation
technique. `FAMILLE-VEHICULES` est un cas limite : c'est un packshot véhicule, pas une ambiance.

---

# Fin de boucle

## État des tickets

| Ticket | Priorité | État | Note |
|---|---|---|---|
| A1 — CTA final, boutons collés | P1 | **OK** | diagnostic corrigé : le gap existait, le van passait dedans |
| A2 — En savoir plus, liens désalignés | P1 | **OK** | ligne de base identique au pixel (y 36200) |
| A3 — Hero, titre sur la couture | P1 | **OK** | contraste mesuré 12,7:1 au pire pixel · 1 arbitrage |
| A4 — S9 sans titre | P1 | **OK** | ancre `#vous-en-etes-ou` créée, elle n'existait pas |
| A5 — S8, scinder les deux sujets | P2 | **OK** | section S8b créée · 3 points à signaler |
| A6 — S5/S7, nettoyer les carrousels | P2 | **partiel** | 3 sous-tâches sur 6 sans objet · 1 blocage composant |
| A7 — S4, familles distinctes | P2 | **OK** | 4 tuiles ≥ 13,3:1 · hover câblé + annoté |
| A8 — S3, resserrer le statement | P3→P2 | **partiel** | 1 critère géométriquement impossible, démontré |
| A9 — S10, 4 colonnes → 3 | P3 | **OK** | colonnes identiques à S11 au pixel |
| A10 — S11, dégénériser | P3 | **OK** | structure entièrement différenciée |
| A11 — S12, bloc newsletter | P3 | **OK** | titre + RGPD + rupture visuelle |

**Tous les P1 sont OK. Les P2 sont OK ou explicitement bloqués avec une raison écrite.**
**Boucle B : les 8 slots d'ambiance sont posés** (option 1 partout), recadrages contrôlés et
contrastes revérifiés. Capture pleine page à jour : `captures/v5-pleine-page.png` (1440 × 8272).

## Arbitrages qui remontent à Thomas

**1. Hiérarchie typographique du hero (A3).** Le titre du hero est tombé à 30 px pour tenir en
2 lignes dans le panneau 1, soit **moins que les titres de section** (40 px). C'est la seule valeur
qui satisfait le ticket, mais ça inverse la hiérarchie de la page. Sorties : raccourcir la ligne
(contenu → Willy), accepter 3 lignes à 40 px, ou assumer le débordement sur le panneau 2.

**2. Le statement S3 ne peut pas tenir en 2 lignes équilibrées sous 800 px (A8).** Démontré par
balayage : il faut 1000 px à 36 px, 840 px à 30 px ; à 24 px les 2 lignes sont à 54,5 % d'écart.
État retenu : 36 px sur 560, 3 lignes à 11,2 % d'écart. Sorties : raccourcir la phrase (→ Willy),
accepter 3 lignes, ou relever la largeur max à 1000 px.

**3. ⛔ Composant `Card / Produit — condensée` (A6).** La hauteur du `Media` est verrouillée : sur la
grille S7 à 282 px, le visuel reste en 282 × 380 au lieu de 282 × 353, donc **hors ratio 4:5**.
L'override sur instance est refusé silencieusement. Aucune instance détachée. Il faut que le `Media`
du composant tienne un **ratio** plutôt qu'une hauteur fixe.

**4. Le rail S5 n'est plus un rail (A6).** Une fois la tuile éditoriale retirée, les 4 cards tiennent
à l'écran (1408 px pour 1440). La différenciation S5/S7 voulue par le ticket ne tient plus qu'à la
largeur des cards, et le rail déborde à x=1408 alors que son titre s'arrête à x=1320.

**5. ⛔ Les 6 slots ancrés de la boucle B.** Il faut exposer `Image 1` et `Image 2` en entrées du
flow Weave puis republier. Je ne peux pas modifier le flow depuis le MCP.

**6. Le flow Weave sort en carré — confirmé à la pose.** 2048 × 2048 quel que soit le cadrage
demandé. Trois conséquences constatées : `HERO-03` est revenue **letterboxée en blanc** (rognée à la
main), `CTA-FINAL` ne montrait que le toit du van en crop centré (bande repositionnée), et le van
de `CTA-FINAL` **ne peut pas tenir entier** dans 3.43:1 (640 px de van pour 597 px de bande).
`HERO-01` subit le même effet en 2:3 : le van est coupé des deux côtés. Une sortie au bon format
dans le flow réglerait les quatre d'un coup.

**7. Contenu en attente de Willy — 3 emplacements créés.** Phrase de l'Atelier (A5), titre de la
newsletter (A11), et la légende du nuancier (A5). Tous marqués `[À valider Willy]` selon la
convention déjà en place en S10. Rien n'a été inventé comme si c'était validé.

**8. Le nuancier n'utilise pas les vraies références Kapam (A5).** Il est monté sur la rampe `stone`
du design system, et le dit. Montrer 12 coloris inventés comme réels serait le même piège que
générer un kit inventé.

**9. Mention RGPD à faire valider juridiquement (A11).** Le texte posé est une formulation standard,
pas un avis juridique.

**10. Doublon de newsletter.** Le footer (`S13`, instance de composant partagé) contient **déjà** un
formulaire « Restez informé », en plus de celui de S12 juste au-dessus. Deux formulaires
d'inscription à 300 px d'écart. Hors périmètre des tickets et dans un composant partagé — non touché.

**11. Le `Scrim bas` de l'image atelier n'a plus d'objet (A5)** depuis que le texte a quitté l'image.

**12. `SAVOIR-VASP` porte un badge « CAMP LIFE » inventé** sur le flanc du van, malgré le
`avoid: visible branding` du prompt. Une marque fictive sur une maquette client : à retoucher ou à
régénérer avant présentation à Willy.

**13. Les libellés de placeholder restent affichés sur les visuels posés.** C'est la convention du
fichier (la v4 faisait pareil). À retirer d'un bloc quand les 14 slots seront servis, pas avant.

## Ce qui n'a pas été touché, volontairement

- **S6 — Bandeau réalisation** (`8636:46991`) : référence, principe intact comme demandé.
- **Aucune instance détachée**, aucun composant partagé modifié.
- **Aucun contenu rédactionnel réécrit.** Le seul texte redistribué est le prix des tuiles S9,
  découpé sur le tiret cadratin sans qu'un mot change — et le ticket A4 le demandait explicitement.
- **Rien supprimé définitivement** : 6 éléments sont dans `_Archive v5`, préfixés `[v5 retiré]`
  (2 tuiles éditoriales, l'eyebrow du hero, le 4ᵉ article du Journal, 2 vignettes de S11).
- **Les 6 slots ancrés** (`HERO-02`, `FAMILLE-KITS`, `FAMILLE-ACCESSOIRES`, `FAMILLE-PIECES`,
  `FORMULE-DIY`, `FORMULE-ATELIER`) gardent leurs placeholders v4. C'est pour ça que les tuiles 1
  et 2 de S4 se ressemblent encore : ce sont deux slots ancrés, pas un défaut de mise en page.
