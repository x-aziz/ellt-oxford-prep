import { useEffect, useState } from "react";
import { useAuth } from "../../App.jsx";
import { useDrills } from "../../hooks/useDrills.js";
import { getDrillMarks, saveDrillMarks } from "../../services/firestore.js";

const LABELS = {
  reading: { heading: "Reading Weak-Spot Drills", unit: "questions" },
  listening: { heading: "Listening Weak-Spot Drills", unit: "questions" },
};

export default function PracticeSession({ kind = "reading" }) {
  const { user } = useAuth();
  const { drills: DRILLS, loading: drillsLoading } = useDrills(kind);
  const labels = LABELS[kind] || LABELS.reading;
  const [current, setCurrent] = useState(0);
  const [marks, setMarks] = useState({}); // { setKey: { idx: 'good'|'bad' } }
  const [revealed, setRevealed] = useState({}); // { "setKey-idx": true }
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDrillMarks(user.uid)
      .then((data) => {
        setMarks(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("getDrillMarks failed", err);
        setLoaded(true);
      });
  }, [user]);

  useEffect(() => {
    if (DRILLS.length && current >= DRILLS.length) setCurrent(0);
  }, [DRILLS.length, current]);

  const set = DRILLS[current];

  if (drillsLoading) {
    return <div className="empty-state">Loading drills…</div>;
  }
  if (!DRILLS.length) {
    return (
      <div className="empty-state">
        No {kind} drills have been published yet. Check back soon, or ask an
        admin to add some.
      </div>
    );
  }

  function setScore(setKey) {
    const m = marks[setKey] || {};
    let good = 0;
    let bad = 0;
    Object.values(m).forEach((v) => {
      if (v === "good") good++;
      if (v === "bad") bad++;
    });
    const total = DRILLS.find((s) => s.docId === setKey)?.items.length || 0;
    return { good, bad, total };
  }

  function overallScore() {
    let good = 0;
    let total = 0;
    DRILLS.forEach((s) => {
      const sc = setScore(s.docId);
      good += sc.good;
      total += sc.total;
    });
    return { good, total };
  }

  function toggleReveal(key) {
    setRevealed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleMark(setKey, idx, val) {
    setMarks((prev) => {
      const cur = { ...(prev[setKey] || {}) };
      if (cur[idx] === val) delete cur[idx];
      else cur[idx] = val;
      const next = { ...prev, [setKey]: cur };
      if (user)
        saveDrillMarks(user.uid, setKey, cur).catch((e) =>
          console.error("saveDrillMarks failed", e),
        );
      return next;
    });
  }

  const overall = overallScore();

  return (
    <div>
      <header
        style={{
          position: "sticky",
          top: 52,
          zIndex: 20,
          background: "rgba(255,255,255,.96)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <strong style={{ color: "var(--gold)" }}>ELLT</strong>{" "}
          <span style={{ color: "#8b949e", fontSize: 13 }}>
            {labels.heading} {DRILLS.length} sets ·{" "}
            {DRILLS.reduce((s, d) => s + d.items.length, 0)} {labels.unit}
          </span>
        </div>
        <div
          style={{ fontFamily: "monospace", fontSize: 12, color: "#8b949e" }}
        >
          OVERALL{" "}
          <b style={{ color: "#1a1a2e" }}>
            {overall.good}/{overall.total}
          </b>
        </div>
      </header>

      <nav
        style={{
          display: "flex",
          gap: 6,
          padding: "12px 20px",
          overflowX: "auto",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {DRILLS.map((s, i) => {
          const sc = setScore(s.docId);
          const answered = sc.good + sc.bad;
          const done = answered === sc.total;
          return (
            <div
              key={s.docId}
              onClick={() => setCurrent(i)}
              style={{
                fontFamily: "monospace",
                fontSize: 12.5,
                whiteSpace: "nowrap",
                padding: "8px 14px",
                borderRadius: 6,
                cursor: "pointer",
                color: i === current ? "var(--gold)" : "#8b949e",
                background: i === current ? "var(--card)" : "transparent",
                border:
                  "1px solid " +
                  (i === current ? "rgba(232,184,75,.4)" : "transparent"),
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: done ? "var(--green)" : "var(--border)",
                }}
              />
              {s.eyebrow}: {s.title}
              <span style={{ fontSize: 11, color: "#8b949e" }}>
                {answered}/{sc.total}
              </span>
            </div>
          );
        })}
      </nav>

      <main
        style={{ maxWidth: 880, margin: "0 auto", padding: "28px 20px 100px" }}
      >
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--gold)",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {set.eyebrow} · {set.items.length} questions
          </div>
          <h1 style={{ fontSize: 26, margin: "6px 0 8px" }}>{set.title}</h1>
          <p
            style={{
              color: "#8b949e",
              fontSize: 14,
              lineHeight: 1.55,
              maxWidth: 640,
            }}
          >
            {set.sub}
          </p>
        </div>

        {set.items.map((item, idx) => {
          const mark = marks[set.docId]?.[idx];
          const revealKey = `${set.docId}-${idx}`;
          return (
            <div
              key={idx}
              style={{
                background: "var(--panel)",
                border:
                  "1px solid " +
                  (mark === "good"
                    ? "rgba(63,185,80,.5)"
                    : mark === "bad"
                      ? "rgba(248,81,73,.5)"
                      : "var(--border)"),
                borderRadius: 10,
                padding: "20px 22px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#8b949e",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontWeight: 600,
                    fontSize: 11.5,
                  }}
                >
                  {idx + 1}
                </span>
                DRILL {idx + 1} OF {set.items.length}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 14 }}>
                {item.p}
              </div>
              <button
                onClick={() => toggleReveal(revealKey)}
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#000",
                  background: "var(--gold)",
                  border: "none",
                  padding: "7px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {revealed[revealKey] ? "Hide answer" : "Reveal answer"}
              </button>
              {revealed[revealKey] && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 14px",
                    background: "var(--card)",
                    borderLeft: "3px solid var(--gold)",
                    borderRadius: "0 6px 6px 0",
                    fontSize: 14,
                    lineHeight: 1.55,
                  }}
                >
                  <div>
                    <strong style={{ color: "var(--gold)" }}>Answer:</strong>{" "}
                    {item.a}
                  </div>
                  <div style={{ marginTop: 6, color: "#8b949e" }}>
                    {item.why}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => toggleMark(set.docId, idx, "good")}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11.5,
                    padding: "6px 12px",
                    borderRadius: 6,
                    border:
                      "1px solid " +
                      (mark === "good" ? "var(--green)" : "var(--border)"),
                    background:
                      mark === "good" ? "rgba(63,185,80,.15)" : "transparent",
                    color: mark === "good" ? "var(--green)" : "#8b949e",
                    cursor: "pointer",
                  }}
                >
                  ✓ I got it right
                </button>
                <button
                  onClick={() => toggleMark(set.docId, idx, "bad")}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11.5,
                    padding: "6px 12px",
                    borderRadius: 6,
                    border:
                      "1px solid " +
                      (mark === "bad" ? "var(--red)" : "var(--border)"),
                    background:
                      mark === "bad" ? "rgba(248,81,73,.15)" : "transparent",
                    color: mark === "bad" ? "var(--red)" : "#8b949e",
                    cursor: "pointer",
                  }}
                >
                  ✗ I missed this
                </button>
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "var(--card)",
            border: "1px dashed var(--border)",
            borderRadius: 10,
            fontFamily: "monospace",
            fontSize: 13,
            color: "#8b949e",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <button
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              padding: "8px 14px",
              borderRadius: 6,
              background: "transparent",
              border: "1px solid var(--border)",
              color: "#1a1a2e",
              cursor: current === 0 ? "default" : "pointer",
              opacity: current === 0 ? 0.35 : 1,
            }}
          >
            ← Previous set
          </button>
          <div style={{ color: "#1a1a2e" }}>
            {(() => {
              const sc = setScore(set.docId);
              return (
                <>
                  Set score:{" "}
                  <b style={{ color: "var(--gold)", fontSize: 16 }}>
                    {sc.good}/{sc.total}
                  </b>{" "}
                  {sc.bad > 0 && (
                    <span style={{ color: "var(--red)" }}>
                      ({sc.bad} missed)
                    </span>
                  )}
                  {sc.good + sc.bad === sc.total && sc.good < 8 && (
                    <>
                      <br />
                      <span style={{ color: "var(--red)", fontSize: 12 }}>
                        Below 8/10 redo this set before moving on.
                      </span>
                    </>
                  )}
                </>
              );
            })()}
          </div>
          <button
            disabled={current === DRILLS.length - 1}
            onClick={() =>
              setCurrent((c) => Math.min(DRILLS.length - 1, c + 1))
            }
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              padding: "8px 14px",
              borderRadius: 6,
              background: "transparent",
              border: "1px solid var(--border)",
              color: "#1a1a2e",
              cursor: current === DRILLS.length - 1 ? "default" : "pointer",
              opacity: current === DRILLS.length - 1 ? 0.35 : 1,
            }}
          >
            Next set →
          </button>
        </div>
      </main>
      {!loaded && (
        <div
          style={{
            textAlign: "center",
            color: "#8b949e",
            fontSize: 12,
            padding: 10,
          }}
        >
          Syncing your saved progress…
        </div>
      )}
    </div>
  );
}
