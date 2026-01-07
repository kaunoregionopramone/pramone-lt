import { sanityFetch } from "@/sanity/lib/live";
import {
  singleNewsQuery,
  recentNewsQuery,
  contactInfoQuery,
} from "@/sanity/lib/queries";
import PortableText from "@/app/components/PortableText";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoogleMap } from "@/app/components/GoogleMap";
import { ShareButtons } from "@/app/components/ShareButtons";
import { createExcerpt } from "@/lib/portableTextUtils";
import type { Metadata } from "next";
import type { RecentNewsQueryResult } from "@/sanity.types";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Tag,
  ArrowRight,
  Download,
  FileText,
  Info,
  Phone,
  Mail,
  Euro,
  ExternalLink,
} from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatEventTime(startDate?: string, endDate?: string | null) {
  if (!startDate) return null;

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("lt-LT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (end) {
    // Check if same day
    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${formatFullDate(start)}, ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatFullDate(start)} — ${formatFullDate(end)}`;
    }
  }

  return formatFullDate(start);
}

function formatFileSize(bytes?: number) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${kb.toFixed(0)} KB`;
}

/**
 * Generate metadata for social sharing (Open Graph, Twitter Cards)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: singleNewsQuery,
    params: { slug },
    stega: false, // Metadata should never contain stega
  });

  if (!event) {
    return {
      title: "Renginys nerastas",
      description: "Šis renginys neegzistuoja arba buvo pašalintas.",
    };
  }

  // Create description from content
  const description = createExcerpt(event.content as any, 160);

  // Get cover image URL for Open Graph (respect hotspot/crop)
  const coverImageUrl =
    (urlForImage(event.coverImage)?.width(1200).height(630).fit("crop").url() as string) ||
    undefined;

  const title = event.title || "Renginys";
  const eventTime = event.eventStartDate
    ? formatEventTime(event.eventStartDate, event.eventEndDate)
    : null;

  const fullDescription = eventTime
    ? `${eventTime}. ${description}`
    : description;

  return {
    title,
    description: fullDescription,
    openGraph: {
      title,
      description: fullDescription,
      type: "article",
      publishedTime: event._createdAt,
      authors: ["KKPDA"],
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              width: 1200,
              height: 630,
              alt: `${event.title} nuotrauka`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: fullDescription,
      images: coverImageUrl ? [coverImageUrl] : [],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: singleNewsQuery,
    params: { slug },
  });

  const { data: recentEvents } = await sanityFetch({
    query: recentNewsQuery,
  });

  const { data: contactInfo } = await sanityFetch({
    query: contactInfoQuery,
  });

  if (!event || event.type !== "renginys") {
    notFound();
  }

  // Filter recent events to show only events
  const filteredRecentEvents = recentEvents
    ?.filter(
      (item: RecentNewsQueryResult[number]) =>
        item.type === "renginys" && item._id !== event._id
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
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
            <Link
              href="/naujienos-ir-renginiai?kategorija=Renginiai"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Renginiai
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
            <span className="text-gray-900 truncate max-w-xs">
              {event.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        {event.coverImage && (
          <>
            <div className="absolute inset-0 opacity-20">
              <Image
                src={
                  (urlForImage(event.coverImage)
                    ?.width(1600)
                    .height(900)
                    .fit("crop")
                    .url() as string) || "/placeholder.jpg"
                }
                alt={`${event.title} nuotrauka`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />
          </>
        )}

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-blue-900/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-white/10 rounded-2xl rotate-12" />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-20">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <Calendar className="size-4" />
                Renginys
              </span>
            </div>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {event.eventStartDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-slate-400" />
                  <span>
                    {formatEventTime(event.eventStartDate, event.eventEndDate)}
                  </span>
                </div>
              )}
              {event.timeSlots && event.timeSlots[0] && (
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-slate-400" />
                  <span>{event.timeSlots[0]}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-slate-400" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Registruotis
                  <ArrowRight className="size-5" />
                </a>
              )}
              <ShareButtons
                title={event.title}
                description={createExcerpt(event.content as any, 160)}
                variant="dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Event Description */}
              {event.content && (
                <div>
                  <h2 className="text-3xl font-semibold mb-6">Apie renginį</h2>
                  <article className="prose prose-lg max-w-none">
                    <PortableText value={event.content as any} />
                  </article>
                </div>
              )}

              {/* Additional Info Cards */}
              {event.additionalInfo && event.additionalInfo.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.additionalInfo.map((info: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Users className="size-5 text-slate-600" />
                        </div>
                        <h3 className="font-semibold mb-0">{info.title}</h3>
                      </div>
                      {info.description && (
                        <p className="text-gray-600 text-sm mb-3">
                          {info.description}
                        </p>
                      )}
                      {info.items && info.items.length > 0 && (
                        <ul className="space-y-2 text-sm text-gray-600">
                          {info.items.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="size-1.5 bg-slate-400 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Documents */}
              {event.documents && event.documents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Dokumentai ir nuotraukos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.documents.map((doc: any, index: number) => (
                      <a
                        key={index}
                        href={doc.file?.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all group"
                      >
                        <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-slate-700 group-hover:to-slate-800 transition-all">
                          <FileText className="size-6 text-slate-600 group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">
                            {doc.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatFileSize(doc.file?.size)}
                          </div>
                        </div>
                        <Download className="size-5 text-gray-400 group-hover:text-slate-700" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map */}
              {(event.googleMapsLocation || event.location) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Vieta</h2>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <GoogleMap
                        address={
                          event.googleMapsLocation || event.location || ""
                        }
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="size-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{event.location}</h3>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.googleMapsLocation || event.location || "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors"
                            >
                              Gauti nuorodas
                              <ExternalLink className="size-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl p-6 shadow-lg">
                  <h3 className="mb-6 text-white font-semibold">
                    Pagrindinė informacija
                  </h3>
                  <div className="space-y-4">
                    {event.eventStartDate && (
                      <>
                        <div className="flex items-start gap-3">
                          <Calendar className="size-5 shrink-0 mt-0.5 opacity-90" />
                          <div>
                            <div className="text-sm opacity-90 mb-1">Data</div>
                            <div className="font-medium">
                              {formatEventTime(
                                event.eventStartDate,
                                event.eventEndDate
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-px bg-white/20" />
                      </>
                    )}
                    {event.timeSlots && event.timeSlots.length > 0 && (
                      <>
                        <div className="flex items-start gap-3">
                          <Clock className="size-5 shrink-0 mt-0.5 opacity-90" />
                          <div>
                            <div className="text-sm opacity-90 mb-1">
                              Laikas
                            </div>
                            {event.timeSlots.map((slot: string, i: number) => (
                              <div key={i} className="font-medium">
                                {slot}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-full h-px bg-white/20" />
                      </>
                    )}
                    {event.location && (
                      <>
                        <div className="flex items-start gap-3">
                          <MapPin className="size-5 shrink-0 mt-0.5 opacity-90" />
                          <div>
                            <div className="text-sm opacity-90 mb-1">Vieta</div>
                            <div className="font-medium">{event.location}</div>
                          </div>
                        </div>
                        <div className="w-full h-px bg-white/20" />
                      </>
                    )}
                    {event.entrance && (
                      <div className="flex items-start gap-3">
                        <Euro className="size-5 shrink-0 mt-0.5 opacity-90" />
                        <div>
                          <div className="text-sm opacity-90 mb-1">Įėjimas</div>
                          <div className="font-medium">{event.entrance}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-6 bg-white text-slate-800 px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      Registruotis dabar
                      <ArrowRight className="size-5" />
                    </a>
                  )}
                </div>

                {/* Recent Events */}
                {filteredRecentEvents && filteredRecentEvents.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="mb-6 flex items-center gap-2 font-semibold">
                      <Clock className="size-4 text-slate-600" />
                      Kiti renginiai
                    </h3>
                    <div className="space-y-4">
                      {filteredRecentEvents.map((recentEvent: any) => (
                        <Link
                          key={recentEvent._id}
                          href={`/renginiai/${recentEvent.slug.current}`}
                          className="block group"
                        >
                          <div className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-900 text-sm mb-1 group-hover:text-slate-700 transition-colors line-clamp-2">
                                {recentEvent.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="size-3" />
                                <span>
                                  {formatDate(recentEvent._createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {(contactInfo?.address ||
                  contactInfo?.phone ||
                  contactInfo?.email) && (
                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="size-5 text-slate-600" />
                      <h3 className="font-semibold mb-0">Kontaktai</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      {contactInfo?.phone && (
                        <a
                          href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-slate-700 transition-colors"
                        >
                          <Phone className="size-4 shrink-0" />
                          <span>{contactInfo.phone}</span>
                        </a>
                      )}
                      {contactInfo?.email && (
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-slate-700 transition-colors"
                        >
                          <Mail className="size-4 shrink-0" />
                          <span>{contactInfo.email}</span>
                        </a>
                      )}
                      {contactInfo?.address && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="size-4 shrink-0 mt-0.5" />
                          <span>{contactInfo.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
