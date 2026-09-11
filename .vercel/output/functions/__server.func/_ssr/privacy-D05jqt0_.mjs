import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-D05jqt0_.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: t.privacy.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: t.privacy.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.disclaimer
			})
		]
	});
}
//#endregion
export { Privacy as component };
