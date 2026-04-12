"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { CATEGORY_ISSUES_MAP, AC_TYPE_ISSUES_MAP, SPLIT_AC_ISSUES } from "@/lib/constants";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, HelpCircle, Wrench, Droplet, Zap, Paintbrush, Loader2, Sparkles, LayoutGrid, Snowflake, HardHat } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function IssuePage() {
  const router = useRouter();
  const t = useTranslations();
  const { bookingData, updateService, setCurrentStep } = useBooking();
  
  const [selectedIssues, setSelectedIssues] = useState<string[]>(
    bookingData.service.issue?.selectedIssues || []
  );
  const [customBrief, setCustomBrief] = useState(bookingData.service.issue?.customDescription || "");

  const serviceType = bookingData.service.serviceType || "ac";
  const acType = bookingData.service.serviceSubType || "split_ac";
  
  // Use specialized AC issues if applicable, otherwise fallback to category map
  const issues = serviceType === "ac" 
    ? (AC_TYPE_ISSUES_MAP[acType as keyof typeof AC_TYPE_ISSUES_MAP] || SPLIT_AC_ISSUES)
    : (CATEGORY_ISSUES_MAP[serviceType as keyof typeof CATEGORY_ISSUES_MAP] || []);

  // Auto-sanitize state to remove stale or corrupted data from previous versions
  useEffect(() => {
    if (selectedIssues.length > 0) {
      const validSlugs = issues.map(i => i.slug);
      const sanitized = selectedIssues.filter(slug => validSlugs.includes(slug));
      if (sanitized.length !== selectedIssues.length) {
        setSelectedIssues(sanitized);
      }
    }
  }, [issues]); // Only run when valid issues change

  // Dynamic Content Mapping
  const contentMap = {
    ac: { icon: Snowflake, placeholder: "e.g., AC is making a clicking sound twice every hour..." },
    electrical: { icon: Zap, placeholder: "e.g., The main DB trips whenever I turn on the water heater..." },
    plumbing: { icon: Droplet, placeholder: "e.g., Water is leaking from the kitchen sink pipe..." },
    cleaning: { icon: Sparkles, placeholder: "e.g., Need deep cleaning for a 3-bedroom villa before moving in..." },
    painting: { icon: Paintbrush, placeholder: "e.g., Want to paint one wall in the living room Navy Blue..." },
    tile: { icon: LayoutGrid, placeholder: "e.g., Three tiles in the bathroom floor are cracked and loose..." },
    washing_machine: { icon: Wrench, placeholder: "e.g., Washing machine is vibrating heavily and not draining..." },
    refrigerator: { icon: Snowflake, placeholder: "e.g., Fridge is making a loud buzzing noise and not cooling..." },
    contractor: { icon: HardHat, placeholder: "e.g., Need a wall removed and plastering finished in the hall..." },
  };

  const currentContent = contentMap[serviceType as keyof typeof contentMap] || contentMap.ac;
  const CategoryIcon = currentContent.icon;

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  const toggleIssue = (slug: string) => {
    setSelectedIssues(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleNext = () => {
    const selectedOptions = issues.filter(i => selectedIssues.includes(i.slug));
    const selectedLabels = selectedOptions.map(i => i.label);
    
    // Calculate total price if prices exist
    const totalPrice = selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0);
    
    updateService({ 
      estimatedPrice: totalPrice > 0 ? totalPrice : (bookingData.service.estimatedPrice || 0),
      issue: { 
        ...bookingData.service.issue,
        selectedIssues: selectedIssues,
        type: acType || serviceType, 
        label: selectedLabels.length > 0 ? selectedLabels.join(", ") : "Custom",
        customDescription: customBrief
      } 
    });
    router.push("/book-service/user-details");
  };

  const currency = bookingData.service.currency || "SAR";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-start">
        <h2 className="text-2xl font-black mb-1.5 flex items-center gap-3 text-foreground">
          <AlertTriangle size={22} className="text-primary" />
          {t('issuePage.title')}
        </h2>
        <p className="text-sm text-zinc-500 font-medium whitespace-pre-wrap">
          {serviceType === "ac" && acType ? t('issuePage.showingOptions', { name: t(`constants.acTypes.${acType}.name`) }) : t('issuePage.subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Predefined Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {issues.map((issue, i) => {
            const isSelected = selectedIssues.includes(issue.slug);
            return (
              <motion.button
                key={issue.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggleIssue(issue.slug)}
                className={`group flex items-center p-4.5 rounded-2xl border transition-all duration-300 relative text-start
                  ${isSelected 
                    ? "bg-primary/5 border-primary shadow-xl shadow-primary/5" 
                    : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/50"
                  }
                `}
              >
                 <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 transition-all
                    ${isSelected ? "bg-primary text-white" : "bg-zinc-100 dark:bg-slate-800 text-zinc-400 group-hover:text-primary"}
                 `}>
                    <CategoryIcon size={20} />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className={`font-black uppercase tracking-tight text-[12px] sm:text-[13px] leading-tight flex-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {t(`constants.issues.${serviceType === "ac" ? `ac.${acType}` : serviceType}.${issue.slug}.label`)}
                      </h3>
                      {issue.price ? (
                        <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-[10px] font-black transition-all shadow-sm
                          ${isSelected 
                            ? "bg-primary text-white border-white/20 shadow-primary/20" 
                            : "bg-zinc-100/80 dark:bg-slate-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-slate-700"
                          }
                        `}>
                           {issue.price} <span className="opacity-70">{currency}</span>
                        </div>
                      ) : (
                        <div className={`shrink-0 px-2.5 py-1 rounded-lg border border-dashed text-[9px] font-black transition-all
                          ${isSelected 
                            ? "bg-white/10 text-white border-white/30" 
                            : "bg-zinc-50 dark:bg-slate-900 text-zinc-400 border-zinc-200 dark:border-slate-800"
                          }
                        `}>
                           {t('issuePage.quoteOnSite')}
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium line-clamp-1 opacity-80">{t(`constants.issues.${serviceType === "ac" ? `ac.${acType}` : serviceType}.${issue.slug}.description`)}</p>
                 </div>

                 <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 rtl:ml-0 rtl:mr-3 transition-all
                    ${isSelected ? "bg-primary border-primary text-white" : "border-zinc-200 dark:border-slate-800"}
                 `}>
                    {isSelected && <CheckCircle2 size={12} strokeWidth={4} />}
                 </div>
              </motion.button>
            );
          })}
        </div>

        {/* Custom Input Section */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400">
              <MessageCircle size={14} className="text-primary" />
              {t('issuePage.additionalDetails')}
           </div>
           <div className="relative group p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-slate-800">
              <textarea 
                className="w-full min-h-[100px] bg-transparent border-none outline-none font-medium text-base placeholder:text-zinc-300 resize-none"
                placeholder={t(`issuePage.placeholders.${serviceType}`)}
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
              />
              <div className="absolute bottom-5 right-6 text-zinc-300">
                 <HelpCircle size={20} />
              </div>
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
            disabled={selectedIssues.length === 0 && !customBrief}
            onClick={handleNext}
            className="w-full md:w-64 h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-2"
          >
            {t('issuePage.goToDetails')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
