import { useState } from 'react';
import { useDrills } from '../../hooks/useDrills.js';
import { useAttempts } from '../../hooks/useAttempt.js';

const STRUCT_KEYWORDS = {
  s1: ['not only', 'but also'],
  s2: ['as well as'],
  s3: ['despite', 'in spite of'],
  s4: ['however', 'nevertheless', 'nonetheless'],
  s5: ['while', 'whereas'],
  s6: ['this '],
  s7: ['furthermore', 'moreover', 'in addition'],
  s8: ['as a result', 'consequently', 'therefore'],
  s9: ['it is'],
  s10: [],
};

function scoreDrill(structId, answer) {
  const ua = (answer || '').trim();
  if (!ua) return false;
  const required = STRUCT_KEYWORDS[structId] || [];
  const lower = ua.toLowerCase();
  const structOk = required.length === 0 ? ua.length > 30 : required.some((w) => lower.includes(w));
  return structOk && ua.length > 20;
}

export default function WritingWorkspace() {
  const { drills: STRUCTURES, loading: structLoading } = useDrills('writing');
  const { attempts, recordAttempt } = useAttempts();
  const bestByStruct = {};
  attempts
    .filter((a) => a.kind === 'writing')
    .forEach((a) => {
      if (!bestByStruct[a.refId] || a.pct > bestByStruct[a.refId].pct) bestByStruct[a.refId] = a;
    });

  const [structIdx, setStructIdx] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [showResult, setShowResult] = useState(false);

  const st = structIdx !== null ? STRUCTURES[structIdx] : null;

  function openStruct(i) {
    setStructIdx(i);
    setAnswers({});
    setChecked({});
    setShowResult(false);
  }

  function goHome() {
    setStructIdx(null);
    setShowResult(false);
  }

  function checkOne(i) {
    const ua = (answers[i] || '').trim();
    if (!ua) return;
    const ok = scoreDrill(st.docId, ua);
    setChecked((prev) => ({ ...prev, [i]: { ok, ua } }));
  }

  function checkAll() {
    setChecked((prev) => {
      const next = { ...prev };
      st.drills.forEach((d, i) => {
        if (next[i]) return;
        const ua = (answers[i] || '').trim();
        next[i] = ua ? { ok: scoreDrill(st.docId, ua), ua } : { ok: false, ua: '' };
      });
      return next;
    });
  }

  function finish() {
    checkAll();
    const finalChecked = { ...checked };
    st.drills.forEach((d, i) => {
      if (!finalChecked[i]) {
        const ua = (answers[i] || '').trim();
        finalChecked[i] = ua ? { ok: scoreDrill(st.docId, ua), ua } : { ok: false, ua: '' };
      }
    });
    const ok = Object.values(finalChecked).filter((c) => c.ok).length;
    const total = st.drills.length;
    const pct = Math.round((ok / total) * 100);
    const band = pct >= 80 ? 'Band 6 Ready' : pct >= 60 ? 'Band 5.5' : 'Needs More Practice';

    recordAttempt({
      kind: 'writing',
      refId: st.docId,
      title: st.name,
      score: ok,
      total,
      pct,
      band,
      sections: [ok],
    }).catch((e) => console.error('saveAttempt failed', e));

    setShowResult(true);
  }

  /* ---------- home ---------- */
  if (!st) {
    if (structLoading) {
      return (
        <div className="dash-wrap">
          <div className="empty-state">Loading writing structures…</div>
        </div>
      );
    }
    if (!STRUCTURES.length) {
      return (
        <div className="dash-wrap">
          <div className="empty-state">
            No writing drills have been published yet. Check back soon, or ask an admin to add some.
          </div>
        </div>
      );
    }
    const doneCount = STRUCTURES.filter((s) => bestByStruct[s.docId]?.pct >= 80).length;
    return (
      <div className="dash-wrap">
        <div className="dash-hero">
          <h1>ELLT Writing — Sentence Structure Drills</h1>
          <p>{STRUCTURES.length} structures · 10 drills each · Band 6 model answers</p>
        </div>
        <div className="info-box">
          <strong>How to use these drills:</strong> combine the given ideas into ONE
          well-structured sentence using the target structure. After typing, click{' '}
          <strong>Check</strong> to see a Band 6 model and what makes it work.
        </div>
        <div className="stats-panel">
          <div className="dash-section-title" style={{ margin: 0, marginBottom: 10 }}>
            Your Progress
          </div>
          <div className="stats-grid">
            {STRUCTURES.map((s) => {
              const best = bestByStruct[s.docId];
              return (
                <div className="stat-box" key={s.docId}>
                  <div className="stat-val" style={{ color: best?.pct >= 80 ? 'var(--green)' : 'var(--gold)' }}>
                    {best ? best.score : 0}/{s.drills.length}
                  </div>
                  <div className="stat-lbl">{s.short.slice(0, 16)}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#8b949e', fontFamily: 'monospace' }}>
            {doneCount}/{STRUCTURES.length} structures at Band 6 ready
          </div>
        </div>
        <div className="struct-grid">
          {STRUCTURES.map((s, i) => {
            const best = bestByStruct[s.docId];
            return (
              <div className="struct-card" key={s.docId} onClick={() => openStruct(i)}>
                <div className="card-num">Structure {i + 1}</div>
                <div className="card-title">{s.name}</div>
                <div className="card-example">{s.example.slice(0, 90)}…</div>
                {best?.pct >= 80 && <div className="card-badge done">{best.score}/10 ✓</div>}
                {best && best.pct < 80 && <div className="card-badge">{best.score}/10</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- result ---------- */
  if (showResult) {
    const ok = Object.values(checked).filter((c) => c.ok).length;
    const total = st.drills.length;
    const pct = Math.round((ok / total) * 100);
    const band = pct >= 80 ? 'Band 6 Ready' : pct >= 60 ? 'Band 5.5 — Almost there' : 'Needs More Practice';
    const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--gold)' : 'var(--red)';
    return (
      <div className="result-page" style={{ display: 'block' }}>
        <div className="result-inner">
          <div className="result-hero">
            <div style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
              Results: {st.name.toUpperCase()}
            </div>
            <div className="result-score">
              {ok}
              <span style={{ fontSize: 28, color: '#444' }}>/{total}</span>
            </div>
            <div className="result-label">
              {pct}% —{' '}
              {pct >= 80
                ? 'Excellent control of this structure!'
                : pct >= 60
                  ? 'Good — keep practising the tricky drills.'
                  : 'Review the model answers and try again.'}
            </div>
            <div
              className="result-band"
              style={{
                color,
                background: `rgba(${pct >= 80 ? '63,185,80' : pct >= 60 ? '232,184,75' : '248,81,73'},.1)`,
                border: `1px solid rgba(${pct >= 80 ? '63,185,80' : pct >= 60 ? '232,184,75' : '248,81,73'},.3)`,
              }}
            >
              {band}
            </div>
          </div>
          <div className="tips-box">
            <h3>📝 Key Reminders for {st.name}</h3>
            <div className="tip-item">{st.rule}</div>
            <div className="tip-item">
              Repeat any drill where you forgot the structure — the goal is automatic, fluent use.
            </div>
          </div>
          <div className="res-btn-row">
            <button
              className="btn btn-gold"
              onClick={() => {
                setAnswers({});
                setChecked({});
                setShowResult(false);
              }}
            >
              🔄 Try Again
            </button>
            <button className="btn btn-out" onClick={goHome}>
              ← Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- drill page ---------- */
  const doneCount = Object.keys(checked).length;
  const okCount = Object.values(checked).filter((c) => c.ok).length;

  return (
    <div className="drill-page" style={{ display: 'block' }}>
      <div className="drill-bar">
        <button className="back-btn" onClick={goHome}>
          ← Back
        </button>
        <div className="drill-title-bar">
          Structure {structIdx + 1}: {st.name}
        </div>
        <div className="prog-text">
          {doneCount}/{st.drills.length} checked · {okCount} correct
        </div>
      </div>
      <div className="drill-content">
        <div className="struct-header">
          <div className="struct-name">{st.name}</div>
          <div className="struct-rule">{st.rule}</div>
          <div className="struct-formula">{st.formula}</div>
          <br />
          <div className="example-box">
            <strong style={{ color: 'var(--blue)' }}>Example:</strong> {st.example}
          </div>
        </div>

        {st.drills.map((d, i) => {
          const ck = checked[i];
          return (
            <div className={'drill-card' + (ck ? (ck.ok ? ' correct' : ' wrong') : '')} key={i}>
              <div className="drill-num">
                Drill {i + 1} of {st.drills.length}
              </div>
              <div className="drill-prompt">
                <span className="prompt-key">Combine:</span> {d.prompt}
              </div>
              <div className="drill-instruction">{d.instruction}</div>
              <textarea
                className={'answer-input' + (ck ? (ck.ok ? ' ok' : ' bad') : '')}
                placeholder="Type your sentence here…"
                rows={2}
                disabled={!!ck}
                value={answers[i] ?? ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
              />
              <div className="btn-row">
                <button className="btn btn-gold" disabled={!!ck} onClick={() => checkOne(i)}>
                  Check
                </button>
              </div>
              {ck && (
                <div className={'feedback show ' + (ck.ok ? 'ok' : 'bad')}>
                  <strong style={{ color: ck.ok ? 'var(--green)' : 'var(--red)' }}>
                    {ck.ok ? '✓ Good structure!' : '✗ Check the model answer'}
                  </strong>
                  <div className="model-answer">Model: {d.model}</div>
                  <div className="why">{d.why}</div>
                  <div className="keywords">Key: {d.keywords}</div>
                </div>
              )}
            </div>
          );
        })}

        <div className="check-all-row">
          <button className="btn btn-gold" onClick={checkAll}>
            Check All Remaining
          </button>
          <button className="btn btn-out" onClick={finish}>
            See Results
          </button>
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
