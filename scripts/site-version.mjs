import { cp, lstat, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const versionsRoot = join(root, 'site-versions');
const activeManifestPath = join(versionsRoot, '.active-manifest.json');
const activeVersionPath = join(versionsRoot, '.active-version');
const validVersions = new Set(['legacy', 'demo']);

const collectFiles = async (directory, prefix = '') => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Lien symbolique refusé dans une version : ${relativePath}`);
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath, relativePath));
    else if (entry.isFile()) files.push(relativePath);
    else throw new Error(`Type de fichier refusé dans une version : ${relativePath}`);
  }
  return files.sort();
};

const safeRootPath = (relativePath) => {
  const target = resolve(root, relativePath);
  const rootPrefix = `${root}${sep}`;
  if (!target.startsWith(rootPrefix) || relativePath.startsWith('site-versions/')) {
    throw new Error(`Chemin de version refusé : ${relativePath}`);
  }
  return target;
};

const readJson = async (path, fallback) => {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
};

const usage = () => {
  console.log('Usage : npm run site:status | npm run site:demo | npm run site:legacy');
};

const [command = 'status'] = process.argv.slice(2);
if (!['status', 'activate', 'demo', 'legacy'].includes(command)) {
  usage();
  process.exitCode = 2;
} else if (command === 'status') {
  const active = await readFile(activeVersionPath, 'utf8').catch(() => 'unknown');
  console.log(`Version locale active : ${active.trim() || 'inconnue'}`);
} else {
  const requestedVersion = command === 'activate' ? process.argv[3] : command;
  if (!validVersions.has(requestedVersion)) {
    usage();
    throw new Error(`Version inconnue : ${requestedVersion}`);
  }

  const publicRoot = join(versionsRoot, requestedVersion, 'public');
  const versionInfo = await lstat(publicRoot).catch(() => null);
  if (!versionInfo?.isDirectory() || versionInfo.isSymbolicLink()) {
    throw new Error(`Snapshot de version absent : ${relative(root, publicRoot)}`);
  }

  const nextFiles = await collectFiles(publicRoot);
  const previousFiles = await readJson(activeManifestPath, []);
  if (!Array.isArray(previousFiles)) throw new Error('Manifeste de version actif invalide.');

  for (const file of previousFiles) await rm(safeRootPath(file), { force: true });
  for (const file of nextFiles) {
    const destination = safeRootPath(file);
    await mkdir(dirname(destination), { recursive: true });
    await cp(join(publicRoot, file), destination);
  }

  await mkdir(versionsRoot, { recursive: true });
  await writeFile(activeManifestPath, `${JSON.stringify(nextFiles, null, 2)}\n`, 'utf8');
  await writeFile(activeVersionPath, `${requestedVersion}\n`, 'utf8');
  console.log(`Version locale activée : ${requestedVersion}`);
  console.log('Aucun déploiement distant n’a été effectué.');
}
