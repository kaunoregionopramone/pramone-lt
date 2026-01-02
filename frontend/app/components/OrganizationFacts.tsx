'use client';

import { Users, Building2, Award, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FactItem {
  icon: typeof Users;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

interface OrganizationFactsProps {
  yearsOfActivity: number;
  membersCount: number;
  misija?: string;
  vizija?: string;
}

export function OrganizationFacts({ yearsOfActivity, membersCount, misija, vizija }: OrganizationFactsProps) {
  const facts: FactItem[] = [
    {
      icon: Building2,
      title: `${yearsOfActivity} metų patirtis`,
      description: '1989 m. gruodžio 22 d. buvo įsteigta Kauno pramonininkų asociacija. Per šį laikotarpį tapome viena įtakingiausių verslo organizacijų.',
      link: '/apie/istorija',
      linkText: 'Plačiau',
    },
    {
      icon: Users,
      title: `${membersCount} narių`,
      description: 'Kauno krašto pramonininkų ir darbdavių asociacija – savarankiška pelno nesiekianti organizacija vienijanti verslo lyderius.',
      link: '/nariai',
      linkText: 'Plačiau',
    },
    {
      icon: Calendar,
      title: 'Misija',
      description: misija || 'Atstovauti nariams, vienijant verslo, mokslo ir visuomenės interesus.',
      link: '/apie/veikla',
      linkText: 'Plačiau',
    },
    {
      icon: TrendingUp,
      title: 'Vizija',
      description: vizija || 'Vedanti ir atvira verslo organizacija, kurioje narystė yra vertinga ir garbinga.',
      link: '/apie/veikla',
      linkText: 'Plačiau',
    },
    
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-3 text-lg font-semibold">
                  {fact.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {fact.description}
                </p>
                <Link 
                  href={fact.link} 
                  className="text-amber-600 hover:text-amber-700 text-sm transition-colors inline-flex items-center gap-1 group/link mt-auto"
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

