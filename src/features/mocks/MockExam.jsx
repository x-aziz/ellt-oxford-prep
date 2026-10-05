import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useMocks } from "../../hooks/useMocks.js";
import { useAttempts } from "../../hooks/useAttempt.js";
import { useAuth } from "../../App.jsx";
import { useProfile } from "../../hooks/useProfile.js";
import { recordMistakes } from "../../services/firestore.js";
import { isCorrect } from "../../components/QuestionRenderer.jsx";
import { extendReadingMock } from "../../data/readingExtraQuestions.js";

const GAP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/*
  Mirrors the real Oxford-ELLT / TCY test-taking flow:
  list -> confirm -> welcome -> [volume check, listening only] -> test ->
  review checkpoint -> end confirm -> "test has ended" -> submitting -> result.

  LISTENING
  • There is NO "1 minute to read the questions" stage (the real exam has none).
    The questions are on screen the whole time.
  • The moment the student clicks "Start Section 1", the 26-minute timer AND
    the Section 1 recording start together.
  • Section 1 plays once, Sections 2–3 play twice. When the recording finishes
    the test advances to the next section automatically (after Section 3 it
    goes to the review screen).
  • Audio uses the browser's text-to-speech, split into short chunks (long
    utterances are silently cut off by Chrome), with a different voice/pitch
    per speaker.

  READING
  • Section 1 = drag-to-order only. Section 2 = sentence fill. Section 3 = 16
    comprehension questions (4 vocabulary + 12 others).
*/

const CONFIG = {
  reading: {
    label: "Reading",
    mainSeconds: 2400,
    hasVolumeCheck: false,
    sectionNames: ["Paragraph Ordering", "Sentence Fill", "Reading Comprehension"],
    tfLabels: ["True", "False", "Not Given"],
  },
  listening: {
    label: "Listening",
    mainSeconds: 1560,
    hasVolumeCheck: true,
    sectionNames: ["Monologue (heard once)", "Interview (heard twice)", "Analysis (heard twice)"],
    tfLabels: ["True", "False", "Not Mentioned"],
  },
};

