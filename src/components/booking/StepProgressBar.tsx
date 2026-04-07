"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BOOKING_STEPS } from "@/lib/constants";

export function StepProgressBar() {
  const { bookingData } = useBooking();
  const currentStepNum = bookingData.currentStep;

  // Filter out conditional steps (AC Type, Issue) if they don't apply
  const visibleSteps = BOOKING_STEPS.filter((step) => {
    if (!step.conditional) return true;
    if (step.number === 3) return bookingData.service.serviceType === "ac";
    if (step.number === 4) return bookingData.service.serviceSubType === "split_ac";
    return true;
  });

  return (
    <div className="w-full relative py-2 sm:py-4 px-0 sm:px-4 flex justify-center overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between w-full max-w-4xl relative min-w-0">
        {/* Connection Background Line */}
        <div className="absolute top-[16px] sm:top-[20px] left-[16px] sm:left-[20px] right-[16px] sm:right-[20px] h-[2px] bg-zinc-100 dark:bg-slate-800 z-0" />
        
        {visibleSteps.map((step) => {
          const isCompleted = currentStepNum > step.number;
          const isCurrent = currentStepNum === step.number;
          const isPending = currentStepNum < step.number;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10 group flex-1 min-w-0">
              <Link
                href={isCompleted || isCurrent ? step.path : "#"}
                passHref
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-500 shrink-0
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20"
                      : isCurrent
                      ? "bg-white dark:bg-slate-900 border-primary text-primary scale-110 sm:scale-125 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] sm:shadow-[0_0_0_8px_rgba(37,99,235,0.1)] ring-2 ring-primary/20"
                      : "bg-zinc-50 dark:bg-slate-950 border-zinc-200 dark:border-slate-800 text-zinc-400 pointer-events-none"
                  }
                `}
                onClick={(e) => {
                  if (isPending) e.preventDefault();
                }}
              >
                {isCompleted ? <Check size={14} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} /> : <span className="font-bold text-xs sm:text-sm tracking-tighter">{step.number}</span>}
              </Link>
              
              <span 
                className={`mt-2 sm:mt-4 text-[8px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em] transition-all duration-300 text-center leading-tight
                  ${isCurrent ? "text-primary opacity-100" : isCompleted ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 opacity-60"}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
