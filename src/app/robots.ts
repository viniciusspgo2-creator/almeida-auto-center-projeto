import type { MetadataRoute } from "next";
import { getSettings, siteUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const base = siteUrl(settings);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/*?XTransformPort="],
      },
      { userAgent: "Googlebot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
