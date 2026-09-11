import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CONTACT_EMAIL } from "./search-DqYpJTx8.mjs";
import { l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CyYCDSle.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: t.about.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium",
				children: t.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: t.about.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.footer.maker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					className: "text-forest underline",
					children: t.footer.contact
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${CONTACT_EMAIL}`,
					className: "text-forest underline",
					children: CONTACT_EMAIL
				})
			] })
		]
	});
}
//#endregion
export { About as component };
