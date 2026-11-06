import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const versionsRoot = join(root, 'site-versions');
const demoSource = join(root, 'dist-hostinger');
const demoTarget = join(versionsRoot, 'demo', 'public');
const legacyTarget = join(versionsRoot, 'legacy', 'public');

const collectFiles = async (directory, prefix = '') => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath, relativePath));
    else if (entry.isFile()) files.push(relativePath);
  }
  return files.sort();
};

await mkdir(demoTarget, { recursive: true });
await mkdir(legacyTarget, { recursive: true });
await cp(demoSource, demoTarget, { recursive: true, force: true });

const tracked = new Set(execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean));
const demoFiles = await collectFiles(demoTarget);
for (const file of demoFiles) {
  if (!tracked.has(file)) continue;
  const destination = join(legacyTarget, file);
  await mkdir(dirname(destination), { recursive: true });
  const content = execFileSync('git', ['show', `HEAD:${file}`], { cwd: root, encoding: 'buffer' });
  await writeFile(destination, content);
}

const readme = `# WOOD site versions\n\n- legacy: snapshot of the tracked site before the local demo changes.\n- demo: current local demo package.\n\nThese folders are local rollback material and are never included in the Hostinger public allow-list.\n`;
await writeFile(join(versionsRoot, 'README.md'), readme, 'utf8');
await writeFile(join(versionsRoot, '.active-version'), 'demo\n', 'utf8');
await writeFile(join(versionsRoot, '.active-manifest.json'), `${JSON.stringify(demoFiles, null, 2)}\n`, 'utf8');

console.log(`Snapshots créés : demo ${demoFiles.length} fichiers, legacy ${[...tracked].filter(file => demoFiles.includes(file)).length} fichiers.`);
