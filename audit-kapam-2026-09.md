# Audit d'état — Projet Kapam (site web)

Relevé du 22/09/2026. Session lecture seule : aucune écriture Figma, aucune écriture Notion.
Fichier Figma `oGJVoOgpCvgf0DnCJTBLdU`, canvas `2353:1248` (Pages Desktop) et `2354:673` (Composants).

> **Avertissement sur les ressources fournies.** 5 des 6 node IDs configurateur du brief n'existent plus dans le fichier :
> `7626:11677`, `7460:10552`, `7532:6879`, `6978:2041` renvoient tous *node not found*. `7213:55383` existe mais
> s'appelle « Animation configurateur » (2 frames d'animation), ce n'est pas une section d'étapes.
> `7626:11258` existe mais s'appelle « 🪟 Overlays & Modals » — ce ne sont pas des doublons de `7213:55382`
> (« NAVIGATION »), les deux sections contiennent des instances distinctes.
> Le configurateur réel vit dans **cinq sections « 🧭 Configurateur ① à ⑤ »** créées depuis, listées au Lot 3.

---

# Lot 1 — Inventaire des pages Figma

## 1.1 Frames de premier niveau du canvas `2353:1248`

Le fichier ne comporte **aucun marqueur de version par page** (pas de « wireframe », « v2 », « v3 »).
Les seuls versionnages explicites sont `Config v4`, `Boutique — Index v5` et `Catégorie — v6`.
La colonne « Dernier état visible » reporte donc ce qui est observable, pas une étiquette inventée :
toutes les frames sont en haute fidélité liée aux tokens du design system (`--bg/default`, `--text/primary`,
styles typographiques `display/*`, `text/*`) — il n'y a plus de filaire dans ce canvas.

### Pages complètes (largeur 1440)

| Nom de la frame | node ID | Section | `[EN COURS]` ? | Dernier état visible | Placeholders à valider ? |
|---|---|---|---|---|---|
| Kapam / Légal / CGV | `7776:11317` | ⚖️ Légal & Système | non | HF, tokens DS | non |
| Kapam / Légal / Confidentialité | `7777:21258` | ⚖️ Légal & Système | non | HF, tokens DS | non |
| Kapam / Légal / Cookies | `7778:11864` | ⚖️ Légal & Système | non | HF, tokens DS | non |
| Kapam / Légal / Retours & SAV | `7779:21821` | ⚖️ Légal & Système | non | HF, tokens DS | non |
| Kapam / Système / 404 | `7780:22674` | ⚖️ Légal & Système | non | HF, tokens DS | non |
| Recherche — 3 · Chargement | `7781:66157` | 🔎 Recherche (Système) | non | HF, tokens DS | non |
| Recherche — 4 · Résultats | `7781:13141` | 🔎 Recherche (Système) | non | HF, tokens DS | non |
| Recherche — 5 · Résultats filtrés (Kits) | `7969:20487` | 🔎 Recherche (Système) | non | HF, tokens DS | non |
| Recherche — 6 · Aucun résultat | `7781:65971` | 🔎 Recherche (Système) | non | HF, tokens DS | non |
| Recherche — 7 · Sans JavaScript (fallback) | `7969:33903` | 🔎 Recherche (Système) | non | HF, tokens DS | non |
| Devis / Checkout — Envoyer ma demande | `6972:1887` | 🧾 Devis | non | HF, tokens DS | **oui (3)** |
| Devis / Confirmation | `6975:1968` | 🧾 Devis | non | HF, tokens DS | non |
| Config v4 / 1.1 — Véhicule · choix de la marque | `8267:62041` | 🧭 Configurateur ① | non | **v4** | voir Lot 3 |
| Config v4 / 1.2 — Véhicule · choix du modèle | `8267:60564` | 🧭 Configurateur ① | non | **v4** | voir Lot 3 |
| Config v4 / 1.3 — Véhicule · longueur & montage | `8267:60314` | 🧭 Configurateur ① | non | **v4** | voir Lot 3 |
| Config v4 / 2.1 — Kit, options & devis | `8267:63622` | 🧭 Configurateur ② | non | **v4** | voir Lot 3 |
| Config v4 / 3.1 — Vos coordonnées | `8388:55146` | 🧭 Configurateur ③ | non | **v4** | voir Lot 3 |
| Config v4 / 3.2 — Demande envoyée | `8388:95687` | 🧭 Configurateur ③ | non | **v4** | voir Lot 3 |
| Kapam / Ressources / Garantie | `8427:30205` | 📚 Ressources (footer) | non | HF, tokens DS | non |
| Kapam / Ressources / Installation | `8427:30163` | 📚 Ressources (footer) | non | HF, tokens DS | non |
| Kapam / Ressources / Compatibilité | `8427:30121` | 📚 Ressources (footer) | non | HF, tokens DS | non |
| Kapam / Ressources / Guides | `8427:30000` | 📚 Ressources (footer) | non | HF, tokens DS | non |
| Kapam / Institutionnel / À propos) | `7915:36607` | 🏛️ Institutionnel | non | HF, tokens DS | **oui (2)** |
| Kapam / Institutionnel / FAQ | `7517:4378` | 🏛️ Institutionnel | non | HF, tokens DS | non |
| Kapam / Institutionnel / Contact | `7524:4488` | 🏛️ Institutionnel | non | HF, tokens DS | non |
| Kapam / Légal / Mentions légales (template) | `7527:4605` | 🏛️ Institutionnel | non | HF, tokens DS | **oui (contenu juridique entier à rédiger)** |
| Kapam / Institutionnel / Revendeurs & Partenaires | `7531:4699` | 🏛️ Institutionnel | non | HF, tokens DS | non |
| Kapam / Landing / LP Bordeaux | `7407:18100` | 🎯 Landing | non | HF, tokens DS | **oui (1)** |
| Kapam / Actualités / Catégorie (template) | `8423:29369` | 📰 Actualités | non | HF, tokens DS | non |
| Kapam / Actualités / Blog (listing) | `7567:5111` | 📰 Actualités | non | HF, tokens DS | non |
| Kapam / Actualités / Article — Template | `7782:14033` | 📰 Actualités | non | HF, tokens DS | **oui (2)** |
| Kapam / Actualités / Article — « Vérifier la compatibilité » | `8836:38353` | 📰 Actualités | non | HF, tokens DS | non |
| Kapam / Réalisation / Julien & Marie — Trafic L2H1 | `7843:19916` | 🔧 Réalisations | non | HF, tokens DS | non |
| Kapam / Réalisations / Index (listing) | `7569:5219` | 🔧 Réalisations | non | HF, tokens DS | non |
| Kapam / Réalisation / Ford Transit Custom | `8276:47791` | 🔧 Réalisations | non | HF, tokens DS | **oui (6)** |
| Kapam / Réalisation / Volkswagen T5-T6 | `8293:48968` | 🔧 Réalisations | non | HF, tokens DS | **oui (6)** |
| Kapam / Réalisation / Volkswagen Combi T2-T3 | `8297:50428` | 🔧 Réalisations | non | HF, tokens DS | **oui (7)** |
| Kapam / Formule / Kit à monter | `7777:57428` | 📦 Formules (Lot C) | **OUI** | HF, tokens DS | **oui (4)** |
| Kapam / Formule / Kit posé en atelier | `7780:12445` | 📦 Formules (Lot C) | **OUI** | HF, tokens DS | **oui (4)** |
| Kapam / Formule / Van aménagé prêt à partir | `7780:12561` | 📦 Formules (Lot C) | **OUI** | HF, tokens DS | **oui (4)** |
| Catégorie — v6 — ① Défaut | `8820:49455` | 🗂️ Catégorie v6 | non | **v6** | non |
| Catégorie — v6 — ② Filtres actifs · Trafic L1H1 | `8824:134285` | 🗂️ Catégorie v6 | non | **v6** | non |
| Catégorie — v6 — ③ Aucun résultat | `8824:134421` | 🗂️ Catégorie v6 | non | **v6** | non |
| Catégorie — v6 — ④ Catalogue dense · Accessoires | `8824:134557` | 🗂️ Catégorie v6 | non | **v6** | non |
| Kapam / Boutique — Index — v5 (loop) | `8636:46929` | 🛍️ Boutique Index v5 | non | **v5** | non |
| Kapam / Boutique / Page offre (formules) | `7559:4971` | 🛒 Boutique | non | HF, tokens DS | **oui (6)** |
| Kapam / Produit / Trafic L1H1 | `7407:16925` | 🛒 Boutique | non | HF, tokens DS | **oui (4)** |
| Boutique / Produit — Kit (template) | `7025:10460` | 🛒 Boutique | non | HF, tokens DS | **oui (9)** |
| Kapam / Catégorie / Véhicules à vendre | `7407:789` | 🛒 Boutique › Priorité | non | HF, tokens DS | **oui** |
| Kapam / Catégorie / Kit aménagement Trafic | `7407:586` | 🛒 Boutique › Priorité | non | HF, tokens DS | **oui** |
| Kapam / Catégorie / Kit aménagement de fourgon | `7402:15` | 🛒 Boutique › Priorité | non | HF, tokens DS | **oui** |
| Boutique / Catégorie — Kit aménagement van | `7008:11154` | 🛒 Boutique › Priorité | non | HF, tokens DS | **oui** |
| Homepage | `6904:192` | 🏠 Homepage | non | HF, tokens DS | **oui (1)** |

