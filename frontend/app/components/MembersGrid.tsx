"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Building2 } from "lucide-react";
import type { MembersQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

interface MembersGridProps {
  members: NonNullable<MembersQueryResult>;
}

export function MembersGrid({ members }: MembersGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) => {
    const searchLower = searchQuery.toLowerCase();
    return member.company?.toLowerCase().includes(searchLower);
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ieškoti narių pagal pavadinimą..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-gray-400 transition-all"
            />
          </div>

          {searchQuery && (
            <p className="mt-4 text-sm text-gray-600 text-center">
              Rasta{" "}
              <span className="font-semibold text-slate-700">
                {filteredMembers.length}
              </span>{" "}
              organizacijų
            </p>
          )}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-slate-300 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Logo */}
                <div className="bg-white rounded-xl p-3 mb-4 h-28 flex items-center justify-center transition-all overflow-hidden border border-gray-100 group-hover:border-slate-200">
                  {member.logo ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          (urlForImage(member.logo)
                            ?.width(400)
                            .height(200)
                            .fit("max")
                            .url() as string) || "/images/placeholder.svg"
                        }
                        alt={`${member.company} logotipas`}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="size-14 mx-auto rounded-xl bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-slate-200 transition-colors">
                        <Building2 className="size-7 text-slate-400 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Company name */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                    {member.company}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center size-24 bg-gray-100 rounded-full mb-6">
              <Search className="size-12 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3 font-medium">
              Narių nerasta
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Pabandykite pakeisti paieškos kriterijus arba patikrinkite
              rašybą
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Išvalyti paiešką
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
