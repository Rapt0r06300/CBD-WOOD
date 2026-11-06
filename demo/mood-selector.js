(() => {
  const root = document.querySelector('[data-mood-selector]');
  if (!root) return;

  const moods = {
    decouverte: {
      label: 'Pour commencer doucement',
      description: 'Une sélection courte pour prendre ses repères et découvrir l’univers WOOD.',
      action: 'Voir les fleurs',
      href: 'fleurs.html',
    },
    detente: {
      label: 'Pour un moment calme',
      description: 'Des profils à comparer tranquillement avec les conseils de l’équipe en boutique.',
      action: 'Explorer les résines',
      href: 'resines.html',
    },
    concentration: {
      label: 'Pour changer de rythme',
      description: 'Une sélection éditoriale à parcourir sans promesse médicale ni raccourci.',
      action: 'Voir la sélection',
      href: '#selection-editoriale',
    },
    soiree: {
      label: 'Pour partager la découverte',
      description: 'Les essentiels WOOD à découvrir, comparer et valider avec l’équipe.',
      action: 'Nous trouver',
      href: '#boutique',
    },
  };

  const buttons = [...root.querySelectorAll('[data-mood]')];
  const cards = [...root.querySelectorAll('[data-mood-card]')];
  const title = root.querySelector('[data-mood-title]');
  const description = root.querySelector('[data-mood-description]');
  const action = root.querySelector('[data-mood-action]');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  root.dataset.motion = reducedMotion ? 'reduced' : 'full';

  const selectMood = (mood, { updateHash = true } = {}) => {
    const selected = moods[mood] ? mood : 'decouverte';
    buttons.forEach((button) => {
      const active = button.dataset.mood === selected;
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const cardMoods = String(card.dataset.moodCard || '').split(/\s+/u);
      card.hidden = !cardMoods.includes(selected);
    });
    const content = moods[selected];
    if (title) title.textContent = content.label;
    if (description) description.textContent = content.description;
    if (action) {
      action.textContent = content.action;
      action.setAttribute('href', content.href);
    }
    root.dataset.activeMood = selected;
    if (updateHash && window.history?.replaceState) {
      window.history.replaceState(null, '', `${window.location.pathname}#mood-${selected}`);
    }
  };

  const fromHash = window.location.hash.match(/^#mood-(decouverte|detente|concentration|soiree)$/u)?.[1];
  buttons.forEach((button) => button.addEventListener('click', () => selectMood(button.dataset.mood)));
  selectMood(fromHash || 'decouverte', { updateHash: false });
})();
