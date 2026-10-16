// POST /api/pro-login { motdepasse } → cookie de session pro (60 jours), puis la grille tarifaire
import { jetonPro, egal, proConfigure, COOKIE, DUREE } from '../_lib/auth.js';
import { lireCorps, repondre } from '../_lib/notion.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return Response.json({ error: 'POST attendu' }, { status: 405, headers: { allow: 'POST' } });
  if (!proConfigure(env)) return repondre(request, 503, { ok: false, erreur: 'L’espace pro n’est pas encore ouvert. Appelez Pierre au 06 42 42 42 93.' });
  const corps = await lireCorps(request);
  if (!(await egal(String(corps.motdepasse ?? '').trim(), env.PRO_PASSWORD))) {
    await new Promise((r) => setTimeout(r, 600)); // freine les essais en série
    return repondre(request, 401, { ok: false, erreur: 'Mot de passe incorrect. Il figure dans le dernier message de la ferme.', champs: { motdepasse: true } });
  }
  const cookie = `${COOKIE}=${await jetonPro(env)}; Path=/; Max-Age=${DUREE}; HttpOnly; Secure; SameSite=Lax`;
  const json = (request.headers.get('accept') || '').includes('application/json') || (request.headers.get('content-type') || '').includes('application/json');
  if (json) return new Response(JSON.stringify({ ok: true, redirection: '/pro/tarifs/' }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'set-cookie': cookie } });
  return new Response(null, { status: 303, headers: { location: '/pro/tarifs/', 'set-cookie': cookie, 'cache-control': 'no-store' } });
}
