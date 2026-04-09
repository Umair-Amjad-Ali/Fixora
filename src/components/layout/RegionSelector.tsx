"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { ShieldCheck, MapPin, Globe, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { REGIONS } from "@/lib/constants";

export function RegionSelector() {
  const { bookingData, updateLocation, updateBookingData, isRegionModalOpen, setRegionModalOpen } = useBooking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (country: any) => {
    const countryCode = country === "KSA" ? "+966" : "+971";
    updateLocation({ country });
    updateBookingData({ user: { ...bookingData.user, countryCode } });
    setRegionModalOpen(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isRegionModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setRegionModalOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-7 md:p-9"
          >
            {/* Close Button - Always visible as requested */}
            <button 
              onClick={() => setRegionModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-primary transition-colors border border-zinc-200/50 dark:border-white/5 z-20"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary mb-4"
              >
                <Globe size={12} />
                Select Your Region
              </motion.div>
              <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">Welcome to Fixora</h2>
              <p className="text-zinc-500 font-medium text-[13px]">Choose your location for local pricing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleSelect(region.id)}
                  className="group relative p-5 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl text-left hover:border-primary/50 hover:shadow-lg transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 ${region.accent}/5 rounded-full blur-2xl group-hover:${region.accent}/10 transition-colors`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <span className="text-3xl mb-3 block">{region.icon}</span>
                    <h3 className="text-base font-black text-foreground mb-0.5">{region.name}</h3>
                    <p className="text-[10px] text-zinc-500 font-medium line-clamp-1">{region.description}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                         {region.currency}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                         <CheckCircle2 size={12} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-[9px] text-zinc-400 font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" />
              Verified experts available in both regions
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
