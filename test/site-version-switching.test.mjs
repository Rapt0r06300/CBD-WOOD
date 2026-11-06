import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const script = await readFile(new URL('../scripts/site-version.mjs', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/ops/site-version-switching.md', import.meta.url), 'utf8');

test('le dépôt propose une bascule locale entre la démo et l’ancien site', () => {
  assert.equal(packageJson.scripts['site:demo'], 'node scripts/site-version.mjs demo');
  assert.equal(packageJson.scripts['site:legacy'], 'node scripts/site-version.mjs legacy');
  assert.equal(packageJson.scripts['site:status'], 'node scripts/site-version.mjs status');
  assert.equal(packageJson.scripts['site:snapshot'], 'node scripts/create-site-snapshots.mjs');
  assert.match(script, /validVersions = new Set\(\['legacy', 'demo'\]\)/);
  assert.match(script, /Aucun déploiement distant n’a été effectué/);
  assert.match(guide, /legacy/);
  assert.match(guide, /demo/);
  assert.match(guide, /site:snapshot/);
  assert.match(guide, /ne publie rien/);
});
