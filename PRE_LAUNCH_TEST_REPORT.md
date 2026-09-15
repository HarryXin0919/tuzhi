# Website Pre-Launch Test Report

**Product:** 土知 (Tuzhi) — farmer-facing soil literacy  
**Site:** https://tuzhi.asia  
**Report date:** 2026-09-11  
**Tester roles:** QA / Web Security / SRE / Frontend Performance  

## Executive Summary

Overall Status: **PASS WITH ISSUES**

Launch Recommendation: **CONDITIONAL GO**

Two launch-blocking user-facing defects were reproduced, diagnosed, and fixed before this report:

1. English field-guide copy mixed unexplained Chinese in “easy to mix up”, rate tables, photo captions, and lab indicators.
2. Lesson videos mounted an iframe on page load. Bilibili `player.html` autoplays unless `autoplay=0`; YouTube `allow` also listed autoplay.

After those fixes, core farmer flows (read a guide, switch language, play a video on demand, search, open a lab term, ask in Q&A after sign-in, photo-check empty validation) work. Remaining items are P2/P3 (SEO polish, bundle size, platform-template unit tests, no in-repo E2E suite). They should be scheduled, but they do not block a careful public launch.

**If this site is opened to real farmers today:** they can read 100 guides and 32 lab terms in Chinese or English without Chinese leaking into English body copy; videos stay silent until a tap; accounts are email/phone only; photo-check and Q&A fail closed when offline or unauthenticated.

---

## Test Environment

| Item | Value |
|---|---|
| OS | Linux (Node 22 sandbox) |
| Browser | Chromium via Playwright (desktop 1280×800, mobile 390×844) |
| Node | v22.23.2 |
| Package manager | npm 10.9.8 |
| Framework | TanStack Start / Router / Query, React 19, Vite 8, Tailwind v4 |
| Data | Static JSON guides + PGlite locally / Neon in production |
| Auth | Email/password (Better Auth). No Google. No X. |
| Build mode | `npm run dev` (live) and `CI=true npm run build` (production) |
| Preview | App served on the live preview host; production output 4.9M server function, no `pglite.wasm` |

---

## Test Coverage

| Area | Method | Result |
|---|---|---|
| Functional | Playwright + route crawl + form clicks | Pass (after P0 fixes) |
| UI | Desktop + mobile screenshots, no overflow | Pass |
| Responsive | 1280×800 and 390×844 | Pass |
| Accessibility | Skip link, dialog, labels, 44px targets | Pass with P3 notes |
| Performance | Bundle inventory, lazy images, click-to-play | Pass with P2 notes |
| SEO | robots, sitemap, unique titles, manifest | Pass with P2 notes |
| Security | Auth gate, XSS text render, photo URL allow-list, key scan | Pass |
| API | Diagnose / community server functions, 404 | Pass |
| Compatibility | Chromium tested; Safari notes by code | Pass with notes |
| Build | `npm run typecheck`, `CI=true npm run build` | Pass |
| Deployment | Vercel output, migrate skip without DATABASE_URL | Pass |
| Content | 100 guides, 32 terms, photos on disk, dosage numbers | Pass |

---

## 1. Project understanding

**Stack:** React 19 + TanStack Start (SSR) + Vite 8 + Tailwind v4. Auth via Better Auth (email/password). Community posts in Postgres (PGlite locally, Neon in production). Photo-check calls xAI `grok-4.5` vision only when `XAI_API_KEY` is set. i18n is parallel fields (not runtime translation) plus a zustand+cookie language switch.

**Main pages:** Home, Photo check (`/diagnose`), Field guide (`/knowledge`, `/knowledge/$slug`), Reading the soil test (`/encyclopedia`, `/encyclopedia/$id`), Q&A (`/community`), Me, Sign in, About, Privacy, Contact.

**Core user flows:**

1. Land on home → open a guide → listen / watch / save on this phone.
2. Photograph plant / leaf / soil → Identify → related guides.
3. Look up a lab-sheet word → related field guides.
4. Sign in with email or phone → ask in Q&A → bilingual body (Chinese original on top).
5. Switch 中文 / English for the whole chrome and the 100 guides.

**External dependencies:** xAI chat completions (diagnose + community EN translation), Bilibili player, YouTube nocookie embed, Neon, Better Auth.

