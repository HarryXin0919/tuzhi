import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PROBLEMS, o as REGIONS, r as CROPS } from "./search-DqYpJTx8.mjs";
import { g as createPost, l as useLang, u as messages, v as useCurrentUserState } from "./router-Cmkla7Wz.mjs";
import { n as lex } from "./lexicon-DBEmn5jL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-BYJj_wia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPost() {
	const lang = useLang((s) => s.lang);
	const r = messages[lang].community;
	const { user, isPending } = useCurrentUserState();
	const nav = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [problem, setProblem] = (0, import_react.useState)("其他");
	const [crop, setCrop] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	if (!isPending && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: r.needLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: r.needLoginLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				search: { tab: "register" },
				className: "flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg",
				children: r.goLogin
			})
		]
	});
	async function send() {
		setBusy(true);
		setErr("");
		try {
			const res = await createPost({ data: {
				title,
				body,
				problem,
				crop,
				region
			} });
			nav({
				to: "/community/$id",
				params: { id: res.id }
			});
		} catch (e) {
			setErr(e instanceof Error && e.message === "short" ? r.errShort : r.errSave);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: r.newTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: title,
				onChange: (e) => setTitle(e.target.value),
				placeholder: r.titlePh,
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: body,
				onChange: (e) => setBody(e.target.value),
				placeholder: r.bodyPh,
				className: "min-h-40 w-full rounded-xl border border-line bg-surface p-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: problem,
				onChange: (e) => setProblem(e.target.value),
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3",
				children: PROBLEMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: p,
					children: lex(p, lang)
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: crop,
				onChange: (e) => setCrop(e.target.value),
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: r.crop
				}), CROPS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: p,
					children: lex(p, lang)
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: region,
				onChange: (e) => setRegion(e.target.value),
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: r.region
				}), REGIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: p,
					children: lex(p, lang)
				}, p))]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-danger",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: send,
				className: "flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg text-forest-fg",
				children: busy ? r.publishing : r.publish
			})
		]
	});
}
//#endregion
export { NewPost as component };
