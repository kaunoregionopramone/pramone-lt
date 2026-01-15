import { sanityFetch } from "@/sanity/lib/live";
import { apieKkpdaQuery, membersCountQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, Handshake, Diamond, PieChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Apie KKPDA | Kauno krašto pramonininkų ir darbdavių asociacija",
  description:
    "Kauno krašto pramonininkų ir darbdavių asociacija – viena seniausių ir įtakingiausių verslo organizacijų Lietuvoje, įkurta 1989 m.",
};

// Revalidate the page every 60 seconds to ensure members count is up to date
export const revalidate = 60;

export default async function ApieKkpdaPage() {
  const [{ data }, { data: membersCount }] = await Promise.all([
    sanityFetch({ query: apieKkpdaQuery }),
    sanityFetch({ query: membersCountQuery }),
  ]);

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
            <span className="text-gray-900">Apie KKPDA</span>
          </div>

          <div className="mb-12">
            <h1 className="mb-3 text-5xl md:text-6xl lg:text-7xl">
              Apie KKPDA
            </h1>
          </div>
        </div>
      </div>

      {/* Main Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            {/* Kas esame */}
            <div className="group">
              <div className="mb-6 transition-transform group-hover:-translate-y-1">
                <Users className="size-16 text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-5 text-2xl">Kas esame</h3>
              {data?.kasEsame && (
                <div className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none">
                  <PortableText value={data.kasEsame as any} />
                </div>
              )}
            </div>

            {/* Ką atstovaujame */}
            <div className="group">
              <div className="mb-6 transition-transform group-hover:-translate-y-1">
                <Handshake className="size-16 text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-5 text-2xl">Ką atstovaujame</h3>
              {data?.kaAtstovaujame && (
                <div className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none">
                  <PortableText value={data.kaAtstovaujame as any} />
                </div>
              )}
            </div>

            {/* Mūsų misija */}
            <div className="group">
              <div className="mb-6 transition-transform group-hover:-translate-y-1">
                <Diamond className="size-16 text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-5 text-2xl">Mūsų misija</h3>
              {data?.musuMisija && (
                <div className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none">
                  <PortableText value={data.musuMisija as any} />
                </div>
              )}
            </div>

            {/* Mūsų vizija */}
            <div className="group">
              <div className="mb-6 transition-transform group-hover:-translate-y-1">
                <PieChart className="size-16 text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-5 text-2xl">Mūsų vizija</h3>
              {data?.musuVizija && (
                <div className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none">
                  <PortableText value={data.musuVizija as any} />
                </div>
              )}
            </div>
          </div>

          {/* Strategic Directions */}
          {data?.strateginesVeiklosKryptys &&
            data.strateginesVeiklosKryptys.length > 0 && (
              <div className="mb-24">
                <h2 className="text-3xl text-center mb-12">
                  Strateginės veiklos kryptys
                </h2>
                <div className="space-y-4">
                  {data.strateginesVeiklosKryptys.map(
                    (
                      kryptis: { _key?: string; title?: string },
                      index: number
                    ) => (
                      <div
                        key={kryptis._key || index}
                        className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="border-l-2 border-gray-700 pl-6 flex items-center gap-6">
                          <span className="text-4xl text-gray-700 font-light min-w-[3rem]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-lg text-gray-700">
                            {kryptis.title}
                          </h3>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Statistics */}
          <div className="bg-white rounded-2xl border border-gray-100 p-16 mb-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="text-center md:text-left">
                <div className="text-7xl text-gray-900 mb-3">
                  {membersCount ? membersCount : "—"}
                </div>
                <div className="text-xl text-gray-500 mb-2">organizacijos</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-7xl text-gray-900 mb-3">
                  {data?.darboVietos ? data.darboVietos : "—"}
                </div>
                <div className="text-xl text-gray-500 mb-2">
                  tūkst. darbo vietų
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-7xl text-gray-900 mb-3">
                  {data?.apyvarta ? data.apyvarta : "—"}
                </div>
                <div className="text-xl text-gray-500 mb-2">
                  mlrd. € apyvarta
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid - Kur einame */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left Content */}
            <div>
              {data?.kurEiname && (
                <div className="prose prose-lg max-w-none text-gray-700 prose-ul:space-y-4 prose-li:marker:text-gray-400">
                  <PortableText value={data.kurEiname as any} />
                </div>
              )}
            </div>

            {/* Right Image */}
            {data?.kurEinamePaveikslasUrl && (
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                  src={data.kurEinamePaveikslasUrl}
                  alt="Kur einame"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      {data?.organizacijos && data.organizacijos.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-12">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/20 rounded-2xl border border-gray-100 p-16">
              <div className="max-w-3xl mx-auto text-center mb-14">
                <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-6" />
                <h2 className="mb-4 text-4xl">
                  Nacionalinės ir tarptautinės organizacijos
                </h2>
                <p className="text-lg text-gray-500">
                  Esame aktyvūs nariai aukščiausio lygio verslo organizacijose
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {data.organizacijos.map(
                  (
                    org: {
                      pavadinimas?: string | null;
                      aprasymas?: string | null;
                      logoUrl?: string | null;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-full h-32 bg-white rounded-lg flex items-center justify-center mb-6">
                          {org.logoUrl && (
                            <Image
                              src={org.logoUrl}
                              alt={org.pavadinimas || "Logo"}
                              width={240}
                              height={100}
                              className="object-contain max-h-24"
                            />
                          )}
                        </div>
                        <div className="w-12 h-1 bg-gray-800 rounded-full mb-6" />
                        <h3 className="mb-3 text-2xl">{org.pavadinimas}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {org.aprasymas}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
