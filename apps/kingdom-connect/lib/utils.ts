import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGoogleCalendarUrl(event: {
  title: string;
  description: string;
  location: string;
  date: Date;
}) {
  const startTime = new Date(event.date);
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000); // Assume 3 hours duration

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}