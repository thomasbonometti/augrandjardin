# Dossier de refonte du CDC Kapam

> **Nature de ce document.** Matière première pour la session de réécriture du CDC. Il ne
> propose rien, ne tranche rien, ne rédige aucune version du futur CDC. Il collecte, range,
> source et signale les contradictions.
>
> **Date de constitution :** 22/09/2026
> **CDC de référence :** v1.5, dernière modification **10/06/2026**, statut Notion « Draft »
> ([page Notion](https://app.notion.com/p/5a8975533613447c9702b99b8e9028f3))
> **Fichier Figma :** `oGJVoOgpCvgf0DnCJTBLdU`

---

## 0. Sources dépouillées

### Figma (lecture seule, aucune écriture)

| Canvas | ID | Contenu relevé |
|---|---|---|
| 🖥️ Pages (Desktop) | `2353:1248` | 26 sections, ~95 frames de page |
| 📱 Mobile (en cours) | `8468:31767` | 17 sections, ~48 frames de page |
| 🧩 Composants | `2354:673` | 9 sections de composants, dont `🧭 Config v4 — Composants` (16 composants) |
| Archive 18/09/2026 | `8996:38481` | 1 frame — « état avant retours Willy & Mathilde » |
| Archive 22/09/2026 | `9011:41152` | 8 frames — « état avant intégration du contenu Notion du 12/09 » |

Le nom de la section d'archive 18/09 est lui-même une source : **« état avant retours Willy &
Mathilde »** — il atteste que Mathilde est une partie prenante des retours, ce que le CDC v1.5
ne mentionne à aucun endroit.

### Notion

| Document | ID | Dernière modif. |
|---|---|---|
| 📘 CDC — Kapam — Site web (v1.5) | `5a897553-3613-447c-9702-b99b8e9028f3` | 10/06/2026 |
| 🚐 Projet Kapam — Site web (+ 31 notes liées) | `0110e2c5-1a5e-4bd3-880e-792e52bb4eb3` | 17/09/2026 |
| 🧪 Retours wireframes Figma | `35e70bd6-69cd-8122-b1fe-e256a18c497f` | 13/05/2026 |
| 🗺️ Cartographie simulateur actuel | `35f70bd6-69cd-8131-80ad-f4b56f58367b` | 30/07/2026 |
| Base FAQ Kapam (78 lignes) | `8af332af-87a1-4720-b046-ff657cb53d28` | — |
| Base Contenu & SEO (**52** lignes) | `collection://5a13ce94-…` | 22/09/2026 |
| Audit SEO Kapam | `33770bd6-69cd-8050-b415-e0f42519e600` | 07/04/2026 |

### Comptes-rendus et notes d'appel retrouvés par recherche active

Recherche menée sur `Kapam`, `Willy`, `Mathilde`, `visio`, `compte-rendu`, `point projet`.
**Aucun de ces documents n'est cité dans le CDC v1.5.**

| Date | Document | ID | Type |
|---|---|---|---|
| 26/03/2026 | Nicolas (SEO) × Willy (Kapam) | `32f70bd6-69cd-8003-85cd-cbad831ada36` | Réunion |
| 30/03/2026 | Brief — Kapam — Site web | `f14fa4bd-83c0-45e7-bb2b-3c394c57f16d` | Brief |
| 01/04/2026 | Préparation Workshop démarrage | `3642092d-441f-4c6f-9ced-8e5f607342fc` | Prépa |
| 23/04/2026 | Compte rendu — Refonte site Kapam (2 sessions) | `cc189e71-96e4-424c-9442-e3fe4e746ac9` | CR ✅ validé |
| 11/05/2026 | Brief Tableau comparatif | `bd6d380d-db1a-4859-8af6-8067e8eb3725` | Livrable |
| 12–13/05/2026 | Retours wireframes Figma (+ 3 sous-notes Tella) | `35e70bd6-…` | CR |
| 27/07/2026 | Réunion de suivi — Design et configurateur | `3aa70bd6-69cd-804e-94a0-fbfd81f3dc0e` | Notes IA |
| 29/07/2026 | Retours visio Willy 29/07 (hors page Produit) | `742de104-b43a-46cd-9e58-d3c2a2a23f6f` | Réunion |
| 10/09/2026 | Retours de Willy (sur maquettes) | `3ad70bd6-69cd-807c-88c0-ecf3f151db4f` | CR ✅ validé |

Trois notes « Tella » (vidéos de validation envoyées au client), toutes **« Statut : En attente
retour Willy »** au 18/05/2026 :
- 🧭 Tella 1 — Navigation et parcours devis (`36470bd6-69cd-8172-a79c-f31e12bd5a98`) — 4 questions
- 🛠️ Tella 2 — Pages produits, kits et options (`36470bd6-69cd-81b6-814a-d2313cd5b52a`) — 9 questions
- 🎯 Tella 3 — Identité, configurateur, contenus (`36470bd6-69cd-8101-b683-c014cb3de43f`) — 19 questions

**32 questions posées au client par ce canal, aucune réponse enregistrée dans Notion.** Chaque
note porte la mention : *« Sans retour passé la deadline, c'est considéré comme validé et on
avance. »* — aucune trace n'indique si cette clause a été activée.

### ⚠️ Angles morts à connaître avant d'exploiter ce dossier

1. **Le MCP Figma n'expose pas les commentaires.** Il n'existe pas de `figma.comments`. Or le
   CR du 27/07 acte que Willy **annote directement sur Figma** pendant août
   (« pendant l'absence, il annote sur Figma »). **Un volume inconnu de retours client réside
   donc dans les commentaires Figma et est totalement absent de ce dossier.** C'est
   vraisemblablement le gisement le plus important qui manque ici.
2. **Le MCP Figma ne permet pas d'énumérer les pages d'un document.** Appelé sans `nodeId`, il
   ne retourne qu'une seule page (`0:1 — 🏞️ Cover`). Les trois canvas exploités l'ont été
   parce que leurs IDs étaient fournis dans la commande. **Il peut exister d'autres canvas dans
   ce fichier que je n'ai aucun moyen de découvrir.**
3. Aucune absence constatée ici ne doit être conclue de ces deux limites.

---

# Livrable 1 — Fiche par page

Ordre : arborescence du site, puis pages système, puis overlays.

Légende des statuts SEO : tels qu'ils figurent dans la base « Contenu & SEO » au 22/09/2026.

---

## Accueil

- **node ID desktop :** `6904:192` (Homepage) · **node ID mobile :** `8469:33059`
- **Décrite au CDC v1.5 :** oui, abondamment. Section « 4bis. Page Accueil — structure &
  priorisation (révision juin 2026) » qui fixe 10 sections dans l'ordre. Verbatim du statut
  déclaré : *« Statut : maquette desktop intégrée dans Figma (frame Homepage, node 6564-4126),
  contenu Nicolas réinjecté. Mobile responsive à faire. »*
  - ⚠️ **Le node ID cité par le CDC (`6564-4126`) ne correspond à aucun nœud du canvas desktop
    actuel.** Le frame Homepage est `6904:192`. Le CDC pointe vers un nœud disparu ou renommé.
  - ⚠️ Le CDC dit « Mobile responsive à faire ». **Le frame mobile `8469:33059` existe** (390 ×
    11278). L'affirmation du CDC est périmée.
- **Contenu SEO :** deux lignes distinctes dans la base, ce qui est en soi une anomalie —
  « Accueil » (P1, statut vide, maj 07/06/2026, pas de lien Figma) et **« Accueil rédigé par
  Nicolas » (P1, statut « À relire – Thomas », maj 12/09/2026, lien Figma présent)**.
- **FAQ rattachée :** 13 questions (`Page de destination = Accueil`), dont **2 à valider par
  Willy** (les deux portent sur le délai de livraison) et 11 en brouillon.
  - ⚠️ 4 de ces 13 questions sont explicitement libellées « (LP Bordeaux) » alors qu'elles sont
    rattachées à « Accueil ». La base ne distingue pas Accueil et LP Bordeaux.
  - ⚠️ 2 doublons assumés : « Combien de temps pour la livraison ? (Accueil) » et
    « (Accueil — variante) » ; idem pour « Puis-je installer moi-même mon kit ? ».
  - Le CDC prévoit « FAQ (5 questions : compatibilité, personnalisation, délai, auto-montage,
    démontable) ». La base en propose 13 pour cette page.
- **Placeholders restants :** 1 bloc `Lorem ipsum dolor sit amet…` dans la section finale
  `Cta` (`6904:2915`, chemin `Homepage > Frame 2147227122 > Cta > Container > Container`).
- **Décisions déjà prises :**
  - Ordre des 10 sections orienté conversion — CDC v1.5, 10/06/2026.
  - CTAs hero « Demander un devis » (primaire) + « Configurer mon van » (secondaire) — CDC v1.5.
  - Hero **validé explicitement en visio** : *« Conserver le principe hero actuel : sobre, mood
    fort, peu d'infos. Willy valide explicitement l'animation et le café qui fume. »* — Retours
    visio Willy 29/07.
  - Les 3 colonnes de la home validées en visio — 29/07 : *« J'ai un van, je monte moi-même » /
    « J'ai un van, vous vous installez » / « Je pars de zéro »*.
  - Direction artistique **validée** — CR 27/07 : *« La direction artistique (DA) est validée :
    typos, couleurs, ambiances jugées très bien. »*
  - Remplacer le van rouge IA du hero par une photo réelle fournie par Willy — 29/07, confirmé
    10/09 (*« Concernant le van de profil, ce qu'il veut, c'est en mettre un autre et avec son
    vrai kit »*).
  - Décliner 3-4 variantes saisonnières du hero (été midi / lever de soleil / nuit) — 29/07,
    élargi le 10/09 (*« différentes variations selon les saisons et les heures d'une journée…
    open noël ou en automne »*).
- **Décisions contradictoires :**
  - **Délai affiché.** CDC v1.5 §4bis, engagement n°3 : *« Livraison six semaines garantie »*.
    CDC v1.5 §2quater : Kit DIY 2-3 sem · Atelier 1-2 sem · Clé en main 6-12 sem. Le CDC
    **relève lui-même la contradiction** en §10 sans la trancher.
  - **Délai de réponse.** CDC v1.5 §2quinquies impose *« Réponse sous 48h »* partout. Le
    contenu Nicolas affiche *« Réponse sous 24h »* (relevé au §10 du CDC). **En Figma, les deux
    coexistent sur un même écran** : le frame `6972:1887` affiche « Réponse sous 48h · Devis
    gratuit · Sans engagement » dans le corps, et en pied de page *« \* Réponse sous 24 h hors
    week-end et périodes de congés »*.
  - **3e CTA « Clé en main » dans le hero.** Retours wireframes 12/05 : *« Thomas a noté "pas
    certain, mauvais conseil UX/CRO". Statu quo : 2 CTAs (Kit DIY + Atelier) »* — coché fait.
    CDC v1.5 §4bis : 2 CTAs, mais « Demander un devis » + « Configurer mon van », pas
    « Kit DIY + Atelier ». Les deux sources décrivent deux paires de CTAs différentes.
  - **Ordre des items navbar.** Retours wireframes 12/05, non coché : *« Ordre cible :
    Aménagements ▼ · Configurateur · Réalisations · Boutique ▼ · À propos »*. CDC v1.5 §4 :
    *« Aménagements ▾ Configurateur Boutique ▾ Contact 🔍 »*. Figma actuel (cf. fiche
    Navigation) : *« Aménagements ▾ Configurateur Nos vans Catalogue ▾ Contact »*. **Trois
    arborescences de menu différentes dans trois sources.**
- **Questions ouvertes :**
  - Position de la section `6904:2858` — Willy, 10/09 : *« Il demande si cette section ce serait
    pas mieux juste en dessous de ce titre [`6904:2784`] »*. Aucune réponse enregistrée.
  - Vidéo parcours client : Willy parle de « 10 secondes », la note du 29/07 estime « 45 à 60 s ».
    *« À recadrer avant le tournage. »* Non tranché.
  - Hiérarchie de la carte Kit DIY (grande carte = mise en avant) : *« Est-ce voulu ? L'Atelier
    ou Clé en main est-il plus rentable et mériterait-il la première place ? »* — 12/05, non coché.

---

## Page Offre / Formules (hub)

- **node ID desktop :** `7559:4971` (Kapam / Boutique / Page offre (formules)) ·
  **node ID mobile :** `8850:140342`
- **Décrite au CDC v1.5 :** oui. §2ter : *« Porte "Découverte" (orientée service) — Page Offres
  qui présente les 3 formules (Kit DIY / Atelier / Clé en main) avec leur logique, un tableau
  comparatif, et des CTAs contextuels. »*
  - ⚠️ Le CDC la nomme « Page Offres » et la situe hors Boutique. En Figma elle est **dans la
    section `🛒 Boutique`** et nommée `Kapam / Boutique / Page offre (formules)`.
- **Contenu SEO :** deux lignes « À rédiger » P1 — « Offres — Aménagements » et
  « Offre (template) », toutes deux maj 02/06/2026, **sans lien Figma**.
- **FAQ rattachée :** aucune question ne porte cette page de destination.
- **Placeholders restants :** aucun nœud `Lorem`/`XXXX` détecté dans ce frame.
- **Décisions déjà prises :**
  - Modèle « B+ boutique-first avec page Offres éditoriale » — CDC v1.5 §2ter, tranché workshop
    16/05/2026.
  - Une page unique pour les 3 niveaux, rappelés ailleurs par encarts contextuels — CR 23/04 :
    *« 1 page "Offres" pour les 3 niveaux… plutôt que 3 pages séparées. »*
  - Tableau comparatif des 3 tunnels — Brief Tableau comparatif, 11/05, statut *« Proposition
    V1 — à valider avec Willy (prix, délais, garantie). »*
  - Lien « Comparer nos offres → » présent en bas du mega menu Boutique (constaté sur
    `7213:55199`).
- **Décisions contradictoires :**
  - **Une page ou trois ?** CR 23/04 tranche *« plutôt que 3 pages séparées »*. CDC v1.5 §4
    liste **à la fois** « Page Offres (unique, éditoriale) » **et** « 3 pages catégorie SEO
    (sous /amenagements/) : Kit DIY, Atelier, Clé en main ». Figma tranche dans le troisième
    sens : la page hub existe **et** 3 pages Formule existent (section `📦 Formules (Lot C)`).
  - **Section « Vous allez sûrement aimer » (3 cartes à 949 €).** 12/05 : *« pertinente sur
    cette page hub ? … la section peut être redondante. À trancher. »* Non coché. Le même
    document propose plus bas 3 produits réels sourcés (79 € / 49,90 € / 70 €) pour la
    remplacer, avec mention *« ✅ Source confirmée »* — mais la case « à trancher » reste ouverte.
  - **Prix de départ du Kit DIY.** CDC v1.5 §2quater : *« À partir de 2 000 € »*. Brief Tableau
    comparatif 11/05 : *« À partir de 2 140 € »*. Retours wireframes 12/05 signale *« "3 000 €"
    Kit DIY page Offre »*. Modale Figma `7553:4943` : *« À partir de 2 000 € »*. **Quatre
    chiffres pour la même ligne.**
- **Questions ouvertes :** garantie Kit DIY — *« 2 ans pièces uniquement sur le Kit DIY (car pas
  de pose Kapam) ou 2 ans pièces + main-d'œuvre quand même ? »* (11/05, non répondu).

---

## Formule / Kit à monter

- **node ID desktop :** `7777:57428` · **node ID mobile :** `8850:11970`
- **Section Figma :** `📦 Formules (Lot C)` — **le nom de section porte la mention `[EN COURS]`.**
- **Décrite au CDC v1.5 :** **non, pas sous ce nom.** Le CDC ne connaît que « Kit DIY ». Le
  renommage est décidé le 29/07 (cf. Journal des décisions) et appliqué en Figma. Le CDC n'a pas
  été mis à jour depuis le 10/06.
- **Contenu SEO :** « Formule — Kit à monter », **À rédiger**, P1, type « Page catégorie SEO »,
  maj 25/08/2026, lien Figma présent, **pas de mot-clé principal, pas de slug**.
- **FAQ rattachée :** 3 questions (`Page de destination = Kit à monter`), **0 à valider**,
  3 en brouillon, toutes rédigées par Thomas : poids d'un kit complet, préparation du véhicule
  avant montage, passage des câbles et durites.
- **Placeholders restants :** 1 bloc de brief rédactionnel, verbatim :
  *« H1, 300 à 500 mots, mot-clé principal à définir. Ce bloc porte le référencement de la page
  "Kit à monter" : il doit expliquer la formule avec les te[…] »*
- **Décisions déjà prises :** intitulé et sous-titre arrêtés le 29/07 — *« Kit à monter — Vous
  avez un van, vous l'installez vous-même »*.
- **Décisions contradictoires :** le nom. « Kit DIY » (CDC v1.5, base FAQ option
  « Kit à monter » mais modales Figma « Kit DIY », footer Figma « Kits DIY ») vs
  « Kit à monter » (Figma section Formules, base SEO, base FAQ).
- **Questions ouvertes :** mot-clé principal non défini ; slug non défini.

---

## Formule / Kit posé en atelier

- **node ID desktop :** `7780:12445` · **node ID mobile :** `8850:12608`
- **Décrite au CDC v1.5 :** non sous ce nom (CDC : « Atelier »).
- **Contenu SEO :** « Formule — Kit posé en atelier », **À rédiger**, P1, maj 25/08/2026, lien
  Figma présent, pas de mot-clé, pas de slug.
- **FAQ rattachée :** 0 question ne porte cette page de destination (l'option
  « Kit posé en atelier » existe au schéma mais n'est utilisée par aucune ligne).
- **Placeholders restants :** même bloc de brief rédactionnel (*« H1, 300 à 500 mots, mot-clé
  principal à définir… page "Kit posé en atelier" »*).
- **Décisions déjà prises :**
  - Intitulé arrêté le 29/07 : *« Kit posé en atelier — Vous avez un van, nos artisans
    l'aménagent près de Bordeaux »*.
  - Formulation « construit avec nos artisans près de Bordeaux » **validée en visio** le 29/07.
- **Décisions contradictoires :** délai. CDC §2quater « 1-2 semaines en atelier » ; Brief
  comparatif 11/05 « 2 à 6 semaines (selon disponibilité atelier) » ; FAQ injectée 13/05
  « 2-6 sem Atelier » ; modale Figma `7544:4927` « 1 à 2 semaines ». **Deux fourchettes
  incompatibles coexistent.**
- **Questions ouvertes :** *« Lieu Atelier : ouvert tous les jours pour les sessions
  accompagnées, ou uniquement vendredis comme la visite (cf. page Contact) ? »* (11/05).

---

## Formule / Van aménagé prêt à partir

- **node ID desktop :** `7780:12561` · **node ID mobile :** `8850:13198`
- **Décrite au CDC v1.5 :** non sous ce nom (CDC : « Clé en main »).
- **Contenu SEO :** « Formule — Van aménagé, prêt à partir », **À rédiger**, P1, maj 25/08/2026,
  lien Figma présent, pas de mot-clé, pas de slug.
- **FAQ rattachée :** 11 questions sous `Page de destination = Van aménagé`, dont **6 à valider
  par Willy** (VASP camping-car, budget, neuf vs occasion, autonomie frigo, autonomie
  électrique, autonomie eau) et 5 en brouillon.
- **Placeholders restants :** même bloc de brief rédactionnel.
- **Décisions déjà prises :** intitulé arrêté le 29/07 — *« Van aménagé, prêt à partir — Nous
  fournissons le véhicule et l'aménagement »*. Motif explicitement consigné : *« Le bug est le
  possessif : "Votre van entièrement aménagé" sur le Clé en main alors que justement ce n'est
  pas le sien. »*
- **Décisions contradictoires :** l'intitulé rejeté le 29/07 (« Votre van entièrement aménagé
  par nos artisans ») est précisément celui que les Retours wireframes du 12/05 avaient
  **injecté comme amélioration** : *« Item Clé en main "Nous transformons votre van selon vos
  envies" → "Votre van entièrement aménagé par nos artisans" (plus haut de gamme) »*. Une
  correction de mai a été défaite en juillet.
- **Questions ouvertes :** *« Homologation VASP "incluse" sur Clé en main : vraiment ou option
  payante ? »* (11/05). En Figma, le configurateur `8388:55146` facture **« Homologation VASP
  389 € »** en ligne séparée — ce qui répond de fait « option payante », sans trace de validation.

---

## Configurateur

- **node IDs desktop :** 6 écrans refondus « Config v4 »
  - `8267:62041` — 1.1 Véhicule · choix de la marque
  - `8267:60564` — 1.2 Véhicule · choix du modèle
  - `8267:60314` — 1.3 Véhicule · longueur & montage
  - `8267:63622` — 2.1 Kit, options & devis (1440 × 7694)
  - `8388:55146` — 3.1 Vos coordonnées
  - `8388:95687` — 3.2 Demande envoyée
  - Overlays (`8399:28930`) : Drawer Résumé, Drawer Option, Drawer Option non compatible,
    Lightbox PDF, Drawer Comparateur de kits (`8323:78426`)
  - Ressources d'écran (`8399:28931`) : Vue 3D point d'intérêt (`8327:94717`, 7900 × 750),
    packshots, `[TEST] Kit Travel — photo realiste, vue plongeante`
- **node IDs mobile :** `8850:147964` / `8850:149265` / `8850:149370` / `8850:149515` /
  `8850:150850` / `8850:150980` — section nommée **`🧭 Configurateur — Mobile 390 [base à retravailler]`**
- **Composants dédiés :** 16, canvas `🧭 Config v4 — Composants` (`8067:1189`).
- **Décrite au CDC v1.5 :** **oui, et c'est la contradiction centrale du dossier.** Verbatim,
  §3 Out of scope : *« Refonte du configurateur (réutilisation du configurateur existant
  intégrant des éléments 3D). »* §5 : *« Statut : configurateur existant réutilisé (intégrant
  des éléments 3D), pas de refonte complète. »* Changelog v1.3 : *« Configurateur : confirmé
  hors scope refonte (existant réutilisé, intègre éléments 3D). »*
  - **Six écrans refondus, une nomenclature « v4 », 16 composants dédiés et une section mobile
    existent dans le fichier.** Le CDC déclare hors scope ce qui est produit.
- **Contenu SEO :** 5 lignes « Configurateur — Étape 1 » à « Étape 5 », toutes **À intégrer
  Figma**, P1, maj 20/08/2026.
  - ⚠️ **Désalignement de nomenclature.** La base SEO parle de 5 étapes ; Figma en compte 6
    écrans répartis sur 3 étapes (1.1/1.2/1.3 · 2.1 · 3.1/3.2).
  - ⚠️ Les notes de la base SEO pointent vers une **v3** : *« Lien recalé le 20/08/2026 sur le
    configurateur v3 (ancien nœud 7411-18282 supprimé). Étape 4 = Options du kit. Un visuel y
    est encore en attente ("Type crédence — visuel à venir"). »* et *« …ancien nœud 7411-18280
    supprimé. Étape 2 = Véhicule. »* Les liens Figma stockés (`7888-18285`, `7888-17999`) ne
    correspondent à aucun nœud du canvas desktop actuel. **La base SEO documente un
    configurateur v3 disparu ; Figma porte un v4.**
- **FAQ rattachée :** **0 question.** L'option `Page de destination = Configurateur` existe au
  schéma de la base mais **aucune des 78 lignes ne l'utilise**.
- **Placeholders restants :** aucun `Lorem`/`XXXX`. Le frame `8309:51281` est explicitement
  marqué `[TEST]`.
- **Décisions déjà prises :**
  - Configurateur maintenu comme item de menu principal — CDC v1.5 §4.
  - Un prototype interactif a été développé — CR 27/07 : *« Un prototype de configurateur a été
    développé via Claude, permettant de simuler la configuration d'un kit étape par étape. »*
  - Méthode arrêtée — CR 27/07 : *« tester et affiner le prototype en interne de façon
    itérative, plutôt que de tout modéliser en arbre décisionnel au préalable. »*
  - **Cible finale explicitée** — CR 27/07 : *« aboutir à une version la plus précise possible
    (V2, V3…), puis en faire une documentation complète pour le développeur, qui recréera le
    configurateur avec le nouveau design. »*
  - Règle métier identifiée en direct — CR 27/07 : *« l'option "décoration des parois" devrait
    être grisée quand le client choisit un kit à monter lui-même, car KAPAM ne fait cette
    prestation que lors d'un dépôt de véhicule. »*
  - V2 — impact délai des options : *« afficher au moment du choix que telle finition rallonge
    le délai. C'est le vrai levier de conversion sur le sujet délais. »* (29/07)
  - Photo réelle demandée sur la section configurateur — Willy 10/09 : *« Mettre une vraie photo
    avec un changement de décors sur le mobilier »* (`7025:4310`).
- **Décisions contradictoires :**
  - **Hors scope vs refondu** (ci-dessus). Le CR du 27/07 dit que le développeur *« recréera le
    configurateur avec le nouveau design »* — l'opposé exact du « out of scope : refonte » du CDC.
  - **Nombre et découpage des étapes.** Retours wireframes 13/05 : *« 5 étapes nommées et
    logiques (Choix véhicule / Options intérieures / Accessoires / Récapitulatif / Contact /
    Devis) »* — la parenthèse en liste 6 pour « 5 étapes ». Base SEO : 5 étapes. Figma v4 :
    3 étapes / 6 écrans. **Trois découpages.**
  - **Étape finale.** 13/05, question non tranchée : *« Flux : "Contact / Devis" en étape 5
    plutôt que "Récapitulatif" — devis = sortie du flux vers conversion. À valider ce flux avec
    Willy : la 5e étape est-elle l'envoi du devis directement, ou un récapitulatif puis
    envoi ? »* Figma v4 tranche de fait (3.1 coordonnées → 3.2 confirmation, le résumé étant un
    drawer latéral permanent), sans trace de validation.
  - **Sortie vers « Mon devis ».** CDC §5 : *« Sortie : ajoute la configuration complète à "Mon
    devis" (drawer), avec option "Modifier la configuration". »* En Figma, l'écran 3.1 est un
    **formulaire d'envoi autonome** avec son propre bouton « Envoyer ma demande » et son propre
    total — il ne verse pas dans le drawer « Mon devis » (cf. Livrable 4).
- **Questions ouvertes :** les 6 questions du chapitre 2 de Tella 3 (cartographie, Kit Travel
  sur gros fourgons, variante Triply T3, longueurs Expert/Jumpy, vocabulaire des longueurs,
  mobilier bicolore) — toutes sans réponse. Section mobile marquée « base à retravailler ».

---

## Boutique / Catalogue — Index

- **node ID desktop :** `8636:46929` (`Kapam / Boutique — Index — v5 (loop)`), section
  `🛍️ Boutique — Index (v5) [référence boutique]` · **node ID mobile :** `8826:134088`
- **Décrite au CDC v1.5 :** partiellement. Le CDC décrit une entrée « Boutique ▾ » et 4
  catégories, mais **ne liste pas de page d'index Boutique** dans §4 « Pages ». La mention
  « [référence boutique] » dans le nom de section indique un rôle de gabarit de référence non
  documenté.
- **Contenu SEO :** ligne « Boutique », **À rédiger**, P1, maj 25/08/2026, **sans lien Figma**.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** aucun `Lorem`/`XXXX` détecté.
- **Décisions déjà prises :** wording des 4 cards de sub-nav arrêté le 13/05 (Kits aménagement /
  Accessoires / Pièces & électricité / Nouveautés), avec micro-descriptions et liens
  `/boutique/…`.
- **Décisions contradictoires :** **le nom de la rubrique, sur trois niveaux simultanés.**
  Constaté en Figma le 22/09 :

  | Emplacement | Libellé constaté | Source |
  |---|---|---|
  | Barre de navigation | **« Catalogue »** + item séparé **« Nos vans »** | instance Nav/Header rendue dans `6972:1887` |
  | Mega menu Boutique | **« Nos kits Kapam »**, **« Véhicules »**, CTA **« Voir toute la boutique »** | `7213:55199` |
  | Pied de page | **« Boutique »**, **« Kits DIY »**, **« Atelier »**, **« Clé en main »** | instance Footer dans `6972:1887` |
  | CDC v1.5 §4 | **« Boutique ▾ »**, catégories « Kits aménagement », « Véhicules à vendre » | CDC 10/06 |
  | Retours 13/05 | « Kits aménagement », « Nouveautés » | 13/05 |

  Le débat est ouvert explicitement le 29/07 : *« Décision "Boutique" → "Produit" ? Demande
  Willy/Mathilde (appels récurrents de clients qui croient pouvoir commander en ligne).
  ⚠️ Le symptôme vient du site actuel — le nouveau a déjà les 4 garde-fous devis. Renommer
  risque de brouiller la distinction Boutique (produits) / Aménagements (formules) du modèle
  B+. Alternatives à tester : Catalogue, Nos kits. »* — **le renommage a été appliqué en Figma
  (« Catalogue ») sans trace de décision, et sans être répercuté au pied de page ni au mega
  menu.** Le même item du 29/07 exigeait : *« Valider avec Nicolas avant tout renommage —
  impacte la nav, tous les fils d'Ariane des pages boutique et le maillage SEO »* et
  *« Répercuter la décision sur les breadcrumbs de toutes les pages produits/catégories une
  fois tranchée. »* Aucune trace de cette validation.
- **Questions ouvertes :**
  - 4 catégories définitives ? (13/05, non répondu ; « Mobilier » vs « Accessoires » évoqué)
  - « Véhicules à vendre » dans le mega menu Boutique ou en navbar top ? (13/05) —
    **Figma a tranché de fait en le remontant en navbar sous « Nos vans »**, sans trace.
  - Module Bestsellers : sélection figée ou dynamique, et selon quelle règle ? (13/05)

---

## Catégorie — v6 (gabarit, 4 états)

- **node IDs desktop :** `8820:49455` ① Défaut · `8824:134285` ② Filtres actifs · Renault Trafic
  L1H1 · `8824:134421` ③ Aucun résultat · `8824:134557` ④ Catalogue dense · Accessoires
- **node IDs mobile :** `8829:5471` · `8850:151082` · `8850:151214` · `8850:151346`
- **Décrite au CDC v1.5 :** **non.** Le CDC ne mentionne ni gabarit de catégorie, ni états
  vides, ni système de filtres. Le nom de section précise `(grammaire Boutique v5)`.
- **Contenu SEO :** deux lignes « Catégorie — Accessoires » et « Catégorie — Pièces &
  électricité », **À rédiger**, P1, maj 25/08/2026, liens Figma présents, sans mot-clé ni slug.
- **FAQ rattachée :** 19 questions portent `Page de destination = Catégorie` (voir pages
  nommées ci-dessous), dont **6 à valider par Willy**.
- **Placeholders restants :** aucun `Lorem`/`XXXX` détecté.
- **Décisions déjà prises :** ajout de filtres demandé le 13/05 (*« Ajouter des filtres :
  Modèle véhicule, Neuf/Occasion, Prix, Kilométrage, Type d'aménagement »*) — l'état ② les
  matérialise.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** articulation entre ce gabarit v6 et les 4 pages catégorie nommées
  (ci-dessous), qui coexistent dans le fichier.

---

## Catégorie — Kit aménagement van

- **node ID desktop :** `7008:11154` · **node ID mobile :** `8850:144076`
- ⚠️ **Anomalie de structure Figma :** ce frame, ainsi que les trois suivants, est **enfant du
  frame `Boutique / Produit — Kit (template)` (`7025:10460`)**, et non enfant direct de la
  section `🛒 Boutique`. Les 4 pages catégorie nommées sont imbriquées dans une page produit.
- **Décrite au CDC v1.5 :** partiellement — §4 liste `/boutique/kits-amenagement` comme
  catégorie, sans nommer cette déclinaison SEO.
- **Contenu SEO :** « Boutique - Kit aménagement de van », **seul statut « Intégré » de toute
  la base avec 3 réalisations**, P1, mot-clé `kit aménagement van`, slug
  `https://www.kapam.fr/kits-amenagement-van-combi-utilitaires.html`, **maj 22/09/2026 (la plus
  récente de la base)**.
- **FAQ rattachée :** parmi les 19 « Catégorie », 6 sont libellées « (Van) » ou génériques van.
- **Placeholders restants :** 1 bloc `Lorem ipsum` dans `Call to Action Section` (`7352:3885`).
- **Décisions déjà prises :**
  - Remonter les produits plus haut — 29/07 : *« Remonter les produits plus haut (demande
    Mathilde, accord Willy + Thomas). Piste retenue : sélecteur compact de kits juste sous le
    hero → contenu SEO en dessous → grille produits complète plus bas. »*
  - Remonter les articles — Willy 10/09, sur ce nœud précis : *« Sur la page catégorie, il faut
    remonter les articles. »* (`7008-11154`)
  - **Corrections factuelles appliquées entre le 18/09 et le 22/09** (diff des archives) :

    | Avant (archive 18/09) | Après (archive 22/09) |
    |---|---|
    | « Pas d'homologation VASP camping-car nécessaire » | « Pas d'homologation VASP camping-car nécessaire **mais possible sur demande** » |
    | « Montage et démontage facile et rapide » | « Montage et démontage facile et rapide **(option « Pack Amovible »)** » |
    | « Habillages intérieurs complémentaires » | « Habillages **latéraux et plafonds** » |
    | « Plaques de cuisson » | « Plaques de cuisson **(gaz ou électrique)** » |
    | — | + « Jusqu'à 60 L d'eaux propres », « Chauffe-eau (évier / douche) », « Prises 12 V et 230 V », « Batterie auxiliaire lithium », « Mention — réponse 24h » |

    Ces deux premières corrections tracent directement les retours de Willy du 10/09
    (*« Homologation possible, mais non obligatoire »* et *« Une partie des aménagements sont
    amovibles (souvent que la partie banquette) »*).
- **Décisions contradictoires :**
  - Le bloc ajouté le 22/09 est **« Mention — réponse 24h »**, alors que le CDC impose 48h.
  - Section « Ce qui nous démarque ? » : le CDC §6bis pose trois options (factoriser / page
    dédiée / retirer) et conclut *« Décision à prendre »*. Non tranchée.
- **Questions ouvertes :**
  - *« Vérifier avec Nicolas : les pages catégorie actuelles sont-elles de vraies pages
    catégorie ou des landings SEO rédigées pour "kit aménagement van" ? C'est ce qui explique
    que les produits soient si bas. »* (29/07, non répondu)
  - Bannière de kits « figée » (sticky) pendant le scroll — idée Willy, *« ⚠️ Vérifier
    l'encombrement en mobile »*, non tranchée.
  - Il manque le 4e kit (Combi) — signalé le 29/07 *« n'en affiche que 3 »*, et de nouveau le
    10/09 sur `7213-54573` : *« On est actuellement sur le Travel à l'écran, donc c'est le kit
    T2-T3 qui manque ici »*. Signalé deux fois à deux mois d'écart.

---

## Catégorie — Kit aménagement Trafic

- **node ID desktop :** `7407:586` (enfant de `7025:10460`) · **node ID mobile :** `8850:145939`
- **Archive 22/09 :** `9011:41319`
- **Décrite au CDC v1.5 :** non nommément.
- **Contenu SEO :** « Boutique - Kit aménagement Trafic », **À intégrer Figma**, P1, mot-clé
  `kit aménagement Trafic`, slug `https://www.kapam.fr/kits-amenagement-trafic`, maj 12/09/2026.
- **FAQ rattachée :** 5 questions libellées « (Trafic) » parmi les 19 « Catégorie », dont
  **2 à valider** (délai de réception, carte grise).
- **Placeholders restants :** 1 bloc `Lorem ipsum` (`7407:784`), section `Frame 2147227123`.
- **Décisions déjà prises :** page SEO par véhicule ciblé validée — 12/05 : *« Excellente
  approche : page SEO par véhicule ciblé (cible "kit aménagement trafic" 1 000/mois, position 12
  actuellement) »*. Confirmé par l'audit SEO (position moyenne 12, volume 1 000/mois).
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** prix des cards, photos, breadcrumb, CTA des cards — *« Mêmes
  remarques que pour van/fourgon »* (12/05, non cochées).

---

## Catégorie — Kit aménagement de fourgon

- **node ID desktop :** `7402:15` (enfant de `7025:10460`) · **node ID mobile :** `8850:146643`
- **Archive 22/09 :** `9011:41153`
- **Décrite au CDC v1.5 :** non nommément.
- **Contenu SEO :** « Boutique - Kit aménagement de fourgon », **À intégrer Figma**, P1,
  mot-clé `kit aménagement fourgon`, slug `https://www.kapam.fr/kit-amenagement-fourgon.html`,
  maj 12/09/2026.
- **FAQ rattachée :** 5 questions libellées « (Fourgon) », dont **2 à valider** (délai, statut
  carte grise).
- **Placeholders restants :** 1 bloc `Lorem ipsum` (`7402:213`).
- **Décisions déjà prises :** aucune spécifique consignée.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** idem Trafic.

---

## Catégorie — Véhicules à vendre / Nos vans

- **node ID desktop :** `7407:789` (enfant de `7025:10460`) · **node ID mobile :** `8850:147344`
- **Archive 22/09 :** `9011:41485`
- **Décrite au CDC v1.5 :** oui, longuement (§5 « Véhicules à vendre (clé en main, non stock) »),
  avec principe (pas de stock, sur commande), champs à afficher, UX, CMS et mentions.
- **Contenu SEO :** « Véhicules à vendre (page catégorie) », **À intégrer Figma**, P1, mot-clé
  `van aménagé`, slug `/van-amenage-a-vendre`, maj 12/09/2026.
  - L'audit SEO qualifie `van aménagé` de **49 500 recherches/mois, « non réf »** — le plus gros
    potentiel identifié du site.
- **FAQ rattachée :** voir fiche « Formule / Van aménagé » (11 questions, 6 à valider).
- **Placeholders restants :** 1 bloc `Lorem ipsum` (`7407:987`).
- **Décisions déjà prises :**
  - H1 « Nos vans aménagés » validé comme ciblant « van aménagé » (12/05).
  - Renommage en navbar : item **« Nos vans »** constaté en Figma (cf. fiche Boutique).
- **Décisions contradictoires :**
  - **Emplacement de la page.** CDC §10, question ouverte déclarée : *« Page "Véhicules à
    vendre" : à intégrer dans Boutique (catégorie dédiée) ou dans Aménagements (entrée Clé en
    main) ? Maillage SEO à valider avec Nicolas. »* Figma répond par une **troisième option non
    envisagée au CDC** : un item de navbar de premier niveau (« Nos vans »). Le mega menu
    Boutique la range pourtant encore en colonne 2 sous « Véhicules ».
  - **Prix plancher.** 12/05 : *« Ambiguïté prix : "À partir de 8 500 €" pour un van neuf
    aménagé est très bas. C'est le prix de l'aménagement seul ? Du véhicule + aménagement ? À
    clarifier dans la fiche, c'est central pour la confiance. »* CDC §2quater annonce « À partir
    de 25 000 € » pour le Clé en main. **8 500 € vs 25 000 €**, non réconciliés.
- **Questions ouvertes :** 4 cards véhicules identiques (toutes Trafic L2H2 8 500 €) à
  remplacer ; filtres ; indication de disponibilité (En stock / Sur commande / Réservé) ;
  6 logos constructeurs placeholder ; breadcrumb manquant ; reformulation de la section
  configurateur en bas de page (12/05, aucune cochée).

---

## Produit — Kit (template)

- **node ID desktop :** `7025:10460` · **node ID mobile :** `8850:141990` (390 × 17698, la plus
  longue page mobile du fichier)
- **Décrite au CDC v1.5 :** oui — §4 « Fiches produit (template enrichi avec comparatif kits,
  options spécifiques/génériques, upsell montage atelier) » et §5 « Fiche produit kit — Upsell
  montage atelier » avec wording complet.
- **Contenu SEO :** ligne « Page produit », **À rédiger**, P2, maj 02/06/2026, sans lien Figma.
- **FAQ rattachée :** 23 questions `Page de destination = Fiche produit`, dont **11 à valider
  par Willy** — le plus gros bloc de la base. Thèmes : prix (3), financement/paiement (3),
  carte grise/VASP (2), délai (1), montage (1), compatibilité (1).
- **Placeholders restants :**
  - 1 bloc `Lorem ipsum` dans `Call to Action Section` (`7352:3958`).
  - Relevés le 13/05, non cochés : *« BOM massive (~100 list items pour le tableau "Options
    spécifiques") : vraies pièces du Kit Madel »*, *« Placeholders prix "XXXXX €" »*,
    *« Photos placeholders (galerie principale + miniatures + storytelling) »*.
- **Décisions déjà prises :**
  - CTA « Ajouter au devis », jamais « Ajouter au panier » — validé 13/05 et confirmé en visio
    29/07 (*« Le système de devis et les garde-fous "aucun achat en ligne" / "Voir mon devis" »*
    listés en « Validé en visio — rien à faire »).
  - 4 colonnes avantages harmonisées (Made in France / Garantie 2 ans / Homologation VASP /
    Réversible) — injecté 13/05.
  - Storytelling : 3 mentions **Simple Vans → Kapam**, mention **« système Quick Slot » retirée**,
    « notre atelier » → « notre atelier de Bordeaux » — injecté 13/05.
  - Titre CTA atelier : « Confier le montage à un atelier monteur » → **« Pas envie de monter
    vous-même ? »** — injecté 13/05.
  - Bandeau bas : inversions Heading/Text corrigées — injecté 13/05.
  - Comparateur de kits revu (logos + bouton Découvrir) **validé en visio** 29/07 : *« bien plus
    clair qu'avant »*.
- **Décisions contradictoires :**
  - **Le comparateur de kits.** Validé le 29/07 (*« bien plus clair qu'avant »*) — mais le CR du
    **27/07**, deux jours plus tôt, le juge *« trop chargé et difficile à lire : "ça fait mal aux
    yeux" »* et demande une refonte inspirée du comparateur d'iPhones d'Apple (*« plus épuré,
    structuré en titre + trois/quatre colonnes en scroll vertical, sans images »*). **Deux
    verdicts opposés à 48 h d'intervalle sur le même composant.** Il existe par ailleurs un
    `Drawer — Comparateur de kits` (`8323:78426`) dans les overlays configurateur.
  - **Homologation VASP.** Le wording Figma affiche « Homologation VASP / Démarches
    accompagnées ». 13/05 : *« VASP est une homologation du véhicule entier, pas d'un kit… à
    valider juridiquement »*. Willy, 10/09 : *« Homologation possible, mais non obligatoire.
    Mobilier répondant un exigence des normes pour validation »*. Le configurateur la facture
    389 €. **Quatre formulations, aucune arbitrée.**
  - **Réversibilité.** Colonne Figma « Réversible / Démontable sans trace » ; Brief comparatif
    11/05 « Démontable sans trace » pour les 3 formules ; Willy 10/09 : *« Non, il faut percer
    la carrosserie pour certaines fixation »* et *« Une partie des aménagements sont amovibles
    (souvent que la partie banquette) »*. **Le retour client contredit frontalement le wording
    des maquettes.** Corrigé sur la page catégorie entre le 18 et le 22/09 (« option Pack
    Amovible ») ; statut sur la fiche produit non vérifié.
  - **Garantie.** Figma « Garantie 2 ans / Pièces et main-d'œuvre ». Willy 10/09 évoque une
    *« garantie à vie sur le mobilier »* (`7025:10538`) : *« Un intérêt que la garantie à vie sur
    le mobilier soit aussi mise en avant sur la page catégorie globale des kits ? »*.
    **2 ans vs à vie**, non réconcilié.
- **Questions ouvertes :**
  - *« Quand on clique sur Best, pouvons nous avoir les couleurs du stratifié ? »* (Willy, 10/09,
    `7243-16173`)
  - *« Lit permanent que sur modèle rallongé de type L2 »* (Willy, 10/09, `7460-11194`) — à
    répercuter.
  - *« J'ai eu plein de retours de texte ici [`7460-11142`] — il faudrait garder le sens mais
    parfois raccourcir les textes »* (Willy, 10/09).
  - *« Ou réception de votre véhicule pour prestation de montage dans nos ateliers »* (Willy,
    10/09, `7644-11710`).
  - *« Il manque le quatrième produit. Celui des kits pour T4, T5 »* (Willy, 10/09, `7178-10549`).
  - Légende du tableau « Options spécifiques vs génériques » (que signifient ✅ / ❌ / ❓ ?) —
    13/05, non coché.
  - Tableau dense (SEO) vs simplifié (conversion) — Tella 2 Q2, sans réponse.
  - « 4,9/5 » affiché sans aucun avis — *« Note 4,9/5 retirée : pas d'avis publiés sur la
    boutique à ce jour »* (13/05) ; Willy 10/09 : *« Il faut envoyer la trame pour les avis à
    Willy afin qu'il puisse lui-même récupérer les avis auprès de ses clients. »*

---

## Produit / Trafic L1H1 (fiche véhicule)

- **node ID desktop :** `7407:16925` · **node ID mobile :** `8850:143475`
- **Décrite au CDC v1.5 :** partiellement — §5 la pose en **option V2** : *« Option V2 : page
  détail par véhicule (SEO + conversion). V1 peut rester en liste si on veut minimiser le
  périmètre. »* La page existe : **l'option V2 a été réalisée sans que le CDC l'acte.**
- **Contenu SEO :** « Véhicule à vendre Trafic L1H1 », **À intégrer Figma**, P1, mot-clé
  `Trafic L1H1`, slug `https://www.kapam.fr/renault-trafic-l1h1-van-amenage`, maj 12/09/2026.
  Une seconde ligne « Véhicule à vendre — 2ᵉ modèle (à définir) » est **À rédiger**, P2, sans
  lien Figma. Une ligne « Véhicule (template) » est **À rédiger**, P1, sans lien Figma.
- **FAQ rattachée :** « Peut-on cuisiner à bord du Trafic L1H1 ? » (brouillon), plus les
  questions transverses « Van aménagé ».
- **Placeholders restants :** 1 bloc `Lorem ipsum` (`7407:17269`).
- **Décisions déjà prises :** aucune spécifique consignée.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** résidus de template signalés le 12/05 en **🚨 Urgence absolue** :
  *« Fiche véhicule à vendre — résidus de template Legally dans la section "Véhicule disponible
  chez / OFFICE 2 / 123 Legal Avenue, NY" à virer + carte de NYC à remplacer »* — **non coché**.
  Je n'ai pas pu vérifier si le résidu persiste (les libellés en question ne figurent plus parmi
  les nœuds texte du frame actuel, mais ils pouvaient être portés par des composants).

---

## Réalisations — Index

- **node ID desktop :** `7569:5219` · **node ID mobile :** `8850:133165`
- **Décrite au CDC v1.5 :** oui — §4 « Réalisations (galerie) », rétrogradée en footer : *« reste
  accessible via le mega-menu Aménagements (sidebar "Histoires récentes")… plus page dédiée
  accessible par le footer. »*
- **Contenu SEO :** « Réalisations », **À rédiger**, P2, maj 02/06/2026, sans lien Figma.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** aucun `Lorem`/`XXXX` détecté.
- **Décisions déjà prises :** 1 page catégorie + 1 page par réalisation, enrichies de
  témoignages et de liens vers kits/options utilisés — CR 23/04.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** Tella 3 Q18 — *« Donne-moi une liste de 5 à 8 projets emblématiques »*
  — liste restée vide.

---

## Réalisations — 4 fiches

| Fiche | Desktop | Mobile | Contenu SEO |
|---|---|---|---|
| Julien & Marie — Trafic L2H1 | `7843:19916` | `8850:133497` | — (non listée) |
| Ford Transit Custom | `8276:47791` | `8850:134135` | **Intégré**, P2, mc `Ford Transit Custom aménagé`, maj 12/09 |
| Volkswagen T5-T6 | `8293:48968` | `8850:134830` | **Intégré**, P2, mc `Van aménagé volkswagen`, maj 12/09 |
| Volkswagen Combi T2-T3 | `8297:50428` | `8850:135529` | **Intégré**, P2, mc `combi volkswagen aménagé`, maj 12/09 |

- **Décrites au CDC v1.5 :** génériquement (« 1 page par réalisation »), sans nommer les 4.
- **Contenu SEO — réalisations prévues mais non maquettées :** la base liste 6 réalisations
  supplémentaires **À rédiger** sans lien Figma : Citroën Jumpy, Fiat Ducato, Fiat Scudo,
  Mercedes Vito, Peugeot Expert, Renault Trafic (toutes P2, maj 25/08/2026), plus
  « Réalisation (template) » P2. Le CR du 23/04 les priorise : *« opportunités : Peugeot Expert
  (~1900 recherches/mois), Citroën Jumpy, Fiat Ducato (~1300 recherches/mois) »*.
- **Placeholders restants :** relevés le 12/05 sur la fiche réalisation, non cochés :
  *« Témoignage client réel : remplacer le placeholder par un vrai témoignage (de Julien & Marie
  si réels, sinon autre client) »*, *« Photos réelles × 5 : hero + 3 placeholders carrousel +
  photo témoignage »*.
- **Décisions déjà prises :** 3 stats par réalisation (6 sem / 18 mois / 2 personnes) — *« OK
  pour cette fiche, à personnaliser par réalisation au remplissage CMS »* (12/05).
- **Questions ouvertes :** les témoignages dépendent du script client non rédigé — 29/07 :
  *« Rédiger le script / mini-mail de guidage pour les ~15 clients satisfaits identifiés par
  Willy… Item le plus rentable et le moins cher de toute la liste. »* Confirmé en attente par
  Willy le 10/09 (trame des avis à lui envoyer).

---

## Actualités — Blog (listing)

- **node ID desktop :** `7567:5111` · **node ID mobile :** `8849:131017`
- **Décrite au CDC v1.5 :** oui — §4 « Blog (actualités + guides/comparatifs evergreen) », et
  mise à jour SEO/GEO : *« Blog = "Actualités + Guides/Comparatifs" (GEO) : intégrer des formats
  evergreen (guides + comparatifs), pas seulement des actus. »*
- **Contenu SEO :** « Actualités », **À rédiger**, P3, maj 02/06/2026, sans lien Figma.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** aucun détecté.
- **Décisions déjà prises :** aucune ferme.
- **Questions ouvertes :** Tella 3 Q16 (qui rédige le blog ?) et Q17 (cadence tenable sur
  12 mois, de 1/semaine à 1/2 mois) — **sans réponse**. Sans elles, le dimensionnement de la
  rubrique reste indéterminé (la note le dit : *« Sans tes réponses, je ne peux pas dimensionner
  correctement les sections. »*).

---

## Actualités — Catégorie (template)

- **node ID desktop :** `8423:29369` · **node ID mobile :** `8849:131319` (nommé
  « Catégorie — Choisir son véhicule »)
- **Décrite au CDC v1.5 :** **non.** Aucune mention d'une page catégorie de blog.
- **Contenu SEO :** non listée sous ce nom.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** aucun détecté.
- **Questions ouvertes :** la taxonomie du blog (catégories) n'est arrêtée nulle part ; le
  mobile en nomme une (« Choisir son véhicule ») que le desktop laisse générique.

---

## Actualités — Article

- **node IDs desktop :** `7782:14033` (Template — structure éditoriale) et `8836:38353`
  (« Vérifier la compatibilité » — exemple rédigé)
- **node IDs mobile :** `8849:131837` (Template) et `8849:131590` (exemple rédigé)
- **Décrite au CDC v1.5 :** génériquement via « Blog ».
- **Contenu SEO :** deux lignes — « Article (template) » **À rédiger** P3 sans lien Figma, et
  « Blog — Article (template) » **À rédiger** P2 type « Éditorial » **avec** lien Figma, maj
  31/07/2026. Doublon de fiche.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** 1 nœud de consigne, verbatim : *« Nom de l'auteur et rôle — à
  définir avec Willy : signature Kapam ou signature nominative de l'atelier. Impacte le maillage
  "À propos". »*
- **Décisions déjà prises :** aucune ferme.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** stratégie d'auteur (auteur unique « Équipe Kapam » vs auteur par
  article) — posée le 12/05, reposée dans la maquette, jamais tranchée. Par ailleurs l'auteure
  fictive « Aurélie Bonhomme » et la marque « Van Mello » ont été retirées en attente
  d'arbitrage (Tella 2 Q4).

---

## À propos

- **node ID desktop :** `7915:36607` (le nom du frame contient une parenthèse orpheline :
  `Kapam / Institutionnel / À propos)`) · **node ID mobile :** `8848:9678`
- **Décrite au CDC v1.5 :** oui — §4, rétrogradée : *« À propos : footer + mention discrète dans
  le mega-menu Aménagements ("En savoir plus" en bas). »*
- **Contenu SEO :** « À propos », **À intégrer Figma**, P2, mot-clé `aménageur de van`, slug
  `https://www.kapam.fr/le-concept-kapam.html`, maj 12/09/2026. L'audit SEO attribue à cette
  page les mots-clés `aménageur de van` (1 300/mois, position 45), `aménageur de fourgon camping
  car` (1 000/mois, position 23), `aménageur de fourgon` (590/mois, position 13).
- **FAQ rattachée :** aucune.
- **Placeholders restants :** 1 bloc `Lorem ipsum` dans la section `Cta` (`7915:38977`).
- **Décisions déjà prises :**
  - 4 stats « Notre succès » injectées le 12/05 : 350+ vans depuis 2011 · 14 années · 50+
    modèles · 100 % fait main — toutes marquées *« Paquet 2 — Inventé avec intention, à valider
    avec Willy »*, verbatim : *« J'ai mis des valeurs réalistes pour éviter d'afficher du Relume
    bidon, mais ces chiffres et dates sont des hypothèses. »*
  - 3 valeurs (Artisanat / Durabilité / Sur-mesure) — injectées, à valider.
  - Timeline 4 dates (2011 / 2015 / 2020 / 2026) — injectée, à valider.
  - Parti pris visuel — CR 27/07 : *« Pas d'humains sur les photos produits… Les humains
    apparaissent uniquement dans trois contextes : témoignages clients, contenu atelier, et
    présentation de la marque KAPAM. »*
- **Décisions contradictoires :**
  - **Nombre de stats.** CDC §2quinquies liste **4** stats « source de vérité » (350+ / 14 /
    100 % / 50+). CDC §6bis décrit le composant partagé BrandImage avec **3** stats (350+ / 14 /
    100 %). Retours 12/05 : *« Si Willy veut 3 stats au lieu de 4, supprimer la card 4
    manuellement »*. Non tranché.
  - **BrandImage est-il un composant partagé ?** CDC §6bis l'affirme. Retours 12/05 en doutent :
    *« ⚠️ Effet de bord probable : BrandImage semble être un composant partagé… Vérifier sur la
    homepage que ces stats ont aussi changé — si oui : excellent… Si non : refaire l'injection
    sur la home. »* **La vérification n'est consignée nulle part.**
- **Questions ouvertes :** Tella 3 Q1→Q9 (chiffres, année de fondation, valeurs, timeline,
  récit de fondation inventé, composition et rôles de l'équipe, photos) — **9 questions, aucune
  réponse**. Le récit de fondation est explicitement signalé comme inventé.

---

## FAQ (page centralisée)

- **node ID desktop :** `7517:4378` · **node ID mobile :** `8848:12463`
- **Décrite au CDC v1.5 :** oui, c'est l'une des sections les plus détaillées (§5 « FAQ —
  structure + mode de fonctionnement ») : base unique de 20-30 questions, deux niveaux
  d'affichage (page centralisée par thématiques + FAQ contextuelles par page), administration
  sans dépendance dev, URL stable `/faq`.
- **Contenu SEO :** « FAQ », **À rédiger**, P2, maj 02/06/2026, sans lien Figma.
- **FAQ rattachée :** **la base entière — 78 questions.** Répartition :

  | Statut | Nombre |
  |---|---|
  | Brouillon | **44** |
  | À valider par Willy | **34** |
  | Validée | **0** |
  | À rédiger | **0** |

  Par thème, les 34 « à valider » : garantie/VASP **10**, technique **6**, délais **6**,
  prix **5**, financement **5**, montage **1**, livraison **1**.

  Par page de destination : Fiche produit 23 (11 à valider) · Catégorie 19 (6) ·
  Accueil 13 (2) · Van aménagé 11 (6) · Transverse 9 (**9 — la totalité**) · Kit à monter 3 (0).

  - ⚠️ **Aucune question n'est validée.** Le champ « Commentaire Willy » est vide sur les
    78 lignes.
  - ⚠️ **Le volume a triplé par rapport au CDC** : celui-ci prévoit *« une base unique de
    questions/réponses (20-30 questions au démarrage) »*. Elle en compte 78.
  - ⚠️ Deux options de `Page de destination` sont **inutilisées** : `Configurateur` et
    `Kit posé en atelier`.
  - ⚠️ Répartition par rédacteur : Nicolas et Thomas. Aucune ligne « Rédigée par Willy ».
- **Placeholders restants :** aucun `Lorem`/`XXXX` détecté dans le frame.
- **Décisions déjà prises :** principe « FAQ centrale + FAQ contextuelles » appliqué
  systématiquement sur les pages clés — CDC, mise à jour SEO/GEO.
- **Décisions contradictoires :** aucune sur le principe.
- **Questions ouvertes :**
  - **Outil d'administration — question posée par le client, sans réponse.** Willy, 10/09 :
    *« Concernant les FAQ, y a t'il un fichier existant avec les questions réponses, que je
    puisse modifier et ajouter des éléments ? »* La note enregistre l'hésitation interne :
    *« Est-ce qu'on lui propose un système de FAQ comme on l'a fait sur la dial, ou un Google
    Doc ou un page Notion éditable… ? »*
  - **Questions du site actuel non reprises.** Notes projet internes, `[2026-08-27]` :
    *« Email reçu (Willy) : question sur FAQ (certaines Q/R du site actuel pas encore dans
    Notion) → à traiter / répondre. »* Une réponse est partie le 28/08 ; le périmètre final
    n'est pas consigné.
  - Les 7 hypothèses factuelles injectées dans les réponses le 13/05 (VASP, garantie 2 ans,
    matériaux, isolation, électrique, « 30 minutes au téléphone », délais) — toutes
    *« à confirmer/corriger »*, aucune confirmée.

---

## Contact

- **node ID desktop :** `7524:4488` · **node ID mobile :** `8848:12741`
- **Décrite au CDC v1.5 :** oui — §4 « Contact : page dédiée (formulaire long + coordonnées +
  carte atelier) », et §2sexies donne les coordonnées de référence.
- **Contenu SEO :** « Contact », **À rédiger**, P2, maj 02/06/2026, sans lien Figma.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** aucun détecté.
- **Décisions déjà prises :**
  - Coordonnées canoniques fixées au CDC §2sexies : 11 rue Fond Bonnet, 33240 Saint-Gervais ;
    06 31 70 49 87 ; contact@kapam.fr ; vendredis 9h-17h sur rendez-vous uniquement.
  - Canaux sociaux retenus : **Facebook + Instagram uniquement** (@kapam.amenagement), pas de
    X/LinkedIn/YouTube/TikTok — CDC §2sexies.
  - Géographie canonique : *« "Gironde, près de Bordeaux" ou "atelier de Bordeaux". Jamais
    "Landes" (résidu de wireframe Relume) ni "Sud-Ouest" (trop vague). »*
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** les trois points remontés le 12/05, non cochés —
  - *« Téléphone mobile (06 31 70 49 87) : c'est un mobile, pas un fixe pro. Pour un site
    refonte premium, mérite un échange : on garde le 06, ou il faut une ligne fixe dédiée ? »*
    (repris au CDC §2sexies comme « décision à valider Willy »)
  - *« Horaires très restrictifs (vendredis uniquement sur RDV) : à afficher très clairement
    pour ne pas frustrer les visiteurs, ou bien ouvrir d'autres créneaux sur RDV ? »*
  - *« Sous-titre H1 : la frame actuelle n'a pas de sous-titre… ton à valider (sobre/pro "Notre
    équipe vous répond sous 48h" vs chaleureux "Un projet en tête ? Parlons-en") »*

---

## Revendeurs & Partenaires

- **node ID desktop :** `7531:4699` · **node ID mobile :** `8848:13041`
- **Décrite au CDC v1.5 :** oui — §4 « Revendeurs / Partenaires : carte interactive + annuaire
  des revendeurs », ajoutée en **v1.1 le 26/03/2026** (*« demande client »*).
- **Contenu SEO :** « Revendeurs — Partenaires », **À rédiger**, P3, maj 02/06/2026, sans lien
  Figma.
- **FAQ rattachée :** aucune.
- **Placeholders restants :** 2 cards partenaires fictives rédigées le 13/05 comme contenu
  provisoire — « Atelier Van Sud-Ouest » (Toulouse) et « VanLife Store Lyon », avec téléphone
  fictif `05 61 XX XX XX` et email fictif. Logos « Placeholder gris ».
- **Décisions déjà prises :**
  - Breadcrumb ajouté (case cochée le 13/05).
  - Brouillon complet de section « Devenir partenaire » rédigé le 13/05 : tagline, H2,
    3 types de partenariat, 4 apports Kapam, 5 conditions, formulaire de 12 champs, bandeau de
    3 micro-stats. **Statut : « à valider Willy », non validé.**
- **Décisions contradictoires :**
  - **Existence du réseau.** CDC §10 : *« Réseau de partenaires monteurs : la fiche Kit
    mentionne "Kapam dispose de partenaires monteurs partout en France". Réseau réel ou wording
    aspirationnel ? »* Retours 13/05 : *« 🆘 À valider Willy — Le réseau de partenaires est-il
    réellement actif, ou en cours de constitution ? »* CR 27/07 : *« Réflexion en cours (avec
    Mathilde) sur un réseau de prestataires et monteurs agréés pouvant revendre les kits »* —
    donc **en projet**, pas actif. Le wording des maquettes affirme pourtant l'existence.
  - **Opportunité stratégique de la page.** CR 27/07 consigne un **conflit d'intérêt interne
    explicite** : *« Enjeu stratégique interne : risque de perdre des grosses ventes (clients
    qui traversent la France pour une installation chez KAPAM) si le réseau d'installateurs est
    trop mis en avant. »* À mettre en regard du CDC qui prévoit une « carte interactive +
    annuaire » sans réserve. La note du 13/05 va jusqu'à : *« Décision stratégique : si Kapam ne
    veut pas recruter activement, retirer toute la section. »*
  - **La page existait-elle déjà ?** Action item du 27/07 : *« Willy : vérifier si une page
    prestataires / installateurs agréés KAPAM était déjà prévue dans l'arborescence et répondre
    mercredi »* — alors que le CDC l'a ajoutée en v1.1 le 26/03 à la demande du client. Aucune
    réponse consignée.
- **Questions ouvertes :**
  - Politique de contact : redirection Kapam (contrôle des leads) vs contact direct vs hybride —
    les 2 cards placeholder ont été conçues pour trancher visuellement. Non tranché.
  - Marge revendeur réelle, formation (gratuite/payante/durée), volume minimum, exclusivité
    géographique, droit d'entrée — tous « à valider Willy », 13/05.
  - Logos partenaires manquants — Willy, 10/09 : *« Concernant la liste des logos partenaires,
    en fait, il en manque. Il faut regarder sur le site de Kapam toutes les marques partenaires
    et faire une requête de la liste des logos. »* (`7213-47067`)
  - Fonctionnalité de carte administrable (ajout par GPS/adresse, activation/désactivation) —
    évoquée le 27/07, non spécifiée.

---

## LP locale Bordeaux

- **node ID desktop :** `7407:18100` (1440 × 10579) · **node ID mobile :** `8850:136229`
  (390 × 14494)
- **Décrite au CDC v1.5 :** oui, mais uniquement comme intention : *« Page locale (SEO) :
  ajouter une page locale type "aménagement van Bordeaux" (et prévoir le pattern si
  déclinaison). »* et §4 *« Page locale SEO (pattern type "aménagement van Bordeaux",
  déclinable) »*. **Le CDC ne sait pas qu'elle est maquettée desktop et mobile.**
- **Contenu SEO :** « LP locale Bordeaux », **À intégrer Figma**, P1, mot-clé
  `aménagement van Bordeaux`, slug `https://www.kapam.fr/amenagement-van-bordeaux`, maj
  12/09/2026. L'audit SEO donne 140 recherches/mois, position 3 (page d'accueil).
- **FAQ rattachée :** 4 questions explicitement libellées « (LP Bordeaux) », toutes rattachées
  à `Page de destination = Accueil` (les kits démontables, la personnalisation, les véhicules
  compatibles, et « Où faire aménager son van à Bordeaux ? »). **Aucune option
  `Page de destination = LP Bordeaux` n'existe dans la base.**
- **Placeholders restants :** 1 bloc `Lorem ipsum` dans la section `Cta` (`7407:20452`).
- **Décisions déjà prises :** le pattern est déclarable comme « déclinable » (CDC), mais aucune
  autre ville n'est listée nulle part.
- **Décisions contradictoires :** aucune relevée.
- **Questions ouvertes :** déclinaison à d'autres villes — prévue au CDC, jamais instruite.

---

## Ressources (4 pages) — **absentes du CDC**

| Page | Desktop | Mobile |
|---|---|---|
| Kapam / Ressources / Guides | `8427:30000` | `8849:9679` |
| Kapam / Ressources / Compatibilité | `8427:30121` | `8849:9992` |
| Kapam / Ressources / Installation | `8427:30163` | `8849:11621` |
| Kapam / Ressources / Garantie | `8427:30205` | `8849:11819` |

- **Décrites au CDC v1.5 :** **non. Aucune mention, sous aucun nom.** La section Figma s'appelle
  `📚 Ressources (footer)` — elles sont donc pensées comme une rubrique de pied de page, que le
  CDC §4 (« Items rétrogradés en footer ») ne connaît pas : il n'y liste que Réalisations,
  À propos et FAQ.
- **Contenu SEO :** **aucune des 4 n'est listée dans la base Contenu & SEO.**
- **FAQ rattachée :** aucune formellement. Thématiquement, elles recouvrent 4 des 8 thèmes de la
  base FAQ (technique/compatibilité, montage, garantie/VASP, livraison) — **risque de
  redondance non instruit.**
- **Placeholders restants :** aucun `Lorem`/`XXXX` détecté.
- **Décisions déjà prises :** aucune trace.
- **Questions ouvertes :** existence même de la rubrique, son articulation avec la FAQ et avec
  la section « Ce qui nous démarque ? », son rattachement SEO. **Rien dans aucune source
  dépouillée n'explique d'où viennent ces 4 pages.**

---

## Pages légales

| Page | Desktop | Mobile | Contenu SEO |
|---|---|---|---|
| Mentions légales (template) | `7527:4605` | `8843:8019` | 2 lignes : « Mentions légales » À rédiger P3 sans lien ; — |
| CGV | `7776:11317` | `8844:8161` | 2 lignes : « CGV » À rédiger P3 · « Légal — CGV » À rédiger P1 avec lien Figma |
| Confidentialité | `7777:21258` | `8844:8359` | 2 lignes : « Politique de confidentialité » P3 · « Légal — Politique de confidentialité » P1 |
| Cookies | `7778:11864` | `8844:8556` | « Légal — Politique cookies » À rédiger P1, lien Figma, maj 31/07 |
| Retours & SAV | `7779:21821` | `8844:8809` | 2 lignes : « Politique retours — SAV » P3 · « Légal — Politique retours & SAV » P1 |

- **Décrites au CDC v1.5 :** partiellement — §4 liste *« Mentions légales / Confidentialité /
  CGV »*. **Cookies et Retours & SAV sont absents du CDC** alors que les deux pages existent
  desktop et mobile.
- **Placeholders restants :** aucun `Lorem`/`XXXX`. Les CGV portent du texte rédigé (relevé
  verbatim dans les nœuds : *« Les présentes conditions générales de vente régissent les
  relations entre Kapam, atelier d'aménagement de vans installé en Gironde, près de
  Bordeaux… »*) — conforme à la géographie canonique du CDC.
- **Décisions contradictoires :** **la base SEO contient des doublons systématiques** — chaque
  page légale y figure deux fois, une fois en P3 « Page produit » sans lien Figma (créée
  02/06), une fois en P1 « Légal » avec lien Figma (maj 31/07). Le typage « Page produit » pour
  des pages légales est manifestement une scorie.
- **Questions ouvertes :** qui rédige le juridique (aucun responsable renseigné dans la base) ;
  les CGV parlent de vente alors que le site ne vend pas (pas de checkout).

---

## Système — 404 et Recherche

- **404 :** desktop `7780:22674` · mobile `8844:9022`. Contenu SEO : « Système — Page 404 »,
  **À intégrer Figma**, P3, lien Figma, maj 31/07/2026.
- **Recherche — 7 écrans desktop :**
  - `7975:20780` — 1 · Panneau (clic sur la loupe)
  - `7975:33971` — 2 · Suggestions (saisie en cours)
  - `7781:66157` — 3 · Chargement
  - `7781:13141` — 4 · Résultats
  - `7969:20487` — 5 · Résultats filtrés (Kits)
  - `7781:65971` — 6 · Aucun résultat
  - `7969:33903` — **7 · Sans JavaScript (fallback)**
- **Recherche — mobile : 5 écrans seulement** (`8850:139206`, `8850:139415`, `8850:139661`,
  `8850:139882`, `8850:140116`). **Les écrans 1 (Panneau) et 2 (Suggestions) n'ont pas
  d'équivalent mobile** — ce sont précisément les deux overlays.
- **Contenu SEO :** « Système — Recherche (7 écrans) », **À rédiger**, P3, lien Figma, maj
  20/08/2026.
- **Décrites au CDC v1.5 :** **quasiment pas.** Le CDC mentionne *« 🔍 Recherche : champ de
  recherche global »* (§4) et *« Recherche globale »* (§5, une ligne). **Sept écrans, dont un
  fallback sans JavaScript, ont été produits pour une ligne de CDC.** Aucune page 404 n'est
  mentionnée nulle part dans le CDC.
- **FAQ rattachée :** aucune.
- **Questions ouvertes :** le périmètre de la recherche (que cherche-t-on : produits, articles,
  réalisations, FAQ ?), les filtres disponibles (l'écran 5 filtre sur « Kits »), et la raison
  d'être du fallback sans JS ne sont documentés nulle part.

---

## Pages du parcours devis

Traitées en détail au **Livrable 4**. Rappel des node IDs :

| Élément | Desktop | Mobile |
|---|---|---|
| Devis / Checkout — Envoyer ma demande | `6972:1887` | `8850:13790` |
| Devis / Confirmation | `6975:1968` | `8850:14001` |
| 🪟 Modals — Flux devis (13 modales) | `7537:4919` | **absent** |
| 🪟 Overlays & Modals (drawers, mega menus, toasts) | `7626:11258` | **absent** (seul `8899:28569` Filtres et tri — Drawer — Mobile existe) |
| 🪟 Overlays — Boutique (A1→A4) | `7815:18762` | **absent** |
| Configurateur 3.1 / 3.2 | `8388:55146` / `8388:95687` | `8850:150850` / `8850:150980` |

- **Décrites au CDC v1.5 :** le CDC décrit le **fonctionnement** (drawer, formulaire 1-écran,
  lightbox de finalisation, confirmation) mais **ne liste aucune de ces pages/modales dans §4
  « Pages »**. La section `🪟 Modals — Flux devis` contredit frontalement le CDC (cf. Livrable 4).

---

## Écart desktop / mobile — synthèse

Le CDC v1.5 dit, à propos de l'accueil : *« Mobile responsive à faire »*, et §6 :
*« Responsive complet (drawer Mon devis plein écran sur mobile). »*

État constaté au 22/09/2026 :

- **Existent en desktop et en mobile :** Homepage, 3 Formules, 4 Catégories nommées, Catégorie
  v6 (4 états), Boutique Index, Produit Kit template, Produit Trafic L1H1, Page offre,
  Réalisations (index + 4 fiches), Blog (listing + catégorie + 2 articles), À propos, FAQ,
  Contact, Revendeurs, LP Bordeaux, 4 Ressources, 5 Légal, 404, Devis Checkout + Confirmation,
  Configurateur (6 écrans).
- **Existent en desktop seulement :** les 13 modales du flux devis, les overlays & modals
  (mega menus, drawers Mon devis vide/rempli, toast, modales d'onboarding et de compatibilité),
  les overlays Boutique (A1→A4), les écrans Recherche 1 et 2, les archives, la section
  NAVIGATION, les masters Header/Footer.
- **Existe en mobile seulement :** `Filtres et tri — Drawer — Mobile` (`8899:28569`).
- **Le drawer « Mon devis plein écran sur mobile »** exigé au CDC §6 **n'a pas d'équivalent
  mobile identifiable** : le seul drawer mobile est celui des filtres.
- La section configurateur mobile est explicitement marquée **`[base à retravailler]`**.

---

# Livrable 2 — Journal des décisions

Toutes sources confondues, par ordre chronologique. « Contredite depuis ? » se lit strictement :
une source postérieure dit autre chose, sans qu'aucune trace n'arbitre.

| Date | Décision | Source | Contredite depuis ? | Par quoi |
|---|---|---|---|---|
| 19/02/2026 | Cadre du projet : site premium, vitrine + boutique unifiées, configurateur, Webflow, 9 900 € HT, 14-17 semaines | Proposition commerciale (via CDC v1.0, 14/03) | Non | — |
| 14/03/2026 | Création du CDC v1.0 | CDC changelog | Non | — |
| 26/03/2026 | Ajout de la page **Revendeurs / Partenaires** (carte interactive + annuaire), sur demande client | CDC v1.1 | **Oui** | CR 27/07 : conflit d'intérêt interne (« risque de perdre des grosses ventes ») ; retours 13/05 : « si Kapam ne veut pas recruter activement, retirer toute la section » |
| 26/03/2026 | Willy configure Google Search Console et y ajoute Nicolas | Note Nicolas × Willy | Non | — |
| 03/04/2026 | Audit SEO livré : 15 % des pages en 1ʳᵉ page ; 282 indexées / 301 non indexées ; 46 pages sans canonique ; >25 titles trop longs ; 288 images trop lourdes ; accueil en http + https | Audit SEO | Non | — |
| 09/04/2026 | **Approche e-commerce sans checkout** : catégories + fiches, présentation par besoin plutôt que par noms techniques | CDC v1.2 §2bis | Non | — |
| 09/04/2026 | Blog = actualités **+ guides/comparatifs evergreen** (GEO) | CDC v1.2 | Non | — |
| 23/04/2026 | **1 page « Offres » unique** pour les 3 niveaux, rappelés ailleurs par encarts contextuels, « plutôt que 3 pages séparées » | CR 23/04 | **Oui** | CDC v1.3 (16/05) ajoute « 3 pages catégorie SEO » ; Figma crée la section `📦 Formules (Lot C)` avec 3 pages |
| 23/04/2026 | Réalisations : 1 page catégorie + 1 page par réalisation, enrichies (témoignages, liens kits/options) | CR 23/04 | Non | — |
| 23/04/2026 | 3 pages catégorie SEO : « kit aménagement van », « kit aménagement fourgon », « kit aménagement trafic » | CR 23/04 | Non | Réalisé (4 pages, + Véhicules à vendre) |
| 23/04/2026 | **Les 4 kits au cœur du business : Travel, Mado, Madel, Combi T2/T3** | CR 23/04 | Partiellement | Tella 2 Q9 demande encore si Madel/Mado sont 2 produits ou une typo — la question reste ouverte après que le CR les ait listés comme distincts |
| 23/04/2026 | Page unique par kit + **sélecteur de finition (Soft/Triply/Best)** mettant à jour visuels et prix | CR 23/04 | Non | Willy, 10/09, demande d'y ajouter les couleurs du stratifié sur « Best » |
| 23/04/2026 | Couper Google Ads (120-150 €/mois) une fois le SEO en place | CR 23/04 | Non | Aucune trace d'exécution |
| 11/05/2026 | Tableau comparatif des 3 formules (10 critères) — **V1 explicitement « à valider avec Willy »** | Brief Tableau comparatif | — | Jamais validé |
| 12/05/2026 | Hero : **2 CTAs** (statu quo), le 3ᵉ CTA « Clé en main » écarté comme « mauvais conseil UX/CRO » | Retours wireframes (coché) | **Oui** | CDC v1.5 §4bis décrit 2 CTAs mais différents (« Demander un devis » + « Configurer mon van ») |
| 12/05/2026 | Mega menu Aménagements : « Trois approches » → **« Nos formules »** ; colonne 2 → « En savoir plus » | Retours wireframes | Non | — |
| 12/05/2026 | « notre atelier français » → **« notre atelier de Bordeaux »** (SEO local) | Retours wireframes | Non | Conforme au CDC §2quinquies |
| 12/05/2026 | Clé en main : « Nous transformons votre van selon vos envies » → **« Votre van entièrement aménagé par nos artisans »** | Retours wireframes | **Oui** | 29/07 rejette ce libellé (« le bug est le possessif ») et impose « Van aménagé, prêt à partir » |
| 12/05/2026 | Contact : « Nous répondons à vos questions rapidement » → **« Réponse sous 48h »** | Retours wireframes | **Oui** | Pied de page Figma actuel : « Réponse sous 24 h hors week-end » ; contenu Nicolas : 24h |
| 12-13/05/2026 | **261 textes injectés sur ~24 pages/composants** en 2 sessions | Retours wireframes | Non | — |
| 13/05/2026 | **Simple Vans → Kapam** (3 occurrences), **« Quick Slot » retiré**, Van Mania / Van Mello retirés — en attente d'arbitrage | Retours wireframes + Tella 2 | — | Jamais arbitré (Tella 2 Q3→Q6 sans réponse) |
| 13/05/2026 | Note **« 4,9/5 » retirée** : pas d'avis publiés à ce jour | Retours wireframes | Non | Willy, 10/09, demande la trame pour collecter de vrais avis |
| 13/05/2026 | 4 colonnes avantages harmonisées (Made in France / Garantie 2 ans / Homologation VASP / Réversible) | Retours wireframes | **Oui** | Willy 10/09 : « il faut percer la carrosserie pour certaines fixation » (contredit Réversible) ; « garantie à vie sur le mobilier » (contredit 2 ans) |
| 13/05/2026 | Wording sub-nav Boutique : **Kits aménagement · Accessoires · Pièces & électricité · Nouveautés** | Retours wireframes | **Oui** | Mega menu Figma actuel : « Nos kits Kapam · Accessoires · Pièces & électricité · Nouveautés » ; CDC §4 : « Kits aménagement, Accessoires, Pièces & électricité, Véhicules à vendre » (pas de Nouveautés) |
| 13/05/2026 | Mega menu Boutique conçu **en miroir** du mega menu Aménagements (3 colonnes + CTA bas) | Retours wireframes | Non | Réalisé |
| 13/05/2026 | Configurateur : « 0 modif texte nécessaire — page déjà propre » | Retours wireframes | **Oui** | Configurateur entièrement refondu en v4 (6 écrans, 16 composants) |
| 16/05/2026 | **Modèle d'architecture « B+ boutique-first avec page Offres éditoriale »** | CDC v1.3, workshop | Non | — |
| 16/05/2026 | **Définition des 3 formules** : Kit DIY = client a van + monte ; Atelier = client a van + Kapam installe ; Clé en main = Kapam fournit tout | CDC v1.3 | Non sur le fond | **Oui sur les noms** (29/07) |
| 16/05/2026 | **Architecture du menu** : 4 items (Aménagements, Configurateur, Boutique, Contact) + recherche + 2 CTAs | CDC v1.3 | **Oui** | Figma actuel : 5 items, « Boutique » → « Catalogue », ajout de « Nos vans » |
| 16/05/2026 | **Abandon du hub à étapes** au profit d'un formulaire unique 1-écran en lightbox | CDC v1.3, « TRANCHÉ » | **Oui** | Figma : section `🪟 Modals — Flux devis` contient `HUB — Devis Step 1 (choix formule)` (`7553:4943`) |
| 16/05/2026 | **Pas de quiz orienteur** — « Pédagogie sur les formules portée par la page Offres et le tableau comparatif (pas de quiz orienteur) » | CDC v1.3, « TRANCHÉ » | **Oui** | Figma : `Aide à choisir — Q1` (`7554:4959`), `Q2` (`7554:4968`), `Recommandation` (`7554:4977`) — un quiz à 2 questions avec écran de recommandation |
| 16/05/2026 | **Wording « Mon devis »** : jamais panier / achat / commande / caisse | CDC v1.3, « TRANCHÉ » | Non | Respecté partout où vérifié ; validé en visio 29/07 |
| 16/05/2026 | Drawer « Mon devis » : persistance **localStorage 30 jours**, modale d'onboarding au 1ᵉʳ ajout, bandeau pédagogique, compatibilité véhicule × kit | CDC v1.3 §5 | Non | Composants présents (`6993:11173`→`6993:11177`, `7800:15403`) |
| 16/05/2026 | **Configurateur confirmé hors scope refonte** (existant réutilisé, éléments 3D) | CDC v1.3, changelog | **Oui, frontalement** | 6 écrans « Config v4 » + 16 composants + mobile en Figma ; CR 27/07 : le développeur « recréera le configurateur avec le nouveau design » |
| 16/05/2026 | Identité : positionnement premium artisanal, ton sobre/factuel, 3 valeurs, géographie canonique « Gironde, près de Bordeaux », jamais « Landes » ni « Sud-Ouest » | CDC v1.4 §2quinquies | Non | — |
| 16/05/2026 | Canaux sociaux : **Facebook + Instagram uniquement** | CDC v1.4 §2sexies | Non | — |
| 16/05/2026 | Promesse standard **« Réponse sous 48h · Devis gratuit · Sans engagement »** | CDC v1.4 | **Oui** | Pied de page Figma « Réponse sous 24 h » ; bloc « Mention — réponse 24h » ajouté sur la page catégorie le 22/09 |
| 10/06/2026 | **Page Accueil : 10 sections dans un ordre orienté conversion** | CDC v1.5 §4bis | Non | — |
| 10/06/2026 | Contrainte SEO : **contenu repliable rendu en HTML + masqué CSS, jamais en JS/AJAX** | CDC v1.5 | Non | — |
| 10/06/2026 | Workflow SEO : Nicolas rédige dans la base Notion, **Thomas réinjecte dans Figma** (Nicolas n'édite pas Figma) | CDC v1.5 §8 | Non | Confirmé 29/07 (intégration page par page) |
| 10/06/2026 | Correction globale des références **« Pierre » → « Willy »** | CDC v1.5 changelog | Non | — |
| 27/07/2026 | **Direction artistique validée** (typos, couleurs, ambiances) | CR 27/07 | Non | Reconfirmé 29/07 : « Aucun retour bloquant sur la direction artistique » |
| 27/07/2026 | **Pas d'humains sur les photos produits** ; humains réservés aux témoignages, contenu atelier et présentation de marque ; exception d'une main en bordure | CR 27/07 | Non | — |
| 27/07/2026 | Les visuels IA servent de **brief pour le photographe** (cadrage + ambiance) | CR 27/07 | Non | 29/07 : « Ne plus générer de visuels IA de mobilier : Willy a déjà tous les kits en rendu 3D » |
| 27/07/2026 | **Comparateur de kits à refondre** — « trop chargé… ça fait mal aux yeux », inspiration Apple | CR 27/07 | **Oui, à 2 jours** | 29/07 : comparateur revu « validé en visio — rien à faire », « bien plus clair qu'avant » |
| 27/07/2026 | Configurateur : prototype développé via Claude, affiné en interne de façon itérative, **puis documenté pour le développeur qui le recréera** | CR 27/07 | Non | Contredit le CDC (hors scope) |
| 27/07/2026 | Règle métier : **« décoration des parois » grisée** si kit monté par le client | CR 27/07 | Non | — |
| 29/07/2026 | **Renommage des 3 formules** : Kit DIY → **Kit à monter** · Atelier → **Kit posé en atelier** · Clé en main → **Van aménagé, prêt à partir** | Retours visio 29/07 | Non arbitré | Appliqué en Figma (section Formules) et en base SEO ; **non répercuté** au CDC, aux modales du flux devis, ni au pied de page |
| 29/07/2026 | Hero : principe conservé (sobre, mood fort), animation et « café qui fume » **validés explicitement** | Retours visio 29/07 | Non | — |
| 29/07/2026 | Les 3 colonnes de la home **validées** | Retours visio 29/07 | Non | — |
| 29/07/2026 | « Construit avec nos artisans près de Bordeaux » pour l'Atelier **validé** | Retours visio 29/07 | Non | — |
| 29/07/2026 | Système de devis et garde-fous « aucun achat en ligne » / « Voir mon devis » **validés** | Retours visio 29/07 | Non | — |
| 29/07/2026 | Remplacer le van rouge IA du hero par une photo réelle fournie par Willy | Retours visio 29/07 | Non | Reconfirmé et élargi le 10/09 |
| 29/07/2026 | 3-4 **variantes saisonnières du hero**, même cadrage | Retours visio 29/07 | Non | Élargi le 10/09 (saisons **et** heures de la journée) |
| 29/07/2026 | **Remonter les produits plus haut** sur les pages catégorie (demande Mathilde, accord Willy + Thomas) | Retours visio 29/07 | Non | Reformulé par Willy le 10/09 (« remonter les articles ») |
| 29/07/2026 | **Gamme Express** : traitement **éditorial** (badge « Express » activable en admin), **pas** de synchronisation de stock temps réel | Retours visio 29/07 | Non | — |
| 29/07/2026 | **Suivi de commande en ligne : hors scope, écarté.** Le process manuel devient du contenu de réassurance | Retours visio 29/07 | Non | — |
| 29/07/2026 | **Pennylane (signature électronique) : hors scope refonte**, à suivre | Retours visio 29/07 | Non | — |
| 29/07/2026 | Temps forts : **1 variante hero + 1 lightbox**, pas d'automatisation, pas de scheduling | Retours visio 29/07 | Non | — |
| 29/07/2026 | Pour chaque visuel manquant : **bloc placeholder + texte descriptif** de ce que l'image doit montrer — approche validée par Willy | Retours visio 29/07 | Non | Appliqué (blocs de brief rédactionnel dans les 3 pages Formule) |
| 29/07/2026 | Remplacement des visuels IA par les photos réelles **en dernière étape** du projet (acté avec Willy) | Retours visio 29/07 | Non | — |
| **29/07/2026** | **Politique d'affichage des délais — DÉSACCORD ASSUMÉ, NON TRANCHÉ.** Position Willy : *« ne rien afficher, argumenter au téléphone »*. Position studio : *« jamais un chiffre nu, toujours le délai collé à sa justification »* | Retours visio 29/07 | — | Le désaccord est consigné tel quel, sans arbitrage. **Les maquettes affichent des délais** (modales : 2-3 sem / 1-2 sem / 6-12 sem) |
| 29/07/2026 | **Débat « Boutique » → « Produit »** ouvert (demande Willy/Mathilde), alternatives « Catalogue » / « Nos kits », **à valider avec Nicolas avant tout renommage** | Retours visio 29/07 | — | **Non tranché formellement, mais appliqué en Figma** : la navbar affiche « Catalogue » et « Nos vans ». Aucune trace de validation par Nicolas ; breadcrumbs et footer non répercutés |
| 20/08/2026 | Liens Figma de la base SEO **recalés sur le configurateur v3** (anciens nœuds `7411-18282`, `7411-18280` supprimés) | Base Contenu & SEO, Notes | **Oui** | Les liens stockés (`7888-18285`, `7888-17999`) ne correspondent à aucun nœud du canvas actuel, qui porte un configurateur v4 |
| 20/08/2026 | Mail à Nicolas : confirmation repasse des textes + MAJ des liens Notion | Notes projet internes | Non | — |
| 27/08/2026 | Willy signale que **certaines Q/R du site actuel ne sont pas dans Notion** | Notes projet internes | Non | Réponse envoyée le 28/08 ; périmètre final non consigné |
| **18/09/2026** | Archivage de l'état **« avant retours Willy & Mathilde »** | Section Figma `8996:38481` | — | Atteste une session de retours entre le 18 et le 22/09, **non documentée par ailleurs**, et impliquant **Mathilde** |
| 18→22/09/2026 | Corrections factuelles sur la page catégorie : VASP « possible sur demande », amovibilité en « option Pack Amovible », équipements détaillés (60 L d'eau, chauffe-eau, 12 V/230 V, batterie lithium) | Diff archives 18/09 → 22/09 | Non | Trace directe des retours Willy du 10/09 |
| 18→22/09/2026 | Ajout d'un bloc **« Mention — réponse 24h »** sur la page catégorie | Diff archives | **Oui** | Contredit la promesse standard 48h du CDC §2quinquies |
| **22/09/2026** | Archivage de l'état **« avant intégration du contenu Notion du 12/09 »** (8 frames : 4 catégories + 4 écrans configurateur) | Section Figma `9011:41152` | — | Le contenu SEO daté du 12/09 a donc été intégré entre le 22/09 et aujourd'hui |
| 22/09/2026 | Configurateur 1.1 : *« Commençons par votre véhicule. »* → *« Choisissons le véhicule »* | Diff archives 22/09 → actuel | Non | Seule modification textuelle des écrans configurateur archivés ; 1.3 et 2.1 sont **strictement identiques** à leur archive |
| 22/09/2026 | « Boutique - Kit aménagement de van » passe au statut **« Intégré »** (seule page catégorie intégrée) | Base Contenu & SEO | Non | — |

### Les six sujets à traiter avec une attention particulière

**1. Périmètre du configurateur.** Le CDC le déclare trois fois hors scope (§3, §5, changelog
v1.3). Le fichier contient 6 écrans refondus « v4 », 5 overlays, 16 composants dédiés, une
section mobile et une section de ressources 3D. Le CR du 27/07 acte que le développeur
« recréera le configurateur avec le nouveau design ». La base SEO documente encore une v3 dont
les nœuds sont supprimés, et compte 5 étapes là où Figma en montre 3 (6 écrans). **Aucun
document ne réconcilie ces états.**

**2. Abandon du hub à étapes.** Tranché au CDC le 16/05 (« abandon du hub à étapes au profit
d'un formulaire unique 1-écran en lightbox »). Le frame `HUB — Devis Step 1 (choix formule)`
(`7553:4943`) existe dans la section `🪟 Modals — Flux devis`. Il n'est pas marqué archive, il
est dans la même section que les 12 autres modales actives. **Aucune source ne dit si cette
section est obsolète ou courante.**

**3. Abandon du quiz orienteur.** Tranché au CDC le 16/05 (« pas de quiz orienteur »). Trois
frames le matérialisent : `Aide à choisir — Q1` (« Avez-vous déjà votre van ? »), `Q2`
(« Souhaitez-vous installer le kit vous-même ? »), `Recommandation`. Le hub `7553:4943` porte
un bouton **« M'aider à choisir »** qui y conduit. **Même statut indéterminé.**

**4. Structure du formulaire de devis.** Trois formulaires distincts coexistent, avec 8, 17 et
10 champs. Détail au Livrable 4.

**5. Libellés « Boutique » / « Catalogue » / « Nos vans ».** Quatre strates coexistent dans le
fichier au 22/09 : navbar (« Catalogue », « Nos vans »), mega menu (« Nos kits Kapam »,
« Véhicules », « Voir toute la boutique »), pied de page (« Boutique », « Kits DIY »,
« Atelier », « Clé en main »), CDC (« Boutique ▾ »). Le renommage a été appliqué sans la
validation par Nicolas que la décision du 29/07 exigeait, et sans répercussion sur les
breadcrumbs.

**6. Politique d'affichage des délais.** C'est le seul point du dossier où une source consigne
explicitement un **désaccord assumé et non résolu** entre le client et le studio (29/07). En
parallèle, au moins cinq jeux de délais différents circulent (cf. Livrable 3, § Délais), et le
CDC relève lui-même la contradiction « 6 semaines garantie » vs délais par formule sans la
trancher.

---

# Livrable 3 — Les points en attente de Willy

Regroupés **par sujet**, toutes sources confondues, pour constituer une liste unique à
soumettre. Chaque point porte sa ou ses sources.

## 💰 Prix

| Point | Sources |
|---|---|
| Fourchettes des 3 formules : 2 000 € / 5 000 € / 25 000 € — *« Fourchettes indicatives à valider avec Willy »* | CDC §2quater, §10 |
| Kit DIY : **2 000 € vs 2 140 € vs 3 000 €** — trois chiffres pour la même ligne | CDC §2quater ; Brief comparatif 11/05 ; Retours 12/05 |
| Prix de départ Atelier et Clé en main laissés `[à valider Willy]` dans le tableau comparatif | Brief comparatif 11/05 |
| « À partir de 8 500 € » (cards Véhicules à vendre) : prix de l'aménagement seul ou véhicule + aménagement ? **Contradiction avec les 25 000 € du Clé en main** | Retours 12/05 ; CDC §2quater |
| « 1 199 € » (fiche produit), « 949 € » (cards cross-sell) : placeholders ou prix réels ? | Retours 12/05, 🚨 Urgences |
| Tous les « XXXXX € » des cards catégorie et fiches produit | Retours 12/05, 13/05 |
| Disponibilité réelle des 3 produits de cross-sell (79 € / 49,90 € / 70 €) au lancement | Retours 13/05 |
| **5 questions FAQ « prix » à valider** : coût aménagement Transporter VW, prix kit combi T2/T3, coût Transit Custom, budget van aménagé, différence neuf/occasion | Base FAQ |
| Homologation VASP facturée **389 €** dans le configurateur — cohérent avec « démarches accompagnées incluses » ? | Figma `8388:55146` ; Brief comparatif 11/05 |

## ⏱️ Délais

| Point | Sources |
|---|---|
| **Désaccord de principe non tranché** : afficher ou non les délais. Willy : « ne rien afficher, argumenter au téléphone ». Studio : « jamais un chiffre nu, toujours le délai collé à sa justification » | Retours visio 29/07 |
| Kit DIY : **2-3 semaines** (CDC) vs **4-6 semaines** (Brief comparatif, FAQ 13/05) | CDC §2quater ; 11/05 ; 13/05 |
| Atelier : **1-2 semaines** (CDC, modale Figma) vs **2-6 semaines** (Brief comparatif, FAQ) | CDC §2quater ; 11/05 |
| Clé en main : **6-12 semaines** (CDC, modale Figma) vs **6 semaines en moyenne** (Brief, FAQ) | CDC §2quater ; 11/05 |
| Accueil : **« Livraison six semaines garantie »** — contredit les 3 délais par formule, et le mot « garantie » est-il tenable ? | CDC §4bis et §10 |
| **Réponse sous 48h vs 24h** : le CDC impose 48h ; le contenu Nicolas dit 24h ; le pied de page Figma dit « 24 h hors week-end et périodes de congés » ; un bloc « Mention — réponse 24h » a été ajouté le 22/09 | CDC §2quinquies, §10 ; Figma `6972:1887` ; diff archives |
| « 48h ouvrées » tenable opérationnellement ? | CDC §10 |
| Willy, 10/09 : *« Délais à modifier, suite à notre discussion de mercredi »* (`7081-3795`) — **la modification demandée n'est pas consignée** | Retours Willy 10/09 |
| Gamme **Express** : délai ~10 jours pour panneaux noir/blanc/gris en stock — périmètre à confirmer | Retours visio 29/07 |
| **6 questions FAQ « délais » à valider** | Base FAQ |

## 🛡️ Garanties

| Point | Sources |
|---|---|
| **Garantie 2 ans pièces et main-d'œuvre : durée réelle ?** | CDC §10 ; Retours 12/05, 13/05 |
| **« Garantie à vie sur le mobilier »** évoquée par Willy — à réconcilier avec les 2 ans affichés partout | Retours Willy 10/09 (`7025-10538`) |
| Kit DIY : 2 ans pièces **uniquement** (pas de pose Kapam) ou 2 ans pièces + main-d'œuvre quand même ? | Brief comparatif 11/05 |
| Pertinence de mettre la garantie en avant sur la page catégorie globale des kits | Retours Willy 10/09 |
| Politique de retours & SAV : une page existe (desktop + mobile), **aucun contenu validé** | Figma `7779:21821` ; base SEO « À rédiger » |
| **Questions FAQ « garantie/VASP » : 10 à valider — le plus gros bloc de la base** | Base FAQ |

## 🪵 Matériaux & technique

| Point | Sources |
|---|---|
| **Norme contreplaqué : « COP2 » vs « CARB P2 » vs « COV2 »** — orthographe juridique correcte ? | CDC §10 ; Retours 12/05 ; Tella 2 Q7 |
| Matériaux : bois massif + contreplaqué bouleau + mousse haute densité — confirmés ? | CDC §10 ; Retours 12/05, 13/05 |
| Isolation : laine de bois ou polyéthylène réticulé selon la zone — confirmation technique ? | CDC §10 ; Retours 13/05 |
| Électrique : batterie auxiliaire dimensionnée selon usages, sectionneurs, schémas certifiés — correct ? | Retours 13/05 |
| **« Bois certifiés PEFC Label A+ »** — claim exact à valider | CDC §10 |
| **Réversibilité / démontabilité.** Maquettes : « Démontable sans trace ». Willy : *« Non, il faut percer la carrosserie pour certaines fixation »* et *« Une partie des aménagements sont amovibles (souvent que la partie banquette) »* | Retours Willy 10/09 ; corrigé partiellement le 22/09 en « option Pack Amovible » |
| Option **« démontable en 15 minutes »** (FAQ accueil) — liée au système « Quick Slot » retiré, à confirmer avant publication | CDC §10 |
| Lit permanent **seulement sur modèle rallongé type L2** | Retours Willy 10/09 (`7460-11194`) |
| Dimensions frigo et toilettes ; meuble haut au-dessus de la cuisine inclus ou non | Base FAQ (brouillons) |
| **6 questions FAQ « technique » à valider** (dont autonomie eau, autonomie électrique, frigo) | Base FAQ |

## 📋 Homologation VASP

| Point | Sources |
|---|---|
| **Kapam accompagne-t-il réellement les démarches DREAL ?** | CDC §10 ; Retours 12/05, 13/05 |
| VASP est une homologation **du véhicule**, pas d'un kit — le wording « Homologation VASP / Démarches accompagnées » est-il juridiquement correct ? | Retours 13/05 (×2) |
| Willy : *« Homologation possible, mais non obligatoire. Mobilier répondant un exigence des normes pour validation »* — formulation à arrêter | Retours Willy 10/09 (`7025-10539`) ; appliqué partiellement le 22/09 |
| VASP « incluse » sur Clé en main : vraiment, ou option payante ? **Le configurateur la facture 389 €** | Brief comparatif 11/05 ; Figma `8388:55146` |
| Carte grise : 3 questions FAQ distinctes (Trafic, van, fourgon) + 2 fiches produit (VW T6, Transit Custom) — **toutes à valider** | Base FAQ |
| Passagers assis à l'arrière / conservation des places arrière — 2 questions à valider | Base FAQ, Transverse |

## 📊 Statistiques de l'entreprise

| Point | Sources |
|---|---|
| **350+ vans aménagés depuis 2011** — le 350 est une estimation (~25/an sur 14 ans) | CDC §2quinquies ; Retours 12/05 ; Tella 3 Q1 |
| **14 années d'artisanat** — Kapam a-t-il bien démarré en 2011 ? | CDC ; Tella 3 Q2 |
| **100 % fait à la main** — formulation à valider | CDC ; Tella 3 Q3 |
| **50+ modèles de véhicules compatibles** | CDC ; Tella 3 Q4 |
| **3 ou 4 stats** dans le composant BrandImage ? (le CDC dit 4 en §2quinquies et 3 en §6bis) | CDC §2quinquies vs §6bis ; Retours 12/05 |
| BrandImage est-il réellement un composant partagé ? **Vérification jamais consignée** | Retours 12/05 |
| **Timeline** : 2011 fondation / 2015 agrandissement / 2020 Kit DIY / 2026 nouveau site — *« ces dates sont des hypothèses »* | Retours 12/05 ; Tella 3 Q6 |
| **Récit de fondation de la page À propos — inventé**, à corriger ou réécrire | Tella 3 Q7 |
| **3 valeurs** (Artisanat / Durabilité / Sur-mesure) — représentent-elles Kapam ? | CDC §2quinquies ; Tella 3 Q5 |
| **Équipe de 6** (Willy, Guillaume, Mathilde, Mireille, Julien, Cléo) — bons noms ? **Et le rôle de chacun ?** | CDC §2sexies ; Tella 3 Q8 |
| **« Grands prix de l'artisanat »** — récompense réelle ? | CDC §10 |
| Photos atelier et équipe : dossier existant ou shooting à prévoir ? | Tella 3 Q9 |

## 🤝 Réseau de partenaires

| Point | Sources |
|---|---|
| **Le réseau de monteurs « partout en France » existe-t-il réellement ?** | CDC §10 ; Retours 13/05 ; Tella 2 Q8 |
| CR 27/07 : réflexion **en cours** avec Mathilde → donc **pas encore actif**, alors que les maquettes l'affirment | CR 27/07 |
| **Conflit d'intérêt à arbitrer** : trop mettre en avant le réseau ferait perdre des grosses ventes (clients qui traversent la France pour une pose à l'atelier) | CR 27/07 |
| Les 3 types de partenariat (Installateur / Revendeur / Aménageur) existent-ils tous, ou un seul à date ? | Retours 13/05 |
| Marge revendeur (dégressive ? plate ? par catégorie ?) | Retours 13/05 |
| Formation : gratuite ou payante ? durée réelle ? | Retours 13/05 |
| Volume minimum d'engagement ? Exclusivité géographique ? Droit d'entrée ? | Retours 13/05 |
| Politique de contact : redirection Kapam / contact direct / hybride ? | Retours 13/05 |
| **Liste des vrais partenaires et de leurs logos** | Tella 3 Q19 ; Retours Willy 10/09 |
| Une page partenaires était-elle déjà prévue dans l'arborescence ? (action Willy du 27/07, sans réponse — alors que le CDC l'a ajoutée le 26/03) | CR 27/07 ; CDC v1.1 |
| Kapam veut-il recruter activement ? Si non, **retirer toute la section** | Retours 13/05 |

## 🏷️ Nommage des kits et vocabulaire produit

| Point | Sources |
|---|---|
| **« Kit Madel » vs « Kit Mado »** : 2 produits distincts ou typo ? | CDC §10 ; Retours 12/05, 13/05 ; Tella 2 Q9 |
| **Marques tierces résiduelles, toutes retirées en attente d'arbitrage** : Van Mania, Van Mello (+ auteure « Aurélie Bonhomme »), Simple Vans, Quick Slot | CDC §10 ; Retours 13/05 ; Tella 2 Q3→Q6 |
| Différence entre les gammes **Soft / Triply / Best** — question FAQ en brouillon, priorité Haute | Base FAQ |
| Couleurs du stratifié à afficher au clic sur « Best » | Retours Willy 10/09 (`7243-16173`) |
| **Le 4e kit (Combi T2-T3) manque** sur la page catégorie — signalé le 29/07 **et** le 10/09 | Retours 29/07 ; Willy 10/09 (`7213-54573`) |
| Kits manquants pour **T4 / T5** | Willy 10/09 (`7178-10549`) |
| **Vocabulaire des longueurs : 6 nomenclatures différentes** (court/long, L1/L2, S/M/L, compact/standard/long…) — harmoniser ou garder la nomenclature constructeur ? | Tella 3 Q14 |
| Kit Travel seul disponible sur Vito / Boxer / Ducato : garder la limite ou étendre Mado et Madel ? | Tella 3 Q11 |
| Variante Triply pour VW Combi T3 : oubli historique ou volonté ? | Tella 3 Q12 |
| Expert / Jumpy post-2016 / Proace en 3 longueurs : 3 véhicules physiques ou subdivision marketing ? | Tella 3 Q13 |
| Mobilier bicolore présent **à la fois** dans les 3 kits et en option déco : doublon ou volonté ? | Tella 3 Q15 |
| Cohérence globale de la cartographie (27 modèles / 10 marques) | Tella 3 Q10 |

## 🧭 Navigation & architecture

| Point | Sources |
|---|---|
| **« Boutique » → « Produit » / « Catalogue » / « Nos kits »** — à valider avec Nicolas avant tout renommage (impact nav + breadcrumbs + maillage SEO). **Appliqué en Figma sans trace de validation** | Retours visio 29/07 ; Figma `6972:1887` |
| Comportement du double CTA « Demander un devis » + « Mon devis (N) » : coexistence ou bascule ? | CDC §10, « EN SUSPENS » |
| **Page « Véhicules à vendre » : Boutique ou Aménagements ?** Figma a créé une 3ᵉ option (item navbar « Nos vans ») | CDC §10, « EN SUSPENS » ; Figma |
| Contact / FAQ / Actualités dans un mega menu « Aménagements » : *« reste conceptuellement bizarre »* — remonter en navbar ou laisser en footer ? | Retours 12/05 |
| Module « Histoires récentes » : 2 ou 3 items ? Source = articles, réalisations, ou mix ? | Retours 12/05 |
| Module « Bestsellers » : quels 2 produits ? Sélection figée ou dynamique, et selon quelle règle ? | Retours 13/05 |
| 4 catégories Boutique définitives ? (« Mobilier » vs « Accessoires » évoqué) | Retours 13/05 |
| Ordre des items de navbar | Retours 12/05 |
| Page « The Weekender » : page produit d'un kit ou page catégorie pour petits utilitaires ? *« Question structurelle persistante »* | Retours 13/05 |
| Comportement responsive des mega menus (hamburger) — **non maquetté en mobile** | Retours 12/05, 13/05 |

## 📝 Contenus & éditorial

| Point | Sources |
|---|---|
| **Qui rédige le blog ?** (interne / externe / mix / pas de blog) | Tella 3 Q16 |
| **Cadence tenable sur 12 mois** (1/semaine → 1/2 mois) | Tella 3 Q17 |
| Stratégie d'auteur : « Équipe Kapam » unique ou auteur nominatif par article ? | Retours 12/05 ; consigne dans le template Figma |
| **Liste de 5 à 8 projets emblématiques** pour les Réalisations | Tella 3 Q18 |
| Témoignages : contacter les ~15 clients satisfaits ; **la trame de collecte d'avis reste à envoyer à Willy** | Retours 29/07 ; Willy 10/09 |
| Tableau d'options : **dense (SEO) ou simplifié (conversion) ?** | Tella 2 Q2 |
| Légende du tableau « Options spécifiques vs génériques » (✅ / ❌ / ❓) | Retours 13/05 |
| **BOM du Kit Madel** (~100 list items) à remplir | Retours 13/05 |
| Section « Ce qui nous démarque ? » : factoriser en composant, déplacer sur une page dédiée, ou retirer ? **Décision à prendre** | CDC §6bis ; Retours 13/05 (×2) |
| Section « Vous allez sûrement aimer » sur la page hub : pertinente ou redondante ? | Retours 12/05 |
| Pagination « Voir 9 produits sur 32 » — chiffres à valider | Retours 13/05 |
| **Questions/réponses du site actuel** non encore reprises dans Notion | Notes projet internes 27/08 |
| Outil d'administration de la FAQ à proposer à Willy (système dédié / Google Doc / page Notion éditable) | Willy 10/09 |

## ⚙️ Outils & intégrations

| Point | Sources |
|---|---|
| **Cal.com ou autre ?** Un agenda ou plusieurs (Atelier vs Clé en main) ? | CDC §10 |
| **Cal.com (CDC) vs Calendly (maquettes)** — les 3 modales de confirmation portent *« Widget Calendly (embed en dev) »* | CDC §5, §7 ; Figma `7538:5041`, `7544:4968`, `7551:5077` |
| Durée du créneau : **30 min** (CDC, modale Clé en main) vs **15 min** (modales Kit DIY et Atelier) | CDC §5 ; Figma |
| Emailing / CRM pour la réception des demandes : **« à confirmer »** | CDC §7 |
| Outil analytics : **« à confirmer »** | CDC §7 |
| Événements de tracking à instrumenter : **« à confirmer »** | CDC §7 |
| Outil du formulaire partenaires (Fillout / Tally / natif Webflow) | Retours 13/05 |
| Multi-select « équipements indispensables » du formulaire Clé en main : liste complète à valider | CDC §10 |

## 📞 Coordonnées & opérations

| Point | Sources |
|---|---|
| **Ligne mobile (06 31 70 49 87) ou ligne fixe pro** pour un site premium ? | CDC §2sexies ; Retours 12/05 |
| Horaires **vendredis 9h-17h sur RDV uniquement** : afficher très clairement, ou ouvrir d'autres créneaux ? | CDC §2sexies ; Retours 12/05 |
| Atelier ouvert tous les jours pour les sessions accompagnées, ou vendredis seulement ? | Brief comparatif 11/05 |
| Sous-titre H1 de la page Contact : ton sobre/pro ou chaleureux ? | Retours 12/05 |
| Zone de livraison : Willy demande *« On parle de l'Europe ? »* (`7025-9826`) | Retours Willy 10/09 |
| Inversions à corriger sur « j'ai un van, vous installez » et « je pars de zéro » (`7025-9826`) | Retours Willy 10/09 |
| Retrait sur place possible pour éviter les frais de livraison ? (FAQ à valider) | Base FAQ |
| Rappels agenda récurrents chez Kapam : début février et début octobre (temps forts) | Retours 29/07 |

---

# Livrable 4 — Les trois chemins vers le devis

Description factuelle. Aucune conclusion.

## Chemin A — Pages `Devis / Checkout` + `Devis / Confirmation`

**Node IDs :** `6972:1887` (Checkout, 1440 × 1545) → `6975:1968` (Confirmation, 1440 × 1035).
Mobile : `8850:13790` → `8850:14001`.

**D'où on y entre.** Depuis le drawer « Mon devis » (état rempli, `6993:11174`), au clic sur
« Envoyer ma demande ». Le CDC §5 le décrit ainsi : *« Bascule en lightbox plein cadre —
Formulaire de finalisation. Au clic sur "Envoyer ma demande" depuis le drawer. »*
⚠️ **Le CDC parle d'une lightbox ; Figma en fait une page pleine (1440 de large, avec header et
footer de site).**

**Contexte de navigation.** La page porte le header global du site et le footer complet. Le CTA
du header affiche **« Mon devis (3) »**, cohérent avec les 3 lignes du récapitulatif.

**Champs demandés.**

| Bloc | Champ | Type | Obligatoire |
|---|---|---|---|
| Vos coordonnées | Prénom | texte | non indiqué |
| Vos coordonnées | Nom | texte | non indiqué |
| Vos coordonnées | Adresse mail | email | non indiqué |
| Vos coordonnées | Numéro de téléphone | tel | non indiqué |
| Vos coordonnées | Code postal | texte | non indiqué |
| Date projet | Date prévue pour votre projet **(optionnel)** | date | non |
| Questions | « Avez-vous des questions ou précisions ? » — placeholder *« Parlez-nous de votre projet, le véhicule que vous avez ou envisagez, vos envies… »* | textarea | non indiqué |
| — | « J'accepte d'être contacté par Kapam pour le traitement de ma demande » | case RGPD | — |

**Total : 7 champs + 1 case RGPD.** Plus un lien **« Modifier mon devis »** et le bouton
**« Envoyer ma demande »**, suivi de la mention *« Réponse sous 48h · Devis gratuit · Sans
engagement »*.

**Colonne latérale — « Récap de votre demande : »**
Kit Travel Best — Trafic L1 · `X XXX €` | Montage en atelier · `X XXX €` | Pack Éclairage LED
x 2 · `X XXX €` | **Sous-total indicatif 4 479 €** | *« Prix HT, hors devis personnalisé »*.

**Confirmation affichée (`6975:1968`).** Icône check + H1 + texte, puis :
- bloc « Un récap a été envoyé à : prenom@email.com »
- encart de prise de rendez-vous avec un bouton
- « En attendant, découvrez : » → « Nos réalisations » · « Notre blog »
- header + footer du site conservés

Le CDC §5 en donne le wording cible : *« ✅ Votre demande est bien reçue »*, *« L'équipe Kapam
vous contactera sous 48h ouvrées pour un appel de qualification et la confirmation de
faisabilité de votre projet »*, encart *« Vous préférez réserver directement votre créneau
d'appel ? »* → **Cal.com**, créneaux **30 min avec Willy**.

---

## Chemin B — Section `🪟 Modals — Flux devis` (13 modales)

**Node ID de section :** `7537:4919`. **Aucun équivalent mobile.**

**Les 13 frames :**

| Frame | Node ID | Dimensions |
|---|---|---|
| HUB — Devis Step 1 (choix formule) | `7553:4943` | 440 × 1021 |
| Aide à choisir — Q1 | `7554:4959` | 400 × 261 |
| Aide à choisir — Q2 | `7554:4968` | 400 × 310 |
| Aide à choisir — Recommandation | `7554:4977` | 400 × 821 |
| Clé en main — Présentation | `7537:4920` | 400 × 671 |
| Clé en main — Formulaire | `7538:4923` | 400 × 1741 |
| Clé en main — Confirmation | `7538:5041` | 400 × 391 |
| Atelier — Présentation | `7544:4927` | 400 × 590 |
| Atelier — Formulaire | `7545:4931` | 400 × 1841 |
| Atelier — Confirmation | `7544:4968` | 400 × 332 |
| Kit DIY — Présentation | `7551:4935` | 400 × 590 |
| Kit DIY — Formulaire | `7551:4968` | 400 × 1841 |
| Kit DIY — Confirmation | `7551:5077` | 400 × 332 |

**D'où on y entre.** Le hub `7553:4943` est l'écran d'entrée : *« Quel aménagement correspond à
votre projet ? — Trois formules selon que vous avez déjà votre van, et selon v[…] »*. Il propose
3 cartes formule et un encart de bas de modale :

> **Pas encore décidé ?** Répondez à 2 questions pour être orienté. → **[M'aider à choisir]**

Ce bouton ouvre le quiz Q1 → Q2 → Recommandation.

**Contenu des 3 cartes du hub (verbatim) :**

| Surtitre | Formule | Description | Prix & délai | CTA |
|---|---|---|---|---|
| VÉHICULE + KIT + INSTALLATION | **Clé en main** | « Vous n'avez pas encore de van ? On s'occupe de tout. » | À partir de **25 000 €** · **6 à 12 semaines** | Démarrer mon projet |
| KIT + INSTALLATION | **Atelier** | « Vous avez déjà votre van et on s'occupe de l'aménager dans notre atelier. » | À partir de **5 000 €** · **1 à 2 semaines** | Réserver un créneau |
| KIT LIVRÉ | **Kit DIY** | « Vous avez déjà un van et vous aimez bricoler. » | À partir de **2 000 €** · Livraison **2 à 3 semaines** | Configurer mon kit |

**Le quiz (verbatim) :**
- Q1 (« QUESTION 1 / 2 ») — *« Avez-vous déjà votre van ? »* → « Oui, j'ai mon van » /
  « Non, je n'ai pas encore de van »
- Q2 (« QUESTION 2 / 2 ») — *« Souhaitez-vous installer le kit vous-même ? »* → « Oui, j'installe
  moi-même » / « Non, je préfère confier l'installation à Kapam »
- Recommandation — « Notre recommandation » : met en avant une formule, puis *« Vous pouvez aussi
  explorer : »* et affiche les 2 autres.

**Champs demandés — formulaire Kit DIY (`7551:4968`), le plus détaillé :**

| Bloc | Champ | Type |
|---|---|---|
| **Vous** | Nom · Prénom | 2 textes |
| | Adresse mail | email |
| | Numéro de téléphone | tel |
| | Code postal | texte |
| **Votre véhicule** | Marque | select (« Sélectionnez la marque ») |
| | Modèle | select (« Sélectionnez le modèle ») |
| | Année | texte (« Année du véhicule ») |
| | Longueur | chips : Court / Long / Autre |
| **Votre projet** | Kit souhaité | chips : Travel / Je ne sais pas encore |
| | Niveau de finition | chips : Soft — essentiel / Best — confort / Triply — premium / Je ne sais pas |
| | **Homologation VASP souhaitée ?** | chips : Oui / Non / Je ne sais pas |
| | **Équipements souhaités** | chips multi : Douche · WC · Chauffage · Panneau solaire · Frigo · Télévision · Cuisine intégrée |
| **Votre calendrier** | Période souhaitée pour l'intervention | date (`jj / mm / aaaa`) |
| | Des précisions sur votre projet ? | textarea (même placeholder que le Chemin A) |
| — | « J'accepte que Kapam utilise mes données pour répondre à ma demande conformément à notre politique de confidentialité. » | case RGPD |

**Total : 16 champs + 1 case RGPD.** Bouton « Envoyer ma demande », mention *« Réponse sous 48h ·
Devis gratuit · Sans engagement »*.

**Confirmations affichées.** Les trois portent le même surtitre « DEMANDE ENVOYÉE » et le même
titre **« Bien reçu ! »**.

- **Kit DIY** et **Atelier** partagent un texte **strictement identique** :
  > *« Votre demande est enregistrée. L'équipe Kapam vous contactera sous 48h ouvrées pour
  > confirmer votre créneau et vous communiquer les informations pratiques pour **amener votre
  > van à l'atelier**. »*

  puis *« Vous pouvez aussi réserver directement un appel de **15 minutes** pour caler les
  détails »* + `Widget Calendly (embed en dev)`.

  ⚠️ Fait à signaler sans le trancher : le Kit DIY est, par définition au CDC §2quater, la
  formule où *« le client a son van + monte lui-même »* et où Kapam *« fabrique et livre le
  kit »*. La confirmation Kit DIY lui demande d'amener son van à l'atelier.

- **Clé en main** diffère :
  > *« Votre demande a bien été reçue. Un membre de l'équipe Kapam vous contactera sous 48h
  > ouvrées pour organiser un premier échange. »*

  puis *« Pour avancer plus vite, réservez directement un appel découverte de **30 minutes** avec
  Willy »* + `Widget Calendly (embed en dev)`.

**Statut de cette section.** Elle contient les deux dispositifs que le CDC v1.5 déclare
abandonnés le 16/05/2026 : le hub à étapes et le quiz orienteur. Elle n'est pas rangée dans une
section d'archive, et aucune source dépouillée n'indique si elle est obsolète ou courante.

---

## Chemin C — Configurateur, étapes 3.1 / 3.2

**Node IDs :** `8388:55146` (3.1 — Vos coordonnées, 1440 × 1250) → `8388:95687` (3.2 — Demande
envoyée, 1440 × 872). Mobile : `8850:150850` → `8850:150980`.

**D'où on y entre.** En fin de parcours configurateur, après 1.1/1.2/1.3 (véhicule) et 2.1 (kit,
options & devis). La barre basse porte « ← Retour à ma configuration ».

**Contexte de navigation.** ⚠️ **Le configurateur ne porte pas le header du site.** Il a son
propre en-tête : le mot « Configurateur », un séparateur, un lien **« ← Retour au site »**, et un
bouton **« Nous contacter »** à droite. **Il n'y a pas de CTA « Mon devis (N) ».**

**Accroche.** Surtitre « DERNIÈRE ÉTAPE », H1 **« Vos coordonnées. »**, puis :
> *« Votre configuration est enregistrée. Dites-nous où vous joindre : l'atelier vous répond
> sous 48 h ouvrées avec un devis chiffré. »*

**Champs demandés.**

| Bloc | Champ | Type |
|---|---|---|
| Vos coordonnées | Prénom · Nom | 2 textes sur une ligne |
| | Adresse e-mail | email |
| | **Téléphone (optionnel)** | tel |
| | Code postal | texte |
| **Comment préférez-vous être recontacté ?** | Par e-mail / Par téléphone | radio |
| | Créneau de rappel souhaité **(optionnel)** | select |
| | Quelque chose à préciser sur votre projet ? **(optionnel)** | textarea |
| — | « J'accepte que Kapam utilise mes données pour répondre à ma demande, conformément à notre politique de confidentialité. » | case RGPD |

**Total : 8 champs + 1 case RGPD.** Bouton « Envoyer ma demande », mention *« Gratuit et sans
engagement. Pas de spam : vos coordonnées servent uniquement à vous répondre. »*

**Colonne latérale — « VOTRE DEMANDE »**, avec un rendu 3D du kit, puis un tableau
« VOTRE PROJET » :

| Ligne | Valeur |
|---|---|
| (entête) | **4 479 €** |
| Formule | Atelier |
| Véhicule | Renault Trafic 3 (2014+) · Court (L1H1) |
| Kit & finition | Kit Travel · Best |
| Prix du kit | 2 440 € |
| Montage à l'atelier | 1 650 € |
| **Homologation VASP** | **389 €** |
| **TOTAL — Total indicatif TTC** | **8 391,30 €** |

Mention : *« Prix indicatif. Devis personnalisé sous 48h. »* + lien « Voir le détail de ma
configuration › ». Barre basse fixe : `KIT TRAVEL · BEST · RENAULT TRAFIC 3 (2014+) · COURT
(L1H1)` / `Total indicatif 8 391,30 €` / bouton « Envoyer ma demande ».

**Confirmation (`8388:95687`).** Frame « 3.2 — Demande envoyée », 1440 × 872, dans le shell
configurateur.

---

## Tableau comparatif champ par champ

| Champ | A — Checkout `6972:1887` | B — Modale Kit DIY `7551:4968` | C — Configurateur `8388:55146` |
|---|:---:|:---:|:---:|
| Prénom | ✅ | ✅ | ✅ |
| Nom | ✅ | ✅ | ✅ |
| Adresse mail | ✅ « Adresse mail » | ✅ « Adresse mail » | ✅ « Adresse e-mail » |
| Téléphone | ✅ | ✅ | ✅ **(optionnel)** |
| Code postal | ✅ | ✅ | ✅ |
| Marque du véhicule | ❌ | ✅ select | ⬅️ capté en étape 1.1 |
| Modèle du véhicule | ❌ | ✅ select | ⬅️ capté en étape 1.2 |
| Année du véhicule | ❌ | ✅ | ❌ |
| Longueur | ❌ | ✅ chips | ⬅️ capté en étape 1.3 |
| Kit souhaité | ❌ | ✅ chips | ⬅️ capté en étape 2.1 |
| Niveau de finition | ❌ | ✅ chips | ⬅️ capté en étape 2.1 |
| Homologation VASP | ❌ | ✅ chips (Oui/Non/Je ne sais pas) | ✅ **ligne facturée 389 €** |
| Équipements souhaités | ❌ | ✅ multi-chips (7 options) | ⬅️ capté en étape 2.1 |
| Formule choisie | ❌ (implicite) | ⬅️ portée par la modale | ✅ affichée (« Atelier ») |
| Date / période du projet | ✅ « Date prévue » (optionnel) | ✅ « Période souhaitée » | ❌ |
| Préférence de recontact | ❌ | ❌ | ✅ radio e-mail / téléphone |
| Créneau de rappel | ❌ | ❌ | ✅ select (optionnel) |
| Champ libre | ✅ | ✅ | ✅ (optionnel) |
| Case RGPD | ✅ | ✅ | ✅ |
| **Total champs** | **7** | **16** | **8** (+ 4 étapes amont) |
| Lien de retour | « Modifier mon devis » | ❌ | « ← Retour à ma configuration » |
| Récapitulatif chiffré | ✅ 3 lignes | ❌ | ✅ 6 lignes |
| **Régime de prix** | **HT** | non affiché | **TTC** |
| Mention de délai de réponse | 48h (corps) / 24h (footer) | 48h | 48 h ouvrées |
| Header du site | ✅ | ❌ (modale) | ❌ (shell dédié) |
| CTA « Mon devis (N) » | ✅ (3) | ❌ | ❌ |
| Outil de RDV | encart « Cal.com » (CDC) | `Widget Calendly (embed en dev)` | non constaté sur 3.1 |
| Durée du créneau | 30 min (CDC) | 15 min (DIY, Atelier) / 30 min (Clé en main) | — |

### La question à instruire : ces trois parcours produisent-ils le même objet devis ?

Éléments factuels à verser au débat, **sans conclusion** :

1. **Le jeu de champs diffère du simple au double** : 7 champs (A), 16 (B), 8 + 4 étapes de
   configuration (C).
2. **Le régime de prix diffère** : A affiche « Prix HT, hors devis personnalisé » ; C affiche
   « Total indicatif TTC ». B n'affiche aucun montant dans le formulaire.
3. **Le nombre `4 479 €` apparaît dans A et dans C, dans deux rôles différents** : sous-total HT
   des 3 lignes du panier en A ; entête « VOTRE PROJET » en C, où le total est 8 391,30 € TTC.
4. **Seul A est rattaché au drawer « Mon devis »** (header « Mon devis (3) », lien « Modifier mon
   devis »). B et C n'ont ni compteur ni lien vers le drawer. Le CDC §5 prévoit pourtant que le
   configurateur *« ajoute la configuration complète à "Mon devis" (drawer) »*.
5. **Seul B capte la marque, le modèle, l'année et les équipements souhaités par saisie
   déclarative** ; C les obtient par sélection guidée ; A ne les capte pas du tout (ils sont
   supposés portés par les lignes du panier).
6. **Seul C capte la préférence et le créneau de recontact** ; le CDC prévoyait ce champ pour le
   formulaire « Demander un devis » (§5 : *« Préférez-vous être rappelé à un moment précis ? »*),
   c'est-à-dire pour le chemin A.
7. **Seul C facture l'homologation VASP** (389 €) ; B la capte comme une intention (Oui / Non /
   Je ne sais pas) ; A ne la mentionne pas.
8. **L'objet « formule »** est explicite en C (ligne « Formule : Atelier »), porté par le choix
   de modale en B, et absent de A.
9. **Les confirmations divergent** : A renvoie vers réalisations et blog avec un encart Cal.com ;
   B propose un widget Calendly de 15 ou 30 min selon la formule ; la confirmation de C
   (`8388:95687`) n'a pas été détaillée ici.
10. **Le CDC ne décrit qu'un seul objet devis** (§5, « Mon devis » + formulaire de finalisation)
    et ne mentionne à aucun endroit l'existence de trois points d'entrée distincts.

---

# Ce que je n'ai pas pu vérifier, et pourquoi

1. **Les commentaires Figma — angle mort majeur.** Le MCP Figma n'expose pas les commentaires
   (`figma.comments` n'existe pas). Or le CR du 27/07 acte que Willy **annote directement sur
   Figma** pendant son absence d'août (*« pendant l'absence, il annote sur Figma »*), et le
   29/07 pose comme méthode *« Thomas : examiner les maquettes Figma en détail de son côté et
   remonter ses retours via les outils mis à disposition »*. **Un volume inconnu de retours
   client, couvrant vraisemblablement tout le mois d'août et la session du 18/09, est donc
   absent de ce dossier.** Aucune absence signalée ici ne doit être interprétée comme une
   absence réelle.

2. **L'énumération des pages du document Figma.** Appelé sans `nodeId`, le MCP ne retourne qu'une
   seule page (`0:1 — 🏞️ Cover`). Les trois canvas exploités l'ont été parce que leurs IDs
   figuraient dans la commande. **Il peut exister d'autres canvas dans ce fichier — je n'ai
   aucun moyen de le savoir.**

3. **Les descriptions de composants.** L'API de métadonnées retourne les noms, types, positions
   et tailles, mais **pas le champ « description » des composants**. La commande demandait
   « toutes les annotations, notes et descriptions de composants » ; je n'ai pu relever que ce
   qui est porté par des **noms de nœuds** (ce qui reste substantiel : les blocs de brief
   rédactionnel, les mentions `[EN COURS]`, `[base à retravailler]`, `[TEST]`, `(embed en dev)`).

4. **Le contenu textuel à l'intérieur des instances de composants.** Les libellés portés par des
   instances (champs de formulaire, items de navigation, boutons) ne sont pas exposés par les
   métadonnées. Je les ai relevés **par capture d'écran** sur 5 frames seulement (`6972:1887`,
   `8388:55146`, `7553:4943`, `7551:4968`, `7213:55199`). **Les libellés de toutes les autres
   pages n'ont pas été vérifiés visuellement** — notamment les formulaires Atelier (`7545:4931`)
   et Clé en main (`7538:4923`), dont je n'ai comparé que les dimensions (1841 et 1741 px, contre
   1841 pour le Kit DIY, ce qui suggère des structures voisines sans le prouver).

5. **Le résidu de template « Legally » sur la fiche véhicule.** Signalé en 🚨 Urgence absolue le
   12/05 (*« Véhicule disponible chez / OFFICE 2 / 123 Legal Avenue, NY » + carte de NYC*) et
   non coché. Les libellés ne figurent plus parmi les nœuds texte du frame `7407:16925`, mais ils
   pouvaient être portés par une instance de composant — **je n'ai pas pu conclure**.

6. **La confirmation du configurateur (`8388:95687`).** Non capturée visuellement ; seul son nom
   de frame (« 3.2 — Demande envoyée ») et ses dimensions sont établis. Son wording n'est donc
   pas comparé à celui des deux autres chemins.

7. **Le statut de la section `🪟 Modals — Flux devis`.** Aucune source dépouillée ne dit si elle
   est obsolète (auquel cas le hub et le quiz seraient des résidus) ou courante (auquel cas le
   CDC serait contredit). Elle n'est pas rangée en archive. **Je documente les deux lectures
   possibles sans trancher.**

8. **Les réponses de Willy aux 32 questions des 3 notes Tella.** Les trois notes sont restées
   « En attente retour Willy » à leur dernière modification (18/05/2026). Le format de réponse
   demandé était un **vocal WhatsApp** — un canal que je ne peux pas consulter. Il est donc
   possible que des réponses existent hors Notion. La clause *« Sans retour passé la deadline,
   c'est considéré comme validé »* n'a laissé aucune trace d'activation.

9. **Les 31 « notes liées » du projet.** J'en ai dépouillé 9 (les comptes-rendus et retours
   identifiés comme porteurs de décisions). **Les 22 autres n'ont pas été ouvertes** — parmi
   elles figurent notamment `34a70bd6…` (Prompts Relume Wireframe), `34b70bd6…` (Bases de
   données Contenus & Pages), `4625cc2c…` (Avis clients) et la base « Contenus Kapam »
   (`3f32569c…`), qui peuvent contenir des décisions non reprises ici.

