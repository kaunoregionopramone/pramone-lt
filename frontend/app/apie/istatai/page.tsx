import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { legalDocumentsQuery } from "@/sanity/lib/queries";
import {
  Calendar,
  Users,
  Scale,
  CheckCircle,
  FileText,
  Download,
  BookOpen,
  Shield,
  ExternalLink,
  Eye,
  Heart,
  Handshake,
  Leaf,
  ShieldX,
  Lock,
} from "lucide-react";

export default async function IstataiPage() {
  const { data } = await sanityFetch({ query: legalDocumentsQuery });
  const statutesUrl: string | undefined = data?.statutesUrl || undefined;
  const ethicsUrl: string | undefined = data?.ethicsUrl || undefined;

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
            <span className="text-gray-900">Įstatai</span>
          </div>

          <h1 className="mb-6 text-5xl text-gray-900">Įstatai</h1>
          <p className="text-gray-600 max-w-3xl text-xl">
            Asociacijos veiklą reglamentuojantys pagrindiniai dokumentai
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl text-gray-900 mb-8">
                Teisinė ir etinė struktūra
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                <p>
                  Kauno krašto pramonininkų ir darbdavių asociacija (KKPDA) –
                  ribotos civilinės atsakomybės viešasis juridinis asmuo,
                  veikiantis asociacijos teisine forma.
                </p>
                <p>
                  Asociacija vienija gamybos, paslaugų, švietimo, mokslo ir
                  kitų sričių organizacijas, siekiančias stiprinti Kauno
                  regiono ir visos šalies ekonominę, socialinę bei
                  technologinę pažangą.
                </p>
                <p>
                  Asociacijos veiklą reglamentuoja{" "}
                  <span className="font-medium text-gray-900">
                    KKPDA įstatai
                  </span>
                  , įregistruoti Juridinių asmenų registre{" "}
                  <span className="font-medium text-gray-900">
                    2021 m. gruodžio 7 d.
                  </span>
                </p>
              </div>

              {statutesUrl ? (
                <a
                  href={statutesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-[#fe9a00] to-[#e17100] text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] transition-all"
                >
                  <FileText className="size-5" />
                  Peržiūrėti KKPDA įstatus
                  <ExternalLink className="size-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <div className="group mt-10 inline-flex items-center gap-3 bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-medium cursor-not-allowed">
                  <FileText className="size-5" />
                  Peržiūrėti KKPDA įstatus
                  <ExternalLink className="size-4 opacity-75" />
                </div>
              )}
            </div>

            <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/10 transition-shadow">
              <Image
                src="/images/EK.png"
                alt="Etikos kodeksas"
                fill
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Ethics Code Detailed Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 mb-4">
              <Shield className="size-4 text-[#fe9a00]" />
              <span className="text-[#fe9a00] font-medium text-sm">
                Etikos kodeksas
              </span>
            </div>
            <h2 className="text-2xl text-gray-900 mb-4">
              Vertybės ir principai
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              KKPDA Etikos kodeksas – tai{" "}
              <span className="font-medium text-gray-900">
                bendruomenės veikimo kultūros pagrindas
              </span>
              , apibrėžiantis elgesio ir atsakomybės principus, kurių laikosi
              visi asociacijos nariai, vadovai ir atstovaujančios įstaigos.
            </p>
          </div>

          {/* Core Values - Highlighted Section */}
          <div className="bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 border-2 border-orange-200 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl mb-16">
            <p className="text-gray-800 text-xl sm:text-2xl leading-relaxed mb-8 text-center">
              Kodeksas nustato aiškias vertybes, kuriomis grindžiami KKPDA
              narių tarpusavio santykiai ir bendravimas su išoriniais
              partneriais:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Eye className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Skaidrumas ir sąžiningumas
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Heart className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Pagarba ir pasitikėjimas
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Handshake className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Etiškas konkuravimas ir verslo solidarumas
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Leaf className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Žmogaus teisių ir tvarumo principai
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldX className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Korupcijos netoleravimas
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#fe9a00] hover:shadow-lg transition-all">
                <div className="size-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Lock className="size-7 text-[#fe9a00]" />
                </div>
                <span className="text-gray-900 font-medium leading-tight">
                  Reputacijos ir konfidencialumo apsauga
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-8 lg:mb-10">
              <div className="flex gap-3">
                <CheckCircle className="size-5 text-[#fe9a00] shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed text-sm">
                  Etikos kodeksas įpareigoja visus KKPDA narius elgtis
                  atsakingai, laikytis sąžiningumo, protingumo ir teisingumo
                  principų. Jo laikymasis – kiekvieno nario garbės reikalas.
                </p>
              </div>

              <div className="flex gap-3">
                <Scale className="size-5 text-[#fe9a00] shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed text-sm">
                  Pažeidimų atveju sprendimus priima Asociacijos Prezidiumas,
                  užtikrindamas vienodą, skaidrią ir garbingą standartų
                  taikymą.
                </p>
              </div>

              <div className="flex gap-3">
                <Shield className="size-5 text-[#fe9a00] shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed text-sm italic">
                  Etika KKPDA – tai ne dokumentas ar veikimo kultūros
                  pagrindas. Ji grįsta pagarba, atsakomybe ir pasitikėjimu,
                  kurie kuria stiprų ir patikimą bendruomenės stimulą.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-2 lg:pt-4">
              {ethicsUrl ? (
                <a
                  href={ethicsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#fe9a00] to-[#e17100] text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] transition-all"
                >
                  <Shield className="size-5" />
                  Peržiūrėti Etikos Kodeksą
                  <ExternalLink className="size-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <div className="group inline-flex items-center gap-3 bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-medium cursor-not-allowed">
                  <Shield className="size-5" />
                  Peržiūrėti Etikos Kodeksą
                  <ExternalLink className="size-4 opacity-75" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
