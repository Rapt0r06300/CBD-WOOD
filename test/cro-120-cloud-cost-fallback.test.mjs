import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [adapter, worker, contract, evidence, roadmap] = await Promise.all([
  readFile(new URL('../wood-d1-adapter.js', import.meta.url), 'utf8'),
  readFile(new URL('../backend/cloudflare-d1/src/index.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/wood-cloudflare-free-contract.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-120-cloud-cost-fallback.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-120 garde D1 désactivé par défaut et le catalogue local comme repli', () => {
  assert.match(adapter, /WOOD_D1_DEMO_ENABLED === true/u);
  assert.match(adapter, /return null/u);
  assert.match(worker, /limit.*50/u);
  assert.match(worker, /fallback: 'local'/u);
  assert.match(worker, /GET.*HEAD.*OPTIONS/u);
  assert.match(contract, /0 €|0€/u);
});

test('CRO-120 documente les limites et ne ferme pas les portes externes', () => {
  assert.match(roadmap, /\[x\] \*\*CRO-120/u);
  for (const term of ['Free', 'opt-in', '503', 'aucune dépense', 'OAuth', 'pas de déploiement distant']) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(evidence, /BLOCKED-EXTERNAL/iu);
});
