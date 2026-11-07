(function attachAdvisorEngine(root, factory) {
  const api = factory(root);
  if (root) root.WoodAdvisorEngine = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis, function createAdvisorEngine(runtimeRoot) {
  const intensityRank = { low: 1, medium: 2, high: 3 };
  const normalizeText = (value) => String(value ?? '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const fallbackLexicon = {
    version: 'fallback-2026-11-07',
    categories: {
      fleurs: ['fleur', 'fleurs'],
      resines: ['resine', 'resines'],
      'bien-etre': ['bien etre', 'cosmetique', 'cosmetiques', 'huile', 'huiles', 'soin', 'soins'],
      'wood-shop': ['accessoire', 'accessoires', 'textile', 'vetement', 'vetements', 'wood shop'],
    },
    intensity: {
      high: ['fort', 'intense', 'marque', 'puissant'],
      low: ['leger', 'doux', 'subtil', 'soft'],
      maxMedium: ['fort', 'intense', 'puissant', 'marque'],
    },
    notes: {
      fruite: ['fruite', 'fruites', 'fruit'],
      terreux: ['terreux', 'terreuse'],
      boise: ['boise', 'boisee'],
      agrumes: ['agrumes'],
      sucre: ['sucre', 'sucree'],
    },
    blockedTopics: ['effet', 'relax', 'relaxant', 'dormi', 'sommeil', 'stress', 'douleur', 'traitement', 'medic', 'planer', 'defonce'],
  };
  const lexicon = runtimeRoot?.WoodAdvisorLexicon || fallbackLexicon;
  const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const termPattern = (terms, flags = '') => {
    const source = terms.map((term) => escapeRegExp(normalizeText(term))).filter(Boolean).join('|');
    return new RegExp(`\\b(?:${source})\\w*`, flags);
  };
  const hasAnyTerm = (text, terms) => termPattern(terms).test(text);
  const noteAliases = new Map(Object.entries(lexicon.notes || {}).flatMap(([canonical, aliases]) => (
    (Array.isArray(aliases) ? aliases : []).map((alias) => [normalizeText(alias), canonical])
  )));

  const isNegated = (text, index) => {
    const before = text.slice(Math.max(0, index - 28), index);
    return /\b(?:pas|sans|ni|aucun|aucune|jamais)\b/.test(before)
      || /\bne\b[^.!?]{0,20}\bpas\b/.test(before);
  };

  const hasContext = (text, index) => {
    const before = text.slice(Math.max(0, index - 32), index);
    return /\b(?:gout|arome|aromes|note|notes|profil|saveur)\b/.test(before);
  };

  const extractPreferences = (input) => {
    const text = normalizeText(input);
    const preferences = {
      raw: String(input ?? ''),
      normalized: text,
      desiredCategory: null,
      aromaIntensity: null,
      aromaIntensityMax: null,
      desiredNotes: [],
      excludeNotes: [],
      blockedTopics: [],
      needsClarification: false,
      discovery: false,
    };

    const blockedPatterns = (lexicon.blockedTopics || []).map((term) => ['medical-effect', termPattern([term])]);
    blockedPatterns.forEach(([name, pattern]) => {
      if (pattern.test(text)) preferences.blockedTopics.push(name);
    });

    for (const category of ['fleurs', 'resines', 'bien-etre', 'wood-shop']) {
      if (hasAnyTerm(text, lexicon.categories?.[category] || [])) {
        preferences.desiredCategory = category;
        break;
      }
    }

    const intensityHigh = termPattern(lexicon.intensity?.high || [], 'g');
    let match;
    while ((match = intensityHigh.exec(text))) {
      if (isNegated(text, match.index)) continue;
      if (hasContext(text, match.index)) preferences.aromaIntensity = 'high';
      else if (/\b(?:puissant|puissance)\w*/.test(match[0])) preferences.needsClarification = true;
    }
    if (!preferences.aromaIntensity && hasAnyTerm(text, lexicon.intensity?.low || []) && !/\b(?:pas|sans)\s+(?:trop\s+)?(?:leger|doux|subtil|soft)/.test(text)) {
      preferences.aromaIntensity = 'low';
    }
    if (/\bpas\s+trop\s+(?:fort|intense|puissant|marque)\w*/.test(text)) preferences.aromaIntensityMax = 'medium';
    if (/\b(?:plutot|un peu|legerement)\s+(?:doux|leger|subtil|soft)\b/.test(text)) preferences.aromaIntensity = 'low';

    noteAliases.forEach((canonical, alias) => {
      let noteIndex = text.indexOf(alias);
      while (noteIndex >= 0) {
        if (isNegated(text, noteIndex)) preferences.excludeNotes.push(canonical);
        else preferences.desiredNotes.push(canonical);
        noteIndex = text.indexOf(alias, noteIndex + alias.length);
      }
    });

    if (/\b(?:je ne sais pas|aucune idee|sans idee|pour decouvrir|decouverte)\b/.test(text) || !text) preferences.discovery = true;
    preferences.desiredNotes = [...new Set(preferences.desiredNotes)].sort();
    preferences.excludeNotes = [...new Set(preferences.excludeNotes)].sort();
    preferences.blockedTopics = [...new Set(preferences.blockedTopics)].sort();
    return preferences;
  };

  const verifiedFacts = (product) => (Array.isArray(product?.facts) ? product.facts : [])
    .filter((fact) => fact && fact.verified === true && fact.source && fact.key && fact.value !== null && fact.value !== undefined);
  const valuesFor = (facts, key) => facts.filter((fact) => fact.key === key).map((fact) => normalizeText(fact.value));
  const factEvidence = (facts, key, value) => facts.find((fact) => fact.key === key && normalizeText(fact.value) === normalizeText(value));
  const evidenceBadges = (facts) => {
    const badges = [];
    const intensityFacts = facts.filter((fact) => fact.key === 'aromaIntensity' && ['low', 'high'].includes(normalizeText(fact.value)));
    const intensityValues = [...new Set(intensityFacts.map((fact) => normalizeText(fact.value)))];
    if (intensityValues.length === 1) {
      const fact = intensityFacts[0];
      const label = intensityValues[0] === 'low' ? 'DOUX / LÉGER' : 'INTENSE / FORT';
      badges.push({ label, reason: `Profil aromatique ${intensityValues[0] === 'low' ? 'discret' : 'marqué'} décrit dans la fiche.`, source: fact.source });
    }
    const noteFacts = facts.filter((fact) => fact.key === 'notes' && noteAliases.has(normalizeText(fact.value)));
    const notes = [...new Set(noteFacts.map((fact) => noteAliases.get(normalizeText(fact.value))))];
    if (notes.length) badges.push({
      label: 'GOÛT / ARÔMES',
      reason: `Notes déclarées : ${notes.join(', ')}.`,
      source: noteFacts.map((fact) => fact.source).join(' · '),
    });
    return badges.slice(0, 3);
  };

  const categoryLabels = new Map([
    ['fleurs', 'Fleurs'],
    ['resines', 'Résines'],
    ['bien-etre', 'Bien-être'],
    ['wood-shop', 'WOOD Shop'],
  ]);
  const questionLabels = new Map([
    ['notes', 'Quel univers aromatique te parle le plus ?'],
    ['aromaIntensity', 'Tu préfères un profil discret ou marqué ?'],
  ]);
  const questionChoices = (products, key) => [...new Set(products.flatMap((product) => verifiedFacts(product)
    .filter((fact) => fact.key === key)
    .map((fact) => normalizeText(fact.value))))].sort();

  const buildQuestionPlan = (products) => {
    const list = Array.isArray(products) ? products : [];
    const categories = [...new Set(list.map((product) => normalizeText(product.category)).filter(Boolean))]
      .filter((category) => categoryLabels.has(category))
      .sort((left, right) => [...categoryLabels.keys()].indexOf(left) - [...categoryLabels.keys()].indexOf(right));
    const plan = [];
    if (categories.length) plan.push({
      id: 'category',
      key: 'category',
      text: 'Tu regardes quel univers aujourd’hui ?',
      choices: categories,
      labels: categories.map((category) => categoryLabels.get(category)),
    });
    for (const key of ['notes', 'aromaIntensity']) {
      const choices = questionChoices(list, key);
      if (choices.length > 1) plan.push({ id: key, key, text: questionLabels.get(key), choices });
    }
    return plan;
  };

  const nextQuestion = (products, preferences = extractPreferences(''), answers = {}) => {
    const plan = buildQuestionPlan(products);
    return plan.find((question) => {
      if (answers[question.key] !== undefined && answers[question.key] !== null && answers[question.key] !== '') return false;
      if (question.key === 'category' && preferences.desiredCategory) return false;
      if (question.key === 'notes' && (preferences.desiredNotes.length || preferences.excludeNotes.length)) return false;
      if (question.key === 'aromaIntensity' && (preferences.aromaIntensity || preferences.aromaIntensityMax)) return false;
      return true;
    }) || null;
  };

  const collectAmbiguities = (products) => {
    const issues = [];
    for (const product of Array.isArray(products) ? products : []) {
      const facts = Array.isArray(product?.facts) ? product.facts.filter(Boolean) : [];
      const verified = verifiedFacts(product);
      if (!verified.length) issues.push({ entityKind: 'product', entityId: product.id, reason: 'missing-critical', field: 'facts' });
      const groups = new Map();
      for (const fact of facts) {
        if (!fact.verified || !fact.source) issues.push({ entityKind: 'fact', entityId: product.id, reason: 'unproven', field: fact.key });
        if (fact.verified === true && fact.source && fact.key && fact.value !== null && fact.value !== undefined) {
          const values = groups.get(fact.key) || new Set();
          values.add(normalizeText(fact.value));
          groups.set(fact.key, values);
        }
      }
      for (const [field, values] of groups) if (values.size > 1) issues.push({ entityKind: 'fact', entityId: product.id, reason: 'conflict', field });
    }
    return issues;
  };

  const recommend = (products, preferences = extractPreferences('')) => {
    const list = Array.isArray(products) ? products : [];
    if (preferences.blockedTopics?.length) return {
      status: 'clarify', best: null, alternatives: [],
      reason: 'Je peux aider à comparer des descriptions de goût et de format, pas à conseiller un effet ou une utilisation médicale. Pour ce point, contacte directement WOOD.',
    };

    const scored = list.map((product, index) => {
      const facts = verifiedFacts(product);
      const notes = valuesFor(facts, 'notes');
      const intensities = valuesFor(facts, 'aromaIntensity');
      const hardExcluded = (preferences.desiredCategory && product.category !== preferences.desiredCategory)
        || preferences.excludeNotes.some((note) => notes.includes(note))
        || (preferences.aromaIntensityMax && intensities.some((value) => intensityRank[value] > intensityRank[preferences.aromaIntensityMax]));
      let score = 0;
      const evidence = [];
      if (preferences.aromaIntensity && intensities.includes(preferences.aromaIntensity)) {
        score += 3;
        evidence.push(factEvidence(facts, 'aromaIntensity', preferences.aromaIntensity));
      }
      preferences.desiredNotes.forEach((note) => {
        if (notes.includes(note)) {
          score += 3;
          evidence.push(factEvidence(facts, 'notes', note));
        }
      });
      if (preferences.desiredCategory && product.category === preferences.desiredCategory) score += 1;
      const matchedEvidence = evidence.filter(Boolean);
      const trace = matchedEvidence.map((fact) => ({
        phrase: preferences.raw,
        motif: normalizeText(fact.value),
        field: fact.key,
        source: fact.source,
        state: fact.verified === true ? 'verified' : 'proposed',
      }));
      return { product, index, facts, score, evidence: matchedEvidence, trace, hardExcluded };
    }).filter((entry) => !entry.hardExcluded)
      .sort((left, right) => right.score - left.score || left.index - right.index);

    const hasSpecificPreference = Boolean(preferences.desiredCategory || preferences.aromaIntensity || preferences.aromaIntensityMax || preferences.desiredNotes.length || preferences.excludeNotes.length);
    if (!scored.length || (hasSpecificPreference && scored[0].score === 0)) return {
      status: 'no-match', best: null, alternatives: [],
      reason: 'Aucune référence de démonstration ne correspond à tous ces critères avec des faits vérifiés. Tu peux assouplir un critère ou demander directement conseil à WOOD.',
    };
    if (!hasSpecificPreference || preferences.discovery) return {
      status: 'discovery',
      best: scored[0] ? { product: scored[0].product, score: 0, badges: evidenceBadges(scored[0].facts), trace: [], explanation: 'Sélection de découverte non personnalisée : les caractéristiques détaillées restent à valider par WOOD.' } : null,
      alternatives: scored.slice(1, 3).map((entry) => ({ product: entry.product, score: 0, badges: evidenceBadges(entry.facts), trace: [], explanation: 'Alternative de découverte, sans classement de goût inventé.' })),
      reason: 'Voici une porte d’entrée dans la sélection WOOD. Les informations détaillées apparaîtront uniquement avec une source validée.',
    };

    const describe = (entry) => {
      const details = entry.evidence.map((fact) => `${fact.key} « ${fact.value} » — source : ${fact.source}`).join(' · ');
      return details || 'Aucun fait vérifié ne justifie une préférence supplémentaire.';
    };
    const alternatives = scored.slice(1)
      .filter((entry) => entry.score > 0)
      .slice(0, 2)
      .map((entry) => ({ product: entry.product, score: entry.score, badges: evidenceBadges(entry.facts), trace: entry.trace, explanation: describe(entry) }));
    return {
      status: 'match',
      best: { product: scored[0].product, score: scored[0].score, badges: evidenceBadges(scored[0].facts), trace: scored[0].trace, explanation: `Correspondance fondée sur un fait vérifié : ${describe(scored[0])}` },
      alternatives,
      reason: 'Cette proposition reste descriptive : elle ne prédit aucun effet et ne remplace pas un conseil professionnel.',
    };
  };

  const lexiconVersion = () => String(lexicon.version || 'unversioned');
  const getLexicon = () => JSON.parse(JSON.stringify(lexicon));
  return Object.freeze({ normalizeText, extractPreferences, buildQuestionPlan, nextQuestion, collectAmbiguities, recommend, lexiconVersion, getLexicon });
}));