**53 pages complètes.**

### Overlays, modales et ressources d'écran (non-pages)

| Section | node ID | Contenu | Nb objets 1er niveau |
|---|---|---|---|
| 🔎 Recherche (Système) | `7968:20166` | 2 overlays de recherche + 2 instances Nav de contexte | 4 (en plus des 5 pages ci-dessus) |
| 🪟 Overlays & Modals | `7626:11258` | Lightbox, Toast, LIGHTBOX, Modal Véhicules compatibles, 2 mega-menus, 3 drawers, toast, 2 modales, Modal Compatibilité kits × véhicules | 13 |
| 🪟 Overlays — Boutique | `7815:18762` | 6 symbols (Poser ma question ×2, Formule Atelier, Question véhicule, Prise de RDV, Bar produit sticky) + 2 démos + 11 instances A1→A4 | 19 |
| 🪟 Modals — Flux devis | `7537:4919` | Hub à étapes : Clé en main / Atelier / Kit DIY × (Présentation, Formulaire, Confirmation), HUB Step 1, Aide à choisir Q1/Q2/Recommandation | 13 |
| 🧭 Configurateur ④ — Overlays | `8399:28930` | Drawer Résumé, Drawer Option, Drawer Option non compatible, Lightbox PDF, Drawer Comparateur de kits, Détail ligne survolée | 10 |
| 🧭 Configurateur ⑤ — Ressources d'écran | `8399:28931` | Composant 8 variantes « Vue 3D — Point d'intérêt », 2 « stage », cartes points d'intérêt, 3 packshots Nano Banana Pro | 8 |
| NAVIGATION | `7213:55382` | 2 Nav/Header, 2 mega-menus, 2 drawers devis, Modal Info devis | 7 |
| 🦴 Masters — Header / Footer | `7760:11321` | `Nav / Header` (2 variantes) + `Footer` | 2 |
| 🗄️ Archive — 18/09/2026 | `8996:38481` | 1 page archivée (état avant retours Willy & Mathilde) | 1 |
| 🗄️ Archive — 22/09/2026 | `9011:41152` | 4 pages catégorie + **les 4 écrans Config v4** archivés (état avant intégration du contenu Notion du 12/09) | 8 |

**Total canvas desktop : 144 objets de premier niveau**, dont 53 pages complètes, 9 pages archivées,
2 masters, 7 instances de navigation, ~73 overlays / modales / ressources / annotations.

## 1.2 Synthèse

**Combien terminées / combien `[EN COURS]` ?**
- **1 seule section porte un marqueur d'état** : `📦 Formules (Lot C) [EN COURS]` → **3 pages**.
- **Aucune autre page ne porte de marqueur d'état.** Le fichier n'a pas de système de statut :
  il est donc **impossible d'affirmer qu'une page est « terminée »** depuis le fichier seul.
- Le seul signal objectif disponible est la présence de placeholders : **18 pages de premier niveau
  contiennent encore au moins un placeholder** (colonne du tableau ci-dessus), dont
  9 occurrences sur `Boutique / Produit — Kit (template)`, 7 sur la réalisation VW Combi T2-T3,
  6 sur VW T5-T6, 6 sur Ford Transit Custom, 6 sur la Page offre.
- Placeholders les plus fréquents, verbatim : `PLACEHOLDER — retour client à recueillir auprès de Willy.` (×9),
  `Lorem ipsum dolor sit amet…` (×14, tous dans la section 🛒 Boutique › Priorité),
  `PLACEHOLDER — BLOC SEO — à rédiger par Nicolas` (×3), `PLACEHOLDER — TÉMOIGNAGES — contenu de démonstration` (×3),
  `X XXX €` (×3), `XXX,00 €` (×1), `[PLACEHOLDER — Photo Trafic L1H1 vue 2]` (×3),
  `À VALIDER WILLY` (×1, sur la Homepage).

**Pages annoncées au CDC qui n'existent pas dans le fichier**
(le CDC en base est **v1.5**, pas v1.4 — dernière modification 10/06/2026) :

| Page prévue au CDC | Statut Figma |
|---|---|
| `/boutique/pieces-electricite` (catégorie) | **absente** — aucune frame catégorie « Pièces & électricité » |
| Page « Notre savoir-faire » (option section 6bis) | **absente** — mais la décision n'a jamais été tranchée, ce n'est pas un manque ferme |
| Fiche détail par véhicule à vendre (option V2 du CDC) | **absente** — seule la page catégorie `7407:789` existe |

**Pages existant dans le fichier mais absentes du CDC v1.5** :