**Risk modules (before this pass):** `localize.ts` fallback, `LessonVideo` iframe, `community/server.ts` photo field, diagnose data-URL size, overlay English completeness.

---

## 2. Issues found, root cause, fix

Findings were recorded first. Business rates, pesticide brand names, and video IDs were not changed.

### P0-1 — English body mixed with Chinese

**Repro:** Switch to English on `/knowledge/suan-hua`. Appearance/steps were English. “Easy to mix up”, rate names/notes, photo captions, and indicator meanings stayed Chinese. TTS would have spoken that mix.

**Cause:** `articles-en.json` held English for the 11 long body fields only. `localize.ts` ran a 6-phrase `fallbackEn()` on confuse / dosage / photos / indicators / commonCrops, so almost every string leaked. A previous word-replace fill had written mixed soup (`Acid soil地stall发黄的麦苗`) into extra keys that TypeScript did not even consume.

**Fix:** Whole-string English maps for every unique leak field (lookalike, difference, photoHint, dose name/range/note, alt, caption, indicator name/meaning/typical, commonCrops). Overlay extra keys rewritten with leftover Han = 0. `localize.ts` now prefers those parallel fields. Wiki photo alt/caption localized in `localizeTerm`. Dosage **numbers** checked: 0 drifts vs Chinese source. Forbidden `Sample` / “It is recommended” / pedological wording: 0 hits.

**Verify:** Playwright on English acid-soil, salt, packing, iron lock, waterlog, taking-soil, potassium, same-crop, plus wiki `ph` / `al` / `ec`: **0 Han in `main`**, no `sample`.

### P0-2 — Videos autoplayed

**Repro:** Open any guide with a lesson video. An iframe was in the DOM immediately. Bilibili `player.html` autoplays unless `autoplay=0`.

**Cause:** Iframe mounted on render. Embed URL had no `autoplay=0`. YouTube `allow` included `autoplay`.

**Fix:** Click-to-play poster (`Play on this page` / `在本页播放`). Iframe mounts only after a tap, then `autoplay=1` (user-initiated). Idle embeds use `autoplay=0`. YouTube moved to `youtube-nocookie.com` with `rel=0`. `allow` no longer lists autoplay. Switching Bilibili / English resets the poster.

**Verify:** SSR HTML contains no `player.bilibili` iframe. Playwright: 0 iframes on load; after tap, one nocookie YouTube URL (English default when a matching ID exists).

### Related defects fixed in the same pass

| ID | Severity | Finding | Cause | Fix |
|---|---|---|---|---|
| P1-1 | Critical | Chinese UI showed `Pause` / `Stop` | `messages.zh` copied English TTS labels | `暂停` / `停止` |
| P1-2 | Critical | Wiki English still showed Chinese photo captions | `localizeTerm` passed raw `photos` | English alt/caption from term title + sketch line |
| P1-3 | Critical | `ESP / 钠` linked to `/encyclopedia/na` (404) | `indicatorTermId` returned `"na"` | Map sodium/ESP → `salt`; keep Chinese name for the id |
| P1-4 | Critical | Diagnose accepted huge data URLs | No size cap | 8 MB file / 12 MB data-URL client cap; server rejects oversized `data:image` |
| P1-5 | Critical | Community post/reply had no max length; photo URL unchecked | Trust client | Title ≤120, body ≤4000/2000; photo must be `/images/…` or `https://` |
| P2-1 | Major | Photo grid had no lazy load / no dialog | `<div onClick>` lightbox | `loading=lazy`, `role=dialog`, Escape, close button, restore focus |
| P2-2 | Major | No skip link | Missing | `跳到正文` / `Skip to content` → `#main-content` |
| P2-3 | Major | English search missed overlay titles | Haystack was Chinese JSON only | Include `articles-en-meta` title/subtitle/summary |
| P2-4 | Major | Duplicate `土知` title on every URL | Only root `head` | Unique `<title>` + description on guide, wiki, diagnose, Q&A |
| P2-5 | Major | Mixed 404 copy | Hard-coded bilingual soup | Clean “这一页不在 / This page isn’t here” |
| P3-1 | Minor | Q&A seed photos `alt=""` | Empty alt | Use post title |

