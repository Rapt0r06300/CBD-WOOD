import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contract = await readFile(new URL('../docs/design/wood-hosting-package-contract.md', import.meta.url), 'utf8');
const prepare = await readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8');
const preflight = await readFile(new URL('../scripts/hostinger-preflight.mjs', import.meta.url), 'utf8');
const apache = await readFile(new URL('../.htaccess', import.meta.url), 'utf8');
const pagesHeaders = await readFile(new URL('../_headers', import.meta.url), 'utf8');
const pagesWorkflow = await readFile(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
const hostingerGuide = await readFile(new URL('../docs/ops/hostinger-deploy.md', import.meta.url), 'utf8');
const pagesGuide = await readFile(new URL('../docs/ops/github-pages-deploy.md', import.meta.url), 'utf8');
const productionChecklist = await readFile(new URL('../docs/ops/production-checklist.md', import.meta.url), 'utf8');
const snapshots = await readFile(new URL('../scripts/create-site-snapshots.mjs', import.meta.url), 'utf8');
const versions = await readFile(new URL('../scripts/site-version.mjs', import.meta.url), 'utf8');
const checkJs = await readFile(new URL('../scripts/check-js.mjs', import.meta.url), 'utf8');

test('le contrat délimite un paquet public explicite et reproductible', () => {
  assert.match(contract, /Périmètre du paquet public/iu);
  assert.match(contract, /allow-list|liste explicite/iu);
  assert.match(prepare, /const PUBLIC_FILES = \[/);
  assert.match(prepare, /dist-hostinger/);
  assert.match(prepare, /owner-dashboard\.js/);
  assert.match(prepare, /owner-media\.mjs/);
  assert.match(prepare, /checkout-required\.js/);
  assert.match(prepare, /wood-mobile-finish\.css/);
  assert.match(prepare, /wood-mobile-finish\.js/);
  assert.match(checkJs, /dist-hostinger/);
  assert.doesNotMatch(prepare, /'admin\.html'|'admin\.js'|'admin\.css'/);
  assert.match(hostingerGuide, /contenu[\s\S]*dist-hostinger[\s\S]*public_html/iu);
  assert.match(pagesWorkflow, /upload-pages-artifact/);
  assert.match(pagesWorkflow, /path: \.github-pages/);
  assert.match(productionChecklist, /prévisualisation GitHub Pages/iu);
  assert.match(productionChecklist, /source \*\*GitHub Actions\*\*/u);
  assert.match(productionChecklist, /workflow `\.github\/workflows\/pages\.yml` prépare puis publie uniquement `\.github-pages`/u);
  assert.doesNotMatch(productionChecklist, /Cloudflare Pages/iu);
});

test('le préflight refuse routes, secrets, dossiers internes et HTTP non sûr', () => {
  assert.match(contract, /Préflight, chemins et secrets/iu);
  assert.match(preflight, /requiredFiles/);
  assert.match(preflight, /forbiddenPathPattern/);
  assert.match(preflight, /forbiddenTextPattern/);
  assert.match(preflight, /Route admin publique interdite/iu);
  assert.match(preflight, /URL HTTP non sécurisée/iu);
  assert.match(preflight, /Référence locale absente dans le paquet/iu);
  assert.match(preflight, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(preflight, /VIVA_/);
  assert.match(hostingerGuide, /Ne pas envoyer.*\.git.*docs.*test.*supabase/isu);
  assert.match(pagesGuide, /migrations Supabase.*fonctions Edge.*fichiers d’administration/isu);
});

test('le cache et les en-têtes distinguent HTML privé et assets versionnés', () => {
  assert.match(contract, /Cache, en-têtes et chemins/iu);
  assert.match(apache, /Cache-Control "no-cache, no-store, must-revalidate"/);
  assert.match(apache, /Cache-Control "public, max-age=86400, must-revalidate"/);
  assert.match(apache, /X-Content-Type-Options/);
  assert.match(apache, /RewriteCond %\{HTTPS\} !=on/);
  assert.match(pagesHeaders, /Cache-Control: no-cache, no-store, must-revalidate/);
  assert.match(pagesHeaders, /Cache-Control: public, max-age=86400, must-revalidate/);
});

test('le rollback demo/legacy reste local, borné et documenté', () => {
  assert.match(contract, /Snapshots demo\/legacy et rollback/iu);
  assert.match(snapshots, /legacy/);
  assert.match(snapshots, /never included in the Hostinger public allow-list/iu);
  assert.match(versions, /validVersions = new Set\(\['legacy', 'demo'\]\)/);
  assert.match(versions, /Aucun déploiement distant n’a été effectué/iu);
  assert.match(versions, /Chemin de version refusé/iu);
  assert.match(contract, /DNS|SSL|Hostinger|Supabase/iu);
  assert.match(hostingerGuide, /Cette procédure prépare un dossier local\. Elle n’envoie rien/iu);
});
