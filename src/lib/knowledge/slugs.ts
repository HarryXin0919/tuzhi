export const SLUG_ALIAS: Record<string, string> = {
  "lv-du": "lv-du-shang-gen",
  lvdu: "lv-du-shang-gen",
};

export function resolveSlug(slug: string) {
  return SLUG_ALIAS[slug] ?? slug;
}
