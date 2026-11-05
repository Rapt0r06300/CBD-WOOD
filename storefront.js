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
  const presentationKey = product.slug || product.id;
  const flowerPresentation = category === 'fleurs'
    ? window.WoodFlowerPresentation?.get(presentationKey)
    : null;
  if (flowerPresentation?.image) {
    return `<img src="${escapeHtml(flowerPresentation.image)}" alt="Photo de démonstration de la fleur ${escapeHtml(flowerPresentation.name)}" loading="lazy">`;
  }
  if (product.image_path) {
    return `<img src="${escapeHtml(product.image_path)}" alt="${escapeHtml(product.name)}" loading="lazy">`;
  }
  if (defaults[category]) {
    return `<img src="${defaults[category]}" alt="Illustration ${escapeHtml(labels[category])}" loading="lazy">`;
  }
  return `<div class="product-art--type">WOOD.<small>WOOD SHOP / À DÉCOUVRIR</small></div>`;
}

function renderProducts(grid, products, category) {
  const isFlower = category === 'fleurs';
  grid.innerHTML = products.map((product, index) => {
    const price = formatMoney(product.price_cents);
    const tiers = Array.isArray(product.pricing_tiers) ? product.pricing_tiers : [];
    const stock = Number(product.stock_quantity);
    const hasStock = Number.isFinite(stock) && stock > 0;
    const hasPrice = isFlower
      ? tiers.length > 0 && tiers.every((tier) => Number.isFinite(Number(tier.price_cents)) && Number(tier.price_cents) > 0)
      : Number.isFinite(Number(product.price_cents)) && Number(product.price_cents) > 0;
    const requestedState = String(product.availability_state || '').toLowerCase();
    const availabilityState = ['available', 'soon', 'rupture', 'incomplete'].includes(requestedState)
      ? requestedState
      : !hasStock ? (product.stock_quantity === 0 ? 'rupture' : 'incomplete')
        : !hasPrice ? 'incomplete' : 'available';
    const purchasable = availabilityState === 'available' && hasStock && hasPrice;
    const availabilityLabel = availabilityState === 'rupture'
      ? 'Rupture de stock'
      : availabilityState === 'soon'
        ? 'Bientôt disponible'
        : availabilityState === 'incomplete'
          ? (!hasStock ? 'Disponibilité à confirmer' : 'Prix à confirmer')
          : `${product.stock_quantity} en stock`;
    const buttonMarkup = purchasable
      ? '<button class="add-to-cart" type="button">Ajouter <span aria-hidden="true">+</span></button>'
      : '<button class="add-to-cart" type="button" disabled aria-disabled="true" data-product-unavailable>Indisponible</button>';
    const weightMarkup = isFlower && tiers.length ? `<div class="product-choice"><label for="weight-${escapeHtml(product.id)}">Choisir le grammage</label><select id="weight-${escapeHtml(product.id)}" class="product-weight" data-product-weight aria-label="Choisir le grammage de ${escapeHtml(product.name)}">${tiers.map(tier => `<option value="${tier.grams}g" data-label="${tier.grams} g" data-price="${tier.price_cents / 100}">${tier.grams} g · ${(tier.price_cents / 100).toFixed(2).replace('.', ',')} €</option>`).join('')}</select></div>` : '';
    const priceMarkup = weightMarkup ? '' : `<div class="product-meta"><span class="product-status">${price && purchasable ? `${price.replace('.', ',')} €` : availabilityLabel}</span>${buttonMarkup}</div>`;
    const flowerMetaMarkup = weightMarkup ? `<div class="product-meta">${purchasable ? '<strong class="product-price-label" data-product-price-label></strong>' : `<span class="product-status">${availabilityLabel}</span>`}${buttonMarkup}</div>` : '';
    const flowerPresentation = isFlower ? window.WoodFlowerPresentation?.get(product.slug || product.id) : null;
    const description = flowerPresentation?.demoDescription || product.description || 'Une référence sélectionnée par la boutique WOOD.';
    return `<article class="product-card" data-product-id="${escapeHtml(product.id)}" data-product-slug="${escapeHtml(product.slug || product.id)}" data-product-name="${escapeHtml(product.name)}" data-product-category="${escapeHtml(labels[category] || category)}" data-product-price="${price}" data-availability-state="${availabilityState}"${purchasable ? '' : ' data-product-unavailable="true"'}>
      <div class="product-art">${productVisual(product, category)}</div>
      <div class="product-body">
        <span class="product-index">${String(index + 1).padStart(2, '0')} / WOOD CATALOGUE</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(description)}</p>
        ${weightMarkup}${priceMarkup}
        ${flowerMetaMarkup}
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
  const { data, error } = await supabase.from('products').select('id, slug, name, description, price_cents, image_path, stock_quantity, availability_state, created_at').eq('category', category).eq('status', 'published').order('created_at', { ascending: false });
  if (error || !data?.length) return;
  let products = data;
  if (category === 'fleurs') {
    const { data: priceRows } = await supabase.from('product_prices').select('product_id, grams, price_cents').in('product_id', data.map(product => product.id)).order('grams', { ascending: true });
    const pricesByProduct = new Map();
    (priceRows || []).forEach(row => {
      const tiers = pricesByProduct.get(row.product_id) || [];
      tiers.push({ grams: row.grams, price_cents: row.price_cents });
      pricesByProduct.set(row.product_id, tiers);
    });
    products = data.map(product => ({ ...product, pricing_tiers: pricesByProduct.get(product.id) || [] }));
  }
  renderProducts(grid, products, category);
  document.dispatchEvent(new CustomEvent('wood:catalog-rendered'));
}

loadCatalog();
