const DOCUMENT_KINDS = new Set(['order_confirmation', 'payment_receipt', 'invoice']);

const titles = {
  order_confirmation: 'Confirmation de commande WOOD',
  payment_receipt: 'Reçu de paiement WOOD',
  invoice: 'Facture WOOD',
};

const requiredText = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`);
  return value.trim();
};

export const buildDocumentModel = ({ order, items, kind, legal = null }) => {
  if (!DOCUMENT_KINDS.has(kind)) throw new Error('Unsupported document kind');
  if (kind === 'payment_receipt' && order?.payment_status !== 'paid') {
    throw new Error('Payment receipt requires paid order');
  }
  if (kind === 'invoice' && (!legal?.name || !legal?.address)) {
    throw new Error('Invoice legal identity is required');
  }
  const model = {
    documentKind: kind,
    title: titles[kind],
    documentNumber: requiredText(order?.order_number, 'Order number'),
    customerName: requiredText(order?.customer_name || 'Client WOOD', 'Customer name'),
    customerEmail: requiredText(order?.customer_email, 'Customer email'),
    deliveryAddress: requiredText(order?.delivery_address, 'Delivery address'),
    lines: (Array.isArray(items) ? items : []).map((item) => ({
      label: requiredText(item.product_name, 'Product name'),
      quantity: Number(item.quantity),
      grams: Number(item.grams),
      unitPriceCents: Number(item.unit_price_cents),
      lineTotalCents: Number(item.line_total_cents),
    })),
    totalCents: Number(order.total_cents),
    legal: legal || null,
  };
  if (!model.lines.length || model.lines.some((line) => !Number.isInteger(line.quantity) || line.quantity < 1)) {
    throw new Error('Document requires valid order lines');
  }
  if (!Number.isInteger(model.totalCents) || model.totalCents < 0) throw new Error('Document total is invalid');
  return model;
};
