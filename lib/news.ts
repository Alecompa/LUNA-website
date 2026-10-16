import { legacy, newsTitles } from "./site";
import { getAllContentData } from "@/utils/markdown";
import { PHOTOS } from "./content";

export type NewsItem = { id: string; title: string; date: string; image?: string; logo?: boolean; html?: string };

/** Archive announcements and collaboration stories in one feed, newest first. */
export async function allNews(): Promise<NewsItem[]> {
  const stories = await getAllContentData();
  return [
    ...legacy.news.map((n) => ({
      id: n.id,
      title: newsTitles[n.id] ?? n.title,
      date: n.date,
      image: n.image || PHOTOS.collab2,
      logo: /Logo/.test(n.image),
      html: n.html,
    })),
    ...stories.map((s) => ({ id: s.id, title: s.title, date: s.date, image: s.coverImage, html: s.content })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
}
