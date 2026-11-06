import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pagesHeaders = await readFile(new URL('../_headers', import.meta.url), 'utf8');
const apacheHeaders = await readFile(new URL('../.htaccess', import.meta.url), 'utf8');
const orderFunction = await readFile(new URL('../supabase/functions/create-pending-order/index.ts', import.meta.url), 'utf8');

const requiredHeaders = [
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy:',
  'Permissions-Policy:',
  'X-Frame-Options: DENY',
  'Content-Security-Policy-Report-Only:',
];

test('les deux cibles d’hébergement gardent les en-têtes de sécurité communs', () => {
  for (const header of requiredHeaders) assert.match(pagesHeaders, new RegExp(header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  for (const header of ['X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'X-Frame-Options', 'Content-Security-Policy-Report-Only']) {
    assert.match(apacheHeaders, new RegExp(`Header always set ${header}\\s+"`, 'u'));
  }
  assert.match(apacheHeaders, /RewriteCond %\{HTTPS\} !=on/);
  assert.match(apacheHeaders, /ErrorDocument 404 \/404\.html/);
});

test('le cache distingue les documents HTML des assets versionnés', () => {
  assert.ok(apacheHeaders.includes('<FilesMatch "\\.(?:html?|htm)$">'));
  assert.ok(apacheHeaders.includes('Cache-Control "no-cache, no-store, must-revalidate"'));
  assert.ok(apacheHeaders.includes('<FilesMatch "\\.(?:css|js|mjs|svg|webp|png|jpe?g|ico|woff2?)$">'));
  assert.ok(apacheHeaders.includes('Cache-Control "public, max-age=86400, must-revalidate"'));
  assert.ok(pagesHeaders.includes('/*.html\n  Cache-Control: no-cache, no-store, must-revalidate'));
  assert.ok(pagesHeaders.includes('/*.{css,js,mjs,svg,webp,png,jpg,jpeg,ico,woff,woff2}\n  Cache-Control: public, max-age=86400, must-revalidate'));
});

test('la fonction de commande garde une CORS allow-list et des méthodes minimales', () => {
  assert.match(orderFunction, /ALLOWED_ORIGINS/);
  assert.match(orderFunction, /Access-Control-Allow-Methods.*POST, OPTIONS/);
  assert.match(orderFunction, /Vary.*Origin/);
  assert.match(orderFunction, /Cache-Control.*no-store/);
  assert.doesNotMatch(orderFunction, /Access-Control-Allow-Origin["']\s*:\s*["']\*["']/iu);
});
