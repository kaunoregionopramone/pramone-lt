"use client";

interface Benefit {
  _key: string;
  title: string;
  description1?: string | null;
}

interface MemberBenefitsProps {
  benefits?: Benefit[];
}

export function MemberBenefits({
  benefits: sanityBenefits,
}: MemberBenefitsProps) {
  // Don't render if no benefits provided
  if (!sanityBenefits || sanityBenefits.length === 0) {
    return null;
  }

  const benefits = sanityBenefits.map((b) => ({
    title: b.title,
    description: b.description1 || "",
  }));

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-32 relative border-b border-gray-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-gray-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl text-gray-900 mb-6">Narystės naudos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Narystė KKPDA – tai dalyvavimas bendruomenėje, kuri jungia sprendimų
            priėmėjus, telkia kompetencijas ir kryptingai dirba regiono bei
            nacionaliniu mastu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            return (
              <div key={index} className="group relative">
                {/* Card content */}
                <div className="relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full"></div>
                  </div>

                  <h3 className="text-2xl text-gray-900 mb-4 font-semibold">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
