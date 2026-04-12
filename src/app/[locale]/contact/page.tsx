"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-black mb-4 tracking-tighter">{t('title')}</h1>
          <p className="text-zinc-500 font-medium text-lg">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Dubai Office */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-zinc-50 dark:bg-slate-900 rounded-[2.5rem] border border-zinc-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6">
               <span className="text-2xl">🇦🇪</span>
               <h2 className="text-2xl font-black">{t('uaeSupport')}</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('tollFree')}</p>
                    <p className="font-bold text-foreground">800-FIXORA (349672)</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('location')}</p>
                    <p className="font-bold text-foreground">{t('uaeLocation')}</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Riyadh Office */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-zinc-50 dark:bg-slate-900 rounded-[2.5rem] border border-zinc-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6">
               <span className="text-2xl">🇸🇦</span>
               <h2 className="text-2xl font-black">{t('ksaSupport')}</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('phone')}</p>
                    <p className="font-bold text-foreground">+966 9200 67868</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('location')}</p>
                    <p className="font-bold text-foreground">{t('ksaLocation')}</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
           {[
             { icon: Mail, title: t('emailsTitle'), detail: "support@dammamhomecarepro.com", label: t('emailReply') },
             { icon: Clock, title: t('hoursTitle'), detail: t('hours247'), label: t('emergencyUnits') },
           ].map((item, i) => (
             <div key={i} className="p-6 rounded-3xl border border-zinc-100 dark:border-slate-800">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                   <item.icon size={20} />
                </div>
                <h3 className="font-black text-foreground mb-1">{item.title}</h3>
                <p className="text-sm font-bold text-primary mb-1">{item.detail}</p>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{item.label}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

