(() => {
  const root = globalThis.window || globalThis;
  const enabled = root.WOOD_D1_DEMO_ENABLED === true;
  const config = root.WOOD_D1_CONFIG && typeof root.WOOD_D1_CONFIG === 'object'
    ? root.WOOD_D1_CONFIG
    : {};
  const baseUrl = String(config.url || '').replace(/\/+$/, '');
  const fetchImpl = root.fetch || globalThis.fetch;

  const read = async (path) => {
    if (!enabled || !baseUrl || typeof fetchImpl !== 'function') return null;
    try {
      const response = await fetchImpl(`${baseUrl}${path}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'omit',
      });
      if (!response?.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

  const products = (options = {}) => {
    const params = new URLSearchParams();
    if (Number.isFinite(Number(options.limit))) params.set('limit', String(Math.max(1, Math.min(50, Number(options.limit)))));
    if (Number.isFinite(Number(options.offset))) params.set('offset', String(Math.max(0, Number(options.offset))));
    const query = params.toString();
    return read(`/v1/products${query ? `?${query}` : ''}`);
  };

  const api = Object.freeze({
    enabled,
    categories: () => read('/v1/categories'),
    products,
    product: (slug) => {
      const cleanSlug = String(slug || '').trim();
      return cleanSlug ? read(`/v1/products/${encodeURIComponent(cleanSlug)}`) : Promise.resolve(null);
    },
  });

  root.WoodD1Demo = api;
  if (root !== globalThis) globalThis.WoodD1Demo = api;
})();
