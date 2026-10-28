// Réglages du site (base Notion « Réglages du site », une seule ligne) et questions fréquentes.
// Fonctions pures, sans accès aux fichiers : testées par tests/reglages.test.js.
import { partiesParis } from './vente.js';

const deux = (n) => String(n).padStart(2, '0');
export const isoAujourdhui = (maintenant = new Date()) => {
  const p = partiesParis(maintenant);
  return `${p.annee}-${deux(p.mois)}-${deux(p.jour)}`;
};
const jour = (iso, options) => new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC', ...options }).format(new Date(`${iso}T12:00:00Z`));

export const MESSAGE_FERMETURE =
  'Les ventes reprennent bientôt. Pour être prévenu de la reprise, recevez la liste de la semaine (WhatsApp ou SMS) ou suivez la ferme sur Facebook.';

// Mode fermé : null si le site est ouvert.
// « Fermé » coché, avec ou sans date de reprise. Avec une date, le site rouvre tout seul à la
// publication qui suit la reprise, ou dès la semaine de la reprise : quand la prochaine vente du
// Planning (venteIso, « 2027-03-06 ») tombe le jour de la reprise ou après. Pierre publie ainsi la
// première liste de la saison sans décocher « Fermé », et un « Fermé » oublié ne bloque rien.
export function lireFermeture(reglages, maintenant = new Date(), { venteIso = null } = {}) {
  if (!reglages?.ferme) return null;
  const reprise = /^\d{4}-\d{2}-\d{2}/.test(reglages.repriseLe || '') ? reglages.repriseLe.slice(0, 10) : null;
  if (reprise && (reprise <= isoAujourdhui(maintenant) || (venteIso && venteIso >= reprise))) return null;
  return {
    reprise,
    repriseLong: reprise ? jour(reprise, { weekday: 'long', day: 'numeric', month: 'long' }) : null, // samedi 7 mars
    repriseCourt: reprise ? jour(reprise, { weekday: 'short', day: 'numeric', month: 'short' }) : null, // sam. 7 mars
    repriseChiffre: reprise ? jour(reprise, { day: 'numeric', month: 'short' }) : null, // 7 mars (chiffres clés)
    message: (reglages.messageFermeture || '').trim() || MESSAGE_FERMETURE,
  };
}

// « Reprise le samedi 7 mars », ou « Reprise bientôt » sans date.
export const texteReprise = (f, court = false) =>
  f?.reprise ? `Reprise le ${court ? f.repriseCourt : f.repriseLong}` : 'Reprise bientôt';

// Marchés et fêtes (revue de Pierre du 26/10/2026 : il n'en fait plus) : les créneaux du Planning
// hors de la ferme ne sont affichés que si « Afficher les marchés » est coché. Le Planning, lu aussi
// par les publications Facebook, ne change pas.
export const afficherMarches = (reglages) => !!reglages?.afficherMarches;
export const creneauxAffiches = (creneaux = [], reglages) =>
  afficherMarches(reglages) ? creneaux : creneaux.filter((c) => c.aLaFerme);

// Une case de « Réglages du site », qu'une variable de construction peut forcer (« ouvert(e) » ou
// « ferme(e) ») : elle sert aux déploiements d'aperçu de Cloudflare, pour essayer une fonction
// sans l'ouvrir sur le site. Case absente (ancienne copie de data/) : fermé.
export function interrupteur(coche, forcer) {
  const f = String(forcer ?? '').trim().toLowerCase();
  if (['ouvert', 'ouverte', 'oui', '1'].includes(f)) return true;
  if (['ferme', 'fermé', 'fermee', 'fermée', 'non', '0'].includes(f)) return false;
  return !!coche;
}

// Espace pro (en veille jusqu'au printemps 2027) : case « Espace pro ouvert », variable ESPACE_PRO.
export const lireEspacePro = (reglages, forcer) => interrupteur(reglages?.espaceProOuvert, forcer);

// Commandes de pommes de terre (Thomas, 28/10/2026) : case « Commandes de pommes de terre ouvertes »,
// variable COMMANDE_PDT. Cochée pendant la période que choisit Pierre : la page Pommes de terre est sur le
// site et l'on commande en ligne (exceptionnellement par téléphone). Décochée : plus de commande du tout,
// la page disparaît (menu, plan du site, accueil ; /pommes-de-terre/ renvoie vers l'accueil) et l'outil
// de commande refuse les commandes en ligne (il lit la même case).
export const lireCommandesPdt = (reglages, forcer) => interrupteur(reglages?.commandesPdtOuvertes, forcer);

// Inscription à la liste de la semaine (gardée de côté tant que l'envoi automatique n'existe pas,
// même décision) : case « Inscription à la liste ouverte », variable INSCRIPTION_LISTE.
// Décochée : « demandez-la à Pierre » à la place du formulaire.
export const lireInscriptionListe = (reglages, forcer) => interrupteur(reglages?.inscriptionListeOuverte, forcer);

// Message de la semaine, sous la barre verte : seulement si « Afficher le message » est coché.
export function lireAnnonce(reglages) {
  const texte = (reglages?.message || '').replace(/\s+/g, ' ').trim();
  return reglages?.afficherMessage && texte ? texte : null;
}

// ---------- Questions fréquentes ----------

const echapper = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LIEN_PERMIS = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i;

function segmentHtml(s) {
  let h = echapper(s.texte);
  if (s.gras) h = `<strong>${h}</strong>`;
  if (s.italique) h = `<em>${h}</em>`;
  if (s.lien && LIEN_PERMIS.test(s.lien)) h = `<a href="${echapper(s.lien)}"${/^https?:/i.test(s.lien) ? ' rel="noopener"' : ''}>${h}</a>`;
  return h;
}

// Réponse Notion (morceaux de texte avec gras, italique, liens) → HTML.
// Un retour à la ligne dans Notion = un nouveau paragraphe.
export function reponseHtml(segments = []) {
  const paragraphes = [[]];
  for (const s of segments) {
    String(s.texte ?? '').split('\n').forEach((morceau, i) => {
      if (i > 0) paragraphes.push([]);
      if (morceau) paragraphes.at(-1).push({ ...s, texte: morceau });
    });
  }
  return paragraphes
    .filter((p) => p.some((s) => s.texte.trim()))
    .map((p) => `<p>${p.map(segmentHtml).join('').trim()}</p>`)
    .join('');
}

export const reponseTexte = (segments = []) => segments.map((s) => s.texte ?? '').join('').replace(/\s+/g, ' ').trim();

// Questions publiées pour une page du site (nom de l'option « Pages » dans Notion), dans l'ordre.
export function questionsPour(faq = [], page) {
  return faq
    .filter((q) => q.question && q.pages?.includes(page) && reponseTexte(q.reponse))
    .sort((a, b) => (a.ordre ?? 9999) - (b.ordre ?? 9999) || a.question.localeCompare(b.question, 'fr'));
}

// Données structurées FAQPage (schema.org) pour une liste de questions.
export function schemaFaq(questions) {
  if (!questions.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: reponseTexte(q.reponse) },
    })),
  };
}
