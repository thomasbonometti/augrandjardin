# Kapam · Boutique — Index v4 · Liste des placeholders

Frame : `Kapam / Boutique — Index — v4 (modèle MR)`
→ https://www.figma.com/design/oGJVoOgpCvgf0DnCJTBLdU/?node-id=8537-32271

30 placeholders. Convention de nommage appliquée à la lettre :
`IMG / INDEX / [RÔLE] — [ratio] — [description en une ligne]`

Chaque placeholder porte **le prompt de génération en annotation Figma** (panneau de droite).
Valeurs de gris différenciées par rôle, toutes token-bindées :
`bg/placeholder/dark` · `bg/placeholder/medium` · `bg/placeholder/light`.

| # | Nom | Ratio | px posés | px du brief | Gris | Section |
|---|---|---|---|---|---|---|
| 1 | HERO-01 | 2:3 | 480 × 720 | 480 × 720 | foncé | S2 — Hero |
| 2 | HERO-02 | 2:3 | 480 × 720 | 480 × 720 | foncé | S2 — Hero |
| 3 | HERO-03 | 2:3 | 480 × 720 | 480 × 720 | foncé | S2 — Hero |
| 4 | FAMILLE-KITS | portrait | 360 × 620 | 360 × 620 | medium | S4 — Les familles |
| 5 | FAMILLE-ACCESSOIRES | portrait | 360 × 620 | 360 × 620 | medium | S4 — Les familles |
| 6 | FAMILLE-PIECES | portrait | 360 × 620 | 360 × 620 | medium | S4 — Les familles |
| 7 | FAMILLE-VEHICULES | portrait | 360 × 620 | 360 × 620 | medium | S4 — Les familles |
| 8 | KITS-TUILE | 4:5 | 400 × 500 | 400 × 500 | foncé | S5 — Carrousel kits |
| 9 | KIT-TRAVEL | 4:5 | 400 × 500 | 400 × 500 | clair | S5 — Carrousel kits |
| 10 | KIT-MADO | 4:5 | 400 × 500 | 400 × 500 | clair | S5 — Carrousel kits |
| 11 | KIT-MADEL | 4:5 | 400 × 500 | 400 × 500 | clair | S5 — Carrousel kits |
| 12 | KIT-VWT23 | 4:5 | 400 × 500 | 400 × 500 | clair | S5 — Carrousel kits |
| 13 | EDITO-REALISATION | 3:1 | 1440 × 460 | 1440 × 460 | foncé | S6 — Bandeau éditorial |
| 14 | ACC-TUILE | 4:5 | 400 × 500 | 400 × 500 | foncé | S7 — Carrousel accessoires |
| 15 | ACC-DIBON | 4:5 | 400 × 500 | 400 × 500 | clair | S7 — Carrousel accessoires |
| 16 | ACC-SUPPORT | 4:5 | 400 × 500 | 400 × 500 | clair | S7 — Carrousel accessoires |
| 17 | ACC-STORE | 4:5 | 400 × 500 | 400 × 500 | clair | S7 — Carrousel accessoires |
| 18 | ACC-CHAUFFAGE | 4:5 | 400 × 500 | 400 × 500 | clair | S7 — Carrousel accessoires |
| 19 | ATELIER-5050 | 9:7 | 720 × 560 | 720 × 560 | medium | S8 — Bloc 50/50 |
| 20 | FORMULE-DIY | portrait | 480 × 620 | 480 × 620 | medium | S9 — Les trois formules |
| 21 | FORMULE-ATELIER | portrait | 480 × 620 | 480 × 620 | medium | S9 — Les trois formules |
| 22 | FORMULE-CLE | portrait | 480 × 620 | 480 × 620 | medium | S9 — Les trois formules |
| 23 | JOURNAL-01 | 4:3 | **282 × 212** | 340 × 255 | medium | S10 — Le Journal |
| 24 | JOURNAL-02 | 4:3 | **282 × 212** | 340 × 255 | medium | S10 — Le Journal |
| 25 | JOURNAL-03 | 4:3 | **282 × 212** | 340 × 255 | medium | S10 — Le Journal |
| 26 | JOURNAL-04 | 4:3 | **282 × 212** | 340 × 255 | clair | S10 — Le Journal |
| 27 | SAVOIR-COMPATIBILITE | 4:3 | **384 × 288** | 460 × 345 | medium | S11 — En savoir plus |
| 28 | SAVOIR-VASP | 4:3 | **384 × 288** | 460 × 345 | medium | S11 — En savoir plus |
| 29 | SAVOIR-HISTOIRE | 4:3 | **384 × 288** | 460 × 345 | medium | S11 — En savoir plus |
| 30 | CTA-FINAL | 3.4:1 | 1440 × 420 | 1440 × 420 | très foncé | S12 — CTA final |

## Les trois écarts de px (ratios strictement conservés)

Le brief demande de conserver les ratios à l'identique — c'est fait pour les 30. Trois séries
ont dû être redimensionnées pour tenir dans la grille du fichier (marge desktop `120`,
gouttière `component/gap/lg` = `24`) :

- **JOURNAL-01→04** : 4 × 340 + 3 × 24 = 1432 px, soit 4 px de marge de chaque côté au lieu de 120.
  Posé à 282 × 212 (4:3 exact) sur les 1200 px de contenu.
- **SAVOIR-\*** : 3 × 460 + 2 × 24 = 1428 px, même problème.
  Posé à 384 × 288 (4:3 exact) sur les 1200 px de contenu.

Les prompts n'ont pas besoin d'être touchés : la génération se fait au ratio, pas au pixel.
