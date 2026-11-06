export const MEDIA_STATES = Object.freeze(['demo', 'prepared', 'approved', 'real-photo']);

const LABELS = Object.freeze({
  demo: 'Photo démo',
  prepared: 'Média préparé',
  approved: 'Photo approuvée',
  'real-photo': 'Photo réelle',
});

export function normalizeMediaState(value, { src = '' } = {}) {
  const state = String(value || '').trim().toLowerCase();
  if (!src && (state === 'approved' || state === 'real-photo')) return 'demo';
  return MEDIA_STATES.includes(state) ? state : 'demo';
}

export function getMediaLabel(value) {
  const state = String(value || '').trim().toLowerCase();
  return LABELS[MEDIA_STATES.includes(state) ? state : 'demo'];
}
