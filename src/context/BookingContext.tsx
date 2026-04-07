"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { BookingData } from "@/types";
import { DEFAULT_BOOKING_DATA } from "@/lib/constants";

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  updateUser: (data: Partial<BookingData["user"]>) => void;
  updateLocation: (data: Partial<BookingData["location"]>) => void;
  updateSchedule: (data: Partial<BookingData["schedule"]>) => void;
  updateService: (data: Partial<BookingData["service"]>) => void;
  setCurrentStep: (step: number) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = "fixora_booking_data";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(DEFAULT_BOOKING_DATA as BookingData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setBookingData(JSON.parse(saved));
      }
    } catch {
      // sessionStorage not available
    }
    setIsHydrated(true);
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
      } catch {
        // sessionStorage not available
      }
    }
  }, [bookingData, isHydrated]);

  const updateBookingData = useCallback((data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateUser = useCallback((data: Partial<BookingData["user"]>) => {
    setBookingData((prev) => ({ ...prev, user: { ...prev.user, ...data } }));
  }, []);

  const updateLocation = useCallback((data: Partial<BookingData["location"]>) => {
    setBookingData((prev) => ({ ...prev, location: { ...prev.location, ...data } }));
  }, []);

  const updateSchedule = useCallback((data: Partial<BookingData["schedule"]>) => {
    setBookingData((prev) => ({ ...prev, schedule: { ...prev.schedule, ...data } }));
  }, []);

  const updateService = useCallback((data: Partial<BookingData["service"]>) => {
    setBookingData((prev) => ({ ...prev, service: { ...prev.service, ...data } }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setBookingData((prev) => {
      // Skip update if the step is already the same
      if (prev.currentStep === step) return prev;
      return { ...prev, currentStep: step };
    });
  }, []);

  const resetBooking = useCallback(() => {
    setBookingData(DEFAULT_BOOKING_DATA as BookingData);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        updateUser,
        updateLocation,
        updateSchedule,
        updateService,
        setCurrentStep,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
