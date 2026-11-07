(() => {
  'use strict';
  const mode = new URLSearchParams(window.location.search).get('wood-campaign');
  if (mode !== 'off') return;
  document.querySelectorAll('[data-campaign-id]').forEach((campaign) => {
    campaign.hidden = true;
    campaign.dataset.campaignEnabled = 'false';
  });
})();
