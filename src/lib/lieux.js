// Lieux (base Notion « Lieux », page « Site augrandjardin.fr », copiée dans data/lieux.json à chaque
// publication) : restaurants, points de vente et partenaires des pages La ferme et Professionnels.
// Pierre ne veut rien effacer (revue du 26/10/2026) : un lieu décoché « Actif » reste dans Notion et
// disparaît du site. Ville vide : rien n'est affiché, jamais une ville devinée.
// Fonctions pures, testées par tests/lieux.test.js.

export const TYPES = { restaurant: 'Restaurant', pointDeVente: 'Point de vente', partenaire: 'Partenaire' };

// Photos de l'ancien site pour les anciens partenaires (src/assets/photos), tant qu'aucune photo
// n'est mise dans la colonne « Photo » de Notion.
export const PHOTOS_ANCIENS_PARTENAIRES = { 'Ferme de la Briquerie': 'oeufs', 'Frui’Thierry': 'champignons', 'Joël Corre': 'ruches' };

// Ordre : « Ordre » (petit = en haut), puis le nom ; un lieu sans ordre va à la fin.
const parOrdre = (a, b) => (a.ordre ?? Infinity) - (b.ordre ?? Infinity) || a.nom.localeCompare(b.nom, 'fr');

const nettoyer = (l) => ({
  ...l,
  nom: l.nom.trim(),
  court: (l.court || '').trim() || l.nom.trim(),
  ville: (l.ville || '').trim() || null,
  activite: (l.activite || '').trim() || null,
  actif: l.actif === true,
});

// { tous: { restaurants, pointsDeVente, partenaires }, restaurants, pointsDeVente, partenaires } :
// « tous » garde les lieux décochés ; les trois autres listes, seulement ceux qui s'affichent.
export function listesLieux(lieux = []) {
  const valides = lieux.filter((l) => l?.nom?.trim() && Object.values(TYPES).includes(l.type)).map(nettoyer);
  const deType = (t) => valides.filter((l) => l.type === t).sort(parOrdre);
  const tous = { restaurants: deType(TYPES.restaurant), pointsDeVente: deType(TYPES.pointDeVente), partenaires: deType(TYPES.partenaire) };
  const actifs = (liste) => liste.filter((l) => l.actif);
  return { tous, restaurants: actifs(tous.restaurants), pointsDeVente: actifs(tous.pointsDeVente), partenaires: actifs(tous.partenaires) };
}
