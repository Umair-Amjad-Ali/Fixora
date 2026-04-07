"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Wrench, ShieldCheck, Zap, Users, Star } from "lucide-react";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-background border-b border-border pt-20 pb-16">
      {/* Animated Background Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" 
      />

      <div className="container mx-auto pt-10 px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-left"
          > 
            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.15]">
              Premium Home Services, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                Delivered Instantly.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg">
              Dubai & Saudi Arabia&apos;s top-rated maintenance platform. From sudden AC breakdowns to emergency plumbing, our vetted experts arrive at your doorstep in record time.
            </motion.p>
            
            {/* href="/book-service/category" */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="#" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all rounded-xl">
                  Book a Technician
                </Button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-background/50 backdrop-blur-md rounded-xl hover:-translate-y-1 transition-all">
                  View All Services
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-4 md:gap-8 pt-8 border-t border-border/50">
              {/* Rating Card */}
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <Star size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground leading-none">4.9/5</span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">10k+ Reviews</span>
                </div>
              </div>

              {/* Speed Card */}
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground leading-none">Fast</span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">Arrival Time</span>
                </div>
              </div>

              {/* Security Card */}
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ShieldCheck size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground leading-none">100%</span>
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">Secure Job</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI Elements / Abstract Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative h-full w-full"
          >
            <div className="relative w-full aspect-square">
              {/* Glass Card 1 */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[10%] w-64 bg-background/60 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 z-20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">AC Maintenance</h4>
                    <p className="text-xs text-zinc-500">Technician on the way</p>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="bg-primary h-full rounded-full"
                  />
                </div>
              </motion.div>

              {/* Glass Card 2 */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[5%] w-72 bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 z-30"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500 overflow-hidden bg-emerald-50 flex items-center justify-center">
                      <ShieldCheck className="text-emerald-500" size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      Ahmed K. 
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
                    </h4>
                    <p className="text-xs text-zinc-500 flex items-center mt-1">
                      <Star size={12} className="text-amber-400 mr-1" /> 4.9 (420 jobs)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Central Abstract Ring */}
              <div className="absolute inset-0 m-auto w-72 h-72 border border-primary/20 rounded-full flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border border-dashed border-secondary/30 rounded-full absolute"
                />
                <div className="w-40 h-40 bg-linear-to-br from-primary/20 to-transparent rounded-full backdrop-blur-3xl flex items-center justify-center border border-primary/10 shadow-inner">
                  <Zap size={48} className="text-primary/50" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
