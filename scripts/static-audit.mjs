import { readFile, access } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
import { readdir } from 'node:fs/promises';

const root = process.cwd();
const requiredFiles = [
  '_headers',
  '_redirects',
  '.htaccess',
  '404.html',
  'supabase-config.js',
  'supabase/functions/create-pending-order/index.ts',
  'supabase/functions/create-pending-order/validation.mjs',
  'supabase/migrations/20261104120000_order_security_and_stock.sql',
];

const localReferencePattern = /(?:href|src)=["']([^"']+)["']/gi;
const publicTextExtensions = new Set(['.html', '.js', '.css', '.json', '.toml']);
const failures = [];

const fail = (message) => failures.push(message);

for (const file of requiredFiles) {
  try { await access(join(root, file)); }
  catch { fail(`Fichier requis manquant : ${file}`); }
}

const headers = await readFile(join(root, '_headers'), 'utf8');
for (const requiredHeader of ['X-Content-Type-Options: nosniff', 'Referrer-Policy:', 'Permissions-Policy:', 'Content-Security-Policy-Report-Only:']) {
  if (!headers.includes(requiredHeader)) fail(`En-tête Cloudflare manquant : ${requiredHeader}`);
}

const htaccess = await readFile(join(root, '.htaccess'), 'utf8');
for (const requiredRule of [
  'Options -Indexes',
  'DirectoryIndex index.html',
  'ErrorDocument 404 /404.html',
  'RewriteCond %{HTTPS} !=on',
  'X-Content-Type-Options',
  'Content-Security-Policy-Report-Only "',
]) {
  if (!htaccess.includes(requiredRule)) fail(`Configuration Hostinger manquante : ${requiredRule}`);
}

const config = await readFile(join(root, 'supabase-config.js'), 'utf8');
if (config.includes('localhost')) fail('La configuration Supabase publique contient encore localhost.');
if (!config.includes('publishableKey')) fail('La configuration Supabase ne déclare pas de clé publishable.');

const functionSource = await readFile(join(root, 'supabase/functions/create-pending-order/index.ts'), 'utf8');
const sqlSource = await readFile(join(root, 'supabase/migrations/20261104120000_order_security_and_stock.sql'), 'utf8');
for (const forbiddenSecret of ['SUPABASE_SERVICE_ROLE_KEY', 'VIVA_SECRET', 'service_role']) {
  if (config.includes(forbiddenSecret)) fail(`Secret interdit dans supabase-config.js : ${forbiddenSecret}`);
}
for (const requiredControl of ['ALLOWED_ORIGINS', 'X-Idempotency-Key', 'TURNSTILE_SECRET_KEY', 'create_pending_order']) {
  if (!functionSource.includes(requiredControl)) fail(`Contrôle serveur manquant : ${requiredControl}`);
}
for (const requiredSqlControl of ['order_idempotency_keys', 'stock_quantity - v_quantity', 'for update', 'fulfillment_mode <> \'delivery\'']) {
  if (!sqlSource.toLowerCase().includes(requiredSqlControl.toLowerCase())) fail(`Contrôle SQL manquant : ${requiredSqlControl}`);
}

const entries = await readdir(root, { withFileTypes: true });
const publicFiles = entries
  .filter((entry) => entry.isFile() && publicTextExtensions.has(resolve(entry.name).slice(resolve(entry.name).lastIndexOf('.')).toLowerCase()))
  .map((entry) => entry.name);

for (const file of publicFiles) {
  const source = await readFile(join(root, file), 'utf8');
  if (file !== 'supabase-config.js' && /SUPABASE_SERVICE_ROLE_KEY|VIVA_(?:SECRET|API_KEY|TOKEN)|service_role/i.test(source)) {
    fail(`Secret serveur détecté dans un fichier public : ${file}`);
  }
  if (file !== 'admin.html' && /admin\.html/i.test(source)) {
    const ownerOnlyLink = file === 'compte.html'
      && /<a\b[^>]*class="[^"]*account-owner-link[^"]*hidden[^"]*"[^>]*id="ownerDashboardLink"[^>]*href="admin\.html"/i.test(source);
    const sourceWithoutOwnerLink = ownerOnlyLink
      ? source.replace(/<a\b[^>]*id="ownerDashboardLink"[^>]*>[^<]*<\/a>/i, '')
      : source;
    if (/admin\.html/i.test(sourceWithoutOwnerLink)) fail(`Accès admin exposé dans la navigation publique : ${file}`);
  }
  if (file.endsWith('.html')) {
    for (const match of source.matchAll(localReferencePattern)) {
      const raw = match[1].split('#')[0].split('?')[0];
      if (!raw || raw.startsWith('#') || raw.startsWith('/') || /^(?:[a-z]+:|\/\/)/i.test(raw)) continue;
      const target = resolve(root, raw);
      try { await access(target); }
      catch { fail(`Référence locale cassée dans ${file} : ${raw}`); }
    }
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Static audit: OK');
