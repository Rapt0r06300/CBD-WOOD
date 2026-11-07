import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = (await readdir('.')).filter(name => name.endsWith('.html'));
const forbidden = /(?:https?:\/\/|googletagmanager|google-analytics|facebook\.net|klaviyo|intercom|crisp|tawk|hotjar|segment)/iu;

test('les scripts publics de la démo sont locaux et justifiés', async () => {
  for (const page of pages) {
    const source = await readFile(page, 'utf8');
    for (const src of source.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/giu)) {
      assert.doesNotMatch(src[1], forbidden, page + ': ' + src[1]);
      assert.doesNotMatch(src[1], /(?:site-versions|\.headless-public-runway-final|dist-hostinger)/iu, page + ': paquet généré dans la source');
    }
  }
});
