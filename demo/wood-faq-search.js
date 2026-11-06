(() => {
  'use strict';

  const form = document.querySelector('.wood-faq-search');
  const list = document.querySelector('.faq-items');
  if (!form || !list) return;

  const input = form.querySelector('input[type="search"]');
  const status = form.querySelector('[data-faq-status]');
  const entries = [...list.querySelectorAll('details')];
  if (!input || !status || !entries.length) return;

  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/gu, '').toLocaleLowerCase('fr');
  const filter = () => {
    const query = normalize(input.value.trim());
    let visible = 0;

    entries.forEach(entry => {
      const matches = !query || normalize(entry.textContent).includes(query);
      entry.hidden = !matches;
      if (matches) visible += 1;
    });

    if (!query) {
      status.textContent = `${visible} questions, réponses WOOD.`;
    } else if (visible) {
      status.textContent = `${visible} réponse${visible > 1 ? 's' : ''} trouvée${visible > 1 ? 's' : ''}.`;
    } else {
      status.textContent = 'Aucune réponse ne correspond. Essayez un autre mot ou contactez WOOD.';
    }
  };

  input.addEventListener('input', filter);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      input.value = '';
      filter();
      input.focus({ preventScroll: true });
    });
  });
  filter();
})();
