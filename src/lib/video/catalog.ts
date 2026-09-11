import videosJson from "@/data/videos.json";

export type VideoMap = {
  bvid?: string | null;
  biliTitle?: string | null;
  youtube?: string | null;
  why: string;
  queries: string[];
};

const DATA = videosJson as { articles: Record<string, VideoMap>; wiki: Record<string, VideoMap> };

export function articleVideo(slug: string): VideoMap | undefined {
  return DATA.articles[slug];
}

export function wikiVideo(id: string): VideoMap | undefined {
  return DATA.wiki[id];
}

export function biliEmbed(bvid: string) {
  return `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&page=1&high_quality=1&danmaku=0`;
}

export function youtubeEmbed(id: string) {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
}

export { DATA as VIDEO_LOG };
