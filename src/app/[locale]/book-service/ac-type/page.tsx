"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { AC_TYPES, AC_TYPE_ISSUES_MAP, SPLIT_AC_ISSUES } from "@/lib/constants";
import { Snowflake, ArrowLeft, ArrowRight, CheckCircle2, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ACTypePage() {
  const t = useTranslations();
  const router = useRouter();
  const { bookingData, updateService, setCurrentStep } = useBooking();
  
  const [selectedAC, setSelectedAC] = useState<string>(bookingData.service.issue?.type || "");

  useEffect(() => {
    setCurrentStep(3);
    // If not AC, skip this step
    if (bookingData.service.serviceType !== "ac") {
      router.replace("/book-service/issue");
    }
  }, [setCurrentStep, bookingData.service.serviceType, router]);

  const handleNext = () => {
    if (selectedAC) {
      updateService({ 
        serviceSubType: selectedAC as any,
        issue: { ...bookingData.service.issue, type: selectedAC as any, label: selectedAC } 
      });
      router.push("/book-service/issue");
    }
  };

  const currency = bookingData.service.currency || "SAR";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-start">
        <h2 className="text-2xl font-black mb-1.5 flex items-center gap-3">
          <Snowflake size={22} className="text-primary" />
          {t('acTypePage.title')}
        </h2>
        <p className="text-sm text-zinc-500 font-medium">{t('acTypePage.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AC_TYPES.map((unit, i) => {
            const isSelected = selectedAC === unit.slug;
            
            // Get starting price for this unit type
            const unitIssues = AC_TYPE_ISSUES_MAP[unit.slug as keyof typeof AC_TYPE_ISSUES_MAP] || SPLIT_AC_ISSUES;
            const minPrice = Math.min(...unitIssues.filter(u => u.price).map(u => u.price || 0));

            return (
              <motion.button
                key={unit.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedAC(unit.slug)}
                className={`group flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-300 relative
                  ${isSelected 
                    ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]" 
                    : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/50"
                  }
                `}
              >
                {/* Visual Circle */}
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl mb-4 transition-all
                   ${isSelected ? "bg-white/20 border-white" : "bg-zinc-50 dark:bg-slate-800 border-zinc-200 dark:border-slate-700 group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary"}
                `}>
                   {unit.slug === "window_ac" ? "🔲" : unit.slug === "split_ac" ? "🧊" : "⭕"}
                </div>

                <h3 className={`text-lg font-black mb-1 ${isSelected ? "text-white" : "text-foreground group-hover:text-primary"} transition-colors`}>
                  {t(`constants.acTypes.${unit.slug}.name`)}
                </h3>
                
                <div className="flex flex-col items-center gap-1.5">
                   <p className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white/70" : "text-zinc-400 group-hover:text-primary/70"} transition-colors`}>
                     {t(`constants.acTypes.${unit.slug}.description`)}
                   </p>
                   {minPrice !== Infinity && (
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary border border-primary/20"}`}>
                        {t('serviceTypePage.startingFrom')} {minPrice} {currency}
                      </span>
                   )}
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
                     <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="bg-primary/5 border border-primary/20 p-4.5 rounded-2xl flex items-center gap-4">
           <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <MoreHorizontal size={20} />
           </div>
           <div>
              <p className="text-xs font-black text-foreground">{t('acTypePage.tipTitle')}</p>
              <p className="text-[13px] font-medium text-zinc-500">{t('acTypePage.tipDesc')}</p>
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
            {t('common.back')}
          </Button>
          
          <Button 
            size="lg" 
            disabled={!selectedAC}
            onClick={handleNext}
            className="w-full md:w-64 h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-2"
          >
            {t('acTypePage.describeProblems')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
