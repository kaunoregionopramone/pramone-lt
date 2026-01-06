'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OrganizationFactsProps {
  yearsOfActivity: number;
  membersCount: number;
  misija?: string;
  vizija?: string;
}

export function OrganizationFacts({ yearsOfActivity, membersCount, misija, vizija }: OrganizationFactsProps) {
  const facts = [
    {
      number: `${yearsOfActivity}+`,
      title: 'Metų patirtis',
      description: '1989 m. gruodžio 22 d. buvo įsteigta Kauno pramonininkų asociacija. Per šį laikotarpį tapome viena įtakingiausių verslo organizacijų.',
      link: '/apie/istorija',
      linkText: 'Plačiau',
    },
    {
      number: `${membersCount}`,
      title: 'Asociacijos nariai',
      description: 'Kauno krašto pramonininkų ir darbdavių asociacija – savarankiška pelno nesiekianti organizacija vienijanti verslo lyderius.',
      link: '/nariai',
      linkText: 'Plačiau',
    },
    {
      number: 'Misija',
      title: 'Mūsų misija',
      description: misija || 'Atstovauti nariams, vienijant verslo, mokslo ir visuomenės interesus.',
      link: '/apie/apie-kkpda',
      linkText: 'Plačiau',
    },
    {
      number: 'Vizija',
      title: 'Mūsų vizija',
      description: vizija || 'Vedanti ir atvira verslo organizacija, kurioje narystė yra vertinga ir garbinga.',
      link: '/apie/apie-kkpda',
      linkText: 'Plačiau',
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
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="text-5xl text-slate-800 mb-2">{fact.number}</div>
                </div>
                <h3 className="text-gray-900 mb-3 font-semibold">
                  {fact.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {fact.description}
                </p>
                <Link 
                  href={fact.link} 
                  className="text-slate-700 hover:text-slate-900 text-sm transition-colors inline-flex items-center gap-1 group/link"
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
