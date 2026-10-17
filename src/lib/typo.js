// Typographie française : espaces insécables là où un retour à la ligne serait fautif.
// Utilisé à la construction sur toutes les pages (astro.config.mjs) et par les scripts qui écrivent du texte dans la page.

const INSECABLE = ' ';

export function espacesInsecables(texte) {
  return String(texte ?? '')
    // « guillemets » : jamais seuls en fin ou en début de ligne
    .replace(/« +/g, `«${INSECABLE}`)
    .replace(/ +»/g, `${INSECABLE}»`)
    // ponctuation double collée au mot qui précède : « Déjà client ? », « Total : »
    .replace(/(\S) +([:;!?])(?=\s|$|[»)])/g, `$1${INSECABLE}$2`)
    // nombre et unité : « 15 kg », « 48 h », « 50 km », « 100 % »
    .replace(/(\d) (?=(?:kg|g|km|m|h|min|€|%)(?![\p{L}\d]))/gu, `$1${INSECABLE}`)
    // plages horaires : « 10h – 12h30 » reste sur une ligne
    .replace(/(\d{1,2}h(?:\d{2})?) [–-] (?=\d)/g, `$1${INSECABLE}–${INSECABLE}`);
}

// Même traitement sur une page HTML entière, en ne touchant qu'au texte (ni balises, ni scripts, ni styles).
export function typographierHtml(html) {
  return html
    .split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<textarea\b[\s\S]*?<\/textarea>|<!--[\s\S]*?-->|<[^>]+>)/i)
    .map((morceau, i) => (i % 2 ? morceau : espacesInsecables(morceau)))
    .join('');
}
