import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { useAuth } from "../App.jsx";

/**
 * Single source of truth for the display name shown anywhere in the UI.
 * Never falls back to email   only the name saved on the Firestore profile
 * (written at registration) or, failing that, the Firebase Auth displayName.
 */
export function useProfile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  useEffect(() => {
    if (!user) {
      setDisplayName("");
      return;
    }
    setDisplayName(user.displayName || "");
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        const data = snap.data();
        if (data?.displayName) setDisplayName(data.displayName);
      },
      (err) => console.error("useProfile snapshot failed", err),
    );
    return unsub;
  }, [user]);

  return { displayName: displayName || "Student" };
}
