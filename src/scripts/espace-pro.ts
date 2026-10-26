// Espace pro (lot 2) : la grille du pro connecté, sa commande, les prévisions.
// Tout vient de l'outil de commande par le relais du site (/api/agj/pro/*) ; l'outil recalcule les
// prix à l'envoi. Sans session : le formulaire de connexion (géré par formulaires.ts).
import { panier, rendreGrille, rendreLigne, rendreLignesPanier, rendrePrevisions, lireQuantite, pasDe, quantite, pct, euros, texteListePaliers, jourLivraison } from '../lib/pro-grille.js';
import { espacesInsecables } from '../lib/typo.js';

type Row = { id: string; nom: string; kind: 'kg' | 'u'; unite: string; htCents: number; ttcCents: number; ttcProCents: number; paliers: { seuil: number; pct: number; htCents: number }[] };
type Order = { id: string; numero: string; status: string; statusLabel: string; livraison: string; livraisonLabel: string; items: Record<string, number>; mot: string; totalHtCents: number };
type Vue = {
  pro: { etablissement: string; contact: string; remise: number };
  delivery: { iso: string; label: string; cutoffLabel: string } | null;
  pause: { title: string; message?: string } | null;
  grid: Row[];
  paliers: { kg: { seuil: number; pct: number }[]; u: { seuil: number; pct: number }[] };
  minimumCents: number;
  step: { kg: number; unit: number };
  maxQty: number;
  current: Order | null;
  locked: boolean;
  last: Order | null;
  previsions: { weeks: { iso: string; label: string }[]; rows: unknown[] };
  farm: { phone: string };
  live: boolean;
};

const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const montrer = (s: string, oui = true) => { $(s).hidden = !oui; };
const texte = (s: string, t: string) => { $(s).textContent = espacesInsecables(t); };
const CLE = 'agj-pro-brouillon';

let vue: Vue;
let items: Record<string, number> = {};
let envoiEnCours = false;
let reference = '';
const nouvelleRef = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

// Brouillon gardé dans le navigateur (quantités et mot), pour ne rien perdre au rechargement.
const brouillon = {
  lire(): { livraison: string; items: Record<string, number>; mot: string } | null { try { return JSON.parse(localStorage.getItem(CLE) || 'null'); } catch { return null; } },
  ecrire() { try { localStorage.setItem(CLE, JSON.stringify({ livraison: vue.delivery?.iso, items, mot: ($('[data-mot]') as HTMLTextAreaElement).value })); } catch { /* navigation privée */ } },
  effacer() { try { localStorage.removeItem(CLE); } catch { /* navigation privée */ } },
};

async function charger() {
  let r: Response;
  try {
    r = await fetch('/api/agj/pro/grille', { headers: { accept: 'application/json' }, credentials: 'same-origin' });
  } catch {
    return erreurChargement('Pas de connexion. Réessayez dans un instant.');
  }
  if (r.status === 401) return connexion();
  const data = await r.json().catch(() => null);
  if (!r.ok || !data?.ok) return erreurChargement(data?.error || 'Vos prix ne s’affichent pas pour le moment. Réessayez dans un instant, ou appelez Pierre au 06 42 42 42 93.');
  vue = data as Vue;
  afficher();
}

function erreurChargement(message: string) {
  texte('[data-intro]', message);
}

function connexion() {
  texte('[data-titre]', 'Espace professionnels');
  texte('[data-intro]', 'Vos prix de la semaine, avec votre remise, et votre commande pour le lundi.');
  montrer('[data-connexion]');
  if (location.hash === '#connexion') $<HTMLInputElement>('#c-email').focus();
}

