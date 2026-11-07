import assert from 'node:assert/strict';
import test from 'node:test';

const worker = await import('../backend/cloudflare-d1/src/index.mjs');

const makeDb = () => {
  const calls = { run: 0 };
  const db = {
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async all() {
              if (sql.includes('FROM categories')) return { results: [{ slug: 'fleurs', label: 'Fleurs CBD' }] };
              return { results: [{ slug: 'fleurs-nimbus-3000', name: 'Nimbus 3000', category_slug: 'fleurs', price_cents: null, stock_quantity: null }] };
            },
            async first() {
              if (sql.includes('FROM products')) return { slug: values[0] || 'fleurs-nimbus-3000', name: 'Nimbus 3000', category_slug: 'fleurs' };
              return null;
            },
            async run() { calls.run += 1; return { success: true }; },
          };
        },
        async all() {
          if (sql.includes('FROM categories')) return { results: [{ slug: 'fleurs', label: 'Fleurs CBD' }] };
          return { results: [{ slug: 'fleurs-nimbus-3000', name: 'Nimbus 3000', category_slug: 'fleurs', price_cents: null, stock_quantity: null }] };
        },
        async first() { return null; },
      };
    },
  };
  return { db, calls };
};

test('le Worker D1 expose seulement les lectures publiques attendues', async () => {
  const { db, calls } = makeDb();
  const env = { DB: db };
  const origin = 'https://rapt0r06300.github.io';

  const health = await worker.default.fetch(new Request('https://wood-demo.workers.dev/health', { headers: { Origin: origin } }), env);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get('access-control-allow-origin'), origin);

  const categories = await worker.default.fetch(new Request('https://wood-demo.workers.dev/v1/categories', { headers: { Origin: origin } }), env);
  assert.equal(categories.status, 200);
  assert.deepEqual((await categories.json()).data, [{ slug: 'fleurs', label: 'Fleurs CBD' }]);

  const product = await worker.default.fetch(new Request('https://wood-demo.workers.dev/v1/products/fleurs-nimbus-3000', { headers: { Origin: origin } }), env);
  assert.equal(product.status, 200);
  assert.equal((await product.json()).data.slug, 'fleurs-nimbus-3000');

  const mutation = await worker.default.fetch(new Request('https://wood-demo.workers.dev/v1/products', { method: 'POST', headers: { Origin: origin } }), env);
  assert.equal(mutation.status, 405);
  assert.equal(calls.run, 0);

  const options = await worker.default.fetch(new Request('https://wood-demo.workers.dev/v1/products', { method: 'OPTIONS', headers: { Origin: origin } }), env);
  assert.equal(options.status, 204);
  assert.equal(options.headers.get('access-control-allow-methods'), 'GET, HEAD, OPTIONS');
});

test('le Worker refuse une origine inconnue et conserve le fallback local possible', async () => {
  const { db } = makeDb();
  const response = await worker.default.fetch(new Request('https://wood-demo.workers.dev/v1/products', { headers: { Origin: 'https://evil.example' } }), { DB: db });
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('access-control-allow-origin'), null);
});

