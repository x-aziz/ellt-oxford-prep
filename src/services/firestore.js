import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

/*
  Data model (everything lives under the signed-in user):

  users/{uid}                       { email, displayName, createdAt }
  users/{uid}/attempts/{autoId}     { kind, refId, title, score, total, pct, band, sections[], createdAt }
  users/{uid}/mistakes/{questionId} { skill, source, text, options[], yourAnswer, correctAnswer, why, ev, trap, timesWrong, updatedAt }
  users/{uid}/drills/{setKey}       { marks: { "0": "good" | "bad", ... }, updatedAt }
*/

// Firestore rejects `undefined` values   strip them.
const clean = (obj) => JSON.parse(JSON.stringify(obj));

export async function ensureUserProfile(user, displayName) {
  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      displayName: displayName || user.displayName || "",
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

/* ---------- attempts (mock exams + writing sets) ---------- */

export function saveAttempt(uid, attempt) {
  return addDoc(collection(db, "users", uid, "attempts"), {
    ...clean(attempt),
    createdAt: serverTimestamp(),
  });
}

export function subscribeAttempts(uid, onData, onError) {
  const q = query(
    collection(db, "users", uid, "attempts"),
    orderBy("createdAt", "desc"),
    limit(300),
  );
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  );
}

/* ---------- mistakes ---------- */

/** Save (or update) wrong answers. bump=true increments the "times wrong" counter. */
export async function recordMistakes(uid, mistakes, { bump = true } = {}) {
  if (!mistakes.length) return;
  const batch = writeBatch(db);
  mistakes.forEach((m) => {
    const { id, ...rest } = clean(m);
    batch.set(
      doc(db, "users", uid, "mistakes", id),
      {
        ...rest,
        ...(bump ? { timesWrong: increment(1) } : {}),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  });
  await batch.commit();
}

export function removeMistake(uid, id) {
  return deleteDoc(doc(db, "users", uid, "mistakes", id));
}

export function subscribeMistakes(uid, onData, onError) {
  const q = query(
    collection(db, "users", uid, "mistakes"),
    orderBy("updatedAt", "desc"),
  );
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  );
}

/* ---------- reading drill self-check marks ---------- */

/** Returns { [setKey]: { [idx]: 'good' | 'bad' } } */
export async function getDrillMarks(uid) {
  const snap = await getDocs(collection(db, "users", uid, "drills"));
  const out = {};
  snap.forEach((d) => {
    out[d.id] = d.data().marks || {};
  });
  return out;
}

export function saveDrillMarks(uid, setKey, marks) {
  return setDoc(doc(db, "users", uid, "drills", setKey), {
    marks: clean(marks),
    updatedAt: serverTimestamp(),
  });
}
