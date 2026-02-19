'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './ImageWithFallback';
import Link from 'next/link';
import { stegaClean } from '@sanity/client/stega';

const INVISIBLE_CHARS_REGEX = /[\u200B-\u200D\u2060\u2061\u2062\u2063\u2064\uFEFF\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u2000-\u200F\u202A-\u202F\u205F-\u206F\u3000\u3164\uFE00-\uFE0F]/g;

function cleanText(text: string): string {
  return stegaClean(text).replace(INVISIBLE_CHARS_REGEX, '');
}

interface NewsItem {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  type: string;
}

interface NewsCarouselProps {
  news: NewsItem[];
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fading, setFading] = useState(false);

  if (!news || news.length === 0) {
    return null;
  }

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setFading(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setFading(false);
    }, 200);
  }, [currentSlide]);

  const nextSlide = () => goToSlide((currentSlide + 1) % news.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + news.length) % news.length);

  const item = news[currentSlide];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-slate-50 to-transparent opacity-40" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-14 lg:pb-24">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-stretch">

          {/* Left: Text Content */}
          <div
            className={`order-2 lg:order-1 flex flex-col gap-6 lg:gap-8 h-full transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Badges — always at top */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                {cleanText(item.date)}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 bg-slate-700 text-white rounded-lg text-sm font-medium">
                {cleanText(item.category)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-snug line-clamp-3">
              {cleanText(item.title)}
            </h2>

            {/* Excerpt */}
            <p className="text-base lg:text-lg text-gray-500 leading-relaxed line-clamp-4">
              {cleanText(item.excerpt)}
            </p>

            {/* CTA Buttons — pinned to bottom */}
            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <Link href={`/${item.type === 'renginys' ? 'renginiai' : 'naujienos'}/${item.slug}`}>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white px-8 h-13 text-base shadow-lg hover:shadow-xl transition-all group">
                  Plačiau
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/naujienos-ir-renginiai">
                <Button
                  variant="outline"
                  className="border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-slate-400 px-8 h-13 text-base"
                >
                  Visos naujienos
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="order-1 lg:order-2 h-[340px] lg:h-[520px]">
            <div
              className={`relative rounded-2xl overflow-hidden h-full transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
            >
              {/* Blurred background for non-16:9 images */}
              <div
                className="absolute inset-0 scale-110 blur-xl brightness-75"
                style={{
                  backgroundImage: `url(${item.image || '/images/placeholder.svg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Main image — contained so nothing is cropped */}
              <ImageWithFallback
                src={item.image || '/images/placeholder.svg'}
                alt={`${item.title} nuotrauka`}
                className="relative z-10 w-full h-full object-contain"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-5 pt-10 lg:pt-12">
          <Button
            size="icon"
            variant="outline"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-gray-300 hover:bg-slate-700 hover:border-slate-700 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2.5">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Skaidrė ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-10 bg-slate-700'
                    : 'w-2 bg-gray-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-gray-300 hover:bg-slate-700 hover:border-slate-700 hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
