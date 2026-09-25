# DS-AUDIT — Fondations « Bono. | Portfolio 2025 »

> Mission : refonte des variables, styles de texte et styles d’effet du portfolio (fileKey `A8Cw64PpbBzUGmEJhSoG2M`) selon l’architecture du **Starter** (`udrvRaRjwEkZgP4g4CMlwD`) et l’identité **LinkedIn 2.0** (`EMZelOLTOVHnT0Irz6Vyqz`). Starter et LinkedIn 2.0 lus uniquement, jamais modifiés.

> Décisions de phase 0 : **gris chauds LinkedIn « 5. Web · Neutrals »** retenus (Cararra et Zinc → `zz-deprecated/`). Sauvegarde du fichier confirmée. Phases enchaînées en autonomie à la demande de Thomas.

## Sommaire

1. Synthèse
2. Inventaire — Portfolio 2025 (avec utilisations)
3. Inventaire — Starter
4. Inventaire — LinkedIn 2.0 (périmètre web)
5. Styles de texte et d’effet des trois fichiers
6. Table de correspondance ancien / source → cible
7. Valeurs proposées — couleurs Light / Dark
8. Valeurs proposées — typographie (modes, échelle, familles optiques)
9. Valeurs proposées — layout, spacing, radius, border, tracking, élévation
10. Contraste WCAG AA
11. Textes en PP Neue Montreal sans style
12. Défauts à ne pas recopier
13. Valeurs en dur les plus fréquentes (périmètre site)
14. Journal d’application (phases 2 et 3)
15. Points à trancher

## 1. Synthèse

- **Portfolio (état initial)** : 5 collections (Typography 53 var. · Color Mode 23 · Guides 17 · Colors 47 · Social 4 = **144 variables**), 29 styles de texte, 0 style d’effet, 0 style de couleur. **Aucune variable n’a de codeSyntax.** Tous les tokens sémantiques de couleur sont en scope `ALL_SCOPES`.
- **Cararra** : 546 nœuds reliés directement (458 périmètre site, 88 hors site) + 22 alias depuis Color Mode (donc hérité par quasiment tous les textes et fonds). **Zinc** : 10 nœuds, tous dans une maquette client Caats (« trial option »), 0 alias, 0 style.
- **Polices** : PP Neue Montreal (display + body) et Degular Display (accent, inutilisé via variable). Aucun style ni texte du site n’utilise d’italique PP Neue Montreal → l’absence d’italique chez Geist et Bricolage n’a **aucun impact** (les italiques présents dans le fichier sont des polices clientes : Source Serif 4 Italic sur la home, Degular Italic sur la page « Brief » hors site).
- **Textes sans style en PP Neue Montreal** : **763** dans le périmètre site (dont 313 en 36 px Regular / interligne 48, déjà liés aux variables mais sans style), 338 hors site.
- **Architecture cible** : 11 collections numérotées (0 à 8 + Projects + Formats), 4 modes responsive (Desktop XL / Desktop / Tablet / Mobile), 2 modes de thème (Light / Dark), tous les tokens avec scopes explicites, codeSyntax CSS et description.

## 2. Inventaire — Portfolio 2025 (état initial)

Colonnes d’utilisation : **Nœuds site** = pages Folio 2027 (home, études de cas en cours et à faire, mobile Hasamélis, SEO OG, cover) ; **Nœuds hors site** = Studio, Malt, Email, Showreel, Search, UI Kit, Archives. Les comptes incluent les calques d’instances et chaque segment de texte lié (un texte stylé compte pour chaque variable liée par son style). **Styles** = nombre de styles de texte liant la variable. **Alias entrants** = variables pointant vers elle. codeSyntax : vide partout.


#### Collection « Typography » — modes : Mode 1

