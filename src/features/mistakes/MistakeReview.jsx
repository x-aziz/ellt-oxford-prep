import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../App.jsx';
import { removeMistake, subscribeMistakes } from '../../services/firestore.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'reading', label: 'Reading' },
  { key: 'listening', label: 'Listening' },
];

export default function MistakeReview() {
  const { user } = useAuth();
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsub = subscribeMistakes(
      user.uid,
      (data) => {
        setMistakes(data);
        setLoading(false);
      },
      (err) => {
        console.error('subscribeMistakes failed', err);
        setLoading(false);
      },
    );
    return unsub;
  }, [user]);

  const filtered = useMemo(
    () => mistakes.filter((m) => filter === 'all' || m.source === filter),
    [mistakes, filter],
  );

  const resolve = (id) => {
    if (!user) return;
    removeMistake(user.uid, id).catch((err) => console.error('removeMistake failed', err));
  };

  return (
    <div className="mistakes-wrap">
      <div className="dash-section-title" style={{ marginTop: 0 }}>
        My Mistakes
      </div>
      <div className="kind-toggle">
        {FILTERS.map((f) => (
          <a
            key={f.key}
            href="#"
            className={filter === f.key ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setFilter(f.key);
            }}
          >
            {f.label}
          </a>
        ))}
      </div>

      {loading && <div className="empty-state">Loading…</div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          No mistakes logged here yet. As you take mocks, anything you get wrong is saved
          automatically — come back after your first attempt.
        </div>
      )}

      {filtered.map((m) => (
        <div className="mistake-card" key={m.id}>
          <div className="m-top">
            <span className="m-src">
              {m.source?.toUpperCase()} · {m.sectionLabel} · {m.mockTitle}
            </span>
            {m.timesWrong > 1 && <span className="m-count">missed {m.timesWrong}×</span>}
          </div>
          <div className="m-text">{m.text}</div>
          {m.options ? (
            <>
              <div className="m-you">
                Your answer:{' '}
                {typeof m.yourAnswer === 'number'
                  ? m.options[m.yourAnswer]
                  : m.yourAnswer || '— (not answered)'}
              </div>
              <div className="m-correct">Correct: {m.options[m.correctAnswer]}</div>
            </>
          ) : (
            <>
              <div className="m-you">Your answer: {String(m.yourAnswer || '—')}</div>
              <div className="m-correct">Correct: {String(m.correctAnswer)}</div>
            </>
          )}
          {(m.why || m.trap) && (
            <div className="m-why">
              {m.why}
              {m.trap ? ` ⚠ ${m.trap}` : ''}
            </div>
          )}
          <button className="m-resolve" onClick={() => resolve(m.id)}>
            ✓ Mark as reviewed
          </button>
        </div>
      ))}
    </div>
  );
}
