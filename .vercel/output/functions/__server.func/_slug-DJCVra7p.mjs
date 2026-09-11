import { o as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as getArticle, m as relatedArticles, p as indicatorTermId } from "./_ssr/search-DqYpJTx8.mjs";
import { l as useLang, n as Route$1, u as messages } from "./_ssr/router-Cmkla7Wz.mjs";
import { t as ReadAloud } from "./_ssr/ReadAloud-BB8ZKFmQ.mjs";
import { n as lex } from "./_ssr/lexicon-DBEmn5jL.mjs";
import { n as localizeArticle, t as ArticleCard } from "./_ssr/ArticleCard-BegNpULp.mjs";
import { n as PhotoGallery, t as LessonVideo } from "./_ssr/LessonVideo-EHD7HD_f.mjs";
import { n as getFavorites, o as toggleFavorite } from "./_ssr/local-jVZj-fYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DJCVra7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Section({ title, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-semibold",
			children: title
		}), children]
	});
}
function GuidePage() {
	const { raw } = Route$1.useLoaderData();
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const C = t.knowledge;
	const a = localizeArticle(raw, lang);
	const related = relatedArticles(raw).map((x) => localizeArticle(x, lang));
	const [favs, setFavs] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getFavorites());
	const [howto, setHowto] = (0, import_react.useState)(false);
	const listenText = [
		a.title,
		a.subtitle,
		a.phenomenon.appearance,
		...a.confuse.map((c) => `${c.lookalike}。${c.difference}`),
		...a.solutions.steps,
		...a.dontDo ?? [],
		...a.dosage.map((d) => `${d.name} ${d.range}。${d.note}`)
	].join("。");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/knowledge",
							className: "text-forest",
							children: C.back
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold leading-tight",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: a.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: a.problems.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: i === 0 ? "rounded-full bg-surface-2 px-3 py-1 text-sm" : "rounded-full bg-surface-2 px-3 py-1 text-sm opacity-60",
							children: p
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted",
						children: t.fieldHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: listenText }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-forest underline",
							onClick: () => setHowto((v) => !v),
							children: howto ? C.full : C.howto
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm",
							onClick: () => setFavs(toggleFavorite(raw.slug)),
							children: favs.includes(raw.slug) ? C.faved : C.fav
						})]
					})
				]
			}),
			howto ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: C.s1,
				id: "look",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.phenomenon.appearance })
				}), a.photos.slice(0, 2).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, { photos: a.photos.slice(0, 2) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: C.photoNote
				})] }) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: C.s2,
				id: "mix",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: a.confuse.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: C.like(c.lookalike)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted",
							children: c.difference
						})]
					}, `${c.lookalike}-${i}`))
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: C.s5,
				id: "how",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: a.solutions.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-fg",
							children: i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "leading-relaxed",
							children: step
						})]
					}, i))
				}), a.dontDo?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 font-medium",
						children: C.s7
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc space-y-2 pl-5",
						children: a.dontDo.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d }, i))
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: C.s6,
				id: "dose",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-line",
						children: a.dosage.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line bg-surface p-4 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg",
									children: d.range
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: d.note
								})
							]
						}, `${d.name}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: C.doseNote
					}),
					a.indicators.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-line",
						children: a.indicators.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line bg-surface p-4 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/encyclopedia/$id",
										params: { id: indicatorTermId(d.name) },
										className: "text-forest",
										children: lex(d.name, lang)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: d.meaning
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: d.typical
								})
							]
						}, `${d.name}-${i}`))
					}) : null,
					a.whenToTest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: a.whenToTest
					}) : null
				]
			}),
			!howto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonVideo, { slug: raw.slug }) : null,
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: C.related
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: getArticle(r.slug) }, r.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: C.updated(a.updatedAt, a.reviewer)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.disclaimerShort
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/diagnose",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg",
				children: C.ask
			})
		]
	});
}
//#endregion
export { GuidePage as component };
