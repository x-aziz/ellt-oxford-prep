import { READING_MOCKS } from './readingMocks.js';
import { LISTENING_MOCKS } from './listeningMocks.js';
import { WRITING_MOCKS } from './writingMocks.js';
import { WRITING_STRUCTURES } from './writingStructures.js';
import { READING_DRILLS } from './readingDrills.js';
import { saveMock, saveDrill, saveTest } from '../services/content.js';

/**
 * One-time (idempotent) import of the bundled static content into Firestore,
 * so the admin has something to edit instead of starting from zero. Safe to
 * run more than once — mocks and tests overwrite by id, drills overwrite by a
 * deterministic key stashed in `seedKey`.
 *
 * Also creates starter Full Tests: Test N = Reading N + Listening N + Writing N
 * (the bundle has 4 reading, 8 listening and 4 writing mocks, so Tests 1–4 get
 * all three parts). Admins can re-pair them in Admin → Full Tests.
 */
export async function seedDefaultContent(existingDrills) {
  let mocks = 0;
  let drills = 0;
  let tests = 0;

  for (const m of READING_MOCKS) {
    await saveMock('reading', m);
    mocks++;
  }
  for (const m of LISTENING_MOCKS) {
    await saveMock('listening', m);
    mocks++;
  }
  for (const m of WRITING_MOCKS) {
    await saveMock('writingMock', m);
    mocks++;
  }

  const fullCount = Math.min(READING_MOCKS.length, LISTENING_MOCKS.length, WRITING_MOCKS.length);
  for (let i = 0; i < fullCount; i++) {
    await saveTest({
      id: i + 1,
      title: READING_MOCKS[i].title,
      focus: READING_MOCKS[i].focus,
      readingMockId: READING_MOCKS[i].id,
      listeningMockId: LISTENING_MOCKS[i].id,
      writingMockId: WRITING_MOCKS[i].id,
    });
    tests++;
  }

  const existingByKey = new Map((existingDrills || []).map((d) => [d.seedKey, d.docId]));

  for (let i = 0; i < READING_DRILLS.length; i++) {
    const d = READING_DRILLS[i];
    const seedKey = 'reading-' + d.key;
    await saveDrill('reading', existingByKey.get(seedKey) || null, {
      seedKey,
      order: i,
      title: d.title,
      eyebrow: d.eyebrow,
      sub: d.sub,
      items: d.items,
    });
    drills++;
  }

  for (let i = 0; i < WRITING_STRUCTURES.length; i++) {
    const s = WRITING_STRUCTURES[i];
    const seedKey = 'writing-' + s.id;
    await saveDrill('writing', existingByKey.get(seedKey) || null, {
      seedKey,
      order: i,
      name: s.name,
      short: s.short,
      rule: s.rule,
      formula: s.formula,
      example: s.example,
      drills: s.drills,
    });
    drills++;
  }

  return { mocks, drills, tests };
}