(function attachAdvisorWidget(root) {
  const documentRef = root?.document;
  if (!documentRef || !root.WoodAdvisorEngine || !root.WoodAdvisorData) return;
  if (documentRef.documentElement.dataset.woodMode !== 'demo' && !/\/demo(?:\/|$)/.test(root.location?.pathname || '')) return;
  if (documentRef.querySelector('[data-wood-advisor]')) return;

  const engine = root.WoodAdvisorEngine;
  const badgeEngine = root.WoodBadgeEngine;
  const data = root.WoodAdvisorData;
  const products = data.products;
  const sessionState = { lastQuestion: '', lastResult: null, answers: {}, history: [] };
  let lastFocus = null;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));

  const widget = documentRef.createElement('aside');
  widget.className = 'wood-advisor';
  widget.dataset.woodAdvisor = 'true';
  widget.innerHTML = `
    <button class="wood-advisor__bubble" type="button" aria-expanded="false" aria-controls="woodAdvisorPanel">
      <img src="assets/graffiti/wood-advisor-bubble.svg" alt="" aria-hidden="true">
      <span>Besoin d’aide pour choisir&nbsp;?</span>
    </button>
    <section class="wood-advisor__panel" id="woodAdvisorPanel" role="dialog" aria-modal="true" aria-labelledby="woodAdvisorTitle" hidden>
      <div class="wood-advisor__top">
        <div><span class="wood-advisor__eyebrow">WOOD / Le petit coup de main</span><h2 class="wood-advisor__title" id="woodAdvisorTitle">On trouve ton entrée.</h2></div>
        <button class="wood-advisor__close" type="button" aria-label="Fermer l’aide au choix">×</button>
      </div>
      <p class="wood-advisor__intro">Quelques mots suffisent pour parcourir la sélection sans se perdre. On reste sur le goût, les arômes et le format.</p>
      <p class="wood-advisor__notice">Démo locale : aucune donnée n’est envoyée et rien n’est enregistré. Les caractéristiques produit apparaîtront seulement avec une source validée par WOOD.</p>
      <p class="wood-advisor__question">Tu regardes quoi aujourd’hui&nbsp;?</p>
      <div class="wood-advisor__categories" data-advisor-categories></div>
      <div class="wood-advisor__step-controls" aria-label="Navigation des questions"><button type="button" data-advisor-discovery>Je ne sais pas</button><button type="button" data-advisor-any>Peu importe</button><button type="button" data-advisor-skip>Passer</button><button type="button" data-advisor-back disabled>Retour</button></div>
      <form class="wood-advisor__form" data-advisor-form>
        <label for="woodAdvisorQuestion">Ou décris ton idée en quelques mots</label>
        <input class="wood-advisor__input" id="woodAdvisorQuestion" name="question" type="text" autocomplete="off" placeholder="Ex. un goût fruité et marqué">
        <button class="wood-advisor__submit" type="submit">Voir une piste</button>
      </form>
      <div class="wood-advisor__status" data-advisor-status aria-live="polite"></div>
      <div class="wood-advisor__result" data-advisor-result aria-live="polite" hidden></div>
    </section>`;
  documentRef.body.append(widget);

  const bubble = widget.querySelector('.wood-advisor__bubble');
  const panel = widget.querySelector('.wood-advisor__panel');
  const closeButton = widget.querySelector('.wood-advisor__close');
  const categoryRoot = widget.querySelector('[data-advisor-categories]');
  const form = widget.querySelector('[data-advisor-form]');
  const input = widget.querySelector('#woodAdvisorQuestion');
  const resultRoot = widget.querySelector('[data-advisor-result]');
  const status = widget.querySelector('[data-advisor-status]');
  const questionLabel = widget.querySelector('.wood-advisor__question');
  const skipButton = widget.querySelector('[data-advisor-skip]');
  const backButton = widget.querySelector('[data-advisor-back]');
  const hero = documentRef.querySelector('.hero, .page-hero, .flower-detail, .product-detail');
  const setHeroClear = (isClear) => {
    widget.classList.toggle('is-hero-clear', isClear);
    // La pastille reste toujours cliquable et accessible, même au-dessus du hero.
    bubble.tabIndex = 0;
    bubble.setAttribute('aria-hidden', 'false');
  };
  if (hero && typeof root.IntersectionObserver === 'function') {
    const heroObserver = new root.IntersectionObserver(([entry]) => setHeroClear(entry.isIntersecting), { threshold: 0.12 });
    heroObserver.observe(hero);
  }
  const questionPlan = engine.buildQuestionPlan(products);
  const firstQuestion = engine.nextQuestion(products, engine.extractPreferences(''), {});
  if (firstQuestion?.text) questionLabel.textContent = firstQuestion.text;

  const categoryQuestion = (category) => `Je cherche des ${category.slug === 'bien-etre' ? 'produits bien-être' : category.label.toLowerCase()}`;
  const categoryPlan = questionPlan.find((question) => question.key === 'category');
  categoryRoot.innerHTML = (categoryPlan?.choices || []).map((slug, index) => `<button class="wood-advisor__choice" type="button" data-advisor-category="${escapeHtml(slug)}">${escapeHtml(categoryPlan.labels[index] || slug)}</button>`).join('');

  const findCategory = (slug) => data.categories.find((category) => category.slug === slug);
  const renderResult = (result) => {
    sessionState.lastResult = result;
    resultRoot.hidden = false;
    if (result.status === 'clarify' || result.status === 'no-match') {
      resultRoot.innerHTML = `<span class="wood-advisor__result-kicker">On préfère être précis</span><h3>Pas de raccourci magique.</h3><p>${escapeHtml(result.reason)}</p><a href="contact.html">Parler à WOOD ↗</a><button class="wood-advisor__clear" type="button" data-advisor-clear>Recommencer</button>`;
      return;
    }
    const best = result.best?.product;
    if (!best) {
      resultRoot.innerHTML = `<span class="wood-advisor__result-kicker">La sélection se prépare</span><h3>On garde la porte ouverte.</h3><p>${escapeHtml(result.reason)}</p><a href="contact.html">Parler à WOOD ↗</a>`;
      return;
    }
    const badgeMarkup = badgeEngine?.renderBadges(best) || '';
    const renderAlternative = (item) => {
      const badges = (item.badges || []).map((badge) => `${badge.label} — ${badge.reason}`).join(' · ');
      return `<li data-advisor-badges><a href="${escapeHtml(item.product.href)}">${escapeHtml(item.product.name)} ↗</a>${badges ? `<small>${escapeHtml(badges)}</small>` : ''}<small>${escapeHtml(item.explanation || 'Alternative descriptive.')}</small></li>`;
    };
    const alternatives = result.alternatives?.length ? `<ul class="wood-advisor__alternatives" aria-label="Alternatives">${result.alternatives.slice(0, 2).map(renderAlternative).join('')}</ul>` : '';
    resultRoot.innerHTML = `<span class="wood-advisor__result-kicker">${result.status === 'discovery' ? 'Une première piste' : 'Le meilleur raccord'}</span><h3>${escapeHtml(best.name)}</h3>${badgeMarkup}<p>${escapeHtml(result.best.explanation || result.reason)}</p><a href="${escapeHtml(best.href)}">Voir la sélection ↗</a>${alternatives}<button class="wood-advisor__clear" type="button" data-advisor-clear>Recommencer</button>`;
  };

  const run = (question, answerKey = 'free-text') => {
    const text = String(question || '').trim();
    sessionState.lastQuestion = text;
    sessionState.answers[answerKey] = text;
    sessionState.history.push({ answerKey, text });
    backButton.disabled = sessionState.history.length === 0;
    status.textContent = text ? 'WOOD regarde les critères descriptifs disponibles…' : '';
    const preferences = engine.extractPreferences(text);
    const result = engine.recommend(products, preferences);
    renderResult(result);
    status.textContent = '';
    // Amène la recommandation dans le champ de vision (sinon elle s'affiche sous le pli du panneau).
    try { resultRoot.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (error) { /* noop */ }
  };

  const open = () => {
    lastFocus = documentRef.activeElement;
    widget.classList.add('is-open');
    panel.hidden = false;
    bubble.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  };
  const close = () => {
    widget.classList.remove('is-open');
    panel.hidden = true;
    bubble.setAttribute('aria-expanded', 'false');
    sessionState.lastQuestion = '';
    sessionState.lastResult = null;
    sessionState.answers = {};
    sessionState.history = [];
    resultRoot.hidden = true;
    resultRoot.textContent = '';
    input.value = '';
    backButton.disabled = true;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  bubble.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeButton.addEventListener('click', close);
  widget.addEventListener('click', (event) => {
    // Tap sur le fond assombri (mobile) = fermer la feuille.
    if (widget.classList.contains('is-open') && event.target === widget) { close(); return; }
    const choice = event.target.closest('[data-advisor-category]');
    if (choice) {
      const category = findCategory(choice.dataset.advisorCategory);
      if (category) {
        input.value = categoryQuestion(category);
        run(input.value, 'category');
      }
    }
    if (event.target.closest('[data-advisor-discovery]')) run('Je ne sais pas', 'discovery');
    if (event.target.closest('[data-advisor-any]')) run('', 'discovery');
    if (event.target.closest('[data-advisor-skip]')) run('', 'skip');
    if (event.target.closest('[data-advisor-back]')) {
      sessionState.history.pop();
      const previous = sessionState.history.at(-1);
      sessionState.answers = Object.fromEntries(sessionState.history.map((item) => [item.answerKey, item.text]));
      input.value = previous?.text || '';
      resultRoot.hidden = true;
      resultRoot.textContent = '';
      backButton.disabled = sessionState.history.length === 0;
      input.focus();
    }
    if (event.target.closest('[data-advisor-clear]')) {
      resultRoot.hidden = true;
      resultRoot.textContent = '';
      input.focus();
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run(input.value, 'free-text');
  });
  documentRef.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) close();
  });
}(typeof window !== 'undefined' ? window : null));
