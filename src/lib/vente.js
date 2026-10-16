// Fonctions pures (sans accès aux fichiers) : prix, rayons, créneaux de vente, dates.
// Testées par tests/vente.test.js.

const TZ = 'Europe/Paris';
export const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const JOURS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
// Espaces insécables : « 3,80 € » ne se coupe jamais en fin de ligne
export const euros = (n) => EUR.format(n).replace(/\s/g, ' ');
export const arrondi = (n) => Math.round(n * 100) / 100;

// ---------- Produits ----------

export const nettoyerNom = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

const UNITES = { '/kg': 'le kg', '/pièce': 'la pièce', '/plant': 'le plant' };
export const unite = (venduA) => UNITES[venduA] ?? venduA ?? '';

// Prix affiché, selon la façon dont le produit est vendu dans Notion.
export function prixProduit(p) {
  let montant = null;
  if (p.venduA === '/kg' && p.prixKg != null) montant = p.prixKg;
  else if (p.prixUnitaire != null) montant = p.prixUnitaire;
  else if (p.prixKg != null && p.poids) montant = arrondi(p.prixKg * p.poids);
  else if (p.prixKg != null) return { montant: p.prixKg, unite: 'le kg', ancien: null };
  if (montant == null) return null;
  const promo = p.promo && p.prixPromo != null && p.prixPromo < montant;
  return { montant: promo ? p.prixPromo : montant, ancien: promo ? montant : null, unite: unite(p.venduA) };
}

// Rayons dans l'ordre de la vente (celui du menu « categorie spéciale » dans Notion)
const ORDRE = ['🥕', '🥬', '🧑‍🌾', '🧅', '🍅', '🍃', '🍎', '🍓', '🧺', '🌱', '🍯'];
export function titreRayon(r) {
  const t = (r ?? '🧺 Divers').replace(/^\S+\s+/, '').trim();
  return /^Nos légumes/i.test(t) ? 'Légumes' : t;
}
export const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function grouperRayons(produits) {
  const groupes = new Map();
  for (const p of produits) {
    const cle = p.rayon ?? '🧺 Divers';
    if (!groupes.has(cle)) groupes.set(cle, { cle, titre: titreRayon(cle), slug: slug(titreRayon(cle)), produits: [] });
    groupes.get(cle).produits.push(p);
  }
  const rang = (cle) => { const i = ORDRE.findIndex((e) => cle.startsWith(e)); return i < 0 ? ORDRE.length : i; };
  return [...groupes.values()].sort((a, b) => rang(a.cle) - rang(b.cle));
}

export function estNouveau(p, reference, jours = 10) {
  if (p.nouveau) return true;
  if (!p.dateNouveaute) return false;
  const d = new Date(`${p.dateNouveaute}T12:00:00Z`);
  const ecart = (reference - d) / 86400000;
  return ecart >= -1 && ecart <= jours;
}

// Quatre produits mis en avant sur l'accueil : « À mettre en avant », puis nouveautés,
// produits d'appel, promos ; seulement ceux qui ont une photo.
export function vedettes(produits, n = 4) {
  const score = (p) => (p.aLaUne ? 8 : 0) + (p.estNouveau ? 4 : 0) + (p.produitAppel ? 2 : 0) + (p.promo ? 1 : 0);
  return produits
    .filter((p) => p.image && p.prix)
    .map((p, i) => ({ p, i }))
    .sort((a, b) => score(b.p) - score(a.p) || a.i - b.i)
    .slice(0, n)
    .map(({ p }) => p);
}

// ---------- Créneaux de vente (base Notion « Planning ») ----------

export function parseHoraire(texte) {
  const heures = (texte ?? '').match(/\d{1,2}\s*h\s*\d{0,2}/gi) ?? [];
  const [debut, fin] = heures.map((h) => {
    const m = h.match(/(\d{1,2})\s*h\s*(\d{0,2})/i);
    return Number(m[1]) * 60 + Number(m[2] || 0);
  });
  return { debut: debut ?? null, fin: fin ?? null };
}
export const fmtHeure = (min) => (min == null ? '' : `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, '0') : ''}`);
export const heureIso = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
export const plage = (c) => (c.debut != null && c.fin != null ? `${fmtHeure(c.debut)} – ${fmtHeure(c.fin)}` : c.horaire);

export function lireCreneaux(planning) {
  return planning
    .map((c) => {
      const { debut, fin } = parseHoraire(c.horaire);
      const jourNum = JOURS.indexOf(c.jour);
      const lieu = c.aLaFerme ? `Vente à la ferme, ${c.ville ?? 'Lostroff'}` : [capitale(c.ou?.replace(/^(au|à la|à)\s+/i, '') ?? ''), c.ville].filter(Boolean).join(', ');
      return { ...c, jourNum, debut, fin, lieu, jourEn: JOURS_EN[jourNum] };
    })
    .filter((c) => c.jourNum >= 0)
    .sort((a, b) => (b.cetteSemaine - a.cetteSemaine) || ((a.jourNum + 6) % 7) - ((b.jourNum + 6) % 7));
}
const capitale = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// Date et heure à Paris (sans dépendance)
export function partiesParis(date) {
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' });
  const o = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  return { annee: +o.year, mois: +o.month, jour: +o.day, minutes: +o.hour * 60 + +o.minute, jourSemaine: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday) };
}
const ajouterJours = ({ annee, mois, jour }, n) => {
  const d = new Date(Date.UTC(annee, mois - 1, jour + n, 12));
  return { annee: d.getUTCFullYear(), mois: d.getUTCMonth() + 1, jour: d.getUTCDate() };
};
const isoJour = ({ annee, mois, jour }) => `${annee}-${String(mois).padStart(2, '0')}-${String(jour).padStart(2, '0')}`;
const fmtJour = (iso, options) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC', ...options }).format(new Date(`${iso}T12:00:00Z`));

// Prochaine vente parmi les créneaux cochés « Cette semaine », à partir de `maintenant`.
export function prochaineVente(creneaux, maintenant = new Date()) {
  const ici = partiesParis(maintenant);
  const candidats = creneaux
    .filter((c) => c.cetteSemaine)
    .map((c) => {
      let ecart = (c.jourNum - ici.jourSemaine + 7) % 7;
      if (ecart === 0 && c.fin != null && ici.minutes >= c.fin) ecart = 7;
      const iso = isoJour(ajouterJours(ici, ecart));
      return { ...c, ecart, iso };
    })
    .sort((a, b) => a.ecart - b.ecart || (a.debut ?? 0) - (b.debut ?? 0));
  const c = candidats[0];
  if (!c) return null;
  return {
    ...c,
    jourDate: fmtJour(c.iso, { weekday: 'long', day: 'numeric', month: 'long' }), // samedi 17 octobre
    jourDateCourt: fmtJour(c.iso, { weekday: 'long', day: 'numeric', month: 'short' }), // samedi 17 oct.
    jourCourt: `${c.jour.slice(0, 3)}. ${fmtHeure(c.debut)}`, // Sam. 10h
    heures: plage(c),
    fin: c.fin,
    finIso: c.fin != null ? `${c.iso}T${heureIso(c.fin)}` : null,
  };
}

export function dateLongue(iso) {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(iso));
}
export function dateHeure(iso) {
  const d = new Date(iso);
  const jour = new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(d);
  const court = new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' }).format(d);
  const { minutes } = partiesParis(d);
  return { jour, court, heure: `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}` };
}

export const TVA = 0.055;
export const prixHT = (ttc) => arrondi(ttc / (1 + TVA));
