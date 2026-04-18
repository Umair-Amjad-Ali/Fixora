"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { format } from "date-fns";
import { enUS, ar } from "date-fns/locale";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Home,
  FileText,
  Shield,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

type Order = {
  id: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: any;
  service: any;
  schedule: any;
  location: any;
  userDetails: any;
  assignedTechId?: string;
  assignedTechName?: string;
  assignedTechPhone?: string;
  assignedAt?: any;
};

const statusConfig: Record<string, { color: string; bg: string; border: string; label: string; icon: React.ReactNode }> = {
  pending: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Pending", icon: <Clock size={14} /> },
  in_progress: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "In Progress", icon: <Wrench size={14} /> },
  completed: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", label: "Completed", icon: <CheckCircle2 size={14} /> },
  cancelled: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", label: "Cancelled", icon: <AlertCircle size={14} /> },
};

const timelineSteps = [
  { key: "pending", label: "Order Placed", desc: "Your service request has been received" },
  { key: "in_progress", label: "In Progress", desc: "A technician is working on your request" },
  { key: "completed", label: "Completed", desc: "Your service has been completed successfully" },
];

export default function OrderDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [fetching, setFetching] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const t = useTranslations("orderDetailPage");
  const tCommon = useTranslations("common");
  const tServices = useTranslations("constants.services");
  const locale = usePathname().split('/')[1] || 'en';
  const activeLocale = locale === 'ar' ? ar : enUS;

  const handleCancelOrder = async () => {
    if (!orderId || !user) return;
    if (!window.confirm(t("cancelConfirm"))) return;
    
    setIsCancelling(true);
    try {
      await updateDoc(doc(db, "orders", orderId), { status: "cancelled" });
      
      // Update User Stats
      await updateDoc(doc(db, "users", user.uid), {
        cancelledOrders: increment(1)
      });

      setOrder(prev => prev ? { ...prev, status: "cancelled" } : null);
      toast.success(t("cancelSuccess"));
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(t("cancelError"));
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) return;
      try {
        const snap = await getDoc(doc(db, "orders", orderId));
        if (snap.exists()) {
          const data = snap.data();
          if (data.status) data.status = data.status.replace(/-/g, "_");
          setOrder({ id: snap.id, ...data } as Order);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setFetching(false);
      }
    };
    if (user) fetchOrder();
  }, [user, orderId]);

  const DetailSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-[#030712] animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="pt-28 pb-20 bg-zinc-900 overflow-hidden relative border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="h-4 w-32 bg-zinc-800 rounded-lg mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="h-10 w-64 bg-zinc-800 rounded-xl" />
              <div className="h-4 w-48 bg-zinc-800/50 rounded-lg" />
            </div>
            <div className="h-10 w-32 bg-zinc-800 rounded-2xl" />
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details Skeleton */}
            <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-zinc-100 dark:bg-slate-800 rounded-lg" />
                  <div className="h-3 w-24 bg-zinc-50 dark:bg-slate-800/50 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-2 w-16 bg-zinc-50 dark:bg-slate-800/50 rounded" />
                    <div className="h-4 w-24 bg-zinc-100 dark:bg-slate-800 rounded" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-100/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            {/* Grid for Schedule/Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="h-11 w-11 bg-zinc-100 dark:bg-slate-800 rounded-2xl mb-4" />
                  <div className="space-y-4">
                    <div className="h-4 w-2/3 bg-zinc-100 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-100 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-100/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="h-11 w-11 bg-zinc-100 dark:bg-slate-800 rounded-2xl mb-4" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-zinc-100 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-full bg-zinc-100 dark:bg-slate-800 rounded" />
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-100/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading || fetching) {
    return <DetailSkeleton />;
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileText size={28} className="text-zinc-400" />
          </div>
          <h2 className="text-3xl font-black mb-3">{t("orderNotFound")}</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">{t("orderNotFoundDesc")}</p>
          <button onClick={() => router.push("/orders")} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-primary/90 transition-colors">
            {t("backOrders")}
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pending;
  const dateStr = order.schedule?.preferredDate;
  const dateDesc = dateStr ? format(new Date(dateStr), "EEEE, MMMM dd, yyyy", { locale: activeLocale }) : t("labels.tbd");
  const createdDate = order.createdAt?.toDate ? format(order.createdAt.toDate(), "MMM dd, yyyy 'at' hh:mm a", { locale: activeLocale }) : "N/A";
  const shortId = order.id.slice(0, 8).toUpperCase();

  const copyId = () => {
    navigator.clipboard.writeText(order.id);
    toast.success(t("copyId"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Banner */}
      <div className="pt-28 pb-20 bg-zinc-950 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-emerald-500/10" />
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <Link href="/orders" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 w-fit group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">{t("backOrders")}</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-2xl sm:text-4xl font-black text-white tracking-tight capitalize mb-2 wrap-break-word"
              >
                {tServices(`${order.service?.serviceType}.name`)} {t("order")}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-xs sm:text-sm">
                <button onClick={copyId} className="flex items-center gap-1.5 hover:text-white transition-colors group">
                  <span className="font-mono font-bold break-all">#{shortId}</span>
                  <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
                <span className="font-medium">{createdDate}</span>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <span className={`inline-flex items-center gap-2 px-5 py-2.5 ${status.bg} ${status.color} border ${status.border} rounded-2xl text-xs font-black uppercase tracking-widest`}>
                {status.icon} {t(`statusLabels.${order.status}`)}
              </span>

              {order.status === "pending" && (
                <button 
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 shrink-0 flex items-center gap-1.5"
                >
                  {isCancelling ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <AlertCircle size={12} />
                      {t("cancelOrder")}
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column — Main Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Service Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Wrench size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg">{t("detailsTitle")}</h3>
                  <p className="text-xs text-zinc-400 font-medium">{t("detailsSubtitle")}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoCell label={t("labels.serviceType")} value={tServices(`${order.service?.serviceType}.name`)} />
                <InfoCell label={t("labels.subType")} value={order.service?.serviceSubType?.replace(/_/g, " ")} />
                <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10">
                  <InfoCell 
                    label={t("labels.estPrice")} 
                    value={order.service?.estimatedPrice > 0 
                      ? `${order.service.currency} ${order.service.estimatedPrice}` 
                      : t("labels.notSpecified")} 
                  />
                </div>
                {order.service?.acType && <InfoCell label={t("labels.acType")} value={order.service.acType.replace(/_/g, " ")} />}
                {order.service?.issue?.label && <InfoCell label={t("labels.issue")} value={order.service.issue.label} />}
                {order.service?.issue?.description && (
                  <div className="sm:col-span-2">
                    <InfoCell label={t("labels.description")} value={order.service.issue.description} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Schedule & Location — Side by Side on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Schedule */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/20 dark:shadow-none"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-black">{t("schedule")}</h3>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">{t("labels.date")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <InfoCell label={t("labels.date")} value={dateDesc} />
                  <InfoCell label={t("labels.time")} value={order.schedule?.timeRange || t("labels.notSpecified")} />
                  {order.schedule?.urgency && <InfoCell label={t("labels.urgency")} value={order.schedule.urgency.replace(/_/g, " ")} />}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/20 dark:shadow-none"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-black">{t("location")}</h3>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">{t("labels.address")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <InfoCell label={t("labels.address")} value={order.location?.formattedAddress || t("labels.notProvided")} />
                  {order.location?.apartment && <InfoCell label={t("labels.unit")} value={order.location.apartment} />}
                  {order.location?.instructions && <InfoCell label={t("labels.instructions")} value={order.location.instructions} />}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="space-y-6">

            {/* Customer Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/20 dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-black">{t("customer")}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">{t("labels.yourInfo")}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg">
                    {(order.userDetails?.name || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-foreground">{order.userDetails?.name || "N/A"}</p>
                    <p className="text-xs text-zinc-400 font-medium">{order.userDetails?.email || "N/A"}</p>
                  </div>
                </div>
                {order.userDetails?.phone && (
                  <a href={`tel:${order.userDetails.phone}`} className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-primary transition-colors">
                    <Phone size={14} /> {order.userDetails.phone}
                  </a>
                )}
              </div>
            </motion.div>
            
            {/* Status Timeline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/20 dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-black">{t("progress")}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">{t("timeline")}</p>
                </div>
              </div>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[15px] rtl:left-auto rtl:right-[15px] top-2 bottom-2 w-[2px] bg-zinc-100 dark:bg-slate-800" />
                <div className="space-y-6">
                  {timelineSteps.map((step, i) => {
                    const stepIdx = timelineSteps.findIndex(s => s.key === order.status);
                    const isReached = i <= stepIdx;
                    const isCurrent = step.key === order.status;
                    const cfg = statusConfig[step.key];
                    return (
                      <div key={step.key} className="flex items-start gap-4 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 z-10 transition-all ${
                          isReached
                            ? `${cfg.bg} ${cfg.color} ${cfg.border} ${isCurrent ? "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : ""}`
                            : "bg-zinc-50 dark:bg-slate-950 border-zinc-200 dark:border-slate-800 text-zinc-400"
                        }`}
                        >
                          {isReached ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                        </div>
                        <div className="rtl:text-right">
                          <p className={`text-sm font-black ${isReached ? "text-foreground" : "text-zinc-400"}`}>{t(`timelineSteps.${step.key}Title`)}</p>
                          <p className={`text-xs font-medium ${isReached ? "text-zinc-500" : "text-zinc-400/60"}`}>{t(`timelineSteps.${step.key}Desc`)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>


          </div>
        </div>

        {/* Technician Card (if assigned) */}
        {order.assignedTechId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35 }}
            className="mt-6 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-2xl shadow-emerald-500/30">
                    {(order.assignedTechName || "T")[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center border-2 border-emerald-500 text-emerald-500">
                    <Shield size={12} fill="currentColor" fillOpacity={0.2} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-black text-foreground">{order.assignedTechName || "N/A"}</h3>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                      {t("assignedTech")}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 font-medium flex items-center flex-wrap gap-2">
                    {t("technician")}
                    {order.assignedAt && (
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block" />
                        <span className="text-[10px] sm:text-xs">
                          {t("assignedOn")} {order.assignedAt?.toDate ? format(order.assignedAt.toDate(), "MMM dd, yyyy", { locale: activeLocale }) : ""} {t("at")} {order.assignedAt?.toDate ? format(order.assignedAt.toDate(), "hh:mm a", { locale: activeLocale }) : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {order.assignedTechPhone && (
                  <a 
                    href={`tel:${order.assignedTechPhone}`} 
                    dir="ltr"
                    className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 group"
                  >
                    <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>{order.assignedTechPhone}</span>
                  </a>
                )}
                {/* <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 text-zinc-600 dark:text-zinc-300 px-6 py-4 rounded-2xl font-black text-sm transition-all active:scale-95">
                  <Mail size={18} />
                  <span>Message</span>
                </button> */}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-sm font-bold text-foreground capitalize leading-relaxed wrap-break-word">{value || "—"}</p>
    </div>
  );
}
