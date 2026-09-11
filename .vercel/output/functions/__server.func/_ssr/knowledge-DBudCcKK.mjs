import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PROBLEMS, l as facetCounts, o as REGIONS, r as CROPS, s as SEASONS, u as filterArticles } from "./search-DqYpJTx8.mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { l as useLang, r as Route$2, u as messages } from "./router-Cmkla7Wz.mjs";
import { n as lex } from "./lexicon-DBEmn5jL.mjs";
import { t as ArticleCard } from "./ArticleCard-BegNpULp.mjs";
import { a as setExtraFiltersOpen, t as extraFiltersOpen } from "./local-jVZj-fYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-DBudCcKK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-base text-forest-fg" : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink",
		children
	});
}
var PAGE = 20;
function KnowledgeList() {
	const lang = useLang((s) => s.lang);
	const tAll = messages[lang];
	const t = tAll.knowledge;
	const search = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const urlForces = !!(search.crop || search.region || search.season);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [limit, setLimit] = (0, import_react.useState)(PAGE);
	const list = filterArticles({
		...search,
		lang
	});
	const facets = facetCounts({
		...search,
		lang
	});
	(0, import_react.useEffect)(() => {
		setLimit(PAGE);
	}, [
		search.q,
		search.crop,
		search.problem,
		search.region,
		search.season
	]);
	(0, import_react.useEffect)(() => {
		if (urlForces || extraFiltersOpen()) setOpen(true);
	}, [urlForces]);
	function setSearch(patch) {
		navigate({ search: {
			...search,
			...patch
		} });
	}
	function toggleOpen() {
		const next = !open;
		setOpen(next);
		setExtraFiltersOpen(next);
	}
	const selectedExtra = [
		search.crop ? {
			k: "crop",
			v: search.crop
		} : null,
		search.region ? {
			k: "region",
			v: search.region
		} : null,
		search.season ? {
			k: "season",
			v: search.season
		} : null
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: t.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/encyclopedia",
						className: "inline-block text-forest",
						children: t.toWiki
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[57px] z-20 space-y-3 border-b border-line bg-bg/95 py-3 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search.q ?? "",
							onChange: (e) => setSearch({ q: e.target.value || void 0 }),
							placeholder: t.ph,
							className: "min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted",
							children: t.byProblem
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: !search.problem,
								onClick: () => setSearch({ problem: void 0 }),
								children: tAll.all
							}), PROBLEMS.filter((p) => (facets.problems[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: search.problem === p,
								onClick: () => setSearch({ problem: p }),
								children: [
									lex(p, lang),
									" ",
									facets.problems[p]
								]
							}, p))]
						})]
					}),
					!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [selectedExtra.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							active: true,
							onClick: () => setSearch({ [s.k]: void 0 }),
							children: [lex(s.v, lang), " ×"]
						}, s.k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-forest underline",
							onClick: toggleOpen,
							children: t.moreFilters
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-forest underline",
						onClick: toggleOpen,
						children: t.lessFilters
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium text-muted",
									children: t.byCrop
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: !search.crop,
										onClick: () => setSearch({ crop: void 0 }),
										children: tAll.all
									}), CROPS.filter((c) => (facets.crops[c] ?? 0) > 0).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
										active: search.crop === c,
										onClick: () => setSearch({ crop: c }),
										children: [
											lex(c, lang),
											" ",
											facets.crops[c]
										]
									}, c))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium text-muted",
									children: t.byRegion
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: !search.region,
										onClick: () => setSearch({ region: void 0 }),
										children: tAll.all
									}), REGIONS.filter((r) => (facets.regions[r] ?? 0) > 0).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
										active: search.region === r,
										onClick: () => setSearch({ region: r }),
										children: [
											lex(r, lang),
											" ",
											facets.regions[r]
										]
									}, r))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-medium text-muted",
										children: t.bySeason
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-subtle",
										children: t.seasonNote
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											active: !search.season,
											onClick: () => setSearch({ season: void 0 }),
											children: tAll.all
										}), SEASONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
											active: search.season === s,
											onClick: () => setSearch({ season: s }),
											children: [
												lex(s, lang),
												" ",
												facets.seasons[s] ?? 0
											]
										}, s))]
									})
								]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.count(list.length)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [list.slice(0, limit).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug)), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [
						t.empty,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/diagnose",
							className: "mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg",
							children: t.goDiagnose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/knowledge/$slug",
							params: { slug: "suan-hua" },
							className: "mt-2 flex min-h-12 items-center justify-center text-forest underline",
							children: t.emptyHint
						})
					]
				}) : null]
			}),
			limit < list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-surface text-base",
				onClick: () => setLimit((n) => n + PAGE),
				children: t.morePage(Math.min(PAGE, list.length - limit))
			}) : null
		]
	});
}
//#endregion
export { KnowledgeList as component };
