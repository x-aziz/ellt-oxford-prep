import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMocks } from '../../hooks/useMocks.js';
import { useAttempts } from '../../hooks/useAttempt.js';
import { useTests } from '../../hooks/useTests.js';
import { useAuth } from '../../App.jsx';
import { useProfile } from '../../hooks/useProfile.js';
import { extendReadingMock } from '../../data/readingExtraQuestions.js';
import { SKILLS, bestAttempts, testProgress } from './testProgress.js';

function hashId(str) {
  let h = 0;
  for (let i = 0; i < (str || '').length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return 1000000 + (h % 9000000);
}

function describe(skillKey, mock) {
  if (!mock) return [];
  if (skillKey === 'reading') {
    const m = extendReadingMock(mock);
    const total = (m.s1?.paras?.length || 0) + (m.s2?.qs?.length || 0) + (m.s3?.qs?.length || 0);
    return [
      '- Three sections, ' + total + ' questions in total',
      '- Section 1: Paragraph ordering',
      '- Section 2: Sentence fill',
      '- Section 3: Reading comprehension',
      '- You will have 40 minutes to complete the test',
    ];
  }
  if (skillKey === 'listening') {
    const total = ['s1', 's2', 's3'].reduce((n, k) => n + (mock[k]?.qs?.length || 0), 0);
    return [
      '- Three sections, ' + total + ' questions in total',
      '- Section 1: Monologue – you will hear the audio once',
      '- Section 2: Interview – you will hear the audio twice',
      '- Section 3: Listening analysis – you will hear the audio twice',
      '- You will have 26 minutes to complete the test',
    ];
  }
  const s1 = mock.s1 || {};
  const s2 = mock.s2 || {};
  return [
    '- Two tasks: a summary and an essay',
    `- Task 1: summarise a text (${s1.minWords ?? '?'}–${s1.maxWords ?? '?'} words)`,
    `- Task 2: essay (${s2.minWords ?? '?'}–${s2.maxWords ?? '?'} words)`,
    '- You will have 45 minutes to complete the test',
  ];
}

const MINUTES = { reading: 40, listening: 26, writing: 45 };

export default function TestHub() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { displayName } = useProfile();
  const { tests, loading } = useTests();
  const { mocks: readingMocks } = useMocks('reading');
  const { mocks: listeningMocks } = useMocks('listening');
  const { mocks: writingMocks } = useMocks('writingMock');
  const { attempts } = useAttempts();

  const test = tests.find((t) => String(t.id) === String(testId));
  const best = useMemo(() => bestAttempts(attempts), [attempts]);
  const mockLists = { reading: readingMocks, listening: listeningMocks, writing: writingMocks };
  const who = displayName || user?.displayName || 'Student';
  const uidNum = hashId(user?.uid || who);

  if (loading) {
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        <div className="adm-empty" style={{ padding: 40 }}>Loading test…</div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        <div className="adm-empty" style={{ padding: 40 }}>
          This test doesn't exist.{' '}
          <button className="tcy-btn-gold" onClick={() => navigate('/')}>Back to dashboard</button>
        </div>
      </div>
    );
  }

  const p = testProgress(test, best);

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button className="tcy-hub-back" onClick={() => navigate('/')}>← Dashboard</button>
          <h1>Oxford ELLT – Test {test.id}</h1>
          {test.title && <div className="tcy-hub-sub">{test.title}</div>}
        </div>
        <span className="who">
          Welcome, {who} | User ID: {uidNum} · {p.done}/{p.total} completed
        </span>
      </div>

      <div className="tcy-cards tcy-cards-rlw">
        {SKILLS.map((s) => {
          const st = p[s.key];
          const mock = st.assigned ? mockLists[s.key].find((m) => m.id === st.mockId) : null;
          const a = st.attempt;
          const ready = st.assigned && mock;
          return (
            <div className={`tcy-card tcy-card-${s.letter.toLowerCase()}`} key={s.key}>
              <div className="tcy-card-top">
                <div className="tcy-card-title">
                  <span className="ic">{s.icon}</span>
                  {s.label}
                  {a && <span className="tcy-tick" title="Completed">✓</span>}
                </div>
                <button className="tcy-btn-gold" disabled={!ready} onClick={() => navigate(`/tests/${test.id}/${s.key}`)}>
                  {a ? 'Retake' : 'Start'}
                </button>
              </div>

              <div className="tcy-card-desc">
                <span className="lbl">Description</span>
                {ready ? (
                  describe(s.key, mock).map((line, i) => <div key={i}>{line}</div>)
                ) : (
                  <div>{st.assigned ? 'Loading…' : 'Not available in this test yet.'}</div>
                )}
              </div>

              <div className="tcy-card-time">
                <span className="lbl">Test time</span>
                {MINUTES[s.key]} minutes
              </div>

              <div className="tcy-card-best" style={!a ? { background: 'transparent', color: '#8a8f99', padding: 0 } : undefined}>
                {a ? (
                  a.total ? <>Best score: {a.score}/{a.total} · {a.pct}%</> : 'Completed'
                ) : (
                  'Not taken yet'
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="tcy-hub-note">Each part is timed separately and can be taken in any order.</p>
    </div>
  );
}