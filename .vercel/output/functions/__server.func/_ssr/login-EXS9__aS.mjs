import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react, b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-DUtYoQbQ.mjs";
import { l as useLang, s as Route$10, u as messages, v as useCurrentUserState } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-EXS9__aS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function resolveEmail(email, phone) {
	const e = email.trim();
	if (e.includes("@")) return e;
	const digits = phone.replace(/\D/g, "");
	if (digits.length >= 7) return `${digits}@phone.tuzhi.local`;
	return e;
}
function Login() {
	const lang = useLang((s) => s.lang);
	const L = messages[lang].login;
	const search = Route$10.useSearch();
	const navigate = Route$10.useNavigate();
	const nav = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const register = search.tab === "register";
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function submit() {
		setErr("");
		const mail = resolveEmail(email, phone);
		if (!mail) {
			setErr(L.needEmail);
			return;
		}
		if (password.length < 8) {
			setErr(L.short);
			return;
		}
		if (register && password !== password2) {
			setErr(L.mismatch);
			return;
		}
		setBusy(true);
		try {
			const digits = (phone.replace(/\D/g, "") || mail.replace(/\D/g, "")).slice(-4) || "0000";
			const name = lang === "en" ? `Farmer ${digits}` : `农户${digits}`;
			if (register) {
				const { error } = await authClient.signUp.email({
					email: mail,
					password,
					name
				});
				if (error) {
					setErr(error.message?.toLowerCase().includes("exist") ? L.exists : error.message || L.fail);
					setBusy(false);
					return;
				}
			}
			const { error } = await authClient.signIn.email({
				email: mail,
				password
			});
			if (error) {
				setErr(register && error.message ? error.message : L.fail);
				setBusy(false);
				return;
			}
			nav({ to: "/" });
		} catch {
			setErr(L.fail);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: L.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: L.lead
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: !register ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg" : "flex-1 rounded-full border border-line px-4 py-2",
					onClick: () => navigate({ search: {} }),
					children: L.tabLogin
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: register ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg" : "flex-1 rounded-full border border-line px-4 py-2",
					onClick: () => navigate({ search: { tab: "register" } }),
					children: L.tabRegister
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: L.email
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					autoComplete: "username",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: L.phone
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "tel",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: L.password
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoComplete: register ? "new-password" : "current-password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3"
				})]
			}),
			register ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: L.password2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoComplete: "new-password",
					value: password2,
					onChange: (e) => setPassword2(e.target.value),
					className: "min-h-12 w-full rounded-xl border border-line bg-surface px-3"
				})]
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-danger",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: submit,
				className: "flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg disabled:opacity-50",
				children: register ? L.register : L.submit
			})
		]
	});
}
//#endregion
export { Login as component };
