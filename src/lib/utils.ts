import { format, addDays, isFriday } from "date-fns";

import type { Country } from "@/types";

export function generateOrderNumber(sequentialId: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequentialId).padStart(4, "0");
  return `ORD-${year}-${padded}`;
}

export function formatPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("971") && cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.startsWith("966") && cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
}



export function getMinBookingDate(): Date {
  return addDays(new Date(), 1);
}

export function getMaxBookingDate(): Date {
  return addDays(new Date(), 30);
}
export function isLimitedAvailability(date: Date): boolean {
  return isFriday(date);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return format(new Date(dateStr), "MMMM d, yyyy");
}

export function getCurrency(country: Country): string {
  return country === "UAE" ? "AED" : "SAR";
}
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
