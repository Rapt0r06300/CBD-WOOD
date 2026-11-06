import { readFile, readdir } from 'node:fs/promises';
import { join, posix, relative, resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist-hostinger');
const requiredFiles = ['index.html', '404.html', '.htaccess', 'assets/favicon.svg'];
const forbiddenPathPattern = /^(?:supabase|test|docs|scripts|\.git)(?:[\\/]|$)|(?:^|[\\/])(?:package\.json|netlify\.toml|README\.md|admin(?:\.html|\.js|\.css)?)$/i;
const forbiddenTextPattern = /(?:localhost|127\.0\.0\.1|github\.io|netlify\.app|hostingersite\.com|SUPABASE_SERVICE_ROLE_KEY|TURNSTILE_SECRET_KEY|VIVA_(?:SECRET|API_KEY|TOKEN)|service_role)/i;
const textExtensions = new Set(['.html', '.js', '.css', '.htaccess']);

const failures = [];
const fail = (message) => failures.push(message);

const collect = async (directory, prefix = '') => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isSymbolicLink()) fail(`Lien symbolique interdit : ${path}`);
    else if (entry.isDirectory()) files.push(...await collect(absolutePath, path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
};

try {
  const files = await collect(root);
  for (const required of requiredFiles) {
    if (!files.includes(required)) fail(`Fichier requis absent : ${required}`);
  }
  for (const file of files) {
    if (forbiddenPathPattern.test(file)) fail(`Chemin interdit dans le paquet : ${file}`);
    if (/(?:^|[\\/])admin(?:\.html|\.js|\.css)?$/i.test(file)) fail(`Route admin publique interdite dans le paquet : ${file}`);
    const extension = file === '.htaccess' ? '.htaccess' : file.slice(file.lastIndexOf('.')).toLowerCase();
    if (textExtensions.has(extension)) {
      const source = await readFile(join(root, file), 'utf8');
      if (forbiddenTextPattern.test(source)) fail(`Référence ou secret interdit dans le paquet : ${file}`);
      const httpUrls = source.match(/http:\/\/[^\s"'<>\\)]+/gi) || [];
      if (httpUrls.some((url) => !url.startsWith('http://www.w3.org/'))) {
        fail(`URL HTTP non sécurisée dans le paquet : ${file}`);
      }
      if (extension === '.html') {
        const localReferences = [...source.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/giu)]
          .map((match) => match[1])
          .filter((reference) => reference && !/^(?:#|https?:|\/\/|data:|blob:|mailto:|tel:|javascript:)/iu.test(reference));
        const normalizedFile = file.replaceAll('\\', '/');
        const base = posix.dirname(normalizedFile);
        for (const reference of localReferences) {
          const cleanReference = reference.split(/[?#]/u, 1)[0];
          if (!cleanReference) continue;
          const referenceBase = cleanReference.startsWith('/') ? '' : base;
          const requestedPath = cleanReference.replace(/^\/+/, '');
          const resolvedReference = requestedPath
            ? posix.normalize(posix.join(referenceBase, requestedPath))
            : 'index.html';
          if (resolvedReference.startsWith('../') || !files.includes(resolvedReference)) {
            fail(`Référence locale absente dans le paquet : ${file} → ${reference}`);
          }
        }
      }
    }
  }
} catch (error) {
  fail(`Impossible de lire le paquet Hostinger : ${error.message}`);
}

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Pré-contrôle Hostinger OK : ${relative(process.cwd(), root)}.`);
console.log('Le paquet est prêt localement ; DNS, SSL et réglages Supabase restent externes.');
