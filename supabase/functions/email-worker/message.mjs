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
const deliveryStatusLabels = Object.freeze({ pending: 'en attente', in_progress: 'en cours', delivered: 'livrée', failed: 'à vérifier', cancelled: 'annulée' });

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
  if (!['order_created', 'owner_order_alert', 'payment_confirmed', 'invoice_ready', 'delivery_update', 'delivery_issue_alert', 'order_cancelled', 'refund_confirmed'].includes(kind)) {
    throw new Error('Unsupported order notification kind');
  }

  const name = order.customer_name?.trim() || 'client WOOD';
  const isOwnerAlert = ['owner_order_alert', 'delivery_issue_alert'].includes(kind);
  const isDeliveryIssueAlert = kind === 'delivery_issue_alert';
  const isPaid = kind === 'payment_confirmed';
  const isDocumentReady = kind === 'invoice_ready';
  const isDeliveryUpdate = kind === 'delivery_update';
  const status = isDeliveryIssueAlert
    ? 'Une livraison nécessite une vérification avant de poursuivre.'
    : isOwnerAlert
      ? 'Commande reçue : une nouvelle commande attend ton traitement.'
      : isPaid
    ? 'Paiement confirmé : ta commande peut être préparée.'
    : isDocumentReady
      ? 'Ton document WOOD est prêt et joint à cet e-mail.'
      : kind === 'order_cancelled'
        ? 'Ta commande WOOD a été annulée. Contacte-nous si tu as besoin d’aide.'
          : kind === 'refund_confirmed'
            ? 'Le remboursement de ta commande WOOD a été confirmé.'
            : isDeliveryUpdate
              ? `Mise à jour de ta livraison : ${deliveryStatusLabels[deliveryEvent?.status] || 'état mis à jour'}.`
              : 'Ta commande est enregistrée. Le paiement est en attente de paiement.';
  const lines = items.map(lineText);
  const subject = `${isDeliveryIssueAlert ? 'Problème de livraison WOOD' : isOwnerAlert ? 'Nouvelle commande WOOD' : isPaid ? 'Paiement confirmé' : isDocumentReady ? 'Document WOOD' : isDeliveryUpdate ? 'Suivi de livraison' : kind === 'order_cancelled' ? 'Commande annulée' : kind === 'refund_confirmed' ? 'Remboursement confirmé' : 'Commande enregistrée'} — ${order.order_number}`;
  const deliveryText = (isDeliveryUpdate || isDeliveryIssueAlert) && deliveryEvent
    ? `\nÉtat de livraison : ${deliveryStatusLabels[deliveryEvent.status] || 'état mis à jour'}${deliveryEvent.trackingReference ? `\nRéférence : ${deliveryEvent.trackingReference}` : ''}${deliveryEvent.note ? `\nNote : ${deliveryEvent.note}` : ''}`
    : '';
  const text = [
    `Bonjour ${isOwnerAlert ? 'WOOD' : name},`,
    '',
    status,
    `Commande : ${order.order_number}`,
    ...(isOwnerAlert ? [`Client : ${name}`, `E-mail client : ${order.customer_email}`] : []),
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
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHtml(subject)}</title>
    <style>
      @media (max-width: 430px) {
        .wood-email { padding: 20px 14px !important; }
        .wood-email h1 { font-size: 30px !important; }
      }
    </style>
  </head>
  <body style="margin:0;background:#101610;color:#f1f0e6;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
    <main class="wood-email" style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <div style="border-bottom:1px solid #536950;padding-bottom:18px;color:#cbf096;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">WOOD · CBD / NICE</div>
      <h1 style="font-size:38px;line-height:1;letter-spacing:-1px;margin:28px 0 18px;color:#f1f0e6;">${escapeHtml(subject.split(' — ')[0])}</h1>
      <p>Bonjour ${escapeHtml(isOwnerAlert ? 'WOOD' : name)},</p>
      <p>${escapeHtml(status)}</p>
      <p><strong>Commande :</strong> ${escapeHtml(order.order_number)}</p>
      ${isOwnerAlert ? `<p><strong>Client :</strong> ${escapeHtml(name)}<br><strong>E-mail client :</strong> ${escapeHtml(order.customer_email)}</p>` : ''}
      <p style="color:#cbf096;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
      <ul style="padding-left:22px;overflow-wrap:anywhere;">${htmlItems}</ul>
      <p><strong>Total :</strong> ${escapeHtml(money(order.total_cents))}<br><strong>Livraison :</strong> ${escapeHtml(order.delivery_address)}</p>
      ${(isDeliveryUpdate || isDeliveryIssueAlert) && deliveryEvent
        ? `<p><strong>État de livraison :</strong> ${escapeHtml(deliveryStatusLabels[deliveryEvent.status] || 'état mis à jour')}${deliveryEvent.trackingReference ? `<br><strong>Référence :</strong> ${escapeHtml(deliveryEvent.trackingReference)}` : ''}${deliveryEvent.note ? `<br><strong>Note :</strong> ${escapeHtml(deliveryEvent.note)}` : ''}</p>`
        : ''}
      <p style="border-top:1px solid #536950;padding-top:18px;color:#cbf096;">WOOD — CBD / Nice</p>
    </main>
  </body>
</html>`;

  return { from, subject, text, html };
};
