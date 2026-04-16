"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, DollarSign, Clock, Smartphone, Wrench, Star, CheckCircle2, Navigation, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function FeaturesShowcase() {
  const t = useTranslations("featuresShowcase");

  return (
    <section className="bg-background relative overflow-hidden section-padding">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/4 translate-x-1/4" />

      <div className="container-tight relative z-10">
        <div className="text-start max-w-6xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 justify-start mb-6"
          >
            <span className="h-px w-12 bg-primary/30" />
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{t("sectionLabel")}</span>
            <span className="h-px w-12 bg-primary/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground"
          >
            {t("titleLine1")} <br className="hidden md:block" />
            <span className="text-zinc-400">{t("titleLine2")}</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Card 1: Workmanship */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group h-auto md:h-[340px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative z-10 flex flex-col h-full max-w-sm">
               <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                 <Wrench size={24} />
               </div>
               <h3 className="text-2xl font-black text-foreground mb-3">{t("premiumWorkmanshipTitle")}</h3>
               <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{t("premiumWorkmanshipDesc")}</p>
               
               <div className="mt-8 md:mt-auto inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg w-fit">
                 <Star size={14} className="fill-current" />
                 {t("qualityGuaranteed")}
               </div>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute -right-10 rtl:right-auto rtl:-left-10 bottom-0 w-2/3 h-4/5 bg-white dark:bg-slate-950 border border-border shadow-2xl rounded-tl-2xl rtl:rounded-tl-none rtl:rounded-tr-2xl p-8 hidden lg:block transform group-hover:-translate-x-2 rtl:group-hover:translate-x-2 transition-transform duration-500">
               <div className="w-full h-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-slate-800 flex items-center justify-center">
                      <ShieldCheck className="text-emerald-500" size={24} />
                    </div>
                    <div className="flex-1 space-y-2 text-left">
                      <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                      <div className="h-2 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-2">
                       <Wrench size={20} className="text-zinc-400" />
                       <div className="h-1.5 w-12 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                    <div className="h-20 rounded-xl border border-dashed border-border flex flex-col items-center justify-center gap-2">
                       <Star size={20} className="text-zinc-400" />
                       <div className="h-1.5 w-12 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary" 
                    />
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: 1-Month Warranty */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-7 overflow-hidden relative group h-[320px] flex flex-col"
          >
             <div className="relative z-10 flex flex-col h-full">
               <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/10">
                 <ShieldCheck size={18} />
               </div>
               
               <h3 className="text-lg font-black text-foreground mb-2 tracking-tight">{t("warrantyTitle")}</h3>
               <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 leading-normal max-w-[200px]">
                 {t("warrantyDesc")}
               </p>
               
               <div className="mt-auto flex flex-col gap-2 pb-1">
                  <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 w-fit px-4 py-1.5 rounded-full">
                    <CheckCircle2 size={11} className="shrink-0" />
                    {t("fullProtection")}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest px-4 py-1">
                    <DollarSign size={10} className="shrink-0" />
                    {t("zeroFees")}
                  </div>
               </div>
             </div>
          </motion.div>

          {/* Card 3: Dynamic Scheduling */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col relative overflow-hidden group h-[320px]"
          >
             <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 border border-primary/10">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{t("schedulingTitle")}</h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">{t("schedulingDesc")}</p>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {t("sameDay")}
                  </div>
                </div>
              </div>
           </motion.div>

          {/* Card 4: Verified Network */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative group"
          >
             <div className="flex-1">
               <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-6">
                 <ShieldCheck size={24} />
               </div>
               <h3 className="text-2xl font-black text-foreground mb-3">{t("verifiedNetworkTitle")}</h3>
               <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{t("verifiedNetworkDesc")}</p>
             </div>
             
             <div className="w-full hidden sm:flex md:w-auto shrink-0 items-center justify-center gap-4 bg-white dark:bg-slate-950 border border-border p-6 rounded-2xl shadow-xl">
                <div className="text-center px-4 border-r border-zinc-200 dark:border-slate-800">
                  <span className="block text-2xl font-black text-foreground">{t("verifiedValue")}</span>
                  <span className="block text-[10px] uppercase font-black tracking-widest text-zinc-500">{t("verifiedLabel")}</span>
                </div>
                <div className="text-center px-4">
                  <span className="block text-2xl font-black text-emerald-500">{t("insuredValue")}</span>
                  <span className="block text-[10px] uppercase font-black tracking-widest text-zinc-500">{t("insuredLabel")}</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}