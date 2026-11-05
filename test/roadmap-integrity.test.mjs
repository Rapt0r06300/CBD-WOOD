import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const roadmap = await readFile(new URL('../docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md', import.meta.url), 'utf8');
const routes = await readFile(new URL('../docs/ops/public-routes.md', import.meta.url), 'utf8');

test('la feuille de route conserve ses 76 tâches uniques et dans l’ordre', () => {
  const taskNumbers = [...roadmap.matchAll(/^### Tâche (\d+) —/gm)].map(match => Number(match[1]));
  assert.deepEqual(taskNumbers, Array.from({ length: 76 }, (_, index) => index + 1));
});

test('l’état de vérification ne contient pas de compteur obsolète', () => {
  assert.match(roadmap, /npm run check` passe avec \*\*128 tests\*\*/);
  assert.doesNotMatch(roadmap, /\*\*(44|47|51|53|54|64|122|125) tests\*\*/);
  assert.match(roadmap, /paquet de \*\*47 fichiers\*\*/);
  assert.match(roadmap, /availability_state/);
  assert.match(roadmap, /order_notification_outbox/);
});

test('la feuille renvoie vers l’inventaire public et interdit la route admin historique', () => {
  assert.match(routes, /test\/links\.test\.mjs/);
  assert.match(routes, /admin\.html[\s\S]*supprimée/);
  assert.match(roadmap, /docs\/ops\/public-routes\.md/);
});
