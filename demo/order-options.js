(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WoodOrderOptions = factory();
}(typeof window !== 'undefined' ? window : globalThis, function () {
  const modes = [
    {
      id: 'delivery',
      label: 'Livraison',
      title: 'Livraison à domicile',
      description: 'Recevez votre commande à l’adresse indiquée lors de la validation.',
    },
  ];

  function getOrderModes() {
    return modes.map(mode => ({ ...mode }));
  }

  function getOrderMode(id) {
    const mode = modes.find(item => item.id === id);
    return mode ? { ...mode } : null;
  }

  function getPurchaseNotice() {
    return 'Livraison disponible à domicile.';
  }

  return { getOrderModes, getOrderMode, getPurchaseNotice };
}));
