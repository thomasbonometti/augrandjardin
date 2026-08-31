# Kapam — Page catégorie · rapport

Fichier Figma `oGJVoOgpCvgf0DnCJTBLdU` · page `🖥️ Pages (Desktop)` · section **`🗂️ Catégorie — Template (modèle Rapha × Drivelodge)`**, posée à droite des versions existantes (x ≈ 78 000), sans rien recouvrir.

## 1. Livré

**Quatre frames d'état**, 1440 px, côte à côte, chacune annotée au-dessus :

| État | Node ID |
|---|---|
| ① Défaut — 4 kits, aucun filtre | `8564:33008` |
| ② Filtres actifs — Renault Trafic L1H1 | `8573:111258` |
| ③ Aucun résultat | `8573:115328` |
| ④ Catalogue dense — Accessoires, 12 cartes | `8576:42972` |

**Deux composants**, page `🧩 Composants` :

| Composant | Node ID | Variantes |
|---|---|---|
| `Card / Produit — v2` | `8556:2980` | `Déclinaison = Non \| Oui` |
| `Panneau / Filtres — Catégorie` | `8562:5456` | `État = Déployé \| Replié \| Filtres actifs` |

Les deux portent une `description` qui rappelle leur origine, la règle SEO et la règle devis ≠ achat.

## 2. Le point difficile, et comment il est résolu

Un rail de filtres pour quatre produits est ridicule — sauf si le rail n'indexe pas les produits mais les **véhicules**. C'est le cœur du template :

- Par défaut, la grille affiche les 4 kits.
- Dès qu'un véhicule est sélectionné, chaque carte bascule sur la variante `Déclinaison=Oui` : le nom prend un tag contextuel (« Kit Travel » + chip « L1H1 ») et le badge passe à `COMPATIBLE VOTRE VAN`.
- Le lien de la carte pointe **toujours** vers l'une des 4 fiches produit, véhicule présélectionné. Il n'y a jamais 40 fiches, mais la page se comporte comme un catalogue indexé par véhicule.

L'état ② le montre en vrai. La pagination existe dans le template sur booléen d'affichage : masquée sur les Kits, visible sur l'état ④.

## 3. Ce que j'ai adapté par rapport aux deux modèles, et pourquoi

| Adaptation | Raison |
|---|---|
| Rail à **compteurs par option** (badges chiffrés à gauche) plutôt que la liste nue de Rapha | Drivelodge est le bon modèle ici : sur un catalogue indexé par véhicule, le compteur est ce qui dit à l'utilisateur si son filtre a du sens avant de cliquer. |
| Gouttière de grille à **16 px** et non plus serrée | La colonne de grille fait 944 px (1248 − rail 280 − gap 24). 3 cartes de 304 + 2 gouttières de 16 = 944 pile. Une gouttière plus serrée ne tombait pas juste et laissait la grille flotter à droite — ce qui casse précisément la discipline Rapha qu'on cherche. |
| Tuile éditoriale de grille en **split image/texte 468 + 460** plutôt qu'en bandeau pleine hauteur | Au ratio 1,44:1 imposé, une tuile pleine largeur de grille ferait 650 px de haut — plus haute qu'une carte produit. Le split conserve le ratio exact du visuel et la hauteur d'une rangée. |
| État ② : **3 kits sur 4** et non un sous-ensemble arbitraire | Le seul retrait déductible sans inventer est le `Kit Spécial VW T2-T3` : conçu pour les combis à moteur arrière, donc hors Trafic. Toute autre exclusion aurait été une donnée de compatibilité inventée. |
| Index des véhicules : cartes par **déclinaison** (Trafic L1H1, L2H1, L1H2, L2H2) | Ce sont les seules données de compatibilité réellement présentes dans le fichier (composant `Modal / Véhicules compatibles`, 7322:1175). Rien n'est inventé. |
| Bandeau FAQ : colonne de titre 384 px + colonne de questions 768 px | Reprend le décalage Rapha — la colonne de questions n'occupe pas toute la largeur. |

