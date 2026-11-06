import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat bien-être garde cosmétiques, huiles et soins navigables sans allégation médicale', async () => {
  const contract = await readFile(new URL('../docs/design/wood-wellness-shop-contract.md', import.meta.url), 'utf8');
  const page = await readFile(new URL('../bien-etre.html', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../product-detail.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Références et contenu réglementaire',
    'Parcours et états',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(page, /data-catalog-category="bien-etre"/);
  assert.equal((page.match(/class="product-card"/g) || []).length, 3);
  assert.equal((page.match(/class="add-to-cart"[^>]*disabled/g) || []).length, 3);
  assert.match(page, /Prix à renseigner/);
  assert.match(page, /Disponibilité boutique/);
  assert.match(page, /Fiche à compléter/);
  assert.match(page, /précautions et les informations réglementaires/iu);
  assert.doesNotMatch(page, /data-price=|data-stock=|data-available=/i);
  assert.doesNotMatch(page, /guérit|soigne|médicament|effet garanti|traitement/i);
  assert.match(boutique, /wireGenericCard/);
  assert.match(detail, /Disponibilité à confirmer/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
