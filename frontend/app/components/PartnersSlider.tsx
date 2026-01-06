"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  _key: string;
  title: string;
  logo: string;
}

interface PartnersSliderProps {
  partners: Partner[];
}

export function PartnersSlider({ partners }: PartnersSliderProps) {
  // Only show partners with logos
  const partnersWithLogos = partners.filter((p) => p.logo);

  // If no partners with logos, don't render the section
  if (partnersWithLogos.length === 0) {
    return null;
  }

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [
    ...partnersWithLogos,
    ...partnersWithLogos,
    ...partnersWithLogos,
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-white border-b border-gray-100">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Infinite scroll container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling logos */}
          <div className="overflow-hidden">
            <div className="flex gap-16 animate-scroll hover:[animation-play-state:paused] py-8">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner._key}-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.title} logotipas`}
                    width={192}
                    height={96}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/apie/partneriai"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-slate-700 transition-colors group text-sm"
          >
            <span>Visi partneriai</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
