# Kapam — Revue prototype

Quatre liens à envoyer à Willy, dans cet ordre. Les flows du fichier ont été nettoyés :
**13 flows → 4**, renommés en langage client.

> Liens construits sur `fileKey = oGJVoOgpCvgf0DnCJTBLdU`. **À vérifier avant envoi** en les
> recopiant depuis Figma (bouton *Share* → *Prototype*) : le nom de fichier dans l'URL peut différer.

---

## ① Le site — parcours depuis l'accueil

`https://www.figma.com/proto/oGJVoOgpCvgf0DnCJTBLdU/Kapam?node-id=6904-192&starting-point-node-id=6904-192`

Le parcours principal. Depuis l'accueil, **52 pages sont accessibles** : les deux mega menus,
la boutique et ses catégories, les fiches produit, les formules, les réalisations, les actualités,
les pages institutionnelles, le légal, le tunnel de devis et la recherche.

**Ce que Willy doit regarder :** l'enchaînement des pages, la logique du menu, la hiérarchie de
l'offre (les 3 formules), et surtout le **contenu** — c'est là que le gros de la validation se joue.

## ② Le configurateur — les 3 étapes

`https://www.figma.com/proto/oGJVoOgpCvgf0DnCJTBLdU/Kapam?node-id=8267-62041&starting-point-node-id=8267-62041`

Véhicule → kit, options & devis → coordonnées & confirmation. Avec les drawers (résumé, option,
option non compatible) et la lightbox du devis PDF.

**Ce que Willy doit regarder :** l'ordre des questions, les options proposées, les règles de
compatibilité, et ce qui apparaît dans le devis.

## ③ La landing Bordeaux (campagne)

`https://www.figma.com/proto/oGJVoOgpCvgf0DnCJTBLdU/Kapam?node-id=7407-18100&starting-point-node-id=7407-18100`

Page d'acquisition, volontairement hors menu — on y arrive par une pub, pas par la navigation.

**Ce que Willy doit regarder :** l'argumentaire et la promesse commerciale, plus courts et plus
directs que sur le site.

## ④ Les cas limites — 404 & recherche

`https://www.figma.com/proto/oGJVoOgpCvgf0DnCJTBLdU/Kapam?node-id=7780-22674&starting-point-node-id=7780-22674`

La page 404, puis le champ de recherche mène aux résultats et à l'état « aucun résultat ».

**Ce que Willy doit regarder :** rapide. Surtout les textes de réassurance quand l'utilisateur
se perd ou ne trouve rien.

---

# Ce que Willy doit trancher

**22 frames portent déjà un marqueur explicite** dans les maquettes. Voici le tri par
décideur — c'est le vrai plan de charge.

## Pour Willy — décisions produit / commerciales

| Sujet | Où |
|---|---|
| Bornes des fourchettes de prix et paliers de délai des filtres | Panneau de filtres, pages Catégorie |
| Phrase de contexte de la formule Atelier (`[TEXTE À VALIDER WILLY]`) | Overlay / Formule Atelier |
| Verbatims clients à recueillir (Ford Transit, VW T5-T6, Combi T2-T3) | Les 3 fiches Réalisation |
| Modèles de véhicules à confirmer | Modal Compatibilité, page Ressources / Compatibilité |
| Signature des articles : Kapam ou nominative | Actualités / Article — Template |
| Garantie : durée, périmètre, exclusions | Ressources / Garantie |

## Pour Nicolas — rédaction

| Sujet | Où |
|---|---|
| Blocs SEO, 300 à 500 mots, mot-clé principal à définir | Les 3 pages Formule |
| Accroches des cartes de réalisation | Réalisations / Index |
| Contenu de la garantie et de la procédure SAV | Ressources / Garantie |

## Pour un avocat

Mentions légales, CGV, confidentialité, cookies, retours & SAV — la page Mentions légales sert
de template unique à décliner. Rien n'est rédigé à ce stade, c'est assumé.

---

# À savoir avant d'envoyer

- **Un « Lorem ipsum » est visible dans le mega menu Boutique** (3 occurrences, descriptions des
  entrées de menu). C'est le seul faux-texte qui traîne dans une zone que Willy verra à coup sûr,
  dès le premier clic. À remplacer avant envoi.
- **La page « Catégorie / Kit aménagement de fourgon » n'est accessible depuis aucun lien.**
  Il manque un point d'entrée (groupe de déclinaisons ou tuile dédiée) — décision de design à
  prendre. Elle ne sera pas visible dans le prototype.
- **L'écran « Recherche — sans JavaScript »** est un rendu de repli technique, non navigable par
  nature. Il reste consultable sur le canvas Figma, pas dans le prototype.
- **Le mobile est encore en cours** (page « Mobile (en cours) »). Ne pas l'envoyer à Willy dans
  cette salve : la revue desktop d'abord, le mobile ensuite.
