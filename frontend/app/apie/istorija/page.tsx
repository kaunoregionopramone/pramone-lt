import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { istorijaQuery } from "@/sanity/lib/queries";
import type { IstorijaQueryResult } from "@/sanity.types";
import { HistoryTimeline } from "@/app/components/HistoryTimeline";
import PortableText from "@/app/components/PortableText";

export default async function IstorijaPage() {
  const { data: istorijaData } = await sanityFetch({ query: istorijaQuery });

  const data = istorijaData as IstorijaQueryResult;
  const pastPresidents = data?.pastPresidents || [];
  const ourHistory = data?.ourHistory;

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

        <div className="max-w-7xl mx-auto px-12 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-gray-500">
            <Link href="/" className="hover:text-gray-700">
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
            <Link href="/apie/istorija" className="hover:text-gray-700">
              Apie mus
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
            <span className="text-gray-900">Istorija</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">Istorija</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          {/* Mūsų istorija Section */}
          {ourHistory && (
            <div>
              <h2 className="text-4xl mb-8">Mūsų istorija</h2>
              <article className="prose prose-lg max-w-none text-gray-600">
                <PortableText value={ourHistory as any} />
              </article>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      {pastPresidents && pastPresidents.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/20">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-6" />
              <h2 className="text-4xl mb-4">KKPDA vadovai</h2>
              <p className="text-lg text-gray-500">
                Asociacijos prezidentai nuo pat įkūrimo 1989 metais iki šių
                dienų
              </p>
            </div>
            <HistoryTimeline events={pastPresidents} />
          </div>
        </section>
      )}
    </div>
  );
}
