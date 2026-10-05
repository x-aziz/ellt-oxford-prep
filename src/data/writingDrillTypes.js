import { WRITING_MOCKS, ESSAY_LABEL } from './writingMocks.js';

export const WRITING_DRILL_TYPES = [
  {
    key: 'summary',
    label: 'Summary Drill',
    icon: '📝',
    desc: 'Summarise short passages in your own words, then compare with a model answer.',
    exercises: WRITING_MOCKS.map((m) => ({
      id: 'sum-' + m.id,
      title: m.s1.title,
      focus: m.s1.textType + ' text',
      text: m.s1.text,
      minWords: m.s1.minWords,
      maxWords: m.s1.maxWords,
      model: m.s1.model,
    })),
  },
  {
    key: 'essay',
    label: 'Essay Drill',
    icon: '🖋️',
    desc: 'Write full essays on common ELLT prompt types, then compare with a model answer.',
    exercises: WRITING_MOCKS.map((m) => ({
      id: 'ess-' + m.id,
      title: ESSAY_LABEL[m.s2.essayType] || 'Essay',
      focus: m.focus,
      text: m.s2.prompt,
      minWords: m.s2.minWords,
      maxWords: m.s2.maxWords,
      model: m.s2.model,
    })),
  },
];