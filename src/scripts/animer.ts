// Apparitions au défilement et petits mouvements, avec GSAP.
// Chargé seulement si le visiteur accepte les animations (voir Base.astro) ; sinon tout est visible d'emblée.
//
// Dans les pages :
//   data-anim="monte|pop|cartes|photo|mots|tampon|epingle"  l'élément apparaît quand il entre à l'écran
//   data-anim-groupe="monte|pop|cartes|photo"               ses enfants apparaissent l'un après l'autre
//   data-compteur                                           le nombre compte de 0 à sa valeur en apparaissant
//   data-parallaxe (photo dans un cadre) ou ="flotte" (l'élément lui-même) : léger décalage au défilement
//     (dans le cadre, data-parallaxe-cible désigne ce qui glisse, sinon c'est la photo)
//   class="trace" sur une icône (Icone.astro, traits « t ») : le trait se dessine quand son élément apparaît
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAIT = 'data-anim-fait';
const joues = new WeakSet<Element>();

// Titre découpé en mots, chaque mot monte depuis sa ligne.
function decouperMots(titre: HTMLElement) {
  const texteSeul = [...titre.children].every((c) => c.tagName === 'BR');
  if (texteSeul) titre.setAttribute('aria-label', (titre.textContent || '').replace(/\s+/g, ' ').trim());
  const marcheur = document.createTreeWalker(titre, NodeFilter.SHOW_TEXT);
  const noeuds: Text[] = [];
  while (marcheur.nextNode()) noeuds.push(marcheur.currentNode as Text);
  for (const n of noeuds) {
    const frag = document.createDocumentFragment();
    for (const morceau of n.data.split(/([ \n\t]+)/)) {
      if (!morceau) continue;
      if (/^[ \n\t]+$/.test(morceau)) { frag.append(document.createTextNode(morceau)); continue; }
      const mot = document.createElement('span');
      mot.className = 'mot';
      if (texteSeul) mot.setAttribute('aria-hidden', 'true');
      const dedans = document.createElement('span');
      dedans.className = 'mot__in';
      dedans.textContent = morceau;
      mot.append(dedans);
      frag.append(mot);
    }
    n.replaceWith(frag);
  }
}

// « 32 », « 100 % », « 50 km », « 48 h » : compte de 0 à la valeur. Un texte qui ne commence pas par un nombre (« Sam. 10h ») reste tel quel.
function compter(el: HTMLElement, delai: number) {
  const m = (el.textContent || '').trim().match(/^(\d+)(\D[\s\S]*)?$/);
  if (!m || !+m[1]) return;
  const [, nombre, apres = ''] = m;
  const o = { v: 0 };
  el.textContent = `0${apres}`;
  gsap.to(o, { v: +nombre, duration: 1.4, delay: delai + 0.1, ease: 'power2.out', onUpdate: () => { el.textContent = `${Math.round(o.v)}${apres}`; } });
}

// Icônes au trait (classe « trace », traits « t » avec pathLength="1") : le trait se dessine pendant que
// l'élément apparaît, dans l'ordre du dessin, puis les points (coccinelle) éclosent. Sans animation, rien
// n'est touché : l'icône est entière.
function tracer(el: HTMLElement, delai: number) {
  const traits = [...el.querySelectorAll<SVGElement>('.trace .t')];
  if (!traits.length) return;
  const nettoyer = () => traits.forEach((t) => { t.removeAttribute('stroke-dasharray'); t.removeAttribute('stroke-dashoffset'); });
  gsap.fromTo(traits, { attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 } },
    { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.inOut', stagger: 0.16, delay: delai + 0.25, onComplete: nettoyer });
  const points = el.querySelectorAll('.trace .point');
  if (points.length) {
    gsap.fromTo(points, { scale: 0, transformOrigin: '50% 50%' },
      { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.08, delay: delai + 0.25 + traits.length * 0.16 + 0.5, clearProps: 'transform' });
  }
}

function jouer(el: HTMLElement, rang: number) {
  if (joues.has(el)) return;
  joues.add(el);
  const parent = el.parentElement;
  const type = el.dataset.anim || (parent?.hasAttribute('data-anim-groupe') ? parent.dataset.animGroupe : '') || 'monte';
  const delai = rang * 0.08;
  const garderTransform = el.hasAttribute('data-parallaxe');
  const fin = () => {
    el.setAttribute(FAIT, '');
    gsap.set(el, { clearProps: garderTransform ? 'opacity' : 'opacity,transform' });
  };
  const compteurs = el.matches('[data-compteur]') ? [el] : [...el.querySelectorAll<HTMLElement>('[data-compteur]')];
  compteurs.forEach((c) => compter(c, delai));
  tracer(el, delai);

  switch (type) {
    case 'pop':
      gsap.fromTo(el, { opacity: 0, y: 24, scale: 0.88, rotation: gsap.utils.random(-4, 4) },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.8)', delay: delai, onComplete: fin });
      break;
    case 'cartes': {
      const pair = parent ? [...parent.children].indexOf(el) % 2 === 0 : true;
      gsap.fromTo(el, { opacity: 0, y: 80, rotation: pair ? -5 : 5 },
        { opacity: 1, y: 0, rotation: 0, duration: 1, ease: 'back.out(1.4)', delay: delai, onComplete: fin });
      break;
    }
    case 'photo': {
      const img = el.matches('img') ? null : el.querySelector('img');
      gsap.fromTo(el, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: delai, onComplete: fin });
      if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: 'power2.out', delay: delai, clearProps: 'transform' });
      break;
    }
    case 'mots': {
      const mots = el.querySelectorAll('.mot__in');
      gsap.set(mots, { yPercent: 110, rotation: 4 });
      el.setAttribute(FAIT, '');
      gsap.to(mots, { yPercent: 0, rotation: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05, delay: delai, clearProps: 'transform' });
      break;
    }
    case 'tampon':
      // Le tampon s'abat sur la page, puis vacille.
      gsap.timeline({ delay: delai + 0.2, onComplete: fin })
        .fromTo(el, { opacity: 0, scale: 2.4, rotation: -30 }, { opacity: 0.9, scale: 1, rotation: -6, duration: 0.45, ease: 'power3.in' })
        .to(el, { rotation: 0, duration: 0.9, ease: 'elastic.out(1.1, 0.35)' });
      break;
    case 'epingle':
      gsap.fromTo(el, { opacity: 0, y: -70 }, { opacity: 1, y: 0, duration: 1, ease: 'bounce.out', delay: delai + 0.3, onComplete: fin });
      break;
    default:
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: delai, onComplete: fin });
  }
}

