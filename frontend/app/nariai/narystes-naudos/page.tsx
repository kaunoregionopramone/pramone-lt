import { sanityFetch } from "@/sanity/lib/live";
import { narystesNaudosQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function NarystesNaudosPage() {
  const { data } = await sanityFetch({ query: narystesNaudosQuery });

  const benefits = data?.benefitsText || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-12 pb-20 border-b border-gray-200/50 overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-gray-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-gray-200/40 rounded-2xl rotate-12" />
        <div className="absolute bottom-8 right-12 w-24 h-24 border-2 border-blue-200/30 rounded-full" />
        <div className="absolute top-8 left-1/2 w-16 h-16 bg-gray-300/10 rounded-lg rotate-45" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          {/* Breadcrumb */}
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
            <Link
              href="/nariai"
              className="hover:text-gray-700 transition-colors"
            >
              Nariai
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
            <span className="text-gray-900">Narystės naudos</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Narystės naudos
            </h1>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          {Array.isArray(benefits) && benefits.length > 0 ? (
            <div className="space-y-16">
              {benefits.map((benefit: any, index: number) => {
                const isEven = index % 2 === 0;

                // Collect all descriptions
                const descriptions = [
                  benefit.description1,
                  benefit.description2,
                  benefit.description3,
                  benefit.description4,
                ].filter(Boolean);

                return (
                  <div
                    key={benefit._key || index}
                    className={`group relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-start`}
                  >
                    {/* Number & Title Block */}
                    <div className="lg:w-2/5 relative">
                      <div className="relative z-10 pt-12">
                        {/* Accent bar */}
                        <div className="w-16 h-1.5 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full mb-6" />

                        <h3 className="text-3xl lg:text-4xl text-gray-900 font-semibold leading-tight">
                          {benefit.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description Block */}
                    <div className="lg:w-3/5">
                      <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                        {descriptions.length > 0 ? (
                          <ul className="space-y-5">
                            {descriptions.map(
                              (desc: string, descIndex: number) => (
                                <li
                                  key={descIndex}
                                  className="flex items-start gap-4"
                                >
                                  {/* Bullet indicator */}
                                  <div className="relative mt-2 shrink-0">
                                    <div className="size-2.5 bg-slate-700 rounded-full" />
                                    {descIndex < descriptions.length - 1 && (
                                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-200" />
                                    )}
                                  </div>
                                  <p className="text-gray-600 leading-relaxed text-lg">
                                    {desc}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">
                            Daugiau informacijos netrukus.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="size-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="size-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                Informacija apie narystės naudas bus paskelbta netrukus.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-32 h-32 border border-slate-600/30 rounded-2xl rotate-12" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-slate-500/20 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-8 lg:px-12 relative text-center">
          <div className="w-16 h-1 bg-gradient-to-r from-white/60 to-white/20 rounded-full mx-auto mb-8" />

          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-semibold">
            Norite prisijungti prie KKPDA?
          </h2>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Sužinokite, kaip tapti asociacijos nariu ir prisidėti prie stiprios
            verslo bendruomenės
          </p>

          <Link
            href="/nariai/kaip-tapti-nariu"
            className="group inline-flex items-center gap-3 bg-white text-slate-800 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Kaip tapti nariu?
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
