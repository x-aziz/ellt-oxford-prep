import { useNavigate, useParams } from 'react-router-dom';
import { READING_DRILL_TYPES } from '../../data/readingDrillTypes.js';
import { LISTENING_DRILL_TYPES } from '../../data/listeningDrillTypes.js';
import { WRITING_DRILL_TYPES } from '../../data/writingDrillTypes.js';

const SKILL_META = {
  reading: { label: 'Reading', types: READING_DRILL_TYPES },
  listening: { label: 'Listening', types: LISTENING_DRILL_TYPES },
  writing: { label: 'Writing', types: WRITING_DRILL_TYPES },
};

// exercise.count = number of gradable questions (gaps, paragraphs, items)
function countItems(type) {
  return type.exercises.reduce(
    (n, ex) => n + (ex.count ?? (ex.items ? ex.items.length : 1)),
    0,
  );
}

export default function DrillTypesHub() {
  const { skill } = useParams();
  const navigate = useNavigate();
  const meta = SKILL_META[skill];

  if (!meta) return <div className="adm-empty">Unknown skill.</div>;

  return (
    <div className="tcy-page">
      <div className="tcy-strip" />
      <div className="tcy-page-head">
        <div>
          <button className="tcy-hub-back" onClick={() => navigate('/')}>← Dashboard</button>
          <h1>{meta.label} Weak-Spot Drills</h1>
        </div>
        <span className="who">Pick a question type to practise</span>
      </div>

      <div className="tcy-cards">
        {meta.types.map((t) => {
          const totalItems = countItems(t);
          return (
            <div className="tcy-card" key={t.key}>
              <div className="tcy-card-top">
                <div className="tcy-card-title">
                  <span className="ic">{t.icon}</span>
                  {t.label}
                </div>
                <button className="tcy-btn-gold" onClick={() => navigate(`/practice/${skill}/${t.key}`)}>
                  Practice
                </button>
              </div>
              <div className="tcy-card-desc">
                <span className="lbl">Description</span>
                <div>{t.desc}</div>
                <div>- {t.exercises.length} exercise{t.exercises.length === 1 ? '' : 's'} · {totalItems} questions</div>
                {skill === 'listening' && <div>- 🎧 Audio included (Google UK English voices)</div>}
              </div>
            </div>
          );
        })}

        {skill === 'writing' && (
          <div className="tcy-card">
            <div className="tcy-card-top">
              <div className="tcy-card-title">
                <span className="ic">🔗</span>
                Sentence Structures
              </div>
              <button className="tcy-btn-gold" onClick={() => navigate('/writing')}>
                Practice
              </button>
            </div>
            <div className="tcy-card-desc">
              <span className="lbl">Description</span>
              <div>Connector & cohesion drills (however, despite, as well as…) with Band 6 models.</div>
              <div>- 10 structures · 100 drills</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}