'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './ImageWithFallback';
import Link from 'next/link';
import { stegaClean } from '@sanity/client/stega';

// Regex to remove all zero-width and invisible Unicode characters
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

  if (!news || news.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-slate-50 to-transparent opacity-40"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-400 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{cleanText(news[currentSlide].date)}</span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-xl shadow-lg text-sm">
                {cleanText(news[currentSlide].category)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight">
              {cleanText(news[currentSlide].title)}
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {cleanText(news[currentSlide].excerpt)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/${news[currentSlide].type === 'renginys' ? 'renginiai' : 'naujienos'}/${news[currentSlide].slug}`}>
                <Button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all group">
                  Plačiau
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/naujienos-ir-renginiai">
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-slate-500 px-8 py-6 text-lg"
                >
                  Visos naujienos
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Large Hero Image */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity scale-105"></div>
              
              {/* Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={news[currentSlide].image || '/images/placeholder.svg'}
                  alt={`${news[currentSlide].title} nuotrauka`}
                  className="w-full h-[350px] lg:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-slate-400 to-slate-600 rounded-3xl opacity-20 -z-10"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-700 rounded-3xl opacity-20 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 pt-8 lg:pt-12">
          <Button
            size="icon"
            variant="outline"
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border-2 border-gray-300 hover:bg-slate-600 hover:border-slate-600 hover:text-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="flex gap-3">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-12 bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg' 
                    : 'w-2.5 bg-gray-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border-2 border-gray-300 hover:bg-slate-600 hover:border-slate-600 hover:text-white transition-all shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