export function animer() {
  const racine = document.documentElement;
  const cibles: HTMLElement[] = [...document.querySelectorAll<HTMLElement>('[data-anim]')];
  document.querySelectorAll<HTMLElement>('[data-anim-groupe]').forEach((g) => {
    for (const enfant of g.children) if (!enfant.hasAttribute('data-anim')) cibles.push(enfant as HTMLElement);
  });
  cibles.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  // Un groupe réécrit plus tard par un autre script (prix en direct…) : ses nouveaux enfants sont visibles tout de suite.
  const surveillance = new MutationObserver((changements) => {
    for (const c of changements) c.addedNodes.forEach((n) => { if (n instanceof Element) n.setAttribute(FAIT, ''); });
  });
  document.querySelectorAll('[data-anim-groupe]').forEach((g) => surveillance.observe(g, { childList: true }));
  cibles.filter((el) => el.dataset.anim === 'mots').forEach(decouperMots);

  ScrollTrigger.batch(cibles, {
    start: 'top 92%',
    once: true,
    interval: 0.12,
    onEnter: (lot) => {
      let rang = 0;
      for (const el of lot as HTMLElement[]) {
        // Un élément masqué (version téléphone sur ordinateur, rayon filtré) est simplement marqué comme vu.
        if (!el.getClientRects().length) { joues.add(el); el.setAttribute(FAIT, ''); continue; }
        jouer(el, rang++);
      }
    },
  });

  // Filet de sécurité : arrivé en bas de page, tout ce qui reste apparaît.
  ScrollTrigger.create({
    trigger: document.body,
    start: 'bottom bottom+=4',
    once: true,
    onEnter: () => cibles.filter((el) => !joues.has(el)).forEach((el, i) => jouer(el, i)),
  });

  // Photos qui glissent doucement au défilement.
  document.querySelectorAll<HTMLElement>('[data-parallaxe]').forEach((el) => {
    const flotte = el.dataset.parallaxe === 'flotte';
    // Le cadre peut désigner ce qui glisse (data-parallaxe-cible : image fixe et vidéo de l'accueil ensemble).
    const cible = flotte ? el : (el.querySelector<HTMLElement>('[data-parallaxe-cible]') ?? el.querySelector('img'));
    if (!cible) return;
    if (!flotte) gsap.set(cible, { scale: 1.15 });
    gsap.fromTo(cible, { yPercent: flotte ? 5 : -5 }, {
      yPercent: flotte ? -5 : 5,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });

  // Filtres de la page Produits : les rayons changent de hauteur, on recalcule les positions.
  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest?.('[data-filtre]')) setTimeout(() => ScrollTrigger.refresh(), 60);
  });

  // Commande de pommes de terre : le total rebondit quand il change.
  const total = document.querySelector<HTMLElement>('[data-total]');
  if (total) {
    new MutationObserver(() => {
      gsap.fromTo(total, { scale: 1.14 }, { scale: 1, duration: 0.55, ease: 'back.out(3)', transformOrigin: '100% 60%', overwrite: true });
    }).observe(total, { childList: true, characterData: true, subtree: true });
  }

  // Menu mobile : les liens arrivent l'un après l'autre.
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu-mobile');
  if (burger && menu) {
    new MutationObserver(() => {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      gsap.fromTo(menu.querySelectorAll('.menu-mobile__liens > a, .menu-mobile__vente, .menu-mobile__fb'),
        { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.045, clearProps: 'opacity,transform' });
    }).observe(burger, { attributes: true, attributeFilter: ['aria-expanded'] });
  }

  racine.classList.add('anime-pret');
  // Les polices et les images changent les hauteurs : positions recalculées une fois tout chargé.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
