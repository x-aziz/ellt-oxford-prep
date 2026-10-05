import { useState } from 'react';
import { useMocks } from '../../hooks/useMocks.js';
import { useDrills } from '../../hooks/useDrills.js';
import { useTests } from '../../hooks/useTests.js';
import {
  saveMock,
  deleteMock,
  saveDrill,
  deleteDrill,
  saveTest,
  deleteTest,
} from '../../services/content.js';
import { seedDefaultContent } from '../../data/seedToFirestore.js';
import ContentEditor from './ContentEditor.jsx';

const TABS = [
  { key: 'full-tests', label: 'Full Tests' },
  { key: 'reading-mocks', label: 'Reading Mocks' },
  { key: 'listening-mocks', label: 'Listening Mocks' },
  { key: 'writing-mocks', label: 'Writing Mocks' },
  { key: 'reading-drills', label: 'Reading Drills' },
  { key: 'listening-drills', label: 'Listening Drills' },
  { key: 'writing-drills', label: 'Writing Drills' },
];

const MOCK_SCALAR_FIELDS = [
  { key: 'id', label: 'Mock #', type: 'number' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'focus', label: 'Focus (shown on the landing card)', type: 'text' },
];

const READING_MOCK_TEMPLATE = {
  id: 1,
  title: 'New Reading Mock',
  focus: '',
  s1: { paras: [{ l: 'A', txt: '', pos: 1, why: '' }], qs: [] },
  s2: { textHtml: '<p>Passage with <span class="gap-marker">(1)</span> gaps…</p>', options: [{ l: 'A', txt: '' }], qs: [{ n: 1, ans: 'A', why: '' }] },
  s3: { passHtml: '<p>Passage…</p>', qs: [] },
};

const LISTENING_MOCK_TEMPLATE = {
  id: 1,
  title: 'New Listening Mock',
  focus: '',
  s1: { script: '', trapNote: '', qs: [] },
  s2: { script: '', trapNote: '', qs: [] },
  s3: { script: '', trapNote: '', qs: [] },
};

const WRITING_MOCK_SCALAR_FIELDS = MOCK_SCALAR_FIELDS;
const WRITING_MOCK_TEMPLATE = {
  id: 1,
  title: 'New Writing Mock',
  focus: '',
  s1: {
    textType: 'Narrative', // Narrative | Expository | Persuasive | Descriptive
    sourceTitle: '',
    sourceText: '',
    instruction: 'Summarise the text above in your own words.',
    minWords: 50,
    maxWords: 100,
  },
  s2: {
    essayType: 'Advantage/Disadvantage', // Opinion | Agree/Disagree | Advantage/Disadvantage
    prompt: '',
    minWords: 190,
    maxWords: 260,
  },
};

const DRILL_SCALAR_FIELDS = [
  { key: 'order', label: 'Order', type: 'number' },
  { key: 'eyebrow', label: 'Eyebrow tag', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'sub', label: 'Subtitle', type: 'textarea' },
];
const DRILL_TEMPLATE = { order: 0, eyebrow: '', title: 'New Drill Set', sub: '', items: [{ p: '', a: '', why: '' }] };

const WRITING_SCALAR_FIELDS = [
  { key: 'order', label: 'Order', type: 'number' },
  { key: 'name', label: 'Structure name', type: 'text' },
  { key: 'short', label: 'Short label', type: 'text' },
  { key: 'rule', label: 'Rule', type: 'textarea' },
  { key: 'formula', label: 'Formula', type: 'text' },
  { key: 'example', label: 'Example sentence', type: 'textarea' },
];
const WRITING_TEMPLATE = {
  order: 0,
  name: 'New Structure',
  short: '',
  rule: '',
  formula: '',
  example: '',
  drills: [{ prompt: '', instruction: '', model: '', why: '', keywords: '' }],
};

