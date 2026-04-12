"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "923106980786";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex items-center justify-center">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center"
      >
        {/* Pulsing Glow Rings - Subtler */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1.05, 1], opacity: [0, 0.2, 0.25, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-primary rounded-full blur-xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1.1, 1], opacity: [0, 0.1, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 bg-primary/60 rounded-full blur-2xl"
        />

        {/* The Button Body - Using Website Primary Color */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-primary to-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white border-2 border-white/20 overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle size={28} strokeWidth={2.5} className="sm:w-8 sm:h-8" />
          </motion.div>
          
          {/* Glass Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Tooltip on Hover */}
        <div className="absolute right-full mr-4 px-3 py-2 bg-slate-900 border border-slate-800 text-white text-xs font-black rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-xl whitespace-nowrap hidden sm:block">
          Chat with Support
        </div>
      </motion.a>
    </div>
  );
}
