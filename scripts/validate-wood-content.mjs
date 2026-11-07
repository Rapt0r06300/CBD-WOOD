import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourcePages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];
const prohibited = /\b(?:gu[eé]rit|soigne|soulage|traite|anti[- ]douleur|effet th[eé]rapeutique)\b/iu;
const allowedMediaStates = new Set(['demo', 'prepared', 'approved', 'real-photo']);
const attr = (source, name) => source.match(new RegExp(`${name}="([^"]*)"`, 'u'))?.[1] || '';

export const validateMarkup = (html, file = 'fixture.html') => {
  const errors = [];
  const ids = new Set();
  const cards = [...html.matchAll(/<article\b[^>]*data-product-id="([^"]+)"[\s\S]*?<\/article>/gu)];
  for (const match of cards) {
    const card = match[0];
    const id = match[1];
    if (ids.has(id)) errors.push(`${file}: identifiant produit dupliqué ${id}`);
    ids.add(id);
    if (!attr(card, 'data-product-name').trim()) errors.push(`${file}:${id}: nom produit absent`);
    const state = attr(card, 'data-media-state');
    if (state && !allowedMediaStates.has(state)) errors.push(`${file}:${id}: état média invalide ${state}`);
    for (const image of card.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/gu)) {
      if (!image[1] || /^https?:/iu.test(image[1])) continue;
      if (!existsSync(join(root, image[1]))) errors.push(`${file}:${id}: média absent ${image[1]}`);
    }
    for (const option of card.matchAll(/<option\b[^>]*data-label="([^"]*)"[^>]*data-price="([^"]*)"[^>]*>/gu)) {
      const price = Number(option[2]);
      if (!option[1].trim() || !Number.isFinite(price) || price <= 0) errors.push(`${file}:${id}: variante tarifaire invalide`);
    }
    const visibleText = card.replace(/<[^>]+>/gu, ' ');
    if (prohibited.test(visibleText)) errors.push(`${file}:${id}: formulation santé interdite`);
  }
  return errors;
};

export const validateWoodContent = async () => {
  const errors = [];
  const allIds = new Set();
  for (const file of sourcePages) {
    const html = await readFile(join(root, file), 'utf8');
    for (const error of validateMarkup(html, file)) errors.push(error);
    for (const id of [...html.matchAll(/data-product-id="([^"]+)"/gu)].map(match => match[1])) {
      if (allIds.has(id)) errors.push(`${file}: identifiant transversal dupliqué ${id}`);
      allIds.add(id);
    }
  }
  return errors;
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = await validateWoodContent();
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`Contrôle contenu WOOD : OK (${sourcePages.length} pages, ${errors.length} erreur).`);
}
