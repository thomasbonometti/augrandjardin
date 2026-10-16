// Tout ce qui est sous /pro/ (la grille tarifaire) n'est servi qu'aux pros connectés.
import { estConnecte, COOKIE } from '../_lib/auth.js';

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  if (url.pathname === '/pro/deconnexion/' || url.pathname === '/pro/deconnexion') {
    return new Response(null, { status: 303, headers: { location: '/professionnels/', 'set-cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`, 'cache-control': 'no-store' } });
  }
  if (!(await estConnecte(request, env))) {
    return new Response(null, { status: 302, headers: { location: '/professionnels/#acces', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
  }
  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  out.headers.set('Cache-Control', 'private, no-store');
  return out;
}
