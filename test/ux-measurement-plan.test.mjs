import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const plan = await readFile(new URL('../docs/validation/2026-11-07-ux-measurement-plan.md', import.meta.url), 'utf8');
const simulator = await import('../scripts/ux-measurement-sim.mjs');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('la mesure UX démo reste locale, bornée et sans achat', () => {
  const result = simulator.measureFixture([
    'entry', 'category_view', 'detail_view', 'call_click', 'directions_click',
    'purchase', 'email', null,
  ]);
  assert.deepEqual(result.events, {
    entry: 1,
    category_view: 1,
    detail_view: 1,
    call_click: 1,
    directions_click: 1,
  });
  assert.equal(result.sent, false);
  assert.equal(result.stored, false);
  assert.equal(result.purchase, false);
  assert.match(plan, /aucun cookie|sans cookies/iu);
  assert.match(plan, /entrée[\s\S]*univers[\s\S]*fiche[\s\S]*téléphone[\s\S]*itinéraire/iu);
  assert.doesNotMatch(homepage, /gtag\s*\(|sendBeacon|google-analytics|googletagmanager/iu);
});
