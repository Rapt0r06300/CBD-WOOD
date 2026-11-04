const ORDER_IDEMPOTENCY_KEY = 'wood-order-idempotency-v1';
const ORDER_REQUEST_TIMEOUT_MS = 20000;

const createIdempotencyKey = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const getOrderIdempotencyKey = () => {
  try {
    const existing = sessionStorage.getItem(ORDER_IDEMPOTENCY_KEY);
    if (existing) return existing;
    const created = createIdempotencyKey();
    sessionStorage.setItem(ORDER_IDEMPOTENCY_KEY, created);
    return created;
  } catch {
    return createIdempotencyKey();
  }
};

const getTurnstileToken = () => {
  const token = globalThis.WoodTurnstile?.getToken?.();
  if (typeof token === 'string' && token) return token;
  const input = document.querySelector('[name="cf-turnstile-response"]');
  return input instanceof HTMLInputElement ? input.value : '';
};

window.WoodOrderApi = Object.freeze({
  async createPendingOrder(payload) {
    const config = window.WOOD_SUPABASE_CONFIG;
    if (!config) throw new Error('La configuration Supabase est absente.');
    const idempotencyKey = payload?.idempotency_key || getOrderIdempotencyKey();
    const turnstileToken = getTurnstileToken();
    const requestPayload = { ...payload, idempotency_key: idempotencyKey };
    if (turnstileToken) requestPayload.turnstile_token = turnstileToken;
    const headers = {
      apikey: config.publishableKey,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': idempotencyKey,
    };
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm');
    const supabase = createClient(config.url, config.publishableKey, { auth: { persistSession: true, autoRefreshToken: true } });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timeout = globalThis.setTimeout(() => controller?.abort(), ORDER_REQUEST_TIMEOUT_MS);
    let response;
    try {
      response = await fetch(`${config.url}/functions/v1/create-pending-order`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestPayload),
        ...(controller ? { signal: controller.signal } : {}),
      });
    } catch (error) {
      if (error?.name === 'AbortError') throw new Error('Le service met trop de temps à répondre. Réessaie : ta sélection est conservée.');
      throw new Error('Connexion impossible. Vérifie le réseau puis réessaie : ta sélection est conservée.');
    } finally {
      globalThis.clearTimeout(timeout);
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Impossible d’enregistrer la commande.');
    try { sessionStorage.removeItem(ORDER_IDEMPOTENCY_KEY); } catch { /* private browsing can block storage */ }
    return result.order;
  }
});