Non adapté, volontairement : **aucune image de hero** en haut de page. Les deux modèles s'en passent, et le brief a raison — sur une page catalogue, ce sont les produits qui font l'image.

## 4. Tokens

**Aucun token créé.** Tout est bindé sur les collections existantes : `bg/`, `text/`, `border/`, `input/`, `btn/…` (via le composant `Button`), `radius/…`, `section/gutter`, `section/gap/…`, `component/padding/…`, `component/gap/…`, `border/width/default`, `size/…` pour les tailles de police.

Les trois valeurs de gris de placeholder demandées existaient déjà : `bg/placeholder/light` · `medium` · `dark`. Elles sont utilisées telles quelles.

Deux valeurs restent posées en dur, faute de token correspondant, et méritent un arbitrage :
- `strokeWeight = 2` sur les chips de marque à l'état actif (il n'existe que `border/width/default` = 1 et `border/width/focus`).
- `counterAxisSpacing` des grilles en wrap : bindé au token `component/gap/md` là où l'API l'a accepté.

## 5. Assets à sourcer manuellement — le brief est en avance sur le fichier

**Les logos constructeurs n'ont rien à sourcer : ils sont déjà dans le fichier, en vectoriel réel.**

Le brief demandait de poser des placeholders d'icône et de signaler un suivi manuel. Vérification faite, la page `🧩 Composants` contient déjà les 10 marques du brief, en composants 64 × 16 :

`Config v4 / Logo / Volkswagen` `8198:2865` · `Renault` `8198:2819` · `Nissan` `8198:2885` · `Peugeot` `8198:2836` · `Ford` `8198:2869` · `Opel` `8198:2875` · `Toyota` `8198:2898` · `Mercedes-Benz` `8198:1776` · `Citroën` `8198:2824` · `Fiat` `8198:2862`

Ce sont ces composants qui sont instanciés dans le rail **et** dans l'index des véhicules — mêmes assets des deux côtés, comme demandé. Il existe en plus un set `Logo constructeur` (`7177:1979`), redondant : **à trancher lequel des deux fait foi.**

Icônes : `search-md`, `filter-lines`, `plus`, `minus`, `chevron-down`, `x-close` sont importées d'`❖ Untitled UI Icons – PRO (v1.6)`, la librairie déjà utilisée par le fichier. Rien à sourcer non plus.

## 6. INSTANCE_SWAP

L'API d'écriture ne peut pas **créer** de propriété `INSTANCE_SWAP`, mais elle peut renseigner celles qui existent. Le composant `Button` en expose déjà (`Leading icon#7110:147`, `Trailing icon#7110:196`) : l'icône `filter-lines` du bouton « Filtres et tri » y a été posée par ce biais.

**Suivi manuel** — aucune propriété `INSTANCE_SWAP` n'a été créée sur les deux nouveaux composants. Si Thomas veut rendre permutables les logos de marque du rail ou les icônes `+ / −` des accordéons, il faut les ajouter à la main dans Figma.

## 7. Points bloqués et `[À valider Willy]`

| Où | Quoi |
|---|---|
| Carte `Kit Madel` | Prix — `[À valider Willy]`. Le libellé « À partir de » est masqué sur cette carte tant que le prix n'est pas confirmé. |
| S4 — rupture éditoriale | Attribution de la citation — `[À valider Willy] — nom du client, modèle, année`. |
| Rail — groupe BUDGET | Bornes des fourchettes. Les seuils posés (2 200 € / 2 500 €) encadrent les seuls prix connus (2 140 € et 2 240 €) mais **ne sont pas une donnée confirmée**. |
| Rail — groupe DÉLAI | Un seul palier est confirmé (« 2 à 3 semaines »). Les autres sont en `[À valider Willy]`. |
| État ④ — Accessoires | Délai propre aux accessoires non confirmé. Les facettes AGENCEMENT / FINITION sont celles des Kits : elles devront être remplacées par les facettes propres aux Accessoires. |
| S5 — index véhicules | Seules Renault (4 déclinaisons), Volkswagen (4) et Ford (3) sont documentées dans le fichier. Le titre « 10 marques, une quarantaine de déclinaisons » vient du brief ; **l'index complet reste à fournir**, et la section est à cadrer avec Nicolas avant intégration (fort potentiel SEO). |