---

## 3. Production build

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `CI=true npm run build` | Pass, ~1.2s nitro, migrate skipped without `DATABASE_URL` |
| Server function size | 4.9M; **no** `pglite.wasm` |
| `XAI_API_KEY` in static client | Not present |
| `XAI_API_KEY` in server bundle | `process.env.XAI_API_KEY` only |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Template `npm test` | 182 pass / 13 fail — **platform template tests** (OG injector, “template ships auth off”). Auth is **on by product requirement**. Not waived by changing product logic. |

Build warnings: large SSR chunks (`articles.json` / overlay) gzip ~60–97 kB. Expected for 100 parallel guides. See Performance.

---

## 4. Routes

Crawled:

| URL | Status |
|---|---|
| `/` `/knowledge` `/encyclopedia` `/diagnose` `/community` `/login` `/me` `/about` `/privacy` `/contact` | 200 |
| `/knowledge/suan-hua` `/encyclopedia/ph` | 200 |
| `/no-such-page-xyz` `/knowledge/not-a-slug` `/encyclopedia/not-a-term` `/community/not-a-post` | **404** |

No redirect loop, no white screen, no hydration pageerror in Chromium. Deep links work. Refresh keeps language via `tuzhi-lang` cookie + persist.

---

## 5. Core flows

| Flow | Happy | Edge | Result |
|---|---|---|---|
| Read a guide ZH/EN | Full 4-block template + video poster + listen | Unknown slug → 404 | Pass |
| Play video | Poster → iframe after tap | Switch Bilibili/English resets poster | Pass |
| Search field guide | Alias + EN meta | Empty query lists featured | Pass |
| Photo check | Empty submit shows “至少填 1 张” | Oversized file rejected; no key → friendly off | Pass |
| Q&A | Seed posts render as text | Unauthenticated `/community/new` asks to sign in | Pass |
| Sign in | Empty email → “先写邮箱” | No Google / X buttons | Pass |
| Me | Guest copy; favorites local | Auth required for cloud posts | Pass |

---

## 6. Forms

Tested: login, register tab, diagnose (photos + text + selects), Q&A new (gated), reply (gated).

- Empty, short, and missing email: front-end messages, no crash.
- HTML/JS strings in inputs: rendered as text (no `dangerouslySetInnerHTML` in app routes).
- Double-submit: diagnose `busy` flag; Q&A button uses `publishing`.
- Photo on Q&A compose is not in the current form (server still allow-lists if a client sends one).

---

## 7. Network / API

- 404s return HTTP 404 (`notFound()`), not a 200 SPA shell.
- Diagnose without `XAI_API_KEY` returns `{ ok: false, error: "off" }` and the UI says photo-check is unavailable — no white screen.
- Community seed/load failures catch and return `[]`.
- No CORS errors in Chromium against the app origin.
- Intentional 404 crawls produced `Failed to load resource: 404` console lines only.

---

## 8. Console

Normal visits (home, guide, wiki, diagnose, community): **0 pageerrors**, **0 hydration mismatches**.

---

## 9. Responsive

Mobile 390×844: no horizontal overflow. Bottom 6-tab nav ≥ 44px. Desktop sticky header. Photo lightbox max 90dvh. Touch targets on primary buttons ≥ 44px (`min-h-11` / `min-h-12` / `min-h-14`).

---

## 10. Browser compatibility

Chromium: pass. Firefox/Edge: same modern CSS (flex, grid, sticky, `dvh`) — low risk. Safari notes (code, not run here):

- `speechSynthesis` voices often arrive async (code already waits `voiceschanged`).
- `backdrop-blur` on header is progressive; content remains readable without it.
- Date inputs unused.

---

## 11. Accessibility (WCAG 2.2 AA-oriented)

| Check | Result |
|---|---|
| Skip link | Added |
| Headings | h1 per page, h2 sections |
| Alt text | Guide/wiki photos have alt; Q&A uses title |
| Form labels | Native `placeholder` + visible section titles; login fields are labelled in copy |
| Keyboard | Language toggle, play, lightbox close, nav links are buttons/links |
| Focus | `:focus-visible` ring in `styles.css`; lightbox focuses close |
| Dialog | `role="dialog"` `aria-modal` Escape |
| Color | Forest `#1F6B4A` on paper/cream; not a AAA pair for small muted text (P3) |
| `div onclick` | Photo lightbox no longer the only control; grid items are `<button>` |

