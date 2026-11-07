import { access, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = join(root, '.github-pages');
const read = file => readFile(join(output, file), 'utf8');
const required = ['index.html', 'demo/index.html', 'demo/fleurs.html', 'fleurs.html', 'README.md'];
for (const file of required) await access(join(output, file));
const baseHome = await read('index.html');
const demoHome = await read('demo/index.html');
const baseCatalog = await read('fleurs.html');
const demoCatalog = await read('demo/fleurs.html');
if (/demo-mode\.js|wood-d1-adapter\.js/iu.test(baseHome) || /demo-mode\.js|wood-d1-adapter\.js/iu.test(baseCatalog)) throw new Error('La racine GitHub Pages contient un garde-fou démo.');
if (!/demo-mode\.js/iu.test(demoHome) || !/demo-mode\.js/iu.test(demoCatalog)) throw new Error('Le chemin /demo ne contient pas le garde-fou démo.');
if (baseHome === demoHome || baseCatalog === demoCatalog) throw new Error('La base et la démo sont identiques.');
console.log('GitHub Pages package: base root isolated, demo /demo isolated.');
