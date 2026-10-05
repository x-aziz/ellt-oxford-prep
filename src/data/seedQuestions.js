// Flattens the reading & listening mock data into one uniform list of
// questions, each with a stable id (used as the Firestore mistake doc id
// so re-missing the same question just bumps its "times wrong" counter
// instead of creating a duplicate).

import { READING_MOCKS } from './readingMocks.js';
import { LISTENING_MOCKS } from './listeningMocks.js';

const SECTION_LABEL = {
  reading: ['S1 — Ordering', 'S2 — Sentence Fill', 'S3 — Comprehension'],
  listening: ['S1 — Monologue', 'S2 — Gap Fill', 'S3 — Speaker Match'],
};

function flattenSource(mocks, source) {
  const out = [];
  mocks.forEach((mock) => {
    [mock.s1, mock.s2, mock.s3].forEach((sec, si) => {
      (sec.qs || []).forEach((q, qi) => {
        out.push({
          id: `${source}-${mock.id}-s${si + 1}-q${qi}`,
          source,
          mockId: mock.id,
          mockTitle: mock.title,
          section: si,
          sectionLabel: SECTION_LABEL[source][si],
          index: qi,
          ...q,
        });
      });
    });
  });
  return out;
}

export const ALL_QUESTIONS = [
  ...flattenSource(READING_MOCKS, 'reading'),
  ...flattenSource(LISTENING_MOCKS, 'listening'),
];

export function getQuestionById(id) {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

/** Build a mistake record (shape expected by services/firestore.js) from a
 *  flattened question + the answer the user actually gave. */
export function buildMistake(question, yourAnswer) {
  return {
    id: question.id,
    skill: question.type,
    source: question.source,
    sectionLabel: question.sectionLabel,
    mockTitle: question.mockTitle,
    text: question.text,
    options: question.opts || null,
    yourAnswer,
    correctAnswer: question.ans,
    why: question.why || null,
    ev: question.ev || null,
    trap: question.trap || null,
  };
}
