PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS lexicon_terms (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL,
  canonical_term TEXT NOT NULL,
  term TEXT NOT NULL,
  normalized_term TEXT NOT NULL,
  version TEXT NOT NULL,
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'needs_review' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  published_as TEXT NOT NULL DEFAULT 'hidden' CHECK (published_as IN ('hidden', 'demo', 'approved')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (namespace, normalized_term, version)
);

CREATE INDEX IF NOT EXISTS lexicon_terms_lookup_idx ON lexicon_terms(namespace, normalized_term, version, published_as);

CREATE TABLE IF NOT EXISTS attribute_evidence (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  attribute_key TEXT NOT NULL,
  attribute_value TEXT NOT NULL,
  normalized_value TEXT NOT NULL,
  version TEXT NOT NULL,
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'needs_review' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  published_as TEXT NOT NULL DEFAULT 'hidden' CHECK (published_as IN ('hidden', 'demo', 'approved')),
  excerpt TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, attribute_key, normalized_value, version)
);

CREATE INDEX IF NOT EXISTS attribute_evidence_product_idx ON attribute_evidence(product_id, attribute_key, version, published_as);

CREATE TABLE IF NOT EXISTS badge_rules (
  id TEXT PRIMARY KEY,
  rule_key TEXT NOT NULL,
  fact_key TEXT NOT NULL,
  required_value TEXT NOT NULL,
  label TEXT NOT NULL,
  version TEXT NOT NULL,
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'needs_review' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  published_as TEXT NOT NULL DEFAULT 'hidden' CHECK (published_as IN ('hidden', 'demo', 'approved')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (rule_key, version)
);

CREATE TABLE IF NOT EXISTS badge_assignments (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  badge_rule_id TEXT NOT NULL REFERENCES badge_rules(id) ON DELETE CASCADE,
  evidence_id TEXT REFERENCES attribute_evidence(id) ON DELETE SET NULL,
  version TEXT NOT NULL,
  source_id TEXT REFERENCES fact_sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'needs_review' CHECK (status IN ('verified', 'needs_review', 'unknown')),
  published_as TEXT NOT NULL DEFAULT 'hidden' CHECK (published_as IN ('hidden', 'demo', 'approved')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, badge_rule_id, version)
);

CREATE INDEX IF NOT EXISTS badge_assignments_product_idx ON badge_assignments(product_id, version, published_as);
INSERT OR IGNORE INTO schema_migrations(version) VALUES ('0003_advisor_labels');
