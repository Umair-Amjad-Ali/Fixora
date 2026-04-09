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
  isRegionModalOpen: boolean;
  setRegionModalOpen: (open: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = "fixora_booking_data";
const REGION_STORAGE_KEY = "fixora_selected_region";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(DEFAULT_BOOKING_DATA as BookingData);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      // 1. Load general booking data
      const saved = sessionStorage.getItem(STORAGE_KEY);
      let data = DEFAULT_BOOKING_DATA as BookingData;
      
      if (saved) {
        data = JSON.parse(saved);
      }

      // 2. Load and override country from persistent localStorage if exists
      const savedRegion = localStorage.getItem(REGION_STORAGE_KEY);
      if (savedRegion) {
        data = {
          ...data,
          location: {
            ...data.location,
            country: savedRegion as any
          }
        };
      }
      
      setBookingData(data);

      // Auto open modal if no region is saved
      if (!savedRegion) {
        setTimeout(() => setIsRegionModalOpen(true), 1000);
      }
    } catch {
      // Storage not available
    }
    setIsHydrated(true);
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
        
        // Also persist the region choice to localStorage
        if (bookingData.location.country) {
          localStorage.setItem(REGION_STORAGE_KEY, bookingData.location.country);
        }
      } catch {
        // Storage not available
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
    setBookingData((prev) => ({
      ...(DEFAULT_BOOKING_DATA as BookingData),
      location: {
        ...(DEFAULT_BOOKING_DATA as BookingData).location,
        country: prev.location.country // Preserve country even on reset
      }
    }));
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const setRegionModalOpen = useCallback((open: boolean) => {
    setIsRegionModalOpen(open);
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
        isRegionModalOpen,
        setRegionModalOpen,
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
