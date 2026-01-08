import Link from "next/link";
import { Clock, Tag } from "lucide-react";

interface RecentNewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  type: "naujiena" | "renginys" | null;
  publishedAt?: string;
  _createdAt: string;
}

interface NewsSidebarProps {
  recentNews: RecentNewsItem[];
  currentNewsId?: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsSidebar({ recentNews, currentNewsId }: NewsSidebarProps) {
  // Filter out the current news item from recent news
  const filteredRecentNews = recentNews.filter(
    (news) => news._id !== currentNewsId
  );

  // Count news by type
  const naujienosCount = recentNews.filter(
    (news) => news.type === "naujiena"
  ).length;
  const renginiaiCount = recentNews.filter(
    (news) => news.type === "renginys"
  ).length;

  const categories = [
    {
      name: "Renginiai",
      count: renginiaiCount,
      type: "renginys",
      param: "Renginiai",
    },
    {
      name: "Naujienos",
      count: naujienosCount,
      type: "naujiena",
      param: "Naujienos",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Recent News */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="mb-6 flex items-center gap-2 font-medium text-gray-900">
          <Clock className="size-4 text-slate-600" />
          Naujausi įrašai
        </h3>
        <div className="space-y-4">
          {filteredRecentNews.slice(0, 4).map((news) => (
            <Link
              key={news._id}
              href={
                news.type === "renginys"
                  ? `/renginiai/${news.slug.current}`
                  : `/naujienos/${news.slug.current}`
              }
              className="block group"
            >
              <div className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="size-2 bg-slate-400 rounded-full mt-2 shrink-0 group-hover:bg-slate-700 group-hover:scale-150 transition-all" />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm mb-1 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {news.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    <span>{formatDate(news.publishedAt || news._createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
        <h3 className="mb-6 flex items-center gap-2 font-medium text-gray-900">
          <div className="size-2 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full" />
          Kategorijos
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.type}
              href={`/naujienos-ir-renginiai?kategorija=${category.param}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
                <span className="text-gray-900 group-hover:text-slate-700 transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
