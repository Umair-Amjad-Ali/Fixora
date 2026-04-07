"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, DollarSign, Clock, Smartphone, Wrench, Star } from "lucide-react";

export function FeaturesShowcase() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/4 translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 justify-center mb-6"
          >
            <span className="h-px w-12 bg-primary/30" />
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">The Fixora Standard</span>
            <span className="h-px w-12 bg-primary/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground"
          >
            Built for flawless execution. <br className="hidden md:block" />
            <span className="text-zinc-400">Zero guesswork involved.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Card 1: Workmanship */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group h-[340px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative z-10 flex flex-col h-full max-w-sm">
               <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                 <Wrench size={24} />
               </div>
               <h3 className="text-2xl font-black text-foreground mb-3">Premium Workmanship</h3>
               <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Our technicians are master craftsmen with years of hands-on experience. We don&apos;t just fix problems; we ensure they stay fixed with industry-leading precision and care.</p>
               
               <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg w-fit">
                 <Star size={14} className="fill-current" />
                 Quality Guaranteed
               </div>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute -right-10 bottom-0 w-2/3 h-4/5 bg-white dark:bg-slate-950 border border-border shadow-2xl rounded-tl-2xl p-8 hidden sm:block transform group-hover:-translate-x-2 transition-transform duration-500">
               <div className="w-full h-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-slate-800 flex items-center justify-center">
                      <ShieldCheck className="text-emerald-500" size={24} />
                    </div>
                    <div className="flex-1 space-y-2">
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

          {/* Card 2: Transparent Pricing */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group h-[340px]"
          >
             <div className="relative z-10 flex flex-col h-full">
               <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                 <DollarSign size={24} />
               </div>
               <h3 className="text-xl font-black text-foreground mb-3">On-Site Transparent Pricing</h3>
               <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Our technicians will inspect your issue upon arrival and provide you with an exact, no-obligation quote before starting any work.</p>
               
               <div className="mt-auto w-full bg-white dark:bg-slate-950 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <span className="block text-sm font-black text-foreground mb-1">Pay Direct to Technician</span>
                  <span className="text-xs text-zinc-500 font-medium tracking-wide">Cash or Card on completion</span>
               </div>
             </div>
          </motion.div>

          {/* Card 3: App Control */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-primary text-white border border-primary-foreground/20 rounded-3xl p-8 overflow-hidden relative group h-[340px]"
          >
             {/* Decorative circles */}
             <div className="absolute -top-24 -right-24 w-64 h-64 border-30 border-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-xl flex items-center justify-center mb-6">
                 <Smartphone size={24} />
               </div>
               <h3 className="text-2xl font-black mb-3">Total Command</h3>
               <p className="text-sm font-medium text-white/80">Manage bookings, track your technician, and view your complete service history entirely from your dashboard.</p>
               
               <div className="mt-auto">
                 <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl">
                   Open Dashboard
                 </button>
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
               <h3 className="text-2xl font-black text-foreground mb-3">Government Vetted Network</h3>
               <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Every single technician undergoes rigorous background checks. Only the top 2% of applicants make it to your front door.</p>
             </div>
             
             <div className="w-full hidden sm:flex md:w-auto shrink-0 items-center justify-center gap-4 bg-white dark:bg-slate-950 border border-border p-4 rounded-2xl shadow-xl">
                <div className="text-center px-4 border-r border-border">
                  <span className="block text-2xl font-black text-foreground">100%</span>
                  <span className="block text-[10px] uppercase font-black tracking-widest text-zinc-500">Verified</span>
                </div>
                <div className="text-center px-4">
                  <span className="block text-2xl font-black text-emerald-500">Insured</span>
                  <span className="block text-[10px] uppercase font-black tracking-widest text-zinc-500">Service Guarantee</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
