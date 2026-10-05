import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from '../App.jsx';

/** True once the signed-in user's profile doc has role: 'admin'. There is no
 *  client-side way to grant this (by design) — see the README for how to
 *  set it in the Firebase console. */
export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setIsAdmin(snap.data()?.role === 'admin');
        setLoading(false);
      },
      (err) => {
        console.error('useAdmin snapshot failed', err);
        setIsAdmin(false);
        setLoading(false);
      },
    );
    return unsub;
  }, [user]);

  return { isAdmin, loading };
}
