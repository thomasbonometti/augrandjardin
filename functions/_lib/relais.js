// Relais vers l'outil de commande (Worker « formulaires »), pour que le navigateur reste sur la même adresse
// (pas de CORS à ouvrir côté outil). Seules les adresses publiques nécessaires à la page sont relayées.

export const OUTIL = 'https://formulaires.hey-d8b.workers.dev';

export async function relayer(request, env, chemin, { methodes = ['GET', 'HEAD'], cache = 'no-store' } = {}) {
  if (!methodes.includes(request.method)) {
    return Response.json({ error: 'Méthode non autorisée' }, { status: 405, headers: { allow: methodes.join(', ') } });
  }
  const base = (env.AGJ_URL || OUTIL).replace(/\/$/, '');
  const cible = new URL(chemin, base);
  const entetes = new Headers({ accept: request.headers.get('accept') || '*/*' });
  if (request.method === 'POST') entetes.set('content-type', 'application/json');
  // L'adresse IP du client, utile aux protections de l'outil
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) entetes.set('x-forwarded-for', ip);
  let corps;
  if (request.method === 'POST') {
    corps = await request.text();
    if (corps.length > 20000) return Response.json({ ok: false, error: 'Commande trop volumineuse.' }, { status: 413 });
  }
  let reponse;
  try {
    reponse = await fetch(cible, { method: request.method, headers: entetes, body: corps, redirect: 'manual' });
  } catch {
    return Response.json({ ok: false, error: 'L’outil de commande ne répond pas. Réessayez dans un instant, ou appelez Pierre au 06 42 42 42 93.' }, { status: 502 });
  }
  const sortie = new Headers();
  for (const nom of ['content-type', 'etag', 'last-modified']) {
    const v = reponse.headers.get(nom);
    if (v) sortie.set(nom, v);
  }
  sortie.set('cache-control', cache);
  sortie.set('x-robots-tag', 'noindex');
  return new Response(reponse.body, { status: reponse.status, headers: sortie });
}
