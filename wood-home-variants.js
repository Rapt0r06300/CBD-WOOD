(() => {
  'use strict';
  const variant = new URLSearchParams(window.location.search).get('wood-variant');
  if (!['a', 'b'].includes(variant)) return;
  const classes = { a: 'wood-home-variant-a', b: 'wood-home-variant-b' };
  document.body.classList.add(classes[variant]);
  document.body.dataset.homeVariant = variant;
})();
