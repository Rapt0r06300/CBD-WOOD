(() => {
  const requiredFields = ['orderName', 'orderPhone'];
  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.required = true;
    field.setAttribute('aria-required', 'true');
  });
})();
