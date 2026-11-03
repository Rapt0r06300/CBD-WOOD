import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';

const config = window.WOOD_SUPABASE_CONFIG;
const supabase = config ? createClient(config.url, config.publishableKey) : null;
const $ = (selector) => document.querySelector(selector);
const categoryLabels = {
  fleurs: 'Fleurs CBD',
  resines: 'Résines',
  'bien-etre': 'Bien-être',
  'wood-shop': 'WOOD Shop'
};

let products = [];
const flowerTierGrams = [1, 3, 5, 10, 25];
const orderStatuses = ['pending', 'confirmed', 'ready', 'completed', 'cancelled'];

function setMessage(selector, message, isError = false) {
  const element = $(selector);
  if (!element) return;
  element.textContent = message || '';
  element.classList.toggle('is-error', isError);
}

function formatMoney(cents) {
  if (cents === null || cents === undefined || cents === '') return 'À renseigner';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value));
}

function slugify(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function showAuth() {
  $('#authView')?.classList.remove('hidden');
  $('#dashboardView')?.classList.add('hidden');
  $('#logoutButton')?.classList.add('hidden');
}

function showLoginView() {
  $('#loginForm')?.classList.remove('hidden');
  $('#resetRequestForm')?.classList.add('hidden');
  $('#newPasswordForm')?.classList.add('hidden');
}

function showResetRequestView() {
  $('#loginForm')?.classList.add('hidden');
  $('#resetRequestForm')?.classList.remove('hidden');
  $('#newPasswordForm')?.classList.add('hidden');
}

function showNewPasswordView() {
  $('#loginForm')?.classList.add('hidden');
  $('#resetRequestForm')?.classList.add('hidden');
  $('#newPasswordForm')?.classList.remove('hidden');
}

function authErrorMessage(error) {
  if (error?.code === 'invalid_credentials' || error?.message?.toLowerCase().includes('invalid login credentials')) {
    return 'Adresse e-mail ou mot de passe incorrect. Vérifie les majuscules, le symbole final et les espaces.';
  }
  if (error?.code === 'email_not_confirmed') return 'Confirme d’abord l’adresse e-mail du compte propriétaire.';
  if (error?.code === 'over_email_send_rate_limit') return 'Trop de demandes d’e-mail. Attends quelques minutes avant de réessayer.';
  return error?.message || 'Une erreur est survenue. Réessaie dans un instant.';
}

function showDashboard() {
  $('#authView')?.classList.add('hidden');
  $('#dashboardView')?.classList.remove('hidden');
  $('#logoutButton')?.classList.remove('hidden');
}

function renderSummary(orderCount = 0) {
  const published = products.filter((product) => product.status === 'published').length;
  const lowStock = products.filter((product) => product.stock_quantity < 5).length;
  $('#summaryGrid').innerHTML = [
    ['products', products.length, 'Produits au catalogue'],
    ['published', published, 'Produits publiés'],
    ['stock', lowStock, 'Stocks à vérifier'],
    ['orders', orderCount, 'Commandes reçues']
  ].map(([, value, label]) => `<div class="admin-stat"><strong>${value}</strong><span>${label}</span></div>`).join('');
}

function renderProducts() {
  const body = $('#productsBody');
  if (!products.length) {
    body.innerHTML = '<tr><td colspan="6" class="admin-empty">Aucun produit pour le moment. Ajoute la première référence.</td></tr>';
    return;
  }
  body.innerHTML = products.map((product) => `
    <tr>
      <td data-label="Produit"><div class="table-product"><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.slug)}</span></div></td>
      <td data-label="Catégorie">${escapeHtml(categoryLabels[product.category] || product.category)}</td>
      <td data-label="Prix">${product.category === 'fleurs' && product.pricing_tiers?.length ? product.pricing_tiers.map((tier) => `${tier.grams} g · ${formatMoney(tier.price_cents)}`).join('<br>') : formatMoney(product.price_cents)}</td>
      <td data-label="Stock">${product.stock_quantity}</td>
      <td data-label="Statut"><span class="table-status table-status--${product.status}">${product.status === 'published' ? 'Publié' : product.status === 'archived' ? 'Archivé' : 'Brouillon'}</span></td>
      <td data-label="Action"><button class="table-edit" type="button" data-edit-product="${product.id}">Modifier</button></td>
    </tr>`).join('');
}

function renderOrders(orders) {
  const body = $('#ordersBody');
  if (!orders.length) {
    body.innerHTML = '<tr><td colspan="6" class="admin-empty">Aucune commande pour le moment.</td></tr>';
    renderSummary(0);
    return;
  }
  const modeLabels = { delivery: 'Livraison à domicile' };
  const statusLabels = { pending: 'En attente', confirmed: 'Confirmée', ready: 'Prête', completed: 'Remise', cancelled: 'Annulée' };
  body.innerHTML = orders.map((order) => `
    <tr>
      <td data-label="Date">${formatDate(order.created_at)}</td>
      <td data-label="Commande / client"><div class="table-product"><strong>${escapeHtml(order.order_number || 'Commande sans numéro')}</strong><span>${escapeHtml(order.customer_name || order.customer_email)}${order.customer_phone ? ` · ${escapeHtml(order.customer_phone)}` : ''}</span></div></td>
      <td data-label="Livraison"><strong>${escapeHtml(modeLabels[order.fulfillment_mode] || 'À préciser')}</strong>${order.delivery_address ? `<br><span class="table-address">${escapeHtml(order.delivery_address)}</span>` : ''}</td>
      <td data-label="Total">${formatMoney(order.total_cents)}</td>
      <td data-label="Paiement"><span class="table-status table-status--${order.payment_status}">${escapeHtml(order.payment_status)}</span></td>
      <td data-label="État"><select class="admin-order-status" data-order-status="${escapeHtml(order.id)}" aria-label="État de ${escapeHtml(order.order_number || 'la commande')}">${orderStatuses.map((status) => `<option value="${status}"${status === order.status ? ' selected' : ''}>${statusLabels[status]}</option>`).join('')}</select></td>
    </tr>`).join('');
  renderSummary(orders.length);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

async function loadProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  const ids = (data || []).map((product) => product.id);
  let priceRows = [];
  if (ids.length) {
    const { data: prices, error: priceError } = await supabase.from('product_prices').select('id, product_id, grams, price_cents').in('product_id', ids).order('grams');
    if (priceError) throw priceError;
    priceRows = prices || [];
  }
  products = (data || []).map((product) => ({ ...product, pricing_tiers: priceRows.filter((tier) => tier.product_id === product.id) }));
  renderProducts();
}

async function loadOrders() {
  const { data, error } = await supabase.from('orders').select('id, order_number, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, total_cents, status, payment_status, created_at').order('created_at', { ascending: false }).limit(100);
  if (error) throw error;
  renderOrders(data || []);
}

async function updateOrderStatus(id, status, select) {
  select.disabled = true;
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  select.disabled = false;
  if (error) {
    setMessage('#orderMessage', `Impossible de mettre à jour la commande : ${error.message}`, true);
    await loadOrders();
    return;
  }
  setMessage('#orderMessage', 'État de la commande mis à jour.');
}

async function enterDashboard(user) {
  const { data: owner, error: ownerError } = await supabase.from('owner_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (ownerError) {
    showAuth();
    setMessage('#authMessage', `La base n'est pas encore disponible : ${ownerError.message}`, true);
    return;
  }
  if (!owner) {
    await supabase.auth.signOut();
    showAuth();
    setMessage('#authMessage', 'Ce compte n’a pas encore été autorisé pour l’espace propriétaire.', true);
    return;
  }
  showDashboard();
  try {
    await Promise.all([loadProducts(), loadOrders()]);
  } catch (error) {
    setMessage('#productMessage', `Impossible de charger les données : ${error.message}`, true);
  }
}

function resetProductForm() {
  $('#productForm').reset();
  $('#productId').value = '';
  $('#productStock').value = '0';
  $('#productFormTitle').textContent = 'Nouveau produit';
  flowerTierGrams.forEach((grams) => { $(`#productPrice${grams}`).value = ''; });
  syncPricingFields();
  setMessage('#productMessage', '');
  $('#productForm').classList.add('hidden');
}

function editProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  $('#productId').value = product.id;
  $('#productName').value = product.name;
  $('#productCategory').value = product.category;
  $('#productPrice').value = product.price_cents === null ? '' : (product.price_cents / 100).toFixed(2);
  $('#productStock').value = product.stock_quantity;
  $('#productStatus').value = product.status;
  $('#productDescription').value = product.description || '';
  flowerTierGrams.forEach((grams) => {
    const tier = product.pricing_tiers?.find((item) => item.grams === grams);
    $(`#productPrice${grams}`).value = tier ? (tier.price_cents / 100).toFixed(2) : '';
  });
  syncPricingFields();
  $('#productFormTitle').textContent = 'Modifier le produit';
  $('#productForm').classList.remove('hidden');
  $('#productForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function syncPricingFields() {
  const isFlower = $('#productCategory')?.value === 'fleurs';
  $('#flowerPricingFields')?.classList.toggle('hidden', !isFlower);
  flowerTierGrams.forEach((grams) => {
    const field = $(`#productPrice${grams}`);
    if (field) field.disabled = !isFlower;
  });
}

function readFlowerTiers() {
  return flowerTierGrams.map((grams) => {
    const value = $(`#productPrice${grams}`).value.trim();
    return { grams, value, price_cents: value === '' ? null : Math.round(Number(value) * 100) };
  });
}

async function saveProduct(event) {
  event.preventDefault();
  setMessage('#productMessage', 'Enregistrement…');
  const id = $('#productId').value;
  const name = $('#productName').value.trim();
  const priceValue = $('#productPrice').value.trim();
  const category = $('#productCategory').value;
  const tiers = readFlowerTiers();
  if (category === 'fleurs' && tiers.some((tier) => tier.value === '' || !Number.isFinite(tier.price_cents) || tier.price_cents < 0)) {
    setMessage('#productMessage', 'Renseigne les cinq tarifs fleurs : 1 g, 3 g, 5 g, 10 g et 25 g.', true);
    return;
  }
  const payload = {
    name,
    category,
    description: $('#productDescription').value.trim(),
    price_cents: priceValue === '' ? null : Math.round(Number(priceValue) * 100),
    stock_quantity: Number($('#productStock').value),
    status: $('#productStatus').value
  };
  if (!id) payload.slug = `${slugify(name)}-${Date.now().toString(36).slice(-5)}`;
  const request = id ? supabase.from('products').update(payload).eq('id', id) : supabase.from('products').insert(payload).select('id').single();
  const { data: saved, error } = await request;
  if (error) {
    setMessage('#productMessage', error.message, true);
    return;
  }
  const productId = id || saved?.id;
  if (category === 'fleurs') {
    const { error: tierError } = await supabase.from('product_prices').upsert(tiers.map((tier) => ({ product_id: productId, grams: tier.grams, price_cents: tier.price_cents })), { onConflict: 'product_id,grams' });
    if (tierError) {
      setMessage('#productMessage', `Produit enregistré, mais les tarifs fleurs n’ont pas pu être enregistrés : ${tierError.message}`, true);
      return;
    }
  } else if (productId) {
    const { error: tierError } = await supabase.from('product_prices').delete().eq('product_id', productId);
    if (tierError) {
      setMessage('#productMessage', `Produit enregistré, mais les anciens tarifs fleurs n’ont pas pu être retirés : ${tierError.message}`, true);
      return;
    }
  }
  resetProductForm();
  await loadProducts();
  setMessage('#productMessage', '');
}

async function boot() {
  if (!supabase) {
    setMessage('#authMessage', 'La configuration Supabase est absente.', true);
    return;
  }
  $('#togglePasswordButton').addEventListener('click', () => {
    const input = $('#loginPassword');
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    $('#togglePasswordButton').textContent = visible ? 'Afficher' : 'Masquer';
  });
  $('#forgotPasswordButton').addEventListener('click', () => {
    $('#resetEmail').value = $('#loginEmail').value.trim();
    setMessage('#resetMessage', '');
    showResetRequestView();
  });
  $('#cancelResetButton').addEventListener('click', () => {
    showLoginView();
    setMessage('#authMessage', '');
  });
  $('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = $('#loginButton');
    button.disabled = true;
    button.textContent = 'Connexion…';
    setMessage('#authMessage', 'Connexion…');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: $('#loginEmail').value.trim(),
      password: $('#loginPassword').value
    });
    if (error) {
      setMessage('#authMessage', authErrorMessage(error), true);
      button.disabled = false;
      button.textContent = 'Ouvrir l’espace';
      return;
    }
    await enterDashboard(data.user);
    button.disabled = false;
    button.textContent = 'Ouvrir l’espace';
  });
  $('#resetRequestForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = $('#sendResetButton');
    const email = $('#resetEmail').value.trim();
    button.disabled = true;
    button.textContent = 'Envoi…';
    setMessage('#resetMessage', 'Envoi du lien…');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}`
    });
    if (error) setMessage('#resetMessage', authErrorMessage(error), true);
    else setMessage('#resetMessage', 'Si ce compte existe, un lien sécurisé vient d’être envoyé.');
    button.disabled = false;
    button.textContent = 'Envoyer le lien';
  });
  $('#newPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = $('#newPassword').value;
    if (password !== $('#confirmPassword').value) {
      setMessage('#newPasswordMessage', 'Les deux mots de passe sont différents.', true);
      return;
    }
    const button = $('#savePasswordButton');
    button.disabled = true;
    button.textContent = 'Enregistrement…';
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage('#newPasswordMessage', authErrorMessage(error), true);
      button.disabled = false;
      button.textContent = 'Enregistrer le mot de passe';
      return;
    }
    await supabase.auth.signOut();
    window.history.replaceState({}, document.title, window.location.pathname);
    showLoginView();
    $('#loginEmail').value = $('#resetEmail').value.trim();
    setMessage('#authMessage', 'Mot de passe modifié. Tu peux maintenant te connecter.');
    button.disabled = false;
    button.textContent = 'Enregistrer le mot de passe';
  });
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') showNewPasswordView();
  });
  $('#logoutButton').addEventListener('click', async () => {
    await supabase.auth.signOut();
    showAuth();
  });
  $('#newProductButton').addEventListener('click', () => {
    resetProductForm();
    $('#productForm').classList.remove('hidden');
    $('#productForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#cancelProductButton').addEventListener('click', resetProductForm);
  $('#cancelProductButtonBottom').addEventListener('click', resetProductForm);
  $('#productForm').addEventListener('submit', saveProduct);
  $('#productCategory').addEventListener('change', syncPricingFields);
  $('#productsBody').addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit-product]');
    if (button) editProduct(button.dataset.editProduct);
  });
  $('#ordersBody').addEventListener('change', (event) => {
    const select = event.target.closest('[data-order-status]');
    if (select) updateOrderStatus(select.dataset.orderStatus, select.value, select);
  });
  syncPricingFields();
  const recoveryInUrl = window.location.hash.includes('type=recovery') || new URLSearchParams(window.location.search).get('type') === 'recovery';
  const { data: { session } } = await supabase.auth.getSession();
  if (recoveryInUrl) showNewPasswordView();
  else if (session?.user) await enterDashboard(session.user);
}

boot();
