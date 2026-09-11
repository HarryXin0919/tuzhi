//#region node_modules/.nitro/vite/services/ssr/assets/local-jVZj-fYX.js
var FAV = "tuzhi.favorites";
var HIST = "tuzhi.diagnoseHistory";
var FILTERS = "tuzhi-extra-filters";
function getFavorites() {
	try {
		return JSON.parse(localStorage.getItem(FAV) || "[]");
	} catch {
		return [];
	}
}
function toggleFavorite(slug) {
	const cur = getFavorites();
	const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
	localStorage.setItem(FAV, JSON.stringify(next));
	return next;
}
function getHistory() {
	try {
		return JSON.parse(localStorage.getItem(HIST) || "[]");
	} catch {
		return [];
	}
}
function pushHistory(item) {
	const next = [item, ...getHistory().filter((x) => x.id !== item.id)].slice(0, 30);
	localStorage.setItem(HIST, JSON.stringify(next));
}
function extraFiltersOpen() {
	try {
		return localStorage.getItem(FILTERS) === "1";
	} catch {
		return false;
	}
}
function setExtraFiltersOpen(open) {
	try {
		localStorage.setItem(FILTERS, open ? "1" : "0");
	} catch {}
}
//#endregion
export { setExtraFiltersOpen as a, pushHistory as i, getFavorites as n, toggleFavorite as o, getHistory as r, extraFiltersOpen as t };
