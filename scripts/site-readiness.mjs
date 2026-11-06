import { access, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicPages = [
  'index.html',
  'wood-shop.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'fleur.html',
  'produit.html',
  'compte.html',
  'checkout.html',
  'confirmation.html',
  '404.html',
];

const referencePattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
const idPattern = /\bid\s*=\s*["']([^"']+)["']/gi;
const ignoredReference = /^(?:#|[a-z][a-z0-9+.-]*:|\/\/)/i;

const asPath = (root) => root instanceof URL ? fileURLToPath(root) : root;

const safeLocalPath = (rootPath, page, raw) => {
  if (!raw || ignoredReference.test(raw) || raw.startsWith('/')) return null;
  const resolved = new URL(raw, `https://wood.local/${page}`);
  const targetPage = resolved.pathname.replace(/^\//, '') || page;
  const target = resolve(rootPath, targetPage);
  if (relative(rootPath, target).startsWith('..')) return null;
  return { target, targetPage, hash: decodeURIComponent(resolved.hash.slice(1)) };
};

export async function auditSite(root) {
  const rootPath = resolve(asPath(root));
  const errors = [];
  const pageSources = new Map();
  const pageIds = new Map();
  const pages = [];
  let references = 0;
  let anchors = 0;

  for (const name of publicPages) {
    const file = resolve(rootPath, name);
    let source;
    try {
      source = await readFile(file, 'utf8');
    } catch {
      errors.push(`${name}: fichier absent`);
      continue;
    }
    pageSources.set(name, source);
    pageIds.set(name, new Set([...source.matchAll(idPattern)].map((match) => match[1])));
    const hasViewport = /<meta\s+[^>]*name=["']viewport["'][^>]*>/iu.test(source);
    const hasMobileShell = /mobile-shell\.js/iu.test(source) || (name === '404.html' && /@media\s*\(max-width:\s*400px\)/iu.test(source));
    const hasAdminReference = /admin(?:\.html|\.js|\.css)?/iu.test(source);
    if (!hasViewport) errors.push(`${name}: viewport manquante`);
    if (!hasMobileShell) errors.push(`${name}: préparation mobile absente`);
    if (hasAdminReference) errors.push(`${name}: référence admin publique`);
    pages.push({ name, hasViewport, hasMobileShell, hasAdminReference });
  }

  for (const [page, source] of pageSources) {
    for (const match of source.matchAll(referencePattern)) {
      const raw = match[1];
      const local = safeLocalPath(rootPath, page, raw);
      if (!local) continue;
      references += 1;
      try {
        await access(local.target);
      } catch {
        errors.push(`${page}: référence locale absente ${raw}`);
        continue;
      }
      if (local.hash) {
        anchors += 1;
        const ids = pageIds.get(local.targetPage);
        if (!ids) errors.push(`${page}: ancre vers une page non auditée ${raw}`);
        else if (!ids.has(local.hash)) errors.push(`${page}: ancre inexistante ${raw}`);
      }
    }
  }

  const publicSources = [...pageSources.entries()];
  for (const [name, source] of publicSources) {
    if (/SUPABASE_SERVICE_ROLE_KEY|VIVA_(?:SECRET|API_KEY|TOKEN)|service_role/iu.test(source)) {
      errors.push(`${name}: secret serveur détecté`);
    }
  }

  return {
    pages,
    references,
    anchors,
    errors,
    externalLimits: [
      'Safari iOS/macOS et Firefox restent à valider sur appareils réels.',
      'Gmail, Viva Wallet et Supabase production exigent des réglages externes.',
      'Hostinger, DNS, HTTPS et domaine restent une étape de transfert externe.',
    ],
  };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const report = await auditSite(process.cwd());
  if (report.errors.length) {
    for (const error of report.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Readiness audit: OK (${report.pages.length} pages, ${report.references} références, ${report.anchors} ancres).`);
  for (const limit of report.externalLimits) console.log(`Limite externe: ${limit}`);
}
