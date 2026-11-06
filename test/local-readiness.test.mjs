import assert from 'node:assert/strict';
import test from 'node:test';
import { auditSite } from '../scripts/site-readiness.mjs';

const report = await auditSite(new URL('../', import.meta.url));

test('le contrôle de préparation couvre toutes les routes publiques', () => {
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
  assert.ok(report.pages.length >= 10, 'au moins dix routes publiques doivent être auditées');
  assert.ok(report.references > 40, 'les références locales doivent être parcourues');
  assert.ok(report.anchors > 10, 'les ancres publiques doivent être vérifiées');
});

test('chaque page publique est prête pour le shell mobile', () => {
  for (const page of report.pages) {
    assert.equal(page.hasViewport, true, `${page.name}: viewport manquante`);
    assert.equal(page.hasMobileShell, true, `${page.name}: mobile-shell manquant`);
    assert.equal(page.hasAdminReference, false, `${page.name}: route admin exposée`);
  }
});

test('le rapport signale les limites externes sans les masquer', () => {
  assert.match(report.externalLimits.join('\n'), /Safari|Gmail|Viva|Hostinger/iu);
});
