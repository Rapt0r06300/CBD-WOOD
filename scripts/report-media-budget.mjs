import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicExtensions = new Set(['.html', '.css', '.js', '.mjs']);
const imagePattern = /assets\/[A-Za-z0-9._/-]+\.(?:png|jpe?g|webp|svg|gif)/giu;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.github-pages' || entry.name === 'output' || entry.name === 'test' || entry.name === 'scripts') continue;
    const pathname = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(pathname));
    else if (publicExtensions.has(entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase())) files.push(pathname);
  }
  return files;
}

const sources = await walk(root);
const references = new Set();
for (const source of sources) {
  const text = await readFile(source, 'utf8');
  for (const match of text.matchAll(imagePattern)) references.add(match[0]);
}

const assets = [];
for (const reference of [...references].sort()) {
  const pathname = join(root, reference.replaceAll('/', '\\'));
  try {
    const info = await stat(pathname);
    assets.push({ reference, bytes: info.size, ext: reference.slice(reference.lastIndexOf('.')).toLowerCase() });
  } catch {
    assets.push({ reference, bytes: null, ext: reference.slice(reference.lastIndexOf('.')).toLowerCase() });
  }
}
const valid = assets.filter(asset => asset.bytes !== null);
const missing = assets.filter(asset => asset.bytes === null);
const top = valid.filter(asset => asset.ext !== '.svg').sort((left, right) => right.bytes - left.bytes).slice(0, 12);
const pngReferences = valid.filter(asset => asset.ext === '.png');
const optimizedPngSiblings = pngReferences.filter(asset => references.has(asset.reference.replace(/\.png$/iu, '.webp')));
const formatBytes = bytes => `${(bytes / 1024).toFixed(1)} KiB`;

const lines = [
  '# WOOD — budget média démo',
  '',
  'Date : 7 novembre 2026  ',
  'Scope : références publiques du dépôt avant génération du paquet GitHub Pages.',
  '',
  `- Références image analysées : **${assets.length}**` ,
  `- Références résolues : **${valid.length}**`,
  `- Références manquantes : **${missing.length}**`,
  `- PNG encore référencés : **${pngReferences.length}**`,
  `- PNG possédant un WebP voisin : **${optimizedPngSiblings.length}**`,
  '',
  '## Plus lourds médias raster référencés',
  '',
  '| Fichier | Poids | Format |',
  '|---|---:|---|',
  ...top.map(asset => `| \`${asset.reference}\` | ${formatBytes(asset.bytes)} | ${asset.ext.slice(1).toUpperCase()} |`),
  '',
  '## Décisions',
  '',
  '- Les médias structurels de l’accueil qui possèdent déjà un WebP utilisent désormais le WebP : `wood-texture-dome`, `wood-campaign-collage`, `wood-jar-detail` et `wood-drop-studio`.',
  '- Les dimensions HTML, le chargement prioritaire du hero, les fallbacks et les labels `demo` restent inchangés.',
  '- Les PNG sources conservés hors référence publique ne sont pas supprimés : ils restent récupérables comme originaux maîtres.',
  '- Une photo réelle ne sera jamais optimisée ou publiée comme approuvée sans source, droits et validation WOOD.',
  '',
  '## Limites',
  '',
  '- Ce rapport est un budget statique ; il ne remplace pas une mesure Lighthouse ou appareil réel.',
  '- Safari iOS, réseau mobile réel, batterie et INP restent des validations externes.',
];
if (missing.length) {
  lines.push('', '## Références manquantes', '', ...missing.map(asset => `- \`${asset.reference}\``));
}
await writeFile(join(root, 'docs/validation/2026-11-07-media-budget.md'), `${lines.join('\n')}\n`);
console.log(`Media budget: ${valid.length} resolved, ${missing.length} missing, ${pngReferences.length} referenced PNG.`);
