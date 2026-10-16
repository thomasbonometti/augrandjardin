"""Convertit un export de la base Produits (lu via le connecteur Notion de Claude)
au même format que celui produit par scripts/sync-notion.mjs en mode live.
Sert uniquement aux tests sans jeton d'API Notion.

Usage : python3 scripts/snapshot-from-mcp.py <export.json>
"""
import json, sys, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
rows = json.load(open(sys.argv[1]))["results"]
yes = lambda v: v == "__YES__"
out = []
for r in rows:
    out.append({
        "id": r["url"].rsplit("/", 1)[-1],
        "nom": (r.get("Nom") or "").strip(),
        "ref": int(r["Référence"]) if r.get("Référence") is not None else None,
        "categorie": r.get("Catégorie"),
        "rayon": r.get("categorie spéciale"),
        "producteur": r.get("Producteur"),
        "venduA": r.get("Vendu à"),
        "prixUnitaire": r.get("Prix unitaire"),
        "prixKg": r.get("Prix au kg"),
        "poids": r.get("Poids"),
        "prixPromo": r.get("Prix promo (TTC)"),
        "promo": yes(r.get("Promo")),
        "nouveau": yes(r.get("Nouveau")),
        "dateNouveaute": r.get("date:Date nouveauté:start"),
        "quantiteLimitee": yes(r.get("Quantité limitée")),
        "derniereSemaine": yes(r.get("Dernière semaine")),
        "produitAppel": yes(r.get("Produit d'appel")),
        "aLaUne": yes(r.get("À mettre en avant")),
        "pasBio": yes(r.get("Pas bio")),
        "description": r.get("Description") or "",
        "imageUrl": None,
    })
(ROOT / "data/produits.json").write_text(json.dumps(out, ensure_ascii=False, indent=2))
now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).isoformat(timespec="seconds")
(ROOT / "data/meta.json").write_text(json.dumps({"syncedAt": now, "source": "Notion (lu via le connecteur, test)"}, ensure_ascii=False, indent=2))
print(f"{len(out)} produits, synchro {now}")
for p in out:
    if p["aLaUne"] or p["quantiteLimitee"]:
        print("  ", p["nom"], "| à la une" if p["aLaUne"] else "", "| quantité limitée" if p["quantiteLimitee"] else "")
