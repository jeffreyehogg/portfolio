export type PrayerStatus = "Pending" | "Praying" | "Answered";

export interface PersonalPrayer {
  id: number;
  userId: string;
  title: string;
  status: PrayerStatus;
  category: string | null;
  sortOrder: number | null;
  createdAt: Date | null;
}

export interface PrayerNote {
  id: number;
  prayerId: number | null;
  userId: string;
  content: string;
  createdAt: Date | null;
}