| Page / section Figma | node ID | Commentaire |
|---|---|---|
| Système / 404 | `7780:22674` | non listée au CDC |
| Légal / Politique cookies | `7778:11864` | non listée au CDC (CDC cite Mentions/Confidentialité/CGV) |
| Légal / Retours & SAV | `7779:21821` | non listée au CDC |
| 🔎 Recherche — 7 écrans | `7968:20166` | le CDC prévoit « recherche globale » comme fonction, pas 7 écrans maquettés |
| 📚 Ressources (footer) : Garantie, Installation, Compatibilité, Guides | `8427:29999` | 4 pages sans aucune contrepartie CDC |
| Devis / Checkout + Devis / Confirmation (pages 1440 plein écran) | `6972:1887`, `6975:1968` | **contredisent le CDC** : le CDC v1.3 tranche « formulaire unique 1-écran en lightbox » |
| 🪟 Modals — Flux devis (13 modales, dont HUB Step 1 et « Aide à choisir » Q1/Q2/Reco) | `7537:4919` | **contredisent le CDC** : « abandon du hub à étapes », « pas de quiz orienteur » (v1.3, 16/05) |
| Actualités / Catégorie (template) | `8423:29369` | non listée au CDC |
| Boutique — Index v5 (loop) | `8636:46929` | non listée au CDC |
| Catégorie — v6, 4 états | `8820:49454` | non listée au CDC (le CDC ne décrit pas d'états de page catégorie) |
| Configurateur v4 refondu, 6 écrans | `8323:87351` et suivantes | **contredisent le CDC** : « Configurateur : confirmé hors scope refonte (existant réutilisé) » |

---

# Lot 2 — État du mobile

## 2.1 Existe-t-il une page/canvas mobile ?

**Non, pas dans les deux canvas accessibles.**

- Canvas `2353:1248` (Pages Desktop) : **0 frame** dont le nom contient mobile / burger / responsive /
  tablet / 375 / 390 / 414. Distribution des largeurs de frames de 1er niveau :
  1440 (×66), 400 (×12), 900 (×4), 416 (×3), 836, 640, 600, 440, 1504, 7900 — **aucune largeur mobile**.
- Canvas `2354:673` (Composants) : **0 occurrence** de mobile / burger / responsive / breakpoint.
  Le seul nom qui matche « mobile » est `Config v4 / Photo / tablette-esc` (tablette escamotable, un produit).
- Un menu burger n'a donc **pas** été trouvé : **j'infirme l'hypothèse « uniquement un menu burger »**,
  il n'y a rien du tout dans ces deux canvas.

**Limite de vérification** (voir dernière section) : `get_metadata` sans nodeId ne renvoie que la page
`0:1 🏞️ Cover` sur ce fichier, je n'ai donc **pas pu énumérer les pages du document**. Si un canvas mobile
existe sur une troisième page, je ne peux ni le voir ni en donner le node ID. La page Cover (`0:1`) ne
contient qu'une instance `Cover` 1920×1080 et ne liste pas les pages.

Deux indices indirects vont dans le sens de l'absence :
- La section masters s'appelle « 🦴 Masters — Header / Footer (**doivent rester sur cette page pour le prototype**) » :
  le prototype vit sur le canvas desktop.
- Le composant `Nav / Header` (`6990:10522`) n'a que **2 variantes** : `Ton=Clair` et `Ton=Sur-image`.
  Aucune variante mobile, aucun burger.

## 2.2 Les composants ont-ils des variants responsive ?

**Non. Zéro.** Les axes de variantes présents dans tout le design system sont :
`Hierarchy` (72), `State` (69), `État` (47), `Checked` (40), `Marque` (37), `Level` (36), `Sélection` (15),
`Produit` (15), `Type` (10), `Étape` (8), `Ton` (8), `Visuel` (6), `CTA` (6), `Message` (4), `Forme` (4),
`Choice` (4), `Rôle` (3), `Format` (3), `Style` (2), `Selectionné` (2), `Ouvert` (2), `Déclinaison` (2), `Contexte` (2).
**Aucun axe `Breakpoint`, `Device`, `Taille`, `Responsive` ou `Mobile`.**

5 exemples précis de composants figés en largeur desktop :

| Composant | node ID | Largeur figée | Variantes existantes |
|---|---|---|---|
| `Nav / Header` | `6990:10522` | 1280 (frame 1328) | `Ton=Clair`, `Ton=Sur-image` — rien d'autre |
| `Footer` | `6888:325` | 1280 | **aucune variante** (symbol unique) |
| `mega menu - amenagement` | `7008:10984` | 1440 | aucune ; `mega menu - boutique` (`7008:11067`) idem, 1440 |
| `Config v4 / Barre haute` | `8067:1190` | 1440 | aucune ; `Config v4 / Barre basse` (`8074:1332`) = 1152, 6 variantes mais sur `CTA`/`Tiroir`, pas sur la largeur |
| `Config v4 / Ligne option` | `8076:1443` | 1120 | variantes sur `État` (Disponible / Non compatible), pas sur la largeur |

Bonus : `Panneau / Filtres — Catégorie` (`8562:5456`, 1064), `Slider / Produit` (`7191:15093`, 2064),
`Drawer / Mon devis` (`6950:574`, 936), `Banner / Top` (`7313:1187`, 1328) — tous mono-largeur.

---

# Lot 3 — Configurateur : inventaire exhaustif

## 3.1 Toutes les frames liées au configurateur

Recherche par nom sur `config`, `étape`, `step`, `simulateur` dans les deux canvas.

### Écrans actifs — canvas `2353:1248`

| Section | node ID | Frames |
|---|---|---|
| 🧭 Configurateur ① — Étape 1 · Véhicule | `8323:87351` | `8267:62041` (1.1), `8267:60564` (1.2), `8267:60314` (1.3) |
| 🧭 Configurateur ② — Étape 2 · Kit, options & devis | `8399:28929` | `8267:63622` (2.1, hauteur 7694 px) |
| 🧭 Configurateur ③ — Étape 3 · Coordonnées & confirmation | `8388:55145` | `8388:55146` (3.1), `8388:95687` (3.2) |
| 🧭 Configurateur ④ — Overlays · drawers & lightbox | `8399:28930` | `8338:52604`, `8390:55484`, `8390:55838`, `8388:95899`, `8323:86485`, `8389:55484`, `8388:95879`, `8340:94582`, `8323:78426`, `8323:86779` |
| 🧭 Configurateur ⑤ — Ressources d'écran | `8399:28931` | `8327:94717`, `8316:51938`, `8283:68749`, `8323:87162`, `8309:51281`, + 3 packshots |
| 🗄️ Archive — 22/09/2026 | `9011:41152` | `9033:45057`, `9033:45101`, `9033:45136`, `9033:45204` — les 4 mêmes écrans, état antérieur |

### Frames liées hors de ces sections (trouvées par recherche par nom)

| Nom | node ID | Où | Nature |
|---|---|---|---|
| **Animation configurateur** (section) | `7213:55383` | canvas desktop | 2 frames : `7178:16544` (« configurateur », 1440×640) et `7860:27005` (1000×640). Pas d'étapes. |
| **Stepper / Configurateur — 8 étapes** | `7883:1557` | canvas composants | Component set à **8 variantes** `Étape=1` … `Étape=8`, largeur 1248. **Orphelin : aucun écran Config v4 ne l'utilise** (les écrans v4 affichent un compteur texte « 1 sur 6 »). |
| **Config / Ligne option** | `7885:1176` | canvas composants | Ancienne génération (variantes `État=Sélectionné/Non sélectionné`). Non utilisée par v4. |
| **Config / Carte choix** | `7886:1181` | canvas composants | Ancienne génération. Non utilisée par v4. |
| **Config / Barre devis** | `7887:1189` | canvas composants | Ancienne génération. Non utilisée par v4. |
| **🧭 Config v4 — Composants** (section) | `8067:1189` | canvas composants | 16 composants v4 : Chip légende, Tuile choix, Note, Slot photo, Sous-choix, Barre basse, Carte kit, Ligne option, Fiche produit, Carte reprise, Modale, Panneau e-mail, Carte véhicule, Carte option, Point d'intérêt, Slot véhicule |
| **S10 — Configurateur** / **S8b — Configurateur (repris de la Homepage)** | dans les pages | teasers éditoriaux sur la Homepage et la page Véhicules à vendre — pas des écrans d'outil |

> **Point dur :** le fichier contient **deux générations de composants configurateur** qui coexistent
> (`Config / …` + stepper 8 étapes ; `Config v4 / …` + compteur « X sur 6 »). La première n'est référencée
> par aucun écran actif.

## 3.2 Détail par étape

Le compteur affiché en haut de colonne est **`1 sur 6`** sur les trois écrans de l'étape 1.
Le fil d'Ariane bas indique **`Étape suivante · Kit & finition`**.

### 1.1 — Véhicule · choix de la marque · `8267:62041`
- Eyebrow : `Configurateur` / `1 sur 6`
- Titre : **« Choisissons le véhicule »**
- Sous-titre : `Le véhicule commande tout le reste : il détermine les kits compatibles, les longueurs et les tarifs.` — **masqué (`hidden="true"`)** sur cet écran, visible sur 1.2 et 1.3
- Bloc `Où en êtes-vous côté véhicule ?` : **2 tuiles seulement** (contre 3 sur 1.2 et 1.3)
- Scène gauche : grille de **11 cartes véhicule** (logos constructeurs)
- Barre basse : `Suivante`, `Total indicatif` / `Total`

### 1.2 — Véhicule · choix du modèle · `8267:60564`
- Titre : **« Commençons par votre véhicule. »**
- Sous-titre : `Le véhicule commande tout le reste : il détermine les kits compatibles, les longueurs et les tarifs.`
- Bloc `Où en êtes-vous côté véhicule ?` — 3 tuiles :
  | Libellé | Sous-libellé | Prix |
  |---|---|---|
  | Je l'ai déjà | Vous connaissez le modèle exact à aménager. | — |
  | Je sais lequel je veux | Le modèle est arrêté, l'achat pas encore fait. | — |
  | Pas encore de modèle | Kapam vend des véhicules neufs et d'occasion. | — |
- Scène gauche : **2 cartes véhicule seulement** — `Trafic 2 / Jusqu'à 2014` et `Trafic 3 / 2014 et après`, badge logo Renault
- Barre basse : `Étape suivante · Kit & finition` · `Total indicatif 0 €` · `Continuer`

### 1.3 — Véhicule · longueur & montage · `8267:60314`
- Titre et sous-titre identiques à 1.2
- Bloc `Le véhicule` (« 1 modèle retenu ») : select `Marque = Renault`, select `Modèle = Trafic 3 (2014+)`
- Bloc `Longueur` — 2 tuiles : **`Court (L1H1)`**, **`Long (L2H1)`**
- Note : `Kits compatibles : Kit Travel · Kit Mado · Kit Madel`
- Bloc `Le montage` — 2 tuiles :
  | Libellé | Sous-libellé | Prix affiché |
  |---|---|---|
  | Je monte moi-même | Kapam vous livre le kit prêt à poser. | — |
  | Kapam monte à l'atelier | Montage complet en Gironde. | **+ 1 650 €** |

### 2.1 — Kit, options & devis · `8267:63622` (hauteur 7 694 px, écran unique scrollé)

Titre de bloc : **« Choisissez votre kit et sa finition. »**
Sous-titre : `Le kit définit l'agencement. La finition règle les matériaux — et pilote le tarif du kit comme celui de plusieurs options.`

**Bloc `Kit` (« compatible Renault Trafic 3 (2014+) ») — 3 cartes**

| Kit | Descriptif | Prix affiché |
|---|---|---|
| Kit Travel | Le plus complet · 13 options | 2 140 € — « à partir de, TTC » |
| Kit Mado | Cuisine optimisée · 8 options | 2 140 € — « à partir de, TTC » |
| Kit Madel | Polyvalent · 8 options | 2 395 € — « à partir de, TTC » |

Encart sous les cartes : lien **« Comparer les kits »** → ouvre `Drawer — Comparateur de kits` (`8323:78426`).

**Bloc `Finition` (« 3 disponibles ») — 3 tuiles**

| Finition | Descriptif | Prix affiché |
|---|---|---|
| Soft | Bois brut, finition essentielle | 2 140 € TTC |
| Triply | Bois triply, même tarif que Soft | 2 140 € TTC |
| Best | Stratifié, finition supérieure | 2 440 € TTC |

Encart conditionnel sous le bloc finition :
> **Avec la finition Best : le mobilier bicolore** — Recommandé pour sublimer cette finition. **+ 249 €.** → `Ajouter au devis`

**Section « Personnalisez votre Kit Travel. » — 12 lignes**

| # | Libellé | Sous-libellé | Prix affiché | Visuel |
|---|---|---|---|---|
| 1 | Mousses Haute Densité | Lot de 6 coussins housses, coloris au choix · Bultex 37 kg/m³ · demi-ferme | **+ 165 €** | photo |
| | ↳ sous-choix `Modèle` | Mousse HR 30 kg/m³ (souple) **130 €** · Bultex 37 kg/m³ (demi-ferme) **165 €** · Bultex 45 kg/m³ (ferme) **198 €** | | |
| 2 | Meuble haut 2 placards | Tarif selon finition et longueur du véhicule | **+ 490 €** | photo |
| 3 | Tiroir de rangement / réchaud gaz | Usinage spécifique au kit · tarif selon finition — « 3 versions » | **+ 199 €** | photo |
| 4 | Supports muraux (la paire) | Bois brut en Soft/Triply, stratifié en Best | **+ 50 €** | photo |
| 5 | Rallonge de lit 30×60 | — | + 90 € | photo |
| 6 | Porte placard frigo | — | + 44,95 € | photo |
| 7 | Porte placard WC | — | + 34,95 € | **placeholder** |
| 8 | Trappe Caisson D | — | + 34,95 € | **placeholder** |
| 9 | Tablette escamotable | Tarif selon le modèle et la finition — « 2 versions + suppl. » | **+ 59,90 €** | photo |
| 10 | Banquette en U amovible | — | + 69 € | photo |
| 11 | Trépied Fiamma | — | + 90 € | photo |
| 12 | Grand support élastique (crédence) | Type crédence — **visuel à venir** | + 70 € | photo |

**Section « Vitrage · Isolation · Aération » — 6 lignes**

| Libellé | Note | Prix | État |
|---|---|---|---|
| Vitrage du véhicule | — | + 450 € | coché |
| Isolation chanvre / laine de mouton | — | + 248 € | |
| Kit rideaux isolants | — | + 110 € | |
| Moustiquaire porte latérale | Nécessite un empattement long (L2) — votre véhicule est un L1H1 | + 175 € | **Non compatible** |
| Aérateur de toit inox | Non disponible avec le Kit Travel : le meuble haut occupe l'emplacement | + 95 € | **Non compatible** |
| Grilles aération 74mm | — | + 19,90 € | |

**Section « Parois · Plafond · Plancher » — 7 lignes + 1 bloc inclus**

| Libellé | Note | Prix |
|---|---|---|
| Pack habillage parois / portes / plafond | — | + 220 € |
| Décoration parois et portes | — | + 199 € |
| Plancher Superpan H-Deck 12mm | — | + 299 € |
| Décoration plancher | Nécessite le plancher bois | + 180 € |
| Marchepied latéral | Après le plancher · véhicules X82 uniquement | + 160 € |
| Finitions retrait séparation | — | + 69 € |
| Kit fixation rideaux | — | + 39,90 € |

Bloc **« Personnalisation · incluse »** — `Des attributs de votre aménagement, pas des produits payants.`
3 selects, tous à l'état `— Choisir —` : `Nuancier de sol`, `Couleurs stratifié`, `Housses literie`.

**Section « Électricité » — 10 lignes**
Pack Éclairage LED **+79 €** · Pack Lithium 100Ah BT **+749 €** · Pack Prise EXT 230V **+49,90 €** ·
Chargeur de batterie **+129 €** · Pack Convertisseur 12v→220v **+109 €** · Pack Solaire souple 210W **+749 €** ·
Prise USB + Voltmètre **+33,99 €** · Prise allume-cigare **+19,90 €** · Coffret électrique **+99 €** ·
Batterie Lithium 100Ah BT **+349 €**

**Section « Mise en eau » — 4 lignes**
Robinet contacteur 12v **+45 €** · Évier bol rond + bonde **+99 €** · Water Pack cuisine 20L **+149 €** ·
Pack douchette 40L **+169 €**

**Section « WC · Électroménager » — 6 lignes**
WC Chimique **+110 €** · Toilette sèche BOXIO **+209 €** · Plaque induction 1 foyer **+189 €** ·
Frigo Vitrifrigo c51i **+750 €** · Frigo WAECO NRX50 **+999 €** · Téléviseur LED 12V **+340 €**

**Section « Chauffage » — 1 ligne**
Eberspacher Airtronic D2 **+1 800 €**

**Section « Avez-vous pensé à ceci ? » (accessoires) — 8 lignes**
Kit rideaux isolants **+110 €** · Kit fixation rideaux **+39,90 €** · Lit d'appoint enfant **+345 €** ·
Moustiquaire porte latérale **+175 €** · Aérateurs de fenêtres **+86,90 €** · Marchepied latéral **+160 €** ·
Store latéral Fiamma F45s **+990 €** · Attelage utilitaire **+499 €**

**Bloc récapitulatif de fin d'écran**
- Titre : « Récapitulatif de votre configuration. » / « Vérifiez, puis envoyez. Aucun engagement — un conseiller vous répond sous 48h. »
- Lien `Détail — dépliant`
- `Total indicatif TTC` : **8 391,30 €** · mention `Prix indicatif. Devis personnalisé sous 48h.`
- Bloc final : « Recevez votre devis personnalisé. » / « Gratuit, sans engagement. Réponse sous 48h par l'atelier Kapam, en Gironde. » + 2 boutons

### 3.1 — Vos coordonnées · `8388:55146`
- Eyebrow : **`DERNIÈRE ÉTAPE`** — titre : « Vos coordonnées. »
- Sous-titre : `Votre configuration est enregistrée. Dites-nous où vous joindre : l'atelier vous répond sous 48 h ouvrées avec un devis chiffré.`
- Formulaire : 5 `Form / Input` (dont une ligne à 2 champs), bloc `Comment préférez-vous être recontacté ?` (2 radios + 2 inputs), 1 checkbox, 1 bouton
- Mention : `Gratuit et sans engagement. Pas de spam : vos coordonnées servent uniquement à vous répondre.`
- Colonne droite `VOTRE DEMANDE` → `Votre projet` :
  | Ligne | Valeur |
  |---|---|
  | Formule | **Atelier** |
  | Véhicule | Renault Trafic 3 (2014+) · Court (L1H1) |
  | Kit & finition | Kit Travel · Best |
  | Prix du kit | 2 440 € |
  | Montage à l'atelier | 1 650 € |
  | **Homologation VASP** | **389 €** |
  | **Total indicatif TTC** | **8 391,30 €** |
  | | `Prix indicatif. Devis personnalisé sous 48h.` |

### 3.2 — Demande envoyée · `8388:95687`
- Eyebrow `DEMANDE ENVOYÉE` — titre « Merci, votre demande est partie. »
- `Un conseiller de l'atelier Kapam vous recontacte sous 48 h ouvrées, par e-mail. Vous recevez d'ici quelques minutes un récapitulatif de votre configuration.`
- Bloc `Référence de votre demande` : **`KP-2026-0148`**
- « Ce qui se passe maintenant » — 3 étapes :
  1. On vérifie la faisabilité sur votre véhicule — *Certaines cotes changent selon le millésime — c'est là que le devis se précise.*
  2. Un conseiller vous écrit ou vous appelle — *Selon la préférence que vous venez d'indiquer.*
  3. Vous recevez votre devis chiffré — *Valable 30 jours. Aucun engagement tant que vous ne l'avez pas signé.*

## 3.3 États spéciaux recensés

| État | Existe ? | Où |
|---|---|---|
| **Incompatibilité (ligne)** | **oui** | Badge `Non compatible` (rouge, `--status/error/text`) + checkbox `Disabled` + texte grisé + motif explicite. 2 cas maquettés : « Nécessite un empattement long (L2) — votre véhicule est un L1H1 » et « Non disponible avec le Kit Travel : le meuble haut occupe l'emplacement ». Composant `Config v4 / Carte option` (`8203:57378`) avec axe `État=Disponible / Non compatible`. |
| **Incompatibilité (drawer)** | **oui** | `Kapam / Config v4 / Drawer Option — non compatible` (`8390:55838`) |
| **Dépendance conditionnelle** | **oui** | « Décoration plancher : Nécessite le plancher bois » ; « Marchepied latéral : Après le plancher · véhicules X82 uniquement » |
| **Message conditionnel / upsell** | **oui** | Encart bicolore « Avec la finition Best : le mobilier bicolore … + 249 € » |
| **Récapitulatif** | **oui** | Fin de 2.1 + colonne droite de 3.1 + `Drawer — Résumé` (`8323:86485`, 400×900) |
| **Confirmation** | **oui** | 3.2 avec référence de demande |
| **Erreur de formulaire** | **absent** | aucune frame d'erreur de saisie sur 3.1 ; le composant `Field message` existe au DS (`7008:5001`) mais n'est pas instancié dans le configurateur |
| **Écran vide / zéro résultat** | **absent** | aucun état vide maquetté dans le configurateur (il en existe pour la Recherche et la Catégorie v6, pas ici) |
| **Chargement** | **absent** | aucun état de chargement configurateur (il en existe un pour la Recherche, `7781:66157`) |
| **Véhicule non trouvé / hors catalogue** | **absent** | la tuile « Pas encore de modèle » existe en 1.2/1.3 mais aucun écran de destination n'est maquetté |

## 3.4 Bloc de visualisation du van

**Oui, il existe**, et il est entièrement en état de test.

| Caractéristique | Valeur relevée |
|---|---|
| **Emplacement** | Colonne gauche fixe (`position: sticky`) des écrans 1.x et 2.1, frame `stage` |
| **Taille du conteneur** | **900 × 750 px** (`stage`), fond `--bg/muted` |
| **Taille de l'image** | **836 × 560 px** — ratio **1,493 : 1** (≈ 3:2) |
| **Nature** | Image bitmap, pas de 3D temps réel. Une seule image distincte dans tout le fichier : `Kapam visuels_Topaz Image Upscale_2026-07-10_06-42-53 2`, réutilisée 3 fois |
| **Points d'intérêt** | 4 pastilles `+` avec attaches : **Banquette-lit**, **Plan de travail**, **Rangements bas**, **Bloc cuisine**. Contenu des 4 cartes dans `8316:51938` |
| **Bandeau vignettes** | 6 vignettes. Version `8283:68749` : `vue 12`, `vue 8`, `vue 15`, `vue 16`, `vue 13`, `vue 14` (120×60). Version `8323:87162` : **6 vignettes toutes nommées `[TEST Weave] vue 2 — 3/4 arriere-droit`** (96×64) — donc 6 fois la même image |
| **Compteur** | `1/6` affiché dans `8323:87162` |
| **Composant maître** | `Config v4 / Vue 3D — Point d'intérêt` (`8327:94717`), **8 variantes** : `Vue 1`, `Vue 2`, `Vue 3`, `Vue 3D`, `Banquette-lit`, `Rangements bas`, `Plan de travail`, `Bloc cuisine` — chacune 900×750 |
| **Packshots véhicules** | 3 images `Kapam - packshots vehicules Config v4_Gemini 3 (Nano Banana Pro)_2026-08-25_…`, 1264×848 |
| **Pipeline de production** | La description du composant `Config v4 / Slot véhicule` (`8154:1738`) dit : **« Emplacement du rendu de véhicule — à remplacer par la sortie FigmaWeave »** |

**Combien d'images distinctes sont supposées exister ?** Les indices sont contradictoires et **aucun chiffre
n'est écrit noir sur blanc** :
- le compteur affiche `1/6` → 6 vues,
- le composant maître a 8 variantes (4 vues générales + 4 points d'intérêt),
- les vignettes sont numérotées jusqu'à `vue 16`, ce qui suppose une bibliothèque d'au moins 16 rendus,
- `[TEST] Kit Travel — photo realiste, vue plongeante` (`8309:51281`, 836×560) est un test isolé supplémentaire.
- Note projet Notion du **15/09/2026** : « Willy transmet le fichier SketchUp *kit Strat Tendance Full Option
  L2 Blender OK.skp* (49,7 Mo) ; lien de téléchargement disponible jusqu'au **15/10** ». La source 3D existe
  donc côté client mais rien n'indique dans Figma qu'elle a été exploitée.

**Tous les visuels d'option sont majoritairement absents** : sur les **54 lignes d'option** de l'écran 2.1,
**43 utilisent le placeholder `Config v4 / Slot photo`** et **11 seulement ont une vraie photo** (toutes
documentées « photo boutique.kapam.fr »). Détail : Options du kit 2/12 en placeholder, Vitrage 5/6,
Parois 7/7, Électricité 10/10, Mise en eau 4/4, WC 6/6, Chauffage 1/1, Accessoires 8/8.
Les 3 pastilles de finition (Soft/Triply/Best) sont des **aplats de couleur** (`#dcb584`, `#cfa163`, `#8e6c4b`)
dont les composants portent la mention « texture à photographier ».

## 3.5 Le parcours est-il câblé en prototype ?

**Non vérifiable avec les outils disponibles** — le MCP Figma n'expose pas les `reactions` ni les
destinations de navigation. Je ne peux donc ni confirmer ni infirmer l'existence de liens `NAVIGATE`.

Ce qui est **observable** : `get_design_context` rend certains nœuds en `<a class="… cursor-pointer">`,
ce qui signale une interaction attachée. Sur les écrans 1.2 et 1.3 sont dans ce cas : le lien
« Quitter le configurateur », le bouton « Nous contacter », les cartes véhicule, le bouton « prev »
et le bouton « Continuer ». Le bouton « Continuer » de 1.2 est en revanche rendu **sans `<a>`**
(`opacity-40`, état inactif) alors que celui de 1.3 est un `<a>`. Ce sont des indices d'un câblage
partiel, **pas une preuve**, et les destinations restent inconnues.

Indice indirect fort : la section masters est nommée « 🦴 Masters — Header / Footer
(**doivent rester sur cette page pour le prototype**) » → un prototype existe bien sur ce canvas.

---

# Lot 4 — Notion : fraîcheur des sources

| Source | node / URL | Dernière modification | Annotations Willy | État |
|---|---|---|---|---|
| 🗺️ Cartographie du simulateur actuel | `35f70bd6-69cd-8131-80ad-f4b56f58367b` | **30/07/2026** | via sa sous-page | **Page quasi vide** : 1 sous-page + 1 bookmark. Propriétés : `Validé = NON`, `Type = Ressources` |
| ↳ 01 — Recherche (contenu réel) | `38b70bd6-69cd-8087-8afa-f930c4176426` | **31/07/2026** | **17 annotations en rouge** | Extraction du 13/05/2026 |
| 📘 CDC « CDC Kapam Site web » | `5a897553-3613-447c-9702-b99b8e9028f3` | **10/06/2026** | 0 annotation rouge (mais ~25 « à valider Willy ») | **Version réelle : v1.5**, pas v1.4. `Statut = Draft` |
| 🧪 Retours wireframes Figma | `35e70bd6-69cd-8122-b1fe-e256a18c497f` | **13/05/2026** | 0 rouge (mais 9 « 🆘 à valider Willy » + ~20 cases à cocher) | `Validé = NON`. **4 mois sans mise à jour** |
| 🚐 Projet « Kapam — Site web » | `0110e2c5-1a5e-4bd3-880e-792e52bb4eb3` | **17/09/2026** | — | `Statut global = En cours`, `Phase = Design`, `En attente de = Client`, `Raison = Validation client`, `Priorité = Basse`, dernier contact client **28/08/2026**, 22,76 h réelles, devis 9 900 € HT |
| Audit SEO Nicolas | `33770bd6-69cd-8050-b415-e0f42519e600` | **07/04/2026** | 0 | `Validé = NON`. **5,5 mois sans mise à jour** |
| Base FAQ Kapam | `8af332af-87a1-4720-b046-ff657cb53d28` | voir 4.3 | **0 commentaire renseigné** | voir 4.3 |
| Base « Pages site Kapam — Contenu & SEO » | `collection://5a13ce94-…` | 12/09/2026 (la plus récente) | — | voir 4.4 |

## 4.1 Annotations de Willy — cartographie du simulateur

**17 interventions en rouge**, toutes dans la sous-page « 01 — Recherche ». Répartition par sujet :

| Sujet | Nb | Teneur (verbatim condensé) |
|---|---|---|
| Nomenclature des longueurs | 3 | « S / M / L pour les Citroën Jumpy » · « Compact / Standard / Long chez Peugeot Expert et Toyota Proace » · « Sinon chez les autres L1H1, L2H1… » |
| Gamme VW Combi | 2 | « Le Triply fait maintenant partie de la gamme combi T3, on peut l'ajouter » · « le nom T2-T3 n'est pas bon, il faudra le renommer en "VW Combi T2" » |
| Gros fourgons (Boxer/Jumper/Ducato) | 3 | « la gamme va s'étoffer alors ce serait judicieux […] d'avoir les 3 gammes distinctes » · « Nous proposons le kit Travel pour Boxer/Jumper/Ducato L1 et L2 » · « Nous proposons aussi un kit "universel" sans les galbes découpés […] Master / Sprinter / Crafter » · « Pas de Mado et Madel actuellement » |
| Doublons inter-étapes | 5 | Marchepied : « cet équipement n'est à la vente que pour les Trafic 3 après 2014 […] Plancher bois → décoration de plancher → Marchepied » · Mobilier bicolore : « le plus judicieux serait de faire la propo juste après avoir sélectionné la finition "Best" » · Tiroir/réchaud gaz : « c'est sûrement plus intéressant dans Travel/Madel » · Store + attelage : « on peut mettre store et attelage à la fin » |
| **Repositionnement montage + VASP** | 1 | « le montage dans notre atelier (**ainsi que l'homologation VASP**) devront venir se positionner **au tout début du questionnaire** » |
| **Page « accessoires » groupée** | 1 | « pour éviter de poser 10 000 questions au client, il pourrait y avoir une question "accessoires" avec plusieurs sélections possibles sur la même page ? Genre **"avez-vous pensé à ceci"** : Aérateurs, Kit rideaux, Lit enfant, etc. » |
| Deux prix pour le Grand support élastique | 1 | « ce ne sont pas les mêmes. Sur le Mado, il est sur la cuisine et est plus petit. Sur le Travel et Madel c'est une sorte de crédence. Nous allons devoir préciser tout ça avec du visuel » |
| Produits à 0 € | 1 | « Exact ! » (= ce sont des attributs, pas des produits) |

## 4.2 Cartographie du simulateur — structure exploitable

### Étape 1 — Véhicules : 27 modèles / 10 marques

| Marque | Modèle | Longueurs | Kits | Plateforme |
|---|---|---|---|---|
| Renault | Trafic 2 (≤2014) | court, long | **Travel uniquement** | Renault X83 |
| Renault | Trafic 3 (2014+) ✓ | court, long | Travel, Mado, Madel | Renault X82 |
| Peugeot | Expert 2007-2016 | court, long | **Travel uniquement** | PSA C5 |
| Peugeot | Expert post-2016 | extra court (compact), court (standard), long | Travel, Mado, Madel | PSA EMP2 |
| Peugeot | Boxer L1/L2 ✓ | court, long *(via produits directs)* | **Travel uniquement** | Stellantis Sevel Sud |
| Citroën | Jumpy 2007-2016 | court, long | **Travel uniquement** | PSA C5 |
| Citroën | Jumpy post-2016 | extra court (S), court (M), long (L) | Travel, Mado, Madel | PSA EMP2 |
| Citroën | Jumper L1/L2 ✓ | court, long *(via produits directs)* | **Travel uniquement** | Stellantis Sevel Sud |
| Fiat | Scudo 2007-2016 | court, long | **Travel uniquement** | PSA C5 |
| Fiat | Ducato L1/L2 | court L1, long L2 | **Travel uniquement** | Stellantis Sevel Sud |
| Fiat | Scudo PSA 2016+ | standard (M), long (L) | Travel, Mado, Madel | PSA EMP2 |
| Ford | Transit Custom 2012-2023 | court, long | Travel, Mado, Madel | Ford V362 |
| Ford | Transit Custom V710 2024+ | court, long | Travel, Mado, Madel | Ford V710 |
| Opel | Vivaro avant 2014 | court L1, long L2 | Travel, Mado, Madel | Renault X83 |
| Opel | Vivaro 2014-2020 | court L1, long L2 | Travel, Mado, Madel | Renault X82 |
| Opel | Vivaro post-2020 | standard (M), long (L) | Travel, Mado, Madel | PSA EMP2 *(changement de plateforme)* |
| Nissan | Primastar 1 | court L1, long L2 | Travel, Mado, Madel | Renault X83 |
| Nissan | NV300 | court L1, long L2 | Travel, Mado, Madel | Renault X82 |
| Nissan | Primastar 2 (2025+) | court L1, long L2 | Travel, Mado, Madel | Renault X82 *(à confirmer)* |
| VW | Combi T2-T3 ✓ | — | Kit combi T2 | VW Bus historique |
| VW | Combi T3 | — | Kit combi T3 | VW T3 (**Triply manquant** → Willy : à ajouter) |
| VW | T4 | court, long | Travel, Madel | VW T4 |
| VW | T5-T6-T6.1 ✓ | court, long | Travel, Mado, Madel | VW T5 |
| VW | T7 | court, long | Travel, Mado, Madel | VW T7 |
| Toyota | Proace | compact (S), standard (M), long (XL) | Travel, Mado, Madel | PSA EMP2 *(rebadge)* |
| Mercedes | Vito compact ✓ | — | **Travel uniquement** | Mercedes Vito |
| Mercedes | Vito rallongé | — | **Travel uniquement** | Mercedes Vito |

Volumétrie annoncée : **~200 combinaisons finales** véhicule + longueur + kit + variante.
Variantes : **Soft / Best / Triply** (vérifié sur 6 modèles, supposé sur les autres).

### Étapes 2 à 6 — produits et prix

| Étape | Sous-section | Nb | Produits (prix) |
|---|---|---|---|
| **2 — Options du Kit** | Kit Travel | 13 | Mousses Haute Densité (130 €) · Meuble haut 2 placards (390 €) · Tiroir/réchaud gaz (119 €) · Supports muraux (40 €) · Rallonge de lit 30×60 (90 €) · Porte placard frigo (44,95 €) · Porte placard WC (34,95 €) · Trappe Caisson D (34,95 €) · Tablette escamotable (29,95 €) · Mobilier bicolore (249 €) · Banquette en U amovible (69 €) · Trépied Fiamma (90 €) · Grand support élastique (70 €) |
| | Kit Mado | 8 | Mousses HD (130 €) · Mobilier bicolore (249 €) · Supports muraux (40 €) · Porte placard frigo (44,95 €) · Tablette cuisine MADO (34,90 €) · Tablette ARRD MADO (29,90 €) · **Grand support élastique (50 €)** · Petit meuble 3 étagères (45 €) |
| | Kit Madel | 8 | Mousses HD (130 €) · Tablette escamotable (29,95 €) · Porte placard frigo (44,95 €) · Mobilier bicolore (249 €) · Supports muraux (40 €) · Meuble haut 2 placards (390 €) · Tiroir/réchaud gaz (119 €) · Grand support élastique (70 €) |
| | Kit T2/T3 | 6 | Mousses HD (130 €) · Supports muraux (40 €) · Porte placard frigo (44,95 €) · Mobilier bicolore (249 €) · Trépied Fiamma (90 €) · Tablette escamotable (29,95 €) |
| **3 — Préparations intérieures** | 3.1 Vitrage/Isolation/Aération | 7 | Vitrage (450 €) · Aérateurs de fenêtres (86,90 €) · Isolation chanvre/laine mouton (248 €) · Kit rideaux isolants (110 €) · Moustiquaire porte latérale (175 €) · Grilles aération 74mm (19,90 €) · Aérateur toit inox (95 €) |
| | 3.2 Parois/Plafond/Plancher | 8 | Pack habillage (220 €) · Décoration parois et portes (199 €) · Plancher Superpan H-Deck 12mm (299 €) · Décoration plancher (180 €) · Marchepied latéral (160 €) · Kit fixation rideaux (39,90 €) · Finitions retrait séparation (69 €) · **Rangements alcôves latérales (179 €)** |
| | 3.3 Décoration | 8 | Nuanciers de sols (0 €) · Décoration parois et portes (199 €) · Mobilier bicolore (249 €) · Marchepied latéral (160 €) · Finitions retrait séparation (69 €) · Rangements alcôves latérales (179 €) · Choix couleurs stratifié (0 €) · Housses literie coton/velours (0 €) |
| **4 — Équipements techniques** | 4.1 Électricité | 10 | Pack Éclairage LED (79) · Pack Lithium 100Ah BT (749) · Pack Prise EXT 230V (49,90) · Chargeur de batterie (129) · Pack Convertisseur (109) · Pack Solaire souple 210W (749) · Prise USB + Voltmètre (33,99) · Prise allume-cigare (19,90) · Coffret électrique (99) · Batterie Lithium 100Ah BT (349) |
| | 4.2 Mise en eau | 4 | Robinet contacteur 12v (45) · Évier bol rond + bonde (99) · Water Pack cuisine 20L (149) · Pack douchette 40L (169) |
| | 4.3 WC/Électroménager | 7 | WC Chimique (110) · Toilette sèche BOXIO (209) · Plaque induction 1 foyer (189) · Frigo Vitrifrigo c51i (750) · Frigo WAECO NRX50 (999) · Téléviseur LED 12V (340) · **Tiroir/réchaud gaz (119)** |
| | 4.4 Chauffage | 1 | Eberspacher Airtronic D2 (1 800 €) |
| **5 — Services & gros accessoires** | — | 4 | **Montage aménagement complet (1 650 €)** · **Service Homologation VASP CARAVANE (389 €)** · Store latéral Fiamma F45s (990 €) · Attelage utilitaire (499 €) |
| **6 — Accessoires divers** | — | 8 | Kit Fixation Rideaux (39,90) · Lit d'appoint enfant (345) · Marchepied latéral (160) · Kit rideaux isolants (110) · Moustiquaire porte latérale (175) · Store latéral Fiamma F45s (990) · Attelage utilitaire (499) · Aérateurs de fenêtres (86,90) |

**Règles de compatibilité documentées dans A** : uniquement la matrice véhicule → longueurs → kits du
tableau ci-dessus. **Aucune règle option × option, aucune règle option × longueur** n'est écrite dans A.

## 4.3 Base FAQ

| Métrique | Valeur |
|---|---|
| **Total de lignes** | **78** |
| Statut `À valider par Willy` | **34** (43,6 %) |
| Statut `Brouillon` | **44** (56,4 %) |
| Statut `Validée` | **0** |
| Statut `À rédiger` | **0** |
| Champ `Commentaire Willy` renseigné | **0 ligne sur 78** |

Répartition par page de destination :

| Page de destination | Brouillon | À valider par Willy | Total |
|---|---|---|---|
| Fiche produit | 12 | 11 | 23 |
| Catégorie | 13 | 6 | 19 |
| Accueil | 11 | 2 | 13 |
| Van aménagé | 5 | 6 | 11 |
| Transverse | 0 | 9 | 9 |
| Kit à monter | 3 | 0 | 3 |
| **Configurateur** | **0** | **0** | **0** |
| **Kit posé en atelier** | **0** | **0** | **0** |

→ Deux destinations prévues au schéma (`Configurateur`, `Kit posé en atelier`) n'ont **aucune question**.

## 4.4 Base « Pages site Kapam — Contenu & SEO »

**51 lignes.** Statuts : `À rédiger` 32 · `À intégrer Figma` 13 · `Intégré` 4 · `À relire – Thomas` 1 · vide 1.
**`Validé Willy` : 0 ligne.** Dernières mises à jour : 12/09/2026 (12 lignes), 22/09 (1), 25/08 (11),
20/08 (6), 31/07 (6), 01/07 (1), 07/06 (1), 02/06 (13).

Les 5 lignes configurateur — **`Configurateur — Étape 1` à `Étape 5`**, toutes `À intégrer Figma`,
priorité P1, dernière mise à jour **20/08/2026**. Cette base décrit donc un configurateur **à 5 étapes**.

---

# Lot 5 — Tableau de divergence

- **A** = cartographie Notion du simulateur actuel (`38b70bd6-…`, extraction 13/05/2026) + annotations Willy
- **B** = maquettes Figma Config v4 (6 écrans, sections `8323:87351` / `8399:28929` / `8388:55145`)
- **C** = prototype HTML 8 étapes — *non consulté dans cette session, colonne à remplir*

## 5.1 Divergence étape par étape

| Étape | Dans A ? | Dans B ? | Dans C ? | Écarts constatés A ↔ B | Gravité |
|---|---|---|---|---|---|
| **Formule** (Kit DIY / Atelier / Clé en main) | **non** — A commence au véhicule | **partiellement** — pas d'étape dédiée ; le choix « Je monte moi-même / Kapam monte à l'atelier (+1 650 €) » est en 1.3, et le récap 3.1 affiche pourtant une ligne `Formule = Atelier` | *à remplir* (C : étape 1) | B affiche dans son récapitulatif une donnée « Formule » qu'aucun écran ne fait saisir sous ce nom. Le CDC v1.5 en fait pourtant un concept structurant (3 formules, page Offres, mega-menu). | **Bloquant** |
| **Véhicule** | oui — 27 modèles / 10 marques / 6 nomenclatures de longueur | oui — 1.1 (11 cartes marque), 1.2 (**2 modèles maquettés**), 1.3 (2 longueurs `Court (L1H1)` / `Long (L2H1)`) | *à remplir* | B ne maquette que Renault Trafic 2 et Trafic 3. Les 25 autres modèles, les 3 longueurs de l'Expert/Jumpy/Proace et les véhicules sans longueur (Vito, Combi) n'ont aucun écran. La nomenclature arbitrée par Willy (S/M/L Jumpy, Compact/Standard/Long Expert+Proace, L1H1/L2H1 ailleurs) n'est pas implémentée. | **Bloquant** |
| **Kit & finition** | implicite — le kit découle du véhicule, **aucun prix de kit dans A** | oui — étape explicite avec prix : Travel 2 140 €, Mado 2 140 €, Madel 2 395 € ; Soft 2 140 €, Triply 2 140 €, Best 2 440 € | *à remplir* | Les prix de kit et de finition n'existent nulle part dans A : ils sont **apparus dans B sans source traçable**. Le kit Combi T2/T3 de A n'a aucune carte dans B. | **Bloquant** |
| **Options du kit** | oui — 13 options Travel | oui — 12 lignes | *à remplir* | **6 écarts de prix** et 1 suppression, détail en 5.2 | **Bloquant** |
| **Préparations intérieures** | oui — 3 sous-sections, 23 items | **partiellement** — 2 sections (Vitrage 6, Parois 7) + bloc « Personnalisation · incluse » (3 selects). **La sous-section 3.3 Décoration disparaît en tant que section** | *à remplir* | `Rangements alcôves latérales (179 €)` **disparaît complètement**. `Aérateurs de fenêtres (86,90 €)` quitte 3.1 pour les accessoires (conforme Willy). Les 3 produits à 0 € deviennent des selects (conforme Willy). | **Bloquant** (perte de produit) |
| **Équipements techniques** | oui — 4 sous-sections, 22 items | oui — 4 sections, 21 items, **prix identiques à l'euro près** | *à remplir* | Seul écart : `Tiroir/réchaud gaz (119 €)` retiré de WC/Électroménager — **conforme à l'arbitrage Willy** | **Cosmétique** |
| **Services & gros accessoires** (A étape 5) | oui — 4 items | **éclatée** : Montage → 1.3 ✓ · Store + Attelage → accessoires ✓ · **Homologation VASP : aucun écran de sélection** | *à remplir* | **La ligne `Homologation VASP 389 €` apparaît dans le récapitulatif 3.1 sans qu'aucun écran ne permette de la cocher.** Willy avait explicitement demandé montage **et** VASP au tout début. | **Bloquant** |
| **Accessoires divers** (A étape 6) | oui — 8 items | oui — section « Avez-vous pensé à ceci ? », **8 items, libellés et prix strictement identiques** | *à remplir* (C : étape 7) | **Aucun écart.** Implémente mot pour mot la suggestion de Willy (« Genre "avez-vous pensé à ceci" »). | **Conforme** |
| **Coordonnées / Devis** | hors périmètre de A | oui — 3.1 (formulaire + récap) et 3.2 (confirmation, réf. `KP-2026-0148`) | *à remplir* (C : étape 8) | Pas de divergence possible : A ne couvre pas cette étape | **À trancher** |

## 5.2 Écarts de prix A ↔ B (options du Kit Travel)

| Produit | Prix A | Prix B | Écart |
|---|---|---|---|
| Mousses Haute Densité | 130 € | **165 €** (+ sous-choix 130 / 165 / 198 €) | +35 € — A n'a qu'un prix, B en a trois |
| Meuble haut 2 placards | 390 € | **490 €** | **+100 €** |
| Tiroir / réchaud gaz | 119 € | **199 €** (« 3 versions ») | **+80 €** |
| Supports muraux | 40 € | **50 €** (« la paire ») | +10 € |
| Tablette escamotable | 29,95 € | **59,90 €** (« 2 versions + suppl. ») | **×2** |
| Rallonge de lit 30×60 | 90 € | 90 € | — |
| Porte placard frigo | 44,95 € | 44,95 € | — |
| Porte placard WC | 34,95 € | 34,95 € | — |
| Trappe Caisson D | 34,95 € | 34,95 € | — |
| Banquette en U amovible | 69 € | 69 € | — |
| Trépied Fiamma | 90 € | 90 € | — |
| Grand support élastique | 70 € | 70 € (« crédence ») | — |
| Mobilier bicolore | 249 € (option de liste) | 249 € mais **sorti de la liste**, devenu encart conditionnel « Avec la finition Best » | conforme Willy |

Les sections Électricité, Mise en eau, Chauffage et Accessoires sont **strictement identiques** en prix.
WC/Électroménager : identique moins le tiroir gaz.
Parois : identique moins `Rangements alcôves latérales`.

## 5.3 Problème non résolu : les doublons inter-étapes

Willy avait signalé les doublons comme un défaut du simulateur actuel. **B ne les a pas résolus, il en conserve quatre** :

| Produit | Apparaît en B dans… | Prix |
|---|---|---|
| Kit rideaux isolants | « Vitrage · Isolation · Aération » **et** « Avez-vous pensé à ceci ? » | 110 € dans les deux |
| Kit fixation rideaux | « Parois · Plafond · Plancher » **et** « Avez-vous pensé à ceci ? » | 39,90 € dans les deux |
| Marchepied latéral | « Parois · Plafond · Plancher » **et** « Avez-vous pensé à ceci ? » | 160 € dans les deux |
| Moustiquaire porte latérale | « Vitrage » (état **Non compatible**) **et** « Avez-vous pensé à ceci ? » (état **disponible**) | 175 € dans les deux |

Le dernier cas est une **contradiction interne** : le même produit est simultanément déclaré incompatible
avec le véhicule choisi et proposé à la vente 3 sections plus bas.

## 5.4 Cohérence arithmétique du récapitulatif

Le total indicatif affiché est **8 391,30 €**, identique en 2.1 et en 3.1. Les 6 lignes visibles du
récapitulatif 3.1 somment à **4 479 €** (kit Best 2 440 + montage 1 650 + VASP 389). L'écart de
**3 912,30 €** est porté par le bloc « Détail — dépliant », non déplié dans la maquette.
Les centimes `,30` ne correspondent à aucune combinaison évidente des prix relevés.
**À vérifier** : ce total est-il calculé, ou saisi en dur ?

## 5.5 Questions ouvertes

**Périmètre et gouvernance**
1. Le CDC v1.5 (10/06) dit noir sur blanc : « **Configurateur : confirmé hors scope refonte** (existant réutilisé, intègre éléments 3D) ». Six écrans Config v4 entièrement refondus existent pourtant. Quand et par qui cette décision a-t-elle été renversée ? Le CDC n'a pas de changelog postérieur au 10/06.
2. Combien d'étapes ? **A dit 6**, **B affiche « 1 sur 6 »**, **la base SEO Notion dit 5** (`Configurateur — Étape 1` à `5`, mise à jour 20/08), **C annonce 8**, et un composant `Stepper / Configurateur — 8 étapes` traîne dans le DS. Quatre chiffres, quatre sources.
3. Le CDC v1.3 a tranché « abandon du hub à étapes » et « pas de quiz orienteur ». La section `🪟 Modals — Flux devis` (13 modales, dont `HUB — Devis Step 1` et `Aide à choisir Q1/Q2/Recommandation`) est toujours dans le fichier. À archiver, ou la décision a-t-elle été re-renversée ?
4. Le CDC prévoit un formulaire devis « 1-écran en lightbox ». Le fichier contient deux **pages** plein écran `Devis / Checkout` et `Devis / Confirmation` **et** un écran `3.1 Vos coordonnées` dans le configurateur. Trois chemins de conversion coexistent.

**Données produit**
5. D'où viennent les prix de kit (Travel 2 140 / Mado 2 140 / Madel 2 395) et de finition (Soft 2 140 / Triply 2 140 / Best 2 440) ? Ils n'existent dans aucune des deux sources Notion.
6. Pourquoi Meuble haut 390 → 490 €, Tiroir gaz 119 → 199 €, Tablette escamotable 29,95 → 59,90 € ? Hausse tarifaire validée, ou périmètre du produit modifié (les mentions « 3 versions » / « 2 versions + suppl. » suggèrent la seconde) ?
7. `Rangements alcôves latérales (179 €)` : suppression volontaire ou oubli ?
8. `Homologation VASP (389 €)` : facturée dans le récapitulatif, sélectionnable nulle part. Où doit-elle se choisir ? (Willy : « au tout début du questionnaire », comme le montage.)
9. Les 4 doublons du 5.3 : chaque produit doit vivre où, une seule fois ?
10. Moustiquaire porte latérale : incompatible L1H1 en section Vitrage, disponible en section Accessoires. Quelle règle fait foi ?
11. Grand support élastique : A donne 50 € (Mado) et 70 € (Travel/Madel), Willy confirme que ce sont deux produits différents et demande « du visuel pour bien différencier les 2 ». B n'affiche que la version 70 € et la vignette porte la mention « **visuel à venir** ».
12. Kit Combi T2/T3 : présent dans A (6 options), aucune carte kit dans B. Et Willy demande de renommer « T2-T3 » en « VW Combi T2 » + d'ajouter le Triply au T3.
13. Kit « universel » sans galbes découpés (Master / Sprinter / Crafter) annoncé par Willy : absent de A comme de B.
14. Gros fourgons Boxer/Jumper/Ducato : Willy confirme le Travel pour L1 et L2 et annonce 3 gammes distinctes à venir. Rien dans B.

**Visuels**
15. Combien de rendus véhicule sont attendus ? Le compteur dit `1/6`, le composant a 8 variantes, les vignettes vont jusqu'à `vue 16`. Aucune source ne fixe le nombre.
16. Le SketchUp de Willy (`kit Strat Tendance Full Option L2 Blender OK.skp`, reçu le 15/09, **lien expirant le 15/10/2026**) doit-il alimenter la chaîne FigmaWeave annoncée dans la description du composant `Config v4 / Slot véhicule` ? Aucune trace d'exploitation dans le fichier.
17. 43 lignes d'option sur 54 sont sans photo. Qui produit ces 43 visuels, et dans quel délai ?
18. Les 3 textures de finition (Soft / Triply / Best) sont des aplats de couleur, avec la mention « texture à photographier ». Shooting prévu ?

**Mobile**
19. Aucun écran mobile, aucun variant responsive, dans les deux canvas accessibles. Le CDC exige pourtant « Responsive complet (drawer Mon devis plein écran sur mobile) » et l'audit SEO note « le contenu est plus large que l'écran » sur le site actuel. Le mobile est-il un lot non démarré, ou existe-t-il sur une page que je n'ai pas pu énumérer ?
20. Le retour wireframes du 13/05 posait déjà la question : « **Comportement responsive mobile** : le mega menu sur mobile ? […] À valider dans les wireframes mobile (**pas encore vus**) ». Quatre mois plus tard, toujours rien.

**Contenus**
21. Base FAQ : 78 questions, **0 validée**, 34 en attente de Willy, 0 commentaire Willy renseigné, et **0 question pour le configurateur** alors que la destination existe au schéma.
22. Base Contenu & SEO : 51 pages, **0 ligne `Validé Willy`**, 32 encore `À rédiger`.
23. Les ~25 points « à valider Willy » du CDC v1.5 (prix de départ des formules, délais, garantie 2 ans, matériaux, VASP/DREAL, norme contreplaqué COP2, réseau de partenaires monteurs, « Madel » vs « Mado », stats 350+/14 ans/50+ modèles, « Grands prix de l'artisanat », PEFC Label A+, « démontable en 15 minutes ») : aucun n'est marqué résolu.
24. Le projet est `En attente de : Client` depuis le **28/08/2026** (dernier contact), priorité `Basse`. La relance est-elle partie ?

---

# Ce que je n'ai pas pu vérifier, et pourquoi

1. **Les pages du document Figma.** `get_metadata` appelé sans `nodeId` sur ce fichier ne renvoie qu'une
   seule page, `0:1 🏞️ Cover`. Je n'ai donc pas pu établir la liste des canvas du document. Tout le Lot 2
   repose sur les deux canvas dont les IDs m'ont été fournis (`2353:1248`, `2354:673`) et sur la page Cover.
   **S'il existe un canvas mobile sur une troisième page, il est invisible pour moi.** La page Cover ne
   contient qu'une instance `Cover` 1920×1080 et ne liste rien.
2. **Le câblage prototype (reactions NAVIGATE).** Le MCP Figma n'expose ni les `reactions`, ni les
   `transitionNodeID`, ni les flows de prototypage. Je n'ai que des indices indirects (rendu en `<a>`,
   `cursor-pointer`, nom de la section masters). Réponse au Lot 3 point 5 : **indéterminé**, pas « non ».
3. **Le FigJam `fjtFQU1D9NbphxK8N03RkZ`.** `get_figjam` sur le nœud racine `0:1` renvoie
   `<canvas id="0:1" name="Page 1" width="0" height="0" />` — un canvas vide. Soit le board est vide,
   soit son contenu est sur une autre page que je ne peux pas énumérer (même limite qu'au point 1).
   Le CDC le référence pourtant comme « FigJam Configurateur (cartographie simulateur actuel) ».
4. **Le prototype HTML 8 étapes (source C).** Non fourni dans cette session, comme annoncé au brief.
   Toutes les cellules « Dans C ? » du Lot 5 restent à remplir.
5. **La recherche de composants hors fichier.** `search_design_system` interroge les bibliothèques publiées.
   Le fichier Kapam n'est pas publié comme bibliothèque : une recherche sur `Config v4 Carte véhicule` ne
   renvoie que des composants d'autres design systems (Caats, BDOR). Je n'ai donc pas pu croiser l'inventaire
   de composants par ce canal, seulement par lecture directe du canvas `2354:673`.
6. **Le contenu réel des drawers en instance.** `get_metadata` ne restitue pas les overrides de texte à
   l'intérieur des instances. J'ai lu les écrans un par un via `get_design_context`, mais je n'ai pas
   déplié : `Drawer — Résumé` (`8323:86485`), `Lightbox — Devis PDF` (`8388:95879`), ni les 11 instances
   `→ A1 … A4` de la section Overlays — Boutique. Ce que je sais du `Drawer — Comparateur de kits`
   (`8323:78426`) vient de ses nœuds texte directs : il contient encore les placeholders bruts du template
   d'origine — `Product Name`, `Price Prefix`, `Lower Price`, `Higher Price`, `Current View Text` — soit un
   composant **non rempli**, alors que le lien « Comparer les kits » de l'étape 2 pointe dessus.
7. **La ventilation du total 8 391,30 €.** Le bloc « Détail — dépliant » du récapitulatif n'est pas déplié
   dans la maquette ; je ne peux pas reconstituer les lignes manquantes (3 912,30 € d'écart).
8. **Les dates de modification par page Notion.** Notion expose `page_last_edited_at` au niveau de la page,
   pas au niveau du bloc : je ne peux pas dater individuellement les annotations rouges de Willy.
   Elles sont antérieures ou égales au 31/07/2026 (dernière modification de la sous-page « 01 — Recherche »).
9. **Deux corrections à porter au brief**, relevées en passant et non corrigées puisque la session est en
   lecture seule : le CDC en base est en **v1.5** (10/06/2026), pas v1.4 ; et les node IDs configurateur
   `7626:11677`, `7460:10552`, `7532:6879`, `6978:2041` sont morts — les bons sont `8323:87351`,
   `8399:28929`, `8388:55145`, `8399:28930`, `8399:28931`.
