import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../scripts/verify-github-pages-live.mjs', import.meta.url), 'utf8');

test('le vérificateur Pages compare bien la base et la démo publiées', () => {
  assert.match(script, /demo-mode\\\.js/);
  assert.match(script, /wood-d1-adapter\\\.js/);
  assert.match(script, /base and demo responses are identical/);
  assert.match(script, /response\.url/);
  assert.match(script, /sha256/);
});
