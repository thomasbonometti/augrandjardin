# Kapam · Boutique — Index v4 (modèle Mons Royale) — rapport

**Frame livré** : `Kapam / Boutique — Index — v4 (modèle MR)` — `8537:32271`
page `🖥️ Pages (Desktop)`, 1440 × 8061, posé à droite des versions existantes (x = −50388, y = 30222).
→ https://www.figma.com/design/oGJVoOgpCvgf0DnCJTBLdU/?node-id=8537-32271

Aucun frame existant n'a été modifié. Aucune image générée : 30 placeholders au bon ratio,
chacun avec son label lisible au centre et **son prompt de génération en annotation Figma**.

| Section | Node |
|---|---|
| S0 — Bandeau haut | `8537:32272` |
| S1 — Header | `8537:32277` |
| S2 — Hero (triptyque) | `8537:32375` |
| S3 — Statement centré | `8537:32376` |
| S4 — Les familles | `8537:32377` |
| S5 — Carrousel · Nos quatre kits | `8537:32378` |
| S6 — Bandeau éditorial | `8537:32379` |
| S7 — Carrousel · Accessoires & options | `8537:32380` |
| S8 — Bloc 50/50 | `8537:32381` |
| S9 — Les trois formules (`#vous-en-etes-ou`) | `8537:32382` |
| S10 — Le Journal | `8537:32383` |
| S11 — En savoir plus | `8537:32384` |
| S12 — CTA final + newsletter | `8537:32385` |
| S13 — Footer | `8537:32316` |

---

## 1. Ce que j'ai adapté par rapport à Mons Royale, et pourquoi

**Bande des familles en 4 colonnes au lieu de 3.** Mons Royale en met trois ; Kapam a quatre
familles. La bande reste bord à bord et sans gouttière — 4 × 360 px — donc la grammaire tient,
seule la densité change. Les tuiles font 360 px de large au lieu de 480 : c'est le prix des
quatre familles sur 1440.

**Le débordement des carrousels est un vrai débordement.** Le rail est un auto-layout qui
mesure 2216 px (S5) et 2216 px (S7) et qui dépasse la section ; c'est la section qui coupe
(`clipsContent`). En intégration Webflow ça devient un `overflow-x` — pas une grille tronquée.

**Boutons rectangulaires MR : construits, pas empruntés.** Le `Button` du DS a un
`radius/control` (8 px) ; les boutons blancs MR posés sur image sont rectangulaires. J'ai créé
les boutons du hero et du bandeau éditorial comme des frames token-bindés
(`btn/inverse/bg`, `btn/inverse/text`, `radius/none`, paddings `component/padding/*`) plutôt
que de casser le radius du composant partagé par override. Même logique pour les deux badges
(`LE PLUS DEMANDÉ`, `NOUVEAUTÉ`, `BOIS PEFC · LABEL A+`).
**Partout ailleurs, ce sont des instances du `Button` du DS** : `Ajouter à mon devis` (×8),
`CONFIGURER MON VAN`, `DEMANDER UN DEVIS`, `VOIR LES KITS`, `S'INSCRIRE`.
Répartition assumée : ce qui est posé sur une image suit la grammaire MR, ce qui convertit
suit le design system Kapam.

**La carte produit MR est enrichie.** Mons Royale montre packshot + nom + prix. Kapam ne vend
pas en ligne, donc chaque carte porte en plus : `Compatible 40+ modèles`,
`2 à 3 semaines — fabriqué à la demande, découpé aux gabarits` (le délai n'apparaît jamais nu),
les finitions, la mention `Prix indicatif. Devis personnalisé sous 48h.` et le bouton
`Ajouter à mon devis`. La carte est donc plus haute que chez MR — c'est structurel, pas
cosmétique.

**Le bloc image de `Card / Produit` est masqué, le visuel est au-dessus.** Le composant embarque
un `Slider / Produit` en 384 × 300. Le modèle MR veut un visuel 4:5. J'ai masqué le bloc `Image`
de l'instance (override de visibilité, le composant n'est pas touché) et posé le placeholder
400 × 500 juste au-dessus, dans le wrapper. On garde donc le composant pour ce qui compte —
titre, description, prix, mention obligatoire — sans subir son ratio d'image.

