import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const functionSource = await readFile(new URL('../supabase/functions/create-pending-order/index.ts', import.meta.url), 'utf8');
const validationSource = await readFile(new URL('../supabase/functions/create-pending-order/validation.mjs', import.meta.url), 'utf8');
const rateLimitMigration = await readFile(new URL('../supabase/migrations/20261105130000_order_rate_limit.sql', import.meta.url), 'utf8');

test('la frontière de commande possède des barrières anti-abus bornées', () => {
  assert.match(functionSource, /const MAX_BODY_BYTES = 64 \* 1024/);
  assert.match(functionSource, /Content-Length/);
  assert.match(functionSource, /TextEncoder\(\)\.encode\(bodyText\)\.byteLength/);
  assert.match(functionSource, /JSON\.parse\(bodyText\)/);
  assert.match(functionSource, /isAllowedOrigin\(origin, allowedOrigins\(\)\)/);
  assert.match(functionSource, /consume_order_rate_limit/);
  assert.match(functionSource, /TURNSTILE_SECRET_KEY/);
  assert.match(functionSource, /X-Turnstile-Token/);
  assert.match(functionSource, /Retry-After/);
  assert.doesNotMatch(functionSource, /insert\([^\n]*(?:CF-Connecting-IP|X-Real-IP)/iu);
  assert.match(validationSource, /validateOrderPayload/);
  assert.match(rateLimitMigration, /p_window_seconds/);
  assert.match(rateLimitMigration, /p_max_requests/);
  assert.match(rateLimitMigration, /for update/iu);
});
