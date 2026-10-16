// GET /agj/lib/cart.js → fonctions du panier de l'outil (même calcul que le serveur)
import { relayer } from '../../_lib/relais.js';
export const onRequest = ({ request, env }) => relayer(request, env, '/agj/lib/cart.js', { cache: 'public, max-age=300' });
