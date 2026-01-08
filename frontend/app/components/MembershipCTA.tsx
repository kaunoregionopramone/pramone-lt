"use client";

import { Button } from "./ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import Link from "next/link";

interface MembershipCTAProps {
  membersCount: number;
  yearsOfActivity: number;
  apyvarta?: number;
  contactInfo?: {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    googleAddress?: string | null;
  } | null;
}

export function MembershipCTA({
  membersCount,
  yearsOfActivity,
  apyvarta,
  contactInfo,
}: MembershipCTAProps) {
  const benefits = [
    `Prisijunkite prie ${membersCount} verslo lyderių bendruomenės`,
    "Gaukite ekspertų konsultacijas ir palaikymą",
    "Dalyvaukite eksklityviuose renginiuose ir mokymuose",
    "Plėskite savo verslo tinklą ir galimybes",
  ];

  return (
    <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            <h2 className="text-5xl mb-6 font-bold">
              Tapkite mūsų nariais šiandien
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Prisijunkite prie Kauno krašto pramonininkų ir darbdavių
              asociacijos ir atidarykite naujas verslo galimybes.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/nariai/kaip-tapti-nariu">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                >
                  Sužinoti daugiau
                </Button>
              </Link>
            </div>

            {contactInfo && (contactInfo.email || contactInfo.phone) && (
              <div className="mt-8 pt-8 border-t border-gray-600">
                <p className="text-gray-300 text-sm">
                  Turite klausimų? Susisiekite su mumis:{" "}
                  {contactInfo.email && (
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="underline hover:text-white"
                    >
                      {contactInfo.email}
                    </a>
                  )}
                  {contactInfo.email && contactInfo.phone && " arba tel. "}
                  {contactInfo.phone && contactInfo.phone}
                </p>
              </div>
            )}
          </div>

          {/* Right: Image/Visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-600">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW18ZW58MXx8fHwxNzYxNzQ2NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business team"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-6 bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xl sm:text-3xl text-slate-800 font-bold">
                    {membersCount}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Narių</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl text-slate-800 font-bold">
                    {yearsOfActivity}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Metų patirties</div>
                </div>
                <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl text-slate-800 font-bold whitespace-nowrap">
                    {apyvarta ? `${apyvarta} mlrd.` : "3+ mlrd."}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Apyvarta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
