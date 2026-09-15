/** One speaker at a time. New play / route change bumps the token. */

let token = 0;

export function beginSpeakSession(): number {
  token += 1;
  if (typeof window !== "undefined") {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
  }
  return token;
}

export function isSpeakSession(t: number): boolean {
  return t === token;
}

export function stopSpeakSession() {
  token += 1;
  if (typeof window !== "undefined") {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    if (navigator.mediaSession) {
      try {
        navigator.mediaSession.playbackState = "none";
      } catch {
        /* ignore */
      }
    }
  }
}