| Variable | Type | Valeur(s) par mode | Scopes | Masquée | ID | Nœuds site | Nœuds hors site | Styles | Alias entrants |
|---|---|---|---|---|---|---:|---:|---:|---:|
| `Font family/font-family_display` | S | "PP Neue Montreal" | TEXT_CONTENT,FONT_FAMILY | non | 2301:1545 | 1194 | 1133 | 12 | 0 |
| `Font family/font-family_body` | S | "PP Neue Montreal" | TEXT_CONTENT,FONT_FAMILY | non | 2301:1544 | 5923 | 5311 | 17 | 0 |
| `Font family/font-family_accent` | S | "Degular Display" | TEXT_CONTENT,FONT_FAMILY | oui | 2301:1543 | 0 | 0 | 0 | 0 |
| `Font weight/regular` | S | "Regular" | FONT_STYLE | oui | 2301:1571 | 5054 | 4218 | 15 | 0 |
| `Font size/xxs` | F | 10 | FONT_SIZE | oui | 2301:1645 | 50 | 30 | 2 | 0 |
| `Font size/xs` | F | 12 | FONT_SIZE | oui | 2301:1630 | 862 | 44 | 2 | 0 |
| `Font size/sm` | F | 14 | FONT_SIZE | oui | 2301:1626 | 718 | 1038 | 4 | 0 |
| `Font size/md` | F | 16 | FONT_SIZE | oui | 2301:1624 | 1529 | 1516 | 3 | 0 |
| `Font size/lg` | F | 18 | FONT_SIZE | oui | 2301:1625 | 778 | 1120 | 3 | 0 |
| `Font size/xl` | F | 20 | FONT_SIZE | oui | 2301:1623 | 1858 | 1558 | 3 | 0 |
| `Font size/2xl` | F | 24 | FONT_SIZE | oui | 2301:1640 | 162 | 240 | 2 | 1 |
| `Font size/3xl` | F | 30 | FONT_SIZE | oui | 2301:1632 | 94 | 239 | 1 | 1 |
| `Font size/4xl` | F | 36 | FONT_SIZE | oui | 2301:1643 | 724 | 278 | 1 | 1 |
| `Font size/5xl` | F | 48 | FONT_SIZE | oui | 2301:1638 | 16 | 60 | 1 | 1 |
| `Font size/6xl` | F | 60 | FONT_SIZE | oui | 2301:1634 | 4 | 67 | 2 | 1 |
| `Font size/7xl` | F | 72 | FONT_SIZE | oui | 2301:1622 | 72 | 175 | 2 | 1 |
| `Font size/8xl` | F | 96 | FONT_SIZE | oui | 4306:581 | 0 | 19 | 2 | 1 |
| `Font size/9xl` | F | 128 | FONT_SIZE | oui | 4306:582 | 34 | 8 | 1 | 1 |
| `Line height/xxs` | F | 10 | LINE_HEIGHT | oui | 2301:1639 | 50 | 30 | 2 | 0 |
| `Line height/xs` | F | 12 | LINE_HEIGHT | oui | 2301:1637 | 862 | 44 | 2 | 0 |
| `Line height/sm` | F | 18 | LINE_HEIGHT | oui | 2301:1633 | 718 | 1038 | 4 | 0 |
| `Line height/md` | F | 20 | LINE_HEIGHT | oui | 2301:1635 | 1529 | 1516 | 3 | 0 |
| `Line height/lg` | F | 24 | LINE_HEIGHT | oui | 2301:1631 | 778 | 1120 | 3 | 0 |
| `Line height/xl` | F | 28 | LINE_HEIGHT | oui | 2301:1642 | 1858 | 1558 | 3 | 0 |
| `Line height/2xl` | F | →Font size/2xl | LINE_HEIGHT | oui | 2301:1644 | 0 | 8 | 0 | 0 |
| `Line height/3xl` | F | →Font size/3xl | LINE_HEIGHT | oui | 2301:1629 | 240 | 433 | 3 | 0 |
| `Line height/4xl` | F | →Font size/4xl | LINE_HEIGHT | oui | 2301:1636 | 104 | 66 | 1 | 0 |
| `Line height/5xl` | F | →Font size/5xl | LINE_HEIGHT | oui | 2301:1628 | 640 | 272 | 1 | 0 |
| `Line height/6xl` | F | →Font size/6xl | LINE_HEIGHT | oui | 2301:1627 | 6 | 67 | 2 | 0 |
| `Line height/7xl` | F | →Font size/7xl | LINE_HEIGHT | oui | 2301:1641 | 72 | 175 | 2 | 0 |
| `Line height/8xl` | F | →Font size/8xl | LINE_HEIGHT | oui | 4306:583 | 0 | 19 | 2 | 0 |
| `Line height/9xl` | F | →Font size/9xl | LINE_HEIGHT | oui | 4306:584 | 34 | 8 | 1 | 0 |
| `Font weight/regular-italic` | S | "Regular italic" | FONT_STYLE | oui | 2301:1570 | 0 | 0 | 0 | 0 |
| `Font weight/medium` | S | "Medium" | FONT_STYLE | oui | 2301:1569 | 1816 | 1928 | 5 | 0 |
| `Font weight/medium-italic` | S | "Medium italic" | FONT_STYLE | oui | 2301:1568 | 0 | 0 | 0 | 0 |
| `Font weight/semibold` | S | "Semibold" | FONT_STYLE | oui | 2301:1567 | 0 | 4 | 0 | 0 |
| `Font weight/semibold-italic` | S | "Semibold italic" | FONT_STYLE | oui | 2301:1566 | 0 | 0 | 0 | 0 |
| `Font weight/bold` | S | "Bold" | FONT_STYLE | oui | 2301:1564 | 112 | 68 | 7 | 0 |
| `Font weight/bold-italic` | S | "Bold italic" | FONT_STYLE | oui | 2301:1565 | 0 | 0 | 0 | 0 |
| `Paragraph spacing/xxs` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2291 | 52 | 32 | 2 | 0 |
| `Paragraph spacing/xs` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2292 | 1580 | 1082 | 6 | 0 |
| `Paragraph spacing/sm` | F | 0 | PARAGRAPH_INDENT | oui | 2305:2293 | 0 | 0 | 0 | 0 |
| `Paragraph spacing/md` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2294 | 1573 | 1536 | 3 | 0 |
| `Paragraph spacing/lg` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2295 | 778 | 1118 | 2 | 0 |
| `Paragraph spacing/xl` | F | 8 | PARAGRAPH_SPACING | oui | 2305:2296 | 1861 | 1554 | 4 | 0 |
| `Paragraph spacing/2xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2297 | 184 | 252 | 2 | 0 |
| `Paragraph spacing/3xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2298 | 122 | 265 | 4 | 0 |
| `Paragraph spacing/4xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2299 | 660 | 274 | 1 | 0 |
| `Paragraph spacing/5xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2300 | 114 | 72 | 1 | 0 |
| `Paragraph spacing/6xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2301 | 44 | 74 | 2 | 0 |
| `Paragraph spacing/7xl` | F | 0 | PARAGRAPH_SPACING | oui | 2305:2302 | 72 | 138 | 2 | 0 |
| `Paragraph spacing/8xl` | F | 0 | PARAGRAPH_SPACING | oui | 4306:593 | 0 | 0 | 0 | 0 |
| `Paragraph spacing/9xl` | F | 0 | PARAGRAPH_SPACING | oui | 4306:594 | 0 | 0 | 0 | 0 |

#### Collection « Color Mode » — modes : Light Mode,Dark Mode

| Variable | Type | Valeur(s) par mode | Scopes | Masquée | ID | Nœuds site | Nœuds hors site | Styles | Alias entrants |
|---|---|---|---|---|---|---:|---:|---:|---:|
| `bg/primary` | C | →Basics/white / →Gray/Cararra/950 | ALL | non | 6307:68 | 62 | 111 | 0 | 0 |
| `bg/secondary` | C | →Gray/Cararra/100 / #50483e33 | ALL | non | 7517:12758 | 5 | 205 | 0 | 1 |
| `bg/brand-primary` | C | →Pomegranate/100 / #42080a80 | ALL | non | 6314:322 | 3 | 41 | 0 | 0 |
| `bg/brand-secondary` | C | →Pomegranate/200 / →Pomegranate/900 | ALL | non | 7643:7217 | 0 | 22 | 0 | 0 |
| `bg/invert` | C | →Gray/Cararra/950 / →Gray/Cararra/50 | ALL | non | 6331:1357 | 31 | 37 | 0 | 0 |
| `text/primary` | C | →Gray/Cararra/950 / →Gray/Cararra/50 | ALL | non | 6307:129 | 4822 | 3868 | 0 | 0 |
| `text/on-dark/primary` | C | →Gray/Cararra/50 / →Gray/Cararra/950 | ALL | non | 6331:1355 | 1355 | 445 | 0 | 0 |
| `text/on-dark/secondary` | C | →Gray/Cararra/200 / →Gray/Cararra/800 | ALL | non | 6331:1356 | 329 | 90 | 0 | 0 |
| `text/secondary` | C | →Gray/Cararra/800 / →Gray/Cararra/200 | ALL | non | 6314:212 | 923 | 2099 | 0 | 0 |
| `text/tertiary` | C | →Gray/Cararra/600 / →Gray/Cararra/400 | ALL | non | 7517:7205 | 5 | 717 | 0 | 0 |
| `text/brand` | C | →Pomegranate/500 / →Pomegranate/500 | ALL | non | 7517:7195 | 54 | 544 | 0 | 0 |
| `qonto/purple/purple-light` | C | #d5c8fb / #d5c8fb | ALL | non | 6487:3629 | 5 | 6 | 0 | 0 |
| `qonto/purple/purple-dark` | C | #9b81f6 / #9b81f6 | ALL | non | 6487:3630 | 8 | 8 | 0 | 0 |
| `qonto/orange/orange-light` | C | #ffeadd / #ffeadd | ALL | non | 6487:3631 | 17 | 1 | 0 | 0 |
| `qonto/orange/orange-dark` | C | #ffd6bc / #ffd6bc | ALL | non | 6487:3632 | 24 | 0 | 0 | 0 |
| `qonto/yellow/yellow-light` | C | #f4f8ac / #f4f8ac | ALL | non | 6487:3633 | 0 | 0 | 0 | 0 |
| `qonto/yellow/yellow-dark` | C | #f1f78e / #f1f78e | ALL | non | 6487:3634 | 0 | 0 | 0 | 0 |
| `qonto/green/green-light` | C | #cef6e9 / #cef6e9 | ALL | non | 6487:3635 | 114 | 25 | 0 | 0 |
| `qonto/green/green-dark` | C | #b0f0da / #b0f0da | ALL | non | 6487:3636 | 92 | 22 | 0 | 0 |
| `border/primary` | C | →Gray/Cararra/100 / →Gray/Cararra/900 | ALL | non | 7517:12731 | 0 | 465 | 0 | 0 |
| `border/secondary` | C | →Gray/Cararra/50 / →bg/secondary | ALL | non | 7559:2121 | 0 | 79 | 0 | 0 |
| `border/brand-primary` | C | →Pomegranate/200 / →Pomegranate/900 | ALL | non | 7595:34784 | 0 | 35 | 0 | 0 |
| `border/brand-secondary` | C | →Pomegranate/300 / →Pomegranate/950 | ALL | non | 7643:7216 | 0 | 0 | 0 | 0 |

#### Collection « Guides » — modes : Mode 1

| Variable | Type | Valeur(s) par mode | Scopes | Masquée | ID | Nœuds site | Nœuds hors site | Styles | Alias entrants |
|---|---|---|---|---|---|---:|---:|---:|---:|
| `Guidelines/Desktop/1-col` | F | 78 | WIDTH_HEIGHT | oui | 2312:7081 | 0 | 0 | 0 | 0 |
| `Guidelines/Landing/container` | F | 1374 | ALL | non | 7517:7193 | 0 | 139 | 0 | 0 |
| `Guidelines/Desktop/2-col` | F | 180 | WIDTH_HEIGHT | oui | 2312:7082 | 1 | 0 | 0 | 0 |
| `Guidelines/Desktop/3-col` | F | 282 | WIDTH_HEIGHT | oui | 2312:7083 | 0 | 0 | 0 | 0 |
| `Guidelines/Desktop/4-col` | F | 384 | WIDTH_HEIGHT | oui | 2312:7084 | 38 | 7 | 0 | 0 |
| `Guidelines/Desktop/5-col` | F | 486 | WIDTH_HEIGHT | oui | 2312:7085 | 0 | 0 | 0 | 0 |
| `Guidelines/Desktop/6-col` | F | 588 | WIDTH_HEIGHT | oui | 2312:7086 | 3 | 18 | 0 | 0 |
| `Guidelines/Desktop/7-col` | F | 690 | WIDTH_HEIGHT | oui | 2312:7087 | 0 | 0 | 0 | 0 |
| `Guidelines/Desktop/8-col` | F | 792 | WIDTH_HEIGHT | oui | 2312:7088 | 33 | 18 | 0 | 0 |
| `Guidelines/Desktop/9-col` | F | 894 | WIDTH_HEIGHT | oui | 2312:7089 | 1 | 0 | 0 | 0 |
| `Guidelines/Desktop/10-col` | F | 996 | WIDTH_HEIGHT | oui | 2312:7090 | 0 | 2 | 0 | 0 |
| `Guidelines/Desktop/11-col` | F | 1098 | WIDTH_HEIGHT | oui | 2312:7091 | 0 | 0 | 0 | 0 |
| `Guidelines/Desktop/12-col` | F | 1200 | WIDTH_HEIGHT | oui | 2312:7092 | 5 | 18 | 0 | 0 |
| `Prototype/desktop-width` | F | 1440 | ALL | non | 6304:58 | 31 | 13 | 0 | 0 |
| `Prototype/desktop-height` | F | 900 | ALL | non | 6304:59 | 31 | 13 | 0 | 0 |
| `Prototype/mobile-width` | F | 393 | ALL | non | 6446:12839 | 2 | 2 | 0 | 0 |
| `Prototype/mobile-height` | F | 852 | ALL | non | 6446:12840 | 0 | 0 | 0 | 0 |

#### Collection « Colors » — modes : Mode 1

| Variable | Type | Valeur(s) par mode | Scopes | Masquée | ID | Nœuds site | Nœuds hors site | Styles | Alias entrants |
|---|---|---|---|---|---|---:|---:|---:|---:|
| `Basics/white` | C | #ffffff | ALL | oui | 4306:287 | 273 | 53 | 0 | 1 |
| `Basics/black` | C | #000000 | ALL | oui | 4306:285 | 598 | 191 | 0 | 0 |
| `Basics/transparent` | C | #ffffff00 | ALL | oui | 4306:286 | 0 | 0 | 0 | 0 |
| `Pomegranate/50` | C | #fff3ed | ALL | oui | 6302:24 | 0 | 1 | 0 | 0 |
| `Pomegranate/100` | C | #fee3d6 | ALL | oui | 6302:26 | 0 | 58 | 0 | 1 |
| `Pomegranate/200` | C | #fdc3ab | ALL | oui | 6302:28 | 42 | 9 | 0 | 2 |
| `Pomegranate/300` | C | #fb9976 | ALL | oui | 6302:30 | 0 | 1 | 0 | 1 |
| `Pomegranate/400` | C | #f8653f | ALL | oui | 6302:32 | 0 | 27 | 0 | 0 |
| `Pomegranate/500` | C | #f63f1b | ALL | oui | 6302:34 | 246 | 98 | 0 | 2 |
| `Pomegranate/600` | C | #e7240f | ALL | oui | 6302:36 | 0 | 2 | 0 | 0 |
| `Pomegranate/700` | C | #c0160e | ALL | oui | 6302:38 | 0 | 31 | 0 | 0 |
| `Pomegranate/800` | C | #981514 | ALL | oui | 6302:40 | 0 | 1 | 0 | 0 |
| `Pomegranate/900` | C | #7b1413 | ALL | oui | 6302:42 | 0 | 1 | 0 | 2 |
| `Pomegranate/950` | C | #42080a | ALL | oui | 6302:44 | 0 | 1 | 0 | 1 |
| `Gray/Zinc/50` | C | #f5f5f6 | ALL | oui | 4306:303 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/100` | C | #e6e6e7 | ALL | oui | 4306:305 | 1 | 0 | 0 | 0 |
| `Gray/Zinc/200` | C | #cfcfd2 | ALL | oui | 4306:307 | 1 | 0 | 0 | 0 |
| `Gray/Zinc/300` | C | #adadb3 | ALL | oui | 4306:309 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/400` | C | #84848c | ALL | oui | 4306:311 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/500` | C | #71717a | ALL | oui | 4306:313 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/600` | C | #5a5a60 | ALL | oui | 4306:315 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/700` | C | #4d4c52 | ALL | oui | 4306:317 | 8 | 0 | 0 | 0 |
| `Gray/Zinc/800` | C | #434347 | ALL | oui | 4306:319 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/900` | C | #3c3b3e | ALL | oui | 4306:321 | 0 | 0 | 0 | 0 |
| `Gray/Zinc/950` | C | #252527 | ALL | oui | 4306:323 | 0 | 0 | 0 | 0 |
| `Gray/Cararra/50` | C | #f7f7f5 | ALL | oui | 4306:409 | 7 | 15 | 0 | 4 |
| `Gray/Cararra/100` | C | #edece6 | ALL | oui | 4306:411 | 397 | 51 | 0 | 2 |
| `Gray/Cararra/200` | C | #dbd8cd | ALL | oui | 4306:413 | 43 | 9 | 0 | 2 |
| `Gray/Cararra/300` | C | #c4c0ad | ALL | oui | 4306:415 | 3 | 0 | 0 | 0 |
| `Gray/Cararra/400` | C | #aba38c | ALL | oui | 4306:417 | 8 | 0 | 0 | 1 |
| `Gray/Cararra/500` | C | #9a8f75 | ALL | oui | 4306:419 | 0 | 0 | 0 | 0 |
| `Gray/Cararra/600` | C | #8d7f69 | ALL | oui | 4306:421 | 0 | 0 | 0 | 1 |
| `Gray/Cararra/700` | C | #766a58 | ALL | oui | 4306:423 | 0 | 0 | 0 | 0 |
| `Gray/Cararra/800` | C | #61564b | ALL | oui | 4306:425 | 0 | 0 | 0 | 2 |
| `Gray/Cararra/900` | C | #50483e | ALL | oui | 4306:427 | 0 | 13 | 0 | 1 |
| `Gray/Cararra/950` | C | #2a2520 | ALL | oui | 4306:429 | 0 | 0 | 0 | 4 |
| `Jade/50` | C | #ebfef4 | ALL | non | 7547:16344 | 0 | 6 | 0 | 0 |
| `Jade/100` | C | #d0fbe3 | ALL | non | 7547:16345 | 0 | 0 | 0 | 0 |
| `Jade/200` | C | #a4f6cd | ALL | non | 7547:16346 | 0 | 0 | 0 | 0 |
| `Jade/300` | C | #6aebb3 | ALL | non | 7547:16347 | 0 | 0 | 0 | 0 |
| `Jade/400` | C | #2fd894 | ALL | non | 7547:16348 | 0 | 0 | 0 | 0 |
| `Jade/500` | C | #0abf7c | ALL | non | 7547:16349 | 0 | 142 | 0 | 0 |
| `Jade/600` | C | #00a76d | ALL | non | 7547:16350 | 0 | 0 | 0 | 0 |
| `Jade/700` | C | #007c54 | ALL | non | 7547:16351 | 0 | 0 | 0 | 0 |
| `Jade/800` | C | #036243 | ALL | non | 7547:16352 | 0 | 0 | 0 | 0 |
| `Jade/900` | C | #045039 | ALL | non | 7547:16353 | 0 | 0 | 0 | 0 |
| `Jade/950` | C | #012d21 | ALL | non | 7547:16354 | 0 | 44 | 0 | 0 |

#### Collection « Social » — modes : Mode 1

| Variable | Type | Valeur(s) par mode | Scopes | Masquée | ID | Nœuds site | Nœuds hors site | Styles | Alias entrants |
|---|---|---|---|---|---|---:|---:|---:|---:|
| `Facebook/Width` | F | 1200 | ALL | non | 8607:8858 | 18 | 0 | 0 | 0 |
| `Facebook/Height` | F | 630 | ALL | non | 8607:8859 | 9 | 0 | 0 | 0 |
| `Twitter/Width` | F | 1200 | ALL | non | 8607:8860 | 0 | 0 | 0 | 0 |
| `Twitter/Height` | F | 675 | ALL | non | 8607:8861 | 9 | 0 | 0 | 0 |

**Variables sans aucune utilisation** (ni nœud, ni style, ni alias) : `Font family/font-family_accent`, les 4 `Font weight/*-italic`, `Paragraph spacing/sm`, `Paragraph spacing/8xl`, `Paragraph spacing/9xl`, `Guidelines/Desktop/1|3|5|7|11-col`, `Basics/transparent`, `Gray/Zinc/50|300|400|500|600|800|900|950`, `Gray/Cararra/500|700`, `Prototype/mobile-height`, `qonto/yellow/*`, `Jade/100|200|300|400|600|700|800|900`, `border/brand-secondary`, `Twitter/Width`.

**Pages de séparation** (12 pages « — … — ») : vides.

## 3. Inventaire — Starter (référence d’architecture)

