import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PROBLEMS, f as hotArticles } from "./search-DqYpJTx8.mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { c as Route$14, l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
import { n as lex, t as displayName } from "./lexicon-DBEmn5jL.mjs";
import { t as ArticleCard } from "./ArticleCard-BegNpULp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AT94zqwF.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const { posts } = Route$14.useLoaderData();
	const hot = hotArticles(6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: t.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: t.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						children: t.home.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg",
						children: t.home.diagnose
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "relative",
						onSubmit: (e) => {
							e.preventDefault();
							const q = new FormData(e.currentTarget).get("q");
							window.location.href = `/knowledge?q=${encodeURIComponent(String(q || ""))}`;
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "q",
							placeholder: t.home.searchPh,
							"aria-label": t.home.searchAria,
							className: "min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3 text-base"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t.home.problems
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: PROBLEMS.filter((p) => p !== "其他").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						search: { problem: p },
						className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4",
						children: lex(p, lang)
					}, p))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.hot
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.home.more
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: hot.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.posts
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/community",
						className: "text-forest underline",
						children: t.home.toCommunity
					})]
				}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: t.home.noPosts
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/community/$id",
						params: { id: p.id },
						className: "block rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								displayName(p.author, lang),
								" · ",
								String(p.createdAt).slice(0, 10),
								" ·",
								" ",
								p.answers.length ? t.home.answered(p.answers.length) : t.home.waiting
							]
						})]
					}) }, p.id))
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
