// Réservation de pommes de terre : écrit directement dans la base Notion « Commandes clients »
// (plus de Fillout ni de scénario Make au milieu), vérifie le stock, envoie la confirmation.
import reglages from '../../data/reglages.json';

const NOTION_VERSION = '2025-09-03';
const MAX_SACS = 5; // la base Notion a 5 champs « Sac 1 » à « Sac 5 »
const eur = (n) => n.toFixed(2).replace('.', '€');

const erreur = (msg, status = 400) => Response.json({ erreur: msg }, { status });

async function notion(env, chemin, body, method = 'POST') {
  const res = await fetch(`https://api.notion.com/v1/${chemin}`, {
    method,
    headers: { Authorization: `Bearer ${env.NOTION_TOKEN}`, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

// Kg déjà réservés par variété, d'après les champs « Sac 1…5 » des commandes non récupérées
async function kgReserves(env) {
  const parVariete = {};
  let cursor;
  do {
    const r = await notion(env, `data_sources/${env.NOTION_COMMANDES_DS}/query`, {
      filter: { property: 'Statut', select: { does_not_equal: 'Récupérée' } },
      page_size: 100, ...(cursor ? { start_cursor: cursor } : {}),
    });
    for (const page of r.results) {
      for (let i = 1; i <= MAX_SACS; i++) {
        const t = (page.properties[`Sac ${i}`]?.rich_text ?? []).map((x) => x.plain_text).join('');
        const m = t.match(/sac (\d+)kg .* de ([^,]+),/i);
        if (m) parVariete[m[2].trim()] = (parVariete[m[2].trim()] ?? 0) + Number(m[1]);
      }
    }
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return parVariete;
}

const rt = (s) => ({ rich_text: [{ text: { content: String(s ?? '').slice(0, 1900) } }] });

export async function onRequestPost({ request, env }) {
  const cfg = reglages.pommesDeTerre;
  if (!cfg.ouvert) return erreur('Les réservations sont fermées.', 409);

  let d;
  try { d = await request.json(); } catch { return erreur('Requête illisible.'); }
  const champ = (k, max = 120) => String(d?.[k] ?? '').trim().slice(0, max);
  const prenom = champ('prenom'), nom = champ('nom'), email = champ('email', 200), telephone = champ('telephone', 30);
  if (!prenom || !nom || !/^\S+@\S+\.\S+$/.test(email) || telephone.replace(/\D/g, '').length < 9) {
    return erreur('Merci de renseigner prénom, nom, e-mail et téléphone valides.');
  }

  // On recalcule tout côté serveur à partir des réglages : on ne fait jamais confiance aux prix envoyés.
  const sacs = [];
  const oignons = [];
  for (const l of Array.isArray(d.lignes) ? d.lignes : []) {
    const q = Math.min(Math.max(parseInt(l.quantite, 10) || 0, 0), 50);
    if (l.type === 'pdt') {
      const v = cfg.varietes.find((x) => x.nom === l.variete);
      const s = cfg.sacs.find((x) => x.id === String(l.sac));
      if (!v || !s) return erreur('Variété ou sac inconnu.');
      if (q && v.stockKg <= 0) return erreur(`${v.nom} est épuisée.`, 409);
      for (let i = 0; i < q; i++) sacs.push({ v, s });
    } else if (l.type === 'oignon') {
      const o = cfg.oignons.find((x) => x.id === l.id);
      if (!o) return erreur('Produit inconnu.');
      if (q) oignons.push({ o, q });
    }
  }
  if (!sacs.length && !oignons.length) return erreur('Choisissez au moins un sac.');
  if (sacs.length > MAX_SACS) return erreur(`${MAX_SACS} sacs de pommes de terre maximum par réservation en ligne. Pour plus, appelez la ferme.`);

  const libelleSac = ({ v, s }) =>
    `Un sac ${s.poids}kg à ${eur(s.prix)} (soit ${(s.prix / s.poids).toFixed(2)}€/kg) de ${v.nom}, ''${v.chair}'' | spécialité: ${v.usages}`;

  const props = {
    'Nom du client': { title: [{ text: { content: nom } }] },
    'Prénom du client': rt(prenom),
    'Email du client': rt(email),
    'Numéro de téléphone': rt(telephone),
    'Être alerté par SMS': { checkbox: Boolean(d.sms) },
    'Commentaire client': rt(champ('commentaire', 1000)),
    'Sacs de pdt commandés': rt(sacs.length ? `${sacs.length} sac${sacs.length > 1 ? 's' : ''} de pommes de terre` : ''),
    Statut: { select: { name: 'En attente' } },
  };
  sacs.forEach((x, i) => (props[`Sac ${i + 1}`] = rt(libelleSac(x))));
  for (const { o, q } of oignons) if (o.id === 'oj5') props['Oignons jaunes 5kg'] = rt(`${q} sac${q > 1 ? 's' : ''} — (${(o.prix * q).toFixed(2)}€ TTC)`);

  const total = sacs.reduce((a, x) => a + x.s.prix, 0) + oignons.reduce((a, x) => a + x.o.prix * x.q, 0);

  // Sans jeton Notion (test local), on renvoie la fiche qui aurait été créée.
  if (!env.NOTION_TOKEN || !env.NOTION_COMMANDES_DS) {
    const fiche = Object.fromEntries(Object.entries(props).map(([k, v]) => [k, v.title?.[0]?.text.content ?? v.rich_text?.[0]?.text.content ?? v.checkbox ?? v.select?.name]));
    return Response.json({ ok: true, demo: true, total, fiche });
  }

  // Stock : on refuse si une variété n'a plus assez de kg disponibles
  const deja = await kgReserves(env);
  const demande = {};
  for (const { v, s } of sacs) demande[v.nom] = (demande[v.nom] ?? 0) + s.poids;
  for (const [variete, kg] of Object.entries(demande)) {
    const v = cfg.varietes.find((x) => x.nom === variete);
    const reste = v.stockKg - (deja[variete] ?? 0);
    if (kg > reste) return erreur(reste > 0 ? `Il ne reste que ${reste} kg de ${variete}.` : `${variete} est épuisée.`, 409);
  }

  const page = await notion(env, 'pages', { parent: { type: 'data_source_id', data_source_id: env.NOTION_COMMANDES_DS }, properties: props });

  if (env.BREVO_API_KEY) {
    const lignes = [...sacs.map(libelleSac), ...oignons.map(({ o, q }) => `${q} × ${o.libelle}`)].map((l) => `<li>${l}</li>`).join('');
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Au Grand Jardin', email: reglages.contact.email },
        to: [{ email, name: `${prenom} ${nom}` }],
        subject: 'Votre réservation de pommes de terre',
        htmlContent: `<p>Bonjour ${prenom},</p><p>Nous avons bien reçu votre réservation :</p><ul>${lignes}</ul><p>Total : ${total.toFixed(2).replace('.', ',')} € (paiement sur place).</p><p>Nous vous prévenons dès que votre commande est prête.</p><p>Au Grand Jardin, ${reglages.adresse.rue}, ${reglages.adresse.ville}</p>`,
      }),
    }).catch(() => {}); // la commande est enregistrée même si le mail échoue
  }

  return Response.json({ ok: true, id: page.id, total });
}
