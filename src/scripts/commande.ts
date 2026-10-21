// Page Pommes de terre : panier, coordonnées et envoi de la commande à l'outil de commande.
// Le HTML arrive déjà rempli (catalogue lu à la construction) ; ici on relit le catalogue en direct,
// on gère les quantités et on envoie la commande à /api/agj/order (relayé vers le Worker « formulaires »).
// Le serveur recalcule tout (prix, stock, avertissements) : il fait foi.
import * as panierSecours from '../lib/agj/cart.js';
import { rendreCategories, rendreLignesRecap, textePoids, maximum, euros, echapper } from '../lib/commande-rendu.js';
import { resumePdt } from '../lib/pdt.js';
import { espacesInsecables as typo } from '../lib/typo.js';

type Produit = { id: string; name: string; product?: string; format?: string; category?: string; priceCents: number; oldPriceCents?: number; weightKg?: number; stock?: number | null; minimum?: number | null; maximum?: number | null; ordre?: number; enVente: boolean; description?: string };
// pause : envoyée par l'outil quand le réglage Notion « Fermé » est coché (date de reprise et message).
type Catalogue = { open: boolean; live?: boolean; products: Produit[]; pause?: { until?: string | null; untilLabel?: string; message?: string } | null };

const CLE = 'agj-site-commande-v1';
const $ = <T extends Element = HTMLElement>(sel: string, racine: ParentNode = document) => racine.querySelector<T>(sel) as T;
const donnees = JSON.parse($('#donnees-commande').textContent || '{}');
let catalogue: Catalogue = donnees.catalogue;
let config = donnees.config;
// Site publié en mode fermé (Notion « Réglages du site ») : la commande reste fermée, même si l'outil répond « ouvert ».
const fermeSite = !!donnees.fermeSite;
let panier: any = panierSecours;

const form = $<HTMLFormElement>('#commande');
const liste = $('[data-liste]');
const bouton = $<HTMLButtonElement>('[data-envoyer]');
const erreurEnvoi = $('[data-erreur-envoi]');

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);
const lireStockage = () => { try { return JSON.parse(localStorage.getItem(CLE) || 'null'); } catch { return null; } };
const ecrireStockage = (v: unknown) => { try { localStorage.setItem(CLE, JSON.stringify(v)); } catch { /* navigation privée */ } };

const sauve = lireStockage() || {};
const etat = {
  items: (sauve.items || {}) as Record<string, number>,
  ref: (sauve.ref as string) || uid(),
  sid: (sauve.sid as string) || uid(),
  envoi: false,
};
const source = (() => {
  const src = new URLSearchParams(location.search).get('src');
  return src && (config.sources || ['facebook', 'site', 'qr']).includes(src) ? src : 'site';
})();

// Coordonnées gardées d'une visite à l'autre (sur cet appareil seulement)
const CHAMPS = ['prenom', 'nom', 'email', 'telephone', 'comment'] as const;
for (const nom of CHAMPS) if (sauve.client?.[nom] && form.elements.namedItem(nom)) (form.elements.namedItem(nom) as HTMLInputElement).value = sauve.client[nom];
if (sauve.client?.sms) (form.elements.namedItem('sms') as HTMLInputElement).checked = true;

function client() {
  const v = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement)?.value || '').trim();
  return { prenom: v('prenom'), nom: v('nom'), email: v('email'), telephone: v('telephone'), sms: (form.elements.namedItem('sms') as HTMLInputElement).checked, comment: v('comment') };
}
function enregistrer() {
  ecrireStockage({ items: etat.items, ref: etat.ref, sid: etat.sid, client: client() });
}

const connus = () => Object.fromEntries(Object.entries(etat.items).filter(([id]) => catalogue.products.some((p) => p.id === id)));
const calculer = () => panier.computeCart(catalogue.products, connus(), config.rules || {});

// ---------- liste et quantités ----------

