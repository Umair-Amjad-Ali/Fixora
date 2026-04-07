"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, Scale, Globe } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Fixora platform, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions of this agreement, you should not access the website or use any of our services."
    },
    {
      title: "2. Service Scope",
      content: "Fixora provides a platform connecting users with certified home service professionals. While we vet all technicians, the final agreement for work performed is between the user and the professional, backed by our Quality Guarantee."
    },
    {
      title: "3. User Responsibilities",
      content: "Users must provide accurate location and contact information. You are responsible for ensuring that the technician has safe access to the premises at the scheduled time."
    },
    {
      title: "4. Pricing & Payments",
      content: "Final pricing is determined on-site based on the actual scope of work. Payments are made directly to the technician or via the platform as specified during booking. Fixora reserves the right to charge a cancellation fee for appointments cancelled less than 2 hours before the slot."
    },
    {
      title: "5. Region Specifics",
      content: "This agreement is governed by the laws of the United Arab Emirates and the Kingdom of Saudi Arabia, depending on the service location."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-zinc-100 dark:border-slate-800 pb-12"
        >
          <div className="flex items-center gap-3 text-primary mb-4 font-black uppercase tracking-[0.2em] text-[10px]">
             <FileText size={16} />
             Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Terms of Service</h1>
          <p className="text-zinc-500 font-medium italic">Last updated: April 07, 2026</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="text-xl font-black mb-4 text-foreground">{section.title}</h2>
              <p className="text-zinc-500 font-medium leading-relaxed">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-20 p-8 bg-zinc-50 dark:bg-slate-900 rounded-4xl flex flex-col md:flex-row gap-6 items-center border border-zinc-100 dark:border-slate-800">
           <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
              <Scale size={24} />
           </div>
           <div>
              <p className="text-sm font-bold text-foreground">Need clarification?</p>
              <p className="text-xs text-zinc-500 font-medium">If you have any questions regarding these terms, please contact our legal department at <span className="text-primary font-black">legal@fixora.com</span></p>
           </div>
        </div>
      </div>
    </div>
  );
}
