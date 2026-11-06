import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat du header desktop garde la navigation WOOD stable et publique', async () => {
  const contract = await readFile(new URL('../docs/design/wood-desktop-header-contract.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const shop = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobileStyles = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Structure et destinations',
    'Responsive et safe areas',
    'États, accès et fallback',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  for (const marker of ['<header class="nav">', 'class="brand"', 'class="nav-links"', 'class="nav-cta"']) {
    assert.match(homepage, new RegExp(marker.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }
  assert.match(shop, /class="cart-trigger"/);
  assert.doesNotMatch(homepage, /type="search"|name="search"/i);
  assert.doesNotMatch(homepage, /href="admin\.html"/i);
  assert.match(stylesheet, /@media\(max-width:800px\)/);
  assert.match(stylesheet, /@media \(min-width:801px\) and \(max-width:900px\)/);
  assert.match(mobileStyles, /nav-structured/);
  assert.match(shell, /nav-menu-trigger/);
  assert.match(shell, /nav-menu-back/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
