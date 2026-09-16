# Kraft #6 — Carrousel test « Tu reconnais ces pochettes ? »

Mécanique narrative façon Tataki, DA Kraft. 3 versions × 11 slides, 1080 × 1350 px.

- **Fichier Figma** : `rvjGuoluleA91Kvw5L7oeX`
- **Page** : « Carrousel test — Pochettes » (page `3420:4`, créée pour l'occasion)
- Les nœuds sources `3401:496` et `3401:501` n'ont **pas** été modifiés : tout est du clonage.

## Livrables

| Fichier | Contenu |
|---|---|
| `kraft6-carrousel-A.pdf` | Version A « Tataki fidèle » — 11 pages |
| `kraft6-carrousel-B.pdf` | Version B « Kraft graphique » — 11 pages |
| `kraft6-carrousel-C.pdf` | Version C « Hybride » (A 1-6 + B 7-11) — 11 pages |
| `planche-contact-[ABC].png` | Vue d'ensemble d'une version |
| `png/[ABC]-01…11.png` | Les 33 slides en 1080 × 1350 px, prêtes pour Instagram |

PDF : 11 pages, 518,4 × 648 pt (= 1080 × 1350 px à 150 dpi).

## DA relevée (valeurs réelles du fichier, rien d'inventé)

| Élément | Valeur |
|---|---|
| Police Kraft | **Roc Grotesk** — graisses Regular / Bold / ExtraBold / Black |
| Vert Kraft | **#92FF6B** (`rgb(146, 255, 107)`) |
| Noir | `#000000` |
| Blanc | `#FFFFFF` |
| Wordmark | composant `2001:278` (« logo kraft »), ratio 624 × 170,48 |
| Pastille | cercle Ø 139, fond vert, texte noir, rotation −9,86° |

Marges de sécurité respectées sur les 33 slides : 90 px gauche/droite, 120 px haut/bas.
Ligne de base commune du texte : bas de bloc à y = 1230.

## ⚠️ Police : Archivo est un PLACEHOLDER

Roc Grotesk est **rendue** correctement par Figma mais n'est **pas chargeable en écriture**
depuis la session MCP (ni `listAvailableFontsAsync`, ni `loadFontAsync`, ni l'application
d'un style de texte). Les 33 slides sont donc montées en **Archivo** (même famille de
grotesque géométrique, mêmes graisses ExtraBold / Black / Bold).

**Pour repasser en Roc Grotesk** : ouvre la page dans Figma, sélectionne tout (⌘A),
puis panneau Texte → remplace la famille Archivo par Roc Grotesk. Les correspondances
de graisses sont 1:1 (Regular→Regular, Bold→Bold, ExtraBold→ExtraBold, Black→Black).

Ou, depuis un poste où Roc Grotesk est installée, via la console de plugin :

```js
// swap Archivo -> Roc Grotesk sur la page courante
const MAP = { Regular:'Regular', Medium:'Regular', Bold:'Bold', ExtraBold:'ExtraBold', Black:'Black' };
for (const s of new Set(Object.values(MAP))) await figma.loadFontAsync({ family:'Roc Grotesk', style:s });
for (const t of figma.currentPage.findAllWithCriteria({ types:['TEXT'] })) {
  for (const seg of t.getStyledTextSegments(['fontName'])) {
    if (seg.fontName.family !== 'Archivo') continue;
    await figma.loadFontAsync(seg.fontName);
    t.setRangeFontName(seg.start, seg.end, { family:'Roc Grotesk', style: MAP[seg.fontName.style] || 'Bold' });
  }
}
```

Les PDF sont donc à **réexporter après le swap**.

## Images : ce qui a été utilisé, slide par slide

Toutes les pochettes viennent de `3401:501`, clonées (jamais déplacées ni modifiées).

| Slide | Image | Calque source |
|---|---|---|
| 01 | montage 3 pochettes inclinées | `stro_cover_itunes…`, `fondrougeaplat`, `single_touslesmemes` |
| 02 | Stromae | `single_papaoutai` |
| 03 | Angèle | `fondrougeaplat` |
| 04 | ⚠️ substitution | `Gael-Faye_Lundi-Mechant` |
| 05 | portrait Vincent | recadrage de `3401:496` |
| 06 | mosaïque | les 10 pochettes du lot |
| 08 | photo de groupe | `CAPSULE5_photogroup` (A/C) — texte seul (B) |
| 09 | Stromae Multitude | `MULTITUDE_website_content5` (A/C) — texte seul (B) |
| 10 | photo de groupe sombre | `Capsule2_THUMBNAIL` |

## ⚠️ Points à trancher

1. **Slide 4 — Lous and The Yakuza.** Aucune pochette de Lous and The Yakuza n'existe
   dans `3401:501`. Sur ta décision, la slide utilise `Gael-Faye_Lundi-Mechant` : **l'image
   ne correspond pas à l'artiste cité**. À remplacer avant publication (calque
   `pochette/04` dans A-04, B-04, C-04).

2. **Slide 5 — avatar de Vincent.** Dans `3401:496` (qui est un PNG aplati, pas un
   montage vectoriel), l'avatar ne fait que **140 × 140 px** utiles. Impossible de le
   passer en plein cadre 1080 × 1350 sans l'étirer à ~770 %. Il est donc monté en
   **médaillon de 210 px (150 % max, la limite fixée)**, cercle + filet blanc, sur fond
   noir. Pour une slide portrait plein cadre, il faut une photo HD de Vincent.

3. **Slide 11 (aplat vert).** Le vert Kraft sur vert Kraft serait illisible : le mot-clé
   « Billetterie » est en **noir ExtraBold** (au lieu de vert) et la pastille #6 est
   **noire avec un « #6 » vert**. Contraste conservé, hiérarchie conservée.

Aucun texte n'a été laissé entre crochets : aucun nom d'album n'était nécessaire.
