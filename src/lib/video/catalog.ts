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

export function biliEmbed(bvid: string, autoplay = false) {
  const ap = autoplay ? 1 : 0;
  return `https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(bvid)}&danmaku=0&autoplay=${ap}&high_quality=1`;
}

export function youtubeEmbed(id: string, autoplay = false) {
  const ap = autoplay ? 1 : 0;
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&autoplay=${ap}`;
}

export { DATA as VIDEO_LOG };
