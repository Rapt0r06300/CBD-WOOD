import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const publicExtensions = new Set(['.html', '.js', '.css']);
const silentTrackerPattern = /(?:gtag\s*\(|google-analytics|googletagmanager|facebook\.net|fbq\s*\(|connect\.facebook|clarity\.ms|hotjar|plausible\.io|matomo|segment\.com|intercom|crisp\.chat|tawk\.to)/iu;
const cookiePattern = /(?:document\.cookie|navigator\.sendBeacon\s*\()/iu;

const files = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && publicExtensions.has(extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

const sources = await Promise.all(files.map(async (file) => [file, await readFile(new URL(file, root), 'utf8')]));

test('aucun traceur tiers ou cookie navigateur n’est chargé silencieusement', () => {
  for (const [file, source] of sources) {
    assert.doesNotMatch(source, silentTrackerPattern, `${file} charge un traceur tiers non déclaré`);
    assert.doesNotMatch(source, cookiePattern, `${file} utilise un cookie ou beacon sans mécanisme de consentement`);
  }
});

test('les scripts de pages restent locaux ou explicitement autorisés', () => {
  for (const [file, source] of sources.filter(([name]) => name.endsWith('.html'))) {
    for (const match of source.matchAll(/<script[^>]+src=["']([^"']+)["']/giu)) {
      const src = match[1];
      assert.ok(
        src.startsWith('./') || src.startsWith('/') || !/^(?:https?:)?\/\//iu.test(src),
        `${file} référence un script distant non documenté : ${src}`,
      );
    }
  }
});
