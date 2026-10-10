import { useEffect, useState } from "react";
import { buildVoiceMap, rankedVoices, whenVoicesReady } from "../mocks/voices.js";

/*
  Audio for the listening drills (browser text-to-speech using the
  "Google UK English Male / Female" voices restricted in voices.js).

  A script is either a plain string (one voice) or an array of segments:
    { v: 0|1|2, t: "text" }            spoken by voice number v
    { v, t, sys: true }                a short spoken label such as "Speaker A."
  Long segments are cut at sentence/comma boundaries into chunks of <=170
  characters (Chrome's Google voices cut off long utterances), with short
  natural pauses between chunks and longer ones when the speaker changes.
*/

const MAX_CHUNK = 170;
const RATE = 0.94;

let current = null; // { cancel, onInterrupt } for the clip that is playing
let pinned = null; // keeps the active utterance referenced (Chrome GC bug)

export const speechSupported = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  typeof window.SpeechSynthesisUtterance !== "undefined";

function preferredVoiceName() {
  try {
    return localStorage.getItem("ellt_voice") || "";
  } catch {
    return "";
  }
}

function splitText(text) {
  const sentences = String(text)
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?…])\s+/);
  const pieces = [];
  sentences.forEach((s) => {
    if (s.length <= MAX_CHUNK + 30) {
      pieces.push(s);
      return;
    }
    let buf = "";
    s.split(/(?<=[,;:])\s+/).forEach((part) => {
      if (buf && (buf + " " + part).length > MAX_CHUNK) {
        pieces.push(buf);
        buf = part;
      } else buf = buf ? buf + " " + part : part;
    });
    if (buf) pieces.push(buf);
  });
  const out = [];
  let buf = "";
  pieces.forEach((p) => {
    if (buf && (buf + " " + p).length > MAX_CHUNK) {
      out.push(buf);
      buf = p;
    } else buf = buf ? buf + " " + p : p;
  });
  if (buf) out.push(buf);
  return out;
}

export function toChunks(script) {
  const segs = typeof script === "string" ? [{ v: 0, t: script }] : script || [];
  const out = [];
  segs.forEach((s) => {
    if (s.sys) {
      out.push({ v: s.v || 0, text: s.t, pause: 380 });
      return;
    }
    splitText(s.t).forEach((text) =>
      out.push({ v: s.v || 0, text, pause: 150 }),
    );
  });
  return out;
}

/** Readable transcript (system labels removed). names = optional speaker names. */
export function toTranscript(script, names) {
  if (typeof script === "string") return script;
  return (script || [])
    .filter((s) => !s.sys)
    .map((s) => (names ? `${names[s.v] || ""}: ` : "") + s.t)
    .join("\n\n");
}

export function stopAll() {
  const c = current;
  current = null;
  if (c) {
    c.cancel();
    c.onInterrupt?.();
  } else if (speechSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Plays a script. Returns a cancel() function.
 * Callbacks: onEnd() finished naturally, onInterrupt() another clip took over,
 * onError("blocked" | "unsupported").
 */
export function playScript(script, { onEnd, onInterrupt, onError } = {}) {
  if (!speechSupported()) {
    onError?.("unsupported");
    return () => {};
  }
  stopAll();
  const synth = window.speechSynthesis;
  const chunks = toChunks(script);
  if (!chunks.length) {
    onEnd?.();
    return () => {};
  }
  const speakers = chunks.reduce((m, c) => Math.max(m, c.v + 1), 1);
  let cancelled = false;
  let started = false;
  let i = 0;
  let vmap = [];
  let stopWaiting = () => {};
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const me = { onInterrupt, cancel };

  function cancel() {
    if (cancelled) return;
    cancelled = true;
    stopWaiting();
    timers.forEach(clearTimeout);
    if (current === me) current = null;
    pinned = null;
    synth.cancel();
  }

  function finish() {
    cancelled = true;
    if (current === me) current = null;
    pinned = null;
    onEnd?.();
  }

  function next() {
    if (cancelled) return;
    if (i >= chunks.length) return finish();
    const c = chunks[i++];
    const u = new window.SpeechSynthesisUtterance(c.text);
    const entry = vmap[c.v] || { voice: null, pitch: 1 };
    if (entry.voice) {
      u.voice = entry.voice;
      u.lang = entry.voice.lang;
    } else {
      u.lang = "en-GB";
    }
    u.rate = RATE;
    u.pitch = entry.pitch;
    u.onstart = () => {
      started = true;
    };
    u.onend = () => {
      if (cancelled) return;
      const n = chunks[i];
      later(next, !n ? 250 : n.v !== c.v ? 650 : c.pause);
    };
    u.onerror = (e) => {
      if (cancelled) return;
      if (e.error === "interrupted" || e.error === "canceled") return;
      if (e.error === "not-allowed") {
        cancel();
        onError?.("blocked");
        return;
      }
      later(next, 100);
    };
    pinned = u;
    synth.speak(u);
  }

  current = me;
  synth.cancel();
  stopWaiting = whenVoicesReady(() => {
    if (cancelled) return;
    vmap = buildVoiceMap(speakers, preferredVoiceName());
    later(next, 200);
  });
  later(() => {
    if (!started && !cancelled) {
      cancel();
      onError?.("blocked");
    }
  }, 8000);
  return cancel;
}

/** "checking" | "ok" | "missing" (Google UK voices not installed) | "unsupported" */
export function useUkVoiceStatus(active = true) {
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    if (!active) return undefined;
    if (!speechSupported()) {
      setStatus("unsupported");
      return undefined;
    }
    return whenVoicesReady(
      () => setStatus(rankedVoices().length ? "ok" : "missing"),
      2500,
    );
  }, [active]);
  return status;
}