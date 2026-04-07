"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
            We are the <span className="text-primary italic">Fixers.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
            Fixora was born out of a simple frustration: finding reliable, skilled technicians shouldn't be a gamble. We built a bridge between high-end technology and manual craftsmanship.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-zinc-50 dark:bg-slate-900 rounded-[2.5rem] border border-zinc-200 dark:border-slate-800"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-black mb-4">Our Vision</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              To redefine the home services industry in the Middle East by making excellence the baseline, not the exception.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-zinc-50 dark:bg-slate-900 rounded-[2.5rem] border border-zinc-200 dark:border-slate-800"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-black mb-4">Our Promise</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Every job is backed by the Fixora Quality Guarantee. If it's not fixed right, we'll make it right. No questions asked.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-black mb-10 tracking-tight">What sets us apart</h2>
          <div className="space-y-6">
             {[
               { icon: Heart, title: "People First", desc: "Our technicians are not just workers; they are certified experts who care about your comfort." },
               { icon: Award, title: "Unmatched Quality", desc: "We use only the best tools and materials to ensure longevity of every repair." },
               { icon: Zap, title: "Tech-Driven", desc: "From geolocation arrival tracking to instant online booking, we use tech to save your time." },
             ].map((value, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 + i * 0.1 }}
                 className="flex items-start gap-6 p-6 hover:bg-zinc-50 dark:hover:bg-slate-950 transition-colors rounded-3xl"
               >
                 <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-primary">
                    <value.icon size={20} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black mb-1">{value.title}</h3>
                    <p className="text-zinc-500 font-medium">{value.desc}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-primary text-white p-12 rounded-[3.5rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Ready to experience the future of home services?</h2>
          <Link 
            href="/book-service/category"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-black text-lg hover:-translate-y-1 transition-all shadow-xl shadow-black/20"
          >
            Book Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
