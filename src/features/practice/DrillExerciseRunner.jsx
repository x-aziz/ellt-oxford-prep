import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { READING_DRILL_TYPES } from "../../data/readingDrillTypes.js";
import { LISTENING_DRILL_TYPES } from "../../data/listeningDrillTypes.js";
import { WRITING_DRILL_TYPES } from "../../data/writingDrillTypes.js";
import {
  playScript,
  stopAll,
  speechSupported,
  toTranscript,
  useUkVoiceStatus,
} from "./drillAudio.js";

const TYPES_BY_SKILL = {
  reading: READING_DRILL_TYPES,
  listening: LISTENING_DRILL_TYPES,
  writing: WRITING_DRILL_TYPES,
};

const words = (t) => (t || "").trim().match(/\S+/g) || [];
const letter = (i) => String.fromCharCode(65 + i);

const GREEN = "#3aa856";
const RED = "#cf3a2e";
const TF_LABELS = ["True", "False", "Not Given"];

const TAG_CLASS = {
  "SPEAKER MATCH": "tag-spk",
  "MULTIPLE CHOICE": "tag-mc",
  "GAP FILL": "tag-gap",
  "TABLE FILL": "tag-gap",
  "WORD FILL": "tag-gap",
  "PARAGRAPH ORDERING": "tag-o",
  "SENTENCE FILL": "tag-p",
  VOCABULARY: "tag-v",
  "TRUE / FALSE / NOT GIVEN": "tag-tf",
  COMPREHENSION: "tag-c",
  NUMBERS: "tag-i",
};

const DEFAULT_TAG = {
  mc: "MULTIPLE CHOICE",
  tf: "TRUE / FALSE / NOT GIVEN",
  gap: "GAP FILL",
  table: "TABLE FILL",
  order: "PARAGRAPH ORDERING",
  sentfill: "SENTENCE FILL",
  wordfill: "WORD FILL",
};

