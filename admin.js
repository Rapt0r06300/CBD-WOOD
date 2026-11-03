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
      <td><div class="table-product"><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.slug)}</span></div></td>
      <td>${escapeHtml(categoryLabels[product.category] || product.category)}</td>
      <td>${formatMoney(product.price_cents)}</td>
      <td>${product.stock_quantity}</td>
      <td><span class="table-status table-status--${product.status}">${product.status === 'published' ? 'Publié' : product.status === 'archived' ? 'Archivé' : 'Brouillon'}</span></td>
      <td><button class="table-edit" type="button" data-edit-product="${product.id}">Modifier</button></td>
    </tr>`).join('');
}

function renderOrders(orders) {
  const body = $('#ordersBody');
  if (!orders.length) {
    body.innerHTML = '<tr><td colspan="5" class="admin-empty">Aucune commande pour le moment.</td></tr>';
    renderSummary(0);
    return;
  }
  body.innerHTML = orders.map((order) => `
    <tr>
      <td>${formatDate(order.created_at)}</td>
      <td>${escapeHtml(order.customer_email)}</td>
      <td>${formatMoney(order.total_cents)}</td>
      <td><span class="table-status table-status--${order.payment_status}">${escapeHtml(order.payment_status)}</span></td>
      <td><span class="table-status">${escapeHtml(order.status)}</span></td>
    </tr>`).join('');
  renderSummary(orders.length);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

async function loadProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  products = data || [];
  renderProducts();
}

async function loadOrders() {
  const { data, error } = await supabase.from('orders').select('id, customer_email, total_cents, status, payment_status, created_at').order('created_at', { ascending: false }).limit(100);
  if (error) throw error;
  renderOrders(data || []);
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
  $('#productFormTitle').textContent = 'Modifier le produit';
  $('#productForm').classList.remove('hidden');
  $('#productForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function saveProduct(event) {
  event.preventDefault();
  setMessage('#productMessage', 'Enregistrement…');
  const id = $('#productId').value;
  const name = $('#productName').value.trim();
  const priceValue = $('#productPrice').value.trim();
  const payload = {
    name,
    category: $('#productCategory').value,
    description: $('#productDescription').value.trim(),
    price_cents: priceValue === '' ? null : Math.round(Number(priceValue) * 100),
    stock_quantity: Number($('#productStock').value),
    status: $('#productStatus').value
  };
  if (!id) payload.slug = `${slugify(name)}-${Date.now().toString(36).slice(-5)}`;
  const request = id ? supabase.from('products').update(payload).eq('id', id) : supabase.from('products').insert(payload);
  const { error } = await request;
  if (error) {
    setMessage('#productMessage', error.message, true);
    return;
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
  $('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('#authMessage', 'Connexion…');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: $('#loginEmail').value.trim(),
      password: $('#loginPassword').value
    });
    if (error) {
      setMessage('#authMessage', error.message, true);
      return;
    }
    await enterDashboard(data.user);
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
  $('#productsBody').addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit-product]');
    if (button) editProduct(button.dataset.editProduct);
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) await enterDashboard(session.user);
}

boot();
