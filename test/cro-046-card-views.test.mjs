import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [script, catalogue, registry, styles] = await Promise.all([
  readFile(new URL('../wood-card-views.js', import.meta.url), 'utf8'),
  readFile(new URL('../fleurs.html', import.meta.url), 'utf8'),
  readFile(new URL('../flower-presentation.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-card-views.css', import.meta.url), 'utf8'),
]);

test('les mini-vues de cartes sont conditionnelles et accessibles', () => {
  assert.match(catalogue, /wood-card-views\.js/u);
  assert.match(script, /entry\?\.cardViews/u);
  assert.match(script, /seen\.has\(src\)/u);
  assert.match(script, /views\.length < 2/u);
  assert.match(script, /aria-pressed/u);
  assert.match(script, /event\.stopPropagation/u);
  assert.match(styles, /product-card__view-controls/u);
  assert.match(styles, /width:18px;height:18px/u);
});

test('le registre actuel ne fabrique aucune vue répétée', () => {
  assert.doesNotMatch(registry, /cardViews\s*:/u);
  assert.match(registry, /altImage/u, 'la seconde vue de fiche reste séparée des mini-vues de carte');
});
