import { useEffect, useState } from 'react';
import { useAuth } from '../App.jsx';
import { saveAttempt, subscribeAttempts } from '../services/firestore.js';

/**
 * Live list of the signed-in user's attempts (mock exams + writing sets),
 * newest first, plus a helper to record a new one.
 *
 *   const { attempts, recordAttempt } = useAttempts();
 *   await recordAttempt({ kind:'reading', refId:1, title:'...', score:24, total:32, pct:75, band:'Level 6.5', sections:[...] });
 */
export function useAttempts() {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setAttempts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeAttempts(
      user.uid,
      (data) => {
        setAttempts(data);
        setLoading(false);
      },
      (err) => {
        console.error('subscribeAttempts failed', err);
        setLoading(false);
      },
    );
    return unsub;
  }, [user]);

  const recordAttempt = (attempt) => {
    if (!user) return Promise.resolve();
    return saveAttempt(user.uid, attempt);
  };

  return { attempts, loading, recordAttempt };
}
