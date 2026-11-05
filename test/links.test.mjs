import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, join, normalize, relative, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const publicPages = [
  'index.html',
  'wood-shop.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'fleur.html',
  'produit.html',
  'compte.html',
  'checkout.html',
  'confirmation.html',
  '404.html',
];

const ignoredUrl = /^(?:#|[a-z][a-z0-9+.-]*:|\/\/)/i;
const references = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
const idPattern = /\bid\s*=\s*["']([^"']+)["']/gi;

const pageIds = new Map();
for (const page of publicPages) {
  const source = await readFile(join(root, page), 'utf8');
  pageIds.set(page, new Set([...source.matchAll(idPattern)].map(match => match[1])));
}

async function assertLocalReference(page, raw) {
  if (!raw || ignoredUrl.test(raw)) return;
  const resolved = new URL(raw, `https://wood.local/${page}`);
  const targetPage = resolved.pathname.replace(/^\//, '') || page;
  const target = resolve(root, targetPage);
  assert.equal(relative(root, target).startsWith('..'), false, `${page}: référence hors du dépôt: ${raw}`);
  await access(target);
  if (resolved.hash) {
    const targetName = normalize(targetPage).replaceAll('\\', '/');
    const ids = pageIds.get(targetName);
    assert.ok(ids, `${page}: l’ancre ${raw} pointe vers une page non auditée`);
    assert.ok(ids.has(decodeURIComponent(resolved.hash.slice(1))), `${page}: ancre inexistante ${raw}`);
  }
}

test('toutes les routes et références locales publiques existent', async () => {
  for (const page of publicPages) {
    const source = await readFile(join(root, page), 'utf8');
    for (const match of source.matchAll(references)) await assertLocalReference(page, match[1]);
  }
});

test('l’inventaire public des routes reste explicite', async () => {
  const inventory = await readFile(join(root, 'docs/ops/public-routes.md'), 'utf8');
  for (const page of publicPages.filter(page => page !== '404.html')) assert.match(inventory, new RegExp(`\\b${page.replace('.', '\\.')}(?:\\?|\\b)`));
  assert.match(inventory, /admin\.html.*supprimée/i);
});

test('la page 404 reste lisible sur un téléphone étroit', async () => {
  const notFound = await readFile(join(root, '404.html'), 'utf8');
  assert.match(notFound, /@media\s*\(max-width:\s*400px\)/);
  assert.match(notFound, /overflow-wrap:\s*anywhere/);
});
