const ALLOWED_ORIGINS = new Set([
  'https://rapt0r06300.github.io',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]);

const json = (body, status = 200, origin = '') => {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': status === 200 ? 'public, max-age=60' : 'no-store',
    'x-content-type-options': 'nosniff',
  });
  if (ALLOWED_ORIGINS.has(origin)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('vary', 'Origin');
  }
  return new Response(status === 204 ? null : JSON.stringify(body), { status, headers });
};

const readRows = async (db, sql, values = []) => {
  const statement = db.prepare(sql);
  const result = values.length ? await statement.bind(...values).all() : await statement.all();
  return result.results || [];
};

const readRow = async (db, sql, values = []) => {
  const statement = db.prepare(sql);
  return values.length ? statement.bind(...values).first() : statement.first();
};

const toBoundedInteger = (value, fallback, max) => {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isInteger(parsed) && parsed >= 0 ? Math.min(parsed, max) : fallback;
};

export const handleRequest = async (request, env) => {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin') || '';
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: 'Origine non autorisée.' }, 403);

  if (request.method === 'OPTIONS') {
    const response = json(null, 204, origin);
    response.headers.set('access-control-allow-methods', 'GET, HEAD, OPTIONS');
    response.headers.set('access-control-allow-headers', 'content-type');
    response.headers.set('access-control-max-age', '600');
    return response;
  }
  if (!['GET', 'HEAD'].includes(request.method)) return json({ error: 'Méthode non autorisée : API en lecture seule.' }, 405, origin);
  if (!env?.DB) return json({ error: 'Catalogue D1 indisponible.', fallback: 'local' }, 503, origin);

  if (url.pathname === '/health') return json({ ok: true, service: 'wood-d1-demo', readOnly: true }, 200, origin);
  if (url.pathname === '/v1/categories') {
    const data = await readRows(env.DB, `SELECT slug, label, sort_order FROM categories WHERE status IN ('demo', 'approved') ORDER BY sort_order ASC`);
    return json({ data }, 200, origin);
  }
  if (url.pathname === '/v1/products') {
    const category = url.searchParams.get('category') || '';
    const limit = toBoundedInteger(url.searchParams.get('limit'), 24, 50) || 24;
    const offset = toBoundedInteger(url.searchParams.get('offset'), 0, 10000);
    const data = category
      ? await readRows(env.DB, `SELECT id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status FROM products WHERE status IN ('demo', 'approved') AND category_slug = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`, [category, limit, offset])
      : await readRows(env.DB, `SELECT id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status FROM products WHERE status IN ('demo', 'approved') ORDER BY created_at DESC LIMIT ? OFFSET ?`, [limit, offset]);
    return json({ data, pagination: { limit, offset, nextOffset: data.length === limit ? offset + limit : null } }, 200, origin);
  }
  const productMatch = url.pathname.match(/^\/v1\/products\/([^/]+)$/u);
  if (productMatch) {
    const product = await readRow(env.DB, `SELECT id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status FROM products WHERE slug = ? AND status IN ('demo', 'approved') LIMIT 1`, [decodeURIComponent(productMatch[1])]);
    if (!product) return json({ error: 'Référence introuvable.' }, 404, origin);
    const media = await readRows(env.DB, `SELECT src, alt, role, source_status, credit, sort_order FROM product_media WHERE product_id = ? ORDER BY sort_order ASC`, [product.id]);
    const variants = await readRows(env.DB, `SELECT id, label, grams, price_cents, status FROM product_variants WHERE product_id = ? AND status IN ('demo', 'approved') ORDER BY grams ASC`, [product.id]);
    return json({ data: { ...product, media, variants } }, 200, origin);
  }
  return json({ error: 'Route introuvable.' }, 404, origin);
};

export default {
  fetch(request, env) {
    return handleRequest(request, env).catch(() => json({ error: 'Catalogue D1 indisponible.', fallback: 'local' }, 503, request.headers.get('Origin') || ''));
  },
};
