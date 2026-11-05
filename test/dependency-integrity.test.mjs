import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const functionsRoot = new URL('../supabase/functions/', import.meta.url);
const sourceFiles = [];

const collect = async (url) => {
  for (const entry of await readdir(url, { withFileTypes: true })) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, url);
    if (entry.isDirectory()) await collect(child);
    else if (/\.(?:mjs|ts|js)$/iu.test(entry.name)) sourceFiles.push(await readFile(child, 'utf8'));
  }
};
await collect(functionsRoot);

test('le site public n’a pas de dépendance npm runtime à dériver ou à auditer', () => {
  assert.deepEqual(packageJson.dependencies || {}, {});
  assert.deepEqual(packageJson.devDependencies || {}, {});
  assert.equal(packageJson.private, true);
});

test('les dépendances distantes des fonctions sont HTTPS et verrouillées sur une version', () => {
  const imports = sourceFiles.flatMap((source) => source.match(/https:\/\/[^\s"']+/giu) || []);
  assert.ok(imports.length > 0, 'aucune dépendance distante attendue n’a été trouvée');
  for (const url of imports) {
    assert.match(url, /^https:\/\//iu);
    if (/esm\.sh|jsdelivr\.net|unpkg\.com/iu.test(url)) {
      assert.match(url, /@\d+\.\d+\.\d+(?:["'/?#]|$)/u, `dépendance CDN non verrouillée : ${url}`);
    }
  }
});

test('aucun fichier public ne réintroduit un CDN non HTTPS ou un script distant non prévu', async () => {
  const entries = await readdir(new URL('../', import.meta.url), { withFileTypes: true });
  const pages = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.html'));
  for (const page of pages) {
    const source = await readFile(new URL(`../${page.name}`, import.meta.url), 'utf8');
    for (const script of source.match(/<script[^>]+src=["']([^"']+)["']/giu) || []) {
      assert.doesNotMatch(script, /http:\/\//iu, `${page.name} charge un script en HTTP`);
    }
  }
});
