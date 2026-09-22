# Rapport — configurateur Kapam piloté par Notion

22 septembre 2026.

---

## 1. Les quatre bases Notion

Page parente : **[🧭 Configurateur — Données de référence](https://app.notion.com/p/3e370bd669cd8124974ecb419dd91e5b)**,
créée dans la page projet *Kapam — Site web*.

| Base | ID de base | Lignes | dont `À valider Willy` |
|---|---|---:|---:|
| [Configurateur · Produits & options](https://app.notion.com/p/d500c296202f4d839b713b111d42aaef) | `d500c296202f4d839b713b111d42aaef` | 62 | 61 (+1 `À créer`) |
| [Configurateur · Véhicules](https://app.notion.com/p/c3bc935f905945d3b2ab1c298ff00ccd) | `c3bc935f905945d3b2ab1c298ff00ccd` | 28 | 27 (+1 `À créer`) |
| [Configurateur · Kits & finitions](https://app.notion.com/p/b1ff36d6e86d41bda7332ef13eb9f45e) | `b1ff36d6e86d41bda7332ef13eb9f45e` | 6 | 6 |
| [Configurateur · Règles](https://app.notion.com/p/6d38d6c60617456ea12949f707d68f6c) | `6d38d6c60617456ea12949f707d68f6c` | 25 | 25 |

**Lien à donner à Willy :** la page parente ci-dessus. ⚠️ Je n'ai pas pu créer le partage :
il faut l'inviter à la main depuis Notion (*Partager → Inviter*, droit **Modification**), sinon
il ne pourra pas remplir la colonne *Commentaire Willy* ni changer les statuts.

**Répartition des règles :** 9 contradictions à trancher · 7 dépendances · 5 règles de tarification ·
2 exclusions · 1 upsell conditionnel · 1 attribut inclus.

**11 prix sur 68 sont en `Prix source = Non tracé`** — ils n'existent dans aucune source écrite,
seulement dans les maquettes : les 3 kits, les 3 finitions, les mousses, le meuble haut, le tiroir
gaz, les supports muraux et la tablette escamotable.

**62 lignes d'options sur 62 sont sans visuel.** Je n'ai téléversé aucune image (interdit par le
brief) ; le prototype affiche un cadre gris nommé à la place.

---

## 2. Commande de resynchronisation

```
NOTION_TOKEN=ntn_xxx node notion-sync/sync.mjs
```

Le token appartient à une intégration interne Notion partagée avec la page de référence. Il n'est
jamais écrit dans le dépôt ni dans `catalogue.json`, et le navigateur ne voit jamais l'API Notion.

---

## 3. URL du prototype

**https://claude.ai/artifact/LyCqYNaCrzWHVaJeiYwkXt** — page privée, non indexée.
⚠️ Elle n'est visible que par son propriétaire tant qu'elle n'a pas été partagée (menu *Partager*
de la page). C'est une solution de dépannage : **le déploiement Vercel demandé a échoué**, voir §5.

---

## 4. Toutes les divergences rencontrées, et ce que j'ai retenu

### 4.1 — Le rapport d'audit n'était pas là

`audit-kapam-2026-09.md` n'existe nulle part dans le dossier de travail. C'était censé être la
source primaire. Plutôt que de m'arrêter, j'ai reconstruit l'inventaire à partir des **deux sources
primaires réelles** :

- les 6 écrans Figma `Config v4` + la section overlays, lus en lecture seule ;
- la page Notion *Kapam — Cartographie du simulateur actuel* du 13/05/2026, **avec les annotations
  rouges de Willy**, qui répondent déjà à une bonne partie des questions.

Le compte des 54 lignes d'options annoncé par le brief tombe juste : 12 + 6 + 7 + 10 + 4 + 6 + 1 + 8 = 54.
C'est un bon signe de concordance entre l'audit manquant et ce que j'ai relevé.

### 4.2 — « Six produits dont le prix a changé » : j'en trouve cinq

Le brief annonce six produits et en liste cinq. En comparant ligne à ligne les 54 lignes v4 avec la
cartographie, **je n'en trouve que cinq** :

| Produit | Cartographie 05/26 | Maquette v4 |
|---|---:|---:|
| Meuble haut 2 placards | 390 € | **490 €** |
| Tiroir / réchaud gaz | 119 € | **199 €** |
| Tablette escamotable | 29,95 € | **59,90 €** |
| Supports muraux | 40 € | **50 €** |
| Mousses Haute Densité | 130 € | **165 €** |

Les 49 autres prix sont rigoureusement identiques. **Retenu :** ces 5 lignes passent en
`Prix source = Non tracé`, et la règle correspondante les liste. Si un sixième produit existe, il
m'a échappé — à signaler.

### 4.3 — Le prix du kit : trois sources, trois réponses

- Les cartes kit affichent Travel 2 140 €, Mado 2 140 €, **Madel 2 395 €**.
- Les tuiles finition affichent Soft 2 140 €, Triply 2 140 €, **Best 2 440 €**.
- Le récapitulatif de l'écran 3.1 affiche, pour un **Kit Travel · Best**, une seule ligne
  « Prix du kit **2 440 €** » — donc le prix de la finition, pas la somme.

**Retenu :** le prototype applique « le prix du kit est celui de la finition ». Cette règle
reproduit exactement le total de la maquette (2 440 + 1 650 montage + 389 VASP = **4 479 €**, le
chiffre affiché dans le bloc « Votre projet » de l'écran 3.1). Mais elle ne tient pas pour le Madel,
dont les 2 395 € ne correspondent à aucune finition : quand l'écart existe, le prototype affiche un
encart « Prix à trancher » plutôt que de choisir en silence.

### 4.4 — L'homologation VASP est facturée sans être choisie

389 € apparaissent dans le récapitulatif des écrans 3.1 et 3.2. Aucun écran ne permet de cocher
cette ligne. Willy avait écrit en mai que l'homologation VASP devait « venir se positionner au tout
début du questionnaire », comme le montage.

**Retenu :** j'ai créé une section `Services & montage` dans la base options, avec deux lignes
(*Kapam monte à l'atelier* 1 650 € et *Service Homologation VASP CARAVANE* 389 €), et rendu la VASP
cochable à l'étape 1.3, à côté du montage. La règle correspondante attend la validation de Willy.

### 4.5 — Le motif d'incompatibilité de l'aérateur de toit n'est pas le même selon l'endroit

- Dans la liste : « Non disponible avec le Kit Travel : le meuble haut occupe l'emplacement. »
  → incompatibilité avec **le kit**.
- Dans le tiroir de détail : « Le meuble haut 2 placards du Kit Travel occupe l'emplacement de
  l'aérateur. **Retirez ce meuble** pour rendre l'option disponible. » → incompatibilité avec
  **une option**.

Les deux ne produisent pas le même parcours : dans un cas l'aérateur est définitivement exclu sur
Travel, dans l'autre il redevient disponible si on décoche le meuble haut.

**Retenu :** la lecture du tiroir, parce qu'elle est plus précise et laisse une issue au client.
Relation `Incompatible avec → Meuble haut 2 placards`. La divergence est une règle à part entière
dans la base.

### 4.6 — La moustiquaire est refusée en haut de l'écran et vendue en bas

Sur un empattement court, la maquette grise la moustiquaire en section Vitrage (« Nécessite un
empattement long (L2) ») **et** la propose à 175 € trente lignes plus bas dans « Avez-vous pensé à
ceci ? ».

**Retenu :** j'ai appliqué la contrainte de longueur **uniquement à la ligne Vitrage**, et laissé la
ligne Accessoires vendable sans condition. C'est un choix délibéré : la contradiction doit rester
visible à l'écran pour que Willy la tranche, pas être lissée par le prototype.

### 4.7 — Quatre produits vivent à deux endroits

Kit rideaux isolants, kit fixation rideaux, marchepied latéral et moustiquaire apparaissent chacun
deux fois dans l'écran 2.1. **Retenu :** les deux occurrences sont conservées, avec un commentaire
sur chaque ligne. Conséquence assumée : dans le prototype, on peut payer deux fois le même produit.
C'est la démonstration du problème.

Le cas du marchepied est le plus gênant : la version en *Parois · Plafond · Plancher* est
conditionnée (plancher bois + plateforme X82, exactement ce que Willy avait décrit), et la version
en *Accessoires* est proposée sans aucune condition — ce qui contredit la règle.

### 4.8 — Les rangements alcôves latérales ont disparu

Présents **deux fois** dans le simulateur actuel (sections 3.2 et 3.3) à 179 €, absents de toutes
les maquettes v4. **Retenu :** ligne recréée en statut `À créer`, avec la question. Le prototype ne
l'affiche pas tant qu'elle n'est pas validée.

### 4.9 — Le parcours Mado et Madel n'existe pas dans les maquettes

Les 54 lignes v4 décrivent **uniquement le parcours Kit Travel** (le titre de section est
« Personnalisez votre Kit Travel »). Si on choisissait Mado dans le prototype, on n'aurait aucune
option propre à ce kit.

**Retenu :** j'ai recréé depuis la cartographie les 4 lignes propres au Mado — grand support
élastique cuisine 50 €, tablette cuisine MADO 34,90 €, tablette ARRD MADO 29,90 €, petit meuble
3 étagères 45 € — et renseigné la colonne *Kits compatibles* sur toutes les lignes. Elles portent un
commentaire explicite disant d'où elles viennent. Le compte passe ainsi de 54 à 62 lignes.

### 4.10 — Le mobilier bicolore n'est plus une ligne d'option

En v4 il n'apparaît que dans un encart après le choix de la finition Best, à 249 € — exactement ce
que Willy avait demandé en mai. **Retenu :** recréé comme ligne (249 €, prix de la cartographie)
avec une colonne *Finitions requises = Best* que j'ai ajoutée à la base. Le prototype l'affiche
comme encart quand Best est retenue, et grisée avec son motif sinon.

### 4.11 — Deux déplacements de Willy ont bien été appliqués dans la v4

- *Tiroir / réchaud gaz* a disparu de WC·Électroménager (qui passe de 7 à 6 lignes) et ne vit plus
  que dans les options du kit — conforme à « ça fait vraiment partie du kit, usinage spécial ».
- *Aérateurs de fenêtres* a disparu de Vitrage et se retrouve dans « Avez-vous pensé à ceci ? » —
  conforme à « accessoire bidon, on peut le proposer à la fin ».

Ces deux déplacements sont enregistrés comme règles, pour que Nathan sache que c'est voulu.

### 4.12 — Six nomenclatures de longueur pour trois gabarits

`L1H1 / L2H1`, `court / long`, `extra court (compact) / court (standard) / long`,
`extra court (S) / court (M) / long (L)`, `standard (M) / long (L)`,
`compact (S) / standard (M) / long (XL)`.

**Retenu :** le script de resync normalise tout en trois gabarits — `court`, `moyen`, `long` — pour
que les compatibilités soient comparables d'une marque à l'autre, **mais le prototype continue
d'afficher l'étiquette d'origine au client**. La table de correspondance est en haut de `sync.mjs`,
et elle échoue bruyamment sur une étiquette inconnue. La règle correspondante reprend la répartition
que Willy avait proposée (S/M/L chez Citroën, Compact/Standard/Long chez Peugeot et Toyota,
L1H1/L2H1 ailleurs) : à confirmer pour que Nathan la code une fois pour toutes.

### 4.13 — La carte « Autres — Grands fourgons » n'a rien derrière

L'écran 1.1 montre 11 cartes marque : les 10 marques de la cartographie (27 modèles, le compte
tombe juste) **plus** une carte « Autres — Grands fourgons ». Elle correspond probablement au kit
universel sans galbes annoncé par Willy en mai (Master / Sprinter / Crafter), qui n'existe ni dans
la cartographie ni dans les maquettes. **Retenu :** ligne véhicule créée en statut `À créer`, non
sélectionnable dans le prototype, avec les trois questions (quels modèles, quelles longueurs, quel
prix).

### 4.14 — Les kits « combi T2 » et « combi T3 » n'existent pas dans la base Kits

La cartographie les cite pour les deux Combi VW. Les maquettes ne connaissent que Travel, Mado et
Madel. **Retenu :** je n'ai pas inventé leur prix. Les deux Combi VW n'ont donc aucun kit rattaché,
et le prototype affiche franchement « ⚠️ aucun kit rattaché » si on les sélectionne. La question est
posée sur les deux lignes véhicule.

### 4.15 — Le compteur « X sur 6 »

Les écrans 1.1, 1.2 **et** 1.3 affichent tous « 1 SUR 6 » dans les maquettes. J'ai gardé les 6
étapes demandées par le brief, numérotées 1 à 6, en affichant aussi le repère de maquette
(`1.1 · Véhicule · marque — 1 sur 6`) pour que Willy et Nathan parlent de la même chose. Le stepper
à 8 étapes n'est pas reproduit.

### 4.16 — Deux phrases de la maquette reformulées

Le brief interdit les mots « panier », « achat » et « commande ». Deux phrases reprises telles
quelles des maquettes les contenaient :

- « Le modèle est arrêté, l'achat pas encore fait. » → « Le modèle est arrêté, le véhicule n'est pas
  encore à vous. »
- « Le véhicule commande tout le reste » → « Le véhicule détermine tout le reste ».

C'est le seul endroit où je me suis écarté du texte des maquettes.

### 4.17 — Colonnes ajoutées au-delà du schéma demandé

Cinq ajouts, tous nécessaires pour que le prototype fonctionne sans prix en dur :

| Colonne | Base | Pourquoi |
|---|---|---|
| `Ordre` | Produits & options | conserver l'ordre d'affichage des maquettes |
| `Motif si non disponible` | Produits & options | la phrase française montrée quand la ligne est grisée |
| `Règles liées` ↔ `Options concernées` | Produits & options ↔ Règles | relier chaque ligne à la règle qui la justifie |
| `Finitions requises` | Produits & options | piloter l'upsell bicolore par la donnée, pas par du code |
| Section `Services & montage` | Produits & options | loger le montage (1 650 €) et la VASP (389 €) |

---

## 5. Ce que je n'ai pas pu faire

### Le déploiement Vercel a échoué — action requise de votre côté

Le projet **`kapam-configurateur-proto`** est créé
(`prj_xwP07MVEyMtsUtYPzOiT9KGiLXEE`, équipe *Thomas*), la protection Vercel Authentication est
désactivée pour que le lien soit ouvrable sans compte. Mais le déploiement échoue avec
`git_info_fail`, et la tentative de liaison au dépôt renvoie :

> *Failed to link thomasbonometti/augrandjardin. You need to add a Login Connection to your GitHub
> account first.*

**Le compte Vercel n'a pas de connexion GitHub.** Rien dans le MCP ne permet de la créer.

Pour finir le déploiement, une fois GitHub connecté dans Vercel
(*Settings → Login Connections → GitHub*) :

1. lier le projet `kapam-configurateur-proto` au dépôt `thomasbonometti/augrandjardin` ;
2. régler *Root Directory* sur `kapam-configurateur` et *Output Directory* sur `public` ;
3. déployer la branche `claude/new-session-p8c4a3`.

L'en-tête `noindex` est déjà dans `vercel.json`. En attendant, le prototype est ouvrable ici :
**https://claude.ai/artifact/LyCqYNaCrzWHVaJeiYwkXt** (à partager depuis le menu *Partager*).

### Le script de resync n'a jamais été exécuté

Aucun `NOTION_TOKEN` n'est disponible dans cet environnement, et le MCP Notion ne fournit pas de
token d'intégration. `catalogue.json` a donc été **amorcé** à partir des lignes réellement écrites
dans Notion, dans la forme exacte de sortie de `sync.mjs` (mêmes clés, même normalisation des
gabarits, mêmes identifiants de page Notion). Le premier vrai run du script doit produire un fichier
identique aux valeurs près de `genere_le`.

**À faire avant de considérer la chaîne comme validée :** créer l'intégration interne Notion, la
partager avec la page de référence, exporter `NOTION_TOKEN` et lancer une fois le script. S'il
échoue, il dira exactement quelle propriété manque.

### Le partage Notion pour Willy

Le MCP ne permet pas de créer un lien de partage ni d'inviter quelqu'un. À faire à la main.

### Données qui manquent encore et qu'aucune source ne contient

- **Les valeurs des trois nuanciers** (sol, stratifié, literie). Le prototype affiche les trois
  listes déroulantes, vides, avec la mention « donnée manquante ». Il nous faut vos nuanciers.
- **La grille de prix par finition et par longueur** pour les 4 options dont le sous-libellé dit
  « tarif selon finition / longueur ». Seul un « à partir de » existe.
- **Le détail des versions** : 3 versions du tiroir gaz, 2 versions + supplément de la tablette
  escamotable. Les libellés et les prix n'existent nulle part.
- **Les photos** : 62 lignes sur 62 sont sans visuel.

### Hors périmètre, volontairement

Les overlays des maquettes (tiroir résumé, tiroir option, lightbox PDF, comparateur de kits) ne sont
pas reproduits : le brief demande six écrans, et ces overlays relèvent du design, pas de la
validation des données. Le motif d'incompatibilité du tiroir est en revanche bien repris dans la
ligne grisée.

### Où vivent les fichiers

Le brief demandait `/notion-sync`, `/public` et `/RAPPORT.md` à la racine. Le dépôt
`thomasbonometti/augrandjardin` héberge déjà le site `produits.augrandjardin.fr` (un `index.html`
et un `CNAME` à la racine). J'ai donc tout rangé sous **`kapam-configurateur/`** pour ne rien
casser ; l'arborescence interne est celle demandée.

---

## 6. Ce qu'il faut demander à Willy, dans l'ordre

1. **Ouvrir l'écran « Règles du configurateur »** (lien en pied de page du prototype) et répondre
   *C'est juste* / *C'est faux* aux 25 règles. C'est le livrable qui devient le cahier des charges
   de Nathan.
2. **Trancher les 9 contradictions**, en commençant par les trois qui bloquent le chiffrage :
   le prix des kits et des finitions, le Kit Madel à 2 395 €, l'homologation VASP.
3. **Confirmer ou corriger les 5 prix qui ont changé** entre mai et les maquettes.
4. **Décider où vivent les 4 produits en double.**
5. Remplir la colonne *Commentaire Willy* partout où quelque chose cloche, puis passer les lignes
   de `À valider Willy` à `Validé`.
6. Cliquer **« Exporter mes retours »** et nous renvoyer le texte.