P3: lightbox close `aria-label="Close"` stays English in Chinese UI (the visible control is “×”).

---

## 12. SEO

| Asset | Status |
|---|---|
| `robots.txt` | Allow `/`, sitemap `https://tuzhi.asia/sitemap.xml`, **not** noindex |
| `sitemap.xml` | Home, 100 guides, 32 terms, about/privacy/contact/login |
| Unique `<title>` | Guide/wiki/diagnose/Q&A/list pages (e.g. `土壤酸化：土变酸了，苗发僵不长 · 土知`) |
| Meta description | Root + per-page |
| Favicon / apple-touch / manifest | Present, theme `#1F6B4A` |
| Canonical | Not emitted (P2) |
| JSON-LD | None (P3) |
| Open Graph | Platform PWA injector owns `og:*` / Twitter cards — do not duplicate in `__root` |

---

## 13. Performance

| Metric | Assessment |
|---|---|
| LCP | Hero/guide JPGs; click-to-play removes iframe from LCP. Target <2.5s on mid-band is plausible; not Lighthouse-scored in this environment |
| INP | Native buttons, no heavy main-thread animation |
| CLS | Image width/height on cards; gallery has width/height |
| JS | Guide overlay JSON in the client chunk (gzip ~60–97 kB) — P2 |
| Images | Unique JPGs, `loading=lazy` on cards + gallery. No srcset/WebP (P4) |
| Third parties | Bilibili/YouTube **after click only**; xAI server-only |

---

## 14. Images and media

- 200 article photos, 64 wiki photos, seed community photos: **0 missing**.
- No shared fallback cover reuse detected in this pass.
- Captions stay sketches (“don’t fertilise from the picture alone”).
- **No autoplay** on load. No audio autoplay.
- Iframe 16:9 (`aspect-video`).

---

## 15. Security

| Check | Result |
|---|---|
| XSS | Community body/title as React text; no `dangerouslySetInnerHTML` in app routes |
| Photo URL | Allow `/images/` or `https://` only |
| Auth | `createPost` / `addReply` use `authMiddleware`; UI hide ≠ permission |
| Secrets | `XAI_API_KEY` / `DATABASE_URL` not in client static |
| Cookies | Language `SameSite=Lax` (not a session cookie). Session cookies owned by Better Auth |
| CSRF | Same-origin server functions + Better Auth |
| Injection | Parameterized SQL (`sql\`...\``) |
| Headers | HTTPS/CDN at Vercel; no custom CSP (must not block `https://grok.com` platform chrome) |

No offensive testing of third parties.

---

## 16. Authentication

- Email or phone-as-login-name. No Google. No X.
- Protected: new post, reply. Photo-check does not require login (product).
- Direct `/community/new` while signed out → sign-in prompt, not a write.
- Invalid credentials → “账号或密码不对”.
- Session via Better Auth cookie; refresh/expiry owned by the library (not re-tested against a live IdP in this sandbox).

---

## 17–20. Errors, loading, empty, bounds

- 404 pages render. Root error component shows `error.message`.
- Diagnose sending state “正在看照片…”. Q&A “正在保存…”.
- Empty search and empty Q&A filter have copy, not a blank.
- Title/body length capped on write. Diagnose text sliced to 2000 on the server.

---

## 21. Date / locale

- Guide `updatedAt` displayed as stored date string, not timezone-shifted Date math.
- Language cookie `tuzhi-lang`. `<html lang>` flips in an effect (`zh-CN` / `en`). First SSR paint is `zh-CN` (P3).

Q&A **keeps Chinese original on top** with English below and “机器翻译，仅供参考” — product rule, not a leak.

---

## 22–23. Analytics / privacy

No GA / Plausible / ads. No cookie banner required for essential language + session cookies. Privacy page states photo-check is not published. Contact: `g17612121666@gmail.com`.

---

## 24. Dependencies

`npm audit --omit=dev`: **0**. Template `npm test` failures are platform OG/auth-off assertions, not CVE.

---

## 25. Source quality (app)

