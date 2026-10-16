// Écriture dans les deux bases Notion du site (« Inscriptions SMS », « Demandes d'accès pro »).
// Jeton : secret Cloudflare NOTION_TOKEN (intégration « Site Au Grand Jardin »). Jamais dans le dépôt.
// Le site n'écrit dans aucune base de l'outil de commande.

export const BASES = {
  sms: '1f9db94f-6b9f-4ba2-aae7-d67ea66cae6f',
  pro: '95af73b3-86bc-4013-adb6-ccbe215a44d0',
};
const VERSION = '2025-09-03';

async function appel(env, chemin, corps) {
  const res = await fetch(`https://api.notion.com/v1/${chemin}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.NOTION_TOKEN}`, 'Notion-Version': VERSION, 'Content-Type': 'application/json' },
    body: JSON.stringify(corps),
  });
  if (!res.ok) throw new Error(`Notion ${res.status} : ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

export const creerPage = (env, base, properties) => appel(env, 'pages', { parent: { type: 'data_source_id', data_source_id: base }, properties });
export const chercher = (env, base, filter) => appel(env, `data_sources/${base}/query`, { filter, page_size: 5 });

export const texte = (s) => ({ rich_text: s ? [{ type: 'text', text: { content: String(s).slice(0, 1900) } }] : [] });
export const titre = (s) => ({ title: [{ type: 'text', text: { content: String(s).slice(0, 200) } }] });

// Le site de test (*.pages.dev) coche « Test » : ces lignes se repèrent et s'archivent facilement.
export const enTest = (request, env) => env.SITE_EN_TEST === '1' || !new URL(request.url).hostname.endsWith('augrandjardin.fr');

export function notionPret(env) {
  return Boolean(env.NOTION_TOKEN);
}

// Réponse commune : JSON pour la page (fetch), page HTML simple si le formulaire est envoyé sans JavaScript.
export function repondre(request, statut, donnees) {
  const veutJson = (request.headers.get('accept') || '').includes('application/json') || (request.headers.get('content-type') || '').includes('application/json');
  if (veutJson) return Response.json(donnees, { status: statut, headers: { 'cache-control': 'no-store' } });
  const message = donnees.ok ? donnees.message : donnees.erreur;
  const retour = request.headers.get('referer') || '/';
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Au Grand Jardin</title>
<style>body{font:16px/1.5 system-ui,sans-serif;background:#fbf9f3;color:#111;display:grid;place-items:center;min-height:100vh;margin:0;padding:20px}main{max-width:480px}a{color:#0c4b31}</style></head>
<body><main><p>${String(message).replace(/[<>&]/g, '')}</p><p><a href="${retour.replace(/"/g, '')}">Revenir au site</a></p></main></body></html>`;
  return new Response(html, { status: statut, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}

export async function lireCorps(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return request.json().catch(() => ({}));
  if (type.includes('form')) return Object.fromEntries(await request.formData());
  return {};
}

export const nettoyer = (v, max = 200) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
export const chiffres = (v) => String(v ?? '').replace(/\D/g, '');

// 06 12 34 56 78 (numéros français) ; sinon le numéro tel qu'il a été saisi
export function formaterTelephone(v) {
  let d = chiffres(v);
  if (d.startsWith('33') && d.length === 11) d = `0${d.slice(2)}`;
  if (d.length === 10 && d.startsWith('0')) return d.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  return nettoyer(v, 30);
}
