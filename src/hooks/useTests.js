import { useEffect, useState } from 'react';
import { subscribeTests } from '../services/content.js';

/** Live list of admin-created Full Tests (Reading + Listening + Writing). */
export function useTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeTests(
      (rows) => {
        setTests(rows);
        setLoading(false);
      },
      (err) => {
        console.error('subscribeTests failed', err);
        setLoading(false);
      },
    );
  }, []);

  return { tests, loading };
}