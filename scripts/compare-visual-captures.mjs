import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

const readArgs = (argv) => {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith('--')) continue;
    values[argument.slice(2)] = argv[index + 1];
    index += 1;
  }
  return values;
};

export async function compareVisualCaptures({ referenceDir, currentDir, manifestPath }) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const result = { expected: manifest.captures.length, missing: [], changed: [], unchanged: [] };

  for (const capture of manifest.captures) {
    const referencePath = join(referenceDir, capture.file);
    const currentPath = join(currentDir, capture.file);
    try {
      const [reference, current] = await Promise.all([readFile(referencePath), readFile(currentPath)]);
      if (reference.length === 0 || current.length === 0) {
        result.missing.push(capture.file);
      } else if (sha256(reference) === sha256(current)) {
        result.unchanged.push(capture.file);
      } else {
        result.changed.push(capture.file);
      }
    } catch {
      result.missing.push(capture.file);
    }
  }

  return { ...result, ok: result.missing.length === 0 && result.changed.length === 0 };
}

const args = readArgs(process.argv.slice(2));
if (args.reference && args.current && args.manifest) {
  const result = await compareVisualCaptures({
    referenceDir: resolve(args.reference),
    currentDir: resolve(args.current),
    manifestPath: resolve(args.manifest),
  });
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}
