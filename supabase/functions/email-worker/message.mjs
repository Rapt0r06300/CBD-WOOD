const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const money = (cents) => new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}).format(Number(cents || 0) / 100);

const lineText = (item) => `${item.quantity} × ${item.product_name} — ${item.grams} g — ${money(item.line_total_cents)}`;

export const buildOrderEmailMessage = ({ order, items, kind, deliveryEvent = null, from = null }) => {
  if (!order?.order_number || !Array.isArray(items)) throw new Error('Incomplete order email data');
  if (kind === 'payment_confirmed' && order.payment_status !== 'paid') {
    throw new Error('Payment confirmation requires a paid order');
  }
  if (kind === 'refund_confirmed' && order.payment_status !== 'refunded') {
    throw new Error('Refund confirmation requires a refunded order');
  }
  if (kind === 'order_cancelled' && order.status !== 'cancelled') {
    throw new Error('Cancellation notice requires a cancelled order');
  }
  if (!['order_created', 'payment_confirmed', 'invoice_ready', 'delivery_update', 'order_cancelled', 'refund_confirmed'].includes(kind)) {
    throw new Error('Unsupported order notification kind');
  }

  const name = order.customer_name?.trim() || 'client WOOD';
  const isPaid = kind === 'payment_confirmed';
  const isDocumentReady = kind === 'invoice_ready';
  const isDeliveryUpdate = kind === 'delivery_update';
  const status = isPaid
    ? 'Paiement confirmé : ta commande peut être préparée.'
    : isDocumentReady
      ? 'Ton document WOOD est prêt et joint à cet e-mail.'
      : kind === 'order_cancelled'
        ? 'Ta commande WOOD a été annulée. Contacte-nous si tu as besoin d’aide.'
        : kind === 'refund_confirmed'
          ? 'Le remboursement de ta commande WOOD a été confirmé.'
          : isDeliveryUpdate
            ? `Mise à jour de ta livraison : ${deliveryEvent?.status || 'état mis à jour'}.`
    : 'Ta commande est enregistrée. Le paiement est en attente de paiement.';
  const lines = items.map(lineText);
  const subject = `${isPaid ? 'Paiement confirmé' : isDocumentReady ? 'Document WOOD' : isDeliveryUpdate ? 'Suivi de livraison' : kind === 'order_cancelled' ? 'Commande annulée' : kind === 'refund_confirmed' ? 'Remboursement confirmé' : 'Commande enregistrée'} — ${order.order_number}`;
  const deliveryText = isDeliveryUpdate && deliveryEvent
    ? `\nÉtat de livraison : ${deliveryEvent.status}${deliveryEvent.trackingReference ? `\nRéférence : ${deliveryEvent.trackingReference}` : ''}${deliveryEvent.note ? `\nNote : ${deliveryEvent.note}` : ''}`
    : '';
  const text = [
    `Bonjour ${name},`,
    '',
    status,
    `Commande : ${order.order_number}`,
    '',
    'Récapitulatif :',
    ...lines,
    `Total : ${money(order.total_cents)}`,
    `Livraison : ${order.delivery_address}`,
    deliveryText,
    '',
    'WOOD — CBD / Nice',
  ].join('\n');
  const htmlItems = items.map((item) => `<li>${escapeHtml(lineText(item))}</li>`).join('');
  const html = [
    `<p>Bonjour ${escapeHtml(name)},</p>`,
    `<p>${escapeHtml(status)}</p>`,
    `<p><strong>Commande :</strong> ${escapeHtml(order.order_number)}</p>`,
    '<p><strong>Récapitulatif :</strong></p>',
    `<ul>${htmlItems}</ul>`,
    `<p><strong>Total :</strong> ${escapeHtml(money(order.total_cents))}<br>`
      + `<strong>Livraison :</strong> ${escapeHtml(order.delivery_address)}</p>`,
    isDeliveryUpdate && deliveryEvent
      ? `<p><strong>État de livraison :</strong> ${escapeHtml(deliveryEvent.status)}${deliveryEvent.trackingReference ? `<br><strong>Référence :</strong> ${escapeHtml(deliveryEvent.trackingReference)}` : ''}${deliveryEvent.note ? `<br><strong>Note :</strong> ${escapeHtml(deliveryEvent.note)}` : ''}</p>`
      : '',
    '<p>WOOD — CBD / Nice</p>',
  ].join('');

  return { from, subject, text, html };
};
