import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { allNewsQuery } from "@/sanity/lib/queries";
import { headers } from "next/headers";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: allNews } = await sanityFetch({
    query: allNewsQuery,
  });
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain = headersList.get("host") as string;
  
  // Add main pages
  sitemap.push({
    url: `https://${domain}`,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: "monthly",
  });

  sitemap.push({
    url: `https://${domain}/nariai`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "monthly",
  });

  sitemap.push({
    url: `https://${domain}/naujienos-ir-renginiai`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "weekly",
  });

  // Add news articles
  if (allNews && allNews.length > 0) {
    for (const newsItem of allNews) {
      const typedNewsItem = newsItem as {
        slug?: { current?: string };
        _createdAt?: string;
      };
      if (typedNewsItem.slug?.current) {
        sitemap.push({
          url: `https://${domain}/naujienos/${typedNewsItem.slug.current}`,
          lastModified: typedNewsItem._createdAt ? new Date(typedNewsItem._createdAt) : new Date(),
          priority: 0.6,
          changeFrequency: "never",
        });
      }
    }
  }

  return sitemap;
}
