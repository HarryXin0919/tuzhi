import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signOut } from "./client-DUtYoQbQ.mjs";
import { d as getArticle } from "./search-DqYpJTx8.mjs";
import { d as UserButton, l as useLang, u as messages, v as useCurrentUserState } from "./router-Cmkla7Wz.mjs";
import { t as displayName } from "./lexicon-DBEmn5jL.mjs";
import { t as ArticleCard } from "./ArticleCard-BegNpULp.mjs";
import { n as getFavorites, r as getHistory } from "./local-jVZj-fYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-DxyYOZFR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Me() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const m = t.me;
	const { user, isPending } = useCurrentUserState();
	const [favs] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getFavorites());
	const [hist] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getHistory());
	const articles = favs.map(getArticle).filter((a) => !!a);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: m.title
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 rounded-xl bg-surface-2" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: displayName(user.displayName || user.primaryEmail, lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-forest underline",
						onClick: () => signOut("/"),
						children: m.logout
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.guest
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "mt-3 flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg",
					children: t.nav.login
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: m.favs
				}), articles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.noFavs
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: m.history
				}), hist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.noHistory
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: hist.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: h.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: h.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-subtle",
								children: h.at.slice(0, 10)
							})
						]
					}, h.id))
				})]
			})
		]
	});
}
//#endregion
export { Me as component };
