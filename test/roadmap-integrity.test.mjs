import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const roadmap = await readFile(new URL('../docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md', import.meta.url), 'utf8');
const deferredRoadmap = await readFile(new URL('../docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md', import.meta.url), 'utf8');
const routes = await readFile(new URL('../docs/ops/public-routes.md', import.meta.url), 'utf8');
const viva = await readFile(new URL('../docs/ops/viva-wallet.md', import.meta.url), 'utf8');
const supabaseSecurityGate = await readFile(new URL('../docs/ops/supabase-security-gate.md', import.meta.url), 'utf8');
const localReadiness = await readFile(new URL('../docs/validation/2026-11-05-local-readiness.md', import.meta.url), 'utf8');
const visualComparison = await readFile(new URL('../docs/validation/2026-11-05-wood-tealerlab-comparison.md', import.meta.url), 'utf8');
const compatibilityAudit = await readFile(new URL('../docs/audits/2026-11-04-tealerlab-wood-compatibility-audit.md', import.meta.url), 'utf8');

test('la feuille de route conserve ses 76 tâches uniques et dans l’ordre', () => {
  const taskNumbers = [...roadmap.matchAll(/^### Tâche (\d+) —/gm)].map(match => Number(match[1]));
  assert.deepEqual(taskNumbers, Array.from({ length: 76 }, (_, index) => index + 1));
});

test('l’état de vérification ne contient pas de compteur obsolète', () => {
  assert.match(roadmap, /npm run check` passe avec \*\*333 tests\*\*/);
  assert.doesNotMatch(roadmap, /\*\*(44|47|51|53|54|64|122|125|171|172|174|240) tests\*\*/);
  assert.match(roadmap, /paquet de \*\*57 fichiers\*\*/);
  assert.match(roadmap, /availability_state/);
  assert.match(roadmap, /order_notification_outbox/);
});

test('la feuille renvoie vers l’inventaire public et interdit la route admin historique', () => {
  assert.match(routes, /test\/links\.test\.mjs/);
  assert.match(routes, /admin\.html[\s\S]*supprimée/);
  assert.match(roadmap, /docs\/ops\/public-routes\.md/);
});

test('les tags A01–A700 restent uniques dans la feuille active et les tâches différées', () => {
  const tags = [roadmap, deferredRoadmap]
    .flatMap(document => [...document.matchAll(/\*\*A(\d+) —/g)].map(match => Number(match[1])))
    .sort((a, b) => a - b);
  assert.deepEqual(tags, Array.from({ length: 700 }, (_, index) => index + 1));
  assert.match(roadmap, /registre d'attente externe/);
  assert.match(deferredRoadmap, /mises en attente/);
});

test('la batterie finale de libération contient 150 tests numérotés et continus', () => {
  const tags = [...roadmap.matchAll(/\*\*T(\d{3}) —/g)].map(match => Number(match[1]));
  assert.deepEqual(tags, Array.from({ length: 150 }, (_, index) => index + 1));
  assert.match(roadmap, /100 % des tests applicables passent/);
  assert.match(roadmap, /prêt pour Hostinger/);
});

test('la frontière Viva reste documentée sans activer le paiement', () => {
  assert.match(viva, /Le site ne lance actuellement aucun paiement Viva/);
  assert.match(viva, /retour du navigateur n’est jamais une transition/);
});

test('la feuille renvoie vers la porte de sécurité Supabase avant production', () => {
  assert.match(roadmap, /docs\/ops\/supabase-security-gate\.md/);
  assert.match(supabaseSecurityGate, /private\.order_rate_limit_buckets/);
  assert.match(supabaseSecurityGate, /Leaked Password Protection/);
  assert.match(localReadiness, /36 migrations distantes/);
  assert.match(localReadiness, /37 fichiers de migration locaux/);
  assert.match(localReadiness, /20261105232000_rate_limit_rls\.sql/);
  assert.match(compatibilityAudit, /29 index actuellement inutilisés/iu);
});

test('la comparaison visuelle sépare adaptation WOOD et validation humaine', () => {
  for (const marker of ['## Desktop', '## Mobile', 'Palette, logo officiel', 'Cette preuve technique ne remplace pas']) {
    assert.match(visualComparison, new RegExp(marker.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }
});
