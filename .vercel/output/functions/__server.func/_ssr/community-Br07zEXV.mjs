import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PROBLEMS } from "./search-DqYpJTx8.mjs";
import { l as useLang, o as Route$7, u as messages } from "./router-Cmkla7Wz.mjs";
import { n as lex, t as displayName } from "./lexicon-DBEmn5jL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-Br07zEXV.js
var import_jsx_runtime = require_jsx_runtime();
function Community() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const r = t.community;
	const { posts } = Route$7.useLoaderData();
	const search = Route$7.useSearch();
	const nav = Route$7.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: r.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: r.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: void 0 } }),
					className: !search.problem ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: t.all
				}), PROBLEMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: p } }),
					className: search.problem === p ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: lex(p, lang)
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/community/new",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg",
				children: r.ask
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [r.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-3 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/diagnose",
							className: "text-forest underline",
							children: t.nav.diagnose
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/knowledge",
							className: "text-forest underline",
							children: t.nav.knowledge
						})]
					})]
				}) : posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/community/$id",
					params: { id: p.id },
					className: "block rounded-2xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-muted",
							children: p.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-subtle",
							children: [
								displayName(p.author, lang),
								" · ",
								String(p.createdAt).slice(0, 10),
								" · ",
								lex(p.problem, lang),
								" ·",
								" ",
								p.answers.length ? r.answered : r.waiting
							]
						})
					]
				}, p.id))
			})
		]
	});
}
//#endregion
export { Community as component };
