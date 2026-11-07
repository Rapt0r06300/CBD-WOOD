import { cp, lstat, mkdir, mkdtemp, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(root, 'dist-hostinger');
const optimizedMedia = new Map([
  ['assets/editorial/wood-hero-cloche.png', 'assets/editorial/wood-hero-cloche.webp'],
  ['assets/editorial/wood-campaign-collage.webp', 'assets/editorial/wood-campaign-collage.webp'],
  ['assets/editorial/wood-drop-studio.webp', 'assets/editorial/wood-drop-studio.webp'],
  ['assets/editorial/wood-jar-detail.webp', 'assets/editorial/wood-jar-detail.webp'],
  ['assets/editorial/wood-texture-dome.webp', 'assets/editorial/wood-texture-dome.webp'],
]);
const rewriteOptimizedMedia = (html) => [...optimizedMedia.entries()].reduce(
  (result, [source, optimized]) => result.replaceAll(source, optimized),
  html,
);

// Explicit allow-list: a future file is not published accidentally without a
// deliberate review of this deployment boundary.
const PUBLIC_FILES = [
  '.htaccess',
  '404.html',
  'account.js',
  'bien-etre.html',
  'boutique.css',
  'boutique.js',
  'catalog-demo-hydration.js',
  'checkout.html',
  'demo-mode.js',
  'wood-d1-adapter.js',
  'wood-advisor-data.js',
  'wood-advisor-lexicon.js',
  'wood-advisor-engine.js',
  'wood-advisor.js',
  'wood-advisor.css',
  'wood-badge-engine.js',
  'wood-badges.css',
  'contact.html',
  'checkout-required.js',
  'compte.html',
  'confirmation.html',
  'confirmation.js',
  'fleur.html',
  'fleurs.html',
  'produit.html',
  'flower-presentation.js',
  'flower-detail.js',
  'home-selection.css',
  'home-engagement.css',
  'wood-graffiti.css',
  'wood-editorial.css',
  'wood-faq-search.js',
  'wood-motion.css',
  'wood-catalog-demo.css',
  'wood-catalog-search.css',
  'wood-catalog-search.js',
  'wood-product-actions.css',
  'wood-product-actions.js',
  'wood-contact-prefill.js',
  'wood-compare.css',
  'wood-compare.js',
  'wood-runway.css',
  'wood-mobile-finish.css',
  'wood-contact.css',
  'wood-detail-accents.css',
  'mood-selector.js',
  'github-pages-switch.js',
  'github-pages-switch.css',
  'product-detail.js',
  'flower-pricing.js',
  'index.html',
  'mobile.css',
  'mobile-shell.js',
  'wood-engagement.js',
  'wood-motion.js',
  'wood-campaigns.js',
  'wood-mobile-finish.js',
  'order-api.js',
  'order-options.js',
  'owner-dashboard.css',
  'owner-dashboard.js',
  'owner-media.mjs',
  'owner-product-validation.mjs',
  'resines.html',
  'responsive.css',
  'storefront.js',
  'supabase-config.js',
  'turnstile-client.js',
  'wood-shop.html',
  'assets/accessoires.svg',
  'assets/botanique-wood.svg',
  'assets/cosmetiques.svg',
  'assets/favicon.svg',
  'assets/fleurs.svg',
  'assets/resines.svg',
  'assets/wood-mark.svg',
  'assets/editorial/wood-hero-cloche.webp',
  'assets/editorial/wood-campaign-collage.webp',
  'assets/editorial/wood-drop-studio.webp',
  'assets/editorial/wood-jar-detail.webp',
  'assets/editorial/wood-texture-dome.webp',
  'assets/editorial/wood-resin-concept-01.webp',
  'assets/editorial/wood-resin-concept-02.webp',
  'assets/editorial/wood-resin-concept-03.webp',
  'assets/graffiti/wood-arrow.svg',
  'assets/graffiti/wood-star.svg',
  'assets/graffiti/wood-halo.svg',
  'assets/graffiti/wood-tag.svg',
  'assets/graffiti/wood-speed-line.svg',
  'assets/graffiti/wood-botanical-sticker.svg',
  'assets/graffiti/wood-section-stamp.svg',
  'assets/graffiti/wood-card-accent.svg',
  'assets/graffiti/wood-advisor-bubble.svg',
  'assets/graffiti/wood-badge-soft.svg',
  'assets/graffiti/wood-badge-intense.svg',
  'assets/graffiti/wood-badge-aroma.svg',
  'assets/graffiti/wood-burst.svg',
  'assets/graffiti/wood-scribble.svg',
  'assets/graffiti/wood-zigzag.svg',
  'assets/graffiti/wood-smiley.svg',
  'assets/graffiti/wood-crown.svg',
  'assets/graffiti/wood-splash.svg',
  'assets/graffiti/wood-loop-arrow.svg',
  'assets/graffiti/wood-sticker-good.svg',
  'assets/graffiti/wood-lightning.svg',
  'assets/graffiti/wood-check.svg',
  'assets/graffiti/wood-comic-sprite.webp',
  'assets/graffiti/wood-sun.svg',
  'assets/graffiti/wood-underline.svg',
  'assets/flowers/fleurs-bloody-mary.webp',
  'assets/flowers/fleurs-charlotte.webp',
  'assets/flowers/fleurs-cosmic-cbg.webp',
  'assets/flowers/fleurs-euphoria.webp',
  'assets/flowers/fleurs-fanta-hazy.webp',
  'assets/flowers/fleurs-ivory.webp',
  'assets/flowers/fleurs-nimbus-3000.webp',
  'assets/flowers/fleurs-orange-bud.webp',
  'assets/flowers/fleurs-pastraweed.webp',
  'assets/flowers/fleurs-plutonium.webp',
  'assets/flowers/fleurs-purple.webp',
  'assets/flowers/fleurs-rainbow.webp',
  'assets/flowers/fleurs-velvet-kush.webp',
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
    if (file.endsWith('.html')) {
      await writeFile(destination, rewriteOptimizedMedia(await readFile(join(root, file), 'utf8')), 'utf8');
    } else {
      await cp(join(root, file), destination);
    }
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
