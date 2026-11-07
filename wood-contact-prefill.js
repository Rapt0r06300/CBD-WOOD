(() => {
  const field = document.getElementById('contact-message');
  if (!field) return;
  const value = new URLSearchParams(window.location.search).get('produit')?.trim();
  if (!value || value.length > 120) return;
  const safeName = value.replace(/[<>\u0000-\u001f]/g, '').trim();
  if (!safeName) return;
  field.value = `Bonjour, j’aimerais un conseil sur la référence « ${safeName} ».`;
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.focus({ preventScroll: true });
})();
