import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = [
  'index.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'wood-shop.html',
  'contact.html',
  'fleur.html',
  'produit.html',
  'checkout.html',
  'compte.html',
  'confirmation.html',
  '404.html',
];

const sources = await Promise.all(pages.map(async (page) => [
  page,
  await readFile(new URL(`../${page}`, import.meta.url), 'utf8'),
]));

const getMeta = (html, pattern) => html.match(pattern)?.[1]?.trim() ?? '';

test('chaque page publique de la démo possède des métadonnées propres', () => {
  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();

  for (const [page, html] of sources) {
    const title = getMeta(html, /<title>([^<]+)<\/title>/iu);
    const description = getMeta(html, /<meta\s+name="description"\s+content="([^"]+)"/iu);
    const canonical = getMeta(html, /<link\s+rel="canonical"\s+href="([^"]+)"/iu);
    const ogTitle = getMeta(html, /<meta\s+property="og:title"\s+content="([^"]+)"/iu);
    const ogDescription = getMeta(html, /<meta\s+property="og:description"\s+content="([^"]+)"/iu);
    const ogUrl = getMeta(html, /<meta\s+property="og:url"\s+content="([^"]+)"/iu);

    assert.ok(title, `${page}: title manquant`);
    assert.ok(description, `${page}: description manquante`);
    assert.ok(canonical, `${page}: canonique manquante`);
    assert.ok(ogTitle, `${page}: og:title manquant`);
    assert.ok(ogDescription, `${page}: og:description manquante`);
    assert.ok(ogUrl, `${page}: og:url manquante`);
    assert.match(html, /<meta\s+name="robots"\s+content="noindex,nofollow"/iu, `${page}: la démo doit rester noindex`);
    assert.doesNotMatch(`${title} ${description} ${ogTitle} ${ogDescription}`, /tealerlab|420/iu, `${page}: référence concurrente dans les métadonnées`);

    titles.add(title);
    descriptions.add(description);
    canonicals.add(canonical);
  }

  assert.equal(titles.size, pages.length, 'les titres doivent rester distincts');
  assert.equal(descriptions.size, pages.length, 'les descriptions doivent rester distinctes');
  assert.equal(canonicals.size, pages.length, 'les canoniques doivent rester distinctes');
});

test('la page d’accueil conserve le contrat social WOOD dans ses métadonnées', () => {
  const homepage = new Map(sources).get('index.html');
  assert.match(homepage, /WOOD CBD Shop Nice/iu);
  assert.match(homepage, /Rue Barla/iu);
  assert.match(homepage, /Si c'est WOOD, c'est GOOD/iu);
});
