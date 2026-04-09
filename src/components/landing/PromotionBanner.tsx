"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function PromotionBanner() {
  return (
    <section className="py-12 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[32px] bg-slate-950 border border-slate-800 p-8 md:p-10 shadow-2xl"
        >
          {/* Subtle Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/5"
              >
                <Sparkles size={12} className="text-amber-400" />
                Limited Offer
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight"
              >
                1-Month Service <br/>
                <span className="text-primary">Warranty Included.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-zinc-400 font-medium mb-6 max-w-md leading-relaxed"
              >
                We stand by our professional workmanship. If any issue arises within 30 days of completion, we&apos;ll fix it for free.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/book-service/category">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-6 rounded-xl font-black transition-all shadow-lg shadow-primary/20">
                    Book Now
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-white/5 p-6 rounded-3xl shadow-2xl relative w-full max-w-[320px]"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg rotate-12">
                   <ShieldCheck size={24} />
                </div>

                <h3 className="text-lg font-black text-white mb-4">Why Fixora?</h3>
                
                <ul className="space-y-3">
                  {[
                    "Zero Cost Follow-ups",
                    "Certified Expert Technicians",
                    "Premium Quality Parts",
                    "24/7 Priority Support"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex items-center gap-3 text-zinc-400 font-bold text-[11px] uppercase tracking-tighter"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <CheckCircle2 size={12} />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