/* ---------------------------- answer checking ---------------------------- */
const normAns = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[-–—]/g, " ")
    .replace(/[%£$€.,!?;:'"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const accepts = (user, list) => {
  const u = normAns(user);
  return !!u && list.some((a) => normAns(a) === u);
};

function gradeItem(item, a) {
  switch (item.kind) {
    case "mc":
    case "tf":
      return { got: a === item.ans ? 1 : 0, total: 1 };
    case "gap":
      return {
        got: accepts(a, [item.ans, ...(item.alts || [])]) ? 1 : 0,
        total: 1,
      };
    case "table": {
      const keys = Object.keys(item.answers);
      const got = keys.filter((k) => accepts(a?.[k], item.answers[k])).length;
      return { got, total: keys.length };
    }
    case "order": {
      const current = a || item.paras.map((p) => p.l);
      const got = current.filter(
        (l, i) => item.paras.find((p) => p.l === l).pos === i + 1,
      ).length;
      return { got, total: item.paras.length };
    }
    case "sentfill":
    case "wordfill": {
      const got = item.gaps.filter((g) => a?.[g.n] === g.ans).length;
      return { got, total: item.gaps.length };
    }
    default:
      return { got: 0, total: 1 };
  }
}

function isAnswered(item, a) {
  switch (item.kind) {
    case "mc":
    case "tf":
      return a !== undefined && a !== null;
    case "gap":
      return !!String(a || "").trim();
    case "table":
    case "sentfill":
    case "wordfill":
      return !!a && Object.values(a).some((v) => String(v || "").trim());
    case "order":
      return true;
    default:
      return false;
  }
}

function correctLine(item) {
  switch (item.kind) {
    case "mc":
      return `${letter(item.ans)}. ${item.opts[item.ans]}`;
    case "tf":
      return TF_LABELS[item.ans];
    case "gap":
      return item.ans;
    case "table":
      return Object.keys(item.answers)
        .map((k) => `(${k}) ${item.answers[k][0]}`)
        .join("   ");
    case "order":
      return [...item.paras]
        .sort((a, b) => a.pos - b.pos)
        .map((p) => p.l)
        .join(" → ");
    case "sentfill":
    case "wordfill":
      return item.gaps.map((g) => `(${g.n}) ${g.ans}`).join("   ");
    default:
      return "";
  }
}

function instruction(item, skill) {
  switch (item.kind) {
    case "mc":
      return "Select ONE answer only (1 point).";
    case "tf":
      return "Is the statement True, False or Not Given according to the passage?";
    case "gap":
      return skill === "listening"
        ? "Write 1–3 words, exactly as you hear them."
        : "Write ONE word taken from the passage.";
    case "table":
      return null;
    case "order":
      return "Drag the paragraphs into the correct order (or use the arrows).";
    case "sentfill":
      return `Choose the correct sentence for each gap. ${
        item.options.length - item.gaps.length
      } sentences are not used.`;
    case "wordfill":
      return `Choose the correct word for each gap. ${
        item.bank.length - item.gaps.length
      } words are not used.`;
    default:
      return null;
  }
}

/* -------------------------------- small views -------------------------------- */
function Rich({ text }) {
  return (
    <>
      {String(text)
        .split(/\*\*(.+?)\*\*/g)
        .map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}
    </>
  );
}

const passageStyle = {
  background: "#f6f7fa",
  borderLeft: "3px solid #1c64e0",
  padding: "12px 16px",
  borderRadius: "0 6px 6px 0",
  margin: "0 0 14px",
  fontSize: 15,
  lineHeight: 1.7,
  color: "#2b2b2b",
};

function ChoiceList({ opts, value, onPick, locked, correct }) {
  return (
    <div className="tcy-opts">
      {opts.map((o, i) => {
        let cls = "tcy-opt";
        if (locked) {
          if (i === correct) cls += " ok";
          else if (value === i) cls += " wrong";
        } else if (value === i) cls += " sel";
        return (
          <button
            key={i}
            type="button"
            className={cls}
            disabled={locked}
            onClick={() => onPick(i)}
          >
            <span className="tcy-opt-l">{letter(i)}</span>
            <span>{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function TFRow({ value, onPick, locked, correct }) {
  return (
    <div className="tf-row">
      {TF_LABELS.map((lbl, i) => {
        let cls = "tfb";
        if (locked) {
          if (i === correct) cls += " ok";
          else if (value === i) cls += " wrong";
        } else if (value === i) cls += " sel";
        return (
          <button
            key={i}
            type="button"
            className={cls}
            disabled={locked}
            onClick={() => onPick(i)}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

const inputBase = {
  padding: "7px 10px",
  border: "1px solid #dfe2ea",
  borderRadius: 4,
  fontSize: 14.5,
  color: "#222",
  width: 150,
  margin: "0 4px",
  background: "#fff",
};

function lockedStyle(ok) {
  return {
    borderColor: ok ? GREEN : RED,
    background: ok ? "#eaf7ee" : "#fdecea",
  };
}

function GapInput({ value, onChange, locked, ok }) {
  return (
    <input
      className="tcy-gap-input"
      type="text"
      placeholder="Type your answer…"
      value={value || ""}
      disabled={locked}
      onChange={(e) => onChange(e.target.value)}
      style={locked ? lockedStyle(ok) : undefined}
    />
  );
}

function TableTask({ item, value = {}, onChange, locked }) {
  const cell = (txt) =>
    String(txt)
      .split(/(\{\d+\})/)
      .map((part, i) => {
        const m = part.match(/^\{(\d+)\}$/);
        if (!m) return <span key={i}>{part}</span>;
        const n = m[1];
        const ok = locked && accepts(value[n], item.answers[n]);
        return (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            <input
              type="text"
              value={value[n] || ""}
              disabled={locked}
              placeholder={`(${n})`}
              onChange={(e) => onChange({ ...value, [n]: e.target.value })}
              style={{ ...inputBase, ...(locked ? lockedStyle(ok) : {}) }}
            />
            {locked && !ok && (
              <span style={{ color: RED, fontWeight: 700, fontSize: 13 }}>
                → {item.answers[n][0]}
              </span>
            )}
          </span>
        );
      });

  const th = {
    textAlign: "left",
    padding: "9px 14px",
    background: "#0e1f4d",
    color: "#fff",
    fontSize: 13.5,
    fontWeight: 600,
  };
  const td = {
    padding: "9px 14px",
    border: "1px solid #dfe2ea",
    fontSize: 14.5,
    color: "#222",
  };

  return (
    <div style={{ overflowX: "auto", margin: "10px 0 4px" }}>
      <table style={{ borderCollapse: "collapse", minWidth: 380 }}>
        <thead>
          <tr>
            {item.head.map((h) => (
              <th key={h} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td key={ci} style={td}>
                  {cell(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const arrowBtn = {
  border: "1px solid #dfe2ea",
  background: "#fff",
  borderRadius: 4,
  width: 28,
  height: 24,
  cursor: "pointer",
  fontSize: 12,
  lineHeight: 1,
  color: "#333",
};

function OrderTask({ item, value, onChange, locked }) {
  const [drag, setDrag] = useState(null);
  const current = value || item.paras.map((p) => p.l);
  const by = Object.fromEntries(item.paras.map((p) => [p.l, p]));

  function move(from, to) {
    if (to < 0 || to >= current.length || from === to) return;
    const arr = [...current];
    const [x] = arr.splice(from, 1);
    arr.splice(to, 0, x);
    onChange(arr);
  }

  return (
    <div className="order-list" style={{ maxWidth: "none", margin: "6px 0 0" }}>
      {current.map((l, i) => {
        const ok = locked && by[l].pos === i + 1;
        return (
          <div
            key={l}
            draggable={!locked}
            onDragStart={() => setDrag(l)}
            onDragEnd={() => setDrag(null)}
            onDragOver={(e) => {
              e.preventDefault();
              if (drag && drag !== l) move(current.indexOf(drag), i);
            }}
            className={"order-item" + (drag === l ? " selected" : "")}
            style={
              locked
                ? {
                    cursor: "default",
                    borderColor: ok ? GREEN : RED,
                    background: ok ? "#f1faf3" : "#fdf3f2",
                  }
                : undefined
            }
          >
            <span className="order-pos">{i + 1}</span>
            {!locked && <span className="order-handle">⠿⠿</span>}
            <span className="order-txt">
              <b>{l}.</b> {by[l].txt}
            </span>
            {!locked && (
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  style={arrowBtn}
                  aria-label="Move up"
                  onClick={() => move(i, i - 1)}
                >
                  ▲
                </button>
                <button
                  type="button"
                  style={arrowBtn}
                  aria-label="Move down"
                  onClick={() => move(i, i + 1)}
                >
                  ▼
                </button>
              </span>
            )}
            {locked && !ok && (
              <span
                style={{ color: RED, fontWeight: 700, fontSize: 12.5, flexShrink: 0 }}
              >
                should be {by[l].pos}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GapPassage({ item, value = {}, onChange, locked, mode }) {
  const choices =
    mode === "sent"
      ? item.options.map((o) => ({ v: o.l, label: o.l }))
      : item.bank.map((w) => ({ v: w, label: w }));
  const ansBy = Object.fromEntries(item.gaps.map((g) => [g.n, g.ans]));

  return (
    <div className="sec2-split" style={{ marginTop: 8 }}>
      <div className="passage-scroll">
        {item.text.split(/\n\n/).map((p, pi) => (
          <p key={pi}>
            {p.split(/(\[\d+\])/).map((part, i) => {
              const m = part.match(/^\[(\d+)\]$/);
              if (!m) return part;
              const n = Number(m[1]);
              const v = value[n] || "";
              const ok = locked && v === ansBy[n];
              return (
                <span key={i}>
                  <select
                    className={"gap-select" + (v ? " filled" : "")}
                    value={v}
                    disabled={locked}
                    onChange={(e) => onChange({ ...value, [n]: e.target.value })}
                    style={
                      locked
                        ? { ...lockedStyle(ok), color: ok ? "#1f8a3d" : RED }
                        : undefined
                    }
                  >
                    <option value="">{n}</option>
                    {choices.map((c) => (
                      <option key={c.v} value={c.v}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  {locked && !ok && (
                    <span style={{ color: RED, fontWeight: 700, fontSize: 13 }}>
                      → {ansBy[n]}
                    </span>
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {mode === "sent" ? (
        <div className="choices-panel">
          <h3>SENTENCE OPTIONS</h3>
          {item.options.map((o) => (
            <div className="choice-item" key={o.l}>
              <span className="choice-l">{o.l}</span>
              <span>{o.txt}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="choices-panel">
          <h3>WORD BANK</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.bank.map((w) => (
              <span
                key={w}
                style={{
                  padding: "5px 13px",
                  background: "#fff",
                  border: "1px solid #dfe2ea",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {w}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#666", marginTop: 14 }}>
            Each word is used once. {item.bank.length - item.gaps.length} words
            are extra.
          </p>
        </div>
      )}
    </div>
  );
}

function AudioBar({ script, names }) {
  const [state, setState] = useState("idle"); // idle | playing | blocked
  const [plays, setPlays] = useState(0);
  const stopRef = useRef(null);

  useEffect(
    () => () => {
      stopRef.current?.();
    },
    [],
  );

  if (!speechSupported()) {
    return (
      <div className="tcy-audio-status" style={{ margin: "0 0 14px" }}>
        Your browser cannot play spoken audio. Use Google Chrome or Microsoft
        Edge. Transcript:
        <div className="tcy-transcript">{toTranscript(script, names)}</div>
      </div>
    );
  }

  function play() {
    stopRef.current?.();
    setState("playing");
    stopRef.current = playScript(script, {
      onEnd: () => {
        setState("idle");
        setPlays((n) => n + 1);
      },
      onInterrupt: () => setState("idle"),
      onError: (why) => setState(why === "blocked" ? "blocked" : "idle"),
    });
  }
  function stop() {
    stopRef.current?.();
    stopRef.current = null;
    setState("idle");
  }

  return (
    <div
      className="tcy-audio-status"
      style={{
        margin: "0 0 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {state === "playing" ? (
        <button
          type="button"
          className="tcy-play-btn"
          style={{ marginLeft: 0 }}
          onClick={stop}
        >
          ⏹ Stop
        </button>
      ) : (
        <button
          type="button"
          className="tcy-play-btn"
          style={{ marginLeft: 0 }}
          onClick={play}
        >
          {plays ? "↻ Play again" : "▶ Play audio"}
        </button>
      )}
      <span>
        {state === "playing"
          ? "🔊 Playing… listen carefully"
          : state === "blocked"
            ? "Your browser blocked the audio. Press play again."
            : plays
              ? `Played ${plays} time${plays > 1 ? "s" : ""}`
              : "Press play to listen"}
      </span>
    </div>
  );
}

/* ------------------------------- main runner ------------------------------- */
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
        <div className="adm-empty" style={{ padding: 40 }}>
          Not found.
        </div>
      </div>
    );
  }

  const goto = (newIdx) => {
    if (newIdx < 0 || newIdx >= type.exercises.length) return;
    navigate(`/practice/${skill}/${typeKey}/${type.exercises[newIdx].id}`);
  };

  if (Array.isArray(exercise.items)) {
    return (
      <TaskRunner
        key={exercise.id}
        skill={skill}
        typeKey={typeKey}
        type={type}
        exercise={exercise}
        idx={idx}
        goto={goto}
        navigate={navigate}
      />
    );
  }
  return (
    <WritingDrillScreen
      key={exercise.id}
      skill={skill}
      typeKey={typeKey}
      type={type}
      exercise={exercise}
      idx={idx}
      goto={goto}
      navigate={navigate}
    />
  );
}

/* ---------- Reading + Listening: interactive, auto-checked ---------- */
function TaskRunner({ skill, typeKey, type, exercise, idx, goto, navigate }) {
  const items = exercise.items;
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const voiceStatus = useUkVoiceStatus(skill === "listening");

  useEffect(() => () => stopAll(), []);

  const setAns = (i, v) => setAnswers((p) => ({ ...p, [i]: v }));
  const check = (i) =>
    setResults((p) => ({ ...p, [i]: gradeItem(items[i], answers[i]) }));
  const retry = (i) => {
    stopAll();
    setAnswers((p) => {
      const n = { ...p };
      delete n[i];
      return n;
    });
    setResults((p) => {
      const n = { ...p };
      delete n[i];
      return n;
    });
  };
  const checkAll = () =>
    setResults((prev) => {
      const next = { ...prev };
      items.forEach((it, i) => {
        if (!next[i]) next[i] = gradeItem(it, answers[i]);
      });
      return next;
    });
  const resetAll = () => {
    stopAll();
    setAnswers({});
    setResults({});
    window.scrollTo?.({ top: 0 });
  };

  const totals = useMemo(() => {
    const all = items.reduce((n, it) => n + gradeItem(it, undefined).total, 0);
    const got = Object.values(results).reduce((n, r) => n + r.got, 0);
    return { all, got, done: Object.keys(results).length };
  }, [items, results]);

  const finished = totals.done === items.length;
  const pct = totals.all ? Math.round((totals.got / totals.all) * 100) : 0;

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button
            className="tcy-hub-back"
            onClick={() => navigate(`/practice/${skill}/${typeKey}`)}
          >
            ← {type.label}
          </button>
          <h1>{exercise.title}</h1>
        </div>
        <span className="who">
          Checked {totals.done}/{items.length} · Score {totals.got}/{totals.all}
        </span>
      </div>

      <main
        style={{ maxWidth: 980, margin: "0 auto", padding: "10px 20px 60px" }}
      >
        {exercise.sub && (
          <p className="tcy-qsub" style={{ marginBottom: 16 }}>
            {exercise.sub}
          </p>
        )}

        {skill === "listening" && (
          <div className="tcy-audio-status" style={{ margin: "0 0 20px" }}>
            🎧 Use headphones. Press <b>Play audio</b> on each question. While
            you practise you can replay as often as you like (in the real test,
            Section 1 plays once and Sections 2–3 play twice). The answer and
            transcript appear after you check.
            {voiceStatus === "missing" && (
              <div style={{ color: "#c9781e", marginTop: 6 }}>
                Google UK English voices were not found in this browser, so a
                default English voice will be used. For the exact exam-style
                voices, open this page in Google Chrome or Microsoft Edge.
              </div>
            )}
            {voiceStatus === "unsupported" && (
              <div style={{ color: "#c9781e", marginTop: 6 }}>
                This browser cannot play spoken audio. Use Google Chrome or
                Microsoft Edge.
              </div>
            )}
          </div>
        )}

        {items.map((item, i) => {
          const res = results[i];
          const locked = !!res;
          const full = locked && res.got === res.total;
          let cls = "qcard";
          if (locked) cls += full ? " correct" : res.got === 0 ? " wrong" : "";
          const tag = item.tag || DEFAULT_TAG[item.kind];
          const instr = instruction(item, skill);
          const a = answers[i];

          return (
            <div className={cls} key={i}>
              <div className="q-meta">
                <div className="q-num">{i + 1}</div>
                <span className={"q-tag " + (TAG_CLASS[tag] || "tag-c")}>
                  {tag}
                </span>
              </div>

              {item.script && <AudioBar script={item.script} names={item.names} />}

              {item.title && (
                <div className="tcy-qtext" style={{ marginBottom: 6 }}>
                  <b>{item.title}</b>
                </div>
              )}
              {item.passage && (
                <div style={passageStyle}>
                  <Rich text={item.passage} />
                </div>
              )}
              {item.text && !["sentfill", "wordfill"].includes(item.kind) && (
                <div className="tcy-qtext" style={{ marginBottom: 6 }}>
                  <Rich text={item.text} />
                </div>
              )}
              {instr && <div className="tcy-qsub">{instr}</div>}

              {(item.kind === "mc") && (
                <ChoiceList
                  opts={item.opts}
                  value={a}
                  onPick={(v) => setAns(i, v)}
                  locked={locked}
                  correct={item.ans}
                />
              )}
              {item.kind === "tf" && (
                <TFRow
                  value={a}
                  onPick={(v) => setAns(i, v)}
                  locked={locked}
                  correct={item.ans}
                />
              )}
              {item.kind === "gap" && (
                <GapInput
                  value={a}
                  onChange={(v) => setAns(i, v)}
                  locked={locked}
                  ok={full}
                />
              )}
              {item.kind === "table" && (
                <TableTask
                  item={item}
                  value={a}
                  onChange={(v) => setAns(i, v)}
                  locked={locked}
                />
              )}
              {item.kind === "order" && (
                <OrderTask
                  item={item}
                  value={a}
                  onChange={(v) => setAns(i, v)}
                  locked={locked}
                />
              )}
              {item.kind === "sentfill" && (
                <GapPassage
                  item={item}
                  value={a}
                  onChange={(v) => setAns(i, v)}
                  locked={locked}
                  mode="sent"
                />
              )}
              {item.kind === "wordfill" && (
                <GapPassage
                  item={item}
                  value={a}
                  onChange={(v) => setAns(i, v)}
                  locked={locked}
                  mode="word"
                />
              )}

              {!locked ? (
                <div className="drill-sc-row" style={{ marginTop: 14 }}>
                  <button
                    className="tcy-btn-gold"
                    disabled={!isAnswered(item, a)}
                    onClick={() => check(i)}
                  >
                    Check answer
                  </button>
                </div>
              ) : (
                <>
                  <div className="exp">
                    <div className={"exp-ans " + (full ? "ok" : "wrong")}>
                      {full
                        ? "✓ Correct"
                        : `✗ ${res.got}/${res.total} correct. Answer: ${correctLine(item)}`}
                    </div>
                    {item.why && <div className="exp-why">{item.why}</div>}
                    {item.gaps &&
                      item.gaps.map((g) => (
                        <div className="exp-why" key={g.n}>
                          <b>
                            ({g.n}) {g.ans}
                          </b>{" "}
                          — {g.why}
                        </div>
                      ))}
                    {item.paras &&
                      [...item.paras]
                        .sort((x, y) => x.pos - y.pos)
                        .map((p) => (
                          <div className="exp-why" key={p.l}>
                            <b>
                              {p.pos}. Paragraph {p.l}
                            </b>{" "}
                            — {p.why}
                          </div>
                        ))}
                    {item.trap && (
                      <div className="exp-trap">⚠ TRAP: {item.trap}</div>
                    )}
                    {item.script && (
                      <div className="tcy-transcript">
                        <b>Transcript:</b>
                        {"\n\n" + toTranscript(item.script, item.names)}
                      </div>
                    )}
                  </div>
                  <div className="drill-sc-row">
                    <button className="tcy-btn-gray" onClick={() => retry(i)}>
                      ↻ Try this question again
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {finished ? (
          <div
            className="tcy-lessons"
            style={{ marginTop: 20, textAlign: "center" }}
          >
            <h3>
              Score: {totals.got}/{totals.all} ({pct}%)
            </h3>
            <div className="li" style={{ border: "none" }}>
              {pct >= 80
                ? "Strong result. Move on to the next exercise."
                : "Below 80%. Read the explanations, then redo this exercise before moving on."}
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="tcy-btn-gold" onClick={resetAll}>
                🔄 Redo exercise
              </button>
            </div>
          </div>
        ) : (
          <div className="check-all-row">
            <button className="tcy-btn-gold" onClick={checkAll}>
              Check all answers
            </button>
          </div>
        )}

        <div className="tcy-nav-row">
          <button
            className="tcy-btn-gray"
            disabled={idx === 0}
            onClick={() => goto(idx - 1)}
          >
            ← Previous exercise
          </button>
          <button
            className="tcy-btn-gray"
            disabled={idx === type.exercises.length - 1}
            onClick={() => goto(idx + 1)}
          >
            Next exercise →
          </button>
        </div>
      </main>
    </div>
  );
}

/* ---------- Writing: write & compare with model (unchanged) ---------- */
function WritingDrillScreen({ skill, typeKey, type, exercise, idx, goto, navigate }) {
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const wc = words(draft).length;
  const inRange = wc >= exercise.minWords && wc <= exercise.maxWords;

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button
            className="tcy-hub-back"
            onClick={() => navigate(`/practice/${skill}/${typeKey}`)}
          >
            ← {type.label}
          </button>
          <h1>{exercise.title}</h1>
        </div>
      </div>

      <main
        style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 20px 60px" }}
      >
        <div className="wm-split">
          <div className="wm-left">
            {exercise.focus && <span className="wm-badge">{exercise.focus}</span>}
            {exercise.text.split("\n\n").map((p, i) => (
              <p className="wm-text" key={i}>
                {p}
              </p>
            ))}
          </div>
          <div className="wm-right">
            <div className="tcy-qtext">
              Write your answer in{" "}
              <b>
                {exercise.minWords}–{exercise.maxWords} words
              </b>
              .
            </div>
            <textarea
              className="wm-area"
              rows={typeKey === "summary" ? 9 : 16}
              placeholder="Type your answer here…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className={"wm-count" + (inRange ? " ok" : "")}>
              {wc} words{" "}
              <span>
                (target {exercise.minWords}–{exercise.maxWords})
              </span>
            </div>
          </div>
        </div>

        <div className="tcy-nav-row">
          <button className="tcy-btn-gold" onClick={() => setShowModel((v) => !v)}>
            {showModel ? "Hide model answer" : "Reveal model answer"}
          </button>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="tcy-btn-gray"
              disabled={idx === 0}
              onClick={() => goto(idx - 1)}
            >
              ← Previous
            </button>
            <button
              className="tcy-btn-gray"
              disabled={idx === type.exercises.length - 1}
              onClick={() => goto(idx + 1)}
            >
              Next →
            </button>
          </div>
        </div>

        {showModel && (
          <div className="wm-compare" style={{ marginTop: 20 }}>
            <div>
              <h4>Your answer</h4>
              <div className="wm-box">
                {draft.trim() || <em>(nothing written yet)</em>}
              </div>
            </div>
            <div>
              <h4>Model answer</h4>
              <div className="wm-box model">{exercise.model}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}