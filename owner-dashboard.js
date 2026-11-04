const categoryLabels = { fleurs: 'Fleurs CBD', resines: 'Résines', 'bien-etre': 'Bien-être', 'wood-shop': 'WOOD Shop' };
const flowerTierGrams = [1, 3, 5, 10, 25];
const orderStatuses = ['pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled'];
const statusLabels = { pending: 'En attente', paid: 'Payée', preparing: 'En préparation', ready: 'Prête', completed: 'Terminée', cancelled: 'Annulée' };

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
const formatMoney = cents => cents === null || cents === undefined || cents === '' ? 'À renseigner' : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(cents) / 100);
const formatDate = value => value ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value)) : '—';
const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function mountOwnerDashboard({ supabase }) {
  const root = document.getElementById('ownerDashboard');
  if (!root || !supabase) return null;
  const $ = selector => root.querySelector(selector);
  const productsBody = $('#ownerProductsBody');
  const ordersBody = $('#ownerOrdersBody');
  let products = [];

  const productsSection = root.querySelector('[aria-labelledby="owner-products-title"]');
  const ordersSection = root.querySelector('[aria-labelledby="owner-orders-title"]');
  if (ordersSection && productsSection) productsSection.before(ordersSection);

  const setMessage = (selector, text, isError = false) => {
    const element = $(selector);
    if (!element) return;
    element.textContent = text || '';
    element.classList.toggle('is-error', isError);
  };

  const renderSummary = orderCount => {
    const published = products.filter(product => product.status === 'published').length;
    const lowStock = products.filter(product => Number(product.stock_quantity) < 5).length;
    const summary = $('#ownerSummaryGrid');
    if (!summary) return;
    summary.innerHTML = [['Produits au catalogue', products.length], ['Produits publiés', published], ['Stocks à vérifier', lowStock], ['Commandes reçues', orderCount]].map(([label, value]) => `<div class="owner-dashboard__stat"><strong>${value}</strong><span>${label}</span></div>`).join('');
  };

  const renderProducts = () => {
    if (!productsBody) return;
    if (!products.length) {
      productsBody.innerHTML = '<tr><td colspan="6" class="owner-dashboard__empty">Aucun produit pour le moment. Ajoute la première référence.</td></tr>';
      return;
    }
    productsBody.innerHTML = products.map(product => `<tr><td data-label="Produit"><div class="owner-dashboard__product"><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.slug)}</span></div></td><td data-label="Catégorie">${escapeHtml(categoryLabels[product.category] || product.category)}</td><td data-label="Prix">${product.category === 'fleurs' && product.pricing_tiers?.length ? product.pricing_tiers.map(tier => `${tier.grams} g · ${formatMoney(tier.price_cents)}`).join('<br>') : formatMoney(product.price_cents)}</td><td data-label="Stock">${escapeHtml(product.stock_quantity)}</td><td data-label="Statut"><span class="owner-dashboard__status-badge owner-dashboard__status-badge--${escapeHtml(product.status)}">${product.status === 'published' ? 'Publié' : product.status === 'archived' ? 'Archivé' : 'Brouillon'}</span></td><td data-label="Action"><button class="owner-dashboard__edit" type="button" data-owner-edit-product="${escapeHtml(product.id)}">Modifier</button></td></tr>`).join('');
  };

  const renderOrders = orders => {
    if (!ordersBody) return;
    if (!orders.length) {
      ordersBody.innerHTML = '<tr><td colspan="6" class="owner-dashboard__empty">Aucune commande pour le moment.</td></tr>';
      renderSummary(0);
      return;
    }
    ordersBody.innerHTML = orders.map(order => `<tr><td data-label="Date">${formatDate(order.created_at)}</td><td data-label="Commande / client"><div class="owner-dashboard__product"><strong>${escapeHtml(order.order_number || 'Commande sans numéro')}</strong><span>${escapeHtml(order.customer_name || order.customer_email)}${order.customer_phone ? ` · ${escapeHtml(order.customer_phone)}` : ''}</span></div></td><td data-label="Livraison"><strong>Livraison à domicile</strong>${order.delivery_address ? `<br><span class="owner-dashboard__address">${escapeHtml(order.delivery_address)}</span>` : ''}</td><td data-label="Total">${formatMoney(order.total_cents)}</td><td data-label="Paiement"><span class="owner-dashboard__status-badge owner-dashboard__status-badge--${escapeHtml(order.payment_status)}">${escapeHtml(order.payment_status)}</span></td><td data-label="État"><select class="owner-dashboard__order-status" data-owner-order-status="${escapeHtml(order.id)}" aria-label="État de ${escapeHtml(order.order_number || 'la commande')}">${orderStatuses.map(status => `<option value="${status}"${status === order.status ? ' selected' : ''}>${statusLabels[status]}</option>`).join('')}</select></td></tr>`).join('');
    renderSummary(orders.length);
  };

  const loadProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    const ids = (data || []).map(product => product.id);
    let prices = [];
    if (ids.length) {
      const response = await supabase.from('product_prices').select('id, product_id, grams, price_cents').in('product_id', ids).order('grams');
      if (response.error) throw response.error;
      prices = response.data || [];
    }
    products = (data || []).map(product => ({ ...product, pricing_tiers: prices.filter(tier => tier.product_id === product.id) }));
    renderProducts();
  };

  const loadOrders = async () => {
    const { data, error } = await supabase.from('orders').select('id, order_number, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, total_cents, status, payment_status, created_at').order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    renderOrders(data || []);
  };

  const syncPricingFields = () => {
    const isFlower = $('#ownerProductCategory')?.value === 'fleurs';
    $('#ownerFlowerPricingFields')?.classList.toggle('hidden', !isFlower);
    flowerTierGrams.forEach(grams => { const field = $(`#ownerProductPrice${grams}`); if (field) field.disabled = !isFlower; });
  };

  const resetProductForm = () => {
    $('#ownerProductForm')?.reset();
    if ($('#ownerProductId')) $('#ownerProductId').value = '';
    if ($('#ownerProductStock')) $('#ownerProductStock').value = '0';
    if ($('#ownerProductFormTitle')) $('#ownerProductFormTitle').textContent = 'Nouveau produit';
    flowerTierGrams.forEach(grams => { const field = $(`#ownerProductPrice${grams}`); if (field) field.value = ''; });
    syncPricingFields();
    setMessage('#ownerProductMessage', '');
    $('#ownerProductForm')?.classList.add('hidden');
  };

  const editProduct = id => {
    const product = products.find(item => item.id === id);
    if (!product) return;
    $('#ownerProductId').value = product.id;
    $('#ownerProductName').value = product.name;
    $('#ownerProductCategory').value = product.category;
    $('#ownerProductPrice').value = product.price_cents === null ? '' : (product.price_cents / 100).toFixed(2);
    $('#ownerProductStock').value = product.stock_quantity;
    $('#ownerProductStatus').value = product.status;
    $('#ownerProductAvailability').value = product.availability_state || 'incomplete';
    $('#ownerProductDescription').value = product.description || '';
    flowerTierGrams.forEach(grams => { const tier = product.pricing_tiers?.find(item => item.grams === grams); $(`#ownerProductPrice${grams}`).value = tier ? (tier.price_cents / 100).toFixed(2) : ''; });
    syncPricingFields();
    $('#ownerProductFormTitle').textContent = 'Modifier le produit';
    $('#ownerProductForm').classList.remove('hidden');
    $('#ownerProductForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const saveProduct = async event => {
    event.preventDefault();
    setMessage('#ownerProductMessage', 'Enregistrement…');
    const id = $('#ownerProductId').value;
    const name = $('#ownerProductName').value.trim();
    const category = $('#ownerProductCategory').value;
    const tiers = flowerTierGrams.map(grams => { const value = $(`#ownerProductPrice${grams}`).value.trim(); return { grams, value, price_cents: value === '' ? null : Math.round(Number(value) * 100) }; });
    if (category === 'fleurs' && tiers.some(tier => tier.value === '' || !Number.isFinite(tier.price_cents) || tier.price_cents < 0)) {
      setMessage('#ownerProductMessage', 'Renseigne les cinq tarifs fleurs : 1 g, 3 g, 5 g, 10 g et 25 g.', true);
      return;
    }
    const priceValue = $('#ownerProductPrice').value.trim();
    const payload = { name, category, description: $('#ownerProductDescription').value.trim(), price_cents: priceValue === '' ? null : Math.round(Number(priceValue) * 100), stock_quantity: Number($('#ownerProductStock').value), status: $('#ownerProductStatus').value, availability_state: $('#ownerProductAvailability').value };
    if (!id) payload.slug = `${slugify(name)}-${Date.now().toString(36).slice(-5)}`;
    const request = id ? supabase.from('products').update(payload).eq('id', id) : supabase.from('products').insert(payload).select('id').single();
    const { data: saved, error } = await request;
    if (error) { setMessage('#ownerProductMessage', error.message, true); return; }
    const productId = id || saved?.id;
    if (category === 'fleurs') {
      const { error: tierError } = await supabase.from('product_prices').upsert(tiers.map(tier => ({ product_id: productId, grams: tier.grams, price_cents: tier.price_cents })), { onConflict: 'product_id,grams' });
      if (tierError) { setMessage('#ownerProductMessage', `Produit enregistré, mais les tarifs fleurs n’ont pas pu être enregistrés : ${tierError.message}`, true); return; }
    } else if (productId) {
      const { error: tierError } = await supabase.from('product_prices').delete().eq('product_id', productId);
      if (tierError) { setMessage('#ownerProductMessage', `Produit enregistré, mais les anciens tarifs fleurs n’ont pas pu être retirés : ${tierError.message}`, true); return; }
    }
    resetProductForm();
    await loadProducts();
  };

  const updateOrderStatus = async (id, status, select) => {
    select.disabled = true;
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    select.disabled = false;
    if (error) { setMessage('#ownerOrderMessage', `Impossible de mettre à jour la commande : ${error.message}`, true); await loadOrders(); return; }
    setMessage('#ownerOrderMessage', 'État de la commande mis à jour.');
  };

  $('#ownerNewProductButton')?.addEventListener('click', () => { resetProductForm(); $('#ownerProductForm')?.classList.remove('hidden'); $('#ownerProductForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  $('#ownerCancelProductButton')?.addEventListener('click', resetProductForm);
  $('#ownerCancelProductButtonBottom')?.addEventListener('click', resetProductForm);
  $('#ownerProductForm')?.addEventListener('submit', saveProduct);
  $('#ownerProductCategory')?.addEventListener('change', syncPricingFields);
  productsBody?.addEventListener('click', event => { const button = event.target.closest('[data-owner-edit-product]'); if (button) editProduct(button.dataset.ownerEditProduct); });
  ordersBody?.addEventListener('change', event => { const select = event.target.closest('[data-owner-order-status]'); if (select) void updateOrderStatus(select.dataset.ownerOrderStatus, select.value, select); });
  syncPricingFields();
  root.classList.remove('hidden');
  root.setAttribute('aria-hidden', 'false');
  try { await Promise.all([loadProducts(), loadOrders()]); } catch (error) { setMessage('#ownerProductMessage', `Impossible de charger les données : ${error.message}`, true); }
  return { hide() { root.classList.add('hidden'); root.setAttribute('aria-hidden', 'true'); } };
}
