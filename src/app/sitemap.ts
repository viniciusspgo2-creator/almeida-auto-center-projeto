import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { getSettings, siteUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const base = siteUrl(settings);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contato`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, updatedAt: true, publishedAt: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes];
}
