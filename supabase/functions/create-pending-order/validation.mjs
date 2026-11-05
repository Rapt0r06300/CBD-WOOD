const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9._:-]{16,128}$/;
const UNSAFE_CONTROL_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;

const asTrimmedString = (value, maxLength) => {
  if (typeof value !== 'string') return null;
  if (UNSAFE_CONTROL_PATTERN.test(value)) return null;
  const normalized = value.normalize('NFC').replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized || normalized.length > maxLength) return null;
  return normalized;
};

const isPlainObject = (value) => (
  value !== null
  && typeof value === 'object'
  && !Array.isArray(value)
);

const normalizeCountryCode = (value) => {
  const normalized = asTrimmedString(value, 2)?.toUpperCase();
  return normalized && /^[A-Z]{2}$/.test(normalized) ? normalized : null;
};

const normalizePostalCode = (value) => {
  const normalized = asTrimmedString(value, 10)?.toUpperCase();
  return normalized && /^[A-Z0-9][A-Z0-9 -]{2,9}$/.test(normalized) ? normalized : null;
};

export const normalizeDeliveryAddress = (input) => {
  if (!isPlainObject(input)) return { ok: false, error: 'Adresse de livraison invalide.' };

  const legacy = asTrimmedString(input.delivery_address, 500);
  const details = isPlainObject(input.delivery_address_details) ? input.delivery_address_details : null;
  const hasStructuredField = details && [
    'line1', 'line2', 'postal_code', 'city', 'country_code',
  ].some((key) => details[key] !== undefined && details[key] !== null && String(details[key]).trim() !== '');

  if (!hasStructuredField) {
    return legacy
      ? { ok: true, address: legacy, details: null }
      : { ok: false, error: 'Une adresse de livraison est nécessaire.' };
  }

  const line1 = asTrimmedString(details.line1, 160);
  const line2 = details.line2 === undefined || details.line2 === null || String(details.line2).trim() === ''
    ? null
    : asTrimmedString(details.line2, 160);
  const postalCode = normalizePostalCode(details.postal_code);
  const city = asTrimmedString(details.city, 100);
  const countryCode = normalizeCountryCode(details.country_code);

  if (!line1 || (details.line2 !== undefined && details.line2 !== null && String(details.line2).trim() !== '' && !line2) || !postalCode || !city || !countryCode) {
    return { ok: false, error: 'Complète l’adresse, le code postal, la ville et le pays.' };
  }

  const address = [
    line1,
    line2,
    `${postalCode} ${city}`,
    countryCode === 'FR' ? null : countryCode,
  ].filter(Boolean).join(', ');

  return {
    ok: true,
    address,
    details: {
      line1,
      line2,
      postal_code: postalCode,
      city,
      country_code: countryCode,
    },
  };
};

export const isAllowedOrigin = (origin, allowedOrigins) => {
  if (!origin) return true;
  if (!Array.isArray(allowedOrigins)) return false;

  return allowedOrigins.some((allowed) => {
    if (typeof allowed !== 'string' || !allowed) return false;
    if (allowed === origin) return true;
    if (!allowed.includes('*')) return false;

    const escaped = allowed.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '.*');
    return new RegExp(`^${escaped}$`).test(origin);
  });
};

export const normalizeIdempotencyKey = (value) => {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return IDEMPOTENCY_PATTERN.test(normalized) ? normalized : null;
};

export const validateOrderPayload = (input) => {
  if (!isPlainObject(input)) return { ok: false, error: 'Commande invalide.' };

  const customerEmail = asTrimmedString(input.customer_email, 254)?.toLowerCase();
  const customerName = asTrimmedString(input.customer_name, 120);
  const customerPhone = asTrimmedString(input.customer_phone, 40);
  const fulfillmentMode = asTrimmedString(input.fulfillment_mode, 20);
  const idempotencyKey = normalizeIdempotencyKey(input.idempotency_key);
  const address = normalizeDeliveryAddress(input);

  if (!customerEmail || !EMAIL_PATTERN.test(customerEmail)) {
    return { ok: false, error: 'Adresse e-mail invalide.' };
  }
  if (!address.ok) return { ok: false, error: address.error };
  if (fulfillmentMode !== 'delivery') {
    return { ok: false, error: 'Les commandes doivent être livrées.' };
  }
  if (!idempotencyKey) return { ok: false, error: 'Référence de commande invalide.' };
  if (!Array.isArray(input.items) || input.items.length < 1 || input.items.length > 50) {
    return { ok: false, error: 'La commande ne contient pas d’articles valides.' };
  }

  const items = [];
  for (const item of input.items) {
    if (!isPlainObject(item) || !UUID_PATTERN.test(String(item.product_id || ''))) {
      return { ok: false, error: 'Un article de la commande est invalide.' };
    }
    if (!Number.isInteger(item.grams) || item.grams < 1 || item.grams > 50) {
      return { ok: false, error: 'Le grammage sélectionné est invalide.' };
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      return { ok: false, error: 'La quantité sélectionnée est invalide.' };
    }
    items.push({
      product_id: String(item.product_id).toLowerCase(),
      grams: item.grams,
      quantity: item.quantity,
    });
  }

  return {
    ok: true,
    payload: {
      customer_email: customerEmail,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_address: address.address,
      delivery_address_details: address.details,
      fulfillment_mode: fulfillmentMode,
      idempotency_key: idempotencyKey,
      items,
    },
  };
};
