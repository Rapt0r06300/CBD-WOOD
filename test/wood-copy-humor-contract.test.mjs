import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat de micro-copy garde l’humour optionnel et les messages sensibles littéraux', async () => {
  const contract = await readFile(new URL('../docs/design/wood-copy-humor-contract.md', import.meta.url), 'utf8');
  const microcopy = await readFile(new URL('../docs/design/wood-microcopy.md', import.meta.url), 'utf8');
  const content = await readFile(new URL('../docs/design/wood-content-data-contract.md', import.meta.url), 'utf8');
  const guardrails = await readFile(new URL('../test/public-visual-guardrails.test.mjs', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Lexique sensible et humour',
    'États, fallback et suppression',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  for (const phrase of ['Découvrir WOOD', 'Ajouter au panier', 'Réessayer', 'Votre panier est vide.', 'Livraison à domicile disponible']) {
    assert.match(microcopy, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(microcopy, /prix en euros, grammage en grammes, disponibilité, livraison, paiement et erreurs ne portent ni emoji ni humour/iu);
  assert.match(microcopy, /Aucune phrase ne promet un effet, une qualité, un délai, un tarif, une promotion ou un paiement/iu);
  assert.match(microcopy, /Pas de bénéfice médical, d.?effet garanti, de faux avis/iu);
  assert.match(content, /Les accents graphiques restent séparés du prix, du stock, du paiement, de la livraison, des erreurs et du légal/iu);
  assert.match(guardrails, /promotion|widget|popup/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
