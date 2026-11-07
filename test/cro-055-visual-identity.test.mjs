import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [report, assetRegister, publicBuilder, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-cro-055-visual-identity.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-asset-register.md', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-055 sépare les visuels démo des pièces jointes propriétaires en attente', () => {
  assert.match(report, /woodcbdshop@gmail\.com/u);
  assert.match(report, /owner-provided-pending-approval/u);
  assert.match(report, /Aucun visuel d'un tiers ou de TealerLab/u);
  assert.match(report, /absent de la\s+liste blanche/u);
  assert.match(assetRegister, /Le statut passe de `demo` à `approved` seulement après validation/u);
  assert.doesNotMatch(publicBuilder, /owner-materials/u);
  assert.match(roadmap, /^- \[x\] \*\*CRO-055 —/mu);
});
