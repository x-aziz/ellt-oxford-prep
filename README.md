# ELLT Oxford Prep

A React + Firebase rebuild of your four standalone HTML practice tools
(`RealVersion-reading.html`, `RealVersion-listening.html`,
`WritingFinalPractice.html`, `reading-drill.html`). All original content
(mocks, scripts, drills, model answers) is preserved content now lives in
`src/data/*.js`, generated straight from the HTML files.

## What changed vs. the HTML files

- Login / signup (Firebase Auth) so progress isn't tied to one browser.
- Attempts and mistakes now sync to Firestore (`users/{uid}/attempts`,
  `users/{uid}/mistakes`, `users/{uid}/drills`) instead of `localStorage`.
- One shared `Dashboard` links out to Reading, Listening, Writing and the
  weak-spot Drills, and a `My Mistakes` page aggregates every wrong answer
  across mocks so you can revisit them.

## Run it locally

```bash
npm install
npm run dev
```

## Firebase setup

`src/services/firebase.js` already has the web config for the
`ellt-oxford-prep` project. Two things you still need to do in the
[Firebase console](https://console.firebase.google.com/project/ellt-oxford-prep):

1. **Enable Email/Password auth** Authentication → Sign-in method → Email/Password.
2. **Deploy the Firestore rules** in `firestore.rules` (they currently block
   everything, per the default Spark-plan project). With the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules
   ```
   Or paste the contents of `firestore.rules` into the console's Rules tab.
   The rules only let a signed-in user read/write their own `users/{uid}/…`
   documents nobody can read anyone else's data.

## Admin managing content (mocks & drills)

Students no longer see hardcoded content. Every mock test and drill set on
the dashboard comes live from Firestore (`mocks` and `drills` collections),
and an **admin** account can create, edit, and delete all of it from inside
the app no code changes needed afterwards.

### One-time setup

1. **Deploy the updated rules** (`firestore.rules` now also protects the new
   `mocks`/`drills` collections and stops anyone from granting themselves
   admin). In the Firebase console → Firestore → Rules, paste in the
   contents of `firestore.rules` and publish. (Or `firebase deploy --only
firestore:rules` if you have the CLI.)
2. **Register a normal account** in the app first (Sign up, as any student
   would).
3. **Make that account an admin** this can only be done from the Firebase
   console, by design (so nobody can grant themselves admin from the app):
   - Firebase console → Firestore → Data → `users` collection → find your
     document (its ID is your Firebase Auth user ID Authentication tab
     shows which email maps to which ID).
   - Add a field: `role` (type: string) = `admin`.
   - Save.
4. Reload the app and sign in. You'll now see an **⚙ Admin** link in the top
   navigation.

### Using the admin panel

Open **⚙ Admin**. There are tabs for Reading Mocks, Reading Drills,
Listening Mocks, Listening Drills, and Writing Drills.

- **"Import bundled default content"** (top of the page) one click, pushes
  everything that used to be hardcoded (4 reading mocks, 8 listening mocks,
  10 writing structures, 6 reading drill sets) into Firestore, so you start
  with real content instead of an empty dashboard. Safe to click more than
  once it won't duplicate anything.
- **"+ New"** on any tab opens a form: a few simple fields (title, focus,
  order…) plus one "Content data" box that holds the actual
  questions/items as JSON. Editing an existing item pre-fills that box with
  its current content, so the easiest way to add a new mock or drill is to
  edit a copy of one that's already there and change the text.
- **Edit** / **Delete** on any row does exactly what it says changes are
  live for students immediately, no publishing step.
- **Listening Drills** starts empty (there wasn't any listening drill
  content yet) add sets the same way; they'll appear on the student
  dashboard under Listening → Drills automatically.

### What the JSON content looks like

- **Reading mock**: `{ s1: { paras: [...], qs: [...] }, s2: { textHtml, options, qs }, s3: { passHtml, qs } }`
- **Listening mock**: `{ s1: { script, trapNote, qs }, s2: {...}, s3: {...} }`
- **Reading/Listening drill set**: `{ items: [{ p, a, why }, ...] }` (p = prompt/question text, a = answer, why = explanation)
- **Writing drill set**: `{ drills: [{ prompt, instruction, model, why, keywords }, ...] }`

Clicking "+ New" pre-fills a valid example of each shape, so you can see the
pattern and extend it.

## Project structure

```
src/
  data/               reading/listening mocks, writing structures, weak-spot drills
  components/         Navbar, QuestionRenderer (shared by all mock types)
  hooks/               useAttempt (save/subscribe attempts), useUserProgress (dashboard stats)
  services/            firebase.js (init), firestore.js (all reads/writes)
  features/
    auth/              Login, Register
    dashboard/         Dashboard
    mocks/             MockExam (handles both Reading and Listening)
    practice/          PracticeSession (the 6 weak-spot drill sets)
    writing/           WritingWorkspace (the 10 sentence-structure drills)
    mistakes/          MistakeReview
```