10. **Le prototype de configurateur développé via Claude** (CR 27/07). Il est décrit comme la
    source de vérité fonctionnelle à venir (*« aboutir à une version la plus précise possible…
    puis en faire une documentation complète pour le développeur »*). **Je n'ai trouvé ni le
    prototype, ni sa documentation, dans aucune des sources dépouillées.**

11. **Le fichier SketchUp transmis par Willy le 15/09** (« kit Strat Tendance Full Option L2
    Blender OK.skp », 49,7 Mo, lien valable jusqu'au 15/10). Mentionné dans les notes projet
    internes ; **son contenu et son usage prévu ne sont documentés nulle part.** Le nom de
    fichier mentionne un kit « Strat Tendance » qui n'apparaît dans aucune nomenclature
    (glossaire CDC : Travel · Madel · Mado · Combi T2-T3).

12. **Le FigJam « Cartographie du simulateur actuel »** (`fjtFQU1D9NbphxK8N03RkZ`), cité comme
    ressource au CDC §11. La note Notion associée est quasi vide (un lien, un bookmark et une
    sous-page « 01 — Recherche »). **Le FigJam lui-même n'a pas été ouvert** — la commande ne
    l'incluait pas dans les canvas à dépouiller, et les chiffres qu'en cite Tella 3 (27 modèles
    sur 10 marques) n'ont donc pas été vérifiés à la source.

13. **La proposition commerciale** (PDF Dropbox, cité au CDC §11) : hors périmètre des MCP
    actifs, non consultée. Le budget (9 900 € HT) et la durée (14-17 semaines) ne sont donc
    connus que par leur report dans le CDC.
