// Historique des listes (idée B2) : à chaque construction du site en ligne, une copie de la liste de la semaine
// est gardée dans la base Notion « Historique des listes », si elle a changé depuis la dernière copie.
// Ici, les fonctions pures qui préparent la ligne ; l'envoi à Notion est dans scripts/sync-notion.mjs.
import { nettoyerNom, prixProduit, euros, estNouveau, partiesParis } from './vente.js';

// « 2026-S43 » : année et numéro de semaine ISO (la semaine commence le lundi).
export function semaineIso(iso) {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)); // le jeudi de la même semaine
  const debutAnnee = Date.UTC(d.getUTCFullYear(), 0, 1);
  const numero = Math.ceil(((d - debutAnnee) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-S${String(numero).padStart(2, '0')}`;
}

// « 2026-10-21T18:05:00+02:00 » : l'heure de Paris, avec son décalage.
export function horodatageParis(maintenant = new Date()) {
  const p = partiesParis(maintenant);
  const local = Date.UTC(p.annee, p.mois - 1, p.jour, Math.floor(p.minutes / 60), p.minutes % 60);
  const ecart = Math.round((local - Math.floor(maintenant.getTime() / 60000) * 60000) / 60000);
  const signe = ecart >= 0 ? '+' : '-';
  const h = String(Math.floor(Math.abs(ecart) / 60)).padStart(2, '0');
  const m = String(Math.abs(ecart) % 60).padStart(2, '0');
  const deux = (n) => String(n).padStart(2, '0');
  return `${p.annee}-${deux(p.mois)}-${deux(p.jour)}T${deux(Math.floor(p.minutes / 60))}:${deux(p.minutes % 60)}:00${signe}${h}:${m}`;
}

// Une ligne lisible par produit : « Carottes — 3,20 € le kg · Nouveau »
export function ligneProduit(p, reference = new Date()) {
  const prix = prixProduit(p);
  const etiquettes = [
    estNouveau(p, reference) && 'Nouveau',
    p.quantiteLimitee && 'Quantité limitée',
    prix?.ancien && `Promo (au lieu de ${euros(prix.ancien)})`,
    p.derniereSemaine && 'Dernière semaine',
    p.pasBio && 'Non certifié bio',
  ].filter(Boolean);
  return [`${nettoyerNom(p.nom)} — ${prix ? `${euros(prix.montant)} ${prix.unite}`.trim() : 'prix non indiqué'}`, ...etiquettes].join(' · ');
}

// Contenu de la ligne « Historique des listes » pour les produits en vente (format de scripts/sync-notion.mjs).
export function contenuListe(produits, { prochaineVente = null, maintenant = new Date() } = {}) {
  const liste = produits.filter((p) => nettoyerNom(p.nom)).sort((a, b) => nettoyerNom(a.nom).localeCompare(nettoyerNom(b.nom), 'fr'));
  const horodatage = horodatageParis(maintenant);
  const jourLong = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric' }).format(maintenant);
  const { minutes } = partiesParis(maintenant);
  const donnees = liste.map((p) => {
    const prix = prixProduit(p);
    return {
      ref: p.ref ?? null,
      nom: nettoyerNom(p.nom),
      rayon: p.rayon ?? null,
      prix: prix?.montant ?? null,
      unite: prix?.unite ?? null,
      ancienPrix: prix?.ancien ?? null,
      nouveau: estNouveau(p, maintenant),
      quantiteLimitee: !!p.quantiteLimitee,
      derniereSemaine: !!p.derniereSemaine,
      pasBio: !!p.pasBio,
      producteur: p.producteur ?? null,
    };
  });
  return {
    titre: `Liste du ${jourLong} (${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')})`,
    publieeLe: horodatage,
    semaine: semaineIso(horodatage),
    prochaineVente: prochaineVente ? `${prochaineVente.jourDate}, ${prochaineVente.heures}` : '',
    nombre: liste.length,
    texte: liste.map((p) => ligneProduit(p, maintenant)).join('\n'),
    json: JSON.stringify(donnees),
  };
}

// Texte Notion (limite de 2 000 caractères par morceau, 100 morceaux au plus).
export function morceauxTexte(texte, taille = 1900) {
  const s = String(texte ?? '');
  const out = [];
  for (let i = 0; i < s.length && out.length < 100; i += taille) out.push({ type: 'text', text: { content: s.slice(i, i + taille) } });
  return out;
}
