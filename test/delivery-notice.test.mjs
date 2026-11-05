import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('les quatre boutiques affichent la disponibilité de la livraison avant le catalogue', async () => {
  for (const page of ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html']) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.equal((html.match(/data-purchase-notice/g) || []).length, 1, `${page} doit utiliser le message unique de livraison`);
    assert.match(html, /data-purchase-notice>Livraison disponible à domicile<\/span>/, `${page} doit annoncer la livraison avant les produits`);
  }
});
