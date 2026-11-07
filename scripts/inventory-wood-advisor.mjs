import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePages = [
  ['fleurs.html', 'fleurs'],
  ['resines.html', 'resines'],
  ['bien-etre.html', 'bien-etre'],
  ['wood-shop.html', 'wood-shop'],
];

const attribute = (source, name) => {
  const match = source.match(new RegExp(`${name}="([^"]*)"`, 'u'));
  return match?.[1] || '';
};

const decodeHtml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&nbsp;', ' ');

const cardsFromPage = (html, sourceFile, category) => {
  const cards = [];
  const cardPattern = /<article\b[^>]*data-product-id="[^"]+"[\s\S]*?<\/article>/gu;
  for (const match of html.matchAll(cardPattern)) {
    const card = match[0];
    const id = decodeHtml(attribute(card, 'data-product-id'));
    const name = decodeHtml(attribute(card, 'data-product-name'));
    if (!id || !name) continue;
    const slug = id.replace(/^(?:fleurs|bienetre|woodshop|resines)-/u, '').replace(/^demo-(?:flower|resin|wellbeing|shop)-/u, '');
    const images = [...card.matchAll(/<img\b[^>]*>/gu)].map((image) => ({
      src: decodeHtml(attribute(image[0], 'src')),
      alt: decodeHtml(attribute(image[0], 'alt')),
    })).filter((image) => image.src);
    const variants = [...card.matchAll(/<option\b[^>]*data-label="([^"]+)"[^>]*data-price="([^"]+)"[^>]*>/gu)].map((option) => ({
      label: decodeHtml(option[1]),
      price: option[2],
    }));
    cards.push({ id, slug, name, category, sourceFile, media: images, variants });
  }
  return cards;
};

export const collectAdvisorInventory = async () => {
  const all = [];
  for (const [file, category] of sourcePages) {
    const html = await readFile(join(root, file), 'utf8');
    all.push(...cardsFromPage(html, file, category));
  }
  const unique = new Map();
  for (const item of all) if (!unique.has(item.slug)) unique.set(item.slug, item);
  return [...unique.values()].sort((left, right) => left.slug.localeCompare(right.slug));
};

const main = async () => {
  const outputIndex = process.argv.indexOf('--output');
  const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
  if (!output) throw new Error('Usage : node scripts/inventory-wood-advisor.mjs --output <fichier.json>');
  const inventory = await collectAdvisorInventory();
  await writeFile(resolve(output), `${JSON.stringify({ format: 'wood-advisor-inventory-v1', items: inventory }, null, 2)}\n`, 'utf8');
  console.log(`Inventaire WOOD écrit : ${inventory.length} références locales dédupliquées.`);
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
