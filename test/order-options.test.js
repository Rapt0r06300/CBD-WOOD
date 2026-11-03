const assert = require('node:assert/strict');
const test = require('node:test');

const { getOrderModes, getOrderMode, getPurchaseNotice } = require('../order-options.js');

test('offers delivery and both WOOD pickup locations', () => {
  assert.deepEqual(getOrderModes().map(mode => mode.id), ['delivery', 'barla', 'borriglione']);
  assert.equal(getOrderMode('delivery').label, 'Livraison');
  assert.equal(getOrderMode('barla').address, '7 rue Barla, 06300 Nice');
  assert.equal(getOrderMode('borriglione').address, '16 avenue Alfred Borriglione, 06100 Nice');
});

test('returns no order mode for an unknown choice', () => {
  assert.equal(getOrderMode('unknown'), null);
});

test('explains the available delivery and pickup options before purchase', () => {
  assert.match(getPurchaseNotice(), /Livraison/);
  assert.match(getPurchaseNotice(), /Barla/);
  assert.match(getPurchaseNotice(), /Borriglione/);
});
