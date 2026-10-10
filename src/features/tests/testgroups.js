// A "Test" bundles one Reading mock + one Listening mock + one Writing mock
// that share the same `id`   mirroring the real Oxford ELLT, where "Test 1",
// "Test 2"… each contain all three skills (no Speaking in this app).
//
// Works on whatever mocks are currently loaded (static bundle or live
// Firestore content via useMocks), so it stays correct as the admin adds
// or removes mocks.
export function buildTestGroups(
  readingMocks = [],
  listeningMocks = [],
  writingMocks = [],
) {
  const ids = new Set([
    ...readingMocks.map((m) => m.id),
    ...listeningMocks.map((m) => m.id),
    ...writingMocks.map((m) => m.id),
  ]);
  return [...ids]
    .sort((a, b) => a - b)
    .map((id) => ({
      id,
      reading: readingMocks.find((m) => m.id === id) || null,
      listening: listeningMocks.find((m) => m.id === id) || null,
      writing: writingMocks.find((m) => m.id === id) || null,
    }));
}
