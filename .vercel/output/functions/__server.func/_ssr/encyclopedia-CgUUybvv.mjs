import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as LAB_GROUPS, l as useLang, m as searchTerms, p as localizeTerm, u as messages } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/encyclopedia-CgUUybvv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WikiList() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const r = t.wiki;
	const [q, setQ] = (0, import_react.useState)("");
	const found = (0, import_react.useMemo)(() => searchTerms(q), [q]);
	const foundIds = new Set(found.map((x) => x.id));
	const groups = LAB_GROUPS.map((g) => ({
		...g,
		terms: g.ids.map((id) => found.find((t) => t.id === id)).filter((x) => x && foundIds.has(x.id))
	})).filter((g) => g.terms.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: r.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: r.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: r.ph,
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-4"
			}),
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-line bg-surface p-6 text-muted",
				children: [r.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-3 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.nav.knowledge
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnose",
						className: "text-forest underline",
						children: t.nav.diagnose
					})]
				})]
			}) : groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: lang === "en" ? g.titleEn : g.title
				}), g.terms.map((term) => {
					if (!term) return null;
					const copy = localizeTerm(term, lang);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/encyclopedia/$id",
						params: { id: term.id },
						className: "block scroll-mt-24 rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-medium",
								children: copy.title
							}),
							copy.aka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-subtle",
								children: [r.aka, copy.aka]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg leading-relaxed",
								children: copy.summary
							})
						]
					}, term.id);
				})]
			}, g.id))
		]
	});
}
//#endregion
export { WikiList as component };
