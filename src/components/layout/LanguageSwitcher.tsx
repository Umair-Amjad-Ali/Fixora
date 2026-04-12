"use client";

import React from "react";
import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-1.5 h-10 px-2 lg:px-4 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl hover:border-primary/40 transition-all group relative overflow-hidden"
      title={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe size={14} className="text-primary group-hover:rotate-12 transition-transform duration-500" />
      <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-tight lg:tracking-widest text-zinc-500 group-hover:text-primary transition-colors">
        {locale === "en" ? "AR" : "EN"}
      </span>
      
      {/* Indicator */}
      <motion.div 
        layoutId="active-lang"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
      />
    </button>
  );
}
