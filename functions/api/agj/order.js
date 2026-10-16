// POST /api/agj/order → commande transmise telle quelle à l'outil de commande, qui recalcule tout
import { relayer } from '../../_lib/relais.js';
export const onRequest = ({ request, env }) => relayer(request, env, '/api/agj/order', { methodes: ['POST'] });
