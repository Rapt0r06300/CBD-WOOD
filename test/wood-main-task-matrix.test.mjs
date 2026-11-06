import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const roadmap = fs.readFileSync(path.join(root, 'docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md'), 'utf8');
const matrix = fs.readFileSync(path.join(root, 'docs/design/wood-main-task-matrix.md'), 'utf8');

const ids = Array.from({ length: 76 }, (_, index) => `M${String(index + 1).padStart(3, '0')}`);
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => `M${String(start + index).padStart(3, '0')}`);
const listed = (label) => {
  const line = matrix.split('\n').find((entry) => entry.startsWith(`- **${label}`));
  assert.ok(line, `matrix line missing: ${label}`);
  return line;
};

test('la matrice M couvre les 76 tâches principales et leurs quatre atomiques', () => {
  for (const id of ids) {
    assert.match(roadmap, new RegExp(`\\[[x ]\\] \\*\\*${id}\\.[abcd] —`, 'u'), `roadmap atomics missing for ${id}`);
  }
  assert.match(matrix, /M001\.a–M076\.a/u);
  assert.match(matrix, /M001\.b–M076\.b/u);
  assert.match(matrix, /M001\.c–M076\.c/u);
  assert.match(matrix, /M001\.d–M076\.d/u);
});

test('les exceptions M sont explicites et cohérentes avec les portes externes', () => {
  assert.match(listed('M001.a'), /cadrage et sources/u);
  assert.match(listed('M001.b'), /M045, M046, M047, M058, M067 et M075/u);
  assert.match(listed('M001.c'), /M029, M046, M047 et M067/u);
  assert.match(listed('M001.d'), /M003, M007, M028, M029/u);
  assert.match(matrix, /photos réelles sans contenant/u);
  assert.match(matrix, /restauration Supabase réelle/u);
});

test('les preuves transversales et le rollback local existent', () => {
  for (const relative of [
    'docs/validation/2026-11-05-local-readiness.md',
    'docs/validation/2026-11-05-responsive-reference.md',
    'docs/validation/2026-11-05-wood-tealerlab-comparison.md',
    'docs/ops/production-checklist.md',
    'docs/ops/supabase-backup-restore.md',
    'docs/ops/owner-handover.md',
    'docs/ops/owner-quick-guide.md',
    'docs/design/wood-hosting-package-contract.md',
    'test/wood-hosting-package-contract.test.mjs',
  ]) {
    assert.ok(fs.existsSync(path.join(root, relative)), `missing evidence: ${relative}`);
  }
});

test('les listes de clôture ont les cardinalités attendues', () => {
  assert.equal(range(1, 76).length, 76);
  assert.equal(range(1, 76).filter((id) => !['M045', 'M046', 'M047', 'M058', 'M067', 'M075'].includes(id)).length, 70);
  assert.equal(range(1, 76).filter((id) => !['M029', 'M046', 'M047', 'M067'].includes(id)).length, 72);
  assert.equal(range(1, 76).filter((id) => !['M003', 'M007', 'M028', 'M029', 'M034', 'M035', 'M037', 'M038', 'M039', 'M040', 'M042', 'M045', 'M046', 'M047', 'M049', 'M058', 'M061', 'M062', 'M063', 'M064', 'M067', 'M073', 'M074', 'M075', 'M076'].includes(id)).length, 51);
});
