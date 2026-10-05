import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App.jsx";
import { useProfile } from "../../hooks/useProfile.js";
import { useAttempts } from "../../hooks/useAttempt.js";
import { useTests } from "../../hooks/useTests.js";
import { SKILLS, bestAttempts, testProgress } from "../tests/testProgress.js";
import { READING_DRILL_TYPES } from "../../data/readingDrillTypes.js";
import { LISTENING_DRILL_TYPES } from "../../data/listeningDrillTypes.js";
import { WRITING_DRILL_TYPES } from "../../data/writingDrillTypes.js";
import "../tests/tests.css";

const DRILL_TYPES = {
  reading: ["Paragraph ordering", "Sentence fill", "Vocabulary in context", "Gap fill (one word)", "True / False / Not Given", "Multiple choice"],
  listening: ["Speaker selection", "Multiple choice", "Gap fill (≤3 words)", "Table fill (≤3 words)"],
  writing: ["Summary drill", "Essay drill"],
};

const DRILL_ROUTE = {
  reading: "/practice/reading",
  listening: "/practice/listening",
  writing: "/practice/writing",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { displayName } = useProfile();
  const { attempts } = useAttempts();
  const { tests, loading } = useTests();

  const best = useMemo(() => bestAttempts(attempts), [attempts]);
  const drillCount = {
    reading: READING_DRILL_TYPES.length,
    listening: LISTENING_DRILL_TYPES.length,
    writing: WRITING_DRILL_TYPES.length,
  };
  const name = displayName || user?.displayName || "there";

  return (
    <div className="tb-wrap">
      <header className="tb-hero">
        <h1>Welcome back, {name}</h1>
        <p>Pick a full test to sit Reading, Listening and Writing, or train one skill at a time.</p>
      </header>

      <section className="tb-section">
        <div className="tb-section-head">
          <h2>Full tests</h2>
          <span>Reading · Listening · Writing</span>
        </div>
        {loading && <div className="tb-empty">Loading tests…</div>}
        {!loading && tests.length === 0 && <div className="tb-empty">No full tests yet. An admin can create one in Admin → Full Tests.</div>}
        <div className="tb-grid">
          {tests.map((t) => {
            const p = testProgress(t, best);
            const toBand = (pct) => (Math.round((pct / 100) * 9 * 10) / 10).toFixed(1);
            const skillRows = [
              { key: "listening", icon: "🎧" },
              { key: "reading", icon: "📖" },
              { key: "writing", icon: "✏️" },
            ];
            const attemptedPcts = skillRows.map((c) => p[c.key].attempt?.pct).filter((v) => v != null);
            const overallBand = attemptedPcts.length ? toBand(attemptedPcts.reduce((s, v) => s + v, 0) / attemptedPcts.length) : null;
            return (
              <button key={t.docId || t.id} className="jc-test-card" onClick={() => navigate(`/tests/${t.id}`)}>
                <div className="jc-test-head">
                  <span className="jc-test-name">Test {t.id}</span>
                  {overallBand !== null && <span className="jc-badge">{overallBand}</span>}
                </div>
                <div className="jc-skill-rows">
                  {skillRows.map((c) => {
                    const s = SKILLS.find((sk) => sk.key === c.key);
                    const st = p[c.key];
                    const band = st.attempt ? toBand(st.attempt.pct) : null;
                    return (
                      <div className={`jc-skill-row jc-${c.key}`} key={c.key}>
                        <span className="jc-skill-icon">{c.icon}</span>
                        <span className="jc-skill-label">{s.label}</span>
                        {band !== null ? <span className="jc-skill-score">{band}</span> : <span className="jc-skill-score jc-empty">—</span>}
                      </div>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-section-head">
          <h2>Skill drills</h2>
          <span>Train one question type at a time</span>
        </div>
        <div className="tb-skill-grid">
          {SKILLS.map((s) => (
            <button key={s.key} className={`tb-skill-block ${s.letter.toLowerCase()}`} onClick={() => navigate(DRILL_ROUTE[s.key])}>
              <div className="tb-skill-top">
                <span className={`tb-letter ${s.letter.toLowerCase()} done`}>{s.letter}</span>
                <div>
                  <h3>{s.label} drills</h3>
                  <small>{drillCount[s.key]} question types</small>
                </div>
              </div>
              <div className="tb-chips">
                {DRILL_TYPES[s.key].map((t) => <span className="tb-chip" key={t}>{t}</span>)}
              </div>
            </button>
          ))}
          <button className="tb-skill-block m" onClick={() => navigate("/mistakes")}>
            <div className="tb-skill-top">
              <span className="tb-letter off" style={{ background: "#e8ecf6", color: "#1b2a5a" }}>✓</span>
              <div><h3>Mistake review</h3><small>Questions you got wrong in tests</small></div>
            </div>
            <div className="tb-chips"><span className="tb-chip">Retry your weak spots</span></div>
          </button>
        </div>
      </section>
    </div>
  );
}