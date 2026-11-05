const categoryLabels = { fleurs: 'Fleurs CBD', resines: 'Résines', 'bien-etre': 'Bien-être', 'wood-shop': 'WOOD Shop' };
const flowerTierGrams = [1, 3, 5, 10, 25];
const orderStatuses = ['pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled'];
const statusLabels = { pending: 'En attente', paid: 'Payée', preparing: 'En préparation', ready: 'Prête', completed: 'Terminée', cancelled: 'Annulée' };
const notificationKindLabels = { order_created: 'Commande créée', owner_order_alert: 'Alerte propriétaire', payment_confirmed: 'Paiement confirmé', invoice_ready: 'Document prêt', delivery_update: 'Livraison mise à jour', delivery_issue_alert: 'Problème de livraison', order_cancelled: 'Commande annulée', refund_confirmed: 'Remboursement confirmé' };
const notificationStatusLabels = { pending: 'À envoyer', processing: 'En cours', sent: 'Envoyé', failed: 'Échec', dead_letter: 'À reprendre', cancelled: 'Annulé' };
const newsletterStatusLabels = { draft: 'Brouillon', scheduled: 'Planifiée', sending: 'Envoi', paused: 'En pause', sent: 'Terminée', cancelled: 'Annulée', failed: 'Échec' };
const documentLabels = { order_confirmation: 'Confirmation', payment_receipt: 'Reçu de paiement', invoice: 'Facture' };

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
const formatMoney = cents => cents === null || cents === undefined || cents === '' ? 'À renseigner' : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(cents) / 100);
const formatDate = value => value ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value)) : '—';
const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function mountOwnerDashboard({ supabase, config = window.WOOD_SUPABASE_CONFIG }) {
  const root = document.getElementById('ownerDashboard');
  if (!root || !supabase) return null;
  const $ = selector => root.querySelector(selector);
  const productsBody = $('#ownerProductsBody');
  const ordersBody = $('#ownerOrdersBody');
  const notificationsBody = $('#ownerNotificationsBody');
  const newsletterBody = $('#ownerNewsletterBody');
  const newsletterForm = $('#ownerNewsletterForm');
  const newsletterPreview = $('#ownerNewsletterPreview');
  let products = [];
  let orders = [];
  let documents = [];

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

  const renderOrders = (orderRows = orders) => {
    if (!ordersBody) return;
    if (!orderRows.length) {
      ordersBody.innerHTML = '<tr><td colspan="7" class="owner-dashboard__empty">Aucune commande pour le moment.</td></tr>';
      renderSummary(0);
      return;
    }
    ordersBody.innerHTML = orderRows.map(order => {
      const orderDocuments = documents.filter(document => document.order_id === order.id && document.status === 'ready');
      const documentButtons = orderDocuments.map(document => `<button class="owner-dashboard__document" type="button" data-owner-document-id="${escapeHtml(document.id)}">${escapeHtml(documentLabels[document.document_kind] || 'Document')} ↗</button>`).join('');
      return `<tr><td data-label="Date">${formatDate(order.created_at)}</td><td data-label="Commande / client"><div class="owner-dashboard__product"><strong>${escapeHtml(order.order_number || 'Commande sans numéro')}</strong><span>${escapeHtml(order.customer_name || order.customer_email)}${order.customer_phone ? ` · ${escapeHtml(order.customer_phone)}` : ''}</span></div></td><td data-label="Livraison"><strong>Livraison à domicile</strong>${order.delivery_address ? `<br><span class="owner-dashboard__address">${escapeHtml(order.delivery_address)}</span>` : ''}</td><td data-label="Total">${formatMoney(order.total_cents)}</td><td data-label="Paiement"><span class="owner-dashboard__status-badge owner-dashboard__status-badge--${escapeHtml(order.payment_status)}">${escapeHtml(order.payment_status)}</span></td><td data-label="État"><select class="owner-dashboard__order-status" data-owner-order-status="${escapeHtml(order.id)}" aria-label="État de ${escapeHtml(order.order_number || 'la commande')}">${orderStatuses.map(status => `<option value="${status}"${status === order.status ? ' selected' : ''}>${statusLabels[status]}</option>`).join('')}</select></td><td data-label="Documents"><div class="owner-dashboard__documents">${documentButtons || '<span class="owner-dashboard__product">Pas encore disponible</span>'}</div></td></tr>`;
    }).join('');
    renderSummary(orderRows.length);
  };

  const renderNotifications = notifications => {
    if (!notificationsBody) return;
    if (!notifications.length) {
      notificationsBody.innerHTML = '<tr><td colspan="6" class="owner-dashboard__empty">Aucune notification à traiter pour le moment.</td></tr>';
      return;
    }
    notificationsBody.innerHTML = notifications.map(notification => {
      const status = notificationStatusLabels[notification.status] || notification.status || 'Inconnu';
      const statusClass = ['pending', 'processing', 'sent', 'failed', 'dead_letter', 'cancelled'].includes(notification.status) ? notification.status : 'pending';
      const orderId = String(notification.order_id || '—');
      const retryButton = ['failed', 'dead_letter'].includes(notification.status) ? `<button class="owner-dashboard__notification-retry" type="button" data-owner-notification-retry="${escapeHtml(notification.id)}">Relancer</button>` : '';
      return `<tr><td data-label="Date">${formatDate(notification.created_at)}</td><td data-label="Commande"><span class="owner-dashboard__address">…${escapeHtml(orderId.slice(-8))}</span></td><td data-label="Type">${escapeHtml(notificationKindLabels[notification.notification_kind] || notification.notification_kind)}</td><td data-label="État"><span class="owner-dashboard__status-badge owner-dashboard__status-badge--${statusClass}">${escapeHtml(status)}</span></td><td data-label="Tentatives">${escapeHtml(notification.attempts)}</td><td data-label="Erreur"><span class="owner-dashboard__address">${escapeHtml(notification.last_error || '—')}</span>${retryButton}</td></tr>`;
    }).join('');
  };

  const renderNewsletter = campaigns => {
    if (!newsletterBody) return;
    if (!campaigns.length) {
      newsletterBody.innerHTML = '<tr><td colspan="5" class="owner-dashboard__empty">Aucun brouillon pour le moment.</td></tr>';
      return;
    }
    newsletterBody.innerHTML = campaigns.map(campaign => {
      const counts = campaign.counts || {};
      const total = Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0);
      const accepted = Number(counts.accepted || 0);
      const failed = Number(counts.failed || 0);
      const deferred = Number(counts.deferred || 0);
      const status = newsletterStatusLabels[campaign.status] || campaign.status;
      const actions = [
        `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="preview" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Prévisualiser</button>`,
        `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="simulate" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Simuler l’audience</button>`,
        `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="test_send" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Envoyer un test</button>`,
        campaign.status === 'draft' || campaign.status === 'paused' ? `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="start" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Démarrer</button>` : '',
        campaign.status === 'sending' || campaign.status === 'scheduled' ? `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="pause" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Pause</button>` : '',
        campaign.status === 'paused' ? `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="resume" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Reprendre</button>` : '',
        ['draft', 'scheduled', 'paused'].includes(campaign.status) ? `<button class="owner-dashboard__button" type="button" data-owner-newsletter-action="cancel" data-owner-newsletter-id="${escapeHtml(campaign.id)}">Annuler</button>` : '',
      ].join('');
      return `<tr><td data-label="Campagne"><div class="owner-dashboard__product"><strong>${escapeHtml(campaign.name)}</strong><span>v${escapeHtml(campaign.template_version)}</span></div></td><td data-label="Sujet">${escapeHtml(campaign.subject)}</td><td data-label="État"><span class="owner-dashboard__status-badge owner-dashboard__status-badge--${escapeHtml(campaign.status)}">${escapeHtml(status)}</span></td><td data-label="Destinataires"><div class="owner-dashboard__campaign-report"><strong>${escapeHtml(total)} prévu(s)</strong><span>${escapeHtml(accepted)} envoyé(s) · ${escapeHtml(deferred)} différé(s) · ${escapeHtml(failed)} échec(s)</span></div></td><td data-label="Actions"><div class="owner-dashboard__newsletter-actions">${actions}</div></td></tr>`;
    }).join('');
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
    orders = data || [];
    renderOrders();
  };

  const loadDocuments = async () => {
    const { data, error } = await supabase.from('invoice_documents').select('id, order_id, document_kind, document_number, status, created_at').order('created_at', { ascending: false }).limit(300);
    if (error) {
      documents = [];
      renderOrders();
      return;
    }
    documents = data || [];
    renderOrders();
  };

  const loadNotifications = async () => {
    if (!notificationsBody) return;
    const { data, error } = await supabase.from('order_notification_outbox').select('id, order_id, notification_kind, status, attempts, last_error, created_at').order('created_at', { ascending: false }).limit(100);
    if (error) {
      notificationsBody.innerHTML = '<tr><td colspan="6" class="owner-dashboard__empty">Le suivi des notifications est indisponible.</td></tr>';
      return;
    }
    renderNotifications(data || []);
  };

  const newsletterControl = async payload => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token || !config?.url) throw new Error('Session invalide.');
    const response = await fetch(`${config.url}/functions/v1/newsletter-control`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Action newsletter indisponible.');
    return result;
  };

  const newsletterTestSend = async campaignId => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token || !config?.url) throw new Error('Session invalide.');
    const response = await fetch(`${config.url}/functions/v1/newsletter-test-send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ campaign_id: campaignId }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Envoi de test indisponible.');
    return result;
  };

  const loadNewsletter = async () => {
    if (!newsletterBody) return;
    try {
      const result = await newsletterControl({ action: 'list' });
      renderNewsletter(result.campaigns || []);
    } catch (error) {
      newsletterBody.innerHTML = `<tr><td colspan="5" class="owner-dashboard__empty">${escapeHtml(error.message || 'Campagnes indisponibles.')}</td></tr>`;
    }
  };

  const createNewsletterDraft = async event => {
    event.preventDefault();
    setMessage('#ownerNewsletterMessage', 'Enregistrement…');
    try {
      const scheduledInput = $('#ownerNewsletterSchedule')?.value || '';
      const result = await newsletterControl({
        action: 'create_draft',
        name: $('#ownerNewsletterName').value,
        subject: $('#ownerNewsletterSubject').value,
        text_body: $('#ownerNewsletterText').value,
        scheduled_at: scheduledInput ? new Date(scheduledInput).toISOString() : '',
      });
      newsletterForm.reset();
      setMessage('#ownerNewsletterMessage', result.campaign?.status === 'scheduled' ? 'Campagne planifiée.' : 'Brouillon enregistré.');
      await loadNewsletter();
    } catch (error) {
      setMessage('#ownerNewsletterMessage', error.message || 'Brouillon indisponible.', true);
    }
  };

  const handleNewsletterAction = async button => {
    const action = button.dataset.ownerNewsletterAction;
    const campaignId = button.dataset.ownerNewsletterId;
    button.disabled = true;
    try {
      const result = action === 'test_send'
        ? await newsletterTestSend(campaignId)
        : await newsletterControl({ action, campaign_id: campaignId });
      if (action === 'preview' && newsletterPreview) {
        newsletterPreview.textContent = `Sujet : ${result.template?.subject || result.campaign?.subject || ''}\n\n${result.template?.text_body || ''}`;
        newsletterPreview.classList.remove('hidden');
      } else if (action === 'simulate') {
        setMessage('#ownerNewsletterMessage', `Simulation terminée : ${Number(result.simulation?.subscribed || 0)} abonné(s) consentant(s), aucun e-mail envoyé.`);
      } else if (action === 'test_send') {
        setMessage('#ownerNewsletterMessage', 'E-mail de test envoyé à l’adresse configurée côté serveur. Aucun client réel n’a été ciblé.');
      } else {
        setMessage('#ownerNewsletterMessage', 'Campagne mise à jour.');
        await loadNewsletter();
      }
    } catch (error) {
      setMessage('#ownerNewsletterMessage', error.message || 'Action newsletter indisponible.', true);
    } finally {
      button.disabled = false;
    }
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

  const downloadDocument = async documentId => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token || !config?.url) throw new Error('Session invalide.');
    const response = await fetch(`${config.url}/functions/v1/document-download?document_id=${encodeURIComponent(documentId)}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.url) throw new Error(payload.error || 'Document indisponible.');
    window.open(payload.url, '_blank', 'noopener,noreferrer');
  };

  const retryNotification = async notificationId => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token || !config?.url) throw new Error('Session invalide.');
    const response = await fetch(`${config.url}/functions/v1/notification-retry`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ outbox_id: notificationId }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.queued) throw new Error(payload.error || 'Relance indisponible.');
    setMessage('#ownerNotificationMessage', 'Notification remise dans la file.');
    await loadNotifications();
  };

  $('#ownerNewProductButton')?.addEventListener('click', () => { resetProductForm(); $('#ownerProductForm')?.classList.remove('hidden'); $('#ownerProductForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  $('#ownerCancelProductButton')?.addEventListener('click', resetProductForm);
  $('#ownerCancelProductButtonBottom')?.addEventListener('click', resetProductForm);
  $('#ownerProductForm')?.addEventListener('submit', saveProduct);
  $('#ownerProductCategory')?.addEventListener('change', syncPricingFields);
  productsBody?.addEventListener('click', event => { const button = event.target.closest('[data-owner-edit-product]'); if (button) editProduct(button.dataset.ownerEditProduct); });
  ordersBody?.addEventListener('change', event => { const select = event.target.closest('[data-owner-order-status]'); if (select) void updateOrderStatus(select.dataset.ownerOrderStatus, select.value, select); });
  ordersBody?.addEventListener('click', event => {
    const button = event.target.closest('[data-owner-document-id]');
    if (!button) return;
    button.disabled = true;
    void downloadDocument(button.dataset.ownerDocumentId)
      .catch(error => setMessage('#ownerOrderMessage', error.message || 'Document indisponible.', true))
      .finally(() => { button.disabled = false; });
  });
  notificationsBody?.addEventListener('click', event => {
    const button = event.target.closest('[data-owner-notification-retry]');
    if (!button) return;
    button.disabled = true;
    void retryNotification(button.dataset.ownerNotificationRetry)
      .catch(error => setMessage('#ownerNotificationMessage', error.message || 'Relance indisponible.', true))
      .finally(() => { button.disabled = false; });
  });
  newsletterForm?.addEventListener('submit', event => { void createNewsletterDraft(event); });
  newsletterBody?.addEventListener('click', event => {
    const button = event.target.closest('[data-owner-newsletter-action]');
    if (button) void handleNewsletterAction(button);
  });
  syncPricingFields();
  root.classList.remove('hidden');
  root.setAttribute('aria-hidden', 'false');
  try { await Promise.all([loadProducts(), loadOrders(), loadDocuments(), loadNotifications(), loadNewsletter()]); } catch (error) { setMessage('#ownerProductMessage', `Impossible de charger les données : ${error.message}`, true); }
  return { hide() { root.classList.add('hidden'); root.setAttribute('aria-hidden', 'true'); } };
}
