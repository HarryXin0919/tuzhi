/** Phone-like UA or a small touch screen. WeChat in-app browser counts as phone. */
export function isLikelyPhone(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod|Android.+Mobile|webOS|BlackBerry|IEMobile|Opera Mini|MicroMessenger|Mobile/i.test(ua)) {
    return true;
  }
  const touch = navigator.maxTouchPoints > 0;
  const narrow = typeof window !== "undefined" && window.innerWidth < 900;
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  return touch && (narrow || coarse);
}

export function isWeChat(): boolean {
  if (typeof navigator === "undefined") return false;
  return /MicroMessenger/i.test(navigator.userAgent || "");
}
