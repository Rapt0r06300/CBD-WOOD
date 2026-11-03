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
    const labels = { delivery: 'Livraison', barla: 'Retrait à Barla · 7 rue Barla, 06300 Nice', borriglione: 'Retrait à Borriglione · 16 avenue Alfred Borriglione, 06100 Nice' };
    const money = `${(Number(order.total_cents || 0) / 100).toFixed(2).replace('.', ',')} €`;
    content.innerHTML = `<div class="confirmation-summary"><div><span>Numéro de commande</span><strong>${escapeHtml(order.order_number || 'WOOD')}</strong></div><div><span>Mode choisi</span><strong>${escapeHtml(labels[order.fulfillment_mode] || order.fulfillment_mode || 'À confirmer')}</strong></div><div><span>Total provisoire</span><strong>${money}</strong></div>${order.pickup_code ? `<div class="confirmation-code"><span>Code de retrait à présenter en boutique</span><strong>${escapeHtml(order.pickup_code)}</strong></div>` : ''}</div><p class="confirmation-muted">Commande enregistrée avec le statut « paiement en attente ». Garde ce numéro et présente-le à l’équipe WOOD lors du retrait.</p>`;
  } catch {
    content.innerHTML = '<p class="confirmation-muted">La confirmation est momentanément indisponible.</p>';
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;' }[character]));
  }
})();
