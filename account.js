import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';
import { mountOwnerDashboard } from './owner-dashboard.js?v=wood-owner-dashboard-v1-20261104';

const config = window.WOOD_SUPABASE_CONFIG;
const supabase = config ? createClient(config.url, config.publishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
}) : null;
const form = document.querySelector('[data-account-form]');
const accountCard = document.querySelector('.account-card');
const dashboard = document.getElementById('accountDashboard');
const message = document.getElementById('accountMessage');
const action = document.getElementById('accountAction');
const ownerDashboardLink = document.getElementById('ownerDashboardLink');
const ownerDashboard = document.getElementById('ownerDashboard');
let ownerDashboardApi = null;
let mode = 'login';
let authenticatedViewVisible = false;
let accountSnapshot = { user: null, profile: null, orders: [], documents: [] };

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&#38;', '<': '&#60;', '>': '&#62;', "'": '&#39;', '"': '&#34;' }[character]));
const formatMoney = cents => `${(Number(cents || 0) / 100).toFixed(2).replace('.', ',')} €`;
const modeLabels = { delivery: 'Livraison à domicile' };
const statusLabels = { pending: 'En attente', paid: 'Payée', preparing: 'En préparation', ready: 'Prête', completed: 'Terminée', cancelled: 'Annulée' };
const documentLabels = { order_confirmation: 'Confirmation', payment_receipt: 'Reçu de paiement', invoice: 'Facture' };

function setOwnerDashboardVisibility(isOwner) {
  if (!ownerDashboardLink) return;
  ownerDashboardLink.classList.toggle('hidden', !isOwner);
  ownerDashboardLink.setAttribute('aria-hidden', String(!isOwner));
  ownerDashboardLink.tabIndex = isOwner ? 0 : -1;
  ownerDashboard?.classList.toggle('hidden', !isOwner);
  ownerDashboard?.setAttribute('aria-hidden', String(!isOwner));
}

function showMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.classList.toggle('hidden', !text);
  message.classList.toggle('is-error', isError);
}

function setProfileMessage(text, isError = false) {
  const node = document.getElementById('profileMessage');
  if (!node) return;
  node.textContent = text;
  node.classList.toggle('hidden', !text);
  node.classList.toggle('is-error', isError);
}

function setRightsMessage(text, isError = false) {
  const node = document.getElementById('accountRightsMessage');
  if (!node) return;
  node.textContent = text;
  node.classList.toggle('hidden', !text);
  node.classList.toggle('is-error', isError);
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll('[data-account-tab]').forEach(tab => tab.classList.toggle('is-active', tab.dataset.accountTab === mode));
  if (action) action.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte';
  showMessage('');
}

function showLogin() {
  authenticatedViewVisible = false;
  accountSnapshot = { user: null, profile: null, orders: [], documents: [] };
  accountCard?.classList.remove('hidden');
  dashboard?.classList.add('hidden');
  ownerDashboardApi?.hide();
  ownerDashboardApi = null;
  setOwnerDashboardVisibility(false);
}

function renderOrders(orders, documents = []) {
  const container = document.getElementById('accountOrders');
  if (!container) return;
  if (!orders.length) {
    container.innerHTML = '<p class="account-dashboard__muted">Aucune commande enregistrée pour le moment.</p>';
    return;
  }
  container.innerHTML = orders.map(order => {
    const orderDocuments = documents.filter(document => document.order_id === order.id && document.status === 'ready');
    const documentButtons = orderDocuments.map(document => `<button class="account-order__document" type="button" data-document-id="${escapeHtml(document.id)}">${escapeHtml(documentLabels[document.document_kind] || 'Document')} ↗</button>`).join('');
    return `
    <article class="account-order">
      <div class="account-order__head"><strong>${escapeHtml(order.order_number || 'Commande WOOD')}</strong><span>${escapeHtml(statusLabels[order.status] || order.status)}</span></div>
      <p>${escapeHtml(modeLabels[order.fulfillment_mode] || order.fulfillment_mode)} · ${escapeHtml(formatMoney(order.total_cents))}</p>
      ${documentButtons ? `<div class="account-order__documents" aria-label="Documents de la commande">${documentButtons}</div>` : ''}
    </article>`;
  }).join('');
}

