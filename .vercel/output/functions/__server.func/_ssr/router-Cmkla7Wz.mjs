import { o as __toESM } from "../_runtime.mjs";
import { H as notFound, S as require_jsx_runtime, U as require_react, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { r as signOut, t as authClient } from "./client-DUtYoQbQ.mjs";
import { t as authMiddleware } from "./middleware-DkjgCcjW.mjs";
import { i as hasGateSessionMarker, t as auth } from "./server-Cj3UhHuY.mjs";
import { d as getArticle } from "./search-DqYpJTx8.mjs";
import { a as MessagesSquare, c as BookOpen, i as ScanLine, n as TriangleAlert, o as House, s as FlaskConical, t as UserRound } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
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
//#region node_modules/.nitro/vite/services/ssr/assets/server-fj0J5r3Y.js
var listPosts = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("04e67d7f6357f36871f5b682b8c29ef050f05772ff57b40eb7fb50b9e90cecc1"));
var getPost = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("96cba498bb5177c3acab66991e358bfd8ed5f4d542ad0da54c3455b07cc30dcb"));
var createPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("1e9d4cadd619017d0384b415fbbef9e8ff2e5b45ab2279f91be8edae2a528e91"));
var addReply = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("523c93b342ee2a4a6a375a1610c7bbff6dc82bb85195ab08150afe1f41141711"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/encyclopedia-Dn41eDB0.js
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/ph-2.jpg",
			"alt": "pH（酸碱度） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "pH（酸碱度）",
			"subtitle": "pH 是尺子，不是病名。改酸改碱都冲着这个数字。",
			"summary": "pH 是尺子，不是病名。改酸改碱都冲着这个数字。",
			"appearance": "报告上先找 pH。低于大约 5.5，根尖容易褐秃；高于 8，新叶容易黄、脉还绿。",
			"conditions": "雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。",
			"commonCrops": "粮菜多数看六点到七点五，茶树另算。",
			"fieldCheck": "单子先圈 pH。低于大约五点五看根尖褐不褐，高于八看新叶黄不黄、脉还绿不绿。",
			"longform": ["你把化验单摊开，先用笔把 pH 这个数圈死。它是尺子，不是病名，改酸改碱都冲着它。低于大约 5.5，根尖容易褐秃；高于 8，新叶容易黄、叶脉还绿。粮田和茶园不是同一把尺子，别听赶集的人说“改到七就好”。数字和地里拧着，先认尺子，再谈改。"],
			"confuse": [{
				"lookalike": "有机质是肉，EC 是咸",
				"difference": "有机质是肉，EC 是咸。pH 只说酸甜。",
				"photoHint": "化验单上的 pH 和地里根尖、新叶放一起看。"
			}, {
				"lookalike": "只看叶子下肥",
				"difference": "pH 是尺子，不是病名。叶子只是线索，对不上就测。",
				"photoHint": "化验单上的 pH 和地里根尖、新叶放一起看。"
			}],
			"plainExplain": "pH 是尺子，不是病名。改酸改碱都冲着这个数字。 雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。",
			"natural": ["雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。", "雨水淋、铵态氮往下推，石灰性母质往上推。"],
			"human": ["只抄邻县袋子，不问自家 pH。", "场面和数字拧着还猛追肥。"],
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
				"只抄邻县袋子，不问自家 pH。",
				"场面和数字拧着还猛追肥。",
				"有机质是肉，EC 是咸。pH 只说酸甜。"
			],
			"whenToTest": "单子上这个数看不懂，或准备改酸改碱前：耕作层多点混合。",
			"prevention": ["铵态氮不要连年当唯一氮源。隔季再测这个数。", "只抄邻县袋子，不问自家 pH。"],
			"indicators": [{
				"name": "pH（酸碱度）",
				"meaning": "pH 是尺子，不是病名。改酸改碱都冲着这个数字。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "有机质",
				"meaning": "土里的肉。肉薄了，别的数字也站不稳。",
				"typical": "慢慢培，不要指望一季翻身"
			}]
		},
		"en": {
			"title": "pH",
			"subtitle": "pH is a ruler, not a disease name.",
			"summary": "pH is a ruler, not a disease name. Lime and alkali work aim at this number.",
			"appearance": "Find pH first. Below about 5.5 root tips brown; above 8 new leaves yellow with green veins.",
			"conditions": "Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
			"commonCrops": "Most grain and vegetables sit around 6–7.5; tea is a different ruler.",
			"fieldCheck": "Find pH first. Below about 5.5 root tips brown; above 8 new leaves yellow with green veins.",
			"longform": ["Spread the sheet and circle pH first. It is a ruler, not a disease name — lime and alkali work both aim at this number. Below about 5.5, root tips go brown and bald. Above 8, new leaves yellow while the veins stay green. Grain fields and tea gardens are not the same ruler. Don’t take the market talk that “seven is always better.” If the number and the field disagree, trust the ruler first.。"],
			"confuse": [{
				"lookalike": "Organic matter is meat, EC is salt",
				"difference": "Organic matter is meat, EC is salt. pH is only sour or sweet.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Guessing from leaves",
				"difference": "pH is a ruler, not a disease. Test when the leaf and the number disagree.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "pH is a ruler, not a disease. Lime and alkali work aim at this number. Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
			"natural": ["Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.", "Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not."],
			"human": ["Copying a neighbour’s lime without your pH.", "Chasing a mismatch with more fertiliser."],
			"steps": [
				"Find pH first. Below about 5.5 root tips brown; above 8 new leaves yellow with green veins.",
				"Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
				"pH is a ruler, not a disease. Lime and alkali work aim at this number. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Copying a neighbour’s lime without your pH.",
				"Chasing a mismatch with more fertiliser.",
				"Organic matter is meat, EC is salt. pH is only sour or sweet."
			],
			"whenToTest": "When you cannot read this number, or before you lime: mix the tilled layer.",
			"prevention": ["Don’t make ammonium-N the only nitrogen for years. Retest next season.", "Copying a neighbour’s lime without your pH."],
			"indicators": [{
				"name": "pH",
				"meaning": "pH is a ruler, not a disease. Lime and alkali work aim at this number.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "Organic matter",
				"meaning": "The soil’s meat. Thin meat makes other numbers wobble.",
				"typical": "Slow work — not a one-season flip"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/om-2.jpg",
			"alt": "有机质 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "有机质",
			"subtitle": "有机质是家底，不是一袋菌的名字。",
			"summary": "有机质是家底，不是一袋菌的名字。",
			"appearance": "土色发浅、一抓就散、肥效年年飘，常常是肉薄了。颜色深不是化验。",
			"conditions": "沙土、裸冬、秸秆全拿走，肉掉得快。还田是慢功夫。",
			"commonCrops": "粮、菜、果都靠这层肉。沙土掉得更快。",
			"fieldCheck": "搓一把：团得住又易散、颜色深，才像有肉。浅、粉、一场雨肥就飘，肉薄了。",
			"longform": ["你搓一把：团得住吗，颜色浅不浅。肉薄了，肥下去一场雨又像没施。还田是慢功夫，一袋菌一季补不回来。颜色深不是化验，但浅了常常肉薄。浅色散土和能搓团的深土并排放。肉是慢慢养的，别指望一季翻身。你搓完自家的，再去邻垄搓一把。散的、浅的，肉就薄。别指望一袋菌把掉的家底一夜补回来，还田是年年的慢功夫。浅了、粉了、一场雨肥就飘，家底就那一层。颜色深不是化验，浅了常常肉薄。"],
			"confuse": [{
				"lookalike": "质地说沙黏，容重说紧",
				"difference": "质地说沙黏，容重说紧。有机质说有没有肉。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}, {
				"lookalike": "颜色深就是有机质高",
				"difference": "颜色深不是化验。搓一把团不团得住更实在。",
				"photoHint": "浅色散土和能搓团的深土并排放。"
			}],
			"plainExplain": "有机质是家底，不是一袋菌的名字。 沙土、裸冬、秸秆全拿走，肉掉得快。还田是慢功夫。",
			"natural": ["沙土、裸冬、秸秆全拿走，肉掉得快。还田是慢功夫。", "沙土、裸冬、秸秆全拿走，肉掉得快。"],
			"human": ["指望一袋菌一季把肉补回来。", "秸秆全拿走，还怪土瘦。"],
			"steps": [
				"搓一把：团得住又易散、颜色深，才像有肉。浅、粉、一场雨肥就飘，肉薄了。",
				"土色发浅、一抓就散、肥效年年飘，常常是肉薄了。颜色深不是化验。",
				"还田是慢功夫。一袋菌一季补不回来。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"指望一袋菌一季把肉补回来。",
				"秸秆全拿走，还怪土瘦。",
				"质地说沙黏，容重说紧。有机质说有没有肉。"
			],
			"whenToTest": "土色发浅、一把就散、肥效年年飘，再测有机质。",
			"prevention": ["秸秆能还就还，少裸冬。肉是慢功夫。", "指望一袋菌一季把肉补回来。"],
			"indicators": [{
				"name": "有机质",
				"meaning": "有机质是家底，不是一袋菌的名字。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Organic matter",
			"subtitle": "Organic matter is the house and the meal, not the name of a microbe bag.",
			"summary": "Organic matter is the house and the meal, not the name of a microbe bag.",
			"appearance": "Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
			"conditions": "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"commonCrops": "Grain, vegetables and fruit all live on this meat. Sand drops it faster.",
			"fieldCheck": "Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
			"longform": ["Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number. Sand, bare winters and straw hauled off drop it fast. Straw return is slow work Easy to mix up: Texture is sand or clay, bulk density is tightness. Organic matter is meat Organic matter is the house and the meal, not the name of a microbe bag.。"],
			"confuse": [{
				"lookalike": "Texture is sand or clay, bulk density is",
				"difference": "Texture is sand or clay, bulk density is tightness. Organic matter is meat.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Dark colour means high OM",
				"difference": "Dark is not a lab number. A handful that holds then breaks is more honest.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Organic matter is the house and the meal, not the name of a microbe bag. Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
			"natural": ["Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.", "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work."],
			"human": ["Expecting a microbe bag to rebuild meat in one season.", "Hauling all the straw off, then blaming thin soil."],
			"steps": [
				"Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
				"Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
				"Organic matter is the house and the meal, not the name of a microbe bag. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Expecting a microbe bag to rebuild meat in one season.",
				"Hauling all the straw off, then blaming thin soil.",
				"Texture is sand or clay, bulk density is tightness. Organic matter is meat."
			],
			"whenToTest": "Pale powdery soil whose fertiliser evaporates — test organic matter.",
			"prevention": ["Return straw if you can. Bare winters drop the meat.", "Expecting a microbe bag to rebuild meat in one season."],
			"indicators": [{
				"name": "Organic matter",
				"meaning": "Organic matter is the house and the meal, not the name of a microbe bag.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/cec-2.jpg",
			"alt": "CEC（阳离子交换量） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "CEC（阳离子交换量）",
			"subtitle": "磁力弱就少量多次，磁力强才一次能多留。",
			"summary": "磁力弱就少量多次，磁力强才一次能多留。",
			"appearance": "CEC 低的沙土，肥下去留不住；黏土和有机质高的土一次能多留一点。",
			"conditions": "质地和有机质决定磁力。质地改不掉，只能把肉养厚。",
			"commonCrops": "沙土磁力弱，黏土和有机质高的土能多留。",
			"fieldCheck": "沙土肥下去留不住，黏土能多留一点。先认质地，再谈一次倒多少。",
			"longform": ["沙土像筛子，黏土像磁铁。磁力弱就少量多次，别按邻县黏土袋数抄。质地改不掉，只能把肉养厚。一次倒全年，沙土留不住。沙土筛子和黏土团子对照着看。你抓一把沙土和一把黏土并排看：筛子盛不住全年的饭，磁铁能多留一口。磁力弱就少吃多餐，别按邻县黏土的袋数往沙地倒。沙地一次堆山，第二天就像没施。你记住磁力弱这三个字。"],
			"confuse": [{
				"lookalike": "质地是沙黏本身，CEC 是抓肥的结果",
				"difference": "质地是沙黏本身，CEC 是抓肥的结果。",
				"photoHint": "沙土筛子和黏土团子对照着看。"
			}, {
				"lookalike": "沙土按黏土袋数倒",
				"difference": "磁力弱就少量多次，别按邻县黏土账抄。",
				"photoHint": "沙土筛子和黏土团子对照着看。"
			}],
			"plainExplain": "磁力弱就少量多次，磁力强才一次能多留。 质地和有机质决定磁力。质地改不掉，只能把肉养厚。",
			"natural": ["质地和有机质决定磁力。质地改不掉，只能把肉养厚。", "质地改不掉，只能把肉养厚。"],
			"human": ["沙土按黏土袋数一次倒全年。", "磁力弱还猛灌大水把肥冲走。"],
			"steps": [
				"沙土肥下去留不住，黏土能多留一点。先认质地，再谈一次倒多少。",
				"CEC 低的沙土，肥下去留不住；黏土和有机质高的土一次能多留一点。",
				"磁力弱就少量多次，别按邻县黏土袋数抄。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"沙土按黏土袋数一次倒全年。",
				"磁力弱还猛灌大水把肥冲走。",
				"质地是沙黏本身，CEC 是抓肥的结果。"
			],
			"whenToTest": "沙土肥留不住、黏土一次能多留，先认质地再谈磁力。",
			"prevention": ["把肉养厚，磁力才会强。沙土只能少量多次。", "沙土按黏土袋数一次倒全年。"],
			"indicators": [{
				"name": "CEC（阳离子交换量）",
				"meaning": "磁力弱就少量多次，磁力强才一次能多留。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "CEC",
			"subtitle": "A weak magnet needs little-and-often. A strong magnet can hold more at once.",
			"summary": "A weak magnet needs little-and-often. A strong magnet can hold more at once.",
			"appearance": "Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold a bigger meal.",
			"conditions": "Texture and OM set the magnet. You cannot change texture; you thicken OM.",
			"commonCrops": "Sand is a weak magnet; clay and high-OM soils hold more.",
			"fieldCheck": "Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold a bigger meal.",
			"longform": ["Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold a bigger meal. Texture and OM set the magnet. You cannot change texture; you thicken OM Easy to mix up: Texture is sand or clay; CEC is the holding that follows A weak magnet needs little-and-often. A strong magnet can hold more at once.。"],
			"confuse": [{
				"lookalike": "Texture is sand or clay; CEC is the hold",
				"difference": "Texture is sand or clay; CEC is the holding that follows.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Sand at clay rates",
				"difference": "A weak magnet needs little-and-often.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "A weak magnet needs little-and-often. A strong magnet can hold more at once. Texture and OM set the magnet. You cannot change texture; you thicken OM.",
			"natural": ["Texture and OM set the magnet. You cannot change texture; you thicken OM.", "Texture and OM set the magnet. You cannot change texture; you thicken OM."],
			"human": ["Pouring a season onto sand in one hit.", "Flooding a weak magnet so the meal washes away."],
			"steps": [
				"Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold a bigger meal.",
				"Texture and OM set the magnet. You cannot change texture; you thicken OM.",
				"A weak magnet needs little-and-often. A strong magnet can hold more at once. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Pouring a season onto sand in one hit.",
				"Flooding a weak magnet so the meal washes away.",
				"Texture is sand or clay; CEC is the holding that follows."
			],
			"whenToTest": "Sand that will not hold fertiliser: name texture, then the magnet.",
			"prevention": ["Thicken the meat. Sand only takes little-and-often.", "Pouring a season onto sand in one hit."],
			"indicators": [{
				"name": "CEC",
				"meaning": "A weak magnet needs little-and-often. A strong magnet can hold more at once.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/aggregate-2.jpg",
			"alt": "团粒结构 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "团粒结构",
			"subtitle": "团粒是土的面包结构，不是化肥能立刻捏出来的。",
			"summary": "团粒是土的面包结构，不是化肥能立刻捏出来的。",
			"appearance": "好土能搓团又易散，里面有孔隙。面土干了像面粉，湿了像浆。",
			"conditions": "有机质、根系、菌丝是胶水。旋耕过碎、雨打裸地，团粒就散。",
			"commonCrops": "粮田、菜地、果园都要团粒，旋碎了就面。",
			"fieldCheck": "好土能搓团又易散。干了面、湿了浆，团粒散了，不是质地变了。",
			"longform": ["好土能搓团又易散。干了面、湿了浆，就是路封了，不是沙变成了黏。胶水是有机质、根和菌丝。板结是路封了，质地没变。面粉土和面包土并排放。干了面湿了浆，是路封了，不是质地变了。你捏一把干土、再捏一把湿土。干了面、湿了浆，是胶水散了。别把这当成质地变了，去换沙换黏。雨点砸裸地，房间塌得最快。好土像面包，粉土像面粉。雨点一砸房间就塌。"],
			"confuse": [{
				"lookalike": "板结是团粒散了又被压死",
				"difference": "板结是团粒散了又被压死。质地没变，路封了。",
				"photoHint": "面粉土和面包土并排放。"
			}, {
				"lookalike": "干了面湿了浆当缺肥",
				"difference": "团粒散了路封了，不是沙变成了黏。",
				"photoHint": "面粉土和面包土并排放。"
			}],
			"plainExplain": "团粒是土的面包结构，不是化肥能立刻捏出来的。 有机质、根系、菌丝是胶水。旋耕过碎、雨打裸地，团粒就散。",
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
				"meaning": "团粒是土的面包结构，不是化肥能立刻捏出来的。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Aggregation",
			"subtitle": "Crumbs are the loaf structure. Fertiliser will not pinch them into being.",
			"summary": "Crumbs are the loaf structure. Fertiliser will not pinch them into being.",
			"appearance": "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
			"conditions": "OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
			"commonCrops": "Grain, vegetables and orchards all need crumbs.",
			"fieldCheck": "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
			"longform": ["Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet. OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs Easy to mix up: Compaction is crumbs smashed then smeared. Texture did not change; the road closed Crumbs are the loaf structure. Fertiliser will not pinch them into being.。"],
			"confuse": [{
				"lookalike": "Compaction is crumbs smashed then smeare",
				"difference": "Compaction is crumbs smashed then smeared. Texture did not change; the road closed.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Flour-when-dry means hunger",
				"difference": "Crumbs smashed. Texture did not change.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Crumbs are the loaf structure. Fertiliser will not pinch them into being. OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
			"natural": ["OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.", "OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs."],
			"human": ["Bare soil in the rain, then rotavating it to flour.", "Treating soup-when-wet as hunger."],
			"steps": [
				"Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
				"OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
				"Crumbs are the loaf structure. Fertiliser will not pinch them into being. Rates live on the matching field note."
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
				"meaning": "Crumbs are the loaf structure. Fertiliser will not pinch them into being.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/alkn-2.jpg",
			"alt": "碱解氮 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "碱解氮",
			"subtitle": "碱解氮是当季饭量的尺子，不是处方。",
			"summary": "碱解氮是当季饭量的尺子，不是处方。",
			"appearance": "化验单上“现在能用的氮”大概有多少。不是土里全部的氮。",
			"conditions": "过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。",
			"commonCrops": "当季要氮的作物都看这一列。",
			"fieldCheck": "这是当季能用的氮，不是土里全部的氮。两项对着看。",
			"longform": ["这是当季饭量，不是仓库全部的氮。两项对着看，才知道是缺还是被锁。过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。全氮和碱解氮两列对着圈。仓库有、当季饭不够，两项要对着看。你把全氮和这一列对着圈。仓库有、当季饭不够，两项拧着才像被锁。别跨省拿一张表死套，当地实验室的分级才算数。两项拧着，先问锁在哪，再谈袋子。按当地分级读，别跨省死套。"],
			"confuse": [{
				"lookalike": "全氮高、碱解氮低，说明库在、当年饭不够",
				"difference": "全氮高、碱解氮低，说明库在、当年饭不够。",
				"photoHint": "全氮和碱解氮两列对着圈。"
			}, {
				"lookalike": "全氮高就以为不缺",
				"difference": "这是当季饭量，不是仓库全部的氮。两项对着看。",
				"photoHint": "全氮和碱解氮两列对着圈。"
			}],
			"plainExplain": "碱解氮是当季饭量的尺子，不是处方。 过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。",
			"natural": ["过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。", "库在、当年饭不够，两项要对着看。"],
			"human": ["只看全氮高就以为不缺。", "跨省死套别人的分级。"],
			"steps": [
				"这是当季能用的氮，不是土里全部的氮。两项对着看。",
				"化验单上“现在能用的氮”大概有多少。不是土里全部的氮。",
				"当季饭量的尺子，不是处方。"
			],
			"dosage": [{
				"name": "这条只讲化验单上的词",
				"range": "用量去农业知识里看",
				"note": "按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关农业知识。"
			}],
			"dontDo": [
				"只看全氮高就以为不缺。",
				"跨省死套别人的分级。",
				"全氮高、碱解氮低，说明库在、当年饭不够。"
			],
			"whenToTest": "当季黄叶、脱肥，读这一列。全氮高也要对着看。",
			"prevention": ["当季饭和仓库两项对着看，别跨省死套。", "只看全氮高就以为不缺。"],
			"indicators": [{
				"name": "碱解氮",
				"meaning": "碱解氮是当季饭量的尺子，不是处方。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Available N",
			"subtitle": "Available N is this season’s plate, not a prescription.",
			"summary": "Available N is this season’s plate, not a prescription.",
			"appearance": "A rough “N the crop can use this season”. Not total nitrogen.",
			"conditions": "Too low, yellowing; too high, lodging. Use local ranges.",
			"commonCrops": "Any crop hungry for nitrogen this season reads this column.",
			"fieldCheck": "A rough “N the crop can use this season”. Not total nitrogen.",
			"longform": ["A rough “N the crop can use this season”. Not total nitrogen. Too low, yellowing; too high, lodging. Use local ranges Easy to mix up: High total N with low available N means a warehouse and an empty plate this season Available N is this season’s plate, not a prescription.。"],
			"confuse": [{
				"lookalike": "High total N with low available N means ",
				"difference": "High total N with low available N means a warehouse and an empty plate this season.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "High total N means no lack",
				"difference": "This is this season’s plate, not the warehouse.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available N is this season’s plate, not a prescription. Too low, yellowing; too high, lodging. Use local ranges.",
			"natural": ["Too low, yellowing; too high, lodging. Use local ranges.", "Too low, yellowing; too high, lodging. Use local ranges."],
			"human": ["High total N, so you skip this season’s plate.", "Pasting another province’s table on your field."],
			"steps": [
				"A rough “N the crop can use this season”. Not total nitrogen.",
				"Too low, yellowing; too high, lodging. Use local ranges.",
				"Available N is this season’s plate, not a prescription. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"High total N, so you skip this season’s plate.",
				"Pasting another province’s table on your field.",
				"High total N with low available N means a warehouse and an empty plate this season."
			],
			"whenToTest": "This-season yellowing. Read it against total N.",
			"prevention": ["Read this season’s plate against the warehouse. Don’t paste another province’s table.", "High total N, so you skip this season’s plate."],
			"indicators": [{
				"name": "Available N",
				"meaning": "Available N is this season’s plate, not a prescription.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Available K",
			"subtitle": "Available K is this season’s plate, not potassium in the rock.",
			"summary": "Available K is this season’s plate, not potassium in the rock.",
			"appearance": "K the crop can use this season. Sand, high yield, straw removed — often low.",
			"conditions": "Margin scorch is not only K. Read available K, and salt.",
			"commonCrops": "This season’s K. Straw hauled off runs low.",
			"fieldCheck": "K the crop can use this season. Sand, high yield, straw removed — often low.",
			"longform": ["K the crop can use this season. Sand, high yield, straw removed — often low. Margin scorch is not only K. Read available K, and salt Easy to mix up: High total K, low available K: warehouse full, plate empty Available K is this season’s plate, not potassium in the rock.。"],
			"confuse": [{
				"lookalike": "High total K, low available K: warehouse",
				"difference": "High total K, low available K: warehouse full, plate empty.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Scorch, so pour K",
				"difference": "Sand and straw hauled off run low. Salt scorches too.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Available K is this season’s plate, not potassium in the rock. Margin scorch is not only K. Read available K, and salt.",
			"natural": ["Margin scorch is not only K. Read available K, and salt.", "Margin scorch is not only K. Read available K, and salt."],
			"human": ["Every scorch gets potassium, salt unasked.", "High-yield fields that never return straw."],
			"steps": [
				"K the crop can use this season. Sand, high yield, straw removed — often low.",
				"Margin scorch is not only K. Read available K, and salt.",
				"Available K is this season’s plate, not potassium in the rock. Rates live on the matching field note."
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
				"meaning": "Available K is this season’s plate, not potassium in the rock.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/ca-2.jpg",
			"alt": "交换性钙 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性钙",
			"subtitle": "交换性钙是土能交出的钙砖。叶面钙只救急。",
			"summary": "交换性钙是土能交出的钙砖。叶面钙只救急。",
			"appearance": "缺钙走顶芽、脐腐、裂果、心叶焦。老叶相对还好。土里有钙也会吃不到。",
			"conditions": "钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。",
			"commonCrops": "番茄、花生、大白菜心叶最会写出来。",
			"fieldCheck": "顶芽、脐部、心叶先出事，老叶还好。水忽干忽湿更明显。",
			"longform": ["顶芽、脐部、心叶先出事，老叶还好。土里有钙也会走不到尖，水忽干忽湿更明显。钙像砌墙的砖，摆上就不大搬家。顶芽脐腐心叶焦，老叶还好。这几天水稳不稳写在备注里。你看顶芽、脐部、心叶，老叶常常还好。这几天水忽干忽湿，钙更走不到尖。先把水浇稳，再谈喷不喷。尖先出事，老叶还好。铵态氮多了，尖更吃不到钙。"],
			"confuse": [{
				"lookalike": "病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不",
				"difference": "病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不稳更明显。",
				"photoHint": "脐腐果和还绿的老叶对照。"
			}, {
				"lookalike": "脐腐了只打药",
				"difference": "老叶还好、心叶先出事。这几天水稳不稳，比袋子要紧。",
				"photoHint": "脐腐果和还绿的老叶对照。"
			}],
			"plainExplain": "交换性钙是土能交出的钙砖。叶面钙只救急。 钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。",
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
				"meaning": "交换性钙是土能交出的钙砖。叶面钙只救急。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/al-2.jpg",
			"alt": "交换性铝 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "交换性铝",
			"subtitle": "交换性铝是酸土里的牙。治本是改酸，不是再追氮。",
			"summary": "交换性铝是酸土里的牙。治本是改酸，不是再追氮。",
			"appearance": "pH 低于大约 5.5，铝溶出来咬根尖：褐、秃、少白尖。地上才发僵。",
			"conditions": "南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。",
			"commonCrops": "红黄壤、酸茶园、南方粮田先认它。",
			"fieldCheck": "洗根看尖：褐秃少白尖。pH 低了铝才出来咬。",
			"longform": ["洗根看尖：褐秃少白尖。酸碱低了铝才出来咬。根秃了还追氮，嘴越伤越深。改酸是治本。茶叶耐酸，也不是越酸越好。洗出来的褐秃根尖特写。酸碱低了它才出来咬，根秃了别再追氮。你洗手洗根，尖褐、秃、没白尖，才像它在咬。酸碱低了它才出来。根秃了还追氮，嘴越伤越深，先改酸。粮田石灰别往茶园倒。根尖褐秃时，磷也被锁住。"],
			"confuse": [{
				"lookalike": "缺肥根还在、只是细；铝毒是尖被咬掉",
				"difference": "缺肥根还在、只是细；铝毒是尖被咬掉。先洗根再谈肥。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}, {
				"lookalike": "根秃了还猛尿素",
				"difference": "pH 低了铝才出来咬。改酸是治本。",
				"photoHint": "褐秃根尖和邻垄白根对照。"
			}],
			"plainExplain": "交换性铝是酸土里的牙。治本是改酸，不是再追氮。 南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。",
			"natural": ["南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。", "pH 低于大约五点五，铝才活跃。"],
			"human": ["根秃了还猛尿素。", "没测 pH 就按听说撒灰。"],
			"steps": [
				"洗根看尖：褐秃少白尖。pH 低了铝才出来咬。",
				"pH 低于大约 5.5，铝溶出来咬根尖：褐、秃、少白尖。地上才发僵。",
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
				"缺肥根还在、只是细；铝毒是尖被咬掉。先洗根再谈肥。"
			],
			"whenToTest": "根尖褐秃、锈水、苗僵，测酸碱和交换性铝。",
			"prevention": ["有机质能络合一部分铝。根秃时别猛氮。", "根秃了还猛尿素。"],
			"indicators": [{
				"name": "交换性铝",
				"meaning": "交换性铝是酸土里的牙。治本是改酸，不是再追氮。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Exchangeable Al",
			"subtitle": "Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N.",
			"summary": "Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N.",
			"appearance": "Below about pH 5.5, aluminium dissolves and bites root tips: brown, bald, few white tips. Then the top stalls.",
			"conditions": "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
			"commonCrops": "Red-yellow earth, acid tea, southern grain.",
			"fieldCheck": "Below about pH 5.5, aluminium dissolves and bites root tips: brown, bald, few white tips. Then the top stalls.",
			"longform": ["Below about pH 5.5, aluminium dissolves and bites root tips: brown, bald, few white tips. Then the top stalls. Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid Easy to mix up: Hunger keeps a root, just thin; aluminium bites the tip off. Wash roots before you talk fertiliser Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N.。"],
			"confuse": [{
				"lookalike": "Hunger keeps a root, just thin; aluminiu",
				"difference": "Hunger keeps a root, just thin; aluminium bites the tip off. Wash roots before you talk fertiliser.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Bald roots need urea",
				"difference": "Aluminium bites when pH is low. Lime is the job.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N. Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
			"natural": ["Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.", "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid."],
			"human": ["Urea on bald roots.", "Liming by hearsay without a pH."],
			"steps": [
				"Below about pH 5.5, aluminium dissolves and bites root tips: brown, bald, few white tips. Then the top stalls.",
				"Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
				"Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Urea on bald roots.",
				"Liming by hearsay without a pH.",
				"Hunger keeps a root, just thin; aluminium bites the tip off. Wash roots before you talk fertiliser."
			],
			"whenToTest": "Brown bald tips, rusty water: pH and exchangeable Al.",
			"prevention": ["Organic matter can bind some aluminium. Don’t pour N on bald roots.", "Urea on bald roots."],
			"indicators": [{
				"name": "Exchangeable Al",
				"meaning": "Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/ec-2.jpg",
			"alt": "EC（电导率） 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "EC（电导率）",
			"subtitle": "EC 是咸度计。超了就是在腌根，不是缺水。",
			"summary": "EC 是咸度计。超了就是在腌根，不是缺水。",
			"appearance": "EC 说土水有多咸。数字高，根喝水费劲。苗期更敏感。",
			"conditions": "大棚、盐碱地、滴灌过浓，EC 最容易高。降低靠洗盐、控肥。",
			"commonCrops": "大棚、盐碱地、滴灌必看。",
			"fieldCheck": "滴口白圈、越浇越蔫，常常是这个数上去了。",
			"longform": ["滴口白圈、越浇越蔫，常常是这个数上去了。咸看它，涩看酸碱和钠。大棚和盐碱地必看。苗期更敏感。滴口白圈和电导读数同一张。你看滴口白圈、越浇越蔫，常常是这个数上去了。苗期更敏感，肥液先淡下来。尺子是电导仪，不是舌头。大棚和盐碱地这一格必看。苗越嫩越怕咸。滴口白圈一出现，先把肥液淡下来。"],
			"confuse": [{
				"lookalike": "pH 说酸甜，全盐说盐的总量",
				"difference": "pH 说酸甜，全盐说盐的总量。EC 是当季能喝到的咸。",
				"photoHint": "滴口白圈特写。"
			}, {
				"lookalike": "越浇越蔫还加大肥",
				"difference": "滴口白圈常常是这个数上去了。先把肥液淡下来。",
				"photoHint": "滴口白圈特写。"
			}],
			"plainExplain": "EC 是咸度计。超了就是在腌根，不是缺水。 大棚、盐碱地、滴灌过浓，EC 最容易高。降低靠洗盐、控肥。",
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
				"越浇越蔫还加大肥。",
				"滴口白圈当缺钙。",
				"pH 说酸甜，全盐说盐的总量。EC 是当季能喝到的咸。"
			],
			"whenToTest": "滴口白圈、越浇越蔫，先测电导。",
			"prevention": ["薄肥勤施。全年不揭膜，盆会越来越咸。", "越浇越蔫还加大肥。"],
			"indicators": [{
				"name": "EC（电导率）",
				"meaning": "EC 是咸度计。超了就是在腌根，不是缺水。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "EC",
			"subtitle": "EC is a salt meter. Too high pickles the root — it is not drought.",
			"summary": "EC is a salt meter. Too high pickles the root — it is not drought.",
			"appearance": "EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive.",
			"conditions": "Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
			"commonCrops": "Greenhouses, salt country, drip lines.",
			"fieldCheck": "EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive.",
			"longform": ["EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive. Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds Easy to mix up: pH is sour/sweet; total salt is the pile. EC is the saltiness the root drinks now EC is a salt meter. Too high pickles the root — it is not drought.。"],
			"confuse": [{
				"lookalike": "pH is sour/sweet; total salt is the pile",
				"difference": "pH is sour/sweet; total salt is the pile. EC is the saltiness the root drinks now.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "More wilt, stronger feed",
				"difference": "A white ring at the dripper is this number going up.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "EC is a salt meter. Too high pickles the root — it is not drought. Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
			"natural": ["Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.", "Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds."],
			"human": ["Stronger feed when wilt gets worse.", "A white dripper ring treated as calcium lack."],
			"steps": [
				"EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive.",
				"Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
				"EC is a salt meter. Too high pickles the root — it is not drought. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Stronger feed when wilt gets worse.",
				"A white dripper ring treated as calcium lack.",
				"pH is sour/sweet; total salt is the pile. EC is the saltiness the root drinks now."
			],
			"whenToTest": "White ring at the dripper, more wilt after watering — EC.",
			"prevention": ["Thin feeds. A film left on all year salts the bowl.", "Stronger feed when wilt gets worse."],
			"indicators": [{
				"name": "EC",
				"meaning": "EC is a salt meter. Too high pickles the root — it is not drought.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
			"fieldCheck": "可溶盐一共有多少。白霜是盐的名片。",
			"longform": ["可溶盐一共有多少。白霜是盐的名片，不是每一片白都该撒同一袋。和电导一起看盐害。盐害和碱害不是一回事。白霜特写。不是每一片白都该撒同一袋，盐害和碱害不是一回事。你拿手刮一层白霜。咸和涩要分开，没沟别大水漫灌。改碱的那袋不是见白就用。白霜厚处和出苗齐处要分开看。不是每一片白都该撒同一袋。"],
			"confuse": [{
				"lookalike": "碱害看 pH 和钠",
				"difference": "碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。",
				"photoHint": "白霜和出苗花斑对照。"
			}, {
				"lookalike": "见白霜一律同一袋",
				"difference": "白霜是盐的名片，咸和涩不是一回事。",
				"photoHint": "白霜和出苗花斑对照。"
			}],
			"plainExplain": "全盐是盐的总量。咸和涩不是一回事。 滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
			"natural": ["滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。", "和电导一起看。盐害和碱害不是一回事。"],
			"human": ["见白霜一律同一袋。", "没沟还大水漫灌。"],
			"steps": [
				"可溶盐一共有多少。白霜是盐的名片。",
				"土里可溶盐一共有多少。和 EC 一起看盐害。",
				"白霜是盐的名片，不是每一片白都同一袋。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/bulk-2.jpg",
			"alt": "容重 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "容重",
			"subtitle": "容重是紧不紧的尺子。锄不动要问它，不要先问缺肥。",
			"summary": "容重是紧不紧的尺子。锄不动要问它，不要先问缺肥。",
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
			"plainExplain": "容重是紧不紧的尺子。锄不动要问它，不要先问缺肥。 车辙、湿耕、年年旋耕会把容重抬上去。有机质能慢慢降。",
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
				"meaning": "容重是紧不紧的尺子。锄不动要问它，不要先问缺肥。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Bulk density",
			"subtitle": "Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger.",
			"summary": "Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger.",
			"appearance": "How heavy a given volume of soil is. High in the tilled layer means compaction.",
			"conditions": "Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
			"commonCrops": "Wheelings, rotavated fields, clean-cultivated orchards.",
			"fieldCheck": "How heavy a given volume of soil is. High in the tilled layer means compaction.",
			"longform": ["How heavy a given volume of soil is. High in the tilled layer means compaction. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly Easy to mix up: Porosity is the other face: high bulk density, few pores. Not two unrelated words Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger.。"],
			"confuse": [{
				"lookalike": "Porosity is the other face: high bulk de",
				"difference": "Porosity is the other face: high bulk density, few pores. Not two unrelated words.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Sideways roots need fertiliser",
				"difference": "High bulk density is a closed road.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
			"natural": ["Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.", "Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly."],
			"human": ["Driving on wet soil until the road dies.", "Sideways roots chased with fertiliser."],
			"steps": [
				"How heavy a given volume of soil is. High in the tilled layer means compaction.",
				"Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
				"Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger. Rates live on the matching field note."
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
				"meaning": "Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"alt": "测土配方 田间对照",
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/test-2.jpg",
			"alt": "测土配方 特写",
			"caption": "特写对照，请以自家地为准。"
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
				"difference": "看叶片能猜，不能代替这四个字。邻县袋子不是配方。",
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
				"看叶片能猜，不能代替这四个字。邻县袋子不是配方。"
			],
			"whenToTest": "打算改土施肥前：耕作层多点混合。",
			"prevention": ["改土施肥前取样。单位看错一位会下错肥。", "田边一个坑就代表整块地。"],
			"indicators": [{
				"name": "测土配方",
				"meaning": "测土配方是方法，不是一张万能处方。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
			"conditions": "干旱灌区、滨海、大棚盆里，盐碱最常见。咸看 EC，涩看 pH 和钠。",
			"commonCrops": "滨海、灌区、苏打碱斑都用这个名字。",
			"fieldCheck": "盐是咸，碱是涩。有白霜先当盐的名片。",
			"longform": ["盐是咸，碱是涩。有白霜先当盐的名片。没沟不要大水漫灌。盐害看全盐或电导，碱害看酸碱和钠。白霜是盐的名片。没沟不要大水漫灌，咸和涩要分开。你先问有没有沟。有白霜当盐的名片，没沟大水只会把盐抬上来。咸看电导，涩看酸碱和钠，别见白就下一袋。有沟才洗。小水勤浇最会把盐往上抬。井水要是也咸，沟通不通先问。"],
			"confuse": [{
				"lookalike": "缺钾也焦边，但土面不一定白",
				"difference": "缺钾也焦边，但土面不一定白。旱了土干，咸了常有白霜还湿着蔫。",
				"photoHint": "白霜加焦边，咸涩分开拍。"
			}, {
				"lookalike": "没沟还大水漫灌",
				"difference": "盐是咸，碱是涩。有白霜先当盐的名片。",
				"photoHint": "白霜加焦边，咸涩分开拍。"
			}],
			"plainExplain": "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。 干旱灌区、滨海、大棚盆里，盐碱最常见。咸看 EC，涩看 pH 和钠。",
			"natural": ["干旱灌区、滨海、大棚盆里，盐碱最常见。咸看 EC，涩看 pH 和钠。", "盐是咸，碱是涩。白霜先当盐的名片。"],
			"human": ["没沟大水漫灌。", "咸和涩混成一袋。"],
			"steps": [
				"盐是咸，碱是涩。有白霜先当盐的名片。",
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"低于大约五点五才改。茶园和粮田不是同一把尺子。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Acidification",
			"subtitle": "Acidification is the name of pH walking down. Rates live on the acid handbook page.",
			"summary": "Acidification is the name of pH walking down. Rates live on the acid handbook page.",
			"appearance": "The soil sours over years. Aluminium bites roots, seedlings stall, water may run rusty.",
			"conditions": "Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.",
			"commonCrops": "Red-yellow earth, southern grain, too-acid tea.",
			"fieldCheck": "The soil sours over years. Aluminium bites roots, seedlings stall, water may run rusty.",
			"longform": ["The soil sours over years. Aluminium bites roots, seedlings stall, water may run rusty. Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not Easy to mix up: Hunger keeps a root; acidification bites the tip first. Tea-too-acid and grain acidification are different pages Acidification is the name of pH walking down. Rates live on the acid handbook page.。"],
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
				"The soil sours over years. Aluminium bites roots, seedlings stall, water may run rusty.",
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Compaction / plough pan",
			"subtitle": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
			"summary": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
			"appearance": "A hoe that will not bite, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
			"conditions": "Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.",
			"commonCrops": "Yearly-rotavated grain, wet-tilled vegetables.",
			"fieldCheck": "A hoe that will not bite, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
			"longform": ["A hoe that will not bite, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan. Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue Easy to mix up: Dry hard soil melts when watered; a pan is a shiny lid underneath that water cannot cross Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.。"],
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
				"A hoe that will not bite, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
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
			"whenToTest": "Hoe that will not bite: dig the shiny lid.",
			"prevention": ["Subsoil at crumb-moist, alternate years. OM rebuilds crumbs.", "A wet rotavate counted as subsoiling."],
			"indicators": [{
				"name": "Compaction / plough pan",
				"meaning": "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/porosity-2.jpg",
			"alt": "孔隙度 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "孔隙度",
			"subtitle": "孔隙度是呼吸的路。改它靠结构，不靠当季氮。",
			"summary": "孔隙度是呼吸的路。改它靠结构，不靠当季氮。",
			"appearance": "土里空气和水走的路。孔隙少，根闷、雨后积水、锄下去发亮。",
			"conditions": "团粒多则孔隙多。压实、湿耕、有机质薄，路就封。",
			"commonCrops": "板结田、湿耕地、有机质薄的地。",
			"fieldCheck": "路少了根闷、雨后积水。压实和湿耕把路封上。",
			"longform": ["空气和水走的路。路少了根闷、雨后积水。压实和湿耕把路封上。团粒多则孔隙多。改它靠结构，不靠当季氮。路少了根闷雨后积水。压实和湿耕把路封上，改它靠结构。你想土里空气和水走的路。压实和湿耕把路封上，改路靠团粒，不靠当季再追一把氮。团粒多则路多。改路靠结构，氮肥当不了镐。湿耕把路封上，根就会闷。"],
			"confuse": [{
				"lookalike": "容重是重量，孔隙度是空着的比例",
				"difference": "容重是重量，孔隙度是空着的比例。一个高了另一个就低。",
				"photoHint": "发亮锄面和积水对照。"
			}, {
				"lookalike": "路封了还当季猛氮",
				"difference": "孔隙少根闷。改它靠结构。",
				"photoHint": "发亮锄面和积水对照。"
			}],
			"plainExplain": "孔隙度是呼吸的路。改它靠结构，不靠当季氮。 团粒多则孔隙多。压实、湿耕、有机质薄，路就封。",
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
				"meaning": "孔隙度是呼吸的路。改它靠结构，不靠当季氮。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Porosity",
			"subtitle": "Porosity is the breathing road. You change it with structure, not in-season nitrogen.",
			"summary": "Porosity is the breathing road. You change it with structure, not in-season nitrogen.",
			"appearance": "The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
			"conditions": "Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
			"commonCrops": "Compacted, wet-tilled, thin-OM fields.",
			"fieldCheck": "The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
			"longform": ["The roads air and water take. Few pores: roots smother, water ponds, the hoe shines. Crumbs make pores. Compaction, wet tillage and thin OM close the roads Easy to mix up: Bulk density is weight; porosity is empty space. When one rises the other falls Porosity is the breathing road. You change it with structure, not in-season nitrogen.。"],
			"confuse": [{
				"lookalike": "Bulk density is weight; porosity is empt",
				"difference": "Bulk density is weight; porosity is empty space. When one rises the other falls.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Closed pores, more N",
				"difference": "You open roads with structure.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Porosity is the breathing road. You change it with structure, not in-season nitrogen. Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
			"natural": ["Crumbs make pores. Compaction, wet tillage and thin OM close the roads.", "Crumbs make pores. Compaction, wet tillage and thin OM close the roads."],
			"human": ["Closed pores chased with in-season N.", "Wet tillage that kills the pores."],
			"steps": [
				"The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
				"Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
				"Porosity is the breathing road. You change it with structure, not in-season nitrogen. Rates live on the matching field note."
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
				"meaning": "Porosity is the breathing road. You change it with structure, not in-season nitrogen.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
		}, {
			"src": "/images/wiki/fc-2.jpg",
			"alt": "田间持水量 特写",
			"caption": "特写对照，请以自家地为准。"
		}],
		"zh": {
			"title": "田间持水量",
			"subtitle": "田间持水量是土的水杯刻度。浇水浇到过线就是涝。",
			"summary": "田间持水量是土的水杯刻度。浇水浇到过线就是涝。",
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
				"difference": "过了这条线就是涝。先想水杯刻度。",
				"photoHint": "土湿还蔫，面干底湿对照。"
			}],
			"plainExplain": "田间持水量是土的水杯刻度。浇水浇到过线就是涝。 质地和有机质决定它。低于这个数苗旱，长期高于它根闷。",
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
			"whenToTest": "土湿还蔫，先想这条线。沙黏不同，别按邻县灌量抄。",
			"prevention": ["浇水浇到过线就是涝。沙黏不同。", "土湿还蔫当干旱猛灌。"],
			"indicators": [{
				"name": "田间持水量",
				"meaning": "田间持水量是土的水杯刻度。浇水浇到过线就是涝。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Field capacity",
			"subtitle": "Field capacity is the cup mark. Irrigating past it is waterlog.",
			"summary": "Field capacity is the cup mark. Irrigating past it is waterlog.",
			"appearance": "Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
			"conditions": "Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
			"commonCrops": "Sand holds little; clay holds much but may not give it.",
			"fieldCheck": "Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
			"longform": ["Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root. Texture and OM set it. Below it the crop dries; stuck above it, roots smother Easy to mix up: Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between Field capacity is the cup mark. Irrigating past it is waterlog.。"],
			"confuse": [{
				"lookalike": "Waterlog is water pushing air out; droug",
				"difference": "Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Wet and wilted, irrigate",
				"difference": "Past field capacity is waterlog.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Field capacity is the cup mark. Irrigating past it is waterlog. Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
			"natural": ["Texture and OM set it. Below it the crop dries; stuck above it, roots smother.", "Texture and OM set it. Below it the crop dries; stuck above it, roots smother."],
			"human": ["Wet wilt irrigated as drought.", "Watering past the cup mark."],
			"steps": [
				"Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
				"Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
				"Field capacity is the cup mark. Irrigating past it is waterlog. Rates live on the matching field note."
			],
			"dosage": [{
				"name": "This page names the lab word",
				"range": "Rates live in Farm knowledge",
				"note": "Follow a soil test, local extension and the label. Bag counts live on the related farm knowledge."
			}],
			"dontDo": [
				"Wet wilt irrigated as drought.",
				"Watering past the cup mark.",
				"Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between."
			],
			"whenToTest": "Wet and still wilted: think this line. Sand and clay differ.",
			"prevention": ["Irrigating past the mark is waterlog. Sand and clay differ.", "Wet wilt irrigated as drought."],
			"indicators": [{
				"name": "Field capacity",
				"meaning": "Field capacity is the cup mark. Irrigating past it is waterlog.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
		},
		"en": {
			"title": "Gleying",
			"subtitle": "Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser.",
			"summary": "Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser.",
			"appearance": "Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
			"conditions": "Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
			"commonCrops": "Cold-soaked hollows, riverside wetlands.",
			"fieldCheck": "Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
			"longform": ["Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields. Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down Easy to mix up: A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser.。"],
			"confuse": [{
				"lookalike": "A flood is one rain; gleying is a room t",
				"difference": "A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins.",
				"photoHint": "Put two sheets or two scenes next to each other."
			}, {
				"lookalike": "Feed a cold-soaked field first",
				"difference": "One rain is a flood; gleying is a wet room.",
				"photoHint": "Sheet and plant together."
			}],
			"plainExplain": "Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser. Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
			"natural": ["Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.", "Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down."],
			"human": ["Feeding a cold-soaked field before you drain.", "One rain confused with a wet room."],
			"steps": [
				"Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
				"Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
				"Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser. Rates live on the matching field note."
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
				"meaning": "Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser.",
				"typical": "Use the local lab’s classes. Don’t paste another province’s table."
			}, {
				"name": "pH",
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
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
			"caption": "示意图，不能单凭此图下肥。"
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
				"lookalike": "死棵了再买一袋菌",
				"difference": "点片死棵、邻地轮作却好。菌剂代替不了换科。",
				"photoHint": "死棵根和邻地还绿对照。"
			}],
			"plainExplain": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。 病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。",
			"natural": ["病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。", "病菌、线虫、盐和偏肥熬在一口锅里。"],
			"human": ["死棵了再买一袋菌。", "不换科还连种。"],
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
				"死棵了再买一袋菌。",
				"不换科还连种。",
				"单纯缺肥是整片匀；连作是点片、越种越重。先看根，再看盐。"
			],
			"whenToTest": "点片死棵、邻地轮作却好，先看根再测盐和病。",
			"prevention": ["换科轮作。死棵别留田。", "死棵了再买一袋菌。"],
			"indicators": [{
				"name": "连作障碍",
				"meaning": "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。",
				"typical": "按当地实验室分级，不要跨省死套。"
			}, {
				"name": "pH",
				"meaning": "酸碱尺子，很多微量元素先看它。",
				"typical": "多数粮菜 6.0～7.5"
			}]
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
				"meaning": "The acid–alkaline ruler. Many micronutrients wait on it.",
				"typical": "Most grain 6.0–7.5"
			}]
		}
	}
};
var lab_groups_default = [
	{
		"id": "ruler",
		"title": "单子上的尺子",
		"titleEn": "The rulers",
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
			"mo"
		]
	},
	{
		"id": "ion",
		"title": "伤根的离子",
		"titleEn": "Ions that bite",
		"ids": ["al", "na"]
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
		"zh": "常见 mS/cm 或 dS/m，也有 μS/cm。水土比不同，数字不能直接抄邻县。",
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
		"en": "Exchangeable Al often cmol/kg. It wakes up when pH is low."
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
		"zh": "盐碱是判断。咸看 EC/全盐，涩看 pH 和钠。",
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
	}
};
var WIKI = wiki_default;
var LAB_GROUPS = lab_groups_default;
var LAB_UNITS = lab_units_default;
var TERMS = Object.values(WIKI);
function getTerm(id) {
	return WIKI[id];
}
function localizeTerm(term, lang) {
	const copy = lang === "en" ? term.en : term.zh;
	const unit = LAB_UNITS[term.id];
	return {
		...copy,
		id: term.id,
		photos: term.photos,
		relatedSlugs: term.relatedSlugs,
		bvid: term.bvid,
		videoTitle: term.videoTitle,
		unit: lang === "en" ? unit?.en ?? "" : unit?.zh ?? ""
	};
}
function searchTerms(q) {
	const h = q.trim().toLowerCase();
	if (!h) return TERMS;
	return TERMS.filter((t) => {
		return t.id.includes(h) || t.zh.title.toLowerCase().includes(h) || t.en.title.toLowerCase().includes(h) || t.zh.summary.includes(q.trim()) || t.en.summary.toLowerCase().includes(h) || t.zh.appearance.includes(q.trim()) || (t.zh.aka ?? "").toLowerCase().includes(h) || (t.en.aka ?? "").toLowerCase().includes(h);
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cmkla7Wz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
				children: "这一页出了问题"
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
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
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
			login: "登录"
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
		langSwitchAria: "Switch to English",
		examples: [
			"土发白",
			"苗黄",
			"土发酸",
			"板结"
		],
		home: {
			heroAlt: "广阔的耕地",
			lead: "土发白、发酸、板结、苗黄？先拍三张，对照农业知识。化验单上的词去化验知识里查。",
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
			lead: "先拍三张：整株、特写、土面。对照农业知识，尽量把土壤问题和病害、药害分开。",
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
			source: "对照农业知识，不是处方。"
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
			seasonNote: "点「冬季」会带上标了「全年」的篇，角标等于点开后的条数。",
			morePage: (n) => `再看 ${n} 篇`,
			emptyHint: "或先看酸化这篇",
			count: (n) => `共 ${n} 篇`,
			empty: "没有和这个词对应的文章，换一个词，或点展开看全部分类。",
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
			photoNote: "点击照片可放大。示意图，不能单凭此图下肥。",
			doseNote: "以上都是区间。按测土、按当地农技站和包装说明，宁少勿多。",
			videos: "讲解视频",
			related: "相关文章",
			updated: (d, r) => `更新时间 ${d} · ${r} · 内容仅供学习参考，严重问题咨询当地农技站或测土。`,
			ask: "拿不准？拍照问一问",
			play: "在本页播放",
			biliNote: "版权属地限制，海外或部分网络可能无法播放。可点上方切换到英文视频。",
			switchBili: "哔哩哔哩",
			switchEn: "英文视频",
			noEnVideo: "这篇暂时没有贴切的英文讲解。",
			listen: "听全文",
			pause: "Pause",
			stop: "Stop"
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
			toGuidesLead: "词条只讲单子上的格子。袋子数、步骤请打开农业知识。"
		},
		community: {
			title: "问答区",
			lead: "把自家地里的照片和现象发出来。作物、地区、你看见的样子写清，互相看。",
			ask: "我要提问",
			empty: "这一类还没有帖。换一个问题类型，或去拍照识别。",
			answered: "已有回答",
			waiting: "待回答",
			needLogin: "提问需要登录",
			needLoginLead: "用邮箱或手机号注册即可。不需要 Google 或 X。",
			goLogin: "去登录",
			goDiagnose: "去拍照识别",
			newTitle: "问一块地的事",
			titlePh: "一句话：你看见了什么",
			bodyPh: "作物、地区、叶位、根、土面。越具体越好。",
			photo: "地里的照片",
			photoHint: "能看清叶、根或土面更好",
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
			guest: "还没有登录。登录后能在这台以外的地方看到自己的帖。",
			favs: "收藏的农业知识",
			noFavs: "还没有收藏。打开一篇，点「收藏到本机」。",
			history: "最近的拍照识别",
			noHistory: "还没有记录。去拍三张。",
			logout: "退出"
		},
		login: {
			title: "登录土知",
			lead: "用邮箱或手机号。不需要 Google，也不需要 X。",
			tabLogin: "登录",
			tabRegister: "注册",
			email: "邮箱",
			phone: "手机号（可选，当作登录名）",
			password: "密码",
			password2: "再写一遍密码",
			submit: "登录",
			register: "注册",
			fail: "账号或密码不对。",
			exists: "这个邮箱已经注册过，直接登录即可。",
			mismatch: "两次密码不一致。",
			short: "密码至少 8 位。",
			needEmail: "先写邮箱。"
		},
		about: {
			title: "关于土知",
			body: "土知把地里看见的样子说清楚，把化验单上的词说成人话。口号是「看懂土地，种好地」。制作人李泽宇。内容供学习对照，不是处方。"
		},
		contact: {
			title: "联系",
			body: "写信给"
		},
		privacy: {
			title: "隐私与免责",
			body: "拍照识别在服务器上看照片，用于给出对照建议，不拿来公开展示。账号用邮箱或手机号，不经过 Google 或 X。内容仅供学习，具体施肥用药请结合当地农技站和土壤检测。"
		},
		err: {
			title: "这一页出了问题",
			back: "回首页"
		},
		tts: {
			listen: "听全文",
			pause: "Pause",
			stop: "Stop",
			unsupported: "这台设备不能朗读。你仍可以自己看文字。"
		}
	},
	en: {
		name: "Tuzhi",
		tagline: "Read the land. Farm it well.",
		desc: "Soil literacy for farmers: say clearly what the field looks like, and put the lab-sheet words into plain speech.",
		nav: {
			home: "Home",
			diagnose: "Photo check",
			knowledge: "Field guide",
			community: "Q&A",
			me: "Me",
			wiki: "Reading the soil test",
			login: "Sign in"
		},
		footer: {
			about: "About",
			knowledge: "Field guide",
			wiki: "Reading the soil test",
			community: "Q&A",
			privacy: "Privacy",
			contact: "Contact",
			maker: "Made by Li Zeyu 李泽宇"
		},
		disclaimer: "Diagnosis is for learning only. It does not replace a local agronomist or a lab test. For serious damage, call your extension station.",
		disclaimerShort: "For learning only. Fertiliser and pesticide decisions need a local agronomist and a soil test.",
		fieldHint: "In the field, check three things first: which leaves (new or old), the roots (white, brown, or smelly), the soil surface (white crust, standing water, or cracked). If those three don’t line up, don’t rush a bag of fertiliser.",
		all: "All",
		uncertain: "Not sure",
		search: "Search",
		langSwitch: "中文",
		langSwitchAria: "切换到中文",
		examples: [
			"white crust",
			"yellow leaves",
			"acid soil",
			"hard soil"
		],
		home: {
			heroAlt: "A wide stretch of farmland",
			lead: "White crust, acid soil, hard clods, yellow leaves? Photograph the field to identify the problem. Lab-sheet words live under Reading the soil test.",
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
			lead: "Three photos: the whole plant, a close-up, the soil surface. Match them to the field guide. Try to keep soil trouble apart from disease and spray injury.",
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
			source: "Matched to the field guide — not a prescription."
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
			seasonNote: "Winter also includes year-round guides. The badge equals the list you get.",
			morePage: (n) => `Load ${n} more`,
			emptyHint: "Or open the acid-soil guide",
			count: (n) => `${n} guide${n === 1 ? "" : "s"}`,
			empty: "No guide matches this word. Try another, or expand to see every group.",
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
			photoNote: "Tap to enlarge. These are sketches — don’t fertilise from the picture alone.",
			doseNote: "These are ranges. Follow a soil test, local advice and the label. Better too little than too much.",
			videos: "Lesson video",
			related: "Related guides",
			updated: (d, r) => `${d} · ${r} · For learning. Serious damage: local agronomist or a soil test.`,
			ask: "Not sure? Photograph the field to identify the problem",
			play: "Play on this page",
			biliNote: "Bilibili may be blocked on some networks. Switch to the English video above.",
			switchBili: "Bilibili",
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
			toGuidesLead: "This page explains the cell on the sheet. Bags and steps live in the field guide."
		},
		community: {
			title: "Q&A",
			lead: "Put a photo and what you saw. Crop, region, the look of the field. Other people can look with you.",
			ask: "Ask a question",
			empty: "No posts in this group. Try another problem, or photograph the field.",
			answered: "Answered",
			waiting: "Waiting",
			needLogin: "Sign in to ask",
			needLoginLead: "Email or phone is enough. No Google. No X.",
			goLogin: "Sign in",
			goDiagnose: "Photograph the field to identify the problem",
			newTitle: "Ask about one field",
			titlePh: "One line: what you saw",
			bodyPh: "Crop, region, which leaves, the root, the soil surface. The more specific, the better.",
			photo: "A field photo",
			photoHint: "Leaves, roots or the soil surface — sharp is better",
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
			enPending: "English translation coming shortly",
			machineNote: "Machine translation, for reference only"
		},
		me: {
			title: "Me",
			guest: "You are not signed in. Sign in if you want your posts on another phone.",
			favs: "Saved guides",
			noFavs: "None yet. Open a guide and tap “Save on this phone”.",
			history: "Recent photo checks",
			noHistory: "None yet. Photograph the field to identify the problem.",
			logout: "Sign out"
		},
		login: {
			title: "Sign in to Tuzhi",
			lead: "Email or phone. No Google. No X.",
			tabLogin: "Sign in",
			tabRegister: "Register",
			email: "Email",
			phone: "Phone (optional, used as a login name)",
			password: "Password",
			password2: "Password again",
			submit: "Sign in",
			register: "Register",
			fail: "Email or password is wrong.",
			exists: "This email is already registered. Sign in.",
			mismatch: "The two passwords don’t match.",
			short: "Use at least 8 characters.",
			needEmail: "Need an email first."
		},
		about: {
			title: "About Tuzhi",
			body: "Tuzhi says clearly what the field looks like, and puts lab-sheet words into plain speech. The line is “Read the land. Farm it well.” Made by Li Zeyu. For learning, not a prescription."
		},
		contact: {
			title: "Contact",
			body: "Write to"
		},
		privacy: {
			title: "Privacy",
			body: "Photo check looks at the pictures on the server to match a guide. It does not publish them. Accounts use email or phone, not Google or X. For learning only. Fertiliser and pesticide decisions need a local agronomist and a soil test."
		},
		err: {
			title: "This page broke",
			back: "Home"
		},
		tts: {
			listen: "Listen to this page",
			pause: "Pause",
			stop: "Stop",
			unsupported: "This device can’t read aloud. You can still read the words."
		}
	}
};
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
	}
}), {
	name: "tuzhi-lang",
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		const cookie = readCookie();
		if (cookie && cookie !== state.lang) state.setLang(cookie);
		else writeCookie(state.lang);
	}
}));
function LanguageToggle() {
	const lang = useLang((s) => s.lang);
	const setLang = useLang((s) => s.setLang);
	const t = messages[lang];
	const next = lang === "zh" ? "en" : "zh";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink",
		"aria-label": t.langSwitchAria,
		onClick: () => setLang(next),
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
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex min-h-10 min-w-16 items-center rounded-lg bg-surface-2 px-4" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg",
		children: loginLabel
	}) });
}
function AppShell({ children }) {
	const lang = useLang((s) => s.lang);
	const t = messages[lang];
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
	}, [lang]);
	function active(to) {
		if (to === "/") return pathname === "/";
		return pathname === to || pathname.startsWith(to + "/");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.png",
								alt: t.name,
								width: 44,
								height: 44,
								className: "size-11 rounded-full"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "leading-tight",
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
							className: "hidden items-center gap-1 md:flex",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								className: active(n.to) ? "rounded-lg bg-forest px-3 py-2 text-sm font-medium text-forest-fg" : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink",
								children: t.nav[n.key]
							}, n.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { loginLabel: t.nav.login })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-5xl px-4 pb-28 pt-4 md:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto mt-10 max-w-5xl border-t border-line px-4 pb-28 pt-6 text-base text-muted md:pb-8",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "text-forest underline",
								children: t.footer.about
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/knowledge",
								className: "text-forest underline",
								children: t.footer.knowledge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/encyclopedia",
								className: "text-forest underline",
								children: t.footer.wiki
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/community",
								className: "text-forest underline",
								children: t.footer.community
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "text-forest underline",
								children: t.footer.privacy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						className: "flex min-h-16 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[11px] font-medium leading-tight " + (active(n.to) ? "text-forest" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.Icon, {
							className: "size-6",
							strokeWidth: active(n.to) ? 2.4 : 1.8
						}), t.nav[n.key]]
					}) }, n.to))
				})
			})
		]
	});
}
var styles_default = "/assets/styles-D9XRcIpo.css";
var APP_NAME = "土知";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$15 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1F6B4A"
			},
			{
				name: "description",
				content: "看懂土地，种好地。面向农民的土壤科普与拍照诊断。"
			}
		],
		links: [
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-CN",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-AT94zqwF.mjs");
var Route$14 = createFileRoute("/")({
	loader: async () => {
		return { posts: (await listPosts({ data: {} })).slice(0, 4) };
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-CyYCDSle.mjs");
var Route$13 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./contact-Dons_rix.mjs");
var Route$12 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./diagnose-CLtyIio1.mjs");
var Route$11 = createFileRoute("/diagnose")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./login-EXS9__aS.mjs");
var Route$10 = createFileRoute("/login")({
	validateSearch: (s) => s.tab === "register" ? { tab: "register" } : {},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./me-DxyYOZFR.mjs");
var Route$9 = createFileRoute("/me")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./privacy-D05jqt0_.mjs");
var Route$8 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./community-Br07zEXV.mjs");
var Route$7 = createFileRoute("/community/")({
	validateSearch: (s) => ({ problem: typeof s.problem === "string" ? s.problem : void 0 }),
	loaderDeps: ({ search }) => ({ problem: search.problem }),
	loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: deps.problem } }) }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_id-CZ6fXGYJ.mjs");
var Route$6 = createFileRoute("/community/$id")({
	loader: async ({ params }) => {
		const post = await getPost({ data: { id: params.id } });
		if (!post) throw notFound();
		return { post };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./new-BYJj_wia.mjs");
var Route$5 = createFileRoute("/community/new")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./encyclopedia-CgUUybvv.mjs");
var Route$4 = createFileRoute("/encyclopedia/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_id-_XjeIYgs.mjs");
var Route$3 = createFileRoute("/encyclopedia/$id")({
	loader: ({ params }) => {
		const term = getTerm(params.id);
		if (!term) throw notFound();
		return { term };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./knowledge-DBudCcKK.mjs");
var Route$2 = createFileRoute("/knowledge/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		crop: typeof s.crop === "string" ? s.crop : void 0,
		problem: typeof s.problem === "string" ? s.problem : void 0,
		region: typeof s.region === "string" ? s.region : void 0,
		season: typeof s.season === "string" ? s.season : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-DJCVra7p.mjs");
var Route$1 = createFileRoute("/knowledge/$slug")({
	loader: ({ params }) => {
		const raw = getArticle(params.slug);
		if (!raw) throw notFound();
		return { raw };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AboutRoute = Route$13.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$15
});
var ContactRoute = Route$12.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$15
});
var DiagnoseRoute = Route$11.update({
	id: "/diagnose",
	path: "/diagnose",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var MeRoute = Route$9.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$15
});
var PrivacyRoute = Route$8.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$15
});
var CommunityIndexRoute = Route$7.update({
	id: "/community/",
	path: "/community/",
	getParentRoute: () => Route$15
});
var CommunityIdRoute = Route$6.update({
	id: "/community/$id",
	path: "/community/$id",
	getParentRoute: () => Route$15
});
var CommunityNewRoute = Route$5.update({
	id: "/community/new",
	path: "/community/new",
	getParentRoute: () => Route$15
});
var EncyclopediaIndexRoute = Route$4.update({
	id: "/encyclopedia/",
	path: "/encyclopedia/",
	getParentRoute: () => Route$15
});
var EncyclopediaIdRoute = Route$3.update({
	id: "/encyclopedia/$id",
	path: "/encyclopedia/$id",
	getParentRoute: () => Route$15
});
var KnowledgeIndexRoute = Route$2.update({
	id: "/knowledge/",
	path: "/knowledge/",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	DiagnoseRoute,
	LoginRoute,
	MeRoute,
	PrivacyRoute,
	CommunityIdRoute,
	CommunityNewRoute,
	EncyclopediaIdRoute,
	KnowledgeSlugRoute: Route$1.update({
		id: "/knowledge/$slug",
		path: "/knowledge/$slug",
		getParentRoute: () => Route$15
	}),
	CommunityIndexRoute,
	EncyclopediaIndexRoute,
	KnowledgeIndexRoute,
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
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
					children: "This page isn’t here. 换一条路，或回首页。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-4 inline-block text-forest underline",
					children: "回首页"
				})
			]
		})
	});
}
//#endregion
export { createSsrRpc as _, Route$6 as a, Route$14 as c, UserButton as d, LAB_GROUPS as f, createPost as g, addReply as h, Route$3 as i, useLang as l, searchTerms as m, Route$1 as n, Route$7 as o, localizeTerm as p, Route$2 as r, Route$10 as s, router_exports as t, messages as u, useCurrentUserState as v };
