const transitions = {
  pending: new Set(['in_progress', 'cancelled']),
  in_progress: new Set(['delivered', 'failed', 'cancelled']),
  failed: new Set(['in_progress', 'cancelled']),
  delivered: new Set(),
  cancelled: new Set(),
};

export const DELIVERY_STATUSES = Object.freeze(Object.keys(transitions));

export const validateDeliveryTransition = ({ current = null, next }) => {
  if (!DELIVERY_STATUSES.includes(next)) return { ok: false, error: 'État de livraison invalide.' };
  if (!current) return next === 'pending'
    ? { ok: true }
    : { ok: false, error: 'La livraison doit commencer par l’état en attente.' };
  if (current === next) return { ok: false, error: 'Cet état est déjà enregistré.' };
  if (!transitions[current]?.has(next)) return { ok: false, error: 'Transition de livraison interdite.' };
  return { ok: true };
};

export const orderStatusForDelivery = (deliveryStatus, currentOrderStatus) => {
  if (deliveryStatus === 'in_progress') return 'preparing';
  if (deliveryStatus === 'delivered') return 'completed';
  if (deliveryStatus === 'cancelled') return 'cancelled';
  return currentOrderStatus;
};

export const deliveryMessage = ({ status, note = '', trackingReference = '' }) => ({
  status,
  note: String(note).trim().slice(0, 500),
  trackingReference: String(trackingReference).trim().slice(0, 120),
});