**Fin de page fusionnée.** Mons Royale termine sur une bande noire qui ne porte qu'une
newsletter. La logique CTA Kapam impose le CTA de conversion en bas de page. Une seule bande
noire, en deux temps : temps 1 = titre + `DEMANDER UN DEVIS` / `VOIR LES KITS` + promesse
48h posés sur `CTA-FINAL` ; temps 2 = Prénom / Email / `S'INSCRIRE` à gauche, **KAPAM** en
`display/9xl/bold` (72 px) à droite, façon « THE MONS CREW ».

**Scrims mutualisés.** Le texte blanc posé sur image (hero, familles, formules, tuiles
d'ambiance, 50/50) s'appuie sur un style de fond partagé plutôt que sur des dégradés dessinés
au cas par cas — voir tokens ci-dessous.

**S11 porte un titre `En savoir plus`.** Le brief donne le nom de la section mais pas de titre
posé. Sans titre, trois blocs isolés flottent après une bande pleine largeur. J'ai repris le
nom de la section tel quel — rien d'inventé.

---

## 2. Tokens et styles créés

Aucune valeur brute n'est posée sur le canvas. Trois variables ont dû être créées, dans la
collection existante `4. Tokens - Colors`, en alias des primitives :

| Variable | Alias | Scopes | Usage |
|---|---|---|---|
| `bg/placeholder/dark` | `stone/950` | `FRAME_FILL`, `SHAPE_FILL` | hero, bandeaux éditoriaux, tuiles d'ambiance, CTA final |
| `bg/placeholder/medium` | `stone/300` | `FRAME_FILL`, `SHAPE_FILL` | familles, formules, journal, en savoir plus, 50/50 |
| `bg/placeholder/light` | `stone/100` | `FRAME_FILL`, `SHAPE_FILL` | packshots produit |

Deux styles de remplissage partagés, pour ne pas semer de dégradés en dur :

| Style | Contenu | Usage |
|---|---|---|
| `overlay/scrim-bottom` | dégradé vertical `ink` 0 % → 28 % → 88 % | tout texte blanc posé en bas d'image |
| `overlay/scrim-full` | `ink` à 52 % uniforme | bandeau éditorial pleine largeur (texte centré) |

Un dégradé ne peut pas être lié à une variable dans Figma : l'encapsuler dans un style partagé
est la seule façon de garder la valeur centralisée et modifiable en un point.

Tout le reste vient du fichier : `bg/*`, `text/*`, `border/*`, `btn/*`, `radius/*`,
`section/gap/*`, `component/padding/*`, `component/gap/*`, `layout/padding/desktop`,
et les styles de texte `display/*`, `text/*`, `accent/*`.

---

## 3. Garde-fous — vérification

- Aucune occurrence de « acheter », « panier », « commander », « caisse », « checkout »,
  « promo », « remise », « % », « Landes » dans le frame. Vérifié par balayage de tous les
  textes visibles.
- Les 8 cartes produit portent **toutes** `Prix indicatif. Devis personnalisé sous 48h.`
  Vérifié carte par carte.
- La bande des formules porte `Prix indicatifs. Devis personnalisé sous 48h.` sous les trois
  tuiles.
- Promesse standard `Réponse sous 48h · Devis gratuit · Sans engagement` : bandeau haut + CTA final.
- **CTA en 4 niveaux respecté** : les deux boutons du hero sont des ancres internes
  (`EXPLORER LES KITS ↓`, `VOUS EN ÊTES OÙ ? ↓`), annotées comme telles ; aucun CTA de
  conversion avant le premier produit ; conversion en S12 uniquement.
- **Un seul point d'entrée configurateur** : `CONFIGURER MON VAN`, S8, bloc dédié, annoté.
  Les deux autres occurrences du mot « Configurateur » sont l'item de navigation du header et
  celui du footer — pas des CTA de page.
- Délais jamais nus : `2 à 3 semaines — fabriqué à la demande, découpé aux gabarits`.
- Géo : « Saint-Gervais, Gironde, près de Bordeaux ». Jamais « Landes ».
- S9 annotée `#vous-en-etes-ou`.
- Contenu repliable : cet index n'en contient aucun. La contrainte SEO Webflow
  (rendu HTML + masquage CSS, jamais de chargement JS) ne s'applique donc à aucun bloc ici —
  elle redeviendra active sur la FAQ et les catégories.

---

## 4. Ce qui est resté bloqué

**1. `Card / Produit — v2` n'existe pas.** Le fichier ne contient que `Card / Produit`
(`6954:539`, page `🧩 Composants`, groupe « 🧱 Ajouts déclinaison »). C'est celui que j'ai
instancié, 8 fois. Si une v2 existe ailleurs (autre fichier, autre branche), il faudra
re-swapper les 8 instances.

**2. Le master `Nav / Header` n'est pas conforme à la navigation validée.**
Le master (`6990:10522`, variante `Ton=Clair` `6886:324`) affiche
`Aménagements | Configurateur | Nos vans | Catalogue | Contact | [Demander un devis]`.
La navigation validée est
`Aménagements ▾ | Configurateur | Boutique ▾ | Contact | 🔍 | [Demander un devis] [Mon devis (N)]`.
Deux écarts, dont un qui touche un garde-fou non négociable :
- « Catalogue » au lieu de « Boutique » → **j'ai corrigé le label sur mon instance uniquement**
  (override de texte). Le master, lui, dit toujours « Catalogue » et alimente tous les autres
  écrans. À arbitrer avec toi avant de toucher au composant partagé.
- « Nos vans » en trop, `🔍` et `[Mon devis (N)]` manquants → non corrigés : les ajouter
  reviendrait à redessiner le header, ce que le brief interdit.

**3. Le footer embarque déjà une newsletter.** Le master `Footer` (`6888:325`) contient un bloc
« Restez informé » avec champ email et bouton. Il tombe maintenant juste sous la newsletter de
S12. Doublon visible sur la maquette. Trois sorties possibles, à trancher : retirer la
newsletter du footer, retirer le temps 2 de S12, ou assumer le doublon. Je n'ai pas tranché
seul, ça touche un composant partagé.

**4. La note produit (4,9/5) est masquée.** `Card / Produit` affiche par défaut cinq étoiles et
`4,9/5`. Aucun chiffre d'avis n'étant confirmé, j'ai masqué le bloc `Note` sur les 8 instances
plutôt que d'afficher une note inventée. Le composant n'a pas de booléen pour ça — c'est un
override de visibilité, à reprendre proprement si les avis arrivent.

**5. « à partir de » reste affiché sur les accessoires.** Le préfixe est correct pour les kits,
discutable pour un plafond DIBON à 225 €. Le booléen `Mention indicatif` du composant pilote
**à la fois** le préfixe et la mention obligatoire : masquer l'un masque l'autre. La mention
étant non négociable, j'ai laissé le préfixe. Correction propre = dissocier les deux dans le
composant.

**6. `INSTANCE_SWAP` — suivi manuel requis.** Deux endroits, l'API d'écriture ne peut pas les
créer :
- `Card / Produit` → `Slider / Produit` : quand les vrais packshots arriveront, le bloc `Image`
  (aujourd'hui masqué) devra soit exposer un slot `INSTANCE_SWAP` en 4:5, soit donner lieu à une
  vraie `Card / Produit — v2` à média 400 × 500. En l'état, les packshots se posent dans mes
  placeholders, hors du composant.
- `Button` expose `Leading icon` / `Trailing icon` en `INSTANCE_SWAP` (Untitled UI Icons PRO
  v1.6). Je n'ai activé aucune icône : les flèches du hero (`↓`) et des liens (`→`) sont des
  glyphes texte. Si tu veux de vraies icônes Untitled UI, c'est un passage manuel.

**7. Valeurs `[À valider Willy]` posées dans la maquette** — 8 emplacements :
prix du Kit Madel · prix du Store déroulant · prix du Chauffage stationnaire ·
description du Grand support élastique · crédit de la réalisation client (nom, modèle, année) ·
dates et chapôs des 4 articles du Journal.

**8. Titres du Journal à valider avec Nicolas** (cohérence SEO) — les 4 titres proposés sont
posés tels quels dans le brief.

**9. « Boutique » vs « Catalogue » : arbitrage SEO toujours en attente.** Le frame dit
« Boutique » partout, conformément au garde-fou.

---

## 5. Note sur l'emplacement de ces fichiers

Ces trois markdown sont poussés sur la branche `claude/kapam-boutique-index-mr-iwkwor` du dépôt
`thomasbonometti/augrandjardin`, seul dépôt accessible à cette session. C'est le site Au Grand
Jardin, pas Kapam — ils sont donc isolés dans `kapam/boutique-index-v4/`. À déplacer vers le
dépôt ou le Notion Kapam quand tu veux.
