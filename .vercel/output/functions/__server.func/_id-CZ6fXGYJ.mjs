import { o as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$6, h as addReply, l as useLang, u as messages, v as useCurrentUserState } from "./_ssr/router-Cmkla7Wz.mjs";
import { t as ReadAloud } from "./_ssr/ReadAloud-BB8ZKFmQ.mjs";
import { n as lex, t as displayName } from "./_ssr/lexicon-DBEmn5jL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CZ6fXGYJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Bilingual({ zh, en, as: Tag = "p", className = "leading-relaxed" }) {
	const lang = useLang((s) => s.lang);
	const t = messages[lang].community;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			className,
			children: zh
		}), en && en.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-base leading-relaxed text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-2 text-sm text-subtle",
					children: t.enLabel
				}),
				en,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm text-subtle",
					children: t.machineNote
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-subtle",
			children: t.enPending
		})]
	});
}
function PostPage() {
	const { post } = Route$6.useLoaderData();
	const lang = useLang((s) => s.lang);
	const r = messages[lang].community;
	const { user, isPending } = useCurrentUserState();
	const [body, setBody] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const listen = lang === "en" ? [
		post.titleEn || post.title,
		post.bodyEn || post.body,
		...post.answers.map((a) => a.bodyEn || a.body)
	].join(". ") : [
		post.title,
		post.body,
		...post.answers.map((a) => a.body)
	].join("。");
	async function send() {
		setErr("");
		try {
			await addReply({ data: {
				postId: post.id,
				body
			} });
			setBody("");
			window.location.reload();
		} catch {
			setErr(r.errReply);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/community",
					className: "text-forest",
					children: r.back
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bilingual, {
					zh: post.title,
					en: post.titleEn,
					as: "h1",
					className: "font-display text-3xl font-semibold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						displayName(post.author, lang),
						" · ",
						String(post.createdAt).slice(0, 10),
						" · ",
						lex(post.problem, lang)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: listen }),
			post.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.photo,
				alt: "",
				className: "max-h-80 w-full rounded-2xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bilingual, {
				zh: post.body,
				en: post.bodyEn
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: r.answers
					}),
					post.answers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: r.noAnswers
					}) : null,
					post.answers.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle",
							children: displayName(a.author, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bilingual, {
							zh: a.body,
							en: a.bodyEn
						})]
					}, a.id))
				]
			}),
			isPending ? null : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: body,
						onChange: (e) => setBody(e.target.value),
						placeholder: r.replyPh,
						className: "min-h-28 w-full rounded-xl border border-line bg-surface p-3"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-danger",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: send,
						className: "flex min-h-12 w-full items-center justify-center rounded-xl bg-forest text-forest-fg",
						children: r.reply
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					r.loginToReply,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-forest underline",
						children: r.goLogin
					})
				]
			})
		]
	});
}
//#endregion
export { PostPage as component };
