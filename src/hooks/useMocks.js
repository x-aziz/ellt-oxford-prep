import { useEffect, useState } from 'react';
import { subscribeMocks } from '../services/content.js';

/** Live list of admin-published mocks for a skill ('reading' | 'listening'). */
export function useMocks(kind) {
  const [mocks, setMocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeMocks(
      kind,
      (rows) => {
        setMocks(rows);
        setLoading(false);
      },
      (err) => {
        console.error('subscribeMocks failed', err);
        setLoading(false);
      },
    );
    return unsub;
  }, [kind]);

  return { mocks, loading };
}
