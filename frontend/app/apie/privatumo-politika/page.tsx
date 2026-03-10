import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { privacyPolicyQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import { ExternalLink } from "lucide-react";

export default async function PrivatumoPolitikaPage() {
  const { data } = await sanityFetch({ query: privacyPolicyQuery });

  const title = data?.title;
  const description = data?.description;
  const fileUrl = data?.fileUrl;

  const hasDescription =
    description &&
    Array.isArray(description) &&
    description.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-12 pb-16 border-b border-gray-200/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-gray-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
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
            <span className="text-gray-900">Privatumo politika</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">
              Privatumo politika
            </h1>
          </div>
        </div>
      </div>

      {/* Privacy Policy Card */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                {title && (
                  <h2 className="text-3xl text-gray-900 mb-8">
                    {title}
                  </h2>
                )}
                {hasDescription && (
                  <div className="text-gray-600 leading-relaxed max-w-2xl prose prose-lg max-w-none">
                    <PortableText value={description as any} />
                  </div>
                )}
              </div>

              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-4 rounded-xl font-medium hover:from-slate-800 hover:to-slate-900 hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0"
                >
                  Peržiūrėti dokumentą
                  <ExternalLink className="size-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
