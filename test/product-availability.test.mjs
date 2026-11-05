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
  assert.match(source, /availability_state/);
  assert.match(source, /stock\s*>\s*0/);
  assert.match(source, /price_cents/);
  assert.match(source, /Rupture de stock/);
  assert.match(source, /Prix à confirmer/);
  assert.match(source, /disabled/);
  assert.match(source, /data-product-unavailable/);
});

test('un double-clic très rapide ne duplique pas un ajout au panier', async () => {
  const source = await readFile(new URL('boutique.js', root), 'utf8');
  assert.match(source, /lastAddAt/);
  assert.match(source, /<\s*450/);
});

test('le style rend l’état indisponible visible sans animation de bouton', async () => {
  const stylesheet = await readFile(new URL('boutique.css', root), 'utf8');
  assert.match(stylesheet, /\.add-to-cart:disabled[^{]*\{[\s\S]*?cursor:\s*not-allowed/);
  assert.match(stylesheet, /\.add-to-cart:disabled:hover/);
});

test('les cartes exposent des états de disponibilité et des zones de hauteur stable', async () => {
  const storefront = await readFile(new URL('storefront.js', root), 'utf8');
  const stylesheet = await readFile(new URL('boutique.css', root), 'utf8');
  assert.match(storefront, /data-availability-state/);
  assert.match(storefront, /availabilityState/);
  assert.match(stylesheet, /\.product-card h3[^\{]*\{[^}]*min-height/);
  assert.match(stylesheet, /\.product-choice[^\{]*\{[^}]*min-height/);
});

test('les cartes affichent uniquement les niveaux WOOD reconnus', async () => {
  const source = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  assert.match(source, /function productLevel\(description\)/);
  assert.match(source, /CBD boosté · strong/);
  assert.match(source, /CBD soft · medium/);
  assert.match(source, /CBD classique/);
  assert.match(source, /product-badges/);
  assert.match(stylesheet, /\.product-badges/);
  assert.match(stylesheet, /\.product-badge--level/);
});

test('le tableau de bord permet de renseigner un état de disponibilité explicite', async () => {
  const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
  const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
  const migration = await readFile(new URL('../supabase/migrations/20261104110000_product_availability_state.sql', import.meta.url), 'utf8');
  assert.match(accountPage, /id="ownerProductAvailability"/);
  assert.match(dashboard, /availability_state/);
  assert.match(migration, /available.*soon.*rupture.*incomplete/s);
  const orderSecurity = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');
  assert.match(orderSecurity, /availability_state\s*=\s*'available'/);
});
