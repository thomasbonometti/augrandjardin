# Rapport d'habillage — prototype configurateur Kapam → maquettes Config v4

- Artefact : https://claude.ai/artifact/LyCqYNaCrzWHVaJeiYwkXt (`index.html` republié, `catalogue.json` inchangé)
- Maquettes : fichier Figma `oGJVoOgpCvgf0DnCJTBLdU`, lu en lecture seule (aucune écriture Figma)
- Feuille de style produite : [`habillage.css`](./habillage.css) (le contenu intégral du `<style>` de la page)

## Ce qui n'a pas bougé (vérifié)

- **Logique et données** : aucune fonction modifiée (`charger`, `sauver`, `disponibilite`, `nettoyerSelections`,
  `devis`, `etapeComplete`, `reference`, `texteExport`, lecture de `catalogue.json`).
- **Base64 du modèle** : le script de construction compare l'empreinte SHA-256 de la ligne
  `<script id="glb3d">` avant/après. Elle est identique au caractère près.
- **Module 3D** : intact lors de l'habillage, puis retouché à la demande de Thomas pour colorer la
  3D (voir § 7). La synchronisation options ↔ 3D n'a pas changé.
- **Accroches du module** : `#page` est toujours remplacé par `innerHTML` ; `.ligne`, `.titre` et `data-option`
  sont intacts. Test automatisé sur 2.1 : les 55 cases `data-option` retrouvent leur `.titre`. Décocher
  « WC Chimique » masque les mêmes 5 maillages `PoWC` dans l'original et dans la version habillée.
- **Bandeau de prototype** : texte identique au mot près. Il reste visible en permanence sur bureau (collant).
- **Vocabulaire** : aucun libellé changé. Pas de « panier », « achat » ni « commande » ajoutés.
- **Vigilance** : « prix non tracé », « Non compatible », les motifs d'incompatibilité, « visuel attendu »,
  « ⚠️ donnée manquante » et les notes à l'attention du client restent visibles, en rouge `status/error/text`
  ou avec un liseré ambre.
- **Écran Règles, « Un souci sur cette étape ? », export des retours** : conservés, habillés, même taille
  ou plus grands qu'avant.
- **Images** : aucune générée, aucune téléchargée. Chaque photo de la maquette est remplacée par un
  emplacement neutre hachuré, aux proportions de la maquette.

## 1. Tokens extraits et traduction CSS

