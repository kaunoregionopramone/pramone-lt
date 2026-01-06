import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { atstovavimasQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atstovavimas | Kauno krašto pramonininkų ir darbdavių asociacija",
  description:
    "KKPDA atstovauja savo narių interesus įvairiose tarybose ir komisijose nacionaliniu ir regioniniu mastu.",
};

export default async function AtstovavimasPage() {
  const { data } = await sanityFetch({ query: atstovavimasQuery });

  const nationalActivities = data?.nationalActivities || [];
  const regionalActivities = data?.regionalActivities || [];

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
            <span className="text-gray-900">Atstovavimas</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">
              Atstovavimas
            </h1>
          </div>
        </div>
      </div>

      {/* National Activities Section */}
      {nationalActivities.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-4">Nacionalinės atstovavimo sritys</h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Asociacija aktyviai dalyvauja nacionalinėse institucijose ir
                organizacijose, atstovaujama regiono verslo interesams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {nationalActivities.map(
                (
                  activity: { _key?: string; title?: string; description?: string },
                  index: number
                ) => (
                  <div
                    key={activity._key || index}
                    className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-gray-500 text-sm font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg text-gray-900 mb-3">
                      {activity.title}
                    </h3>
                    {activity.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {nationalActivities.length > 0 && regionalActivities.length > 0 && (
        <div className="border-t border-gray-100" />
      )}

      {/* Regional Activities Section */}
      {regionalActivities.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/20">
          <div className="max-w-7xl mx-auto px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-4">Regioninės atstovavimo sritys</h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Aktyviai prisidedame prie Kauno regiono ekonominio ir socialinio
                vystymosi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {regionalActivities.map(
                (
                  activity: { _key?: string; title?: string; description?: string },
                  index: number
                ) => (
                  <div
                    key={activity._key || index}
                    className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900 mb-3">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

