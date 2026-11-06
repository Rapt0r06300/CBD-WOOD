import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat livraison WOOD reste livraison-only, annoncé et corrigeable', async () => {
  const contract = await readFile(new URL('../docs/design/wood-delivery-contract.md', import.meta.url), 'utf8');
  const options = await readFile(new URL('../order-options.js', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');
  const required = await readFile(new URL('../checkout-required.js', import.meta.url), 'utf8');
  const validation = await readFile(new URL('../supabase/functions/create-pending-order/validation.mjs', import.meta.url), 'utf8');
  const migration = await readFile(new URL('../supabase/migrations/20261105231000_delivery_only_order_function.sql', import.meta.url), 'utf8');
  const schema = await readFile(new URL('../supabase/migrations/20261105230000_delivery_only_schema_guard.sql', import.meta.url), 'utf8');
  const functionBody = migration.split('as $$', 2)[1].split('$$;', 1)[0];

  for (const heading of [
    'Périmètre et source de vérité',
    'Annonce avant achat et parcours',
    'Adresse, validation et persistance',
    'États, erreurs et fallback',
    'Sécurité, conformité et limites externes',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(options, /id: 'delivery'/);
  assert.match(options, /getOrderModes\(\)\.map|function getOrderModes/);
  assert.doesNotMatch(options, /barla|borriglione|retrait/i);
  assert.match(options, /Livraison disponible à domicile/);
  assert.match(checkout, /Livraison à domicile/);
  assert.doesNotMatch(checkout, /Retrait à|retrait en magasin/i);
  assert.match(boutique, /delivery_address_details/);
  assert.match(boutique, /fulfillment_mode: mode\.id/);
  assert.match(boutique, /catch \(error\)/);
  assert.match(boutique, /button\.disabled = false/);
  assert.match(required, /orderName/);
  assert.match(required, /orderPhone/);
  assert.match(required, /aria-required/);
  assert.match(validation, /normalizeDeliveryAddress/);
  assert.match(validation, /delivery_address_details/);
  assert.match(validation, /Nom complet nécessaire/);
  assert.match(validation, /Téléphone nécessaire/);
  assert.match(functionBody, /v_fulfillment_mode <> 'delivery'/);
  assert.doesNotMatch(functionBody, /pickup_code|barla|borriglione|retrait/i);
  assert.match(schema, /orders_fulfillment_mode_delivery_check/);
  assert.match(schema, /check \(pickup_code is null\)/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
