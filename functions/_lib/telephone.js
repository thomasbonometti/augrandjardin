// Numéro de la liste de la semaine : elle part sur WhatsApp ou par SMS, donc vers un portable.
// - France : 06 ou 07, saisi « 06… », « +33 6… », « 0033 6… » ou « +33 (0)6… », toujours rangé
//   « 06 12 34 56 78 » : la même forme que les inscrits déjà dans Notion, pour reconnaître un
//   numéro déjà inscrit quelle que soit la façon de le taper.
// - Étranger (clients de l'autre côté de la frontière) : « + » ou « 00 » suivi de l'indicatif,
//   11 à 15 chiffres en tout, rangé « +49151… » ; le type de ligne n'est pas contrôlé.
// - Refusé : un fixe français (01 à 05, 09) ou un numéro spécial (08), où ni WhatsApp ni les SMS
//   n'arrivent, et un numéro incomplet.

export const ERREUR_INCOMPLET = 'Ce numéro ne semble pas complet : 10 chiffres, par exemple 06 12 34 56 78 (numéro étranger : avec l’indicatif, +32, +49…).';
export const ERREUR_FIXE = 'Indiquez un numéro de portable (06 ou 07) : la liste ne peut pas arriver sur un fixe.';

export function lirePortable(saisie) {
  const brut = String(saisie ?? '').trim();
  let d = brut.replace(/\D/g, '');
  const avecIndicatif = brut.startsWith('+') || d.startsWith('00');
  if (d.startsWith('00')) d = d.slice(2);

  // +33, 0033, ou 33 sans « + » (déjà accepté avant) : on revient au numéro français à 10 chiffres.
  if (d.startsWith('33') && (avecIndicatif || d.length === 11 || d.length === 12)) {
    let reste = d.slice(2);
    if (reste.startsWith('0')) reste = reste.slice(1); // « +33 (0)6… »
    d = `0${reste}`;
  } else if (avecIndicatif) {
    if (d.length < 11 || d.length > 15) return { ok: false, erreur: ERREUR_INCOMPLET };
    return { ok: true, telephone: `+${d}` };
  }

  if (d.length !== 10 || !d.startsWith('0')) return { ok: false, erreur: ERREUR_INCOMPLET };
  if (d[1] !== '6' && d[1] !== '7') return { ok: false, erreur: ERREUR_FIXE };
  return { ok: true, telephone: d.replace(/(\d{2})(?=\d)/g, '$1 ') };
}
