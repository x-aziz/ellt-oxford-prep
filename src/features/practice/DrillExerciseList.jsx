import { useNavigate, useParams } from 'react-router-dom';
import { READING_DRILL_TYPES } from '../../data/readingDrillTypes.js';
import { LISTENING_DRILL_TYPES } from '../../data/listeningDrillTypes.js';
import { WRITING_DRILL_TYPES } from '../../data/writingDrillTypes.js';

const TYPES_BY_SKILL = {
  reading: READING_DRILL_TYPES,
  listening: LISTENING_DRILL_TYPES,
  writing: WRITING_DRILL_TYPES,
};

export default function DrillExerciseList() {
  const { skill, typeKey } = useParams();
  const navigate = useNavigate();
  const types = TYPES_BY_SKILL[skill] || [];
  const type = types.find((t) => t.key === typeKey);

  if (!type) {
    return (
      <div className="tcy-page">
        <div className="tcy-strip" />
        <div className="adm-empty" style={{ padding: 40 }}>Not found.</div>
      </div>
    );
  }

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button className="tcy-hub-back" onClick={() => navigate(`/practice/${skill}`)}>← All question types</button>
          <h1>{type.icon} {type.label}</h1>
        </div>
      </div>

      <div className="tcy-cards">
        {type.exercises.map((ex, i) => (
          <div className="tcy-card" key={ex.id}>
            <div className="tcy-card-top">
              <div className="tcy-card-title">Exercise {i + 1} — {ex.title}</div>
              <button className="tcy-btn-gold" onClick={() => navigate(`/practice/${skill}/${typeKey}/${ex.id}`)}>
                Start
              </button>
            </div>
            <div className="tcy-card-desc">
              <span className="lbl">Description</span>
              {ex.sub && <div>{ex.sub}</div>}
              {ex.focus && <div>🎯 {ex.focus}</div>}
              <div>- {ex.items ? ex.items.length + ' questions' : `${ex.minWords}–${ex.maxWords} words`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}