## 8. Deux écarts entre le brief et l'état réel du fichier

1. **`Card / Produit — v2` n'existait pas.** Seul `Card / Produit` (`6954:539`) est présent. Il n'a pas été touché : `Card / Produit — v2` a été créé à côté, en reprenant sa logique (prix + mention « Prix indicatif. Devis personnalisé sous 48h. ») et en l'étendant. À valider : est-ce bien la v2 attendue, ou une v2 existait-elle ailleurs ?

2. **Le master `Nav / Header` (`6990:10522`) ne dit pas ce que dit le brief.** Il expose `Aménagements | Configurateur | Nos vans | Catalogue | Contact`. Le brief impose `Aménagements ▾ | Configurateur | Boutique ▾ | Contact`. Sur les quatre frames, l'override d'instance renomme `Catalogue` → `Boutique`, et le fil d'Ariane dit la même chose que la nav. **Mais l'entrée `Nos vans` reste**, et le master n'a pas été modifié — le brief interdit de redessiner le header. À arbitrer : soit le master est mis à jour, soit la nav validée intègre `Nos vans`.

## 9. Une tension dans le brief, signalée

La règle « CTA en 4 niveaux » interdit les CTA de conversion ailleurs qu'en bas de page. La spec du rail impose pourtant un bouton `Demander un devis sur mesure →` dans la carte d'appel (section 3.9), reprise du bloc « Can't find your van? » de Drivelodge.

Arbitrage retenu : la spec explicite l'emporte, mais le bouton est rendu en **hiérarchie secondaire** (contour, taille sm), pour qu'il lise comme une porte de sortie sur-mesure et non comme le CTA de conversion. Le seul CTA plein de la page reste `DEMANDER UN DEVIS` en section 7, où se trouve aussi **l'unique point d'entrée configurateur**.

## 10. Garde-fous vérifiés

- Audit texte des 4 frames : aucune occurrence de « ajouter au panier », panier, commande, caisse, checkout ni pourcentage de promotion. Le seul « acheter » est la question de FAQ imposée par le brief — « Peut-on acheter directement en ligne ? » — dont la réponse reprise du fichier commence par « Non, et c'est volontaire. »
- Le CTA carte est `Ajouter à mon devis` : 4 occurrences sur l'état ①, 3 sur ②, 12 sur ④, 0 sur ③ (grille remplacée par le bloc « aucun résultat »).
- Mention `Prix indicatif. Devis personnalisé sous 48h.` sous chaque prix — comptages identiques : 4 / 3 / 0 / 12.
- Promesse `Réponse sous 48h · Devis gratuit · Sans engagement` en section 7.
- Aucune promotion, aucun prix barré, aucun pourcentage.
- Aucun délai nu : le délai carte porte sa justification (« fabriqué à la demande, découpé aux gabarits »), et le groupe DÉLAI du rail porte une note de justification.
- Un seul point d'entrée configurateur, en section 7.
- Aucun frame existant modifié ; header, footer, breadcrumb et banner sont des instances non redessinées.
- **SEO / Webflow** : tout le contenu des accordéons — rail de filtres et bandeau FAQ — est présent dans la maquette et simplement masqué (`visible = false` sur les corps repliés), ce qui représente l'état CSS. Jamais de chargement JS à la demande. La contrainte est annotée sur la section et dans la `description` du composant `Panneau / Filtres — Catégorie`.
- Réponses FAQ : les cinq sont **reprises telles quelles** des versions existantes du fichier, aucune n'a été réécrite.
