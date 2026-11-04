import { cp, lstat, mkdir, mkdtemp, readdir, rename, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(root, 'dist-hostinger');

// Explicit allow-list: a future file is not published accidentally without a
// deliberate review of this deployment boundary.
const PUBLIC_FILES = [
  '.htaccess',
  '404.html',
  'account.js',
  'bien-etre.html',
  'boutique.css',
  'boutique.js',
  'checkout.html',
  'compte.html',
  'confirmation.html',
  'confirmation.js',
  'fleur.html',
  'fleurs.html',
  'flower-detail.js',
  'flower-pricing.js',
  'index.html',
  'mobile.css',
  'mobile-shell.js',
  'order-api.js',
  'order-options.js',
  'owner-dashboard.css',
  'owner-dashboard.js',
  'resines.html',
  'responsive.css',
  'storefront.js',
  'supabase-config.js',
  'wood-shop.html',
  'assets/accessoires.svg',
  'assets/botanique-wood.svg',
  'assets/cosmetiques.svg',
  'assets/favicon.svg',
  'assets/fleurs.svg',
  'assets/resines.svg',
  'assets/wood-mark.svg',
];

const expectedFiles = new Set(PUBLIC_FILES);

const collectFiles = async (directory, prefix = '') => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Lien symbolique refusé dans le paquet : ${relativePath}`);
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath, relativePath));
    else if (entry.isFile()) files.push(relativePath);
    else throw new Error(`Type de fichier refusé dans le paquet : ${relativePath}`);
  }
  return files;
};

const assertSourceFiles = async () => {
  for (const file of PUBLIC_FILES) {
    const source = join(root, file);
    const info = await lstat(source).catch(() => null);
    if (!info?.isFile() || info.isSymbolicLink()) {
      throw new Error(`Fichier public attendu absent ou invalide : ${file}`);
    }
  }
};

const assertExistingOutputIsGenerated = async () => {
  const info = await lstat(outputDir).catch(() => null);
  if (!info) return;
  if (!info.isDirectory() || info.isSymbolicLink()) {
    throw new Error(`La sortie ${relative(root, outputDir)} existe mais n’est pas un dossier généré sûr.`);
  }
  const existingFiles = await collectFiles(outputDir);
  const unexpected = existingFiles.filter((file) => !expectedFiles.has(file));
  if (unexpected.length) {
    throw new Error(`Sortie refusée : fichiers inattendus dans ${relative(root, outputDir)} : ${unexpected.join(', ')}`);
  }
};

await assertSourceFiles();
await assertExistingOutputIsGenerated();

const stagingDir = await mkdtemp(join(root, '.hostinger-release-'));
try {
  for (const file of PUBLIC_FILES) {
    const destination = join(stagingDir, file);
    await mkdir(dirname(destination), { recursive: true });
    await cp(join(root, file), destination);
  }

  const stagedFiles = new Set(await collectFiles(stagingDir));
  const missing = PUBLIC_FILES.filter((file) => !stagedFiles.has(file));
  const unexpected = [...stagedFiles].filter((file) => !expectedFiles.has(file));
  if (missing.length || unexpected.length) {
    throw new Error(`Vérification du paquet échouée. Manquants : ${missing.join(', ')}. Inattendus : ${unexpected.join(', ')}.`);
  }

  await rm(outputDir, { recursive: true, force: true });
  await rename(stagingDir, outputDir);
  console.log(`Paquet Hostinger préparé dans ${relative(root, outputDir)}.`);
  console.log(`Fichiers publics copiés : ${PUBLIC_FILES.length}.`);
  console.log('À envoyer : le contenu de dist-hostinger dans public_html, pas le dossier parent.');
} finally {
  await rm(stagingDir, { recursive: true, force: true });
}
