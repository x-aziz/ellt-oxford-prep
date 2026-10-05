import { useEffect, useState } from 'react';
import { subscribeDrills } from '../services/content.js';

/** Live list of admin-published drill sets for a skill
 *  ('reading' | 'listening' | 'writing'). */
export function useDrills(kind) {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeDrills(
      kind,
      (rows) => {
        setDrills(rows);
        setLoading(false);
      },
      (err) => {
        console.error('subscribeDrills failed', err);
        setLoading(false);
      },
    );
    return unsub;
  }, [kind]);

  return { drills, loading };
}
