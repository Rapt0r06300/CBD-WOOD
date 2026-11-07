import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('les données structurées de la démo restent limitées aux informations vérifiées', () => {
  const raw = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u)?.[1];
  assert.ok(raw, 'Le balisage Store doit être présent sur la page d’accueil');
  const data = JSON.parse(raw);
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'Store');
  assert.equal(data.name, 'CBD Nice - Wood Shop Barla');
  assert.equal(data.address.streetAddress, '7 rue Barla');
  assert.equal(data.address.postalCode, '06300');
  assert.equal(data.address.addressLocality, 'Nice');
  assert.equal(data.telephone, '+33422163570');
  assert.equal(data.email, 'woodcbdshop@gmail.com');
  assert.equal(data.openingHoursSpecification, undefined);
  assert.equal(data.aggregateRating, undefined);
  assert.equal(data.review, undefined);
  assert.doesNotMatch(raw, /TealerLab|5\/5|avis|review|aggregateRating/iu);
});
