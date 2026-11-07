(function attachBadgeEngine(root) {
  const normalize = (value) => String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));
  const verifiedFacts = (product) => (Array.isArray(product?.facts) ? product.facts : [])
    .filter((fact) => fact && fact.verified === true && fact.source && fact.key && fact.value !== null && fact.value !== undefined);
  const intensity = new Map([
    ['low', { family: 'soft', label: 'DOUX / LÉGER', description: 'Profil aromatique discret décrit dans la fiche.', icon: 'assets/graffiti/wood-badge-soft.svg' }],
    ['high', { family: 'intensity', label: 'INTENSE / FORT', description: 'Intensité aromatique marquée décrite dans la fiche.', icon: 'assets/graffiti/wood-badge-intense.svg' }],
  ]);
  const noteLabels = new Map([
    ['fruite', 'fruité'], ['terreux', 'terreux'], ['boise', 'boisé'], ['agrumes', 'agrumes'], ['sucre', 'sucré'],
  ]);

  const buildBadges = (product) => {
    const facts = verifiedFacts(product);
    const badges = [];
    const intensityFacts = facts.filter((fact) => fact.key === 'aromaIntensity' && intensity.has(normalize(fact.value)));
    const intensityValues = [...new Set(intensityFacts.map((fact) => normalize(fact.value)))];
    const intensityFact = intensityValues.length === 1 ? intensityFacts[0] : null;
    if (intensityFact) {
      const definition = intensity.get(normalize(intensityFact.value));
      badges.push({ ...definition, source: intensityFact.source });
    }
    const notes = [...new Set(facts.filter((fact) => fact.key === 'notes' && noteLabels.has(normalize(fact.value))).map((fact) => normalize(fact.value)))];
    if (notes.length) {
      const noteFacts = facts.filter((fact) => fact.key === 'notes' && notes.includes(normalize(fact.value)));
      badges.push({
        family: 'aroma',
        label: 'GOÛT / ARÔMES',
        description: `Notes déclarées : ${notes.map((note) => noteLabels.get(note)).join(', ')}.`,
        icon: 'assets/graffiti/wood-badge-aroma.svg',
        source: noteFacts.map((fact) => fact.source).join(' · '),
      });
    }
    return badges.slice(0, 3);
  };

  const renderBadges = (product) => {
    const badges = buildBadges(product);
    if (!badges.length) return '';
    return `<div class="wood-badges" aria-label="Caractéristiques descriptives">${badges.map((badge) => `<span class="wood-badge wood-badge--${escapeHtml(badge.family)}" aria-label="${escapeHtml(badge.label)} — ${escapeHtml(badge.description)}" data-badge-source="${escapeHtml(badge.source)}"><img src="${escapeHtml(badge.icon)}" alt="" aria-hidden="true"><span><strong>${escapeHtml(badge.label)}</strong><small>${escapeHtml(badge.description)} Source vérifiée : ${escapeHtml(badge.source)}</small></span></span>`).join('')}</div>`;
  };

  const api = Object.freeze({ buildBadges, renderBadges });
  if (root) root.WoodBadgeEngine = api;
}(typeof window !== 'undefined' ? window : globalThis));
