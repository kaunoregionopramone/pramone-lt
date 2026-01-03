import { sanityFetch } from "@/sanity/lib/live";
import { singleNewsQuery, recentNewsQuery, contactInfoQuery } from "@/sanity/lib/queries";
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
  ChevronRight,
  ArrowRight,
  Download,
  FileText,
  Info,
  Phone,
  Mail,
  Euro,
  ExternalLink,
} from "lucide-react";

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

  // Get cover image URL for Open Graph
  const coverImageUrl = event.coverImage?.asset?.url;

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
      publishedTime: event.publishedAt,
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
    ?.filter((item: RecentNewsQueryResult[number]) => item.type === "renginys" && item._id !== event._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Pradžia
            </Link>
            <ChevronRight className="size-4 text-gray-400" />
            <Link
              href="/naujienos-ir-renginiai?kategorija=Renginiai"
              className="text-gray-500 hover:text-gray-700"
            >
              Renginiai
            </Link>
            <ChevronRight className="size-4 text-gray-400" />
            <span className="text-gray-900">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        {event.coverImage?.asset?.url && (
          <>
            <div className="absolute inset-0 opacity-20">
              <Image
                src={event.coverImage.asset.url}
                alt={`${event.title} nuotrauka`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent" />
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fe9a00] to-[#e17100] text-white px-4 py-2 rounded-full text-sm font-medium">
                <Calendar className="size-4" />
                Renginys
              </span>
            </div>

            <h1 className="mb-6 text-5xl lg:text-6xl">{event.title}</h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {createExcerpt(event.content)}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {event.eventStartDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-[#fe9a00]" />
                  <span>
                    {formatEventTime(event.eventStartDate, event.eventEndDate)}
                  </span>
                </div>
              )}
              {event.timeSlots && event.timeSlots[0] && (
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-[#fe9a00]" />
                  <span>{event.timeSlots[0]}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#fe9a00]" />
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
                  className="bg-gradient-to-r from-[#fe9a00] to-[#e17100] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2"
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Event Description */}
              {event.content && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Apie renginį</h2>
                  <article className="prose prose-lg max-w-none">
                    <PortableText value={event.content as any} />
                  </article>
                </div>
              )}

              {/* Event Program */}
              {event.program && event.program.length > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-12 bg-gradient-to-br from-[#fe9a00] to-[#e17100] rounded-xl flex items-center justify-center">
                      <Calendar className="size-6 text-white" />
                    </div>
                    <h2 className="mb-0">Renginio programa</h2>
                  </div>
                  <div className="space-y-4">
                    {event.program.map((item: any, index: number) => {
                      const date = new Date(item.date);
                      const day = date.getDate();
                      const month = date.toLocaleDateString("lt-LT", {
                        month: "long",
                      });

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-4 border border-orange-100"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-center shrink-0">
                              <div className="text-2xl font-medium text-[#fe9a00]">
                                {day}
                              </div>
                              <div className="text-sm text-gray-600 capitalize">
                                {month}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 mb-1">
                                {item.title}
                              </div>
                              {item.time && (
                                <div className="text-sm text-gray-600">
                                  {item.time}
                                </div>
                              )}
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Additional Info Cards */}
              {event.additionalInfo && event.additionalInfo.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.additionalInfo.map((info: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Users className="size-5 text-[#fe9a00]" />
                        </div>
                        <h3 className="mb-0">{info.title}</h3>
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
                              <div className="size-1.5 bg-[#fe9a00] rounded-full" />
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
                  <h2 className="mb-6">Dokumentai ir nuotraukos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.documents.map((doc: any, index: number) => (
                      <a
                        key={index}
                        href={doc.file?.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#fe9a00] hover:shadow-md transition-all group"
                      >
                        <div className="size-12 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#fe9a00] group-hover:to-[#e17100] transition-all">
                          <FileText className="size-6 text-[#fe9a00] group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">
                            {doc.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatFileSize(doc.file?.size)}
                          </div>
                        </div>
                        <Download className="size-5 text-gray-400 group-hover:text-[#fe9a00]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map */}
              {(event.googleMapsLocation || event.location) && (
                <div>
                  <h2 className="mb-6">Vieta</h2>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <GoogleMap
                        address={
                          event.googleMapsLocation || event.location || ""
                        }
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="size-12 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                          <MapPin className="size-6 text-[#fe9a00]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2">{event.location}</h3>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.googleMapsLocation || event.location || "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#fe9a00] hover:text-[#e17100] flex items-center gap-1"
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
                <div className="bg-gradient-to-br from-[#fe9a00] to-[#e17100] text-white rounded-2xl p-6 shadow-lg">
                  <h3 className="mb-6 text-white">Pagrindinė informacija</h3>
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
                      className="w-full mt-6 bg-white text-[#fe9a00] px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Registruotis dabar
                      <ArrowRight className="size-5" />
                    </a>
                  )}
                </div>

                {/* Recent Events */}
                {filteredRecentEvents && filteredRecentEvents.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="mb-6 flex items-center gap-2">
                      <Clock className="size-4 text-[#fe9a00]" />
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
                              <p className="text-gray-900 text-sm mb-1 group-hover:text-[#fe9a00] transition-colors line-clamp-2">
                                {recentEvent.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="size-3" />
                                <span>
                                  {formatDate(recentEvent.publishedAt)}
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
                {(contactInfo?.address || contactInfo?.phone || contactInfo?.email) && (
                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="size-5 text-[#fe9a00]" />
                      <h3 className="mb-0">Kontaktai</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      {contactInfo?.phone && (
                        <a
                          href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#fe9a00] transition-colors"
                        >
                          <Phone className="size-4 shrink-0" />
                          <span>{contactInfo.phone}</span>
                        </a>
                      )}
                      {contactInfo?.email && (
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#fe9a00] transition-colors"
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
