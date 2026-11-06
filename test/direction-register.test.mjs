import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le registre de direction protège WOOD contre une copie de TealerLab', async () => {
  const register = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');
  assert.match(register, /logo officiel/);
  assert.match(register, /Aucune couleur TealerLab/);
  assert.match(register, /aucun texte, visuel, slogan, logo, asset ou placement exact n'est copié/);
  assert.match(register, /Pas de promotion, voucher, QR code, retrait en boutique/);
  assert.match(register, /sans bocal ni cloche/);
});

test('le registre référence les tokens et le mouvement accessibles', async () => {
  const register = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  for (const token of ['--bg:#101610', '--ink:#f1f0e6', '--lime:#cbf096', '--font:Arial,Helvetica,sans-serif']) {
    assert.match(stylesheet, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(register, /transform/, 'le mouvement doit rester composé');
  assert.match(register, /prefers-reduced-motion/, 'le mode mouvement réduit doit être prévu');
});

test('le parcours principal reste centré sur les contraintes commerciales WOOD', async () => {
  const register = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');
  const readiness = await readFile(new URL('../docs/validation/2026-11-05-local-readiness.md', import.meta.url), 'utf8');
  assert.match(register, /Parcours principal sous contraintes/);
  assert.match(register, /accueil → boutique fleurs → fiche produit → panier → checkout/);
  assert.match(register, /stocks, tarifs et disponibilité validés/);
  assert.match(readiness, /panier local synthétique non publié/);
  assert.match(readiness, /ni Supabase, ni Viva Wallet/);
});
