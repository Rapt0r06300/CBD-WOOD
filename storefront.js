import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';

const config = window.WOOD_SUPABASE_CONFIG;
const defaults = {
  fleurs: 'assets/fleurs.svg',
  resines: 'assets/resines.svg',
  'bien-etre': 'assets/cosmetiques.svg',
  'wood-shop': null
};
const labels = {
  fleurs: 'Fleurs CBD',
  resines: 'Résines',
  'bien-etre': 'Bien-être',
  'wood-shop': 'WOOD Shop'
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function formatMoney(cents) {
  if (cents === null || cents === undefined) return '';
  return (Number(cents) / 100).toFixed(2);
}

function productVisual(product, category) {
  if (product.image_path) {
    return `<img src="${escapeHtml(product.image_path)}" alt="${escapeHtml(product.name)}" loading="lazy">`;
  }
  if (defaults[category]) {
    return `<img src="${defaults[category]}" alt="Illustration ${escapeHtml(labels[category])}" loading="lazy">`;
  }
  return `<div class="product-art--type">WOOD.<small>WOOD SHOP / À DÉCOUVRIR</small></div>`;
}

function renderProducts(grid, products, category) {
  grid.innerHTML = products.map((product, index) => {
    const price = formatMoney(product.price_cents);
    const stockLabel = product.stock_quantity > 0 ? `${product.stock_quantity} en stock` : 'Disponibilité boutique';
    return `<article class="product-card" data-product-id="${escapeHtml(product.id)}" data-product-name="${escapeHtml(product.name)}" data-product-category="${escapeHtml(labels[category] || category)}" data-product-price="${price}">
      <div class="product-art">${productVisual(product, category)}</div>
      <div class="product-body">
        <span class="product-index">${String(index + 1).padStart(2, '0')} / WOOD CATALOGUE</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description || 'Une référence sélectionnée par la boutique WOOD.')}</p>
        <div class="product-meta"><span class="product-status">${price ? `${price.replace('.', ',')} €` : stockLabel}</span><button class="add-to-cart" type="button">Ajouter <span aria-hidden="true">+</span></button></div>
      </div>
    </article>`;
  }).join('');
}

async function loadCatalog() {
  const main = document.querySelector('main[data-catalog-category]');
  const grid = main?.querySelector('.product-grid');
  const category = main?.dataset.catalogCategory;
  if (!grid || !category || !config) return;
  const supabase = createClient(config.url, config.publishableKey);
  const { data, error } = await supabase.from('products').select('id, name, description, price_cents, image_path, stock_quantity, created_at').eq('category', category).eq('status', 'published').order('created_at', { ascending: false });
  if (!error && data?.length) renderProducts(grid, data, category);
}

loadCatalog();
