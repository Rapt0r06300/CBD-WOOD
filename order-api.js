window.WoodOrderApi = Object.freeze({
  async createPendingOrder(payload) {
    const config = window.WOOD_SUPABASE_CONFIG;
    if (!config) throw new Error('La configuration Supabase est absente.');
    const headers = { apikey: config.publishableKey, 'Content-Type': 'application/json' };
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm');
    const supabase = createClient(config.url, config.publishableKey, { auth: { persistSession: true, autoRefreshToken: true } });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    const response = await fetch(`${config.url}/functions/v1/create-pending-order`, { method: 'POST', headers, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Impossible d’enregistrer la commande.');
    return result.order;
  }
});
