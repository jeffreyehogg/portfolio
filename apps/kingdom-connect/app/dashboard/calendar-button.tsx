import { CalendarPlus } from "lucide-react";
import { createGoogleCalendarUrl } from "@/lib/utils";

interface CalendarButtonProps {
  event: {
    title: string;
    description: string;
    location: string;
    date: Date;
  };
}

export function CalendarButton({ event }: CalendarButtonProps) {
  const googleUrl = createGoogleCalendarUrl(event);

  return (
    <a
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-xl transition-colors shadow-2xs"
    >
      <CalendarPlus className="w-3.5 h-3.5 mr-1.5" />
      Sync to Google Calendar
    </a>
  );
}
