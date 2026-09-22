# Kapam — prototype du configurateur, piloté par Notion

Prototype de travail servant à faire valider **les données et les règles métier** du futur
configurateur Kapam par Willy Gonzalez. Ce n'est pas un exercice de design : l'apparence
définitive vit dans Figma (`Config v4`).

```
Base Notion (éditée par Willy)
        │
        │  notion-sync/sync.mjs   (lancé à la main)
        ▼
   public/catalogue.json  ──►  public/index.html  ──►  Vercel
```

Le prototype **n'appelle jamais l'API Notion depuis le navigateur** : cela exposerait un token
côté client. Il lit uniquement `catalogue.json`, généré par le script de resynchronisation.

## Resynchroniser après une modification de Willy

```
NOTION_TOKEN=ntn_xxx node notion-sync/sync.mjs
```

Le token appartient à une **intégration interne Notion** partagée avec la page
`🧭 Configurateur — Données de référence`. Il n'est jamais écrit dans le dépôt ni dans
`catalogue.json`. Le script échoue bruyamment si une propriété attendue manque dans une base,
et affiche en fin de run le nombre de lignes par base, le nombre de lignes encore
`À valider Willy`, le nombre de lignes sans visuel et le nombre de prix non tracés.

Variables d'environnement reconnues :

| Variable | Rôle |
|---|---|
| `NOTION_TOKEN` | obligatoire, token d'intégration interne |
| `NOTION_DB_OPTIONS` · `NOTION_DB_VEHICULES` · `NOTION_DB_KITS` · `NOTION_DB_REGLES` | surchargent les identifiants de base (valeurs par défaut dans `sync.mjs`) |

## Regarder le prototype en local

```
cd public && python3 -m http.server 8080
```

puis http://localhost:8080 — le `fetch('catalogue.json')` a besoin d'un vrai serveur HTTP,
ouvrir le fichier en `file://` ne marchera pas.

## Ce que contient le dépôt

| Fichier | Rôle |
|---|---|
| `notion-sync/sync.mjs` | lit les 4 bases Notion, écrit `public/catalogue.json` |
| `public/catalogue.json` | artefact généré — ne pas éditer à la main |
| `public/index.html` | le prototype, un seul fichier, sans framework ni dépendance |
| `vercel.json` | en-têtes `noindex` du déploiement |
| `RAPPORT.md` | les quatre bases, les divergences relevées, ce qui reste à faire |