function majFormat(id: string) {
  const bloc = liste.querySelector<HTMLElement>(`.format[data-id="${CSS.escape(id)}"]`);
  const p = catalogue.products.find((x) => x.id === id);
  if (!bloc || !p) return;
  const qte = etat.items[id] || 0;
  bloc.querySelector('output')!.textContent = String(qte);
  bloc.classList.toggle('format--choisi', qte > 0);
  (bloc.querySelector('[data-action="moins"]') as HTMLButtonElement).disabled = qte <= 0;
  (bloc.querySelector('[data-action="plus"]') as HTMLButtonElement).disabled = qte >= maximum(p, config.rules || {}) || (p.stock != null && p.stock <= 0);
}

function majListe() {
  const actif = document.activeElement as HTMLElement | null;
  const focus = actif?.closest('.format') ? { id: (actif.closest('.format') as HTMLElement).dataset.id, action: actif.dataset.action } : null;
  liste.innerHTML = rendreCategories(catalogue, config, etat.items);
  if (focus) liste.querySelector<HTMLElement>(`.format[data-id="${CSS.escape(focus.id || '')}"] [data-action="${focus.action}"]`)?.focus();
}

liste.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if (!btn || btn.disabled) return;
  const id = (btn.closest('.format') as HTMLElement).dataset.id!;
  const p = catalogue.products.find((x) => x.id === id);
  if (!p) return;
  const max = maximum(p, config.rules || {});
  const qte = Math.min(max, Math.max(0, (etat.items[id] || 0) + (btn.dataset.action === 'plus' ? 1 : -1)));
  if (qte) etat.items[id] = qte; else delete etat.items[id];
  majFormat(id);
  // Un bouton devenu inactif perd le focus : on le donne à l'autre bouton du même format.
  if (btn.disabled) (btn.closest('.stepper')!.querySelector<HTMLButtonElement>(`[data-action="${btn.dataset.action === 'plus' ? 'moins' : 'plus'}"]`))?.focus();
  majRecap();
  effacerErreurEnvoi();
  enregistrer();
});

// ---------- récapitulatif ----------

function avertissementsHtml(notices: string[], classe = '') {
  return notices.map((n) => `<p${classe ? ` class="${classe}"` : ''}>${echapper(n)}</p>`).join('');
}

function majRecap() {
  const c = calculer();
  $('[data-recap-lignes]').innerHTML = rendreLignesRecap(c.lines);
  $('[data-total]').textContent = euros(c.totalCents);
  $('[data-poids]').textContent = c.lines.length ? typo(textePoids(c.lines)) : '';
  $('[data-avertissements]').innerHTML = avertissementsHtml(c.notices || []);
}

// ---------- en-tête de page (catalogue en direct) ----------

function majEntete() {
  const r = resumePdt(catalogue);
  const statut = $('[data-statut]');
  const ouvert = r.ouvert && !fermeSite;
  if (statut) statut.textContent = ouvert ? 'Commandes ouvertes' : 'Commandes fermées pour le moment';
  // On ne réécrit l'en-tête que s'il a changé depuis la construction (sinon l'animation d'arrivée serait coupée).
  const memeTexte = (a: string, b: string) => a.replace(/\s+/g, ' ').trim() === b.replace(/\s+/g, ' ').trim();
  if (r.cartes.length) {
    const prix = $('[data-prix]');
    const html = r.cartes.map((c) => `<div class="prix__carte"><p class="prix__kg">${echapper(c.parKg)}</p><p class="sm muted">${echapper(c.detail)}</p></div>`).join('');
    const neuf = document.createElement('div');
    neuf.innerHTML = html;
    if (!memeTexte(neuf.textContent || '', prix.textContent || '')) prix.innerHTML = html;
  }
  if (r.formatsTitre) {
    const titre = $('[data-titre]');
    const texte = `Pommes de terre de garde, ${r.formatsTitre}`;
    if (!memeTexte(texte, titre.textContent || '')) titre.textContent = texte;
  }
  $('[data-bandeau-test]').hidden = !!catalogue.live;
  form.hidden = !ouvert || !$('[data-fin]').hidden;
  $('[data-fermee]').hidden = ouvert;
  // Fermé dans Notion depuis la dernière publication du site : l'outil donne la date de reprise et le message.
  const pause = catalogue.pause;
  if (!ouvert && pause && !fermeSite) {
    $('[data-fermee-titre]').textContent = typo(`Les commandes reprendront ${pause.untilLabel ? `le ${pause.untilLabel}` : 'bientôt'}`);
    if (pause.message) $('[data-fermee-texte]').textContent = typo(pause.message);
  }
}