const TEST_TEMPLATE = {
  id: 1,
  title: '',
  focus: '',
  readingMockId: null,
  listeningMockId: null,
  writingMockId: null,
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('full-tests');
  const [seedMsg, setSeedMsg] = useState('');
  const [seeding, setSeeding] = useState(false);

  const { tests, loading: lt } = useTests();
  const { mocks: readingMocks, loading: lrm } = useMocks('reading');
  const { mocks: listeningMocks, loading: llm } = useMocks('listening');
  const { mocks: writingMocks, loading: lwm } = useMocks('writingMock');
  const { drills: readingDrills, loading: lrd } = useDrills('reading');
  const { drills: listeningDrills, loading: lld } = useDrills('listening');
  const { drills: writingDrills, loading: lwd } = useDrills('writing');

  async function runSeed() {
    setSeeding(true);
    setSeedMsg('');
    try {
      const existing = [...readingDrills, ...writingDrills];
      const res = await seedDefaultContent(existing);
      setSeedMsg(`Imported ${res.mocks} mocks, ${res.drills} drill sets and ${res.tests} full tests.`);
    } catch (e) {
      console.error('seed failed', e);
      setSeedMsg('Seed failed: ' + e.message);
    } finally {
      setSeeding(false);
    }
  }

  // Dropdown options for the Full Test form: every existing mock of that skill.
  const optionsFor = (mocks) => [
    { value: '', label: '— not included —' },
    ...mocks.map((m) => ({ value: m.id, label: `#${m.id} — ${m.title}` })),
  ];

  const testFields = [
    { key: 'id', label: 'Test # (shown as "Test 1")', type: 'number' },
    { key: 'title', label: 'Title (optional)', type: 'text' },
    { key: 'focus', label: 'Short description (optional)', type: 'text' },
    { key: 'readingMockId', label: 'Reading part', type: 'select', options: optionsFor(readingMocks) },
    { key: 'listeningMockId', label: 'Listening part', type: 'select', options: optionsFor(listeningMocks) },
    { key: 'writingMockId', label: 'Writing part', type: 'select', options: optionsFor(writingMocks) },
  ];

  return (
    <div className="dash-wrap">
      <div className="dash-hero">
        <h1>Admin — Content Manager</h1>
        <p>
          Build full tests from your Reading, Listening and Writing mocks, and manage the drills students see.
          Changes go live immediately.
        </p>
      </div>

      <div className="adm-seed-row">
        <button className="tcy-btn-gray" onClick={runSeed} disabled={seeding}>
          {seeding ? 'Importing…' : 'Import bundled default content'}
        </button>
        {seedMsg && <span className="adm-seed-msg">{seedMsg}</span>}
      </div>

      <div className="kind-toggle" style={{ marginTop: 18, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <a
            key={t.key}
            href="#"
            className={tab === t.key ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setTab(t.key);
            }}
          >
            {t.label}
          </a>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {tab === 'full-tests' && (
          <>
            <p style={{ margin: '0 0 14px', color: '#66718a' }}>
              A full test is one Reading mock + one Listening mock + one Writing mock. Create the mocks in the other
              tabs first, then pick them here. Students see each full test as one block on their dashboard.
            </p>
            <ContentEditor
              title="Full Tests"
              items={tests}
              loading={lt}
              scalarFields={testFields}
              jsonFields={[]}
              listLabel={(t) =>
                `Test ${t.id}${t.title ? ' — ' + t.title : ''}  [R: ${t.readingMockId ?? '–'} · L: ${t.listeningMockId ?? '–'} · W: ${t.writingMockId ?? '–'}]`
              }
              newTemplate={{ ...TEST_TEMPLATE, id: nextId(tests) }}
              onSave={saveTest}
              onDelete={deleteTest}
            />
          </>
        )}
        {tab === 'reading-mocks' && (
          <ContentEditor
            title="Reading Mocks"
            items={readingMocks}
            loading={lrm}
            scalarFields={MOCK_SCALAR_FIELDS}
            jsonFields={['s1', 's2', 's3']}
            listLabel={(m) => `#${m.id} — ${m.title}`}
            newTemplate={{ ...READING_MOCK_TEMPLATE, id: nextId(readingMocks) }}
            onSave={(item) => saveMock('reading', item)}
            onDelete={deleteMock}
          />
        )}
        {tab === 'listening-mocks' && (
          <ContentEditor
            title="Listening Mocks"
            items={listeningMocks}
            loading={llm}
            scalarFields={MOCK_SCALAR_FIELDS}
            jsonFields={['s1', 's2', 's3']}
            listLabel={(m) => `#${m.id} — ${m.title}`}
            newTemplate={{ ...LISTENING_MOCK_TEMPLATE, id: nextId(listeningMocks) }}
            onSave={(item) => saveMock('listening', item)}
            onDelete={deleteMock}
          />
        )}
        {tab === 'writing-mocks' && (
          <ContentEditor
            title="Writing Mocks"
            items={writingMocks}
            loading={lwm}
            scalarFields={WRITING_MOCK_SCALAR_FIELDS}
            jsonFields={['s1', 's2']}
            listLabel={(m) => `#${m.id} — ${m.title}`}
            newTemplate={{ ...WRITING_MOCK_TEMPLATE, id: nextId(writingMocks) }}
            onSave={(item) => saveMock('writingMock', item)}
            onDelete={deleteMock}
          />
        )}
        {tab === 'reading-drills' && (
          <ContentEditor
            title="Reading Drills"
            items={readingDrills}
            loading={lrd}
            scalarFields={DRILL_SCALAR_FIELDS}
            jsonFields={['items']}
            listLabel={(d) => `${d.eyebrow ? d.eyebrow + ': ' : ''}${d.title} (${d.items?.length ?? 0} items)`}
            newTemplate={DRILL_TEMPLATE}
            onSave={(item) => saveDrill('reading', item.docId || null, strip(item, 'docId'))}
            onDelete={deleteDrill}
          />
        )}
        {tab === 'listening-drills' && (
          <ContentEditor
            title="Listening Drills"
            items={listeningDrills}
            loading={lld}
            scalarFields={DRILL_SCALAR_FIELDS}
            jsonFields={['items']}
            listLabel={(d) => `${d.eyebrow ? d.eyebrow + ': ' : ''}${d.title} (${d.items?.length ?? 0} items)`}
            newTemplate={DRILL_TEMPLATE}
            onSave={(item) => saveDrill('listening', item.docId || null, strip(item, 'docId'))}
            onDelete={deleteDrill}
          />
        )}
        {tab === 'writing-drills' && (
          <ContentEditor
            title="Writing Drills"
            items={writingDrills}
            loading={lwd}
            scalarFields={WRITING_SCALAR_FIELDS}
            jsonFields={['drills']}
            listLabel={(d) => `${d.name} (${d.drills?.length ?? 0} drills)`}
            newTemplate={WRITING_TEMPLATE}
            onSave={(item) => saveDrill('writing', item.docId || null, strip(item, 'docId'))}
            onDelete={deleteDrill}
          />
        )}
      </div>
    </div>
  );
}

function nextId(list) {
  return list.length ? Math.max(...list.map((m) => m.id || 0)) + 1 : 1;
}
function strip(obj, key) {
  const { [key]: _omit, ...rest } = obj;
  return rest;
}