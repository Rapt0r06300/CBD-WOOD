import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const asPath = (root) => root instanceof URL ? fileURLToPath(root) : root;
const destructivePattern = /\b(?:drop\s+(?:table|schema|database)|truncate(?:\s+table)?|delete\s+from\s+(?:public\.)?(?:products|orders|order_items|customer_profiles))\b/iu;

export async function auditMigrations(root) {
  const rootPath = resolve(asPath(root));
  const migrationDirectory = resolve(rootPath, 'supabase', 'migrations');
  const errors = [];
  const unsafeMigrations = [];
  let migrations = [];

  try {
    migrations = (await readdir(migrationDirectory)).filter((name) => name.endsWith('.sql')).sort();
  } catch (error) {
    errors.push(`migrations: ${error.message}`);
  }

  const timestamps = migrations.map((name) => name.match(/^(\d{14})_/u)?.[1]).filter(Boolean);
  const uniqueTimestamps = new Set(timestamps).size === timestamps.length && timestamps.length === migrations.length;
  if (!uniqueTimestamps) errors.push('migrations: préfixes temporels absents ou dupliqués');
  if (migrations.length < 30) errors.push(`migrations: historique incomplet (${migrations.length})`);

  for (const name of migrations) {
    const source = await readFile(resolve(migrationDirectory, name), 'utf8');
    if (!source.trim()) errors.push(`migrations: fichier vide ${name}`);
    if (/SUPABASE_SERVICE_ROLE_KEY|GMAIL_CLIENT_SECRET|GMAIL_REFRESH_TOKEN|VIVA_(?:SECRET|API_KEY|TOKEN)/iu.test(source)) {
      errors.push(`migrations: secret détecté ${name}`);
    }
    if (destructivePattern.test(source)) unsafeMigrations.push(name);
  }

  const backupRunbook = resolve(rootPath, 'docs', 'ops', 'supabase-backup-restore.md');
  let hasBackupRunbook = false;
  try {
    const source = await readFile(backupRunbook, 'utf8');
    hasBackupRunbook = /Avant une modification/iu.test(source) && /Restauration/iu.test(source) && /environnement de test/iu.test(source);
  } catch {
    errors.push('runbook sauvegarde: fichier absent');
  }
  if (!hasBackupRunbook) errors.push('runbook sauvegarde: procédure incomplète');

  return { migrations: migrations.length, timestamps, uniqueTimestamps, hasBackupRunbook, unsafeMigrations, errors };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const report = await auditMigrations(process.cwd());
  if (report.errors.length || report.unsafeMigrations.length) {
    for (const error of report.errors) console.error(`- ${error}`);
    for (const name of report.unsafeMigrations) console.error(`- migration destructive à examiner : ${name}`);
    process.exit(1);
  }
  console.log(`Continuity audit: OK (${report.migrations} migrations, préfixes uniques, runbook présent).`);
  console.log('La restauration réelle Supabase reste une opération externe à exécuter sur un projet de test.');
}
