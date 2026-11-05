import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');
const fleurs = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');

test('le catalogue statique affiche un visuel distinct sans toucher au prix ou au panier', () => {
  assert.match(fleurs, /catalog-demo-hydration\.js/);
  assert.match(script, /WoodFlowerPresentation/);
  assert.match(script, /demoAsset/);
  assert.match(script, /demoVisual/);
  assert.match(script, /product-body > p/);
  assert.doesNotMatch(script, /price|cart|checkout|supabase/i);
});
