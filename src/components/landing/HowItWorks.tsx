"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, CalendarClock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

interface StepProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  index: number;
  details: string[];
}

const Step = ({ step, title, description, icon, gradient, index, details }: StepProps) => {
  const t = useTranslations("howItWorks");
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-32 last:mb-0`}
    >
      {/* Visual Content (Mockup/Graphic) */}
      <div className="flex-1 w-full relative">
        <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-10 blur-[100px] rounded-full`} />
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-4 shadow-2xl overflow-hidden group"
        >
          {/* Mockup Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-slate-800 pb-3 px-2 rtl:flex-row-reverse">
            <div className="w-3 h-3 rounded-full bg-red-400/50" />
            <div className="w-3 h-3 rounded-full bg-amber-400/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/50" />
            <div className="h-4 w-32 bg-zinc-100 dark:bg-slate-800 rounded-md mx-auto" />
          </div>

          {/* Dynamic Content based on step */}
          <div className="aspect-16/10 bg-zinc-50 dark:bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center">
            {index === 0 && (
              <div className={`w-full h-full p-6 flex flex-col gap-4 ${isRtl ? 'items-end' : 'items-start'}`}>
                 <div className={`h-8 w-1/2 bg-zinc-200 dark:bg-slate-800 rounded-lg animate-pulse`} />
                 <div className="w-full flex-1 border-2 border-dashed border-zinc-200 dark:border-slate-800 rounded-xl flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-primary opacity-50"
                    >
                      <MapPin size={48} />
                    </motion.div>
                 </div>
              </div>
            )}
            {index === 1 && (
              <div className="w-full h-full p-6 grid grid-cols-4 gap-2">
                 {[...Array(12)].map((_, i) => (
                   <div key={i} className={`h-12 rounded-lg ${i === 4 ? 'bg-primary/20 border-primary border-2' : 'bg-zinc-100 dark:bg-slate-800'}`} />
                 ))}
                 <div className="col-span-4 mt-2 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary">
                    {t("confirmSchedule")}
                 </div>
              </div>
            )}
            {index === 2 && (
              <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={40} />
                 </div>
                 <div className="h-4 w-32 bg-zinc-200 dark:bg-slate-800 rounded-md mb-2" />
                 <div className="h-3 w-48 bg-zinc-100 dark:bg-slate-800 rounded-md" />
              </div>
            )}

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className={`flex-1 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className={`text-5xl font-black text-transparent bg-clip-text bg-linear-to-br ${gradient} opacity-50`}>
            {step}
          </span>
          <div className={`h-px flex-1 bg-linear-to-r ${isEven ? 'from-transparent to-zinc-200 dark:to-slate-800' : 'from-zinc-200 dark:from-slate-800 to-transparent'} ${isRtl ? 'rotate-180' : ''}`} />
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h3>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          {description}
        </p>
        
        <ul className="space-y-3">
          {details.map((detail, i) => (
            <li key={i} className={`flex items-center gap-3 text-zinc-600 dark:text-zinc-300 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <CheckCircle2 size={18} className="text-primary shrink-0" />
              <span className="font-medium">{detail}</span>
            </li>
          ))}
        </ul>

        {index === 0 && (
          <div className="pt-4">
            <div className={`bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Navigation2 size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("gpsIntegration")}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("liveTracking")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      step: isRtl ? "٠١" : "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: <MapPin />,
      gradient: "from-blue-500 to-indigo-500",
      details: [t("step1Detail1"), t("step1Detail2"), t("step1Detail3")]
    },
    {
      step: isRtl ? "٠٢" : "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: <CalendarClock />,
      gradient: "from-purple-500 to-pink-500",
      details: [t("step2Detail1"), t("step2Detail2"), t("step2Detail3")]
    },
    {
      step: isRtl ? "٠٣" : "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: <ShieldCheck />,
      gradient: "from-emerald-500 to-teal-500",
      details: [t("step3Detail1"), t("step3Detail2"), t("step3Detail3")]
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden" ref={containerRef}>
      {/* Background Decor - Large Soft Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`max-w-2xl ${isRtl ? 'text-right' : 'text-left'}`}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]"
            >
              {t("sectionTitleMain")} <br/>
              <span className="text-zinc-400">{t("sectionTitleSub")}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`hidden md:block text-zinc-500 text-xl max-w-xs font-medium ${isRtl ? 'border-r-4 border-primary pr-8 pl-0 text-right' : 'border-l-4 border-primary pl-8 text-left'} py-4`}
          >
            {t("sectionDesc")}
          </motion.p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <Step key={i} index={i} {...step} />
          ))}
        </div>

        {/* Call to action footer of section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 md:mt-32 p-6 sm:p-10 md:p-12 bg-zinc-900 dark:bg-slate-900 rounded-4xl md:rounded-[3rem] relative overflow-hidden text-center group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 relative z-10">
            {t("ctaTitleLine1")} <br className="hidden sm:block"/> {t("ctaTitleLine2")}
          </h4>
          <Link href="/book-service/category">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest items-center gap-2 mx-auto shadow-2xl relative z-10 group/btn ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              {t("bookFirstBtn")}
              <ArrowRight className={`group-hover/btn:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Sub components used for mockup icons
const Navigation2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
);
