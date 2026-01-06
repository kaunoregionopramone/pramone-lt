import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { partnersQuery } from "@/sanity/lib/queries";
import { Mail } from "lucide-react";

export const revalidate = 60;

interface Partner {
  _key: string;
  title: string;
  logo?: string;
  extra?: string;
}

export default async function PartneriaiPage() {
  const { data } = await sanityFetch({
    query: partnersQuery,
  });

  const cooperate: Partner[] = data?.cooperate || [];
  const agreements: Partner[] = data?.agreements || [];

  const partnersWithLogos = cooperate.filter((p) => p.logo);
  const partnersWithoutLogos = cooperate.filter((p) => !p.logo);

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
            <span className="text-gray-900">Partneriai</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">Partneriai</h1>
          </div>
        </div>
      </div>

      {/* All Partners Grid Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="space-y-12">
            {/* Partners with logos */}
            {partnersWithLogos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {partnersWithLogos.map((partner) => (
                  <div
                    key={partner._key}
                    className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Logo */}
                    <div className="bg-white rounded-lg p-4 mb-3 h-32 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo!}
                          alt={`${partner.title} logotipas`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                    </div>

                    {/* Partner name */}
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {partner.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Partners without logos */}
            {partnersWithoutLogos.length > 0 && (
              <div className="max-w-5xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
                    {partnersWithoutLogos.map((partner) => (
                      <div
                        key={partner._key}
                        className="bg-white p-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-gray-300 group-hover:bg-slate-600 transition-colors shrink-0" />
                          <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                            {partner.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cooperation Agreements Section */}
      {agreements.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-3">
                Pasirašytos bendradarbiavimo sutartys
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Oficialūs bendradarbiavimo susitarimai su organizacijomis ir
                institucijomis
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {agreements.map((agreement) => (
                    <div
                      key={agreement._key}
                      className="p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <p className="text-gray-900 flex-1">{agreement.title}</p>
                        {agreement.extra && (
                          <span className="text-sm text-gray-500 shrink-0">
                            {agreement.extra}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-slate-700 to-slate-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute size-64 bg-white rounded-full blur-3xl -top-32 -right-32" />
          <div className="absolute size-48 bg-white rounded-full blur-2xl -bottom-24 -left-24" />
        </div>
        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-white text-4xl mb-6">Norite tapti partneriu?</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Jei esate suinteresuoti bendradarbiauti su KKPDA, susisiekite su
              mumis ir aptarsime galimybes
            </p>
            <div className="flex items-center justify-center">
              <Link
                href="/kontaktai"
                className="bg-white text-slate-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
              >
                <Mail className="size-5" />
                Susisiekite su mumis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
