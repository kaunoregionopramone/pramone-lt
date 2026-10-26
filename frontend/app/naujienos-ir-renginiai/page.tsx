import { sanityFetch } from "@/sanity/lib/live";
import { allNewsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import { Suspense } from "react";
import { NewsFilter } from "@/app/components/NewsFilter";

export default async function NaujienosPage() {
  const { data: newsData } = await sanityFetch({
    query: allNewsQuery,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-12 pb-16 border-b border-gray-200/50 overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-gray-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-gray-200/40 rounded-2xl rotate-12" />
        <div className="absolute bottom-8 right-12 w-24 h-24 border-2 border-blue-200/30 rounded-full" />
        <div className="absolute top-8 left-1/2 w-16 h-16 bg-gray-300/10 rounded-lg rotate-45" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="flex items-center gap-2 mb-8 text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
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
            <span className="text-gray-900">Naujienos ir renginiai</span>
          </div>

          <div className="mb-6">
            <h1 className="mb-4 text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Naujienos ir renginiai
            </h1>
            <p className="text-gray-600 max-w-3xl text-lg lg:text-xl">
              Sužinokite apie paskutinius organizacijos įvykius, naujienas ir
              artėjančius renginius
            </p>
          </div>
        </div>
      </div>

      {/* News Filter and Grid */}
      <Suspense
        fallback={
          <div className="py-24 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <svg
                className="size-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Kraunama...
            </div>
          </div>
        }
      >
        <NewsFilter newsData={(newsData || []).map((item) => ({ ...item, type: stegaClean(item.type) }))} />
      </Suspense>
    </div>
  );
}
