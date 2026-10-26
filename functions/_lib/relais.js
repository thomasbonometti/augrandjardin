// Relais vers l'outil de commande (Worker « formulaires »), pour que le navigateur reste sur la même adresse
// (pas de CORS à ouvrir côté outil). Seules les adresses publiques nécessaires à la page sont relayées.

export const OUTIL = 'https://formulaires.hey-d8b.workers.dev';

// Le premier cookie de ce nom (le navigateur envoie d'abord celui du chemin le plus précis).
export function lireCookie(request, nom) {
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === nom) return part.slice(i + 1).trim();
  }
  return null;
}

// `cookie` : nom du seul cookie transmis à l'outil (session de l'espace pro) ; sa réponse
// Set-Cookie revient au navigateur. Aucun autre cookie du site ne part vers l'outil.
export async function relayer(request, env, chemin, { methodes = ['GET', 'HEAD'], cache = 'no-store', cookie = null } = {}) {
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
  const valeur = cookie && lireCookie(request, cookie);
  if (valeur) entetes.set('cookie', `${cookie}=${valeur}`);
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
  if (cookie) {
    const pose = reponse.headers.get('set-cookie');
    if (pose && pose.startsWith(`${cookie}=`)) sortie.append('set-cookie', pose);
  }
  sortie.set('cache-control', cache);
  sortie.set('x-robots-tag', 'noindex');
  return new Response(reponse.body, { status: reponse.status, headers: sortie });
}
