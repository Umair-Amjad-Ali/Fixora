"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Package, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { enUS, ar } from "date-fns/locale";

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations("profilePage");
  const locale = usePathname().split('/')[1] || 'en';

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const ProfileSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-[#030712] animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="pt-28 pb-20 bg-zinc-900 overflow-hidden relative border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="h-4 w-32 bg-zinc-800 rounded-lg mb-6" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-zinc-800 rounded-full" />
            <div className="space-y-3">
              <div className="h-8 w-48 bg-zinc-800 rounded-xl" />
              <div className="h-4 w-32 bg-zinc-800/50 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="h-2 w-16 bg-zinc-100 dark:bg-slate-800 rounded" />
                      <div className="h-4 w-full max-w-[140px] bg-zinc-50 dark:bg-slate-800/50 rounded" />
                    </div>
                  ))}
               </div>
               <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-100/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 h-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-100/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading || !user) {
    return <ProfileSkeleton />;
  }

  const joinedDate = userProfile?.createdAt 
    ? format(new Date(userProfile.createdAt.seconds * 1000), "MMMM yyyy", { 
        locale: locale === 'ar' ? ar : enUS 
      })
    : t("notProvided");

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Banner */}
      <div className="pt-24 pb-20 bg-zinc-950 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-blue-500/10" />
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />

        <div className="container-tight relative z-10">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 w-fit group font-bold">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest">{t("returnHome")}</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-primary/40 p-1 bg-white dark:bg-zinc-900"
              >
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                   {userProfile?.name ? userProfile.name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </div>
              </motion.div>
              <div className="text-center md:text-start rtl:text-right">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2"
                >
                  {userProfile?.name || "DHS User"}
                </motion.h1>
                <div className="flex items-center justify-center md:justify-start gap-3">
                   <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      {t("memberSince", { date: joinedDate })}
                   </span>
                   <span className="w-1 h-1 rounded-full bg-zinc-700" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {t("verified")}
                   </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info - Now span full width */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none"
            >
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <h3 className="font-black text-lg">{t("personalInfo")}</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <InfoCell label={t("fullName")} value={userProfile?.name || ""} icon={<User size={14} />} />
                  <InfoCell label={t("email")} value={user.email || ""} icon={<Mail size={14} />} />
                  <InfoCell label={t("phone")} value={userProfile?.phone || ""} icon={<Phone size={14} />} />
                  <InfoCell label={t("accessLevel")} value={t("standardClient")} icon={<ShieldCheck size={14} />} />
               </div>
            </motion.div>

            {/* Account Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <StatCard 
                label={t("totalOrders")} 
                value={userProfile?.totalOrders || 0} 
                icon={<Package size={20} />} 
                color="blue"
                delay={0.15}
               />
               <StatCard 
                label={t("completed")} 
                value={userProfile?.completedOrders || 0} 
                icon={<CheckCircle2 size={20} />} 
                color="emerald"
                delay={0.2}
               />
               <StatCard 
                label={t("cancelled")} 
                value={userProfile?.cancelledOrders || 0} 
                icon={<XCircle size={20} />} 
                color="red"
                delay={0.25}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  return (
    <div className="group">
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 group-hover:text-primary transition-colors">
        {icon} {label}
      </p>
      <p className="text-base font-bold text-foreground">
        {value || <span className="text-zinc-300 dark:text-zinc-700 italic">{useTranslations("profilePage")("notProvided")}</span>}
      </p>
    </div>
  );
}

function StatCard({ label, value, icon, color, delay }: { label: string; value: number; icon: React.ReactNode; color: 'blue' | 'emerald' | 'red'; delay: number }) {
  const themes = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5",
    red: "text-red-500 bg-red-500/10 border-red-500/20 shadow-red-500/5"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl dark:shadow-none hover:border-zinc-300 dark:hover:border-slate-700 transition-all group`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${themes[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-black text-foreground mb-1">{value}</p>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
    </motion.div>
  );
}
