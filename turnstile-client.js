(() => {
  const siteKey = typeof globalThis.WOOD_SUPABASE_CONFIG?.turnstileSiteKey === 'string'
    ? globalThis.WOOD_SUPABASE_CONFIG.turnstileSiteKey.trim()
    : '';
  let container = document.getElementById('turnstileWidget');
  let token = '';
  let widgetId = null;
  let loadPromise = null;

  const setError = () => {
    if (!container) return;
    container.dataset.state = 'error';
    container.textContent = 'La vérification anti-abus est indisponible. Réessaie plus tard.';
  };

  const getToken = () => {
    if (token) return token;
    const input = document.querySelector('[name="cf-turnstile-response"]');
    return input instanceof HTMLInputElement ? input.value : '';
  };

  const reset = () => {
    token = '';
    if (widgetId !== null && globalThis.turnstile?.reset) globalThis.turnstile.reset(widgetId);
  };

  const loadApi = () => {
    if (globalThis.turnstile?.render) return Promise.resolve();
    if (loadPromise) return loadPromise;
    loadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-wood-turnstile]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.woodTurnstile = 'true';
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
    return loadPromise;
  };

  if (!container && siteKey) {
    const paymentPrep = document.querySelector('.payment-prep');
    if (paymentPrep) {
      container = document.createElement('div');
      container.id = 'turnstileWidget';
      container.className = 'turnstile-widget';
      container.hidden = true;
      container.setAttribute('aria-live', 'polite');
      const button = paymentPrep.querySelector('#createOrderButton');
      paymentPrep.insertBefore(container, button || null);
    }
  }

  const init = async () => {
    if (!siteKey || !container) return;
    container.hidden = false;
    try {
      await loadApi();
      if (!globalThis.turnstile?.render) throw new Error('Turnstile indisponible');
      widgetId = globalThis.turnstile.render(container, {
        sitekey: siteKey,
        callback: (value) => { token = typeof value === 'string' ? value : ''; },
        'expired-callback': reset,
        'error-callback': setError,
      });
    } catch {
      setError();
    }
  };

  globalThis.WoodTurnstile = Object.freeze({
    getToken,
    reset,
    isEnabled: () => Boolean(siteKey),
    isReady: () => widgetId !== null && Boolean(getToken()),
  });

  init();
})();
