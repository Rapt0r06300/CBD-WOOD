import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap, adapter] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-d1-024-rollback.md', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
  readFile(new URL('../wood-d1-adapter.js', import.meta.url), 'utf8'),
]);

test('D1-024 possède un journal de non-régression et un rollback non destructif', () => {
  assert.notEqual(evidence, '', 'le journal D1-024 doit exister');
  for (const term of [
    'D1-024',
    'npm run check',
    'prepare:github-pages',
    'verify:pages-package',
    'WOOD_D1_DEMO_ENABLED',
    'fallback local',
    'ne pas supprimer D1',
    'ne pas supprimer Supabase',
    'dd8de27',
  ]) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(roadmap, /^- \[x\] \*\*D1-024 —/mu);
  assert.match(adapter, /WOOD_D1_DEMO_ENABLED === true/u);
});
