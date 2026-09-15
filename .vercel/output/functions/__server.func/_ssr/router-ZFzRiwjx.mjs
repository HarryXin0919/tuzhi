import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, G as notFound, K as require_react, S as useLoaderData, V as redirect, _ as createRootRoute, b as useNavigate, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, w as require_jsx_runtime, x as useSearch, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { r as signOut, t as authClient } from "./client-DUtYoQbQ.mjs";
import { i as hasGateSessionMarker, t as auth } from "./server-Cj3UhHuY.mjs";
import { C as waitForVoices, S as speakPrepare, _ as pickVoice, a as articles_en_meta_default, b as resolveSlug, c as displayName, d as hasHan, f as hasLangVoice, h as localizeArticle, l as dropHanLines, m as lex, n as aliases_default, o as cleanEn, p as indicatorTermId, s as cleanEnArr, t as TTS_RATES, u as getArticle, v as readTtsRate, w as writeTtsRate, y as relatedArticles } from "./localize-prwp3Q6l.mjs";
import { t as correctFarmSpeech } from "./correct-DvnW0NNQ.mjs";
import { t as authMiddleware } from "./middleware-DkjgCcjW.mjs";
import { a as ScanLine, c as House, i as Search, l as FlaskConical, n as TriangleAlert, o as Mic, r as Square, s as MessagesSquare, t as UserRound, u as BookOpen } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-CdPiJWm_.js
var CONTACT_EMAIL = "g17612121666@gmail.com";
var SITE_ORIGIN = "https://tuzhi.asia";
var CROPS = [
	"水稻",
	"小麦",
	"玉米",
	"大豆",
	"棉花",
	"蔬菜",
	"果树",
	"马铃薯",
	"花生",
	"设施蔬菜",
	"茶叶"
];
var PROBLEMS = [
	"酸化",
	"盐碱",
	"板结",
	"有机质低",
	"缺素",
	"连作障碍",
	"涝害",
	"肥害",
	"其他"
];
var REGIONS = [
	"东北",
	"华北",
	"黄淮海",
	"长江中下游",
	"华南",
	"西南",
	"西北",
	"全国"
];
var SEASONS = [
	"春季",
	"夏季",
	"秋季",
	"冬季",
	"全年"
];
var STAGES = [
	"苗期",
	"生长期",
	"开花结果",
	"收获后",
	"不确定"
];
var FERTS = [
	"尿素",
	"复合肥",
	"有机肥",
	"水溶肥",
	"没施",
	"不确定"
];
var OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;
var SITE_NAME = "土知";
var SITE_NAME_EN = "Tuzhi";
var HOME_TITLE = "土知｜看懂土地，种好地——土壤问题对照与拍照诊断";
var HOME_DESC = "看懂土地，种好地。面向农民的土壤科普：拍照对照土地问题、农业知识、化验知识与问答。诊断仅供学习，不替代农技站。";
var HOME_TITLE_EN = "Tuzhi｜Know the soil, farm it well";
var HOME_DESC_EN = "Know the soil, farm it well. Field guides and photo check for soil problems. For learning, not a prescription.";
function canonicalUrl(path) {
	const p = path.startsWith("/") ? path : `/${path}`;
	if (p === "/") return SITE_ORIGIN + "/";
	return `${SITE_ORIGIN}${p}`;
}
function seo(opts) {
	const url = canonicalUrl(opts.path);
	const type = opts.type ?? "website";
	const desc = opts.description.slice(0, 180);
	const lang = opts.lang === "en" ? "en" : "zh";
	const site = lang === "en" ? SITE_NAME_EN : SITE_NAME;
	return {
		meta: [
			{ title: opts.title },
			{
				name: "description",
				content: desc
			},
			...opts.noindex ? [{
				name: "robots",
				content: "noindex, nofollow"
			}] : [],
			{
				property: "og:title",
				content: opts.title
			},
			{
				property: "og:description",
				content: desc
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:type",
				content: type
			},
			{
				property: "og:locale",
				content: lang === "en" ? "en_US" : "zh_CN"
			},
			{
				property: "og:site_name",
				content: site
			},
			{
				property: "og:image",
				content: OG_IMAGE
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: opts.title
			},
			{
				name: "twitter:description",
				content: desc
			},
			{
				name: "twitter:image",
				content: OG_IMAGE
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
function articleJsonLd(opts) {
	const url = canonicalUrl(opts.path);
	const lang = opts.lang === "en" ? "en" : "zh-CN";
	const home = opts.lang === "en" ? SITE_ORIGIN + "/en" : SITE_ORIGIN + "/";
	const knowledge = opts.lang === "en" ? SITE_ORIGIN + "/en/knowledge" : SITE_ORIGIN + "/knowledge";
	return {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Article",
			headline: opts.title,
			description: opts.description.slice(0, 180),
			dateModified: opts.dateModified,
			inLanguage: lang,
			author: {
				"@type": "Person",
				name: opts.lang === "en" ? "Li Zeyu" : "李泽宇"
			},
			publisher: {
				"@type": "Organization",
				name: opts.lang === "en" ? SITE_NAME_EN : SITE_NAME,
				url: SITE_ORIGIN
			},
			image: OG_IMAGE,
			url
		}, {
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: opts.lang === "en" ? "Home" : "首页",
					item: home
				},
				{
					"@type": "ListItem",
					position: 2,
					name: opts.lang === "en" ? "Field guide" : "农业知识",
					item: knowledge
				},
				{
					"@type": "ListItem",
					position: 3,
					name: opts.title,
					item: url
				}
			]
		}]
	};
}
function orgJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_ORIGIN,
		description: HOME_DESC,
		email: "g17612121666@gmail.com",
		logo: `${SITE_ORIGIN}/logo-192.png`
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-B2Izd0c7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-X89NvhzM.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-path-lang-kJYH-N3f.js
var messages = {
	zh: {
		name: "土知",
		tagline: "看懂土地，种好地",
		desc: "面向农民的土壤科普：把地里看见的样子说清楚，把化验单上的词说成人话。",
		nav: {
			home: "首页",
			diagnose: "拍照识别",
			knowledge: "农业知识",
			community: "问答区",
			me: "我的",
			wiki: "化验知识",
			login: "登录",
			short: {
				home: "首页",
				diagnose: "拍照",
				knowledge: "知识",
				wiki: "化验",
				community: "问答",
				me: "我的"
			}
		},
		footer: {
			about: "关于",
			knowledge: "农业知识",
			wiki: "化验知识",
			community: "问答区",
			privacy: "隐私与免责",
			contact: "联系",
			maker: "制作人：李泽宇 Li Zeyu"
		},
		disclaimer: "诊断结果仅供学习参考，不能替代专业农技指导。严重问题请咨询当地农技站或进行土壤检测。",
		disclaimerShort: "内容仅供学习参考，具体施肥用药请结合当地农技站意见和土壤检测。",
		fieldHint: "到地里先看三样：叶位（新叶还是老叶）、根（白、褐还是臭）、土面（白霜、积水还是干裂）。三样对不上，不要急着下肥。",
		all: "全部",
		uncertain: "不确定",
		search: "搜索",
		langSwitch: "English",
		langSwitchAria: "切换到英文",
		examples: [
			"土发白",
			"苗黄",
			"土发酸",
			"板结"
		],
		home: {
			heroAlt: "广阔的耕地",
			lead: "土面发白、苗发黄或发僵时，先拍整株、特写和土面，再到农业知识里对照。化验单上的词去化验知识里查。",
			diagnose: "拍照识别土地问题",
			searchPh: "搜土发白、苗黄、板结",
			searchAria: "搜索土壤问题",
			problems: "常见问题",
			hot: "热门问题",
			more: "全部",
			posts: "问答区近帖",
			toCommunity: "去问答区",
			answered: (n) => `已有 ${n} 答`,
			waiting: "待回答",
			noPosts: "还没有新帖。先去拍照识别，或打开农业知识对照。"
		},
		diagnose: {
			title: "拍照识别土地问题",
			lead: "先拍整株、特写和土面，再到农业知识里对照。尽量把土壤问题和病害、药害分开。",
			slotPlant: "整株或整块地",
			hintPlant: "把整棵或一整垄拍进画面",
			avoidPlant: "只拍天或鞋尖",
			slotLeaf: "叶子或根特写",
			hintLeaf: "对焦点在叶片或根尖",
			avoidLeaf: "模糊、逆光一片黑",
			slotSoil: "土面",
			hintSoil: "白霜、结皮、积水要拍清楚",
			avoidSoil: "拍成远处风景",
			shot: "拍成这样：",
			avoid: "别拍成那样：",
			camera: "拍照",
			album: "相册",
			labToggle: "可选：上传化验单 / 手填数字",
			labHide: "收起化验单",
			labPhoto: "化验单照片",
			labHint: "拍清楚 pH、EC、有机质那几行",
			labAvoid: "反光看不清",
			labFill: "我来填报告数字（比只靠认字稳）：",
			crop: "作物",
			region: "地区",
			stage: "生育期",
			fert: "最近施肥",
			fertNote: "施肥补充一句（可选）",
			qPh: "例如：玉米底下叶子先黄，土有点白，河北，上周刚施了复合肥",
			needPhoto: "三个拍照槽至少填 1 张，或写清楚现象。",
			noPhotoWarn: "没照片结果会不准。建议补拍整株、特写、土面。先按文字给你看。",
			fewPhotoWarn: "建议补拍，结果会准一些。先按现有照片给你看。",
			sending: "正在看照片，大约十到二十秒…",
			send: "开始识别",
			wait: "请稍等",
			sendFail: "这次没看成。过一会儿再拍，或先打开农业知识对照。",
			result: "识别结果",
			retry: "重新拍",
			example: "看酸化示意图例子",
			exampleNote: "示意图不能单凭此图下肥。",
			analysis: "我从照片里看见",
			seen: "对照农业知识",
			causes: "可能的原因",
			lab: "化验单怎么读",
			dont: "先别做",
			next: "接下来可以",
			related: "相关文章",
			testHint: "拿不准就测土。",
			saveLogin: "登录后能把这次结果记在「我的」里",
			saved: "已记在这台手机",
			followPh: "还想补一句（可选）",
			followSend: "追问",
			followTitle: "追问",
			aiBusy: "正在看…",
			aiOff: "拍照识别这会儿不可用。你仍可以打开农业知识对照，或去问答区问。",
			empty: "还没有结果。",
			source: "对照农业知识，不是处方。",
			sttMic: "点一下开始说",
			sttHold: "也可以按住说",
			sttListening: "正在听…",
			sttNoHear: "没听清，靠近再说或改成打字",
			sttNoMic: "没有麦克风权限。要听你说话，才会打开麦克风。说完可以改字。",
			sttNoSupport: "这台浏览器不支持语音，已为你打开打字框。",
			sttNet: "网络识别失败，请重试或打字。",
			sttPerm: "要听你说话，才会打开麦克风。说完可以改字。",
			sttDialect: "按普通话识别，乡音可能不准，请改字。",
			sttBusy: "正在把录音转成字…",
			sttStop: "停止",
			labPhRange: "pH 只能是 0 到 14。",
			labNeg: "化验数字不能是负数。",
			labOcr: "已从化验单认出数字，请核对后改。",
			guess: "更像什么",
			listenConclusion: "听结论",
			shareCard: "保存分享卡",
			shareSaved: "分享卡已保存",
			unlike: "不像什么",
			kindSoil: "更像土壤问题",
			kindDisease: "更像病害",
			kindSpray: "更像药害",
			kindSalt: "更像盐害",
			kindLow: "信息不够",
			confHigh: "把握高",
			confMid: "把握中",
			confLow: "把握低",
			fewPlant: "缺整株，看不清是点片还是整块。",
			fewLeaf: "缺特写，叶位和病斑看不清。",
			fewSoil: "缺土面，白霜、积水、结皮看不清。"
		},
		knowledge: {
			title: "农业知识",
			lead: "地里看着不对，按现象找办法。酸化、盐碱、缺铁、涝害，一篇一篇对照。化验单上的词请去「化验知识」。",
			toWiki: "化验单上的词看不懂？去化验知识",
			ph: "搜土发白、苗黄、板结",
			byProblem: "问题类型",
			byCrop: "作物",
			byRegion: "地区",
			bySeason: "季节",
			moreFilters: "展开作物 / 地区 / 季节",
			lessFilters: "收起作物 / 地区 / 季节",
			seasonNote: "点「冬季」只出标了冬季的篇，不会把「全年」混进来。",
			morePage: (n) => `再看 ${n} 篇`,
			emptyHint: "或先看酸化这篇",
			count: (n) => `共 ${n} 篇`,
			empty: "没有和这个词对应的文章，换一个词，或点展开看全部分类。",
			emptyCombo: "没有专写这个作物、地区、季节的篇。可以先去掉一个筛选，或看全国通用篇。",
			sMechanism: "为什么会这样",
			sExample: "一个数字例子",
			doseTable: "作物 × 质地",
			labTable: "化验对照",
			pendingPhoto: "待补田间照片",
			photoKindLab: "实验室对照，不是自家地头。",
			photoKindDiagram: "示意图，不能单凭此图下肥。",
			contribute: "我有这张地头照片",
			contributeHint: "作物、地点、拍摄部位。授权土知用于学习对照。",
			contributeOk: "已收下草稿。我们会按授权使用。",
			contributeCrop: "作物",
			contributePlace: "地点",
			contributePart: "部位（整垄 / 根尖 / 土面）",
			contributeSend: "提交草稿",
			missingShot: "待补：请拍整垄 / 根尖 / 土面",
			doseSee: "认症篇，用量见",
			overseasVideo: "海外打不开 B 站时，请听上面的口述稿。",
			searchBili: "去 B 站搜：",
			sources: "依据",
			goDiagnose: "去拍照识别",
			missing: "没有这篇农业知识",
			back: "返回农业知识",
			howto: "只看办法",
			full: "看全文",
			fav: "收藏到本机",
			faved: "已收藏到这台手机",
			s1: "地里长什么样",
			s2: "别和啥搞混",
			s5: "先做什么，别做什么",
			s6: "用量区间",
			s7: "先别做",
			like: (s) => `和「${s}」像`,
			photoNote: "点击照片可放大。图下写该拍什么。没有真地头照片时会标明待补。",
			doseNote: "区间示意，须经当地农技站和包装说明确认。",
			videos: "讲解视频",
			related: "相关文章",
			updated: (d, r) => `更新时间 ${d} · ${r} · 内容仅供学习参考，严重问题咨询当地农技站或测土。`,
			ask: "拿不准？拍照问一问",
			play: "在哔哩哔哩打开",
			openBili: "在哔哩哔哩打开",
			openYt: "在 YouTube 打开",
			biliNote: "打不开时请听上面的口述稿。",
			switchBili: "哔哩哔哩",
			switchZh: "中文视频",
			switchEn: "英文视频",
			noEnVideo: "这篇暂时没有贴切的英文讲解。",
			listen: "听全文",
			pause: "暂停",
			stop: "停止"
		},
		wiki: {
			title: "化验知识",
			lead: "化验单上的 pH、EC、有机质、交换性铝、交换性钠，用大白话讲。地里怎么办请去「农业知识」。",
			ph: "搜化验单上的词，如 pH、EC、有机质、交换性铝",
			empty: "没有这个词。可以去农业知识看看，或直接拍照识别。",
			aka: "也叫：",
			back: "返回化验知识",
			missing: "没有这个词",
			sheet: "化验单上怎么写",
			unit: "常见单位",
			read: "数字大概怎么读",
			readNote: "只给门槛，不给处方。改土用量去农业知识，按测土和当地农技站。这条不给袋数。",
			field: "和地里哪种样子能对上",
			toGuides: "相关农业知识",
			toGuidesLead: "词条只讲单子上的格子。袋子数、步骤请打开农业知识。",
			readTable: "低 / 中 / 高（示意）",
			readTableNote: "按区域分级，此处为对照，不是处方。",
			ratio: "水土比",
			dont: "不要做什么",
			bandTitle: "把数字贴进来，只看档位",
			bandLead: "对照低 / 中 / 高。不开方，不给袋数。",
			bandGo: "看档位",
			bandLow: "偏低",
			bandMid: "中等",
			bandHigh: "偏高",
			bandNone: "先填一个数字。"
		},
		community: {
			title: "问答区",
			lead: "把自家地里的照片和现象发出来。作物、地区、你看见的样子写清，互相看。",
			ask: "我要提问",
			empty: "这一类还没有帖。换一个问题类型，或去拍照识别。",
			answered: "已有回答",
			waiting: "待回答",
			needLogin: "提问需要登录",
			needLoginLead: "发帖需要账号，用来在别的设备看到自己的帖。登录后会回到这一页。拍照识别不用登录。",
			goLogin: "去登录",
			goDiagnose: "去拍照识别",
			newTitle: "问一块地的事",
			titlePh: "一句话：你看见了什么",
			bodyPh: "作物、地区、叶位、根、土面。越具体越好。",
			photo: "地里的照片",
			photoHint: "能看清叶、根或土面更好。至少 1 张。",
			camera: "拍照",
			album: "相册",
			errPhoto: "请至少放 1 张地里的照片。",
			errRate: "发得太快了，过一分钟再试。",
			problem: "问题类型",
			crop: "作物",
			region: "地区",
			publish: "发出去",
			publishing: "正在保存…",
			loading: "正在打开帖子…",
			gone: "这篇不在了",
			back: "返回问答区",
			answers: "回答",
			noAnswers: "还没有人回。李泽宇看到会回。",
			replyPh: "补充你看见的，或给出地里能做的下一步。",
			reply: "跟一句",
			loginToReply: "登录后才能跟帖",
			diagnoseFree: "拍照识别不用登录",
			errShort: "再写具体一点：作物、地区、你看见的样子。",
			errBlocked: "这句话发不出去。换一种说法。",
			errSave: "这次没存上。过一会儿再试。",
			errReply: "回复没发出去。",
			enLabel: "英文",
			enPending: "英文稍后补上",
			machineNote: "机器翻译，仅供参考"
		},
		me: {
			title: "我的",
			guest: "还没有登录。登录后能在别的设备看到自己的帖。收藏和诊断历史目前仍只在这台手机。",
			favs: "收藏的农业知识",
			noFavs: "还没有收藏。打开一篇，点「收藏到本机」。",
			history: "最近的拍照识别",
			noHistory: "还没有记录。去拍三张。",
			logout: "退出",
			localOnly: "收藏和诊断历史目前只存在这台手机。清浏览器或换手机就没了。登录后能在别的设备看到自己的帖，诊断历史还不同步到云。"
		},
		login: {
			title: "登录土知",
			lead: "只用邮箱或手机号登录，不用第三方账号。",
			tabLogin: "登录",
			tabRegister: "注册",
			email: "邮箱",
			phone: "手机号（可选，只当登录名，不发短信）",
			password: "密码",
			password2: "再写一遍密码",
			submit: "登录",
			register: "注册",
			fail: "账号或密码不对。",
			exists: "这个邮箱已经注册过，直接登录即可。",
			mismatch: "两次密码不一致。",
			short: "密码至少 8 位。",
			needEmail: "先写邮箱。",
			confirm: "我确认这个账号只用来提问和看自己的帖。",
			needConfirm: "注册前请先勾选确认。"
		},
		about: {
			title: "关于土知",
			producer: "网站制作人：李泽宇。地质爱好者。上海平和学校地质社社长。",
			photoAlt: "李泽宇在页岩露头用地质锤取样。",
			body: "土知把地里看见的样子说清楚，把化验单上的词说成人话。口号是「看懂土地，种好地」。制作人李泽宇。内容供学习对照，不是处方。",
			paragraphs: [
				"土知的口号是「看懂土地，种好地」。给在地里干活的人看。",
				"土知能做这些事：拍照对照土地问题；按现象读农业知识；把化验单上的词说成人话；在问答区把自家地的照片发出来互相看。",
				"土知不做这些事：不替代农技站，也不替代实验室；不把农药商品名当成处方开给你。庄稼已经急了，立刻找当地农技站或植保站，不要在这里等。",
				"写法按地里看见的样子写。每篇有容易认错的对照，也有用量区间。用量须经当地农技站和包装说明确认。",
				"制作人：李泽宇 Li Zeyu。不是卖农资的广告词。",
				"要写信，请到联系页。"
			]
		},
		contact: {
			title: "联系",
			body: "写信给",
			emailFirst: "优先用该邮箱写信。",
			notPhone: "邮箱地址里的数字不是客服电话，请不要拨打。现在没有公众号，也没有微信号。",
			name: "称呼",
			yourEmail: "你的邮箱",
			message: "内容",
			send: "用邮箱发出去",
			hint: "会打开你的邮箱软件，收件人是土知。"
		},
		privacy: {
			title: "隐私与免责",
			body: "拍照识别在服务器上看照片，用于给出对照建议，不拿来公开展示。账号用邮箱或手机号，不经过 Google 或 X。内容仅供学习，具体施肥用药请结合当地农技站和土壤检测。",
			paragraphs: [
				"土知会收集：账号（邮箱或手机号、密码的哈希），拍照识别时你上传的照片和文字，问答区你发的帖和回复。",
				"诊断照片只为给出对照建议，不会拿去公开展示。除非你自己把照片发到问答区。",
				"拍照识别会把照片发到土知的服务器，再交给模型服务商 xAI（api.x.ai）分析。该服务在境外，照片可能出境。我们不把照片拿去当宣传材料。",
				"账号和问答帖保存在数据库里。诊断照片用于当次识别。要删账号和照片，写信到联系页的邮箱，我们会尽快处理。",
				"现在只用邮箱或手机号登录，不用 Google、X、微信。手机号只当登录名，不发短信验证，也不是「已验证号码」。",
				"诊断和农业知识仅供学习，不能替代农技站或化验室。严重问题立刻找当地农技站。",
				"请不要拍摄无关人脸、证件、别人的地和隐私。拍自家作物、叶子和土面即可。",
				"页脚那句免责声明始终有效。"
			]
		},
		err: {
			title: "这一页出了问题",
			back: "回首页"
		},
		tts: {
			listen: "听全文",
			pause: "暂停",
			resume: "继续",
			stop: "停止",
			rate: "语速",
			progress: "进度",
			howto: "只读办法",
			full: "读全文",
			noZhVoice: "这台设备没有中文语音，下面是口述稿，请看稿。不会用英文嗓子硬读。",
			unsupported: "这台设备不能朗读。你仍可以自己看文字。"
		}
	},
	en: {
		name: "Tuzhi",
		tagline: "Know the soil, farm it well.",
		desc: "Soil literacy for farmers: say clearly what the field looks like, and put the lab-sheet words into plain speech.",
		nav: {
			home: "Home",
			diagnose: "Photo check",
			knowledge: "Field guide",
			community: "Q&A",
			me: "Me",
			wiki: "Reading the soil test",
			login: "Sign in",
			short: {
				home: "Home",
				diagnose: "Photo",
				knowledge: "Guides",
				wiki: "Lab sheet",
				community: "Q&A",
				me: "Me"
			}
		},
		footer: {
			about: "About",
			knowledge: "Field guide",
			wiki: "Reading the soil test",
			community: "Q&A",
			privacy: "Privacy",
			contact: "Contact",
			maker: "Made by Li Zeyu"
		},
		disclaimer: "Diagnosis is for learning only. It does not replace a local agronomist or a lab test. For serious damage, call your extension station.",
		disclaimerShort: "For learning only. Fertiliser and pesticide decisions need a local agronomist and a soil test.",
		fieldHint: "In the field, check three things first: which leaves (new or old), the roots (white, brown, or smelly), the soil surface (white crust, standing water, or cracked). If those three don’t line up, don’t rush a bag of fertiliser.",
		all: "All",
		uncertain: "Not sure",
		search: "Search",
		langSwitch: "中文",
		langSwitchAria: "Switch to 中文",
		examples: [
			"white crust",
			"yellow leaves",
			"acid soil",
			"hard soil"
		],
		home: {
			heroAlt: "A wide stretch of farmland",
			lead: "When the soil crusts white or seedlings stall, photograph the whole plant, a close-up, and the soil surface, then compare it with the field guide. Words on a lab sheet are explained under Reading the soil test.",
			diagnose: "Photograph the field to identify the problem",
			searchPh: "white crust, yellow leaves, hard soil",
			searchAria: "Search soil problems",
			problems: "Common problems",
			hot: "Popular guides",
			more: "All",
			posts: "Recent Q&A",
			toCommunity: "Open Q&A",
			answered: (n) => `${n} answer${n === 1 ? "" : "s"}`,
			waiting: "Waiting",
			noPosts: "No posts yet. Photograph the field, or open the field guide."
		},
		diagnose: {
			title: "Photograph the field to identify the problem",
			lead: "Photograph the whole plant, a close-up and the soil surface, then match them to the field guide. Try to keep soil trouble apart from disease and spray injury.",
			slotPlant: "Whole plant or the bed",
			hintPlant: "Get the whole plant or a full row in frame",
			avoidPlant: "Don’t shoot only sky or a shoe",
			slotLeaf: "Leaf or root close-up",
			hintLeaf: "Focus on the blade or the root tip",
			avoidLeaf: "Blurred, or black against the sun",
			slotSoil: "Soil surface",
			hintSoil: "White crust, cap, standing water — keep them sharp",
			avoidSoil: "A distant landscape",
			shot: "Shoot it like this:",
			avoid: "Not like that:",
			camera: "Camera",
			album: "Album",
			labToggle: "Optional: a lab sheet / typed numbers",
			labHide: "Hide the lab sheet",
			labPhoto: "Photo of the sheet",
			labHint: "Keep pH, EC and organic matter readable",
			labAvoid: "Glare that hides the numbers",
			labFill: "I’ll type the numbers (steadier than guessing from a photo):",
			crop: "Crop",
			region: "Region",
			stage: "Growth stage",
			fert: "Recent fertiliser",
			fertNote: "One extra line about fertiliser (optional)",
			qPh: "e.g. maize, old leaves yellow first, soil a bit white, Northern China, compound fertiliser last week",
			needPhoto: "Fill at least one photo slot, or write the scene clearly.",
			noPhotoWarn: "Without photos the read is weak. Add the plant, the close-up and the soil if you can. Here’s a text-only pass.",
			fewPhotoWarn: "More photos would help. Here’s a pass on what you sent.",
			sending: "Looking at the photos, about ten to twenty seconds…",
			send: "Identify",
			wait: "Please wait",
			sendFail: "This pass didn’t go through. Wait a moment and photograph again, or open the field guide.",
			result: "What this looks like",
			retry: "Photograph again",
			example: "See the acid-soil example",
			exampleNote: "A sketch — don’t fertilise from the picture alone.",
			analysis: "What I see in the photos",
			seen: "Matched to the field guide",
			causes: "Likely reasons",
			lab: "How to read the sheet",
			dont: "Don’t do this first",
			next: "What you can do next",
			related: "Related guides",
			testHint: "If it still doesn’t line up, test the soil.",
			saveLogin: "Sign in to keep this result under Me",
			saved: "Saved on this phone",
			followPh: "One more line (optional)",
			followSend: "Ask again",
			followTitle: "Follow-up",
			aiBusy: "Looking…",
			aiOff: "Photo check is off right now. You can still open the field guide or ask in Q&A.",
			empty: "No result yet.",
			source: "Matched to the field guide — not a prescription.",
			sttMic: "Tap to talk",
			sttHold: "You can also hold to talk",
			sttListening: "Listening…",
			sttNoHear: "Didn’t catch that. Come closer, or type.",
			sttNoMic: "No microphone permission. We only open the mic to hear you. You can edit the words after.",
			sttNoSupport: "This browser can’t do speech. The text box is open.",
			sttNet: "Network recognition failed. Retry or type.",
			sttPerm: "We only open the mic to hear you. You can edit the words after.",
			sttDialect: "Speech recognition follows this page’s language. If the transcript is wrong, edit it before you submit.",
			sttBusy: "Turning the recording into words…",
			sttStop: "Stop",
			labPhRange: "pH must be between 0 and 14.",
			labNeg: "Lab numbers can’t be negative.",
			labOcr: "Numbers read from the sheet. Please check and edit.",
			guess: "What this is closer to",
			listenConclusion: "Listen to the conclusion",
			shareCard: "Save a share card",
			shareSaved: "Share card saved",
			unlike: "What this is not",
			kindSoil: "Closer to a soil problem",
			kindDisease: "Closer to disease",
			kindSpray: "Closer to spray injury",
			kindSalt: "Closer to salt injury",
			kindLow: "Not enough information",
			confHigh: "High confidence",
			confMid: "Medium confidence",
			confLow: "Low confidence",
			fewPlant: "Missing the whole plant — can’t tell patch from whole bed.",
			fewLeaf: "Missing the close-up — leaf position and spots are unclear.",
			fewSoil: "Missing the soil surface — white crust, water or cap can’t be seen."
		},
		knowledge: {
			title: "Field guide",
			lead: "Something looks wrong in the field? Match it here — acid soil, salt, iron lock, waterlog. Lab-sheet words live under Reading the soil test.",
			toWiki: "Can’t read the lab sheet? Open Reading the soil test",
			ph: "white crust, yellow leaves, hard soil",
			byProblem: "Problem",
			byCrop: "Crop",
			byRegion: "Region",
			bySeason: "Season",
			moreFilters: "Show crop / region / season",
			lessFilters: "Hide crop / region / season",
			seasonNote: "Winter only lists guides tagged winter — year-round is not mixed in.",
			morePage: (n) => `Load ${n} more`,
			emptyHint: "Or open the acid-soil guide",
			count: (n) => `${n} guide${n === 1 ? "" : "s"}`,
			empty: "No guide matches this word. Try another, or expand to see every group.",
			emptyCombo: "No guide written for this crop × region × season. Drop one filter, or read the general guide.",
			sMechanism: "Why it looks like this",
			sExample: "One number example",
			doseTable: "Crop × texture",
			labTable: "Lab-sheet cells",
			pendingPhoto: "Field photo to be added",
			photoKindLab: "A lab check, not your own field.",
			photoKindDiagram: "A sketch. Do not fertilise from the picture alone.",
			contribute: "I have this field photo",
			contributeHint: "Crop, place, and which part. You license Tuzhi to use it for learning.",
			contributeOk: "Draft saved. We will only use it with that license.",
			contributeCrop: "Crop",
			contributePlace: "Place",
			contributePart: "Part (row / root tip / surface)",
			contributeSend: "Save draft",
			missingShot: "To add: photograph the row, the root tip, or the surface",
			doseSee: "This is a diagnosis guide. Rates live in",
			overseasVideo: "If Bilibili is blocked, listen to the spoken script above.",
			searchBili: "Search Bilibili for: ",
			sources: "Sources",
			goDiagnose: "Photograph the field to identify the problem",
			missing: "This guide isn’t here",
			back: "Back to the field guide",
			howto: "Just the steps",
			full: "Full guide",
			fav: "Save on this phone",
			faved: "Saved on this phone",
			s1: "What you see in the field",
			s2: "Easy to mix up",
			s5: "Do this / don’t do that",
			s6: "Rate range",
			s7: "Don’t do this first",
			like: (s) => `Looks like “${s}”`,
			photoNote: "Tap to enlarge. The caption says what to photograph. Missing field photos are marked as to-be-added.",
			doseNote: "These are ranges. Confirm with your local extension station and the product label.",
			videos: "Lesson video",
			related: "Related guides",
			updated: (d, r) => `${d} · ${r} · For learning. Serious damage: local agronomist or a soil test.`,
			ask: "Not sure? Photograph the field to identify the problem",
			play: "Open on Bilibili",
			openBili: "Open on Bilibili",
			openYt: "Open on YouTube",
			biliNote: "If the link will not open, listen to the spoken script above.",
			switchBili: "Bilibili",
			switchZh: "Chinese video",
			switchEn: "English video",
			noEnVideo: "No closely matching English lesson for this guide yet.",
			listen: "Listen to this page",
			pause: "Pause",
			stop: "Stop"
		},
		wiki: {
			title: "Reading the soil test",
			lead: "Plain talk for pH, EC, organic matter, exchangeable aluminium and sodium. What to do in the field lives under the field guide.",
			ph: "Search a word on the sheet, e.g. pH, EC, organic matter, exchangeable Al",
			empty: "No such word. Try the field guide, or photograph the field.",
			aka: "Also called: ",
			back: "Back to Reading the soil test",
			missing: "This word isn’t here",
			sheet: "How it appears on the sheet",
			unit: "Common units",
			read: "How to read the number",
			readNote: "Thresholds only, not a prescription. Rates live in the field guide. This page does not hand you a bag count.",
			field: "What it looks like in the field",
			toGuides: "Related field guides",
			toGuidesLead: "This page explains the cell on the sheet. Bags and steps live in the field guide.",
			readTable: "Low / mid / high (sketch)",
			readTableNote: "Regional classes differ. This table is a comparison, not a prescription.",
			ratio: "Soil:water ratio",
			dont: "Don’t do this",
			bandTitle: "Paste numbers. This only highlights a band.",
			bandLead: "Low / mid / high. No rate, no bag count.",
			bandGo: "Show the band",
			bandLow: "Low",
			bandMid: "Mid",
			bandHigh: "High",
			bandNone: "Enter a number first."
		},
		community: {
			title: "Q&A",
			lead: "Put a photo and what you saw. Crop, region, the look of the field. Other people can look with you.",
			ask: "Ask a question",
			empty: "No posts in this group. Try another problem, or photograph the field.",
			answered: "Answered",
			waiting: "Waiting",
			needLogin: "Sign in to ask",
			needLoginLead: "Asking a question needs an account, so you can see your own posts on another phone. You will come back here after sign-in. Photo check does not need a login.",
			goLogin: "Sign in",
			goDiagnose: "Photograph the field to identify the problem",
			newTitle: "Ask about one field",
			titlePh: "One line: what you saw",
			bodyPh: "Crop, region, which leaves, the root, the soil surface. The more specific, the better.",
			photo: "A field photo",
			photoHint: "Leaves, roots or the soil surface — sharp is better. At least one.",
			camera: "Camera",
			album: "Album",
			errPhoto: "Please add at least one field photo.",
			errRate: "Too fast. Wait a minute and try again.",
			problem: "Problem",
			crop: "Crop",
			region: "Region",
			publish: "Post",
			publishing: "Saving…",
			loading: "Opening the post…",
			gone: "This post isn’t here",
			back: "Back to Q&A",
			answers: "Replies",
			noAnswers: "No replies yet. Li Zeyu will answer when he sees it.",
			replyPh: "Add what you saw, or the next step that can be done in the field.",
			reply: "Reply",
			loginToReply: "Sign in to reply",
			diagnoseFree: "Photo check does not need a login",
			errShort: "Add crop, region and what you saw.",
			errBlocked: "That line can’t go out. Say it another way.",
			errSave: "Didn’t save. Try again in a moment.",
			errReply: "The reply didn’t go out.",
			enLabel: "English translation",
			enPending: "",
			machineNote: "Machine translation, for reference only"
		},
		me: {
			title: "Me",
			guest: "You are not signed in. Sign in to see your posts on another phone. Saved guides and photo-check history still live on this device only.",
			favs: "Saved guides",
			noFavs: "None yet. Open a guide and tap “Save on this phone”.",
			history: "Recent photo checks",
			noHistory: "None yet. Photograph the field to identify the problem.",
			logout: "Sign out",
			localOnly: "Saved guides and photo-check history live on this phone only. Clearing the browser or switching phones deletes them. Sign in to see your Q&A posts elsewhere. Diagnosis history is not synced to the cloud yet."
		},
		login: {
			title: "Sign in to Tuzhi",
			lead: "Email or phone. No Google. No X.",
			tabLogin: "Sign in",
			tabRegister: "Register",
			email: "Email",
			phone: "Phone (optional, used as a login name — no SMS)",
			password: "Password",
			password2: "Password again",
			submit: "Sign in",
			register: "Register",
			fail: "Email or password is wrong.",
			exists: "This email is already registered. Sign in.",
			mismatch: "The two passwords don’t match.",
			short: "Use at least 8 characters.",
			needEmail: "Need an email first.",
			confirm: "I will only use this account to ask questions and see my own posts.",
			needConfirm: "Tick the box before you register."
		},
		about: {
			title: "About Tuzhi",
			producer: "Website Producer: Li Zeyu. A Geoscience Lover. The President of Geoscience Club of Shanghai Pinghe School.",
			photoAlt: "Li Zeyu at a shale outcrop with a rock hammer",
			body: "Tuzhi says clearly what the field looks like, and puts lab-sheet words into plain speech. The line is “Read the land. Farm it well.” Made by Li Zeyu. For learning, not a prescription.",
			paragraphs: [
				"The line is “Read the land. Farm it well.” This site is for people who work the field.",
				"What Tuzhi does: photograph the field to match a problem; read the field guide by what you see; put lab-sheet words into plain speech; post a photo of your own field in Q&A.",
				"What Tuzhi does not do: it does not replace an extension station or a lab; it does not hand you a pesticide brand as a prescription. If the crop is already in trouble, go to the local station now. Do not wait here.",
				"Guides are written from what the field looks like. Each one has easy mix-ups and a rate range. Confirm rates with the local station and the label.",
				"Made by Li Zeyu. That is not a sales pitch.",
				"To write, use the contact page."
			]
		},
		contact: {
			title: "Contact",
			body: "Write to",
			emailFirst: "Please use this email first.",
			notPhone: "The digits in the address are not a hotline. Do not call them. There is no official WeChat account.",
			name: "Name",
			yourEmail: "Your email",
			message: "Message",
			send: "Open email to send",
			hint: "This opens your mail app. The recipient is Tuzhi."
		},
		privacy: {
			title: "Privacy",
			body: "Photo check looks at the pictures on the server to match a guide. It does not publish them. Accounts use email or phone, not Google or X. For learning only. Fertiliser and pesticide decisions need a local agronomist and a soil test.",
			paragraphs: [
				"Tuzhi collects: the account (email or phone, and a password hash), photos and text you send for a photo check, and posts or replies you write in Q&A.",
				"Diagnosis photos are only used to match a guide. They are not shown in public unless you yourself post them in Q&A.",
				"A photo check sends the pictures to Tuzhi’s server, then to the model vendor xAI (api.x.ai). That service is outside China, so the photos may leave the country. We do not use them as publicity.",
				"Accounts and Q&A posts sit in the database. Diagnosis photos are for that one pass. To delete an account and photos, write to the contact email and we will handle it as soon as we can.",
				"Sign-in is email or phone only — not Google, X, or WeChat. A phone number is a login name, not a verified number, and we do not send SMS codes.",
				"Diagnosis and the field guide are for learning. They do not replace an extension station or a lab. For serious damage, go to the local station.",
				"Do not photograph unrelated faces, ID cards, or someone else’s field. Shoot your own crop, leaves and soil surface.",
				"The disclaimer in the footer always applies."
			]
		},
		err: {
			title: "This page broke",
			back: "Home"
		},
		tts: {
			listen: "Listen to this page",
			pause: "Pause",
			resume: "Resume",
			stop: "Stop",
			rate: "Speed",
			progress: "Progress",
			howto: "Just the steps",
			full: "Full text",
			noZhVoice: "This device has no Chinese voice. The spoken script is below. We will not force an English voice onto Chinese.",
			unsupported: "This device can’t read aloud. You can still read the words."
		}
	}
};
function langFromPath(pathname) {
	const p = pathname || "/";
	if (p === "/en" || p.startsWith("/en/")) return "en";
	return "zh";
}
function stripLangPrefix(pathname) {
	const p = pathname || "/";
	if (p === "/en") return "/";
	if (p.startsWith("/en/")) {
		const rest = p.slice(3);
		return rest.startsWith("/") ? rest : `/${rest}`;
	}
	return p;
}
function withLangPath(pathname, lang) {
	const base = stripLangPrefix(pathname);
	if (lang === "en") return base === "/" ? "/en" : `/en${base}`;
	return base;
}
/** URL is the source of truth so /en SSR never paints Chinese. */
function usePathLang() {
	return langFromPath(useRouterState({ select: (s) => s.location.pathname }));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/LangLink-CzNQmGa9.js
var import_jsx_runtime = require_jsx_runtime();
function LangLink(props) {
	const lang = usePathLang();
	const { to, params, search, children, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		...rest,
		to: withLangPath(to, lang),
		params,
		search,
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DeItiFYx.js
var CARDS = /* @__PURE__ */ JSON.parse("[{\"slug\":\"suan-hua\",\"title\":\"土壤酸化：苗发僵，根尖褐秃\",\"subtitle\":\"pH 是测量值，不是病名。粮田低于约 5.5 才谈改酸。\",\"summary\":\"秧苗发僵、邻垄还绿时，先拔一棵洗手看根尖。根尖褐秃再测耕作层 pH，粮田低于约 5.5 才谈农用石灰。\",\"crops\":[\"水稻\",\"茶叶\",\"果树\",\"花生\",\"蔬菜\",\"玉米\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"pH\",\"石灰\",\"铝毒\"],\"photos\":[{\"src\":\"/images/articles/suan-hua.jpg\",\"alt\":\"实验室麦苗根部对照\"},{\"src\":\"/images/articles/suan-hua-2.jpg\",\"alt\":\"实验室麦苗根部对照\"},{\"src\":\"/images/articles/lv-du-shang-gen.jpg\",\"alt\":\"根尖褐秃对照\"},{\"src\":\"/images/articles/shi-hui-yong-liang.jpg\",\"alt\":\"农用石灰包装\"}],\"hot\":true,\"featured\":true,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shi-hui-yong-liang\",\"lv-du-shang-gen\",\"sheng-li-suan-xing-fei\"],\"conditions\":\"多雨红黄壤、连年铵态氮、有机质薄。春雨一场接一场更爱往酸里走。\",\"commonCrops\":\"水稻、花生、玉米、蔬菜、柑橘。茶叶耐酸但另篇讲。\",\"card\":\"发僵先看根尖，再测 pH。粮田低于约 5.5 才改。\"},{\"slug\":\"yan-jian\",\"title\":\"盐碱地：土面发白，出苗不齐\",\"subtitle\":\"土面白粉或硬壳、叶缘发焦，先把盐害和碱化分开。\",\"summary\":\"土面有白粉或硬壳、叶缘发焦、小水浇完更蔫，先分盐害和碱化。盐害看电导，碱害看 pH 和钠。\",\"crops\":[\"小麦\",\"玉米\",\"棉花\"],\"problems\":[\"盐碱\"],\"regions\":[\"华北\",\"西北\",\"黄淮海\"],\"seasons\":[\"春季\",\"冬季\"],\"tags\":[\"盐碱\",\"白霜\",\"EC\",\"洗盐\"],\"photos\":[{\"src\":\"/images/articles/yan-jian-2.jpg\",\"alt\":\"盐碱地土面白霜\"},{\"src\":\"/images/articles/yan-jian.jpg\",\"alt\":\"土面白霜\"},{\"src\":\"/images/articles/fan-yan.jpg\",\"alt\":\"浇后返盐\"},{\"src\":\"/images/articles/yan-jian-di-xuan-zuo.jpg\",\"alt\":\"盐碱地缺苗对照邻块还能出苗\"}],\"hot\":true,\"featured\":true,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"fan-yan\",\"han-yan-jian-bie\",\"xi-yan-pai-shui\"],\"conditions\":\"干旱蒸发大、地下水咸、大水漫灌后又晒干。春季返盐最清楚。\",\"commonCrops\":\"棉花、小麦、玉米。有淡水可用水稻压盐。\",\"card\":\"土面发白加浇后更蔫，先测电导。没沟不要漫灌。\"},{\"slug\":\"ban-jie\",\"title\":\"土壤板结：根横着走，水进不去\",\"subtitle\":\"雨后一层稀泥、干了发硬，根横着走，先认硬盖再谈肥。\",\"summary\":\"锄头试一下：雨后稀泥、干了发硬，苗戴帽、根横走。刨开二十厘米看有没有发亮的硬盖，湿土别进车。\",\"crops\":[\"水稻\",\"小麦\",\"玉米\",\"蔬菜\"],\"problems\":[\"板结\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"犁底层\",\"深松\"],\"photos\":[{\"src\":\"/images/articles/ban-jie-2.jpg\",\"alt\":\"田间剖面：上层较暗，下面土层更紧\"},{\"src\":\"/images/articles/ban-jie.jpg\",\"alt\":\"田间板结土面\"},{\"src\":\"/images/articles/li-di-ceng.jpg\",\"alt\":\"犁底层剖面\"},{\"src\":\"/images/articles/ban-jie-yu-gen-xi.jpg\",\"alt\":\"硬盖让根横走\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"li-di-ceng\",\"nian-tu-nan-geng\",\"yu-hou-ban-jie-kai-lie\"],\"conditions\":\"连年浅旋、湿土进车、有机质薄。雨后第二天最能看出来。\",\"commonCrops\":\"小麦、玉米、水稻、蔬菜，黏土地更重。\",\"card\":\"根横走、雨后积水，先找硬盖。湿土不要进车。\"},{\"slug\":\"you-ji-zhi\",\"title\":\"有机质下降：土色发浅，肥留不住\",\"subtitle\":\"颜色浅、搓不成团，一场雨肥就飘，先把有机质慢慢养起来。\",\"summary\":\"搓一把土：颜色浅、发粉、搓不成团，肥下去一场雨又像没施。有机质要连续几年还田加腐熟粪，不是一季菌剂能补回。\",\"crops\":[\"全国\"],\"problems\":[\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质\",\"秸秆还田\",\"保肥\"],\"photos\":[{\"src\":\"/images/articles/you-ji-zhi.jpg\",\"alt\":\"浅色麦田土面\"},{\"src\":\"/images/articles/jie-gan-huan-tian.jpg\",\"alt\":\"秸秆还田\"},{\"src\":\"/images/articles/sha-tu-zeng-you-ji-zhi.jpg\",\"alt\":\"沙土保肥\"},{\"src\":\"/images/articles/sha-tu-zeng-you-ji-zhi-2.jpg\",\"alt\":\"沙土增有机质对照\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"jie-gan-huan-tian\",\"you-ji-fei-ru-he-xuan\",\"sha-tu-zeng-you-ji-zhi\"],\"conditions\":\"秸秆拿走、连年裸冬、只靠化肥。沙土更显。\",\"commonCrops\":\"粮田、菜地、果园都见。沙土漏得更明显。\",\"card\":\"土色浅、一把就散，先测有机质。菌剂产品补不回三年还田。\"},{\"slug\":\"que-dan\",\"title\":\"缺氮：下部老叶先匀黄\",\"subtitle\":\"底下老叶匀黄、新叶还绿、根是白的，才像缺氮。\",\"summary\":\"底下老叶匀黄，顶上新叶还绿，洗出来的根是白的，才像缺氮。新叶也黄要想缺硫或缺铁。根黑臭时不要猛尿素。\",\"crops\":[\"水稻\",\"小麦\",\"玉米\",\"蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"缺氮\",\"黄叶\",\"尿素\"],\"photos\":[{\"src\":\"/images/articles/que-dan.jpg\",\"alt\":\"下部老叶均匀发黄、新叶相对还绿\"},{\"src\":\"/images/articles/que-dan-2.jpg\",\"alt\":\"缺氮植株瘦高不壮\"},{\"src\":\"/images/articles/yu-mi-miao-huang.jpg\",\"alt\":\"玉米苗黄对照\"},{\"src\":\"/images/articles/huang-ye-jian-bie.jpg\",\"alt\":\"黄叶叶位\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"huang-ye-jian-bie\",\"que-liu\",\"jie-gan-bu-dan\"],\"conditions\":\"氮会搬家，老叶把氮送给新叶。沙土一次倒全年留不住。\",\"commonCrops\":\"玉米、小麦、水稻、叶菜。\",\"card\":\"老叶匀黄、新叶还绿、根还白，才像缺氮。根臭先别追氮。\"},{\"slug\":\"que-jia\",\"title\":\"缺钾：老叶边缘先焦\",\"subtitle\":\"老叶叶缘先焦、往里卷，土面不一定白，先分盐害和缺钾。\",\"summary\":\"老叶叶缘先焦，像火燎过往里卷，茎软果不甜。土面白霜加焦边，先分盐害和缺钾，不要直接补钾。\",\"crops\":[\"水稻\",\"玉米\",\"蔬菜\",\"果树\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"夏季\",\"秋季\"],\"tags\":[\"缺钾\",\"叶缘焦枯\"],\"photos\":[{\"src\":\"/images/articles/que-jia.jpg\",\"alt\":\"老叶叶缘焦枯像火燎\"},{\"src\":\"/images/articles/que-jia-2.jpg\",\"alt\":\"缺钾叶缘焦从外向内\"},{\"src\":\"/images/articles/yan-jian-2.jpg\",\"alt\":\"土面白霜对照\"},{\"src\":\"/images/articles/yu-mi-miao-huang.jpg\",\"alt\":\"叶缘焦和黄叶对照\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"huang-ye-jian-bie\",\"lv-hai\",\"yang-fen-kang-kang\"],\"conditions\":\"钾管气孔和糖分。缺了叶边先焦。盐害也焦边，但常有白霜和出苗差。\",\"commonCrops\":\"水稻、玉米、蔬菜、果树、马铃薯。\",\"card\":\"老叶焦边先看土面。有白霜走盐，没霜再问钾。\"},{\"slug\":\"que-lin\",\"title\":\"缺磷：苗紫红发僵，根少不发棵\",\"subtitle\":\"暗绿带紫、发僵，不是匀黄那种缺\",\"summary\":\"苗期紫红发僵，叶暗绿，根短少。\",\"crops\":[\"小麦\",\"玉米\",\"蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-lin\"],\"photos\":[{\"src\":\"/images/articles/que-lin.jpg\",\"alt\":\"缺磷苗紫红发僵\"},{\"src\":\"/images/articles/que-lin-2.jpg\",\"alt\":\"缺磷根系短少\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-tu-shi-lin\",\"que-xin-yu-lin\",\"huang-ye-jian-bie\"],\"conditions\":\"磷管生根。酸土被铁铝钉住，钙质土被钙钉住，土里有磷根摸不着。\",\"commonCrops\":\"玉米、小麦、水稻、油菜、豆类。\"},{\"slug\":\"que-tie\",\"title\":\"缺铁：新叶黄、叶脉还绿\",\"subtitle\":\"新叶黄、叶脉还绿，先问 pH 是不是把铁锁住了。\",\"summary\":\"分清黄的是新叶还是老叶。新叶黄、叶脉还绿，顶端更明显，常是 pH 偏高把铁锁住，不是土里没有铁。\",\"crops\":[\"果树\",\"花生\",\"大豆\"],\"problems\":[\"缺素\",\"盐碱\"],\"regions\":[\"华北\",\"西北\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"缺素\",\"盐碱\",\"que-tie\"],\"photos\":[{\"src\":\"/images/articles/que-tie.jpg\",\"alt\":\"新叶黄、叶脉还绿\"},{\"src\":\"/images/articles/que-tie-2.jpg\",\"alt\":\"果树缺铁黄化新梢\"},{\"src\":\"/images/articles/pu-tao-shi-hui-tu-que-tie.jpg\",\"alt\":\"石灰性土新叶黄\"},{\"src\":\"/images/articles/shi-hui-xing-tu.jpg\",\"alt\":\"石灰性土壤\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"pu-tao-shi-hui-tu-que-tie\",\"qi-zi-huang-hua\",\"shi-hui-xing-tu\"],\"conditions\":\"高 pH 把铁锁住。土里有铁，根吃不到。缺氮是老叶先黄，路不一样。\",\"commonCrops\":\"柑橘、葡萄、花生、大豆、花卉、桃。\",\"card\":\"新叶黄、脉还绿，先想铁被锁住，不要只冲氮。\"},{\"slug\":\"que-xin\",\"title\":\"缺锌：新叶脉间失绿，节间缩短\",\"subtitle\":\"花白苗、节间短，生长点先出事\",\"summary\":\"新叶脉间失绿、节间短、小叶簇生，玉米花白苗最典型。\",\"crops\":[\"玉米\",\"水稻\",\"果树\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-xin\"],\"photos\":[{\"src\":\"/images/articles/que-xin.jpg\",\"alt\":\"玉米花白苗、节间缩短\"},{\"src\":\"/images/articles/que-xin-2.jpg\",\"alt\":\"果树小叶簇生\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-xin-yu-lin\",\"yang-fen-kang-kang\",\"yu-mi-miao-huang\"],\"conditions\":\"锌走生长点。高磷会把门堵住。石灰性土、高 pH 更常见。\",\"commonCrops\":\"玉米、水稻、果树、菜豆。\"},{\"slug\":\"lian-zuo\",\"title\":\"连作障碍：同一块地越种越差\",\"subtitle\":\"死棵、死苗、土传病害一年比一年重\",\"summary\":\"同一茬越种越差，点片死棵，邻地轮作的却好。\",\"crops\":[\"设施蔬菜\",\"花生\"],\"problems\":[\"连作障碍\"],\"regions\":[\"黄淮海\",\"华北\",\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"lian-zuo\"],\"photos\":[{\"src\":\"/images/articles/lian-zuo.jpg\",\"alt\":\"连作棚点片死棵\"},{\"src\":\"/images/articles/lian-zuo-2.jpg\",\"alt\":\"连作根腐根结\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"da-peng-lian-zuo-zong-he\",\"gen-fu-jian-bie\",\"wei-sheng-wu\"],\"conditions\":\"重茬把病菌、线虫、盐和偏肥熬在一口锅里。菌剂代替不了换科轮作。\",\"commonCrops\":\"番茄、黄瓜、辣椒、西瓜、草莓、花生、茄子。\"},{\"slug\":\"dashe-yanzhi\",\"title\":\"大棚盐渍化：膜下白霜，越种越“咸”\",\"subtitle\":\"设施菜地特有的肥盐问题\",\"summary\":\"膜下白霜、滴口一圈、越浇越蔫。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"盐碱\",\"肥害\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"全年\",\"冬季\"],\"tags\":[\"盐碱\",\"肥害\",\"dashe-yanzhi\"],\"photos\":[{\"src\":\"/images/articles/dashe-yanzhi.jpg\",\"alt\":\"大棚膜下土面白霜\"},{\"src\":\"/images/articles/dashe-yanzhi-2.jpg\",\"alt\":\"设施内盐斑\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"di-guan-nong-du\",\"fan-yan\",\"da-peng-lian-zuo-zong-he\"],\"conditions\":\"大棚是盆，盐排不出去。底肥拍胸脯、滴灌越浓，盆就越咸。\",\"commonCrops\":\"番茄、黄瓜、辣椒、草莓。\"},{\"slug\":\"shao-gen\",\"title\":\"施肥烧根：种沟成行，肥粒贴根\",\"subtitle\":\"施肥几天内叶焦根黑，种沟能见肥粒，先认肥害再谈补救。\",\"summary\":\"施肥几天内叶焦根黑，种沟能见肥粒，沿肥带成行。先把肥从根边挪开、浇水稀释，不要再叠一袋。\",\"crops\":[\"蔬菜\",\"玉米\",\"设施蔬菜\"],\"problems\":[\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"肥害\",\"shao-gen\"],\"photos\":[{\"src\":\"/images/articles/shao-gen.jpg\",\"alt\":\"施肥沟里苗烧、根尖发黑\"},{\"src\":\"/images/articles/shao-gen-2.jpg\",\"alt\":\"烧根根尖褐黑\"},{\"src\":\"/images/articles/miao-qi-fei-hai.jpg\",\"alt\":\"苗期肥害\"},{\"src\":\"/images/articles/wei-fu-shu-you-ji-fei.jpg\",\"alt\":\"未腐熟有机肥\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"miao-qi-fei-hai\",\"wei-fu-shu-you-ji-fei\",\"di-guan-nong-du\"],\"conditions\":\"肥把根周围做成盐水。沙土、种肥贴种子、一次过浓最伤。\",\"commonCrops\":\"蔬菜育苗、玉米穴施、果树穴施最常见。\",\"card\":\"种沟成行、能见肥粒，是烧根。先停肥灌清水。\"},{\"slug\":\"lao-hai\",\"title\":\"积水涝害：土湿还蔫，根在憋气\",\"subtitle\":\"白天蔫晚上缓，土是湿的还蔫，先看根黑不黑。\",\"summary\":\"白天蔫晚上缓，田里有明水或底湿，根黑臭。土是湿的还蔫，先排水，不要当旱猛灌，也不要猛尿素。\",\"crops\":[\"水稻\",\"蔬菜\"],\"problems\":[\"涝害\",\"板结\"],\"regions\":[\"长江中下游\",\"华南\"],\"seasons\":[\"夏季\"],\"tags\":[\"涝害\",\"板结\",\"lao-hai\"],\"photos\":[{\"src\":\"/images/articles/lao-hai.jpg\",\"alt\":\"田间积水、苗发黄萎蔫\"},{\"src\":\"/images/articles/lao-hai-2.jpg\",\"alt\":\"涝害根发黑\"},{\"src\":\"/images/articles/xiu-shui-tian.jpg\",\"alt\":\"渍水田面\"},{\"src\":\"/images/articles/qian-yu-tian.jpg\",\"alt\":\"潜育化土层\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shui-tian-huan-yuan\",\"ban-jie\",\"huang-ye-jian-bie\"],\"conditions\":\"根要氧气。水把气排走，根就闷死。湿土再浇是火上浇油。\",\"commonCrops\":\"玉米、棉花、大豆、蔬菜最怕；水稻也怕长期深涝。\",\"card\":\"土湿还蔫、根有味，先排水。不要当旱浇。\"},{\"slug\":\"wei-sheng-wu\",\"title\":\"土壤微生物失衡：土不“活”了\",\"subtitle\":\"有机质低、农药化肥过猛，土里的工人变少\",\"summary\":\"养分不低却长不好，秸秆一年不烂，土臭发黏没孔隙。\",\"crops\":[\"设施蔬菜\",\"蔬菜\"],\"problems\":[\"连作障碍\",\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"有机质低\",\"wei-sheng-wu\"],\"photos\":[{\"src\":\"/images/articles/wei-sheng-wu.jpg\",\"alt\":\"结构差、板、无孔隙的死土\"},{\"src\":\"/images/articles/wei-sheng-wu-2.jpg\",\"alt\":\"发黏发臭的土块\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"sheng-wu-you-ji-fei\",\"lian-zuo\",\"you-ji-zhi\"],\"conditions\":\"菌要房要饭。板、酸、咸、没有机质，倒菌也住不下。先改物理化学，菌才回来。\",\"commonCrops\":\"设施蔬菜和果园最突出。\"},{\"slug\":\"ce-tu-bao-gao\",\"title\":\"如何看懂测土化验单\",\"subtitle\":\"报告是测量，不是处方。先对地块名，再按 pH、有机质、盐分往下读。\",\"summary\":\"单子拿回来先对地块名和取样日期。阅读顺序：pH → 有机质 → 盐分 → 氮磷钾 → 微量元素。单位看错，肥会下反。\",\"crops\":[\"全国\"],\"problems\":[\"其他\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"ce-tu-bao-gao\"],\"photos\":[{\"src\":\"/images/articles/ce-tu-bao-gao-2.jpg\",\"alt\":\"中文测土单示意图：pH、有机质、碱解氮、有效磷、速效钾\"},{\"src\":\"/images/articles/ce-tu-bao-gao.jpg\",\"alt\":\"化验单阅读顺序\"},{\"src\":\"/images/articles/ce-tu-qu-yang.jpg\",\"alt\":\"田间取样\"},{\"src\":\"/images/articles/ce-tu-qu-yang-2.jpg\",\"alt\":\"取样点混合后再留一袋\"}],\"hot\":true,\"featured\":true,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ce-tu-qu-yang\",\"huang-ye-jian-bie\",\"suan-hua\"],\"conditions\":\"刚拿到化验单、准备配肥或改土之前。\",\"commonCrops\":\"所有作物。这篇农业知识不讲某一种庄稼的处方，讲怎么读。\",\"card\":\"先圈 pH、有机质、盐分。报告是测量，不是处方。\"},{\"slug\":\"ce-tu-qu-yang\",\"title\":\"测土怎么取样才不准\",\"subtitle\":\"取样错了，报告就是瞎的\",\"summary\":\"取样错了，后面全错。\",\"crops\":[\"全国\"],\"problems\":[\"其他\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"ce-tu-qu-yang\"],\"photos\":[{\"src\":\"/images/articles/ce-tu-qu-yang.jpg\",\"alt\":\"田间多点取样、土袋\"},{\"src\":\"/images/articles/ce-tu-qu-yang-2.jpg\",\"alt\":\"土钻取耕作层\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ce-tu-bao-gao\",\"guo-yuan-tu-rang\",\"dashe-yanzhi\"],\"conditions\":\"准备测土、改酸、配肥之前。刚施完肥、刚撒完石灰别取。\",\"commonCrops\":\"所有作物。\"},{\"slug\":\"que-gai\",\"title\":\"缺钙：顶芽烂、脐腐、裂果\",\"subtitle\":\"新长的部位先出事，喷叶面钙只能救急\",\"summary\":\"顶芽停、脐腐、裂果、心叶焦边。\",\"crops\":[\"蔬菜\",\"果树\",\"设施蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"缺素\",\"que-gai\"],\"photos\":[{\"src\":\"/images/articles/que-gai.jpg\",\"alt\":\"番茄脐腐、顶芽出问题\"},{\"src\":\"/images/articles/que-gai-2.jpg\",\"alt\":\"缺钙裂果\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-yu-que-gai\",\"hua-sheng-kong-jia\",\"yang-fen-kang-kang\"],\"conditions\":\"钙像砌墙的砖，摆上就不大搬家。干旱、铵态氮、盐、酸，都会让生长点吃不到。\",\"commonCrops\":\"番茄、辣椒、大白菜、苹果、花生。\"},{\"slug\":\"que-mei\",\"title\":\"缺镁：老叶脉间黄、叶脉还绿\",\"subtitle\":\"老叶脉间先空，新叶相对还绿\",\"summary\":\"你先分清黄的是新叶还是老叶。\",\"crops\":[\"蔬菜\",\"果树\",\"水稻\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"夏季\"],\"tags\":[\"缺素\",\"que-mei\"],\"photos\":[{\"src\":\"/images/articles/que-mei.jpg\",\"alt\":\"老叶脉间黄、叶脉仍绿\"},{\"src\":\"/images/articles/que-mei-2.jpg\",\"alt\":\"缺镁从叶缘向内黄\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yang-fen-kang-kang\",\"que-tie\",\"huang-ye-jian-bie\"],\"conditions\":\"镁在叶绿素里。钾太高会把镁挤掉。缺铁走新叶，缺镁走老叶。\",\"commonCrops\":\"蔬菜、果树、烟草、马铃薯、玉米。\"},{\"slug\":\"que-peng\",\"title\":\"缺硼：花而不实、裂茎空心\",\"subtitle\":\"花开了籽是空的，先想硼也要想旱\",\"summary\":\"花而不实、蕾铃掉、茎空心或裂，生长点萎缩。\",\"crops\":[\"棉花\",\"花生\",\"果树\",\"蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"黄淮海\",\"长江中下游\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-peng\"],\"photos\":[{\"src\":\"/images/articles/que-peng.jpg\",\"alt\":\"花而不实、茎空心\"},{\"src\":\"/images/articles/que-peng-2.jpg\",\"alt\":\"裂茎空心\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-peng-hua-er-bu-shi\",\"ye-cai-xiao-xing-yuan-su\",\"huang-ye-jian-bie\"],\"conditions\":\"硼管开花结实。缺和毒只隔一层纸。沙土、干旱更容易缺。\",\"commonCrops\":\"油菜、棉花、花生、甜菜、果树。\"},{\"slug\":\"que-meng\",\"title\":\"缺锰：新叶脉间失绿、有褐斑\",\"subtitle\":\"新叶脉间黄还带褐点，别当成缺铁\",\"summary\":\"新叶脉间失绿，常带褐斑或灰白小点。\",\"crops\":[\"小麦\",\"大豆\"],\"problems\":[\"缺素\"],\"regions\":[\"华北\",\"黄淮海\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-meng\"],\"photos\":[{\"src\":\"/images/articles/que-meng.jpg\",\"alt\":\"新叶脉间失绿带褐斑\"},{\"src\":\"/images/articles/que-meng-2.jpg\",\"alt\":\"小麦缺锰褐斑\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-tie\",\"suan-hua\",\"huang-ye-jian-bie\"],\"conditions\":\"锰在新叶。过酸或过碱都会乱。有机质很高的石灰性土有时也锁锰。\",\"commonCrops\":\"小麦、大豆、蔬菜。\"},{\"slug\":\"que-liu\",\"title\":\"缺硫：整株偏黄，新叶也黄\",\"subtitle\":\"心叶跟着黄，不是下部先脱色\",\"summary\":\"你先分清黄的是新叶还是老叶。\",\"crops\":[\"蔬菜\",\"水稻\"],\"problems\":[\"缺素\"],\"regions\":[\"长江中下游\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-liu\"],\"photos\":[{\"src\":\"/images/articles/que-liu.jpg\",\"alt\":\"整株偏黄，新叶也黄\"},{\"src\":\"/images/articles/que-liu-2.jpg\",\"alt\":\"缺硫新叶发黄\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-dan\",\"huang-ye-jian-bie\",\"sha-tu-lou-fei\"],\"conditions\":\"硫不容易从老叶搬到新叶。缺氮老叶先黄，缺硫新老一起黄。沙土、高氮更容易显。\",\"commonCrops\":\"油菜、玉米、小麦。\"},{\"slug\":\"que-tong\",\"title\":\"缺铜：穗不实、叶尖发白\",\"subtitle\":\"秕穗加白尖，不是单纯干旱\",\"summary\":\"叶尖发白卷曲，穗不实、结实差。\",\"crops\":[\"小麦\",\"水稻\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-tong\"],\"photos\":[{\"src\":\"/images/articles/que-tong.jpg\",\"alt\":\"叶尖发白卷曲、穗不实\"},{\"src\":\"/images/articles/que-tong-2.jpg\",\"alt\":\"小麦穗不实\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-dan\",\"yao-hai\",\"huang-ye-jian-bie\"],\"conditions\":\"铜在花和穗。有机质很高的沙土、过酸过碱都可能缺。\",\"commonCrops\":\"小麦、水稻。\"},{\"slug\":\"que-mu\",\"title\":\"缺钼：豆科固氮差、叶片畸形\",\"subtitle\":\"根瘤不红、叶子畸形，先别猛尿素\",\"summary\":\"豆科叶片畸形发黄，固氮差、植株瘦。\",\"crops\":[\"大豆\",\"蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-mu\"],\"photos\":[{\"src\":\"/images/articles/que-mu.jpg\",\"alt\":\"豆科叶片畸形、固氮差\"},{\"src\":\"/images/articles/que-mu-2.jpg\",\"alt\":\"大豆缺钼植株\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-hua\",\"que-dan\",\"lv-du-shang-gen\"],\"conditions\":\"钼帮豆科固氮。过酸土钼被锁，过石灰又是另一套乱。\",\"commonCrops\":\"大豆、花生。\"},{\"slug\":\"yang-fen-kang-kang\",\"title\":\"养分互相打架：磷锌拮抗、钾镁失衡\",\"subtitle\":\"肥不是越多越好，多了会把别的挤走\",\"summary\":\"化验单某一项极高，地里却像缺另一项。\",\"crops\":[\"全国\"],\"problems\":[\"缺素\",\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"缺素\",\"肥害\",\"yang-fen-kang-kang\"],\"photos\":[{\"src\":\"/images/articles/yang-fen-kang-kang.jpg\",\"alt\":\"化验单某一项极高\"},{\"src\":\"/images/articles/yang-fen-kang-kang-2.jpg\",\"alt\":\"拮抗示意：高磷植株小叶\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-xin\",\"que-mei\",\"ce-tu-bao-gao\"],\"conditions\":\"养分排队进同一扇门。人多的把门堵住。一张‘很肥’的单子仍能黄。\",\"commonCrops\":\"所有作物，大棚和玉米高产田常见。\"},{\"slug\":\"yao-hai\",\"title\":\"药害：喷完药又斑又扭，不像慢慢缺素\",\"subtitle\":\"喷药后 1～3 天突然斑驳、扭曲、焦边\",\"summary\":\"喷完药几天内斑、扭、心叶畸形，来得快，不像慢慢缺素。\",\"crops\":[\"蔬菜\",\"水稻\",\"果树\",\"棉花\"],\"problems\":[\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"肥害\",\"yao-hai\"],\"photos\":[{\"src\":\"/images/articles/yao-hai.jpg\",\"alt\":\"喷药后叶片扭曲斑驳\"},{\"src\":\"/images/articles/yao-hai-2.jpg\",\"alt\":\"药害心叶畸形\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"huang-ye-jian-bie\",\"miao-qi-fei-hai\",\"que-xin\"],\"conditions\":\"药害是外来一巴掌。缺素是慢慢亏。斑扭不规则、有喷药史，就先停药。\",\"commonCrops\":\"蔬菜、水稻、果树、棉花都可能。\"},{\"slug\":\"miao-qi-fei-hai\",\"title\":\"苗期肥害：出苗就烧、根尖发黑\",\"subtitle\":\"种子旁边那把肥，最容易腌幼根\",\"summary\":\"出苗不齐、小苗叶子焦、根尖发黑。\",\"crops\":[\"玉米\",\"蔬菜\",\"水稻\"],\"problems\":[\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\"],\"tags\":[\"肥害\",\"miao-qi-fei-hai\"],\"photos\":[{\"src\":\"/images/articles/miao-qi-fei-hai.jpg\",\"alt\":\"出苗不齐、小苗叶子焦\"},{\"src\":\"/images/articles/miao-qi-fei-hai-2.jpg\",\"alt\":\"幼苗根尖发黑\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shao-gen\",\"wei-fu-shu-you-ji-fei\",\"que-dan\"],\"conditions\":\"种肥贴种子、穴里拌肥、沙土、出苗那一周。\",\"commonCrops\":\"玉米、蔬菜穴盘和直播最常见。\"},{\"slug\":\"an-hai\",\"title\":\"氨气烧叶烧根：刚施肥就熏\",\"subtitle\":\"设施里闷着，尿素和未腐熟粪最容易冒氨\",\"summary\":\"你先问最近下了什么肥、下了多少。\",\"crops\":[\"设施蔬菜\",\"蔬菜\"],\"problems\":[\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"肥害\",\"an-hai\"],\"photos\":[{\"src\":\"/images/articles/an-hai.jpg\",\"alt\":\"棚内叶缘焦像烟熏\"},{\"src\":\"/images/articles/an-hai-2.jpg\",\"alt\":\"氨气烧伤的嫩叶\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"wei-fu-shu-you-ji-fei\",\"dashe-yanzhi\",\"yao-hai\"],\"conditions\":\"未腐熟粪、碳铵、尿素表施遇湿，氨气往上走。设施更闷。\",\"commonCrops\":\"设施蔬菜。\"},{\"slug\":\"lv-hai\",\"title\":\"氯害：忌氯作物遇上含氯化肥\",\"subtitle\":\"不是所有作物都怕氯，但怕的那些真怕\",\"summary\":\"忌氯作物叶缘焦，问最近用了什么含氯化肥。\",\"crops\":[\"蔬菜\",\"果树\",\"马铃薯\"],\"problems\":[\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"肥害\",\"lv-hai\"],\"photos\":[{\"src\":\"/images/articles/lv-hai.jpg\",\"alt\":\"马铃薯叶缘焦，氯害\"},{\"src\":\"/images/articles/lv-hai-2.jpg\",\"alt\":\"氯害焦边特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-jia\",\"yan-jian\",\"ma-ling-shu-tu\"],\"conditions\":\"氯跟着水走。过量叶缘焦。盐害也焦，但氯害要问肥料袋。\",\"commonCrops\":\"马铃薯、部分蔬菜和果树。\"},{\"slug\":\"di-guan-nong-du\",\"title\":\"滴灌肥水太浓：越浇越伤\",\"subtitle\":\"水肥一体化不是越浓越有劲\",\"summary\":\"你先问最近下了什么肥、下了多少。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"肥害\",\"盐碱\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"肥害\",\"盐碱\",\"di-guan-nong-du\"],\"photos\":[{\"src\":\"/images/articles/di-guan-nong-du.jpg\",\"alt\":\"滴头附近白霜烧圈\"},{\"src\":\"/images/articles/di-guan-nong-du-2.jpg\",\"alt\":\"滴灌过浓伤苗\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"dashe-yanzhi\",\"shao-gen\",\"fan-yan\"],\"conditions\":\"滴灌是细水，浓度高了根吸水费劲。EC 超了不是更有劲。\",\"commonCrops\":\"设施蔬菜。\"},{\"slug\":\"wei-fu-shu-you-ji-fei\",\"title\":\"未腐熟有机肥：当粪宝，变成烧苗\",\"subtitle\":\"生粪发热、抢氮、带虫卵和盐\",\"summary\":\"生粪堆边苗像被烫，粪还臭，土发热。\",\"crops\":[\"蔬菜\",\"果树\"],\"problems\":[\"肥害\",\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"肥害\",\"有机质低\",\"wei-fu-shu-you-ji-fei\"],\"photos\":[{\"src\":\"/images/articles/wei-fu-shu-you-ji-fei.jpg\",\"alt\":\"未腐熟粪肥旁烧苗\"},{\"src\":\"/images/articles/wei-fu-shu-you-ji-fei-2.jpg\",\"alt\":\"未腐熟有机肥发热\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"an-hai\",\"shao-gen\",\"you-ji-zhi\"],\"conditions\":\"未腐熟会抢氮、发热、带盐带氨。当宝埋到根边，就是烧苗。\",\"commonCrops\":\"蔬菜、果树。\"},{\"slug\":\"fan-yan\",\"title\":\"返盐：浇完水土更白\",\"subtitle\":\"春天太阳一晒，盐又爬回来\",\"summary\":\"浇完再晒干看：地表一层白，干湿交界最白，苗更焦边。\",\"crops\":[\"设施蔬菜\",\"小麦\",\"棉花\"],\"problems\":[\"盐碱\"],\"regions\":[\"华北\",\"西北\",\"黄淮海\"],\"seasons\":[\"春季\",\"冬季\"],\"tags\":[\"盐碱\",\"fan-yan\"],\"photos\":[{\"src\":\"/images/articles/fan-yan.jpg\",\"alt\":\"浇后晒干地表一层白\"},{\"src\":\"/images/articles/fan-yan-2.jpg\",\"alt\":\"返盐白壳特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"dashe-yanzhi\",\"han-yan-jian-bie\"],\"conditions\":\"春季蒸发大、膜下、小水勤浇、有盐的井水。浇完第二天太阳一晒最清楚。\",\"commonCrops\":\"小麦、棉花、设施蔬菜。\"},{\"slug\":\"shi-hui-xing-tu\",\"title\":\"石灰性土壤：肥在土里，根吃不到\",\"subtitle\":\"华北西北常见，pH 高，铁锌磷被锁\",\"summary\":\"土并不瘦，叶子却黄，尤其新叶脉绿。\",\"crops\":[\"果树\",\"花生\",\"玉米\"],\"problems\":[\"盐碱\",\"缺素\"],\"regions\":[\"华北\",\"西北\"],\"seasons\":[\"全年\",\"冬季\"],\"tags\":[\"盐碱\",\"缺素\",\"shi-hui-xing-tu\"],\"photos\":[{\"src\":\"/images/articles/shi-hui-xing-tu.jpg\",\"alt\":\"石灰性土壤表土发白\"},{\"src\":\"/images/articles/shi-hui-xing-tu-2.jpg\",\"alt\":\"石灰性土上的黄化植株\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-tie\",\"que-xin\",\"que-lin\"],\"conditions\":\"石灰性土把铁锰锌锁住。化验全量不低，有效量低。\",\"commonCrops\":\"果树、花生、玉米。\"},{\"slug\":\"shi-gao-gai-jian\",\"title\":\"石膏改碱和洗盐\",\"subtitle\":\"碱土和盐土不是一回事，药不能吃错\",\"summary\":\"你低头先看土面那一层白。\",\"crops\":[\"小麦\",\"玉米\",\"棉花\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"华北\"],\"seasons\":[\"春季\"],\"tags\":[\"盐碱\",\"shi-gao-gai-jian\"],\"photos\":[{\"src\":\"/images/articles/shi-gao-gai-jian.jpg\",\"alt\":\"碱土撒石膏\"},{\"src\":\"/images/articles/shi-gao-gai-jian-2.jpg\",\"alt\":\"碱斑土柱\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"suan-hua\",\"fan-yan\"],\"conditions\":\"石膏里的钙把钠换下来，还要靠水把钠洗走。没有排水，石膏白撒。盐土的正道是灌排。\",\"commonCrops\":\"小麦、玉米、棉花。\"},{\"slug\":\"sha-tu-lou-fei\",\"title\":\"沙土漏肥漏水\",\"subtitle\":\"一把肥，一场雨，全没了\",\"summary\":\"你抓一把土搓一搓，看还有没有肉。\",\"crops\":[\"花生\",\"玉米\"],\"problems\":[\"有机质低\"],\"regions\":[\"西北\",\"华北\"],\"seasons\":[\"全年\",\"冬季\"],\"tags\":[\"有机质低\",\"sha-tu-lou-fei\"],\"photos\":[{\"src\":\"/images/articles/sha-tu-lou-fei.jpg\",\"alt\":\"沙土散漏，保不住肥\"},{\"src\":\"/images/articles/sha-tu-lou-fei-2.jpg\",\"alt\":\"沙土地漏水\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"you-ji-zhi\",\"que-dan\",\"di-guan-nong-du\"],\"conditions\":\"沙土是筛子。水肥留不住。一次堆山，第二天就空。\",\"commonCrops\":\"花生、西瓜（按花生/玉米管理思路）、玉米。\"},{\"slug\":\"nian-tu-nan-geng\",\"title\":\"黏土难耕又易裂\",\"subtitle\":\"湿时黏锄，干时裂得像龟背\",\"summary\":\"你拿锄头试一试这块地。\",\"crops\":[\"水稻\",\"小麦\"],\"problems\":[\"板结\"],\"regions\":[\"长江中下游\",\"华南\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"nian-tu-nan-geng\"],\"photos\":[{\"src\":\"/images/articles/nian-tu-nan-geng.jpg\",\"alt\":\"黏土干裂大块，难耕\"},{\"src\":\"/images/articles/nian-tu-nan-geng-2.jpg\",\"alt\":\"黏土地裂缝扯根\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"li-di-ceng\",\"you-ji-zhi\"],\"conditions\":\"黏土颗粒细，水一多就糊，水一少就砖。有机质和适墒是钥匙。\",\"commonCrops\":\"水稻、小麦。\"},{\"slug\":\"li-di-ceng\",\"title\":\"犁底层：旋耕下面那层硬盖\",\"subtitle\":\"根到这里就拐弯\",\"summary\":\"刨开剖面：十五到二十厘米下面一层发亮硬盖，根到那儿拐弯。\",\"crops\":[\"小麦\",\"玉米\",\"水稻\"],\"problems\":[\"板结\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"li-di-ceng\"],\"photos\":[{\"src\":\"/images/articles/li-di-ceng.jpg\",\"alt\":\"剖面里一层致密犁底层，根拐弯\"},{\"src\":\"/images/articles/li-di-ceng-2.jpg\",\"alt\":\"犁底层发亮硬盖特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"lao-hai\",\"hei-tu-tui-hua\"],\"conditions\":\"同一深度年年旋、湿土进机，压出犁底层。根浅了，旱涝都更敏感。\",\"commonCrops\":\"小麦、玉米、水稻。\"},{\"slug\":\"hei-tu-tui-hua\",\"title\":\"东北黑土变瘦变硬\",\"subtitle\":\"黑土层变薄，家底被吃掉\",\"summary\":\"你抓一把土搓一搓，看还有没有肉。\",\"crops\":[\"玉米\",\"大豆\",\"水稻\"],\"problems\":[\"有机质低\",\"板结\"],\"regions\":[\"东北\"],\"seasons\":[\"全年\",\"冬季\"],\"tags\":[\"有机质低\",\"板结\",\"hei-tu-tui-hua\"],\"photos\":[{\"src\":\"/images/articles/hei-tu-tui-hua.jpg\",\"alt\":\"黑土层变薄、心土露出、板硬\"},{\"src\":\"/images/articles/hei-tu-tui-hua-2.jpg\",\"alt\":\"退化黑土风蚀\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"you-ji-zhi\",\"jie-gan-huan-tian\",\"li-di-ceng\"],\"conditions\":\"黑土的肉在有机质。风蚀、水蚀、只拿不还，黑土层一年年变薄。加氮补不回变薄的 A 层。\",\"commonCrops\":\"玉米、大豆、水稻。\"},{\"slug\":\"jie-gan-huan-tian\",\"title\":\"秸秆还田：改土也会烧苗和抢氮\",\"subtitle\":\"不是把秸秆一撒就完\",\"summary\":\"还田后出苗黄弱、粉碎压实不够也会出苗难。\",\"crops\":[\"玉米\",\"水稻\",\"小麦\"],\"problems\":[\"有机质低\",\"肥害\"],\"regions\":[\"东北\",\"黄淮海\",\"长江中下游\"],\"seasons\":[\"秋季\",\"春季\"],\"tags\":[\"有机质低\",\"肥害\",\"jie-gan-huan-tian\"],\"photos\":[{\"src\":\"/images/articles/jie-gan-huan-tian.jpg\",\"alt\":\"秸秆还田后出苗黄弱\"},{\"src\":\"/images/articles/jie-gan-huan-tian-2.jpg\",\"alt\":\"还田秸秆覆盖的地\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"you-ji-zhi\",\"que-dan\",\"hei-tu-tui-hua\"],\"conditions\":\"秸秆碳多，微生物先吃饭，苗会饿一阵。碎得不够、压不实，出苗像钻被子。\",\"commonCrops\":\"玉米、水稻、小麦。\"},{\"slug\":\"shi-hui-yong-liang\",\"title\":\"石灰怎么用才不把土改过劲\",\"subtitle\":\"已经决定改酸，才问用哪种灰、撒多少。农用的才能下地。\",\"summary\":\"已经决定改酸，才问用哪种灰、撒多少、何时撒。农用石灰才能下地，建筑石灰不行。粮田常见每亩 50–150 公斤，沙土按下限，分两次。\",\"crops\":[\"水稻\",\"茶叶\",\"果树\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"shi-hui-yong-liang\"],\"photos\":[{\"src\":\"/images/articles/shi-hui-yong-liang.jpg\",\"alt\":\"农用石灰撒在酸性土上\"},{\"src\":\"/images/articles/shi-hui-yong-liang-2.jpg\",\"alt\":\"石灰粉堆在田间\"},{\"src\":\"/images/articles/hong-huang-rang-gai-suan.jpg\",\"alt\":\"红黄壤改酸\"},{\"src\":\"/images/articles/cha-yuan-shi-hui-jin-ji.jpg\",\"alt\":\"茶园石灰禁忌\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-hua\",\"hong-huang-rang-gai-suan\",\"cha-yuan-shi-hui-jin-ji\"],\"conditions\":\"已经测过 pH、粮田低于大约 5.5、准备改酸。茶园另算。\",\"commonCrops\":\"粮田旱地。茶园去禁忌那篇。\"},{\"slug\":\"xiu-shui-tian\",\"title\":\"锈水田、亚铁毒：水田苗发黄发僵\",\"subtitle\":\"排水不良的酸水田，铁太多也会毒\",\"summary\":\"水面锈、有时油膜，稻苗黄僵，根发黑。\",\"crops\":[\"水稻\"],\"problems\":[\"酸化\",\"涝害\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"春季\"],\"tags\":[\"酸化\",\"涝害\",\"xiu-shui-tian\"],\"photos\":[{\"src\":\"/images/articles/xiu-shui-tian.jpg\",\"alt\":\"锈色水面、黄僵稻苗\"},{\"src\":\"/images/articles/xiu-shui-tian-2.jpg\",\"alt\":\"锈水油膜特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"qian-yu-tian\",\"shui-tian-huan-yuan\",\"suan-hua\"],\"conditions\":\"还原条件下亚铁出来毒根。长期深水、酸、有机质发酵会叠。\",\"commonCrops\":\"水稻。\"},{\"slug\":\"qian-yu-tian\",\"title\":\"冷浸田、潜育化：土冷根不长\",\"subtitle\":\"山垄田、阴冷田，春季不发苗\",\"summary\":\"土冷、长期渍水、剖面发青灰。\",\"crops\":[\"水稻\"],\"problems\":[\"涝害\"],\"regions\":[\"华南\",\"西南\"],\"seasons\":[\"春季\"],\"tags\":[\"涝害\",\"qian-yu-tian\"],\"photos\":[{\"src\":\"/images/articles/qian-yu-tian.jpg\",\"alt\":\"冷浸田灰蓝潜育层\"},{\"src\":\"/images/articles/qian-yu-tian-2.jpg\",\"alt\":\"山垄冷浸稻田\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"xiu-shui-tian\",\"que-lin\",\"lao-hai\"],\"conditions\":\"潜育层缺氧又冷。根不往下，肥再多也吃得慢。\",\"commonCrops\":\"水稻。\"},{\"slug\":\"shui-tian-huan-yuan\",\"title\":\"水田还原障碍：根黑、臭、不发新根\",\"subtitle\":\"长期深水，土变成臭泥\",\"summary\":\"长期深水，土发臭，根黑不发新根，有时有硫化氢味。\",\"crops\":[\"水稻\"],\"problems\":[\"涝害\"],\"regions\":[\"长江中下游\",\"华南\"],\"seasons\":[\"夏季\"],\"tags\":[\"涝害\",\"shui-tian-huan-yuan\"],\"photos\":[{\"src\":\"/images/articles/shui-tian-huan-yuan.jpg\",\"alt\":\"深水田根黑不发新根\"},{\"src\":\"/images/articles/shui-tian-huan-yuan-2.jpg\",\"alt\":\"还原障碍黑根\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"xiu-shui-tian\",\"jie-gan-huan-tian\",\"lao-hai\"],\"conditions\":\"氧气没了，锰铁硫被还原，根被毒。不是缺那一袋复合肥。\",\"commonCrops\":\"水稻。\"},{\"slug\":\"gen-fu-jian-bie\",\"title\":\"根腐还是土问题：先看根再下肥\",\"subtitle\":\"死棵先拔起来，别在叶上猜\",\"summary\":\"黑腐、根结、茎基缢缩，和缺肥的白根细弱不是一路。\",\"crops\":[\"蔬菜\",\"设施蔬菜\",\"花生\"],\"problems\":[\"连作障碍\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"gen-fu-jian-bie\"],\"photos\":[{\"src\":\"/images/articles/gen-fu-jian-bie.jpg\",\"alt\":\"黑腐根和白根对照\"},{\"src\":\"/images/articles/gen-fu-jian-bie-2.jpg\",\"alt\":\"根结线虫根\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"gen-jie-xian-chong\",\"tu-chuan-ku-wei\",\"huang-ye-jian-bie\"],\"conditions\":\"肥解决不了烂根。土问题可以叠病害，但切开维管束、闻气味、看分布，能先分流。\",\"commonCrops\":\"番茄、黄瓜、草莓、瓜类。\"},{\"slug\":\"huang-ye-jian-bie\",\"title\":\"黄叶鉴别：缺素、涝害、药害还是病害\",\"subtitle\":\"先分叶位、根和土面，再谈缺哪一种\",\"summary\":\"先分新叶还是老叶，再分匀黄还是脉间黄，再问药、涝、病。一张黄叶不够下肥。\",\"crops\":[\"水稻\",\"玉米\",\"蔬菜\",\"果树\"],\"problems\":[\"缺素\",\"涝害\",\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"缺素\",\"涝害\",\"肥害\",\"huang-ye-jian-bie\"],\"photos\":[{\"src\":\"/images/articles/huang-ye-jian-bie.jpg\",\"alt\":\"黄叶四种对照\"},{\"src\":\"/images/articles/huang-ye-jian-bie-2.jpg\",\"alt\":\"黄叶叶位特写\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-dan\",\"que-tie\",\"yao-hai\"],\"conditions\":\"老叶匀黄像缺氮；新叶脉绿像缺铁；斑扭来得快像药害；湿蔫像涝。叶位是第一把尺子。\",\"commonCrops\":\"所有大田和棚室。\"},{\"slug\":\"han-yan-jian-bie\",\"title\":\"旱了还是咸了：萎蔫和焦边怎么分\",\"subtitle\":\"土干是旱，土湿还蔫还白是咸\",\"summary\":\"一边萎蔫无白霜土干，一边白霜加焦边土不一定干。\",\"crops\":[\"小麦\",\"玉米\",\"棉花\",\"设施蔬菜\"],\"problems\":[\"盐碱\"],\"regions\":[\"华北\",\"西北\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"盐碱\",\"han-yan-jian-bie\"],\"photos\":[{\"src\":\"/images/articles/han-yan-jian-bie.jpg\",\"alt\":\"一边萎蔫无白霜，一边白霜加焦边\"},{\"src\":\"/images/articles/han-yan-jian-bie-2.jpg\",\"alt\":\"抓一把干土对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"fan-yan\",\"que-jia\"],\"conditions\":\"旱是没水，咸是有水喝不着。浇小水：旱了能缓，咸了有时更蔫。\",\"commonCrops\":\"小麦、玉米、棉花、设施蔬菜。\"},{\"slug\":\"cha-yuan-guo-suan\",\"title\":\"茶园过酸：耐酸不等于越酸越好\",\"subtitle\":\"茶叶喜欢偏酸，不是喜欢喝醋\",\"summary\":\"茶树还活着但叶小、新梢短、根色差。\",\"crops\":[\"茶叶\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"西南\",\"长江中下游\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"cha-yuan-guo-suan\"],\"photos\":[{\"src\":\"/images/articles/cha-yuan-guo-suan.jpg\",\"alt\":\"茶园茶树行，不是粮田\"},{\"src\":\"/images/articles/cha-yuan-guo-suan-2.jpg\",\"alt\":\"过酸茶园叶小\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"cha-yuan-shi-hui-jin-ji\",\"suan-hua\",\"shi-hui-yong-liang\"],\"conditions\":\"茶树能喝酸，不等于拿醋当水。适宜大约 pH 4.5～6.0。低于 4.0 根一样伤。\",\"commonCrops\":\"茶叶。不见麦苗。\"},{\"slug\":\"ma-ling-shu-tu\",\"title\":\"马铃薯疮痂和偏碱土壤\",\"subtitle\":\"疮痂和土的酸碱、干湿有关系\",\"summary\":\"你低头先看土面那一层白。\",\"crops\":[\"马铃薯\"],\"problems\":[\"盐碱\"],\"regions\":[\"东北\",\"华北\",\"西北\"],\"seasons\":[\"全年\"],\"tags\":[\"盐碱\",\"ma-ling-shu-tu\"],\"photos\":[{\"src\":\"/images/articles/ma-ling-shu-tu.jpg\",\"alt\":\"马铃薯块茎疮痂\"},{\"src\":\"/images/articles/ma-ling-shu-tu-2.jpg\",\"alt\":\"疮痂薯块特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"lv-hai\",\"lian-zuo\"],\"conditions\":\"疮痂喜欢偏碱、干、沙。把 pH 改酸一点、稳墒，比打药故事实在。这里不开杀菌剂方。\",\"commonCrops\":\"马铃薯。\"},{\"slug\":\"sheng-wu-you-ji-fei\",\"title\":\"生物有机肥怎么用才不是安慰剂\",\"subtitle\":\"菌要有房有饭，才会干活\",\"summary\":\"你抓一把土搓一搓，看还有没有肉。\",\"crops\":[\"蔬菜\",\"设施蔬菜\"],\"problems\":[\"有机质低\",\"连作障碍\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"连作障碍\",\"sheng-wu-you-ji-fei\"],\"photos\":[{\"src\":\"/images/articles/sheng-wu-you-ji-fei.jpg\",\"alt\":\"腐熟堆肥\"},{\"src\":\"/images/articles/sheng-wu-you-ji-fei-2.jpg\",\"alt\":\"结构差的死土\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"wei-sheng-wu\",\"you-ji-zhi\",\"lian-zuo\"],\"conditions\":\"菌是房客。没房没饭，安慰剂。先有有机质和通气，菌才住得下。看登记证。\",\"commonCrops\":\"蔬菜、设施。\"},{\"slug\":\"guo-yuan-tu-rang\",\"title\":\"果园土壤培肥：树下那层土怎么养\",\"subtitle\":\"清耕光板地，树会越来越馋\",\"summary\":\"树下那层土板、清耕、草都没有。\",\"crops\":[\"果树\"],\"problems\":[\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"guo-yuan-tu-rang\"],\"photos\":[{\"src\":\"/images/articles/guo-yuan-tu-rang.jpg\",\"alt\":\"果园树盘覆盖，不是大田\"},{\"src\":\"/images/articles/guo-yuan-tu-rang-2.jpg\",\"alt\":\"果园有机肥沟施\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-tie\",\"you-ji-zhi\",\"shi-hui-xing-tu\"],\"conditions\":\"果树吃的是树盘。清耕把肉晒掉。行间生草、树盘覆盖、肥进根区，才像养树。\",\"commonCrops\":\"苹果、柑橘、桃、梨等。\"},{\"slug\":\"da-peng-lian-zuo-zong-he\",\"title\":\"大棚越种越差：盐、病、肥害一起到\",\"subtitle\":\"棚是一口锅，盐病肥三样都能熬稠\",\"summary\":\"棚内盐斑加病株，越种死棵越多。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"连作障碍\",\"盐碱\",\"肥害\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"盐碱\",\"肥害\",\"da-peng-lian-zuo-zong-he\"],\"photos\":[{\"src\":\"/images/articles/da-peng-lian-zuo-zong-he.jpg\",\"alt\":\"大棚连作：盐斑加病株\"},{\"src\":\"/images/articles/da-peng-lian-zuo-zong-he-2.jpg\",\"alt\":\"棚内点片死棵加白霜\"}],\"hot\":true,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"lian-zuo\",\"dashe-yanzhi\",\"gen-fu-jian-bie\"],\"conditions\":\"盐、病、肥害熬在一口锅里。一瓶药一袋肥掀不开这口锅。先测 EC，再看根。\",\"commonCrops\":\"番茄、黄瓜、辣椒、草莓。\"},{\"slug\":\"hong-huang-rang-gai-suan\",\"title\":\"红黄壤改酸：先测 pH，再谈石灰\",\"subtitle\":\"南方红土发酸，先测这块地的 pH，再谈石灰。\",\"summary\":\"红土黄泥土上苗僵叶黄根褐，先认土色和根，再认 pH。\",\"crops\":[\"水稻\",\"花生\",\"玉米\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"西南\",\"长江中下游\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"hong-huang-rang-gai-suan\"],\"photos\":[{\"src\":\"/images/articles/hong-huang-rang-gai-suan.jpg\",\"alt\":\"红黄壤坡地玉米苗僵\"},{\"src\":\"/images/articles/hong-huang-rang-gai-suan-2.jpg\",\"alt\":\"红黄壤土色特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-hua\",\"shi-hui-yong-liang\",\"lv-du-shang-gen\"],\"conditions\":\"红黄壤本底就酸，雨把盐基淋走。石灰是药不是饭。\",\"commonCrops\":\"水稻、花生、玉米、薯类。茶叶另算，不要按粮田改到中性。\"},{\"slug\":\"lv-du-shang-gen\",\"title\":\"铝毒伤根：根尖秃、发褐，不是单纯缺肥\",\"subtitle\":\"根尖褐秃、侧根很少，先改酸让新嘴长出来，再薄肥。\",\"summary\":\"洗出来的根尖发褐、发秃，侧根很少。地上再追氮也不发棵。缺肥的根还在，只是细；铝毒是根尖伤掉。\",\"crops\":[\"水稻\",\"小麦\",\"花生\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"西南\"],\"seasons\":[\"春季\"],\"tags\":[\"酸化\",\"lv-du-shang-gen\"],\"photos\":[{\"src\":\"/images/articles/lv-du-shang-gen.jpg\",\"alt\":\"酸土上根尖褐秃的植株\"},{\"src\":\"/images/articles/lv-du-shang-gen-2.jpg\",\"alt\":\"洗出的褐秃根尖\"},{\"src\":\"/images/articles/suan-hua.jpg\",\"alt\":\"酸化根部对照\"},{\"src\":\"/images/articles/suan-hua-2.jpg\",\"alt\":\"褐秃根尖\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"hong-huang-rang-gai-suan\",\"suan-hua\",\"que-lin\"],\"conditions\":\"红黄壤、pH 低于大约 5.5、连年铵态氮。\",\"commonCrops\":\"水稻、花生、小麦、薯类。\"},{\"slug\":\"suan-yu-que-gai\",\"title\":\"土酸和缺钙一起到：脐腐裂果别只补叶面钙\",\"subtitle\":\"酸土里钙被淋走，果上出事根上也缺\",\"summary\":\"番茄脐腐、裂果、心叶焦边，喷叶面钙只能救急。\",\"crops\":[\"蔬菜\",\"花生\",\"果树\"],\"problems\":[\"酸化\",\"缺素\"],\"regions\":[\"华南\",\"长江中下游\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"缺素\",\"suan-yu-que-gai\"],\"photos\":[{\"src\":\"/images/articles/suan-yu-que-gai.jpg\",\"alt\":\"番茄脐腐贴在酸土田\"},{\"src\":\"/images/articles/suan-yu-que-gai-2.jpg\",\"alt\":\"脐腐特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-gai\",\"suan-hua\",\"shi-hui-yong-liang\"],\"conditions\":\"酸土里钙被淋走。钙像砖，干旱时根更吃不到。叶面钙退烧，改土才是正道。\",\"commonCrops\":\"番茄、辣椒、花生、果树。\"},{\"slug\":\"suan-tu-shi-lin\",\"title\":\"酸性土磷被锁：苗紫矮，先改酸再猛补磷\",\"subtitle\":\"磷在土里，铁铝把它钉死了\",\"summary\":\"苗紫、矮、根少，不一定土里没磷。\",\"crops\":[\"玉米\",\"小麦\",\"油菜\"],\"problems\":[\"酸化\",\"缺素\"],\"regions\":[\"华南\",\"西南\",\"长江中下游\"],\"seasons\":[\"春季\"],\"tags\":[\"酸化\",\"缺素\",\"suan-tu-shi-lin\"],\"photos\":[{\"src\":\"/images/articles/suan-tu-shi-lin.jpg\",\"alt\":\"酸土上发紫发僵的玉米苗\"},{\"src\":\"/images/articles/suan-tu-shi-lin-2.jpg\",\"alt\":\"紫苗和根对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-lin\",\"hong-huang-rang-gai-suan\",\"suan-hua\"],\"conditions\":\"你撒的过磷酸钙，根摸不着。先把锁打开，再谈用量。\",\"commonCrops\":\"玉米、小麦、油菜、蔬菜。\"},{\"slug\":\"sheng-li-suan-xing-fei\",\"title\":\"生理酸性肥越用土越酸\",\"subtitle\":\"铵态氮、硫酸钾用久了，土会一年年更酸。\",\"summary\":\"你蹲下去拔一棵，洗手看根尖。\",\"crops\":[\"水稻\",\"蔬菜\",\"玉米\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"sheng-li-suan-xing-fei\"],\"photos\":[{\"src\":\"/images/articles/sheng-li-suan-xing-fei.jpg\",\"alt\":\"生理酸性肥袋子\"},{\"src\":\"/images/articles/sheng-li-suan-xing-fei-2.jpg\",\"alt\":\"肥袋和酸化苗对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"suan-hua\",\"hong-huang-rang-gai-suan\",\"shi-hui-yong-liang\"],\"conditions\":\"有的肥进了土，作物吃走阳离子，留下酸根。不是肥有毒，是账要会算。\",\"commonCrops\":\"水稻、蔬菜、玉米。\"},{\"slug\":\"cha-yuan-shi-hui-jin-ji\",\"title\":\"茶园石灰禁忌：耐酸作物怎么改才不伤树\",\"subtitle\":\"粮田那套公斤数，在茶行里是伤树\",\"summary\":\"茶树新梢短、叶小；有人照搬粮田石灰，随后更黄。\",\"crops\":[\"茶叶\"],\"problems\":[\"酸化\"],\"regions\":[\"华南\",\"西南\",\"长江中下游\"],\"seasons\":[\"全年\"],\"tags\":[\"酸化\",\"cha-yuan-shi-hui-jin-ji\"],\"photos\":[{\"src\":\"/images/articles/cha-yuan-shi-hui-jin-ji.jpg\",\"alt\":\"茶园行间，不是粮田\"},{\"src\":\"/images/articles/cha-yuan-shi-hui-jin-ji-2.jpg\",\"alt\":\"茶园土面特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"cha-yuan-guo-suan\",\"shi-hui-yong-liang\",\"suan-hua\"],\"conditions\":\"茶树是耐酸的人，不是喜欢喝石灰水。过酸降一点铝，过碱又把铁锁住。\",\"commonCrops\":\"茶叶。\"},{\"slug\":\"su-da-yan-jian\",\"title\":\"苏打盐碱地：碱和盐不是一回事\",\"subtitle\":\"涩的是碱，咸的是盐，药不能吃错\",\"summary\":\"土发涩发黏，pH 常大于 8.5，结构差，苗出不来。\",\"crops\":[\"小麦\",\"玉米\",\"棉花\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"东北\",\"华北\"],\"seasons\":[\"春季\"],\"tags\":[\"盐碱\",\"su-da-yan-jian\"],\"photos\":[{\"src\":\"/images/articles/su-da-yan-jian.jpg\",\"alt\":\"苏打碱斑土面发白发涩\"},{\"src\":\"/images/articles/su-da-yan-jian-2.jpg\",\"alt\":\"碱斑结构差特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shi-gao-gai-jian\",\"yan-jian\",\"xi-yan-pai-shui\"],\"conditions\":\"盐是汤咸，碱是汤涩还挂碗。石膏里的钙把钠换下来，再靠水把钠洗走。\",\"commonCrops\":\"小麦、玉米、棉花、向日葵。\"},{\"slug\":\"bin-hai-yan-tu\",\"title\":\"滨海盐土：先排水洗盐，再谈培肥\",\"subtitle\":\"海边的白霜，是海留下的盐\",\"summary\":\"春季返盐白霜、出苗花斑，靠近海或倒灌河。\",\"crops\":[\"棉花\",\"水稻\",\"小麦\"],\"problems\":[\"盐碱\"],\"regions\":[\"华北\",\"华南\"],\"seasons\":[\"春季\",\"秋季\"],\"tags\":[\"盐碱\",\"bin-hai-yan-tu\"],\"photos\":[{\"src\":\"/images/articles/bin-hai-yan-tu.jpg\",\"alt\":\"滨海盐土排水沟\"},{\"src\":\"/images/articles/bin-hai-yan-tu-2.jpg\",\"alt\":\"盐霜加沟渠\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"xi-yan-pai-shui\",\"yan-jian-di-xuan-zuo\"],\"conditions\":\"海退了盐还在。洗盐像洗衣，要有进水也要有出水。没有排水，大水只是把盐赶到田边。\",\"commonCrops\":\"棉花、水稻、小麦、田菁等。\"},{\"slug\":\"wei-xian-shui-guan-gai\",\"title\":\"微咸水灌溉：能浇但不能连浇\",\"subtitle\":\"水有一点咸，连浇会把地浇成盐田\",\"summary\":\"浇了几次苗更焦边、土面更白。\",\"crops\":[\"小麦\",\"棉花\",\"玉米\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"华北\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"盐碱\",\"wei-xian-shui-guan-gai\"],\"photos\":[{\"src\":\"/images/articles/wei-xian-shui-guan-gai.jpg\",\"alt\":\"微咸水灌进麦田，水边起白霜\"},{\"src\":\"/images/articles/wei-xian-shui-guan-gai-2.jpg\",\"alt\":\"地表盐晶特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"bin-hai-yan-tu\",\"fan-yan\",\"yan-jian\"],\"conditions\":\"微咸水不是不能用，是不能当自来水天天喝。小水勤浇最容易返盐。\",\"commonCrops\":\"小麦、棉花、玉米。\"},{\"slug\":\"di-biao-fu-yan\",\"title\":\"地表覆膜返盐：膜边白霜怎么破\",\"subtitle\":\"膜内把蒸发赶到膜边，盐就在那儿排队\",\"summary\":\"膜边、破孔周围一圈白霜，苗出在孔边就焦。\",\"crops\":[\"棉花\",\"玉米\",\"设施蔬菜\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"华北\",\"黄淮海\"],\"seasons\":[\"春季\"],\"tags\":[\"盐碱\",\"di-biao-fu-yan\"],\"photos\":[{\"src\":\"/images/articles/di-biao-fu-yan.jpg\",\"alt\":\"地膜边白霜\"},{\"src\":\"/images/articles/di-biao-fu-yan-2.jpg\",\"alt\":\"膜边盐圈特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"fan-yan\",\"dashe-yanzhi\",\"yan-jian\"],\"conditions\":\"膜是帽子。帽子挡住蒸发，盐就从帽檐爬出来。苗要坐在帽子底下的湿润区。\",\"commonCrops\":\"棉花、玉米、瓜类、设施蔬菜。\"},{\"slug\":\"yan-jian-di-xuan-zuo\",\"title\":\"盐碱地适种什么：先活苗再求高产\",\"subtitle\":\"咸地先求保住苗，再谈吨粮\",\"summary\":\"年年缺苗断垄，种玉米像赌博。\",\"crops\":[\"棉花\",\"小麦\",\"水稻\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"华北\",\"东北\"],\"seasons\":[\"春季\"],\"tags\":[\"盐碱\",\"yan-jian-di-xuan-zuo\"],\"photos\":[{\"src\":\"/images/articles/yan-jian-di-xuan-zuo.jpg\",\"alt\":\"盐斑垄上油菜还能出苗\"},{\"src\":\"/images/articles/yan-jian-di-xuan-zuo-2.jpg\",\"alt\":\"耐盐作物和旁边缺苗对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"bin-hai-yan-tu\",\"su-da-yan-jian\"],\"conditions\":\"盐碱地像浅水，先学游泳再比速度。耐盐作物和品种比复合肥堆出来的高产方案实在。\",\"commonCrops\":\"棉花、向日葵、高粱、田菁、耐盐稻麦按当地。\"},{\"slug\":\"xi-yan-pai-shui\",\"title\":\"洗盐排水：有灌没排等于把盐赶上来\",\"subtitle\":\"水是电梯，盐是乘客，没出口就上楼\",\"summary\":\"灌了大水，田边更白、邻地开始返盐，就是把盐赶上来了。\",\"crops\":[\"小麦\",\"玉米\",\"棉花\",\"水稻\"],\"problems\":[\"盐碱\"],\"regions\":[\"西北\",\"华北\",\"黄淮海\"],\"seasons\":[\"春季\",\"冬季\"],\"tags\":[\"盐碱\",\"xi-yan-pai-shui\"],\"photos\":[{\"src\":\"/images/articles/xi-yan-pai-shui.jpg\",\"alt\":\"田边排沟和盐斑对照\"},{\"src\":\"/images/articles/xi-yan-pai-shui-2.jpg\",\"alt\":\"土面白霜特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"yan-jian\",\"bin-hai-yan-tu\",\"fan-yan\"],\"conditions\":\"洗衣要拧出去。洗盐不排水，就是衣服在盆里泡着。水是电梯，盐是乘客，没出口就上楼。\",\"commonCrops\":\"小麦、玉米、棉花、水稻。\"},{\"slug\":\"da-peng-huan-tu-xi-yan\",\"title\":\"大棚换土还是洗盐：别一盐就翻棚\",\"subtitle\":\"能洗就先洗，换土是最后一招\",\"summary\":\"膜下白霜、越浇越蔫。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"盐碱\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"盐碱\",\"da-peng-huan-tu-xi-yan\"],\"photos\":[{\"src\":\"/images/articles/da-peng-huan-tu-xi-yan.jpg\",\"alt\":\"棚内滴口白霜、苗焦边\"},{\"src\":\"/images/articles/da-peng-huan-tu-xi-yan-2.jpg\",\"alt\":\"膜下盐晶特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"dashe-yanzhi\",\"xi-yan-pai-shui\",\"da-peng-lian-zuo-zong-he\"],\"conditions\":\"大棚是盆。盆里的盐洗得掉就先洗。换土不改习惯，新土很快又咸。换土留给病土或洗不动的盐。\",\"commonCrops\":\"番茄、黄瓜、辣椒、草莓。\"},{\"slug\":\"xuan-geng-bian-qian\",\"title\":\"年年旋耕：耕层越旋越浅\",\"subtitle\":\"旋耕像剃头，只刮表层\",\"summary\":\"耕层越来越浅，雨后上层积水，刨开看见发亮的一层。\",\"crops\":[\"小麦\",\"玉米\",\"水稻\"],\"problems\":[\"板结\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"xuan-geng-bian-qian\"],\"photos\":[{\"src\":\"/images/articles/xuan-geng-bian-qian.jpg\",\"alt\":\"旋耕只翻浅层，下面还是硬盖\"},{\"src\":\"/images/articles/xuan-geng-bian-qian-2.jpg\",\"alt\":\"根碰到硬层横走\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"li-di-ceng\",\"shen-song-shi-ji\",\"ban-jie\"],\"conditions\":\"旋耕像剃头，只刮表层。年年同一深度，下面压出硬盖。\",\"commonCrops\":\"小麦、玉米、水稻。\"},{\"slug\":\"shen-song-shi-ji\",\"title\":\"深松窗口：什么时候松、松多深\",\"subtitle\":\"深松不是越深越好，也不是天天松\",\"summary\":\"准备深松却赶上泥地或干硬地；松完大坷垃，苗更差。\",\"crops\":[\"小麦\",\"玉米\"],\"problems\":[\"板结\"],\"regions\":[\"华北\",\"黄淮海\",\"东北\"],\"seasons\":[\"秋季\",\"春季\"],\"tags\":[\"板结\",\"shen-song-shi-ji\"],\"photos\":[{\"src\":\"/images/articles/shen-song-shi-ji.jpg\",\"alt\":\"深松铲把犁底层划开\"},{\"src\":\"/images/articles/shen-song-shi-ji-2.jpg\",\"alt\":\"土坑里发亮的硬盖特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"xuan-geng-bian-qian\",\"li-di-ceng\",\"ji-ya-che-zhe\"],\"conditions\":\"手握成团落地能散，就是窗口。深度以刚过硬盖为准，常见 25～40 厘米。过湿是和泥，过干是打坷垃。\",\"commonCrops\":\"小麦、玉米、大豆。\"},{\"slug\":\"tu-rang-tuan-ju-ti\",\"title\":\"团聚体碎了：土面一碰就面、一下雨就浆\",\"subtitle\":\"好土能搓团又易散，粉土是面\",\"summary\":\"干了面、湿了浆，一碰就散，雨点一砸就糊。\",\"crops\":[\"蔬菜\",\"小麦\",\"玉米\"],\"problems\":[\"板结\",\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"有机质低\",\"tu-rang-tuan-ju-ti\"],\"photos\":[{\"src\":\"/images/articles/tu-rang-tuan-ju-ti.jpg\",\"alt\":\"手里搓得出团粒的活土\"},{\"src\":\"/images/articles/tu-rang-tuan-ju-ti-2.jpg\",\"alt\":\"结构碎了的面土对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"you-ji-zhi\",\"fu-gai-gai-zhi-di\"],\"conditions\":\"好土像面包，粉土像面粉。团聚体是房间。有机质、覆盖、少碾，房间才在。\",\"commonCrops\":\"蔬菜、小麦、玉米。\"},{\"slug\":\"ji-ya-che-zhe\",\"title\":\"农机碾压：车辙里出不来苗\",\"subtitle\":\"车辙是一条压死的土\",\"summary\":\"车辙里不出苗，垄上有苗。\",\"crops\":[\"玉米\",\"小麦\",\"棉花\"],\"problems\":[\"板结\"],\"regions\":[\"全国\"],\"seasons\":[\"春季\",\"秋季\"],\"tags\":[\"板结\",\"ji-ya-che-zhe\"],\"photos\":[{\"src\":\"/images/articles/ji-ya-che-zhe.jpg\",\"alt\":\"车辙里不出苗\"},{\"src\":\"/images/articles/ji-ya-che-zhe-2.jpg\",\"alt\":\"碾压土特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"shen-song-shi-ji\",\"xuan-geng-bian-qian\"],\"conditions\":\"湿土承载差。一次碾压，孔隙塌了，几年缓不过来。固定车道比满田碾体面。\",\"commonCrops\":\"玉米、小麦、棉花、大豆。\"},{\"slug\":\"ban-jie-yu-gen-xi\",\"title\":\"板结和浅根互相反馈\",\"subtitle\":\"土硬根浅，根浅土更没人管\",\"summary\":\"你拿锄头试一试这块地。\",\"crops\":[\"小麦\",\"玉米\",\"蔬菜\"],\"problems\":[\"板结\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"ban-jie-yu-gen-xi\"],\"photos\":[{\"src\":\"/images/articles/ban-jie-yu-gen-xi.jpg\",\"alt\":\"根碰到硬盖拐弯横走\"},{\"src\":\"/images/articles/ban-jie-yu-gen-xi-2.jpg\",\"alt\":\"浅旋后的硬层\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"li-di-ceng\",\"xuan-geng-bian-qian\"],\"conditions\":\"硬土养浅根，浅根更不改土，土更硬。要打断这个圈。\",\"commonCrops\":\"小麦、玉米、蔬菜。\"},{\"slug\":\"fu-gai-gai-zhi-di\",\"title\":\"地膜/秸秆覆盖能不能把板结土养松\",\"subtitle\":\"覆盖能挡雨滴、保墒，不能代替深松\",\"summary\":\"你拿锄头试一试这块地。\",\"crops\":[\"玉米\",\"小麦\",\"蔬菜\"],\"problems\":[\"板结\",\"有机质低\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"板结\",\"有机质低\",\"fu-gai-gai-zhi-di\"],\"photos\":[{\"src\":\"/images/articles/fu-gai-gai-zhi-di.jpg\",\"alt\":\"地膜覆盖的玉米行\"},{\"src\":\"/images/articles/fu-gai-gai-zhi-di-2.jpg\",\"alt\":\"秸秆盖住龟裂土\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ban-jie\",\"jie-gan-huan-tian\",\"tu-rang-tuan-ju-ti\"],\"conditions\":\"秸秆和地膜是护理，不是深松。犁底层仍要揭。残膜要捡。\",\"commonCrops\":\"玉米、小麦、蔬菜、棉花。\"},{\"slug\":\"lv-fei-fan-ya\",\"title\":\"绿肥翻压：改土也会憋苗\",\"subtitle\":\"绿肥是肉，翻早了会发烧抢氮\",\"summary\":\"鲜草翻下去，苗黄弱，土发热。\",\"crops\":[\"水稻\",\"玉米\",\"油菜\"],\"problems\":[\"有机质低\"],\"regions\":[\"长江中下游\",\"华南\",\"西南\"],\"seasons\":[\"春季\",\"秋季\"],\"tags\":[\"有机质低\",\"lv-fei-fan-ya\"],\"photos\":[{\"src\":\"/images/articles/lv-fei-fan-ya.jpg\",\"alt\":\"绿肥被压进地里\"},{\"src\":\"/images/articles/lv-fei-fan-ya-2.jpg\",\"alt\":\"秸秆覆盖对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"jie-gan-huan-tian\",\"you-ji-zhi\",\"jie-gan-bu-dan\"],\"conditions\":\"鲜草会发热、会抢氮。花期翻、等几天、补一点氮，才不像憋苗。\",\"commonCrops\":\"水稻、玉米、后茬蔬菜。\"},{\"slug\":\"sheng-wu-tan\",\"title\":\"生物炭：不是每亩撒一点就翻身\",\"subtitle\":\"炭能帮忙，但不能当饭和药\",\"summary\":\"炭渣拌进耕层，指望一季翻身。\",\"crops\":[\"玉米\",\"水稻\",\"蔬菜\"],\"problems\":[\"有机质低\"],\"regions\":[\"东北\",\"华南\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"sheng-wu-tan\"],\"photos\":[{\"src\":\"/images/articles/sheng-wu-tan.jpg\",\"alt\":\"炭渣拌进耕层\"},{\"src\":\"/images/articles/sheng-wu-tan-2.jpg\",\"alt\":\"手里的生物炭特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"you-ji-zhi\",\"hei-tu-you-ji-zhi-shou-hu\",\"sheng-wu-you-ji-fei\"],\"conditions\":\"炭是架子，不是饭。没有有机质，架子上没肉。先小片试，看登记和来源。\",\"commonCrops\":\"玉米、水稻、蔬菜、果园。\"},{\"slug\":\"you-ji-fei-ru-he-xuan\",\"title\":\"有机肥怎么选：看腐熟、看盐、看碳氮比\",\"subtitle\":\"粪不是都能进棚，袋上写有机也不等于能当有机质。\",\"summary\":\"袋上写有机，有的还烫手还臭，有的盐很高。\",\"crops\":[\"蔬菜\",\"果树\",\"设施蔬菜\"],\"problems\":[\"有机质低\",\"肥害\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"肥害\",\"you-ji-fei-ru-he-xuan\"],\"photos\":[{\"src\":\"/images/articles/you-ji-fei-ru-he-xuan.jpg\",\"alt\":\"腐熟堆肥和生粪对照\"},{\"src\":\"/images/articles/you-ji-fei-ru-he-xuan-2.jpg\",\"alt\":\"未腐熟和腐熟特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"wei-fu-shu-you-ji-fei\",\"sheng-wu-you-ji-fei\",\"you-ji-zhi\"],\"conditions\":\"不是每袋都是肉。看腐熟：不烫、不熏、色暗。看盐。看碳氮比。生的会烧，咸的会腌。\",\"commonCrops\":\"蔬菜、果树、设施。\"},{\"slug\":\"jie-gan-bu-dan\",\"title\":\"秸秆还田必须补氮的账怎么算\",\"subtitle\":\"微生物先吃饭，苗就会挨饿\",\"summary\":\"你抓一把土搓一搓，看还有没有肉。\",\"crops\":[\"玉米\",\"小麦\",\"水稻\"],\"problems\":[\"有机质低\"],\"regions\":[\"东北\",\"黄淮海\",\"长江中下游\"],\"seasons\":[\"秋季\",\"春季\"],\"tags\":[\"有机质低\",\"jie-gan-bu-dan\"],\"photos\":[{\"src\":\"/images/articles/jie-gan-bu-dan.jpg\",\"alt\":\"还田后苗黄弱\"},{\"src\":\"/images/articles/jie-gan-bu-dan-2.jpg\",\"alt\":\"秸秆旁黄苗特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"jie-gan-huan-tian\",\"que-dan\",\"lv-fei-fan-ya\"],\"conditions\":\"秸秆碳多，菌要氮。苗会饿一阵。补氮是还账，不是加倍追肥。\",\"commonCrops\":\"玉米、小麦、水稻。\"},{\"slug\":\"hei-tu-you-ji-zhi-shou-hu\",\"title\":\"黑土有机质掉得快，怎么守\",\"subtitle\":\"黑土的黑就是肉，有机质低了化肥也撑不住\",\"summary\":\"你抓一把土搓一搓，看还有没有肉。\",\"crops\":[\"玉米\",\"大豆\",\"水稻\"],\"problems\":[\"有机质低\"],\"regions\":[\"东北\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"hei-tu-you-ji-zhi-shou-hu\"],\"photos\":[{\"src\":\"/images/articles/hei-tu-you-ji-zhi-shou-hu.jpg\",\"alt\":\"东北黑土耕层\"},{\"src\":\"/images/articles/hei-tu-you-ji-zhi-shou-hu-2.jpg\",\"alt\":\"黑土层和浅层对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"hei-tu-tui-hua\",\"jie-gan-huan-tian\",\"you-ji-zhi\"],\"conditions\":\"黑的是肉。守住秸秆、少裸露、轮耕，比再加一袋氮实在。产量目标不要把 A 层吃空。\",\"commonCrops\":\"玉米、大豆、水稻。\"},{\"slug\":\"sha-tu-zeng-you-ji-zhi\",\"title\":\"沙土增有机质：少量多次，别一次堆山\",\"subtitle\":\"沙土像筛子，一次堆山会漏、会烧\",\"summary\":\"沙土漏，一次堆一座粪山，第二天还是筛子。\",\"crops\":[\"花生\",\"玉米\"],\"problems\":[\"有机质低\"],\"regions\":[\"西北\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"有机质低\",\"sha-tu-zeng-you-ji-zhi\"],\"photos\":[{\"src\":\"/images/articles/sha-tu-zeng-you-ji-zhi.jpg\",\"alt\":\"沙土里拌进堆肥\"},{\"src\":\"/images/articles/sha-tu-zeng-you-ji-zhi-2.jpg\",\"alt\":\"沙粒和有机肥拌匀特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"sha-tu-lou-fei\",\"you-ji-zhi\",\"you-ji-fei-ru-he-xuan\"],\"conditions\":\"筛子盛不住山。少量多次，覆盖，分顿肥，才留得住。\",\"commonCrops\":\"花生、玉米、瓜类按花生玉米思路。\"},{\"slug\":\"que-xin-yu-lin\",\"title\":\"缺锌常被高磷掩盖\",\"subtitle\":\"磷堆多了，锌进不了门\",\"summary\":\"你先分清黄的是新叶还是老叶。\",\"crops\":[\"玉米\",\"水稻\",\"果树\"],\"problems\":[\"缺素\"],\"regions\":[\"华北\",\"黄淮海\",\"东北\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-xin-yu-lin\"],\"photos\":[{\"src\":\"/images/articles/que-xin-yu-lin.jpg\",\"alt\":\"玉米花白苗、节间短\"},{\"src\":\"/images/articles/que-xin-yu-lin-2.jpg\",\"alt\":\"新叶条纹失绿\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-xin\",\"yang-fen-kang-kang\",\"que-lin\"],\"conditions\":\"磷和锌排队进同一扇门。磷人多，锌进不去。不是锌袋子买少了那么简单。\",\"commonCrops\":\"玉米、水稻、果树。\"},{\"slug\":\"que-peng-hua-er-bu-shi\",\"title\":\"花而不实先查硼，也要查旱和盐\",\"subtitle\":\"开花挺热闹，籽却是空的\",\"summary\":\"你先分清黄的是新叶还是老叶。\",\"crops\":[\"油菜\",\"棉花\",\"花生\"],\"problems\":[\"缺素\"],\"regions\":[\"长江中下游\",\"黄淮海\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"que-peng-hua-er-bu-shi\"],\"photos\":[{\"src\":\"/images/articles/que-peng-hua-er-bu-shi.jpg\",\"alt\":\"花开了却少荚少铃\"},{\"src\":\"/images/articles/que-peng-hua-er-bu-shi-2.jpg\",\"alt\":\"茎空心开裂特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-peng\",\"hua-sheng-kong-jia\",\"han-yan-jian-bie\"],\"conditions\":\"硼管开花。缺和毒只隔一层纸。旱和盐也会落花。先分流。\",\"commonCrops\":\"油菜、棉花、花生、果树。\"},{\"slug\":\"qi-zi-huang-hua\",\"title\":\"柑橘黄化：缺铁、根腐、黄龙病先分清\",\"subtitle\":\"黄化不是一种病，乱补铁会误事\",\"summary\":\"有的匀、有的一枝一枝、有的根差。\",\"crops\":[\"果树\"],\"problems\":[\"缺素\",\"连作障碍\"],\"regions\":[\"华南\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"缺素\",\"连作障碍\",\"qi-zi-huang-hua\"],\"photos\":[{\"src\":\"/images/articles/qi-zi-huang-hua.jpg\",\"alt\":\"柑橘新梢黄化\"},{\"src\":\"/images/articles/qi-zi-huang-hua-2.jpg\",\"alt\":\"叶脉绿的新叶\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-tie\",\"gen-fu-jian-bie\",\"guo-yuan-tu-rang\"],\"conditions\":\"三条路：土里铁被锁、根烂了吃不到、系统性病害。路走错，铁喷得越多越耽误。\",\"commonCrops\":\"柑橘类。\"},{\"slug\":\"pu-tao-shi-hui-tu-que-tie\",\"title\":\"葡萄石灰土黄叶：土里有铁根吃不到\",\"subtitle\":\"华北西北葡萄园，新叶黄脉还绿\",\"summary\":\"葡萄新梢黄、叶脉绿，土并不瘦。\",\"crops\":[\"果树\"],\"problems\":[\"缺素\"],\"regions\":[\"华北\",\"西北\"],\"seasons\":[\"春季\",\"夏季\"],\"tags\":[\"缺素\",\"pu-tao-shi-hui-tu-que-tie\"],\"photos\":[{\"src\":\"/images/articles/pu-tao-shi-hui-tu-que-tie.jpg\",\"alt\":\"石灰土上的葡萄黄叶\"},{\"src\":\"/images/articles/pu-tao-shi-hui-tu-que-tie-2.jpg\",\"alt\":\"葡萄新叶脉间黄\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-tie\",\"shi-hui-xing-tu\",\"guo-yuan-tu-rang\"],\"conditions\":\"钥匙在根际 pH 和氧气。叶面铁能绿一阵，土还是那把锁。\",\"commonCrops\":\"葡萄。\"},{\"slug\":\"hua-sheng-kong-jia\",\"title\":\"花生空荚：钙在土里走不进果针\",\"subtitle\":\"果针要在湿润有钙的土里才能灌饱\",\"summary\":\"棵子不小，刨开空荚多、仁秕。\",\"crops\":[\"花生\"],\"problems\":[\"缺素\"],\"regions\":[\"华北\",\"黄淮海\",\"华南\"],\"seasons\":[\"夏季\"],\"tags\":[\"缺素\",\"hua-sheng-kong-jia\"],\"photos\":[{\"src\":\"/images/articles/hua-sheng-kong-jia.jpg\",\"alt\":\"花生田里的空荚\"},{\"src\":\"/images/articles/hua-sheng-kong-jia-2.jpg\",\"alt\":\"空壳特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-gai\",\"suan-yu-que-gai\",\"que-peng-hua-er-bu-shi\"],\"conditions\":\"花生的钙主要靠果针自己吸。果针周围土干、酸、盐，钙走不到。叶面钙帮一点，荚果层更要紧。\",\"commonCrops\":\"花生。\"},{\"slug\":\"ye-cai-xiao-xing-yuan-su\",\"title\":\"叶菜微量元素：喷叶不是代替改土\",\"subtitle\":\"叶菜长得快，缺了也显，喷了就忘改土不行\",\"summary\":\"心叶焦、叶柄裂、新叶黄脉绿，喷一次好像好了，过几天又来。\",\"crops\":[\"蔬菜\",\"设施蔬菜\"],\"problems\":[\"缺素\"],\"regions\":[\"黄淮海\",\"华北\",\"长江中下游\"],\"seasons\":[\"全年\"],\"tags\":[\"缺素\",\"ye-cai-xiao-xing-yuan-su\"],\"photos\":[{\"src\":\"/images/articles/ye-cai-xiao-xing-yuan-su.jpg\",\"alt\":\"叶菜新叶发黄、脉还绿\"},{\"src\":\"/images/articles/ye-cai-xiao-xing-yuan-su-2.jpg\",\"alt\":\"菠菜脉间黄特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-gai\",\"que-peng\",\"dashe-yanzhi\"],\"conditions\":\"叶菜像小孩，缺了马上写在脸上。喷叶是退烧药。退完烧还要看土是不是酸、咸、没肉。\",\"commonCrops\":\"菠菜、芹菜、生菜等叶菜。\"},{\"slug\":\"shui-dao-jiang-miao\",\"title\":\"水稻僵苗：酸、冷、毒、肥害怎么分\",\"subtitle\":\"坐蔸不一定是缺肥，先看根和水\",\"summary\":\"返青后不发棵。可能冷浸、亚铁毒、酸、缺磷、种肥烧。先看水温、锈水、根色。\",\"crops\":[\"水稻\"],\"problems\":[\"缺素\",\"酸化\",\"涝害\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"酸化\",\"涝害\",\"shui-dao-jiang-miao\"],\"photos\":[{\"src\":\"/images/articles/shui-dao-jiang-miao.jpg\",\"alt\":\"水稻僵苗不发棵\"},{\"src\":\"/images/articles/shui-dao-jiang-miao-2.jpg\",\"alt\":\"僵苗根特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"qian-yu-tian\",\"xiu-shui-tian\",\"que-lin\"],\"conditions\":\"僵苗是一组症，不是一个缺。冷要增温排水，锈水要排，酸要测 pH，肥害沿施肥沟。\",\"commonCrops\":\"水稻。\"},{\"slug\":\"yu-mi-miao-huang\",\"title\":\"玉米苗黄：缺氮、缺锌、除草剂、涝要分开看\",\"subtitle\":\"苗黄不是一种肥能打天下\",\"summary\":\"玉米苗黄要分：下部匀黄像缺氮；条纹失绿像缺锌；扭曲像药害；湿根像涝。\",\"crops\":[\"玉米\"],\"problems\":[\"缺素\",\"涝害\",\"肥害\"],\"regions\":[\"东北\",\"华北\",\"黄淮海\"],\"seasons\":[\"春季\"],\"tags\":[\"缺素\",\"涝害\",\"肥害\",\"yu-mi-miao-huang\"],\"photos\":[{\"src\":\"/images/articles/yu-mi-miao-huang.jpg\",\"alt\":\"玉米下部老叶匀黄\"},{\"src\":\"/images/articles/yu-mi-miao-huang-2.jpg\",\"alt\":\"叶脉间失绿特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"que-dan\",\"que-xin\",\"yao-hai\",\"lao-hai\"],\"conditions\":\"一袋尿素盖不住四条路。叶位、根、土面、喷药史，四样问完再动手。\",\"commonCrops\":\"玉米。\"},{\"slug\":\"gen-jie-xian-chong\",\"title\":\"根结线虫：根上长瘤，肥再多也不长\",\"subtitle\":\"须根上的珠子，不是肥不够\",\"summary\":\"根上长珠子、瘤，肥再多也不长。\",\"crops\":[\"蔬菜\",\"设施蔬菜\"],\"problems\":[\"连作障碍\"],\"regions\":[\"黄淮海\",\"华南\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"gen-jie-xian-chong\"],\"photos\":[{\"src\":\"/images/articles/gen-jie-xian-chong.jpg\",\"alt\":\"棚里点片萎蔫的番茄\"},{\"src\":\"/images/articles/gen-jie-xian-chong-2.jpg\",\"alt\":\"根结线虫根瘤特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"lian-zuo\",\"gen-fu-jian-bie\",\"cao-mei-lian-zuo\"],\"conditions\":\"线虫占了根。轮作换科、卫生、抗性砧或品种。用药去农技站按标签，这里不开方。\",\"commonCrops\":\"黄瓜、番茄、芹菜、瓜类。\"},{\"slug\":\"tu-chuan-ku-wei\",\"title\":\"土传枯萎：死棵先看维管束\",\"subtitle\":\"切开茎，维管束褐了就不是缺水\",\"summary\":\"点片死棵，切开茎维管束发褐。\",\"crops\":[\"蔬菜\",\"棉花\"],\"problems\":[\"连作障碍\"],\"regions\":[\"黄淮海\",\"长江中下游\",\"华南\"],\"seasons\":[\"夏季\"],\"tags\":[\"连作障碍\",\"tu-chuan-ku-wei\"],\"photos\":[{\"src\":\"/images/articles/tu-chuan-ku-wei.jpg\",\"alt\":\"切开茎维管束发褐\"},{\"src\":\"/images/articles/tu-chuan-ku-wei-2.jpg\",\"alt\":\"茎髓特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"qing-ku-bing-tu\",\"lian-zuo\",\"gen-fu-jian-bie\"],\"conditions\":\"褐管子是土传萎蔫的名片。轮作、嫁接、卫生。确诊走农技站。这里不开药方。\",\"commonCrops\":\"黄瓜、西瓜、香蕉、棉花、番茄。\"},{\"slug\":\"qing-ku-bing-tu\",\"title\":\"青枯病土：热闷棚不是万能\",\"subtitle\":\"细菌性青枯，横切常有菌脓\",\"summary\":\"热天茄科整株突然萎，切茎有时能挤出菌脓。\",\"crops\":[\"蔬菜\",\"设施蔬菜\"],\"problems\":[\"连作障碍\"],\"regions\":[\"华南\",\"长江中下游\"],\"seasons\":[\"夏季\"],\"tags\":[\"连作障碍\",\"qing-ku-bing-tu\"],\"photos\":[{\"src\":\"/images/articles/qing-ku-bing-tu.jpg\",\"alt\":\"热天番茄整株突然萎\"},{\"src\":\"/images/articles/qing-ku-bing-tu-2.jpg\",\"alt\":\"茎内维管束对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"tu-chuan-ku-wei\",\"gao-wen-men-peng\",\"lian-zuo\"],\"conditions\":\"青枯是土里的细菌性萎蔫。闷棚能压一部分，不是万能开关。轮作、排水、抗性品种。\",\"commonCrops\":\"茄科、花生。\"},{\"slug\":\"cao-mei-lian-zuo\",\"title\":\"草莓连作：盐、线虫、黄萎挤在一起\",\"subtitle\":\"棚草莓越种越差，很少是单一原因\",\"summary\":\"你比一比这块和换过茬的那块。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"连作障碍\",\"盐碱\"],\"regions\":[\"黄淮海\",\"华北\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"盐碱\",\"cao-mei-lian-zuo\"],\"photos\":[{\"src\":\"/images/articles/cao-mei-lian-zuo.jpg\",\"alt\":\"草莓棚点片死棵\"},{\"src\":\"/images/articles/cao-mei-lian-zuo-2.jpg\",\"alt\":\"草莓根结或根腐\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"da-peng-lian-zuo-zong-he\",\"gen-jie-xian-chong\",\"dashe-yanzhi\"],\"conditions\":\"年五很少是一个原因。读 EC、根结、维管束。洗盐、轮作或改基质。不要只喂。\",\"commonCrops\":\"草莓。\"},{\"slug\":\"ping-guo-zai-zhi\",\"title\":\"苹果再植障碍：挖了老树坑还是老土\",\"subtitle\":\"老果园换树，坑里的土还记得上一代\",\"summary\":\"挖了老树坑再栽，还是那坑土。\",\"crops\":[\"果树\"],\"problems\":[\"连作障碍\"],\"regions\":[\"华北\",\"西北\",\"黄淮海\"],\"seasons\":[\"全年\"],\"tags\":[\"连作障碍\",\"ping-guo-zai-zhi\"],\"photos\":[{\"src\":\"/images/articles/ping-guo-zai-zhi.jpg\",\"alt\":\"苹果老树坑再植\"},{\"src\":\"/images/articles/ping-guo-zai-zhi-2.jpg\",\"alt\":\"树坑心土特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"lian-zuo\",\"guo-yuan-tu-rang\",\"gen-fu-jian-bie\"],\"conditions\":\"再植障碍在土里：残根、病菌、偏肥、结构。换坑不换土，故事没完。\",\"commonCrops\":\"苹果、部分梨、桃也有类似。\"},{\"slug\":\"gao-wen-men-peng\",\"title\":\"高温闷棚：能压菌，也会伤根和结构\",\"subtitle\":\"夏天把棚闷死，不是什么菌都能杀干净\",\"summary\":\"薄膜盖土，能压菌，也会伤结构和有益生物。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"连作障碍\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"夏季\"],\"tags\":[\"连作障碍\",\"gao-wen-men-peng\"],\"photos\":[{\"src\":\"/images/articles/gao-wen-men-peng.jpg\",\"alt\":\"高温闷棚后的土面\"},{\"src\":\"/images/articles/gao-wen-men-peng-2.jpg\",\"alt\":\"闷过的干裂土\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"tu-rang-xiao-du-bian-jie\",\"da-peng-lian-zuo-zong-he\",\"lian-zuo\"],\"conditions\":\"闷棚是药，不是饭。消完要养：有机质、通气、有时要补菌的房和饭。连作再毒，病菌会回来。\",\"commonCrops\":\"番茄、黄瓜、草莓等。\"},{\"slug\":\"han-lao-ji-zhuan\",\"title\":\"旱涝急转：先伤根再黄叶\",\"subtitle\":\"刚旱完又淹，根最受伤\",\"summary\":\"刚涝过又干裂，苗先蔫后黄。\",\"crops\":[\"玉米\",\"大豆\",\"棉花\",\"蔬菜\"],\"problems\":[\"涝害\"],\"regions\":[\"黄淮海\",\"长江中下游\"],\"seasons\":[\"夏季\"],\"tags\":[\"涝害\",\"han-lao-ji-zhuan\"],\"photos\":[{\"src\":\"/images/articles/han-lao-ji-zhuan.jpg\",\"alt\":\"刚涝过又干裂的田\"},{\"src\":\"/images/articles/han-lao-ji-zhuan-2.jpg\",\"alt\":\"龟裂土面特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"lao-hai\",\"yu-hou-ban-jie-kai-lie\",\"huang-ye-jian-bie\"],\"conditions\":\"旱涝急转先伤根。根伤了再黄叶，不要只看叶色下肥。\",\"commonCrops\":\"玉米、大豆、棉花、蔬菜。\"},{\"slug\":\"di-xia-shui-wei-gao\",\"title\":\"地下水位高：土不干、根不深\",\"subtitle\":\"脚底下有一盆水，根不敢往下走\",\"summary\":\"土坑里很快渗出水。\",\"crops\":[\"小麦\",\"水稻\",\"棉花\"],\"problems\":[\"涝害\",\"盐碱\"],\"regions\":[\"华北\",\"长江中下游\",\"华南\"],\"seasons\":[\"全年\"],\"tags\":[\"涝害\",\"盐碱\",\"di-xia-shui-wei-gao\"],\"photos\":[{\"src\":\"/images/articles/di-xia-shui-wei-gao.jpg\",\"alt\":\"土坑里很快渗出水\"},{\"src\":\"/images/articles/di-xia-shui-wei-gao-2.jpg\",\"alt\":\"干裂但底下一层湿\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"lao-hai\",\"xi-yan-pai-shui\",\"li-di-ceng\"],\"conditions\":\"水位高，氧气少，根不敢往下。旱涝都更敏感。先降水位，再谈深施肥。\",\"commonCrops\":\"小麦、棉花、水稻。\"},{\"slug\":\"yu-hou-ban-jie-kai-lie\",\"title\":\"雨后板结开裂：跑墒又卡苗\",\"subtitle\":\"雨过一皮，干了大缝\",\"summary\":\"你白天看叶蔫不蔫，再拔根闻一闻。\",\"crops\":[\"玉米\",\"蔬菜\",\"棉花\"],\"problems\":[\"涝害\",\"板结\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"夏季\"],\"tags\":[\"涝害\",\"板结\",\"yu-hou-ban-jie-kai-lie\"],\"photos\":[{\"src\":\"/images/articles/yu-hou-ban-jie-kai-lie-2.jpg\",\"alt\":\"雨后土面结壳翘边\"},{\"src\":\"\",\"alt\":\"待补：请拍雨后玉米卡在硬壳里。\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"tu-rang-tuan-ju-ti\",\"ban-jie\",\"han-lao-ji-zhuan\"],\"conditions\":\"雨点砸实，太阳一晒就成锅盖。粉土、无覆盖、雨后进车更重。\",\"commonCrops\":\"玉米、棉花、蔬菜。\"},{\"slug\":\"leng-shui-guan-miao\",\"title\":\"冷水灌苗：水田发僵不一定是缺肥\",\"subtitle\":\"井水和山水太冷，稻根不爱长\",\"summary\":\"进水口一条黄僵苗，邻行更绿。\",\"crops\":[\"水稻\"],\"problems\":[\"涝害\"],\"regions\":[\"华南\",\"西南\",\"东北\"],\"seasons\":[\"春季\"],\"tags\":[\"涝害\",\"leng-shui-guan-miao\"],\"photos\":[{\"src\":\"/images/articles/leng-shui-guan-miao.jpg\",\"alt\":\"进水口一条黄僵苗\"},{\"src\":\"/images/articles/leng-shui-guan-miao-2.jpg\",\"alt\":\"水口苗特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"qian-yu-tian\",\"shui-dao-jiang-miao\",\"xiu-shui-tian\"],\"conditions\":\"冷水打在苗上，根停。水口一条，不像全田缺素那么匀。\",\"commonCrops\":\"水稻。\"},{\"slug\":\"yan-jiang-qi-hou-tu\",\"title\":\"沿江湿地土：潜育化比表面看的更狠\",\"subtitle\":\"土发青发臭，底下在还原\",\"summary\":\"沿江稻田水冷苗黄。\",\"crops\":[\"水稻\",\"小麦\"],\"problems\":[\"涝害\"],\"regions\":[\"长江中下游\",\"华南\"],\"seasons\":[\"全年\"],\"tags\":[\"涝害\",\"yan-jiang-qi-hou-tu\"],\"photos\":[{\"src\":\"/images/articles/yan-jiang-qi-hou-tu.jpg\",\"alt\":\"沿江稻田水冷苗黄\"},{\"src\":\"/images/articles/yan-jiang-qi-hou-tu-2.jpg\",\"alt\":\"铲上一锹青灰色潜育土\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"qian-yu-tian\",\"shui-tian-huan-yuan\",\"nan-fang-shui-tian-yang-fen\"],\"conditions\":\"灰蓝土、锈斑，根不爱往下。表面看着像普通水田，底下在憋。\",\"commonCrops\":\"水稻、小麦。\"},{\"slug\":\"shui-fei-yi-ti-hua-ec\",\"title\":\"水肥一体化：EC 偏高时根吸水费劲\",\"subtitle\":\"管子里的肥水太浓，根和滴头一起受伤\",\"summary\":\"你把叶、根、土面三样放一起看。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"其他\",\"肥害\",\"盐碱\"],\"regions\":[\"黄淮海\",\"华北\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"肥害\",\"盐碱\",\"shui-fei-yi-ti-hua-ec\"],\"photos\":[{\"src\":\"/images/articles/shui-fei-yi-ti-hua-ec.jpg\",\"alt\":\"滴灌口白圈让根吸水费劲\"},{\"src\":\"/images/articles/shui-fei-yi-ti-hua-ec-2.jpg\",\"alt\":\"滴口烧圈特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"di-guan-nong-du\",\"dashe-yanzhi\",\"jian-yi-ph-ec\"],\"conditions\":\"水肥一体化不是越浓越有劲。苗期更严。没有仪器就送水样。\",\"commonCrops\":\"设施蔬菜、部分果园。\"},{\"slug\":\"ji-zhi-yu-tu-rang\",\"title\":\"基质栽培和土壤不是同一套方子\",\"subtitle\":\"袋子里的椰糠草炭，不能按大田施肥\",\"summary\":\"你把叶、根、土面三样放一起看。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"其他\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"ji-zhi-yu-tu-rang\"],\"photos\":[{\"src\":\"/images/articles/ji-zhi-yu-tu-rang.jpg\",\"alt\":\"基质袋栽和土栽在一个棚\"},{\"src\":\"/images/articles/ji-zhi-yu-tu-rang-2.jpg\",\"alt\":\"椰糠和园土对照\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shui-fei-yi-ti-hua-ec\",\"jian-yi-ph-ec\",\"cao-mei-lian-zuo\"],\"conditions\":\"土壤能瞒一点错。基质瞒不住。浇水和配方要按基质走，不能按园土袋数抄。\",\"commonCrops\":\"设施果菜。\"},{\"slug\":\"tu-rang-xiao-du-bian-jie\",\"title\":\"土壤消毒的边界：消完要养，不能连作再毒\",\"subtitle\":\"消毒是清场，不是把地变成无菌天堂\",\"summary\":\"消完接着连作，病菌会回来。\",\"crops\":[\"设施蔬菜\"],\"problems\":[\"其他\",\"连作障碍\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"连作障碍\",\"tu-rang-xiao-du-bian-jie\"],\"photos\":[{\"src\":\"/images/articles/tu-rang-xiao-du-bian-jie.jpg\",\"alt\":\"闷棚薄膜盖着土面\"},{\"src\":\"/images/articles/tu-rang-xiao-du-bian-jie-2.jpg\",\"alt\":\"薄膜下的土面特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"gao-wen-men-peng\",\"lian-zuo\",\"wei-sheng-wu\"],\"conditions\":\"能压菌，也会伤结构。消完要有机质、通气、有时要给房客重新安家。连作再毒不是策略。\",\"commonCrops\":\"设施蔬菜。\"},{\"slug\":\"jian-yi-ph-ec\",\"title\":\"地头怎么用 pH 试纸和电导仪\",\"subtitle\":\"两样小工具，先分酸咸再下肥\",\"summary\":\"地头试纸和电导仪是检查，不是判决书。\",\"crops\":[\"全国\"],\"problems\":[\"其他\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"jian-yi-ph-ec\"],\"photos\":[{\"src\":\"/images/articles/jian-yi-ph-ec.jpg\",\"alt\":\"地头用试纸和电导仪\"},{\"src\":\"/images/articles/jian-yi-ph-ec-2.jpg\",\"alt\":\"试纸浸土浆特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ce-tu-bao-gao\",\"ce-tu-qu-yang\",\"shui-fei-yi-ti-hua-ec\"],\"conditions\":\"pH 试纸看酸碱方向，电导仪看咸不咸。数字是区间。极端才优先改。\",\"commonCrops\":\"所有作物。\"},{\"slug\":\"shi-fei-tiao-tu-rang\",\"title\":\"看叶片能猜肥，不能代替测土\",\"subtitle\":\"叶子是线索，化验单才是判决\",\"summary\":\"你把叶、根、土面三样放一起看。\",\"crops\":[\"水稻\",\"玉米\",\"蔬菜\",\"果树\"],\"problems\":[\"其他\",\"缺素\"],\"regions\":[\"全国\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"缺素\",\"shi-fei-tiao-tu-rang\"],\"photos\":[{\"src\":\"/images/articles/shi-fei-tiao-tu-rang.jpg\",\"alt\":\"黄叶和化验单对照着看\"},{\"src\":\"/images/articles/shi-fei-tiao-tu-rang-2.jpg\",\"alt\":\"手里叶子和报告\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"ce-tu-bao-gao\",\"huang-ye-jian-bie\",\"ye-cai-xiao-xing-yuan-su\"],\"conditions\":\"看叶片能猜，不能代替测土。四种黄叶可能四条路。先分流再下肥。\",\"commonCrops\":\"所有作物。\"},{\"slug\":\"nan-fang-shui-tian-yang-fen\",\"title\":\"南方水田养分：还原层把养分锁住了\",\"subtitle\":\"淹着的土会改脾气，磷和微量元素不听话\",\"summary\":\"你把叶、根、土面三样放一起看。\",\"crops\":[\"水稻\"],\"problems\":[\"其他\",\"涝害\"],\"regions\":[\"华南\",\"长江中下游\",\"西南\"],\"seasons\":[\"全年\"],\"tags\":[\"其他\",\"涝害\",\"nan-fang-shui-tian-yang-fen\"],\"photos\":[{\"src\":\"/images/articles/nan-fang-shui-tian-yang-fen.jpg\",\"alt\":\"南方水田苗黄水冷\"},{\"src\":\"/images/articles/nan-fang-shui-tian-yang-fen-2.jpg\",\"alt\":\"水稻叶面褐斑特写\"}],\"hot\":false,\"featured\":false,\"updatedAt\":\"2026-09-01\",\"relatedSlugs\":[\"shui-tian-huan-yuan\",\"xiu-shui-tian\",\"que-xin\"],\"conditions\":\"不是缺那一袋复合肥。先给根空气，养分才会开门。锈水、黑根、臭味是线索。\",\"commonCrops\":\"水稻。\"}]");
var ALIASES = aliases_default;
var META$2 = articles_en_meta_default;
function fold(s) {
	return s.toLowerCase().replace(/\s+/g, "");
}
function haystack(a) {
	const extra = (ALIASES[a.slug] ?? []).join("");
	const m = META$2[a.slug];
	return fold([
		a.title,
		a.subtitle,
		a.summary,
		a.tags.join(""),
		a.problems.join(""),
		a.crops.join(""),
		a.conditions ?? "",
		a.commonCrops ?? "",
		extra,
		m?.title ?? "",
		m?.subtitle ?? "",
		m?.summary ?? ""
	].join(""));
}
function scoreArticle(a, q) {
	if (!q) return 1;
	const n = fold(q);
	if (!n) return 1;
	const aliases = ALIASES[a.slug] ?? [];
	let i = 0;
	for (const e of aliases) {
		const t = fold(e);
		if (t === n) i += 24;
		else if (t.includes(n) || n.includes(t)) i += 16;
	}
	if (haystack(a).includes(n)) i += 10;
	if (fold(a.title).includes(n)) i += 8;
	if (fold(a.summary).includes(n)) i += 4;
	for (const tag of a.tags) {
		const e = fold(tag);
		if (n === e || e.includes(n) || n.includes(e)) i += 6;
	}
	return i;
}
function filterArticles(q) {
	const text = q.q?.trim() ?? "";
	const lang = q.lang === "en" ? "en" : "zh";
	return CARDS.filter((a) => {
		if (q.crop && q.crop !== "全部" && !a.crops.includes(q.crop)) return false;
		if (q.problem && q.problem !== "全部") {
			if (q.problem === "酸化") {
				if (a.problems[0] !== "酸化") return false;
			} else if (a.problems[0] !== q.problem && !a.problems.includes(q.problem)) return false;
		}
		if (q.region && q.region !== "全部" && !a.regions.includes(q.region)) return false;
		if (q.season && q.season !== "全部" && !a.seasons.includes(q.season)) return false;
		if (text && scoreArticle(a, text) < 6) return false;
		return true;
	}).sort((a, b) => {
		if (text) return scoreArticle(b, text) - scoreArticle(a, text);
		if (!!b.featured === !!a.featured) return a.title.localeCompare(b.title, lang === "en" ? "en" : "zh");
		return b.featured ? 1 : -1;
	});
}
function facetCounts(base = {}) {
	const problems = {};
	const crops = {};
	const regions = {};
	const seasons = {};
	for (const p of PROBLEMS) problems[p] = filterArticles({
		...base,
		problem: p
	}).length;
	for (const c of CROPS) crops[c] = filterArticles({
		...base,
		crop: c
	}).length;
	for (const r of REGIONS) regions[r] = filterArticles({
		...base,
		region: r
	}).length;
	for (const s of SEASONS) seasons[s] = filterArticles({
		...base,
		season: s
	}).length;
	return {
		problems,
		crops,
		regions,
		seasons
	};
}
function getCard(slug) {
	const id = resolveSlug(slug);
	return CARDS.find((a) => a.slug === id);
}
function hotArticles(n = 6) {
	return CARDS.filter((a) => a.hot || a.featured).slice(0, n);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ArticleCard-BP7GhzcL.js
var META$1 = articles_en_meta_default;
function ArticleCard({ article, variant = "row" }) {
	const lang = usePathLang();
	const m = lang === "en" ? META$1[article.slug] : void 0;
	const title = m?.title && !hasHan(m.title) ? m.title : lang === "en" ? article.slug.replace(/-/g, " ") : article.title;
	const summaryRaw = m?.card || m?.summary || article.card || article.summary;
	const summary = lang === "en" ? summaryRaw && !hasHan(summaryRaw) ? summaryRaw : "" : article.card || article.summary;
	const src = article.photos?.find((p) => p.src && p.src.trim())?.src ?? "";
	const first = article.photos?.find((p) => p.src && p.src.trim());
	const alt = first?.alt && (lang !== "en" || !hasHan(first.alt)) ? first.alt : title;
	const thumb = src && !/missing/.test(src) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: variant === "tile" ? "aspect-[16/10] w-full bg-surface-2 object-cover" : "h-28 w-28 shrink-0 bg-surface-2 object-cover sm:h-32 sm:w-36",
		loading: "lazy",
		width: variant === "tile" ? 640 : 144,
		height: variant === "tile" ? 400 : 128,
		onError: (e) => {
			e.currentTarget.style.display = "none";
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: variant === "tile" ? "grid aspect-[16/10] w-full place-items-center bg-surface-2 text-sm text-muted" : "grid h-28 w-28 shrink-0 place-items-center bg-surface-2 px-2 text-center text-xs text-muted sm:h-32 sm:w-36",
		children: lang === "en" ? "Field photo to add" : "待补田间照片"
	});
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-[1.05rem] font-semibold leading-snug text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: variant === "tile" ? "block line-clamp-2 text-[0.95rem] leading-relaxed text-muted" : "block line-clamp-2 text-[0.95rem] leading-relaxed text-muted",
				children: summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex flex-wrap gap-1",
				children: article.problems.slice(0, 1).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-surface-2 px-2 py-0.5 text-xs text-clay",
					children: lex(p, lang)
				}, p))
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
		to: "/knowledge/$slug",
		params: { slug: article.slug },
		className: variant === "tile" ? "overflow-hidden rounded-2xl border border-line bg-surface" : "flex overflow-hidden rounded-2xl border border-line bg-surface",
		children: variant === "tile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [thumb, body] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [thumb, body] })
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/route-data-DFTKbPuN.js
function useAnyLoaderData() {
	return useLoaderData({ strict: false });
}
function useAnySearch() {
	return useSearch({ strict: false });
}
function useAnyNavigate() {
	return useNavigate();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/server-fj0J5r3Y.js
var listPosts = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("04e67d7f6357f36871f5b682b8c29ef050f05772ff57b40eb7fb50b9e90cecc1"));
var getPost = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("96cba498bb5177c3acab66991e358bfd8ed5f4d542ad0da54c3455b07cc30dcb"));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("1e9d4cadd619017d0384b415fbbef9e8ff2e5b45ab2279f91be8edae2a528e91"));
var addReply = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("523c93b342ee2a4a6a375a1610c7bbff6dc82bb85195ab08150afe1f41141711"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/PhotoSlot-BsUcgLlx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SHOTS = {
	plant: {
		good: "/images/diagnose/whole-good.jpg",
		bad: "/images/diagnose/whole-bad.jpg",
		goodAlt: "整垄麦苗在画面里。Wikimedia CC BY-SA：Triticum aestivum (common wheat).",
		badAlt: "只见天、不见苗。不要这样拍整株。"
	},
	leaf: {
		good: "/images/diagnose/close-good.jpg",
		bad: "/images/diagnose/close-bad.jpg",
		goodAlt: "叶片特写：新叶发黄、叶脉还绿。",
		badAlt: "逆光发黑，看不清叶位。"
	},
	soil: {
		good: "/images/diagnose/soil-good.jpg",
		bad: "/images/diagnose/soil-bad.jpg",
		goodAlt: "土面白霜能看清。ISRIC Solonchak，Wikimedia CC BY-SA 3.0。",
		badAlt: "远处风景，看不清土面。"
	}
};
function PhotoSlot({ label, hint, avoid, preview, cameraLabel, albumLabel, shotLabel, avoidLabel, kind = "plant", onFile }) {
	const cam = (0, import_react.useRef)(null);
	const alb = (0, import_react.useRef)(null);
	const shot = SHOTS[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-line bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: hint
			}),
			avoid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: avoid
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-lg bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t-4 border-forest",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shot.good,
							alt: shot.goodAlt,
							className: "h-[140px] min-h-[140px] w-full object-cover",
							width: 280,
							height: 140
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "px-2 py-1 text-xs text-muted",
						children: shotLabel
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-lg bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t-4 border-danger",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shot.bad,
							alt: shot.badAlt,
							className: "h-[140px] min-h-[140px] w-full object-cover",
							width: 280,
							height: 140
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "px-2 py-1 text-xs text-muted",
						children: avoidLabel
					})]
				})]
			}),
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: preview,
				alt: "",
				className: "mt-2 h-32 w-full rounded-lg object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 block h-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-12 items-center justify-center rounded-lg bg-forest px-2 text-sm text-forest-fg",
					onClick: () => cam.current?.click(),
					children: cameraLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface px-2 text-sm",
					onClick: () => alb.current?.click(),
					children: albumLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: cam,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "sr-only",
				onChange: (e) => onFile(e.target.files?.[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: alb,
				type: "file",
				accept: "image/*",
				className: "sr-only",
				onChange: (e) => onFile(e.target.files?.[0])
			})
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ReadAloud-C5xhNEKH.js
/** One speaker at a time. New play / route change bumps the token. */
var token = 0;
function beginSpeakSession() {
	token += 1;
	if (typeof window !== "undefined") try {
		window.speechSynthesis?.cancel();
	} catch {}
	return token;
}
function isSpeakSession(t) {
	return t === token;
}
function stopSpeakSession() {
	token += 1;
	if (typeof window !== "undefined") {
		try {
			window.speechSynthesis?.cancel();
		} catch {}
		if (navigator.mediaSession) try {
			navigator.mediaSession.playbackState = "none";
		} catch {}
	}
}
function mp3Path(slug, lang, howto) {
	if (!slug) return "";
	return howto ? `/audio/${slug}.how.${lang}.mp3` : `/audio/${slug}.${lang}.mp3`;
}
function ReadAloud({ sentences, howSentences, title, slug, howto: howtoProp, listenLabel }) {
	const lang = usePathLang();
	const t = messages[lang].tts;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [rate, setRate] = (0, import_react.useState)(1);
	const [howtoInner] = (0, import_react.useState)(false);
	const [noVoice, setNoVoice] = (0, import_react.useState)(false);
	const [hasMp3, setHasMp3] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const session = (0, import_react.useRef)(0);
	const want = (0, import_react.useRef)(false);
	const listRef = (0, import_react.useRef)([]);
	const idxRef = (0, import_react.useRef)(0);
	const rateRef = (0, import_react.useRef)(1);
	const langRef = (0, import_react.useRef)(lang);
	const audioRef = (0, import_react.useRef)(null);
	langRef.current = lang;
	rateRef.current = rate;
	idxRef.current = idx;
	const howto = howtoProp ?? howtoInner;
	const SKIP = /translation pending|^土知$|^Tuzhi$|^李泽宇$|^Li Zeyu$|^Sources$|^依据$/i;
	const STEP_NO = /^\s*\d+\s*[）).、]/;
	function take(list, label) {
		const prepared = (list ?? []).map((s) => speakPrepare(s, lang)).filter((s) => s.trim() && !SKIP.test(s.trim()));
		const cleaned = lang === "en" ? dropHanLines(prepared, `${slug || title || "read"}:${label}`) : prepared;
		if (label === "full") return cleaned.filter((s) => !STEP_NO.test(s));
		return cleaned;
	}
	const fullLines = take(sentences, "full");
	const howLines = take(howSentences, "how");
	const lines = howto && howLines.length ? howLines : fullLines;
	const fileUrl = mp3Path(slug, lang, !!(howto && howLines.length));
	(0, import_react.useEffect)(() => {
		setRate(readTtsRate());
	}, []);
	(0, import_react.useEffect)(() => {
		want.current = false;
		stopSpeakSession();
		const el = audioRef.current;
		if (el) {
			el.pause();
			el.currentTime = 0;
		}
		setMode("idle");
		setIdx(0);
		setProgress(0);
		setHasMp3(false);
	}, [
		howto,
		pathname,
		lang,
		fileUrl
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			want.current = false;
			stopSpeakSession();
			audioRef.current?.pause();
		};
	}, []);
	function applyMedia(state, i, list) {
		if (typeof navigator === "undefined" || !navigator.mediaSession) return;
		try {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: title || (langRef.current === "en" ? "Tuzhi" : "土知"),
				artist: langRef.current === "en" ? "Tuzhi" : "土知",
				album: list[i] || ""
			});
			navigator.mediaSession.playbackState = state === "playing" ? "playing" : state === "paused" ? "paused" : "none";
			navigator.mediaSession.setActionHandler("play", () => resume());
			navigator.mediaSession.setActionHandler("pause", () => pause());
			navigator.mediaSession.setActionHandler("stop", () => stopAll());
		} catch {}
	}
	function stopAll() {
		want.current = false;
		stopSpeakSession();
		const el = audioRef.current;
		if (el) {
			el.pause();
			el.currentTime = 0;
		}
		setMode("idle");
		setIdx(0);
		setProgress(0);
	}
	function pause() {
		if (mode !== "playing") return;
		want.current = false;
		audioRef.current?.pause();
		try {
			window.speechSynthesis?.pause();
		} catch {
			window.speechSynthesis?.cancel();
		}
		setMode("paused");
		applyMedia("paused", idxRef.current, listRef.current);
	}
	function resume() {
		if (mode === "paused") {
			want.current = true;
			const el = audioRef.current;
			if (el && !el.ended && el.src) {
				el.play().then(() => {
					setMode("playing");
					applyMedia("playing", idxRef.current, listRef.current);
				});
				return;
			}
			try {
				if (window.speechSynthesis.paused) {
					window.speechSynthesis.resume();
					setMode("playing");
					applyMedia("playing", idxRef.current, listRef.current);
					return;
				}
			} catch {}
		}
		speakFrom(0);
	}
	async function playFile() {
		const el = audioRef.current;
		if (!el || !fileUrl) return false;
		try {
			el.src = fileUrl;
			el.playbackRate = rateRef.current;
			await el.play();
			setHasMp3(true);
			setMode("playing");
			applyMedia("playing", 0, listRef.current);
			return true;
		} catch {
			setHasMp3(false);
			return false;
		}
	}
	async function speakFrom(start) {
		const list = lines;
		listRef.current = list;
		if (!list.length && !fileUrl) return;
		const tok = beginSpeakSession();
		session.current = tok;
		want.current = true;
		if (await playFile()) return;
		if (!list.length) return;
		await waitForVoices();
		if (!isSpeakSession(tok)) return;
		if (langRef.current === "zh" && !hasLangVoice("zh")) {
			setNoVoice(true);
			setMode("idle");
			return;
		}
		setNoVoice(false);
		const voice = pickVoice(langRef.current);
		if (langRef.current === "zh" && voice && !/^zh/i.test(voice.lang) && !/chinese|cmn|普通话/i.test(voice.name)) {
			setNoVoice(true);
			setMode("idle");
			return;
		}
		function utter(i) {
			if (!isSpeakSession(tok) || !want.current) return;
			if (i >= list.length) {
				setMode("idle");
				setIdx(0);
				want.current = false;
				applyMedia("idle", 0, list);
				return;
			}
			const line = list[i];
			if (langRef.current === "en" && /[\u4e00-\u9fff]/.test(line)) {
				utter(i + 1);
				return;
			}
			const u = new SpeechSynthesisUtterance(line);
			if (voice) u.voice = voice;
			u.lang = langRef.current === "zh" ? "zh-CN" : "en-US";
			u.rate = rateRef.current;
			u.onstart = () => {
				if (!isSpeakSession(tok)) return;
				setIdx(i);
				idxRef.current = i;
				setMode("playing");
				applyMedia("playing", i, list);
			};
			u.onend = () => {
				if (!isSpeakSession(tok) || !want.current) return;
				utter(i + 1);
			};
			u.onerror = () => {
				if (!isSpeakSession(tok) || !want.current) return;
				utter(i + 1);
			};
			window.speechSynthesis.speak(u);
		}
		setIdx(start);
		utter(start);
	}
	function changeRate(next) {
		setRate(next);
		writeTtsRate(next);
		if (audioRef.current) audioRef.current.playbackRate = next;
	}
	function seekMp3(frac) {
		const el = audioRef.current;
		if (!el?.duration) return;
		el.currentTime = frac * el.duration;
		setProgress(frac);
	}
	function onTime() {
		const el = audioRef.current;
		if (!el?.duration) return;
		const p = el.currentTime / el.duration;
		setProgress(p);
		const n = listRef.current.length || lines.length;
		if (n) {
			const i = Math.min(n - 1, Math.floor(p * n + 1e-6));
			setIdx(i);
			idxRef.current = i;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-2xl border border-line bg-surface p-3",
		children: [
			fileUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audioRef,
				src: fileUrl,
				preload: "metadata",
				className: "sr-only",
				onCanPlay: () => setHasMp3(true),
				onError: () => setHasMp3(false),
				onTimeUpdate: onTime,
				onEnded: () => {
					setMode("idle");
					setIdx(0);
					setProgress(0);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 lg:flex-nowrap",
				children: [
					mode === "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg",
						onClick: pause,
						children: t.pause
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg",
						onClick: () => mode === "paused" ? resume() : void speakFrom(0),
						children: mode === "paused" ? t.resume : listenLabel || t.listen
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4",
						onClick: stopAll,
						children: t.stop
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: t.rate
					}),
					TTS_RATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: r === rate ? "inline-flex min-h-9 items-center rounded-full bg-forest px-3 text-sm text-forest-fg" : "inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3 text-sm",
						onClick: () => changeRate(r),
						children: [r, "×"]
					}, r))
				]
			}),
			mode !== "idle" && hasMp3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 1e3,
				value: Math.round(progress * 1e3),
				"aria-label": t.progress,
				className: "w-full accent-forest",
				onChange: (e) => seekMp3(Number(e.target.value) / 1e3)
			}) : null,
			mode !== "idle" && lines[idx] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-surface-2 px-3 py-2 text-base leading-relaxed",
				children: lines[idx]
			}) : null,
			noVoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted",
				children: t.noZhVoice
			}) : null,
			lines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				"data-tts-queue": howto && howLines.length ? "howto" : "full",
				"data-tts-count": lines.length,
				className: "sr-only",
				children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, `${i}-${line.slice(0, 8)}`))
			}) : null
		]
	});
}
//#endregion
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
//#region node_modules/.nitro/vite/services/ssr/assets/encyclopedia-DsXftMY_.js
var wiki_default = {
	ph: {
		"id": "ph",
		"relatedSlugs": [
			"suan-hua",
			"shi-hui-yong-liang",
			"jian-yi-ph-ec"
		],
		"bvid": "BV1nu4y1Y7mH",
		"videoTitle": "如何用pH试纸测试土壤酸碱度",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/ph.jpg",
			"alt": "pH（酸碱度） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/ph-2.jpg",
			"alt": "pH（酸碱度） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "pH（酸碱度）",
			"subtitle": "pH 说土水有多酸多碱，不是某一种病的名字。",
			"summary": "pH 说的是土水有多酸多碱，不是某一种病的名字。单子上常写成 pH 或水浸 pH，旁边要看水土比。粮田耕层低于约 5.5，根尖容易褐秃，可以谈农用石灰；六点到七点五多数粮菜比较舒服。茶园大约四点五到六，不能照搬改到中性。这条不给袋数。",
			"appearance": "单子上可能写 pH、酸碱度、水浸 pH。先看旁边有没有水土比。同一块地，水土比不同，小数点不能硬比。",
			"conditions": "雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。",
			"commonCrops": "粮菜多数看六点到七点五，茶树另算。",
			"fieldCheck": "粮田根尖褐秃，常对上偏低的 pH；新叶黄、脉还绿，常对上偏高的 pH。茶园不是同一套标准。",
			"longform": ["pH 说的是土水有多酸多碱，不是某一种病的名字。单子上常写成 pH 或水浸 pH，旁边要看水土比。粮田耕层低于约 5.5，根尖容易褐秃，可以谈农用石灰；六点到七点五多数粮菜比较舒服。茶园大约四点五到六，不能照搬改到中性。这条不给袋数。", "pH 只说土水有多酸多碱，不说缺哪一种肥。粮田和茶园目标不同。改酸改碱都冲着这个数字，用量去农业知识。用量去农业知识，按测土和当地农技站。"],
			"confuse": [{
				"lookalike": "有机质是肉，EC 是咸",
				"difference": "有机质是储量，电导是咸度。pH 只说酸甜。",
				"photoHint": "化验单上的 pH 和地里根尖、新叶放一起看。"
			}, {
				"lookalike": "只看叶子下肥",
				"difference": "pH 是测量值，不是病名。叶子只是线索，对不上就测。",
				"photoHint": "化验单上的 pH 和地里根尖、新叶放一起看。"
			}],
			"plainExplain": "pH 只说土水有多酸多碱，不说缺哪一种肥。粮田和茶园目标不同。改酸改碱都冲着这个数字，用量去农业知识。",
			"natural": ["雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。", "雨水淋、铵态氮往下推，石灰性母质往上推。"],
			"human": ["只抄别家田的袋数，不问自家 pH。", "场面和数字拧着还猛追肥。"],
			"steps": [
				"单子先圈 pH。低于大约五点五看根尖褐不褐，高于八看新叶黄不黄、脉还绿不绿。",
				"报告上先找 pH。低于大约 5.5，根尖容易褐秃；高于 8，新叶容易黄、脉还绿。",
				"改酸改碱都冲着这个数字，用量去农业知识，这条不给袋数。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要跨实验室、跨水土比硬比一个小数。",
				"茶园不要按粮田改到中性。",
				"pH 不是缺肥的名字，不要一低就猛尿素。"
			],
			"whenToTest": "单子上这个数看不懂，或准备改酸改碱前：耕作层多点混合。",
			"prevention": ["铵态氮不要连年当唯一氮源。隔季再测这个数。", "只抄别家田的袋数，不问自家 pH。"],
			"indicators": [{
				"name": "pH（酸碱度）",
				"meaning": "pH 是测量值，不是病名。改酸改碱都冲着这个数字。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "有机质",
				"meaning": "土里的肉。有机质低了，别的数字也站不稳。",
				"typical": "慢慢培，不要指望一季翻身"
			}],
			"aka": "酸碱度 / 水浸 pH / 水土比 1:2.5 pH / pH 5.2",
			"ratioNote": "1:1、1:2.5、1:5 的 pH 不能硬比。同一块地换水土比，数字会动。",
			"readTable": [{
				"label": "粮田水浸 pH（示意）",
				"low": "低于约 5.5，根尖易褐秃",
				"mid": "大约 6.0～7.5，多数粮菜舒服",
				"high": "高于约 8，铁易被锁"
			}, {
				"label": "茶园",
				"low": "过低伤根",
				"mid": "大约 4.5～6.0 才是茶的窗口",
				"high": "改到中性会伤茶"
			}],
			"spoken": [
				"pH 是测量值，不是病名。",
				"单子上酸碱度、水浸 pH 都是它。",
				"先看水土比，一比一和二点五不能硬比。",
				"粮田低于大约五点五，才谈改酸。",
				"茶园不要按粮田改到中性。",
				"高于八，新叶黄、脉还绿，铁容易被锁。",
				"用量去酸化和石灰那两篇。"
			]
		},
		"en": {
			"title": "pH",
			"subtitle": "pH is a measurement, not a disease.",
			"summary": "pH says how acid or alkaline the soil water is. It is not the name of a disease. On grain land, root tips go brown below about 5.5 and agricultural lime can be discussed. Most grain and vegetables are comfortable around 6.0–7.5. Tea stays about 4.5–6.0 and must not be pushed to neutral. This page does not hand you a bag count.",
			"appearance": "The sheet may say pH, acidity, or water pH. Read the soil:water ratio first. Different ratios are not the same number.",
			"conditions": "Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
			"commonCrops": "Most grain and vegetables sit around 6–7.5; tea uses a different range.",
			"fieldCheck": "Brown bald root tips often match low pH on grain land; yellow new leaves with green veins often match high pH. Tea uses a different range.",
			"longform": ["pH is a measurement, not a disease. Lime or alkali amendments aim at this number. Grain land and tea have different targets.", "If the number and the field disagree, read the soil:water ratio first. Rates live in the field guide."],
			"confuse": [{
				"lookalike": "Organic matter or EC",
				"difference": "Organic matter is the reserve. EC is salt. pH only says how acid or alkaline.",
				"photoHint": "Put the sheet next to the root tips or the newest leaves."
			}, {
				"lookalike": "Guessing from leaves",
				"difference": "pH is a measurement, not a disease. Test when the leaf and the number disagree.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "pH is a measurement, not a disease. Lime or alkali amendments aim at this number. Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
			"natural": ["Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.", "Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not."],
			"human": ["Copying a neighbour’s lime without your pH.", "Chasing a mismatch with more fertiliser."],
			"steps": [
				"Find pH first. Below about 5.5 root tips brown; above 8 new leaves yellow with green veins.",
				"Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
				"pH is a measurement, not a disease. Lime or alkali amendments aim at this number. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t mix labs or soil:water ratios.",
				"Don’t push tea to neutral.",
				"pH is not a nutrient name."
			],
			"whenToTest": "When you cannot read this number, or before you lime: mix the tilled layer.",
			"prevention": ["Don’t make ammonium-N the only nitrogen for years. Retest next season.", "Copying a neighbour’s lime without your pH."],
			"indicators": [{
				"name": "pH",
				"meaning": "pH is a measurement, not a disease. Lime or alkali amendments aim at this number.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "Organic matter",
				"meaning": "The soil’s meat. Thin meat makes other numbers wobble.",
				"typical": "Slow work — not a one-season flip"
			}],
			"aka": "acidity, water pH, 1:2.5 pH, pH 5.2",
			"ratioNote": "1:1, 1:2.5 and 1:5 pH are not the same number.",
			"readTable": [{
				"label": "Grain, water pH (sketch)",
				"low": "Below about 5.5, root tips brown",
				"mid": "About 6.0–7.5 for most grain and veg",
				"high": "Above about 8, iron locks"
			}, {
				"label": "Tea",
				"low": "Too low hurts roots",
				"mid": "About 4.5–6.0 is the tea window",
				"high": "Do not push tea to neutral"
			}],
			"spoken": [
				"pH is a measurement, not a disease.",
				"Acidity and water pH on the sheet are the same cell.",
				"Read the soil to water ratio before you compare labs.",
				"On grain land, lime only below about 5.5.",
				"Do not push tea to neutral.",
				"Above about 8, iron often locks.",
				"Rates live in the acid-soil and lime guides."
			]
		}
	},
	om: {
		"id": "om",
		"relatedSlugs": [
			"you-ji-zhi",
			"jie-gan-huan-tian",
			"sha-tu-zeng-you-ji-zhi"
		],
		"bvid": "BV1Si421h7bY",
		"videoTitle": "如何给土壤加有机质",
		"problem": "有机质低",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/om.jpg",
			"alt": "有机质 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/om-2.jpg",
			"alt": "有机质 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有机质",
			"subtitle": "有机质是土壤里有机物质的含量，不是菌剂商品名。",
			"summary": "有机质是土壤里已经腐解和正在腐解的有机物质含量，能帮忙团粒、保水和缓冲。单子上常写成有机质或有机碳，单位常见克/公斤。低了土更散、肥更留不住，但这一格不是当季开关，要靠还田和腐熟粪几年养。不是某袋菌剂的名字。这条不给袋数。",
			"appearance": "单子上写有机质、有机碳。先看单位。数字低只说储量薄，不自动等于下一袋肥。",
			"conditions": "沙土、裸冬、秸秆全拿走，有机质掉得快。还田是慢功夫。",
			"commonCrops": "粮、菜、果都靠这层有机质。沙土掉得更快。",
			"fieldCheck": "搓一把土：颜色浅、粉、搓不成团，一场雨肥就飘，常常是有机质低了。颜色深不是化验，但浅了常常肉薄。",
			"longform": ["有机质是土壤里已经腐解和正在腐解的有机物质含量，能帮忙团粒、保水和缓冲。单子上常写成有机质或有机碳，单位常见克/公斤。低了土更散、肥更留不住，但这一格不是当季开关，要靠还田和腐熟粪几年养。不是某袋菌剂的名字。这条不给袋数。", "有机质薄，缓冲差、保肥差。要连续几年还田加腐熟粪。菌剂不是这一格的商品名。用量去农业知识，按测土和当地农技站。"],
			"confuse": [{
				"lookalike": "质地说沙黏，容重说紧",
				"difference": "质地说沙黏，容重说紧。有机质说有没有肉。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}, {
				"lookalike": "颜色深就是有机质高",
				"difference": "颜色深不是化验。搓一把团不团得住更实在。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}],
			"plainExplain": "有机质薄，缓冲差、保肥差。要连续几年还田加腐熟粪。菌剂不是这一格的商品名。",
			"natural": ["沙土、裸冬、秸秆全拿走，有机质掉得快。还田是慢功夫。", "沙土、裸冬、秸秆全拿走，有机质掉得快。"],
			"human": ["指望菌剂产品一季把肉补回来。", "秸秆全拿走，还怪土瘦。"],
			"steps": [
				"搓一把：团得住又易散、颜色深，才像有肉。浅、粉、一场雨肥就飘，有机质低了。",
				"土色发浅、一抓就散、肥效年年飘，常常是有机质低了。颜色深不是化验。",
				"还田是慢功夫。菌剂产品一季补不回来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把有机碳当成有机质硬比。",
				"不要指望菌剂产品一季翻身。",
				"生粪不要埋根边。"
			],
			"whenToTest": "土色发浅、一把就散、肥效年年飘，再测有机质。",
			"prevention": ["秸秆能还就还，少裸冬。肉是慢功夫。", "指望菌剂产品一季把肉补回来。"],
			"indicators": [{
				"name": "有机质",
				"meaning": "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有机质 / 有机碳 / OM / 土里的肉",
			"ratioNote": "有机碳和有机质不是同一个数，有的单子用 1.724 去换。看清列名。",
			"readTable": [{
				"label": "耕层有机质（示意）",
				"low": "浅色散土，肥效年年飘",
				"mid": "能搓团又易散",
				"high": "黑土有机质高，仍要看盐和酸"
			}],
			"spoken": [
				"有机质是土壤里的有机物质含量，不是菌剂商品名。",
				"百分数和克每千克不要看串。",
				"浅、粉、一场雨肥就飘，有机质低了。",
				"还田是年年的慢功夫。",
				"不要指望菌剂产品一季翻身。",
				"生粪埋根边会烧苗。"
			]
		},
		"en": {
			"title": "Organic matter",
			"subtitle": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.",
			"summary": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.",
			"appearance": "Organic matter or organic carbon. g/kg versus % — 1.2% is not 1.2 g/kg.",
			"conditions": "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"commonCrops": "Grain, vegetables and fruit all live on this meat. Sand drops it faster.",
			"fieldCheck": "A pale, dusty handful that will not clod, and fertiliser that vanishes after rain, often means thin organic matter.",
			"longform": ["Organic matter is the soil’s savings, not a microbe bag. Residue return is slow work.", "Sandy soils hold less. Fresh manure against the root burns. Rates live in the organic-matter guide."],
			"confuse": [{
				"lookalike": "Texture is sand or clay, bulk density is",
				"difference": "Texture is sand or clay, bulk density is tightness. Organic matter is meat.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Dark colour means high OM",
				"difference": "Dark is not a lab number. A handful that holds then breaks is more honest.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product. Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"natural": ["Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.", "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work."],
			"human": ["Expecting a microbe bag to rebuild meat in one season.", "Hauling all the straw off, then blaming thin soil."],
			"steps": [
				"Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
				"Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
				"Organic matter is the soil’s reserve and buffer, not the name of a microbial product. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t mix carbon with matter.",
				"Don’t expect a microbe bag to rebuild a field in one season.",
				"Don’t bury fresh manure on the root."
			],
			"whenToTest": "Pale powdery soil whose fertiliser evaporates — test organic matter.",
			"prevention": ["Return straw if you can. Bare winters drop the meat.", "Expecting a microbe bag to rebuild meat in one season."],
			"indicators": [{
				"name": "Organic matter",
				"meaning": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"aka": "organic matter, organic carbon, OM",
			"ratioNote": "Organic carbon and organic matter are not the same cell. Read the column name.",
			"readTable": [{
				"label": "Topsoil OM (sketch)",
				"low": "Pale, dusty, fertiliser vanishes",
				"mid": "Clods then crumbles",
				"high": "Dark savings — still read salt and pH"
			}],
			"spoken": [
				"Organic matter is the soil’s reserve and buffer.",
				"It is not the name of a microbial product.",
				"Do not mix percent with grams per kilogram.",
				"Pale dusty soil that loses fertiliser after rain is thin.",
				"Residue return is year-by-year work.",
				"Fresh manure against the root burns."
			]
		}
	},
	cec: {
		"id": "cec",
		"relatedSlugs": [
			"you-ji-zhi",
			"sha-tu-lou-fei",
			"nian-tu-nan-geng"
		],
		"bvid": "BV1sA411r7Ts",
		"videoTitle": "增加土壤有机质，快速有效的好方法",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/cec.jpg",
			"alt": "CEC（阳离子交换量） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/cec-2.jpg",
			"alt": "CEC（阳离子交换量） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "CEC（阳离子交换量）",
			"subtitle": "阳离子交换量说土能抓住多少养分，低了肥留不住。",
			"summary": "阳离子交换量说土能抓住多少养分离子。单子上常写成 CEC，单位常见厘米摩尔每公斤。低了肥下去留不住，沙土更明显；高了一次能多留一点。这一格不是当季袋数，沙土只能少量多次，质地改不掉，只能慢慢把有机质养起来。",
			"appearance": "CEC 低的沙土，肥下去留不住；黏土和有机质高的土一次能多留一点。",
			"conditions": "质地和有机质决定磁力。质地改不掉，只能把有机质慢慢养起来。",
			"commonCrops": "沙土保肥能力弱，黏土和有机质高的土能多留。",
			"fieldCheck": "沙土肥下去留不住，黏土能多留一点。先认质地，再谈一次倒多少。",
			"longform": ["抓一把沙土和一把黏土并排看。沙土像筛子，黏土能多留。CEC 是抓肥的结果，不是沙黏本身。沙土按黏土地的袋数一次倒全年，第二天就像没施。把有机质慢慢养起来，一次才能多留一点。"],
			"confuse": [{
				"lookalike": "质地是沙黏本身，CEC 是抓肥的结果",
				"difference": "质地是沙黏本身，CEC 是抓肥的结果。",
				"photoHint": "沙土筛子和黏土团子对照着看。"
			}, {
				"lookalike": "沙土按黏土袋数倒",
				"difference": "保肥能力弱就少量多次，别按别的黏土地袋数抄。",
				"photoHint": "沙土筛子和黏土团子对照着看。"
			}],
			"plainExplain": "CEC 低，肥下去留不住；CEC 高，一次能多留一点。质地改不掉，只能把有机质慢慢养起来。沙土少量多次，不要按黏土袋数抄。",
			"natural": ["质地和有机质决定磁力。质地改不掉，只能把有机质慢慢养起来。", "质地改不掉，只能把有机质慢慢养起来。"],
			"human": ["沙土按黏土袋数一次倒全年。", "保肥能力弱还猛灌大水把肥冲走。"],
			"steps": [
				"沙土肥下去留不住，黏土能多留一点。先认质地，再谈一次倒多少。",
				"CEC 低的沙土，肥下去留不住；黏土和有机质高的土一次能多留一点。",
				"保肥能力弱就少量多次，别按别的黏土地袋数抄。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"沙土按黏土袋数一次倒全年。",
				"保肥能力弱还猛灌大水把肥冲走。",
				"质地是沙黏本身，CEC 是抓肥的结果。"
			],
			"whenToTest": "沙土肥留不住、黏土一次能多留，先认质地再谈磁力。",
			"prevention": ["把有机质慢慢养起来，磁力才会强。沙土只能少量多次。", "沙土按黏土袋数一次倒全年。"],
			"indicators": [{
				"name": "CEC（阳离子交换量）",
				"meaning": "保肥能力弱就少量多次，保肥能力强才一次能多留。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "CEC（阳离子交换量）",
			"spoken": [
				"CEC（阳离子交换量）。",
				"保肥能力弱就少量多次，保肥能力强才一次能多留。",
				"CEC 低的沙土，肥下去留不住；。",
				"黏土和有机质高的土一次能多留一点。",
				"沙土肥下去留不住，黏土能多留一点。",
				"先认质地，再谈一次倒多少。",
				"沙土按黏土袋数一次倒全年。",
				"保肥能力弱还猛灌大水把肥冲走。"
			]
		},
		"en": {
			"title": "CEC",
			"subtitle": "Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.",
			"summary": "CEC is how many nutrient seats the soil has. Low CEC needs smaller, more frequent dressings.",
			"appearance": "Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold more at once.",
			"conditions": "Texture and OM set the magnet. You cannot change texture; you thicken OM.",
			"commonCrops": "Sand is a low CEC; clay and high-OM soils hold more.",
			"fieldCheck": "Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold more at once.",
			"longform": ["Low-CEC sand will not hold fertiliser. Clay and high-organic-matter soils hold more. Texture and organic matter set CEC. You cannot change texture; you thicken organic matter.", "Texture is sand or clay; CEC is the holding that follows. Low CEC needs smaller, more frequent dressings. High CEC can hold more at once."],
			"confuse": [{
				"lookalike": "Texture is sand or clay; CEC is the hold",
				"difference": "Texture is sand or clay; CEC is the holding that follows.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Sand at clay rates",
				"difference": "Low CEC needs smaller, more frequent dressings.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "CEC is how many nutrient seats the soil has. Sand holds little; clay and high organic matter hold more. You cannot change texture overnight; you thicken organic matter.",
			"natural": ["Texture and OM set the magnet. You cannot change texture; you thicken OM.", "Texture and OM set the magnet. You cannot change texture; you thicken OM."],
			"human": ["Pouring a season onto sand in one hit.", "Flooding a low CEC so the meal washes away."],
			"steps": [
				"Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold more at once.",
				"Texture and OM set the magnet. You cannot change texture; you thicken OM.",
				"Low CEC needs smaller, more frequent dressings. High CEC can hold more at once. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Pouring a season onto sand in one hit.",
				"Flooding a low CEC so the meal washes away.",
				"Texture is sand or clay; CEC is the holding that follows."
			],
			"whenToTest": "Sand that will not hold fertiliser: name texture, then the magnet.",
			"prevention": ["Thicken the meat. Sand only takes little-and-often.", "Pouring a season onto sand in one hit."],
			"indicators": [{
				"name": "CEC",
				"meaning": "Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"CEC is how many nutrient seats the soil has.",
				"Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.",
				"Low-CEC sand will not hold fertiliser.",
				"Clay and high-organic-matter soils hold a bigger dressing."
			]
		}
	},
	texture: {
		"id": "texture",
		"relatedSlugs": [
			"sha-tu-lou-fei",
			"nian-tu-nan-geng",
			"tu-rang-tuan-ju-ti"
		],
		"bvid": "BV12bbaz9EcV",
		"videoTitle": "改良土壤排水透气",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/texture.jpg",
			"alt": "质地 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/texture-2.jpg",
			"alt": "质地 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "质地",
			"subtitle": "质地是天生的骨架，管理只能改结构。",
			"summary": "质地是天生的骨架，管理只能改结构。",
			"appearance": "搓一把：刺手是沙，能搓条是黏，中间是壤。质地改不掉。",
			"conditions": "河滩、风沙是沙；湖积、老红土常黏。质地决定漏还是涝。",
			"commonCrops": "河滩沙、湖积黏、岗地壤，骨架改不掉。",
			"fieldCheck": "搓一把：刺手是沙，能搓条是黏。骨架改不掉，别指望一袋肥改质地。",
			"longform": ["搓一把：刺手是沙，能搓条是黏。骨架改不掉，你只能改房间里的路。沙土漏，黏土难耕易裂，别指望一袋肥改质地。搓出来的沙、壤、黏三条对照。骨架改不掉，别指望一袋肥改质地。你在地头搓三条：刺手、能成条、中间那条。骨架是天生的，一袋肥改不了颗粒。你能改的是房间里的路，不是把沙变成黏。刺手漏水，能搓条的难耕易裂。你搓完再决定肥怎么下。别指望一袋肥把沙变成壤。"],
			"confuse": [{
				"lookalike": "团粒是结构，质地是颗粒",
				"difference": "团粒是结构，质地是颗粒。沙土也能养出团粒。",
				"photoHint": "搓出来的沙、壤、黏三条对照。"
			}, {
				"lookalike": "一袋肥能把沙改成壤",
				"difference": "骨架改不掉。你只能改房间里的路。",
				"photoHint": "搓出来的沙、壤、黏三条对照。"
			}],
			"plainExplain": "质地是天生的骨架，管理只能改结构。 河滩、风沙是沙；湖积、老红土常黏。质地决定漏还是涝。",
			"natural": ["河滩、风沙是沙；湖积、老红土常黏。质地决定漏还是涝。", "河滩风沙是沙，湖积老红土常黏。"],
			"human": ["想用化肥把沙改成壤。", "湿黏土硬旋，越旋越板。"],
			"steps": [
				"搓一把：刺手是沙，能搓条是黏。骨架改不掉，别指望一袋肥改质地。",
				"搓一把：刺手是沙，能搓条是黏，中间是壤。质地改不掉。",
				"骨架改不掉。你只能改房间里的路。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"想用化肥把沙改成壤。",
				"湿黏土硬旋，越旋越板。",
				"团粒是结构，质地是颗粒。沙土也能养出团粒。"
			],
			"whenToTest": "搓一把分不清沙黏时，质地就是这一课，不必先化验。",
			"prevention": ["别指望一袋肥改骨架。覆盖和有机质改的是路。", "想用化肥把沙改成壤。"],
			"indicators": [{
				"name": "质地",
				"meaning": "质地是天生的骨架，管理只能改结构。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "质地",
			"spoken": [
				"质地。",
				"质地是天生的骨架，管理只能改结构。",
				"搓一把：刺手是沙，能搓条是黏，中间是壤。",
				"质地改不掉。",
				"搓一把：刺手是沙，能搓条是黏。",
				"骨架改不掉，别指望一袋肥改质地。",
				"想用化肥把沙改成壤。",
				"湿黏土硬旋，越旋越板。"
			]
		},
		"en": {
			"title": "Texture",
			"subtitle": "Texture is the skeleton you were given. Management only changes structure.",
			"summary": "Texture is the skeleton you were given. Management only changes structure.",
			"appearance": "A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.",
			"conditions": "River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog.",
			"commonCrops": "River sand, lake clay, ridge loam — the skeleton you were given.",
			"fieldCheck": "A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.",
			"longform": ["A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change. River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog Easy to mix up: Aggregation is structure; texture is the particles. Sand can still crumb Texture is the skeleton you were given. Management only changes structure.。"],
			"confuse": [{
				"lookalike": "Aggregation is structure; texture is the",
				"difference": "Aggregation is structure; texture is the particles. Sand can still crumb.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Fertiliser will change sand to loam",
				"difference": "Texture is the skeleton. You only change the roads.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Texture is the skeleton you were given. Management only changes structure. River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog.",
			"natural": ["River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog.", "River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog."],
			"human": ["Trying to turn sand into loam with fertiliser.", "Rotavating wet clay until it smears."],
			"steps": [
				"A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.",
				"River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog.",
				"Texture is the skeleton you were given. Management only changes structure. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Trying to turn sand into loam with fertiliser.",
				"Rotavating wet clay until it smears.",
				"Aggregation is structure; texture is the particles. Sand can still crumb."
			],
			"whenToTest": "A handful tells sand from clay. You often need no lab.",
			"prevention": ["Fertiliser will not change the skeleton. Mulch and OM change the roads.", "Trying to turn sand into loam with fertiliser."],
			"indicators": [{
				"name": "Texture",
				"meaning": "Texture is the skeleton you were given. Management only changes structure.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Texture。",
				"Texture is the skeleton you were given. Management only changes structure.。",
				"A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.。",
				"A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.。"
			]
		}
	},
	aggregate: {
		"id": "aggregate",
		"relatedSlugs": [
			"tu-rang-tuan-ju-ti",
			"ban-jie",
			"you-ji-zhi"
		],
		"bvid": "BV1184y1z7LV",
		"videoTitle": "土壤板结硬邦邦，怎么办？",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/aggregate.jpg",
			"alt": "团粒结构 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/aggregate-2.jpg",
			"alt": "团粒结构 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "团粒结构",
			"subtitle": "团粒是土粒粘结成的小团，化肥不能立刻捏出来。",
			"summary": "团粒是土粒粘结成的小团，中间有孔隙。单子上有时写团聚体。好土能搓团又易散；干了像面、湿了像浆，是团粒散了，不是质地变了。化肥不能立刻捏出团粒，要靠有机质、根系和少碾。",
			"appearance": "好土能搓团又易散，里面有孔隙。面土干了像面粉，湿了像浆。",
			"conditions": "有机质、根系、菌丝是胶水。旋耕过碎、雨打裸地，团粒就散。",
			"commonCrops": "粮田、菜地、果园都要团粒，旋碎了就面。",
			"fieldCheck": "好土能搓团又易散。干了面、湿了浆，团粒散了，不是质地变了。",
			"longform": ["好土能搓团又易散。干了面、湿了浆，是孔隙封了，不是质地变了。胶水是有机质、根和菌丝。雨点砸裸地，团粒散得最快。别把这当成质地变了，去换沙换黏。"],
			"confuse": [{
				"lookalike": "板结是团粒散了又被压死",
				"difference": "板结是团粒散了又被压死。质地没变，路封了。",
				"photoHint": "面粉土和面包土并排放。"
			}, {
				"lookalike": "干了面湿了浆当缺肥",
				"difference": "团粒散了路封了，不是沙变成了黏。",
				"photoHint": "面粉土和面包土并排放。"
			}],
			"plainExplain": "团粒要靠有机质、根系和菌丝粘结。旋耕过碎、雨打裸地，团粒就散。干了面、湿了浆，是孔隙封了，不是沙变成了黏。",
			"natural": ["有机质、根系、菌丝是胶水。旋耕过碎、雨打裸地，团粒就散。", "雨打裸地、旋耕过碎，团粒就散。"],
			"human": ["雨打裸地还年年旋碎。", "干了面湿了浆还当缺肥。"],
			"steps": [
				"好土能搓团又易散。干了面、湿了浆，团粒散了，不是质地变了。",
				"好土能搓团又易散，里面有孔隙。面土干了像面粉，湿了像浆。",
				"有机质和少碾才能把面包养回来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"雨打裸地还年年旋碎。",
				"干了面湿了浆还当缺肥。",
				"板结是团粒散了又被压死。质地没变，路封了。"
			],
			"whenToTest": "干了面湿了浆，再问团粒，不必先下肥。",
			"prevention": ["少碾、覆盖、适墒才进地。菌剂一季建不起房间。", "雨打裸地还年年旋碎。"],
			"indicators": [{
				"name": "团粒结构",
				"meaning": "团粒是土的团粒结构，不是化肥能立刻捏出来的。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "团粒结构",
			"spoken": [
				"团粒结构。",
				"团粒是土的团粒结构，不是化肥能立刻捏出来的。",
				"好土能搓团又易散，里面有孔隙。",
				"面土干了像面粉，湿了像浆。",
				"好土能搓团又易散。",
				"干了面、湿了浆，团粒散了，不是质地变了。",
				"雨打裸地还年年旋碎。",
				"干了面湿了浆还当缺肥。"
			]
		},
		"en": {
			"title": "Aggregation",
			"subtitle": "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.",
			"summary": "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.",
			"appearance": "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
			"conditions": "OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
			"commonCrops": "Grain, vegetables and orchards all need crumbs.",
			"fieldCheck": "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
			"longform": ["Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet. Organic matter, roots and hyphae are the glue.", "Compaction is crumbs smashed then smeared. Texture did not change; the road closed. Crumbs are soil structure. Fertiliser will not pinch them into being overnight."],
			"confuse": [{
				"lookalike": "Compaction is crumbs smashed then smeare",
				"difference": "Compaction is crumbs smashed then smeared. Texture did not change; the road closed.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Flour-when-dry means hunger",
				"difference": "Crumbs smashed. Texture did not change.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet. Organic matter, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
			"natural": ["OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.", "OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs."],
			"human": ["Bare soil in the rain, then rotavating it to flour.", "Treating soup-when-wet as hunger."],
			"steps": [
				"Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
				"OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
				"Crumbs are soil structure. Fertiliser will not pinch them into being overnight. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Bare soil in the rain, then rotavating it to flour.",
				"Treating soup-when-wet as hunger.",
				"Compaction is crumbs smashed then smeared. Texture did not change; the road closed."
			],
			"whenToTest": "Flour when dry, soup when wet — ask crumbs before you feed.",
			"prevention": ["Stay off wet ground. Cover. A microbe bag will not build a house in one season.", "Bare soil in the rain, then rotavating it to flour."],
			"indicators": [{
				"name": "Aggregation",
				"meaning": "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Crumbs are soil structure.",
				"Fertiliser will not pinch them into being overnight.",
				"Good soil holds and breaks, with pores inside.",
				"Broken structure is flour when dry, soup when wet."
			]
		}
	},
	n: {
		"id": "n",
		"relatedSlugs": [
			"que-dan",
			"huang-ye-jian-bie",
			"yu-mi-miao-huang"
		],
		"bvid": "BV1hV4y1o7NV",
		"videoTitle": "常见作物的缺素症（一）",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/n.jpg",
			"alt": "氮（N） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/n-2.jpg",
			"alt": "氮（N） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "氮（N）",
			"subtitle": "氮是长叶子的养分。词是 N，地里的事看叶位。",
			"summary": "氮是长叶子的养分。词是 N，地里的事看叶位。",
			"appearance": "缺了下部老叶先匀黄，新叶相对还绿。根白才像缺氮。新叶也黄要想别的。",
			"conditions": "氮会搬家。沙土一次倒全年留不住。涝了根吃不到。",
			"commonCrops": "叶菜、玉米、水稻最会写在叶子上。",
			"fieldCheck": "下部老叶匀黄、新叶还绿、根白，才像缺氮。新叶也黄，换一条路。",
			"longform": ["下部老叶匀黄、新叶还绿、根白，才像这个词。新叶也黄，换一条路。氮会搬家，老叶把氮送给新叶。沙土一次倒全年留不住。下部黄叶和顶端新叶一张对照。根白才走这条，新叶也黄就换一篇。你摘下部一片、顶端一片，洗一把根。老叶匀黄、新叶还绿、根白，才走这条。新叶也黄，或者根黑臭，就换一篇，别一黄就追。氮会搬家。老叶把氮送给新叶，所以底下先黄。"],
			"confuse": [{
				"lookalike": "缺硫新叶也黄；缺铁新叶黄脉绿；涝害土湿还蔫",
				"difference": "缺硫新叶也黄；缺铁新叶黄脉绿；涝害土湿还蔫。",
				"photoHint": "下部黄叶和顶端新叶一张对照。"
			}, {
				"lookalike": "新叶也黄当缺氮",
				"difference": "下部老叶匀黄、新叶还绿、根白，才像这个词。",
				"photoHint": "下部黄叶和顶端新叶一张对照。"
			}],
			"plainExplain": "氮是长叶子的养分。词是 N，地里的事看叶位。 氮会搬家。沙土一次倒全年留不住。涝了根吃不到。",
			"natural": ["氮会搬家。沙土一次倒全年留不住。涝了根吃不到。", "氮会搬家。涝了根也吃不到。"],
			"human": ["新叶也黄还当缺氮猛追。", "沙土一次倒全年。"],
			"steps": [
				"下部老叶匀黄、新叶还绿、根白，才像缺氮。新叶也黄，换一条路。",
				"缺了下部老叶先匀黄，新叶相对还绿。根白才像缺氮。新叶也黄要想别的。",
				"根白才少量多次。新叶也黄就换一篇。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"新叶也黄还当缺氮猛追。",
				"沙土一次倒全年。",
				"缺硫新叶也黄；缺铁新叶黄脉绿；涝害土湿还蔫。"
			],
			"whenToTest": "下部老叶匀黄、新叶还绿、根白，才测碱解氮。",
			"prevention": ["沙土分顿。根黑臭时别猛氮。", "新叶也黄还当缺氮猛追。"],
			"indicators": [{
				"name": "氮（N）",
				"meaning": "氮是长叶子的养分。词是 N，地里的事看叶位。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "氮（N）",
			"spoken": [
				"氮（N）。",
				"氮是长叶子的养分。",
				"词是 N，地里的事看叶位。",
				"缺了下部老叶先匀黄，新叶相对还绿。",
				"根白才像缺氮。",
				"新叶也黄要想别的。",
				"下部老叶匀黄、新叶还绿、根白，才像缺氮。",
				"新叶也黄，换一条路。",
				"新叶也黄还当缺氮猛追。",
				"沙土一次倒全年。"
			]
		},
		"en": {
			"title": "Nitrogen (N)",
			"subtitle": "Nitrogen builds leaves. The word is N; the field job is leaf position.",
			"summary": "Nitrogen builds leaves. The word is N; the field job is leaf position.",
			"appearance": "Too little: old leaves yellow first, new leaves greener. White roots fit N. New-leaf yellow is another road.",
			"conditions": "Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it.",
			"commonCrops": "Leafy crops, maize and rice write it on the leaves.",
			"fieldCheck": "Too little: old leaves yellow first, new leaves greener. White roots fit N. New-leaf yellow is another road.",
			"longform": ["Too little: old leaves yellow first, new leaves greener. White roots fit N. New-leaf yellow is another road. Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it Easy to mix up: Sulphur yellows new leaves too; iron yellows new leaves with green veins; waterlog wilts on wet soil Nitrogen builds leaves. The word is N; the field job is leaf position.。"],
			"confuse": [{
				"lookalike": "Sulphur yellows new leaves too; iron yel",
				"difference": "Sulphur yellows new leaves too; iron yellows new leaves with green veins; waterlog wilts on wet soil.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "New-leaf yellow as nitrogen",
				"difference": "Old leaves even yellow, new greener, white roots — then N.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Nitrogen builds leaves. The word is N; the field job is leaf position. Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it.",
			"natural": ["Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it.", "Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it."],
			"human": ["Treating new-leaf yellow as nitrogen.", "One pour on sand for the whole year."],
			"steps": [
				"Too little: old leaves yellow first, new leaves greener. White roots fit N. New-leaf yellow is another road.",
				"Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it.",
				"Nitrogen builds leaves. The word is N; the field job is leaf position. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Treating new-leaf yellow as nitrogen.",
				"One pour on sand for the whole year.",
				"Sulphur yellows new leaves too; iron yellows new leaves with green veins; waterlog wilts on wet soil."
			],
			"whenToTest": "Old leaves even yellow, new greener, white roots — then available N.",
			"prevention": ["Split on sand. Don’t pour N on black stinking roots.", "Treating new-leaf yellow as nitrogen."],
			"indicators": [{
				"name": "Nitrogen (N)",
				"meaning": "Nitrogen builds leaves. The word is N; the field job is leaf position.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Nitrogen (N)。",
				"Nitrogen builds leaves. The word is N;。",
				"the field job is leaf position.。",
				"Too little: old leaves yellow first， new leaves greener. White roots fit N. New-leaf yellow is another road.。",
				"Too little: old leaves yellow first， new leaves greener. White roots fit N. New-leaf yellow is another road.。"
			]
		}
	},
	alkn: {
		"id": "alkn",
		"relatedSlugs": [
			"que-dan",
			"ce-tu-bao-gao",
			"shi-fei-tiao-tu-rang"
		],
		"bvid": "BV14G4y1x79n",
		"videoTitle": "测土配方施肥技术",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/alkn.jpg",
			"alt": "碱解氮 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/alkn-2.jpg",
			"alt": "碱解氮 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "碱解氮",
			"subtitle": "碱解氮说当季能用的那一部分氮，不是处方。",
			"summary": "碱解氮说当季能用的那一部分氮，不是土里全部的氮。单子上常写成碱解氮，单位常见毫克每公斤。过低容易脱肥黄叶，过高容易旺长。要和全氮对着看，这一格不是处方。",
			"appearance": "单子上写碱解氮或水解氮。这是当季能用的氮，不是全氮那一格。单位常见毫克每千克。",
			"conditions": "过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。",
			"commonCrops": "当季要氮的作物都看这一列。",
			"fieldCheck": "老叶匀黄、新叶还绿、根还白，才像氮不够。新叶黄脉绿不是这一格的事。",
			"longform": ["全氮是仓库，碱解氮是当季能用的那一部分。两项对着看，才知道是缺还是被锁。数字低了不是自动下一袋尿素，要和地里老叶匀黄、根色对得上，再打开缺氮那篇。"],
			"confuse": [{
				"lookalike": "全氮高、碱解氮低，说明库在、当年饭不够",
				"difference": "全氮高、碱解氮低，说明库在、当年饭不够。",
				"photoHint": "全氮和碱解氮两列对着圈。"
			}, {
				"lookalike": "全氮高就以为不缺",
				"difference": "这是当季能用的氮，不是仓库全部的氮。两项对着看。",
				"photoHint": "全氮和碱解氮两列对着圈。"
			}],
			"plainExplain": "碱解氮过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。全氮是储量，碱解氮是当季能用的部分，两项对着看。",
			"natural": ["过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。", "库在、当年饭不够，两项要对着看。"],
			"human": ["只看全氮高就以为不缺。", "跨省死套别人的分级。"],
			"steps": [
				"这是当季能用的氮，不是土里全部的氮。两项对着看。",
				"化验单上“现在能用的氮”大概有多少。不是土里全部的氮。",
				"当季能用的氮这一格，不是处方。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把全氮和碱解氮看成同一格。",
				"不要新叶黄脉绿就判缺氮。",
				"根黑臭时不要猛尿素。"
			],
			"whenToTest": "当季黄叶、脱肥，读这一列。全氮高也要对着看。",
			"prevention": ["当季饭和仓库两项对着看，别跨省死套。", "只看全氮高就以为不缺。"],
			"indicators": [{
				"name": "碱解氮",
				"meaning": "碱解氮是当季能用的氮这一格，不是处方。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "碱解氮 / 水解氮 / 有效氮 / 碱解氮 mg/kg",
			"ratioNote": "全氮是仓库，碱解氮是当季能用的氮。两项对着看，才知道是缺还是被锁。",
			"readTable": [{
				"label": "碱解氮 mg/kg（示意）",
				"low": "当季饭不够，老叶易匀黄",
				"mid": "多数粮田够用一季",
				"high": "再猛氮容易旺长倒伏"
			}],
			"spoken": [
				"碱解氮是当季能用的氮，不是全氮。",
				"两项对着看，才知道缺还是被锁。",
				"老叶匀黄、新叶还绿，才像缺氮。",
				"新叶黄脉绿，不要判缺氮。",
				"按本省分级，这里只是对照。",
				"用量去缺氮那篇。"
			]
		},
		"en": {
			"title": "Available N",
			"subtitle": "Available nitrogen on the sheet is this season’s supply, not a prescription.",
			"summary": "Available nitrogen on the sheet is this season’s supply, not a prescription.",
			"appearance": "Alkaline-hydrolysable or available nitrogen. This season’s N, not total N. Often mg/kg.",
			"conditions": "Too low, yellowing; too high, lodging. Use local ranges.",
			"commonCrops": "Any crop hungry for nitrogen this season reads this column.",
			"fieldCheck": "Old leaves evenly yellow, new leaves still greener, roots still white — that is the nitrogen look. New leaves yellow with green veins is not this cell.",
			"longform": ["Too low: yellow old leaves. Too high: lush lodging. Use the provincial class. This table is a sketch.", "Don’t chase urea at the first yellow. Split leaf position and the root. Rates live in the nitrogen guide."],
			"confuse": [{
				"lookalike": "High total N with low available N means ",
				"difference": "High total N with low available N means a warehouse and an empty plate this season.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "High total N means no lack",
				"difference": "This is this this season’s available nitrogen, not the warehouse.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available nitrogen on the sheet is this season’s supply, not a prescription. Too low, yellowing; too high, lodging. Use local ranges.",
			"natural": ["Too low, yellowing; too high, lodging. Use local ranges.", "Too low, yellowing; too high, lodging. Use local ranges."],
			"human": ["High total N, so you skip this this season’s available nitrogen.", "Pasting another province’s table on your field."],
			"steps": [
				"A rough “N the crop can use this season”. Not total nitrogen.",
				"Too low, yellowing; too high, lodging. Use local ranges.",
				"Available nitrogen on the sheet is this season’s supply, not a prescription. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t mix total N with this cell.",
				"Don’t call iron-lock a nitrogen gap.",
				"Don’t pour urea on black smelly roots."
			],
			"whenToTest": "This-season yellowing. Read it against total N.",
			"prevention": ["Read this this season’s available nitrogen against the warehouse. Don’t paste another province’s table.", "High total N, so you skip this this season’s available nitrogen."],
			"indicators": [{
				"name": "Available N",
				"meaning": "Available nitrogen on the sheet is this season’s supply, not a prescription.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"aka": "alkaline-hydrolysable N, available N, hydrolysable nitrogen",
			"ratioNote": "Total N is the warehouse. This cell is this season’s meal. Read them together.",
			"readTable": [{
				"label": "Available N mg/kg (sketch)",
				"low": "This season’s meal is short",
				"mid": "Enough for many grain fields",
				"high": "More N often lodges"
			}],
			"spoken": [
				"This cell is this season’s nitrogen, not total N.",
				"Read it next to total N.",
				"Old leaves yellow, new leaves greener — that is the N look.",
				"New leaves yellow with green veins is not nitrogen.",
				"Rates live in the nitrogen guide."
			]
		}
	},
	p: {
		"id": "p",
		"relatedSlugs": [
			"que-lin",
			"suan-tu-shi-lin",
			"que-xin-yu-lin"
		],
		"bvid": "BV1jvtK6DE43",
		"videoTitle": "植物营养缺乏识别基本指南",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/p.jpg",
			"alt": "磷（P） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/p-2.jpg",
			"alt": "磷（P） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "磷（P）",
			"subtitle": "磷管生根和开花。词是 P，地里先看紫苗和 pH。",
			"summary": "磷管生根和开花。词是 P，地里先看紫苗和 pH。",
			"appearance": "缺了苗紫红发僵、根短少。回暖仍不发棵。",
			"conditions": "酸土被铁铝钉住，钙质土被钙钉住。土里有磷，根摸不着。",
			"commonCrops": "苗期、豆科、果树花芽都靠磷。",
			"fieldCheck": "苗紫发僵、根短少。回暖还不发棵，先问磷是不是被钉死。",
			"longform": ["苗紫发僵、根短少，回暖还不发棵。土里有磷根摸不着，先问酸碱。酸土或钙质土容易把磷钉死。缺氮是匀黄，缺磷是暗绿带紫。紫苗和白根对照。回暖还不发棵，先问是不是被钉死。你拔一棵紫苗看根：短得像剪过，回暖还不发棵。缺氮是匀黄，这条是暗绿带紫。先问酸碱，别只猛撒粉。紫苗发僵别当氮不够。回暖还不发棵，先问磷是不是被钉死。高磷还会把门堵住让锌进不来。"],
			"confuse": [{
				"lookalike": "缺氮是匀黄，缺磷是暗绿带紫",
				"difference": "缺氮是匀黄，缺磷是暗绿带紫。高磷还会把门堵住让锌进不来。",
				"photoHint": "紫苗和白根对照。"
			}, {
				"lookalike": "苗紫了只追氮",
				"difference": "缺磷是暗绿带紫、根短少。先问酸碱有没有把磷钉死。",
				"photoHint": "紫苗和白根对照。"
			}],
			"plainExplain": "磷管生根和开花。词是 P，地里先看紫苗和 pH。 酸土被铁铝钉住，钙质土被钙钉住。土里有磷，根摸不着。",
			"natural": ["酸土被铁铝钉住，钙质土被钙钉住。土里有磷，根摸不着。", "酸土铁铝钉磷，钙质土钙钉磷。"],
			"human": ["酸土里猛撒磷粉，根还是摸不着。", "苗紫了只追氮。"],
			"steps": [
				"苗紫发僵、根短少。回暖还不发棵，先问磷是不是被钉死。",
				"缺了苗紫红发僵、根短少。回暖仍不发棵。",
				"先问酸碱，再条施。土里有磷根摸不着。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"酸土里猛撒磷粉，根还是摸不着。",
				"苗紫了只追氮。",
				"缺氮是匀黄，缺磷是暗绿带紫。高磷还会把门堵住让锌进不来。"
			],
			"whenToTest": "苗紫发僵、回暖不发棵，测有效磷和酸碱。",
			"prevention": ["磷肥条施在根旁。酸碱不对先开锁。", "酸土里猛撒磷粉，根还是摸不着。"],
			"indicators": [{
				"name": "磷（P）",
				"meaning": "磷管生根和开花。词是 P，地里先看紫苗和 pH。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "磷（P）",
			"spoken": [
				"磷（P）。",
				"磷管生根和开花。",
				"词是 P，地里先看紫苗和 pH。",
				"缺了苗紫红发僵、根短少。",
				"回暖仍不发棵。",
				"苗紫发僵、根短少。",
				"回暖还不发棵，先问磷是不是被钉死。",
				"酸土里猛撒磷粉，根还是摸不着。",
				"苗紫了只追氮。"
			]
		},
		"en": {
			"title": "Phosphorus (P)",
			"subtitle": "Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH.",
			"summary": "Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH.",
			"appearance": "Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.",
			"conditions": "Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it.",
			"commonCrops": "Seedlings, legumes and fruit buds lean on phosphorus.",
			"fieldCheck": "Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.",
			"longform": ["Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them. Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it Easy to mix up: N is even yellow; P is dark green with purple. High P also blocks zinc Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH.。"],
			"confuse": [{
				"lookalike": "N is even yellow; P is dark green with p",
				"difference": "N is even yellow; P is dark green with purple. High P also blocks zinc.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Purple seedlings need more N",
				"difference": "P is dark green with purple and short roots. Ask pH.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH. Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it.",
			"natural": ["Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it.", "Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it."],
			"human": ["Dumping phosphate on acid soil the root cannot touch.", "Purple seedlings chased with nitrogen."],
			"steps": [
				"Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.",
				"Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it.",
				"Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Dumping phosphate on acid soil the root cannot touch.",
				"Purple seedlings chased with nitrogen.",
				"N is even yellow; P is dark green with purple. High P also blocks zinc."
			],
			"whenToTest": "Purple stall that warmth does not restart: available P and pH.",
			"prevention": ["Band P by the root. Open the pH lock first.", "Dumping phosphate on acid soil the root cannot touch."],
			"indicators": [{
				"name": "Phosphorus (P)",
				"meaning": "Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Phosphorus (P)。",
				"Phosphorus is roots and flowering. The word is P;。",
				"the field job is purple seedlings and pH.。",
				"Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.。",
				"Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.。"
			]
		}
	},
	avp: {
		"id": "avp",
		"relatedSlugs": [
			"que-lin",
			"suan-tu-shi-lin",
			"ce-tu-bao-gao"
		],
		"bvid": "BV1MK4y1X7AS",
		"videoTitle": "测土配方精准施肥",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/avp.jpg",
			"alt": "有效磷 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/avp-2.jpg",
			"alt": "有效磷 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效磷",
			"subtitle": "有效磷是根能碰到的磷，不是袋子上的纯度。",
			"summary": "有效磷是根能碰到的磷，不是袋子上的纯度。",
			"appearance": "报告上根能吃到的那部分磷。全磷高、有效磷低，常见于过酸或石灰性土。",
			"conditions": "先改 pH 和集中施肥，不要只猛撒磷肥。",
			"commonCrops": "根能碰到的磷。苗僵发紫先看它。",
			"fieldCheck": "根能碰到的磷。全磷高、这项低，常见于过酸或石灰性土。",
			"longform": ["根能碰到的磷，不是袋子上的纯度。全磷高、这项低，常见于过酸或石灰性土。先改酸碱和集中施肥，不要只猛撒磷粉。全磷和有效磷两列对着圈。这项低、全磷高，常见于过酸或石灰性土。你把全磷和这一列并排。全磷高、这项低，磷多半被钉死了。先改酸碱、肥条施在根旁，不要只往地里扬粉。根摸得着才算数。全磷高当不了当季的饭。过酸或石灰性土最爱把磷钉死。"],
			"confuse": [{
				"lookalike": "有效磷不是全磷",
				"difference": "有效磷不是全磷。两项对着看才知道是缺还是被锁。",
				"photoHint": "全磷和有效磷两列对着圈。"
			}, {
				"lookalike": "全磷高就不再问有效磷",
				"difference": "根能碰到的磷才算。全磷高、这项低，常见于过酸或石灰性土。",
				"photoHint": "全磷和有效磷两列对着圈。"
			}],
			"plainExplain": "有效磷是根能碰到的磷，不是袋子上的纯度。 先改 pH 和集中施肥，不要只猛撒磷肥。",
			"natural": ["先改 pH 和集中施肥，不要只猛撒磷肥。", "全磷高、这项低，常见于过酸或石灰性土。"],
			"human": ["全磷高就不再问有效磷。", "不改 pH 只加磷。"],
			"steps": [
				"根能碰到的磷。全磷高、这项低，常见于过酸或石灰性土。",
				"报告上根能吃到的那部分磷。全磷高、有效磷低，常见于过酸或石灰性土。",
				"先改酸碱和集中施肥，不要只猛撒磷粉。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"全磷高就不再问有效磷。",
				"不改 pH 只加磷。",
				"有效磷不是全磷。两项对着看才知道是缺还是被锁。"
			],
			"whenToTest": "全磷高、这项低，先改酸碱再谈补磷。",
			"prevention": ["全磷高别再猛磷。先改酸碱。", "全磷高就不再问有效磷。"],
			"indicators": [{
				"name": "有效磷",
				"meaning": "有效磷是根能碰到的磷，不是袋子上的纯度。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效磷",
			"spoken": [
				"有效磷。",
				"有效磷是根能碰到的磷，不是袋子上的纯度。",
				"报告上根能吃到的那部分磷。",
				"全磷高、有效磷低，常见于过酸或石灰性土。",
				"根能碰到的磷。",
				"全磷高、这项低，常见于过酸或石灰性土。",
				"全磷高就不再问有效磷。",
				"不改 pH 只加磷。"
			]
		},
		"en": {
			"title": "Available P",
			"subtitle": "Available P is what the root meets, not the purity on a bag.",
			"summary": "Available P is what the root meets, not the purity on a bag.",
			"appearance": "The P column the root can actually use. High total, low available: acid or lime soils.",
			"conditions": "Fix pH and band it. Don’t only dump more powder.",
			"commonCrops": "The P the root can touch. Purple stall starts here.",
			"fieldCheck": "The P column the root can actually use. High total, low available: acid or lime soils.",
			"longform": ["The P column the root can actually use. High total, low available: acid or lime soils. Fix pH and band it. Don’t only dump more powder Easy to mix up: Available P is not total P. Read both to see lack versus lock Available P is what the root meets, not the purity on a bag.。"],
			"confuse": [{
				"lookalike": "Available P is not total P",
				"difference": "Available P is not total P. Read both to see lack versus lock.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "High total P, skip available P",
				"difference": "The root has to touch it. Acid or lime soils pin it.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available P is what the root meets, not the purity on a bag. Fix pH and band it. Don’t only dump more powder.",
			"natural": ["Fix pH and band it. Don’t only dump more powder.", "Fix pH and band it. Don’t only dump more powder."],
			"human": ["High total P, so you never ask available P.", "Adding powder without opening the pH lock."],
			"steps": [
				"The P column the root can actually use. High total, low available: acid or lime soils.",
				"Fix pH and band it. Don’t only dump more powder.",
				"Available P is what the root meets, not the purity on a bag. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"High total P, so you never ask available P.",
				"Adding powder without opening the pH lock.",
				"Available P is not total P. Read both to see lack versus lock."
			],
			"whenToTest": "High total, low available: fix pH before more powder.",
			"prevention": ["High total P: stop dumping powder. Fix pH.", "High total P, so you never ask available P."],
			"indicators": [{
				"name": "Available P",
				"meaning": "Available P is what the root meets, not the purity on a bag.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available P。",
				"Available P is what the root meets, not the purity on a bag.。",
				"The P column the root can actually use. High total, low available: acid or lime soils.。",
				"The P column the root can actually use. High total, low available: acid or lime soils.。"
			]
		}
	},
	k: {
		"id": "k",
		"relatedSlugs": [
			"que-jia",
			"han-yan-jian-bie",
			"jie-gan-huan-tian"
		],
		"bvid": "BV1aV4y1o7r9",
		"videoTitle": "常见作物的缺素症（二）",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/k.jpg",
			"alt": "钾（K） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/k-2.jpg",
			"alt": "钾（K） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "钾（K）",
			"subtitle": "钾管水分和品质。词是 K，地里先把焦边和白霜分开。",
			"summary": "钾管水分和品质。词是 K，地里先把焦边和白霜分开。",
			"appearance": "缺了老叶叶缘焦枯像火燎。土面不一定白。盐害也焦边，但常有白霜。",
			"conditions": "高产田带走钾很多。秸秆还田能还钾。忌氯作物宜用硫酸钾。",
			"commonCrops": "薯类、果树、高产粮田对钾更敏感。",
			"fieldCheck": "老叶外边焦，土面不一定白。白霜加焦边先想盐。",
			"longform": ["老叶外边焦，土面不一定白。白霜加焦边先往盐上想，只焦边才更像钾。钾管气孔和糖分。秸秆还田能还一点钾。焦边叶子和土面有没有白霜。有霜先想盐，只焦边才更像钾。你看老叶外边焦，再看土面有没有白霜。有霜先想盐，只焦边、土不白，才更像钾。秸秆年年拉走的地，这条账更容易亏。灌浆期叶边先焦。你把焦边叶子和土面拍一张对照。中午别喷浓钾，叶更伤。"],
			"confuse": [{
				"lookalike": "盐害、氯害、旱害都会焦边",
				"difference": "盐害、氯害、旱害都会焦边。先看土面和根，再谈钾。",
				"photoHint": "焦边叶子和土面有没有白霜。"
			}, {
				"lookalike": "见焦边一律补钾",
				"difference": "土面不一定白。白霜加焦边先往盐上想。",
				"photoHint": "焦边叶子和土面有没有白霜。"
			}],
			"plainExplain": "钾管水分和品质。词是 K，地里先把焦边和白霜分开。 高产田带走钾很多。秸秆还田能还钾。忌氯作物宜用硫酸钾。",
			"natural": ["高产田带走钾很多。秸秆还田能还钾。忌氯作物宜用硫酸钾。", "盐害也焦边，但常带着白霜。"],
			"human": ["见焦边就当盐，土面其实不白。", "秸秆拿走还怪土没钾。"],
			"steps": [
				"老叶外边焦，土面不一定白。白霜加焦边先想盐。",
				"缺了老叶叶缘焦枯像火燎。土面不一定白。盐害也焦边，但常有白霜。",
				"焦边先分盐。秸秆能还就还。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"见焦边就当盐，土面其实不白。",
				"秸秆拿走还怪土没钾。",
				"盐害、氯害、旱害都会焦边。先看土面和根，再谈钾。"
			],
			"whenToTest": "老叶焦边、土面不一定白，测速效钾也看盐。",
			"prevention": ["秸秆能还就还。焦边先分盐。", "见焦边就当盐，土面其实不白。"],
			"indicators": [{
				"name": "钾（K）",
				"meaning": "钾管水分和品质。词是 K，地里先把焦边和白霜分开。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "钾（K）",
			"spoken": [
				"钾（K）。",
				"钾管水分和品质。",
				"词是 K，地里先把焦边和白霜分开。",
				"缺了老叶叶缘焦枯像火燎。",
				"土面不一定白。",
				"盐害也焦边，但常有白霜。",
				"老叶外边焦，土面不一定白。",
				"白霜加焦边先想盐。",
				"见焦边就当盐，土面其实不白。",
				"秸秆拿走还怪土没钾。"
			]
		},
		"en": {
			"title": "Potassium (K)",
			"subtitle": "Potassium runs water use and quality. The word is K; split scorch from white crust first.",
			"summary": "Potassium runs water use and quality. The word is K; split scorch from white crust first.",
			"appearance": "Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too, usually with frost.",
			"conditions": "High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash.",
			"commonCrops": "Potatoes, fruit and high-yield grain feel K first.",
			"fieldCheck": "Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too, usually with frost.",
			"longform": ["Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too, usually with frost. High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash Easy to mix up: Salt, chloride and drought all scorch margins. Read the surface and the root before you say K Potassium runs water use and quality. The word is K; split scorch from white crust first.。"],
			"confuse": [{
				"lookalike": "Salt, chloride and drought all scorch ma",
				"difference": "Salt, chloride and drought all scorch margins. Read the surface and the root before you say K.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Every scorch is potassium",
				"difference": "If there is white frost, think salt first.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Potassium runs water use and quality. The word is K; split scorch from white crust first. High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash.",
			"natural": ["High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash.", "High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash."],
			"human": ["Scorch treated as salt when the surface is not white.", "Straw hauled off, then blaming the soil for no K."],
			"steps": [
				"Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too, usually with frost.",
				"High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash.",
				"Potassium runs water use and quality. The word is K; split scorch from white crust first. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Scorch treated as salt when the surface is not white.",
				"Straw hauled off, then blaming the soil for no K.",
				"Salt, chloride and drought all scorch margins. Read the surface and the root before you say K."
			],
			"whenToTest": "Margin scorch without frost: available K, and salt.",
			"prevention": ["Return straw. Split scorch from salt.", "Scorch treated as salt when the surface is not white."],
			"indicators": [{
				"name": "Potassium (K)",
				"meaning": "Potassium runs water use and quality. The word is K; split scorch from white crust first.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Potassium (K)。",
				"Potassium runs water use and quality. The word is K;。",
				"split scorch from white crust first.。",
				"Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too。",
				" usually with frost.。",
				"Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too。",
				" usually with frost.。"
			]
		}
	},
	avk: {
		"id": "avk",
		"relatedSlugs": [
			"que-jia",
			"ce-tu-bao-gao",
			"sha-tu-lou-fei"
		],
		"bvid": "BV15z4y1Y7fx",
		"videoTitle": "秸秆还田的方法",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/avk.jpg",
			"alt": "速效钾 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/avk-2.jpg",
			"alt": "速效钾 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "速效钾",
			"subtitle": "速效钾是当季钾饭，不是岩石里的钾。",
			"summary": "速效钾是当季钾饭，不是岩石里的钾。",
			"appearance": "当季能用的钾。沙土、高产、拿走秸秆的地容易低。",
			"conditions": "叶缘焦不一定只是缺钾。看速效钾，也看盐。",
			"commonCrops": "当季钾。秸秆拿走的地更容易低。",
			"fieldCheck": "当季钾。沙土、秸秆拿走容易低。焦边也看盐。",
			"longform": ["当季钾饭。沙土、高产、秸秆拿走，这项容易低。焦边也看盐。叶缘焦不一定只是缺钾，盐害也焦边，常带着白霜。当季钾这一列圈出来。沙土、秸秆拿走容易低，焦边也看盐。你把当季钾这一列圈出来。沙土、高产、秸秆拿走，容易低。焦边叶子旁边要是有白霜，别只当缺钾补。秸秆还田能还一点钾。年年拉走，账只会越亏。焦边不一定只是缺钾，也看盐。"],
			"confuse": [{
				"lookalike": "全钾高、速效钾低，库在、当年不够",
				"difference": "全钾高、速效钾低，库在、当年不够。",
				"photoHint": "焦边和盐霜分开放。"
			}, {
				"lookalike": "焦边不问盐",
				"difference": "当季钾。沙土、秸秆拿走更容易低，焦边也看盐。",
				"photoHint": "焦边和盐霜分开放。"
			}],
			"plainExplain": "速效钾是当季钾饭，不是岩石里的钾。 叶缘焦不一定只是缺钾。看速效钾，也看盐。",
			"natural": ["叶缘焦不一定只是缺钾。看速效钾，也看盐。", "沙土、高产、秸秆拿走，这项容易低。"],
			"human": ["焦边一律补钾，不问盐。", "高产田不还秸秆。"],
			"steps": [
				"当季钾。沙土、秸秆拿走容易低。焦边也看盐。",
				"当季能用的钾。沙土、高产、拿走秸秆的地容易低。",
				"焦边也看盐。沙土按下限。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"焦边一律补钾，不问盐。",
				"高产田不还秸秆。",
				"全钾高、速效钾低，库在、当年不够。"
			],
			"whenToTest": "焦边先分盐。沙土、秸秆拿走更容易低。",
			"prevention": ["高产田不还秸秆，这项容易空。", "焦边一律补钾，不问盐。"],
			"indicators": [{
				"name": "速效钾",
				"meaning": "速效钾是当季钾饭，不是岩石里的钾。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "速效钾",
			"spoken": [
				"速效钾。",
				"速效钾是当季钾饭，不是岩石里的钾。",
				"当季能用的钾。",
				"沙土、高产、拿走秸秆的地容易低。",
				"当季钾。",
				"沙土、秸秆拿走容易低。",
				"焦边也看盐。",
				"焦边一律补钾，不问盐。",
				"高产田不还秸秆。"
			]
		},
		"en": {
			"title": "Available K",
			"subtitle": "Available K is this this season’s available nitrogen, not potassium in the rock.",
			"summary": "Available K is this this season’s available nitrogen, not potassium in the rock.",
			"appearance": "K the crop can use this season. Sand, high yield, straw removed — often low.",
			"conditions": "Margin scorch is not only K. Read available K, and salt.",
			"commonCrops": "This season’s K. Straw hauled off runs low.",
			"fieldCheck": "K the crop can use this season. Sand, high yield, straw removed — often low.",
			"longform": ["K the crop can use this season. Sand, high yield, straw removed — often low. Margin scorch is not only K. Read available K, and salt Easy to mix up: High total K, low available K: warehouse full, plate empty Available K is this this season’s available nitrogen, not potassium in the rock.。"],
			"confuse": [{
				"lookalike": "High total K, low available K: warehouse",
				"difference": "High total K, low available K: warehouse full, plate empty.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Scorch, so pour K",
				"difference": "Sand and straw hauled off run low. Salt scorches too.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available K is this this season’s available nitrogen, not potassium in the rock. Margin scorch is not only K. Read available K, and salt.",
			"natural": ["Margin scorch is not only K. Read available K, and salt.", "Margin scorch is not only K. Read available K, and salt."],
			"human": ["Every scorch gets potassium, salt unasked.", "High-yield fields that never return straw."],
			"steps": [
				"K the crop can use this season. Sand, high yield, straw removed — often low.",
				"Margin scorch is not only K. Read available K, and salt.",
				"Available K is this this season’s available nitrogen, not potassium in the rock. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Every scorch gets potassium, salt unasked.",
				"High-yield fields that never return straw.",
				"High total K, low available K: warehouse full, plate empty."
			],
			"whenToTest": "Scorch plus straw hauled off — this column.",
			"prevention": ["High-yield fields that haul straw off run this column down.", "Every scorch gets potassium, salt unasked."],
			"indicators": [{
				"name": "Available K",
				"meaning": "Available K is this this season’s available nitrogen, not potassium in the rock.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available K。",
				"Available K is this this season’s available nitrogen, not potassium in the rock.。",
				"K the crop can use this season. Sand, high yield, straw removed — often low.。",
				"K the crop can use this season. Sand, high yield, straw removed — often low.。"
			]
		}
	},
	ca: {
		"id": "ca",
		"relatedSlugs": [
			"que-gai",
			"suan-yu-que-gai",
			"hua-sheng-kong-jia"
		],
		"bvid": "BV1YT411b7bA",
		"videoTitle": "缺硼缺钙容易落花落果 裂果",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/ca.jpg",
			"alt": "交换性钙 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/ca-2.jpg",
			"alt": "交换性钙 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性钙",
			"subtitle": "交换性钙说土能交出来给根用的钙。叶面钙只救急。",
			"summary": "交换性钙说土能交出来给根用的钙。单子上常写成交换性钙。低了生长点容易饿着，叶面喷钙只救急。钙在土里几乎不搬家，干旱、盐、铵态氮、过酸都会让尖上缺钙。",
			"appearance": "缺钙走顶芽、脐腐、裂果、心叶焦。老叶相对还好。土里有钙也会吃不到。",
			"conditions": "钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。",
			"commonCrops": "番茄、花生、大白菜心叶最会写出来。",
			"fieldCheck": "顶芽、脐部、心叶先出事，老叶还好。水忽干忽湿更明显。",
			"longform": ["交换性钙是土能交出来的那一部分。叶面喷钙只能救急。钙在土里几乎不搬家，所以果针、顶芽、脐部更容易先缺。先问墒和铵态氮，再打开缺钙那篇，不要只补叶面。"],
			"confuse": [{
				"lookalike": "病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不",
				"difference": "病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不稳更明显。",
				"photoHint": "脐腐果和还绿的老叶对照。"
			}, {
				"lookalike": "脐腐了只打药",
				"difference": "老叶还好、心叶先出事。这几天水稳不稳，比袋子要紧。",
				"photoHint": "脐腐果和还绿的老叶对照。"
			}],
			"plainExplain": "钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。叶面钙只挡住这一茬的脸，土里钙走不到尖还要问水和铵态氮。",
			"natural": ["钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。", "干旱、盐、铵态氮都会让生长点吃不到。"],
			"human": ["脐腐了只打药，不问水稳不稳。", "干旱时猛冲铵态氮。"],
			"steps": [
				"顶芽、脐部、心叶先出事，老叶还好。水忽干忽湿更明显。",
				"缺钙走顶芽、脐腐、裂果、心叶焦。老叶相对还好。土里有钙也会吃不到。",
				"先把水浇稳。叶面钙救急，改土才是正道。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"脐腐了只打药，不问水稳不稳。",
				"干旱时猛冲铵态氮。",
				"病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不稳更明显。"
			],
			"whenToTest": "脐腐、心叶焦、水忽干忽湿，测交换性钙和酸碱。",
			"prevention": ["浇水要稳。缺钙时别猛冲铵态氮。", "脐腐了只打药，不问水稳不稳。"],
			"indicators": [{
				"name": "交换性钙",
				"meaning": "交换性钙是土能交出的能交换出来的钙。叶面钙只救急。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "交换性钙",
			"spoken": [
				"交换性钙。",
				"交换性钙是土能交出的能交换出来的钙。",
				"叶面钙只救急。",
				"缺钙走顶芽、脐腐、裂果、心叶焦。",
				"老叶相对还好。",
				"土里有钙也会吃不到。",
				"顶芽、脐部、心叶先出事，老叶还好。",
				"水忽干忽湿更明显。",
				"脐腐了只打药，不问水稳不稳。",
				"干旱时猛冲铵态氮。"
			]
		},
		"en": {
			"title": "Exchangeable Ca",
			"subtitle": "Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue.",
			"summary": "Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue.",
			"appearance": "Ca lack hits the tip, blossom-end rot, split fruit, scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.",
			"conditions": "Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip.",
			"commonCrops": "Tomato, peanut and cabbage hearts write it clearly.",
			"fieldCheck": "Ca lack hits the tip, blossom-end rot, split fruit, scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.",
			"longform": ["Ca lack hits the tip, blossom-end rot, split fruit, scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees. Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip Easy to mix up: Pathogen rot goes deep; Ca lack starts at the tip or blossom end and tracks wet–dry swings Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue.。"],
			"confuse": [{
				"lookalike": "Pathogen rot goes deep; Ca lack starts a",
				"difference": "Pathogen rot goes deep; Ca lack starts at the tip or blossom end and tracks wet–dry swings.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Blossom-end rot is a spray job",
				"difference": "Steady water. Soil calcium still matters on acid ground.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue. Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip.",
			"natural": ["Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip.", "Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip."],
			"human": ["Spraying blossom-end rot as a disease.", "Ammonium-N poured onto dry swings."],
			"steps": [
				"Ca lack hits the tip, blossom-end rot, split fruit, scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.",
				"Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip.",
				"Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Spraying blossom-end rot as a disease.",
				"Ammonium-N poured onto dry swings.",
				"Pathogen rot goes deep; Ca lack starts at the tip or blossom end and tracks wet–dry swings."
			],
			"whenToTest": "Blossom-end rot, swinging water: exchangeable Ca and pH.",
			"prevention": ["Steady water. Don’t chase calcium lack with ammonium-N.", "Spraying blossom-end rot as a disease."],
			"indicators": [{
				"name": "Exchangeable Ca",
				"meaning": "Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Exchangeable Ca。",
				"Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue.。",
				"Ca lack hits the tip， blossom-end rot， split fruit。",
				" scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.。",
				"Ca lack hits the tip， blossom-end rot， split fruit。",
				" scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.。"
			]
		}
	},
	al: {
		"id": "al",
		"relatedSlugs": [
			"lv-du-shang-gen",
			"suan-hua",
			"hong-huang-rang-gai-suan"
		],
		"bvid": "BV1G2cJeTELe",
		"videoTitle": "酸性土壤条件下水稻铝毒",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/al.jpg",
			"alt": "交换性铝 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/al-2.jpg",
			"alt": "交换性铝 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性铝",
			"subtitle": "交换性铝在强酸土里会伤根尖，治本是改酸。",
			"summary": "交换性铝说土里活性铝有多少。pH 低了它才活跃，专伤根尖，洗出来褐秃、侧根很少。治本是把耕层 pH 抬过伤根的门槛，粮田大约低于 5.5 才谈改酸，不是再追氮。茶园耐酸，不要用粮田目标去改茶。这条不给袋数。",
			"appearance": "单子上写交换性铝、活性铝。常和偏低的 pH 一起出现。地里对得上根尖褐秃。",
			"conditions": "南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。",
			"commonCrops": "红黄壤、酸茶园、南方粮田先认它。",
			"fieldCheck": "洗根看尖：褐秃少白尖。pH 低了铝才溶出来伤根。",
			"longform": ["交换性铝说土里活性铝有多少。pH 低了它才活跃，专伤根尖，洗出来褐秃、侧根很少。治本是把耕层 pH 抬过伤根的门槛，粮田大约低于 5.5 才谈改酸，不是再追氮。茶园耐酸，不要用粮田目标去改茶。这条不给袋数。", "铝伤的是根尖。先改酸让新嘴长出来，再薄肥。不要在秃根上猛尿素。用量去农业知识，按测土和当地农技站。"],
			"confuse": [{
				"lookalike": "缺肥根还在、只是细；铝毒是根尖伤掉",
				"difference": "缺肥根还在、只是细；铝毒是根尖伤掉。先洗根再谈肥。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}, {
				"lookalike": "根秃了还猛尿素",
				"difference": "pH 低了铝才溶出来伤根。改酸是治本。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}],
			"plainExplain": "铝伤的是根尖。先改酸让新嘴长出来，再薄肥。不要在秃根上猛尿素。",
			"natural": ["南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。", "pH 低于大约五点五，铝才活跃。"],
			"human": ["根秃了还猛尿素。", "没测 pH 就按听说撒灰。"],
			"steps": [
				"洗根看尖：褐秃少白尖。pH 低了铝才溶出来伤根。",
				"pH 低于大约 5.5，铝溶出来伤根尖：褐、秃、少白尖。地上才发僵。",
				"改酸是治本。根秃了还追氮，嘴越伤越深。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"根秃了还猛尿素。",
				"没测 pH 就按听说撒灰。",
				"缺肥根还在、只是细；铝毒是根尖伤掉。先洗根再谈肥。"
			],
			"whenToTest": "根尖褐秃、锈水、苗僵，测酸碱和交换性铝。",
			"prevention": ["有机质能络合一部分铝。根秃时别猛氮。", "根秃了还猛尿素。"],
			"indicators": [{
				"name": "交换性铝",
				"meaning": "交换性铝在强酸土里会伤根尖。治本是改酸，不是再追氮。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "交换性铝",
			"spoken": [
				"交换性铝。",
				"交换性铝在强酸土里会伤根尖。",
				"治本是改酸，不是再追氮。",
				"pH 低于大约 5.5，铝溶出来伤根尖：褐、秃、少白尖。",
				"地上才发僵。",
				"洗根看尖：褐秃少白尖。",
				"pH 低了铝才溶出来伤根。",
				"根秃了还猛尿素。",
				"没测 pH 就按听说撒灰。"
			]
		},
		"en": {
			"title": "Exchangeable Al",
			"subtitle": "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more nitrogen.",
			"summary": "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls. Fix the acid, don’t chase nitrogen.",
			"appearance": "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the shoot stalls.",
			"conditions": "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
			"commonCrops": "Red-yellow earth, acid tea, southern grain.",
			"fieldCheck": "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls.",
			"longform": ["Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls. Southern red-yellow earth, tea, and ammonium-N grain fields show it.", "Hunger keeps a root, just thin; aluminium injures the tip. Wash roots before you add fertiliser. The job is lime and organic matter, not more nitrogen. Tea likes acid, not ever-more-acid."],
			"confuse": [{
				"lookalike": "Hunger keeps a root, just thin; aluminiu",
				"difference": "Hunger keeps a root, just thin; aluminium injures the tip. Wash roots before you add fertiliser.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Bald roots need urea",
				"difference": "Aluminium bites when pH is low. Lime is the job.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more nitrogen. Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
			"natural": ["Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.", "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid."],
			"human": ["Urea on bald roots.", "Liming by hearsay without a pH."],
			"steps": [
				"Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls.",
				"Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
				"Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more N. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Urea on bald roots.",
				"Liming by hearsay without a pH.",
				"Hunger keeps a root, just thin; aluminium injures the tip. Wash roots before you add fertiliser."
			],
			"whenToTest": "Brown bald tips, rusty water: pH and exchangeable Al.",
			"prevention": ["Organic matter can bind some aluminium. Don’t pour N on bald roots.", "Urea on bald roots."],
			"indicators": [{
				"name": "Exchangeable Al",
				"meaning": "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more N.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Exchangeable aluminium is the toxic ion in very acid soil.",
				"Below about pH 5.5 it dissolves and injures root tips.",
				"Brown, bald tips with few white points, then the top stalls.",
				"The job is lime and organic matter, not more nitrogen."
			]
		}
	},
	zn: {
		"id": "zn",
		"relatedSlugs": [
			"que-xin",
			"que-xin-yu-lin",
			"yu-mi-miao-huang"
		],
		"bvid": "BV1uCedeDEFn",
		"videoTitle": "植物缺锌症状与锌肥补充",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/zn.jpg",
			"alt": "有效锌 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/zn-2.jpg",
			"alt": "有效锌 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效锌",
			"subtitle": "有效锌是用量很小的门。土施按年计，不要年年猛倒。",
			"summary": "有效锌是用量很小的门。土施按年计，不要年年猛倒。",
			"appearance": "缺锌走新叶：脉间失绿、节间短、小叶簇生，玉米花白苗最典型。",
			"conditions": "高 pH、高磷会把门堵住。石灰性土更常见。",
			"commonCrops": "玉米花白苗、果树小叶最典型。",
			"fieldCheck": "新叶挤、节间短、玉米花白苗。老叶匀黄不是它。",
			"longform": ["新叶挤、节间短、玉米花白苗。老叶匀黄不是它。磷很高会把门堵住。走的是新叶。高酸碱、高磷更常见。玉米花白苗节间短特写。老叶匀黄不是它，磷很高会把门堵住。你量一量节间，看新叶挤不挤、玉米花白不白。磷列要是很高，门堵住了，锌进不来。三到五叶那一阵花白最显。你别把花白苗和老叶匀黄混成一袋肥。高酸碱、高磷，锌都进不来。"],
			"confuse": [{
				"lookalike": "缺铁也是新叶黄脉绿，但不是花白苗那种缩节",
				"difference": "缺铁也是新叶黄脉绿，但不是花白苗那种缩节。药害来得快还扭曲。",
				"photoHint": "花白苗和新叶簇生特写。"
			}, {
				"lookalike": "花白苗当缺氮",
				"difference": "走的是新叶。高磷会把门堵住。",
				"photoHint": "花白苗和新叶簇生特写。"
			}],
			"plainExplain": "有效锌是用量很小的门。土施按年计，不要年年猛倒。 高 pH、高磷会把门堵住。石灰性土更常见。",
			"natural": ["高 pH、高磷会把门堵住。石灰性土更常见。", "高 pH、高磷会把门堵住。"],
			"human": ["花白苗当缺氮。", "磷很高还把门堵住。"],
			"steps": [
				"新叶挤、节间短、玉米花白苗。老叶匀黄不是它。",
				"缺锌走新叶：脉间失绿、节间短、小叶簇生，玉米花白苗最典型。",
				"高磷先停。叶面按下限，先小面积。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"花白苗当缺氮。",
				"磷很高还把门堵住。",
				"缺铁也是新叶黄脉绿，但不是花白苗那种缩节。药害来得快还扭曲。"
			],
			"whenToTest": "花白苗、节间短，测有效锌，也看磷高不高。",
			"prevention": ["磷很高先停。锌不是年年倒。", "花白苗当缺氮。"],
			"indicators": [{
				"name": "有效锌",
				"meaning": "有效锌是用量很小的门。土施按年计，不要年年猛倒。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效锌",
			"spoken": [
				"有效锌。",
				"有效锌是用量很小的门。",
				"土施按年计，不要年年猛倒。",
				"缺锌走新叶：脉间失绿、节间短、小叶簇生，玉米花白苗最典型。",
				"新叶挤、节间短、玉米花白苗。",
				"老叶匀黄不是它。",
				"花白苗当缺氮。",
				"磷很高还把门堵住。"
			]
		},
		"en": {
			"title": "Available Zn",
			"subtitle": "Available Zn is a small door. Soil zinc is measured in years, not every trip.",
			"summary": "Available Zn is a small door. Soil zinc is measured in years, not every trip.",
			"appearance": "Zn hits new growth: interveinal yellow, short internodes, little leaves clustered. Maize white-bud is the type.",
			"conditions": "High pH and high P crowd the door. Calcareous soils show it more.",
			"commonCrops": "Maize white-bud and little-leaf fruit trees.",
			"fieldCheck": "Zn hits new growth: interveinal yellow, short internodes, little leaves clustered. Maize white-bud is the type.",
			"longform": ["Zn hits new growth: interveinal yellow, short internodes, little leaves clustered. Maize white-bud is the type. High pH and high P crowd the door. Calcareous soils show it more Easy to mix up: Iron also yellows new leaves with green veins, but not the white-bud shortening. Spray injury is fast and twisted Available Zn is a small door. Soil zinc is measured in years, not every trip.。"],
			"confuse": [{
				"lookalike": "Iron also yellows new leaves with green ",
				"difference": "Iron also yellows new leaves with green veins, but not the white-bud shortening. Spray injury is fast and twisted.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "White-bud is nitrogen",
				"difference": "New leaves. High P blocks the door.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available Zn is a small door. Soil zinc is measured in years, not every trip. High pH and high P crowd the door. Calcareous soils show it more.",
			"natural": ["High pH and high P crowd the door. Calcareous soils show it more.", "High pH and high P crowd the door. Calcareous soils show it more."],
			"human": ["White-bud treated as nitrogen.", "Still pouring phosphorus that blocks the door."],
			"steps": [
				"Zn hits new growth: interveinal yellow, short internodes, little leaves clustered. Maize white-bud is the type.",
				"High pH and high P crowd the door. Calcareous soils show it more.",
				"Available Zn is a small door. Soil zinc is measured in years, not every trip. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"White-bud treated as nitrogen.",
				"Still pouring phosphorus that blocks the door.",
				"Iron also yellows new leaves with green veins, but not the white-bud shortening. Spray injury is fast and twisted."
			],
			"whenToTest": "White-bud, short internodes: Zn and whether P is high.",
			"prevention": ["Stop excess P. Zinc is not an every-year pour.", "White-bud treated as nitrogen."],
			"indicators": [{
				"name": "Available Zn",
				"meaning": "Available Zn is a small door. Soil zinc is measured in years, not every trip.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available Zn。",
				"Available Zn is a small door. Soil zinc is measured in years, not every trip.。",
				"Zn hits new growth: interveinal yellow， short internodes。",
				" little leaves clustered. Maize white-bud is the type.。",
				"Zn hits new growth: interveinal yellow， short internodes。",
				" little leaves clustered. Maize white-bud is the type.。"
			]
		}
	},
	b: {
		"id": "b",
		"relatedSlugs": [
			"que-peng",
			"que-peng-hua-er-bu-shi",
			"hua-sheng-kong-jia"
		],
		"bvid": "BV1mfYYe7EKH",
		"videoTitle": "植物缺素，硼元素",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/b.jpg",
			"alt": "有效硼 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/b-2.jpg",
			"alt": "有效硼 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效硼",
			"subtitle": "有效硼窗口很窄。没有化验不要土里一把倒。",
			"summary": "有效硼窗口很窄。没有化验不要土里一把倒。",
			"appearance": "缺硼花而不实、蕾铃掉、茎空心或裂，生长点萎缩。",
			"conditions": "沙土、干旱更容易缺。缺和毒只隔一层纸。",
			"commonCrops": "油菜、棉花、花而不实的菜先问它。",
			"fieldCheck": "花开了不结实、茎空心。花期旱和盐也会掉花。",
			"longform": ["花开了不结实、茎空心。花期旱和盐也会掉花。缺和毒只隔一层纸。沙土、干旱更容易缺。没有化验别土里一把倒。空花裂茎特写。花期旱和盐也会掉花，缺和毒只隔一层纸。你看花开了有没有荚、茎空不空。窗口窄，没有化验别土里一把倒，宁可少喷一次。沙土干旱更容易缺，也更容易伤。花期没墒，先别猛喷硼。"],
			"confuse": [{
				"lookalike": "旱和盐也会落花",
				"difference": "旱和盐也会落花。先看墒和土面，再谈硼。",
				"photoHint": "空花和空心茎特写。"
			}, {
				"lookalike": "花而不实土里一把倒硼",
				"difference": "缺和毒只隔一层纸。花期旱和盐也会掉花。",
				"photoHint": "空花和空心茎特写。"
			}],
			"plainExplain": "有效硼窗口很窄。没有化验不要土里一把倒。 沙土、干旱更容易缺。缺和毒只隔一层纸。",
			"natural": ["沙土、干旱更容易缺。缺和毒只隔一层纸。", "沙土、干旱更容易缺。窗口也不宽。"],
			"human": ["花而不实就土里一把倒硼。", "缺和毒只隔一层纸还加倍。"],
			"steps": [
				"花开了不结实、茎空心。花期旱和盐也会掉花。",
				"缺硼花而不实、蕾铃掉、茎空心或裂，生长点萎缩。",
				"缺和毒只隔一层纸。没有化验别土里一把倒。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"花而不实就土里一把倒硼。",
				"缺和毒只隔一层纸还加倍。",
				"旱和盐也会落花。先看墒和土面，再谈硼。"
			],
			"whenToTest": "花而不实、茎空心，先问墒和盐，再测硼。",
			"prevention": ["缺和毒只隔一层纸。宁少勿多。", "花而不实就土里一把倒硼。"],
			"indicators": [{
				"name": "有效硼",
				"meaning": "有效硼窗口很窄。没有化验不要土里一把倒。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效硼",
			"spoken": [
				"有效硼。",
				"有效硼窗口很窄。",
				"没有化验不要土里一把倒。",
				"缺硼花而不实、蕾铃掉、茎空心或裂，生长点萎缩。",
				"花开了不结实、茎空心。",
				"花期旱和盐也会掉花。",
				"花而不实就土里一把倒硼。",
				"缺和毒只隔一层纸还加倍。"
			]
		},
		"en": {
			"title": "Available B",
			"subtitle": "Available B is a narrow window. Don’t broadcast it without a test.",
			"summary": "Available B is a narrow window. Don’t broadcast it without a test.",
			"appearance": "B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.",
			"conditions": "Sand and drought show lack more. Deficiency and toxicity are a thin window.",
			"commonCrops": "Oilseed rape, cotton, flowers without fruit.",
			"fieldCheck": "B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.",
			"longform": ["B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled. Sand and drought show lack more. Deficiency and toxicity are a thin window Easy to mix up: Drought and salt also drop flowers. Check moisture and the surface before boron Available B is a narrow window. Don’t broadcast it without a test.。"],
			"confuse": [{
				"lookalike": "Drought and salt also drop flowers",
				"difference": "Drought and salt also drop flowers. Check moisture and the surface before boron.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "No fruit, dump boron",
				"difference": "Deficiency and toxicity are close. Drought drops flowers too.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available B is a narrow window. Don’t broadcast it without a test. Sand and drought show lack more. Deficiency and toxicity are a thin window.",
			"natural": ["Sand and drought show lack more. Deficiency and toxicity are a thin window.", "Sand and drought show lack more. Deficiency and toxicity are a thin window."],
			"human": ["Dumping boron because flowers failed.", "Doubling a trace whose toxic window is thin."],
			"steps": [
				"B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.",
				"Sand and drought show lack more. Deficiency and toxicity are a thin window.",
				"Available B is a narrow window. Don’t broadcast it without a test. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Dumping boron because flowers failed.",
				"Doubling a trace whose toxic window is thin.",
				"Drought and salt also drop flowers. Check moisture and the surface before boron."
			],
			"whenToTest": "Bloom without fruit: moisture and salt first, then boron.",
			"prevention": ["Deficiency and toxicity are close. Better too little.", "Dumping boron because flowers failed."],
			"indicators": [{
				"name": "Available B",
				"meaning": "Available B is a narrow window. Don’t broadcast it without a test.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available B。",
				"Available B is a narrow window. Don’t broadcast it without a test.。",
				"B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.。",
				"B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.。"
			]
		}
	},
	ec: {
		"id": "ec",
		"relatedSlugs": [
			"yan-jian",
			"dashe-yanzhi",
			"shui-fei-yi-ti-hua-ec"
		],
		"bvid": "BV1zU4y1b7eg",
		"videoTitle": "土壤盐渍化",
		"problem": "其他",
		"group": "检测",
		"photos": [{
			"src": "/images/wiki/ec.jpg",
			"alt": "EC（电导率） 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/ec-2.jpg",
			"alt": "EC（电导率） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "EC（电导率）",
			"subtitle": "电导率看土水有多咸，偏高时根吸水费劲。",
			"summary": "电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。单子上写 EC 或电导，先看单位是毫西还是微西。水土比不同，数字不能硬比。白霜、滴口白圈、小水浇完更蔫，常常对得上偏高的电导。这条不给袋数。",
			"appearance": "单子上写 EC、电导率、电导。旁边一定有单位：毫西或微西，看错一位会把淡土当成咸土。",
			"conditions": "大棚、盐碱地、滴灌过浓，EC 最容易高。降低靠洗盐、控肥。",
			"commonCrops": "大棚、盐碱地、滴灌必看。",
			"fieldCheck": "土面白霜、滴口一圈、小水浇完更蔫，常常是这个数上去了。盐害看 EC，碱害看 pH 和钠。",
			"longform": ["电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。单子上写 EC 或电导，先看单位是毫西还是微西。水土比不同，数字不能硬比。白霜、滴口白圈、小水浇完更蔫，常常对得上偏高的电导。这条不给袋数。", "电导说土水有多咸，不是缺水。苗期更敏感。降低靠洗盐、控肥、沟要通。用量去农业知识，按测土和当地农技站。"],
			"confuse": [{
				"lookalike": "pH 说酸甜，全盐说盐的总量",
				"difference": "pH 说酸甜，全盐说盐的总量。EC 是当季能喝到的咸。",
				"photoHint": "滴口白圈特写。"
			}, {
				"lookalike": "越浇越蔫还加大肥",
				"difference": "滴口白圈常常是这个数上去了。先把肥液淡下来。",
				"photoHint": "滴口白圈特写。"
			}],
			"plainExplain": "电导说土水有多咸，不是缺水。苗期更敏感。降低靠洗盐、控肥、沟要通。",
			"natural": ["大棚、盐碱地、滴灌过浓，EC 最容易高。降低靠洗盐、控肥。", "苗期更敏感。滴口白圈常常是这个数上去了。"],
			"human": ["越浇越蔫还加大肥。", "滴口白圈当缺钙。"],
			"steps": [
				"滴口白圈、越浇越蔫，常常是这个数上去了。",
				"EC 说土水有多咸。数字高，根喝水费劲。苗期更敏感。",
				"越浇越蔫先把肥液淡下来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要单位没看就把数字抄到另一张表上。",
				"不要见白霜一律石膏。",
				"没沟不要大水漫灌。"
			],
			"whenToTest": "滴口白圈、越浇越蔫，先测电导。",
			"prevention": ["薄肥勤施。全年不揭膜，盆会越来越咸。", "越浇越蔫还加大肥。"],
			"indicators": [{
				"name": "EC（电导率）",
				"meaning": "电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "电导率 / 电导 / 盐分电导 / mS/cm / μS/cm",
			"ratioNote": "饱和浸提、1:1、1:5 的 EC 不能直接比。大棚滴口和露地也不是同一套标准。",
			"readTable": [{
				"label": "耕层 EC（示意，1:5 常见）",
				"low": "很低，不是问题本身",
				"mid": "多数露地还能出苗",
				"high": "苗期敏感，滴口白圈、越浇越蔫"
			}],
			"spoken": [
				"电导率看土水有多咸，不是旱情。",
				"先看单位，毫西和微西差一千倍。",
				"水土比不同，数字不能硬比。",
				"白霜加浇完更蔫，常常是它上去了。",
				"盐害看电导，碱害看酸碱和钠。",
				"不要见白霜就撒石膏。"
			]
		},
		"en": {
			"title": "EC",
			"subtitle": "EC measures how salty the soil water is.",
			"summary": "EC measures how salty the soil water is. High EC stresses roots; it is not the same as drought.",
			"appearance": "The sheet says EC or conductivity. The unit — mS or µS — is the whole story.",
			"conditions": "Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
			"commonCrops": "Greenhouses, salt country, drip lines.",
			"fieldCheck": "White crust, a ring at the dripper, worse wilt after a light watering — EC often went up. Salt is EC; alkali is pH and sodium.",
			"longform": ["EC says how salty the soil water is, not that the plant is thirsty. Seedlings feel it first.", "White crust plus scorched margins: split salt from potassium. Rates live in the saline guides."],
			"confuse": [{
				"lookalike": "pH is sour/sweet; total salt is the pile",
				"difference": "pH is sour/sweet; total salt is the pile. EC is the saltiness the root drinks now.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "More wilt, stronger feed",
				"difference": "A white ring at the dripper is this number going up.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "EC measures how salty the soil water is. High EC stresses roots; it is not the same as drought. Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
			"natural": ["Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.", "Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds."],
			"human": ["Stronger feed when wilt gets worse.", "A white dripper ring treated as calcium lack."],
			"steps": [
				"EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive.",
				"Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
				"EC is a salt meter. High EC stresses roots; it is not the same as drought. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t copy the number across units.",
				"Don’t gypsum every white crust.",
				"No drain, no flood."
			],
			"whenToTest": "White ring at the dripper, more wilt after watering — EC.",
			"prevention": ["Thin feeds. A film left on all year salts the bowl.", "Stronger feed when wilt gets worse."],
			"indicators": [{
				"name": "EC",
				"meaning": "EC is a salt meter. High EC stresses roots; it is not the same as drought.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"aka": "electrical conductivity, salinity EC, mS/cm, µS/cm",
			"ratioNote": "Saturated paste, 1:1 and 1:5 EC are different numbers.",
			"readTable": [{
				"label": "Topsoil EC (sketch, often 1:5)",
				"low": "Very low is not itself a disease",
				"mid": "Most open fields still come up",
				"high": "Seedlings suffer; dripper rings, worse wilt after water"
			}],
			"spoken": [
				"EC measures how salty the soil water is.",
				"High EC stresses roots; it is not the same as drought.",
				"Read the unit. mS and µS differ by a thousand.",
				"Different soil to water ratios are not comparable.",
				"White crust plus worse wilt after watering often means EC went up.",
				"Don’t spread gypsum on every white crust."
			]
		}
	},
	salt: {
		"id": "salt",
		"relatedSlugs": [
			"yan-jian",
			"fan-yan",
			"bin-hai-yan-tu"
		],
		"bvid": "BV1Cs4y1i7gU",
		"videoTitle": "地理小知识——土壤盐渍化",
		"problem": "其他",
		"group": "检测",
		"photos": [{
			"src": "/images/wiki/salt.jpg",
			"alt": "全盐 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/salt-2.jpg",
			"alt": "全盐 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "全盐",
			"subtitle": "全盐是盐的总量。咸和涩不是一回事。",
			"summary": "全盐是盐的总量。咸和涩不是一回事。",
			"appearance": "土里可溶盐一共有多少。和 EC 一起看盐害。",
			"conditions": "滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"commonCrops": "滨海、灌区、棚室一起看全盐。",
			"fieldCheck": "可溶盐一共有多少。白霜是盐分的线索。",
			"longform": ["可溶盐一共有多少。白霜是盐分的线索，不是每一片白都该撒同一袋。和电导一起看盐害。盐害和碱害不是一回事。白霜特写。不是每一片白都该撒同一袋，盐害和碱害不是一回事。你拿手刮一层白霜。咸和涩要分开，没沟别大水漫灌。改碱的那袋不是见白就用。白霜厚处和出苗齐处要分开看。不是每一片白都该撒同一袋。"],
			"confuse": [{
				"lookalike": "碱害看 pH 和钠",
				"difference": "碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。",
				"photoHint": "白霜和出苗花斑对照。"
			}, {
				"lookalike": "见白霜一律同一袋",
				"difference": "白霜是盐分的线索，咸和涩不是一回事。",
				"photoHint": "白霜和出苗花斑对照。"
			}],
			"plainExplain": "全盐是盐的总量。咸和涩不是一回事。 滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"natural": ["滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。", "和电导一起看。盐害和碱害不是一回事。"],
			"human": ["见白霜一律同一袋。", "没沟还大水漫灌。"],
			"steps": [
				"可溶盐一共有多少。白霜是盐分的线索。",
				"土里可溶盐一共有多少。和 EC 一起看盐害。",
				"白霜是盐分的线索，不是每一片白都同一袋。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"见白霜一律同一袋。",
				"没沟还大水漫灌。",
				"碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。"
			],
			"whenToTest": "白霜、出苗花斑，测全盐和电导。",
			"prevention": ["有沟才洗。覆盖断返盐。", "见白霜一律同一袋。"],
			"indicators": [{
				"name": "全盐",
				"meaning": "全盐是盐的总量。咸和涩不是一回事。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "全盐",
			"spoken": [
				"全盐。",
				"全盐是盐的总量。",
				"咸和涩不是一回事。",
				"土里可溶盐一共有多少。",
				"和 EC 一起看盐害。",
				"可溶盐一共有多少。",
				"白霜是盐分的线索。",
				"见白霜一律同一袋。",
				"没沟还大水漫灌。"
			]
		},
		"en": {
			"title": "Total soluble salt",
			"subtitle": "Total salt is the pile. Salty and soapy are different jobs.",
			"summary": "Total salt is the pile. Salty and soapy are different jobs.",
			"appearance": "How much soluble salt is in the soil. Read it with EC.",
			"conditions": "Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"commonCrops": "Coast, irrigation districts, houses.",
			"fieldCheck": "How much soluble salt is in the soil. Read it with EC.",
			"longform": ["How much soluble salt is in the soil. Read it with EC. Coast, dry irrigated country, and heavy greenhouse base dressings push it up Easy to mix up: Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust Total salt is the pile. Salty and soapy are different jobs.。"],
			"confuse": [{
				"lookalike": "Alkali is pH and sodium",
				"difference": "Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Every white crust, same bag",
				"difference": "Salt and alkali are different jobs.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Total salt is the pile. Salty and soapy are different jobs. Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"natural": ["Coast, dry irrigated country, and heavy greenhouse base dressings push it up.", "Coast, dry irrigated country, and heavy greenhouse base dressings push it up."],
			"human": ["The same bag on every white crust.", "Flooding without a ditch."],
			"steps": [
				"How much soluble salt is in the soil. Read it with EC.",
				"Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
				"Total salt is the pile. Salty and soapy are different jobs. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"The same bag on every white crust.",
				"Flooding without a ditch.",
				"Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust."
			],
			"whenToTest": "White frost, patchy emergence: total salt and EC.",
			"prevention": ["Leach only with a ditch. Mulch stops rising salt.", "The same bag on every white crust."],
			"indicators": [{
				"name": "Total soluble salt",
				"meaning": "Total salt is the pile. Salty and soapy are different jobs.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Total soluble salt。",
				"Total salt is the pile. Salty and soapy are different jobs.。",
				"How much soluble salt is in the soil. Read it with EC.。",
				"How much soluble salt is in the soil. Read it with EC.。"
			]
		}
	},
	bulk: {
		"id": "bulk",
		"relatedSlugs": [
			"ban-jie",
			"li-di-ceng",
			"ji-ya-che-zhe"
		],
		"bvid": "BV1kB4y1y7Rh",
		"videoTitle": "有效打破犁底层可以助作物防涝抗旱",
		"problem": "其他",
		"group": "检测",
		"photos": [{
			"src": "/images/wiki/bulk.jpg",
			"alt": "容重 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/bulk-2.jpg",
			"alt": "容重 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "容重",
			"subtitle": "容重是紧不紧的测量。锄不动要问它，不要先问缺肥。",
			"summary": "容重是紧不紧的测量。锄不动要问它，不要先问缺肥。",
			"appearance": "同样体积的土有多重。耕层过大说明板结。",
			"conditions": "车辙、湿耕、年年旋耕会把容重抬上去。有机质能慢慢降。",
			"commonCrops": "车碾地、旋耕地、果园清耕带更要紧。",
			"fieldCheck": "刨个坑看根是直着走还是拐弯。这项大了，土往往紧。",
			"longform": ["同样一盒土有多重。根拐弯、雨后积水，这项常常偏大。耕层过大说明板结。你刨个坑看根是直着走还是拐弯。刨个坑看根拐不拐弯。这项大了土往往紧，雨后积水也是线索。这项大了，土往往紧，雨后积水也是线索。路封了，肥再多根也过不去。你用铁锹比一比上下两层。紧的那层根过不去。雨后积水、根横走，这项常常偏大。"],
			"confuse": [{
				"lookalike": "孔隙度是反面：容重高，孔隙就少",
				"difference": "孔隙度是反面：容重高，孔隙就少。不是两个无关的词。",
				"photoHint": "根拐弯那一层特写。"
			}, {
				"lookalike": "根拐弯了还当缺肥",
				"difference": "这项大了土往往紧。先修路。",
				"photoHint": "根拐弯那一层特写。"
			}],
			"plainExplain": "容重是紧不紧的测量。锄不动要问它，不要先问缺肥。 车辙、湿耕、年年旋耕会把容重抬上去。有机质能慢慢降。",
			"natural": ["车辙、湿耕、年年旋耕会把容重抬上去。有机质能慢慢降。", "耕层过大说明板结。根会拐弯。"],
			"human": ["湿土进车把路轧死。", "根拐弯了还当缺肥。"],
			"steps": [
				"刨个坑看根是直着走还是拐弯。这项大了，土往往紧。",
				"同样体积的土有多重。耕层过大说明板结。",
				"根拐弯就修路，别当缺肥猛追。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"湿土进车把路轧死。",
				"根拐弯了还当缺肥。",
				"孔隙度是反面：容重高，孔隙就少。不是两个无关的词。"
			],
			"whenToTest": "根拐弯、雨后积水，测容重或直接刨坑看硬盖。",
			"prevention": ["湿土不进车。隔年深松刚过硬盖。", "湿土进车把路轧死。"],
			"indicators": [{
				"name": "容重",
				"meaning": "容重是紧不紧的测量。锄不动要问它，不要先问缺肥。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "容重",
			"spoken": [
				"容重。",
				"容重是紧不紧的测量。",
				"锄不动要问它，不要先问缺肥。",
				"同样体积的土有多重。",
				"耕层过大说明板结。",
				"刨个坑看根是直着走还是拐弯。",
				"这项大了，土往往紧。",
				"湿土进车把路轧死。",
				"根拐弯了还当缺肥。"
			]
		},
		"en": {
			"title": "Bulk density",
			"subtitle": "Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger.",
			"summary": "Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger.",
			"appearance": "How heavy a given volume of soil is. High in the tilled layer means compaction.",
			"conditions": "Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
			"commonCrops": "Wheelings, rotavated fields, clean-cultivated orchards.",
			"fieldCheck": "How heavy a given volume of soil is. High in the tilled layer means compaction.",
			"longform": ["How heavy a given volume of soil is. High in the tilled layer means compaction. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.", "Porosity is the other face: high bulk density, few pores. Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger."],
			"confuse": [{
				"lookalike": "Porosity is the other face: high bulk de",
				"difference": "Porosity is the other face: high bulk density, few pores. Not two unrelated words.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Sideways roots need fertiliser",
				"difference": "High bulk density is a closed road.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "How heavy a given volume of soil is. High in the tilled layer means compaction. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
			"natural": ["Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.", "Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly."],
			"human": ["Driving on wet soil until the road dies.", "Sideways roots chased with fertiliser."],
			"steps": [
				"How heavy a given volume of soil is. High in the tilled layer means compaction.",
				"Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
				"Bulk density is the tightness reading. A hoe that will not enter asks this before hunger. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Driving on wet soil until the road dies.",
				"Sideways roots chased with fertiliser.",
				"Porosity is the other face: high bulk density, few pores. Not two unrelated words."
			],
			"whenToTest": "Sideways roots, ponding: bulk density or just dig the lid.",
			"prevention": ["Stay off wet soil. Subsoil just through the lid, alternate years.", "Driving on wet soil until the road dies."],
			"indicators": [{
				"name": "Bulk density",
				"meaning": "Bulk density is the tightness reading. A hoe that will not enter asks this before hunger.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Bulk density is how tight the soil is.",
				"A hoe that will not enter asks this before hunger.",
				"High bulk density in the tilled layer means compaction.",
				"Organic matter lowers it slowly."
			]
		}
	},
	test: {
		"id": "test",
		"relatedSlugs": [
			"ce-tu-bao-gao",
			"ce-tu-qu-yang",
			"shi-fei-tiao-tu-rang"
		],
		"bvid": "BV13E421M7Ly",
		"videoTitle": "测土配方，科学施肥",
		"problem": "其他",
		"group": "检测",
		"photos": [{
			"src": "/images/wiki/test.jpg",
			"alt": "中文测土单示意图",
			"caption": "中文测土单示意图，不是自家地头。",
			"kind": "diagram"
		}, {
			"src": "/images/wiki/test-2.jpg",
			"alt": "中文测土单示意图",
			"caption": "中文测土单示意图，不是自家地头。",
			"kind": "diagram"
		}],
		"zh": {
			"title": "测土配方",
			"subtitle": "测土配方是方法，不是一张万能处方。",
			"summary": "测土配方是方法，不是一张万能处方。",
			"appearance": "先化验土，再决定施什么、施多少。取样错了，后面全错。",
			"conditions": "多点混合耕作层。阅读顺序：pH、有机质、盐分，再氮磷钾。",
			"commonCrops": "打算改土施肥的地都要过这一关。",
			"fieldCheck": "多点混合耕作层。一个坑、田边、粪堆旁，代表不了这块地。",
			"longform": ["先化验再下肥。田边、粪堆旁挖一锹，代表不了这块地。看报告时重点看酸碱、有机质、盐分，再看氮磷钾。多点混合耕作层。田边粪堆旁那一锹代表不了这块地。你按 S 形走八到十五个点，田边粪堆旁那一锹扔掉。一个坑代表不了这块地。单子先圈酸碱、有机质、盐分。地块名和取样日期对不上，这张单子就别当处方。看报告先圈酸碱、有机质、盐分。"],
			"confuse": [{
				"lookalike": "看叶片能猜，不能代替这四个字",
				"difference": "看叶片能猜，不能代替这四个字。别家田的袋数不是配方。",
				"photoHint": "取样袋和化验单放一起。"
			}, {
				"lookalike": "田边一个坑代表整块地",
				"difference": "多点混合耕作层。单位看错一位会下错肥。",
				"photoHint": "取样袋和化验单放一起。"
			}],
			"plainExplain": "测土配方是方法，不是一张万能处方。 多点混合耕作层。阅读顺序：pH、有机质、盐分，再氮磷钾。",
			"natural": ["多点混合耕作层。阅读顺序：pH、有机质、盐分，再氮磷钾。", "一个坑代表不了这块地。多点混合耕作层。"],
			"human": ["田边一个坑就代表整块地。", "单位看错一位还下肥。"],
			"steps": [
				"多点混合耕作层。一个坑、田边、粪堆旁，代表不了这块地。",
				"先化验土，再决定施什么、施多少。取样错了，后面全错。",
				"看不懂带去农技站。先改极端项。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"田边一个坑就代表整块地。",
				"单位看错一位还下肥。",
				"看叶片能猜，不能代替这四个字。别家田的袋数不是配方。"
			],
			"whenToTest": "打算改土施肥前：耕作层多点混合。",
			"prevention": ["改土施肥前取样。单位看错一位会下错肥。", "田边一个坑就代表整块地。"],
			"indicators": [{
				"name": "测土配方",
				"meaning": "测土配方是方法，不是一张万能处方。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "测土配方",
			"spoken": [
				"测土配方。",
				"测土配方是方法，不是一张万能处方。",
				"先化验土，再决定施什么、施多少。",
				"取样错了，后面全错。",
				"多点混合耕作层。",
				"一个坑、田边、粪堆旁，代表不了这块地。",
				"田边一个坑就代表整块地。",
				"单位看错一位还下肥。"
			]
		},
		"en": {
			"title": "Test-based fertiliser",
			"subtitle": "Test-based fertiliser is a method, not a universal recipe.",
			"summary": "Test-based fertiliser is a method, not a universal recipe.",
			"appearance": "Test first, then decide what and how much. Soil taken badly poisons every later decision.",
			"conditions": "Mix many cores of the tilled layer. Read pH, OM, salt, then NPK.",
			"commonCrops": "Any field you plan to amend.",
			"fieldCheck": "Test first, then decide what and how much. Soil taken badly poisons every later decision.",
			"longform": ["Test first, then decide what and how much. Soil taken badly poisons every later decision. Mix many cores of the tilled layer. Read pH, OM, salt, then NPK Easy to mix up: Leaves can guess; they cannot replace a test. A neighbour’s bag is not a formula Test-based fertiliser is a method, not a universal recipe.。"],
			"confuse": [{
				"lookalike": "Leaves can guess; they cannot replace a ",
				"difference": "Leaves can guess; they cannot replace a test. A neighbour’s bag is not a formula.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "One hole is the field",
				"difference": "Mix many cores. A missed decimal poisons the rate.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Test-based fertiliser is a method, not a universal recipe. Mix many cores of the tilled layer. Read pH, OM, salt, then NPK.",
			"natural": ["Mix many cores of the tilled layer. Read pH, OM, salt, then NPK.", "Mix many cores of the tilled layer. Read pH, OM, salt, then NPK."],
			"human": ["One hole at the edge as the whole field.", "A missed decimal, then a bag."],
			"steps": [
				"Test first, then decide what and how much. Soil taken badly poisons every later decision.",
				"Mix many cores of the tilled layer. Read pH, OM, salt, then NPK.",
				"Test-based fertiliser is a method, not a universal recipe. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"One hole at the edge as the whole field.",
				"A missed decimal, then a bag.",
				"Leaves can guess; they cannot replace a test. A neighbour’s bag is not a formula."
			],
			"whenToTest": "Before you amend: many cores of the tilled layer.",
			"prevention": ["Take the soil before you treat. A missed decimal poisons the rate.", "One hole at the edge as the whole field."],
			"indicators": [{
				"name": "Test-based fertiliser",
				"meaning": "Test-based fertiliser is a method, not a universal recipe.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Test-based fertiliser。",
				"Test-based fertiliser is a method, not a universal recipe.。",
				"Test first, then decide what and how much. Soil taken badly poisons every later decision.。",
				"Test first, then decide what and how much. Soil taken badly poisons every later decision.。"
			]
		}
	},
	saline: {
		"id": "saline",
		"relatedSlugs": [
			"yan-jian",
			"su-da-yan-jian",
			"xi-yan-pai-shui"
		],
		"bvid": "BV1gL4y1u718",
		"videoTitle": "盐碱地，如何形成的？",
		"problem": "盐碱",
		"group": "障碍",
		"photos": [{
			"src": "/images/wiki/saline.jpg",
			"alt": "盐碱 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/saline-2.jpg",
			"alt": "盐碱 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "盐碱",
			"subtitle": "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。",
			"summary": "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。",
			"appearance": "盐是咸，碱是涩。都能让苗出不来、叶焦边。白霜是盐的场面，肥皂水感是碱的场面。",
			"conditions": "干旱灌区、滨海、大棚盆里，盐碱最常见。盐害看 EC，碱害看 pH 和钠。",
			"commonCrops": "滨海、灌区、苏打碱斑都用这个名字。",
			"fieldCheck": "盐是咸，碱是涩。有白霜先当盐分的线索。",
			"longform": ["盐是咸，碱是涩。有白霜先当盐分的线索。没沟不要大水漫灌。盐害看全盐或电导，碱害看酸碱和钠。白霜是盐分的线索。没沟不要大水漫灌，咸和涩要分开。你先问有没有沟。有白霜当盐分的线索，没沟大水只会把盐抬上来。盐害看电导，碱害看酸碱和钠，别见白就下一袋。有沟才洗。小水勤浇最会把盐往上抬。井水要是也咸，沟通不通先问。"],
			"confuse": [{
				"lookalike": "缺钾也焦边，但土面不一定白",
				"difference": "缺钾也焦边，但土面不一定白。旱了土干，咸了常有白霜还湿着蔫。",
				"photoHint": "白霜加焦边，咸涩分开拍。"
			}, {
				"lookalike": "没沟还大水漫灌",
				"difference": "盐是咸，碱是涩。有白霜先当盐分的线索。",
				"photoHint": "白霜加焦边，咸涩分开拍。"
			}],
			"plainExplain": "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。 干旱灌区、滨海、大棚盆里，盐碱最常见。盐害看 EC，碱害看 pH 和钠。",
			"natural": ["干旱灌区、滨海、大棚盆里，盐碱最常见。盐害看 EC，碱害看 pH 和钠。", "盐是咸，碱是涩。白霜先当盐分的线索。"],
			"human": ["没沟大水漫灌。", "咸和涩混成一袋。"],
			"steps": [
				"盐是咸，碱是涩。有白霜先当盐分的线索。",
				"盐是咸，碱是涩。都能让苗出不来、叶焦边。白霜是盐的场面，肥皂水感是碱的场面。",
				"没沟不要大水漫灌。咸和涩分开认。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"没沟大水漫灌。",
				"咸和涩混成一袋。",
				"缺钾也焦边，但土面不一定白。旱了土干，咸了常有白霜还湿着蔫。"
			],
			"whenToTest": "白霜加焦边，测电导、酸碱和钠，咸涩分开。",
			"prevention": ["沟要通。肥要淡。咸涩分开认。", "没沟大水漫灌。"],
			"indicators": [{
				"name": "盐碱",
				"meaning": "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "盐碱",
			"spoken": [
				"盐碱。",
				"盐碱是一类障碍的总名。",
				"具体是盐还是碱，要拆开看。",
				"盐是咸，碱是涩。",
				"都能让苗出不来、叶焦边。",
				"白霜是盐的场面，肥皂水感是碱的场面。",
				"盐是咸，碱是涩。",
				"有白霜先当盐分的线索。",
				"没沟大水漫灌。",
				"咸和涩混成一袋。"
			]
		},
		"en": {
			"title": "Saline-alkali",
			"subtitle": "Saline-alkali is a family name. Split salt from alkali before you treat.",
			"summary": "Saline-alkali is a family name. Split salt from alkali before you treat.",
			"appearance": "Salt is salty; alkali is soapy. Both stop emergence and scorch margins. White frost is salt; a soapy feel is alkali.",
			"conditions": "Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium.",
			"commonCrops": "Coast, irrigation, soda spots.",
			"fieldCheck": "Salt is salty; alkali is soapy. Both stop emergence and scorch margins. White frost is salt; a soapy feel is alkali.",
			"longform": ["Salt is salty; alkali is soapy. Both stop emergence and scorch margins. White frost is salt; a soapy feel is alkali. Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium Easy to mix up: K also scorches margins without a white surface. Drought is dry; salt often has frost and still wilts when wet Saline-alkali is a family name. Split salt from alkali before you treat.。"],
			"confuse": [{
				"lookalike": "K also scorches margins without a white ",
				"difference": "K also scorches margins without a white surface. Drought is dry; salt often has frost and still wilts when wet.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Flood without a ditch",
				"difference": "Salt is salty; alkali is soapy. White frost is salt’s card.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Saline-alkali is a family name. Split salt from alkali before you treat. Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium.",
			"natural": ["Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium.", "Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium."],
			"human": ["Flooding without a ditch.", "Mixing salt and alkali into one bag."],
			"steps": [
				"Salt is salty; alkali is soapy. Both stop emergence and scorch margins. White frost is salt; a soapy feel is alkali.",
				"Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium.",
				"Saline-alkali is a family name. Split salt from alkali before you treat. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Flooding without a ditch.",
				"Mixing salt and alkali into one bag.",
				"K also scorches margins without a white surface. Drought is dry; salt often has frost and still wilts when wet."
			],
			"whenToTest": "Frost plus scorch: EC, pH and sodium, salt vs alkali.",
			"prevention": ["Ditch first. Dilute fertiliser. Salt and alkali are different.", "Flooding without a ditch."],
			"indicators": [{
				"name": "Saline-alkali",
				"meaning": "Saline-alkali is a family name. Split salt from alkali before you treat.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Saline-alkali。",
				"Saline-alkali is a family name. Split salt from alkali before you treat.。",
				"Salt is salty;。",
				"alkali is soapy. Both stop emergence and scorch margins. White frost is salt;。",
				"a soapy feel is alkali.。",
				"Salt is salty;。",
				"alkali is soapy. Both stop emergence and scorch margins. White frost is salt;。",
				"a soapy feel is alkali.。"
			]
		}
	},
	acid: {
		"id": "acid",
		"relatedSlugs": [
			"suan-hua",
			"sheng-li-suan-xing-fei",
			"cha-yuan-guo-suan"
		],
		"bvid": "BV1jT6TYXEjx",
		"videoTitle": "如何调理土壤酸化问题？",
		"problem": "酸化",
		"group": "障碍",
		"photos": [{
			"src": "/images/wiki/acid.jpg",
			"alt": "酸化 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/acid-2.jpg",
			"alt": "酸化 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "酸化",
			"subtitle": "酸化是 pH 往下走这件事的名字。用量看酸化知识条。",
			"summary": "酸化是 pH 往下走这件事的名字。用量看酸化知识条。",
			"appearance": "土越种越酸。根被铝咬，苗发僵，有时浇水冒锈水。",
			"conditions": "铵态氮、淋溶、有机质薄，账越记越酸。茶叶耐酸，粮田不是。",
			"commonCrops": "红黄壤、南方粮田、过酸茶园。",
			"fieldCheck": "苗僵、根褐、锈水。茶树耐酸，粮田目标不是七。",
			"longform": ["越种越酸，根被铝咬。苗僵、根褐、有时锈水。茶树耐酸，目标不是七。用石灰改酸必须定量。根秃时不要猛氮。苗僵根褐锈水。茶树耐酸目标不是七，粮田石灰别往茶园倒。你洗手洗根，苗僵、根褐、有时锈水。茶树耐酸，目标不是七；粮田石灰别往茶园倒。铵态氮年年加账，有机质薄了酸得更快。改酸和培肥要一起想。根秃时不要猛氮，嘴越伤越深。"],
			"confuse": [{
				"lookalike": "缺肥是根还在；酸化常先伤根尖",
				"difference": "缺肥是根还在；酸化常先伤根尖。茶园过酸和粮田酸化不是同一篇文章。",
				"photoHint": "僵苗、褐根、锈水三张。"
			}, {
				"lookalike": "粮田石灰抄到茶园",
				"difference": "茶树耐酸，粮田目标不是七。根秃时别猛氮。",
				"photoHint": "僵苗、褐根、锈水三张。"
			}],
			"plainExplain": "酸化是 pH 往下走这件事的名字。用量看酸化知识条。 铵态氮、淋溶、有机质薄，账越记越酸。茶叶耐酸，粮田不是。",
			"natural": ["铵态氮、淋溶、有机质薄，账越记越酸。茶叶耐酸，粮田不是。", "铵态氮、淋溶、有机质薄，账越记越酸。"],
			"human": ["粮田石灰抄到茶园。", "根秃时猛氮。"],
			"steps": [
				"苗僵、根褐、锈水。茶树耐酸，粮田目标不是七。",
				"土越种越酸。根被铝咬，苗发僵，有时浇水冒锈水。",
				"低于大约五点五才改。茶园和粮田不是同一套标准。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"粮田石灰抄到茶园。",
				"根秃时猛氮。",
				"缺肥是根还在；酸化常先伤根尖。茶园过酸和粮田酸化不是同一篇文章。"
			],
			"whenToTest": "苗僵根褐锈水，测耕作层酸碱。茶园单独取。",
			"prevention": ["生理酸性肥轮换。有机质垫底。", "粮田石灰抄到茶园。"],
			"indicators": [{
				"name": "酸化",
				"meaning": "酸化是 pH 往下走这件事的名字。用量看酸化知识条。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "酸化",
			"spoken": [
				"酸化。",
				"酸化是 pH 往下走这件事的名字。",
				"用量看酸化知识条。",
				"土越种越酸。",
				"根被铝咬，苗发僵，有时浇水冒锈水。",
				"苗僵、根褐、锈水。",
				"茶树耐酸，粮田目标不是七。",
				"粮田石灰抄到茶园。",
				"根秃时猛氮。"
			]
		},
		"en": {
			"title": "Acidification",
			"subtitle": "Acidification is the name of pH walking down. Rates live on the acid handbook page.",
			"summary": "Acidification is the name of pH walking down. Rates live on the acid handbook page.",
			"appearance": "The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty.",
			"conditions": "Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.",
			"commonCrops": "Red-yellow earth, southern grain, too-acid tea.",
			"fieldCheck": "The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty.",
			"longform": ["The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty. Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not Easy to mix up: Hunger keeps a root; acidification bites the tip first. Tea-too-acid and grain acidification are different pages Acidification is the name of pH walking down. Rates live on the acid handbook page.。"],
			"confuse": [{
				"lookalike": "Hunger keeps a root; acidification bites",
				"difference": "Hunger keeps a root; acidification bites the tip first. Tea-too-acid and grain acidification are different pages.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Tea lime like grain lime",
				"difference": "Tea’s target is not 7. Don’t pour N on bald roots.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Acidification is the name of pH walking down. Rates live on the acid handbook page. Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.",
			"natural": ["Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.", "Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not."],
			"human": ["Grain lime poured on tea.", "Nitrogen on bald roots."],
			"steps": [
				"The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty.",
				"Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.",
				"Acidification is the name of pH walking down. Rates live on the acid handbook page. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Grain lime poured on tea.",
				"Nitrogen on bald roots.",
				"Hunger keeps a root; acidification bites the tip first. Tea-too-acid and grain acidification are different pages."
			],
			"whenToTest": "Stall, brown tips, rust water: tilled-layer pH. Tea separately.",
			"prevention": ["Rotate physiological acid fertilisers. Organic matter as a buffer.", "Grain lime poured on tea."],
			"indicators": [{
				"name": "Acidification",
				"meaning": "Acidification is the name of pH walking down. Rates live on the acid handbook page.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Acidification。",
				"Acidification is the name of pH walking down. Rates live on the acid handbook page.。",
				"The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty.。",
				"The soil sours over years. Aluminium injures roots, seedlings stall, water may run rusty.。"
			]
		}
	},
	compaction: {
		"id": "compaction",
		"relatedSlugs": [
			"ban-jie",
			"li-di-ceng",
			"xuan-geng-bian-qian"
		],
		"bvid": "BV1po4y1W7Fv",
		"videoTitle": "农田土壤板结的原因（二）",
		"problem": "板结",
		"group": "障碍",
		"photos": [{
			"src": "/images/wiki/compaction.jpg",
			"alt": "板结 / 犁底层 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/compaction-2.jpg",
			"alt": "板结 / 犁底层 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "板结 / 犁底层",
			"subtitle": "板结是路封了。深松是修路，不是当年的肥。",
			"summary": "板结是路封了。深松是修路，不是当年的肥。",
			"appearance": "锄不动、雨后积水、根横走。旋耕层下面压出的硬盖叫犁底层。",
			"conditions": "湿耕、车碾、年年只旋不松，硬盖越来越浅。有机质是胶水。",
			"commonCrops": "年年旋的粮田、湿耕菜地最常见。",
			"fieldCheck": "锄不动、雨后浆、晴天砖、根横走。下面发亮硬盖就是犁底层。",
			"longform": ["锄不动、雨后浆、晴天砖、根横走。二十厘米下面那层发亮硬盖就是它。隔年深松比年年深翻更稳妥。锄不动雨后浆晴天砖。二十厘米下面发亮硬盖就是犁底层。你拿锄试：雨后浆、晴天砖、根横走。隔年深松，湿土别进车。同一深度年年旋，下面会熨出一层盖。湿土别进重车。刨开看根是不是到那儿拐弯。苗戴帽出土，下面多半有硬盖。"],
			"confuse": [{
				"lookalike": "干旱硬土浇水还能化；犁底层是下面一层发亮的盖，水",
				"difference": "干旱硬土浇水还能化；犁底层是下面一层发亮的盖，水过不去。",
				"photoHint": "硬盖剖面和横走的根。"
			}, {
				"lookalike": "泥里旋一遍当深松",
				"difference": "下面发亮硬盖才是犁底层。适墒隔年松。",
				"photoHint": "硬盖剖面和横走的根。"
			}],
			"plainExplain": "板结是路封了。深松是修路，不是当年的肥。 湿耕、车碾、年年只旋不松，硬盖越来越浅。有机质是胶水。",
			"natural": ["湿耕、车碾、年年只旋不松，硬盖越来越浅。有机质是胶水。", "湿耕、车碾、年年只旋不松。"],
			"human": ["泥里旋一遍当深松。", "年年把生土翻上来。"],
			"steps": [
				"锄不动、雨后浆、晴天砖、根横走。下面发亮硬盖就是犁底层。",
				"锄不动、雨后积水、根横走。旋耕层下面压出的硬盖叫犁底层。",
				"适墒隔年深松，刚过硬盖就停。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"泥里旋一遍当深松。",
				"年年把生土翻上来。",
				"干旱硬土浇水还能化；犁底层是下面一层发亮的盖，水过不去。"
			],
			"whenToTest": "锄不动、根横走，刨坑看硬盖，容重是加分项。",
			"prevention": ["适墒隔年松。有机质把团粒养回来。", "泥里旋一遍当深松。"],
			"indicators": [{
				"name": "板结 / 犁底层",
				"meaning": "板结是路封了。深松是修路，不是当年的肥。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "板结 / 犁底层",
			"spoken": [
				"板结 / 犁底层。",
				"板结是路封了。",
				"深松是修路，不是当年的肥。",
				"锄不动、雨后积水、根横走。",
				"旋耕层下面压出的硬盖叫犁底层。",
				"锄不动、雨后浆、晴天砖、根横走。",
				"下面发亮硬盖就是犁底层。",
				"泥里旋一遍当深松。",
				"年年把生土翻上来。"
			]
		},
		"en": {
			"title": "Compaction / plough pan",
			"subtitle": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
			"summary": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
			"appearance": "A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
			"conditions": "Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.",
			"commonCrops": "Yearly-rotavated grain, wet-tilled vegetables.",
			"fieldCheck": "A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
			"longform": ["A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan. Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue Easy to mix up: Dry hard soil melts when watered; a pan is a shiny lid underneath that water cannot cross Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.。"],
			"confuse": [{
				"lookalike": "Dry hard soil melts when watered; a pan ",
				"difference": "Dry hard soil melts when watered; a pan is a shiny lid underneath that water cannot cross.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Rotavate wet as subsoiling",
				"difference": "The shiny lid underneath is the pan.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser. Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.",
			"natural": ["Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.", "Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue."],
			"human": ["A wet rotavate counted as subsoiling.", "Inverting raw subsoil every year."],
			"steps": [
				"A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
				"Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.",
				"Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"A wet rotavate counted as subsoiling.",
				"Inverting raw subsoil every year.",
				"Dry hard soil melts when watered; a pan is a shiny lid underneath that water cannot cross."
			],
			"whenToTest": "hoe that will not enter: dig the shiny lid.",
			"prevention": ["Subsoil at crumb-moist, alternate years. OM rebuilds crumbs.", "A wet rotavate counted as subsoiling."],
			"indicators": [{
				"name": "Compaction / plough pan",
				"meaning": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Compaction / plough pan。",
				"Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.。",
				"A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.。",
				"A hoe that will not enter, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.。"
			]
		}
	},
	mg: {
		"id": "mg",
		"relatedSlugs": [
			"que-mei",
			"yang-fen-kang-kang",
			"ce-tu-bao-gao"
		],
		"bvid": "BV1mHaMekEkU",
		"videoTitle": "作物缺镁的症状及解决方法",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/mg.jpg",
			"alt": "交换性镁 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/mg-2.jpg",
			"alt": "交换性镁 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性镁",
			"subtitle": "交换性镁是土能交出的镁。这项是指标，不是叶面肥商品名。",
			"summary": "交换性镁是土能交出的镁。这项是指标，不是叶面肥商品名。",
			"appearance": "缺镁走老叶：脉间黄、叶脉还绿，从下部开始。不要当成缺铁。",
			"conditions": "镁在叶绿素里。钾太高会把镁挤掉。沙土、高钾菜地常见。",
			"commonCrops": "叶菜、香蕉、高钾菜地容易显。",
			"fieldCheck": "老叶脉间黄、叶脉还绿，从底下往上。新叶黄脉绿才像铁。",
			"longform": ["老叶脉间黄、叶脉还绿，从底下往上走。新叶黄脉绿才像铁。钾太高会挤它。别当缺铁喷。镁在叶绿素里。老叶脉间黄从底下往上。新叶黄脉绿才像铁，钾太高会挤它。你从底下往上数叶子。老叶脉间黄、脉还绿，才像它。新叶黄脉绿走铁那篇。钾太高会把它挤掉，别当缺铁喷。从底下往上走才像镁。新叶先黄，别喷错成铁。钾袋子拍胸脯的地更爱挤镁。"],
			"confuse": [{
				"lookalike": "缺铁走新叶，缺镁走老叶",
				"difference": "缺铁走新叶，缺镁走老叶。叶位一错，肥就下错。",
				"photoHint": "下部脉间黄和顶端新叶对照。"
			}, {
				"lookalike": "老叶脉间黄当缺铁喷",
				"difference": "缺镁走下部，缺铁走新叶。叶位一错肥就下错。",
				"photoHint": "下部脉间黄和顶端新叶对照。"
			}],
			"plainExplain": "交换性镁是土能交出的镁。这项是指标，不是叶面肥商品名。 镁在叶绿素里。钾太高会把镁挤掉。沙土、高钾菜地常见。",
			"natural": ["镁在叶绿素里。钾太高会把镁挤掉。沙土、高钾菜地常见。", "钾太高会把镁挤掉。"],
			"human": ["老叶脉间黄当成缺铁喷。", "钾太高还把镁挤掉。"],
			"steps": [
				"老叶脉间黄、叶脉还绿，从底下往上。新叶黄脉绿才像铁。",
				"缺镁走老叶：脉间黄、叶脉还绿，从下部开始。不要当成缺铁。",
				"老叶脉间黄别当缺铁喷。钾高先把钾降下来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"老叶脉间黄当成缺铁喷。",
				"钾太高还把镁挤掉。",
				"缺铁走新叶，缺镁走老叶。叶位一错，肥就下错。"
			],
			"whenToTest": "老叶脉间黄、从底下往上，测交换性镁和钾。",
			"prevention": ["钾不要堆太高。老叶脉间黄别当铁喷。", "老叶脉间黄当成缺铁喷。"],
			"indicators": [{
				"name": "交换性镁",
				"meaning": "交换性镁是土能交出的镁。这项是指标，不是叶面肥商品名。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "交换性镁",
			"spoken": [
				"交换性镁。",
				"交换性镁是土能交出的镁。",
				"这项是指标，不是叶面肥商品名。",
				"缺镁走老叶：脉间黄、叶脉还绿，从下部开始。",
				"不要当成缺铁。",
				"老叶脉间黄、叶脉还绿，从底下往上。",
				"新叶黄脉绿才像铁。",
				"老叶脉间黄当成缺铁喷。",
				"钾太高还把镁挤掉。"
			]
		},
		"en": {
			"title": "Exchangeable Mg",
			"subtitle": "Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand.",
			"summary": "Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand.",
			"appearance": "Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.",
			"conditions": "Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it.",
			"commonCrops": "Leafy crops, banana, high-K vegetable ground.",
			"fieldCheck": "Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.",
			"longform": ["Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron. Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it Easy to mix up: Iron is new leaves; magnesium is old leaves. Wrong leaf position, wrong bag Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand.。"],
			"confuse": [{
				"lookalike": "Iron is new leaves; magnesium is old lea",
				"difference": "Iron is new leaves; magnesium is old leaves. Wrong leaf position, wrong bag.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Old-leaf striping as iron",
				"difference": "Mg walks up from below; iron is new leaves.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand. Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it.",
			"natural": ["Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it.", "Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it."],
			"human": ["Old-leaf striping sprayed as iron.", "Still pouring potassium that crowds magnesium."],
			"steps": [
				"Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.",
				"Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it.",
				"Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Old-leaf striping sprayed as iron.",
				"Still pouring potassium that crowds magnesium.",
				"Iron is new leaves; magnesium is old leaves. Wrong leaf position, wrong bag."
			],
			"whenToTest": "Old-leaf striping from below: Mg and K together.",
			"prevention": ["Don’t stack potassium. Old-leaf striping is not iron.", "Old-leaf striping sprayed as iron."],
			"indicators": [{
				"name": "Exchangeable Mg",
				"meaning": "Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Exchangeable Mg。",
				"Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand.。",
				"Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.。",
				"Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.。"
			]
		}
	},
	fe: {
		"id": "fe",
		"relatedSlugs": [
			"que-tie",
			"shi-hui-xing-tu",
			"pu-tao-shi-hui-tu-que-tie"
		],
		"bvid": "BV1cN4y1g742",
		"videoTitle": "叶片发黄，叶脉深绿，缺铁or缺镁？",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/fe.jpg",
			"alt": "有效铁 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/fe-2.jpg",
			"alt": "有效铁 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效铁",
			"subtitle": "有效铁是根能吃到的铁。高 pH 土猛撒硫酸亚铁，当季常常吃不进。",
			"summary": "有效铁是根能吃到的铁。高 pH 土猛撒硫酸亚铁，当季常常吃不进。",
			"appearance": "缺铁走新叶：黄、叶脉还绿，顶端更明显。老叶相对还绿。",
			"conditions": "高 pH 把铁锁住。土里有铁，根吃不到。石灰性土、葡萄、柑橘常见。",
			"commonCrops": "葡萄、柑橘、石灰性土上的新梢。",
			"fieldCheck": "新叶黄、脉还绿，老叶相对好。别一黄就冲氮。",
			"longform": ["新叶黄、脉还绿，老叶相对好。土里有铁，高酸碱时根吃不到。别一黄就冲氮。叶面螯合铁救急。石灰性土、葡萄、柑橘常见。新叶黄脉还绿老叶还好。土里有铁高酸碱时根吃不到，别一黄就冲氮。你掐顶端新叶：肉黄、脉还绿，老叶还好。别一黄就冲氮，叶面螯合铁只是救急。钥匙在根际酸碱和氧气。土里有铁根吃不到，别一黄就冲氮。"],
			"confuse": [{
				"lookalike": "缺氮老叶先黄；缺硫新老一起黄；缺铁只黄新叶且脉绿",
				"difference": "缺氮老叶先黄；缺硫新老一起黄；缺铁只黄新叶且脉绿。",
				"photoHint": "顶端新叶黄脉绿特写。"
			}, {
				"lookalike": "一黄就冲尿素",
				"difference": "新叶黄脉绿、老叶还好。高 pH 把铁锁住。",
				"photoHint": "顶端新叶黄脉绿特写。"
			}],
			"plainExplain": "有效铁是根能吃到的铁。高 pH 土猛撒硫酸亚铁，当季常常吃不进。 高 pH 把铁锁住。土里有铁，根吃不到。石灰性土、葡萄、柑橘常见。",
			"natural": ["高 pH 把铁锁住。土里有铁，根吃不到。石灰性土、葡萄、柑橘常见。", "高 pH 把铁锁住。土里有铁根吃不到。"],
			"human": ["一黄就冲尿素。", "高 pH 土猛撒硫酸亚铁当季吃不进。"],
			"steps": [
				"新叶黄、脉还绿，老叶相对好。别一黄就冲氮。",
				"缺铁走新叶：黄、叶脉还绿，顶端更明显。老叶相对还绿。",
				"叶面螯合铁救急。高 pH 土猛撒硫酸亚铁当季常常吃不进。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"一黄就冲尿素。",
				"高 pH 土猛撒硫酸亚铁当季吃不进。",
				"缺氮老叶先黄；缺硫新老一起黄；缺铁只黄新叶且脉绿。"
			],
			"whenToTest": "新叶黄脉绿、老叶还好，测酸碱和有效铁。",
			"prevention": ["根际有机质、稳定水分。别一黄就冲氮。", "一黄就冲尿素。"],
			"indicators": [{
				"name": "有效铁",
				"meaning": "有效铁是根能吃到的铁。高 pH 土猛撒硫酸亚铁，当季常常吃不进。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效铁",
			"spoken": [
				"有效铁。",
				"有效铁是根能吃到的铁。",
				"高 pH 土猛撒硫酸亚铁，当季常常吃不进。",
				"缺铁走新叶：黄、叶脉还绿，顶端更明显。",
				"老叶相对还绿。",
				"新叶黄、脉还绿，老叶相对好。",
				"别一黄就冲氮。",
				"一黄就冲尿素。",
				"高 pH 土猛撒硫酸亚铁当季吃不进。"
			]
		},
		"en": {
			"title": "Available Fe",
			"subtitle": "Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season.",
			"summary": "Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season.",
			"appearance": "Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.",
			"conditions": "High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it.",
			"commonCrops": "Grapes, citrus, calcareous new shoots.",
			"fieldCheck": "Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.",
			"longform": ["Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener. High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it Easy to mix up: N yellows old leaves first; S yellows new and old; Fe yellows only new leaves with green veins Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season.。"],
			"confuse": [{
				"lookalike": "N yellows old leaves first; S yellows ne",
				"difference": "N yellows old leaves first; S yellows new and old; Fe yellows only new leaves with green veins.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Yellow, so urea",
				"difference": "New leaves yellow, veins green. High pH locks iron.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season. High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it.",
			"natural": ["High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it.", "High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it."],
			"human": ["Yellow chased with urea.", "Ferrous sulphate dumped on high-pH soil this season."],
			"steps": [
				"Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.",
				"High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it.",
				"Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Yellow chased with urea.",
				"Ferrous sulphate dumped on high-pH soil this season.",
				"N yellows old leaves first; S yellows new and old; Fe yellows only new leaves with green veins."
			],
			"whenToTest": "New-leaf yellow, veins green: pH and available Fe.",
			"prevention": ["Organic matter in the root zone, steady water. Don’t chase yellow with urea.", "Yellow chased with urea."],
			"indicators": [{
				"name": "Available Fe",
				"meaning": "Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available Fe。",
				"Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season.。",
				"Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.。",
				"Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.。"
			]
		}
	},
	mn: {
		"id": "mn",
		"relatedSlugs": [
			"que-meng",
			"que-tie",
			"ce-tu-bao-gao"
		],
		"bvid": "BV1z1eoeMEHR",
		"videoTitle": "植物缺素的症状，缺锰的症状与锰肥补充",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/mn.jpg",
			"alt": "有效锰 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/mn-2.jpg",
			"alt": "有效锰 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效锰",
			"subtitle": "有效锰是新叶上的锰。这项是指标，先改极端 pH。",
			"summary": "有效锰是新叶上的锰。这项是指标，先改极端 pH。",
			"appearance": "缺锰走新叶脉间失绿，常带褐斑或灰白小点。小麦上更常见。",
			"conditions": "过酸或过碱都会乱。有机质很高的石灰性土有时也锁锰。",
			"commonCrops": "小麦、燕麦、过酸过碱土。",
			"fieldCheck": "新叶脉间黄还带褐点。缺铁较少这种斑。",
			"longform": ["新叶脉间黄还带褐点。缺铁较少这种斑。过酸过碱都会乱。先看酸碱，不要和铁锌混成一瓶猛喷。小麦上更显。缺铁较少这种斑，先看酸碱再喷。你看新叶脉间黄还带不带褐点。过酸过碱都会乱，先问酸碱，别和铁锌混一瓶猛喷。小麦上那些褐点，缺铁很少这么长。一瓶微肥混着喷，事后更说不清。先看酸碱再喷，别和铁锌混一瓶。"],
			"confuse": [{
				"lookalike": "缺铁较少褐斑；缺锰常有小褐点",
				"difference": "缺铁较少褐斑；缺锰常有小褐点。先看 pH，不要混成一瓶微量元素猛喷。",
				"photoHint": "新叶褐斑特写。"
			}, {
				"lookalike": "和铁锌混成一瓶猛喷",
				"difference": "缺锰常带褐点。先看酸碱。",
				"photoHint": "新叶褐斑特写。"
			}],
			"plainExplain": "有效锰是新叶上的锰。这项是指标，先改极端 pH。 过酸或过碱都会乱。有机质很高的石灰性土有时也锁锰。",
			"natural": ["过酸或过碱都会乱。有机质很高的石灰性土有时也锁锰。", "过酸过碱都会乱。"],
			"human": ["和铁锌混成一瓶猛喷。", "不看 pH 先下锰。"],
			"steps": [
				"新叶脉间黄还带褐点。缺铁较少这种斑。",
				"缺锰走新叶脉间失绿，常带褐斑或灰白小点。小麦上更常见。",
				"先改极端酸碱，不要只喷。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"和铁锌混成一瓶猛喷。",
				"不看 pH 先下锰。",
				"缺铁较少褐斑；缺锰常有小褐点。先看 pH，不要混成一瓶微量元素猛喷。"
			],
			"whenToTest": "新叶褐斑脉间黄，测有效锰和酸碱。",
			"prevention": ["先把酸碱放到活得住的区间。", "和铁锌混成一瓶猛喷。"],
			"indicators": [{
				"name": "有效锰",
				"meaning": "有效锰是新叶上的锰。这项是指标，先改极端 pH。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效锰",
			"spoken": [
				"有效锰。",
				"有效锰是新叶上的锰。",
				"这项是指标，先改极端 pH。",
				"缺锰走新叶脉间失绿，常带褐斑或灰白小点。",
				"小麦上更常见。",
				"新叶脉间黄还带褐点。",
				"缺铁较少这种斑。",
				"和铁锌混成一瓶猛喷。",
				"不看 pH 先下锰。"
			]
		},
		"en": {
			"title": "Available Mn",
			"subtitle": "Available Mn is manganese on new leaves. A lab number — fix extreme pH first.",
			"summary": "Available Mn is manganese on new leaves. A lab number — fix extreme pH first.",
			"appearance": "Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.",
			"conditions": "Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too.",
			"commonCrops": "Wheat, oats, soils too acid or too alkaline.",
			"fieldCheck": "Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.",
			"longform": ["Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly. Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too Easy to mix up: Iron rarely speckles; manganese often does. Read pH; don’t tank-mix a micronutrient blast Available Mn is manganese on new leaves. A lab number — fix extreme pH first.。"],
			"confuse": [{
				"lookalike": "Iron rarely speckles; manganese often do",
				"difference": "Iron rarely speckles; manganese often does. Read pH; don’t tank-mix a micronutrient blast.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Tank-mix every micronutrient",
				"difference": "Mn often speckles. Read pH first.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available Mn is manganese on new leaves. A lab number — fix extreme pH first. Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too.",
			"natural": ["Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too.", "Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too."],
			"human": ["Iron, zinc and manganese in one blast.", "Manganese without reading pH."],
			"steps": [
				"Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.",
				"Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too.",
				"Available Mn is manganese on new leaves. A lab number — fix extreme pH first. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Iron, zinc and manganese in one blast.",
				"Manganese without reading pH.",
				"Iron rarely speckles; manganese often does. Read pH; don’t tank-mix a micronutrient blast."
			],
			"whenToTest": "New-leaf speckling: Mn and pH.",
			"prevention": ["Put pH in a living range first.", "Iron, zinc and manganese in one blast."],
			"indicators": [{
				"name": "Available Mn",
				"meaning": "Available Mn is manganese on new leaves. A lab number — fix extreme pH first.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available Mn。",
				"Available Mn is manganese on new leaves. A lab number — fix extreme pH first.。",
				"Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.。",
				"Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.。"
			]
		}
	},
	s: {
		"id": "s",
		"relatedSlugs": [
			"que-liu",
			"que-dan",
			"huang-ye-jian-bie"
		],
		"bvid": "BV1544tzXEL4",
		"videoTitle": "植物缺各类元素判断与补充方法",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/s.jpg",
			"alt": "有效硫 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/s-2.jpg",
			"alt": "有效硫 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效硫",
			"subtitle": "有效硫是当季能用的硫。尿素本身不含硫。",
			"summary": "有效硫是当季能用的硫。尿素本身不含硫。",
			"appearance": "缺硫整株偏黄，新叶也黄，和缺氮只黄老叶相反。",
			"conditions": "硫不容易从老叶搬到新叶。沙土、长期只施尿素更容易显。",
			"commonCrops": "沙土、长期只施一种氮的田。",
			"fieldCheck": "整株偏黄，新叶也黄。缺氮是老叶先黄、新叶还绿。",
			"longform": ["整株偏黄，新叶也黄。缺氮是老叶先黄、新叶还绿。叶位是分水岭。沙土、长期只施一种氮更容易显。有的氮肥本身不含硫。整株偏黄新叶也黄。缺氮是老叶先黄新叶还绿，叶位是分水岭。你看新叶老叶是不是一起淡。翻近几年氮肥包装，有的本身就不带硫。缺氮只黄老叶。新叶也淡，先翻氮肥包装看带不带硫。有的氮肥本身不含硫，越补越不像。"],
			"confuse": [{
				"lookalike": "缺氮老叶先黄、新叶还绿；缺硫新叶跟着黄",
				"difference": "缺氮老叶先黄、新叶还绿；缺硫新叶跟着黄。叶位是分水岭。",
				"photoHint": "新老叶一起黄的整株。"
			}, {
				"lookalike": "新叶也黄还当缺氮",
				"difference": "缺氮只黄老叶。叶位是分水岭。",
				"photoHint": "新老叶一起黄的整株。"
			}],
			"plainExplain": "有效硫是当季能用的硫。尿素本身不含硫。 硫不容易从老叶搬到新叶。沙土、长期只施尿素更容易显。",
			"natural": ["硫不容易从老叶搬到新叶。沙土、长期只施尿素更容易显。", "硫不容易从老叶搬到新叶。"],
			"human": ["新叶也黄还当缺氮。", "年年只施一种氮，本身不含硫。"],
			"steps": [
				"整株偏黄，新叶也黄。缺氮是老叶先黄、新叶还绿。",
				"缺硫整株偏黄，新叶也黄，和缺氮只黄老叶相反。",
				"叶位是分水岭。尿素本身不含硫。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"新叶也黄还当缺氮。",
				"年年只施一种氮，本身不含硫。",
				"缺氮老叶先黄、新叶还绿；缺硫新叶跟着黄。叶位是分水岭。"
			],
			"whenToTest": "新叶也黄，测硫或看肥料是否长期不含硫。",
			"prevention": ["氮源轮换，别年年只施一种不含硫的。", "新叶也黄还当缺氮。"],
			"indicators": [{
				"name": "有效硫",
				"meaning": "有效硫是当季能用的硫。尿素本身不含硫。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效硫",
			"spoken": [
				"有效硫。",
				"有效硫是当季能用的硫。",
				"尿素本身不含硫。",
				"缺硫整株偏黄，新叶也黄，和缺氮只黄老叶相反。",
				"整株偏黄，新叶也黄。",
				"缺氮是老叶先黄、新叶还绿。",
				"新叶也黄还当缺氮。",
				"年年只施一种氮，本身不含硫。"
			]
		},
		"en": {
			"title": "Available S",
			"subtitle": "Available S is sulphur the crop can use now. Urea itself has none.",
			"summary": "Available S is sulphur the crop can use now. Urea itself has none.",
			"appearance": "S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.",
			"conditions": "Sulphur does not move from old to new leaves. Sand and years of urea-only show it more.",
			"commonCrops": "Sand, years of one sulphur-free nitrogen.",
			"fieldCheck": "S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.",
			"longform": ["S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow. Sulphur does not move from old to new leaves. Sand and years of urea-only show it more Easy to mix up: N yellows old leaves while new stay greener; S takes the new leaves with it. Leaf position is the split Available S is sulphur the crop can use now. Urea itself has none.。"],
			"confuse": [{
				"lookalike": "N yellows old leaves while new stay gree",
				"difference": "N yellows old leaves while new stay greener; S takes the new leaves with it. Leaf position is the split.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Whole-plant yellow as nitrogen",
				"difference": "N yellows old leaves first. Leaf position is the split.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available S is sulphur the crop can use now. Urea itself has none. Sulphur does not move from old to new leaves. Sand and years of urea-only show it more.",
			"natural": ["Sulphur does not move from old to new leaves. Sand and years of urea-only show it more.", "Sulphur does not move from old to new leaves. Sand and years of urea-only show it more."],
			"human": ["New-leaf yellow chased with urea.", "Years of one nitrogen source that has no sulphur."],
			"steps": [
				"S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.",
				"Sulphur does not move from old to new leaves. Sand and years of urea-only show it more.",
				"Available S is sulphur the crop can use now. Urea itself has none. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"New-leaf yellow chased with urea.",
				"Years of one nitrogen source that has no sulphur.",
				"N yellows old leaves while new stay greener; S takes the new leaves with it. Leaf position is the split."
			],
			"whenToTest": "New leaves yellow too: sulphur, or years of sulphur-free N.",
			"prevention": ["Rotate nitrogen sources. Urea has no sulphur.", "New-leaf yellow chased with urea."],
			"indicators": [{
				"name": "Available S",
				"meaning": "Available S is sulphur the crop can use now. Urea itself has none.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available S。",
				"Available S is sulphur the crop can use now. Urea itself has none.。",
				"S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.。",
				"S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.。"
			]
		}
	},
	cu: {
		"id": "cu",
		"relatedSlugs": [
			"que-tong",
			"ye-cai-xiao-xing-yuan-su",
			"ce-tu-bao-gao"
		],
		"bvid": "BV118411T7F1",
		"videoTitle": "农作物缺素图谱大全",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/cu.jpg",
			"alt": "有效铜 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/cu-2.jpg",
			"alt": "有效铜 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效铜",
			"subtitle": "有效铜是花和穗要用的铜。没有化验不要土里猛倒。",
			"summary": "有效铜是花和穗要用的铜。没有化验不要土里猛倒。",
			"appearance": "缺铜叶尖发白卷曲，穗不实、结实差。新叶先出事。",
			"conditions": "有机质很高的沙土、过酸过碱都可能缺。窗口也不宽。",
			"commonCrops": "有机质很高的沙土、穗不实的麦。",
			"fieldCheck": "新叶尖发白卷曲，穗结实差。没有化验别猛倒。",
			"longform": ["新叶尖发白卷曲，穗结实差。病害穗枯常有病斑。窗口窄，没有化验别猛倒。铜在花和穗。有机质很高的沙土也可能缺。叶尖发白卷曲穗不实。病害穗枯常有病斑，窗口窄没化验别猛倒。你看新叶尖发白卷不卷、穗实不实。病害穗枯常有病斑和湿度。窗口窄，没有化验别土里猛倒。穗不实先问病斑和湿度。叶尖发白卷曲，新叶先出事。"],
			"confuse": [{
				"lookalike": "病害穗枯常有病斑和湿度；缺铜更干净地白尖、结实差",
				"difference": "病害穗枯常有病斑和湿度；缺铜更干净地白尖、结实差。先看化验再打药。",
				"photoHint": "叶尖发白和穗不实。"
			}, {
				"lookalike": "穗不实先打杀菌剂",
				"difference": "缺铜更干净地白尖。没有化验别猛倒。",
				"photoHint": "叶尖发白和穗不实。"
			}],
			"plainExplain": "有效铜是花和穗要用的铜。没有化验不要土里猛倒。 有机质很高的沙土、过酸过碱都可能缺。窗口也不宽。",
			"natural": ["有机质很高的沙土、过酸过碱都可能缺。窗口也不宽。", "有机质很高的沙土更容易缺。"],
			"human": ["没有化验土里猛倒铜。", "穗不实先打杀菌剂。"],
			"steps": [
				"新叶尖发白卷曲，穗结实差。没有化验别猛倒。",
				"缺铜叶尖发白卷曲，穗不实、结实差。新叶先出事。",
				"没有化验不要土里猛倒。窗口也不宽。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"没有化验土里猛倒铜。",
				"穗不实先打杀菌剂。",
				"病害穗枯常有病斑和湿度；缺铜更干净地白尖、结实差。先看化验再打药。"
			],
			"whenToTest": "叶尖发白、穗不实，测有效铜，窗口窄。",
			"prevention": ["没有化验别土里猛倒。", "没有化验土里猛倒铜。"],
			"indicators": [{
				"name": "有效铜",
				"meaning": "有效铜是花和穗要用的铜。没有化验不要土里猛倒。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效铜",
			"spoken": [
				"有效铜。",
				"有效铜是花和穗要用的铜。",
				"没有化验不要土里猛倒。",
				"缺铜叶尖发白卷曲，穗不实、结实差。",
				"新叶先出事。",
				"新叶尖发白卷曲，穗结实差。",
				"没有化验别猛倒。",
				"没有化验土里猛倒铜。",
				"穗不实先打杀菌剂。"
			]
		},
		"en": {
			"title": "Available Cu",
			"subtitle": "Available Cu is copper for flowers and ears. Don’t dump it without a test.",
			"summary": "Available Cu is copper for flowers and ears. Don’t dump it without a test.",
			"appearance": "Cu bleaches and curls leaf tips; ears set poorly. New leaves go first.",
			"conditions": "Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either.",
			"commonCrops": "Very organic sands, blank wheat ears.",
			"fieldCheck": "Cu bleaches and curls leaf tips; ears set poorly. New leaves go first.",
			"longform": ["Cu bleaches and curls leaf tips; ears set poorly. New leaves go first. Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either Easy to mix up: Disease on ears brings lesions and humidity; Cu is cleaner white tips and poor set. Test before you spray a fungicide Available Cu is copper for flowers and ears. Don’t dump it without a test.。"],
			"confuse": [{
				"lookalike": "Disease on ears brings lesions and humid",
				"difference": "Disease on ears brings lesions and humidity; Cu is cleaner white tips and poor set. Test before you spray a fungicide.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Blank ears, spray a fungicide",
				"difference": "Cu is cleaner white tips. Don’t dump it without a test.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available Cu is copper for flowers and ears. Don’t dump it without a test. Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either.",
			"natural": ["Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either.", "Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either."],
			"human": ["Copper dumped without a test.", "Blank ears sprayed as disease first."],
			"steps": [
				"Cu bleaches and curls leaf tips; ears set poorly. New leaves go first.",
				"Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either.",
				"Available Cu is copper for flowers and ears. Don’t dump it without a test. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Copper dumped without a test.",
				"Blank ears sprayed as disease first.",
				"Disease on ears brings lesions and humidity; Cu is cleaner white tips and poor set. Test before you spray a fungicide."
			],
			"whenToTest": "White tips, blank ears: available Cu. Narrow window.",
			"prevention": ["Don’t dump copper. The window is narrow.", "Copper dumped without a test."],
			"indicators": [{
				"name": "Available Cu",
				"meaning": "Available Cu is copper for flowers and ears. Don’t dump it without a test.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available Cu。",
				"Available Cu is copper for flowers and ears. Don’t dump it without a test.。",
				"Cu bleaches and curls leaf tips;。",
				"ears set poorly. New leaves go first.。",
				"Cu bleaches and curls leaf tips;。",
				"ears set poorly. New leaves go first.。"
			]
		}
	},
	mo: {
		"id": "mo",
		"relatedSlugs": [
			"que-mu",
			"suan-hua",
			"ce-tu-bao-gao"
		],
		"bvid": "BV1YNhueJEBd",
		"videoTitle": "钼肥的重要性",
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/mo.jpg",
			"alt": "有效钼 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/mo-2.jpg",
			"alt": "有效钼 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有效钼",
			"subtitle": "有效钼是微量中的微量。加倍会出事。",
			"summary": "有效钼是微量中的微量。加倍会出事。",
			"appearance": "缺钼豆科叶片畸形发黄，固氮差、植株瘦。新叶皱缩。",
			"conditions": "过酸土钼被锁。豆科最显。先问 pH，再问钼。",
			"commonCrops": "豆科、过酸土。",
			"fieldCheck": "豆叶畸形发皱，根瘤少。过酸先问 pH。",
			"longform": ["豆叶畸形发皱，根瘤少。缺氮是匀黄、根瘤还在。过酸先问酸碱。钼是微量，加倍会出事。不要豆叶黄了就猛氮。豆叶畸形根瘤少。缺氮是匀黄瘤还在，过酸先问酸碱。你看豆叶皱不皱、扒开根瘤稀不稀。缺氮是匀黄、瘤还在。钼是微量，豆叶黄了别先猛氮。过酸土它进不来。瘤还在、叶子匀黄，那是氮不是它。根瘤稀、叶子皱，过酸先问酸碱。"],
			"confuse": [{
				"lookalike": "缺氮是匀黄、根瘤还在；缺钼是固氮先垮、叶形不对",
				"difference": "缺氮是匀黄、根瘤还在；缺钼是固氮先垮、叶形不对。不要豆叶黄了就猛氮。",
				"photoHint": "畸形豆叶和根瘤对照。"
			}, {
				"lookalike": "豆叶黄了先猛氮",
				"difference": "缺氮根瘤还在。过酸先问 pH。",
				"photoHint": "畸形豆叶和根瘤对照。"
			}],
			"plainExplain": "有效钼是微量中的微量。加倍会出事。 过酸土钼被锁。豆科最显。先问 pH，再问钼。",
			"natural": ["过酸土钼被锁。豆科最显。先问 pH，再问钼。", "过酸土钼被锁。豆科最显。"],
			"human": ["豆叶黄了先猛氮。", "过酸不改，钼进不去。"],
			"steps": [
				"豆叶畸形发皱，根瘤少。过酸先问 pH。",
				"缺钼豆科叶片畸形发黄，固氮差、植株瘦。新叶皱缩。",
				"先问酸碱。钼是微量，加倍会出事。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"豆叶黄了先猛氮。",
				"过酸不改，钼进不去。",
				"缺氮是匀黄、根瘤还在；缺钼是固氮先垮、叶形不对。不要豆叶黄了就猛氮。"
			],
			"whenToTest": "豆叶畸形、根瘤少，先测酸碱再问钼。",
			"prevention": ["过酸先改酸。钼是微量。", "豆叶黄了先猛氮。"],
			"indicators": [{
				"name": "有效钼",
				"meaning": "有效钼是微量中的微量。加倍会出事。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效钼",
			"spoken": [
				"有效钼。",
				"有效钼是微量中的微量。",
				"加倍会出事。",
				"缺钼豆科叶片畸形发黄，固氮差、植株瘦。",
				"新叶皱缩。",
				"豆叶畸形发皱，根瘤少。",
				"过酸先问 pH。",
				"豆叶黄了先猛氮。",
				"过酸不改，钼进不去。"
			]
		},
		"en": {
			"title": "Available Mo",
			"subtitle": "Available Mo is a trace among traces. Doubling hurts.",
			"summary": "Available Mo is a trace among traces. Doubling hurts.",
			"appearance": "Mo: legume leaves distort and yellow; nodulation poor; plants thin. New leaves crinkle.",
			"conditions": "Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo.",
			"commonCrops": "Legumes on acid soil.",
			"fieldCheck": "Mo: legume leaves distort and yellow; nodulation poor; plants thin. New leaves crinkle.",
			"longform": ["Mo: legume leaves distort and yellow; nodulation poor; plants thin. New leaves crinkle. Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo Easy to mix up: N lack is even yellow with nodules still there; Mo drops fixation and distorts the leaf. Don’t pour N on yellow beans first Available Mo is a trace among traces. Doubling hurts.。"],
			"confuse": [{
				"lookalike": "N lack is even yellow with nodules still",
				"difference": "N lack is even yellow with nodules still there; Mo drops fixation and distorts the leaf. Don’t pour N on yellow beans first.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Yellow beans, pour N",
				"difference": "Nodules still there is N; distorted leaves and poor nodules is Mo.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available Mo is a trace among traces. Doubling hurts. Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo.",
			"natural": ["Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo.", "Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo."],
			"human": ["Yellow beans chased with nitrogen.", "Acid unfixed, molybdenum locked."],
			"steps": [
				"Mo: legume leaves distort and yellow; nodulation poor; plants thin. New leaves crinkle.",
				"Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo.",
				"Available Mo is a trace among traces. Doubling hurts. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Yellow beans chased with nitrogen.",
				"Acid unfixed, molybdenum locked.",
				"N lack is even yellow with nodules still there; Mo drops fixation and distorts the leaf. Don’t pour N on yellow beans first."
			],
			"whenToTest": "Distorted bean leaves, few nodules: pH first, then Mo.",
			"prevention": ["Fix acid first. Molybdenum is a trace.", "Yellow beans chased with nitrogen."],
			"indicators": [{
				"name": "Available Mo",
				"meaning": "Available Mo is a trace among traces. Doubling hurts.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Available Mo。",
				"Available Mo is a trace among traces. Doubling hurts.。",
				"Mo: legume leaves distort and yellow;。",
				"nodulation poor;。",
				"plants thin. New leaves crinkle.。",
				"Mo: legume leaves distort and yellow;。",
				"nodulation poor;。",
				"plants thin. New leaves crinkle.。"
			]
		}
	},
	porosity: {
		"id": "porosity",
		"relatedSlugs": [
			"tu-rang-tuan-ju-ti",
			"ban-jie",
			"you-ji-zhi"
		],
		"bvid": "BV1su4y1f73T",
		"videoTitle": "堆肥后土太黏，怎么办？",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/porosity.jpg",
			"alt": "孔隙度 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/porosity-2.jpg",
			"alt": "孔隙度 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "孔隙度",
			"subtitle": "孔隙度说空气和水能走的空隙占多少。改它靠结构。",
			"summary": "孔隙度说土里空气和水能走的空隙占多少。单粒散、被压实、湿耕，空隙就少，根会憋气。改它靠把团粒养回来，不靠当季猛氮。单子上这一格不是袋数。",
			"appearance": "土里空气和水走的路。孔隙少，根闷、雨后积水、锄下去发亮。",
			"conditions": "团粒多则孔隙多。压实、湿耕、有机质薄，路就封。",
			"commonCrops": "板结田、湿耕地、有机质薄的地。",
			"fieldCheck": "路少了根闷、雨后积水。压实和湿耕把路封上。",
			"longform": ["根要走空隙。压实、湿耕、有机质薄，空隙就少，白天蔫、根发黑。先停湿土进车，再谈深松和腐熟有机肥。当季猛氮填不回孔隙。"],
			"confuse": [{
				"lookalike": "容重是重量，孔隙度是空着的比例",
				"difference": "容重是重量，孔隙度是空着的比例。一个高了另一个就低。",
				"photoHint": "发亮锄面和积水对照。"
			}, {
				"lookalike": "路封了还当季猛氮",
				"difference": "孔隙少根闷。改它靠结构。",
				"photoHint": "发亮锄面和积水对照。"
			}],
			"plainExplain": "团粒多则孔隙多。压实、湿耕、有机质薄，空隙就少。改它靠结构，不靠当季氮肥。",
			"natural": ["团粒多则孔隙多。压实、湿耕、有机质薄，路就封。", "压实、湿耕、有机质薄，路就封。"],
			"human": ["路封了还当季猛氮。", "湿耕把孔隙压死。"],
			"steps": [
				"路少了根闷、雨后积水。压实和湿耕把路封上。",
				"土里空气和水走的路。孔隙少，根闷、雨后积水、锄下去发亮。",
				"改它靠结构，不靠当季氮。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"路封了还当季猛氮。",
				"湿耕把孔隙压死。",
				"容重是重量，孔隙度是空着的比例。一个高了另一个就低。"
			],
			"whenToTest": "雨后积水、锄下去发亮，先看结构，容重帮你定量。",
			"prevention": ["少湿耕，少碾。团粒多则路多。", "路封了还当季猛氮。"],
			"indicators": [{
				"name": "孔隙度",
				"meaning": "孔隙度是通气孔隙。改它靠结构，不靠当季氮。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "孔隙度",
			"spoken": [
				"孔隙度。",
				"孔隙度是通气孔隙。",
				"改它靠结构，不靠当季氮。",
				"土里空气和水走的路。",
				"孔隙少，根闷、雨后积水、锄下去发亮。",
				"路少了根闷、雨后积水。",
				"压实和湿耕把路封上。",
				"路封了还当季猛氮。",
				"湿耕把孔隙压死。"
			]
		},
		"en": {
			"title": "Porosity",
			"subtitle": "Porosity is the pore space. You change it with structure, not in-season nitrogen.",
			"summary": "Porosity is the pore space. You change it with structure, not in-season nitrogen.",
			"appearance": "The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
			"conditions": "Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
			"commonCrops": "Compacted, wet-tilled, thin-OM fields.",
			"fieldCheck": "The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
			"longform": ["The roads air and water take. Few pores: roots smother, water ponds, the hoe shines. Crumbs make pores. Compaction, wet tillage and thin OM close the roads Easy to mix up: Bulk density is weight; porosity is empty space. When one rises the other falls Porosity is the pore space. You change it with structure, not in-season nitrogen.。"],
			"confuse": [{
				"lookalike": "Bulk density is weight; porosity is empt",
				"difference": "Bulk density is weight; porosity is empty space. When one rises the other falls.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Closed pores, more N",
				"difference": "You open roads with structure.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Porosity is the pore space. You change it with structure, not in-season nitrogen. Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
			"natural": ["Crumbs make pores. Compaction, wet tillage and thin OM close the roads.", "Crumbs make pores. Compaction, wet tillage and thin OM close the roads."],
			"human": ["Closed pores chased with in-season N.", "Wet tillage that kills the pores."],
			"steps": [
				"The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
				"Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
				"Porosity is the pore space. You change it with structure, not in-season nitrogen. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Closed pores chased with in-season N.",
				"Wet tillage that kills the pores.",
				"Bulk density is weight; porosity is empty space. When one rises the other falls."
			],
			"whenToTest": "Ponding, a shiny hoe: structure, bulk density to count it.",
			"prevention": ["Less wet tillage, less traffic. Crumbs make roads.", "Closed pores chased with in-season N."],
			"indicators": [{
				"name": "Porosity",
				"meaning": "Porosity is the pore space. You change it with structure, not in-season nitrogen.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Porosity。",
				"Porosity is the pore space. You change it with structure, not in-season nitrogen.。",
				"The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.。",
				"The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.。"
			]
		}
	},
	fc: {
		"id": "fc",
		"relatedSlugs": [
			"sha-tu-lou-fei",
			"lao-hai",
			"nian-tu-nan-geng"
		],
		"bvid": "BV1kZfsBdEBc",
		"videoTitle": "测土配方施肥技术",
		"problem": "其他",
		"group": "基础",
		"photos": [{
			"src": "/images/wiki/fc.jpg",
			"alt": "田间持水量 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/fc-2.jpg",
			"alt": "田间持水量 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "田间持水量",
			"subtitle": "田间持水量是排干后土还能握住的水。浇过了这条线就是涝。",
			"summary": "田间持水量是排干后土还能握住的水。浇过了这条线就是涝。",
			"appearance": "排干重力水之后，土还能握住的水。沙土握得少，黏土握得多但未必能给根。",
			"conditions": "质地和有机质决定它。低于这个数苗旱，长期高于它根闷。",
			"commonCrops": "沙土握得少，黏土握得多但未必给根。",
			"fieldCheck": "土湿还蔫，先想这条线。过了线就是涝，不是旱。",
			"longform": ["排干重力水之后还能握住的水。过了这条线就是涝。土湿还蔫，先想这条线。沙土握得少，黏土握得多但未必能给根。土湿还蔫先想这条线。过了线就是涝不是旱，沙土握得少黏土握得多。你看土湿还蔫，先想这条线。过了线就是涝，不是旱。沙土握得少，黏土握得多但未必能给根喝。浇水浇过线，根就闷。沙土和黏土的线不在同一个地方。土湿还蔫，不是旱，是过了这条线。"],
			"confuse": [{
				"lookalike": "涝害是水赶走了气；干旱是水低于能握住的量",
				"difference": "涝害是水赶走了气；干旱是水低于能握住的量。田间持水量是中间那条线。",
				"photoHint": "土湿还蔫，面干底湿对照。"
			}, {
				"lookalike": "土湿还蔫当干旱猛灌",
				"difference": "过了这条线就是涝。土湿还蔫，先想这条线，不要当干旱猛灌。",
				"photoHint": "土湿还蔫，面干底湿对照。"
			}],
			"plainExplain": "田间持水量是排干后土还能握住的水。浇过了这条线就是涝。 质地和有机质决定它。低于这个数苗旱，长期高于它根闷。",
			"natural": ["质地和有机质决定它。低于这个数苗旱，长期高于它根闷。", "低于这个数苗旱，长期高于它根闷。"],
			"human": ["土湿还蔫当干旱猛灌。", "浇水过线把根闷住。"],
			"steps": [
				"土湿还蔫，先想这条线。过了线就是涝，不是旱。",
				"排干重力水之后，土还能握住的水。沙土握得少，黏土握得多但未必能给根。",
				"土湿还蔫，先想这条线，别当干旱猛灌。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"土湿还蔫当干旱猛灌。",
				"浇水过线把根闷住。",
				"涝害是水赶走了气；干旱是水低于能握住的量。田间持水量是中间那条线。"
			],
			"whenToTest": "土湿还蔫，先想这条线。沙黏不同，别按别的地的灌量抄。",
			"prevention": ["浇水浇到过线就是涝。沙黏不同。", "土湿还蔫当干旱猛灌。"],
			"indicators": [{
				"name": "田间持水量",
				"meaning": "田间持水量是排干后土还能握住的水。浇过了这条线就是涝。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "田间持水量",
			"spoken": [
				"田间持水量。",
				"田间持水量是排干后土还能握住的水。",
				"浇水浇到过线就是涝。",
				"排干重力水之后，土还能握住的水。",
				"沙土握得少，黏土握得多但未必能给根。",
				"土湿还蔫，先想这条线。",
				"过了线就是涝，不是旱。",
				"土湿还蔫当干旱猛灌。",
				"浇水过线把根闷住。"
			]
		},
		"en": {
			"title": "Field capacity",
			"subtitle": "Field capacity is how much water stays after drainage.",
			"summary": "Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root.",
			"appearance": "Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
			"conditions": "Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
			"commonCrops": "Sand holds little; clay holds much but may not give it.",
			"fieldCheck": "Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
			"longform": ["Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root. Texture and OM set it. Below it the crop dries; stuck above it, roots smother Easy to mix up: Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root.。"],
			"confuse": [{
				"lookalike": "Waterlog is water pushing air out; droug",
				"difference": "Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Wet and wilted, irrigate",
				"difference": "Past field capacity is waterlog.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root. Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
			"natural": ["Texture and OM set it. Below it the crop dries; stuck above it, roots smother.", "Texture and OM set it. Below it the crop dries; stuck above it, roots smother."],
			"human": ["Wet wilt irrigated as drought.", "Watering past the field-capacity mark."],
			"steps": [
				"Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
				"Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
				"Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Wet wilt irrigated as drought.",
				"Watering past the field-capacity mark.",
				"Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between."
			],
			"whenToTest": "Wet and still wilted: think this line. Sand and clay differ.",
			"prevention": ["Irrigating past the mark is waterlog. Sand and clay differ.", "Wet wilt irrigated as drought."],
			"indicators": [{
				"name": "Field capacity",
				"meaning": "Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Field capacity。",
				"Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root.。",
				"Water the soil still holds after gravity has drained. Sand holds little;。",
				"clay holds much but may not give it to the root.。",
				"Water the soil still holds after gravity has drained. Sand holds little;。",
				"clay holds much but may not give it to the root.。"
			]
		}
	},
	gley: {
		"id": "gley",
		"relatedSlugs": [
			"qian-yu-tian",
			"xiu-shui-tian",
			"yan-jiang-qi-hou-tu"
		],
		"bvid": "BV1w24y1s7V4",
		"videoTitle": "青岗泥，冷浸田",
		"problem": "涝害",
		"group": "障碍",
		"photos": [{
			"src": "/images/wiki/gley.jpg",
			"alt": "潜育化 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/gley-2.jpg",
			"alt": "潜育化 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "潜育化",
			"subtitle": "潜育化是土长期泡在水里变成的脸色。先排水，再谈肥。",
			"summary": "潜育化是土长期泡在水里变成的脸色。先排水，再谈肥。",
			"appearance": "长期渍水，土发青灰、有锈斑，摸着冷。水稻上叫冷浸田这一类。",
			"conditions": "山垄低洼、沿江湿地、排水不畅。亚铁、锰起来，根不爱往下。",
			"commonCrops": "山垄冷浸田、沿江湿地。",
			"fieldCheck": "土发青灰、有锈斑，摸着冷。一场雨是涝，这个词是长期湿。",
			"longform": ["长期渍水，土发青灰、有锈斑，摸着冷。一场雨是涝，这个词是房间长期湿。春季不发苗。先排水，再谈肥。青灰锈斑摸着冷。一场雨是涝，这个词是房间长期湿，先排水。你铲一锹：青灰、锈斑、摸着冷。春季不发苗，先排水再谈肥。山垄冷浸田春天不醒。先开沟见气，肥再多根也吃不进。摸着凉的那一锹就是证据。青灰土摸着冷，先排水再谈肥。"],
			"confuse": [{
				"lookalike": "普通涝害是一场雨；潜育化是长期的房间就是湿的",
				"difference": "普通涝害是一场雨；潜育化是长期的房间就是湿的。锈水田是它的近亲。",
				"photoHint": "青灰锈斑那一锹。"
			}, {
				"lookalike": "冷浸田先追肥再排水",
				"difference": "一场雨是涝，这个词是房间长期湿。",
				"photoHint": "青灰锈斑那一锹。"
			}],
			"plainExplain": "潜育化是土长期泡在水里变成的脸色。先排水，再谈肥。 山垄低洼、沿江湿地、排水不畅。亚铁、锰起来，根不爱往下。",
			"natural": ["山垄低洼、沿江湿地、排水不畅。亚铁、锰起来，根不爱往下。", "山垄低洼、沿江湿地、排水不畅。"],
			"human": ["冷浸田先追肥再排水。", "一场雨和长期湿房间混为一谈。"],
			"steps": [
				"土发青灰、有锈斑，摸着冷。一场雨是涝，这个词是长期湿。",
				"长期渍水，土发青灰、有锈斑，摸着冷。水稻上叫冷浸田这一类。",
				"先排水，再谈肥。一场雨不是这个词。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"冷浸田先追肥再排水。",
				"一场雨和长期湿房间混为一谈。",
				"普通涝害是一场雨；潜育化是长期的房间就是湿的。锈水田是它的近亲。"
			],
			"whenToTest": "青灰锈斑、摸着冷，先排水再化验。",
			"prevention": ["开沟排水、水旱轮作。先让房间干一点。", "冷浸田先追肥再排水。"],
			"indicators": [{
				"name": "潜育化",
				"meaning": "潜育化是土长期泡在水里变成的脸色。先排水，再谈肥。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "潜育化",
			"spoken": [
				"潜育化。",
				"潜育化是土长期泡在水里变成的脸色。",
				"先排水，再谈肥。",
				"长期渍水，土发青灰、有锈斑，摸着冷。",
				"水稻上叫冷浸田这一类。",
				"土发青灰、有锈斑，摸着冷。",
				"一场雨是涝，这个词是长期湿。",
				"冷浸田先追肥再排水。",
				"一场雨和长期湿房间混为一谈。"
			]
		},
		"en": {
			"title": "Gleying",
			"subtitle": "Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser.",
			"summary": "Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser.",
			"appearance": "Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
			"conditions": "Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
			"commonCrops": "Cold-soaked hollows, riverside wetlands.",
			"fieldCheck": "Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
			"longform": ["Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields. Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down Easy to mix up: A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser.。"],
			"confuse": [{
				"lookalike": "A flood is one rain; gleying is a room t",
				"difference": "A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Feed a cold-soaked field first",
				"difference": "One rain is a flood; gleying is a wet room.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser. Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
			"natural": ["Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.", "Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down."],
			"human": ["Feeding a cold-soaked field before you drain.", "One rain confused with a wet room."],
			"steps": [
				"Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
				"Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
				"Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Feeding a cold-soaked field before you drain.",
				"One rain confused with a wet room.",
				"A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins."
			],
			"whenToTest": "Blue-grey, rust mottles, cold: drain, then lab.",
			"prevention": ["Ditch, then dry-wet rotation. Let the room dry a little.", "Feeding a cold-soaked field before you drain."],
			"indicators": [{
				"name": "Gleying",
				"meaning": "Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Gleying。",
				"Gleying is the complexion of soil that lives underwater. Drain first, then add fertiliser.。",
				"Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.。",
				"Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.。"
			]
		}
	},
	replant: {
		"id": "replant",
		"relatedSlugs": [
			"lian-zuo",
			"da-peng-lian-zuo-zong-he",
			"cao-mei-lian-zuo"
		],
		"bvid": "BV1Xo4y1H7W5",
		"videoTitle": "土壤连作障碍的定义及危害",
		"problem": "连作障碍",
		"group": "障碍",
		"photos": [{
			"src": "/images/wiki/replant.jpg",
			"alt": "连作障碍 田间对照",
			"caption": "化验单上这一格怎么认。待补田间照片。"
		}, {
			"src": "/images/wiki/replant-2.jpg",
			"alt": "连作障碍 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "连作障碍",
			"subtitle": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。",
			"summary": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。",
			"appearance": "同一茬越种越差，点片死棵，邻地轮作的却好。根上可能有结或褐腐。",
			"conditions": "病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。",
			"commonCrops": "草莓棚、苹果老坑、大棚连作。",
			"fieldCheck": "同一茬越种越差，点片死棵，邻地轮作的却好。先看根。",
			"longform": ["同一茬越种越差，点片死棵，邻地轮作的却好。先看根，菌剂代替不了换科。病菌、线虫、盐和偏肥熬在一口锅里。点片死棵邻地轮作的却好。你点片死棵、邻地轮作的却好，先拔死棵看根。菌剂代替不了换科。病菌、线虫、盐常常一锅炖。先看根上有没有瘤、褐腐。肥再多，病株上的根也吃不进。菌剂代替不了换科轮作。"],
			"confuse": [{
				"lookalike": "单纯缺肥是整片匀；连作是点片、越种越重",
				"difference": "单纯缺肥是整片匀；连作是点片、越种越重。先看根，再看盐。",
				"photoHint": "死棵根和邻地还绿对照。"
			}, {
				"lookalike": "死棵了再买菌剂产品",
				"difference": "点片死棵、邻地轮作却好。菌剂代替不了换科。",
				"photoHint": "死棵根和邻地还绿对照。"
			}],
			"plainExplain": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。 病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。",
			"natural": ["病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。", "病菌、线虫、盐和偏肥熬在一口锅里。"],
			"human": ["死棵了再买菌剂产品。", "不换科还连种。"],
			"steps": [
				"同一茬越种越差，点片死棵，邻地轮作的却好。先看根。",
				"同一茬越种越差，点片死棵，邻地轮作的却好。根上可能有结或褐腐。",
				"先看根。菌剂代替不了换科轮作。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"死棵了再买菌剂产品。",
				"不换科还连种。",
				"单纯缺肥是整片匀；连作是点片、越种越重。先看根，再看盐。"
			],
			"whenToTest": "点片死棵、邻地轮作却好，先看根再测盐和病。",
			"prevention": ["换科轮作。死棵别留田。", "死棵了再买菌剂产品。"],
			"indicators": [{
				"name": "连作障碍",
				"meaning": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "连作障碍",
			"spoken": [
				"连作障碍。",
				"连作障碍是重茬这件事的名字。",
				"菌剂代替不了换科轮作。",
				"同一茬越种越差，点片死棵，邻地轮作的却好。",
				"根上可能有结或褐腐。",
				"同一茬越种越差，点片死棵，邻地轮作的却好。",
				"先看根。",
				"死棵了再买菌剂产品。",
				"不换科还连种。"
			]
		},
		"en": {
			"title": "Replant trouble",
			"subtitle": "Replant trouble is the name of growing the same family again. A microbe bag is not a rotation.",
			"summary": "Replant trouble is the name of growing the same family again. A microbe bag is not a rotation.",
			"appearance": "The same crop gets worse; patch death while a rotated neighbour is fine. Knots or brown rot on roots.",
			"conditions": "Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster.",
			"commonCrops": "Strawberry houses, old apple pits, greenhouse repeats.",
			"fieldCheck": "The same crop gets worse; patch death while a rotated neighbour is fine. Knots or brown rot on roots.",
			"longform": ["The same crop gets worse; patch death while a rotated neighbour is fine. Knots or brown rot on roots. Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster Easy to mix up: Hunger is even across a plot; replant is patchy and worse each year. Read the root, then salt Replant trouble is the name of growing the same family again. A microbe bag is not a rotation.。"],
			"confuse": [{
				"lookalike": "Hunger is even across a plot; replant is",
				"difference": "Hunger is even across a plot; replant is patchy and worse each year. Read the root, then salt.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Dead plants, buy microbes",
				"difference": "A microbe bag is not a rotation.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Replant trouble is the name of growing the same family again. A microbe bag is not a rotation. Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster.",
			"natural": ["Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster.", "Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster."],
			"human": ["Dead plants, another microbe bag.", "The same family again."],
			"steps": [
				"The same crop gets worse; patch death while a rotated neighbour is fine. Knots or brown rot on roots.",
				"Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster.",
				"Replant trouble is the name of growing the same family again. A microbe bag is not a rotation. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Dead plants, another microbe bag.",
				"The same family again.",
				"Hunger is even across a plot; replant is patchy and worse each year. Read the root, then salt."
			],
			"whenToTest": "Patch death while a rotated neighbour is fine: root, then salt.",
			"prevention": ["Rotate family. Don’t leave dead plants in the field.", "Dead plants, another microbe bag."],
			"indicators": [{
				"name": "Replant trouble",
				"meaning": "Replant trouble is the name of growing the same family again. A microbe bag is not a rotation.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Replant trouble。",
				"Replant trouble is the name of growing the same family again. A microbe bag is not a rotation.。",
				"The same crop gets worse;。",
				"patch death while a rotated neighbour is fine. Knots or brown rot on roots.。",
				"The same crop gets worse;。",
				"patch death while a rotated neighbour is fine. Knots or brown rot on roots.。"
			]
		}
	},
	na: {
		"id": "na",
		"relatedSlugs": [
			"yan-jian",
			"xi-yan-pai-shui",
			"fan-yan"
		],
		"problem": "盐碱",
		"group": "离子",
		"photos": [{
			"src": "/images/wiki/salt.jpg",
			"alt": "交换性钠 对照",
			"caption": "待补田间照片。这一格看化验单上的钠，不看风景。"
		}, {
			"src": "/images/wiki/salt-2.jpg",
			"alt": "交换性钠 特写",
			"caption": "待补田间照片。特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性钠",
			"subtitle": "交换性钠说钠占了多少座位，白霜只是盐分的线索。",
			"summary": "交换性钠说土里钠离子占了多少交换座位。钠高会把团粒拆散，湿时泥、干时板，这才像碱化。白霜更多是盐分的线索，要和电导一起看。改钠常常要有排水，石膏不是给所有白霜的。这条不给袋数。",
			"appearance": "单子上写交换性钠、ESP。要和 pH、电导一起读，不要单独看一个格子。",
			"conditions": "南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。",
			"commonCrops": "红黄壤、酸茶园、南方粮田先认它。",
			"fieldCheck": "土发涩发黏、结构差、不一定有厚白霜。",
			"longform": ["交换性钠说土里钠离子占了多少交换座位。钠高会把团粒拆散，湿时泥、干时板，这才像碱化。白霜更多是盐分的线索，要和电导一起看。改钠常常要有排水，石膏不是给所有白霜的。这条不给袋数。", "钠高才是碱化。白霜先当盐分线索。没沟不要大水漫灌，石膏要对得上钠高。用量去农业知识，按测土和当地农技站。"],
			"confuse": [{
				"lookalike": "缺肥根还在、只是细；铝毒是根尖伤掉",
				"difference": "缺肥根还在、只是细；铝毒是根尖伤掉。先洗根再谈肥。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}, {
				"lookalike": "根秃了还猛尿素",
				"difference": "pH 低了铝才溶出来伤根。改酸是治本。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}],
			"plainExplain": "钠高才是碱化。白霜先当盐分线索。没沟不要大水漫灌，石膏要对得上钠高。",
			"natural": ["南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。", "pH 低于大约五点五，铝才活跃。"],
			"human": ["根秃了还猛尿素。", "没测 pH 就按听说撒灰。"],
			"steps": [
				"白霜先当盐分线索，钠高才是碱化。",
				"交换性钠要和 CEC 一起看，不要只看土面白不白。",
				"没测钠不要一律撒石膏。没排水不要大水漫灌。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把钠和全盐看成同一格。",
				"不要见白霜就撒石膏。",
				"没沟不要大水漫灌。"
			],
			"whenToTest": "根尖褐秃、锈水、苗僵，测酸碱和交换性铝。",
			"prevention": ["有机质能络合一部分铝。根秃时别猛氮。", "根秃了还猛尿素。"],
			"indicators": [{
				"name": "交换性铝",
				"meaning": "交换性铝在强酸土里会伤根尖。治本是改酸，不是再追氮。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "交换性钠 / Ex-Na / 钠离子",
			"spoken": [
				"交换性钠说涩不涩。",
				"白霜是盐，钠高才是碱。",
				"要和 CEC 一起看百分比。",
				"见白霜不要一律石膏。",
				"用量去盐碱那篇。"
			],
			"ratioNote": "要算碱化度，还要 CEC。钠高、CEC 也高，百分比才公平。",
			"readTable": [{
				"label": "交换性钠（示意）",
				"low": "座位少，不是碱化主因",
				"mid": "要和 CEC 一起看百分比",
				"high": "结构差、土发涩，先问排水再谈石膏"
			}]
		},
		"en": {
			"title": "Exchangeable sodium",
			"subtitle": "Alkali is sodium, not every white crust.",
			"summary": "Exchangeable sodium is how many seats Na occupies. White crust is salt; high Na is sodicity.",
			"appearance": "The sheet says exchangeable sodium or Ex-Na, often cmol/kg. Not the same cell as total salt or EC.",
			"conditions": "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
			"commonCrops": "Red-yellow earth, acid tea, southern grain.",
			"fieldCheck": "Slick, sticky, poor structure, not always a thick crust — often sodium.",
			"longform": ["Sodium breaks crumbs. Gypsum is not for every white crust — only when Na is high and calcium is relatively low.", "Rates live in the saline-alkali guide."],
			"confuse": [{
				"lookalike": "Hunger keeps a root, just thin; aluminiu",
				"difference": "Hunger keeps a root, just thin; aluminium injures the tip. Wash roots before you add fertiliser.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Bald roots need urea",
				"difference": "Aluminium bites when pH is low. Lime is the job.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Exchangeable sodium is the alkali question, not every white crust. White crust is salt; high Na is sodicity. Gypsum is not for every crust — only when sodium is high and calcium is relatively low.",
			"natural": ["Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.", "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid."],
			"human": ["Urea on bald roots.", "Liming by hearsay without a pH."],
			"steps": [
				"Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls.",
				"Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
				"Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more N. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t mix Na with total salt.",
				"Don’t gypsum every crust.",
				"No drain, no flood."
			],
			"whenToTest": "Brown bald tips, rusty water: pH and exchangeable Al.",
			"prevention": ["Organic matter can bind some aluminium. Don’t pour N on bald roots.", "Urea on bald roots."],
			"indicators": [{
				"name": "Exchangeable Al",
				"meaning": "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more N.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Exchangeable sodium is the alkali question.",
				"White crust is salt. High Na is sodicity.",
				"Read it with CEC.",
				"Don’t gypsum every white crust."
			],
			"aka": "Ex-Na, exchangeable Na",
			"ratioNote": "ESP needs CEC too. A high Na with a high CEC is a different percentage.",
			"readTable": [{
				"label": "Exchangeable Na (sketch)",
				"low": "Few seats, not the alkali driver",
				"mid": "Read as a percentage of CEC",
				"high": "Poor structure; drain before gypsum"
			}]
		}
	},
	esp: {
		"id": "esp",
		"relatedSlugs": ["yan-jian", "xi-yan-pai-shui"],
		"problem": "盐碱",
		"group": "离子",
		"photos": [{
			"src": "/images/wiki/saline.jpg",
			"alt": "ESP 对照",
			"caption": "待补田间照片。ESP 是算出来的百分比。"
		}, {
			"src": "/images/wiki/saline-2.jpg",
			"alt": "ESP 特写",
			"caption": "待补田间照片。请以自家化验单为准。"
		}],
		"zh": {
			"title": "ESP / SAR（碱化度）",
			"subtitle": "钠占阳离子座位的百分比，不是白霜厚度。",
			"summary": "ESP 是交换性钠除以 CEC。SAR 用水里的钠钙镁来算。都是碱化指标，不是盐分指标。",
			"appearance": "有的单子直接写 ESP% 或碱化度，有的要你自己用钠和 CEC 去除。SAR 多出现在灌溉水化验。",
			"conditions": "滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"commonCrops": "滨海、灌区、棚室一起看全盐。",
			"fieldCheck": "结构差、湿时一层稀泥、干了硬块，比一层白霜更能对上碱化。",
			"longform": ["盐是 EC 和全盐，碱是 pH、钠和 ESP。两套标准。高 ESP 先问排水和钙，不要先猛尿素。", "按区域分级，此处为对照。用量去盐碱篇。"],
			"confuse": [{
				"lookalike": "碱害看 pH 和钠",
				"difference": "碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。",
				"photoHint": "白霜和出苗花斑对照。"
			}, {
				"lookalike": "见白霜一律同一袋",
				"difference": "白霜是盐分的线索，咸和涩不是一回事。",
				"photoHint": "白霜和出苗花斑对照。"
			}],
			"plainExplain": "全盐是盐的总量。咸和涩不是一回事。 滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"natural": ["滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。", "和电导一起看。盐害和碱害不是一回事。"],
			"human": ["见白霜一律同一袋。", "没沟还大水漫灌。"],
			"steps": [
				"可溶盐一共有多少。白霜是盐分的线索。",
				"土里可溶盐一共有多少。和 EC 一起看盐害。",
				"白霜是盐分的线索，不是每一片白都同一袋。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把 ESP 当成 EC。",
				"没有 CEC 不要硬报一个碱化度。",
				"不要见白霜就按高 ESP 下石膏。"
			],
			"whenToTest": "白霜、出苗花斑，测全盐和电导。",
			"prevention": ["有沟才洗。覆盖断返盐。", "见白霜一律同一袋。"],
			"indicators": [{
				"name": "全盐",
				"meaning": "全盐是盐的总量。咸和涩不是一回事。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "碱化度 / ESP / SAR / 钠吸附比",
			"spoken": [
				"ESP 是钠占座位的百分比。",
				"没有 CEC 就算不出来。",
				"盐看电导，碱看 ESP。",
				"结构差比白霜更能对上碱化。",
				"用量去盐碱那篇。"
			],
			"ratioNote": "ESP 和 SAR 不能当同一个数抄。没有 CEC，就算不出 ESP。",
			"readTable": [{
				"label": "ESP%（示意）",
				"low": "钠座位不多",
				"mid": "开始伤结构",
				"high": "碱化，先排水再谈石膏"
			}]
		},
		"en": {
			"title": "ESP / SAR",
			"subtitle": "How many cation seats sodium took — not crust thickness.",
			"summary": "ESP is exchangeable Na over CEC. SAR uses Na, Ca and Mg in water. Both are alkali readings, not salt readings.",
			"appearance": "Some sheets print ESP%. Others expect you to divide Na by CEC. SAR is more common on irrigation-water tests.",
			"conditions": "Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"commonCrops": "Coast, irrigation districts, houses.",
			"fieldCheck": "Poor structure, slurry when wet, clods when dry — that matches sodicity better than a white film.",
			"longform": ["Salt is EC. Alkali is pH, Na and ESP. High ESP: drain and calcium first, not urea.", "Rates live in the saline-alkali guide."],
			"confuse": [{
				"lookalike": "Alkali is pH and sodium",
				"difference": "Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Every white crust, same bag",
				"difference": "Salt and alkali are different jobs.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Total salt is the pile. Salty and soapy are different jobs. Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"natural": ["Coast, dry irrigated country, and heavy greenhouse base dressings push it up.", "Coast, dry irrigated country, and heavy greenhouse base dressings push it up."],
			"human": ["The same bag on every white crust.", "Flooding without a ditch."],
			"steps": [
				"How much soluble salt is in the soil. Read it with EC.",
				"Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
				"Total salt is the pile. Salty and soapy are different jobs. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t treat ESP as EC.",
				"Don’t invent ESP without CEC.",
				"Don’t gypsum every crust."
			],
			"whenToTest": "White frost, patchy emergence: total salt and EC.",
			"prevention": ["Leach only with a ditch. Mulch stops rising salt.", "The same bag on every white crust."],
			"indicators": [{
				"name": "Total soluble salt",
				"meaning": "Total salt is the pile. Salty and soapy are different jobs.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"ESP is sodium’s share of the seats.",
				"No CEC, no ESP.",
				"Salt is EC. Alkali is ESP.",
				"Rates live in the saline guide."
			],
			"aka": "exchangeable sodium percentage, sodium adsorption ratio",
			"ratioNote": "ESP and SAR are not the same number. No CEC, no ESP.",
			"readTable": [{
				"label": "ESP% (sketch)",
				"low": "Few Na seats",
				"mid": "Structure starts to fail",
				"high": "Sodic — drain before gypsum"
			}]
		}
	},
	cl: {
		"id": "cl",
		"relatedSlugs": ["yan-jian", "que-jia"],
		"problem": "盐碱",
		"group": "离子",
		"photos": [{
			"src": "/images/wiki/ec.jpg",
			"alt": "氯离子 对照",
			"caption": "待补田间照片。氯看化验单，不看土色。"
		}, {
			"src": "/images/wiki/ec-2.jpg",
			"alt": "氯离子 特写",
			"caption": "待补田间照片。请以自家单子为准。"
		}],
		"zh": {
			"title": "氯离子",
			"subtitle": "咸的一种成分。忌氯作物要单独问这一格。",
			"summary": "氯离子是盐分里常见的阴离子。马铃薯、烟草、部分果树怕它。不是缺钾的名字。",
			"appearance": "单子上写氯离子、Cl⁻、水溶性氯。单位常见毫克每千克。",
			"conditions": "滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"commonCrops": "滨海、灌区、棚室一起看全盐。",
			"fieldCheck": "叶缘焦要先问土面白不白、最近用没用含氯化肥。忌氯作物更敏感。",
			"longform": ["氯高是盐害的一条线索，不是叫你立刻补钾。忌氯作物只用硫酸钾那一类。", "用量去盐碱或缺钾篇，先分清是盐还是钾。"],
			"confuse": [{
				"lookalike": "碱害看 pH 和钠",
				"difference": "碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。",
				"photoHint": "白霜和出苗花斑对照。"
			}, {
				"lookalike": "见白霜一律同一袋",
				"difference": "白霜是盐分的线索，咸和涩不是一回事。",
				"photoHint": "白霜和出苗花斑对照。"
			}],
			"plainExplain": "全盐是盐的总量。咸和涩不是一回事。 滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"natural": ["滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。", "和电导一起看。盐害和碱害不是一回事。"],
			"human": ["见白霜一律同一袋。", "没沟还大水漫灌。"],
			"steps": [
				"可溶盐一共有多少。白霜是盐分的线索。",
				"土里可溶盐一共有多少。和 EC 一起看盐害。",
				"白霜是盐分的线索，不是每一片白都同一袋。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把氯离子当成缺钾。",
				"忌氯作物不要用氯化钾。",
				"不要见焦边就当盐害猛洗。"
			],
			"whenToTest": "白霜、出苗花斑，测全盐和电导。",
			"prevention": ["有沟才洗。覆盖断返盐。", "见白霜一律同一袋。"],
			"indicators": [{
				"name": "全盐",
				"meaning": "全盐是盐的总量。咸和涩不是一回事。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "氯离子 / Cl- / 水溶性氯",
			"spoken": [
				"氯离子是咸的一种成分。",
				"忌氯作物要单独问这一格。",
				"叶缘焦先分盐害和缺钾。",
				"高氯不要用氯化钾补钾。"
			],
			"ratioNote": "和 EC、全盐一起看咸。高氯不要用氯化钾去补钾。",
			"readTable": [{
				"label": "氯离子（示意）",
				"low": "多数作物不敏感",
				"mid": "问作物是否忌氯",
				"high": "盐害线索，忌氯作物先停含氯肥"
			}]
		},
		"en": {
			"title": "Chloride",
			"subtitle": "One piece of the salt. Chloride-sensitive crops ask this cell on its own.",
			"summary": "Chloride is a common anion in salt. Potato, tobacco and some fruit dislike it. It is not the name of a potassium gap.",
			"appearance": "The sheet says chloride or Cl-, often mg/kg.",
			"conditions": "Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"commonCrops": "Coast, irrigation districts, houses.",
			"fieldCheck": "Scorched margins: ask if the soil is white, and whether a chloride fertiliser went on.",
			"longform": ["High chloride is a salt clue, not an order to add potassium.", "Rates live in the saline or potassium guides — split salt from K first."],
			"confuse": [{
				"lookalike": "Alkali is pH and sodium",
				"difference": "Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Every white crust, same bag",
				"difference": "Salt and alkali are different jobs.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Total salt is the pile. Salty and soapy are different jobs. Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
			"natural": ["Coast, dry irrigated country, and heavy greenhouse base dressings push it up.", "Coast, dry irrigated country, and heavy greenhouse base dressings push it up."],
			"human": ["The same bag on every white crust.", "Flooding without a ditch."],
			"steps": [
				"How much soluble salt is in the soil. Read it with EC.",
				"Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
				"Total salt is the pile. Salty and soapy are different jobs. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t treat Cl as a K gap.",
				"Don’t use KCl on chloride-sensitive crops.",
				"Don’t flood-wash at the first scorched edge."
			],
			"whenToTest": "White frost, patchy emergence: total salt and EC.",
			"prevention": ["Leach only with a ditch. Mulch stops rising salt.", "The same bag on every white crust."],
			"indicators": [{
				"name": "Total soluble salt",
				"meaning": "Total salt is the pile. Salty and soapy are different jobs.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"spoken": [
				"Chloride is one piece of the salt.",
				"Sensitive crops ask this cell alone.",
				"Scorched margins: split salt from potassium.",
				"Don’t feed KCl when Cl is already high."
			],
			"aka": "Cl-, water-soluble chloride",
			"ratioNote": "Read with EC and total salt. High Cl: do not feed KCl.",
			"readTable": [{
				"label": "Chloride (sketch)",
				"low": "Most crops don’t mind",
				"mid": "Ask if the crop hates chloride",
				"high": "A salt clue; stop KCl on sensitive crops"
			}]
		}
	},
	si: {
		"id": "si",
		"relatedSlugs": ["suan-hua", "ban-jie"],
		"problem": "缺素",
		"group": "养分",
		"photos": [{
			"src": "/images/wiki/test.jpg",
			"alt": "中文测土单示意图",
			"caption": "中文测土单示意图，不是自家地头。",
			"kind": "diagram"
		}, {
			"src": "/images/wiki/test-2.jpg",
			"alt": "中文测土单示意图",
			"caption": "中文测土单示意图，不是自家地头。",
			"kind": "diagram"
		}],
		"zh": {
			"title": "有效硅",
			"subtitle": "水稻、甘蔗更常看。不是万能抗病药。",
			"summary": "有效硅是根能摸到的硅。禾本科更在乎。缺了茎叶偏软，不是一瓶叶面肥能代替改土。",
			"appearance": "单子上写有效硅或速效硅，单位常见毫克每千克。方法写在单子上，跨实验室不要硬比。",
			"conditions": "沙土、裸冬、秸秆全拿走，有机质掉得快。还田是慢功夫。",
			"commonCrops": "粮、菜、果都靠这层有机质。沙土掉得更快。",
			"fieldCheck": "稻株易倒、叶下披、病斑来得勤，有人会问硅。先仍要看氮、水和根。",
			"longform": ["硅是禾本科的帮手，不是包治。酸土、淋溶强的土这一格更容易低。", "补硅按登记说明和农技站，宁少勿多。这条不给袋数。"],
			"confuse": [{
				"lookalike": "质地说沙黏，容重说紧",
				"difference": "质地说沙黏，容重说紧。有机质说有没有肉。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}, {
				"lookalike": "颜色深就是有机质高",
				"difference": "颜色深不是化验。搓一把团不团得住更实在。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}],
			"plainExplain": "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。 沙土、裸冬、秸秆全拿走，有机质掉得快。还田是慢功夫。",
			"natural": ["沙土、裸冬、秸秆全拿走，有机质掉得快。还田是慢功夫。", "沙土、裸冬、秸秆全拿走，有机质掉得快。"],
			"human": ["指望菌剂产品一季把肉补回来。", "秸秆全拿走，还怪土瘦。"],
			"steps": [
				"搓一把：团得住又易散、颜色深，才像有肉。浅、粉、一场雨肥就飘，有机质低了。",
				"土色发浅、一抓就散、肥效年年飘，常常是有机质低了。颜色深不是化验。",
				"还田是慢功夫。菌剂产品一季补不回来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"不要把有效硅当成农药。",
				"不要跨方法硬比数字。",
				"不要忽略氮水和根只补硅。"
			],
			"whenToTest": "土色发浅、一把就散、肥效年年飘，再测有机质。",
			"prevention": ["秸秆能还就还，少裸冬。肉是慢功夫。", "指望菌剂产品一季把肉补回来。"],
			"indicators": [{
				"name": "有机质",
				"meaning": "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱测量，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}],
			"aka": "有效硅 / 速效硅 / Si",
			"ratioNote": "全硅和有效硅不是同一格。酸土有效硅常常更低。",
			"readTable": [{
				"label": "有效硅 mg/kg（示意）",
				"low": "水稻茎叶易软",
				"mid": "多数田够用",
				"high": "再加也不是产量开关"
			}],
			"spoken": [
				"有效硅，水稻更常看。",
				"全硅和有效硅不是同一格。",
				"酸土这一格更容易低。",
				"硅不是包治，先看氮水和根。"
			]
		},
		"en": {
			"title": "Available silicon",
			"subtitle": "Rice and sugarcane ask more often. Not a cure-all.",
			"summary": "Available Si is what the root can touch. Grasses care more. Soft stems are a clue, not a spray that replaces the soil.",
			"appearance": "The sheet says available silicon, often mg/kg. Methods differ — don’t mix labs.",
			"conditions": "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"commonCrops": "Grain, vegetables and fruit all live on this meat. Sand drops it faster.",
			"fieldCheck": "Rice that lodges and stays diseased is when people ask Si. Still read N, water and roots first.",
			"longform": ["Silicon helps grasses. It does not replace drainage or nitrogen.", "Rates from the label and the station. This page does not hand a bag count."],
			"confuse": [{
				"lookalike": "Texture is sand or clay, bulk density is",
				"difference": "Texture is sand or clay, bulk density is tightness. Organic matter is meat.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Dark colour means high OM",
				"difference": "Dark is not a lab number. A handful that holds then breaks is more honest.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product. Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"natural": ["Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.", "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work."],
			"human": ["Expecting a microbe bag to rebuild meat in one season.", "Hauling all the straw off, then blaming thin soil."],
			"steps": [
				"Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
				"Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
				"Organic matter is the soil’s reserve and buffer, not the name of a microbial product. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Don’t treat Si as a pesticide.",
				"Don’t mix lab methods.",
				"Don’t skip N, water and roots."
			],
			"whenToTest": "Pale powdery soil whose fertiliser evaporates — test organic matter.",
			"prevention": ["Return straw if you can. Bare winters drop the meat.", "Expecting a microbe bag to rebuild meat in one season."],
			"indicators": [{
				"name": "Organic matter",
				"meaning": "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline measurement. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}],
			"aka": "available Si, available silica",
			"ratioNote": "Total Si and available Si are different cells. Acid soils often test lower.",
			"readTable": [{
				"label": "Available Si mg/kg (sketch)",
				"low": "Rice stems go soft",
				"mid": "Enough for many paddies",
				"high": "More is not a yield switch"
			}],
			"spoken": [
				"Available silicon — rice asks more often.",
				"Total Si is a different cell.",
				"Acid soils often test lower.",
				"Silicon is not a pesticide."
			]
		}
	}
};
var lab_groups_default = [
	{
		"id": "ruler",
		"title": "单子上的测量",
		"titleEn": "The measurements",
		"ids": [
			"ph",
			"ec",
			"salt",
			"om",
			"texture",
			"cec",
			"aggregate",
			"porosity",
			"fc"
		]
	},
	{
		"id": "nutrient",
		"title": "养分",
		"titleEn": "Nutrients",
		"ids": [
			"n",
			"alkn",
			"p",
			"avp",
			"k",
			"avk",
			"ca",
			"mg",
			"fe",
			"mn",
			"zn",
			"b",
			"s",
			"cu",
			"mo",
			"si"
		]
	},
	{
		"id": "ion",
		"title": "伤根的离子",
		"titleEn": "Root-injuring ions",
		"ids": [
			"al",
			"na",
			"esp",
			"cl"
		]
	},
	{
		"id": "check",
		"title": "检测与障碍",
		"titleEn": "Tests and trouble",
		"ids": [
			"bulk",
			"test",
			"acid",
			"saline",
			"compaction",
			"gley",
			"replant"
		]
	}
];
var lab_units_default = {
	ph: {
		"zh": "无量纲。水土比常见 1:2.5 或 1:1，看单子注明，别跨实验室硬比。",
		"en": "Dimensionless. Soil:water is often 1:2.5 or 1:1 — read the note, don’t mix labs."
	},
	ec: {
		"zh": "常见 mS/cm 或 dS/m，也有 μS/cm。水土比不同，水土比不同，数字不能直接对打。",
		"en": "Often mS/cm or dS/m, sometimes μS/cm. Different soil:water ratios are not the same number."
	},
	salt: {
		"zh": "常见 g/kg 或 %。和 EC 一起看咸。",
		"en": "Often g/kg or %. Read with EC."
	},
	om: {
		"zh": "常见 g/kg。有的实验室写 %。",
		"en": "Often g/kg; some labs use %."
	},
	texture: {
		"zh": "沙 / 壤 / 黏，或卡氏三角的名称。不是一个公斤数。",
		"en": "Sand / loam / clay, or a texture-triangle name — not a kg figure."
	},
	cec: {
		"zh": "常见 cmol/kg 或 cmol(+) / kg。",
		"en": "Often cmol/kg."
	},
	aggregate: {
		"zh": "多为描述或稳定性分级，不是处方袋数。",
		"en": "Usually a description or stability class."
	},
	porosity: {
		"zh": "常用 %。",
		"en": "Usually %."
	},
	fc: {
		"zh": "常用 % 或 g/g。过了这条线就是涝。",
		"en": "Usually % or g/g. Past the line is waterlog."
	},
	n: {
		"zh": "全氮常见 g/kg。别和碱解氮混成一格。",
		"en": "Total N often g/kg. Don’t mix it with available N."
	},
	alkn: {
		"zh": "常见 mg/kg。这是当季能用的氮，不是库里全部。",
		"en": "Often mg/kg. This season’s N, not the whole warehouse."
	},
	p: {
		"zh": "全磷常见 g/kg。有效磷才是根能摸到的。",
		"en": "Total P often g/kg. Available P is what the root can touch."
	},
	avp: {
		"zh": "常见 mg/kg。方法（Olsen 等）写在单子上。",
		"en": "Often mg/kg. The method (Olsen etc.) is on the sheet."
	},
	k: {
		"zh": "全钾常见 g/kg。",
		"en": "Total K often g/kg."
	},
	avk: {
		"zh": "常见 mg/kg。",
		"en": "Often mg/kg."
	},
	ca: {
		"zh": "常见 cmol/kg 或 mg/kg。",
		"en": "Often cmol/kg or mg/kg."
	},
	mg: {
		"zh": "常见 cmol/kg 或 mg/kg。",
		"en": "Often cmol/kg or mg/kg."
	},
	fe: {
		"zh": "有效铁常见 mg/kg。",
		"en": "Available Fe often mg/kg."
	},
	mn: {
		"zh": "有效锰常见 mg/kg。",
		"en": "Available Mn often mg/kg."
	},
	zn: {
		"zh": "有效锌常见 mg/kg。",
		"en": "Available Zn often mg/kg."
	},
	b: {
		"zh": "有效硼常见 mg/kg。缺和毒只隔一层纸。",
		"en": "Available B often mg/kg. Deficiency and toxicity are close."
	},
	s: {
		"zh": "有效硫常见 mg/kg。",
		"en": "Available S often mg/kg."
	},
	cu: {
		"zh": "有效铜常见 mg/kg。",
		"en": "Available Cu often mg/kg."
	},
	mo: {
		"zh": "有效钼常见 mg/kg。微量，加倍会出事。",
		"en": "Available Mo often mg/kg. A trace — doubling hurts."
	},
	al: {
		"zh": "交换性铝常见 cmol/kg。pH 低了它才活跃。",
		"en": "Exchangeable Al often cmol/kg. It becomes active when pH is low."
	},
	na: {
		"zh": "交换性钠常见 cmol/kg；碱化度 ESP 常用 %。",
		"en": "Exchangeable Na often cmol/kg; ESP is usually %."
	},
	bulk: {
		"zh": "常见 g/cm³。耕层过大说明紧。",
		"en": "Often g/cm³. High in the tilled layer means tight."
	},
	test: {
		"zh": "配方本身没有单位。先看取样深度和水土比。",
		"en": "The recipe has no unit. Read sampling depth and the soil:water ratio first."
	},
	acid: {
		"zh": "酸化是判断，不是单子上的一格。对着 pH 和交换性铝看。",
		"en": "Acidification is a reading, not one cell. Pair pH and exchangeable Al."
	},
	saline: {
		"zh": "盐碱是判断。盐害看 EC/全盐，碱害看 pH 和钠。",
		"en": "A reading: salt is EC; alkali is pH and sodium."
	},
	compaction: {
		"zh": "对着容重、孔隙和刨坑看，不是一袋肥的单位。",
		"en": "Read bulk density, pores and a dug pit — not a bag of fertiliser."
	},
	gley: {
		"zh": "潜育是判断。对着渍水和青灰色看。",
		"en": "A reading: standing water and blue-grey soil."
	},
	replant: {
		"zh": "连作是判断。菌剂没有标准单位能替代轮作。",
		"en": "A reading. A microbe bag has no unit that replaces rotation."
	},
	esp: {
		"zh": "碱化度 ESP 常用 %。SAR 无量纲。和交换性钠、CEC 一起看。",
		"en": "ESP is usually %. SAR is dimensionless. Read with exchangeable Na and CEC."
	},
	cl: {
		"zh": "氯离子常见 mg/kg 或 cmol/kg。和全盐、EC 一起看咸。",
		"en": "Chloride often mg/kg or cmol/kg. Read with total salt and EC."
	},
	si: {
		"zh": "有效硅常见 mg/kg。水稻、甘蔗更常看这一格。",
		"en": "Available Si often mg/kg. Rice and sugarcane look here more often."
	}
};
var WIKI = wiki_default;
var LAB_GROUPS = lab_groups_default;
var LAB_UNITS = lab_units_default;
var TERMS = Object.values(WIKI);
function getTerm(id) {
	return WIKI[id];
}
function localizeWikiPhotos(term, lang, title) {
	return term.photos.map((p) => {
		if (lang !== "en") return p;
		const close = /特写/.test(p.alt) || /特写/.test(p.caption);
		return {
			...p,
			alt: close ? `${title} close-up` : `${title} field check`,
			caption: close ? "A close-up check. Trust your own field." : "What this cell looks like on a sheet. Field photo to be added."
		};
	});
}
function localizeTerm(term, lang) {
	const raw = lang === "en" ? term.en : term.zh;
	const copy = lang === "en" ? {
		...raw,
		title: cleanEn(raw.title),
		subtitle: cleanEn(raw.subtitle),
		summary: cleanEn(raw.summary),
		appearance: cleanEn(raw.appearance),
		conditions: cleanEn(raw.conditions),
		commonCrops: cleanEn(raw.commonCrops),
		fieldCheck: cleanEn(raw.fieldCheck),
		longform: cleanEnArr(raw.longform),
		plainExplain: cleanEn(raw.plainExplain),
		natural: cleanEnArr(raw.natural),
		human: cleanEnArr(raw.human),
		steps: cleanEnArr(raw.steps),
		dontDo: cleanEnArr(raw.dontDo),
		whenToTest: cleanEn(raw.whenToTest),
		prevention: cleanEnArr(raw.prevention),
		aka: raw.aka ? cleanEn(raw.aka) : raw.aka,
		spoken: cleanEnArr(raw.spoken)
	} : raw;
	const unit = LAB_UNITS[term.id];
	return {
		...copy,
		id: term.id,
		photos: localizeWikiPhotos(term, lang, copy.title),
		relatedSlugs: term.relatedSlugs,
		bvid: term.bvid,
		videoTitle: term.videoTitle,
		unit: lang === "en" ? cleanEn(unit?.en ?? "") : unit?.zh ?? ""
	};
}
function searchTerms(q) {
	const raw = q.trim();
	const h = raw.toLowerCase().replace(/\s+/g, "");
	if (!h) return TERMS;
	const phNum = /ph\s*\d/.test(raw.toLowerCase()) || h.includes("ph5") || h.includes("酸碱");
	return TERMS.filter((t) => {
		const aka = `${t.zh.aka ?? ""} ${t.en.aka ?? ""}`.toLowerCase();
		const blob = foldTerm(t);
		if (phNum && t.id === "ph") return true;
		if (h.includes("碱解氮") && t.id === "alkn") return true;
		if ((h.includes("交换性钠") || h === "na") && t.id === "na") return true;
		return t.id.includes(h) || blob.includes(h) || aka.replace(/\s+/g, "").includes(h) || t.zh.title.toLowerCase().includes(raw.toLowerCase()) || t.en.title.toLowerCase().includes(h) || t.zh.summary.includes(raw) || t.en.summary.toLowerCase().includes(h) || t.zh.appearance.includes(raw) || (t.zh.aka ?? "").toLowerCase().includes(h) || (t.en.aka ?? "").toLowerCase().includes(h);
	});
}
function foldTerm(t) {
	return `${t.id}${t.zh.title}${t.en.title}${t.zh.aka ?? ""}${t.en.aka ?? ""}${t.zh.summary}${t.zh.appearance}`.toLowerCase().replace(/\s+/g, "");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/KnowledgeVideo-BK3-3QZ5.js
var KEY = "tuzhi-photo-drafts";
function ContributePhoto({ slug, part }) {
	const t = messages[usePathLang()].knowledge;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [crop, setCrop] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	function save() {
		const row = {
			slug: slug || "",
			part: part || "",
			crop,
			place,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			license: "learning"
		};
		try {
			const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
			localStorage.setItem(KEY, JSON.stringify([...prev, row].slice(-40)));
		} catch {}
		setDone(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-sm text-forest underline",
			onClick: () => setOpen((v) => !v),
			children: t.contribute
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-2 space-y-2",
			onSubmit: (e) => {
				e.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t.contributeHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: crop,
					onChange: (e) => setCrop(e.target.value),
					placeholder: t.contributeCrop,
					className: "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: place,
					onChange: (e) => setPlace(e.target.value),
					placeholder: t.contributePlace,
					className: "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: t.contributePart
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "inline-flex min-h-11 items-center rounded-lg bg-forest px-4 text-sm text-forest-fg",
					children: t.contributeSend
				}),
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-forest",
					children: t.contributeOk
				}) : null
			]
		}) : null]
	});
}
var KIND_NOTE_ONCE = "tuzhi-kind-note";
function PhotoGallery({ photos, slug, tall }) {
	const t = messages[usePathLang()].knowledge;
	const [open, setOpen] = (0, import_react.useState)(null);
	const closeRef = (0, import_react.useRef)(null);
	const shown = photos.filter((p) => p.kind !== "missing" && p.src);
	const missing = photos.filter((p) => p.kind === "missing" || !p.src);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.activeElement;
		closeRef.current?.focus();
		function onKey(e) {
			if (e.key === "Escape") setOpen(null);
		}
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("keydown", onKey);
			prev?.focus?.();
		};
	}, [open]);
	function kindNote(p) {
		if (p.kind === "lab") return t.photoKindLab;
		if (p.kind === "diagram" || p.kind === "stock") return t.photoKindDiagram;
		return "";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "overflow-hidden rounded-xl border border-line bg-surface-2",
				onClick: () => setOpen(p),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.src,
					alt: p.alt,
					className: tall ? "h-56 w-full object-cover lg:h-[280px] lg:min-h-[280px]" : "h-56 w-full object-cover",
					loading: "lazy",
					width: 400,
					height: tall ? 280 : 224
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block p-2 text-left text-sm text-muted",
					children: [p.caption.replace(/示意图，不能单凭此图下肥。?/g, "").trim(), kindNote(p) && !/实验室对照|不是自家地头|不是地头|lab check|not your own field|not a neighbour ridge/i.test(p.caption) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-subtle",
						children: kindNote(p)
					}) : null]
				})]
			}, p.src)), missing.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-dashed border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-32 place-items-center rounded-lg bg-surface-2 text-sm text-muted",
						children: t.missingShot
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: p.caption || t.pendingPhoto
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributePhoto, {
						slug,
						part: p.alt
					})
				]
			}, `${p.alt}-${i}`))]
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 top-0 z-50 grid min-h-dvh place-items-center bg-ink/80 p-4",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": open.alt || open.caption,
			onClick: () => setOpen(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-h-[90dvh] max-w-full",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: open.src,
					alt: open.alt,
					className: "max-h-[90dvh] max-w-full rounded-xl object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeRef,
					type: "button",
					"aria-label": "Close",
					className: "absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-forest px-3 text-sm font-medium text-forest-fg",
					onClick: () => setOpen(null),
					children: "×"
				})]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			"data-kind-note": KIND_NOTE_ONCE,
			children: t.photoKindDiagram
		})
	] });
}
var DATA = {
	articles: /* @__PURE__ */ JSON.parse("{\"suan-hua\":{\"bvid\":\"BV1hM411z71g\",\"biliTitle\":\"土壤酸化是如何形成的？\",\"youtube\":\"wHq_qJceRiY\",\"why\":\"Oregon State Soil Science – Acidification. Strong match to acid soil.\",\"queries\":[]},\"yan-jian\":{\"bvid\":\"BV1zU4y1b7eg\",\"biliTitle\":\"土壤盐渍化\",\"youtube\":\"tkKzf9MFz54\",\"why\":\"University of Nevada salinity lecture: white salt crust, sodic structure.\",\"queries\":[]},\"ban-jie\":{\"bvid\":\"BV1po4y1W7Fv\",\"biliTitle\":\"农田土壤板结的原因（二）\",\"youtube\":\"JcwQr-bQrKI\",\"why\":\"Teagasc David Wall: compacted layer, subsoil when dry enough to crack.\",\"queries\":[]},\"you-ji-zhi\":{\"bvid\":\"BV1Si421h7bY\",\"biliTitle\":\"如何给土壤加有机质\",\"youtube\":\"qekb-ppPMfY\",\"why\":\"Colorado State Extension: soil organic matter.\",\"queries\":[]},\"que-dan\":{\"bvid\":\"BV1hV4y1o7NV\",\"biliTitle\":\"常见作物的缺素症（一）\",\"youtube\":\"Ily4bTdLDbw\",\"why\":\"SUNUPTV: nitrogen / phosphorus / potassium deficiency.\",\"queries\":[]},\"que-jia\":{\"bvid\":\"BV1aV4y1o7r9\",\"biliTitle\":\"常见作物的缺素症（二）\",\"youtube\":\"ywdwj4uiGmw\",\"why\":\"Potassium deficiency in crops, extension lecture.\",\"queries\":[]},\"que-lin\":{\"bvid\":\"BV1jvtK6DE43\",\"biliTitle\":\"如何判断你的植物需要施肥？植物营养缺乏识别基本指南\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺磷” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-tie\":{\"bvid\":\"BV1cN4y1g742\",\"biliTitle\":\"叶片发黄，叶脉深绿，缺铁or缺镁？\",\"youtube\":\"681_cDFHQp0\",\"why\":\"pH lock and iron chlorosis, not missing iron bags.\",\"queries\":[]},\"que-xin\":{\"bvid\":\"BV1uCedeDEFn\",\"biliTitle\":\"植物缺锌症状与锌肥补充\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺锌” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"lian-zuo\":{\"bvid\":\"BV1Xo4y1H7W5\",\"biliTitle\":\"土壤连作障碍的定义及危害\",\"youtube\":null,\"why\":\"Searched English extension lectures for “连作障碍” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"dashe-yanzhi\":{\"bvid\":\"BV1QY4y1d7CR\",\"biliTitle\":\"设施蔬菜生产中土壤盐渍化、重金属污染及农药残留的危害\",\"youtube\":\"1xJ3hz4zXZw\",\"why\":\"White salt crust from fertiliser and evaporation. Greenhouse-specific English lecture not found; this is the closest honest visual of white crust. Marked as related-not-greenhouse-only.\",\"queries\":[]},\"shao-gen\":{\"bvid\":\"BV1yB4y1Y74z\",\"biliTitle\":\"到底什么是肥害和烧根？一个视频全讲清！\",\"youtube\":\"V1xDvuH-eQE\",\"why\":\"Fertilizer mistakes / fertilizer burn on seedlings.\",\"queries\":[]},\"lao-hai\":{\"bvid\":\"BV16P411r738\",\"biliTitle\":\"地理小知识——水稻土\",\"youtube\":\"P0W0D01De_s\",\"why\":\"Flooding stress in rice: waterlogging in the root zone.\",\"queries\":[]},\"wei-sheng-wu\":{\"bvid\":\"BV1PQ4y1i7eD\",\"biliTitle\":\"【实验】土壤微生物的分离与观察\",\"youtube\":null,\"why\":\"Searched English extension lectures for “土壤微生物失衡” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"ce-tu-bao-gao\":{\"bvid\":\"BV13E421M7Ly\",\"biliTitle\":\"测土配方，科学施肥\",\"youtube\":\"HYrkcfE62Pg\",\"why\":\"University extension: how to interpret a soil test.\",\"queries\":[]},\"ce-tu-qu-yang\":{\"bvid\":\"BV1kZfsBdEBc\",\"biliTitle\":\"土壤采样技术规范及要点\",\"youtube\":\"HYrkcfE62Pg\",\"why\":\"Same film frames why the number depends on how you sampled. Dedicated sampling-only English film not stronger.\",\"queries\":[]},\"que-gai\":{\"bvid\":\"BV1YT411b7bA\",\"biliTitle\":\"想要瓜果长得好 钙肥硼肥不能少 缺硼缺钙容易落花落果 裂果\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺钙” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-mei\":{\"bvid\":\"BV1mHaMekEkU\",\"biliTitle\":\"作物缺镁的症状及解决方法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺镁” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-peng\":{\"bvid\":\"BV1mfYYe7EKH\",\"biliTitle\":\"植物缺素，硼元素，硼肥缺失，硼肥补充\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺硼” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-meng\":{\"bvid\":\"BV1z1eoeMEHR\",\"biliTitle\":\"植物缺素的症状，缺锰的症状与锰肥补充\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺锰” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-liu\":{\"bvid\":\"BV1hV4y1o7NV\",\"biliTitle\":\"常见作物的缺素症（一）\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺硫” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-tong\":{\"bvid\":\"BV1YNhueJEBd\",\"biliTitle\":\"钼肥的重要性\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺铜” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-mu\":{\"bvid\":\"BV1YNhueJEBd\",\"biliTitle\":\"钼肥的重要性\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺钼” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yang-fen-kang-kang\":{\"bvid\":\"BV14G4y1x79n\",\"biliTitle\":\"测土配方施肥技术\",\"youtube\":null,\"why\":\"Searched English extension lectures for “养分互相打架” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yao-hai\":{\"bvid\":\"BV1dH4y1j7TG\",\"biliTitle\":\"作物出现药害怎么办？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “药害” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"miao-qi-fei-hai\":{\"bvid\":\"BV1yB4y1Y74z\",\"biliTitle\":\"到底什么是肥害和烧根？一个视频全讲清！\",\"youtube\":null,\"why\":\"Searched English extension lectures for “苗期肥害” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"an-hai\":{\"bvid\":\"BV1Tm411z78B\",\"biliTitle\":\"尿素与氨\",\"youtube\":null,\"why\":\"Searched English extension lectures for “氨气烧叶烧根” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"lv-hai\":{\"bvid\":\"BV1aV4y1o7r9\",\"biliTitle\":\"常见作物的缺素症（二）\",\"youtube\":null,\"why\":\"Searched English extension lectures for “氯害” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"di-guan-nong-du\":{\"bvid\":\"BV1EkeaePEzk\",\"biliTitle\":\"揭秘水肥一体化工作原理\",\"youtube\":null,\"why\":\"Searched English extension lectures for “滴灌肥水太浓” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"wei-fu-shu-you-ji-fei\":{\"bvid\":\"BV1i3411m7vT\",\"biliTitle\":\"鸡粪如何快速腐熟？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “未腐熟有机肥” / 肥害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"fan-yan\":{\"bvid\":\"BV1Cs4y1i7gU\",\"biliTitle\":\"地理小知识——土壤盐渍化\",\"youtube\":\"tkKzf9MFz54\",\"why\":\"Same salinity lecture covers evaporation bringing salt to the surface.\",\"queries\":[]},\"shi-hui-xing-tu\":{\"bvid\":\"BV1cN4y1g742\",\"biliTitle\":\"叶片发黄，叶脉深绿，缺铁or缺镁？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “石灰性土壤” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"shi-gao-gai-jian\":{\"bvid\":\"BV1eF4m1c79o\",\"biliTitle\":\"央视《盐碱地上的生机》盐碱化的治理措施\",\"youtube\":null,\"why\":\"Searched English extension lectures for “石膏改碱和洗盐” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"sha-tu-lou-fei\":{\"bvid\":\"BV12bbaz9EcV\",\"biliTitle\":\"改良土壤排水透气，不容易板结烂根\",\"youtube\":null,\"why\":\"Searched English extension lectures for “沙土漏肥漏水” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"nian-tu-nan-geng\":{\"bvid\":\"BV1su4y1f73T\",\"biliTitle\":\"堆肥后土太黏，怎么办？土壤改良万用公式\",\"youtube\":null,\"why\":\"Searched English extension lectures for “黏土难耕又易裂” / 板结. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"li-di-ceng\":{\"bvid\":\"BV1kB4y1y7Rh\",\"biliTitle\":\"有效打破犁底层可以助作物防涝抗旱\",\"youtube\":\"JcwQr-bQrKI\",\"why\":\"Same film is about the pan below the plough layer.\",\"queries\":[]},\"hei-tu-tui-hua\":{\"bvid\":\"BV1HP411L7FE\",\"biliTitle\":\"世界上仅有的3块黑土地\",\"youtube\":null,\"why\":\"Searched English extension lectures for “东北黑土变瘦变硬” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"jie-gan-huan-tian\":{\"bvid\":\"BV15z4y1Y7fx\",\"biliTitle\":\"秸秆还田的方法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “秸秆还田” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"shi-hui-yong-liang\":{\"bvid\":\"BV1oqEt6xEeM\",\"biliTitle\":\"【农业基础】石灰的作用\",\"youtube\":\"qlyeiIBg8Fo\",\"why\":\"TSU Extension Soil Smarts Episode 4: Liming the Soil.\",\"queries\":[]},\"xiu-shui-tian\":{\"bvid\":\"BV1w24y1s7V4\",\"biliTitle\":\"青岗泥，冷浸田\",\"youtube\":null,\"why\":\"Searched English extension lectures for “锈水田、亚铁毒” / 酸化. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"qian-yu-tian\":{\"bvid\":\"BV1w24y1s7V4\",\"biliTitle\":\"青岗泥，冷浸田\",\"youtube\":null,\"why\":\"Searched English extension lectures for “冷浸田、潜育化” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"shui-tian-huan-yuan\":{\"bvid\":\"BV16GrdYqECv\",\"biliTitle\":\"水稻土，对土壤的改良\",\"youtube\":null,\"why\":\"Searched English extension lectures for “水田还原障碍” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"gen-fu-jian-bie\":{\"bvid\":\"BV1fQgE61EQz\",\"biliTitle\":\"作物莫名蔫棵死棵？分不清根腐还是枯萎？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “根腐还是土问题” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"huang-ye-jian-bie\":{\"bvid\":\"BV118411T7F1\",\"biliTitle\":\"农作物缺素图谱大全\",\"youtube\":null,\"why\":\"Searched English extension lectures for “黄叶鉴别” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"han-yan-jian-bie\":{\"bvid\":\"BV18N411N7ce\",\"biliTitle\":\"土壤盐渍化形成的自然原因\",\"youtube\":null,\"why\":\"Searched English extension lectures for “旱了还是咸了” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"cha-yuan-guo-suan\":{\"bvid\":\"BV1Az4y157io\",\"biliTitle\":\"土壤为什么会酸化？如何判断？\",\"youtube\":\"wHq_qJceRiY\",\"why\":\"Mechanism of acidification and Al; tea-specific English lecture not found. Used the mechanism film, not a tea-to-neutral recipe.\",\"queries\":[]},\"ma-ling-shu-tu\":{\"bvid\":\"BV1Vj411H7xm\",\"biliTitle\":\"马铃薯疮痂病粉痂病全流程防治方案\",\"youtube\":null,\"why\":\"Searched English extension lectures for “马铃薯疮痂和偏碱土壤” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"sheng-wu-you-ji-fei\":{\"bvid\":\"BV1f1tA6jEEe\",\"biliTitle\":\"畜禽粪便无害化处理：有机肥堆肥技术\",\"youtube\":null,\"why\":\"Searched English extension lectures for “生物有机肥怎么用才不是安慰剂” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"guo-yuan-tu-rang\":{\"bvid\":\"BV1fa4y1G7RR\",\"biliTitle\":\"绿肥：大面积改良土壤的简单有效的方法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “果园土壤培肥” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"da-peng-lian-zuo-zong-he\":{\"bvid\":\"BV1QmXdBGESj\",\"biliTitle\":\"连作障碍有三怪\",\"youtube\":null,\"why\":\"Searched English extension lectures for “大棚越种越差” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"hong-huang-rang-gai-suan\":{\"bvid\":\"BV12a411M7yK\",\"biliTitle\":\"中国近30年土壤酸化堪比过去1000年\",\"youtube\":\"cjWneDQVyV8\",\"why\":\"Same MSU acid-soil / liming extension piece; red-yellow earth chapter is still acidification + lime.\",\"queries\":[]},\"lv-du-shang-gen\":{\"bvid\":\"BV1G2cJeTELe\",\"biliTitle\":\"酸性土壤条件下，根际细菌群可有效提高水稻铝毒及低磷耐受性\",\"youtube\":\"wHq_qJceRiY\",\"why\":\"Oregon State Soil Science — Acidification: H ions, toxic Al, lime as carbonate. Strong match to aluminium toxicity.\",\"queries\":[]},\"suan-yu-que-gai\":{\"bvid\":\"BV1oe4y1r7rb\",\"biliTitle\":\"3分钟弄懂糖醇钙、EDTA螯合钙\",\"youtube\":null,\"why\":\"Searched English extension lectures for “土酸和缺钙一起到” / 酸化. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"suan-tu-shi-lin\":{\"bvid\":\"BV1MK4y1X7AS\",\"biliTitle\":\"测土配方精准施肥\",\"youtube\":null,\"why\":\"Searched English extension lectures for “酸性土磷被锁” / 酸化. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"sheng-li-suan-xing-fei\":{\"bvid\":\"BV1hM411z71g\",\"biliTitle\":\"土壤酸化是如何形成的？（农业土壤）\",\"youtube\":\"cjWneDQVyV8\",\"why\":\"MSU piece covers fertiliser-driven acidification.\",\"queries\":[]},\"cha-yuan-shi-hui-jin-ji\":{\"bvid\":\"BV1Az4y157io\",\"biliTitle\":\"怎么防止土壤酸化\",\"youtube\":null,\"why\":\"Searched English extension lectures for “茶园石灰禁忌” / 酸化. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"su-da-yan-jian\":{\"bvid\":\"BV1gL4y1u718\",\"biliTitle\":\"盐碱地，如何形成的？我国竟有近15亿亩\",\"youtube\":\"tkKzf9MFz54\",\"why\":\"Lecture separates saline (white crust) vs sodic (structure). Strong.\",\"queries\":[]},\"bin-hai-yan-tu\":{\"bvid\":\"BV1GoDtYKE4B\",\"biliTitle\":\"垦利滨海盐碱地治理与利用\",\"youtube\":\"tkKzf9MFz54\",\"why\":\"Coastal/arid salinity management in the same lecture. No stronger coastal-China English film found.\",\"queries\":[]},\"wei-xian-shui-guan-gai\":{\"bvid\":\"BV13MrQBPEuq\",\"biliTitle\":\"盐碱地治理 / 咸水结冰灌溉法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “微咸水灌溉” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"di-biao-fu-yan\":{\"bvid\":\"BV1Cs4y1i7gU\",\"biliTitle\":\"地理小知识——土壤盐渍化\",\"youtube\":null,\"why\":\"Searched English extension lectures for “地表覆膜返盐” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yan-jian-di-xuan-zuo\":{\"bvid\":\"BV1z2SRBVEJK\",\"biliTitle\":\"盐碱地长不出丰硕的果实\",\"youtube\":null,\"why\":\"Searched English extension lectures for “盐碱地适种什么” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"xi-yan-pai-shui\":{\"bvid\":\"BV1eF4m1c79o\",\"biliTitle\":\"盐碱化的治理措施\",\"youtube\":\"tkKzf9MFz54\",\"why\":\"Leaching requires drainage — stated in this lecture.\",\"queries\":[]},\"da-peng-huan-tu-xi-yan\":{\"bvid\":\"BV1QY4y1d7CR\",\"biliTitle\":\"设施蔬菜土壤盐渍化\",\"youtube\":null,\"why\":\"Searched English extension lectures for “大棚换土还是洗盐” / 盐碱. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"xuan-geng-bian-qian\":{\"bvid\":\"BV15J4m1A7d4\",\"biliTitle\":\"土壤板结都是怎么形成的?\",\"youtube\":\"iwpbenKur8U\",\"why\":\"Plough pan from repeated tillage at one depth.\",\"queries\":[]},\"shen-song-shi-ji\":{\"bvid\":\"BV13x411E7VU\",\"biliTitle\":\"深松翻转犁\",\"youtube\":\"JcwQr-bQrKI\",\"why\":\"Sets depth just below the pan, dry window.\",\"queries\":[]},\"tu-rang-tuan-ju-ti\":{\"bvid\":\"BV1184y1z7LV\",\"biliTitle\":\"土壤板结硬邦邦，怎么办？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “团聚体碎了” / 板结. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"ji-ya-che-zhe\":{\"bvid\":\"BV1po4y1W7Fv\",\"biliTitle\":\"农田土壤板结的原因（二）\",\"youtube\":\"iwpbenKur8U\",\"why\":\"Lecture 16 soil compaction identification: traffic pans, machinery passes. Strong.\",\"queries\":[]},\"ban-jie-yu-gen-xi\":{\"bvid\":\"BV1oUVG6NEmF\",\"biliTitle\":\"一分钟了解土壤板结\",\"youtube\":null,\"why\":\"Searched English extension lectures for “板结和浅根互相反馈” / 板结. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"fu-gai-gai-zhi-di\":{\"bvid\":\"BV12bbaz9EcV\",\"biliTitle\":\"配土提高排水透气性，不容易板结\",\"youtube\":null,\"why\":\"Searched English extension lectures for “地膜/秸秆覆盖能不能把板结土养松” / 板结. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"lv-fei-fan-ya\":{\"bvid\":\"BV1fa4y1G7RR\",\"biliTitle\":\"绿肥：大面积改良土壤\",\"youtube\":null,\"why\":\"Searched English extension lectures for “绿肥翻压” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"sheng-wu-tan\":{\"bvid\":\"BV1V94y1a73M\",\"biliTitle\":\"三分钟了解什么是生物炭\",\"youtube\":null,\"why\":\"Searched English extension lectures for “生物炭” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"you-ji-fei-ru-he-xuan\":{\"bvid\":\"BV1GY4y1D7kf\",\"biliTitle\":\"教你怎么发酵鸡粪有机肥\",\"youtube\":null,\"why\":\"Searched English extension lectures for “有机肥怎么选” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"jie-gan-bu-dan\":{\"bvid\":\"BV1R2LwzXEVu\",\"biliTitle\":\"秸秆还田的意义\",\"youtube\":null,\"why\":\"Searched English extension lectures for “秸秆还田必须补氮的账怎么算” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"hei-tu-you-ji-zhi-shou-hu\":{\"bvid\":\"BV1e44y1h7Mh\",\"biliTitle\":\"秸秆生物炭的制备、性能及其在黑土资源保护中的应用\",\"youtube\":null,\"why\":\"Searched English extension lectures for “黑土有机质掉得快，怎么守” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"sha-tu-zeng-you-ji-zhi\":{\"bvid\":\"BV1sA411r7Ts\",\"biliTitle\":\"增加土壤有机质，快速有效的好方法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “沙土增有机质” / 有机质低. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-xin-yu-lin\":{\"bvid\":\"BV1uCedeDEFn\",\"biliTitle\":\"植物缺锌症状与锌肥补充\",\"youtube\":null,\"why\":\"Searched English extension lectures for “缺锌常被高磷掩盖” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"que-peng-hua-er-bu-shi\":{\"bvid\":\"BV1gQgHzWEEr\",\"biliTitle\":\"番茄缺硼症的识别与防治\",\"youtube\":null,\"why\":\"Searched English extension lectures for “花而不实先查硼，也要查旱和盐” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"qi-zi-huang-hua\":{\"bvid\":\"BV1haJAzoEvS\",\"biliTitle\":\"葡萄叶片黄化原因知多少\",\"youtube\":null,\"why\":\"Searched English extension lectures for “柑橘黄化” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"pu-tao-shi-hui-tu-que-tie\":{\"bvid\":\"BV1haJAzoEvS\",\"biliTitle\":\"葡萄叶片黄化原因知多少\",\"youtube\":null,\"why\":\"Searched English extension lectures for “葡萄石灰土黄叶” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"hua-sheng-kong-jia\":{\"bvid\":\"BV1YT411b7bA\",\"biliTitle\":\"缺硼缺钙容易落花落果 裂果\",\"youtube\":null,\"why\":\"Searched English extension lectures for “花生空荚” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"ye-cai-xiao-xing-yuan-su\":{\"bvid\":\"BV1544tzXEL4\",\"biliTitle\":\"植物缺各类元素判断与补充方法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “叶菜微量元素” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"shui-dao-jiang-miao\":{\"bvid\":\"BV1CP4y1L7o8\",\"biliTitle\":\"什么是僵苗？植物僵苗了怎么办？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “水稻僵苗” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yu-mi-miao-huang\":{\"bvid\":\"BV1zGSqYPEGf\",\"biliTitle\":\"绿植养护小课堂｜看叶子识病变\",\"youtube\":null,\"why\":\"Searched English extension lectures for “玉米苗黄” / 缺素. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"gen-jie-xian-chong\":{\"bvid\":\"BV1RtBsB9EqN\",\"biliTitle\":\"根瘤！根节！根结线虫！应对方法最全最简\",\"youtube\":null,\"why\":\"Searched English extension lectures for “根结线虫” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"tu-chuan-ku-wei\":{\"bvid\":\"BV1vx4y1p7QJ\",\"biliTitle\":\"什么是土传病害?土传病害的解决方案\",\"youtube\":null,\"why\":\"Searched English extension lectures for “土传枯萎” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"qing-ku-bing-tu\":{\"bvid\":\"BV1et42157fX\",\"biliTitle\":\"番茄的青枯病，是最严重的致死性病害\",\"youtube\":null,\"why\":\"Searched English extension lectures for “青枯病土” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"cao-mei-lian-zuo\":{\"bvid\":\"BV1oZo4B2Efh\",\"biliTitle\":\"草莓根腐病的症状、原因和解决办法\",\"youtube\":null,\"why\":\"Searched English extension lectures for “草莓连作” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"ping-guo-zai-zhi\":{\"bvid\":\"BV13t4y1B7UA\",\"biliTitle\":\"连作障碍，导致不能常年种植一种作物\",\"youtube\":null,\"why\":\"Searched English extension lectures for “苹果再植障碍” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"gao-wen-men-peng\":{\"bvid\":\"BV1LG8MzGEa8\",\"biliTitle\":\"高温闷棚这些细节不注意白花钱\",\"youtube\":null,\"why\":\"Searched English extension lectures for “高温闷棚” / 连作障碍. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"han-lao-ji-zhuan\":{\"bvid\":\"BV1kB4y1y7Rh\",\"biliTitle\":\"有效打破犁底层可以助作物防涝抗旱\",\"youtube\":null,\"why\":\"Searched English extension lectures for “旱涝急转” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"di-xia-shui-wei-gao\":{\"bvid\":\"BV16GrdYqECv\",\"biliTitle\":\"水稻土，对土壤的改良\",\"youtube\":null,\"why\":\"Searched English extension lectures for “地下水位高” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yu-hou-ban-jie-kai-lie\":{\"bvid\":\"BV1QE466iEFF\",\"biliTitle\":\"土壤板结开裂这样做\",\"youtube\":null,\"why\":\"Searched English extension lectures for “雨后板结开裂” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"leng-shui-guan-miao\":{\"bvid\":\"BV1CP4y1L7o8\",\"biliTitle\":\"什么是僵苗？植物僵苗了怎么办？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “冷水灌苗” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"yan-jiang-qi-hou-tu\":{\"bvid\":\"BV124hGz3EHn\",\"biliTitle\":\"地理老师摩旅日记:水稻土形成的底层逻辑\",\"youtube\":null,\"why\":\"Searched English extension lectures for “沿江湿地土” / 涝害. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"shui-fei-yi-ti-hua-ec\":{\"bvid\":\"BV14U4y1o7bN\",\"biliTitle\":\"水肥一体化系统介绍\",\"youtube\":null,\"why\":\"Searched English extension lectures for “水肥一体化” / 其他. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"ji-zhi-yu-tu-rang\":{\"bvid\":\"BV1LafAYRE2m\",\"biliTitle\":\"基质蓝莓滴灌施肥各阶段最佳EC值范围\",\"youtube\":null,\"why\":\"Searched English extension lectures for “基质栽培和土壤不是同一套方子” / 其他. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"tu-rang-xiao-du-bian-jie\":{\"bvid\":\"BV19Au16gExA\",\"biliTitle\":\"土壤消毒该怎么做？\",\"youtube\":null,\"why\":\"Searched English extension lectures for “土壤消毒的边界” / 其他. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"jian-yi-ph-ec\":{\"bvid\":\"BV1nu4y1Y7mH\",\"biliTitle\":\"如何用pH试纸测试土壤酸碱度\",\"youtube\":\"C9WVGcU8m5M\",\"why\":\"NRCS/soil science: soil pH definition, methods (1:1 water), EC and ECe not comparable across extracts. Strong for the measurement.\",\"queries\":[]},\"shi-fei-tiao-tu-rang\":{\"bvid\":\"BV14G4y1x79n\",\"biliTitle\":\"测土配方施肥技术\",\"youtube\":null,\"why\":\"Searched English extension lectures for “看叶片能猜肥，不能代替测土” / 其他. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]},\"nan-fang-shui-tian-yang-fen\":{\"bvid\":\"BV124hGz3EHn\",\"biliTitle\":\"水稻土形成的底层逻辑\",\"youtube\":null,\"why\":\"Searched English extension lectures for “南方水田养分” / 其他. Hits were weak (ads, houseplants, unrelated geology) or repeated the same few university films already mapped to closer chapters. Honest empty rather than a weak ID.\",\"queries\":[]}}"),
	wiki: {
		"ph": {
			"bvid": "BV1nu4y1Y7mH",
			"biliTitle": "如何用pH试纸测试土壤酸碱度",
			"youtube": "C9WVGcU8m5M",
			"why": "NRCS soil pH definition and methods. Strong.",
			"queries": []
		},
		"om": {
			"bvid": "BV1Si421h7bY",
			"biliTitle": "如何给土壤加有机质",
			"youtube": "UK_L6xVAw_A",
			"why": "OM on a soil-test sheet. Strong.",
			"queries": []
		},
		"cec": {
			"bvid": "BV1sA411r7Ts",
			"biliTitle": "增加土壤有机质，快速有效的好方法",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"texture": {
			"bvid": "BV12bbaz9EcV",
			"biliTitle": "改良土壤排水透气",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"aggregate": {
			"bvid": "BV1184y1z7LV",
			"biliTitle": "土壤板结硬邦邦，怎么办？",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"n": {
			"bvid": "BV1hV4y1o7NV",
			"biliTitle": "常见作物的缺素症（一）",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"alkn": {
			"bvid": "BV14G4y1x79n",
			"biliTitle": "测土配方施肥技术",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"p": {
			"bvid": "BV1jvtK6DE43",
			"biliTitle": "植物营养缺乏识别基本指南",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"avp": {
			"bvid": "BV1MK4y1X7AS",
			"biliTitle": "测土配方精准施肥",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"k": {
			"bvid": "BV1aV4y1o7r9",
			"biliTitle": "常见作物的缺素症（二）",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"avk": {
			"bvid": "BV15z4y1Y7fx",
			"biliTitle": "秸秆还田的方法",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"ca": {
			"bvid": "BV1YT411b7bA",
			"biliTitle": "缺硼缺钙容易落花落果 裂果",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"al": {
			"bvid": "BV1G2cJeTELe",
			"biliTitle": "酸性土壤条件下水稻铝毒",
			"youtube": "wHq_qJceRiY",
			"why": "OSU acidification / toxic Al. Strong.",
			"queries": []
		},
		"zn": {
			"bvid": "BV1uCedeDEFn",
			"biliTitle": "植物缺锌症状与锌肥补充",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"b": {
			"bvid": "BV1mfYYe7EKH",
			"biliTitle": "植物缺素，硼元素",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"ec": {
			"bvid": "BV1zU4y1b7eg",
			"biliTitle": "土壤盐渍化",
			"youtube": "C9WVGcU8m5M",
			"why": "Same film covers EC vs ECe. Strong.",
			"queries": []
		},
		"salt": {
			"bvid": "BV1Cs4y1i7gU",
			"biliTitle": "地理小知识——土壤盐渍化",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"bulk": {
			"bvid": "BV1kB4y1y7Rh",
			"biliTitle": "有效打破犁底层可以助作物防涝抗旱",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"test": {
			"bvid": "BV13E421M7Ly",
			"biliTitle": "测土配方，科学施肥",
			"youtube": "HYrkcfE62Pg",
			"why": "How to interpret a soil test. Strong.",
			"queries": []
		},
		"saline": {
			"bvid": "BV1gL4y1u718",
			"biliTitle": "盐碱地，如何形成的？",
			"youtube": "tkKzf9MFz54",
			"why": "Nevada salinity lecture. Strong.",
			"queries": []
		},
		"acid": {
			"bvid": "BV1jT6TYXEjx",
			"biliTitle": "如何调理土壤酸化问题？",
			"youtube": "cjWneDQVyV8",
			"why": "MSU acidification. Strong.",
			"queries": []
		},
		"compaction": {
			"bvid": "BV1po4y1W7Fv",
			"biliTitle": "农田土壤板结的原因（二）",
			"youtube": "JcwQr-bQrKI",
			"why": "Teagasc compaction. Strong.",
			"queries": []
		},
		"mg": {
			"bvid": "BV1mHaMekEkU",
			"biliTitle": "作物缺镁的症状及解决方法",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"fe": {
			"bvid": "BV1cN4y1g742",
			"biliTitle": "叶片发黄，叶脉深绿，缺铁or缺镁？",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"mn": {
			"bvid": "BV1z1eoeMEHR",
			"biliTitle": "植物缺素的症状，缺锰的症状与锰肥补充",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"s": {
			"bvid": "BV1544tzXEL4",
			"biliTitle": "植物缺各类元素判断与补充方法",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"cu": {
			"bvid": "BV118411T7F1",
			"biliTitle": "农作物缺素图谱大全",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"mo": {
			"bvid": "BV1YNhueJEBd",
			"biliTitle": "钼肥的重要性",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"porosity": {
			"bvid": "BV1su4y1f73T",
			"biliTitle": "堆肥后土太黏，怎么办？",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"fc": {
			"bvid": "BV1kZfsBdEBc",
			"biliTitle": "测土配方施肥技术",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"gley": {
			"bvid": "BV1w24y1s7V4",
			"biliTitle": "青岗泥，冷浸田",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		},
		"replant": {
			"bvid": "BV1Xo4y1H7W5",
			"biliTitle": "土壤连作障碍的定义及危害",
			"youtube": null,
			"why": "Searched lab-term English lectures (unit, how to read the cell). Most hits were full agronomy courses or ads. Honest empty.",
			"queries": []
		}
	}
};
function articleVideo(slug) {
	return DATA.articles[slug];
}
function wikiVideo(id) {
	return DATA.wiki[id];
}
function biliEmbed(bvid, autoplay = false) {
	return `https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(bvid)}&danmaku=0&autoplay=${autoplay ? 1 : 0}&high_quality=1`;
}
function youtubeEmbed(id, autoplay = false) {
	return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&autoplay=${autoplay ? 1 : 0}`;
}
function realBvid(id) {
	return id && /^BV[0-9A-Za-z]+$/.test(id) ? id : "";
}
function realYt(id) {
	return id && /^[\w-]{11}$/.test(id) ? id : "";
}
function KnowledgeVideo({ slug, kind = "article" }) {
	const lang = usePathLang();
	const t = messages[lang].knowledge;
	const map = kind === "wiki" ? wikiVideo(slug) : articleVideo(slug);
	const bvid = realBvid(map?.bvid);
	const yt = realYt(map?.youtube);
	const [src, setSrc] = (0, import_react.useState)(lang === "en" && yt ? "yt" : bvid ? "bili" : "yt");
	(0, import_react.useEffect)(() => {
		if (lang === "en" && yt) setSrc("yt");
		else if (bvid) setSrc("bili");
		else if (yt) setSrc("yt");
	}, [
		lang,
		slug,
		bvid,
		yt
	]);
	if (!bvid && !yt) return null;
	const usingYt = src === "yt" && yt;
	const embed = usingYt ? youtubeEmbed(yt) : bvid ? biliEmbed(bvid) : yt ? youtubeEmbed(yt) : "";
	if (!embed) return null;
	const title = usingYt ? map?.why || "Lesson video" : map?.biliTitle || t.videos;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: t.videos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: embed,
					title,
					className: "h-full w-full",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
					allowFullScreen: true,
					referrerPolicy: "strict-origin-when-cross-origin"
				}, embed)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [bvid && src !== "bili" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 text-sm",
					onClick: () => setSrc("bili"),
					children: t.switchZh
				}) : null, yt && src !== "yt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 text-sm",
					onClick: () => setSrc("yt"),
					children: t.switchEn
				}) : null]
			})
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-ZFzRiwjx.js
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg font-semibold",
				children: "这一页出了问题 / This page broke"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var COOKIE = "tuzhi-lang";
function readCookie() {
	if (typeof document === "undefined") return null;
	const m = document.cookie.match(/(?:^|; )tuzhi-lang=(zh|en)/);
	return m ? m[1] : null;
}
function writeCookie(lang) {
	if (typeof document === "undefined") return;
	document.cookie = `${COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}
var useLang = create()(persist((set) => ({
	lang: "zh",
	setLang: (lang) => {
		writeCookie(lang);
		set({ lang });
	},
	syncFromPath: (pathname) => {
		const next = langFromPath(pathname);
		writeCookie(next);
		set({ lang: next });
	}
}), {
	name: "tuzhi-lang",
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		if (typeof window !== "undefined") {
			const fromPath = langFromPath(window.location.pathname);
			if (fromPath !== state.lang) {
				state.setLang(fromPath);
				return;
			}
		}
		const cookie = readCookie();
		if (cookie && cookie !== state.lang) state.setLang(cookie);
		else writeCookie(state.lang);
	}
}));
function LanguageToggle() {
	const lang = usePathLang();
	const setLang = useLang((s) => s.setLang);
	const t = messages[lang];
	const next = lang === "zh" ? "en" : "zh";
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.search });
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink",
		"aria-label": t.langSwitchAria,
		onClick: () => {
			setLang(next);
			navigate({
				to: withLangPath(pathname, next),
				search
			});
		},
		children: t.langSwitch
	});
}
var NAV = [
	{
		to: "/",
		key: "home",
		Icon: House
	},
	{
		to: "/diagnose",
		key: "diagnose",
		Icon: ScanLine
	},
	{
		to: "/knowledge",
		key: "knowledge",
		Icon: BookOpen
	},
	{
		to: "/encyclopedia",
		key: "wiki",
		Icon: FlaskConical
	},
	{
		to: "/community",
		key: "community",
		Icon: MessagesSquare
	},
	{
		to: "/me",
		key: "me",
		Icon: UserRound
	}
];
function AuthSlot({ loginLabel }) {
	const { user, isPending } = useCurrentUserState();
	const [waited, setWaited] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setWaited(true), 4e3);
		return () => window.clearTimeout(t);
	}, []);
	if (isPending && !waited) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex min-h-10 min-w-16 items-center rounded-lg bg-surface-2 px-4" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
		to: "/login",
		className: "inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg",
		children: loginLabel
	});
}
function AppShell({ children }) {
	const lang = usePathLang();
	const syncFromPath = useLang((s) => s.syncFromPath);
	const t = messages[lang];
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		syncFromPath(pathname);
	}, [pathname, syncFromPath]);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
	}, [lang]);
	(0, import_react.useEffect)(() => {
		if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register("/sw-tuzhi.js").catch(() => void 0);
	}, []);
	function active(to) {
		const prefix = langFromPath(pathname) === "en" ? "/en" : "";
		const full = to === "/" ? prefix || "/" : `${prefix}${to}`;
		if (to === "/") return pathname === "/" || pathname === "/en";
		return pathname === full || pathname.startsWith(full + "/");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-forest-fg",
				children: lang === "en" ? "Skip to content" : "跳到正文"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-[70rem] items-center gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangLink, {
							to: "/",
							className: "flex shrink-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.png",
								alt: t.name,
								width: 44,
								height: 44,
								className: "size-11 rounded-full"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden leading-tight sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl font-semibold",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm text-muted",
									children: t.tagline
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: n.to,
								className: active(n.to) ? "rounded-lg bg-forest px-3 py-2 text-sm font-medium text-forest-fg" : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink",
								children: t.nav[n.key]
							}, n.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { loginLabel: t.nav.login })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "mx-auto w-full max-w-[70rem] px-4 pb-28 pt-4 md:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto mt-10 max-w-[70rem] border-t border-line px-4 pb-28 pt-6 text-base text-muted md:pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg text-ink",
						children: [
							t.name,
							" · ",
							t.tagline
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: t.footer.maker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-3 flex flex-wrap gap-x-4 gap-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/about",
								className: "text-forest underline",
								children: t.footer.about
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/knowledge",
								className: "text-forest underline",
								children: t.footer.knowledge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/encyclopedia",
								className: "text-forest underline",
								children: t.footer.wiki
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/community",
								className: "text-forest underline",
								children: t.footer.community
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/privacy",
								className: "text-forest underline",
								children: t.footer.privacy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
								to: "/contact",
								className: "text-forest underline",
								children: t.footer.contact
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed",
						children: t.disclaimer
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				"aria-label": t.nav.home,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-lg grid-cols-6",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangLink, {
						to: n.to,
						className: "flex min-h-16 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[11px] font-medium leading-tight " + (active(n.to) ? "text-forest" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.Icon, {
							className: "size-6",
							strokeWidth: active(n.to) ? 2.4 : 1.8
						}), t.nav.short[n.key]]
					}) }, n.to))
				})
			})
		]
	});
}
var styles_default = "/assets/styles-CsoXIJKQ.css";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$32 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: HOME_TITLE },
			{
				name: "theme-color",
				content: "#1F6B4A"
			},
			{
				name: "description",
				content: HOME_DESC
			},
			{
				property: "og:title",
				content: HOME_TITLE
			},
			{
				property: "og:description",
				content: HOME_DESC
			},
			{
				property: "og:url",
				content: `${SITE_ORIGIN}/`
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:locale",
				content: "zh_CN"
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:image",
				content: OG_IMAGE
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: HOME_TITLE
			},
			{
				name: "twitter:description",
				content: HOME_DESC
			},
			{
				name: "twitter:image",
				content: OG_IMAGE
			}
		],
		links: [
			{
				rel: "canonical",
				href: `${SITE_ORIGIN}/`
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "32x32"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			}
		]
	}),
	component: Root
});
function Root() {
	const lang = langFromPath(useRouterState({ select: (s) => s.location.pathname }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: lang === "en" ? "en" : "zh-CN",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var Route$31 = createFileRoute("/")({
	loader: async () => {
		return { posts: (await listPosts({ data: {} })).slice(0, 4) };
	},
	head: () => seo({
		title: HOME_TITLE,
		description: HOME_DESC,
		path: "/"
	}),
	component: Home
});
function Home() {
	const lang = usePathLang();
	const t = messages[lang];
	const { posts } = useAnyLoaderData();
	const hot = hotArticles(6);
	const problems = PROBLEMS.filter((p) => p !== "其他");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(orgJsonLd()) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-[45rem] space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: t.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: t.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						children: t.home.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/diagnose",
						className: "flex min-h-14 max-w-md items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg",
						children: t.home.diagnose
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						method: "get",
						action: lang === "en" ? "/en/knowledge" : "/knowledge",
						className: "relative max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "q",
							placeholder: t.home.searchPh,
							"aria-label": t.home.searchAria,
							className: "min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3 text-base"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: t.home.problems
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1 lg:w-full lg:flex-nowrap lg:justify-between lg:overflow-visible",
					children: problems.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/knowledge",
						search: { problem: p },
						className: "inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-surface px-4",
						children: lex(p, lang)
					}, p))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.hot
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.home.more
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: hot.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
						article: a,
						variant: "tile"
					}, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: t.home.posts
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/community",
						className: "text-forest underline",
						children: t.home.toCommunity
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 lg:grid-cols-2",
					children: posts.length ? posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangLink, {
						to: "/community/$id",
						params: { id: p.id },
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: lang === "en" && p.titleEn && !hasHan(p.titleEn) ? p.titleEn : p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: displayName(p.author, lang)
						})]
					}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: t.home.noPosts
					})
				})]
			})
		]
	});
}
var Route$30 = createFileRoute("/about")({
	head: () => seo({
		title: "关于｜土知",
		description: "看懂土地，种好地。土知把地里看见的样子说清楚，把化验单上的词说成人话。制作人李泽宇。",
		path: "/about"
	}),
	component: About
});
function About() {
	const t = messages[usePathLang()];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: t.about.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/about/li-zeyu.jpg",
					alt: t.about.photoAlt,
					width: 896,
					height: 1070,
					className: "w-full max-w-[28rem] rounded-2xl border border-line object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium leading-relaxed",
						children: t.about.producer
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium",
						children: t.tagline
					})]
				})]
			}),
			t.about.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: p
			}, p.slice(0, 12))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
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
var Route$29 = createFileRoute("/contact")({
	head: () => seo({
		title: "联系｜土知",
		description: "优先用邮箱写信。邮箱里的数字不是客服电话。",
		path: "/contact"
	}),
	component: Contact
});
function Contact() {
	const lang = usePathLang();
	const c = messages[lang].contact;
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	function send(e) {
		e.preventDefault();
		const subject = encodeURIComponent(`${name || (lang === "en" ? "Tuzhi" : "土知")}`.trim());
		const text = encodeURIComponent(`${name}\n${email}\n\n${body}`);
		window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${text}`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: c.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: c.emailFirst
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "leading-relaxed",
				children: [
					c.body,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${CONTACT_EMAIL}`,
						className: "text-forest underline",
						children: CONTACT_EMAIL
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed text-muted",
				children: c.notPhone
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: send,
				className: "space-y-3 rounded-2xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [c.yourEmail, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [c.message, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: body,
							onChange: (e) => setBody(e.target.value),
							className: "mt-1 min-h-32 w-full rounded-lg border border-line bg-surface px-3 py-2",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "flex min-h-12 w-full items-center justify-center rounded-xl bg-forest text-forest-fg",
						children: c.send
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: c.hint
					})
				]
			})
		]
	});
}
var runDiagnose = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4c15d74ca4e73d436d153bc970e05e3cfa7b4a7c7e16e9e9be35bd4dea5dcf81"));
var transcribeAudio = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d3135c8a4c0a9f9fdab757c84aca51bd637b48ed14bbd57c0a869cfa3c2b0c2c"));
var extractLab = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("9d3eadfdd891e572ae785cd6aecff0b4218a2fd5cefa7de7903836cedb7259ac"));
function getSR() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}
function VoiceButton({ value, onChange }) {
	const lang = usePathLang();
	const d = messages[lang].diagnose;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [state, setState] = (0, import_react.useState)("idle");
	const [hint, setHint] = (0, import_react.useState)("");
	const [interim, setInterim] = (0, import_react.useState)("");
	const recRef = (0, import_react.useRef)(null);
	const mediaRef = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	const streamRef = (0, import_react.useRef)(null);
	const baseRef = (0, import_react.useRef)(value);
	const hold = (0, import_react.useRef)(false);
	const langRef = (0, import_react.useRef)(lang);
	langRef.current = lang;
	baseRef.current = value;
	(0, import_react.useEffect)(() => {
		return () => stopAll();
	}, []);
	(0, import_react.useEffect)(() => {
		stopAll();
	}, [pathname]);
	function stopAll() {
		hold.current = false;
		try {
			recRef.current?.abort();
		} catch {}
		recRef.current = null;
		try {
			if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
		} catch {}
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		setInterim("");
		setState("idle");
	}
	function append(text) {
		const cleaned = correctFarmSpeech(text);
		if (!cleaned) return;
		const prev = baseRef.current.trim();
		const next = prev ? `${prev} ${cleaned}` : cleaned;
		baseRef.current = next;
		onChange(next);
	}
	function startBrowser() {
		const Ctor = getSR();
		if (!Ctor) return false;
		const rec = new Ctor();
		rec.lang = langRef.current === "en" ? "en-US" : "zh-CN";
		rec.continuous = true;
		rec.interimResults = true;
		rec.onresult = (ev) => {
			let fin = "";
			let mid = "";
			for (let i = ev.resultIndex; i < ev.results.length; i++) {
				const r = ev.results[i];
				if (!r) continue;
				if (r.isFinal) fin += r[0].transcript;
				else mid += r[0].transcript;
			}
			if (mid) setInterim(correctFarmSpeech(mid));
			if (fin) {
				append(fin);
				setInterim("");
			}
		};
		rec.onerror = (ev) => {
			const err = ev.error || "";
			if (err === "not-allowed") setHint(d.sttNoMic);
			else if (err === "no-speech") setHint(d.sttNoHear);
			else if (err === "network") {
				setHint(d.sttNet);
				startRecorder();
				return;
			} else setHint(d.sttNoHear);
			stopAll();
		};
		rec.onend = () => {
			if (hold.current && recRef.current === rec) {
				try {
					rec.start();
				} catch {}
				return;
			}
			setState((s) => s === "listen" ? "idle" : s);
		};
		recRef.current = rec;
		try {
			rec.start();
			setState("listen");
			setHint(d.sttListening);
			return true;
		} catch {
			return false;
		}
	}
	async function startRecorder() {
		if (!navigator.mediaDevices?.getUserMedia) {
			setHint(d.sttNoSupport);
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";
			const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
			chunks.current = [];
			rec.ondataavailable = (e) => {
				if (e.data.size) chunks.current.push(e.data);
			};
			rec.onstop = async () => {
				stream.getTracks().forEach((t) => t.stop());
				const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
				if (blob.size < 800) {
					setHint(d.sttNoHear);
					setState("idle");
					return;
				}
				setState("busy");
				setHint(d.sttBusy);
				const res = await transcribeAudio({ data: {
					audio: await blobToData(blob),
					lang: langRef.current
				} });
				setState("idle");
				if (!res.ok) {
					setHint(res.error === "off" ? d.sttNoSupport : d.sttNet);
					return;
				}
				append(res.text);
				setHint("");
			};
			mediaRef.current = rec;
			rec.start();
			setState("record");
			setHint(d.sttListening);
		} catch {
			setHint(d.sttNoMic);
			setState("idle");
		}
	}
	async function toggle() {
		if (state === "listen" || state === "record") {
			hold.current = false;
			if (state === "listen") {
				try {
					recRef.current?.stop();
				} catch {}
				recRef.current = null;
				setState("idle");
				setInterim("");
				setHint("");
				return;
			}
			try {
				mediaRef.current?.stop();
			} catch {}
			return;
		}
		if (state === "busy") return;
		setHint(d.sttPerm);
		hold.current = true;
		if (!startBrowser()) await startRecorder();
	}
	const live = state === "listen" || state === "record";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: live ? "inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-forest bg-surface px-4 text-forest" : "inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-4 text-forest-fg",
					"aria-pressed": live,
					"aria-label": live ? d.sttStop : d.sttMic,
					onClick: () => void toggle(),
					onPointerDown: (e) => {
						if (e.pointerType === "mouse" && e.button !== 0) return;
						if (state !== "idle") return;
						hold.current = true;
					},
					children: [live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" }), live ? d.sttStop : d.sttMic]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: d.sttHold
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: d.sttPerm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: d.sttDialect
			}),
			interim ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface-2 px-3 py-2 text-base",
				children: interim
			}) : null,
			hint && hint !== d.sttPerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-clay",
				children: hint
			}) : null
		]
	});
}
function blobToData(blob) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = () => reject(r.error);
		r.readAsDataURL(blob);
	});
}
async function downloadShareCard(opts) {
	const canvas = document.createElement("canvas");
	canvas.width = 1080;
	canvas.height = 1350;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.fillStyle = "#F4EFE6";
	ctx.fillRect(0, 0, 1080, 1350);
	ctx.fillStyle = "#1F6B4A";
	ctx.fillRect(0, 0, 1080, 180);
	ctx.fillStyle = "#F4EFE6";
	ctx.font = "700 54px serif";
	ctx.fillText(opts.lang === "en" ? "Tuzhi" : "土知", 64, 80);
	ctx.font = "28px sans-serif";
	ctx.fillText(opts.lang === "en" ? "Photo check · for learning" : "拍照识别 · 仅供学习", 64, 130);
	ctx.fillStyle = "#1C1612";
	wrap(ctx, opts.title, 64, 260, 952, 48);
	ctx.fillStyle = "#1F6B4A";
	ctx.font = "700 32px sans-serif";
	ctx.fillText(opts.lang === "en" ? "Don’t do this first" : "先别做", 64, 520);
	ctx.fillStyle = "#1C1612";
	ctx.font = "32px sans-serif";
	let y = 580;
	for (const line of opts.dont.slice(0, 3)) y = wrap(ctx, "· " + line, 64, y, 952, 40) + 16;
	ctx.fillStyle = "#1F6B4A";
	ctx.font = "700 32px sans-serif";
	ctx.fillText(opts.lang === "en" ? "What to test" : "建议测哪几项", 64, y + 24);
	ctx.fillStyle = "#1C1612";
	ctx.font = "32px sans-serif";
	y += 80;
	for (const line of opts.next.slice(0, 3)) y = wrap(ctx, "· " + line, 64, y, 952, 40) + 16;
	ctx.fillStyle = "#5c5348";
	ctx.font = "26px sans-serif";
	wrap(ctx, opts.lang === "en" ? "For learning only. Not a prescription." : "仅供学习对照，不能替代农技站或化验室。", 64, 1240, 952, 36);
	const url = canvas.toDataURL("image/png");
	const a = document.createElement("a");
	a.href = url;
	a.download = opts.lang === "en" ? "tuzhi-photo-check.png" : "tuzhi-diagnose.png";
	a.click();
}
function wrap(ctx, text, x, y, max, lineH) {
	const chars = [...text];
	let line = "";
	let cy = y;
	for (const ch of chars) {
		const next = line + ch;
		if (ctx.measureText(next).width > max && line) {
			ctx.fillText(line, x, cy);
			line = ch;
			cy += lineH;
		} else line = next;
	}
	if (line) {
		ctx.fillText(line, x, cy);
		cy += lineH;
	}
	return cy;
}
var Route$28 = createFileRoute("/diagnose")({
	head: () => seo({
		title: "拍照识别｜土知",
		description: "先拍整株、特写和土面，再到农业知识里对照。尽量把土壤问题和病害、药害分开。",
		path: "/diagnose"
	}),
	component: Diagnose
});
function fileToData(file) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = reject;
		r.readAsDataURL(file);
	});
}
function kindLabel(kind, d) {
	if (kind === "病害") return d.kindDisease;
	if (kind === "药害") return d.kindSpray;
	if (kind === "盐害") return d.kindSalt;
	if (kind === "不够") return d.kindLow;
	return d.kindSoil;
}
function confLabel(c, d) {
	if (c === "高") return d.confHigh;
	if (c === "低") return d.confLow;
	return d.confMid;
}
function Diagnose() {
	const lang = usePathLang();
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
	const [labOpen, setLabOpen] = (0, import_react.useState)(false);
	const [labPhoto, setLabPhoto] = (0, import_react.useState)(null);
	const [labPh, setLabPh] = (0, import_react.useState)("");
	const [labEc, setLabEc] = (0, import_react.useState)("");
	const [labOm, setLabOm] = (0, import_react.useState)("");
	const [ocrHint, setOcrHint] = (0, import_react.useState)("");
	async function onFile(slot, f) {
		if (!f) return;
		if (f.size > 8388608) {
			setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
			return;
		}
		const data = await fileToData(f);
		if (data.length > 12582912) {
			setErr(lang === "en" ? "That photo is too large. Try another shot." : "这张照片太大了，换一张再试。");
			return;
		}
		setPhotos((p) => ({
			...p,
			[slot]: data
		}));
	}
	async function onLabFile(f) {
		if (!f) return;
		if (f.size > 8388608) {
			setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
			return;
		}
		const data = await fileToData(f);
		setLabPhoto(data);
		setLabOpen(true);
		const ocr = await extractLab({ data: { photo: data } });
		if (ocr.ok) {
			if (ocr.ph) setLabPh(ocr.ph);
			if (ocr.ec) setLabEc(ocr.ec);
			if (ocr.om) setLabOm(ocr.om);
			if (ocr.ph || ocr.ec || ocr.om) setOcrHint(d.labOcr);
		}
	}
	function validLab() {
		if (labPh) {
			const n = Number(labPh);
			if (!Number.isFinite(n) || n < 0 || n > 14) {
				setErr(d.labPhRange);
				return false;
			}
		}
		if (labEc) {
			const n = Number(labEc);
			if (!Number.isFinite(n) || n < 0) {
				setErr(d.labNeg);
				return false;
			}
		}
		if (labOm) {
			const n = Number(labOm);
			if (!Number.isFinite(n) || n < 0) {
				setErr(d.labNeg);
				return false;
			}
		}
		return true;
	}
	async function send() {
		if (!validLab()) return;
		const list = [
			photos.plant,
			photos.leaf,
			photos.soil,
			labPhoto
		].filter(Boolean);
		let note = text.trim();
		if (labPh || labEc || labOm) note += `${note ? "\n" : ""}化验单数字：pH=${labPh || "未填"} EC=${labEc || "未填"} 有机质=${labOm || "未填"}`;
		if (list.length === 0 && note.length < 8) {
			setErr(d.needPhoto);
			return;
		}
		setBusy(true);
		setErr("");
		try {
			const res = await runDiagnose({ data: {
				photos: list,
				text: note,
				crop,
				region,
				stage,
				fert,
				lang
			} });
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
		} catch {
			setErr(d.sendFail);
		} finally {
			setBusy(false);
		}
	}
	const filled = [
		photos.plant,
		photos.leaf,
		photos.soil
	].filter(Boolean).length;
	const missing = [];
	if (!photos.plant) missing.push(d.fewPlant);
	if (!photos.leaf) missing.push(d.fewLeaf);
	if (!photos.soil) missing.push(d.fewSoil);
	const spoken = result ? result.spoken?.length ? result.spoken : [
		result.dont?.[0],
		result.guesses?.[0] ? lang === "en" ? `Closer to ${result.guesses[0].title}` : `更像${result.guesses[0].title}` : result.title,
		result.next?.[0]
	].filter((s) => !!s) : [];
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, {
					sentences: spoken,
					title: result.title,
					listenLabel: d.listenConclusion
				}),
				result.guesses?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium",
						children: d.guess
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: result.guesses.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-surface-2 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [g.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-sm font-normal text-muted",
									children: [
										kindLabel(g.kind, d),
										" · ",
										confLabel(g.confidence, d)
									]
								})]
							}), g.why ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: g.why
							}) : null]
						}, `${g.title}-${i}`))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: d.analysis
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 leading-relaxed text-muted",
					children: result.photosSay
				})] }),
				result.unlike?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: d.unlike
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-5",
					children: result.unlike.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, i))
				})] }) : null,
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
						const a = getCard(slug);
						return a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, slug) : null;
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex min-h-12 items-center rounded-xl bg-forest px-4 text-forest-fg",
							onClick: () => void downloadShareCard({
								title: result.title,
								dont: result.dont,
								next: result.next,
								lang
							}),
							children: d.shareCard
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex min-h-12 items-center rounded-xl border border-line px-4",
							onClick: () => {
								setResult(null);
								setPhotos({
									plant: null,
									leaf: null,
									soil: null
								});
								setLabPhoto(null);
							},
							children: d.retry
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
							to: "/knowledge/$slug",
							params: { slug: "suan-hua" },
							className: "inline-flex min-h-12 items-center text-forest underline",
							children: d.example
						})
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 lg:grid-cols-3",
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
				].map(([key, label, hint, avoid]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
					label,
					hint,
					avoid,
					preview: photos[key],
					cameraLabel: d.camera,
					albumLabel: d.album,
					shotLabel: d.shot,
					avoidLabel: d.avoid,
					kind: key,
					onFile: (f) => onFile(key, f)
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-forest underline",
					onClick: () => setLabOpen((v) => !v),
					children: labOpen ? d.labHide : d.labToggle
				}), labOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: d.labHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
							label: d.labPhoto,
							hint: d.labHint,
							avoid: d.labAvoid,
							preview: labPhoto,
							cameraLabel: d.camera,
							albumLabel: d.album,
							onFile: onLabFile
						}),
						ocrHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-forest",
							children: ocrHint
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: d.labFill
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: ["pH", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: labPh,
										onChange: (e) => setLabPh(e.target.value),
										className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
										inputMode: "decimal"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: ["EC", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: labEc,
										onChange: (e) => setLabEc(e.target.value),
										className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
										inputMode: "decimal"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm",
									children: [lang === "en" ? "Organic matter" : "有机质", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: labOm,
										onChange: (e) => setLabOm(e.target.value),
										className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
										inputMode: "decimal"
									})]
								})
							]
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: d.qPh,
				className: "min-h-28 w-full rounded-xl border border-line bg-surface p-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
				value: text,
				onChange: setText
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
			filled < 3 ? missing.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-clay",
				children: m
			}, m)) : null,
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
var $$splitComponentImporter$15 = () => import("./en-W0ZBvcXM.mjs");
var Route$27 = createFileRoute("/en")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
function safeNext(raw) {
	if (!raw) return "/";
	if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return "/";
	if (raw.startsWith("/api") || raw.startsWith("/__")) return "/";
	return raw.split("#")[0] || "/";
}
var Route$26 = createFileRoute("/login")({
	validateSearch: (s) => ({
		...s.tab === "register" ? { tab: "register" } : {},
		...typeof s.next === "string" ? { next: s.next } : {}
	}),
	head: () => seo({
		title: "登录｜土知",
		description: "只用邮箱或手机号登录，不用第三方账号。",
		path: "/login",
		noindex: true
	}),
	component: Login
});
function resolveEmail(email, phone) {
	const e = email.trim();
	if (e.includes("@")) return e;
	const digits = phone.replace(/\D/g, "");
	if (digits.length >= 7) return `${digits}@phone.tuzhi.local`;
	return e;
}
function Login() {
	const lang = usePathLang();
	const L = messages[lang].login;
	const search = useAnySearch();
	const navigate = useAnyNavigate();
	const { user, isPending } = useCurrentUserState();
	const register = search.tab === "register";
	const destRaw = safeNext(search.next);
	const dest = destRaw === "/" ? withLangPath("/", lang) : destRaw;
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	const [honey, setHoney] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) {
		if (dest !== "/") {
			if (typeof window !== "undefined") window.location.replace(dest);
			return null;
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: withLangPath("/", lang) });
	}
	async function submit() {
		setErr("");
		if (honey.trim()) {
			setErr(L.fail);
			return;
		}
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
		if (register && !confirm) {
			setErr(L.needConfirm);
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
			window.location.assign(dest);
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
					onClick: () => navigate({ search: { next: search.next } }),
					children: L.tabLogin
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: register ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg" : "flex-1 rounded-full border border-line px-4 py-2",
					onClick: () => navigate({ search: {
						tab: "register",
						next: search.next
					} }),
					children: L.tabRegister
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "absolute left-[-9999px] h-0 w-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					tabIndex: -1,
					autoComplete: "off",
					value: honey,
					onChange: (e) => setHoney(e.target.value)
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
			register ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm leading-relaxed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: confirm,
					onChange: (e) => setConfirm(e.target.checked),
					className: "mt-1 size-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L.confirm })]
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
var Route$25 = createFileRoute("/me")({
	head: () => seo({
		title: "我的｜土知",
		description: "收藏与最近的拍照识别。",
		path: "/me",
		noindex: true
	}),
	component: Me
});
function Me() {
	const lang = usePathLang();
	const t = messages[lang];
	const m = t.me;
	const { user, isPending } = useCurrentUserState();
	const [favs] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getFavorites());
	const [hist] = (0, import_react.useState)(() => typeof window === "undefined" ? [] : getHistory());
	const articles = favs.map(getCard).filter((a) => !!a);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: m.title
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 rounded-xl bg-surface-2" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: displayName(user.displayName || user.primaryEmail, lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-forest underline",
						onClick: () => signOut("/"),
						children: m.logout
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.guest
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
					to: "/login",
					className: "mt-3 flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg",
					children: t.nav.login
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: m.localOnly
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: m.favs
				}), articles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.noFavs
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: m.history
				}), hist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: m.noHistory
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: hist.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: h.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: h.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-subtle",
								children: h.at.slice(0, 10)
							})
						]
					}, h.id))
				})]
			})
		]
	});
}
var Route$24 = createFileRoute("/privacy")({
	head: () => seo({
		title: "隐私与免责｜土知",
		description: "土知如何使用账号、诊断照片与问答内容。诊断仅供学习，不替代农技站。",
		path: "/privacy"
	}),
	component: Privacy
});
function Privacy() {
	const t = messages[usePathLang()];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: t.privacy.title
			}),
			t.privacy.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed",
				children: p
			}, p.slice(0, 16))),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.disclaimer
			})
		]
	});
}
var Route$23 = createFileRoute("/search")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : void 0 }),
	beforeLoad: ({ search }) => {
		throw redirect({
			to: "/knowledge",
			search: search.q ? { q: search.q } : {}
		});
	}
});
var Route$22 = createFileRoute("/community/")({
	validateSearch: (s) => ({ problem: typeof s.problem === "string" ? s.problem : void 0 }),
	loaderDeps: ({ search }) => ({ problem: search.problem }),
	loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: deps.problem } }) }),
	head: () => seo({
		title: "问答区｜土知",
		description: "把自家地里的照片和现象发出来。作物、地区、你看见的样子写清，互相看。",
		path: "/community"
	}),
	component: Community
});
function Community() {
	const lang = usePathLang();
	const t = messages[lang];
	const r = t.community;
	const { posts } = useAnyLoaderData();
	const search = useAnySearch();
	const nav = useAnyNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: r.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: r.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: void 0 } }),
					className: !search.problem ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: t.all
				}), PROBLEMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => nav({ search: { problem: p } }),
					className: search.problem === p ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2",
					children: lex(p, lang)
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
				to: "/community/new",
				className: "flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg",
				children: r.ask
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [r.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-3 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
							to: "/diagnose",
							className: "text-forest underline",
							children: t.nav.diagnose
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
							to: "/knowledge",
							className: "text-forest underline",
							children: t.nav.knowledge
						})]
					})]
				}) : posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangLink, {
					to: "/community/$id",
					params: { id: p.id },
					className: "block rounded-2xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: lang === "en" && p.titleEn && !/[\u4e00-\u9fff]/.test(p.titleEn) ? p.titleEn : p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-muted",
							children: lang === "en" && p.bodyEn && !/[\u4e00-\u9fff]/.test(p.bodyEn) ? p.bodyEn : p.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-subtle",
							children: [
								displayName(p.author, lang),
								" · ",
								String(p.createdAt).slice(0, 10),
								" · ",
								lex(p.problem, lang),
								" ·",
								" ",
								p.answers.length ? r.answered : r.waiting
							]
						})
					]
				}, p.id))
			})
		]
	});
}
function Bilingual({ zh, en, as: Tag = "p", className = "leading-relaxed" }) {
	const lang = usePathLang();
	const t = messages[lang].community;
	if (lang === "en") {
		const text = en && en.trim() && !hasHan(en) ? en : zh;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			className,
			children: text
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			className,
			children: zh
		}), en && en.trim() && !hasHan(en) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-subtle",
			children: [
				t.enLabel,
				" ",
				en
			]
		}) : null]
	});
}
var Route$21 = createFileRoute("/community/$id")({
	loader: async ({ params }) => {
		const post = await getPost({ data: { id: params.id } });
		if (!post) throw notFound();
		return { post };
	},
	component: PostPage
});
function PostPage() {
	const { post } = useAnyLoaderData();
	const lang = usePathLang();
	const r = messages[lang].community;
	const { user, isPending } = useCurrentUserState();
	const [body, setBody] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const listen = lang === "en" ? [
		post.titleEn,
		post.bodyEn,
		...post.answers.map((a) => a.bodyEn)
	].filter((s) => !!s && !/[\u4e00-\u9fff]/.test(s)) : [
		post.title,
		post.body,
		...post.answers.map((a) => a.body)
	];
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, {
				sentences: listen,
				title: lang === "en" ? post.titleEn || "Q&A" : post.title
			}),
			post.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.photo,
				alt: post.title,
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/login",
						className: "text-forest underline",
						children: r.goLogin
					})
				]
			})
		]
	});
}
var Route$20 = createFileRoute("/community/new")({
	head: () => seo({
		title: "提问｜土知",
		description: "把自家地里的照片和现象发出来。",
		path: "/community/new",
		noindex: true
	}),
	component: NewPost
});
function compressImage(file) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const max = 1280;
			let { width, height } = img;
			if (width > max || height > max) {
				const s = Math.min(max / width, max / height);
				width = Math.round(width * s);
				height = Math.round(height * s);
			}
			const c = document.createElement("canvas");
			c.width = width;
			c.height = height;
			c.getContext("2d").drawImage(img, 0, 0, width, height);
			URL.revokeObjectURL(url);
			resolve(c.toDataURL("image/jpeg", .72));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("photo"));
		};
		img.src = url;
	});
}
function NewPost() {
	const lang = usePathLang();
	const r = messages[lang].community;
	const { user, isPending } = useCurrentUserState();
	const nav = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [problem, setProblem] = (0, import_react.useState)("其他");
	const [crop, setCrop] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 rounded-xl bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: r.needLoginLead
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 rounded-2xl border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: r.needLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed text-muted",
				children: r.needLoginLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
				to: "/login",
				search: { next: withLangPath("/community/new", lang) },
				className: "flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg",
				children: r.goLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
				to: "/diagnose",
				className: "flex min-h-12 items-center justify-center text-forest underline",
				children: r.diagnoseFree
			})
		]
	});
	async function onFile(f) {
		if (!f) return;
		if (f.size > 8388608) {
			setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
			return;
		}
		try {
			setPhoto(await compressImage(f));
		} catch {
			setErr(r.errPhoto);
		}
	}
	async function send() {
		if (!photo) {
			setErr(r.errPhoto);
			return;
		}
		setBusy(true);
		setErr("");
		try {
			const res = await createPost({ data: {
				title,
				body,
				problem,
				crop,
				region,
				photo
			} });
			nav({
				to: "/community/$id",
				params: { id: res.id }
			});
		} catch (e) {
			const msg = e instanceof Error ? e.message : "";
			setErr(msg === "short" ? r.errShort : msg === "rate" ? r.errRate : msg === "blocked" ? r.errBlocked : msg === "photo" || msg === "photo-required" ? r.errPhoto : r.errSave);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoSlot, {
				label: r.photo,
				hint: r.photoHint,
				avoid: "",
				preview: photo,
				cameraLabel: r.camera,
				albumLabel: r.album,
				onFile
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
var $$splitComponentImporter$14 = () => import("./en-DtC6qJSH.mjs");
var Route$19 = createFileRoute("/en/")({
	loader: async () => {
		return { posts: (await listPosts({ data: {} })).slice(0, 4) };
	},
	head: () => seo({
		title: HOME_TITLE_EN,
		description: HOME_DESC_EN,
		path: "/en",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./about-RIFR-4_7.mjs");
var Route$18 = createFileRoute("/en/about")({
	head: () => seo({
		title: "About | Tuzhi",
		description: HOME_DESC_EN,
		path: "/en/about",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./contact-D0a78ZY9.mjs");
var Route$17 = createFileRoute("/en/contact")({
	head: () => seo({
		title: "Contact | Tuzhi",
		description: "Write to the mailbox. The digits in the address are not a hotline.",
		path: "/en/contact",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./diagnose-KLG5JxB5.mjs");
var Route$16 = createFileRoute("/en/diagnose")({
	head: () => seo({
		title: "Photo check | Tuzhi",
		description: HOME_DESC_EN,
		path: "/en/diagnose",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./login-ZqfIg9SX.mjs");
var Route$15 = createFileRoute("/en/login")({
	validateSearch: (s) => ({
		...s.tab === "register" ? { tab: "register" } : {},
		...typeof s.next === "string" ? { next: s.next } : {}
	}),
	head: () => seo({
		title: "Sign in | Tuzhi",
		description: "Email or phone only. No third-party login.",
		path: "/en/login",
		noindex: true,
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./me-mPxLOCXb.mjs");
var Route$14 = createFileRoute("/en/me")({
	head: () => seo({
		title: "Me | Tuzhi",
		description: "Saved guides and recent photo checks.",
		path: "/en/me",
		noindex: true,
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./privacy-BNl5ty6x.mjs");
var Route$13 = createFileRoute("/en/privacy")({
	head: () => seo({
		title: "Privacy | Tuzhi",
		description: "How Tuzhi uses accounts, diagnose photos and Q&A. For learning, not a prescription.",
		path: "/en/privacy",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var Route$12 = createFileRoute("/en/search")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : void 0 }),
	beforeLoad: ({ search }) => {
		throw redirect({
			to: "/en/knowledge",
			search: search.q ? { q: search.q } : {}
		});
	}
});
function phBand(n) {
	if (n < 5.5) return "low";
	if (n > 8) return "high";
	if (n >= 6 && n <= 7.5) return "mid";
	return "mid";
}
function ecBand(n) {
	if (n < .4) return "low";
	if (n > 1.5) return "high";
	return "mid";
}
function omBand(n) {
	if (n < 15) return "low";
	if (n > 30) return "high";
	return "mid";
}
function LabBand() {
	const lang = usePathLang();
	const r = messages[lang].wiki;
	const [ph, setPh] = (0, import_react.useState)("");
	const [ec, setEc] = (0, import_react.useState)("");
	const [om, setOm] = (0, import_react.useState)("");
	const [out, setOut] = (0, import_react.useState)([]);
	function run() {
		const rows = [];
		const p = Number(ph);
		const e = Number(ec);
		const o = Number(om);
		if (ph && Number.isFinite(p) && p >= 0 && p <= 14) rows.push({
			id: "ph",
			label: "pH",
			band: phBand(p)
		});
		if (ec && Number.isFinite(e) && e >= 0) rows.push({
			id: "ec",
			label: "EC",
			band: ecBand(e)
		});
		if (om && Number.isFinite(o) && o >= 0) rows.push({
			id: "om",
			label: lang === "en" ? "Organic matter" : "有机质",
			band: omBand(o)
		});
		setOut(rows);
	}
	function word(b) {
		if (b === "low") return r.bandLow;
		if (b === "high") return r.bandHigh;
		return r.bandMid;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-2xl border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: r.bandTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: r.bandLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["pH", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ph,
							onChange: (e) => setPh(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
							inputMode: "decimal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["EC", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ec,
							onChange: (e) => setEc(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
							inputMode: "decimal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [lang === "en" ? "OM g/kg" : "有机质 g/kg", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: om,
							onChange: (e) => setOm(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2",
							inputMode: "decimal"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex min-h-11 items-center rounded-xl bg-forest px-4 text-forest-fg",
				onClick: run,
				children: r.bandGo
			}),
			out.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: r.bandNone
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: out.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-forest px-3 py-1 text-sm text-forest-fg",
						children: word(row.band)
					})]
				}, row.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: r.readNote
			})
		]
	});
}
var Route$11 = createFileRoute("/encyclopedia/")({
	head: () => seo({
		title: "化验知识｜土知",
		description: "化验单上的 pH、EC、有机质、交换性铝、交换性钠，用大白话讲。",
		path: "/encyclopedia"
	}),
	component: WikiList
});
function WikiList() {
	const lang = usePathLang();
	const t = messages[lang];
	const r = t.wiki;
	const [q, setQ] = (0, import_react.useState)("");
	const found = (0, import_react.useMemo)(() => searchTerms(q), [q]);
	const foundIds = new Set(found.map((x) => x.id));
	const groups = LAB_GROUPS.map((g) => ({
		...g,
		terms: g.ids.map((id) => found.find((t) => t.id === id)).filter((x) => x && foundIds.has(x.id))
	})).filter((g) => g.terms.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: r.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: r.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabBand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: r.ph,
				className: "min-h-12 w-full rounded-xl border border-line bg-surface px-4"
			}),
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-line bg-surface p-6 text-muted",
				children: [r.empty, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-3 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/knowledge",
						className: "text-forest underline",
						children: t.nav.knowledge
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/diagnose",
						className: "text-forest underline",
						children: t.nav.diagnose
					})]
				})]
			}) : groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: lang === "en" ? g.titleEn : g.title
				}), g.terms.map((term) => {
					if (!term) return null;
					const copy = localizeTerm(term, lang);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LangLink, {
						to: "/encyclopedia/$id",
						params: { id: term.id },
						className: "block scroll-mt-24 rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-medium",
								children: copy.title
							}),
							copy.aka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-subtle",
								children: [r.aka, copy.aka]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg leading-relaxed",
								children: copy.summary
							})
						]
					}, term.id);
				})]
			}, g.id))
		]
	});
}
var Route$10 = createFileRoute("/encyclopedia/$id")({
	loader: ({ params }) => {
		const term = getTerm(params.id);
		if (!term) throw notFound();
		return { term };
	},
	head: ({ loaderData }) => {
		const term = loaderData?.term;
		return seo({
			title: term ? `${term.zh.title} · 土知` : "土知",
			description: term?.zh.summary?.slice(0, 180) || "化验单上的词，说成人话",
			path: term ? `/encyclopedia/${term.id}` : "/encyclopedia",
			type: "article"
		});
	},
	component: TermPage
});
function TermPage() {
	const { term } = useAnyLoaderData();
	const lang = usePathLang();
	const r = messages[lang].wiki;
	const copy = localizeTerm(term, lang);
	const related = (term.relatedSlugs || []).map(getCard).filter((x) => !!x);
	const spoken = (copy.spoken?.length ? copy.spoken : [
		copy.subtitle,
		copy.appearance,
		copy.fieldCheck
	]).filter((s) => !!s && s.trim() && !/translation pending/i.test(s) && (lang !== "en" || !/[\u4e00-\u9fff]/.test(s)));
	const relatedBlock = related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: r.toGuides
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: r.toGuidesLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug))
			})
		]
	}) : null;
	const reading = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
					to: "/encyclopedia",
					className: "text-forest",
					children: r.back
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted",
						children: copy.subtitle
					}),
					copy.aka ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-subtle",
						children: [r.aka, copy.aka]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, {
				sentences: spoken,
				title: copy.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: r.sheet
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: copy.appearance
					}),
					copy.photos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGallery, {
						photos: copy.photos,
						slug: term.id
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: r.unit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: copy.unit
					}),
					copy.ratioNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [r.ratio, " · "]
						}), copy.ratioNote]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: r.read
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-2xl border border-line bg-surface p-4 leading-relaxed",
						children: [(copy.longform?.length ? copy.longform : [copy.summary]).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: r.readNote
						})]
					}),
					copy.readTable?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-x-auto rounded-2xl border border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[32rem] text-left text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "px-3 py-2 text-left font-medium",
									children: r.readTable
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: copy.readTable.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line bg-surface",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.label
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
								}, row.label)) })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-2 text-sm text-muted",
							children: r.readTableNote
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: r.field
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-line bg-surface p-4 leading-relaxed",
					children: copy.fieldCheck
				})]
			}),
			copy.dontDo?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: r.dont
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-2 rounded-2xl border border-line bg-surface p-4 pl-8",
					children: copy.dontDo.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, i))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeVideo, {
				slug: term.id,
				kind: "wiki"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden",
				children: relatedBlock
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lg:grid lg:grid-cols-[minmax(0,45rem)_22.5rem] lg:items-start lg:gap-8",
		children: [reading, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "sticky top-20 hidden space-y-6 lg:block",
			children: relatedBlock
		})]
	}) });
}
var Route$9 = createFileRoute("/knowledge/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		crop: typeof s.crop === "string" ? s.crop : void 0,
		problem: typeof s.problem === "string" ? s.problem : void 0,
		region: typeof s.region === "string" ? s.region : void 0,
		season: typeof s.season === "string" ? s.season : void 0
	}),
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => {
		return {
			list: filterArticles(deps),
			facets: facetCounts(deps)
		};
	},
	head: ({ loaderData }) => {
		const n = loaderData?.list.length;
		return seo({
			title: "农业知识｜土知",
			description: n ? `地里看着不对，按现象找办法。现有 ${n} 篇对照。酸化、盐碱、缺铁、涝害，一篇一篇对照。` : "地里看着不对，按现象找办法。酸化、盐碱、缺铁、涝害，一篇一篇对照。",
			path: "/knowledge"
		});
	},
	component: KnowledgeList
});
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-base text-forest-fg" : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink",
		children
	});
}
var PAGE = 20;
function KnowledgeList() {
	const lang = usePathLang();
	const tAll = messages[lang];
	const t = tAll.knowledge;
	const search = useAnySearch();
	const { facets: loadedFacets } = useAnyLoaderData();
	const navigate = useAnyNavigate();
	const urlForces = !!(search.crop || search.region || search.season);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [limit, setLimit] = (0, import_react.useState)(PAGE);
	const [qLive, setQLive] = (0, import_react.useState)(search.q ?? "");
	const list = filterArticles({
		...search,
		q: qLive,
		lang
	});
	const facets = facetCounts({
		...search,
		q: qLive,
		lang
	});
	const shown = list;
	const shownFacets = facets ?? loadedFacets;
	(0, import_react.useEffect)(() => {
		setLimit(PAGE);
	}, [
		search.q,
		search.crop,
		search.problem,
		search.region,
		search.season
	]);
	(0, import_react.useEffect)(() => {
		setQLive(search.q ?? "");
	}, [search.q]);
	(0, import_react.useEffect)(() => {
		if (urlForces || extraFiltersOpen()) setOpen(true);
	}, [urlForces]);
	function setSearch(patch) {
		navigate({ search: {
			...search,
			...patch
		} });
	}
	function toggleOpen() {
		const next = !open;
		setOpen(next);
		setExtraFiltersOpen(next);
	}
	const selectedExtra = [
		search.crop ? {
			k: "crop",
			v: search.crop
		} : null,
		search.region ? {
			k: "region",
			v: search.region
		} : null,
		search.season ? {
			k: "season",
			v: search.season
		} : null
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: t.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
						to: "/encyclopedia",
						className: "inline-block text-forest",
						children: t.toWiki
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[57px] z-20 space-y-3 border-b border-line bg-bg/95 py-3 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						method: "get",
						action: lang === "en" ? "/en/knowledge" : "/knowledge",
						className: "relative",
						onSubmit: (e) => {
							e.preventDefault();
							setSearch({ q: qLive || void 0 });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "q",
								value: qLive,
								onChange: (e) => {
									const v = e.target.value;
									setQLive(v);
									setSearch({ q: v || void 0 });
								},
								placeholder: t.ph,
								"aria-label": tAll.home.searchAria,
								className: "min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3"
							}),
							search.problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "hidden",
								name: "problem",
								value: search.problem
							}) : null,
							search.crop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "hidden",
								name: "crop",
								value: search.crop
							}) : null,
							search.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "hidden",
								name: "region",
								value: search.region
							}) : null,
							search.season ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "hidden",
								name: "season",
								value: search.season
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted",
							children: t.byProblem
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: !search.problem,
								onClick: () => setSearch({ problem: void 0 }),
								children: tAll.all
							}), PROBLEMS.filter((p) => (shownFacets.problems[p] ?? 0) > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								active: search.problem === p,
								onClick: () => setSearch({ problem: p }),
								children: [
									lex(p, lang),
									" ",
									shownFacets.problems[p]
								]
							}, p))]
						})]
					}),
					!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [selectedExtra.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							active: true,
							onClick: () => setSearch({ [s.k]: void 0 }),
							children: [lex(s.v, lang), " ×"]
						}, s.k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-forest underline",
							onClick: toggleOpen,
							children: t.moreFilters
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-forest underline",
						onClick: toggleOpen,
						children: t.lessFilters
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium text-muted",
									children: t.byCrop
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: !search.crop,
										onClick: () => setSearch({ crop: void 0 }),
										children: tAll.all
									}), CROPS.filter((c) => (shownFacets.crops[c] ?? 0) > 0).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
										active: search.crop === c,
										onClick: () => setSearch({ crop: c }),
										children: [
											lex(c, lang),
											" ",
											shownFacets.crops[c]
										]
									}, c))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium text-muted",
									children: t.byRegion
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: !search.region,
										onClick: () => setSearch({ region: void 0 }),
										children: tAll.all
									}), REGIONS.filter((r) => (shownFacets.regions[r] ?? 0) > 0).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
										active: search.region === r,
										onClick: () => setSearch({ region: r }),
										children: [
											lex(r, lang),
											" ",
											shownFacets.regions[r]
										]
									}, r))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-medium text-muted",
										children: t.bySeason
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-subtle",
										children: t.seasonNote
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											active: !search.season,
											onClick: () => setSearch({ season: void 0 }),
											children: tAll.all
										}), SEASONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
											active: search.season === s,
											onClick: () => setSearch({ season: s }),
											children: [
												lex(s, lang),
												" ",
												shownFacets.seasons[s] ?? 0
											]
										}, s))]
									})
								]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.count(shown.length)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [shown.slice(0, limit).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.slug)), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-surface p-6 text-muted",
					children: [
						search.crop || search.region || search.season ? t.emptyCombo : t.empty,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
							to: "/diagnose",
							className: "mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg",
							children: t.goDiagnose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangLink, {
							to: "/knowledge/$slug",
							params: { slug: "suan-hua" },
							className: "mt-2 flex min-h-12 items-center justify-center text-forest underline",
							children: t.emptyHint
						})
					]
				}) : null]
			}),
			limit < shown.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-surface text-base",
				onClick: () => setLimit((n) => n + PAGE),
				children: t.morePage(Math.min(PAGE, shown.length - limit))
			}) : null
		]
	});
}
var $$splitComponentImporter$7 = () => import("../_slug-BLQogdBU.mjs");
var Route$8 = createFileRoute("/knowledge/$slug")({
	loader: ({ params }) => {
		const raw = getArticle(params.slug);
		if (!raw) throw notFound();
		return { raw };
	},
	head: ({ loaderData }) => {
		const a = loaderData?.raw;
		return seo({
			title: a ? `${a.title} · 土知` : "土知",
			description: a?.summary?.slice(0, 180) || "看懂土地，种好地",
			path: a ? `/knowledge/${a.slug}` : "/knowledge",
			type: "article",
			lang: "zh"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
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
		lang
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:hidden space-y-6",
				children: [wikiBlock, relatedBlock]
			}),
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
			className: "sticky top-20 hidden space-y-6 lg:block",
			children: [wikiBlock, relatedBlock]
		})]
	})] });
}
var Route$7 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$6 = () => import("./community-mAlsAHYu.mjs");
var Route$6 = createFileRoute("/en/community/")({
	validateSearch: (s) => ({ problem: typeof s.problem === "string" ? s.problem : void 0 }),
	loaderDeps: ({ search }) => ({ problem: search.problem }),
	loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: deps.problem } }) }),
	head: () => seo({
		title: "Q&A | Tuzhi",
		description: HOME_DESC_EN,
		path: "/en/community",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_id-C8HbsFQD.mjs");
var Route$5 = createFileRoute("/en/community/$id")({
	loader: async ({ params }) => {
		const post = await getPost({ data: { id: params.id } });
		if (!post) throw notFound();
		return { post };
	},
	head: ({ loaderData }) => {
		const post = loaderData?.post;
		return seo({
			title: `${post?.titleEn && !/[\u4e00-\u9fff]/.test(post.titleEn) ? post.titleEn : "Q&A"} · Tuzhi`,
			description: HOME_DESC_EN,
			path: post ? `/en/community/${post.id}` : "/en/community",
			lang: "en"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./new-Brs4DMLO.mjs");
var Route$4 = createFileRoute("/en/community/new")({
	head: () => seo({
		title: "Ask | Tuzhi",
		description: "Post a photo and what you see in the field.",
		path: "/en/community/new",
		noindex: true,
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./encyclopedia-Dg-mYPAU.mjs");
var Route$3 = createFileRoute("/en/encyclopedia/")({
	head: () => seo({
		title: "Lab words | Tuzhi",
		description: HOME_DESC_EN,
		path: "/en/encyclopedia",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_id-DX0pVV-v.mjs");
var Route$2 = createFileRoute("/en/encyclopedia/$id")({
	loader: ({ params }) => {
		const term = getTerm(params.id);
		if (!term) throw notFound();
		return { term };
	},
	head: ({ loaderData }) => {
		const term = loaderData?.term;
		const copy = term ? localizeTerm(term, "en") : null;
		return seo({
			title: copy ? `${copy.title} · Tuzhi` : "Tuzhi",
			description: copy?.summary?.slice(0, 180) || "Know the soil, farm it well. Field guides and photo check for soil problems. For learning, not a prescription.",
			path: term ? `/en/encyclopedia/${term.id}` : "/en/encyclopedia",
			type: "article",
			lang: "en"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./knowledge-CwbZBaNW.mjs");
var Route$1 = createFileRoute("/en/knowledge/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		crop: typeof s.crop === "string" ? s.crop : void 0,
		problem: typeof s.problem === "string" ? s.problem : void 0,
		region: typeof s.region === "string" ? s.region : void 0,
		season: typeof s.season === "string" ? s.season : void 0
	}),
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => {
		return {
			list: filterArticles(deps),
			facets: facetCounts(deps)
		};
	},
	head: () => seo({
		title: "Field guides | Tuzhi",
		description: HOME_DESC_EN,
		path: "/en/knowledge",
		lang: "en"
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-CkOf6pBq.mjs");
var META = articles_en_meta_default;
var Route = createFileRoute("/en/knowledge/$slug")({
	loader: ({ params }) => {
		const raw = getArticle(params.slug);
		if (!raw) throw notFound();
		return { raw };
	},
	head: ({ loaderData }) => {
		const a = loaderData?.raw;
		const m = a ? META[a.slug] : void 0;
		return seo({
			title: m?.title && !hasHan(m.title) ? `${m.title} · Tuzhi` : "Tuzhi",
			description: m?.summary && !hasHan(m.summary) ? m.summary : HOME_DESC_EN,
			path: a ? `/en/knowledge/${a.slug}` : "/en/knowledge",
			type: "article",
			lang: "en"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$32
});
var AboutRoute = Route$30.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$32
});
var ContactRoute = Route$29.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$32
});
var DiagnoseRoute = Route$28.update({
	id: "/diagnose",
	path: "/diagnose",
	getParentRoute: () => Route$32
});
var EnRoute = Route$27.update({
	id: "/en",
	path: "/en",
	getParentRoute: () => Route$32
});
var LoginRoute = Route$26.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$32
});
var MeRoute = Route$25.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$32
});
var PrivacyRoute = Route$24.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$32
});
var SearchRoute = Route$23.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$32
});
var CommunityIndexRoute = Route$22.update({
	id: "/community/",
	path: "/community/",
	getParentRoute: () => Route$32
});
var CommunityIdRoute = Route$21.update({
	id: "/community/$id",
	path: "/community/$id",
	getParentRoute: () => Route$32
});
var CommunityNewRoute = Route$20.update({
	id: "/community/new",
	path: "/community/new",
	getParentRoute: () => Route$32
});
var EnIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => EnRoute
});
var EnAboutRoute = Route$18.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => EnRoute
});
var EnContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => EnRoute
});
var EnDiagnoseRoute = Route$16.update({
	id: "/diagnose",
	path: "/diagnose",
	getParentRoute: () => EnRoute
});
var EnLoginRoute = Route$15.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => EnRoute
});
var EnMeRoute = Route$14.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => EnRoute
});
var EnPrivacyRoute = Route$13.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => EnRoute
});
var EnSearchRoute = Route$12.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => EnRoute
});
var EncyclopediaIndexRoute = Route$11.update({
	id: "/encyclopedia/",
	path: "/encyclopedia/",
	getParentRoute: () => Route$32
});
var EncyclopediaIdRoute = Route$10.update({
	id: "/encyclopedia/$id",
	path: "/encyclopedia/$id",
	getParentRoute: () => Route$32
});
var KnowledgeIndexRoute = Route$9.update({
	id: "/knowledge/",
	path: "/knowledge/",
	getParentRoute: () => Route$32
});
var KnowledgeSlugRoute = Route$8.update({
	id: "/knowledge/$slug",
	path: "/knowledge/$slug",
	getParentRoute: () => Route$32
});
var ApiAuthSplatRoute = Route$7.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$32
});
var EnCommunityIndexRoute = Route$6.update({
	id: "/community/",
	path: "/community/",
	getParentRoute: () => EnRoute
});
var EnCommunityIdRoute = Route$5.update({
	id: "/community/$id",
	path: "/community/$id",
	getParentRoute: () => EnRoute
});
var EnCommunityNewRoute = Route$4.update({
	id: "/community/new",
	path: "/community/new",
	getParentRoute: () => EnRoute
});
var EnEncyclopediaIndexRoute = Route$3.update({
	id: "/encyclopedia/",
	path: "/encyclopedia/",
	getParentRoute: () => EnRoute
});
var EnEncyclopediaIdRoute = Route$2.update({
	id: "/encyclopedia/$id",
	path: "/encyclopedia/$id",
	getParentRoute: () => EnRoute
});
var EnKnowledgeIndexRoute = Route$1.update({
	id: "/knowledge/",
	path: "/knowledge/",
	getParentRoute: () => EnRoute
});
var EnRouteChildren = {
	EnAboutRoute,
	EnContactRoute,
	EnDiagnoseRoute,
	EnLoginRoute,
	EnMeRoute,
	EnPrivacyRoute,
	EnSearchRoute,
	EnIndexRoute,
	EnCommunityIdRoute,
	EnCommunityNewRoute,
	EnEncyclopediaIdRoute,
	EnKnowledgeSlugRoute: Route.update({
		id: "/knowledge/$slug",
		path: "/knowledge/$slug",
		getParentRoute: () => EnRoute
	}),
	EnCommunityIndexRoute,
	EnEncyclopediaIndexRoute,
	EnKnowledgeIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	DiagnoseRoute,
	EnRoute: EnRoute._addFileChildren(EnRouteChildren),
	LoginRoute,
	MeRoute,
	PrivacyRoute,
	SearchRoute,
	CommunityIdRoute,
	CommunityNewRoute,
	EncyclopediaIdRoute,
	KnowledgeSlugRoute,
	CommunityIndexRoute,
	EncyclopediaIndexRoute,
	KnowledgeIndexRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$32._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "这一页不在"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "This page isn’t here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-4 inline-block text-forest underline",
					children: "回首页 / Home"
				})
			]
		})
	});
}
//#endregion
export { ArticleCard as C, withLangPath as D, usePathLang as E, articleJsonLd as O, ReadAloud as S, messages as T, Home as _, KnowledgeList as a, getFavorites as b, NewPost as c, Privacy as d, Me as f, About as g, Contact as h, Route$8 as i, PostPage as l, Diagnose as m, Route as n, TermPage as o, Login as p, GuidePage as r, WikiList as s, router_exports as t, Community as u, KnowledgeVideo as v, LangLink as w, toggleFavorite as x, PhotoGallery as y };
