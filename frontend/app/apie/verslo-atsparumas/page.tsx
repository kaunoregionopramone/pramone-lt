import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { versloAtsparumasQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import { Download, FileText } from "lucide-react";
import { toPlainText } from "@/lib/portableTextUtils";
import type { Metadata } from "next";

const TITLE =
  "Verslo atsparumo ir tęstinumo vadovas | Kauno krašto pramonininkų ir darbdavių asociacija";

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text.slice(0, 200);
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: versloAtsparumasQuery });
  const imageUrl = data?.imageUrl;
  const plainText = data?.description ? toPlainText(data.description) : "";
  const description = plainText ? firstSentence(plainText) : "";

  return {
    title: TITLE,
    description,
    openGraph: {
      title: TITLE,
      description,
      type: "website",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: "Verslo atsparumo ir tęstinumo vadovas",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function VersloAtsparumasPage() {
  const { data } = await sanityFetch({ query: versloAtsparumasQuery });

  const description = data?.description;
  const imageUrl = data?.imageUrl;
  const imageAlt = data?.imageAlt || "Verslo atsparumo ir tęstinumo vadovas";
  const fileUrl = data?.fileUrl;
  const fileName = data?.fileName;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-12 pb-16 border-b border-gray-200/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-gray-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-gray-200/40 rounded-2xl rotate-12" />
        <div className="absolute bottom-8 right-12 w-24 h-24 border-2 border-blue-200/30 rounded-full" />
        <div className="absolute top-8 left-1/2 w-16 h-16 bg-gray-300/10 rounded-lg rotate-45" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative">
          <div className="flex items-center gap-2 mb-8 text-gray-500">
            <Link href="/" className="hover:text-gray-700">
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
            <Link href="/apie/apie-kkpda" className="hover:text-gray-700">
              Apie mus
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
            <span className="text-gray-900">
              Verslo atsparumo ir tęstinumo vadovas
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl">
            Verslo atsparumo ir tęstinumo vadovas
          </h1>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: description + download card */}
            <div className="flex flex-col gap-10">
              {/* Decorative header */}
              <div className="w-12 h-1 bg-gray-800 rounded-full" />

              {description && (
                <article className="prose prose-lg max-w-none text-gray-600 text-justify">
                  <PortableText value={description as any} />
                </article>
              )}

              {/* Download card */}
              {fileUrl && (
                <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex items-center gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                    <FileText className="size-7 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {fileName || "Verslo atsparumo ir tęstinumo vadovas"}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      PDF dokumentas
                    </p>
                  </div>
                  <a
                    href={fileUrl}
                    download={fileName || true}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group shrink-0 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Download className="size-4" />
                    Atsisiųsti
                  </a>
                </div>
              )}
            </div>

            {/* Right: image */}
            {imageUrl && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[500px] flex items-center justify-center">
                {/* Blurred background fill */}
                <div
                  className="absolute inset-0 scale-110 blur-xl brightness-90"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Main image — fully visible, centered */}
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={800}
                  height={1000}
                  className="relative z-10 w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
