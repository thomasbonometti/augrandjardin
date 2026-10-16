// Tout ce qui est sous /pro/ (la grille tarifaire) n'est servi qu'aux pros connectés.
import { jetonPro, egal, lireCookie } from '../_lib/auth.js';

export async function onRequest({ request, env, next }) {
  if (!env.PRO_PASSWORD || !env.PRO_SECRET) return new Response('Espace pro non configuré', { status: 503 });
  const ok = egal(lireCookie(request, 'agj_pro') ?? '', await jetonPro(env));
  if (!ok) {
    const url = new URL('/professionnels.html', request.url);
    return Response.redirect(url.toString(), 302);
  }
  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  out.headers.set('Cache-Control', 'private, no-store');
  return out;
}
