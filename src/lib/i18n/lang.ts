import { create } from "zustand";
import { persist } from "zustand/middleware";
import { langFromPath } from "./path";

export type Lang = "zh" | "en";

const COOKIE = "tuzhi-lang";

function readCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )tuzhi-lang=(zh|en)/);
  return m ? (m[1] as Lang) : null;
}

function writeCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

export const useLang = create<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  syncFromPath: (pathname: string) => void;
}>()(
  persist(
    (set) => ({
      lang: "zh",
      setLang: (lang) => {
        writeCookie(lang);
        set({ lang });
      },
      syncFromPath: (pathname) => {
        const next = langFromPath(pathname);
        writeCookie(next);
        set({ lang: next });
      },
    }),
    {
      name: "tuzhi-lang",
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (typeof window !== "undefined") {
          const fromPath = langFromPath(window.location.pathname);
          if (fromPath !== state.lang) {
            state.setLang(fromPath);
            return;
          }
        }
        const cookie = readCookie();
        if (cookie && cookie !== state.lang) state.setLang(cookie);
        else writeCookie(state.lang);
      },
    },
  ),
);

export function getLang(): Lang {
  return useLang.getState().lang;
}
