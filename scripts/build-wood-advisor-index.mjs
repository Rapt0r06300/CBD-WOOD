import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { collectAdvisorInventory } from './inventory-wood-advisor.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const normalize = (value) => String(value ?? '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/gu, ' ')
  .trim()
  .replace(/\s+/gu, ' ');

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`\\b${escapeRegExp(normalize(term))}\\w*`, 'u').test(text);
const checksumFor = (body) => createHash('sha256').update(JSON.stringify(body)).digest('hex');

const sourceFor = (item, fact) => ({
  file: fact?.source?.file || item.sourceFile,
  selector: fact?.source?.selector || `[data-product-id="${item.id}"]`,
  excerpt: fact?.source?.excerpt || String(fact?.value || '').slice(0, 240),
});

const buildAttributeEvidence = (products, lexicon) => {
  const extracted = new Map();
  const noteEntries = Object.entries(lexicon.notes || {});
  const intensityEntries = [
    ['high', ...(lexicon.intensity?.high || [])],
    ['low', ...(lexicon.intensity?.low || [])],
  ];
  for (const product of products) {
    for (const fact of Array.isArray(product.facts) ? product.facts : []) {
      if (!['profile', 'description'].includes(fact.key)) continue;
      const text = normalize(fact.value);
      const source = sourceFor(product, fact);
      for (const [canonical, aliases] of noteEntries) {
        if (!aliases.some((alias) => hasTerm(text, alias))) continue;
        const key = `${product.slug}|notes|${canonical}|${source.file}|${source.selector}`;
        extracted.set(key, {
          id: `evidence-${createHash('sha256').update(key).digest('hex').slice(0, 16)}`,
          productSlug: product.slug,
          attributeKey: 'notes',
          attributeValue: canonical,
          normalizedValue: normalize(canonical),
          version: String(lexicon.version || 'unversioned'),
          source,
          status: 'needs_review',
          publishedAs: 'hidden',
        });
      }
      for (const [intensity, ...aliases] of intensityEntries) {
        if (!aliases.some((alias) => hasTerm(text, alias))) continue;
        const key = `${product.slug}|aromaIntensity|${intensity}|${source.file}|${source.selector}`;
        extracted.set(key, {
          id: `evidence-${createHash('sha256').update(key).digest('hex').slice(0, 16)}`,
          productSlug: product.slug,
          attributeKey: 'aromaIntensity',
          attributeValue: intensity,
          normalizedValue: intensity,
          version: String(lexicon.version || 'unversioned'),
          source,
          status: 'needs_review',
          publishedAs: 'hidden',
        });
      }
    }
  }
  return [...extracted.values()].sort((left, right) => left.id.localeCompare(right.id));
};

export const buildAdvisorIndex = (inventory, lexicon = {}) => {
  const productsBySlug = new Map();
  for (const item of Array.isArray(inventory) ? inventory : []) {
    if (!item?.slug || productsBySlug.has(item.slug)) continue;
    productsBySlug.set(item.slug, item);
  }
  const products = [...productsBySlug.values()]
    .sort((left, right) => left.slug.localeCompare(right.slug))
    .map((item) => ({ slug: item.slug, name: item.name, category: item.category, sourceFile: item.sourceFile }));
  const sourceProducts = [...productsBySlug.values()].sort((left, right) => left.slug.localeCompare(right.slug));
  const attributeEvidence = buildAttributeEvidence(sourceProducts, lexicon);
  const valueGroups = new Map();
  for (const evidence of attributeEvidence) {
    const key = evidence.attributeKey;
    const values = valueGroups.get(key) || new Set();
    values.add(evidence.attributeValue);
    valueGroups.set(key, values);
  }
  const badgeRules = [...valueGroups.keys()].sort().map((factKey) => ({
    id: `rule-${factKey}`,
    ruleKey: `verified-${factKey}`,
    factKey,
    label: factKey === 'notes' ? 'GOÛT / ARÔMES' : 'PROFIL AROMATIQUE',
    version: String(lexicon.version || 'unversioned'),
    status: 'needs_review',
    publishedAs: 'hidden',
  }));
  const questions = [...valueGroups.entries()]
    .filter(([, values]) => values.size > 1)
    .map(([key, values]) => ({
      id: `question-${key}`,
      key,
      choices: [...values].sort(),
      status: 'needs_review',
      publishedAs: 'hidden',
    }));
  const body = {
    format: 'wood-advisor-import-v1',
    lexiconVersion: String(lexicon.version || 'unversioned'),
    products,
    attributeEvidence,
    badgeRules,
    questions,
    import: {
      status: 'review-required',
      commercialWrites: false,
      sourceCount: attributeEvidence.length,
      deduplicatedProducts: products.length,
    },
  };
  return { ...body, checksum: checksumFor(body) };
};

const loadLexicon = async () => {
  const source = await readFile(join(root, 'wood-advisor-lexicon.js'), 'utf8');
  const context = { window: {}, console };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-advisor-lexicon.js' });
  return context.window.WoodAdvisorLexicon;
};

const main = async () => {
  const outputIndex = process.argv.indexOf('--output');
  const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
  if (!output) throw new Error('Usage : node scripts/build-wood-advisor-index.mjs --output <fichier.json>');
  const result = buildAdvisorIndex(await collectAdvisorInventory(), await loadLexicon());
  await writeFile(resolve(output), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(`Index conseiller WOOD écrit : ${result.products.length} produits, ${result.attributeEvidence.length} preuves en revue.`);
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
