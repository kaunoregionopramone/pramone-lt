import { sanityFetch } from "@/sanity/lib/live";
import { singleNewsQuery, recentNewsQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoogleMap } from "@/app/components/GoogleMap";
import { NewsSidebar } from "@/app/components/NewsSidebar";
import { ShareButtons } from "@/app/components/ShareButtons";
import { calculateReadingTime, createExcerpt } from "@/lib/portableTextUtils";
import type { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  ArrowLeft,
} from "lucide-react";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatEventTime(startDate?: string, endDate?: string | null) {
  if (!startDate) return null;

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("lt-LT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (end) {
    // Check if same day
    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${formatFullDate(start)}, ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatFullDate(start)} ${formatTime(start)} - ${formatFullDate(end)} ${formatTime(end)}`;
    }
  }

  return `${formatFullDate(start)}, ${formatTime(start)}`;
}

/**
 * Generate metadata for social sharing (Open Graph, Twitter Cards)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: news } = await sanityFetch({
    query: singleNewsQuery,
    params: { slug },
    stega: false, // Metadata should never contain stega
  });

  if (!news) {
    return {
      title: "Naujiena nerasta",
      description: "Ši naujiena neegzistuoja arba buvo pašalinta.",
    };
  }

  // Create description from content
  const description = createExcerpt(news.content as any, 160);

  // Get cover image URL for Open Graph (respect hotspot/crop)
  const coverImageUrl =
    (urlForImage(news.coverImage)?.width(1200).height(630).fit("crop").url() as string) ||
    undefined;

  const title = news.title || "Naujiena";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: news._createdAt,
      authors: ["KKPDA"],
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              width: 1200,
              height: 630,
              alt: `${news.title} nuotrauka`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImageUrl ? [coverImageUrl] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: news } = await sanityFetch({
    query: singleNewsQuery,
    params: { slug },
  });

  const { data: recentNews } = await sanityFetch({
    query: recentNewsQuery,
  });

  if (!news) {
    notFound();
  }

  // Calculate reading time based on content
  const readingTime = calculateReadingTime(news.content as any);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Pradžia
            </Link>
            <svg
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <Link
              href="/naujienos-ir-renginiai"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Naujienos
            </Link>
            <svg
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <span className="text-gray-900 truncate max-w-xs">
              {news.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-8 pb-12 overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-gray-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-gray-200/40 rounded-2xl rotate-12" />
        <div className="absolute bottom-8 right-12 w-24 h-24 border-2 border-blue-200/30 rounded-full" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <Tag className="size-4" />
                {news.type === "renginys" ? "Renginys" : "Naujiena"}
              </span>
            </div>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl text-gray-900">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-slate-600" />
                <span>
                  {news.type === "renginys" && news.eventStartDate
                    ? formatEventTime(news.eventStartDate, news.eventEndDate)
                    : formatDate(news._createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-slate-600" />
                <span>{readingTime} min skaitymo</span>
              </div>
            </div>

            <ShareButtons
              title={news.title}
              description={createExcerpt(news.content as any, 160)}
            />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {news.coverImage && (
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-8 lg:px-12">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={
                  (urlForImage(news.coverImage)
                    ?.width(1200)
                    .height(500)
                    .fit("crop")
                    .url() as string) || "/placeholder.jpg"
                }
                alt={`${news.title} nuotrauka`}
                width={1200}
                height={500}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content & Sidebar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Information */}
              {news.type === "renginys" && (
                <div className="mb-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Renginio informacija
                  </h3>
                  <div className="space-y-3">
                    {news.eventStartDate && (
                      <div className="flex items-start gap-3">
                        <Calendar className="size-5 text-slate-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Laikas
                          </div>
                          <div className="text-gray-900">
                            {formatEventTime(
                              news.eventStartDate,
                              news.eventEndDate
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {news.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="size-5 text-slate-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Vieta
                          </div>
                          <div className="text-gray-900">{news.location}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <article className="prose prose-lg max-w-none">
                {news.content && <PortableText value={news.content as any} />}
              </article>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/naujienos-ir-renginiai"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors font-medium group"
                >
                  <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                  Grįžti į naujienas
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <NewsSidebar
                  recentNews={recentNews || []}
                  currentNewsId={news._id}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map for Events */}
      {news.type === "renginys" &&
        (news.googleMapsLocation || news.location) && (
          <section className="bg-white pb-12">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
              <GoogleMap
                address={news.googleMapsLocation || news.location || ""}
              />
            </div>
          </section>
        )}
    </div>
  );
}