function fmt(s) {
  const m = Math.floor(Math.max(s, 0) / 60);
  const sec = Math.max(s, 0) % 60;
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

function hashId(str) {
  let h = 0;
  for (let i = 0; i < (str || "").length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return 1000000 + (h % 9000000);
}

function getSec(m, i) {
  return i === 0 ? m.s1 : i === 1 ? m.s2 : m.s3;
}

function listeningQNumber(mock, secIdx, qi) {
  let offset = 0;
  for (let i = 0; i < secIdx; i++) offset += getSec(mock, i).qs.length;
  return offset + qi + 1;
}

function makeMistake(kind, mock, si, qi, q, yourAnswer) {
  return {
    id: `${kind}-${mock.id}-s${si + 1}-q${qi}`,
    skill: q.type,
    source: kind,
    sectionLabel: `Section ${si + 1}`,
    mockTitle: mock.title,
    text: q.text,
    options: q.opts || null,
    yourAnswer: yourAnswer ?? null,
    correctAnswer: q.ans,
    why: q.why || null,
    ev: q.ev || null,
    trap: q.trap || null,
  };
}

/** Reading Section 3: one comprehension question per step. */
function buildReadingSteps(mock, secIdx) {
  if (secIdx !== 2) return [];
  return getSec(mock, 2).qs.map((q, qi) => ({ kind: "q", item: q, key: `2_q_${qi}` }));
}

/* ------------------------------------------------------------------ */
/*  Listening audio helpers (text-to-speech)                           */
/* ------------------------------------------------------------------ */

/** Splits a script into short speakable chunks and tags each with a speaker
 *  index (so every speaker gets a different voice / pitch). */
function buildChunks(script) {
  const speakers = [];
  const out = [];
  (script || "").split(/\n\s*\n/).forEach((para) => {
    const m = para.match(/^\s*([A-Z][A-Za-z.\s]{1,24}):\s*([\s\S]*)$/);
    const who = m ? m[1].trim() : "narrator";
    const body = m ? m[2] : para;
    let idx = speakers.indexOf(who);
    if (idx === -1) {
      speakers.push(who);
      idx = speakers.length - 1;
    }
    const sentences = body.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/);
    let buf = "";
    sentences.forEach((s) => {
      if (buf && (buf + " " + s).length > 170) {
        out.push({ text: buf.trim(), speaker: idx });
        buf = s;
      } else {
        buf = buf ? buf + " " + s : s;
      }
    });
    if (buf.trim()) out.push({ text: buf.trim(), speaker: idx });
  });
  return out;
}

function englishVoices() {
  const all = window.speechSynthesis.getVoices() || [];
  const en = all.filter((v) => /^en/i.test(v.lang));
  // prefer British voices first, like the real test
  return en.sort((a, b) => Number(/en-GB/i.test(b.lang)) - Number(/en-GB/i.test(a.lang)));
}

const PITCHES = [1, 0.82, 1.18];



export default function MockExam({ kind, mockId = null, exitTo = null }) {
  const cfg = CONFIG[kind];
  const navigate = useNavigate();
  const { user } = useAuth();
  const { displayName } = useProfile();
  const { mocks: rawMocks, loading: mocksLoading } = useMocks(kind);
  const { attempts, recordAttempt } = useAttempts();

  // Reading mocks get their Section 3 topped up to 16 questions.
  const mocks = useMemo(
    () => (kind === "reading" ? rawMocks.map(extendReadingMock) : rawMocks),
    [rawMocks, kind],
  );

  const bestByMock = useMemo(() => {
    const out = {};
    attempts
      .filter((a) => a.kind === kind)
      .forEach((a) => {
        if (!out[a.refId] || a.pct > out[a.refId].pct) out[a.refId] = a;
      });
    return out;
  }, [attempts, kind]);

  const [phase, setPhase] = useState("list");
  const [mock, setMock] = useState(null);
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [UA, setUA] = useState({});
  const [mainLeft, setMainLeft] = useState(cfg.mainSeconds);
  const [started, setStarted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volChecked, setVolChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [paraOrder, setParaOrder] = useState(null);
  const [dragLabel, setDragLabel] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [playRound, setPlayRound] = useState(0);
  const [audioUnsupported, setAudioUnsupported] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [audioNonce, setAudioNonce] = useState(0);

  const mainRef = useRef(null);
  const utterRef = useRef(null); // keeps the active utterance alive (Chrome garbage-collects it otherwise)

  /* main countdown */
  useEffect(() => {
    clearInterval(mainRef.current);
    if (!started || ["ended", "submitting", "result"].includes(phase)) return;
    mainRef.current = setInterval(() => {
      setMainLeft((t) => {
        if (t <= 1) {
          clearInterval(mainRef.current);
          forceSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(mainRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, phase]);

  /* LISTENING AUDIO — plays the section, then auto-advances. */
  useEffect(() => {
    if (phase !== "test" || kind !== "listening" || !mock) return;
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setAudioUnsupported(true);
      setShowTranscript(true);
      return;
    }
    const synth = window.speechSynthesis;
    setAudioUnsupported(false);
    setNeedsGesture(false);

    const sec = getSec(mock, secIdx);
    const chunks = buildChunks(sec.script);
    const rounds = secIdx === 0 ? 1 : 2;
    let cancelled = false;
    let round = 0;
    let i = 0;
    let gotStart = false;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    function finish() {
      setSpeaking(false);
      // short beat after the recording, then straight on to the next section
      later(() => {
        if (!cancelled) listeningNext();
      }, 1200);
    }

    function speakNext() {
      if (cancelled) return;
      if (i >= chunks.length) {
        round += 1;
        setPlayRound(round);
        if (round < rounds) {
          i = 0;
          later(speakNext, 4000); // pause between the two plays
        } else {
          finish();
        }
        return;
      }
      const c = chunks[i++];
      const u = new SpeechSynthesisUtterance(c.text);
      const voices = englishVoices();
      if (voices.length) u.voice = voices[c.speaker % voices.length];
      u.lang = u.voice?.lang || "en-GB";
      u.rate = 0.95;
      u.pitch = PITCHES[c.speaker % PITCHES.length];
      u.onstart = () => {
        gotStart = true;
      };
      u.onend = () => speakNext();
      u.onerror = (e) => {
        if (cancelled) return;
        if (e.error === "not-allowed") {
          setNeedsGesture(true);
          setSpeaking(false);
          return;
        }
        speakNext(); // skip a chunk that failed, keep going
      };
      utterRef.current = u;
      synth.speak(u);
    }

    synth.cancel();
    setPlayRound(0);
    setSpeaking(true);
    // Chrome needs a moment after cancel() and for the voice list to load.
    later(speakNext, 400);
    // If nothing has started after 5s the browser blocked autoplay.
    later(() => {
      if (!gotStart && !cancelled) {
        setNeedsGesture(true);
        setSpeaking(false);
      }
    }, 5000);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      synth.cancel();
      setSpeaking(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secIdx, kind, mock, audioNonce]);

  useEffect(
    () => () => {
      clearInterval(mainRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    },
    [],
  );
const autoStarted = useRef(false);
useEffect(() => {
  if (mockId == null || autoStarted.current || mocksLoading) return;
  const m = mocks.find((x) => x.id === mockId);
  if (!m) return;
  autoStarted.current = true;
  setMock(m);
  confirmTake();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [mockId, mocks, mocksLoading]);
  function openConfirm(m) {
    setMock(m);
    setPhase("confirm");
  }
  function cancelConfirm() {
    setMock(null);
    setPhase("list");
  }
  function confirmTake() {
    setSecIdx(0);
    setQIdx(-1);
    setUA({});
    setResult(null);
    setMainLeft(cfg.mainSeconds);
    setStarted(false);
    setVolChecked(false);
    setShowTranscript(false);
    setParaOrder(null);
    setDragLabel(null);
    setPlayRound(0);
    setNeedsGesture(false);
    setPhase("welcome");
  }
  function startTest() {
    if (cfg.hasVolumeCheck) {
      setPhase("volume");
    } else {
      setStarted(true);
      setPhase("test");
    }
  }
  /** Starts the 26-minute timer AND the Section 1 recording together. */
  function volumeContinue() {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setStarted(true);
    setPhase("test");
  }
  function playVolumeTest() {
    setVolChecked(true);
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(
      "This is an audio check. If you can hear my voice clearly, you are ready to start the test.",
    );
    u.lang = "en-GB";
    u.rate = 0.95;
    utterRef.current = u;
    synth.speak(u);
  }
  function setAnswer(key, value) {
    setUA((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (secIdx === 0) {
      setSecIdx(1);
      setQIdx(0);
      return;
    }
    if (secIdx === 1) {
      setSecIdx(2);
      setQIdx(0);
      return;
    }
    const qs = buildReadingSteps(mock, 2);
    if (qIdx < qs.length - 1) setQIdx(qIdx + 1);
    else setPhase("checkpoint");
  }
  function prevStep() {
    if (secIdx === 0) return;
    if (secIdx === 1) {
      setSecIdx(0);
      setQIdx(-1);
      return;
    }
    if (qIdx > 0) setQIdx(qIdx - 1);
    else {
      setSecIdx(1);
      setQIdx(0);
    }
  }
  function listeningNext() {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    if (secIdx < 2) {
      setSecIdx(secIdx + 1);
      setShowTranscript(false);
    } else {
      setPhase("checkpoint");
    }
  }

  function reviewFromCheckpoint() {
    setQIdx(kind === "reading" ? Math.max(buildReadingSteps(mock, 2).length - 1, 0) : 0);
    if (kind === "reading") setSecIdx(2);
    setPhase("test");
  }

  function forceSubmit() {
    setPhase("submitting");
    setTimeout(() => {
      doSubmit();
      setPhase("result");
    }, 1300);
  }
  function finishFromEnded() {
    forceSubmit();
  }

  function doSubmit() {
    if (!mock) return;
    const secScores = [0, 0, 0];
    const secTotals = [0, 0, 0];
    let score = 0;
    let totalQs = 0;
    const wrongMistakes = [];

    if (kind === "reading") {
      getSec(mock, 0).paras.forEach((p) => {
        totalQs++;
        secTotals[0]++;
        if (parseInt(UA["ord_" + p.l], 10) === p.pos) {
          score++;
          secScores[0]++;
        }
      });
      getSec(mock, 1).qs.forEach((q, qi) => {
        totalQs++;
        secTotals[1]++;
        if (UA["fill_" + q.n] === q.ans) {
          score++;
          secScores[1]++;
        } else wrongMistakes.push(makeMistake("reading", mock, 1, qi, q, UA["fill_" + q.n]));
      });
      getSec(mock, 2).qs.forEach((q, qi) => {
        totalQs++;
        secTotals[2]++;
        const key = `2_q_${qi}`;
        if (UA[key] === q.ans) {
          score++;
          secScores[2]++;
        } else wrongMistakes.push(makeMistake("reading", mock, 2, qi, q, UA[key]));
      });
    } else {
      [0, 1, 2].forEach((si) => {
        getSec(mock, si).qs.forEach((q, qi) => {
          totalQs++;
          secTotals[si]++;
          const key = `${si}_q_${qi}`;
          if (isCorrect(q, UA[key])) {
            score++;
            secScores[si]++;
          } else wrongMistakes.push(makeMistake("listening", mock, si, qi, q, UA[key]));
        });
      });
    }

    const pct = Math.round((score / totalQs) * 100);
    const band =
      pct >= 87 ? "Level 7" : pct >= 75 ? "Level 6.5" : pct >= 62 ? "Level 6" : pct >= 50 ? "Level 5.5" : "Below 5.5";

    setResult({ score, total: totalQs, pct, band, secScores, secTotals });

    recordAttempt({
      kind,
      refId: mock.id,
      title: mock.title,
      score,
      total: totalQs,
      pct,
      band,
      sections: secScores,
    }).catch((e) => console.error("saveAttempt failed", e));

    if (user && wrongMistakes.length) {
      recordMistakes(user.uid, wrongMistakes).catch((e) => console.error("recordMistakes failed", e));
    }
  }

function backToList() {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  if (exitTo) { navigate(exitTo); return; }
  setPhase("list");
  setMock(null);
  setResult(null);
}

  /* ================= LIST ================= */
  if (mockId != null && (phase === "list" || phase === "confirm")) {
  return <div className="adm-empty">{mocksLoading ? "Loading test…" : "Test not found."}</div>;
}
  if (phase === "list" || phase === "confirm") {
    const uidNum = hashId(user?.uid || displayName);
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        <div className="tcy-page-head">
          <h1>Oxford ELLT {cfg.label}</h1>
          <span className="who">
            Welcome, {displayName} | User ID: {uidNum}
          </span>
        </div>
        <div className="tcy-cards">
          {mocksLoading && <div className="adm-empty">Loading mocks…</div>}
          {!mocksLoading && mocks.length === 0 && (
            <div className="adm-empty">
              No {cfg.label.toLowerCase()} mocks have been published yet. Check back soon, or ask an admin to add some.
            </div>
          )}
          {mocks.map((m) => {
            const best = bestByMock[m.id];
            const total = cardTotal(kind, m);
            return (
              <div className="tcy-card" key={m.id}>
                <div className="tcy-card-top">
                  <div className="tcy-card-title">
                    <span className="ic">{kind === "reading" ? "📖" : "🎧"}</span>
                    Oxford ELLT {cfg.label} - {m.id}
                  </div>
                  <button className="tcy-btn-gold" onClick={() => openConfirm(m)}>
                    Take Test
                  </button>
                </div>
                <div className="tcy-card-desc">
                  <span className="lbl">Description</span>
                  {cfg.sectionNames.map((n, i) => (
                    <div key={i}>
                      - Section {i + 1}: {n}
                    </div>
                  ))}
                  <div>- {total} questions in total</div>
                  <div>- 🎯 {m.focus}</div>
                </div>
                <div className="tcy-card-time">
                  <span className="lbl">Test time</span>
                  {Math.round(cfg.mainSeconds / 60)} minutes
                </div>
                {best && (
                  <div className="tcy-card-best">
                    Best: {best.score}/{best.total} · {best.pct}%
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
                You will need <b>{Math.round(cfg.mainSeconds / 60)} minutes</b> to take this test.
              </p>
              <div className="tcy-modal-btns">
                <button className="tcy-btn-gray" onClick={cancelConfirm}>
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

  const titleBar = `Oxford ELLT ${cfg.label} - ${mock?.id ?? ""}`;

  if (phase === "welcome") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-center">
          <h2>Welcome to the Oxford ELLT {cfg.label} Test</h2>
          {kind === "reading" ? (
            <p>
              Make sure to respond to each question. You should attempt to answer <b>all</b> the questions.
            </p>
          ) : (
            <p>
              Each recording plays automatically. Section 1 is played once; Sections 2 and 3 are played twice. When a
              recording ends, the test moves on to the next section by itself, so listen carefully and answer{" "}
              <b>all</b> the questions.
            </p>
          )}
          <p>Each question is worth 1 point. You will be instructed on how to answer each question.</p>
          <p>
            Click <b>Start Test</b> to get started.
          </p>
        </div>
        <div className="tcy-shell-cta">
          <button className="tcy-btn-gold" onClick={startTest}>
            Start Test
          </button>
        </div>
      </Shell>
    );
  }

  if (phase === "volume") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-volume-grid">
          <div className="tcy-volume-left">
            <h2>Changing the Volume</h2>
            <p>
              Use your device's volume control to set a comfortable level. Click the big speaker icon to play a test
              sound.
            </p>
            <p>
              When you click <b>Start Section 1</b>, the timer and the first recording start at the same time.
            </p>
            <button className="tcy-vol-icon-btn">🔊</button>
          </div>
          <div className="tcy-volume-right">
            <div className="lead">This section requires audio.</div>
            <button className={"tcy-vol-big" + (volChecked ? " checked" : "")} onClick={playVolumeTest}>
              🔊
            </button>
            <div className="hint">
              {volChecked
                ? "✓ If you heard the voice, you're ready."
                : "Click the icon above to play a test sound and check you can hear it clearly."}
            </div>
          </div>
        </div>
        <div className="tcy-shell-cta">
          <button className="tcy-btn-gold" onClick={volumeContinue}>
            Start Section 1
          </button>
        </div>
      </Shell>
    );
  }

  /* ---- Reading, Section 1: drag-and-drop paragraph ordering (no questions after it) ---- */
  if (phase === "test" && kind === "reading" && secIdx === 0) {
    const sec = getSec(mock, 0);
    const order = paraOrder || sec.paras.map((p) => p.l);
    const byLabel = Object.fromEntries(sec.paras.map((p) => [p.l, p]));

    function moveTo(targetLabel) {
      if (!dragLabel || dragLabel === targetLabel) return;
      const arr = [...order];
      const from = arr.indexOf(dragLabel);
      const to = arr.indexOf(targetLabel);
      if (from === -1 || to === -1) return;
      arr.splice(from, 1);
      arr.splice(to, 0, dragLabel);
      setParaOrder(arr);
      arr.forEach((l, i) => setAnswer("ord_" + l, i + 1));
    }

    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div className="tcy-sec-label">Section 1/3 — Paragraph Ordering</div>
        <div className="tcy-qsub" style={{ textAlign: "center", marginBottom: 22 }}>
          Drag the paragraphs into the correct order.
        </div>
        <div className="order-list">
          {order.map((label, idx) => {
            const p = byLabel[label];
            return (
              <div
                key={label}
                draggable
                onDragStart={() => setDragLabel(label)}
                onDragEnd={() => setDragLabel(null)}
                onDragOver={(e) => {
                  e.preventDefault();
                  moveTo(label);
                }}
                onDrop={(e) => e.preventDefault()}
                className={"order-item" + (dragLabel === label ? " selected" : "")}
              >
                <span className="order-pos">{idx + 1}</span>
                <span className="order-handle">⠿⠿</span>
                <span className="order-txt">
                  <b>{label}.</b> {p.txt}
                </span>
              </div>
            );
          })}
        </div>
        <div className="tcy-nav-row">
          <button className="tcy-btn-gray" disabled>
            ← Previous
          </button>
          <button className="tcy-btn-gold" onClick={nextStep}>
            Next →
          </button>
        </div>
      </Shell>
    );
  }

  /* ---- Reading, Section 2: sentence fill ---- */
  if (phase === "test" && kind === "reading" && secIdx === 1) {
    const sec = getSec(mock, 1);
    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div className="tcy-sec-label">Section 2/3 — Sentence Fill</div>
        <div className="tcy-qsub" style={{ marginBottom: 16 }}>
          Choose the correct sentence for each gap using the A–H selector at that gap. One sentence is not used.
        </div>
        <div className="sec2-split">
          <GappedPassage html={sec.textHtml} UA={UA} onAnswer={setAnswer} />
          <div className="choices-panel">
            <h3>SENTENCE OPTIONS</h3>
            {sec.options.map((o) => (
              <div className="choice-item" key={o.l}>
                <span className="choice-l">{o.l}</span>
                <span>{o.txt}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tcy-nav-row">
          <button className="tcy-btn-gray" onClick={prevStep}>
            ← Previous
          </button>
          <button className="tcy-btn-gold" onClick={nextStep}>
            Next →
          </button>
        </div>
      </Shell>
    );
  }

  /* ---- Reading, Section 3: comprehension, one question at a time ---- */
  if (phase === "test" && kind === "reading" && secIdx === 2) {
    const steps = buildReadingSteps(mock, 2);
    const idx = Math.min(Math.max(qIdx, 0), steps.length - 1);
    const step = steps[idx];
    const sec = getSec(mock, 2);
    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div className="tcy-sec-label">Section 3/3</div>
        <div className="tcy-q-count">
          Question {idx + 1} out of {steps.length}
        </div>
        <div className="tcy-split">
          <div className="tcy-qside">
            <ChoiceQuestion
              q={step.item}
              answer={UA[step.key]}
              onAnswer={(v) => setAnswer(step.key, v)}
              tfLabels={cfg.tfLabels}
            />
          </div>
          <div className="tcy-passside" dangerouslySetInnerHTML={{ __html: sec.passHtml }} />
        </div>
        <div className="tcy-nav-row">
          <button className="tcy-btn-gray" onClick={prevStep}>
            ← Previous
          </button>
          <button className="tcy-btn-gold" onClick={nextStep}>
            {idx === steps.length - 1 ? "Finish Section →" : "Next →"}
          </button>
        </div>
      </Shell>
    );
  }

  /* ---- Listening ---- */
  if (phase === "test" && kind === "listening") {
    const sec = getSec(mock, secIdx);
    const timesToPlay = secIdx === 0 ? 1 : 2;
    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div
          className={"tcy-audio-fab" + (speaking ? " live" : "")}
          title={speaking ? "Playing…" : "Audio stopped"}
        >
          {speaking ? "🔊" : "🔈"}
        </div>
        <div className="tcy-sec-label">Section {secIdx + 1}/3</div>
        <div className="tcy-audio-status">
          {audioUnsupported ? (
            "Your browser doesn't support spoken audio — read the transcript below."
          ) : needsGesture ? (
            <>
              Your browser blocked the audio.
              <button className="tcy-play-btn" onClick={() => setAudioNonce((n) => n + 1)}>
                ▶ Play recording
              </button>
            </>
          ) : speaking ? (
            `🔊 Playing${timesToPlay > 1 ? ` (play ${Math.min(playRound + 1, timesToPlay)} of ${timesToPlay})` : ""}… the next section opens automatically when the recording ends.`
          ) : (
            "Recording finished."
          )}
        </div>

        {sec.qs.map((q, qi) => {
          const key = `${secIdx}_q_${qi}`;
          return (
            <div className="tcy-lq-block" key={qi}>
              <div className="tcy-lq-head">
                <b>Question {listeningQNumber(mock, secIdx, qi)}</b>
              </div>
              <div className="tcy-lq-sub">
                {q.type === "gap"
                  ? "Write 1–3 words"
                  : q.type === "spk"
                    ? "Select ONE speaker"
                    : "Select ONE answer only (1 point)"}
              </div>
              <ChoiceQuestion q={q} answer={UA[key]} onAnswer={(v) => setAnswer(key, v)} tfLabels={cfg.tfLabels} />
            </div>
          );
        })}

        <button className="tcy-transcript-toggle" onClick={() => setShowTranscript((v) => !v)}>
          {showTranscript ? "Hide transcript (practice mode)" : "Show transcript (practice mode)"}
        </button>
        {showTranscript && (
          <div className="tcy-transcript">
            <b>Transcript:</b>
            {"\n\n" + sec.script}
          </div>
        )}

        <div className="tcy-nav-row">
          <div />
          <button className="tcy-btn-gray" onClick={listeningNext}>
            {secIdx === 2 ? "Finish Section →" : "Skip to Next Section →"}
          </button>
        </div>
      </Shell>
    );
  }

  if (phase === "checkpoint") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div className="tcy-review">
          <h2>You still have time to review your answers</h2>
          <div className="timeleft">
            You have <b>{fmt(mainLeft)}</b> remaining.
          </div>
          <div className="ask">Would you like to review all the test questions?</div>
          <button className="tcy-btn-gold" onClick={reviewFromCheckpoint}>
            Review
          </button>
        </div>
        <div className="tcy-nav-row">
          <button className="tcy-btn-gold" onClick={reviewFromCheckpoint}>
            ← Previous
          </button>
          <button className="tcy-btn-gold" onClick={() => setPhase("endConfirm")}>
            Submit Test →
          </button>
        </div>
      </Shell>
    );
  }

  if (phase === "endConfirm") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={fmt(mainLeft)} showTimer={started}>
        <div className="tcy-overlay">
          <div className="tcy-modal">
            <div className="q-ic">?</div>
            <h2>Are you sure?</h2>
            <p>Have you answered all the questions?</p>
            <div className="tcy-modal-btns">
              <button className="tcy-btn-gray" onClick={() => setPhase("checkpoint")}>
                Return
              </button>
              <button className="tcy-btn-gold" onClick={() => setPhase("ended")}>
                End Section
              </button>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (phase === "ended") {
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-ended">Your test has ended</div>
        <div className="tcy-shell-cta">
          <button className="tcy-btn-gold" onClick={finishFromEnded}>
            Finish
          </button>
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
          <div style={{ marginTop: 10 }}>Your test has ended</div>
        </div>
        <div className="tcy-shell-cta">
          <button className="tcy-btn-gold" disabled>
            Finish
          </button>
        </div>
      </Shell>
    );
  }

  if (phase === "result" && result) {
    const color = result.pct >= 62 ? "#1f8a3d" : "#c9781e";
    const bg = result.pct >= 62 ? "rgba(63,185,80,.12)" : "rgba(232,184,75,.15)";
    return (
      <Shell title={titleBar} onBack={backToList} timer={null}>
        <div className="tcy-result-card">
          <div className="tcy-result-score">
            {result.score}
            <span style={{ fontSize: 26, color: "#aaa" }}>/{result.total}</span>
          </div>
          <div className="tcy-result-sub">{result.pct}% correct</div>
          <div className="tcy-result-band" style={{ color, background: bg }}>
            Estimated Level: {result.band}
          </div>
          <div className="tcy-sec-scores">
            {cfg.sectionNames.map((n, i) => (
              <div className="tcy-sec-score-box" key={i}>
                <div className="n">
                  {result.secScores[i]}/{result.secTotals ? result.secTotals[i] : 0}
                </div>
                <div className="l">
                  S{i + 1}
                  <br />
                  {n}
                </div>
              </div>
            ))}
          </div>
          <div className="tcy-lessons">
            <h3>📈 Lessons From This Mock</h3>
            {lessonsFor(kind, result).map((l, i) => (
              <div className="li" key={i}>
                {l}
              </div>
            ))}
          </div>
          <div className="tcy-result-btns">
            <button className="tcy-btn-gold" onClick={confirmTake}>
              🔄 Retry
            </button>
            {mockId == null && mock && mock.id < mocks.length && (
              <button
                className="tcy-btn-gold"
                onClick={() => {
                  setMock(mocks.find((m) => m.id === mock.id + 1));
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

function cardTotal(kind, m) {
  if (kind === "reading") return m.s1.paras.length + m.s2.qs.length + m.s3.qs.length;
  return getSec(m, 0).qs.length + getSec(m, 1).qs.length + getSec(m, 2).qs.length;
}

function Shell({ title, onBack, timer, showTimer = true, children }) {
  return (
    <div className="tcy-shell">
      <div className="tcy-topbar">
        <div className="tcy-topbar-left">
          <button className="tcy-back" onClick={onBack}>
            ←
          </button>
          
        </div>
        {timer && showTimer && <div className="tcy-topbar-timer">{timer}</div>}
        {/* <button className="tcy-hamburger">☰</button> */}
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

/** Gap-fill passage with a real A–H <select> portalled into each gap. */
function GappedPassage({ html, UA, onAnswer }) {
  const containerRef = useRef(null);
  const [slots, setSlots] = useState([]);

  const slotHtml = useMemo(
    () =>
      (html || "").replace(
        /<span class="gap-marker">\((\d+)\)<\/span>/g,
        '<span class="gap-slot" data-gap="$1"></span>',
      ),
    [html],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = Array.from(containerRef.current.querySelectorAll(".gap-slot"));
    setSlots(nodes.map((el) => ({ n: parseInt(el.dataset.gap, 10), el })));
  }, [slotHtml]);

  return (
    <div className="passage-scroll" ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: slotHtml }} />
      {slots.map(({ n, el }) =>
        createPortal(
          <select
            key={n}
            className={"gap-select" + (UA["fill_" + n] ? " filled" : "")}
            value={UA["fill_" + n] || ""}
            onChange={(e) => onAnswer("fill_" + n, e.target.value)}
          >
            <option value="">{n}</option>
            {GAP_LETTERS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>,
          el,
        ),
      )}
    </div>
  );
}

/** Plain choice question — no correctness feedback while the test is live. */
function ChoiceQuestion({ q, answer, onAnswer, tfLabels }) {
  if (q.type === "gap") {
    return (
      <>
        <div className="tcy-qtext">{q.text}</div>
        <input
          className="tcy-gap-input"
          type="text"
          placeholder="Type 1–3 words…"
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
        />
      </>
    );
  }
  if (q.type === "spk") {
    const labels = ["Speaker A", "Speaker B", "Speaker C", "None of the speakers"];
    return (
      <>
        <div className="tcy-qtext">{q.text}</div>
        <div className="tcy-opts">
          {labels.map((lbl, i) => (
            <button key={i} className={"tcy-opt" + (answer === i ? " sel" : "")} onClick={() => onAnswer(i)}>
              <span className="tcy-opt-l">{String.fromCharCode(65 + i)}</span>
              <span>{lbl}</span>
            </button>
          ))}
        </div>
      </>
    );
  }
  if (q.type === "tf") {
    return (
      <>
        <div className="tcy-qtext">{q.text}</div>
        <div className="tcy-opts">
          {tfLabels.map((lbl, i) => (
            <button key={i} className={"tcy-opt" + (answer === i ? " sel" : "")} onClick={() => onAnswer(i)}>
              <span className="tcy-opt-l">{String.fromCharCode(65 + i)}</span>
              <span>{lbl}</span>
            </button>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="tcy-qtext" dangerouslySetInnerHTML={{ __html: highlightWord(q.text) }} />
      <div className="tcy-qsub">Select ONE answer only (1 point)</div>
      <div className="tcy-opts">
        {q.opts?.map((opt, i) => (
          <button key={i} className={"tcy-opt" + (answer === i ? " sel" : "")} onClick={() => onAnswer(i)}>
            <span className="tcy-opt-l">{String.fromCharCode(65 + i)}</span>
            <span>{opt.length > 3 && /^[A-D]\)?\.?\s/.test(opt) ? opt.slice(3) : opt}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function highlightWord(text) {
  return (text || "").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

function lessonsFor(kind, result) {
  const items = [];
  if (kind === "reading") {
    if (result.secScores[0] < 4)
      items.push(
        "Ordering: write the logic chain on paper first. The sentence with an undefined pronoun (it/they/this) cannot be first — find what it refers to.",
      );
    if (result.secScores[1] < 6)
      items.push(
        "Sentence Fill: read the sentence before AND after the gap. Match the connector word's function (However = contrast, Moreover = addition, For example = illustration).",
      );
    if (result.secScores[2] < 11)
      items.push(
        "Section 3: Q1–4 are vocabulary — define the word before checking context. For the rest, find where the answer is in the passage before looking at the options.",
      );
    items.push("Trust your first answer — changing answers usually lowers scores, not raises them.");
  } else {
    if (result.secScores[0] < 6)
      items.push(
        "Section 1 (Monologue): it plays only once. Read the questions while you listen and match the general meaning, not a single keyword.",
      );
    if (result.secScores[1] < 6)
      items.push(
        "Section 2 (Gap Fill): write the exact word spoken — no synonyms. The words before/after the gap tell you what type of word you need.",
      );
    if (result.secScores[2] < 6)
      items.push(
        '"None" is correct when no speaker fully expresses the idea. A related mention is not the same as agreement.',
      );
    items.push(
      "Before each recording starts, there is no preview time — skim the options quickly and circle the word that makes each one different.",
    );
  }
  return items;
}