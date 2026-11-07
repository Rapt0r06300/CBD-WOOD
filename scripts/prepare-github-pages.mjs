import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist-hostinger');
const output = join(root, '.github-pages');
const demoRoot = join(output, 'demo');
const baseRoot = join(output, 'base');
const switchScript = 'github-pages-switch.js';
const switchStyles = 'github-pages-switch.css';
const optimizedMedia = new Map([
  ['assets/editorial/wood-hero-cloche.png', 'assets/editorial/wood-hero-cloche.webp'],
  ['assets/editorial/wood-campaign-collage.png', 'assets/editorial/wood-campaign-collage.webp'],
  ['assets/editorial/wood-drop-studio.png', 'assets/editorial/wood-drop-studio.webp'],
  ['assets/editorial/wood-jar-detail.png', 'assets/editorial/wood-jar-detail.webp'],
  ['assets/editorial/wood-texture-dome.png', 'assets/editorial/wood-texture-dome.webp'],
]);

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

const gitFile = (path) => execFileSync('git', ['show', `origin/main:${path}`], {
  cwd: root,
  encoding: 'buffer',
  maxBuffer: 16 * 1024 * 1024,
});

// The demo remains reachable through its dedicated /demo/ URL, but the
// Base/Demo switcher is intentionally hidden from the storefront header.
const injectSwitcher = (html) => html;
const injectDemoMode = (html) => {
  let result = html;
  if (!result.includes('demo-mode.js')) {
    result = result.replace('</head>', '  <script src="demo-mode.js?v=wood-demo-lock-v1-20261107"></script>\n</head>');
  }
  if (!result.includes('wood-d1-adapter.js')) {
    result = result.replace('</head>', '  <script src="wood-d1-adapter.js?v=wood-d1-adapter-v1-20261107"></script>\n</head>');
  }
  return result;
};
const advisorExcludedPages = new Set(['checkout.html', 'compte.html', 'confirmation.html', 'contact.html']);
const injectAdvisor = (html, file) => {
  if (advisorExcludedPages.has(file) || html.includes('wood-advisor.js')) return html;
  let result = html;
  if (!result.includes('wood-advisor.css')) {
    result = result.replace('</head>', '  <link rel="stylesheet" href="wood-advisor.css?v=wood-advisor-v1-20261107">\n</head>');
  }
  const scripts = [
    'wood-advisor-data.js?v=wood-advisor-data-v1-20261107',
    'wood-advisor-engine.js?v=wood-advisor-engine-v1-20261107',
    'wood-advisor.js?v=wood-advisor-v1-20261107',
  ];
  const tags = scripts.map((script) => `  <script src="${script}"></script>`).join('\n');
  return result.replace('</body>', `${tags}\n</body>`);
};
const rewriteOptimizedMedia = (html) => [...optimizedMedia.entries()].reduce(
  (result, [source, optimized]) => result.replaceAll(source, optimized),
  html,
);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, demoRoot, { recursive: true });

const demoFiles = await collectFiles(demoRoot);
for (const file of demoFiles) {
  if (!file.endsWith('.html')) continue;
  const path = join(demoRoot, file);
  await writeFile(path, rewriteOptimizedMedia(injectAdvisor(injectDemoMode(injectSwitcher(await readFile(path, 'utf8'))), file)), 'utf8');
}

await mkdir(baseRoot, { recursive: true });
for (const file of demoFiles) {
  if (!gitFileExists(file)) continue;
  const content = file.endsWith('.html')
    ? rewriteOptimizedMedia(injectSwitcher(gitFile(file).toString('utf8')))
    : gitFile(file);
  const destination = join(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

await cp(join(demoRoot, switchScript), join(output, switchScript));
await cp(join(demoRoot, switchStyles), join(output, switchStyles));

await writeFile(join(baseRoot, 'index.html'), `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0;url=../">
  <title>WOOD — version de base</title>
</head>
<body>
  <p>Redirection vers la <a href="../">version de base de WOOD</a>.</p>
</body>
</html>
`, 'utf8');
await writeFile(join(baseRoot, 'README.md'), '# WOOD base\n\nAlias léger vers la version de base servie à la racine.\n', 'utf8');

await writeFile(join(output, '.nojekyll'), '', 'utf8');
await writeFile(join(output, 'README.md'), '# WOOD GitHub Pages\n\nLa racine sert la version de base. La démo complète est disponible dans `demo/`.\nLe chemin `base/` reste un alias léger vers la racine.\n', 'utf8');
console.log(`GitHub Pages préparé dans ${relative(root, output)} : base ${await collectFiles(output).then(files => files.length)} fichiers, démo ${demoFiles.length} fichiers, alias base ${await collectFiles(baseRoot).then(files => files.length)} fichiers.`);
