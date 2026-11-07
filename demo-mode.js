(() => {
  const documentRef = globalThis.document;
  const windowRef = globalThis.window;
  const pathname = String(windowRef?.location?.pathname || '');
  const isDemo = /(?:^|\/)demo(?:\/|$)/i.test(pathname)
    || documentRef?.documentElement?.dataset?.woodMode === 'demo';

  if (!isDemo || !documentRef) return;

  const root = documentRef.documentElement;
  if (root?.dataset) root.dataset.woodMode = 'demo';

  const setText = (selector, text) => {
    const element = documentRef.querySelector?.(selector);
    if (element) element.textContent = text;
  };
  setText('#identity-title', 'Aperçu du panier');
  setText('#identity-title + p', 'Les champs sont désactivés : cette page présente uniquement le parcours WOOD.');
  setText('.order-choice__intro', 'Mode de réception simulé, sans commande ni livraison.');
  setText('.payment-prep h3', 'Simulation locale');
  setText('.payment-prep p', 'Aucune commande ne sera créée, aucun paiement ne sera demandé et aucun e-mail ne sera envoyé.');

  const controlsFor = (form) => Array.from(form.querySelectorAll?.('input, textarea, select, button') || []);
  const markDisabled = (control) => {
    control.disabled = true;
    control.removeAttribute?.('required');
    control.setAttribute?.('aria-disabled', 'true');
  };

  Array.from(documentRef.querySelectorAll?.('form') || []).forEach((form) => {
    form.noValidate = true;
    form.setAttribute?.('data-demo-disabled', 'true');
    controlsFor(form).forEach(markDisabled);
    form.addEventListener?.('submit', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      const message = documentRef.querySelector?.('[data-demo-only]');
      if (message) message.dataset.demoState = 'blocked';
    }, true);
  });

  Array.from(documentRef.querySelectorAll?.('#createOrderButton, [data-demo-action]') || [])
    .forEach(markDisabled);

  const disableDemoOrderModes = () => {
    Array.from(documentRef.querySelectorAll?.('#orderModes input, #orderModes button') || [])
      .forEach(markDisabled);
  };
  disableDemoOrderModes();
  globalThis.setTimeout?.(disableDemoOrderModes, 0);
  if (typeof globalThis.MutationObserver === 'function' && root) {
    const observer = new globalThis.MutationObserver(disableDemoOrderModes);
    observer.observe(root, { childList: true, subtree: true });
  }

  Array.from(documentRef.querySelectorAll?.('a[data-checkout-mode], a[href*="compte.html"], a[href^="mailto:"], a[href^="tel:"]') || [])
    .forEach((link) => {
      link.setAttribute?.('aria-disabled', 'true');
      link.dataset.demoDisabled = 'true';
    });

  documentRef.addEventListener?.('click', (event) => {
    const target = event.target?.closest?.('a[data-demo-disabled], a[data-checkout-mode], a[href*="compte.html"], a[href^="mailto:"], a[href^="tel:"]');
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation?.();
  }, true);

  const notice = documentRef.querySelector?.('[data-demo-only]');
  if (notice) {
    notice.setAttribute?.('data-demo-locked', 'true');
    notice.setAttribute?.('aria-live', 'polite');
  }
})();
