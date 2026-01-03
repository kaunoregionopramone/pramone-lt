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

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Pradžia
            </Link>
            <svg
              className="size-3.5 text-gray-400"
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
              href="/apie/istorija"
              className="text-gray-500 hover:text-gray-700"
            >
              Apie mus
            </Link>
            <svg
              className="size-3.5 text-gray-400"
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

          <h1 className="mb-6 text-5xl text-gray-900">Partneriai</h1>
          <p className="text-gray-600 max-w-3xl text-xl">
            KKPDA bendradarbiauja su valstybinėmis institucijomis, verslo
            organizacijomis ir švietimo įstaigomis, siekdama atstovauti savo
            narių interesams
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* All Partners Grid Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="space-y-12">
            {/* Partners with logos */}
            {cooperate.filter((p) => p.logo).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cooperate
                  .filter((p) => p.logo)
                  .map((partner) => (
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
            {cooperate.filter((p) => !p.logo).length > 0 && (
              <div className="max-w-5xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
                    {cooperate
                      .filter((p) => !p.logo)
                      .map((partner) => (
                        <div
                          key={partner._key}
                          className="bg-white p-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-gray-300 group-hover:bg-[#fe9a00] transition-colors shrink-0" />
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
          <div className="max-w-7xl mx-auto px-8">
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
      <section className="bg-gradient-to-br from-[#fe9a00] to-[#e17100] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white mb-4 text-2xl">
              Norite tapti partneriu?
            </h2>
            <p className="text-amber-50 text-lg mb-8">
              Jei esate suinteresuoti bendradarbiauti su KKPDA, susisiekite su
              mumis ir aptarsime galimybes
            </p>
            <div className="flex items-center justify-center">
              <a
                href="/kontaktai"
                className="bg-white text-[#fe9a00] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
              >
                <Mail className="size-5" />
                Susisiekite su mumis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
