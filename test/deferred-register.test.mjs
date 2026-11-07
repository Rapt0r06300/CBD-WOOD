import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const register = await readFile(new URL('../docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md', import.meta.url), 'utf8');

test('le registre différé conserve exactement ses trois portes externes', () => {
  const headings = [...register.matchAll(/^### .*\((\d+)\)/gmu)].map((match) => Number(match[1]));
  const openTasks = [...register.matchAll(/^- \[ \] /gmu)];

  assert.deepEqual(headings, [102, 32, 4]);
  assert.equal(headings.reduce((sum, value) => sum + value, 0), 138);
  assert.equal(openTasks.length, 138);
  assert.match(register, /Ne jamais considérer une case déplacée comme validée/u);
});
