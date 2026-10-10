import { useEffect, useState } from "react";

/*
  Picks the most natural-sounding English voices the browser offers and gives
  every speaker a different one (men and women alternate, so an interview
  sounds like two real people).

  By request, the selectable/used voice set is restricted to exactly:
    - Google UK English Male
    - Google UK English Female
  (Chrome/Edge on most platforms ship both of these by default.)
*/

const ALLOWED_VOICE_NAMES = ["Google UK English Male", "Google UK English Female"];

const MALE =
  /\b(ryan|thomas|guy|davis|daniel|oliver|arthur|george|james|alfie|noah|ethan|male|alex|tom|rishi|gordon|lee|aaron)\b/i;
const FEMALE =
  /\b(sonia|libby|maisie|aria|jenny|samantha|kate|serena|female|karen|moira|susan|hazel|amy|emma|joanna|nicole|olivia|fiona|tessa|victoria|zira|clara|natasha)\b/i;
const BAD =
  /espeak|compact|novelty|bad news|bells|boing|bubbles|cellos|deranged|good news|hysterical|pipe organ|trinoids|whisper|zarvox|albert|junior|ralph|kathy|bahh|organ|fred/i;

const FALLBACK_PITCH = [1, 0.85, 1.12];

export function genderOf(v) {
  if (MALE.test(v.name)) return "male";
  if (FEMALE.test(v.name)) return "female";
  return "unknown";
}

export function scoreVoice(v) {
  const n = (v.name || "").toLowerCase();
  const l = (v.lang || "").replace("_", "-").toLowerCase();
  let s = 0;
  if (/natural|neural/.test(n)) s += 100;
  else if (/online/.test(n)) s += 80;
  if (/enhanced|premium/.test(n)) s += 60;
  if (/google uk english/.test(n)) s += 55;
  else if (/^google/.test(n)) s += 35;
  if (l === "en-gb") s += 30;
  else if (/^en-(au|ie|za|nz|ca)/.test(l)) s += 15;
  else if (l === "en-us") s += 10;
  if (BAD.test(n)) s -= 200;
  return s;
}

/** English voices, best first — restricted to the two allowed Google UK voices. */
export function rankedVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return (window.speechSynthesis.getVoices() || [])
    .filter((v) => ALLOWED_VOICE_NAMES.includes(v.name))
    .map((v) => ({ v, s: scoreVoice(v) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.v);
}

/** One { voice, pitch } per speaker. Speaker 0 = the narrator / interviewer. */
export function buildVoiceMap(count, preferredName = "") {
  const ranked = rankedVoices();
  if (!ranked.length) {
    return Array.from({ length: count }, (_, i) => ({ voice: null, pitch: FALLBACK_PITCH[i % 3] }));
  }
  const wanted = ["male", "female", "male", "female"];
  const used = new Set();
  const out = [];
  for (let i = 0; i < count; i++) {
    const free = ranked.filter((v) => !used.has(v.name));
    let voice = null;
    let shared = false;
    if (i === 0 && preferredName) voice = ranked.find((v) => v.name === preferredName) || null;
    if (!voice && free.length) {
      const best = free[0];
      const floor = scoreVoice(best) - 40; // only swap in a voice of similar quality
      voice = free.find((v) => genderOf(v) === wanted[i % 4] && scoreVoice(v) >= floor) || best;
    }
    if (!voice) {
      voice = ranked[i % ranked.length];
      shared = true;
    }
    used.add(voice.name);
    out.push({ voice, pitch: shared ? FALLBACK_PITCH[i % 3] : 1 });
  }
  return out;
}

/** Browsers load voices asynchronously — wait for them (max `timeout` ms), then call cb. Returns a cancel fn. */
export function whenVoicesReady(cb, timeout = 1500) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    cb();
    return () => {};
  }
  const synth = window.speechSynthesis;
  if ((synth.getVoices() || []).length) {
    cb();
    return () => {};
  }
  let done = false;
  let t;
  const finish = () => {
    if (done) return;
    done = true;
    synth.removeEventListener?.("voiceschanged", finish);
    clearTimeout(t);
    cb();
  };
  synth.addEventListener?.("voiceschanged", finish);
  t = setTimeout(finish, timeout);
  return () => {
    done = true;
    synth.removeEventListener?.("voiceschanged", finish);
    clearTimeout(t);
  };
}

/** A ready-to-speak utterance using the chosen (or best) voice. Used by the volume check. */
export function sampleUtterance(text, preferredName = "") {
  const u = new SpeechSynthesisUtterance(text);
  const entry = buildVoiceMap(1, preferredName)[0];
  if (entry.voice) {
    u.voice = entry.voice;
    u.lang = entry.voice.lang;
  } else {
    u.lang = "en-GB";
  }
  u.rate = 0.93;
  u.pitch = entry.pitch;
  return u;
}

/** Voice list for the "choose a voice" dropdown on the volume-check screen. */
export function useVoiceList(active) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!active) return;
    return whenVoicesReady(() =>
      setList(rankedVoices().map((v) => ({ name: v.name, lang: v.lang, natural: scoreVoice(v) >= 80 }))),
    );
  }, [active]);
  return list;
}
