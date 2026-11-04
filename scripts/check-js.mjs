import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const ignored = new Set(['.git', '.fallow', '.superpowers', 'node_modules', 'test-results']);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(path));
    else if (entry.isFile() && entry.name.endsWith('.js')) files.push(path);
  }
  return files;
}

const files = await collect(root);
const failures = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const isModule = /^\s*(?:import|export)\b/m.test(source);
  const args = isModule ? ['--check', '--input-type=module'] : ['--check', file];
  const result = spawnSync(process.execPath, args, { encoding: 'utf8', input: isModule ? source : undefined });
  if (result.status !== 0) failures.push({ file: relative(root, file), output: result.stderr.trim() });
}

if (failures.length) {
  for (const failure of failures) console.error(`${failure.file}\n${failure.output}`);
  process.exit(1);
}
console.log(`JavaScript syntax: OK (${files.length} files)`);
