"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wind,
  WashingMachine,
  Refrigerator,
  Zap,
  Droplets,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  LayoutGrid,
  Star,
  Clock
} from "lucide-react";

const services = [
  { slug: "ac", icon: Wind, color: "bg-blue-600", accent: "group-hover:bg-blue-600/10" },
  { slug: "washing_machine", icon: WashingMachine, color: "bg-indigo-600", accent: "group-hover:bg-indigo-600/10" },
  { slug: "refrigerator", icon: Refrigerator, color: "bg-cyan-600", accent: "group-hover:bg-cyan-600/10" },
  { slug: "electrical", icon: Zap, color: "bg-amber-500", accent: "group-hover:bg-amber-500/10" },
  { slug: "plumbing", icon: Droplets, color: "bg-blue-700", accent: "group-hover:bg-blue-700/10" },
  { slug: "cleaning", icon: Sparkles, color: "bg-emerald-600", accent: "group-hover:bg-emerald-600/10" },
];

const locations = [
  "Riyadh, Saudi Arabia",
  "Jeddah, Saudi Arabia",
  "Dammam, Saudi Arabia",
  "Al Khobar, Saudi Arabia",
];

export default function ServicesPage() {
  const t = useTranslations("constants");
  const ts = useTranslations("servicesPage");
  const tl = useTranslations("locationPages");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#020617] text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <ShieldCheck size={14} className="text-primary" />
                <span>{ts("premiumStandards")}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
                {ts("heroTitle")}
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-xl mb-12">
                {ts("heroSubtitle")}
              </p>


            </motion.div>

            {/* Right: Floating Stats Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="col-span-2 sm:col-span-1 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-3xl font-black mb-0.5 tracking-tighter">1K+</div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{ts("stats.clients")}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="col-span-2 sm:col-span-1 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors mt-0 sm:mt-8 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Clock size={20} />
                  </div>
                  <div className="text-3xl font-black mb-0.5 tracking-tighter">30D</div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{ts("stats.warranty")}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="col-span-2 p-6 rounded-3xl bg-linear-to-r from-primary to-blue-600 border border-white/10 shadow-2xl shadow-primary/20 group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black mb-0.5 text-white tracking-tighter">24/7</div>
                      <div className="text-[9px] font-bold text-white/70 uppercase tracking-widest">{ts("stats.support")}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                      <PhoneCall size={24} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-8 space-y-20">

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] font-black uppercase tracking-[3px] text-primary mb-3">{ts("aboutBadge")}</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-foreground mb-8">
                  {ts("aboutTitle")}
                </h2>
                <div className="space-y-5 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  <p>{ts("aboutContent1")}</p>
                  <p>{ts("aboutContent2")}</p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                  {(ts.raw("features") as string[]).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/3 border border-zinc-100 dark:border-white/6 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="font-semibold text-foreground text-[13px]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Services list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-5 mb-10">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-foreground whitespace-nowrap">
                    {ts("exploreTitle")}
                  </h2>
                  <div className="h-px flex-1 bg-linear-to-r from-zinc-200 dark:from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-zinc-200 dark:border-white
                      /[0.08] hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg ${service.color} text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                          <service.icon size={18} />
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-sm text-foreground group-hover:text-primary transition-colors uppercase tracking-tight truncate">
                            {t(`services.${service.slug}.name`)}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
                            {t(`services.${service.slug}.description`)}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-200 shrink-0">
                          <ArrowRight
                            size={13}
                            className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all rtl:rotate-180"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">

                {/* Quick Links */}
                <div className="rounded-2xl bg-slate-50 dark:bg-white/3 border border-zinc-100 dark:border-white/6 p-6">
                  <div className="flex items-center gap-2.5 mb-5">
                    <LayoutGrid size={16} className="text-primary shrink-0" />
                    <h3 className="text-[10px] font-black uppercase tracking-[2.5px] text-zinc-500 dark:text-zinc-400">
                      {ts("quickLinks")}
                    </h3>
                  </div>
                  <ul className="space-y-0.5">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-all group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary transition-colors" />
                            <span className="text-[12px] font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-foreground uppercase tracking-wider transition-colors">
                              {t(`services.${service.slug}.name`)}
                            </span>
                          </div>
                          <div className="w-5 h-5 rounded-md bg-primary/0 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                            <ArrowRight size={9} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Areas */}
                <div className="rounded-2xl bg-slate-50 dark:bg-white/3 border border-zinc-100 dark:border-white/6 p-6">
                  <div className="flex items-center gap-2.5 mb-5">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <h3 className="text-[10px] font-black uppercase tracking-[2.5px] text-zinc-500 dark:text-zinc-400">
                      {ts("serviceAreasTitle")}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {["dammam", "alkhobar", "aldhahran"].map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/location/${slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-zinc-100 dark:border-white/5 hover:border-primary/40 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <MapPin size={14} className="text-zinc-400 group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-foreground transition-colors">
                            {tl(`${slug}.name`)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book CTA */}
                <Link
                  href="/book-service/category"
                  className="flex items-center justify-between p-6 rounded-2xl bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/20"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[2.5px] text-white/60 mb-1">{ts("readyToBook")}</p>
                    <p className="text-base font-black uppercase tracking-tight">{ts("startBooking")}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                    <ArrowRight size={16} className="text-white rtl:rotate-180" />
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <div className="py-16 text-center border-t border-zinc-100 dark:border-white/6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-zinc-400 hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowRight size={13} className="rotate-180 rtl:rotate-0" />
          {ts("backHome")}
        </Link>
      </div>

    </div>
  );
}