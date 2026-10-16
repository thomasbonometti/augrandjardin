// POST /api/demande-pro { nom, etablissement, telephone, email, besoins, website } → base Notion « Demandes d'accès pro »
import { BASES, creerPage, titre, texte, enTest, notionPret, repondre, lireCorps, nettoyer, chiffres, formaterTelephone } from '../_lib/notion.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return Response.json({ error: 'POST attendu' }, { status: 405, headers: { allow: 'POST' } });
  const c = await lireCorps(request);
  if (c.website) return repondre(request, 200, { ok: true, message: 'Merci, votre demande est envoyée.' });
  const nom = nettoyer(c.nom, 120);
  const etablissement = nettoyer(c.etablissement, 160);
  const email = nettoyer(c.email, 160).toLowerCase();
  const telephone = formaterTelephone(c.telephone);
  const besoins = String(c.besoins ?? '').trim().slice(0, 1800);
  const champs = {};
  if (!nom) champs.nom = true;
  if (!etablissement) champs.etablissement = true;
  if (chiffres(c.telephone).length < 9) champs.telephone = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) champs.email = true;
  if (Object.keys(champs).length) {
    return repondre(request, 400, { ok: false, erreur: 'Merci d’indiquer votre nom, votre établissement, un téléphone et un e-mail valides.', champs });
  }
  if (env.FORMULAIRES_FAUX === '1') return repondre(request, 200, { ok: true, message: 'Merci ! Pierre vous rappelle sous 48 h.' });
  if (!notionPret(env)) return repondre(request, 503, { ok: false, erreur: 'Le formulaire n’est pas encore ouvert. Appelez Pierre au 06 42 42 42 93.' });
  try {
    await creerPage(env, BASES.pro, {
      'Établissement': titre(etablissement),
      Nom: texte(nom),
      'Téléphone': { phone_number: telephone },
      'E-mail': { email },
      Besoins: texte(besoins),
      Statut: { select: { name: 'Nouvelle' } },
      Test: { checkbox: enTest(request, env) },
    });
    return repondre(request, 200, { ok: true, message: 'Merci ! Votre demande est bien arrivée : Pierre vous rappelle sous 48 h.' });
  } catch (e) {
    console.error('demande-pro', e.message);
    return repondre(request, 502, { ok: false, erreur: 'L’envoi n’a pas marché. Réessayez dans un instant, ou appelez Pierre au 06 42 42 42 93.' });
  }
}
