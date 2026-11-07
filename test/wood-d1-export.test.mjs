import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';

const run = promisify(execFile);
const script = new URL('../scripts/export-wood-d1-demo.mjs', import.meta.url);

test('l’export D1 local ne contient que le catalogue fictif et se restaure', async () => {
  const work = await mkdtemp(join(tmpdir(), 'wood-d1-export-'));
  const output = join(work, 'demo-export.json');
  try {
    const result = await run(process.execPath, [fileURLToPath(script), '--output', output, '--restore']);
    const payload = JSON.parse(await readFile(output, 'utf8'));
    assert.match(result.stdout, /restauration locale/i);
    assert.equal(payload.format, 'wood-d1-demo-export-v1');
    assert.equal(payload.categories.length, 4);
    assert.equal(payload.products.length, 13);
    assert.equal(payload.products.some((product) => product.price_cents !== null || product.stock_quantity !== null), false);
    assert.equal(Object.keys(payload).some((key) => /token|secret|customer|order|payment/i.test(key)), false);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});
