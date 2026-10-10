import { useEffect, useMemo, useRef, useState } from "react";
import { WRITING_MOCKS, ESSAY_LABEL } from "../../data/writingMocks.js";
import { useAttempts } from "../../hooks/useAttempt.js";
import { useAuth } from "../../App.jsx";
import { useProfile } from "../../hooks/useProfile.js";
// import './writingMock.css';

/*
  Writing mock   same TCY flow as the reading/listening mocks:
  list -> confirm -> welcome -> Section 1 (summary) -> Section 2 (essay)
  -> end confirm -> submitting -> result.

  Writing can't be marked automatically the way multiple choice can, so the
  result screen runs honest, rule-based AUTO-CHECKS (length, own words,
  paragraphing, linking words, essay-type language…) and shows a model
  answer next to the student's text for self-review.
*/

const TOTAL_SECONDS = 3600; // 60 minutes
const SECTION_NAMES = ["Summarise a Text", "Essay"];

const CONNECTORS = [
  "however",
  "moreover",
  "furthermore",
  "in addition",
  "therefore",
  "consequently",
  "as a result",
  "nevertheless",
  "nonetheless",
  "whereas",
  "while",
  "despite",
  "in spite of",
  "for example",
  "for instance",
  "on the other hand",
  "in contrast",
  "by contrast",
  "overall",
  "in conclusion",
  "firstly",
  "secondly",
  "not only",
  "as well as",
  "admittedly",
  "on the one hand",
];