function afficher() {
  const v = vue;
  const jour = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' }).format(new Date());
  texte('[data-date]', `Prix du ${jour}`);
  const lundi = v.delivery ? v.delivery.label.split(' ')[0] : 'lundi';
  texte('[data-intro]', `Bonjour ${v.pro.etablissement}. Vos prix comprennent votre remise et les paliers de quantité. Commandez ici, Pierre livre le ${lundi}.`);
  montrer('[data-pied]');

  if (v.pause) {
    texte('[data-pause-titre]', v.pause.title);
    texte('[data-pause-texte]', v.pause.message || `Pour une demande en attendant, appelez Pierre au ${v.farm.phone}.`);
    texte('[data-intro]', `Bonjour ${v.pro.etablissement}. Les ventes sont en pause : votre grille revient à la reprise.`);
    montrer('[data-pause]');
    return;
  }

  // Remise, paliers, livraison
  texte('[data-remise]', pct(v.pro.remise));
  texte('[data-remise-texte]', 'Sur toute la grille. Les paliers s’ajoutent à votre remise.');
  texte('[data-paliers]', texteListePaliers(v.paliers.kg, 'kg') || 'Pas de palier');
  texte('[data-paliers-texte]', v.paliers.u.length ? `À l’unité (bouquet, pot, bouteille) : ${texteListePaliers(v.paliers.u, 'u')}.` : '');
  if (v.delivery) {
    texte('[data-livraison-resume]', jourLivraison(v.delivery.label));
    texte('[data-livraison-texte]', `Commandes jusqu’au ${v.delivery.cutoffLabel}.${v.minimumCents > 0 ? ` Minimum ${euros(v.minimumCents)} HT.` : ''}`);
  } else {
    texte('[data-livraison-resume]', 'Pas de livraison prévue');
    texte('[data-livraison-texte]', `Pour une demande, appelez Pierre au ${v.farm.phone}.`);
  }
  montrer('[data-resume]');

  // Quantités de départ : la commande déjà passée pour ce lundi, sinon le brouillon.
  const b = brouillon.lire();
  if (v.current) {
    items = { ...v.current.items };
    ($('[data-mot]') as HTMLTextAreaElement).value = v.current.mot || '';
    if (!v.locked && b && b.livraison === v.delivery?.iso && JSON.stringify(b.items) !== JSON.stringify(v.current.items)) {
      items = garder(b.items);
      ($('[data-mot]') as HTMLTextAreaElement).value = b.mot || '';
      message('Vos changements pas encore envoyés sont repris.');
    }
  } else if (b && b.livraison === v.delivery?.iso) {
    items = garder(b.items);
    ($('[data-mot]') as HTMLTextAreaElement).value = b.mot || '';
  }

  montrer('[data-actions]');
  montrer('[data-semaine-derniere]', !!(v.last && v.delivery && !v.locked && Object.keys(garder(v.last.items)).length));
  $('[data-grille]').innerHTML = rendreGrille(v.grid, items, { verrou: v.locked || !v.delivery });
  montrer('[data-commande]');
  if (v.previsions?.rows?.length) {
    $('[data-previsions-table]').innerHTML = rendrePrevisions(v.previsions);
    montrer('[data-previsions]');
  }
  panneau();
}

// Seulement les produits encore dans la grille, aux quantités permises.
function garder(source: Record<string, number> = {}) {
  const out: Record<string, number> = {};
  for (const row of vue.grid) {
    const q = lireQuantite(String(source[row.id] ?? ''), row, { pas: vue.step, max: vue.maxQty });
    if (q) out[row.id] = q;
  }
  return out;
}

function message(t: string) { texte('[data-message]', t); }

// ---------- panneau « Votre commande » et barre du téléphone ----------

const memes = (a: Record<string, number>, b: Record<string, number>) => {
  const ka = Object.keys(a).filter((k) => a[k]), kb = Object.keys(b).filter((k) => b[k]);
  return ka.length === kb.length && ka.every((k) => a[k] === b[k]);
};

