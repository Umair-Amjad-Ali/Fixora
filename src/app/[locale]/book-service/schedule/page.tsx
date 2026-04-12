"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { TIME_SLOTS } from "@/lib/constants";
import { format, addDays, isSameDay } from "date-fns";
import { enUS, arSA } from "date-fns/locale";
import { Calendar, Clock, ArrowLeft, ArrowRight, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function SchedulePage() {
  const router = useRouter();
  const t = useTranslations("schedulePage");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const dateLocale = locale === "ar" ? arSA : enUS;
  
  const { bookingData, updateSchedule, setCurrentStep } = useBooking();
  
  const [selectedDate, setSelectedDate] = useState<Date>(
    bookingData.schedule.preferredDate ? new Date(bookingData.schedule.preferredDate) : new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(bookingData.schedule.preferredTimeSlot || "");

  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  const handleNext = () => {
    if (selectedDate && selectedSlot) {
      const slotData = TIME_SLOTS.find(s => s.slug === selectedSlot);
      updateSchedule({
        preferredDate: selectedDate.toISOString(),
        preferredTimeSlot: selectedSlot as any,
        timeRange: slotData?.timeRange || "",
      });
      router.push("/book-service/review-submit");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-start">
        <h2 className="text-2xl font-black mb-1.5 flex items-center gap-3">
          <Calendar size={22} className="text-primary" />
          {t("title")}
        </h2>
        <p className="text-sm text-zinc-500 font-medium">{t("subtitle")}</p>
      </div>

      <div className="space-y-10">
        
        {/* Date Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">{t("selectDate")}</label>
            <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black bg-emerald-500/10 px-3 py-1 rounded-full">
              <Zap size={10} fill="currentColor" />
              {t("availableToday")}
            </div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
            {dates.map((date) => {
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 group
                    ${isSelected 
                      ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105" 
                      : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/50 text-zinc-600 dark:text-zinc-300"
                    }
                  `}
                >
                  <span className={`text-[9px] font-black uppercase tracking-tighter mb-0.5 ${isSelected ? "text-white/60" : "text-zinc-400"}`}>
                    {format(date, "EEE", { locale: dateLocale })}
                  </span>
                  <span className="text-lg font-black">{format(date, "d", { locale: dateLocale })}</span>
                  {isToday && (
                    <div className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-primary"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-5">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">{t("selectArrivalWindow")}</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot.slug;
              
              return (
                <button
                  key={slot.slug}
                  type="button"
                  onClick={() => setSelectedSlot(slot.slug)}
                  className={`relative flex items-center p-4.5 rounded-2xl border transition-all duration-300 text-start overflow-hidden group
                    ${isSelected 
                      ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                      : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/30"
                    }
                  `}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mr-4 rtl:mr-0 rtl:ml-4 transition-all
                    ${isSelected ? "bg-white/20" : "bg-zinc-100 dark:bg-slate-800 group-hover:bg-primary/10 group-hover:text-primary"}
                  `}>
                    {slot.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-black text-base leading-tight transition-colors">{t(`slots.${slot.slug}.label`)}</h4>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mt-0.5 ${isSelected ? "text-white/60" : "text-zinc-400"}`}>
                      {t(`slots.${slot.slug}.timeRange`)}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="slotGlow"
                      className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" 
                    />
                  )}
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 rtl:ml-0 rtl:mr-3 transition-all
                    ${isSelected ? "bg-white border-white text-primary" : "border-zinc-200 dark:border-slate-800"}
                  `}>
                    {isSelected && <ArrowRight size={12} strokeWidth={4} className="rtl:rotate-180" />}
                  </div>
                </button>
              );
            })}
          </div>
          
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="w-full md:w-auto h-12 px-6 rounded-xl font-black text-sm gap-2"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {tCommon("back")}
          </Button>
          
          <Button 
            size="lg" 
            disabled={!selectedDate || !selectedSlot}
            onClick={handleNext}
            className="w-full md:w-64 h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-2"
          >
            {t("reviewBooking")}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
