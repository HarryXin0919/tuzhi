export const APP_NAME = "土知";
export const TAGLINE = "看懂土地，种好地";
export const TAGLINE_EN = "Read the land. Farm it well.";
export const CONTACT_EMAIL = "g17612121666@gmail.com";
export const ARTICLE_UPDATED_AT = "2026-09-01";
export const REVIEWER = "作者整理，用量须经当地农技站确认";
export const SITE_ORIGIN = "https://tuzhi.asia";

export const CROPS = [
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
  "茶叶",
] as const;

export const PROBLEMS = [
  "酸化",
  "盐碱",
  "板结",
  "有机质低",
  "缺素",
  "连作障碍",
  "涝害",
  "肥害",
  "其他",
] as const;

export const REGIONS = [
  "东北",
  "华北",
  "黄淮海",
  "长江中下游",
  "华南",
  "西南",
  "西北",
  "全国",
] as const;

export const SEASONS = ["春季", "夏季", "秋季", "冬季", "全年"] as const;

export const STAGES = ["苗期", "生长期", "开花结果", "收获后", "不确定"] as const;

export const FERTS = ["尿素", "复合肥", "有机肥", "水溶肥", "没施", "不确定"] as const;

export type Crop = (typeof CROPS)[number];
export type Problem = (typeof PROBLEMS)[number];
export type Region = (typeof REGIONS)[number];
export type Season = (typeof SEASONS)[number];
