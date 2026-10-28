// Informations fixes de la ferme (ce qui ne vit pas dans Notion).
// Les produits et les horaires viennent de Notion (data/*.json, réécrits à chaque construction).

export const ferme = {
  nom: 'Au Grand Jardin',
  maraicher: 'Pierre Fouquet',
  rue: '43 rue Principale',
  codePostal: '57670',
  ville: 'Lostroff',
  departement: 'Moselle',
  telephone: '06 42 42 42 93',
  telephoneLien: 'tel:+33642424293',
  telephoneIntl: '+33642424293',
  email: 'pierre@augrandjardin.fr',
  itineraire: 'https://www.google.com/maps/search/?api=1&query=Au+Grand+Jardin%2C+43+rue+Principale%2C+57670+Lostroff',
  // Carte Google Maps intégrée (page Horaires & contact), chargée seulement après un clic du visiteur.
  carteGoogle: 'https://www.google.com/maps?q=Au+Grand+Jardin%2C+43+rue+Principale%2C+57670+Lostroff&hl=fr&z=15&output=embed',
  // Page Facebook de la ferme (identifiant de la page)
  facebook: 'https://www.facebook.com/237722416967635',
};

export const adresseCourte = `${ferme.rue}, ${ferme.ville}`;
export const adresseComplete = `${ferme.rue}, ${ferme.codePostal} ${ferme.ville}`;

// Mentions légales (registre national des entreprises, 16/10/2026)
export const legal = {
  editeur: 'Pierre Fouquet, entrepreneur individuel (Au Grand Jardin)',
  siren: '882 325 004',
  siret: '882 325 004 00019',
  tva: 'FR30882325004',
  naf: 'Culture de légumes, de melons, de racines et tubercules',
  creation: '9 juillet 2020',
  directeur: 'Pierre Fouquet',
  hebergeur: 'Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis — cloudflare.com',
  conception: 'Thomas Bonometti — thomasbonometti.fr',
};

// Partenaires, restaurants et points de vente (page La ferme, page Professionnels).
// Pierre ne veut rien effacer (revue du 26/10/2026) : un lieu qui ne travaille plus avec la ferme
// passe à `actif: false` et disparaît du site ; on le remet à `true` s'il revient.
// Ville inconnue : `ville: null` (rien n'est affiché), jamais une ville devinée.
const actifs = (liste) => liste.filter((l) => l.actif);

// Pierre n'achète plus rien à revendre depuis 2026 : plus de partenaire affiché.
export const tousLesPartenaires = [
  { nom: 'Ferme de la Briquerie', activite: 'Œufs', ville: 'Azoudange', photo: 'oeufs', actif: false },
  { nom: 'Frui’Thierry', activite: 'Champignons, fraises, framboises, pommes et poires', ville: 'Niederstinzel', photo: 'champignons', actif: false },
  { nom: 'Joël Corre', activite: 'Miel', ville: 'Francaltroff', photo: 'ruches', actif: false },
];
export const tousLesRestaurants = [
  { nom: 'Hôtel Notre-Dame de Bonne Fontaine', court: 'Hôtel Notre-Dame de Bonne Fontaine', ville: 'Danne-et-Quatre-Vents', actif: true },
  // Le 28/10/2026, Thomas : ce n'est pas « Le Greffin » mais ce restaurant (lien Google Maps :
  // « Restaurant | LOUDREFING | A La Croix De Lorraine »).
  { nom: 'À la Croix de Lorraine', court: 'À la Croix de Lorraine', ville: 'Loudrefing', actif: true },
  // Ajouté le 26/10/2026 : orthographe et ville à confirmer par Pierre.
  { nom: 'Le Bistrot des Oiseaux', court: 'Le Bistrot des Oiseaux', ville: null, actif: true },
  { nom: 'La Licorne Bleue', court: 'La Licorne Bleue', ville: 'Fénétrange', actif: false },
  { nom: 'La Toque Blanche', court: 'La Toque Blanche', ville: 'Bénestroff', actif: false },
  { nom: 'Ô Fredelices, pâtissier traiteur', court: 'Ô Fredelices', ville: 'Liocourt', actif: false },
];
export const tousLesPointsDeVente = [
  { nom: 'Inventerre du Pré Vert', ville: 'Dieuze', actif: true },
  // Ajouté le 26/10/2026 : orthographe et ville à confirmer par Pierre.
  { nom: 'Ma Petite Cuillère', ville: null, actif: true },
  { nom: 'La Ruche qui dit Oui', ville: 'Dieuze', actif: false },
  { nom: 'Marché de Bénestroff', ville: 'Bénestroff', actif: false },
  { nom: 'Marché des producteurs', ville: 'Château-Salins', actif: false },
  { nom: 'Supermarché Match', ville: 'Dieuze', actif: false },
  { nom: 'Supérette Proxi', ville: 'Fénétrange', actif: false },
];
export const partenaires = actifs(tousLesPartenaires);
export const restaurants = actifs(tousLesRestaurants);
export const pointsDeVente = actifs(tousLesPointsDeVente);

export const navigation = [
  { id: 'ferme', label: 'La ferme', href: '/la-ferme/' },
  { id: 'pdt', label: 'Pommes de terre', href: '/pommes-de-terre/' },
  { id: 'pros', label: 'Professionnels', href: '/professionnels/' },
  { id: 'contact', label: 'Horaires & contact', href: '/horaires-contact/' },
];
export const lienProduits = { id: 'produits', label: 'Produits de la semaine', href: '/produits/' };