// ---------- validation et envoi ----------

const MESSAGES: Record<string, string> = {
  prenom: 'Indiquez votre prénom.',
  nom: 'Indiquez votre nom.',
  email: 'Indiquez une adresse e-mail valide.',
  telephone: 'Indiquez un numéro de téléphone complet.',
};

function erreursClient(c: ReturnType<typeof client>) {
  const e: Record<string, string> = {};
  if (!c.prenom) e.prenom = MESSAGES.prenom;
  if (!c.nom) e.nom = MESSAGES.nom;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) e.email = MESSAGES.email;
  if (c.telephone.replace(/\D/g, '').length < 9) e.telephone = MESSAGES.telephone;
  return e;
}

function afficherErreursChamps(erreurs: Record<string, string>) {
  for (const nom of CHAMPS) {
    const el = form.elements.namedItem(nom) as HTMLInputElement | null;
    const msg = form.querySelector<HTMLElement>(`[data-erreur="${nom}"]`);
    if (!el) continue;
    if (erreurs[nom]) {
      el.setAttribute('aria-invalid', 'true');
      if (msg) { msg.textContent = typo(erreurs[nom]); msg.id = `${nom}-erreur`; el.setAttribute('aria-errormessage', msg.id); }
    } else {
      el.removeAttribute('aria-invalid');
      if (msg) msg.textContent = '';
    }
  }
}

function effacerErreurEnvoi() { erreurEnvoi.textContent = ''; }

for (const nom of CHAMPS) {
  form.elements.namedItem(nom)?.addEventListener('input', () => {
    const el = form.elements.namedItem(nom) as HTMLInputElement;
    if (el.getAttribute('aria-invalid')) { el.removeAttribute('aria-invalid'); const m = form.querySelector(`[data-erreur="${nom}"]`); if (m) m.textContent = ''; }
    enregistrer();
  });
}
form.elements.namedItem('sms')?.addEventListener('change', enregistrer);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (etat.envoi) return;
  effacerErreurEnvoi();
  const c = calculer();
  const cl = client();
  const erreurs = erreursClient(cl);
  afficherErreursChamps(erreurs);
  if (!c.lines.length) {
    erreurEnvoi.textContent = 'Choisissez au moins un produit.';
    liste.querySelector<HTMLElement>('[data-action="plus"]:not(:disabled)')?.focus();
    return;
  }
  const erreurPanier = c.errors.find((x: any) => x.id);
  if (erreurPanier) { erreurEnvoi.textContent = typo(erreurPanier.message); return; }
  if (Object.keys(erreurs).length) {
    const premier = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    premier?.focus();
    premier?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return;
  }

  etat.envoi = true;
  bouton.disabled = true;
  bouton.textContent = 'Envoi en cours…';
  const website = (form.elements.namedItem('website') as HTMLInputElement).value;
  try {
    const res = await fetch('/api/agj/order', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        ref: etat.ref, sid: etat.sid, items: connus(),
        customer: { prenom: cl.prenom, nom: cl.nom, email: cl.email, telephone: cl.telephone, sms: cl.sms },
        comment: cl.comment, meta: { source }, website,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return terminer(data, c);
    erreurEnvoi.textContent = typo(data.error || 'La commande n’a pas pu être envoyée. Réessayez dans un instant, ou appelez Pierre au 06 42 42 42 93.');
    if (data.fields && Object.keys(data.fields).length) {
      afficherErreursChamps(data.fields);
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
    if (data.cart?.length) await rechargerCatalogue(true);
  } catch {
    erreurEnvoi.textContent = typo('Pas de connexion : la commande n’est pas partie. Réessayez dans un instant.');
  } finally {
    etat.envoi = false;
    bouton.disabled = false;
    bouton.textContent = 'Commander';
  }
});

