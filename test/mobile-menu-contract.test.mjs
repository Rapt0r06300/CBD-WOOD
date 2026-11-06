import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat du menu mobile WOOD protège les sous-vues, les safe areas et le retour focus', async () => {
  const contract = await readFile(new URL('../docs/design/wood-mobile-menu-contract.md', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Vues, actions et retour focus',
    'Safe areas et responsive',
    'États, accès et reduced-motion',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  for (const marker of ['initStructuredMenu', 'nav-menu-trigger', 'nav-menu-back', 'setMenuView', 'Escape']) {
    assert.match(shell, new RegExp(marker.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }
  assert.match(shell, /focus\(\{ preventScroll: true \}\)/);
  assert.match(styles, /env\(safe-area-inset-top/);
  assert.match(styles, /env\(safe-area-inset-bottom/);
  assert.match(styles, /100svh/);
  assert.match(styles, /min-height: 48px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(boutique, /prefers-reduced-motion:reduce/);
  assert.match(account, /ownerDashboard/);
  assert.match(shell, /classList\.contains\('admin-page'\)/);
  assert.doesNotMatch(shell, /navigator\.userAgent|platform\.toLowerCase/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
