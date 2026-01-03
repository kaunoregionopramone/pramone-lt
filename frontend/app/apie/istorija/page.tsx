import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import {
  istorijaQuery,
  membersCountQuery,
} from "@/sanity/lib/queries";
import type { IstorijaQueryResult } from "@/sanity.types";
import { HistoryTimeline } from "@/app/components/HistoryTimeline";
import PortableText from "@/app/components/PortableText";
import {
  Users,
  TrendingUp,
  Calendar as CalendarIcon,
} from "lucide-react";

export default async function IstorijaPage() {
  const [{ data: istorijaData }, { data: membersCount }] = await Promise.all([
    sanityFetch({ query: istorijaQuery }),
    sanityFetch({ query: membersCountQuery }),
  ]);

  const data = istorijaData as IstorijaQueryResult;
  const pastPresidents = data?.pastPresidents || [];
  const ourHistory = data?.ourHistory;
  const turnover = data?.turnover;

  // Calculate years of activity (from 1989 to current year)
  const foundingYear = 1989;
  const currentYear = new Date().getFullYear();
  const yearsOfActivity = currentYear - foundingYear;

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
            <span className="text-gray-900">Istorija</span>
          </div>

          <h1 className="mb-6 text-5xl text-gray-900">Istorija</h1>
          <p className="text-gray-600 max-w-3xl text-xl">
            Kauno krašto pramonininkų ir darbdavių asociacija – viena seniausių
            ir įtakingiausių verslo organizacijų Lietuvoje
          </p>

          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#fe9a00] to-[#e17100] rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Mūsų istorija Section */}
        {ourHistory && (
          <div className="mb-16">
            <h2 className="text-2xl text-[#101828] mb-6">Mūsų istorija</h2>
            <article className="prose prose-lg max-w-none text-[#4a5565]">
              <PortableText value={ourHistory as any} />
            </article>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FE9A00] to-[#E17100] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#101828] mb-1">
              {membersCount || 0}+
            </div>
            <div className="text-sm text-[#4a5565]">Narių</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FE9A00] to-[#E17100] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#101828] mb-1">
              {yearsOfActivity}+
            </div>
            <div className="text-sm text-[#4a5565]">Metų patirtis</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FE9A00] to-[#E17100] rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#101828] mb-1">{turnover || "0"} mlrd.</div>
            <div className="text-sm text-[#4a5565]">Pajamų</div>
          </div>
        </div>

      </div>

      {/* Timeline Section */}
      {pastPresidents && pastPresidents.length > 0 && (
        <div className="bg-gray-50 py-20 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#101828] mb-4">
                KKPDA vadovai
              </h2>
              <p className="text-lg text-[#4a5565] leading-[1.7]">
                Asociacijos prezidentai nuo pat įkūrimo 1989 metais iki šių
                dienų
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#FE9A00] to-[#E17100] mx-auto mt-6 rounded-full"></div>
            </div>
            <HistoryTimeline events={pastPresidents} />
          </div>
        </div>
      )}


    </div>
  );
}
