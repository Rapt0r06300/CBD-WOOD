import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');
const config = await readFile(new URL('../supabase-config.js', import.meta.url), 'utf8');
const client = await readFile(new URL('../turnstile-client.js', import.meta.url), 'utf8');

test('le checkout garde Turnstile désactivé sans sitekey et raccordable avec une clé publique', () => {
  assert.match(config, /turnstileSiteKey:\s*['"]['"]/u);
  assert.match(checkout, /turnstile-client\.js/u);
  assert.match(client, /turnstileWidget/u);
  assert.match(client, /WOOD_SUPABASE_CONFIG\.turnstileSiteKey/u);
  assert.match(client, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/u);
  assert.match(client, /globalThis\.WoodTurnstile/u);
  assert.match(client, /getToken/u);
  assert.doesNotMatch(client, /TURNSTILE_SECRET_KEY|SUPABASE_SERVICE_ROLE_KEY/u);
});

