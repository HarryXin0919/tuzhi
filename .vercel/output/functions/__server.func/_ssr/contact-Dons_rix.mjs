import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CONTACT_EMAIL } from "./search-DqYpJTx8.mjs";
import { l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Dons_rix.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: t.contact.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "leading-relaxed",
			children: [
				t.contact.body,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${CONTACT_EMAIL}`,
					className: "text-forest underline",
					children: CONTACT_EMAIL
				})
			]
		})]
	});
}
//#endregion
export { Contact as component };
