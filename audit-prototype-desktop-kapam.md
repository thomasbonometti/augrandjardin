# Audit — Prototype desktop Kapam

Fichier : `oGJVoOgpCvgf0DnCJTBLdU` · Page auditée : `2353:1248` (« 🖥️ Pages (Desktop) »)
Question : depuis la Homepage `6904:192`, peut-on atteindre toutes les pages via le menu ?

---

## Méthode

Relevé de toutes les réactions de la page, construction du graphe de navigation
(actions `NODE`, tous types de navigation confondus : `NAVIGATE`, `SWAP`, `OVERLAY`,
`CHANGE_TO`), puis parcours en largeur depuis la Homepage.

**Deux erreurs de méthode commises et corrigées en cours de route** — elles avaient produit
un diagnostic faux, il faut en tenir compte si l'audit est rejoué :
1. J'ai d'abord audité les **masters** et les instances de démo de la section
   « 🪟 Overlays & Modals », et conclu à tort que les deux mega menus étaient morts.
   Les instances réellement ouvertes par le header vivent dans la section **NAVIGATION**
   (`7213:54956` et `7213:55199`) — d'où le commentaire « doivent rester sur cette page
   pour le prototype ». Elles sont entièrement câblées.
2. Je ne comptais que `NAVIGATE` et `OVERLAY` comme navigation, en oubliant **`SWAP`**.
   D'où une seconde conclusion fausse : le HUB devis paraissait être un cul-de-sac alors
   que ses 4 boutons enchaînent bien en `SWAP` et que la croix porte une action `CLOSE`.

## État initial

- 3295 nœuds interactifs, 4312 actions (4239 `NODE`, 73 `CLOSE`), 13 points de départ de flow.
- **Header** : entièrement câblé (logo, Configurateur, Nos vans, Catalogue, Contact,
  loupe → overlay recherche, « Demander un devis » → HUB devis).
- **Mega menus** : Aménagements 10 liens/10, Boutique 11/11.
- **Footer** : 21 nœuds avec navigation sur 22 (seul « S'inscrire » n'en a pas — normal).
- **49 pages réelles atteignables sur 61.**

## Défauts trouvés et corrigés

| # | Constat | Correction |
|---|---------|-----------|
| P1 | Les **4 tuiles familles de la Boutique Index** (`8636:46929`) — la navigation catégories principale de la boutique — n'avaient **aucune interaction**. | Câblées sur les mêmes destinations que le mega menu Boutique (aucune destination inventée). |
| P2 | Les **4 raccourcis de l'overlay de recherche** (`7975:20780`) n'avaient qu'un état de survol. Le champ de saisie fonctionnait déjà (`SWAP` → Suggestions). | Câblés sur les mêmes destinations que le header. |
| P3 | Les **états ② Filtres actifs** (`8824:134285`) et **③ Aucun résultat** (`8824:134421`) de Catégorie v6 avaient **zéro lien entrant**. | ① Select Marque → ② · ② Select Longueur → ③ · « Tout effacer » de ② et ③ → ①. |
| P4 | `Kapam / Catégorie / Kit aménagement Trafic` (`7407:586`) : aucun lien entrant. Elle pointait vers la catégorie van, sans réciproque. | Les 4 cartes `Card / Déclinaison — Trafic` de la section « S5 — Index des véhicules compatibles » (`8820:49515` → `8820:49518`) pointent dessus. |

**16 liens posés**, états de survol existants préservés (ajout d'une réaction, pas remplacement).
Transition alignée sur le reste du fichier : `SMART_ANIMATE` / `EASE_OUT` / 0,3 s.

## Vérification

Relecture à neuf après écriture : les 14 nœuds contrôlés portent bien leur `ON_CLICK NAVIGATE`
vers la bonne destination.

**Pages réelles atteignables depuis la Homepage : 49 → 52.**

## Ce qui reste non atteignable (9) — et pourquoi

| Frame | Statut |
|---|---|
| `7780:22674` 404 · `7781:65971` Recherche « aucun résultat » · `7969:33903` Recherche « sans JS » | Normal — états d'erreur, non atteignables par navigation. Ils ont leurs propres points de départ. |
| `7831:19207` / `7831:19210` Démos barre sticky · `8338:52604` Drawer Résumé en contexte | Normal — vues de démonstration, pas des pages. |
| `7782:14033` Article — Template (structure éditoriale) | Normal — gabarit. |
| `7407:18100` LP Bordeaux | Landing d'acquisition, atteinte par une pub. A son propre point de départ. **À confirmer que c'est voulu.** |
| `7402:15` **Kapam / Catégorie / Kit aménagement de fourgon** | ⚠️ **Vrai trou, non corrigé.** Aucun élément d'interface existant ne mène à cette page : la section « S5 — Index des véhicules compatibles » ne contient qu'un seul groupe de marque (`Déclinaisons — Renault`), et le mega menu Boutique n'envoie que vers la catégorie van. La câbler suppose de **créer un élément** (groupe de déclinaisons pour un fourgon, ou tuile dédiée) — c'est du design, pas du câblage. |
