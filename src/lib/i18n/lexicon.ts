import type { Lang } from "./lang";

const MAP: Record<string, string> = {
  水稻: "Rice",
  小麦: "Wheat",
  玉米: "Maize",
  大豆: "Soybean",
  棉花: "Cotton",
  蔬菜: "Vegetables",
  果树: "Fruit trees",
  马铃薯: "Potato",
  花生: "Peanut",
  设施蔬菜: "Greenhouse vegetables",
  茶叶: "Tea",
  全国: "Nationwide",
  酸化: "Acid soil",
  盐碱: "Salty-alkali land",
  板结: "Hard-packed soil",
  有机质低: "Thin organic matter",
  缺素: "Nutrient shortage",
  连作障碍: "Same-crop fatigue",
  涝害: "Waterlogging",
  肥害: "Fertiliser burn",
  其他: "Other",
  东北: "Northeast",
  华北: "Northern China",
  黄淮海: "Huang-Huai-Hai",
  长江中下游: "Mid-lower Yangtze",
  华南: "South China",
  西南: "Southwest",
  西北: "Northwest",
  春季: "Spring",
  夏季: "Summer",
  秋季: "Autumn",
  冬季: "Winter",
  全年: "Year-round",
  苗期: "Seedling",
  生长期: "Vegetative",
  开花结果: "Flower / fruit",
  收获后: "After harvest",
  不确定: "Not sure",
  尿素: "Urea",
  复合肥: "Compound fertiliser",
  有机肥: "Organic manure",
  水溶肥: "Soluble fertiliser",
  没施: "None recently",
  农用石灰: "Agricultural lime",
  白云石粉: "Dolomite",
  腐熟有机肥: "Rotted manure",
  用量: "Rate",
  pH: "pH",
  EC: "EC",
  有机质: "Organic matter",
  石灰: "Lime",
  铝毒: "Aluminium toxicity",
  返盐: "Salt rising",
  健康对照: "Healthy check",
  "作者整理，用量须经当地农技站确认": "Compiled for learning. Rates need a local agronomist.",
  农户: "Farmer",
  李泽宇: "Li Zeyu",
};

export function lex(word: string, lang: Lang): string {
  if (lang !== "en") return word;
  return MAP[word] ?? word;
}

export function displayName(raw: string | null | undefined, lang: Lang): string {
  const a = (raw ?? "").trim();
  const phone = a.match(/^(\d{7,11})@phone\.tuzhi\.local$/i);
  if (phone) return lang === "en" ? `Farmer ${phone[1].slice(-4)}` : `农户${phone[1].slice(-4)}`;
  if (/^农户(\d{4})$/.test(a)) return lang === "en" ? `Farmer ${a.slice(-4)}` : a;
  if (/李泽宇|Li Zeyu/i.test(a)) return lang === "en" ? "Li Zeyu" : "李泽宇";
  if (!a || a === "Account" || a.includes("@") || a.toLowerCase().includes("phone.tuzhi")) {
    return lang === "en" ? "Farmer" : "农户";
  }
  return a;
}
