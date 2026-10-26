// Espace pro (lot 2) : calculs et rendu HTML de la grille, du panier et des prévisions,
// dans le navigateur. Les prix viennent de l'outil de commande (/api/agj/pro/grille), déjà
// remisés pour ce pro ; le panier n'est qu'un aperçu : l'outil recalcule tout à l'envoi.
// Chaînes échappées, avec les espaces insécables de la typographie française.
import { euros, echapper } from './commande-rendu.js';

export { euros, echapper };
export const TVA = 0.055;

const nombre = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);
export const quantite = (q, kind) => (kind === 'kg' ? `${nombre(q)} kg` : nombre(q));
export const pct = (p) => `${nombre(p)} %`;
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// « 2 novembre » d'un jour « 2026-11-02 »
export const jourMois = (iso) => { const d = new Date(`${iso}T12:00:00Z`); return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]}`; };
const majuscule = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');

// ---------- quantités ----------

// Le pas d'un produit : 0,5 kg au kilo, 1 à l'unité (réglage `pros.step` de l'outil).
export const pasDe = (row, pas = { kg: 0.5, unit: 1 }) => (row.kind === 'kg' ? pas.kg : pas.unit);
// Les boutons + et − avancent d'un kilo ou d'une unité ; le champ accepte les demi-kilos.

// « 12,5 » → 12.5 ; vide → 0 ; arrondi au pas le plus proche, entre 0 et le maximum.
export function lireQuantite(texte, row, { pas, max = 200 } = {}) {
  const brut = String(texte ?? '').trim().replace(/\s*kg$/i, '').replace(',', '.');
  if (brut === '') return 0;
  const n = Number(brut);
  if (!Number.isFinite(n) || n < 0) return null;
  const p = pasDe(row, pas);
  return Math.min(max, Math.round(n / p) * p);
}

// ---------- prix ----------

// Le meilleur palier atteint pour cette quantité (comme `unitPrice` de l'outil).
export function prixUnitaire(row, qte) {
  let palier = null;
  for (const t of row.paliers || []) if (qte >= t.seuil) palier = t;
  return { unitHtCents: palier ? palier.htCents : row.htCents, palier };
}

export function panier(grille, items) {
  const lignes = [];
  for (const row of grille) {
    const qte = Number(items[row.id]) || 0;
    if (qte <= 0) continue;
    const { unitHtCents, palier } = prixUnitaire(row, qte);
    lignes.push({ id: row.id, nom: row.nom, kind: row.kind, unite: row.unite, qty: qte, unitHtCents, palier, totalHtCents: Math.round(unitHtCents * qte) });
  }
  const totalHtCents = lignes.reduce((s, l) => s + l.totalHtCents, 0);
  const tvaCents = Math.round(totalHtCents * TVA);
  return { lignes, totalHtCents, tvaCents, totalTtcCents: totalHtCents + tvaCents };
}

// « le bouquet » → « bouquets » (10), « la bouteille » → « bouteille » (1) ; sinon le texte tel quel.
function uniteAuPluriel(unite, qte) {
  const u = String(unite || '').replace(/^(le|la|les|l')\s*/i, '').trim();
  if (!/^[a-zà-ÿ]+$/i.test(u)) return u ? `× ${u}` : '';
  return qte > 1 && !/[sx]$/i.test(u) ? `${u}s` : u;
}

// « 12 kg × 2,65 € (palier 10 kg) », « 10 bouquets × 1,31 € (palier 10) »
export function detailLigne(l) {
  const qte = l.kind === 'kg' ? quantite(l.qty, 'kg') : `${nombre(l.qty)} ${uniteAuPluriel(l.unite, l.qty)}`.trim();
  return `${qte} × ${euros(l.unitHtCents)}${l.palier ? ` (palier ${quantite(l.palier.seuil, l.kind)})` : ''}`;
}

// « −3 % dès 5 kg, −5 % dès 10 kg »
export const texteListePaliers = (paliers = [], kind) => paliers.map((t) => `−${pct(t.pct)} dès ${quantite(t.seuil, kind)}`).join(', ');

export function rayons(grille) {
  const out = [];
  for (const row of grille) {
    let r = out.at(-1);
    if (!r || r.titre !== row.rayon) out.push((r = { titre: row.rayon, rows: [] }));
    r.rows.push(row);
  }
  return out;
}

// ---------- rendu ----------

const icone = (d) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
const MOINS = icone('<path d="M5 12h14"/>');
const PLUS = icone('<path d="M5 12h14"/><path d="M12 5v14"/>');
const COCHE = '<span aria-hidden="true"> ✓</span>';

function etiquettes(row) {
  return [
    row.nouveau ? '<span class="chip chip-vif chip-petit">Nouveau</span>' : '',
    row.limite ? '<span class="chip chip-peche chip-petit">Quantité limitée</span>' : '',
    row.derniere ? '<span class="chip chip-peche chip-petit">Dernière semaine</span>' : '',
  ].join('');
}

function paliers(row, qte, { enLigne = false } = {}) {
  const atteint = prixUnitaire(row, qte).palier;
  const items = (row.paliers || []).map((t) => {
    const ok = atteint && t.seuil === atteint.seuil;
    return `<span class="palier${ok ? ' palier--atteint' : ''}">${echapper(`${euros(t.htCents)} dès ${quantite(t.seuil, row.kind)}`)}${ok ? `${COCHE}<span class="visually-hidden"> (atteint)</span>` : ''}</span>`;
  });
  return items.join(enLigne ? '<span aria-hidden="true"> · </span>' : '');
}

function selecteur(row, qte, { verrou = false } = {}) {
  const unite = row.kind === 'kg' ? 'kg' : '';
  const nom = echapper(row.nom);
  const saut = row.kind === 'kg' ? '1 kg' : '1';
  return `<div class="qte${qte > 0 ? ' qte--choisie' : ''}" role="group" aria-label="Quantité, ${nom}">
    <button type="button" data-moins aria-label="Enlever ${echapper(saut)} de ${nom}"${qte <= 0 || verrou ? ' disabled' : ''}>${MOINS}</button>
    <label class="qte__champ"><span class="visually-hidden">Quantité de ${nom}${unite ? ', en kilos' : ''}</span><input type="text" inputmode="decimal" autocomplete="off" value="${echapper(nombre(qte))}" data-qte${verrou ? ' disabled' : ''}>${unite ? `<span aria-hidden="true">${unite}</span>` : ''}</label>
    <button type="button" data-plus aria-label="Ajouter ${echapper(saut)} de ${nom}"${verrou ? ' disabled' : ''}>${PLUS}</button>
  </div>`;
}

// Une ligne de la grille : un tableau sur ordinateur, une carte sur téléphone (même HTML).
export function rendreLigne(row, qte, opts = {}) {
  return `<tr class="ligne-pro${qte > 0 ? ' ligne-pro--choisie' : ''}" data-id="${echapper(row.id)}">
    <th scope="row" class="lp__produit">
      <span class="lp__nom">${echapper(row.nom)}</span>
      <span class="sm muted lp__unite">${echapper(row.unite || '')}</span>
      ${etiquettes(row) ? `<span class="lp__etiquettes">${etiquettes(row)}</span>` : ''}
    </th>
    <td class="num lp__public muted">${echapper(euros(row.ttcCents))}</td>
    <td class="num lp__ht">${echapper(euros(row.htCents))}<span class="lp__suffixe"> HT</span></td>
    <td class="num lp__ttc muted">${echapper(euros(row.ttcProCents))}</td>
    <td class="lp__paliers sm">${paliers(row, qte)}</td>
    <td class="lp__mobile sm muted">${echapper(`${euros(row.ttcProCents)} TTC · public ${euros(row.ttcCents)}`)}${row.paliers?.length ? `<br>${paliers(row, qte, { enLigne: true })}` : ''}</td>
    <td class="lp__qte">${selecteur(row, qte, opts)}</td>
  </tr>`;
}

export function rendreGrille(grille, items, opts = {}) {
  if (!grille.length) return '<p class="muted">Aucun produit n’est proposé cette semaine. Pierre vous prévient dès que la récolte reprend.</p>';
  return `<table class="grille-pro">
    <caption class="visually-hidden">Vos prix de la semaine, par rayon</caption>
    <thead><tr><th scope="col">Produit</th><th scope="col" class="num">Public TTC</th><th scope="col" class="num">Votre prix HT</th><th scope="col" class="num">Votre prix TTC</th><th scope="col">Paliers HT</th><td class="lp__mobile"></td><th scope="col" class="num">Quantité</th></tr></thead>
    ${rayons(grille).map((r) => `<tbody>
      <tr class="rayon-pro"><th scope="rowgroup" colspan="7">${echapper(r.titre)}</th></tr>
      ${r.rows.map((row) => rendreLigne(row, Number(items[row.id]) || 0, opts)).join('')}
    </tbody>`).join('')}
  </table>`;
}

// Les lignes du panier et les totaux (panneau « Votre commande »).
export function rendreLignesPanier(p) {
  if (!p.lignes.length) return '<p class="muted panneau__vide">Choisissez vos quantités dans la grille.</p>';
  return `<ul class="panneau__lignes" role="list">${p.lignes.map((l) => `<li>
      <p class="panneau__ligne"><span>${echapper(l.nom)}</span><span class="nowrap">${echapper(euros(l.totalHtCents))}</span></p>
      <p class="xs muted">${echapper(detailLigne(l))}</p>
    </li>`).join('')}</ul>
    <div class="panneau__totaux">
      <p class="panneau__ligne"><span>Total HT</span><span class="nowrap" data-total-ht>${echapper(euros(p.totalHtCents))}</span></p>
      <p class="panneau__ligne sm muted"><span>TVA 5,5&nbsp;%</span><span class="nowrap">${echapper(euros(p.tvaCents))}</span></p>
      <p class="panneau__ligne panneau__ttc"><span>Total TTC</span><span class="nowrap">${echapper(euros(p.totalTtcCents))}</span></p>
    </div>`;
}

// Résumé d'une ligne de prévisions pour le téléphone : le premier changement, sinon « Disponible ».
export function resumePrevision(row, semaines) {
  const change = row.cells.find((c) => c.kind === 'arrive' || c.kind === 'derniere');
  if (change) return { kind: change.kind, texte: change.text };
  const dernier = row.cells.map((c) => c.kind).lastIndexOf('dispo');
  if (dernier >= 0 && dernier < row.cells.length - 1) return { kind: 'derniere', texte: `Jusqu’à la semaine du ${jourMois(semaines[dernier].iso)}` };
  return { kind: 'dispo', texte: `Disponible les ${row.cells.length} semaines` };
}

const chipPrevision = (kind, texte) => (kind === 'dispo'
  ? `<span class="prev prev--dispo"><span class="point" aria-hidden="true"></span>${echapper(texte)}</span>`
  : kind ? `<span class="chip chip-peche chip-petit">${echapper(texte)}</span>`
    : '<span class="discret" aria-label="pas prévu">—</span>');

export function rendrePrevisions(prev) {
  if (!prev?.rows?.length) return '';
  const semaines = prev.weeks;
  return `<table class="prev-table">
      <caption class="visually-hidden">Prévisions des 4 prochaines semaines</caption>
      <thead><tr><th scope="col">Produit</th>${semaines.map((w, i) => `<th scope="col">${echapper(i === 0 ? `Semaine du ${jourMois(w.iso)}` : `Du ${jourMois(w.iso)}`)}</th>`).join('')}<th scope="col" class="prev-resume">Prévision</th></tr></thead>
      <tbody>${prev.rows.map((r) => {
        const resume = resumePrevision(r, semaines);
        return `<tr><th scope="row">${echapper(r.nom)}</th>${r.cells.map((c) => `<td>${chipPrevision(c.kind, c.text)}</td>`).join('')}<td class="prev-resume">${chipPrevision(resume.kind, resume.texte)}</td></tr>`;
      }).join('')}</tbody>
    </table>`;
}

// « Lundi 2 novembre »
export const jourLivraison = (label) => majuscule(label || '');