| Collection | Modes | Nb | Contenu (valeurs) | Scopes / masquage / codeSyntax |
|---|---|---:|---|---|
| 0. Primitives - Measures | Mode 1 | 26 | `0 (0)`=0, `1 (2px)`=2, `2 (4px)`=4, `3 (8px)`=8, `4 (12px)`=12, `5 (16px)`=16, `6 (24px)`=24, `7 (32px)`=32, `8 (48px)`=48, `9 (64px)`=64, `10 (96px)`=96, `11 (128px)`=128, `full`=9999 ; `Radius/none\|xs\|sm\|md\|lg\|xl\|2xl\|3xl\|4xl\|5xl\|6xl\|7xl\|full` → alias 0/2/4/8/12/16/24/32/48/64/96/128/full | mesures : scopes vides ; Radius : CORNER_RADIUS, masqués ; pas de codeSyntax |
| 1. Primitives - Colors | Mode 1 | 42 | `Basics/white` #ffffff, `Basics/black` #0c0a09, `Basics/transparent` #ffffff00 ; `Neutral/50→950` (#f4f4f4 … #0c1134, gris bleutés) ; `Brand/primary/50→950` (verts #eafbee … #0f4a1f, **925 et 950 = #0c1134, un neutre**) ; `Status/Error\|Success\|Warning\|Info` (+ light) ; `Brand/blue\|green-bright\|orange\|yellow/500\|100` | **ALL** partout ; neutres et basics masqués |
| 2. Primitives - Typography | Mode 1 / Mobile | 65 | familles display/body/accent = Inter, email = Arial ; graisses light/regular/medium/**Semibold**/bold ; tailles xxs 10 → 9xl 128 (Mobile 2xl 22 … 9xl 60) ; interlignes (7xl–9xl en alias vers une bibliothèque externe) ; `Letter spacing/*` → alias `tracking/normal` (xxs–xl) ou `tracking/tight` (2xl–9xl) ; `Paragraph spacing/*` → alias `0 (0)` (**sm en scope PARAGRAPH_INDENT**) | TEXT_CONTENT ajouté à la plupart des scopes, tout masqué |
| 3. Responsive - Grid | Mode 1 | 36 | `desktop/col/1→12-col` 78→1200 ; desktop Frame 1440 / 12 col / gutter 24 / margin 120 ; tablet 991 / 6 / 16 / 24 ; mobile 478 / 4 / 16 / 16 ; desktop-large 1920 / 12 / 24 / 200 ; mobile-landscape 767 / 4 / 16 / 24 ; `layout/max-width` 1200, `layout/padding/desktop\|tablet\|mobile` 120/24/16 | **ALL** sauf col (WIDTH_HEIGHT ; 1-col a TEXT_CONTENT) — une variable par breakpoint au lieu de modes |
| 4. Tokens - Colors | Mode 1 | 105 | `client/*`, `bg/default\|subtle\|muted\|invert\|brand`, `text/primary\|secondary\|tertiary\|accent\|on-brand\|on-invert\|disabled`, `link/*`, `border/default\|strong\|brand\|error`, `cta/*`, `input/*`, `status/*`, `btn/primary\|secondary\|ghost\|icon\|invert\|text\|footer/*`, `nav/*`, `modal/*`, `focus/ring`, `overlay/bg` (#00000080 en dur), `faq/accent`, `tag/*`, `checkbox/*`, `pagination/*`, `switch/*`, `accent/blue\|green\|orange\|yellow/*` | **ALL** partout, **un seul mode** (pas de Dark) |
| 5. Tokens - Spacing | Comfortable / Compact / Mobile | 15 | `component/gap/none\|xs\|sm\|md\|lg` 0/4/8/16/24 (compact 0/2/4/8/16) ; `component/padding/none\|xs\|sm\|md\|lg` 0/8/16/24/32 ; `section/gap/none\|sm\|md\|lg\|xl` 0/48/64/96/128 (compact 0/32/48/64/96) | GAP ✓ |
| 6. Tokens - Radius | Mode 1 | 13 | `radius/control` → Radius/sm (4), `radius/surface` → Radius/lg (12), `radius/pill` → full ; `component/button\|card\|input\|modal\|image/radius` → surface ; `badge\|tag\|switch` → pill ; `pagination\|checkbox` → control | CORNER_RADIUS, **ALL** sur radius/* et 3 component |
| 7. Tokens - Border | Mode 1 | 7 | `Border/0\|1\|2` ; `border/width/none\|default\|strong\|focus` → 0/1/2/2 | **ALL** |
| 8. Tokens - Typography | Mode 1 | 3 | `tracking/tight\|normal\|wide` → **tous 0** | **ALL** |
| Support print | Mode 1 | 14 | formats de dépliant (hors sujet) | ALL |

## 4. Inventaire — LinkedIn 2.0 (périmètre web)

Collections lues : 1. Foundation, 2. Color Mode, 5. Web · Neutrals, 6. Web · Scale, 7. Web · Semantic (+ `paragraph-spacing/*` et `letter-spacing/*` de 3. Typography, utilisés par les styles web). Exclus : carrousels (`3. Typography` modes Carrousel/Reco, `canvas/*`, `reco/*`, `Cover/*`, tailles 32–232 px). **Premier mode de 2. Color Mode et 7. Web · Semantic = Dark.**

| Collection | Variable | Valeur(s) | Scopes | codeSyntax |
|---|---|---|---|---|
| 1. Foundation | `colors/basic/white` · `colors/basic/black` | #ffffff · #000000 | fills/text/stroke/effect, masquées | — |
| 1. Foundation | `colors/cream` · `colors/brown/light` · `colors/brown/dark` · `colors/brown/darker` | #fce6d2 · #f2eee9 · #350c04 · #250803 | idem | — |
| 1. Foundation | `colors/brand/orange` · `colors/neutral/grey` | #f63f1b · #a8a29b | idem | — |
| 1. Foundation | `font/basic-font` · `font/title-font` · `font/cover-font` | Geist · Bricolage Grotesque 48pt Condensed · Bricolage Grotesque 72pt Condensed | FONT_FAMILY | — |
| 2. Color Mode (Dark / Light) | `background/primary\|secondary\|white\|brand\|inverse` | brown/dark·brown/light · brown/darker·cream · white · orange · cream·brown/dark | FRAME_FILL, SHAPE_FILL | — |
| 2. Color Mode | `text/primary\|secondary\|brand\|body` | white·brown/dark · grey·**#6e4436** · orange·**#c9330e** · cream·**#350c04d9** | TEXT_FILL | — |
| 2. Color Mode | `text/on-brand-primary\|on-brand-secondary\|on-white` | white · cream · brown/dark | TEXT_FILL | — |
| 2. Color Mode | `border/primary` · `border/subtle` | **#fce6d24d**·brown/dark · **#ffffff26**·**#350c0426** | STROKE_COLOR | — |
| 2. Color Mode | `icon/primary\|brand\|on-brand` | white·brown/dark · orange · white | fills/text/stroke | — |
| 5. Web · Neutrals | `neutral/50→950` | #faf8f6 · #f3f0ec · #e6e1da · #d4ccc2 · #b3a99d · #928779 · #736a5e · #574f45 · #3d362e · #29231d · #191410 | fills/text/stroke/effect (non masquées) | `var(--neutral-50)`… |
| 6. Web · Scale | `web/text/xs\|sm\|md\|lg\|xl` | 12 · 14 · 16 · 18 · 20 | FONT_SIZE | `var(--text-xs)`… |
| 6. Web · Scale | `web/leading/xs\|sm\|md\|lg\|xl` | 18 · 21 · 24 · 28 · 30 | LINE_HEIGHT | `var(--leading-xs)`… |
| 6. Web · Scale | `web/heading/h6→h1` | 20 · 24 · 30 · 36 · 48 · 60 | FONT_SIZE | `var(--h6)`… |
| 6. Web · Scale | `web/heading-leading/h6→h1` | 26 · 30 · 36 · 42 · 54 · 66 | LINE_HEIGHT | `var(--h6-lh)`… |
| 6. Web · Scale | `web/space/0-5\|1\|2\|3\|4\|5\|6\|8\|10\|12\|16` | 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 | GAP | `var(--space-…)` |
| 6. Web · Scale | `radius/ui/xs\|sm\|md\|lg\|pill` | 4 · 6 · 8 · 12 · 999 | CORNER_RADIUS | `var(--radius-…)` |
| 6. Web · Scale | `bp/mobile\|tablet\|desktop` · `container/max` · `container/gutter` · `focus/ring-width` | 375 · 768 · 1280 · 1280 · 24 · 2 | WIDTH_HEIGHT / GAP / STROKE_FLOAT | `var(--bp-…)`… |
| 7. Web · Semantic (Dark / Light) | `web/text/primary\|secondary\|muted\|on-brand` | cream·brown/dark · neutral/300·neutral/700 · neutral/500·neutral/500 · white | TEXT_FILL | `var(--web-text-…)` |
| 7. Web · Semantic | `web/bg/page\|raised\|sunken\|brand` | brown/darker·white · brown/dark·neutral/50 · neutral/950·neutral/100 · orange | FRAME_FILL, SHAPE_FILL | `var(--web-bg-…)` |
| 7. Web · Semantic | `web/border/default\|strong\|focus` · `web/focus-ring` | **#fce6d226**·neutral/200 · **#fce6d24d**·neutral/300 · orange · orange | STROKE_COLOR (+EFFECT_COLOR) | `var(--web-border-…)` |
| 7. Web · Semantic | `web/interaction/hover\|active\|pressed` | **#ffffff14**·**#0000000a** · **#ffffff1f**·**#00000014** · **#ffffff29**·**#0000001f** | FRAME_FILL, SHAPE_FILL | `var(--web-interaction-…)` |
| 7. Web · Semantic | `feedback/success\|error\|warning\|info/bg\|text\|border` | 24 valeurs **toutes en dur** (voir § 7) | par rôle | `var(--feedback-…)` |
| 3. Typography (utilisées par Web/*) | `paragraph-spacing/2xs\|xs\|sm\|md\|lg\|xl\|2xl\|3xl\|4xl` · `letter-spacing/none\|tight\|tighter` | 8·12·16·20·24·32·40·48·64 · **0 / -1 / -2 (px)** | PARAGRAPH_SPACING / LETTER_SPACING | — |

**Usage réel de Bricolage dans LinkedIn 2.0** (segments de texte, toutes pages) : 48pt Condensed de 20 à 96 px (SemiBold surtout à 32–64 px, Bold/ExtraBold jusqu’à 96–176 px), 72pt Condensed de 80 à 232 px (Cover ExtraBold), 36pt Condensed pour les très gros chiffres 136–350 px, et la famille de base (non condensée) pour quelques petits textes 12–56 px.

## 5. Styles de texte et d’effet

### 5.1 Portfolio — 29 styles de texte (état initial)

| Style | Police | Taille / interligne | Tracking | Variables liées | Anomalies |
|---|---|---|---|---|---|
| text/xxs/regular · text/xxs/bold | PP Neue Montreal Regular · Bold | 10 / 10 | 0 % | family body, weight, size xxs, LH xxs, PS xxs | — |
| text/xs/regular · text/xs/bold | Regular · Bold | 12 / 12 | 0 % | size xs, LH xs, PS xs | interligne 100 % |
| text/sm/regular · medium · regular stroked · bold | Regular · Medium · Regular (barré) · Bold | 14 / 18 | 0 % | size sm, LH sm, **PS xs** | PS lié à xs |
| text/md/regular · medium · bold | Regular · Medium · Bold | 16 / 20 | 0 % | size md, LH md, PS md | — |
| text/lg/regular · medium · bold | Regular · Medium · Bold | 18 / 24 | 0 % | size lg, LH lg, PS lg (**bold : PS xl = 8**) | incohérence PS sur bold |
| text/xl/regular · medium · bold | Regular · Medium · Bold | 20 / 28 | 0 % | size xl, LH xl, PS xl (8) | — |
| display/2xl/regular · display/2xl/bold | Regular · **Bold** | 24 / 30 | −2 % | family display, size 2xl, **LH 3xl**, PS 2xl | LH lié à 3xl |
| display/3xl/regular | Regular | 30 / 30 | −2 % | size/LH/PS 3xl | — |
| display/4xl/regular | Regular | 36 / 36 | −2 % | 4xl | — |
| display/5xl/regular | Regular | 48 / 48 | −2 % | 5xl | — |
| display/6xl/regular · display/6xl/bold | Regular · **Medium** | 60 / 60 | −2 % | 6xl | « bold » en Medium |
| display/7xl/regular · display/7xl/bold | Regular · **Medium** | 72 / 72 | −2 % | 7xl (**bold : pas de fontStyle lié**) | « bold » en Medium |
| display/8xl/regular · display/8xl/bold | Regular · **Medium** | 96 / 96 | −2 % | 8xl, **PS 3xl** (**bold : pas de fontStyle lié**) | — |
| display/9xl/regular | Regular | 128 / 128 | −2 % | 9xl, **PS 3xl** | — |

Aucun style ne lie `letterSpacing` (le −2 % est saisi en dur). Aucun style d’effet.

### 5.2 Starter

34 styles : `text/xxs|xs/regular|bold`, `text/sm|md|xl/light|regular|bold (+ md/medium, lg/regular|medium|bold)`, `display/2xl/light|regular|bold`, `display/3xl|5xl|6xl|7xl|8xl|9xl/regular`, `display/4xl/light|regular`, `print/xxs→xl` — tous en **Inter**, letterSpacing lié à `Letter spacing/*` mais **en pixels (0 px)**, paragraphSpacing lié à des variables d’une **bibliothèque externe**. Effets : `shadow/sm` (0/1/2, noir 5 %), `shadow/md` (0/4/12, 8 %), `shadow/lg` (0/8/32, 10 %), `shadow/xl` (0/24/64/−8, 12 %), `focus-ring` (anneau 4 px violet #9e77ed + 2 px blanc).

### 5.3 LinkedIn 2.0 (web)

| Style | Police | Taille / interligne | Tracking | Variables liées |
|---|---|---|---|---|
| Web/Body/xs · sm · md · lg · xl | Geist Regular | 12/18 · 14/21 · 16/24 · 18/28 · 20/30 | 0 % | size + leading + paragraph-spacing (**pas la famille**) |
| Web/Body/sm-medium · md-medium · md-semibold | Geist Medium · Medium · SemiBold | 14/21 · 16/24 · 16/24 | 0 % | idem |
| Web/Heading/h6 → h1 | Bricolage Grotesque 48pt Condensed SemiBold | 20/26 · 24/30 · 30/36 · 36/42 · 48/54 · 60/66 | 0 % | size + leading + PS (**pas la famille**) |

Effets web : `web/shadow/xs` (0/1/2 noir 5 %), `web/shadow/sm` (0/1/2 6 % + 0/1/3 8 %), `web/shadow/md` (0/2/4 6 % + 0/4/8 8 %), `web/shadow/lg` (0/6/12 10 % + 0/12/24 12 %) — noir pur, non liés à des variables. (Les `shadow/sm|md|lg` 20–35 % concernent les carrousels.)

## 6. Table de correspondance

Action : **garder** (nom inchangé, liaisons conservées) · **renommer** (liaisons conservées) · **créer** · **déplacer** (créer dans la nouvelle collection + rebinder + déprécier l’ancienne) · **déprécier** (déplacée dans `zz-deprecated/` de sa collection, description = remplaçant).

### 6.1 Collections

| Actuelle | Cible | Action | Modes cible |
|---|---|---|---|
| — | 0. Primitives - Measures | créer | Value |
| Colors | 1. Primitives - Colors | renommer | Value |
| Typography | 2. Primitives - Typography | renommer + modes | Desktop (ex-Mode 1, défaut) · Desktop XL · Tablet · Mobile |
| Guides | 3. Responsive - Layout | renommer + modes | Desktop (défaut) · Desktop XL · Tablet · Mobile |
| Color Mode | 4. Tokens - Colors | renommer | Light (ex-Light Mode, défaut) · Dark (ex-Dark Mode) |
| — | 5. Tokens - Spacing | créer | Desktop · Desktop XL · Tablet · Mobile |
| — | 6. Tokens - Radius | créer | Value |
| — | 7. Tokens - Border | créer | Value |
| — | 8. Tokens - Typography | créer | Value |
| — | Projects | créer (reçoit qonto/*) | Value |
| Social | Formats | renommer | Value |

Le mode par défaut reste **Desktop** (= « main » de Webflow) : c’est le premier mode existant, l’API ne permet pas de réordonner les modes ; l’ordre affiché est donc Desktop, Desktop XL, Tablet, Mobile.

### 6.2 Primitives - Colors

| Actuelle / source | Cible | Action | codeSyntax WEB |
|---|---|---|---|
| Basics/white | `basic/white` | renommer | `var(--basic-white)` |
| Basics/black | `basic/black` | renommer | `var(--basic-black)` |
| Basics/transparent (#ffffff, opacité 0 ✓) | `basic/transparent` | renommer | `var(--basic-transparent)` |
| Pomegranate/50→950 | `brand-orange/50→950` | renommer | `var(--brand-orange-*)` |
| LinkedIn `text/brand` Light #c9330e (en dur) | `brand-orange/650` | créer | `var(--brand-orange-650)` |
| LinkedIn `colors/cream` | `brand/cream` | créer | `var(--brand-cream)` |
| LinkedIn `colors/brown/light` | `brand/brown-light` | créer | `var(--brand-brown-light)` |
| LinkedIn `text/secondary` Light #6e4436 (en dur) | `brand/brown-mid` | créer | `var(--brand-brown-mid)` |
| LinkedIn `colors/brown/dark` | `brand/brown-dark` | créer | `var(--brand-brown-dark)` |
| LinkedIn `colors/brown/darker` | `brand/brown-darker` | créer | `var(--brand-brown-darker)` |
| Gray/Cararra/50→950 | `neutral/50→950 (valeurs LinkedIn Web · Neutrals)` | renommer + nouvelles valeurs | `var(--neutral-*)` |
| — (anciennes valeurs Cararra) | `zz-deprecated/cararra/50→950` | créer (référence, remplaçant neutral/*) | `var(--zz-deprecated-cararra-*)` |
| Gray/Zinc/50→950 | `zz-deprecated/zinc/50→950` | déprécier (remplaçant neutral/*) | `var(--zz-deprecated-zinc-*)` |
| Jade/50→950 | `jade/50→950` | renommer (encore utilisé : 192 nœuds, landing Studio hors site) | `var(--jade-*)` |
| LinkedIn feedback/* (24 valeurs en dur) | `feedback/success\|error\|warning\|info/50\|200\|300\|700\|800\|950` | créer | `var(--feedback-<statut>-<palier>)` |
| LinkedIn transparences (#ffffff14/1f/29/26, #0000000a/14/1f, #fce6d226/4d, #350c0426/d9) | `alpha/white-8\|12\|15\|16, alpha/black-4\|8\|12, alpha/cream-15\|30, alpha/brown-dark-15\|85` | créer | `var(--alpha-*)` |
| — (voile, ombres) | `alpha/black-40\|60, alpha/brown-darker-5\|8\|12\|60` | créer | `var(--alpha-*)` |

Scopes : `FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR, EFFECT_COLOR` (couleurs, sans TEXT_CONTENT ni ALL). Toutes masquées de la publication.

### 6.3 Primitives - Typography

| Actuelle / source | Cible | Action | Scopes | codeSyntax WEB |
|---|---|---|---|---|
| Font family/font-family_display (PP Neue Montreal) | Font family/font-family_display = Bricolage Grotesque 48pt Condensed | garder + valeur | FONT_FAMILY | var(--font-family-display) |
| LinkedIn font/cover-font | Font family/font-family_display-xl = Bricolage Grotesque 72pt Condensed (Desktop XL, Desktop) / 48pt Condensed (Tablet, Mobile) | créer | FONT_FAMILY | var(--font-family-display) |
| Font family/font-family_body (PP Neue Montreal) | Font family/font-family_body = Geist | garder + valeur | FONT_FAMILY | var(--font-family-body) |
| Font family/font-family_accent (Degular Display) | Font family/font-family_accent = Bricolage Grotesque 48pt Condensed | garder + valeur | FONT_FAMILY | var(--font-family-display) |
| Font weight/regular · medium · bold | idem | garder | FONT_STYLE | var(--font-weight-regular)… |
| Font weight/semibold (« Semibold ») | Font weight/semibold = « SemiBold » | garder + corriger la valeur | FONT_STYLE | var(--font-weight-semibold) |
| — | Font weight/extrabold = « ExtraBold » | créer | FONT_STYLE | var(--font-weight-extrabold) |
| Font weight/regular-italic · medium-italic · semibold-italic · bold-italic | zz-deprecated/Font weight/…-italic | déprécier (aucun remplaçant : Geist et Bricolage sans italique) | — | — |
| Font size/xxs → 9xl | idem, 4 modes | garder | FONT_SIZE | var(--font-size-md)… |
| Line height/xxs → 9xl (2xl–9xl = alias des tailles) | idem, valeurs propres, 4 modes | garder + valeurs | LINE_HEIGHT | var(--line-height-md)… |
| — | Line height/prose-sm · prose-md · prose-lg | créer | LINE_HEIGHT | var(--line-height-prose-md)… |
| Paragraph spacing/* (sm en PARAGRAPH_INDENT) | idem ; sm → PARAGRAPH_SPACING | garder + corriger scope | PARAGRAPH_SPACING | var(--paragraph-spacing-md)… |
| — | Paragraph spacing/prose-sm · prose-md · prose-lg (16 · 20 · 24) | créer | PARAGRAPH_SPACING | var(--paragraph-spacing-prose-md)… |
| Starter Letter spacing/* · LinkedIn letter-spacing/* | Letter spacing/xxs → 9xl (alias vers tracking/*) | créer | LETTER_SPACING | var(--letter-spacing-md)… |

### 6.4 Responsive - Layout (ex-Guides)

| Actuelle / source | Cible | Action | Scopes | codeSyntax WEB |
|---|---|---|---|---|
| Guidelines/Desktop/n-col (1→12) | layout/col/n (1→12) | renommer + modes | WIDTH_HEIGHT | var(--layout-col-n) |
| Prototype/desktop-width (1440) | layout/frame/width (1920/1440/768/390) | renommer + modes | WIDTH_HEIGHT | var(--layout-frame-width) |
| Prototype/desktop-height (900) | layout/frame/height (1080/900/1024/844) | renommer + modes | WIDTH_HEIGHT | var(--layout-frame-height) |
| Prototype/mobile-width (393) · mobile-height (852) | zz-deprecated/prototype/mobile-width · mobile-height | déprécier (remplaçant : layout/frame/width|height en mode Mobile ; les 4 frames liés gardent 393 px) | WIDTH_HEIGHT | — |
| Guidelines/Landing/container (1374) | zz-deprecated/landing-container | déprécier (remplaçant : layout/container/contained ; 139 liaisons Studio conservées) | WIDTH_HEIGHT | — |
| — (décision) | layout/margin | créer | GAP | var(--layout-margin) |
| — (décision) · LinkedIn container/max | layout/container/contained | créer | WIDTH_HEIGHT | var(--layout-container-contained) |
| — (décision) | layout/container/narrow | créer | WIDTH_HEIGHT | var(--layout-container-narrow) |
| Starter */Columns · LinkedIn — | layout/grid/columns | créer | — (aucun scope : documentaire, liable aux grilles) | var(--layout-grid-columns) |
| Starter */Gutter · LinkedIn container/gutter | layout/grid/gutter | créer | GAP | var(--layout-grid-gutter) |

### 6.5 Tokens - Colors (ex-Color Mode) — correspondances

Toutes les valeurs Light/Dark sont au § 7. Scopes : texte `TEXT_FILL`, fonds `FRAME_FILL, SHAPE_FILL`, bordures `STROKE_COLOR`, focus `STROKE_COLOR, EFFECT_COLOR`, ombres `EFFECT_COLOR`. codeSyntax = `var(--<nom avec tirets>)` (ex. `var(--bg-page)`), sans préfixe `web-`.

| Actuelle (portfolio) | Source LinkedIn | Cible | Action |
|---|---|---|---|
| `text/primary` | web/text/primary | `text/primary` | renommer text/primary (Cararra 950/50) |
| `text/secondary` | web/text/secondary | `text/secondary` | garder text/secondary (Cararra 800/200) |
| `text/tertiary` | web/text/muted | `text/muted` | renommer text/tertiary |
| `text/brand` | Color Mode text/brand | `text/accent` | renommer text/brand |
| — | web/text/on-brand | `text/on-brand` | créer |
| `text/on-dark/primary` | Color Mode background/inverse + text | `text/on-invert` | renommer text/on-dark/primary |
| `text/on-dark/secondary` | — | `text/on-invert-secondary` | renommer text/on-dark/secondary |
| — | — (Starter) | `text/disabled` | créer |
| `bg/primary` | web/bg/page | `bg/page` | renommer bg/primary |
| — | web/bg/raised | `bg/raised` | créer |
| `bg/secondary` | web/bg/sunken | `bg/sunken` | renommer bg/secondary |
| — | web/bg/brand | `bg/brand` | créer |
| — | — | `bg/brand-strong` | créer |
| `bg/brand-primary` | — | `bg/brand-subtle` | renommer bg/brand-primary |
| `bg/brand-secondary` | — | `bg/brand-muted` | renommer bg/brand-secondary |
| `bg/invert` | Color Mode background/inverse | `bg/invert` | garder bg/invert (Cararra 950/50) |
| — | — (Starter) | `bg/media` | créer |
| `border/primary` | web/border/default | `border/default` | renommer border/primary |
| `border/secondary` | Color Mode border/subtle | `border/subtle` | renommer border/secondary |
| — | web/border/strong | `border/strong` | créer |
| `border/brand-primary` | — | `border/brand` | renommer border/brand-primary |
| `border/brand-secondary` | — | `border/brand-strong` | renommer border/brand-secondary (inutilisé) |
| — | web/border/focus | `border/focus` | créer |
| — | — (Starter) | `border/error` | créer |
| — | web/focus-ring | `focus-ring` | créer |
| — | web/interaction/hover | `interaction/hover` | créer |
| — | web/interaction/active | `interaction/active` | créer |
| — | web/interaction/pressed | `interaction/pressed` | créer |
| — | feedback/success/bg | `feedback/success/bg` | créer |
| — | feedback/success/text | `feedback/success/text` | créer |
| — | feedback/success/border | `feedback/success/border` | créer |
| — | feedback/error/bg | `feedback/error/bg` | créer |
| — | feedback/error/text | `feedback/error/text` | créer |
| — | feedback/error/border | `feedback/error/border` | créer |
| — | feedback/warning/bg | `feedback/warning/bg` | créer |
| — | feedback/warning/text | `feedback/warning/text` | créer |
| — | feedback/warning/border | `feedback/warning/border` | créer |
| — | feedback/info/bg | `feedback/info/bg` | créer |
| — | feedback/info/text | `feedback/info/text` | créer |
| — | feedback/info/border | `feedback/info/border` | créer |
| — | — (Starter) | `link/default` | créer |
| — | — (Starter) | `link/hover` | créer |
| — | — (Starter) | `link/visited` | créer |
| — | — (Starter) | `link/nav` | créer |
| — | — (Starter) | `link/footer` | créer |
| — | — | `btn/primary/bg/default` | créer |
| — | — | `btn/primary/bg/hover` | créer |
| — | — | `btn/primary/bg/active` | créer |
| — | — | `btn/primary/bg/disabled` | créer |
| — | — | `btn/primary/text/default` | créer |
| — | — | `btn/primary/text/disabled` | créer |
| — | — | `btn/secondary/bg/default` | créer |
| — | — | `btn/secondary/bg/hover` | créer |
| — | — | `btn/secondary/border/default` | créer |
| — | — | `btn/secondary/border/disabled` | créer |
| — | — | `btn/secondary/text/default` | créer |
| — | — | `btn/secondary/text/disabled` | créer |
| — | — | `btn/ghost/bg/default` | créer |
| — | — | `btn/ghost/bg/hover` | créer |
| — | — | `btn/ghost/text/default` | créer |
| — | — | `btn/ghost/text/disabled` | créer |
| — | — | `btn/invert/bg/default` | créer |
| — | — | `btn/invert/bg/hover` | créer |
| — | — | `btn/invert/text/default` | créer |
| — | — (Starter) | `input/bg/default` | créer |
| — | — | `input/bg/disabled` | créer |
| — | — | `input/border/default` | créer |
| — | — | `input/border/focus` | créer |
| — | — | `input/border/error` | créer |
| — | — | `input/text/default` | créer |
| — | — | `input/text/placeholder` | créer |
| — | — (Starter) | `nav/bg/default` | créer |
| — | — | `nav/bg/scrolled` | créer |
| — | — | `nav/text/default` | créer |
| — | — | `nav/text/active` | créer |
| — | — | `nav/border/scrolled` | créer |
| — | — (Starter) | `tag/bg/default` | créer |
| — | — | `tag/bg/hover` | créer |
| — | — | `tag/bg/selected` | créer |
| — | — | `tag/bg/disabled` | créer |
| — | — | `tag/text/default` | créer |
| — | — | `tag/text/selected` | créer |
| — | — | `tag/text/disabled` | créer |
| — | — (Starter) | `overlay/bg` | créer |
| — | — | `elevation/shadow-1` | créer |
| — | — | `elevation/shadow-2` | créer |
| — | — | `elevation/shadow-3` | créer |
| `qonto/purple\|orange\|yellow\|green/*` (8) | — | `Projects` › `qonto/*` (mêmes noms) | déplacer (création, rebind des 437 liaisons, puis `zz-deprecated/qonto/*`) |

### 6.6 Nouvelles collections numériques

| Cible | Source | Action | Scopes |
|---|---|---|---|
| 0. Primitives - Measures › `0 (0)` … `11 (128px)`, `full` | Starter | créer | aucun (alias uniquement) |
| 0. Primitives - Measures › `Radius/none` … `Radius/full` | Starter | créer | CORNER_RADIUS |
| 0. Primitives - Measures › `Radius/ui-sm` = 6 | LinkedIn radius/ui/sm (hors échelle) | créer | CORNER_RADIUS |
| 5. Tokens - Spacing › `component/gap\|padding/*`, `section/gap\|padding/*` | Starter (noms) + LinkedIn web/space (valeurs) | créer | GAP |
| 6. Tokens - Radius › `radius/control\|surface\|surface-lg\|media\|pill` + `component/*/radius` | Starter (noms) + LinkedIn radius/ui (valeurs) | créer | CORNER_RADIUS |
| 7. Tokens - Border › `border/width/none\|default\|strong\|focus` | Starter + LinkedIn focus/ring-width | créer | STROKE_FLOAT |
| 8. Tokens - Typography › `tracking/tighter\|tight\|normal\|wide` | Starter (noms) avec vraies valeurs | créer | LETTER_SPACING |
| Formats › `Facebook/*`, `Twitter/*` (ex-Social) | — | renommer la collection | WIDTH_HEIGHT |

Nommage « Bono. Brand » : les primitives (`basic/*`, `brand/*`, `brand-orange/*`, `neutral/*`, `feedback/*`, `alpha/*`) et la couche sémantique (`text/*`, `bg/*`, `border/*`, `interaction/*`, `feedback/*`, `focus-ring`) n’ont aucun préfixe propre au site : elles pourront être extraites telles quelles dans une bibliothèque partagée par LinkedIn 2.0 et le site. Les familles propres au web (`btn/*`, `input/*`, `nav/*`, `tag/*`, `link/*`, `layout/*`, `section/*`) restent dans le fichier site.

## 7. Couleurs — valeurs proposées

### 7.1 Primitives

| Primitive | Valeur |
|---|---|
| `basic/white` | #ffffff |
| `basic/black` | #000000 |
| `brand-orange/50` | #fff3ed |
| `brand-orange/100` | #fee3d6 |
| `brand-orange/200` | #fdc3ab |
| `brand-orange/300` | #fb9976 |
| `brand-orange/400` | #f8653f |
| `brand-orange/500` | #f63f1b |
| `brand-orange/600` | #e7240f |
| `brand-orange/650` | #c9330e |
| `brand-orange/700` | #c0160e |
| `brand-orange/800` | #981514 |
| `brand-orange/900` | #7b1413 |
| `brand-orange/950` | #42080a |
| `brand/cream` | #fce6d2 |
| `brand/brown-light` | #f2eee9 |
| `brand/brown-mid` | #6e4436 |
| `brand/brown-dark` | #350c04 |
| `brand/brown-darker` | #250803 |
| `neutral/50` | #faf8f6 |
| `neutral/100` | #f3f0ec |
| `neutral/200` | #e6e1da |
| `neutral/300` | #d4ccc2 |
| `neutral/400` | #b3a99d |
| `neutral/500` | #928779 |
| `neutral/600` | #736a5e |
| `neutral/700` | #574f45 |
| `neutral/800` | #3d362e |
| `neutral/900` | #29231d |
| `neutral/950` | #191410 |
| `feedback/success/50` | #e9f5ea |
| `feedback/success/200` | #bfe0c1 |
| `feedback/success/300` | #86ce8d |
| `feedback/success/700` | #2e6b33 |
| `feedback/success/800` | #2f5a34 |
| `feedback/success/950` | #16281a |
| `feedback/error/50` | #fcebe9 |
| `feedback/error/200` | #f3c3bd |
| `feedback/error/300` | #f19e93 |
| `feedback/error/700` | #b42318 |
| `feedback/error/800` | #7a2018 |
| `feedback/error/950` | #2c1512 |
| `feedback/warning/50` | #fdf4e5 |
| `feedback/warning/200` | #f2d9a0 |
| `feedback/warning/300` | #f0be4c |
| `feedback/warning/700` | #8a5a00 |
| `feedback/warning/800` | #6e5410 |
| `feedback/warning/950` | #2a2008 |
| `feedback/info/50` | #eaf1fb |
| `feedback/info/200` | #bcd3f0 |
| `feedback/info/300` | #82b0e8 |
| `feedback/info/700` | #1f5aa8 |
| `feedback/info/800` | #23496e |
| `feedback/info/950` | #101c2b |
| `basic/transparent` | #ffffff · 0 % |
| `alpha/white-8` | #ffffff · 8 % |
| `alpha/white-12` | #ffffff · 12 % |
| `alpha/white-15` | #ffffff · 15 % |
| `alpha/white-16` | #ffffff · 16 % |
| `alpha/black-4` | #000000 · 4 % |
| `alpha/black-8` | #000000 · 8 % |
| `alpha/black-12` | #000000 · 12 % |
| `alpha/black-40` | #000000 · 40 % |
| `alpha/black-60` | #000000 · 60 % |
| `alpha/cream-15` | #fce6d2 · 15 % |
| `alpha/cream-30` | #fce6d2 · 30 % |
| `alpha/brown-dark-15` | #350c04 · 15 % |
| `alpha/brown-dark-85` | #350c04 · 85 % |
| `alpha/brown-darker-5` | #250803 · 5 % |
| `alpha/brown-darker-8` | #250803 · 8 % |
| `alpha/brown-darker-12` | #250803 · 12 % |
| `alpha/brown-darker-60` | #250803 · 60 % |

### 7.2 Tokens sémantiques Light / Dark

| Token | Light | Dark | Usage |
|---|---|---|---|
| `text/primary` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 | Titres et texte fort |
| `text/secondary` | `neutral/700` #574f45 | `neutral/300` #d4ccc2 | Texte courant, sous-titres |
| `text/muted` | `neutral/600` #736a5e | `neutral/500` #928779 | Légendes, méta, placeholder (Light corrigé 500→600 pour AA) |
| `text/accent` | `brand-orange/650` #c9330e | `brand-orange/500` #f63f1b | Texte en orange de marque (Light #c9330e pour AA) |
| `text/on-brand` | `basic/white` #ffffff | `basic/white` #ffffff | Texte sur bg/brand-strong ou ≥24 px sur bg/brand |
| `text/on-invert` | `brand/cream` #fce6d2 | `brand/brown-dark` #350c04 | Texte sur bg/invert |
| `text/on-invert-secondary` | `neutral/300` #d4ccc2 | `neutral/700` #574f45 | Texte secondaire sur bg/invert |
| `text/disabled` | `neutral/400` #b3a99d | `neutral/600` #736a5e | Texte désactivé (exempté WCAG) |
| `bg/page` | `basic/white` #ffffff | `brand/brown-darker` #250803 | Fond de page |
| `bg/raised` | `neutral/50` #faf8f6 | `brand/brown-dark` #350c04 | Cartes, surfaces surélevées |
| `bg/sunken` | `neutral/100` #f3f0ec | `neutral/950` #191410 | Fonds en creux, zones de champ |
| `bg/brand` | `brand-orange/500` #f63f1b | `brand-orange/500` #f63f1b | Aplats orange ; texte blanc ≥24 px seulement |
| `bg/brand-strong` | `brand-orange/650` #c9330e | `brand-orange/650` #c9330e | Aplat orange foncé : texte blanc AA à toutes tailles (CTA) |
| `bg/brand-subtle` | `brand-orange/100` #fee3d6 | `brand-orange/950` #42080a | Fond teinté orange léger |
| `bg/brand-muted` | `brand-orange/200` #fdc3ab | `brand-orange/900` #7b1413 | Fond teinté orange marqué |
| `bg/invert` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 | Section inversée (footer, bandeaux) |
| `bg/media` | `neutral/100` #f3f0ec | `neutral/900` #29231d | Fond des panneaux média des études de cas |
| `border/default` | `neutral/200` #e6e1da | `alpha/cream-15` #fce6d2 · 15 % | Contours de cartes, dividers |
| `border/subtle` | `alpha/brown-dark-15` #350c04 · 15 % | `alpha/white-15` #ffffff · 15 % | Séparateurs discrets (LinkedIn border/subtle) |
| `border/strong` | `neutral/300` #d4ccc2 | `alpha/cream-30` #fce6d2 · 30 % | Séparateurs marqués, champs |
| `border/brand` | `brand-orange/200` #fdc3ab | `brand-orange/900` #7b1413 | Contour teinté orange |
| `border/brand-strong` | `brand-orange/500` #f63f1b | `brand-orange/500` #f63f1b | Contour orange plein |
| `border/focus` | `brand-orange/500` #f63f1b | `brand-orange/500` #f63f1b | Contour de focus clavier |
| `border/error` | `feedback/error/700` #b42318 | `feedback/error/300` #f19e93 | Contour de champ en erreur |
| `focus-ring` | `brand-orange/500` #f63f1b | `brand-orange/500` #f63f1b | Anneau de focus 2 px |
| `interaction/hover` | `alpha/black-4` #000000 · 4 % | `alpha/white-8` #ffffff · 8 % | Calque de survol |
| `interaction/active` | `alpha/black-8` #000000 · 8 % | `alpha/white-12` #ffffff · 12 % | Calque actif / sélectionné |
| `interaction/pressed` | `alpha/black-12` #000000 · 12 % | `alpha/white-16` #ffffff · 16 % | Calque d’appui |
| `feedback/success/bg` | `feedback/success/50` #e9f5ea | `feedback/success/950` #16281a | Fond success |
| `feedback/success/text` | `feedback/success/700` #2e6b33 | `feedback/success/300` #86ce8d | Texte success |
| `feedback/success/border` | `feedback/success/200` #bfe0c1 | `feedback/success/800` #2f5a34 | Bordure success |
| `feedback/error/bg` | `feedback/error/50` #fcebe9 | `feedback/error/950` #2c1512 | Fond error |
| `feedback/error/text` | `feedback/error/700` #b42318 | `feedback/error/300` #f19e93 | Texte error |
| `feedback/error/border` | `feedback/error/200` #f3c3bd | `feedback/error/800` #7a2018 | Bordure error |
| `feedback/warning/bg` | `feedback/warning/50` #fdf4e5 | `feedback/warning/950` #2a2008 | Fond warning |
| `feedback/warning/text` | `feedback/warning/700` #8a5a00 | `feedback/warning/300` #f0be4c | Texte warning |
| `feedback/warning/border` | `feedback/warning/200` #f2d9a0 | `feedback/warning/800` #6e5410 | Bordure warning |
| `feedback/info/bg` | `feedback/info/50` #eaf1fb | `feedback/info/950` #101c2b | Fond info |
| `feedback/info/text` | `feedback/info/700` #1f5aa8 | `feedback/info/300` #82b0e8 | Texte info |
| `feedback/info/border` | `feedback/info/200` #bcd3f0 | `feedback/info/800` #23496e | Bordure info |
| `link/default` | `brand-orange/650` #c9330e | `brand-orange/500` #f63f1b | Lien dans le texte |
| `link/hover` | `brand-orange/700` #c0160e | `brand-orange/400` #f8653f | Lien survolé |
| `link/visited` | `brand-orange/800` #981514 | `brand-orange/300` #fb9976 | Lien visité |
| `link/nav` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 | Lien de navigation |
| `link/footer` | `neutral/300` #d4ccc2 | `neutral/700` #574f45 | Lien de footer (sur bg/invert) |
| `btn/primary/bg/default` | `brand-orange/650` #c9330e | `brand-orange/650` #c9330e | Bouton principal |
| `btn/primary/bg/hover` | `brand-orange/700` #c0160e | `brand-orange/600` #e7240f |  |
| `btn/primary/bg/active` | `brand-orange/800` #981514 | `brand-orange/700` #c0160e |  |
| `btn/primary/bg/disabled` | `neutral/200` #e6e1da | `neutral/800` #3d362e |  |
| `btn/primary/text/default` | `basic/white` #ffffff | `basic/white` #ffffff |  |
| `btn/primary/text/disabled` | `neutral/400` #b3a99d | `neutral/600` #736a5e |  |
| `btn/secondary/bg/default` | `basic/transparent` | `basic/transparent` | Bouton contour |
| `btn/secondary/bg/hover` | `alpha/black-4` #000000 · 4 % | `alpha/white-8` #ffffff · 8 % |  |
| `btn/secondary/border/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `btn/secondary/border/disabled` | `neutral/300` #d4ccc2 | `neutral/700` #574f45 |  |
| `btn/secondary/text/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `btn/secondary/text/disabled` | `neutral/400` #b3a99d | `neutral/600` #736a5e |  |
| `btn/ghost/bg/default` | `basic/transparent` | `basic/transparent` | Bouton texte |
| `btn/ghost/bg/hover` | `alpha/black-4` #000000 · 4 % | `alpha/white-8` #ffffff · 8 % |  |
| `btn/ghost/text/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `btn/ghost/text/disabled` | `neutral/400` #b3a99d | `neutral/600` #736a5e |  |
| `btn/invert/bg/default` | `brand/cream` #fce6d2 | `brand/brown-dark` #350c04 | Bouton sur bg/invert |
| `btn/invert/bg/hover` | `basic/white` #ffffff | `brand/brown-darker` #250803 |  |
| `btn/invert/text/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `input/bg/default` | `basic/white` #ffffff | `brand/brown-dark` #350c04 | Champ |
| `input/bg/disabled` | `neutral/100` #f3f0ec | `neutral/950` #191410 |  |
| `input/border/default` | `neutral/300` #d4ccc2 | `alpha/cream-30` #fce6d2 · 30 % |  |
| `input/border/focus` | `brand-orange/500` #f63f1b | `brand-orange/500` #f63f1b |  |
| `input/border/error` | `feedback/error/700` #b42318 | `feedback/error/300` #f19e93 |  |
| `input/text/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `input/text/placeholder` | `neutral/600` #736a5e | `neutral/500` #928779 |  |
| `nav/bg/default` | `basic/white` #ffffff | `brand/brown-darker` #250803 | Barre de navigation |
| `nav/bg/scrolled` | `neutral/50` #faf8f6 | `brand/brown-dark` #350c04 |  |
| `nav/text/default` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `nav/text/active` | `brand-orange/650` #c9330e | `brand-orange/500` #f63f1b |  |
| `nav/border/scrolled` | `neutral/200` #e6e1da | `alpha/cream-15` #fce6d2 · 15 % |  |
| `tag/bg/default` | `neutral/100` #f3f0ec | `neutral/900` #29231d | Tag / pastille |
| `tag/bg/hover` | `neutral/200` #e6e1da | `neutral/800` #3d362e |  |
| `tag/bg/selected` | `brand/brown-dark` #350c04 | `brand/cream` #fce6d2 |  |
| `tag/bg/disabled` | `neutral/50` #faf8f6 | `neutral/950` #191410 |  |
| `tag/text/default` | `neutral/700` #574f45 | `neutral/300` #d4ccc2 |  |
| `tag/text/selected` | `brand/cream` #fce6d2 | `brand/brown-dark` #350c04 |  |
| `tag/text/disabled` | `neutral/400` #b3a99d | `neutral/600` #736a5e |  |
| `overlay/bg` | `alpha/brown-darker-60` #250803 · 60 % | `alpha/black-60` #000000 · 60 % | Voile de modale / lightbox |
| `elevation/shadow-1` | `alpha/brown-darker-5` #250803 · 5 % | `alpha/black-40` #000000 · 40 % | Couleur d’ombre douce (styles shadow/*) |
| `elevation/shadow-2` | `alpha/brown-darker-8` #250803 · 8 % | `alpha/black-40` #000000 · 40 % | Couleur d’ombre moyenne |
| `elevation/shadow-3` | `alpha/brown-darker-12` #250803 · 12 % | `alpha/black-60` #000000 · 60 % | Couleur d’ombre forte |

`qonto/*` → collection **Projects** (valeurs inchangées : purple-light #d5c8fb, purple-dark #9b81f6, orange-light #ffeadd, orange-dark #ffd6bc, yellow-light #f4f8ac, yellow-dark #f1f78e, green-light #cef6e9, green-dark #b0f0da).

## 8. Typographie — valeurs proposées

### 8.1 Familles et règle optique Bricolage Condensed

Polices vérifiées avec `listAvailableFontsAsync` dans le portfolio : **Geist** (Regular, Medium, SemiBold, Bold, ExtraBold…), **Bricolage Grotesque 48pt Condensed** et **72pt Condensed** (Regular, Medium, SemiBold, Bold, ExtraBold…), **Geist Mono** (option). Aucune n’a d’italique.

**Règle (d’après l’usage réel de LinkedIn 2.0 : 48pt Condensed de 20 à 96 px, 72pt Condensed à partir de 80 px pour les couvertures)** :

| Taille résolue | Famille Figma | Variable |
|---|---|---|
| < 72 px | Bricolage Grotesque **48pt Condensed** | `font-family_display` (et `font-family_accent`) |
| ≥ 72 px | Bricolage Grotesque **72pt Condensed** | `font-family_display-xl` |

Comme les tailles changent de mode en mode, `font-family_display-xl` (liée aux styles 7xl, 8xl, 9xl) vaut 72pt Condensed en Desktop XL et Desktop (72–160 px) et **48pt Condensed en Tablet et Mobile**, où ces styles descendent à 44–88 px. Sur le web, c’est une seule police variable : codeSyntax `var(--font-family-display)` pour les deux variables → Webflow `font-family: "Bricolage Grotesque"; font-stretch: 75%` (axe `wdth` 75 = Condensed) et `font-optical-sizing: auto` (l’axe `opsz` suit la taille, ce que les deux instances Figma approximent).


| Variable | Desktop XL | Desktop | Tablet | Mobile | codeSyntax |
|---|---|---|---|---|---|
| `Font family/font-family_display` | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | `var(--font-family-display)` |
| `Font family/font-family_display-xl` | Bricolage Grotesque 72pt Condensed | Bricolage Grotesque 72pt Condensed | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | `var(--font-family-display)` |
| `Font family/font-family_body` | Geist | Geist | Geist | Geist | `var(--font-family-body)` |
| `Font family/font-family_accent` | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | Bricolage Grotesque 48pt Condensed | `var(--font-family-display)` |

### 8.2 Tailles, interlignes, tracking par mode

Base Desktop = échelle « 6. Web · Scale » de LinkedIn (text xs→xl = 12→20, h6→h1 = 20→60) : les tailles Desktop actuelles du portfolio sont **identiques** (2xl=h5 24, 3xl=h4 30, 4xl=h3 36, 5xl=h2 48, 6xl=h1 60), complétées par 7xl 72, 8xl 96, 9xl 128 pour les grands titres de la home et des études de cas. Interlignes Desktop = `web/leading/*` et `web/heading-leading/*`.

| Clé | Taille XL / D / T / M | Interligne XL / D / T / M | Interligne actuel (D) | Paragraph spacing | Tracking |
|---|---|---|---|---|---|
| xxs | 10 / 10 / 10 / 10 | 14 / 14 / 14 / 14 | 10 | 0 | `tracking/normal` = 0 % |
| xs | 12 / 12 / 12 / 12 | 18 / 18 / 18 / 18 | 12 | 0 | `tracking/normal` = 0 % |
| sm | 14 / 14 / 14 / 14 | 21 / 21 / 21 / 21 | 18 | 0 | `tracking/normal` = 0 % |
| md | 16 / 16 / 16 / 16 | 24 / 24 / 24 / 24 | 20 | 0 | `tracking/normal` = 0 % |
| lg | 20 / 18 / 18 / 18 | 30 / 28 / 28 / 28 | 24 | 0 | `tracking/normal` = 0 % |
| xl | 22 / 20 / 20 / 18 | 32 / 30 / 30 / 28 | 28 | 8 | `tracking/normal` = 0 % |
| 2xl | 26 / 24 / 22 / 20 | 32 / 30 / 28 / 26 | 24 | 0 | `tracking/tight` = -1 % |
| 3xl | 34 / 30 / 26 / 24 | 40 / 36 / 32 / 30 | 30 | 0 | `tracking/tight` = -1 % |
| 4xl | 40 / 36 / 30 / 28 | 48 / 42 / 36 / 34 | 36 | 0 | `tracking/tight` = -1 % |
| 5xl | 56 / 48 / 40 / 32 | 64 / 54 / 46 / 38 | 48 | 0 | `tracking/tight` = -1 % |
| 6xl | 72 / 60 / 48 / 40 | 80 / 66 / 54 / 46 | 60 | 0 | `tracking/tighter` = -2 % |
| 7xl | 88 / 72 / 56 / 44 | 96 / 80 / 62 / 50 | 72 | 0 | `tracking/tighter` = -2 % |
| 8xl | 120 / 96 / 72 / 52 | 124 / 100 / 76 / 56 | 96 | 0 | `tracking/tighter` = -2 % |
| 9xl | 160 / 128 / 88 / 60 | 160 / 128 / 92 / 64 | 128 | 0 | `tracking/tighter` = -2 % |
| prose-sm (interligne seul) | — | 24 / 24 / 24 / 24 | — | 16 | — |
| prose-md (interligne seul) | — | 30 / 28 / 28 / 26 | — | 20 | — |
| prose-lg (interligne seul) | — | 32 / 30 / 30 / 28 | — | 24 | — |

`tracking/*` (8. Tokens - Typography) : tighter −2 %, tight −1 %, normal 0 %, wide +2 %. Les Condensed de Bricolage sont déjà serrés : −2 % actuel ramené à −1 % (h5→h2) et −2 % au-delà de 60 px. Webflow : `letter-spacing: -0.01em` etc. (voir § 14 pour le comportement Figma des variables en pourcentage).

### 8.3 Échelle complète des styles (Desktop)

| Style | Famille (variable) | Graisse | Taille | Interligne | Tracking | Équivalent LinkedIn |
|---|---|---|---|---|---|---|
| text/xxs/regular | Geist (`font-family_body`) | Regular | 10 | 14 | 0 % | — |
| text/xxs/bold | Geist (`font-family_body`) | Bold | 10 | 14 | 0 % | — |
| text/xs/regular | Geist (`font-family_body`) | Regular | 12 | 18 | 0 % | Web/Body/xs |
| text/xs/bold | Geist (`font-family_body`) | Bold | 12 | 18 | 0 % | — |
| text/sm/regular | Geist (`font-family_body`) | Regular | 14 | 21 | 0 % | Web/Body/sm |
| text/sm/medium | Geist (`font-family_body`) | Medium | 14 | 21 | 0 % | Web/Body/sm-medium |
| text/sm/regular stroked | Geist (`font-family_body`) | Regular | 14 | 21 | 0 % | — |
| text/sm/bold | Geist (`font-family_body`) | Bold | 14 | 21 | 0 % | — |
| text/md/regular | Geist (`font-family_body`) | Regular | 16 | 24 | 0 % | Web/Body/md |
| text/md/medium | Geist (`font-family_body`) | Medium | 16 | 24 | 0 % | Web/Body/md-medium |
| text/md/bold | Geist (`font-family_body`) | Bold | 16 | 24 | 0 % | — |
| text/lg/regular | Geist (`font-family_body`) | Regular | 18 | 28 | 0 % | Web/Body/lg |
| text/lg/medium | Geist (`font-family_body`) | Medium | 18 | 28 | 0 % | — |
| text/lg/bold | Geist (`font-family_body`) | Bold | 18 | 28 | 0 % | — |
| text/xl/regular | Geist (`font-family_body`) | Regular | 20 | 30 | 0 % | Web/Body/xl |
| text/xl/medium | Geist (`font-family_body`) | Medium | 20 | 30 | 0 % | — |
| text/xl/bold | Geist (`font-family_body`) | Bold | 20 | 30 | 0 % | — |
| display/2xl/regular | Bricolage 48pt Condensed (`font-family_display`) | Regular | 24 | 30 | -1 % | Web/Heading/h5 (SemiBold) |
| display/2xl/bold | Bricolage 48pt Condensed (`font-family_display`) | Bold | 24 | 30 | -1 % | — |
| display/3xl/regular | Bricolage 48pt Condensed (`font-family_display`) | Regular | 30 | 36 | -1 % | Web/Heading/h4 (SemiBold) |
| display/4xl/regular | Bricolage 48pt Condensed (`font-family_display`) | Regular | 36 | 42 | -1 % | Web/Heading/h3 (SemiBold) |
| display/5xl/regular | Bricolage 48pt Condensed (`font-family_display`) | Regular | 48 | 54 | -1 % | Web/Heading/h2 (SemiBold) |
| display/6xl/regular | Bricolage 48pt Condensed (`font-family_display`) | Regular | 60 | 66 | -2 % | Web/Heading/h1 (SemiBold) |
| display/6xl/medium | Bricolage 48pt Condensed (`font-family_display`) | Medium | 60 | 66 | -2 % | — |
| display/7xl/regular | Bricolage 72pt Condensed (`font-family_display-xl`) | Regular | 72 | 80 | -2 % | — |
| display/7xl/medium | Bricolage 72pt Condensed (`font-family_display-xl`) | Medium | 72 | 80 | -2 % | — |
| display/8xl/regular | Bricolage 72pt Condensed (`font-family_display-xl`) | Regular | 96 | 100 | -2 % | — |
| display/8xl/medium | Bricolage 72pt Condensed (`font-family_display-xl`) | Medium | 96 | 100 | -2 % | — |
| display/9xl/regular | Bricolage 72pt Condensed (`font-family_display-xl`) | Regular | 128 | 128 | -2 % | — |
| **prose/sm** (nouveau) | Geist (`font-family_body`) | Regular | 16 | 24 (150 %) | 0 % · PS 16 | Web/Body/md |
| **prose/md** (nouveau) | Geist (`font-family_body`) | Regular | 18 | 28 (156 %) | 0 % · PS 20 | Web/Body/lg |
| **prose/lg** (nouveau) | Geist (`font-family_body`) | Regular | 20 | 30 (150 %) | 0 % · PS 24 | Web/Body/xl |

- `display/6xl/bold`, `display/7xl/bold`, `display/8xl/bold` sont en Medium → renommés `…/medium` ; `display/2xl/bold` reste Bold.
- Graisses conservées selon les noms des styles (Regular, Medium, Bold). LinkedIn utilise **SemiBold** pour ses titres web : voir § 15.
- Corrections de liaisons : display/2xl → `Line height/2xl` (au lieu de 3xl) ; display/8xl et 9xl → `Paragraph spacing/8xl|9xl` ; text/lg/bold → `Paragraph spacing/lg` ; display/7xl et 8xl medium → `Font weight/medium` lié.
- **Italique** : aucun des 29 styles et aucun texte du site n’utilise d’italique → rien à remplacer. Si une emphase est nécessaire : Geist Medium + `text/accent`.
- **Option Geist Mono (non appliquée, à valider)** : `Font family/font-family_mono` = Geist Mono ; `label/sm` = Geist Mono Medium 12/16, capitales, `tracking/wide` ; `label/xs` = Geist Mono Regular 10/14, capitales. Cibles : surtitres, métadonnées d’études de cas (client, année, rôle) et les 25 textes « 10 px Medium » sans style.

## 9. Layout, spacing, radius, border, élévation — valeurs proposées

### 9.1 Responsive - Layout

| Variable | Desktop XL | Desktop | Tablet | Mobile | Description / Webflow |
|---|---:|---:|---:|---:|---|
| `layout/frame/width` | 1920 | 1440 | 768 | 390 | Largeur du frame de maquette (seuils Webflow 991/767/478) |
| `layout/frame/height` | 1080 | 900 | 1024 | 844 | Hauteur de frame de prototype |
| `layout/margin` | 64 | 40 | 24 | 16 | Marge de page (wide = 100% − 2 × margin) |
| `layout/container/contained` | 1440 | 1200 | 720 | 358 | max-width centré ; Webflow Tablet/Mobile : 100% |
| `layout/container/narrow` | 720 | 720 | 720 | 358 | Texte long ; Webflow Tablet/Mobile : 100% (max 720px) |
| `layout/grid/columns` | 12 | 12 | 8 | 4 | Colonnes de grille |
| `layout/grid/gutter` | 24 | 24 | 16 | 16 | Gouttière |
| `layout/col/1` | 98 | 78 | 76 | 77.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/2` | 220 | 180 | 168 | 77.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/3` | 342 | 282 | 168 | 77.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/4` | 464 | 384 | 260 | 171.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/5` | 586 | 486 | 352 | 171.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/6` | 708 | 588 | 352 | 171.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/7` | 830 | 690 | 444 | 264.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/8` | 952 | 792 | 536 | 264.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/9` | 1074 | 894 | 536 | 264.5 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/10` | 1196 | 996 | 628 | 358.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/11` | 1318 | 1098 | 720 | 358.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |
| `layout/col/12` | 1440 | 1200 | 720 | 358.0 | Largeur de n colonnes (Tablet : ⌈n×8/12⌉ col. de 76 ; Mobile : ⌈n/3⌉ col. de 77,5 ; Webflow Mobile : 100%) |

`bleed` = pleine largeur sans marge : comportement documenté (aucune variable).

### 9.2 Tokens - Spacing (scope GAP)

Valeurs alignées sur `web/space/*` de LinkedIn (2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64) et, pour les sections, sur 96 / 128. Chaque valeur est un alias vers `0. Primitives - Measures` quand elle existe dans l’échelle (sinon valeur brute : 20, 40).

| Token | Desktop XL | Desktop | Tablet | Mobile | codeSyntax |
|---|---:|---:|---:|---:|---|
| `component/gap/none` | 0 | 0 | 0 | 0 | `var(--component-gap-none)` |
| `component/gap/xs` | 4 | 4 | 4 | 4 | `var(--component-gap-xs)` |
| `component/gap/sm` | 8 | 8 | 8 | 8 | `var(--component-gap-sm)` |
| `component/gap/md` | 16 | 16 | 12 | 12 | `var(--component-gap-md)` |
| `component/gap/lg` | 24 | 24 | 16 | 16 | `var(--component-gap-lg)` |
| `component/gap/xl` | 32 | 32 | 24 | 24 | `var(--component-gap-xl)` |
| `component/padding/none` | 0 | 0 | 0 | 0 | `var(--component-padding-none)` |
| `component/padding/xs` | 8 | 8 | 8 | 8 | `var(--component-padding-xs)` |
| `component/padding/sm` | 12 | 12 | 12 | 8 | `var(--component-padding-sm)` |
| `component/padding/md` | 16 | 16 | 16 | 12 | `var(--component-padding-md)` |
| `component/padding/lg` | 24 | 24 | 24 | 16 | `var(--component-padding-lg)` |
| `component/padding/xl` | 32 | 32 | 24 | 24 | `var(--component-padding-xl)` |
| `section/gap/none` | 0 | 0 | 0 | 0 | `var(--section-gap-none)` |
| `section/gap/sm` | 32 | 32 | 24 | 24 | `var(--section-gap-sm)` |
| `section/gap/md` | 48 | 48 | 32 | 32 | `var(--section-gap-md)` |
| `section/gap/lg` | 64 | 64 | 48 | 48 | `var(--section-gap-lg)` |
| `section/gap/xl` | 128 | 96 | 64 | 48 | `var(--section-gap-xl)` |
| `section/padding/sm` | 64 | 48 | 32 | 24 | `var(--section-padding-sm)` |
| `section/padding/md` | 96 | 96 | 64 | 48 | `var(--section-padding-md)` |
| `section/padding/lg` | 128 | 128 | 96 | 64 | `var(--section-padding-lg)` |

### 9.3 Tokens - Radius (scope CORNER_RADIUS)

| Token | Alias | Valeur |
|---|---|---:|
| `radius/control` | `Radius/ui-sm` | 6 |
| `radius/surface` | `Radius/md` | 8 |
| `radius/surface-lg` | `Radius/lg` | 12 |
| `radius/media` | `Radius/xl` | 16 |
| `radius/pill` | `Radius/full` | full |
| `component/button/radius` | `radius/control` | 6 |
| `component/input/radius` | `radius/control` | 6 |
| `component/checkbox/radius` | `radius/control` | 6 |
| `component/card/radius` | `radius/surface` | 8 |
| `component/modal/radius` | `radius/surface-lg` | 12 |
| `component/image/radius` | `radius/media` | 16 |
| `component/badge/radius` | `radius/pill` | full |
| `component/tag/radius` | `radius/pill` | full |

(LinkedIn radius/ui : xs 4 · sm 6 · md 8 · lg 12 · pill 999. `radius/media` = 16 pour les visuels, valeur la plus fréquente après 8 dans les cartes.)

### 9.4 Tokens - Border (scope STROKE_FLOAT)

| Token | Valeur |
|---|---:|
| `border/width/none` | 0 (alias `0 (0)`) |
| `border/width/default` | 1 |
| `border/width/strong` | 2 (alias `1 (2px)`) |
| `border/width/focus` | 2 (alias `1 (2px)`, = LinkedIn focus/ring-width) |

### 9.5 Styles d’effet (élévation LinkedIn web, couleurs de marque, lisibles en Light et Dark)

Les couleurs d’ombre sont liées à `elevation/shadow-1|2|3` (Light : brun `#250803` à 5 / 8 / 12 % ; Dark : noir 40 / 40 / 60 %, sinon invisibles sur fond brun).

| Style | Calques (x / y / flou / étalement · couleur) |
|---|---|
| `shadow/xs` | 0/1/2/0 · shadow-1 |
| `shadow/sm` | 0/1/2/0 · shadow-1 + 0/1/3/0 · shadow-2 |
| `shadow/md` | 0/2/4/0 · shadow-1 + 0/4/8/0 · shadow-2 |
| `shadow/lg` | 0/6/12/0 · shadow-2 + 0/12/24/0 · shadow-3 |
| `shadow/xl` | 0/12/24/0 · shadow-2 + 0/24/48/−8 · shadow-3 |
| `focus-ring` | 0/0/0/2 · `bg/page` (séparateur) + 0/0/0/4 · `focus-ring` |

## 10. Contraste WCAG AA (texte normal ≥ 4,5:1 ; grand texte ≥ 3:1)

### 10.1 Couples de la source LinkedIn / de l’état initial

| Texte | Fond | Ratio | Verdict | Correction appliquée |
|---|---|---:|---|---|
| #ffffff | #f63f1b | 3.72 | ⚠️ grand texte seulement | **Insuffisant pour du texte courant.** Blanc sur `bg/brand` réservé aux textes ≥ 24 px (ou ≥ 18,66 px gras) ; pour les CTA et textes courants : `bg/brand-strong` / `btn/primary/bg` = `brand-orange/650` #c9330e (5,3:1) (Blanc sur orange #f63f1b (bg/brand)) |
| #f63f1b | #ffffff | 3.72 | ⚠️ grand texte seulement | `text/accent`, `link/default`, `nav/text/active` Light → `brand-orange/650` #c9330e (5,3:1) (Orange #f63f1b sur blanc (text/brand Light)) |
| #928779 | #ffffff | 3.52 | ⚠️ grand texte seulement | `text/muted` Light → `neutral/600` (5,3:1) (neutral/500 sur blanc (web/text/muted Light)) |
| #f63f1b | #250803 | 5.06 | ✅ | — (Orange sur bg/page Dark) |
| #f63f1b | #350c04 | 4.68 | ✅ | — (Orange sur bg/raised Dark) |
| #c9330e | #ffffff | 5.3 | ✅ | — (#c9330e sur blanc) |

### 10.2 Tokens cibles (après corrections)

Fonds translucides composités sur `bg/page` du mode.

| Texte | Fond | Light (texte / fond) | Ratio L | Dark (texte / fond) | Ratio D |
|---|---|---|---:|---|---:|
| `text/primary` | `bg/page` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #250803 | ✅ 15.6 |
| `text/primary` | `bg/raised` | #350c04 / #faf8f6 | ✅ 16.44 | #fce6d2 / #350c04 | ✅ 14.42 |
| `text/primary` | `bg/sunken` | #350c04 / #f3f0ec | ✅ 15.33 | #fce6d2 / #191410 | ✅ 15.14 |
| `text/primary` | `bg/media` | #350c04 / #f3f0ec | ✅ 15.33 | #fce6d2 / #29231d | ✅ 12.86 |
| `text/secondary` | `bg/page` | #574f45 / #ffffff | ✅ 8.05 | #d4ccc2 / #250803 | ✅ 11.86 |
| `text/secondary` | `bg/raised` | #574f45 / #faf8f6 | ✅ 7.6 | #d4ccc2 / #350c04 | ✅ 10.96 |
| `text/secondary` | `bg/sunken` | #574f45 / #f3f0ec | ✅ 7.08 | #d4ccc2 / #191410 | ✅ 11.5 |
| `text/muted` | `bg/page` | #736a5e / #ffffff | ✅ 5.31 | #928779 / #250803 | ✅ 5.35 |
| `text/muted` | `bg/raised` | #736a5e / #faf8f6 | ✅ 5.02 | #928779 / #350c04 | ✅ 4.95 |
| `text/muted` | `bg/sunken` | #736a5e / #f3f0ec | ✅ 4.68 | #928779 / #191410 | ✅ 5.19 |
| `text/accent` | `bg/page` | #c9330e / #ffffff | ✅ 5.3 | #f63f1b / #250803 | ✅ 5.06 |
| `text/accent` | `bg/raised` | #c9330e / #faf8f6 | ✅ 5.0 | #f63f1b / #350c04 | ✅ 4.68 |
| `text/accent` | `bg/sunken` | #c9330e / #f3f0ec | ✅ 4.66 | #f63f1b / #191410 | ✅ 4.91 |
| `text/on-brand` | `bg/brand` | #ffffff / #f63f1b | ⚠️ 3.72 | #ffffff / #f63f1b | ⚠️ 3.72 |
| `text/on-brand` | `bg/brand-strong` | #ffffff / #c9330e | ✅ 5.3 | #ffffff / #c9330e | ✅ 5.3 |
| `text/primary` | `bg/brand-subtle` | #350c04 / #fee3d6 | ✅ 14.24 | #fce6d2 / #42080a | ✅ 13.68 |
| `text/primary` | `bg/brand-muted` | #350c04 / #fdc3ab | ✅ 11.26 | #fce6d2 / #7b1413 | ✅ 8.91 |
| `text/on-invert` | `bg/invert` | #fce6d2 / #350c04 | ✅ 14.42 | #350c04 / #fce6d2 | ✅ 14.42 |
| `text/on-invert-secondary` | `bg/invert` | #d4ccc2 / #350c04 | ✅ 10.96 | #574f45 / #fce6d2 | ✅ 6.66 |
| `link/footer` | `bg/invert` | #d4ccc2 / #350c04 | ✅ 10.96 | #574f45 / #fce6d2 | ✅ 6.66 |
| `link/default` | `bg/page` | #c9330e / #ffffff | ✅ 5.3 | #f63f1b / #250803 | ✅ 5.06 |
| `link/hover` | `bg/page` | #c0160e / #ffffff | ✅ 6.25 | #f8653f / #250803 | ✅ 6.21 |
| `link/visited` | `bg/page` | #981514 / #ffffff | ✅ 8.56 | #fb9976 / #250803 | ✅ 8.9 |
| `link/nav` | `bg/page` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #250803 | ✅ 15.6 |
| `btn/primary/text/default` | `btn/primary/bg/default` | #ffffff / #c9330e | ✅ 5.3 | #ffffff / #c9330e | ✅ 5.3 |
| `btn/primary/text/default` | `btn/primary/bg/hover` | #ffffff / #c0160e | ✅ 6.25 | #ffffff / #e7240f | ✅ 4.51 |
| `btn/secondary/text/default` | `bg/page` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #250803 | ✅ 15.6 |
| `btn/ghost/text/default` | `bg/page` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #250803 | ✅ 15.6 |
| `btn/invert/text/default` | `btn/invert/bg/default` | #350c04 / #fce6d2 | ✅ 14.42 | #fce6d2 / #350c04 | ✅ 14.42 |
| `input/text/default` | `input/bg/default` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #350c04 | ✅ 14.42 |
| `input/text/placeholder` | `input/bg/default` | #736a5e / #ffffff | ✅ 5.31 | #928779 / #350c04 | ✅ 4.95 |
| `nav/text/default` | `nav/bg/default` | #350c04 / #ffffff | ✅ 17.42 | #fce6d2 / #250803 | ✅ 15.6 |
| `nav/text/active` | `nav/bg/default` | #c9330e / #ffffff | ✅ 5.3 | #f63f1b / #250803 | ✅ 5.06 |
| `tag/text/default` | `tag/bg/default` | #574f45 / #f3f0ec | ✅ 7.08 | #d4ccc2 / #29231d | ✅ 9.77 |
| `tag/text/selected` | `tag/bg/selected` | #fce6d2 / #350c04 | ✅ 14.42 | #350c04 / #fce6d2 | ✅ 14.42 |
| `feedback/success/text` | `feedback/success/bg` | #2e6b33 / #e9f5ea | ✅ 5.73 | #86ce8d / #16281a | ✅ 8.3 |
| `feedback/error/text` | `feedback/error/bg` | #b42318 / #fcebe9 | ✅ 5.7 | #f19e93 / #2c1512 | ✅ 8.22 |
| `feedback/warning/text` | `feedback/warning/bg` | #8a5a00 / #fdf4e5 | ✅ 5.43 | #f0be4c / #2a2008 | ✅ 9.3 |
| `feedback/info/text` | `feedback/info/bg` | #1f5aa8 / #eaf1fb | ✅ 5.99 | #82b0e8 / #101c2b | ✅ 7.62 |

**Seul échec restant** : `text/on-brand` sur `bg/brand` (3,72:1, identité LinkedIn conservée) → usage limité aux grands textes, documenté dans la description du token ; toutes les autres paires passent AA dans les deux modes.

## 11. Textes en PP Neue Montreal sans style de texte (périmètre site)

Méthode : segments de texte en PP Neue Montreal sans `textStyleId`, hors zones clientes (sous-arbres dont les textes sont uniquement en polices clientes ou liés à des variables externes, sans variable du portfolio). Style le plus proche = taille la plus proche puis graisse. « ~ » = écart de taille > 2 px ; **ambigu** = pas de style de même graisse, taille non standard (maquette réduite) ou interligne incompatible.

| Page | ID | Textes | Détail (taille graisse → style proposé : nombre) |
|---|---|---:|---|
| ↳ Desktop Homepage | 1:7 | 277 | 36 Regular (interligne 48, −2 %) → display/4xl/regular : 188<br>40 Regular → **ambigu** (~display/4xl/regular, 11 avec interligne 48) : 17<br>10 Medium → **ambigu** (pas de text/xxs/medium ; label/xs si Geist Mono) : 14<br>20 Regular → text/xl/regular : 11<br>32 Regular → **ambigu** (~display/3xl/regular 30) : 8<br>48 Regular → display/5xl/regular : 7<br>20 Medium → text/xl/medium : 6<br>24 Regular → display/2xl/regular : 5<br>20 Bold → text/xl/bold : 5<br>31,6 Bold → **ambigu** (taille réduite, maquette) : 5<br>30 Regular → display/3xl/regular : 3<br>16 Medium → text/md/medium : 3<br>16 Regular → text/md/regular : 3<br>30 Medium → **ambigu** : 1<br>28 Regular → **ambigu** : 1 |
| ↳ CS Hasamélis | 6471:7790 | 10 | 36 Regular → display/4xl/regular : 7<br>48 Regular → display/5xl/regular : 1<br>20 Regular → text/xl/regular : 1<br>72 Regular → display/7xl/regular : 1 |
| ↳ CS Qonto | 6471:15681 | 12 | 36 Regular → display/4xl/regular : 7<br>20 Bold → text/xl/bold : 3<br>20 Medium → text/xl/medium : 1<br>48 Regular → display/5xl/regular : 1 |
| ↳ CS Rocket Tower | 6508:3970 | 175 | 14 Medium → text/sm/medium : 138<br>36 Regular → display/4xl/regular : 15<br>20 Bold → text/xl/bold : 10<br>24 Regular → display/2xl/regular : 9<br>48 Regular → display/5xl/regular : 2<br>10 Medium → **ambigu** : 1 |
| ↳ CS Pokaa | 6543:33653 | 30 | 20 Bold → text/xl/bold : 22<br>36 Regular → display/4xl/regular : 6<br>20 Regular → text/xl/regular : 1<br>48 Regular → display/5xl/regular : 1 |
| ↳ CS Caats | 6684:63874 | 24 | 36 Regular → display/4xl/regular : 15<br>20 Bold → text/xl/bold : 4<br>48 Regular → display/5xl/regular : 2<br>45,9 Regular → **ambigu** (réduit) : 2<br>10 Medium → **ambigu** : 1 |
| ↳ CS Rue89 | 6793:168751 | 50 | 36 Regular → display/4xl/regular : 22<br>24 Regular → display/2xl/regular : 12<br>24 Medium → **ambigu** (pas de display/2xl/medium) : 6<br>20 Bold → text/xl/bold : 4<br>10 Medium → **ambigu** : 2<br>48 Regular → display/5xl/regular : 2<br>44,9 Bold / 45,9 Regular → **ambigu** (réduit) : 2 |
| ↳ CS Kiosk | 6793:171267 | 11 | 36 Regular → display/4xl/regular : 6<br>24 Medium → **ambigu** : 3<br>48 Regular → display/5xl/regular : 1<br>30 Regular → display/3xl/regular : 1 |
| ↳ CS Signore Giuseppe | 6793:172205 | 6 | 36 Regular → display/4xl/regular : 5<br>48 Regular → display/5xl/regular : 1 |
| ↳ CS Falmec · Est Repro · BDOR · Le Courrier des Balkans · Rue89 Impactomètre · TwoFilms (gabarit identique, par page) | 6793:173143 · 6793:174083 · 8659:259536 · 6793:175021 · 6831:199862 · 6847:228789 | 16 | 36 Regular → display/4xl/regular : 6<br>20 Bold → text/xl/bold : 5<br>24 Regular → display/2xl/regular : 3<br>10 Medium → **ambigu** : 1<br>48 Regular → display/5xl/regular : 1 |
| ↳ GUF · Schroll | 8657:258741 · 8727:24751 | 0 |  |
| ↳ CS Hasamélis — Mobile | 4579:7413 | 12 | 36 Regular → display/4xl/regular : 6<br>5–5,5 Regular → **ambigu** (vignettes réduites) : 4<br>10 Medium → **ambigu** : 1<br>48 Regular → display/5xl/regular : 1 |
| ↳ SEO · images OG | 8607:8795 | 60 | 112,8 Bold → **ambigu** (pas de display bold ≥ 96) : 38<br>28,8 Medium → **ambigu** : 18<br>128 Bold → **ambigu** : 2<br>118 Bold → **ambigu** : 2 |
| 🏞️ Cover | 0:1 | 0 |  |

**Total périmètre site : 763 textes.** Traitables sans ambiguïté : 36 R → display/4xl/regular (313, interligne actuel 48 → 42), 14 M → text/sm/medium (138), 20 B → text/xl/bold (74), 24 R → display/2xl/regular (44), 48 R → display/5xl/regular (22), 20 R / 20 M / 16 R / 16 M / 30 R / 72 R (38). Ambigus : 134 (listés, non traités).

Hors site (non traités) : Studio landing 75, Studio mobile 18, Email 5, Showreel 9, Search 61, UI Kit 52, Archives 118.

## 12. Défauts à ne pas recopier

| Défaut | Où | Traitement dans la cible |
|---|---|---|
| Scopes `ALL_SCOPES` | Starter : tokens couleurs (105), radius/*, border, tracking, grid ; Portfolio : 23 tokens Color Mode, Prototype/*, Landing/container, Social, toutes les primitives couleur | scopes explicites partout |
| Tokens de tracking tous à 0 | Starter `tracking/*` | tighter −2 / tight −1 / normal 0 / wide +2 (%) |
| Letter-spacing en pixels | Starter (styles liés à `Letter spacing/*` en px) ; LinkedIn `letter-spacing/tight\|tighter` = −1 / −2 **px** | valeurs en % (voir § 14 pour la contrainte Figma) |
| `Brand/primary/925` et `/950` = #0c1134 (un neutre) | Starter | échelle `brand-orange/*` continue, 650 ajouté pour l’accessibilité |
| `Paragraph spacing/sm` en scope `PARAGRAPH_INDENT` | Starter et Portfolio | → `PARAGRAPH_SPACING` |
| Styles web non liés à la variable de famille | LinkedIn `Web/Body/*`, `Web/Heading/*` | tous les styles liés à `font-family_*`, graisse et letterSpacing |
| Valeurs en dur dans la couche sémantique | LinkedIn `2. Color Mode` (#6e4436, #c9330e, #350c04d9, bordures #fce6d24d, #ffffff26, #350c0426), `7. Web · Semantic` (bordures #fce6d226/4d, interaction ×6, feedback ×24) ; Starter `overlay/bg` #00000080 ; Portfolio `bg/secondary` Dark #50483e33, `bg/brand-primary` Dark #42080a80 | toutes transformées en primitives nommées (`brand-orange/650`, `brand/brown-mid`, `alpha/*`, `feedback/*`) |
| Alias sémantique → sémantique | Portfolio `border/secondary` Dark → `bg/secondary` | chaque token pointe vers une primitive |
| Interlignes en alias d’une bibliothèque externe / paragraph spacing externes | Starter | valeurs locales |
| Une variable par breakpoint au lieu de modes | Starter `3. Responsive - Grid` | 4 modes |
| TEXT_CONTENT dans les scopes de familles, tailles et interlignes | Starter, Portfolio (familles) | retiré |
| Absence de codeSyntax | Portfolio, Starter | codeSyntax CSS partout |

## 13. Valeurs en dur les plus fréquentes (périmètre site, hors zones clientes détectées)

À rebinder lors d’une mission suivante (aucune modification faite ici). Les décimales du type 7,0002 / 8,8235 / 14,668 proviennent des mini-maquettes réduites et sont exclues.

| Type | Valeur | Occurrences (≈) | Token cible suggéré |
|---|---|---:|---|
| Remplissage | #ffffff | ~1 500 | `bg/page` / `basic/white` |
| Remplissage + trait | #000000 | ~600 + 250 traits | `text/primary` / `bg/invert` |
| Remplissage | #756608 | ~350 (toutes les études de cas) | pastille projet → `Projects` |
| Remplissage | #ee3f1b | ~210 (≠ #f63f1b de la marque) | `bg/brand` |
| Remplissage | #137173 | ~170 | pastille projet → `Projects` |
| Remplissage | #4c101d | ~100 | pastille projet → `Projects` |
| Remplissage / trait | #101828 | 557 + 1 279 traits (home) | à vérifier : probablement contenu client non détecté |
| Remplissage | #1d1d1b | 146 + 939 traits (Qonto) | à vérifier (Qonto) |
| Remplissage | #ff6f47 · #fffaf5 · #4074fb | 298 · 260 · 179 (home) | à vérifier |
| Rayon | 8 | ~420 | `radius/surface` |
| Rayon | 4 · 16 · 24 | 55 · 37 · 13+ | `radius/control` (6) · `radius/media` · — |
| Gap | 8 · 16 · 4 · 32 · 24 · 64 · 128 | 1 150 · 420 · 400 · 290 · 320 · 170 · 130 | `component/gap/sm` · `md` · `xs` · `xl` · `lg` · `section/gap/lg` · `section/gap/xl` |
| Padding | 16 · 4 · 40 · 32 · 96 | 220 · 320 · 200 · 240 · 60 | `component/padding/md` · — · `layout/margin` · `section/padding/sm` · `section/padding/md` |
| Taille de police | 40 · 32 · 48 · 20 · 16 | 17 · 8 · 12 · 23 · 13 | via styles (§ 11) |

## 14. Journal d’application

*(complété au fil des phases 2 et 3 — voir ci-dessous)*

