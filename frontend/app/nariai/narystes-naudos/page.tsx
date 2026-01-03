import { sanityFetch } from "@/sanity/lib/live";
import { narystesNaudosQuery } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function NarystesNaudosPage() {
  const { data } = await sanityFetch({ query: narystesNaudosQuery });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#f9fafb] to-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-11">
            <Link href="/" className="text-sm text-[#6a7282] hover:text-gray-700">
              Pradžia
            </Link>
            <svg className="size-3.5 text-[#99A1AF]" fill="none" viewBox="0 0 14 14">
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <Link href="/nariai" className="text-sm text-[#6a7282] hover:text-gray-700">
              Nariai
            </Link>
            <svg className="size-3.5 text-[#99A1AF]" fill="none" viewBox="0 0 14 14">
              <path
                d="M5.25 10.5L8.75 7L5.25 3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.16667"
              />
            </svg>
            <span className="text-sm text-[#101828]">Narystės naudos</span>
          </div>

          <h1 className="text-5xl text-neutral-950 mb-6">Narystės naudos</h1>
          <p className="text-xl text-[#4a5565] max-w-3xl">
            Sužinokite, kokias naudas suteikia narystė Kauno krašto pramonininkų ir darbdavių asociacijoje
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Membership Benefits - Dynamic from Sanity */}
          {Array.isArray(data?.benefitsText) && data.benefitsText.length > 0 && (
            <div className="space-y-8">
              {data.benefitsText.map((benefit: any, index: number) => {
                // Color schemes for different categories
                const colorSchemes = [
                  {
                    bg: "from-orange-50 to-white",
                    border: "border-orange-100",
                  },
                  {
                    bg: "from-blue-50 to-white",
                    border: "border-blue-100",
                  },
                  {
                    bg: "from-green-50 to-white",
                    border: "border-green-100",
                  },
                  {
                    bg: "from-purple-50 to-white",
                    border: "border-purple-100",
                  },
                  {
                    bg: "from-amber-50 to-white",
                    border: "border-amber-100",
                  },
                ];
                const colorScheme =
                  colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={benefit._key || index}
                    className={`bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border} rounded-2xl p-8 hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-[24px] leading-[32px] text-[#2c3e5a] mb-2">
                          {benefit.title}
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {benefit.description1 && (
                        <li className="flex items-start gap-3">
                          <div className="size-1.5 shrink-0 mt-2.5 bg-[#fe9a00] rounded-full" />
                          <p className="text-base leading-relaxed text-[#4a5565]">
                            {benefit.description1}
                          </p>
                        </li>
                      )}
                      {benefit.description2 && (
                        <li className="flex items-start gap-3">
                          <div className="size-1.5 shrink-0 mt-2.5 bg-[#fe9a00] rounded-full" />
                          <p className="text-base leading-relaxed text-[#4a5565]">
                            {benefit.description2}
                          </p>
                        </li>
                      )}
                      {benefit.description3 && (
                        <li className="flex items-start gap-3">
                          <div className="size-1.5 shrink-0 mt-2.5 bg-[#fe9a00] rounded-full" />
                          <p className="text-base leading-relaxed text-[#4a5565]">
                            {benefit.description3}
                          </p>
                        </li>
                      )}
                      {benefit.description4 && (
                        <li className="flex items-start gap-3">
                          <div className="size-1.5 shrink-0 mt-2.5 bg-[#fe9a00] rounded-full" />
                          <p className="text-base leading-relaxed text-[#4a5565]">
                            {benefit.description4}
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {(!data?.benefitsText || data.benefitsText.length === 0) && (
            <div className="text-center py-16 text-gray-500">
              Informacija apie narystės naudas bus paskelbta netrukus.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#fe9a00] to-[#e17100] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white text-2xl mb-4">
              Norite prisijungti prie KKPDA?
            </h2>
            <p className="text-amber-50 text-lg mb-8">
              Sužinokite, kaip tapti asociacijos nariu ir prisidėti prie stiprios verslo bendruomenės
            </p>
            <div className="flex items-center justify-center">
              <Link
                href="/nariai/kaip-tapti-nariu"
                className="bg-white text-[#fe9a00] px-8 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                Kaip tapti nariu?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

