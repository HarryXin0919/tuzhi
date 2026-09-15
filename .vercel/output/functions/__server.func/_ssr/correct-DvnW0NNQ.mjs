//#region node_modules/.nitro/vite/services/ssr/assets/correct-DvnW0NNQ.js
/** Farmer speech → the words this site actually uses. */
var PAIRS = [
	[/缺蛋/g, "缺氮"],
	[/缺谈/g, "缺氮"],
	[/盐减地/g, "盐碱地"],
	[/盐碱的/g, "盐碱地"],
	[/盐硷/g, "盐碱"],
	[/板结地/g, "板结"],
	[/扳结/g, "板结"],
	[/酸碱度/g, "pH"],
	[/PH值/gi, "pH"],
	[/ph值/gi, "pH"],
	[/电导率/g, "EC"],
	[/有机值/g, "有机质"],
	[/黄页/g, "黄叶"],
	[/苗皇/g, "苗黄"],
	[/锈水田/g, "锈水"],
	[/铝毒害/g, "铝毒"],
	[/石灰帐/g, "石灰账"]
];
function correctFarmSpeech(raw) {
	let s = raw.trim();
	for (const [re, to] of PAIRS) s = s.replace(re, to);
	return s;
}
//#endregion
export { correctFarmSpeech as t };
