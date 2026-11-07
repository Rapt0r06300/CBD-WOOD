import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';

const migration = await readFile(new URL('../backend/cloudflare-d1/migrations/0001_initial_schema.sql', import.meta.url), 'utf8');
const seed = await readFile(new URL('../backend/cloudflare-d1/seed/wood-demo.sql', import.meta.url), 'utf8');

test('le catalogue D1 local est fictif, idempotent et sans tables commerciales', () => {
  const db = new DatabaseSync(':memory:');
  db.exec(migration);
  db.exec(seed);
  db.exec(migration);
  db.exec(seed);

  const categories = db.prepare('SELECT COUNT(*) AS count FROM categories').get().count;
  const products = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;
  const duplicateSlugs = db.prepare('SELECT COUNT(*) - COUNT(DISTINCT slug) AS count FROM products').get().count;
  const commercialTables = db.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name IN ('orders', 'payments', 'customers', 'newsletter_subscribers')").get().count;
  const unknownPricing = db.prepare('SELECT COUNT(*) AS count FROM products WHERE price_cents IS NOT NULL OR stock_quantity IS NOT NULL').get().count;

  assert.equal(categories, 4);
  assert.equal(products, 13);
  assert.equal(duplicateSlugs, 0);
  assert.equal(commercialTables, 0);
  assert.equal(unknownPricing, 0);
});

