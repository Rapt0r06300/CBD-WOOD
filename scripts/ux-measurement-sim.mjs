const EVENT_NAMES = Object.freeze([
  'entry',
  'category_view',
  'detail_view',
  'call_click',
  'directions_click',
]);

export function measureFixture(events) {
  const counts = Object.fromEntries(EVENT_NAMES.map(name => [name, 0]));
  for (const event of events) {
    if (typeof event !== 'string' || !(event in counts)) continue;
    counts[event] += 1;
  }
  return { events: counts, sent: false, stored: false, purchase: false };
}

if (process.argv[1]?.toLowerCase().endsWith('ux-measurement-sim.mjs')) {
  const fixture = [
    'entry',
    'category_view',
    'detail_view',
    'call_click',
    'directions_click',
  ];
  process.stdout.write(`${JSON.stringify(measureFixture(fixture))}\n`);
}