function panneau() {
  const v = vue;
  const p = panier(v.grid, items);
  const nb = p.lignes.length;
  if (v.delivery) {
    texte('[data-livraison]', `Livraison ${v.delivery.label}`);
    texte('[data-limite]', `À envoyer avant ${v.delivery.cutoffLabel.replace(' à ', ', ')}`);
  } else {
    texte('[data-livraison]', 'Pas de livraison prévue pour le moment');
    texte('[data-limite]', `Appelez Pierre au ${v.farm.phone}.`);
  }
  $('[data-lignes]').innerHTML = rendreLignesPanier(p);
  texte('[data-note]', nb ? `Remise de ${pct(v.pro.remise)} et paliers compris. Les prix sont vérifiés à l’envoi.` : '');

  const etat = $('[data-etat]');
  const envoyer = $<HTMLButtonElement>('[data-envoyer]');
  const mot = ($('[data-mot]') as HTMLTextAreaElement).value.trim();
  const inchange = !!v.current && memes(items, v.current.items) && mot === (v.current.mot || '').trim();
  etat.classList.remove('ok');
  if (v.locked && v.current) {
    etat.textContent = espacesInsecables(`Pierre a préparé votre commande ${v.current.numero}. Pour la changer, appelez-le au ${v.farm.phone}.`);
    etat.hidden = false;
  } else if (v.current) {
    etat.textContent = espacesInsecables(inchange
      ? `Commande ${v.current.numero} envoyée. Vous pouvez la modifier jusqu’au ${v.delivery?.cutoffLabel}.`
      : `Commande ${v.current.numero} envoyée : vos changements ne sont pas encore envoyés.`);
    if (inchange) etat.classList.add('ok');
    etat.hidden = false;
  } else etat.hidden = true;

  const sousMinimum = v.minimumCents > 0 && nb > 0 && p.totalHtCents < v.minimumCents;
  montrer('[data-envoyer]', !v.locked && !!v.delivery);
  montrer('[data-mot-zone]', !v.locked && !!v.delivery);
  montrer('[data-apres]', !v.locked && !!v.delivery && !inchange);
  montrer('[data-vider]', !v.locked && nb > 0);
  envoyer.textContent = v.current ? 'Mettre à jour la commande' : 'Envoyer la commande';
  envoyer.disabled = envoiEnCours || !nb || sousMinimum || inchange;
  const erreur = $('[data-erreur]');
  if (sousMinimum) { erreur.textContent = espacesInsecables(`Commande minimum : ${euros(v.minimumCents)} HT.`); erreur.dataset.minimum = '1'; } else if (erreur.dataset.minimum) { erreur.textContent = ''; delete erreur.dataset.minimum; }

  // Barre du bas (téléphone)
  montrer('[data-barre]', !!v.delivery);
  texte('[data-barre-resume]', nb ? `${nb} produit${nb > 1 ? 's' : ''} · ${euros(p.totalHtCents)} HT` : 'Votre commande est vide');
  texte('[data-barre-livraison]', v.delivery ? `Livraison ${v.delivery.label}` : '');
  $('[data-ouvrir]').textContent = v.current && inchange ? 'Voir ma commande' : 'Voir et envoyer';
}

function changer(id: string, q: number) {
  const row = vue.grid.find((r) => r.id === id);
  if (!row) return;
  if (q > 0) items[id] = q; else delete items[id];
  // On remplace la ligne (prix du palier, coche, quantité) sans toucher au reste de la grille.
  const tr = document.querySelector(`.ligne-pro[data-id="${CSS.escape(id)}"]`);
  if (tr) {
    const actif = document.activeElement?.matches('[data-qte]') && tr.contains(document.activeElement);
    const quel = (document.activeElement as HTMLElement)?.dataset;
    tr.outerHTML = rendreLigne(row, q, { verrou: vue.locked });
    const neuf = document.querySelector(`.ligne-pro[data-id="${CSS.escape(id)}"]`);
    if (actif) neuf?.querySelector<HTMLInputElement>('[data-qte]')?.focus();
    else if (quel && 'plus' in quel) neuf?.querySelector<HTMLButtonElement>('[data-plus]')?.focus();
    else if (quel && 'moins' in quel) (neuf?.querySelector<HTMLButtonElement>('[data-moins]:not(:disabled)') || neuf?.querySelector<HTMLButtonElement>('[data-plus]'))?.focus();
  }
  brouillon.ecrire();
  panneau();
}

// ---------- événements ----------

$('[data-grille]').addEventListener('click', (e) => {
  const bouton = (e.target as Element).closest('button');
  const tr = bouton?.closest<HTMLElement>('.ligne-pro');
  if (!bouton || !tr || vue.locked) return;
  const row = vue.grid.find((r) => r.id === tr.dataset.id)!;
  const q = items[row.id] || 0;
  if (bouton.matches('[data-plus]')) changer(row.id, Math.min(vue.maxQty, Math.floor(q + 1e-9) + 1));
  if (bouton.matches('[data-moins]')) changer(row.id, Math.max(0, Math.ceil(q - 1e-9) - 1));
});

