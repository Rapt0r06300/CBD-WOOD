import assert from 'node:assert/strict';
import test from 'node:test';
import { MEDIA_STATES, getMediaLabel, normalizeMediaState } from '../media-status.mjs';

test('le contrat média expose quatre états ordonnés et des libellés honnêtes', () => {
  assert.deepEqual(MEDIA_STATES, ['demo', 'prepared', 'approved', 'real-photo']);
  assert.equal(normalizeMediaState('demo'), 'demo');
  assert.equal(normalizeMediaState('prepared'), 'prepared');
  assert.equal(normalizeMediaState('approved', { src: 'assets/approved.webp' }), 'approved');
  assert.equal(normalizeMediaState('real-photo', { src: 'assets/real-photo.webp' }), 'real-photo');
  assert.equal(normalizeMediaState('unknown'), 'demo');
  assert.equal(getMediaLabel('demo'), 'Photo démo');
  assert.equal(getMediaLabel('prepared'), 'Média préparé');
  assert.equal(getMediaLabel('approved'), 'Photo approuvée');
  assert.equal(getMediaLabel('real-photo'), 'Photo réelle');
});

test('un média non fourni ou invalide revient à un état démo', () => {
  assert.equal(normalizeMediaState('approved', { src: '' }), 'demo');
  assert.equal(normalizeMediaState('real-photo', { src: 'https://example.com/photo.webp' }), 'real-photo');
  assert.equal(normalizeMediaState(undefined, { src: 'assets/flowers/fleurs-ivory.webp' }), 'demo');
});
