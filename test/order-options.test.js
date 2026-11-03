const assert = require('node:assert/strict');
const test = require('node:test');

const { getOrderModes, getOrderMode, getPurchaseNotice } = require('../order-options.js');

test('offers delivery only', () => {
  assert.deepEqual(getOrderModes().map(mode => mode.id), ['delivery']);
  assert.equal(getOrderMode('delivery').label, 'Livraison');
  assert.equal(getOrderMode('barla'), null);
  assert.equal(getOrderMode('borriglione'), null);
});

test('returns no order mode for an unknown choice', () => {
  assert.equal(getOrderMode('unknown'), null);
});

test('explains that home delivery is available before purchase', () => {
  assert.match(getPurchaseNotice(), /Livraison/);
  assert.doesNotMatch(getPurchaseNotice(), /Barla|Borriglione/);
});
