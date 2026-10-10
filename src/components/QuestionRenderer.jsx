/*
  Renders any question object from the reading/listening mock data with a
  single component. All mock question types funnel through here:

    mc / v / inf / p / e / g / gist  -> lettered options (q.opts, q.ans = index)
    tf                                -> True / False / Not Given(Mentioned)
    gap                               -> free-text input, checked loosely (trim + lowercase)
    spk                               -> speaker select (Speaker A/B/C/None)
*/

const TAG_LABEL = {
  mc: "COMPREHENSION",
  v: "VOCABULARY",
  inf: "INFERENCE",
  p: "PARAPHRASE",
  e: "EXCEPT",
  g: "GIST",
  gist: "GENERAL GIST",
  tf: "TRUE / FALSE / NOT GIVEN",
  gap: "GAP FILL",
  spk: "SPEAKER MATCH",
};

const TAG_CLASS = {
  mc: "tag-c",
  v: "tag-v",
  inf: "tag-i",
  p: "tag-p",
  e: "tag-e",
  g: "tag-o",
  gist: "tag-gist",
  tf: "tag-tf",
  gap: "tag-gap",
  spk: "tag-spk",
};

export function normalizeGap(s) {
  return (s || "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

export function isCorrect(q, answer) {
  if (q.type === "gap") return normalizeGap(answer) === normalizeGap(q.ans);
  return answer === q.ans;
}

export default function QuestionRenderer({
  q,
  number,
  answer,
  submitted,
  onAnswer,
  tfLabels = ["True", "False", "Not Given"],
  spkLabels = ["Speaker A", "Speaker B", "Speaker C", "None of the speakers"],
}) {
  const answered = answer !== undefined && answer !== "";
  const correct = submitted && isCorrect(q, answer);
  const wrong = submitted && answered && !correct;

  let cardClass = "qcard";
  if (submitted) cardClass += correct ? " correct" : wrong ? " wrong" : "";
  else if (answered) cardClass += " answered";

  return (
    <div className={cardClass}>
      <div className="q-meta">
        <div className="q-num">{number}</div>
        <span className={"q-tag " + (TAG_CLASS[q.type] || "tag-c")}>
          {TAG_LABEL[q.type] || "QUESTION"}
        </span>
      </div>
      <div className="q-text">{q.text}</div>

      {q.type === "gap" && (
        <>
          <input
            className={
              "gap-input" +
              (submitted ? (isCorrect(q, answer) ? " ok" : " wrong") : "")
            }
            type="text"
            placeholder="Type 1–3 exact words…"
            value={answer || ""}
            disabled={submitted}
            onChange={(e) => onAnswer(e.target.value)}
          />
          {q.hint && !submitted && (
            <div className="gap-hint">Hint: {q.hint}</div>
          )}
        </>
      )}

      {q.type === "spk" && (
        <select
          className={
            "spk-sel" +
            (submitted ? (isCorrect(q, answer) ? " ok" : " wrong") : "")
          }
          disabled={submitted}
          value={answer ?? ""}
          onChange={(e) =>
            onAnswer(e.target.value === "" ? undefined : Number(e.target.value))
          }
        >
          <option value=""> Select speaker </option>
          {spkLabels.map((lbl, i) => (
            <option key={i} value={i}>
              {lbl}
            </option>
          ))}
        </select>
      )}

      {q.type === "tf" && (
        <div className="tf-row">
          {tfLabels.map((lbl, i) => {
            let cls = "tfb";
            if (submitted) {
              if (i === q.ans) cls += " ok";
              else if (answer === i) cls += " wrong";
            } else if (answer === i) cls += " sel";
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={submitted}
                onClick={() => onAnswer(i)}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      )}

      {!["gap", "spk", "tf"].includes(q.type) &&
        q.opts?.map((opt, i) => {
          let cls = "opt";
          if (submitted) {
            if (i === q.ans) cls += " ok";
            else if (answer === i && i !== q.ans) cls += " wrong";
          } else if (answer === i) cls += " sel";
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={submitted}
              onClick={() => onAnswer(i)}
            >
              <span className="opt-l">{String.fromCharCode(65 + i)}</span>
              <span>{opt.length > 3 ? opt.slice(3) : opt}</span>
            </button>
          );
        })}

      {submitted && (
        <div className="exp">
          <div className={"exp-ans " + (correct ? "ok" : "wrong")}>
            {correct
              ? "✓ Correct"
              : "✗ Correct answer: " +
                (q.type === "gap"
                  ? `"${q.ans}"`
                  : q.type === "spk"
                    ? spkLabels[q.ans]
                    : q.type === "tf"
                      ? tfLabels[q.ans]
                      : String.fromCharCode(65 + q.ans))}
          </div>
          {q.ev && <div className="exp-ev">“{q.ev}”</div>}
          {q.why && <div className="exp-why">{q.why}</div>}
          {q.trap && <div className="exp-trap">⚠ TRAP: {q.trap}</div>}
        </div>
      )}
    </div>
  );
}
