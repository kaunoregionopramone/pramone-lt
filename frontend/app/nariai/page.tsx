import { sanityFetch } from "@/sanity/lib/live";
import { membersQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { MembersGrid } from "@/app/components/MembersGrid";
import { ArrowRight } from "lucide-react";

// Revalidate the page every 60 seconds to ensure deleted members are removed
export const revalidate = 60;

export default async function NariaiPage() {
  const { data: members } = await sanityFetch({
    query: membersQuery,
  });

  const memberCount = members?.length || 0;

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
            <span className="text-gray-900">Nariai</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl text-gray-900">
                Organizacijos nariai
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                KKPDA vienija gamybos, statybos, transporto, logistikos,
                pramonės paslaugų, mokslo ir Savivaldybės įmones
              </p>
            </div>

            {/* Stats card */}
            {memberCount > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-800 mb-1">
                    {memberCount}
                  </div>
                  <div className="text-gray-500 text-sm uppercase tracking-wider">
                    Narių
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Members Grid Section */}
      <MembersGrid members={members || []} />

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
            Tapkite mūsų organizacijos nariu ir prisidėkite prie stiprios verslo
            bendruomenės kūrimo
          </p>

          <Link
            href="/nariai/kaip-tapti-nariu"
            className="group inline-flex items-center gap-3 bg-white text-slate-800 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Narystės sąlygos
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
