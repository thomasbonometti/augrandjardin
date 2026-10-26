// /api/agj/pro/<action> → espace pro de l'outil de commande (connexion par e-mail et mot de passe,
// grille et commande du pro). Le cookie de session (agj_pro, chemin /api/agj/pro) passe dans les
// deux sens ; l'outil vérifie tout. Seules ces quatre adresses sont relayées.
import { relayer } from '../../../_lib/relais.js';

const ACTIONS = { login: ['POST'], logout: ['POST'], grille: ['GET', 'HEAD'], commande: ['POST'] };
// Ancien cookie du mot de passe partagé (chemin /, avant le lot 2) : effacé à la connexion et à la
// déconnexion, pour qu'il ne se mêle plus à la session de l'outil.
const ANCIEN = 'agj_pro=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax';

export async function onRequest({ request, env, params }) {
  const action = String(params.action || '');
  if (!Object.hasOwn(ACTIONS, action)) return Response.json({ ok: false, error: 'Introuvable' }, { status: 404 });
  const reponse = await relayer(request, env, `/api/agj/pro/${action}`, { methodes: ACTIONS[action], cookie: 'agj_pro' });
  if (action === 'login' || action === 'logout') reponse.headers.append('set-cookie', ANCIEN);
  return reponse;
}
