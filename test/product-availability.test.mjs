import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('les cartes provisoires ne proposent pas un ajout au panier actif', async () => {
  for (const file of ['resines.html', 'bien-etre.html', 'wood-shop.html']) {
    const html = await readFile(new URL(file, root), 'utf8');
    const buttons = [...html.matchAll(/<button\b[^>]*class="add-to-cart"[^>]*>/g)];
    assert.ok(buttons.length > 0, `${file} doit conserver ses cartes de démonstration`);
    for (const button of buttons) {
      assert.match(button[0], /\bdisabled\b/, `${file} contient un bouton d’achat actif sans données validées`);
      assert.match(button[0], /aria-disabled="true"/, `${file} doit exposer l’état indisponible aux technologies d’assistance`);
      assert.match(button[0], /data-product-unavailable/, `${file} doit marquer l’état indisponible dans le DOM`);
    }
  }
});

test('le panier refuse toute carte marquée indisponible', async () => {
  const source = await readFile(new URL('boutique.js', root), 'utf8');
  assert.match(source, /button\?\.disabled/);
  assert.match(source, /productUnavailable/);
});

test('le catalogue de secours reste bloqué tant que Supabase ne l’a pas confirmé', async () => {
  const source = await readFile(new URL('boutique.js', root), 'utf8');
  assert.match(source, /WOOD_SUPABASE_CONFIG/);
  assert.match(source, /markFallbackCatalogUnavailable/);
  assert.match(source, /data-product-unavailable/);
});

test('les produits Supabase sans prix ou stock reçoivent un CTA désactivé', async () => {
  const source = await readFile(new URL('storefront.js', root), 'utf8');
  assert.match(source, /stock\s*>\s*0/);
  assert.match(source, /price_cents/);
  assert.match(source, /Rupture de stock/);
  assert.match(source, /Prix à confirmer/);
  assert.match(source, /disabled/);
  assert.match(source, /data-product-unavailable/);
});

test('le style rend l’état indisponible visible sans animation de bouton', async () => {
  const stylesheet = await readFile(new URL('boutique.css', root), 'utf8');
  assert.match(stylesheet, /\.add-to-cart:disabled[^{]*\{[\s\S]*?cursor:\s*not-allowed/);
  assert.match(stylesheet, /\.add-to-cart:disabled:hover/);
});
