"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function CategoryPage() {
  const router = useRouter();
  const { setCurrentStep, updateService } = useBooking();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleSelectCategory = (slug: any) => {
    updateService({ serviceType: slug, serviceSubType: "" as any });
    router.push(`/book-service/service-type?service=${slug}`);
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-8 text-left">
        <h2 className="text-2xl font-black mb-1 text-foreground tracking-tight">Select Category</h2>
        <p className="text-zinc-500 font-medium text-sm">Choose a category to see available services.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
      >
        {SERVICE_CATEGORIES.map((category) => (
          <motion.button
            key={category.slug}
            variants={itemVariants}
            onClick={() => handleSelectCategory(category.slug)}
            className="group relative flex flex-col items-center justify-center p-5 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all active:scale-[0.98] text-center"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
            
            <div className="relative z-10 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 flex items-center justify-center text-2xl mb-3 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
               {category.icon}
            </div>

            <h3 className="relative z-10 text-sm font-black text-foreground group-hover:text-primary transition-colors leading-tight">{category.name}</h3>
            
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <ArrowRight size={14} className="text-primary" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
