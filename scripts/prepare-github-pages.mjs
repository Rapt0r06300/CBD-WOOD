import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist-hostinger');
const output = join(root, '.github-pages');
const legacyRoot = join(output, 'base');
const switchScript = 'github-pages-switch.js';
const switchStyles = 'github-pages-switch.css';

const collectFiles = async (directory, prefix = '') => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute, path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
};

const gitFileExists = (path) => {
  try {
    execFileSync('git', ['cat-file', '-e', `origin/main:${path}`], { cwd: root, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const gitFile = (path) => execFileSync('git', ['show', `origin/main:${path}`], { cwd: root, encoding: 'buffer' });

const injectSwitcher = (html) => html.includes(switchScript)
  ? html
  : html.replace(/<\/body>/iu, `  <script src="${switchScript}?v=wood-pages-switch-v1-20261106"></script>\n</body>`);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

const demoFiles = await collectFiles(output);
for (const file of demoFiles) {
  if (!file.endsWith('.html')) continue;
  const path = join(output, file);
  await writeFile(path, injectSwitcher(await readFile(path, 'utf8')), 'utf8');
}

await mkdir(legacyRoot, { recursive: true });
for (const file of demoFiles) {
  if (!gitFileExists(file)) continue;
  const destination = join(legacyRoot, file);
  await mkdir(dirname(destination), { recursive: true });
  const content = file.endsWith('.html') ? injectSwitcher(gitFile(file).toString('utf8')) : gitFile(file);
  await writeFile(destination, content);
}

await cp(join(output, switchScript), join(legacyRoot, switchScript));
await cp(join(output, switchStyles), join(legacyRoot, switchStyles));

await writeFile(join(output, '.nojekyll'), '', 'utf8');
await writeFile(join(output, 'README.md'), '# WOOD GitHub Pages\n\nLa racine sert la démo. La version de base est disponible dans `base/`.\n', 'utf8');
console.log(`GitHub Pages préparé dans ${relative(root, output)} : démo ${demoFiles.length} fichiers, base ${await collectFiles(legacyRoot).then(files => files.length)} fichiers.`);
