// GET /agj/config.json → textes publics de l'outil (catégories, avertissements, règles du panier)
import { relayer } from '../_lib/relais.js';
export const onRequest = ({ request, env }) => relayer(request, env, '/agj/config.json', { cache: 'public, max-age=60' });
