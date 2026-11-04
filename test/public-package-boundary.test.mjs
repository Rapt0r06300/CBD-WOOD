import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prepareSource = await readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8');
const preflightSource = await readFile(new URL('../scripts/hostinger-preflight.mjs', import.meta.url), 'utf8');
const ownerDashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');

test('public package uses the integrated owner dashboard and excludes the legacy admin route', () => {
  assert.match(prepareSource, /'owner-dashboard\.css'/);
  assert.match(prepareSource, /'owner-dashboard\.js'/);
  assert.doesNotMatch(prepareSource, /'admin\.html'/);
  assert.doesNotMatch(prepareSource, /'admin\.js'/);
  assert.doesNotMatch(prepareSource, /'admin\.css'/);
});

test('hostinger preflight rejects any public admin route if one is reintroduced', () => {
  assert.match(preflightSource, /admin/i);
  assert.match(preflightSource, /Route admin publique interdite/i);
});

test('owner dashboard prioritises incoming orders before catalogue editing', () => {
  assert.match(ownerDashboard, /ordersSection[\s\S]*productsSection[\s\S]*productsSection\.before\(ordersSection\)/);
});