function fmt(s) {
  const m = Math.floor(Math.max(s, 0) / 60);
  const sec = Math.max(s, 0) % 60;
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

const words = (t) => (t || "").trim().match(/\S+/g) || [];
const wordCount = (t) => words(t).length;
const norm = (t) =>
  (t || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
const paragraphs = (t) =>
  (t || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

/** true if the answer copies a run of 8+ consecutive words from the source */
function copiesSource(source, answer, run = 8) {
  const s = norm(source);
  const a = norm(answer);
  if (a.length < run) return false;
  const grams = new Set();
  for (let i = 0; i + run <= s.length; i++)
    grams.add(s.slice(i, i + run).join(" "));
  for (let i = 0; i + run <= a.length; i++)
    if (grams.has(a.slice(i, i + run).join(" "))) return true;
  return false;
}

function summaryChecks(s1, text) {
  const wc = wordCount(text);
  const lower = (text || "").toLowerCase();
  const hits = s1.keyTerms.filter((k) => lower.includes(k)).length;
  return [
    {
      label: `Length: ${s1.minWords}–${s1.maxWords} words`,
      ok: wc >= s1.minWords && wc <= s1.maxWords,
      detail: `${wc} words`,
    },
    {
      label: "Own words (no 8-word run copied from the text)",
      ok: wc > 0 && !copiesSource(s1.text, text),
      detail: "",
    },
    {
      label: "One focused paragraph",
      ok: paragraphs(text).length === 1,
      detail: "",
    },
    {
      label: "Covers the main idea (uses at least 2 key terms)",
      ok: hits >= 2,
      detail: `${hits} key terms found`,
    },
  ];
}

function essayChecks(s2, text) {
  const wc = wordCount(text);
  const lower = (text || "").toLowerCase();
  const paras = paragraphs(text);
  const used = CONNECTORS.filter((c) => lower.includes(c));
  const last = (paras[paras.length - 1] || "").toLowerCase();

  const typeCheck =
    s2.essayType === "advdis"
      ? {
          label: "Discusses BOTH advantages and disadvantages",
          ok:
            /advantage|benefit|positive|upside/.test(lower) &&
            /disadvantage|drawback|downside|negative|problem/.test(lower),
        }
      : {
          label: "States a clear position (agree / disagree / opinion)",
          ok: /\b(i (strongly |firmly |partly |fully |completely )?(agree|disagree|believe|think|feel)|in my (opinion|view)|to (a large|some) extent)\b/.test(
            lower,
          ),
        };

  return [
    {
      label: `Length: ${s2.minWords}–${s2.maxWords} words`,
      ok: wc >= s2.minWords && wc <= s2.maxWords,
      detail: `${wc} words`,
    },
    {
      label: "Clear paragraphing (at least 4 paragraphs)",
      ok: paras.length >= 4,
      detail: `${paras.length} paragraph${paras.length === 1 ? "" : "s"}`,
    },
    {
      label: "Linking words (at least 4 different ones)",
      ok: used.length >= 4,
      detail: `${used.length} found`,
    },
    typeCheck,
    {
      label: "Has a conclusion",
      ok: /conclusion|overall|to sum up|in summary|to conclude/.test(last),
      detail: "",
    },
  ];
}

export default function WritingMock() {
  const { user } = useAuth();
  const { displayName } = useProfile();
  const { attempts, recordAttempt } = useAttempts();

  const bestByMock = useMemo(() => {
    const out = {};
    attempts
      .filter(
        (a) => a.kind === "writing" && String(a.refId).startsWith("mock-"),
      )
      .forEach((a) => {
        if (!out[a.refId] || a.pct > out[a.refId].pct) out[a.refId] = a;
      });
    return out;
  }, [attempts]);

  const [phase, setPhase] = useState("list");
  const [mock, setMock] = useState(null);
  const [secIdx, setSecIdx] = useState(0);
  const [drafts, setDrafts] = useState({ 0: "", 1: "" });
  const [left, setLeft] = useState(TOTAL_SECONDS);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);
  const draftsRef = useRef(drafts);
  draftsRef.current = drafts;

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!started || !["test", "endConfirm"].includes(phase)) return;
    timerRef.current = setInterval(() => {
      setLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          submit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, phase]);

  function confirmTake() {
    setSecIdx(0);
    setDrafts({ 0: "", 1: "" });
    setLeft(TOTAL_SECONDS);
    setStarted(false);
    setResult(null);
    setPhase("welcome");
  }

  function submit() {
    setPhase("submitting");
    setTimeout(() => {
      const d = draftsRef.current;
      const c1 = summaryChecks(mock.s1, d[0]);
      const c2 = essayChecks(mock.s2, d[1]);
      const score =
        c1.filter((c) => c.ok).length + c2.filter((c) => c.ok).length;
      const total = c1.length + c2.length;
      const pct = Math.round((score / total) * 100);
      const band =
        pct >= 85
          ? "Strong   on track for Level 6+"
          : pct >= 65
            ? "Developing   close to Level 5.5–6"
            : "Needs more practice";
      setResult({ c1, c2, score, total, pct, band, d });
      recordAttempt({
        kind: "writing",
        refId: `mock-${mock.id}`,
        title: `Writing Mock ${mock.id}`,
        score,
        total,
        pct,
        band,
        sections: [
          c1.filter((c) => c.ok).length,
          c2.filter((c) => c.ok).length,
        ],
      }).catch((e) => console.error("saveAttempt failed", e));
      setPhase("result");
    }, 1300);
  }

  function backToList() {
    clearInterval(timerRef.current);
    setPhase("list");
    setMock(null);
    setResult(null);
    setStarted(false);
  }

  const heading = (
    <div className="tcy-page-head">
      <h1>Oxford ELLT Writing</h1>
      <span className="who">Welcome, {displayName}</span>
    </div>
  );

  /* ---------- LIST ---------- */
  if (phase === "list" || phase === "confirm") {
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        {heading}
        <div className="tcy-cards">
          {WRITING_MOCKS.map((m) => {
            const best = bestByMock[`mock-${m.id}`];
            return (
              <div className="tcy-card" key={m.id}>
                <div className="tcy-card-top">
                  <div className="tcy-card-title">
                    <span className="ic">✍️</span>Oxford ELLT Writing - {m.id}
                  </div>
                  <button
                    className="tcy-btn-gold"
                    onClick={() => {
                      setMock(m);
                      setPhase("confirm");
                    }}
                  >
                    Take Test
                  </button>
                </div>
                <div className="tcy-card-desc">
                  <span className="lbl">Description</span>
                  <div>- Section 1: Summarise a {m.s1.textType} text</div>
                  <div>- Section 2: {ESSAY_LABEL[m.s2.essayType]}</div>
                  <div>- 🎯 {m.focus}</div>
                </div>
                <div className="tcy-card-time">
                  <span className="lbl">Test time</span>
                  {TOTAL_SECONDS / 60} minutes
                </div>
                {best && (
                  <div className="tcy-card-best">
                    Best: {best.score}/{best.total} checks · {best.pct}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {phase === "confirm" && (
          <div className="tcy-overlay">
            <div className="tcy-modal">
              <div className="q-ic">?</div>
              <h2>Are you sure?</h2>
              <p>
                You will need <b>{TOTAL_SECONDS / 60} minutes</b> to take this
                test.
              </p>
              <div className="tcy-modal-btns">
                <button className="tcy-btn-gray" onClick={backToList}>
                  Return to Dashboard
                </button>
                <button className="tcy-btn-gold" onClick={confirmTake}>
                  Take Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const titleBar = `Oxford ELLT Writing - ${mock?.id ?? ""}`;

  if (phase === "welcome") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-center">
          <h2>Welcome to the Oxford ELLT Writing Test</h2>
          <p>
            This test has <b>two sections</b>:
          </p>
          <p>
            <b>Section 1</b> read a text and write a short summary in your own
            words.
            <br />
            <b>Section 2</b> write an essay in response to the question.
          </p>
          <p>
            You can move between the sections at any time. Click{" "}
            <b>Start Test</b> when you are ready.
          </p>
        </div>
        <div className="tcy-shell-cta">
          <button
            className="tcy-btn-gold"
            onClick={() => {
              setStarted(true);
              setPhase("test");
            }}
          >
            Start Test
          </button>
        </div>
      </Shell>
    );
  }

  if (phase === "test") {
    const task = secIdx === 0 ? mock.s1 : mock.s2;
    const wc = wordCount(drafts[secIdx]);
    const inRange = wc >= task.minWords && wc <= task.maxWords;
    return (
      <Shell
        title={titleBar}
        onBack={backToList}
        timer={fmt(left)}
        showTimer={started}
      >
        <div className="tcy-sec-label">
          Section {secIdx + 1}/2 {SECTION_NAMES[secIdx]}
        </div>
        <div className="wm-split">
          <div className="wm-left">
            {secIdx === 0 ? (
              <>
                <span className="wm-badge">{mock.s1.textType} text</span>
                <h3 className="wm-title">{mock.s1.title}</h3>
                <p className="wm-text">{mock.s1.text}</p>
              </>
            ) : (
              <>
                <span className="wm-badge">
                  {ESSAY_LABEL[mock.s2.essayType]}
                </span>
                {mock.s2.prompt.split("\n\n").map((p, i) => (
                  <p className="wm-text" key={i}>
                    {p}
                  </p>
                ))}
              </>
            )}
          </div>
          <div className="wm-right">
            <div className="tcy-qtext">
              {secIdx === 0 ? (
                <>
                  Summarise the text in{" "}
                  <b>
                    {task.minWords}–{task.maxWords} words
                  </b>
                  , using your own words.
                </>
              ) : (
                <>
                  Write an essay of{" "}
                  <b>
                    {task.minWords}–{task.maxWords} words
                  </b>
                  .
                </>
              )}
            </div>
            <textarea
              className="wm-area"
              rows={secIdx === 0 ? 9 : 16}
              placeholder="Type your answer here…"
              value={drafts[secIdx]}
              onChange={(e) =>
                setDrafts((d) => ({ ...d, [secIdx]: e.target.value }))
              }
              spellCheck
            />
            <div className={"wm-count" + (inRange ? " ok" : "")}>
              {wc} words{" "}
              <span>
                (target {task.minWords}–{task.maxWords})
              </span>
            </div>
          </div>
        </div>
        <div className="tcy-nav-row">
          <button
            className="tcy-btn-gray"
            disabled={secIdx === 0}
            onClick={() => setSecIdx(0)}
          >
            ← Section 1
          </button>
          {secIdx === 0 ? (
            <button className="tcy-btn-gold" onClick={() => setSecIdx(1)}>
              Section 2 →
            </button>
          ) : (
            <button
              className="tcy-btn-gold"
              onClick={() => setPhase("endConfirm")}
            >
              Submit Test →
            </button>
          )}
        </div>
      </Shell>
    );
  }

  if (phase === "endConfirm") {
    return (
      <Shell
        title={titleBar}
        onBack={backToList}
        timer={fmt(left)}
        showTimer={started}
      >
        <div className="tcy-overlay">
          <div className="tcy-modal">
            <div className="q-ic">?</div>
            <h2>Are you sure?</h2>
            <p>Have you finished both sections?</p>
            <div className="tcy-modal-btns">
              <button className="tcy-btn-gray" onClick={() => setPhase("test")}>
                Return
              </button>
              <button className="tcy-btn-gold" onClick={submit}>
                End Test
              </button>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (phase === "submitting") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-ended">
          <div className="tcy-submitting-dots">
            <span />
            <span />
            <span />
          </div>
          <div>Submitting Your Test…</div>
        </div>
      </Shell>
    );
  }

  if (phase === "result" && result) {
    const color = result.pct >= 65 ? "#1f8a3d" : "#c9781e";
    const bg =
      result.pct >= 65 ? "rgba(31,138,61,.12)" : "rgba(245,166,35,.15)";
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-result-card" style={{ maxWidth: 980 }}>
          <div className="tcy-result-score">
            {result.score}
            <span style={{ fontSize: 26, color: "#aaa" }}>/{result.total}</span>
          </div>
          <div className="tcy-result-sub">
            auto-checks passed · {result.pct}%
          </div>
          <div className="tcy-result-band" style={{ color, background: bg }}>
            {result.band}
          </div>
          <p className="wm-note">
            These checks cover length, structure, linking words and essay-type
            language. They cannot judge grammar or ideas compare your text with
            the model answer below.
          </p>

          {[0, 1].map((i) => {
            const checks = i === 0 ? result.c1 : result.c2;
            const task = i === 0 ? mock.s1 : mock.s2;
            return (
              <div className="wm-result-block" key={i}>
                <h3>
                  Section {i + 1} {SECTION_NAMES[i]}
                </h3>
                <ul className="wm-checks">
                  {checks.map((c, k) => (
                    <li key={k} className={c.ok ? "ok" : "bad"}>
                      <span>{c.ok ? "✓" : "✗"}</span> {c.label}
                      {c.detail && <em> {c.detail}</em>}
                    </li>
                  ))}
                </ul>
                <div className="wm-compare">
                  <div>
                    <h4>Your answer</h4>
                    <div className="wm-box">
                      {result.d[i].trim() || <em>(nothing written)</em>}
                    </div>
                  </div>
                  <div>
                    <h4>Model answer</h4>
                    <div className="wm-box model">{task.model}</div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="tcy-result-btns">
            <button className="tcy-btn-gold" onClick={confirmTake}>
              🔄 Retry
            </button>
            {mock.id < WRITING_MOCKS.length && (
              <button
                className="tcy-btn-gold"
                onClick={() => {
                  setMock(WRITING_MOCKS.find((m) => m.id === mock.id + 1));
                  confirmTake();
                }}
              >
                Next Mock →
              </button>
            )}
            <button className="tcy-btn-gray" onClick={backToList}>
              ← All Mocks
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return null;
}

function Shell({ title, onBack, timer, showTimer = true, children }) {
  return (
    <div className="tcy-shell">
      <div className="tcy-topbar">
        <div className="tcy-topbar-left">
          <button className="tcy-back" onClick={onBack}>
            ←
          </button>
          <div className="tcy-logo">
            <span className="t">T</span>
            <span className="c">C</span>
            <span className="y">Y</span>
            <small>online</small>
          </div>
        </div>
        {timer && showTimer && <div className="tcy-topbar-timer">{timer}</div>}
        <button className="tcy-hamburger">☰</button>
      </div>
      <div className="tcy-titlebar">{title}</div>
      <div className="tcy-shell-body">
        <div className="tcy-shell-card">
          <div className="tcy-avatar">👤</div>
          {children}
        </div>
      </div>
    </div>
  );
}
