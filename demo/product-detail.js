(() => {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('produit') || '';
  const category = params.get('categorie') || 'wood-shop';
  const fallbackName = params.get('nom') || 'Référence WOOD';
  const isDemoPage = () => /(?:^|\/)demo(?:\/|$)/i.test(String(window.location?.pathname || '')) || document.documentElement?.dataset?.woodMode === 'demo';
  const labels = {
    resines: { title: 'Résines CBD', image: 'assets/editorial/wood-resin-concept-03.webp', back: 'resines.html', copy: 'Mise en scène conceptuelle sous cloche pour la démo WOOD. La photo, la référence et les informations du produit réel restent à confirmer par la boutique.' },
    'bien-etre': { title: 'Cosmétiques & huiles', image: 'assets/cosmetiques.svg', back: 'bien-etre.html', copy: 'Un produit bien-être autour du chanvre, présenté avec les informations et précautions validées par WOOD.' },
    'wood-shop': { title: 'WOOD Shop', image: '', back: 'wood-shop.html', copy: 'Une pièce de l’univers WOOD, à découvrir lorsque le modèle, la taille, le prix et la disponibilité seront confirmés.' },
  };
  const context = labels[category] || labels['wood-shop'];
  const root = document.getElementById('productDetail');
  if (!root) return;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const imageMarkup = (image, name) => image
    ? `<img src="${escapeHtml(image)}" alt="Visuel de démonstration pour ${escapeHtml(name)}" width="1024" height="1024" loading="eager" decoding="async">`
    : '<div class="product-art--type">WOOD.<small>WOOD SHOP / VISUEL À VENIR</small></div>';

  const detailGalleryMarkup = (image, name) => {
    const visual = imageMarkup(image, name);
    if (!image) return `<div class="product-detail__gallery" data-product-gallery>${visual}<p class="product-detail__media-note">Visuel à venir · photo réelle à valider</p></div>`;
    return `<div class="product-detail__gallery" data-product-gallery><button class="product-detail__zoom" type="button" data-product-zoom aria-controls="productLightbox" aria-label="Agrandir le visuel de ${escapeHtml(name)}">${visual}<span aria-hidden="true">Agrandir ↗</span></button><p class="product-detail__media-note">Visuel de démonstration · photo réelle à valider</p><dialog class="product-lightbox" id="productLightbox" data-product-lightbox aria-labelledby="productLightboxTitle"><div class="product-lightbox__top"><strong id="productLightboxTitle">${escapeHtml(name)}</strong><button type="button" data-product-lightbox-close aria-label="Fermer le visuel">Fermer ×</button></div>${visual}</dialog></div>`;
  };

  const qualityProofMarkup = (proofs = []) => {
    const verified = Array.isArray(proofs)
      ? proofs
        .filter(proof => proof && proof.status === 'verified' && proof.source && proof.label && proof.value)
        .slice(0, 3)
      : [];
    if (!verified.length) {
      return '<div class="product-source-note__empty"><strong>Aucune source vérifiée à afficher.</strong><span>À fournir</span></div>';
    }
    return `<div class="product-source-note__verified"><span class="product-source-note__kicker">Sources WOOD</span><div class="product-source-note__grid">${verified.map(proof => `<article><strong>${escapeHtml(proof.label)}</strong><span>${escapeHtml(proof.value)}</span><small>${escapeHtml(proof.source)}</small></article>`).join('')}</div></div>`;
  };

  const renderQualityProof = (proofs = []) => {
    const section = document.querySelector('.product-source-note');
    if (!section) return;
    const hasVerifiedProof = Array.isArray(proofs) && proofs.some(proof => proof && proof.status === 'verified' && proof.source && proof.label && proof.value);
    section.dataset.qualityState = hasVerifiedProof ? 'verified' : 'empty';
    section.innerHTML = qualityProofMarkup(proofs);
  };

  const priceTableMarkup = (product, name) => {
    const tiers = Array.isArray(product.pricing_tiers)
      ? product.pricing_tiers
        .map(tier => ({ grams: Number(tier.grams), priceCents: Number(tier.price_cents) }))
        .filter(tier => Number.isInteger(tier.grams) && tier.grams > 0 && Number.isInteger(tier.priceCents) && tier.priceCents > 0)
      : [];
    if (!tiers.length) return '';
    const headers = tiers.map(tier => `<th scope="col">${tier.grams} g</th>`).join('');
    const prices = tiers.map(tier => `<td>${(tier.priceCents / 100).toFixed(2).replace('.', ',')} €</td>`).join('');
    const pricePerGram = tiers.map(tier => `<td>${(tier.priceCents / 100 / tier.grams).toFixed(2).replace('.', ',')} € / g</td>`).join('');
    return `<details class="flower-detail__prices"><summary>Voir les tarifs par grammage</summary><div class="flower-detail__prices-scroll"><table><caption>Tarifs affichés pour ${escapeHtml(name)}</caption><thead><tr>${headers}</tr></thead><tbody><tr><th scope="row">Prix total</th>${prices}</tr><tr><th scope="row">Prix au gramme</th>${pricePerGram}</tr></tbody></table></div></details>`;
  };

  function renderRelated(relatedProducts = []) {
    const existing = root.querySelector('.product-related');
    if (existing) existing.remove();
    if (!relatedProducts.length) return;
    const section = document.createElement('section');
    section.className = 'product-related';
    section.setAttribute('aria-labelledby', 'related-title');
    section.innerHTML = `
      <div class="product-related__heading"><div><div class="kicker">Même univers</div><h2 id="related-title">À DÉCOUVRIR <span>CHEZ WOOD.</span></h2></div><p>Quelques références publiées dans le même univers, sans promotion ni recommandation automatique.</p></div>
      <div class="product-related__grid">
        ${relatedProducts.map((related) => {
          const relatedName = related.name || 'Référence WOOD';
          const relatedCategory = related.category || category;
          const relatedHref = `produit.html?produit=${encodeURIComponent(related.slug || related.id || '')}&categorie=${encodeURIComponent(relatedCategory)}&nom=${encodeURIComponent(relatedName)}`;
          const relatedStock = Number(related.stock_quantity);
          const relatedPrice = Number(related.price_cents);
          const relatedAvailable = related.availability_state === 'available' && Number.isFinite(relatedStock) && relatedStock > 0 && Number.isFinite(relatedPrice) && relatedPrice > 0;
          const relatedStatus = relatedAvailable ? `${(relatedPrice / 100).toFixed(2).replace('.', ',')} €` : 'Disponibilité à confirmer';
          return `<a class="product-related__card" href="${escapeHtml(relatedHref)}"><div class="product-related__media">${imageMarkup(related.image_path || context.image, relatedName)}</div><div class="product-related__body"><span>${escapeHtml(context.title)}</span><strong>${escapeHtml(relatedName)}</strong><em>${escapeHtml(relatedStatus)} · Voir la fiche <span aria-hidden="true">↗</span></em></div></a>`;
        }).join('')}
      </div>`;
    root.appendChild(section);
  }

  function renderMobileDetailActions(productName) {
    document.querySelector('[data-wood-detail-actions]')?.remove();
    document.body.classList.remove('has-wood-detail-actions');
    if (!isDemoPage()) return;
    const bar = document.createElement('nav');
    bar.className = 'wood-detail-actions';
    bar.dataset.woodDetailActions = 'true';
    bar.setAttribute('aria-label', 'Actions rapides de la fiche produit');
    const contact = document.createElement('a');
    contact.href = `contact.html?produit=${encodeURIComponent(productName)}`;
    contact.textContent = 'Poser une question';
    const store = document.createElement('a');
    store.href = 'index.html#boutique';
    store.textContent = 'Voir en boutique';
    bar.append(contact, store);
    document.body.appendChild(bar);
    document.body.classList.add('has-wood-detail-actions');
  }

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
          ${priceTableMarkup(product, name)}
          <p class="product-detail__note">Les références, prix et disponibilités sont confirmés par la boutique avant toute commande.</p>
        </div>
        <article class="product-card product-detail-card" data-product-id="${escapeHtml(product.id || requestedId)}" data-product-slug="${escapeHtml(product.slug || requestedId)}" data-product-name="${escapeHtml(name)}" data-product-category="${escapeHtml(context.title)}" data-product-price="${hasPrice ? price / 100 : ''}" data-availability-state="${escapeHtml(product.availability_state || 'incomplete')}"${available ? '' : ' data-product-unavailable="true"'}>
          ${detailGalleryMarkup(image, name)}
          <div class="product-body">
            <span class="product-index">01 / WOOD CATALOGUE</span>
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(description)}</p>
            <div class="product-meta"><span class="product-status">${escapeHtml(status)}</span>${available ? '<button class="add-to-cart" type="button">Ajouter <span aria-hidden="true">+</span></button>' : '<button class="add-to-cart" type="button" disabled aria-disabled="true" data-product-unavailable>Indisponible</button>'}</div>
          </div>
        </article>
      </div>
      <div class="product-detail__back"><a class="btn secondary" href="${escapeHtml(context.back)}">← Retour à ${escapeHtml(context.title)}</a></div>`;
    renderMobileDetailActions(name);
    const zoom = root.querySelector('[data-product-zoom]');
    const lightbox = root.querySelector('[data-product-lightbox]');
    const closeLightbox = root.querySelector('[data-product-lightbox-close]');
    zoom?.addEventListener('click', () => {
      if (typeof lightbox?.showModal === 'function') lightbox.showModal();
      else lightbox?.setAttribute('open', '');
    });
    closeLightbox?.addEventListener('click', () => lightbox?.close?.());
    document.dispatchEvent(new CustomEvent('wood:detail-rendered'));
    renderQualityProof(product.quality_proofs);
  }

  render();
  const config = window.WOOD_SUPABASE_CONFIG;
  if (!config || !requestedId || isDemoPage()) return;
  import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm').then(({ createClient }) => {
    const client = createClient(config.url, config.publishableKey);
    const query = client.from('products').select('id, slug, name, description, price_cents, image_path, stock_quantity, availability_state, status, category').eq('status', 'published');
    const lookup = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestedId) ? query.eq('id', requestedId) : query.eq('slug', requestedId);
    return lookup.maybeSingle().then(result => ({ ...result, client }));
  }).then(async ({ data, client }) => {
    if (!data) return;
    const { data: priceRows } = await client.from('product_prices').select('product_id, grams, price_cents').eq('product_id', data.id).order('grams', { ascending: true });
    render({ ...data, pricing_tiers: priceRows || [] });
    const relatedQuery = client.from('products').select('id, slug, name, image_path, price_cents, stock_quantity, availability_state, category').eq('status', 'published').eq('category', category).neq('id', data.id).order('created_at', { ascending: false }).limit(3);
    const { data: related } = await relatedQuery;
    renderRelated(related || []);
  }).catch(() => {});
})();
