# Consignes de travail — Thomas

## Figma : toujours donner les liens directs

**Dès qu'une réponse crée, modifie, déplace, archive ou supprime des éléments dans Figma, elle se
termine par les liens directs vers ces éléments.** Pas de liste de node IDs nus, pas de « c'est dans
la section machin » : des liens cliquables.

Format d'URL — le node ID prend un **tiret**, pas deux-points :

```
https://www.figma.com/design/<fileKey>/<slug>?node-id=8636-46929
```

Le `<slug>` est cosmétique, Figma résout par la clé de fichier. Utiliser un nom court et parlant.

### Règles

1. **Vérifier avant de publier.** Faire un `getNodeByIdAsync` sur chaque ID avant de générer les
   liens. Ne jamais livrer un lien vers un node supprimé ou déplacé — ça envoie Thomas dans le vide.
2. **Regrouper par intention**, pas par ordre d'exécution : ce qui est *créé*, ce qui est *modifié*,
   ce qui est *archivé*, ce qui est *supprimé*. Les éléments supprimés n'ont pas de lien : les
   nommer et dire pourquoi.
3. **Mettre en tête le point d'entrée** (la page ou la section conteneur), puis le détail.
4. **Dire ce qui a changé** à côté de chaque lien, en une demi-ligne. Un lien sans motif ne sert à
   rien.
5. **Tenir un fichier `LIENS-FIGMA.md`** dans le dossier de travail quand la session touche beaucoup
   de nœuds, et le pousser avec le reste. La réponse en chat donne l'essentiel, le fichier donne
   l'exhaustif.
6. Si un élément est **dans un composant partagé** ou hors périmètre, le dire au lieu de livrer un
   lien qui laisse croire qu'il a été modifié.

## Figma : méthode de travail

- **Regarder ce qui existe déjà dans le fichier avant de créer quoi que ce soit.** Réutiliser les
  composants, les visuels (par `imageHash`), les vrais textes et les vrais prix des autres pages
  plutôt que d'inventer. Thomas l'a demandé explicitement.
- **Jamais de valeur brute** si une variable ou un style existe. Vérifier les collections avant de
  poser une couleur, un espacement, un rayon ou un corps de texte.
- **Ne jamais détacher une instance.** Si un changement l'exige, s'arrêter et le signaler : c'est le
  composant qu'il faut modifier, et c'est une décision de Thomas.
- **Ne rien supprimer définitivement** du contenu d'origine : ça part dans une frame `_Archive`, avec
  une légende disant quel ticket l'a retiré et pourquoi. Les échafaudages qu'on a soi-même créés
  peuvent être supprimés.
- **Aucun placeholder visible dans une maquette client** (`[À valider Willy]`, « nom à fournir »,
  « PLACEHOLDER »). Vérifier aussi les **propriétés d'instance**, pas seulement les nœuds texte, et
  avec `figma.skipInvisibleInstanceChildren = false`.
- **Vérifier les collisions au niveau page** avant de poser une frame ou une section : une capture
  de frame ne montre pas ce qu'il y a autour.
- **Les lectures synchrones juste après une mutation sont périmées** (hauteur, nombre de lignes).
  Le seul oracle fiable pour un rendu, c'est la capture d'écran.

## Contraste : mesurer, pas estimer

Quand du texte est posé sur une image, ne pas juger à l'œil. Masquer le bloc de texte, capturer la
section en pleine résolution, calculer la luminance relative WCAG pixel par pixel sur la zone exacte,
et donner trois valeurs : moyenne, p95 et **pire pixel**. C'est le pire pixel qui fait foi, seuil
4,5:1.

Si le contraste échoue, le bon réflexe est souvent de **sortir le texte de l'image** plutôt que
d'assombrir l'overlay.
