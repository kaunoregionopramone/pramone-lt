import { sanityFetch } from "@/sanity/lib/live";
import { contactInfoQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Navigation,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default async function KontaktaiPage() {
  const { data } = await sanityFetch({
    query: contactInfoQuery,
  });
  const address: string | undefined = data?.address || undefined;
  const contactPhone: string | undefined = data?.phone || undefined;
  const contactEmail: string | undefined = data?.email || undefined;
  const searchText: string | undefined =
    data?.googleAddress || data?.address || undefined;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-12 pb-20 border-b border-gray-200/50 overflow-hidden">
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
            <span className="text-gray-900">Kontaktai</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Kontaktai
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Mielai susisieksime. Jeigu turite klausimų, reikia pagalbos ar
              norite sužinoti daugiau apie mūsų veiklą, parašykite arba
              paskambinkite
            </p>
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          {/* Contact Information - Unified Card */}
          {(contactPhone || contactEmail) && (
            <div className="max-w-3xl mx-auto mb-20">
              <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  {/* Phone */}
                  {contactPhone && (
                    <a
                      href={`tel:${contactPhone.replace(/\s/g, "")}`}
                      className="group flex-1 flex items-center gap-5 p-6 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="size-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                        <Phone className="size-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                          Telefonas
                        </div>
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">
                          {contactPhone}
                        </div>
                      </div>
                    </a>
                  )}

                  {/* Email */}
                  {contactEmail && (
                    <a
                      href={`mailto:${contactEmail}`}
                      className="group flex-1 flex items-center gap-5 p-6 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="size-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                        <Mail className="size-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                          El. paštas
                        </div>
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-slate-700 transition-colors truncate">
                          {contactEmail}
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Map Section */}
          {searchText && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="w-12 h-1 bg-slate-700 rounded-full mb-6" />
                <h2 className="text-3xl lg:text-4xl text-gray-900">
                  Mūsų lokacija
                </h2>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg relative">
                {/* Map iframe */}
                <div className="h-[500px] lg:h-[600px]">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}&q=${encodeURIComponent(searchText)}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Location info overlay */}
                {address && (
                  <div className="p-6 lg:p-8 bg-white border-t border-gray-200">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
                      <div className="flex gap-5 items-start">
                        <div className="size-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="size-7 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="text-lg text-gray-900 font-semibold mb-1">
                            Kauno krašto pramonininkų ir darbdavių asociacija
                          </h3>
                          <p className="text-gray-600">{address}</p>
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(searchText!)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl font-medium hover:from-slate-800 hover:to-slate-900 hover:shadow-lg transition-all whitespace-nowrap"
                      >
                        Gauti nuorodas
                        <ExternalLink className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links / CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-32 h-32 border border-slate-600/30 rounded-2xl rotate-12" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-slate-500/20 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-gradient-to-r from-white/60 to-white/20 rounded-full mx-auto mb-8" />
            <h2 className="text-3xl lg:text-4xl text-white mb-4 font-semibold">
              Norite sužinoti daugiau?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Susipažinkite su mūsų veikla, nariais ir galimybėmis tapti
              asociacijos nariu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/apie/istorija"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all"
            >
              <div className="size-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-white/20 transition-all">
                <Building2 className="size-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-semibold">Apie mus</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Sužinokite daugiau apie mūsų organizaciją ir veiklą
              </p>
              <div className="inline-flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
                Skaityti daugiau
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/nariai/kaip-tapti-nariu"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all"
            >
              <div className="size-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-white/20 transition-all">
                <Navigation className="size-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-semibold">
                Kaip tapti nariu
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Sužinokite apie narystės privalumus ir procesą
              </p>
              <div className="inline-flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
                Skaityti daugiau
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/naujienos-ir-renginiai"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all"
            >
              <div className="size-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-white/20 transition-all">
                <MessageSquare className="size-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-semibold">
                Naujienos
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Skaitykite naujausias naujienas ir renginius
              </p>
              <div className="inline-flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
                Skaityti daugiau
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
