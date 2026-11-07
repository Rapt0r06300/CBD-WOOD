PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (slug, label, sort_order, status) VALUES
  ('fleurs', 'Fleurs CBD', 1, 'demo'),
  ('resines', 'Résines', 2, 'demo'),
  ('bien-etre', 'Bien-être', 3, 'demo'),
  ('wood-shop', 'WOOD Shop', 4, 'demo');

INSERT OR IGNORE INTO products (id, category_slug, slug, name, description, price_cents, stock_quantity, availability_state, media_state, status) VALUES
  ('demo-flower-nimbus-3000', 'fleurs', 'fleurs-nimbus-3000', 'Nimbus 3000', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-ivory', 'fleurs', 'fleurs-ivory', 'Ivory', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-velvet-kush', 'fleurs', 'fleurs-velvet-kush', 'Velvet Kush', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-pastraweed', 'fleurs', 'fleurs-pastraweed', 'Pastraweed', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-euphoria', 'fleurs', 'fleurs-euphoria', 'Euphoria', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-purple', 'fleurs', 'fleurs-purple', 'Purple', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-bloody-mary', 'fleurs', 'fleurs-bloody-mary', 'Bloody Mary', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-cosmic-cbg', 'fleurs', 'fleurs-cosmic-cbg', 'Cosmic CBG', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-charlotte', 'fleurs', 'fleurs-charlotte', 'Charlotte', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-rainbow', 'fleurs', 'fleurs-rainbow', 'Rainbow', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-orange-bud', 'fleurs', 'fleurs-orange-bud', 'Orange Bud', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-plutonium', 'fleurs', 'fleurs-plutonium', 'Plutonium', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo'),
  ('demo-flower-fanta-hazy', 'fleurs', 'fleurs-fanta-hazy', 'Fanta Hazy', 'Référence fleur de démonstration WOOD, informations à compléter.', NULL, NULL, 'incomplete', 'demo', 'demo');
