import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat panier WOOD borne quantités, grammes, totaux et doubles actions', async () => {
  const contract = await readFile(new URL('../docs/design/wood-cart-contract.md', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Quantités, variantes, grammes et totaux',
    'Dialogue, focus et états',
    'Persistance, sécurité et résilience',
    'Responsive, motion et repli',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(boutique, /STORAGE_KEY = 'wood-cart-v1'/);
  assert.match(boutique, /MAX_CART_QUANTITY = 99/);
  assert.match(boutique, /const normalizeCartItem = item =>/);
  assert.match(boutique, /quantity: Math\.min\(MAX_CART_QUANTITY, quantity\)/);
  assert.match(boutique, /const totalLabel = \(\) =>/);
  assert.match(boutique, /cart\.reduce\(\(sum, item\) =>/);
  assert.match(boutique, /const existing = cart\.find\(item => item\.id === variant\.id\)/);
  assert.match(boutique, /existing \? cart\.map/);
  assert.match(boutique, /lastAddAt/);
  assert.match(boutique, /now - lastAddAt < 450/);
  assert.match(boutique, /writeCart\(cart\); renderCart\(\)/);
  assert.match(boutique, /role="dialog" aria-modal="true"/);
  assert.match(boutique, /aria-live="polite"/);
  assert.match(boutique, /checkout\.tabIndex = empty \? -1 : 0/);
  assert.match(boutique, /window\.addEventListener\('storage'/);
  assert.match(boutique, /event\.key !== STORAGE_KEY/);
  assert.match(boutique, /event\.key !== 'Tab'/);
  assert.match(boutique, /event\.key === 'Escape'/);
  assert.match(boutique, /lastCartTrigger\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(styles, /\.cart-panel\{position:fixed/);
  assert.match(styles, /\.cart-items\{overflow:auto/);
  assert.match(styles, /\.cart-checkout\.is-disabled\{opacity:\.5;pointer-events:none\}/);
  assert.match(mobile, /\.cart-qty/);
  assert.match(mobile, /min-width: 44px/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
