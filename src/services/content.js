import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase.js";

/*
  Shared, admin-managed content   NOT under users/{uid}. Three top-level
  collections, all readable by anyone signed in, writable only by admins
  (enforced in firestore.rules):

  mocks/{kind}-{id}   { kind: 'reading'|'listening'|'writingMock', id, title, focus, s1, s2, s3, ... }
  drills/{autoId}     { kind: 'reading'|'listening'|'writing', order, ...fields }
  tests/test-{id}     { id, title, focus, readingMockId, listeningMockId, writingMockId }   <-- NEW
                      A "Full Test" = one Reading mock + one Listening mock + one Writing mock,
                      shown to students as a single block on the dashboard.

  Firestore rejects `undefined`, and can't serialize functions/Dates as-is  
  round-tripping through JSON strips both safely.
*/
const clean = (obj) => JSON.parse(JSON.stringify(obj));

/* ---------------- mocks ---------------- */

export function subscribeMocks(kind, onData, onError) {
  const q = query(collection(db, "mocks"), where("kind", "==", kind));
  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      rows.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      onData(rows);
    },
    onError,
  );
}

/** mock.id is the display number (1, 2, 3…)   the Firestore doc id is derived
 *  from it so re-saving the same mock number overwrites in place. */
export function saveMock(kind, mock) {
  const docId = `${kind}-${mock.id}`;
  return setDoc(doc(db, "mocks", docId), {
    ...clean(mock),
    kind,
    updatedAt: serverTimestamp(),
  });
}

export function deleteMock(docId) {
  return deleteDoc(doc(db, "mocks", docId));
}

/* ---------------- full tests (Reading + Listening + Writing) ---------------- */

export function subscribeTests(onData, onError) {
  return onSnapshot(
    collection(db, "tests"),
    (snap) => {
      const rows = snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      rows.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      onData(rows);
    },
    onError,
  );
}

/** test.id is the display number (Test 1, Test 2…); re-saving the same number overwrites. */
export function saveTest(test) {
  const { docId: _omit, ...rest } = test;
  return setDoc(doc(db, "tests", `test-${rest.id}`), {
    ...clean(rest),
    updatedAt: serverTimestamp(),
  });
}

export function deleteTest(docId) {
  return deleteDoc(doc(db, "tests", docId));
}

/* ---------------- drills ---------------- */

export function subscribeDrills(kind, onData, onError) {
  const q = query(collection(db, "drills"), where("kind", "==", kind));
  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      onData(rows);
    },
    onError,
  );
}

/** Pass docId to update an existing drill set, or null to create a new one. */
export function saveDrill(kind, docId, data) {
  if (docId) {
    return updateDoc(doc(db, "drills", docId), {
      ...clean(data),
      kind,
      updatedAt: serverTimestamp(),
    });
  }
  return addDoc(collection(db, "drills"), {
    ...clean(data),
    kind,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function deleteDrill(docId) {
  return deleteDoc(doc(db, "drills", docId));
}
