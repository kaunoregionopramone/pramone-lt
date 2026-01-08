"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Tag,
  Clock,
  Newspaper,
} from "lucide-react";
import { AllNewsQueryResult, BlockContent } from "@/sanity.types";
import { createExcerpt } from "@/lib/portableTextUtils";
import { urlForImage } from "@/sanity/lib/utils";

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  type: "naujiena" | "renginys";
  isFeatured?: boolean;
  content: BlockContent | null;
  coverImage?: any;
  publishedAt?: string;
  _createdAt: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  googleMapsLocation?: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "Sau",
    "Vas",
    "Kov",
    "Bal",
    "Geg",
    "Bir",
    "Lie",
    "Rugp",
    "Rugs",
    "Spal",
    "Lapk",
    "Gruod",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
    const months = [
      "Sau",
      "Vas",
      "Kov",
      "Bal",
      "Geg",
      "Bir",
      "Lie",
      "Rugp",
      "Rugs",
      "Spal",
      "Lapk",
      "Gruod",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  if (end) {
    // Check if same day
    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${formatFullDate(start)} • ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatFullDate(start)} ${formatTime(start)} - ${formatFullDate(end)} ${formatTime(end)}`;
    }
  }

  return `${formatFullDate(start)} • ${formatTime(start)}`;
}

interface NewsFilterProps {
  newsData: AllNewsQueryResult;
}

export function NewsFilter({ newsData }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL or defaults
  const categoryParam = searchParams.get("kategorija") || "Visos";
  const pageParam = searchParams.get("puslapis");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) : 1
  );
  const itemsPerPage = 9;

  const categories = ["Visos", "Renginiai", "Naujienos"];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== "Visos") {
      params.set("kategorija", selectedCategory);
    }

    if (currentPage > 1) {
      params.set("puslapis", currentPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString
      ? `/naujienos-ir-renginiai?${queryString}`
      : "/naujienos-ir-renginiai";

    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, currentPage, router]);

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "Visos"
      ? newsData
      : selectedCategory === "Renginiai"
        ? newsData.filter((article) => article.type === "renginys")
        : newsData.filter((article) => article.type === "naujiena");

  // Featured article - always show if it exists, regardless of filter
  const featuredArticle = newsData.find((article) => article.isFeatured);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const regularArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-[300px] lg:h-[360px] overflow-hidden">
                  {featuredArticle.coverImage ? (
                    <Image
                      src={
                        (urlForImage(featuredArticle.coverImage)
                          ?.width(1200)
                          .height(720)
                          .fit("crop")
                          .url() as string) || "/placeholder.jpg"
                      }
                      alt={`${featuredArticle.title} nuotrauka`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-3.5 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      <Tag className="size-3.5" />
                      {featuredArticle.type === "renginys"
                        ? "Renginys"
                        : "Naujiena"}
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-10 flex flex-col justify-center relative">
                  {/* Slate accent bar */}
                  <div className="w-10 h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full mb-5" />

                  <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="size-4 text-slate-600" />
                    {featuredArticle.type === "renginys" &&
                    featuredArticle.eventStartDate
                      ? formatEventTime(
                          featuredArticle.eventStartDate,
                          featuredArticle.eventEndDate
                        )
                      : formatDate(featuredArticle.publishedAt || featuredArticle._createdAt)}
                  </div>

                  <h2 className="text-2xl lg:text-2xl text-gray-900 mb-3 font-semibold">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-base line-clamp-3">
                    {createExcerpt(featuredArticle.content)}
                  </p>

                  <Link
                    href={
                      featuredArticle.type === "renginys"
                        ? `/renginiai/${featuredArticle.slug.current}`
                        : `/naujienos/${featuredArticle.slug.current}`
                    }
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-slate-800 hover:to-slate-900 hover:shadow-xl hover:-translate-y-0.5 transition-all w-fit group/link"
                  >
                    Skaityti daugiau
                    <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50/50 to-gray-50 relative overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-50/50 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <article
                  key={article._id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={
                          (urlForImage(article.coverImage)
                            ?.width(800)
                            .height(448)
                            .fit("crop")
                            .url() as string) || "/placeholder.jpg"
                        }
                        alt={`${article.title} nuotrauka`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-100">
                        <Tag className="size-3" />
                        {article.type === "renginys" ? "Renginys" : "Naujiena"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Clock className="size-3.5 text-slate-500" />
                      {article.type === "renginys" && article.eventStartDate
                        ? formatEventTime(
                            article.eventStartDate,
                            article.eventEndDate
                          )
                        : formatDate(article.publishedAt || article._createdAt)}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                      {createExcerpt(article.content, 200)}
                    </p>

                    <Link
                      href={
                        article.type === "renginys"
                          ? `/renginiai/${article.slug.current}`
                          : `/naujienos/${article.slug.current}`
                      }
                      className="inline-flex items-center gap-2 text-slate-700 font-medium text-sm hover:text-slate-900 transition-all group/link mt-auto"
                    >
                      Skaityti daugiau
                      <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center size-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6">
                <Newspaper className="size-12 text-slate-400" />
              </div>
              <h3 className="text-gray-900 mb-3 text-2xl font-semibold">
                {selectedCategory === "Renginiai"
                  ? "Renginių nėra"
                  : selectedCategory === "Naujienos"
                    ? "Naujienų nerasta"
                    : "Įrašų nerasta"}
              </h3>
              <p className="text-gray-500 text-lg">
                {selectedCategory === "Renginiai"
                  ? "Šiuo metu renginių nėra"
                  : selectedCategory === "Naujienos"
                    ? "Šiuo metu naujienų nėra"
                    : "Šiuo metu įrašų nėra"}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && regularArticles.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-16">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-slate-50 hover:text-slate-800 border border-gray-200 hover:border-slate-300"
                }`}
              >
                Ankstesnis
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`size-11 rounded-xl font-medium transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-slate-50 hover:text-slate-800 border border-gray-200 hover:border-slate-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-slate-50 hover:text-slate-800 border border-gray-200 hover:border-slate-300"
                }`}
              >
                Kitas
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
