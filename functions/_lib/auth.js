// Jeton de session pro : HMAC-SHA256 du mot de passe avec un secret serveur.
// Changer PRO_PASSWORD dans Cloudflare déconnecte tous les pros.
export async function jetonPro(env) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(env.PRO_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`pro:${env.PRO_PASSWORD}`));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function egal(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function lireCookie(request, nom) {
  const m = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${nom}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}
