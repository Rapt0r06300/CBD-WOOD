import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [contact, styles, roadmap] = await Promise.all([
  readFile(new URL('../contact.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-contact.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-076 présente le conseil humain sans inventer de biographies', () => {
  assert.match(contact, /data-human-advice-state="pending"/u);
  assert.match(contact, /Conseil humain WOOD/u);
  assert.match(contact, /Comprendre|Comparer|Passer en boutique/iu);
  assert.match(contact, /Présentation nominative.*à valider/iu);
  assert.match(contact, /tel:\+33422163570/u);
  assert.match(contact, /rendez-vous\.html/u);
  assert.doesNotMatch(contact, /directeur|fondateur|expert certifié|docteur/iu);
  assert.match(styles, /wood-human-advice/iu);
  assert.match(roadmap, /^- \[x\] \*\*CRO-076 —/mu);
});
