"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, Database } from "lucide-react";

import { PRIVACY_SECTIONS } from "@/lib/constants";

export default function PrivacyPage() {

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-zinc-100 dark:border-slate-800 pb-12"
        >
          <div className="flex items-center gap-3 text-primary mb-4 font-black uppercase tracking-[0.2em] text-[10px]">
             <ShieldCheck size={16} />
             Security
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium italic">Your privacy is our priority. Last updated: April 07, 2026</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {PRIVACY_SECTIONS.map((section, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <h2 className="text-xl font-black mb-3 text-foreground flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 {section.title}
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-zinc-950 rounded-[3rem] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-black mb-2">Data Protection Officer</h3>
                <p className="text-zinc-400 font-medium text-sm">Have specific privacy concerns? Reach our DPO directly.</p>
              </div>
              <a href="mailto:privacy@fixora.com" className="bg-white text-black px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap hover:bg-primary hover:text-white transition-all">
                 privacy@fixora.com
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}
