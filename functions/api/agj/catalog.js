// GET /api/agj/catalog → catalogue de l'outil de commande (relayé)
import { relayer } from '../../_lib/relais.js';
export const onRequest = ({ request, env }) => relayer(request, env, '/api/agj/catalog');
