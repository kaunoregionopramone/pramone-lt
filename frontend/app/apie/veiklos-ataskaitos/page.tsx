import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { activityReportsQuery } from "@/sanity/lib/queries";
import { FileText, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veiklos ataskaitos | Kauno krašto pramonininkų ir darbdavių asociacija",
  description:
    "Peržiūrėkite ir atsisiųskite KKPDA metines veiklos ataskaitas.",
};

export default async function VeiklosAtaskaitosPage() {
  const { data: reports } = await sanityFetch({ query: activityReportsQuery });

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
            <span className="text-gray-900">Veiklos ataskaitos</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">
              Veiklos ataskaitos
            </h1>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Metinės ataskaitos</h2>
            <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
            <p className="text-gray-500 max-w-2xl mx-auto">
              Peržiūrėkite ir atsisiųskite KKPDA metines veiklos ataskaitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.isArray(reports) && reports.length > 0 ? (
              reports.map(
                (
                  report: {
                    _key?: string;
                    _id?: string;
                    period?: string;
                    fileUrl?: string;
                    fileName?: string;
                  },
                  index: number
                ) => (
                  <div
                    key={report._id || report._key || index}
                    className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="size-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-1">
                          KKPDA {report.period} m. veiklos ataskaita
                        </h3>
                        {report.fileName && (
                          <p className="text-gray-500 text-sm mb-4">
                            {report.fileName}
                          </p>
                        )}
                        {report.fileUrl ? (
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                          >
                            <ExternalLink className="size-4" />
                            Atidaryti dokumentą
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            (failas nepasiekiamas)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="size-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Šiuo metu ataskaitų nėra.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

