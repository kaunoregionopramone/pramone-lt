import { sanityFetch } from "@/sanity/lib/live";
import { membershipInfoQuery, contactInfoQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Send,
  Mail,
  Phone,
  MapPin,
  Users,
  Network,
  Shield,
  FileText,
} from "lucide-react";
import PortableText from "@/app/components/PortableText";

export default async function KaipTaptiNariuPage() {
  const { data } = await sanityFetch({ query: membershipInfoQuery });
  const { data: contactInfo } = await sanityFetch({ query: contactInfoQuery });

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
            <span className="text-sm text-[#101828]">Kaip tapti nariu</span>
          </div>

          <h1 className="text-5xl text-neutral-950 mb-6">Kaip tapti nariu?</h1>
          <p className="text-xl text-[#4a5565] max-w-3xl">
            KKPDA vienija įvairių sektorių įmones, teikiančias kvalifikuotas
            paslaugas įmonėms socialinės partnerystės, viešųjų pirkimų ir kitais
            klausimais
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Section 1: Why become a member */}
          <div>
            <h2 className="text-[32px] leading-[40px] text-[#2c3e5a] mb-6">
              Kodėl verta tapti KKPDA nariu?
            </h2>

            {data?.whyJoinText && (
              <article className="prose prose-lg max-w-none text-[#4a5565]">
                <PortableText value={data.whyJoinText as any} />
              </article>
            )}
          </div>
        </div>
      </section>

      {/* How to Become a Member Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 size-16 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full opacity-50 blur-xl" />
              <div className="absolute -top-4 -right-12 size-20 bg-gradient-to-br from-[#fe9a00] to-[#e17100] rounded-full opacity-30 blur-2xl" />

              <h2 className="text-[56px] leading-[64px] bg-gradient-to-r from-[#fe9a00] via-[#e17100] to-[#fe9a00] bg-clip-text text-transparent mb-4 relative">
                Kaip tapti KKPDA nariu
            </h2>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#fe9a00] to-[#fe9a00] rounded-full" />
                <div className="size-2 bg-[#fe9a00] rounded-full animate-pulse" />
                <div className="w-12 h-1 bg-gradient-to-l from-transparent via-[#fe9a00] to-[#fe9a00] rounded-full" />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Content - Who can become a member */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 border-2 border-orange-200 rounded-3xl p-12 shadow-xl mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="size-20 shrink-0 bg-gradient-to-br from-[#fe9a00] to-[#e17100] rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="size-10 text-white" />
                </div>
                <div>
                  <h3 className="text-[32px] leading-[40px] text-[#2c3e5a] mb-4">
                    Kas gali tapti nariu
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
                </div>
              </div>

              <p className="text-xl leading-relaxed text-[#2c3e5a]">
                Kauno krašto pramonininkų ir darbdavių asociacijos (KKPDA) nariais gali tapti{" "}
                <span className="font-bold text-[#fe9a00]">juridiniai asmenys</span> – įmonės,
                įstaigos, organizacijos, veikiantys pramonės, gamybos, paslaugų, mokslo ar švietimo srityse.
              </p>
            </div>

            {/* Secondary Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <Network className="size-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg text-[#2c3e5a]">Aktyvi bendruomenė</h4>
                </div>
                <p className="text-sm leading-relaxed text-[#4a5565]">
                  Narystė KKPDA – tai galimybė jungtis į aktyvią regioninę bendruomenę,
                  atstovaujančią verslo ir mokslo interesams regioniniu bei nacionaliniu lygiu.
                </p>
            </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="size-5 text-green-600" />
                  </div>
                  <h4 className="text-lg text-[#2c3e5a]">Prezidiumas tvirtina</h4>
                </div>
                <p className="text-sm leading-relaxed text-[#4a5565]">
                  Priėmimą į asociacijos narius tvirtina{" "}
                  <span className="font-semibold text-[#2c3e5a]">KKPDA Prezidiumas.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full px-4 py-2 mb-4 border border-orange-200">
              <CheckCircle className="size-5 text-[#fe9a00]" />
              <span className="text-base text-gray-900">Paprastas procesas</span>
            </div>
            <h2 className="text-4xl text-[#2c3e5a] mb-4">Kokie dokumentai reikalingi?</h2>
            <p className="text-lg text-[#4a5565] max-w-2xl mx-auto">
              Prisijungti prie KKPDA yra paprasta. Paruoškite šiuos dokumentus ir pradėkite kelionę kartu su mumis
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {Array.isArray(data?.requiredDocuments) &&
            data.requiredDocuments.length > 0 ? (
              data.requiredDocuments.map((doc: any, index: number) => (
                <div
                  key={doc._key || index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#fe9a00] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-12 shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center group-hover:from-[#fe9a00] group-hover:to-[#e17100] transition-all">
                        <FileText className="size-6 text-[#fe9a00] group-hover:text-white transition-all" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-[#2c3e5a]">{doc.title}</h3>
                        <p className="text-sm leading-relaxed text-[#4a5565]">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    {doc.fileUrl ? (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#fe9a00] to-[#e17100] text-white px-6 py-2.5 rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <svg
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {doc.fileName || "Atsisiųsti (PDF)"}
                      </a>
                    ) : doc.buttonText ? (
                      <div className="bg-gray-100 text-[#4a5565] px-6 py-2.5 rounded-lg text-sm whitespace-nowrap">
                        {doc.buttonText}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Nėra dokumentų.</div>
            )}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-br from-[#fe9a00] to-[#e17100] py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-white mb-6">
                Narystė – bendruomenė, ne formalumas
              </h2>
              <p className="text-lg leading-relaxed text-amber-50 mb-6">
                Narystė KKPDA – tai ne tik teisė dalyvauti, bet ir galimybė veikti.
              </p>
              <p className="text-lg leading-relaxed text-amber-50 mb-6">
                Kiekvienas narys jungiasi į renginius, komitetus, diskusijas ir projektus, kurie
                formuoja Kauno regiono bei Lietuvos pramonės ateitį.
              </p>
              <p className="text-lg leading-relaxed text-white mb-8">
                <strong>
                  Prisijunkite prie bendruomenės, kuri jungia lyderius, formuoja sprendimus ir kuria
                  vertę regionui.
                </strong>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-6">Susisiekite su mumis</h3>

              <div className="space-y-4 mb-6">
                {contactInfo?.address && (
                  <div className="flex items-start gap-3 text-white">
                    <MapPin className="size-5 text-amber-200 shrink-0 mt-1" />
                    <div>
                      <p className="text-base mb-1">Adresas</p>
                      <p className="text-sm text-amber-100">{contactInfo.address}</p>
                    </div>
                  </div>
                )}

                {contactInfo?.phone && (
                  <div className="flex items-start gap-3 text-white">
                    <Phone className="size-5 text-amber-200 shrink-0 mt-1" />
                    <div>
                      <p className="text-base mb-1">Telefonas</p>
                      <p className="text-sm text-amber-100">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}

                {contactInfo?.email && (
                  <div className="flex items-start gap-3 text-white">
                    <Mail className="size-5 text-amber-200 shrink-0 mt-1" />
                    <div>
                      <p className="text-base mb-1">El. paštas</p>
                      <p className="text-sm text-amber-100">{contactInfo.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="bg-white text-[#fe9a00] px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors w-full inline-flex items-center justify-center gap-2"
                >
                  <Send className="size-5" />
                  Siųsti užklausą
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
