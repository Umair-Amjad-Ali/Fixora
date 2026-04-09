"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function CategoryPageContent() {
  const router = useRouter();
  const { setCurrentStep, updateService, bookingData } = useBooking();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleSelectCategory = (slug: any) => {
    const category = SERVICE_CATEGORIES.find(c => c.slug === slug);
    const currency = bookingData.location.country === "KSA" ? "SAR" : "AED";
    
    updateService({ 
      serviceType: slug, 
      serviceSubType: "" as any,
      estimatedPrice: category?.startingPrice || 0,
      currency: currency
    });
    router.push(`/book-service/service-type?service=${slug}`);
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary mb-4"
        >
          <Sparkles size={12} />
          Step 01: Service Category
        </motion.div>
        <h2 className="text-3xl font-black mb-2 text-foreground tracking-tight">How can we help?</h2>
        <p className="text-zinc-500 font-medium text-sm">Select a specialized service category to begin.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-3"
      >
        {SERVICE_CATEGORIES.map((category) => (
          <motion.button
            key={category.slug}
            variants={itemVariants}
            onClick={() => handleSelectCategory(category.slug)}
            className="group relative flex flex-col items-center p-6 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all active:scale-[0.98] text-center"
          >
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-slate-900 border border-zinc-100 dark:border-slate-800 flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
               {(() => {
                 const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Wrench;
                 return <Icon size={28} className="transition-transform duration-300 group-hover:scale-110" />;
               })()}
            </div>

            <h3 className="relative z-10 text-[15px] font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
              {category.name}
            </h3>
            <p className="relative z-10 text-[10px] font-bold text-zinc-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
              View Specific Services
            </p>
            
            <div className="absolute bottom-5 right-5 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               <ChevronRight size={16} className="text-primary" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export default function CategoryPage() {
  return <CategoryPageContent />;
}
