"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        
        return (
          <div 
            key={i} 
            className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
              isOpen 
                ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5" 
                : "border-zinc-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-zinc-300 dark:hover:border-slate-700"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left rtl:text-right transition-colors"
            >
              <h3 className={`text-lg font-black pr-8 ${isOpen ? "text-primary" : "text-foreground"}`}>
                {faq.question}
              </h3>
              <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isOpen ? "bg-primary text-white" : "bg-zinc-100 dark:bg-slate-800 text-zinc-400"
              }`}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 md:px-8 pb-8 pt-0">
                    <div className="h-px w-full bg-zinc-200 dark:bg-slate-800 mb-6" />
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
