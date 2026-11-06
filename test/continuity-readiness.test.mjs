import assert from 'node:assert/strict';
import test from 'node:test';
import { auditMigrations } from '../scripts/continuity-readiness.mjs';

const report = await auditMigrations(new URL('../', import.meta.url));

test('la continuité locale couvre les migrations et le runbook de sauvegarde', () => {
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
  assert.ok(report.migrations >= 30, 'l’historique local doit être parcouru');
  assert.equal(report.uniqueTimestamps, true, 'les migrations doivent avoir des préfixes uniques');
  assert.equal(report.hasBackupRunbook, true, 'le runbook de sauvegarde doit être présent');
});

test('la vérification locale refuse les opérations destructrices non documentées', () => {
  assert.deepEqual(report.unsafeMigrations, []);
});
