import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const [source, styles, hostinger, pagesBuild, grammar] = await Promise.all([
  readFile(new URL('../wood-badge-engine.js', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../wood-badges.css', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/prepare-github-pages.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-badge-grammar.md', import.meta.url), 'utf8'),
]);

const loadBadges = () => {
  const context = { window: {}, console };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-badge-engine.js' });
  return context.window.WoodBadgeEngine;
};

test('les trois familles de badges restent descriptives et sourcées', () => {
  const badges = loadBadges().buildBadges({ facts: [
    { key: 'aromaIntensity', value: 'high', verified: true, source: 'owner-approved:1' },
    { key: 'notes', value: 'fruite', verified: true, source: 'owner-approved:2' },
    { key: 'notes', value: 'terreux', verified: true, source: 'owner-approved:3' },
  ] });
  assert.equal(badges.length, 2);
  assert.deepEqual(Array.from(badges, (badge) => badge.family), ['intensity', 'aroma']);
  assert.match(JSON.stringify(badges), /INTENSE|FORT|GOÛT|ARÔMES/iu);
  assert.doesNotMatch(JSON.stringify(badges), /effet|relax|médic|dosage/iu);
  assert.ok(badges.every((badge) => badge.source));
});

test('les faits inconnus, invalides ou contradictoires ne fabriquent aucun badge', () => {
  const engine = loadBadges();
  assert.deepEqual(Array.from(engine.buildBadges({ facts: [] })), []);
  assert.deepEqual(Array.from(engine.buildBadges({ facts: [{ key: 'aromaIntensity', value: 'high', verified: false, source: 'à contrôler' }] })), []);
  const markup = engine.renderBadges({ facts: [{ key: 'notes', value: 'fruite', verified: false, source: null }] });
  assert.equal(markup, '');
});

test('le rendu des badges reste lisible et publiable dans la démo', () => {
  const markup = loadBadges().renderBadges({ facts: [{ key: 'aromaIntensity', value: 'low', verified: true, source: 'owner-approved:1' }] });
  assert.match(markup, /aria-label/iu);
  assert.match(markup, /DOUX|LÉGER/iu);
  assert.match(markup, /source/iu);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/iu);
  assert.match(styles, /contrast|border/iu);
  for (const value of ['wood-badge-engine.js', 'wood-badges.css', 'assets/graffiti/wood-badge-soft.svg', 'assets/graffiti/wood-badge-intense.svg', 'assets/graffiti/wood-badge-aroma.svg']) {
    assert.match(hostinger, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(pagesBuild, /wood-badge-engine\.js/);
  assert.match(grammar, /DOUX \/ LÉGER/iu);
  assert.match(grammar, /INTENSE \/ FORT/iu);
  assert.match(grammar, /GOÛT \/ ARÔMES/iu);
  assert.match(grammar, /zéro badge|zero badge|contradiction/iu);
});

test('une intensité contradictoire ne produit pas un faux badge', () => {
  const badges = loadBadges().buildBadges({ facts: [
    { key: 'aromaIntensity', value: 'low', verified: true, source: 'owner-approved:a' },
    { key: 'aromaIntensity', value: 'high', verified: true, source: 'owner-approved:b' },
  ] });
  assert.equal(Array.from(badges).length, 0);
});
