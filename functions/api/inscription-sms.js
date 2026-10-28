// POST /api/inscription-sms { telephone, canal, source, website } → ligne dans la base Notion « Inscriptions SMS »
// canal : « WhatsApp » (par défaut) ou « SMS » (revue de Pierre du 26/10/2026 : WhatsApp d'abord).
import { lireCanal, parCanal } from '../_lib/canal.js';
import { lirePortable } from '../_lib/telephone.js';
import { BASES, creerPage, chercher, titre, enTest, notionPret, repondre, lireCorps } from '../_lib/notion.js';

const SOURCES = ['accueil', 'produits'];

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return Response.json({ error: 'POST attendu' }, { status: 405, headers: { allow: 'POST' } });
  const corps = await lireCorps(request);
  if (corps.website) return repondre(request, 200, { ok: true, message: 'Merci, c’est noté.' }); // champ piège rempli : robot
  // Un portable (06/07, ou étranger avec indicatif), toujours rangé sous la même forme : le doublon
  // est reconnu plus bas même s'il est tapé autrement (+33 6…, 0033…). Détail : _lib/telephone.js.
  const numero = lirePortable(corps.telephone);
  if (!numero.ok) return repondre(request, 400, { ok: false, erreur: numero.erreur, champs: { telephone: true } });

  const { telephone } = numero;
  const canal = lireCanal(corps.canal);
  const par = parCanal(canal);
  if (env.FORMULAIRES_FAUX === '1') return repondre(request, 200, { ok: true, message: `C’est noté : la liste arrivera ${par} au ${telephone}.` });
  if (!notionPret(env)) return repondre(request, 503, { ok: false, erreur: 'L’inscription en ligne n’est pas encore ouverte. Appelez la ferme au 06 42 42 42 93.' });

  try {
    const existant = await chercher(env, BASES.sms, { property: 'Téléphone', title: { equals: telephone } });
    if (existant.results?.some((p) => p.properties?.Statut?.select?.name !== 'Désinscrit')) {
      return repondre(request, 200, { ok: true, message: `Ce numéro est déjà inscrit : la liste arrivera au ${telephone}.` });
    }
    await creerPage(env, BASES.sms, {
      'Téléphone': titre(telephone),
      Statut: { select: { name: 'Nouveau' } },
      Source: { select: { name: SOURCES.includes(corps.source) ? corps.source : 'accueil' } },
      Canal: { select: { name: canal } },
      Test: { checkbox: enTest(request, env) },
    });
    return repondre(request, 200, { ok: true, message: `Merci ! La liste de la semaine arrivera ${par} au ${telephone}.` });
  } catch (e) {
    console.error('inscription-sms', e.message);
    return repondre(request, 502, { ok: false, erreur: 'L’inscription n’a pas marché. Réessayez dans un instant, ou appelez la ferme au 06 42 42 42 93.' });
  }
}
