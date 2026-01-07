import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { eventsListQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

const formatDateRange = (event: any) => {
  const opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeOpts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  if (event.startAt) {
    const start = new Date(event.startAt);
    const startStr = `${start.toLocaleDateString("lt-LT", opts)} @ ${start.toLocaleTimeString("lt-LT", timeOpts)}`;
    if (event.endAt) {
      const end = new Date(event.endAt);
      const endStr = `${end.toLocaleDateString("lt-LT", opts)} @ ${end.toLocaleTimeString("lt-LT", timeOpts)}`;
      return `${startStr} - ${endStr}`;
    }
    return startStr;
  }
  const dateText = event.date || "";
  const timeText = event.time ? ` • ${event.time}` : "";
  return `${dateText}${timeText}`;
};

export default async function RenginiaiPage({ searchParams }: { searchParams?: Promise<{ from?: string; to?: string }> }) {
  const params: any = (await searchParams) || {};
  const normalize = (v: any) => (typeof v === "string" && v.trim() !== "" ? v : null);
  const from = normalize(params.from);
  const to = normalize(params.to);
  // Always fetch all and filter robustly in JS to avoid GROQ param quirks with empty values
  const { data: events } = await sanityFetch({ query: eventsListQuery, params: { from: null, to: null } });

  const toDate = to ? new Date(to) : null;
  const fromDate = from ? new Date(from) : null;
  const getEventDate = (e: any) => new Date(e.startAt ?? (e.date ? `${e.date}T00:00:00Z` : 0));
  const filtered = Array.isArray(events)
    ? events.filter((e: any) => {
        const d = getEventDate(e);
        if (Number.isNaN(d.getTime())) return false;
        if (fromDate && d < fromDate) return false;
        if (toDate && d > toDate) return false;
        return true;
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <section className="relative bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute inset-0 dotted-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2 tracking-tight uppercase">Renginiai</h1>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <form className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" action="/renginiai" method="get">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Nuo (data)</label>
              <input name="from" type="date" defaultValue={from ?? undefined} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Iki (data)</label>
              <input name="to" type="date" defaultValue={to ?? undefined} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="flex items-end gap-3">
              <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded-md">Filtruoti</button>
              <Link href="/renginiai" className="px-4 py-2 border border-gray-300 rounded-md text-blue-900 bg-white">Išvalyti filtrus</Link>
            </div>
          </form>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(filtered) && filtered.length > 0 ? (
            filtered.map((event: any) => (
              <article key={event._id} className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex flex-col">
                {event.cover && (
                  <div className="relative h-80 w-full bg-white border-b border-gray-200">
                    <Image
                      src={
                        (urlForImage(event.cover)?.width(1200).height(800).fit("crop").url() as string) ||
                        "/placeholder.jpg"
                      }
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-bold text-blue-900 text-lg">{event.title}</h3>
                  <div className="text-sm text-gray-600">{formatDateRange(event)}</div>
                  {event.location && <div className="font-semibold text-blue-900">Vieta: {event.location}</div>}
                  {event.organizers && <div className="text-sm text-gray-600">Organizatoriai: {event.organizers}</div>}
                  <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {event.excerpt || event.plainContent || ''}
                  </p>
                  <div className="mt-auto pt-3">
                    <Link href={`/renginiai/${event.slug?.current ?? ""}`} className="text-amber-500 underline underline-offset-2 hover:text-amber-600 font-semibold">
                      Sužinokite daugiau »
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-500">Renginių kol kas nėra.</p>
          )}
          </div>
        </div>
      </section>
    </div>
  );
}


