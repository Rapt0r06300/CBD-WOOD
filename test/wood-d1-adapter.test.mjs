import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../wood-d1-adapter.js', import.meta.url), 'utf8').catch(() => '');

test('l’adaptateur D1 reste désactivé par défaut et ne fait aucun appel', async () => {
  assert.notEqual(source, '', 'wood-d1-adapter.js doit exister avant son intégration');
  let calls = 0;
  const context = { window: { fetch: async () => { calls += 1; } }, Promise, URL, URLSearchParams };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-d1-adapter.js' });
  assert.equal(context.window.WoodD1Demo.enabled, false);
  assert.equal(await context.window.WoodD1Demo.products(), null);
  assert.equal(calls, 0);
});

test('l’adaptateur opt-in limite les lectures D1 aux GET et retombe sur null en cas d’échec', async () => {
  const requests = [];
  const context = {
    window: {
      WOOD_D1_DEMO_ENABLED: true,
      WOOD_D1_CONFIG: { url: 'https://wood-demo.example.workers.dev/' },
      fetch: async (url, options) => {
        requests.push({ url, options });
        return { ok: true, json: async () => ({ data: ['demo'] }) };
      },
    },
    Promise,
    URL,
    URLSearchParams,
  };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-d1-adapter.js' });
  assert.equal(context.window.WoodD1Demo.enabled, true);
  assert.deepEqual(await context.window.WoodD1Demo.products({ limit: 5 }), { data: ['demo'] });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].options.method, 'GET');
  assert.equal(requests[0].options.body, undefined);
  assert.match(requests[0].url, /\/v1\/products\?limit=5$/);

  const failingContext = {
    window: {
      WOOD_D1_DEMO_ENABLED: true,
      WOOD_D1_CONFIG: { url: 'https://wood-demo.example.workers.dev' },
      fetch: async () => ({ ok: false, json: async () => ({}) }),
    },
    Promise,
    URL,
    URLSearchParams,
  };
  failingContext.globalThis = failingContext;
  vm.runInNewContext(source, failingContext, { filename: 'wood-d1-adapter.js' });
  assert.equal(await failingContext.window.WoodD1Demo.categories(), null);
});
