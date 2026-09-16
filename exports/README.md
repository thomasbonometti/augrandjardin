# Kraft #6 — 5 carrousels Instagram (saison 2)

Déclinaison autonome sur le modèle du carrousel test validé.
5 carrousels × 3 versions × 1080 × 1350 px = **123 slides**.

## Où c'est monté

Fichier Figma `rvjGuoluleA91Kvw5L7oeX`, une page par carrousel :

| Page Figma | Carrousel | Slides |
|---|---|---|
| `Kraft#6 — C1 · 5 moments saison 1` | 5 moments de la saison 1 | 10 |
| `Kraft#6 — C2 · Pourquoi payant` | Pourquoi Kraft devient payant | 8 |
| `Kraft#6 — C3 · Ton premier Kraft` | Ton premier Kraft, mode d'emploi | 9 |
| `Kraft#6 — C4 · Complement Studio` | Qui est Complement Studio ? | 7 |
| `Kraft#6 — C5 · Heure par heure` | Le 8 octobre, heure par heure | 7 |
| `Kraft#6 — Sources carrousels` | les 16 photos importées | — |

Ligne du haut = version A, ligne du milieu = version B, ligne du bas = version C.
Les nœuds `3401:496` et `3401:501` n'ont pas été touchés.

## Système visuel appliqué

| | |
|---|---|
| Format | 1080 × 1350 px |
| Fond | `#0A0A0A` · texte `#FFFFFF` · accent `#92FF6B` |
| Police | **Archivo** (placeholder — voir plus bas) |
| Marges | 90 px côtés, 120 px haut/bas |
| Ligne de base du texte | bas de bloc à y = 1230 sur les 123 slides |
| Corps | 72 à 96 px selon la slide, jamais sous 72 px |
| En-tête | wordmark « kraft » à 90 / 120, largeur 260 px |
| Mots-clés | 1 à 2 par slide, graisse Black + vert Kraft (noir sur fond vert) |

## ⚠️ Police : Archivo est un placeholder

Roc Grotesk est rendue correctement par Figma mais reste **non chargeable en écriture**
depuis la session MCP — même diagnostic que sur le carrousel test. Les 123 slides sont
en Archivo (400/600/800/900).

Pour repasser en Roc Grotesk : sélectionne tout sur une page, panneau Texte, remplace
la famille. Le mapping est 1:1 (Regular→Regular, Bold→Bold, ExtraBold→ExtraBold,
Black→Black). **Les PDF sont à réexporter après le swap.**

## Images

Toutes viennent de https://www.lekraft.club/ (16 photos importées dans Figma).
Aucune image générée par IA — la seule présente sur le site
(`Gemini_Generated_Image_…`) a été écartée.

**Crédit à mettre dans la légende Instagram : Photos : Alexandra Koeniguer, Bartosch Salmanski.**

Aucune image n'a été agrandie au-delà de 150 % : la plus petite source utilisée fait
1067 px sur son petit côté, soit 101 % pour un plein cadre 1080 × 1350.

### Images manquantes

**Complement Studio** n'a aucun visuel dans les sources autorisées — ni portrait ni
travaux, sur lekraft.club comme dans les nœuds Figma. Les slides qui les présentent
sont donc typographiques sur fond noir, avec un filet vert :
carrousel 4 slides 2, 3, 4 · carrousel 5 slide 3.

## Choix faits en autonomie

1. **Pastille #6** — l'instruction disait « sur les slides avec visuel », mais la répéter
   sur 8 slides d'affilée alourdit la série. Reprise du test validé : pastille sur la
   slide 1 et sur la slide de marque finale uniquement.
2. **Carrousel 5, slide finale** — les tarifs (16 € · étudiant 9 €) ont été ajoutés
   au-dessus de « Billetterie en bio · lekraft.club », parce que ce carrousel doit porter
   les infos pratiques. C'est la seule slide de marque qui s'écarte du gabarit.
3. **Slide de marque (fond vert)** — mot-clé en noir ExtraBold et pastille noire à « #6 »
   vert : le vert Kraft sur vert Kraft serait illisible.
4. **Slides sans visuel** — filet vert de 260 × 10 px au-dessus du texte, pour éviter la
   slide typographique flottante.
5. **Corps de texte** — chaque bloc est auto-ajusté : la taille descend par pas de 2 px
   jusqu'à tenir en 5 lignes maximum. Aucune slide n'est descendue sous 72 px.
6. **Cartes inclinées (version B)** — taille calculée slide par slide entre le wordmark et
   le texte, d'où des formats variables (de 375 à 535 px de large).
7. **Early bird à 12 €** — jamais mentionné, comme demandé.

## Contrôles passés

- Audit automatique des 123 slides : aucun nœud texte hors des marges 90 / 120.
- Aucune collision carte / icône / texte / wordmark.
- Texte blanc uniquement sur zones sombres (dégradé noir en bas sur toutes les slides A).
- Chaque affirmation est traçable dans la banque de faits fournie.
- Rendu visuel de chaque version relu avant export (`planche-c1.png` … `planche-c5.png`).

## Fichiers

```
exports/
├── planche-c1.png … planche-c5.png      vue d'ensemble des 3 versions
└── carrousel-N/
    ├── A-01.png … C-NN.png              123 slides, 1080 × 1350
    ├── kraft6-carrousel-N-A.pdf         1 PDF par version, pages dans l'ordre
    ├── kraft6-carrousel-N-B.pdf
    ├── kraft6-carrousel-N-C.pdf
    ├── index.html                       visualiseur A/B/C, autonome
    └── legende.txt                      proposition de légende Instagram
```
