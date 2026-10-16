import { jetonPro, egal } from '../_lib/auth.js';

export async function onRequestHead() {
  return new Response(null, { status: 204 });
}

export async function onRequestPost({ request, env }) {
  if (!env.PRO_PASSWORD || !env.PRO_SECRET) return Response.json({ erreur: 'Espace pro non configuré' }, { status: 503 });
  let body = {};
  try { body = await request.json(); } catch {}
  if (!egal(String(body.motdepasse ?? ''), env.PRO_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 400)); // freine les essais en série
    return Response.json({ erreur: 'Mot de passe incorrect' }, { status: 401 });
  }
  const jeton = await jetonPro(env);
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `agj_pro=${jeton}; Path=/; Max-Age=${60 * 60 * 24 * 60}; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
