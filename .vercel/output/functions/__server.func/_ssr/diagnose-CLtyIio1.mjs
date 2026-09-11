import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { c as STAGES, d as getArticle, i as FERTS, o as REGIONS, r as CROPS } from "./search-DqYpJTx8.mjs";
import { _ as createSsrRpc, l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
import { n as lex } from "./lexicon-DBEmn5jL.mjs";
import { t as ArticleCard } from "./ArticleCard-BegNpULp.mjs";
import { i as pushHistory } from "./local-jVZj-fYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnose-CLtyIio1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var runDiagnose = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4c15d74ca4e73d436d153bc970e05e3cfa7b4a7c7e16e9e9be35bd4dea5dcf81"));
function fileToData(file) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = reject;
		r.readAsDataURL(file);
	});
}
function Diagnose() {
	const lang = useLang((s) => s.lang);
	const d = messages[lang].diagnose;
	const [photos, setPhotos] = (0, import_react.useState)({
		plant: null,
		leaf: null,
		soil: null
	});
	const [text, setText] = (0, import_react.useState)("");
	const [crop, setCrop] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [stage, setStage] = (0, import_react.useState)("");
	const [fert, setFert] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	async function onFile(slot, f) {
		if (!f) return;
		const data = await fileToData(f);
		setPhotos((p) => ({
			...p,
			[slot]: data
		}));
	}
	async function send() {
		const list = [
			photos.plant,
			photos.leaf,
			photos.soil
		].filter(Boolean);
		if (list.length === 0 && text.trim().length < 8) {
			setErr(d.needPhoto);
			return;
		}
		setBusy(true);
		setErr("");
		const res = await runDiagnose({ data: {
			photos: list,
			text,
			crop,
			region,
			stage,
			fert,
			lang
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error === "off" ? d.aiOff : d.sendFail);
			return;
		}
		setResult(res.result);
		pushHistory({
			id: String(Date.now()),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			title: res.result.title,
			summary: res.result.summary
		});
	}
	const filled = [
		photos.plant,
		photos.leaf,
		photos.soil
	].filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: d.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: d.lead
			})]
		}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4 rounded-2xl border border-line bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: d.result
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: result.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed",
					children: result.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: d.analysis
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 leading-relaxed text-muted",
					children: result.photosSay
				})] }),
				result.distinguish ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-surface-2 p-3 leading-relaxed",
					children: result.distinguish
				}) : null,
				result.dont?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: d.dont
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-5",
					children: result.dont.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, i))
				})] }) : null,
				result.next?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: d.next
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-5",
					children: result.next.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, i))
				})] }) : null,
				result.related?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium",
						children: d.related
					}), result.related.map((slug) => {
						const a = getArticle(slug);
						return a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, slug) : null;
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-12 items-center rounded-xl border border-line px-4",
						onClick: () => {
							setResult(null);
							setPhotos({
								plant: null,
								leaf: null,
								soil: null
							});
						},
						children: d.retry
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/knowledge/$slug",
						params: { slug: "suan-hua" },
						className: "inline-flex min-h-12 items-center text-forest underline",
						children: d.example
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					[
						"plant",
						d.slotPlant,
						d.hintPlant,
						d.avoidPlant
					],
					[
						"leaf",
						d.slotLeaf,
						d.hintLeaf,
						d.avoidLeaf
					],
					[
						"soil",
						d.slotSoil,
						d.hintSoil,
						d.avoidSoil
					]
				].map(([key, label, hint, avoid]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block cursor-pointer rounded-2xl border border-dashed border-line bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: hint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle",
							children: avoid
						}),
						photos[key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photos[key],
							alt: "",
							className: "mt-2 h-32 w-full rounded-lg object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 block h-32 rounded-lg bg-surface-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							capture: "environment",
							className: "sr-only",
							onChange: (e) => onFile(key, e.target.files?.[0])
						})
					]
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: d.qPh,
				className: "min-h-28 w-full rounded-xl border border-line bg-surface p-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: crop,
						onChange: (e) => setCrop(e.target.value),
						className: "min-h-12 rounded-xl border border-line bg-surface px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.crop
						}), CROPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: lex(c, lang)
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: region,
						onChange: (e) => setRegion(e.target.value),
						className: "min-h-12 rounded-xl border border-line bg-surface px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.region
						}), REGIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: lex(c, lang)
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: stage,
						onChange: (e) => setStage(e.target.value),
						className: "min-h-12 rounded-xl border border-line bg-surface px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.stage
						}), STAGES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: lex(c, lang)
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: fert,
						onChange: (e) => setFert(e.target.value),
						className: "min-h-12 rounded-xl border border-line bg-surface px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: d.fert
						}), FERTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: lex(c, lang)
						}, c))]
					})
				]
			}),
			filled === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-clay",
				children: d.noPhotoWarn
			}) : filled < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-clay",
				children: d.fewPhotoWarn
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-danger",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: send,
				className: "flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg disabled:opacity-50",
				children: busy ? d.sending : d.send
			})
		] })]
	});
}
//#endregion
export { Diagnose as component };
