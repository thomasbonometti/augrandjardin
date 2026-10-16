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

// Partenaires et points de vente (page La ferme, frame 15:2)
export const partenaires = [
  { nom: 'Ferme de la Briquerie', activite: 'Œufs', ville: 'Azoudange', photo: 'oeufs' },
  { nom: 'Frui’Thierry', activite: 'Champignons, fraises, framboises, pommes et poires', ville: 'Niederstinzel', photo: 'champignons' },
  { nom: 'Joël Corre', activite: 'Miel', ville: 'Francaltroff', photo: 'ruches' },
];
export const restaurants = [
  { nom: 'Hôtel Notre-Dame de Bonne Fontaine', court: 'Hôtel Notre-Dame de Bonne Fontaine', ville: 'Danne-et-Quatre-Vents' },
  { nom: 'La Licorne Bleue', court: 'La Licorne Bleue', ville: 'Fénétrange' },
  { nom: 'La Toque Blanche', court: 'La Toque Blanche', ville: 'Bénestroff' },
  { nom: 'Ô Fredelices, pâtissier traiteur', court: 'Ô Fredelices', ville: 'Liocourt' },
];
export const pointsDeVente = [
  { nom: 'Inventerre du Pré Vert', ville: 'Dieuze' },
  { nom: 'La Ruche qui dit Oui', ville: 'Dieuze' },
  { nom: 'Marché de Bénestroff', ville: 'Bénestroff' },
  { nom: 'Marché des producteurs', ville: 'Château-Salins' },
  { nom: 'Supermarché Match', ville: 'Dieuze' },
  { nom: 'Supérette Proxi', ville: 'Fénétrange' },
];

export const navigation = [
  { id: 'ferme', label: 'La ferme', href: '/la-ferme/' },
  { id: 'pdt', label: 'Pommes de terre', href: '/pommes-de-terre/' },
  { id: 'pros', label: 'Professionnels', href: '/professionnels/' },
  { id: 'contact', label: 'Horaires & contact', href: '/horaires-contact/' },
];
export const lienProduits = { id: 'produits', label: 'Produits de la semaine', href: '/produits/' };
