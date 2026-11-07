import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const document = fs.readFileSync(path.join(root, 'docs/validation/2026-11-07-external-gates.md'), 'utf8');

const expectedIds = [
  'TXW-008', 'TXW-028', 'TXW-042', 'TXW-084', 'TXW-085', 'TXW-109',
  'CRO-008', 'CRO-051', 'CRO-082', 'CRO-111',
  'D1-004', 'D1-005', 'D1-016', 'D1-017', 'D1-018', 'D1-019', 'D1-020',
  'CRO-134', 'CRO-142', 'CRO-147', 'CRO-148', 'CRO-150', 'CRO-152', 'CRO-225',
];

test('external roadmap gates are explicit and do not increase the done count', () => {
  assert.match(document, /24 tâches `BLOCKED-EXTERNAL` retirées de la feuille active/u);
  assert.match(document, /347 \/ 485 — 71,55 %/u);
  assert.match(document, /Aucune opération Cloudflare distante, paiement réel, e-mail commercial ou/u);

  const foundIds = [...document.matchAll(/^\| ((?:TXW|CRO|D1)-\d{3}) \|/gmu)].map((match) => match[1]);
  assert.deepEqual(foundIds, expectedIds);
  assert.equal(new Set(foundIds).size, expectedIds.length);
  assert.match(document, /Une tâche ne peut être réintroduite dans la feuille active/u);
});
