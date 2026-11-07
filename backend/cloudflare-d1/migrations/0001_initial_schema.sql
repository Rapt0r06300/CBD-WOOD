PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  status TEXT NOT NULL DEFAULT 'demo' CHECK (status IN ('demo', 'approved')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON UPDATE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_cents INTEGER CHECK (price_cents IS NULL OR price_cents > 0),
  stock_quantity INTEGER CHECK (stock_quantity IS NULL OR stock_quantity >= 0),
  availability_state TEXT NOT NULL DEFAULT 'incomplete' CHECK (availability_state IN ('incomplete', 'available', 'soon', 'rupture')),
  media_state TEXT NOT NULL DEFAULT 'demo' CHECK (media_state IN ('demo', 'prepared', 'approved', 'real-photo')),
  status TEXT NOT NULL DEFAULT 'demo' CHECK (status IN ('demo', 'approved', 'archived')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_slug, status, created_at DESC);

CREATE TABLE IF NOT EXISTS product_media (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('hero', 'macro', 'context', 'fallback')),
  source_status TEXT NOT NULL DEFAULT 'demo' CHECK (source_status IN ('demo', 'prepared', 'approved', 'real-photo')),
  credit TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  UNIQUE (product_id, role, sort_order)
);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  grams INTEGER CHECK (grams IS NULL OR grams > 0),
  price_cents INTEGER CHECK (price_cents IS NULL OR price_cents > 0),
  status TEXT NOT NULL DEFAULT 'demo' CHECK (status IN ('demo', 'approved', 'archived')),
  UNIQUE (product_id, label)
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'demo' CHECK (status IN ('demo', 'approved')),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO schema_migrations(version) VALUES ('0001_initial_schema');
