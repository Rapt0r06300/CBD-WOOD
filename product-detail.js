(() => {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('produit') || '';
  const category = params.get('categorie') || 'wood-shop';
  const fallbackName = params.get('nom') || 'Référence WOOD';
  const labels = {
    resines: { title: 'Résines CBD', image: 'assets/resines.svg', back: 'resines.html', copy: 'Une sélection de textures choisies avec attention. Les informations définitives seront renseignées avec la boutique.' },
    'bien-etre': { title: 'Cosmétiques & huiles', image: 'assets/cosmetiques.svg', back: 'bien-etre.html', copy: 'Un produit bien-être autour du chanvre, présenté avec les informations et précautions validées par WOOD.' },
    'wood-shop': { title: 'WOOD Shop', image: '', back: 'wood-shop.html', copy: 'Une pièce de l’univers WOOD, à découvrir lorsque le modèle, la taille, le prix et la disponibilité seront confirmés.' },
  };
  const context = labels[category] || labels['wood-shop'];
  const root = document.getElementById('productDetail');
  if (!root) return;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const imageMarkup = (image, name) => image
    ? `<img src="${escapeHtml(image)}" alt="Visuel de démonstration de ${escapeHtml(name)}">`
    : '<div class="product-art--type">WOOD.<small>WOOD SHOP / VISUEL À VENIR</small></div>';

  function render(product = {}) {
    const name = product.name || fallbackName;
    const description = product.description || context.copy;
    const image = product.image_path || context.image;
    const stock = Number(product.stock_quantity);
    const hasStock = Number.isFinite(stock) && stock > 0;
    const price = Number(product.price_cents);
    const hasPrice = Number.isFinite(price) && price > 0;
    const available = product.availability_state === 'available' && hasStock && hasPrice;
    const status = available ? `${(price / 100).toFixed(2).replace('.', ',')} €` : (hasStock ? 'Prix à confirmer' : 'Disponibilité à confirmer');
    document.title = `${name} — ${context.title} | WOOD CBD Shop Nice`;
    root.innerHTML = `
      <div class="product-detail__intro">
        <div class="product-detail__copy">
          <div class="kicker">${escapeHtml(context.title)} · fiche produit</div>
          <h1 id="detail-title">${escapeHtml(name)}</h1>
          <p class="product-detail__lead">${escapeHtml(description)}</p>
          <div class="product-detail__facts" aria-label="Informations produit">
            <div><span>Univers</span><strong>${escapeHtml(context.title)}</strong></div>
            <div><span>Disponibilité</span><strong>${escapeHtml(available ? 'Disponible' : 'À confirmer')}</strong></div>
          </div>
          <p class="product-detail__note">Les références, prix et disponibilités sont confirmés par la boutique avant toute commande.</p>
        </div>
        <article class="product-card product-detail-card" data-product-id="${escapeHtml(product.id || requestedId)}" data-product-slug="${escapeHtml(product.slug || requestedId)}" data-product-name="${escapeHtml(name)}" data-product-category="${escapeHtml(context.title)}" data-product-price="${hasPrice ? price / 100 : ''}" data-availability-state="${escapeHtml(product.availability_state || 'incomplete')}"${available ? '' : ' data-product-unavailable="true"'}>
          <div class="product-art">${imageMarkup(image, name)}</div>
          <div class="product-body">
            <span class="product-index">01 / WOOD CATALOGUE</span>
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(description)}</p>
            <div class="product-meta"><span class="product-status">${escapeHtml(status)}</span>${available ? '<button class="add-to-cart" type="button">Ajouter <span aria-hidden="true">+</span></button>' : '<button class="add-to-cart" type="button" disabled aria-disabled="true" data-product-unavailable>Indisponible</button>'}</div>
          </div>
        </article>
      </div>
      <div class="product-detail__back"><a class="btn secondary" href="${escapeHtml(context.back)}">← Retour à ${escapeHtml(context.title)}</a></div>`;
  }

  render();
  const config = window.WOOD_SUPABASE_CONFIG;
  if (!config || !requestedId) return;
  import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm').then(({ createClient }) => {
    const client = createClient(config.url, config.publishableKey);
    const query = client.from('products').select('id, slug, name, description, price_cents, image_path, stock_quantity, availability_state, status').eq('status', 'published');
    const lookup = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestedId) ? query.eq('id', requestedId) : query.eq('slug', requestedId);
    return lookup.maybeSingle();
  }).then(({ data }) => {
    if (data) render(data);
  }).catch(() => {});
})();
