"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES, SUB_SERVICES_MAP, SubService } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { Hammer, Sparkles, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Info, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { getCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";

function ServiceTypeContent() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookingData, updateService, setCurrentStep } = useBooking();
  
  const initialCategory = searchParams.get("service") || bookingData.service.serviceType;
  const [selectedSub, setSelectedSub] = useState<string>(bookingData.service.serviceSubType || "");

  useEffect(() => {
    setCurrentStep(2);
    if (!initialCategory) {
      router.replace("/book-service/category");
      return;
    }
    
    // Sync serviceType from URL to state if they don't match
    if (bookingData.service.serviceType !== initialCategory) {
       updateService({ serviceType: initialCategory as any });
    }
  }, [setCurrentStep, initialCategory, bookingData.service.serviceType, updateService, router]);

  const currentCategory = SERVICE_CATEGORIES.find(c => c.slug === initialCategory) || SERVICE_CATEGORIES[0];
  const subs = SUB_SERVICES_MAP[initialCategory] || [];

  const handleNext = () => {
    if (selectedSub) {
      const sub = subs.find(s => s.id === selectedSub);
      const currency = bookingData.location.country === "KSA" ? "SAR" : "AED";

      updateService({ 
        serviceSubType: selectedSub as any,
        estimatedPrice: (sub as any)?.startingPrice || 0,
        currency: currency
      });
      
      // Conditional logic: If AC, go to AC-Type. Else go to Issues.
      if (initialCategory === "ac") {
        router.push("/book-service/ac-type");
      } else {
        router.push("/book-service/issue");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-start">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
               {(() => {
                 const Icon = (LucideIcons as any)[currentCategory.icon] || LucideIcons.Wrench;
                 return <Icon size={22} />;
               })()}
            </div>
            <h2 className="text-2xl font-black">{t(`constants.services.${currentCategory.slug}.name`)}</h2>
        </div>
        <p className="text-sm text-zinc-500 font-medium">{t('serviceTypePage.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {subs.map((sub, i) => {
            const isSelected = selectedSub === sub.id;
            return (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedSub(sub.id)}
                className={`group flex flex-col md:flex-row md:items-center text-start p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden
                  ${isSelected 
                    ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-[1.01]" 
                    : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/40"
                  }
                `}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2 transition-opacity ${isSelected ? "opacity-30" : "opacity-0 group-hover:opacity-10"}`} />

                <div className="flex-1 pr-4 rtl:pr-0 rtl:pl-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className={`text-lg font-black ${isSelected ? "text-white" : "text-foreground group-hover:text-primary transition-colors"}`}>
                      {t(`constants.subServices.${sub.id}.name`)}
                    </h3>
                    {isSelected && (
                       <div className="bg-white/20 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">{t('common.selected')}</div>
                    )}
                  </div>
                  <p className={`text-[13px] mb-3 leading-relaxed ${isSelected ? "text-white/80" : "text-zinc-500 font-medium"}`}>
                    {t(`constants.subServices.${sub.id}.description`)}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                     {((t.raw(`constants.subServices.${sub.id}.features`) as string[]) || sub.features).map((feat, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-[11px] font-bold whitespace-nowrap">
                          <CheckCircle2 size={11} className={isSelected ? "text-white" : "text-primary"} />
                          <span className={isSelected ? "text-white/90" : "text-zinc-400"}>{feat}</span>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="mt-5 md:mt-0 md:ml-6 rtl:md:ml-0 rtl:md:mr-6 flex flex-col items-end gap-3 justify-center min-w-[140px]">
                   {(sub as any).startingPrice && (
                     <div className={`px-3 py-1.5 rounded-xl border flex flex-col items-end transition-colors
                        ${isSelected ? "bg-white/10 border-white/20" : "bg-zinc-50 border-zinc-100 dark:bg-slate-800 dark:border-slate-700"}
                     `}>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${isSelected ? "text-white/60" : "text-zinc-400"}`}>{t('serviceTypePage.startingFrom')}</span>
                        <span className={`text-sm font-black ${isSelected ? "text-white" : "text-primary"}`}>
                          {getCurrency(bookingData.location.country || "UAE")} {(sub as any).startingPrice}
                        </span>
                     </div>
                   )}
                   <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                      ${isSelected ? "bg-white text-primary" : "bg-zinc-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white"}
                   `}>
                      <ChevronRight size={18} className={`rtl:rotate-180 ${isSelected ? "" : "group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform"}`} />
                   </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Empty state if category not implemented yet in mock */}
        {subs.length === 0 && (
           <div className="py-16 text-center border-2 border-dashed border-zinc-200 dark:border-slate-800 rounded-3xl">
              <Sparkles className="mx-auto mb-4 text-zinc-300" size={40} />
              <h4 className="text-lg font-bold mb-1">{t('serviceTypePage.almostReady')}</h4>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto font-medium">{t('serviceTypePage.comingSoon', { name: t(`constants.services.${currentCategory.slug}.name`) })}</p>
              <Button onClick={() => setSelectedSub("custom")} className="mt-6 rounded-full h-12">{t('serviceTypePage.customQuote')}</Button>
           </div>
        )}

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
            disabled={!selectedSub}
            onClick={handleNext}
            className="w-full md:w-64 h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-2"
          >
            {t('common.continue')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceTypePage() {
  const t = useTranslations();
  return (
    <Suspense fallback={<div>{t('serviceTypePage.loadingServices')}</div>}>
      <ServiceTypeContent />
    </Suspense>
  );
}
