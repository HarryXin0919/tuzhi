import { o as __toESM } from "./_runtime.mjs";
import { K as require_react, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as localizeArticle, p as indicatorTermId, u as getArticle, y as relatedArticles } from "./_ssr/localize-OLxdYRl5.mjs";
import { A as withLangPath, C as toggleFavorite, D as articleJsonLd, E as LangLink, O as messages, S as getFavorites, T as ArticleCard, b as KnowledgeVideo, i as Route$8, k as usePathLang, w as ReadAloud, x as PhotoGallery } from "./_ssr/router-BiGtTtRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-S68iD_QB.js
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
var LAB_SAMPLE_ZH = [
	["地块", "华北某粮田（匿名）"],
	["取样", "2026-03-18 · 0–20 cm · 12 点混合"],
	["pH（1:2.5 水浸）", "5.2"],
	["有机质 g/kg", "12.4"],
	["EC mS/cm", "0.28"],
	["碱解氮 mg/kg", "68"],
	["有效磷 mg/kg", "9.5"],
	["速效钾 mg/kg", "82"],
	["CEC cmol/kg", "11.2"],
	["有效铁 mg/kg", "4.1"]
];
var LAB_SAMPLE_EN = [
	["Field", "A North China grain field (anonymous)"],
	["Sample", "2026-03-18 · 0–20 cm · 12 points mixed"],
	["pH (1:2.5 water)", "5.2"],
	["Organic matter g/kg", "12.4"],
	["EC mS/cm", "0.28"],
	["Available N mg/kg", "68"],
	["Available P mg/kg", "9.5"],
	["Available K mg/kg", "82"],
	["CEC cmol/kg", "11.2"],
	["Available Fe mg/kg", "4.1"]
];
function stripStepNo(step) {
	let s = step.trim();
	for (let i = 0; i < 4; i++) {
		const next = s.replace(/^\s*\d+\s*[）).、:：]\s*/, "").replace(/^\s*\d+\s+/, "");
		if (next === s) break;
		s = next;
	}
	return s;
}
function GuidePage({ raw }) {
	const lang = usePathLang();
	const t = messages[lang];
	const C = t.knowledge;
	const a = localizeArticle(raw, lang);
	const related = relatedArticles(raw).map((x) => localizeArticle(x, lang));
	const [favs, setFavs] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getFavorites());
	const [howto, setHowto] = (0, import_react.useState)(false);
	const doseRef = a.doseRefSlug ? getArticle(a.doseRefSlug) : void 0;
	const speakRaw = lang === "en" ? a.speakEn ?? [] : a.speakZh ?? [];
	const howRaw = lang === "en" ? a.howtoSpeakEn ?? [] : a.howtoSpeakZh ?? [];
	const stepNorm = new Set((a.solutions.steps ?? []).map((s) => stripStepNo(s).trim()));
	const speak = speakRaw.filter((s) => {
		const line = s.trim();
		if (!line || /^\s*\d+\s*[）).、]/.test(line)) return false;
		if (stepNorm.has(stripStepNo(line).trim())) return false;
		return true;
	});
	const speakHow = howRaw.filter((s) => s.trim());
	const sources = (a.sources ?? []).filter((s) => s && !/translation pending/i.test(s) && (lang !== "en" || !/[\u4e00-\u9fff]/.test(s)));
	const author = lang === "en" ? !a.author || /李泽宇/.test(a.author) ? "Li Zeyu" : a.author : a.author || a.reviewer;
	const jsonLd = articleJsonLd({
		title: a.title,
		description: a.summary,
		path: withLangPath(`/knowledge/${raw.slug}`, lang),
		dateModified: a.updatedAt || raw.updatedAt,
		lang,
		image: a.photos?.[0]?.src || raw.photos?.[0]?.src
	});
	const sample = lang === "en" ? LAB_SAMPLE_EN : LAB_SAMPLE_ZH;
	const wikiRows = a.labTable?.length ? a.labTable.map((row) => ({
		id: row.id,
		name: row.name
	})) : a.indicators.map((d, i) => ({
		id: indicatorTermId(raw.indicators[i]?.name || d.name),
		name: d.name
	}));
	const fieldPhotos = a.photos.slice(0, 2);
	const extraPhotos = a.photos.slice(2, 4);
	const relatedBlock = related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-semibold",
			children: C.related
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: getArticle(r.slug) }, r.slug))
		})]
	}) : null;
	const wikiBlock = wikiRows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2 rounded-2xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: lang === "en" ? "Lab-sheet words" : "化验词"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1",
			children: wikiRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
				to: "/encyclopedia/$id",
				params: { id: row.id },
				className: "text-forest underline",
				children: row.name
			}) }, row.id))
		})]
	}) : null;
	const reading = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, {
						sentences: speak,
						howSentences: speakHow,
						title: a.title,
						slug: raw.slug,
						howto,
						onHowto: setHowto
					}),
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
			howto ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: C.s1,
					id: "look",
					children: [a.phenomenon.appearance ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a.phenomenon.appearance })
					}) : null, fieldPhotos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, {
						photos: fieldPhotos,
						slug: raw.slug,
						tall: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: C.photoNote
					})] }) : null]
				}),
				a.mechanism ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: C.sMechanism,
					id: "why",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: a.mechanism
					}), extraPhotos[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, {
						photos: extraPhotos.slice(0, 1),
						slug: raw.slug
					}) : null]
				}) : null,
				a.confuse.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
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
				}) : null
			] }),
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
							children: stripStepNo(step)
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
					a.doseTable?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-2xl border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: C.doseTable
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: lang === "en" ? "Texture" : "质地"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: lang === "en" ? "Rate" : "用量"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: lang === "en" ? "Note" : "说明"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: a.doseTable.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line bg-surface",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2",
										children: row.crop
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2",
										children: row.texture
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "whitespace-nowrap px-3 py-2",
										children: row.rate
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-muted",
										children: row.note
									})
								]
							}, `${row.crop}-${i}`)) })]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					doseRef ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							C.doseSee,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/knowledge/$slug",
								params: { slug: doseRef.slug },
								className: "text-forest underline",
								children: localizeArticle(doseRef, lang).title
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: C.doseNote
					}),
					a.labTable?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-2xl border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "px-3 py-2 text-left font-medium",
									children: C.labTable
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-surface-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: lang === "en" ? "Cell" : "格子"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: lang === "en" ? "Low" : "低"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: lang === "en" ? "Mid" : "中"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: lang === "en" ? "High" : "高"
										})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: a.labTable.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line bg-surface",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
												to: "/encyclopedia/$id",
												params: { id: row.id },
												className: "text-forest underline",
												children: row.name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.low
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.mid
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.high
										})
									]
								}, row.id)) })
							]
						})
					}) : a.indicators.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-line",
						children: a.indicators.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line bg-surface p-4 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
										to: "/encyclopedia/$id",
										params: { id: indicatorTermId(raw.indicators[i]?.name || d.name) },
										className: "text-forest",
										children: d.name
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
					raw.slug === "ce-tu-bao-gao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-2xl border border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "bg-surface-2 px-4 py-2 text-sm font-medium",
								children: lang === "en" ? "Anonymous sheet, circled in order" : "匿名化验单，按阅读顺序圈读"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sample.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line bg-surface",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 font-medium",
										children: k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2",
										children: v
									})]
								}, k)) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-3 text-sm text-muted",
								children: lang === "en" ? "Grain land at pH 5.2 can discuss agricultural lime. Tea at the same 5.2 must not be pushed to neutral. CEC is cation exchange, not EC." : "粮田 pH 5.2 可以谈农用石灰；茶园同样 5.2 不能照搬改到中性。CEC 是阳离子交换量，不是电导。"
							})
						]
					}) : null,
					extraPhotos[1] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, {
						photos: extraPhotos.slice(1),
						slug: raw.slug
					}) : null,
					a.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 font-medium",
							children: C.sExample
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-relaxed",
							children: a.example
						})]
					}) : null,
					a.whenToTest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: a.whenToTest
					}) : null
				]
			}),
			!howto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeVideo, { slug: raw.slug }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: C.updated(a.updatedAt, author)
			}),
			sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-subtle",
				children: [
					C.sources,
					"：",
					sources.join(lang === "en" ? "; " : "；")
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.disclaimerShort
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
				to: "/diagnose",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg",
				children: C.ask
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lg:grid lg:grid-cols-[minmax(0,45rem)_22.5rem] lg:items-start lg:gap-8",
		children: [reading, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "mt-8 space-y-6 lg:sticky lg:top-20 lg:mt-0",
			children: [wikiBlock, relatedBlock]
		})]
	})] });
}
var SplitComponent = function Page() {
	const { raw } = Route$8.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePage, { raw });
};
//#endregion
export { GuidePage, SplitComponent as component };
