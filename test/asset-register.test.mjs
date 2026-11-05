import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import test from 'node:test';

const register = await readFile(new URL('../docs/design/wood-asset-register.md', import.meta.url), 'utf8');
const presentation = await import('../flower-presentation.js');

test('le registre d’assets couvre les 13 visuels de fleurs sans les déclarer réels', async () => {
  const entries = Object.values(presentation.default?.all?.() || presentation.all?.() || {});
  assert.equal(entries.length, 13);
  for (const entry of entries) {
    assert.match(register, new RegExp(entry.image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
    assert.match(register, new RegExp(`\\| ${entry.name} \\|`, 'u'));
    assert.match(register, /\| demo \|/u);
    await access(new URL(`../${entry.image}`, import.meta.url), constants.R_OK);
  }
  assert.match(register, /sans bocal ni cloche/iu);
  assert.match(register, /rollback/i);
});