Tout est déclaré dans un bloc `:root` unique en tête du `<style>`. Hors de ce bloc, le CSS ne contient
aucune couleur hexadécimale, taille de police ou espacement en dur. Seules exceptions : les seuils des
media queries (qui n'acceptent pas `var()`) et le `1px` de l'utilitaire `.sr` (masquage accessible).

| Collection Figma | Variables | Traduction CSS |
|---|---|---|
| 1. Primitives - Colors | `stone/50…950`, `ink`, `white`, `red/500`, `green/500`, `amber/500` | `--stone-50` … `--ink`, `--white`, `--red-500`… |
| 0. Primitives - Measures | `measure/0…128`, `width/container`, `width/text-lg`, `width/text-md` | `--measure-0` … `--measure-128`, `--width-*` |
| 2. Primitives - Typography | `font/display` (Rethink Sans), `font/body` (Geist), `font/mono` (Geist Mono), `size/12…72` (modes Desktop/Mobile), `weight/*` | `--font-*`, `--size-*` (valeurs Mobile sous `max-width: 767px`), `--weight-*` |
| 4. Tokens - Colors (42) | `bg/*`, `text/*`, `border/*`, `btn/{primary,inverse,secondary,footer,text}/*`, `input/*`, `checkbox/*`, `status/*`, `focus/ring`… | `--bg-default`, `--text-secondary`, `--btn-primary-bg`, `--status-error-text`… (même nom, `/` → `-`) |
| 5. Tokens - Spacing | `section/gutter`, `section/gap/{sm..xl}`, `component/padding/{none..lg}`, `component/gap/{none..lg}` (Desktop/Mobile) | `--section-gap-sm`, `--component-padding-md`… (valeurs Mobile sous `max-width: 767px`) |
| 6. Tokens - Radius | `radius/{none,xs,control,input,surface,pill}` | `--radius-*` |
| 7. Tokens - Border | `border/width/{default,focus}` | `--border-width-*` |
| 3. Responsive - Grid | `layout/max-width`, `layout/padding/{desktop,tablet,mobile}`, grilles | `--layout-*` |
| Styles de texte | `display/{2xl..9xl}/{regular,bold}`, `text/{xs..xl}/{light..bold}`, `accent/{sm,md}` | Raccourcis `font:` composés : `--type-display-4xl-regular`, `--type-text-sm-medium`, `--type-accent-sm`… + `--tracking-display` (−4 %) et `--tracking-accent` (16 %) |
| Styles d'effet | `shadow/{sm,md,lg,xl}` | `--shadow-*` |

**Tokens dérivés** (absents de Figma, calculés à partir des tokens) :
- `--status-error-bg` : `color-mix` de `status/error/text` à 8 % sur `bg/default`, pour le fond des motifs.
- `--status-warning-text` : pointe sur `amber/500`, pour le liseré des notes.
- `--backdrop` : `ink` à 40 %, pour le fond des modales.

**Mesures de gabarit** (`--config-*`), relevées sur les frames faute de variable Figma : barre haute 64,
barre basse 86, colonne de contenu 540, stage 812, colonne récap 400, slot kit 120 × 90, ratio slot véhicule
191/127. Opacités des états : 0,4 (CTA inactif), 0,45 (tuile désactivée), 0,55 (slot d'une ligne bloquée).

**Polices** chargées depuis Google Fonts : Geist 300/400/500/700, Geist Mono 500, Rethink Sans 400/700,
avec des piles de repli système.

**Mode sombre** : Figma n'a qu'un mode (`Default`). J'ai construit le mode sombre sur les mêmes primitives
stone, inversées (fond `stone/950`, fond discret `ink`, texte `stone/50`, bordures `stone/800`, bouton
primaire clair). Il est déclaré sous `@media (prefers-color-scheme: dark)` avec la garde
`:root:not([data-theme="light"])`, puis sous `:root[data-theme="dark"]`. Les couleurs de statut sont
éclaircies par `color-mix` pour rester lisibles sur fond sombre. Les couleurs codées en dur du module 3D
(fond du cadre, pastilles de vue, note) sont recouvertes par les tokens depuis la feuille principale, sans
toucher au module.

## 2. Écran par écran

### Structure commune (toutes les maquettes)

- **Écart** : le prototype était une colonne de 820 px, sur fond gris, en police système.
- **Corrections** :
  - Barre haute blanche de 64 px, logotype `display/2xl/bold`, compteur d'étape en `accent/sm`.
  - Barre basse `bg/subtle` de 86 px, bouton retour secondaire, configuration en `accent/sm` tronquée,
    « Total indicatif » + montant en `text/sm/bold`, CTA primaire `text/md` avec flèche. CTA inactif à 40 %
    d'opacité, comme la variante `CTA=Inactif`.
  - Boutons, champs (`border/strong`, `radius/control`), cases (16 px, `radius/xs`, fond `ink` une fois cochées).
- **Non reproduit** :
  - « Nous contacter » et « Quitter le configurateur » dans la barre haute. Il n'existe aucune action
    correspondante : je n'ai pas inventé de bouton mort.
  - Le chevron « tiroir » du total dans la barre basse, faute de tiroir dans le prototype.

### 1.1 Véhicule · marque (`8267:62041`)

- **Écarts** :
  - La maquette montre une grille de 4 cartes véhicule (191 px, visuel 191 × 127, logo en pastille) dans la
    colonne gauche `bg/muted` de 900 px, et les tuiles de situation à droite.
  - Le prototype empilait tout en une colonne, avec des tuiles sans radio.
- **Corrections** :
  - Le bloc « La marque » passe dans la colonne visuelle fixe (classe `col-visuel`). La grille se remplit
    automatiquement : 4 colonnes au bureau, 2 en mobile.
  - Cartes véhicule avec emplacement 191/127, nom en `text/sm/medium`, détail en `text/xs` `text/tertiary`,
    cadre 2 px `border/invert` quand la carte est sélectionnée.
  - Tuiles de situation avec radio, titre `text/md/medium`, détail `text/xs`.
- **Non reproduit** :
  - Les logos de marque : ce sont des images, que je ne télécharge pas.
  - Les photos de van, remplacées par des emplacements « visuel attendu : van … ».
  - Le libellé de colonne « LA MARQUE » est conservé au-dessus de la grille. La maquette n'en a pas, mais
    je ne voulais pas retirer de contenu.
- **Écart de contenu, sciemment conservé** : la maquette propose 2 situations (« J'ai un véhicule » /
  « Je n'ai pas de véhicule »). Le prototype en a 3, et la maquette 1.2 aussi. J'ai gardé les 3.

### 1.2 Véhicule · modèle (`8267:60564`)

- **Écart** : 2 grandes cartes centrées verticalement dans la colonne gauche.
- **Corrections** : la grille des modèles passe dans la colonne visuelle, centrée verticalement ; les cartes
  s'élargissent selon leur nombre (`auto-fit`). La note « Ce qu'on a relevé sur cette marque » reste à droite.
- **Non reproduit** : les photos.
- **Écart de contenu, sciemment conservé** : les tuiles de situation que la maquette répète sur cet écran
  ne sont pas dans le gabarit `vue12` du prototype. Je ne les ai pas ajoutées : ce serait de la logique.

### 1.3 Véhicule · longueur & montage (`8267:60314`)

- **Écarts** :
  - La maquette a une photo du véhicule 812 × 500 dans le stage gauche.
  - Les titres de bloc sont en `accent/sm` (eyebrow), les longueurs en tuiles côte à côte, et une note
    « Kits compatibles ».
- **Corrections** :
  - Emplacement neutre 812/500 « visuel attendu : {marque} {modèle} » dans la colonne visuelle. En mobile,
    il passe au-dessus du contenu.
  - Longueurs en grille de 2 tuiles, montage en tuiles avec prix à droite, bloc homologation en ligne option.
- **Non reproduit** :
  - Les sélecteurs Marque / Modèle de la maquette : ils n'existent pas dans le gabarit.
  - « Kits compatibles » : je l'ai laissé en texte simple (`sous`) plutôt qu'en Note repliable.

### 2.1 Kit, options & devis (`8267:63622`)

- **Écarts** :
  - Colonne gauche : vue 3D collante de 900 × 750.
  - Colonne droite de 540 px : sections en cartes `bg/subtle` (`radius/surface`, padding 24) titrées en
    `display/2xl/regular`, cartes kit horizontales (radio, visuel 120 × 90, titre `text/lg/bold`, prix sous
    la description), tuiles finition avec pastille de texture 32 px.
  - Lignes option : case, vignette 48, titre `text/sm/medium`, prix `text/xs` à droite, badge
    « NON COMPATIBLE » en `accent/sm` rouge.
- **Corrections** :
  - La scène 3D est fixée dans la colonne gauche pendant tout le défilement (voir § 4).
  - Chaque bloc de l'étape devient une carte `bg/subtle`. Les sections d'options (`section-options`) et le
    récapitulatif prennent le titre `display/2xl`.
  - La carte kit est en grille : le prix passe sous la description, comme dans Figma. Le badge
    « prix non tracé » reste dans le corps.
  - Ligne option : une vignette 48 × 48 neutre est ajoutée en CSS (pseudo-élément, sans balisage).
    - Cochée : cadre 2 px `border/invert`.
    - Survol : `border/strong`.
    - Bloquée : fond `bg/subtle`, titre `text/disabled`, vignette à 55 %, badge « Non compatible » rouge,
      motif sur fond rouge pâle.
  - Encart « Recommandé avec la finition … » : carte au cadre `border/invert`.
- **Non reproduit** :
  - Les points d'intérêt 3D (« Bloc cuisine », « Plan de travail »…) et les vignettes de vue : ils
    relèvent du module 3D, hors périmètre.
  - « Comparer les kits » et le tiroir comparateur : absents du prototype. Par ailleurs, la maquette
    `Drawer — Comparateur de kits` (`8323:78426`) contient encore des placeholders de template
    (`Product Name`, `Price Prefix`…) : à nettoyer dans Figma avant développement.
  - Les boutons « Partager » / « Télécharger en PDF » et l'encart final « Recevez votre devis
    personnalisé » : aucune action correspondante dans le prototype.
  - Le panneau « Détails de cette option » (drawer option), non implémenté dans le prototype.
  - Le titre « Choisissez votre kit… » et son chapô sont hors carte. Dans Figma, ils sont dans la première
    carte ; dans le gabarit, ils précèdent les blocs.

### 3.1 Coordonnées (`8388:55146`)

- **Écarts** :
  - Mise en page centrée sur fond `bg/subtle` (padding latéral 120), formulaire à gauche et colonne
    « Votre demande » de 400 px à droite, écart de 80.
  - Titre `display/4xl/bold`, cartes blanches `radius/surface` titrées en `text/md/medium`.
- **Corrections** :
  - Grille 2 colonnes. Le bloc « Votre demande » (`col-recap`) est collant à droite et occupe toute la
    hauteur de la grille, sans créer de trous à gauche.
  - Cartes blanches et récapitulatif en tableau bordé (`radius/input`), avec la ligne total en `text/md/bold`
    sur `bg/subtle`.
- **Non reproduit** :
  - Les champs sans étiquette (placeholder seul) : les `label` existants sont conservés et stylés en
    eyebrow, c'est plus accessible.
  - Le bloc « Comment préférez-vous être recontacté ? » et son sélecteur de créneau : absents du gabarit.
  - La vignette du kit au-dessus du récapitulatif.
  - Le bouton « Envoyer ma demande » dans le corps : le CTA reste dans la barre basse.

### 3.2 Demande envoyée (`8388:95687`)

- **Correction** : même gabarit que 3.1. Référence en `accent/md` espacé, étapes « Ce qui se passe
  maintenant » en carte, récapitulatif collant à droite.
- **Non reproduit** :
  - L'eyebrow vert « DEMANDE ENVOYÉE ».
  - Les boutons « Télécharger mon devis en PDF » et « Revenir à ma configuration » : pas d'action
    correspondante.
  - La liste numérotée à lignes séparées, rendue en liste ordonnée simple.

### Écran Règles (hors maquettes)

Colonne centrée de 768 px (`width/text-lg`). Chaque règle est une carte ; « Quand / Alors / D'où ça vient »
sont en `accent/sm` ; le verdict retenu est en bouton primaire plein. Aucun contenu retiré.

## 3. Composants interprétés faute d'information suffisante

- **Rayon 10 px** (Tuile choix, Ligne option, Carte véhicule, summary) : valeur brute dans Figma, sans
  variable. Ramené à `radius/input` (12). De même, le fond `#fcfcfa` de la tuile sélectionnée devient
  `bg/default`, et le rayon 7 px de la vignette devient `radius/control`.
- **Paddings 13/15 et 14/16** (lignes, tuiles) : ramenés à `measure/12` / `measure/16`.
- **Slot photo** : le motif de fond est une image PNG dans Figma. Je l'ai remplacé par des hachures CSS
  construites sur `bg/muted` / `bg/subtle`.
- **Textures de finition** (couleurs brutes `#dcb584`, `#cfa163`, `#8e6c4b`) : emplacement neutre de
  32 px, puisque ce sont des « textures à photographier » selon Figma.
- **Note** : le composant Figma est neutre (`bg/subtle`, `text/secondary`). Les notes du prototype sont des
  questions posées au client, donc je leur ai ajouté un liseré gauche ambre pour qu'elles ne passent pas
  inaperçues.
- **Badges « Non compatible » / « prix non tracé »** : `accent/sm` rouge, sans cadre, comme dans la variante
  `État=Bloquée`. « prix non tracé » n'existe pas dans Figma : je lui ai appliqué le même traitement.
- **Survol des lignes et tuiles** : les variantes « Survol » ne diffèrent visuellement que par le radio.
  J'ai ajouté un passage à `border/strong` pour signaler l'interactivité.
- **Modales** (souci, export) : le composant `Modale` n'a pas été détaillé. Rendu en carte
  `radius/surface` + `shadow/xl`, fond `ink` à 40 %.
- **Mode sombre** : entièrement interprété (voir § 1).

## 4. Disposition de la scène 3D

**Retenue : la disposition des maquettes en deux colonnes, sans toucher au module.**

- Au bureau (≥ 992 px, soit au-delà du gabarit tablette 991 de Figma), `.scene3d` est recouverte en
  `position: fixed` : elle occupe tout l'espace entre la barre haute et la barre basse, à gauche d'une
  colonne de contenu de 540 px. Sur un écran de 1440 × 900, la scène mesure 900 px de large (exactement
  la colonne de la maquette) et reste visible pendant tout le défilement de 2.1.
- La hauteur suit la fenêtre plutôt que les 750 px fixes. Sur un écran de 900 px de haut, c'est la même
  chose ; sur un écran plus petit, on évite une scène coupée.
- Tant que kit et finition ne sont pas choisis, le module masque sa scène. Un conteneur vide
  `col-visuel col-scene` (`aria-hidden`) maintient alors la colonne gauche `bg/muted`, pour que la mise en
  page ne saute pas.
- Aucune règle n'utilise de sélecteur fragile. Les modes de mise en page reposent sur
  `body:has(#page .col-visuel)` / `body:has(#page .col-recap)`, alimentés par des classes ajoutées aux
  gabarits.
- Le module appelle `taille()` à chaque synchronisation, ce qui redimensionne le canevas au nouveau cadre.
- En dessous de 992 px, la scène reprend sa place au-dessus du contenu, non collante, à 34 % de la hauteur
  d'écran.

## 5. Écarts sciemment conservés (la donnée Notion gagne)

- Les libellés, prix, sous-libellés et descriptions de kits viennent tous de `catalogue.json`, et pas des
  textes de maquette. Exemple : la maquette 3.1 affiche le kit à « 4 479 € » et un total de « 8 391,30 € » ;
  le prototype affiche ce que calcule `devis()`.
- Récapitulatif : la maquette le structure en « Formule / Véhicule / Kit & finition » + lignes chiffrées. Le
  prototype garde ses lignes issues de `devis()` (une ligne par poste chiffré).
- Situations véhicule : 3 dans le prototype, 2 sur la maquette 1.1 (et 3 sur 1.2).
- Libellé de la VASP : « Service Homologation VASP CARAVANE » (donnée) au lieu de « Homologation VASP »
  (maquette).
- Le libellé du CTA reste « Suivante » / « Envoyer ma demande » (logique de `rendreBarre`). La maquette dit
  « Continuer » / « Demander mon devis ».

## 6. Ce que je n'ai pas pu vérifier

- **Rendu dans le visualiseur claude.ai lui-même.** J'ai vérifié dans Chromium headless, en local, à
  1440 × 900 et 390 × 844, en clair et en sombre : aucune erreur console, aucun défilement horizontal à
  390 px.
- **Safari et Firefox** : non testés. Les modes de mise en page reposent sur `:has()` et `color-mix()`,
  supportés par les versions actuelles des trois navigateurs.
- **Survol, focus clavier et modales** : non testés en interaction. Seuls les états cochée, bloquée et
  sélectionnée ont été rendus.
- **Toutes les combinaisons de véhicules** : seul le Citroën Jumpy (post-2016, kit Travel, finition Best) a
  été parcouru de bout en bout.
- **Fidélité fine des espacements** : comparaison visuelle aux captures Figma, sans superposition au pixel.
- **Le rendu de la scène 3D dans les nouvelles dimensions** : la synchronisation est vérifiée par
  instrumentation, mais le cadrage initial de la caméra (plus large que haut) n'a pas été ajusté, puisque
  c'est le module qui le calcule.

## 7. Ajout : couleurs de la scène 3D

**Constat.** Le modèle intégré ne contient aucune texture ni image : il a été allégé avant intégration.
Ses 30 matériaux sont presque tous blancs ou gris. `bois`, `brut` et `1er strat` sont en blanc pur, et
`ceramic_53_basecolor-4K` / `Fabric074_4K_Color` ont perdu leur texture 4K. Avec un éclairage fort, le
rendu ressemblait à une maquette en plâtre.

**Correction** (piste « couleurs à plat », validée par Thomas). Le module 3D reçoit une fonction
`teinter()`, appelée au chargement et à chaque synchronisation. Le base64 n'est pas modifié.

| Matériau(x) | Teinte | Source |
|---|---|---|
| `bois`, `1er strat`, `brut blender` (portes A3 et WC, restées orange Blender) | Suit la finition : Soft `#dcb584`, Triply `#cfa163`, Best `#8e6c4b` | Pastilles `Config v4 / Texture / soft · triply · best` de la maquette |
| `brut` (contreplaqué brut) | `#e3cba4` | Interprété |
| `Fabric074_4K_Color` (coussins) | `#b3ad52` | Interprété, d'après le vert-jaune des coussins sur la vue 3D de la maquette 2.1 |
| `ceramic_53_basecolor-4K` (sol) | `#9c958a` | Interprété |
| Métaux, charnières, frigo, plaque, joints | Inchangés (gris et noirs d'origine) | Modèle |

- Les teintes sont converties de sRGB en linéaire pour s'afficher justes avec le rendu sRGB du module.
- Éclairage adouci pour que les volumes se lisent : lumière ambiante 0,8 → 0,45, hémisphère 0,65 → 0,4.
  Les deux spots sont inchangés.
- Vérifié en navigateur headless :
  - Soft rend un bois clair, Best un noyer.
  - Changer de finition en direct donne exactement la même image qu'un rechargement.
  - Aucune erreur console.

**Limite.** Ce sont des couleurs à plat, sans grain de matière. Pour du réalisme, il faudra réexporter le
modèle avec des textures légères (512 à 1024 px) depuis le fichier source.