$('[data-grille]').addEventListener('change', (e) => {
  const input = (e.target as Element).closest<HTMLInputElement>('[data-qte]');
  const tr = input?.closest<HTMLElement>('.ligne-pro');
  if (!input || !tr) return;
  const row = vue.grid.find((r) => r.id === tr.dataset.id)!;
  const q = lireQuantite(input.value, row, { pas: vue.step, max: vue.maxQty });
  if (q == null) { input.value = String(items[row.id] || 0).replace('.', ','); message(`${row.nom} : une quantité en ${row.kind === 'kg' ? `kilos, par ${quantite(pasDe(row, vue.step), 'kg')}` : 'unités'}.`); return; }
  changer(row.id, q);
});
$('[data-grille]').addEventListener('keydown', (e) => {
  if ((e as KeyboardEvent).key === 'Enter' && (e.target as Element).matches('[data-qte]')) (e.target as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true }));
});
$('[data-grille]').addEventListener('focusin', (e) => {
  const input = (e.target as Element).closest<HTMLInputElement>('[data-qte]');
  if (input && input.value === '0') input.select();
});

$('[data-mot]').addEventListener('input', () => { brouillon.ecrire(); panneau(); });

$('[data-vider]').addEventListener('click', () => {
  items = {};
  $('[data-grille]').innerHTML = rendreGrille(vue.grid, items, { verrou: vue.locked });
  brouillon.ecrire();
  panneau();
  message('Commande vidée.');
});

$('[data-semaine-derniere]').addEventListener('click', () => {
  const last = vue.last!;
  items = garder(last.items);
  const perdus = Object.keys(last.items).length - Object.keys(items).length;
  $('[data-grille]').innerHTML = rendreGrille(vue.grid, items, { verrou: vue.locked });
  brouillon.ecrire();
  panneau();
  message(`Quantités reprises de votre commande du ${last.livraisonLabel}${perdus > 0 ? ` (${perdus} produit${perdus > 1 ? 's ne sont' : ' n’est'} plus proposé${perdus > 1 ? 's' : ''} cette semaine)` : ''}. Vérifiez, puis envoyez.`);
});

$('[data-imprimer]').addEventListener('click', () => window.print());

$('[data-deconnexion]').addEventListener('click', async () => {
  await fetch('/api/agj/pro/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => null);
  brouillon.effacer();
  location.href = '/professionnels/';
});

$('[data-envoyer]').addEventListener('click', async () => {
  const bouton = $<HTMLButtonElement>('[data-envoyer]');
  const erreur = $('[data-erreur]');
  envoiEnCours = true;
  bouton.disabled = true;
  erreur.textContent = '';
  reference ||= nouvelleRef();
  let r: Response | null = null;
  let data: { ok?: boolean; error?: string; order?: Order; updated?: boolean } = {};
  try {
    r = await fetch('/api/agj/pro/commande', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ ref: reference, items, mot: ($('[data-mot]') as HTMLTextAreaElement).value }),
    });
    data = await r.json().catch(() => ({}));
  } catch { /* hors ligne */ }
  envoiEnCours = false;
  if (r?.status === 401) { location.reload(); return; } // session finie : le formulaire de connexion revient, le brouillon reste
  if (!r || !r.ok || !data.ok || !data.order) {
    erreur.textContent = espacesInsecables(data.error || 'La commande n’est pas partie. Réessayez, ou appelez Pierre au 06 42 42 42 93.');
    panneau();
    return;
  }
  reference = '';
  vue.current = data.order;
  items = { ...data.order.items };
  brouillon.effacer();
  panneau();
  const etat = $('[data-etat]');
  etat.textContent = espacesInsecables(`${data.updated ? 'Commande mise à jour' : 'Commande envoyée'} (${data.order.numero}). Pierre la reçoit par mail, vous aussi. Vous pouvez la modifier jusqu’au ${vue.delivery?.cutoffLabel}.`);
  etat.classList.add('ok');
  message(`${data.updated ? 'Commande mise à jour' : 'Commande envoyée'} : ${data.order.numero}, livraison ${vue.delivery?.label}.`);
});

// Téléphone : la commande s'ouvre dans une fenêtre du bas (le même panneau, déplacé).
const feuille = $<HTMLDialogElement>('[data-feuille]');
const place = $('[data-panneau]').parentElement!;
$('[data-ouvrir]').addEventListener('click', () => {
  feuille.append($('[data-panneau]'));
  feuille.showModal();
});
$('[data-fermer]').addEventListener('click', () => feuille.close());
feuille.addEventListener('close', () => place.append($('[data-panneau]')));
feuille.addEventListener('click', (e) => { if (e.target === feuille) feuille.close(); });

charger();
