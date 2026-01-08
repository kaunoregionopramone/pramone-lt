"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface OrganizationFactsProps {
  yearsOfActivity: number;
  membersCount: number;
  metuPatirtisAprasymas?: string;
  asociacijosNariaiAprasymas?: string;
  misija?: string;
  vizija?: string;
}

export function OrganizationFacts({
  yearsOfActivity,
  membersCount,
  metuPatirtisAprasymas,
  asociacijosNariaiAprasymas,
  misija,
  vizija,
}: OrganizationFactsProps) {
  const facts = [
    {
      number: `${yearsOfActivity}`,
      title: "Metų patirtis",
      description: metuPatirtisAprasymas,
      link: "/apie/istorija",
      linkText: "Plačiau",
    },
    {
      number: `${membersCount}`,
      title: "Asociacijos nariai",
      description: asociacijosNariaiAprasymas,
      link: "/nariai",
      linkText: "Plačiau",
    },
    {
      number: "Misija",
      description: misija,
      link: "/apie/apie-kkpda",
      linkText: "Plačiau",
    },
    {
      number: "Vizija",
      description: vizija,
      link: "/apie/apie-kkpda",
      linkText: "Plačiau",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => {
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-4">
                  <div className="text-5xl text-slate-800 mb-2">
                    {fact.number}
                  </div>
                </div>
                <h3 className="text-gray-900 mb-3 font-semibold">
                  {fact.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {fact.description}
                </p>
                <Link
                  href={fact.link}
                  className="text-slate-700 hover:text-slate-900 text-sm transition-colors inline-flex items-center gap-1 group/link mt-auto"
                >
                  <span>{fact.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
