import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../order-api.js', import.meta.url), 'utf8');
const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');
const compte = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
const account = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
const productDetail = await readFile(new URL('../product-detail.js', import.meta.url), 'utf8');
const demoMode = await readFile(new URL('../demo-mode.js', import.meta.url), 'utf8').catch(() => '');
const pagesBuild = await readFile(new URL('../scripts/prepare-github-pages.mjs', import.meta.url), 'utf8');

test('le mode démo neutralise les formulaires et les actions avant les scripts métier', () => {
  assert.notEqual(demoMode, '', 'demo-mode.js doit exister avant son intégration');
  const listeners = [];
  const controls = [
    { disabled: false, removeAttribute(name) { this.removed = name; } },
    { disabled: false, removeAttribute(name) { this.removed = name; } },
  ];
  const forms = [{ noValidate: false, querySelectorAll: () => controls, addEventListener(type, handler, capture) { listeners.push({ type, handler, capture }); } }];
  const root = { dataset: {} };
  const context = {
    window: { location: { pathname: '/CBD-WOOD/demo/checkout.html' } },
    document: {
      documentElement: root,
      querySelector: (selector) => selector === '[data-demo-only]' ? { textContent: '' } : null,
      querySelectorAll: (selector) => selector === 'form' ? forms : [],
      addEventListener(type, handler, capture) { listeners.push({ type, handler, capture }); },
    },
    console,
  };
  context.globalThis = context;
  vm.runInNewContext(demoMode, context, { filename: 'demo-mode.js' });
  assert.equal(root.dataset.woodMode, 'demo');
  assert.equal(forms[0].noValidate, true);
  assert.deepEqual(controls.map((control) => control.disabled), [true, true]);
  assert.deepEqual(controls.map((control) => control.removed), ['required', 'required']);
  assert.ok(listeners.some((listener) => listener.type === 'submit' && listener.capture === true));
});

test('la démo refuse toute création de commande avant tout appel réseau', async () => {
  let fetchCalls = 0;
  const context = {
    window: {
      location: { pathname: '/CBD-WOOD/demo/checkout.html' },
      WOOD_SUPABASE_CONFIG: { url: 'https://example.supabase.co', publishableKey: 'demo-key' },
      setTimeout,
      clearTimeout,
    },
    document: { querySelector: () => null },
    HTMLInputElement: class HTMLInputElement {},
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    crypto: { randomUUID: () => 'demo-id' },
    fetch: async () => { fetchCalls += 1; throw new Error('fetch interdit'); },
    AbortController,
    Uint8Array,
    Promise,
    Error,
    setTimeout,
    clearTimeout,
  };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'order-api.js' });

  await assert.rejects(
    context.window.WoodOrderApi.createPendingOrder({ items: [{ product_id: 'demo', grams: 1, quantity: 1 }] }),
    /démo|simulation/i,
  );
  assert.equal(fetchCalls, 0);
});

test('le checkout expose explicitement une simulation locale', () => {
  assert.match(checkout, /data-demo-only/);
  assert.match(checkout, /aucune commande réelle/i);
  assert.match(checkout, /simulation/i);
  assert.match(boutique, /isDemoPage/);
  assert.match(boutique, /isDemoPage\(\)\s*\|\|/);
  assert.match(account, /isDemoPage/);
  assert.match(account, /isDemoPage\(\)\s*\?\s*null/);
  assert.match(storefront, /isDemoPage/);
  assert.match(storefront, /isDemoPage\(\)/);
  assert.match(storefront, /WoodD1Demo/);
  assert.match(storefront, /fallback/i);
  assert.match(productDetail, /isDemoPage/);
  assert.match(productDetail, /isDemoPage\(\)/);
  assert.match(checkout, /demo-mode\.js/);
  assert.match(checkout, /data-demo-only/);
  assert.match(checkout, /simulation locale uniquement/i);
  assert.match(compte, /demo-mode\.js/);
  assert.match(pagesBuild, /demo-mode\.js/);
  assert.match(pagesBuild, /wood-d1-adapter\.js/);
  assert.match(pagesBuild, /demoFiles/);
  assert.match(demoMode, /mailto:/);
  assert.match(demoMode, /tel:/);
  assert.match(demoMode, /Aperçu du panier/);
  assert.match(demoMode, /Aucune commande ne sera créée/);
  assert.match(demoMode, /orderModes/);
  assert.match(demoMode, /MutationObserver/);
});

