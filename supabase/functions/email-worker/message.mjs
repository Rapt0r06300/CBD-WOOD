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

export const buildOrderEmailMessage = ({ order, items, kind, from = null }) => {
  if (!order?.order_number || !Array.isArray(items)) throw new Error('Incomplete order email data');
  if (kind === 'payment_confirmed' && order.payment_status !== 'paid') {
    throw new Error('Payment confirmation requires a paid order');
  }
  if (!['order_created', 'payment_confirmed'].includes(kind)) {
    throw new Error('Unsupported order notification kind');
  }

  const name = order.customer_name?.trim() || 'client WOOD';
  const isPaid = kind === 'payment_confirmed';
  const status = isPaid
    ? 'Paiement confirmé : ta commande peut être préparée.'
    : 'Ta commande est enregistrée. Le paiement est en attente de paiement.';
  const lines = items.map(lineText);
  const subject = `${isPaid ? 'Paiement confirmé' : 'Commande enregistrée'} — ${order.order_number}`;
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
    '<p>WOOD — CBD / Nice</p>',
  ].join('');

  return { from, subject, text, html };
};
