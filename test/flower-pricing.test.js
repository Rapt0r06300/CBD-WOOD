const assert = require('node:assert/strict');
const test = require('node:test');

const { calculateFlowerPrice } = require('../flower-pricing.js');

const nimbusTiers = [
  { grams: 1, price: 15 },
  { grams: 3, price: 42 },
  { grams: 5, price: 70 },
  { grams: 10, price: 130 },
  { grams: 25, price: 260 },
];

test('uses the exact poster price for an official gram tier', () => {
  assert.equal(calculateFlowerPrice(3, nimbusTiers).price, 42);
  assert.equal(calculateFlowerPrice(5, nimbusTiers).price, 70);
  assert.equal(calculateFlowerPrice(25, nimbusTiers).price, 260);
});

test('composes an intermediate gram amount from the cheapest poster tiers', () => {
  assert.equal(calculateFlowerPrice(2, nimbusTiers).price, 30);
  assert.equal(calculateFlowerPrice(4, nimbusTiers).price, 57);
  assert.equal(calculateFlowerPrice(6, nimbusTiers).price, 84);
});

test('does not extend the 25 gram discount to a larger single tier', () => {
  assert.deepEqual(calculateFlowerPrice(26, nimbusTiers), {
    price: 275,
    packCount: 2,
    breakdown: [25, 1],
  });
  assert.deepEqual(calculateFlowerPrice(50, nimbusTiers), {
    price: 520,
    packCount: 2,
    breakdown: [25, 25],
  });
});
