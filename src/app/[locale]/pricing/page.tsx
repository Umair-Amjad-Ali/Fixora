"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tag, 
  Info, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { 
  SERVICE_CATEGORIES, 
  AC_TYPE_ISSUES_MAP, 
  CATEGORY_ISSUES_MAP,
  AC_TYPES,
  IssueOption
} from "@/lib/constants";
import { ServiceType, ACType } from "@/types";
import * as LucideIcons from "lucide-react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { useTranslations, useLocale } from "next-intl";

export default function PricingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { bookingData } = useBooking();
  const [activeCategory, setActiveCategory] = useState<ServiceType>("ac");
  const [activeACType, setActiveACType] = useState<ACType>("split_ac");
  const [region, setRegion] = useState<"KSA" | "UAE">(bookingData.location.country === "KSA" ? "KSA" : "UAE");

  const currency = region === "KSA" ? "SAR" : "AED";

  const getIssues = (): IssueOption[] => {
    if (activeCategory === "ac") {
      return AC_TYPE_ISSUES_MAP[activeACType] || [];
    }
    return CATEGORY_ISSUES_MAP[activeCategory] || [];
  };

  const issues = getIssues();
  const filteredIssues = issues;

  // Helper to get localized issue data
  const getLocalizedIssue = (issue: IssueOption) => {
    const baseKey = activeCategory === "ac" 
      ? `constants.issues.ac.${activeACType}.${issue.slug}`
      : `constants.issues.${activeCategory}.${issue.slug}`;
    
    return {
      label: t(`${baseKey}.label`),
      description: t(`${baseKey}.description`)
    };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Tag size={16} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  {t('pricingPage.badge')}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-2">
                {t('pricingPage.title')} <span className="text-primary">{t('pricingPage.titleHighlight')}</span>
              </h1>
              <p className="text-zinc-500 font-medium text-xs max-w-xl">
                {t('pricingPage.subtitle')}
              </p>
            </div>

            {/* Region Switcher */}
            <div className="flex p-1 bg-zinc-100 dark:bg-slate-900 rounded-xl border border-zinc-200 dark:border-slate-800 w-fit">
              <button 
                onClick={() => setRegion("UAE")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all
                  ${region === "UAE" ? "bg-white dark:bg-slate-950 text-secondary shadow-sm" : "text-zinc-400 hover:text-zinc-600"}
                `}
              >
                <span>🇦🇪</span> {t('pricingPage.regionUAE')}
              </button>
              <button 
                onClick={() => setRegion("KSA")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all
                  ${region === "KSA" ? "bg-white dark:bg-slate-950 text-secondary shadow-sm" : "text-zinc-400 hover:text-zinc-600"}
                `}
              >
                <span>🇸🇦</span> {t('pricingPage.regionKSA')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Category Navigator */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28 space-y-1">
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Wrench;
                const isActive = activeCategory === cat.slug;
                return (
                  <motion.button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all group
                      ${isActive 
                        ? "bg-primary text-white shadow-md shadow-primary/10" 
                        : "bg-transparent text-zinc-500 hover:bg-zinc-50 dark:hover:bg-slate-900"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? "text-white" : "group-hover:text-primary transition-colors"} />
                      <span className="text-[11px] font-black uppercase tracking-tight">
                        {t(`constants.services.${cat.slug}.name`)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* Pricing Grid Area */}
          <main className="flex-1 min-w-0">
            {/* Context bar (Filters) */}
            <div className="bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span className="text-[11px] font-black uppercase tracking-widest text-foreground">
                     {t(`constants.services.${activeCategory}.name`)} 
                     {activeCategory === "ac" && ` / ${t(`constants.acTypes.${activeACType}.name`)}`}
                   </span>
                </div>

                {activeCategory === "ac" && (
                  <div className="flex gap-1 p-1 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-xl">
                    {AC_TYPES.map((type) => (
                      <button
                        key={type.slug}
                        onClick={() => setActiveACType(type.slug)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all
                        ${activeACType === type.slug 
                          ? "bg-primary text-white" 
                          : "text-zinc-400 hover:text-zinc-600"
                        }
                        `}
                      >
                        {t(`constants.acTypes.${type.slug}.name`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Cards Grid */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + activeACType}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => {
                    const localized = getLocalizedIssue(issue);
                    return (
                      <div 
                        key={issue.slug}
                        className="p-4 rounded-2xl border border-zinc-100 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-primary/30 transition-all group flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <div className="flex flex-col">
                            <h4 className="text-[12px] font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                              {localized.label}
                            </h4>
                            <p className="text-[10px] text-zinc-500 font-medium leading-tight line-clamp-2">
                              {localized.description}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {issue.price ? (
                              <div className="px-3 py-1.5 bg-zinc-50 dark:bg-slate-900 border border-zinc-100 dark:border-slate-800 rounded-lg text-sm font-black text-primary flex items-baseline gap-0.5">
                                <span className="text-[10px]">{currency}</span>
                                {issue.price}
                              </div>
                            ) : (
                              <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-lg text-[8px] font-black text-amber-600 uppercase">
                                {t('pricingPage.quoteLabel')}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-zinc-100 dark:border-slate-900 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                 <ShieldCheck size={10} className="text-primary" />
                                 {t('pricingPage.certifiedBadge')}
                              </div>
                              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                {t('pricingPage.warrantyBadge')}
                              </div>
                           </div>
                           <button 
                            onClick={() => router.push(`/${locale}/book-service/category`)}
                            className="w-6 h-6 rounded-md bg-zinc-50 dark:bg-slate-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                           >
                             <ArrowRight size={12} />
                           </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <h3 className="text-sm font-black text-foreground mb-1">{t('pricingPage.noServicesFound')}</h3>
                    <p className="text-[10px] text-zinc-500">{t('pricingPage.tryDifferentSearch')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Disclaimer Bar */}
            <div className="mt-8 p-4 bg-zinc-50 dark:bg-slate-900 rounded-2xl border border-zinc-200 dark:border-slate-800 flex items-start gap-3">
               <Info size={16} className="text-primary shrink-0" />
               <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                 {t('pricingPage.disclaimer')}
               </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
