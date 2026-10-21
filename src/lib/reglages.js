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
  'Les ventes reprennent bientôt. Pour être prévenu de la reprise, inscrivez-vous à la liste par SMS ou suivez la ferme sur Facebook.';

// Mode fermé : null si le site est ouvert.
// « Fermé » coché, avec ou sans date de reprise. Le jour de la reprise, le site rouvre tout seul
// (à la publication suivante) : un « Fermé » oublié ne bloque pas la nouvelle saison.
export function lireFermeture(reglages, maintenant = new Date()) {
  if (!reglages?.ferme) return null;
  const reprise = /^\d{4}-\d{2}-\d{2}/.test(reglages.repriseLe || '') ? reglages.repriseLe.slice(0, 10) : null;
  if (reprise && reprise <= isoAujourdhui(maintenant)) return null;
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
