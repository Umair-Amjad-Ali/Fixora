"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants, useMotionValue, useMotionTemplate } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Sparkles, Navigation } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { getCurrency } from "@/lib/utils";

// Mock premium data mapping
const premiumData: Record<string, { tag?: string }> = {
  ac: { tag: "Most Popular" },
  electrical: {},
  plumbing: { tag: "Emergency" },
  painting: {},
  tile: {},
  cleaning: { tag: "Trending" },
};

function BentoCard({ children, href, isWide }: { children: React.ReactNode, href: string, isWide: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={href} className="block h-full outline-none">
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4, scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group relative h-full flex overflow-hidden rounded-4xl border border-zinc-200/50 dark:border-white/10 bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-colors duration-500 hover:border-primary/30 ${
          isWide ? "flex-col sm:flex-row items-center p-6 md:p-8" : "flex-col py-5 px-6"
        }`}
      >
        {/* Dynamic Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.08), transparent 60%)`
          }}
        />

        {/* Glossy Top Edge Highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className={`relative z-10 w-full flex ${isWide ? 'flex-col sm:flex-row h-full gap-6' : 'flex-col h-full'}`}>
          {children}
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesGrid() {
  const { bookingData } = useBooking();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-[#020617] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-foreground">
              Solve any issue <br/>
              <span className="text-zinc-400">with zero friction.</span>
            </h2>
          </div>
        </motion.div>

        {/* BENTO GRID LAYOUT */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {SERVICE_CATEGORIES.map((service, index) => {
            const extraData = premiumData[service.slug as keyof typeof premiumData] || {};
            const isWide = index === 0 || index === 4 || index === 8;
            
            return (
              <motion.div 
                variants={cardVariants} 
                key={service.slug} 
                className={`${isWide ? 'lg:col-span-2' : 'col-span-1'} h-full`}
              >
                <BentoCard href={`/book-service/service-type?service=${service.slug}`} isWide={isWide}>
                  
                  {/* Card Icon Header */}
                  <div className={`flex ${isWide ? 'flex-col justify-between sm:w-1/4' : 'items-start justify-between'} mb-4`}>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-border/50 flex items-center justify-center group-hover:text-primary transition-all duration-500 shadow-sm relative z-10 overflow-hidden text-2xl group-hover:scale-105">
                        {(() => {
                          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Wrench;
                          return <IconComponent size={28} strokeWidth={1.5} className="z-10 group-hover:-rotate-6 transition-transform duration-500" />;
                        })()}
                      </div>
                      <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {!isWide && service.startingPrice && (
                      <div className="px-2 py-1 rounded-xl bg-zinc-100/10 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 
                        flex flex-col items-end backdrop-blur-sm group-hover:bg-primary/5 transition-colors">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-tighter mb-0.5 opacity-50">Starts</span>
                        <span className="text-[10px] font-black text-primary">{getCurrency(bookingData.location.country || "UAE")} {service.startingPrice}</span>
                      </div>
                    )}

                    {extraData.tag && !isWide && !service.startingPrice && (
                      <div className="bg-primary/5 dark:bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-primary/10 w-fit">
                        {extraData.tag}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content Body */}
                  <div className={`flex flex-col ${isWide ? 'sm:w-3/4 justify-center' : 'flex-1'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 ${isWide ? 'text-2xl' : 'text-lg'}`}>
                        {service.name}
                      </h3>
                      {extraData.tag && isWide && (
                        <div className="bg-primary/5 dark:bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-primary/10">
                          {extraData.tag}
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed ${isWide ? 'text-sm pr-8' : 'text-[12px] mb-4'}`}>
                      {service.description}
                    </p>

                    {/* Footer Interaction elements */}
                    {!isWide && (
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Book Expert</span>
                        <div className="w-7 h-7 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-300 dark:text-slate-700 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    )}

                    {isWide && (
                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 
                            transition-all group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900">
                            <ArrowRight size={14} />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest">Book Now</span>
                        </div>
                        
                        {service.startingPrice && (
                          <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-0.5 opacity-60">Average Price</span>
                            <span className="text-base font-black text-foreground">{getCurrency(bookingData.location.country || "UAE")} {service.startingPrice}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
