(function attachWoodAdvisorLexicon(root) {
  if (!root) return;
  root.WoodAdvisorLexicon = Object.freeze({
    version: '2026-11-07.1',
    categories: Object.freeze({
      fleurs: Object.freeze(['fleur', 'fleurs']),
      resines: Object.freeze(['resine', 'resines']),
      'bien-etre': Object.freeze(['bien etre', 'cosmetique', 'cosmetiques', 'huile', 'huiles', 'soin', 'soins']),
      'wood-shop': Object.freeze(['accessoire', 'accessoires', 'textile', 'vetement', 'vetements', 'wood shop']),
    }),
    intensity: Object.freeze({
      high: Object.freeze(['fort', 'intense', 'marque', 'puissant']),
      low: Object.freeze(['leger', 'doux', 'subtil', 'soft']),
      maxMedium: Object.freeze(['fort', 'intense', 'puissant', 'marque']),
    }),
    notes: Object.freeze({
      fruite: Object.freeze(['fruite', 'fruites', 'fruit', 'fruité']),
      terreux: Object.freeze(['terreux', 'terreuse']),
      boise: Object.freeze(['boise', 'boisee']),
      agrumes: Object.freeze(['agrumes']),
      sucre: Object.freeze(['sucre', 'sucree']),
    }),
    blockedTopics: Object.freeze(['effet', 'relax', 'relaxant', 'dormi', 'sommeil', 'stress', 'douleur', 'traitement', 'medic', 'planer', 'defonce']),
  });
}(typeof window !== 'undefined' ? window : globalThis));