function terminer(data: any, c: any) {
  const fin = $('[data-fin]');
  const total = data.order?.totalCents ?? c.totalCents;
  $('[data-fin-numero]').textContent = typo(`Commande ${data.numero} · ${euros(total)}, à régler sur place`);
  const lignes = data.order?.lines?.length ? data.order.lines : c.lines;
  const notices = c.notices || [];
  $('[data-fin-recap]').innerHTML = rendreLignesRecap(lignes) + avertissementsHtml(notices, 'avertissement');
  const bon = $<HTMLAnchorElement>('[data-fin-bon]');
  if (data.bonUrl) bon.href = data.bonUrl; else bon.hidden = true;
  form.hidden = true;
  fin.hidden = false;
  fin.scrollIntoView({ behavior: 'smooth', block: 'start' });
  fin.focus({ preventScroll: true });
  // Nouvelle commande possible : panier vidé, nouvelle référence (un double clic ne crée qu'une commande).
  etat.items = {};
  etat.ref = uid();
  enregistrer();
  rechargerCatalogue(true);
}

$('[data-nouvelle]').addEventListener('click', () => {
  $('[data-fin]').hidden = true;
  form.hidden = false;
  majListe();
  majRecap();
  $('#bloc-produits').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- catalogue et règles en direct ----------

async function rechargerCatalogue(forcer = false) {
  try {
    const res = await fetch('/api/agj/catalog', { headers: { accept: 'application/json' }, cache: 'no-store' });
    if (!res.ok) return;
    const frais: Catalogue = await res.json();
    if (!Array.isArray(frais.products)) return;
    const avant = JSON.stringify(catalogue.products);
    catalogue = frais;
    // Produits retirés de la vente ou épuisés : ils quittent le panier.
    const retires: string[] = [];
    for (const id of Object.keys(etat.items)) {
      const p = catalogue.products.find((x) => x.id === id);
      if (!p || !p.enVente || (p.stock != null && p.stock <= 0)) { retires.push(id); delete etat.items[id]; }
      else if (etat.items[id] > maximum(p, config.rules || {})) etat.items[id] = maximum(p, config.rules || {});
    }
    if (retires.length) erreurEnvoi.textContent = 'Certains produits ne sont plus disponibles et ont été retirés de votre panier.';
    if (forcer || avant !== JSON.stringify(catalogue.products) || retires.length) majListe();
    majRecap();
    majEntete();
    enregistrer();
  } catch { /* on garde le catalogue de la construction */ }
}

async function demarrer() {
  // Les mêmes fonctions de panier que l'outil, servies en direct (secours : copie embarquée).
  const urlPanier = '/agj/lib/cart.js';
  const [mod, conf] = await Promise.allSettled([
    import(/* @vite-ignore */ urlPanier),
    fetch('/agj/config.json', { headers: { accept: 'application/json' } }).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
  ]);
  if (mod.status === 'fulfilled' && typeof mod.value.computeCart === 'function') panier = mod.value;
  if (conf.status === 'fulfilled' && conf.value?.rules) config = { ...config, ...conf.value };
  await rechargerCatalogue(Object.keys(etat.items).length > 0);
}

// Premier affichage avec le panier gardé, avant la réponse du serveur. Les produits absents
// du catalogue de la construction restent dans le panier jusqu'à la lecture en direct.
if (Object.keys(etat.items).length) majListe();
majRecap();
demarrer();
