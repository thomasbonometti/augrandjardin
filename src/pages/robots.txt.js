// Tant que le site est en test (SITE_INDEXABLE absent), les moteurs n'indexent rien.
export function GET({ site }) {
  const indexable = import.meta.env.SITE_INDEXABLE === 'oui';
  const corps = indexable
    ? `User-agent: *\nDisallow: /pro/\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(corps, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
