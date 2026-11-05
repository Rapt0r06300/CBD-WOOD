(() => {
  const tiers = values => values.map(([grams, price]) => ({ grams, price }));
  const products = {
    'fleurs-nimbus-3000': { index: '01', profile: 'CBD BOOSTÉ (STRONG)', name: 'Nimbus 3000', description: 'Une fleur CBD Boosté (strong) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]]) },
    'fleurs-ivory': { index: '02', profile: 'CBD BOOSTÉ (STRONG)', name: 'Ivory', description: 'Une fleur CBD Boosté (strong) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 15], [3, 42], [5, 70], [10, 130], [25, 260]]) },
    'fleurs-velvet-kush': { index: '03', profile: 'CBD BOOSTÉ (STRONG)', name: 'Velvet Kush', description: 'Une fleur CBD Boosté (strong) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]) },
    'fleurs-pastraweed': { index: '04', profile: 'CBD BOOSTÉ (STRONG)', name: 'Pastraweed', description: 'Une fleur CBD Boosté (strong) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]) },
    'fleurs-euphoria': { index: '05', profile: 'CBD BOOSTÉ (STRONG)', name: 'Euphoria', description: 'Une fleur CBD Boosté (strong) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 12], [3, 34], [5, 55], [10, 100], [25, 200]]) },
    'fleurs-purple': { index: '06', profile: 'CBD SOFT (MEDIUM)', name: 'Purple', description: 'Une fleur CBD Soft (medium) de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 11], [3, 30], [5, 50], [10, 100], [25, 180]]) },
    'fleurs-bloody-mary': { index: '07', profile: 'CBD CLASSIQUE', name: 'Bloody Mary', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]) },
    'fleurs-cosmic-cbg': { index: '08', profile: 'CBD CLASSIQUE', name: 'Cosmic CBG', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]) },
    'fleurs-charlotte': { index: '09', profile: 'CBD CLASSIQUE', name: 'Charlotte', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 10], [3, 28], [5, 45], [10, 80], [25, 160]]) },
    'fleurs-rainbow': { index: '10', profile: 'CBD CLASSIQUE', name: 'Rainbow', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 8], [3, 22], [5, 35], [10, 60], [25, 120]]) },
    'fleurs-orange-bud': { index: '11', profile: 'CBD CLASSIQUE', name: 'Orange Bud', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]]) },
    'fleurs-plutonium': { index: '12', profile: 'CBD CLASSIQUE', name: 'Plutonium', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 7], [3, 20], [5, 30], [10, 50], [25, 100]]) },
    'fleurs-fanta-hazy': { index: '13', profile: 'CBD CLASSIQUE', name: 'Fanta Hazy', description: 'Une fleur CBD classique de la sélection WOOD. Choisissez le grammage souhaité et retrouvez le tarif correspondant à la carte de la boutique.', prices: tiers([[1, 6], [3, 16], [5, 25], [10, 40], [25, 80]]) },
  };

  const requestedId = new URLSearchParams(window.location.search).get('produit') || 'fleurs-nimbus-3000';
  const productId = Object.hasOwn(products, requestedId) ? requestedId : 'fleurs-nimbus-3000';
  const product = products[productId];
  const presentation = window.WoodFlowerPresentation?.get(productId);
  const presentationDescription = presentation?.demoDescription
    ? `${presentation.demoDescription} Choisissez le grammage souhaité.`
    : product.description;
  const presentationImage = presentation?.image || 'assets/fleurs.svg';
  const profileTag = product.profile.includes('STRONG') ? 'STRONG' : product.profile.includes('MEDIUM') ? 'MEDIUM' : 'FLEURS CBD';
  const root = document.getElementById('flowerDetail');
  if (!root) return;
  document.title = `${product.name} — Fleurs CBD | WOOD CBD Shop Nice`;
  root.innerHTML = `
    <div class="flower-detail__intro">
      <div class="flower-detail__copy">
        <div class="kicker">Fleurs CBD · fiche produit</div>
        <h1 id="detail-title">${product.name}</h1>
        <p class="flower-detail__lead">${presentationDescription}</p>
        <div class="flower-detail__facts" aria-label="Informations produit">
          <div><span>Profil</span><strong>${product.profile}</strong></div>
          <div><span>Grammages</span><strong>1 g à 25 g</strong></div>
        </div>
        <p class="flower-detail__note">La sélection, les disponibilités et les tarifs sont à confirmer avec la boutique avant toute commande.</p>
      </div>
      <article class="product-card flower-detail-card" data-product-id="${productId}" data-product-name="${product.name}" data-product-category="Fleurs CBD">
        <div class="product-art"><img src="${presentationImage}" alt="Photo de démonstration de ${product.name} sous cloche"></div>
        <div class="product-body">
          <span class="product-index">${product.index} / ${profileTag}</span>
          <h3>${product.name}</h3>
          <p>${presentationDescription}</p>
          <div class="product-choice">
            <label for="detail-weight">Choisir le grammage</label>
            <select id="detail-weight" class="product-weight" data-product-weight aria-label="Choisir le grammage de ${product.name}">
              ${product.prices.map(tier => `<option value="${tier.grams}g" data-label="${tier.grams} g" data-price="${tier.price}">${tier.grams} g · ${tier.price} €</option>`).join('')}
            </select>
          </div>
          <div class="product-meta"><strong class="product-price-label" data-product-price-label>${product.prices[0].price.toFixed(2).replace('.', ',')} €</strong><button class="add-to-cart" type="button">Ajouter <span aria-hidden="true">+</span></button></div>
        </div>
      </article>
    </div>
    <div class="flower-detail__back"><a class="btn secondary" href="fleurs.html">← Retour aux fleurs</a></div>`;
})();
