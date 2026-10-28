// Anciennes adresses du site augrandjardin.fr (site d'avant 2026, pages en .html, hébergé chez IONOS)
// → pages du nouveau site. Écrites dans dist/_redirects à la construction (astro.config.mjs),
// en 301 (définitif) pour que Google reporte le référencement sur les nouvelles pages.
// /index.html n'y est pas : Cloudflare Pages le renvoie déjà vers /.
// La même correspondance est dans bascule/ionos/.htaccess (pour augrandjardin.fr sans www).
export const anciennesAdresses = [
  ['/produits.html', '/produits/'],
  ['/la-ferme.html', '/la-ferme/'],
  ['/partenaires.html', '/la-ferme/'],
  ['/actualites.html', '/'],
  ['/contact-horaires.html', '/horaires-contact/'],
  ['/mentions-legales.html', '/mentions-legales/'],
  ['/checkout.html', '/produits/'],
];

// Contenu du fichier _redirects : anciennes adresses, puis l'espace pro s'il est en veille, puis la page
// Pommes de terre hors de la période de commande (elle n'est alors pas construite : voir astro.config.mjs).
export function fichierRedirections({ espaceProOuvert, commandesPdtOuvertes = true }) {
  const lignes = [
    '# Écrit à la construction (astro.config.mjs, src/data/redirections.js) : ne pas modifier dans dist/',
    '# Anciennes adresses du site (pages .html, avant 2026)',
    ...anciennesAdresses.map(([de, vers]) => `${de} ${vers} 301`),
  ];
  if (!espaceProOuvert) lignes.push('# Espace pro en veille (Réglages du site)', '/pro/* /professionnels/ 302');
  if (!commandesPdtOuvertes) lignes.push('# Commandes de pommes de terre fermées (Réglages du site) : pas de page Pommes de terre', '/pommes-de-terre / 302', '/pommes-de-terre/* / 302');
  return `${lignes.join('\n')}\n`;
}
