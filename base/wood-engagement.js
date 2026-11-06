(() => {
  const offer = document.querySelector('#woodOfferPreview');
  const activity = document.querySelector('#woodActivityPreview');
  const storageKey = 'wood-demo-offer-dismissed-v1';
  let offerDismissed = false;
  let revealed = false;

  const dismiss = (element) => {
    if (!element) return;
    element.hidden = true;
    try { window.localStorage.setItem(storageKey, '1'); } catch {}
  };

  if (offer) {
    offer.querySelectorAll('[data-wood-offer-dismiss]').forEach(button => button.addEventListener('click', () => dismiss(offer)));
    try { offerDismissed = window.localStorage.getItem(storageKey) === '1'; } catch { offerDismissed = false; }
    offer.hidden = true;
  }
  activity?.querySelector('[data-wood-activity-dismiss]')?.addEventListener('click', () => {
    activity.hidden = true;
  });

  const revealAfterScroll = () => {
    if (revealed || window.scrollY < 360) return;
    revealed = true;
    document.documentElement.classList.add('wood-engagement-revealed');
    window.removeEventListener('scroll', revealAfterScroll);
  };
  window.addEventListener('scroll', revealAfterScroll, { passive: true });
  revealAfterScroll();

  document.querySelectorAll('.wood-selection__card').forEach(card => {
    const image = card.querySelector('.wood-selection__visual img');
    if (!image || !image.src.includes('/assets/flowers/')) return;
    const flowerSource = image.getAttribute('src');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    image.dataset.flowerSource = flowerSource;
    const showFlower = () => { image.src = image.dataset.flowerSource; };
    const showPreview = () => { image.src = image.dataset.flowerSource; };
    if (canHover) {
      card.addEventListener('mouseenter', showFlower);
      card.addEventListener('mouseleave', showPreview);
    }
    card.addEventListener('focusin', showFlower);
    card.addEventListener('focusout', (event) => {
      if (!card.contains(event.relatedTarget)) showPreview();
    });
    card.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') showFlower();
    });
    card.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'touch') showPreview();
    });
    card.addEventListener('pointercancel', (event) => {
      if (event.pointerType === 'touch') showPreview();
    });
  });
})();
