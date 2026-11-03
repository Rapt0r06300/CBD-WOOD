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
    {
      id: 'barla',
      label: 'Retrait à Barla',
      title: 'Retrait à la boutique Barla',
      description: 'Votre commande sera préparée au 7 rue Barla.',
      address: '7 rue Barla, 06300 Nice',
      phone: '04 22 16 35 70',
      phoneHref: 'tel:+33422163570',
      routeHref: 'https://www.google.com/maps/dir/?api=1&destination=7+Rue+Barla%2C+06300+Nice',
    },
    {
      id: 'borriglione',
      label: 'Retrait à Borriglione',
      title: 'Retrait à la boutique Borriglione',
      description: 'Votre commande sera préparée au 16 avenue Alfred Borriglione.',
      address: '16 avenue Alfred Borriglione, 06100 Nice',
      phone: '04 23 13 03 05',
      phoneHref: 'tel:+33423130305',
      routeHref: 'https://www.google.com/maps/dir/?api=1&destination=16+Avenue+Alfred+Borriglione%2C+06100+Nice',
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
    return 'Livraison disponible. Retrait possible à Barla ou à Borriglione.';
  }

  return { getOrderModes, getOrderMode, getPurchaseNotice };
}));
