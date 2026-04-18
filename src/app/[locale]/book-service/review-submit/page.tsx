"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/services/bookingService";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES, AC_TYPES } from "@/lib/constants";
import { format } from "date-fns";
import { enUS, arSA } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";
import * as LucideIcons from "lucide-react";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  User, 
  CreditCard, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Info,
  Clock,
  Loader2,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const t = useTranslations("reviewSubmitPage");
  const tCommon = useTranslations("common");
  const tConstants = useTranslations("constants");
  const tSchedule = useTranslations("schedulePage");
  const locale = useLocale();
  const dateLocale = locale === "ar" ? arSA : enUS;

  const { bookingData, setCurrentStep, resetBooking } = useBooking();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentStep(8);
  }, [setCurrentStep]);

  const getSubTitleText = () => {
     let parts: string[] = [];
     
     // Robust translator that prevents raw keys from leaking to UI or crashing runtime
     const safeTranslate = (key: string, fallback: string = ""): string => {
        try {
           const result = tConstants(key);
           // next-intl returns the key itself as a fallback if missing. 
           // We check if the result is suspiciously similar to the path.
           const isMissing = !result || result === key || result.includes(key);
           return isMissing ? fallback : result;
        } catch (e) {
           return fallback;
        }
     };

     if (bookingData.service.serviceSubType) {
        const subtype = bookingData.service.serviceSubType;
        if (AC_TYPES.some(ac => ac.slug === subtype)) {
           parts.push(safeTranslate(`acTypes.${subtype}.name`, subtype.replace(/_/g, " ")));
        } else {
           parts.push(safeTranslate(`subServices.${subtype}.name`, subtype.replace(/_/g, " ")));
        }
     }
     
     if (bookingData.service.issue?.selectedIssues?.length) {
        bookingData.service.issue.selectedIssues.forEach(slug => {
           // Skip obviously malformed slugs from previous corrupted sessions
           if (!/^[a-z0-9_-]+$/.test(slug)) return;

           let label = "";
           if (bookingData.service.serviceType === "ac") {
              const acType = bookingData.service.serviceSubType || "split_ac";
              // Validate acType is clean before lookup
              if (/^[a-z0-9_-]+$/.test(acType)) {
                 label = safeTranslate(`issues.ac.${acType}.${slug}.label`);
              }
           } else {
              label = safeTranslate(`issues.${bookingData.service.serviceType}.${slug}.label`);
           }
           
           if (label) parts.push(label);
        });
        
        // Integrity check: if we have selected issues but couldn't translate any, use the label fallback
        const issuePartCount = parts.length - (bookingData.service.serviceSubType ? 1 : 0);
        if (issuePartCount <= 0 && bookingData.service.issue.label) {
           parts.push(bookingData.service.issue.label);
        }
     } else if (bookingData.service.issue?.label) {
        parts.push(bookingData.service.issue.label);
     }
     
     return parts.join(" • ");
  };

  // Pricing handled manually by technicians on-site

  const handleBooking = async () => {
    if (!user) {
      toast.error(t("authRequired"));
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = await createBooking({
        userId: user.uid,
        userEmail: user.email,
        bookingData,
      });

      toast.success(t("successTitle"), {
        description: t("successDesc"),
      });

      resetBooking();
      
      setTimeout(() => {
        router.replace("/");
      }, 100);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(t("errorTitle"), { description: error.message || t("errorDefault") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = SERVICE_CATEGORIES.find(c => c.slug === bookingData.service.serviceType);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-start">
        <h2 className="text-2xl font-black mb-1">{t("title")}</h2>
        <p className="text-sm text-zinc-500 font-medium tracking-tight">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Column: Data Summary */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Service & Issues */}
          <div className="bg-zinc-50 dark:bg-slate-950 p-5 rounded-3xl border border-zinc-200 dark:border-slate-800 relative overflow-hidden group">
             <div className="absolute -top-4 -right-4 text-primary/5 group-hover:scale-110 transition-transform duration-700">
                <Zap size={80} />
             </div>
             <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                <Sparkles size={10} className="text-primary" />
                {t("serviceBreakdown")}
             </h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                 <div>
                   <h4 className="text-lg font-black text-foreground flex items-center gap-2">
                     {(() => {
                        const Icon = selectedCategory?.icon ? (LucideIcons as any)[selectedCategory.icon] : null;
                        return Icon ? <Icon size={20} className="text-primary" /> : null;
                     })()}
                     {selectedCategory?.slug ? tConstants(`services.${selectedCategory.slug}.name`) : selectedCategory?.name}
                   </h4>
                   <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider mt-0.5">
                     {getSubTitleText()}
                   </p>
                 </div>
                {bookingData.service.issue?.customDescription && (
                  <div className="flex-1 max-w-xs sm:text-right rtl:sm:text-left">
                     <p className="text-[9px] font-bold text-zinc-400 uppercase mb-0.5">{t("notesLabel")}</p>
                     <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium italic line-clamp-1">
                        "{bookingData.service.issue.customDescription}"
                     </p>
                  </div>
                )}
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl text-start">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                  <User size={10} className="text-primary" />
                  {t("contactSection")}
               </h3>
               <div className="space-y-0.5">
                  <p className="text-[15px] font-black text-foreground">{bookingData.user.name}</p>
                  <p className="text-[11px] text-zinc-500 font-medium">{bookingData.user.email}</p>
                  <p className="text-[11px] font-bold text-primary mt-1">{bookingData.user.countryCode} {bookingData.user.phone}</p>
               </div>
            </div>

            {/* Schedule Details */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl text-start">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                  <Calendar size={10} className="text-secondary" />
                  {t("appointmentSection")}
               </h3>
               <div className="space-y-0.5">
                  <p className="text-[15px] font-black text-foreground">
                    {(() => {
                      const dateStr = bookingData.schedule.preferredDate;
                      if (!dateStr) return t("toBeConfirmed");
                      const date = new Date(dateStr);
                      return isNaN(date.getTime()) ? t("toBeConfirmed") : format(date, "MMMM dd, yyyy", { locale: dateLocale });
                    })()}
                  </p>
                  <div className="flex items-center gap-1.5 text-zinc-500 font-bold uppercase text-[9px] tracking-wider mt-1">
                     <Clock size={10} />
                     {bookingData.schedule.preferredTimeSlot ? tSchedule(`slots.${bookingData.schedule.preferredTimeSlot}.timeRange`) : bookingData.schedule.timeRange} {t("windowSuffix")}
                  </div>
               </div>
            </div>
          </div>

          {/* Location Summary */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl flex items-start gap-3.5 text-start">
             <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={18} />
             </div>
             <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">{t("addressSection")}</h3>
                <p className="text-[12px] font-black text-foreground leading-tight">
                  {bookingData.location.formattedAddress}{bookingData.location.buildingDetails ? `, ${bookingData.location.buildingDetails}` : ""}
                </p>
                <p className="text-zinc-500 font-normal text-[11px] mt-0.5">{bookingData.location.city}, {bookingData.location.country}</p>
             </div>
          </div>

          {/* Modify Selection Card */}
          <button 
            onClick={() => router.back()}
            className="group w-full p-4 bg-zinc-50 dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-3xl flex items-center justify-between hover:border-primary/50 transition-all active:scale-[0.99]"
          >
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                   <ArrowLeft size={14} className="rtl:rotate-180" />
                </div>
                <div className="text-start">
                   <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400">{t("changedMind")}</span>
                   <span className="block text-xs font-black text-foreground group-hover:text-primary transition-colors tracking-tight">{t("modifySelections")}</span>
                </div>
             </div>
             <ChevronRight size={14} className="text-zinc-300 group-hover:text-primary rtl:-translate-x-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all rtl:rotate-180" />
          </button>
        </div>

        {/* Right Column: Checkout Sidebar */}
        <div className="lg:col-span-1">
           <div className="sticky top-8 space-y-4">
              
              <div className="bg-zinc-50 dark:bg-slate-950 p-6 rounded-3xl border border-zinc-200 dark:border-slate-800 shadow-xl relative overflow-hidden group text-start">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-1.5">
                    <Info size={12} className="text-primary" />
                    {t("summaryTitle")}
                 </h3>

                 <div className="space-y-4 pb-6 mb-6 border-b border-zinc-200 dark:border-slate-800">
                    <div className="flex items-center justify-between px-1">
                       <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{t("estPrice")}</span>
                       <span className="text-[10px] font-black text-foreground">
                          {bookingData.service.estimatedPrice > 0 
                            ? `${bookingData.service.currency} ${bookingData.service.estimatedPrice}` 
                            : tCommon("notSpecified")}
                       </span>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                        <DollarSign size={12} />
                        {t("pricingPolicyTitle")}
                      </h4>
                      <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {t("pricingPolicyDesc")}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl mt-3">
                       <CreditCard size={14} className="text-emerald-500 shrink-0" />
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-tight">{t("paymentMethod")}</span>
                          <span className="text-[9px] text-zinc-400 font-bold leading-tight">{t("paymentDesc")}</span>
                       </div>
                    </div>
                 </div>

                 <Button 
                   onClick={handleBooking}
                   disabled={isSubmitting}
                   className="w-full h-12 bg-primary text-white hover:bg-primary/90 rounded-xl font-black text-sm shadow-lg shadow-primary/20 relative z-10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                 >
                   {isSubmitting ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("processing")}
                     </>
                   ) : (
                     <>
                       {t("confirmBtn")}
                       <CheckCircle2 size={16} className="rtl:rotate-180" />
                     </>
                   )}
                 </Button>

                 <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    {t("verifiedLabel")}
                 </div>
              </div>


           </div>
        </div>
      </div>
    </div>
  );
}
