PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS fact_sources (
  id TEXT PRIMARY KEY,
  source_kind TEXT NOT NULL CHECK (source_kind IN ('wood-page', 'owner-document', 'owner-message', 'owner-approved')),
  source_ref TEXT NOT NULL,
  source_version TEXT NOT NULL DEFAULT '1',
  captured_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (source_kind, source_ref, source_version)
);

CREATE TABLE IF NOT EXISTS product_facts (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  fact_key TEXT NOT NULL,
  fact_value TEXT,
  normalized_value TEXT,
  status TEXT NOT NULL DEFAULT 'unknown' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  excerpt TEXT,
  captured_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, fact_key, normalized_value)
);

CREATE INDEX IF NOT EXISTS product_facts_product_idx ON product_facts(product_id, status, fact_key);

CREATE TABLE IF NOT EXISTS normalized_values (
  namespace TEXT NOT NULL,
  alias TEXT NOT NULL,
  canonical_value TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1',
  PRIMARY KEY (namespace, alias, version)
);

CREATE TABLE IF NOT EXISTS question_rules (
  id TEXT PRIMARY KEY,
  category_slug TEXT REFERENCES categories(slug) ON DELETE SET NULL,
  fact_key TEXT NOT NULL,
  question TEXT NOT NULL,
  answer_type TEXT NOT NULL CHECK (answer_type IN ('choice', 'multi-choice', 'free-text')),
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  status TEXT NOT NULL DEFAULT 'unknown' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS import_runs (
  id TEXT PRIMARY KEY,
  source_ref TEXT NOT NULL,
  source_version TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  item_count INTEGER NOT NULL DEFAULT 0 CHECK (item_count >= 0),
  error_message TEXT,
  started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS review_queue (
  id TEXT PRIMARY KEY,
  entity_kind TEXT NOT NULL CHECK (entity_kind IN ('product', 'fact', 'question', 'media')),
  entity_id TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('conflict', 'missing-critical', 'unproven', 'owner-review')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'rejected', 'dismissed')),
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS review_queue_open_idx ON review_queue(status, created_at);
INSERT OR IGNORE INTO schema_migrations(version) VALUES ('0002_advisor_facts');
