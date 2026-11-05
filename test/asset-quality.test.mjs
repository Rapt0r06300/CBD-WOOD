import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '..');
const presentation = require('../flower-presentation.js');

const dimensions = (bytes) => {
  const signature = Buffer.from(bytes.subarray(0, 4)).toString('ascii');
  if (signature === '\x89PNG') {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  assert.equal(Buffer.from(bytes.subarray(0, 4)).toString('ascii'), 'RIFF');
  assert.equal(Buffer.from(bytes.subarray(8, 12)).toString('ascii'), 'WEBP');
  const chunk = Buffer.from(bytes.subarray(12, 16)).toString('ascii');
  if (chunk === 'VP8 ') {
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === 'VP8X') {
    const width = 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16);
    const height = 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16);
    return { width, height };
  }
  throw new Error('Format WebP non pris en charge dans le contrôle local : ' + chunk);
};

test('les 13 visuels de démonstration ont un format et un poids mobiles sûrs', async () => {
  for (const entry of Object.values(presentation.all())) {
    const path = resolve(root, entry.image);
    const [bytes, info] = await Promise.all([readFile(path), stat(path)]);
    assert.ok(info.size >= 30_000, entry.name + ' est anormalement léger');
    assert.ok(info.size <= 150_000, entry.name + ' est trop lourd pour une carte mobile');
    const size = dimensions(bytes);
    assert.ok(size.width >= 512 && size.height >= 512, entry.name + ' est trop petit');
    assert.ok(Math.abs(size.width - size.height) <= 2, entry.name + ' doit rester carré pour la carte');
  }
});
