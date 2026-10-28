// Bande vidéo de la page d'accueil (Thomas, 28/10/2026) : boucle de 11 s, sans son.
// - Rien ne se charge avant que la bande approche de l'écran ; hors de l'écran, la vidéo est en pause.
// - Pas de vidéo pour qui refuse les animations (prefers-reduced-motion) ou économise ses données :
//   l'image fixe reste (c'est la première image de la vidéo).
// - Fichier choisi selon l'écran (attribut media des <source>, ordinateur ou téléphone) et ce que
//   le navigateur sait lire ; si la lecture automatique est refusée (iPhone en économie d'énergie),
//   l'image fixe reste et le bouton n'apparaît pas.
// - Bouton pause (WCAG 2.2.2, une animation de plus de 5 s doit pouvoir s'arrêter) : il apparaît dès que
//   la vidéo joue ; une pause demandée par le visiteur tient jusqu'à ce qu'il relance.

const LIBELLES = { lecture: 'Mettre la vidéo en pause', pause: 'Lire la vidéo' } as const;

export function videoAccueil() {
  const bande = document.querySelector<HTMLElement>('[data-video-accueil]');
  const video = bande?.querySelector('video');
  const bouton = bande?.querySelector<HTMLButtonElement>('[data-video-pause]');
  if (!bande || !video || !bouton) return;

  const economie = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || economie) return;

  const source = [...video.querySelectorAll('source')].find(
    (s) => (!s.media || matchMedia(s.media).matches) && !!s.dataset.src && video.canPlayType(s.type) !== '',
  );
  if (!source) return;

  let chargee = false;
  let pauseVoulue = false;
  const lire = () => { video.play().catch(() => {}); };
  const majBouton = () => {
    const etat = pauseVoulue ? 'pause' : 'lecture';
    bouton.dataset.etat = etat;
    bouton.setAttribute('aria-label', LIBELLES[etat]);
  };

  video.addEventListener('playing', () => {
    bande.classList.add('video-lue');
    bouton.hidden = false;
  });

  // Après le chargement de la page : la vidéo ne passe pas devant les photos et les polices.
  const observer = () => new IntersectionObserver(([entree]) => {
    if (!entree.isIntersecting) { if (chargee) video.pause(); return; }
    if (!chargee) { video.src = source.dataset.src!; chargee = true; }
    if (!pauseVoulue) lire();
  }, { rootMargin: '300px 0px' }).observe(bande);
  if (document.readyState === 'complete') observer();
  else window.addEventListener('load', observer, { once: true });

  bouton.addEventListener('click', () => {
    pauseVoulue = !pauseVoulue;
    if (pauseVoulue) video.pause(); else lire();
    majBouton();
  });
  majBouton();
}
