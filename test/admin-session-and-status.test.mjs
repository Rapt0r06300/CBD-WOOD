import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const adminSource = await readFile(new URL('../admin.js', import.meta.url), 'utf8');

test('owner dashboard keeps a persistent auto-refreshing Supabase session', () => {
  assert.match(adminSource, /createClient\(config\.url, config\.publishableKey, \{\s*auth:\s*\{[\s\S]*persistSession:\s*true,[\s\S]*autoRefreshToken:\s*true/);
});

test('owner order status choices are accepted by the orders check constraint', () => {
  assert.match(adminSource, /const orderStatuses = \['pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled'\];/);
  assert.doesNotMatch(adminSource, /const orderStatuses = \[[^\]]*'confirmed'/);
});
