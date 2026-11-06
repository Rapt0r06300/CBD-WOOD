import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const roadmapPath = path.join(root, 'docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md');
const roadmap = fs.readFileSync(roadmapPath, 'utf8');
const responsiveReference = fs.readFileSync(path.join(root, 'docs/validation/2026-11-05-responsive-reference.md'), 'utf8');
const hostingerBrowserMatrix = fs.readFileSync(path.join(root, 'docs/validation/2026-11-05-hostinger-package-browser-matrix.md'), 'utf8');
const lines = roadmap.split(/\r?\n/);
const rLines = lines.filter((line) => /^- \[[x ]\] \*\*R\d{4}\.[abcd] —/u.test(line));
const openR = lines.filter((line) => /^- \[ \] \*\*R\d{4}\.[abcd] —/u.test(line));
const openTaskIds = new Set(openR.map((line) => line.match(/\*\*(R\d{4})\./u)?.[1]).filter(Boolean));

test('les 4 224 atomiques R sont présentes et les cadrages résiduels sont fermés', () => {
  assert.equal(rLines.length, 4224);
  assert.equal(openTaskIds.size, 126);
  assert.equal(openR.length, 378);
  for (const id of openTaskIds) {
    assert.match(roadmap, new RegExp(`- \\[x\\] \\*\\*${id}\\.a —`, 'u'));
  }
});

test('chaque porte R encore ouverte garde son livrable, contrôle et preuve ouverts', () => {
  for (const id of openTaskIds) {
    for (const part of ['b', 'c', 'd']) {
      assert.match(roadmap, new RegExp(`- \\[ \\] \\*\\*${id}\\.${part} —`, 'u'), `${id}.${part} must remain open`);
    }
  }
});

test('la preuve de clôture R et les guides de passation existent', () => {
  for (const relative of [
    'docs/validation/2026-11-05-r-closure-matrix.md',
    'docs/design/wood-main-task-matrix.md',
    'docs/ops/production-checklist.md',
    'docs/ops/owner-handover.md',
    'docs/ops/supabase-backup-restore.md',
    'docs/validation/2026-11-05-hostinger-package-browser-matrix.md',
  ]) {
    assert.ok(fs.existsSync(path.join(root, relative)), `missing evidence: ${relative}`);
  }
});

test('la feuille de route expose le jalon 4 119 / 4 528', () => {
  assert.match(roadmap, /4 120 \/ 4 528 = 90,99 %/u);
  assert.match(responsiveReference, /4 119 \/ 4 528/u);
  assert.match(responsiveReference, /Chromium, Firefox et WebKit/u);
  assert.match(responsiveReference, /Safari iOS\/macOS/u);
  assert.match(hostingerBrowserMatrix, /12 combinaisons/u);
  for (const id of ['R1053', 'R1054']) {
    for (const part of ['b', 'c', 'd']) {
      assert.match(roadmap, new RegExp(`- \\[x\\] \\*\\*${id}\\.${part} —`, 'u'));
    }
  }
});
