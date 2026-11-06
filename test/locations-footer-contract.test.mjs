import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat boutiques distingue Barla et Borriglione dans le footer et les blocs de contact', async () => {
  const contract = await readFile(new URL('../docs/design/wood-locations-footer-contract.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Données et associations',
    'Responsive, interaction et fallback',
    'Accessibilité et limites commerciales',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(homepage, /<h3>BARLA<\/h3>/);
  assert.match(homepage, /<h3>BORRIGLIONE<\/h3>/);
  assert.match(homepage, /tel:\+33422163570/);
  assert.match(homepage, /tel:\+33423130305/);
  assert.match(homepage, /7 rue Barla, 06300 Nice/);
  assert.match(homepage, /16 avenue Alfred Borriglione, 06100 Nice/);
  assert.doesNotMatch(homepage, /<h3>(?:BARLA|BORRIGLIONE)\.<\/h3>/);
  assert.match(shell, /initFooterSections/);
  assert.match(shell, /woodFooterSections/);
  assert.match(styles, /\.footer-section>summary/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
