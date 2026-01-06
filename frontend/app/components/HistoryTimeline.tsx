import { Calendar } from 'lucide-react';

interface TimelineEvent {
  _key: string;
  name: string;
  startYear: number;
  endYear?: number | null;
}

interface HistoryTimelineProps {
  events: TimelineEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event._key} className="flex gap-6 group">
          {/* Timeline dot and line */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-800 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            {index !== events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-2" />
            )}
          </div>
          
          {/* Content */}
          <div className="pb-8 flex-1">
            <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-gray-800 font-semibold mb-2">
                {event.startYear} {event.endYear ? `— ${event.endYear}` : '— dabartis'}
              </div>
              <h3 className="text-gray-900 font-bold text-lg">{event.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
