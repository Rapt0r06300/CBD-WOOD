import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const migrationPath = join(root, 'backend/cloudflare-d1/migrations/0001_initial_schema.sql');
const seedPath = join(root, 'backend/cloudflare-d1/seed/wood-demo.sql');

const checksumFor = (body) => createHash('sha256').update(JSON.stringify(body)).digest('hex');

const loadDemoDatabase = async () => {
  const migration = await readFile(migrationPath, 'utf8');
  const seed = await readFile(seedPath, 'utf8');
  const db = new DatabaseSync(':memory:');
  db.exec(migration);
  db.exec(seed);
  return db;
};

export const buildDemoExport = async () => {
  const db = await loadDemoDatabase();
  const body = {
    format: 'wood-d1-demo-export-v1',
    source: {
      migration: 'backend/cloudflare-d1/migrations/0001_initial_schema.sql',
      seed: 'backend/cloudflare-d1/seed/wood-demo.sql',
    },
    categories: db.prepare('SELECT slug, label, sort_order, status FROM categories ORDER BY sort_order').all(),
    products: db.prepare('SELECT id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status FROM products ORDER BY id').all(),
    product_media: db.prepare('SELECT id, product_id, src, alt, role, source_status, credit, sort_order FROM product_media ORDER BY id').all(),
    product_variants: db.prepare('SELECT id, product_id, label, grams, price_cents, status FROM product_variants ORDER BY id').all(),
    site_content: db.prepare('SELECT key, value_json, status FROM site_content ORDER BY key').all(),
  };
  return { ...body, checksum: checksumFor(body) };
};

export const restoreDemoExport = async (payload) => {
  if (!payload || payload.format !== 'wood-d1-demo-export-v1') throw new Error('Format d’export WOOD inconnu.');
  const { checksum, ...body } = payload;
  if (!checksum || checksum !== checksumFor(body)) throw new Error('Checksum de l’export WOOD invalide.');
  const migration = await readFile(migrationPath, 'utf8');
  const db = new DatabaseSync(':memory:');
  db.exec(migration);
  const addCategory = db.prepare('INSERT INTO categories (slug, label, sort_order, status) VALUES (?, ?, ?, ?)');
  const addProduct = db.prepare('INSERT INTO products (id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  for (const category of body.categories || []) addCategory.run(category.slug, category.label, category.sort_order, category.status);
  for (const product of body.products || []) addProduct.run(product.id, product.category_slug, product.slug, product.name, product.description, product.price_cents, product.stock_quantity, product.availability_state, product.media_state, product.status);
  return {
    categories: db.prepare('SELECT COUNT(*) AS count FROM categories').get().count,
    products: db.prepare('SELECT COUNT(*) AS count FROM products').get().count,
    commercialTables: db.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name IN ('orders', 'payments', 'customers', 'newsletter_subscribers')").get().count,
  };
};

const main = async () => {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--output');
  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : null;
  if (!outputPath) throw new Error('Usage : node scripts/export-wood-d1-demo.mjs --output <fichier.json> [--restore]');
  const payload = await buildDemoExport();
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  if (args.includes('--restore')) {
    const restored = await restoreDemoExport(payload);
    if (restored.categories !== payload.categories.length || restored.products !== payload.products.length || restored.commercialTables !== 0) {
      throw new Error('La restauration locale du catalogue démo ne correspond pas à l’export.');
    }
    console.log(`Export WOOD écrit (${payload.products.length} produits fictifs) ; restauration locale vérifiée.`);
  } else {
    console.log(`Export WOOD écrit (${payload.products.length} produits fictifs).`);
  }
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
