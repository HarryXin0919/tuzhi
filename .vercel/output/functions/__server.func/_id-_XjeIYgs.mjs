import { S as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as getArticle } from "./_ssr/search-DqYpJTx8.mjs";
import { i as Route$3, l as useLang, p as localizeTerm, u as messages } from "./_ssr/router-Cmkla7Wz.mjs";
import { t as ReadAloud } from "./_ssr/ReadAloud-BB8ZKFmQ.mjs";
import { t as ArticleCard } from "./_ssr/ArticleCard-BegNpULp.mjs";
import { n as PhotoGallery, t as LessonVideo } from "./_ssr/LessonVideo-EHD7HD_f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-_XjeIYgs.js
var import_jsx_runtime = require_jsx_runtime();
function TermPage() {
	const { term } = Route$3.useLoaderData();
	const lang = useLang((s) => s.lang);
	const r = messages[lang].wiki;
	const copy = localizeTerm(term, lang);
	const related = (term.relatedSlugs || []).map(getArticle).filter((x) => !!x);
	const listen = [
		copy.title,
		copy.subtitle,
		copy.appearance,
		copy.unit,
		...copy.longform ?? [],
		copy.fieldCheck
	].join("。");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/encyclopedia",
					className: "text-forest",
					children: r.back
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: copy.subtitle
					}),
					copy.aka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-subtle",
						children: [r.aka, copy.aka]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: listen }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: r.sheet
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: copy.appearance
					}),
					copy.photos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, { photos: copy.photos }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: r.unit
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
					children: copy.unit
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: r.read
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-2xl border border-line bg-surface p-4 leading-relaxed",
					children: [(copy.longform?.length ? copy.longform : [copy.summary]).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: r.readNote
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: r.field
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
					children: copy.fieldCheck
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonVideo, {
				slug: term.id,
				kind: "wiki"
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: r.toGuides
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: r.toGuidesLead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
					})
				]
			}) : null
		]
	});
}
//#endregion
export { TermPage as component };