async function saveCustomerProfile(user, values = {}) {
  const { error } = await supabase.from('customer_profiles').upsert({ id: user.id, full_name: values.full_name ?? null, phone: values.phone ?? null }, { onConflict: 'id' });
  if (error) throw error;
}

async function getValidatedUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

async function showAccount(user) {
  const passwordUsername = document.getElementById('passwordUsername');
  if (passwordUsername) passwordUsername.value = user?.email || '';
  const [{ data: profile }, { data: orders, error: ordersError }, { data: documents, error: documentsError }, { data: owner, error: ownerError }] = await Promise.all([
    supabase.from('customer_profiles').select('full_name, phone').eq('id', user.id).maybeSingle(),
    supabase.from('orders').select('id, order_number, fulfillment_mode, status, total_cents, created_at').eq('customer_id', user.id).order('created_at', { ascending: false }).limit(50),
    supabase.from('invoice_documents').select('id, order_id, document_kind, document_number, status, created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('owner_users').select('user_id').eq('user_id', user.id).maybeSingle()
  ]);
  if (ordersError) throw ordersError;
  if (documentsError) throw documentsError;
  const isOwner = !ownerError && Boolean(owner);
  setOwnerDashboardVisibility(isOwner);
  if (isOwner && !ownerDashboardApi) ownerDashboardApi = await mountOwnerDashboard({ supabase, config });
  accountCard?.classList.add('hidden');
  dashboard?.classList.remove('hidden');
  const welcome = document.getElementById('accountWelcome');
  if (welcome) welcome.textContent = user.email || 'Votre espace client sécurisé';
  const name = document.getElementById('profileName');
  const phone = document.getElementById('profilePhone');
  if (name) name.value = profile?.full_name || '';
  if (phone) phone.value = profile?.phone || '';
  renderOrders(orders || [], documents || []);
  accountSnapshot = { user, profile: profile || null, orders: orders || [], documents: documents || [] };
  authenticatedViewVisible = true;
}

async function requestPasswordReset() {
  if (!supabase) return showMessage('La connexion sécurisée n’est pas disponible pour le moment.', true);
  const email = document.getElementById('account-email')?.value.trim();
  if (!email) return showMessage('Renseigne ton adresse e-mail pour recevoir le lien de réinitialisation.', true);
  try {
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}${window.location.pathname}?mode=reset` });
    showMessage('Un lien de réinitialisation vient d’être envoyé si cette adresse possède un compte.');
  } catch (error) {
    showMessage(error.message || 'Impossible d’envoyer le lien de réinitialisation.', true);
  }
}

async function updatePassword(event) {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  const password = document.getElementById('newPassword')?.value || '';
  if (password.length < 8) return setRightsMessage('Le mot de passe doit contenir au moins 8 caractères.', true);
  button.disabled = true;
  setRightsMessage('Mise à jour…');
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    event.currentTarget.reset();
    setRightsMessage('Mot de passe mis à jour.');
  } catch (error) {
    setRightsMessage(error.message || 'Impossible de mettre à jour le mot de passe.', true);
  } finally {
    button.disabled = false;
  }
}

function downloadAccountData() {
  if (!accountSnapshot.user) return setRightsMessage('Connecte-toi pour exporter tes données.', true);
  const payload = {
    exportVersion: 1,
    exportedAt: new Date().toISOString(),
    account: { id: accountSnapshot.user.id, email: accountSnapshot.user.email || null },
    profile: accountSnapshot.profile,
    orders: accountSnapshot.orders,
    documents: accountSnapshot.documents
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `wood-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setRightsMessage('Export téléchargé.');
}

async function requestAccountDeletion() {
  if (!accountSnapshot.user) return setRightsMessage('Connecte-toi pour demander la suppression.', true);
  const confirmed = window.confirm('Envoyer une demande de suppression de ce compte ?');
  if (!confirmed) return;
  const button = document.getElementById('requestAccountDeletionButton');
  button.disabled = true;
  setRightsMessage('Enregistrement de la demande…');
  try {
    const { error } = await supabase.from('account_deletion_requests').insert({ user_id: accountSnapshot.user.id, status: 'requested' });
    if (error?.code === '23505') {
      setRightsMessage('Une demande de suppression est déjà enregistrée.');
      return;
    }
    if (error) throw error;
    setRightsMessage('Demande enregistrée. Elle sera traitée après vérification par la propriétaire.');
  } catch (error) {
    setRightsMessage(error.message || 'Impossible d’enregistrer la demande.', true);
  } finally {
    button.disabled = false;
  }
}

async function downloadDocument(documentId) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token || !config?.url) throw new Error('Session invalide.');
  const response = await fetch(`${config.url}/functions/v1/document-download?document_id=${encodeURIComponent(documentId)}`, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.url) throw new Error(payload.error || 'Document indisponible.');
  window.open(payload.url, '_blank', 'noopener,noreferrer');
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!supabase) {
    showMessage('La connexion sécurisée n’est pas disponible pour le moment.', true);
    return;
  }
  const email = document.getElementById('account-email').value.trim();
  const password = document.getElementById('account-password').value;
  action.disabled = true;
  action.textContent = 'Chargement…';
  try {
    if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await saveCustomerProfile(data.user);
      await showAccount(data.user);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` } });
      if (error) throw error;
      if (data.session && data.user) {
        await saveCustomerProfile(data.user);
        await showAccount(data.user);
      } else {
        showMessage('Compte créé. Vérifie ta boîte e-mail pour confirmer ton adresse avant de te connecter.');
      }
    }
  } catch (error) {
    showMessage(error.message || 'Une erreur est survenue.', true);
  } finally {
    action.disabled = false;
    action.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte';
  }
}

async function saveProfile(event) {
  event.preventDefault();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return showLogin();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  setProfileMessage('Enregistrement…');
  try {
    await saveCustomerProfile(user, { full_name: document.getElementById('profileName').value.trim(), phone: document.getElementById('profilePhone').value.trim() });
    setProfileMessage('Informations enregistrées.');
  } catch (error) {
    setProfileMessage(error.message || 'Impossible d’enregistrer les informations.', true);
  } finally {
    button.disabled = false;
  }
}

async function boot() {
  if (!supabase) {
    showMessage('La configuration Supabase est absente.', true);
    return;
  }
  document.querySelectorAll('[data-account-tab]').forEach(tab => tab.addEventListener('click', () => setMode(tab.dataset.accountTab)));
  form?.addEventListener('submit', handleSubmit);
  document.getElementById('forgotPasswordButton')?.addEventListener('click', () => void requestPasswordReset());
  document.getElementById('profileForm')?.addEventListener('submit', saveProfile);
  document.getElementById('passwordUpdateForm')?.addEventListener('submit', updatePassword);
  document.getElementById('downloadAccountDataButton')?.addEventListener('click', downloadAccountData);
  document.getElementById('requestAccountDeletionButton')?.addEventListener('click', () => void requestAccountDeletion());
  document.getElementById('accountOrders')?.addEventListener('click', event => {
    const button = event.target.closest('[data-document-id]');
    if (!button) return;
    button.disabled = true;
    void downloadDocument(button.dataset.documentId)
      .catch(error => showMessage(error.message || 'Document indisponible.', true))
      .finally(() => { button.disabled = false; });
  });
  ownerDashboardLink?.addEventListener('click', () => ownerDashboard?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  document.getElementById('accountLogout')?.addEventListener('click', async () => {
    authenticatedViewVisible = false;
    await supabase.auth.signOut();
    showLogin();
    showMessage('Vous êtes déconnecté.');
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    try {
      const user = await getValidatedUser();
      if (user) await showAccount(user);
      else showLogin();
    } catch (error) { showMessage(error.message || 'Impossible de charger votre espace.', true); }
  }
  supabase.auth.onAuthStateChange((event, nextSession) => {
    if (event === 'SIGNED_OUT') {
      const sessionExpired = authenticatedViewVisible;
      showLogin();
      if (sessionExpired) showMessage('Votre session a expiré. Vos informations déjà saisies sont conservées : reconnectez-vous pour continuer.', true);
    }
    if (event === 'SIGNED_IN' && nextSession?.user && dashboard?.classList.contains('hidden')) {
      void getValidatedUser().then(user => user && showAccount(user)).catch(error => showMessage(error.message || 'Impossible de valider votre session.', true));
    }
  });
}

boot();
