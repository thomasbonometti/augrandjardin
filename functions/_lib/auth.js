// Espace pro : un mot de passe partagé (secret Cloudflare PRO_PASSWORD) et un jeton de session
// signé avec un second secret (PRO_SECRET). Changer PRO_PASSWORD déconnecte tous les pros.

export const COOKIE = 'agj_pro';
export const DUREE = 60 * 60 * 24 * 60; // 60 jours

export async function jetonPro(env) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(env.PRO_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`pro:${env.PRO_PASSWORD}`));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Comparaison en temps constant (après hachage, pour ne pas révéler la longueur)
export async function egal(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(String(a))), crypto.subtle.digest('SHA-256', enc.encode(String(b)))]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function lireCookie(request, nom) {
  const m = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${nom}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export const proConfigure = (env) => Boolean(env.PRO_PASSWORD && env.PRO_SECRET);
export async function estConnecte(request, env) {
  if (!proConfigure(env)) return false;
  return egal(lireCookie(request, COOKIE) ?? '', await jetonPro(env));
}
