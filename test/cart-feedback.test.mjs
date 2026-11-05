import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

test('l’ajout au panier donne un feedback local, discret et accessible', () => {
  assert.match(boutique, /id="cartFeedback" role="status" aria-live="polite"/);
  assert.match(boutique, /cartFeedback[\s\S]*textContent/);
  assert.match(boutique, /is-added/);
  assert.match(stylesheet, /\.cart-feedback\{/);
  assert.doesNotMatch(boutique, /alert\(|prompt\(/);
});
