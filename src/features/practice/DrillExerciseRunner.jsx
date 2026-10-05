import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { READING_DRILL_TYPES } from '../../data/readingDrillTypes.js';
import { LISTENING_DRILL_TYPES } from '../../data/listeningDrillTypes.js';
import { WRITING_DRILL_TYPES } from '../../data/writingDrillTypes.js';

const TYPES_BY_SKILL = {
  reading: READING_DRILL_TYPES,
  listening: LISTENING_DRILL_TYPES,
  writing: WRITING_DRILL_TYPES,
};

const words = (t) => (t || '').trim().match(/\S+/g) || [];

export default function DrillExerciseRunner() {
  const { skill, typeKey, exerciseId } = useParams();
  const navigate = useNavigate();
  const types = TYPES_BY_SKILL[skill] || [];
  const type = types.find((t) => t.key === typeKey);
  const idx = type ? type.exercises.findIndex((e) => e.id === exerciseId) : -1;
  const exercise = idx >= 0 ? type.exercises[idx] : null;

  if (!type || !exercise) {
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        <div className="adm-empty" style={{ padding: 40 }}>Not found.</div>
      </div>
    );
  }

  const goto = (newIdx) => {
    if (newIdx < 0 || newIdx >= type.exercises.length) return;
    navigate(`/practice/${skill}/${typeKey}/${type.exercises[newIdx].id}`);
  };

  if (Array.isArray(exercise.items)) {
    return <ReadingListeningRunner skill={skill} typeKey={typeKey} type={type} exercise={exercise} idx={idx} goto={goto} navigate={navigate} />;
  }
  return <WritingDrillScreen skill={skill} typeKey={typeKey} type={type} exercise={exercise} idx={idx} goto={goto} navigate={navigate} />;
}

/* ---------- Reading / Listening: reveal + self-check ---------- */
function ReadingListeningRunner({ skill, typeKey, type, exercise, idx, goto, navigate }) {
  const [revealed, setRevealed] = useState({});
  const [marks, setMarks] = useState({});

  const tally = useMemo(() => {
    const vals = Object.values(marks);
    return { good: vals.filter((v) => v === 'good').length, bad: vals.filter((v) => v === 'bad').length };
  }, [marks]);

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button className="tcy-hub-back" onClick={() => navigate(`/practice/${skill}/${typeKey}`)}>← {type.label}</button>
          <h1>{exercise.title}</h1>
        </div>
        <span className="who">Got it: {tally.good} · Missed: {tally.bad}</span>
      </div>

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '10px 20px 60px' }}>
        {exercise.sub && <p className="tcy-qsub" style={{ marginBottom: 20 }}>{exercise.sub}</p>}

        {exercise.items.map((item, i) => {
          const mark = marks[i];
          let cls = 'qcard';
          if (mark === 'good') cls += ' correct';
          if (mark === 'bad') cls += ' wrong';
          return (
            <div className={cls} key={i}>
              <div className="q-meta"><div className="q-num">{i + 1}</div></div>
              <div className="q-text" dangerouslySetInnerHTML={{ __html: item.p }} />
              {!revealed[i] ? (
                <button className="tcy-btn-gold" onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}>
                  Reveal answer
                </button>
              ) : (
                <>
                  <div className="exp">
                    <div className="exp-ans ok">Answer: {item.a}</div>
                    {item.hint && !item.why && <div className="exp-why">Hint: {item.hint}</div>}
                    {item.why && <div className="exp-why">{item.why}</div>}
                  </div>
                  <div className="drill-sc-row">
                    <button className={'drill-sc-btn good' + (mark === 'good' ? ' on' : '')} onClick={() => setMarks((m) => ({ ...m, [i]: 'good' }))}>✓ Got it</button>
                    <button className={'drill-sc-btn bad' + (mark === 'bad' ? ' on' : '')} onClick={() => setMarks((m) => ({ ...m, [i]: 'bad' }))}>✗ Missed it</button>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <div className="tcy-nav-row">
          <button className="tcy-btn-gray" disabled={idx === 0} onClick={() => goto(idx - 1)}>← Previous exercise</button>
          <button className="tcy-btn-gray" disabled={idx === type.exercises.length - 1} onClick={() => goto(idx + 1)}>Next exercise →</button>
        </div>
      </main>
    </div>
  );
}

/* ---------- Writing: write & compare with model ---------- */
function WritingDrillScreen({ skill, typeKey, type, exercise, idx, goto, navigate }) {
  const [draft, setDraft] = useState('');
  const [showModel, setShowModel] = useState(false);
  const wc = words(draft).length;
  const inRange = wc >= exercise.minWords && wc <= exercise.maxWords;

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button className="tcy-hub-back" onClick={() => navigate(`/practice/${skill}/${typeKey}`)}>← {type.label}</button>
          <h1>{exercise.title}</h1>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 20px 60px' }}>
        <div className="wm-split">
          <div className="wm-left">
            {exercise.focus && <span className="wm-badge">{exercise.focus}</span>}
            {exercise.text.split('\n\n').map((p, i) => <p className="wm-text" key={i}>{p}</p>)}
          </div>
          <div className="wm-right">
            <div className="tcy-qtext">
              Write your answer in <b>{exercise.minWords}–{exercise.maxWords} words</b>.
            </div>
            <textarea
              className="wm-area"
              rows={typeKey === 'summary' ? 9 : 16}
              placeholder="Type your answer here…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className={'wm-count' + (inRange ? ' ok' : '')}>
              {wc} words <span>(target {exercise.minWords}–{exercise.maxWords})</span>
            </div>
          </div>
        </div>

        <div className="tcy-nav-row">
          <button className="tcy-btn-gold" onClick={() => setShowModel((v) => !v)}>
            {showModel ? 'Hide model answer' : 'Reveal model answer'}
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="tcy-btn-gray" disabled={idx === 0} onClick={() => goto(idx - 1)}>← Previous</button>
            <button className="tcy-btn-gray" disabled={idx === type.exercises.length - 1} onClick={() => goto(idx + 1)}>Next →</button>
          </div>
        </div>

        {showModel && (
          <div className="wm-compare" style={{ marginTop: 20 }}>
            <div><h4>Your answer</h4><div className="wm-box">{draft.trim() || <em>(nothing written yet)</em>}</div></div>
            <div><h4>Model answer</h4><div className="wm-box model">{exercise.model}</div></div>
          </div>
        )}
      </main>
    </div>
  );
}