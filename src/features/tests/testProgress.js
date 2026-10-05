// Helpers that turn the raw attempts list into per-test progress.

export const SKILLS = [
  { key: 'reading', letter: 'R', label: 'Reading', icon: '📖', mockKind: 'reading', minutes: 40 },
  { key: 'listening', letter: 'L', label: 'Listening', icon: '🎧', mockKind: 'listening', minutes: 26 },
  { key: 'writing', letter: 'W', label: 'Writing', icon: '✏️', mockKind: 'writingMock', minutes: 45 },
];

const skillOfAttempt = (kind) =>
  kind === 'reading'
    ? 'reading'
    : kind === 'listening'
      ? 'listening'
      : kind === 'writing' || kind === 'writingMock'
        ? 'writing'
        : null;

/** { reading: {refId: bestAttempt}, listening: {...}, writing: {...} } */
export function bestAttempts(attempts) {
  const out = { reading: {}, listening: {}, writing: {} };
  (attempts || []).forEach((a) => {
    const s = skillOfAttempt(a.kind);
    if (!s) return;
    const cur = out[s][a.refId];
    if (!cur || (a.pct ?? 0) > (cur.pct ?? 0)) out[s][a.refId] = a;
  });
  return out;
}

/** Progress for one admin-created test. */
export function testProgress(test, best) {
  const res = {};
  let done = 0;
  let total = 0;
  SKILLS.forEach((s) => {
    const mockId = test[`${s.key}MockId`];
    const assigned = mockId !== null && mockId !== undefined && mockId !== '';
    const attempt = assigned ? best[s.key][mockId] || null : null;
    res[s.key] = { assigned, mockId, attempt };
    if (assigned) total++;
    if (attempt) done++;
  });
  return { ...res, done, total };
}