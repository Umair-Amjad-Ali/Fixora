"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants, useMotionValue, useMotionTemplate } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowRight, Sparkles, Navigation } from "lucide-react";

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
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group relative h-full flex overflow-hidden rounded-4xl border border-zinc-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-zinc-200/20 dark:shadow-none ${
          isWide ? "flex-col sm:flex-row items-center p-6 sm:p-8" : "flex-col p-6"
        }`}
      >
        {/* Dynamic Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), transparent 40%)`
          }}
        />

        {/* Glossy Top Edge Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated Background Mesh/Orb for wide cards only to make them interesting */}
        {isWide && (
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700 z-0" />
        )}

        <div className={`relative z-10 w-full flex ${isWide ? 'flex-col sm:flex-row h-full gap-6' : 'flex-col h-full'}`}>
          {children}
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesGrid() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    }
  };

  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-slate-950">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 dark:bg-slate-800 rounded-full text-xs font-bold mb-4 text-zinc-700 dark:text-zinc-300">
              <Sparkles size={14} className="text-secondary" />
              Categorized Expertise
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Solve any issue <br/>
              <span className="text-zinc-400">with zero friction.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            Explore 6 Categories <ArrowRight size={16} />
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
            // Make first and last elements span 2 columns on large screens
            const isWide = index === 0 || index === 5;
            
            return (
              <motion.div 
                variants={cardVariants} 
                key={service.slug} 
                className={`${isWide ? 'lg:col-span-2' : 'col-span-1'} h-full`}
              >
                <BentoCard href={`/book-service/service-type?service=${service.slug}`} isWide={isWide}>
                  
                  {/* Card Icon Header */}
                  <div className={`flex ${isWide ? 'flex-col justify-between sm:w-1/3' : 'items-start justify-between'} mb-6 sm:mb-0`}>
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-slate-800 border border-zinc-200/50 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary group-hover:border-primary/50 group-hover:text-white transition-all duration-500 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100" />
                      <span className="text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                        {service.icon}
                      </span>
                    </div>

                    {extraData.tag && !isWide && (
                      <div className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mt-2">
                        {extraData.tag}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content Body */}
                  <div className={`flex flex-col ${isWide ? 'sm:w-2/3 justify-center' : 'flex-1'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-black text-foreground group-hover:text-primary transition-colors duration-300 ${isWide ? 'text-2xl' : 'text-xl'}`}>
                        {service.name}
                      </h3>
                      {extraData.tag && isWide && (
                        <div className="bg-secondary/10 dark:bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap ml-4">
                          {extraData.tag}
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-zinc-500 dark:text-zinc-400 font-medium ${isWide ? 'text-sm md:text-base pr-8' : 'text-sm mb-6'}`}>
                      {service.description}
                    </p>

                    {/* Footer Interaction elements */}
                    {!isWide && (
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-slate-800/50">
                        <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Book Expert</span>
                        <div className="text-zinc-300 dark:text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all">
                          <Navigation size={16} className="rotate-90" />
                        </div>
                      </div>
                    )}

                    {isWide && (
                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform cursor-pointer">
                           <ArrowRight size={14} />
                        </div>
                        <span className="text-sm font-bold text-primary">Book Now</span>
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
