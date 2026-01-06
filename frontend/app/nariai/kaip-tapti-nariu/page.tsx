import { sanityFetch } from "@/sanity/lib/live";
import { membershipInfoQuery, contactInfoQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Users,
  FileText,
  Download,
  ArrowRight,
} from "lucide-react";
import PortableText from "@/app/components/PortableText";

export default async function KaipTaptiNariuPage() {
  const { data } = await sanityFetch({ query: membershipInfoQuery });
  const { data: contactInfo } = await sanityFetch({ query: contactInfoQuery });

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
            <span className="text-gray-900">Kaip tapti nariu</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Kaip tapti nariu?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              KKPDA vienija įvairių sektorių įmones, teikiančias kvalifikuotas
              paslaugas įmonėms socialinės partnerystės, viešųjų pirkimų ir
              kitais klausimais
            </p>
          </div>
        </div>
      </div>

      {/* Why Join Section */}
      {data?.whyJoinText && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="w-16 h-1.5 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full mb-8" />
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-8">
              Kodėl verta tapti KKPDA nariu?
            </h2>
            <article className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900">
              <PortableText value={data.whyJoinText as any} />
            </article>
          </div>
        </section>
      )}

      {/* How to Become a Member Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Kaip tapti KKPDA nariu
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Unified Card */}
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
              {/* Main Content - Who can become a member */}
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="size-16 lg:size-20 shrink-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="size-8 lg:size-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl text-gray-900 mb-4 font-semibold">
                      {data?.whoCanJoinTitle || "Kas gali tapti nariu"}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full mb-6" />
                    {data?.whoCanJoinText && (
                      <p className="text-lg lg:text-xl leading-relaxed text-gray-700">
                        {data.whoCanJoinText}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Info Section - Dynamic Highlights */}
              {data?.whoCanJoinHighlights &&
                data.whoCanJoinHighlights.length > 0 && (
                  <>
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    <div
                      className={`grid grid-cols-1 ${data.whoCanJoinHighlights.length >= 2 ? "md:grid-cols-2" : ""}`}
                    >
                      {data.whoCanJoinHighlights.map(
                        (
                          highlight: { title: string; description?: string },
                          index: number
                        ) => (
                          <div
                            key={index}
                            className={`p-6 lg:p-8 hover:bg-slate-50/50 transition-colors ${
                              index < data.whoCanJoinHighlights!.length - 1 &&
                              data.whoCanJoinHighlights!.length >= 2
                                ? "md:border-r border-b md:border-b-0 border-gray-100"
                                : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-1 h-full min-h-[60px] bg-gradient-to-b from-slate-700 to-slate-400 rounded-full shrink-0" />
                              <div>
                                <h4 className="text-lg text-gray-900 font-semibold mb-2">
                                  {highlight.title}
                                </h4>
                                {highlight.description && (
                                  <p className="text-gray-600 leading-relaxed text-sm">
                                    {highlight.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Kokie dokumentai reikalingi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prisijungti prie KKPDA yra paprasta. Paruoškite šiuos dokumentus
              ir pradėkite kelionę kartu su mumis
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {Array.isArray(data?.requiredDocuments) &&
            data.requiredDocuments.length > 0 ? (
              data.requiredDocuments.map((doc: any, index: number) => {
                return (
                  <div
                    key={doc._key || index}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative flex items-center justify-between gap-6 flex-col md:flex-row">
                      <div className="flex items-center gap-5 flex-1">
                        <div className="size-14 shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:from-slate-700 group-hover:to-slate-800 transition-all duration-300">
                          <FileText className="size-7 text-slate-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg text-gray-900 font-semibold mb-1">
                            {doc.title}
                          </h3>
                          {doc.description && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {doc.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {doc.fileUrl ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl font-medium hover:from-slate-800 hover:to-slate-900 hover:shadow-lg transition-all whitespace-nowrap"
                        >
                          <Download className="size-4" />
                          {doc.buttonText || "Atsisiųsti"}
                          <ArrowRight className="size-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                        </a>
                      ) : doc.buttonText ? (
                        <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl text-sm whitespace-nowrap">
                          {doc.buttonText}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="size-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="size-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  Dokumentų sąrašas bus paskelbtas netrukus.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-32 h-32 border border-slate-600/30 rounded-2xl rotate-12" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-slate-500/20 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="w-16 h-1 bg-gradient-to-r from-white/60 to-white/20 rounded-full mb-8" />
              <h2 className="text-3xl lg:text-4xl text-white mb-6 font-semibold">
                {data?.ctaTitle || "Narystė – bendruomenė, ne formalumas"}
              </h2>
              {data?.ctaText && (
                <article className="prose prose-lg prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-medium">
                  <PortableText value={data.ctaText as any} />
                </article>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl text-white mb-8 font-semibold">
                Susisiekite su mumis
              </h3>

              <div className="space-y-5 mb-8">
                {contactInfo?.address && (
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <MapPin className="size-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Adresas</p>
                      <p className="text-slate-300 text-sm">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}

                {contactInfo?.phone && (
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="size-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Telefonas</p>
                      <p className="text-slate-300 text-sm">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </div>
                )}

                {contactInfo?.email && (
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="size-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">El. paštas</p>
                      <p className="text-slate-300 text-sm">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group w-full inline-flex items-center justify-center gap-3 bg-white text-slate-800 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 hover:shadow-2xl transition-all"
                >
                  <Send className="size-5" />
                  Siųsti užklausą
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
