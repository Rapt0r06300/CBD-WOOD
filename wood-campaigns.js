(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const campaignMode = params.get('wood-campaign');
  const seasonMode = params.get('wood-season');

  if (campaignMode === 'off') {
    document.querySelectorAll('[data-campaign-id]').forEach((campaign) => {
      campaign.hidden = true;
      campaign.dataset.campaignEnabled = 'false';
    });
  }

  const seasonalLayers = Object.freeze({
    halloween: Object.freeze({
      label: 'APERÇU SAISONNIER · NUIT WOOD',
      title: 'WOOD APRÈS MINUIT.',
      copy: 'Une ambiance illustrée à activer pour une édition spéciale. Le catalogue et les disponibilités restent inchangés.',
      note: 'Couche visuelle uniquement · validation propriétaire requise',
    }),
    summer: Object.freeze({
      label: 'APERÇU SAISONNIER · ÉTÉ WOOD',
      title: 'LE SOLEIL ENTRE DANS LA PIÈCE.',
      copy: 'Une variation lumineuse, botanique et chill pour rythmer une future édition sans toucher aux fiches produits.',
      note: 'Couche visuelle uniquement · validation propriétaire requise',
    }),
  });

  const requestedSeason = seasonalLayers[seasonMode];
  if (!requestedSeason) return;

  const campaign = document.querySelector('[data-campaign-id]');
  if (!campaign) return;

  const layer = document.createElement('section');
  layer.className = `wood-seasonal-layer wood-seasonal-layer--${seasonMode}`;
  layer.dataset.seasonalLayer = seasonMode;
  layer.hidden = true;
  layer.setAttribute('aria-labelledby', `wood-seasonal-title-${seasonMode}`);
  layer.innerHTML = `
    <div class="container">
      <div class="wood-seasonal-layer__frame">
        <div class="wood-seasonal-layer__art wood-seasonal-layer__art--${seasonMode}" aria-hidden="true">
          <span class="wood-seasonal-layer__art-mark">WOOD</span>
          <span class="wood-seasonal-layer__art-line">${seasonMode === 'halloween' ? 'NOIR · BOTANIQUE · GOOD' : 'VERT · LUMIÈRE · GOOD'}</span>
        </div>
        <div class="wood-seasonal-layer__copy">
          <span class="kicker">${requestedSeason.label}</span>
          <h2 id="wood-seasonal-title-${seasonMode}">${requestedSeason.title}</h2>
          <p>${requestedSeason.copy}</p>
          <small>${requestedSeason.note}</small>
        </div>
      </div>
    </div>`;
  campaign.after(layer);
  layer.hidden = false;
  layer.dataset.seasonalEnabled = 'true';
  document.documentElement.dataset.woodSeason = seasonMode;
})();
