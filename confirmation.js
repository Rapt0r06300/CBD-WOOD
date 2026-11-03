(() => {
  const content = document.getElementById('confirmationContent');
  const raw = localStorage.getItem('wood-last-order-v1');
  if (!content) return;
  if (!raw) {
    content.innerHTML = '<p class="confirmation-muted">Aucune confirmation récente n’est disponible sur cet appareil.</p>';
    return;
  }
  try {
    const order = JSON.parse(raw);
    const labels = { delivery: 'Livraison à domicile' };
    const money = `${(Number(order.total_cents || 0) / 100).toFixed(2).replace('.', ',')} €`;
    content.innerHTML = `<div class="confirmation-summary"><div><span>Numéro de commande</span><strong>${escapeHtml(order.order_number || 'WOOD')}</strong></div><div><span>Mode choisi</span><strong>${escapeHtml(labels[order.fulfillment_mode] || order.fulfillment_mode || 'Livraison à domicile')}</strong></div><div><span>Total provisoire</span><strong>${money}</strong></div></div><p class="confirmation-muted">Commande enregistrée avec le statut « paiement en attente ». Garde ce numéro pour suivre ta commande.</p>`;
  } catch {
    content.innerHTML = '<p class="confirmation-muted">La confirmation est momentanément indisponible.</p>';
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;' }[character]));
  }
})();