- No `console.log` in `src/routes` or `src/components`.
- Community seed errors log on the server only.
- Old word-replace filler `scripts/fill-en-fields.py` no longer writes JSON; `scripts/fill-en-overlay.py` is the whole-string path.

---

## 26. Environment

- No `.env` file (platform injects `DATABASE_URL` + auth).
- Browser only sees `VITE_*`.
- Diagnose/translate keys stay server-side.

---

## 27. Deployment readiness

- Build: `node scripts/with-app-env.mjs vite build && npm run db:migrate`
- Migrate never fails the build if Neon is down (exit 0 after retries).
- `startup.sh` keeps the preview on `:8080`.
- Function budget respected (4.9M, no wasm).

---

## 28. Automated tests

Platform script tests exist; **no app-level Playwright suite** in `src/`. Highest-value additions (P3, do not pad):

1. English guide: `main` innerText has no Han.
2. Guide load: zero iframes; tap play → one iframe.
3. Unknown slug → HTTP 404.
4. Diagnose empty → validation copy.
5. Unauthenticated POST `/community/new` does not insert.

---

## 29. Lighthouse

Not executed in this sandbox (no Lighthouse CLI run). Code-level stand-in:

- Accessibility: skip link, names, dialog, 44px — likely ≥90 if muted contrast passes.
- SEO: titles, description, robots, crawlable 404 — likely ≥90 on guide pages after unique titles.
- Performance: image weight and JSON chunks are the main risk vs a 90 score on slow mobile. Click-to-play helps INP/LCP vs autoplay embeds.

---

## 30. Severity board (after fixes)

### P0 — Blocker — **resolved this pass**

- English mixed with Chinese in guides.
- Unexpected video autoplay.

### P1 — Critical — **resolved this pass**

- Chinese Pause/Stop, wiki caption language, indicator 404, oversized diagnose payload, unbounded community body/photo URL.

### P2 — Major — remaining / optional

- No canonical URL.
- Client chunks include full article JSON (gzip tens of kB).
- First SSR `lang` is always `zh-CN`.
- English `<title>` still uses Chinese source on SSR (chrome language is client-only).
- No Lighthouse CI.
- Contrast of muted brown on paper for small text.

### P3 — Minor

- Lightbox close accessible name is English.
- Platform `npm test` 13 fails (auth-on vs template-off; OG injector).
- No app Playwright suite.
- No JSON-LD.
- Q&A shows Chinese original in English chrome (specified).

### P4 — Improvement

- JPG → WebP/AVIF + `srcset`.
- Split article JSON by route.
- Unique English document titles from overlay/meta at request time.

---

## Final Recommendation

**CONDITIONAL GO.**

The site is fit for a public farmer audience **after the P0/P1 fixes in this pass**. Do not revert dosage numbers, pesticide names, or video IDs. Do not reintroduce auto-mounted Bilibili iframes.

Must remain true in production:

1. English guides serve overlay extra fields (confuse / dosage / photos / indicators) with **zero** leftover Han.
2. Lesson video iframe is **not** in the document until the play control is used.
3. Production build stays green without shipping `pglite.wasm`.
4. Auth stays email/phone; community writes stay behind `authMiddleware`.

Schedule P2 SEO/canonical and bundle splitting after launch. Do not “fix” template unit tests by turning auth off.

---

## Appendix A — Content integrity

| Item | Count | Check |
|---|---|---|
| Field guides | 100 | Overlay 100/100, extra fields complete |
| Lab terms | 32 | EN copy 0 Han; photos localized at render |
| Lesson videos | 100 + 32 maps | Existing Bilibili / verified YouTube IDs only |
| Article photos | 200 | All files present |
| Wiki photos | 64 | All files present |
| Dosage numbers | 177 ranges | 0 numeric drifts ZH → EN |
| Forbidden EN | Sample / Knowledge Base / pedological | 0 |

## Appendix B — User-reported bugs

| Report | Status |
|---|---|
| 英文讲解中间会莫名其妙穿插中文 | **Fixed.** Parallel English for previously untranslated blocks; leftover Han 0. |
| 网站内视频会莫名其妙自动播放 | **Fixed.** Click-to-play; `autoplay=0` until the farmer taps. |
