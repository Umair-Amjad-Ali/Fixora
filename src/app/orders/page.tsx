"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  MapPin, 
  Calendar as CalendarIcon, 
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Filter,
  ChevronRight,
  CalendarDays,
  X,
  User,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";

type Order = {
  id: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: any;
  service: any;
  schedule: any;
  location: any;
  userDetails: any;
};

const TAB_OPTIONS = [
  { id: "all", label: "All", icon: Package },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
  { id: "guide", label: "Process", icon: BookOpen },
];

export default function ProfileDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { 
    filteredOrders, 
    fetching, 
    activeTab, 
    setActiveTab, 
    filterDate, 
    setFilterDate, 
    currentPage, 
    setCurrentPage,
    itemsPerPage 
  } = useOrders();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Verifying Identity...</p>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-xs font-black uppercase tracking-tight">Pending</span>;
      case "in_progress":
        return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg text-xs font-black uppercase tracking-tight">In Progress</span>;
      case "completed":
        return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-black uppercase tracking-tight">Completed</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-black uppercase tracking-tight">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 rounded-lg text-xs font-black uppercase tracking-tight">{status}</span>;
    }
  };

  const OrderSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-6 w-24 bg-zinc-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-16 bg-zinc-50 dark:bg-slate-800/50 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-zinc-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-1/2 bg-zinc-50 dark:bg-slate-800/50 rounded-lg" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-zinc-50 dark:bg-slate-800 rounded-xl" />
                <div className="h-8 w-32 bg-zinc-50 dark:bg-slate-800 rounded-xl" />
              </div>
            </div>
            <div className="w-full sm:w-12 h-12 bg-zinc-100 dark:bg-slate-800 rounded-2xl shrink-0" />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-200/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#030712]">
      {/* Hero Banner */}
      <div className="pt-28 pb-20 bg-zinc-950 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-emerald-500/10" />
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 w-fit group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return Home</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-2">
              Order History
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-zinc-500 text-xs font-bold">
               <User size={14} className="text-primary" />
               <span>{user?.email}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-8 relative z-20 pb-24">
        
        {/* Filter & Tab Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 p-1.5 rounded-2xl w-full lg:w-fit overflow-x-auto shadow-sm">
            {TAB_OPTIONS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-black text-xs whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
             <div className="relative group flex-1 sm:flex-none">
                <AnimatePresence mode="wait">
                  {!filterDate ? (
                    <motion.div
                      key="calendar-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-100/70 pointer-events-none"
                    >
                      <CalendarDays size={16} />
                    </motion.div>
                  ) : (
                    <motion.button
                      key="clear-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setFilterDate("")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500 dark:text-zinc-100/70 transition-colors z-10"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <input 
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className={`w-full sm:w-48 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs font-black outline-none focus:border-primary transition-all appearance-none text-foreground
                    ${filterDate ? "border-primary/50 text-primary" : "text-zinc-500"}
                  `}
                />
             </div>
             <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-zinc-400 dark:text-zinc-100/50 uppercase tracking-widest bg-zinc-100 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-slate-800">
                <Filter size={12} className="text-primary" />
                <span>Quick Filter</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "guide" ? (
              <motion.div
                key="guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Header Banner */}
                <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-primary/20">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-black tracking-tight mb-2">Getting fixed has never been easier.</h2>
                    <p className="text-white/80 font-bold text-sm max-w-md">We've combined technology with expertise to give you a seamless experience.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "01",
                      title: "Pin your location",
                      description: "Precise arrival for your villa or apartment.",
                      icon: MapPin,
                      color: "bg-blue-500/10 text-blue-500",
                    },
                    {
                      step: "02",
                      title: "Schedule instantly",
                      description: "Pick a date and dynamic time slot.",
                      icon: CalendarIcon,
                      color: "bg-purple-500/10 text-purple-500",
                    },
                    {
                      step: "03",
                      title: "Fixora Certified",
                      description: "Vetted experts with service warranty.",
                      icon: Sparkles,
                      color: "bg-emerald-500/10 text-emerald-500",
                    },
                  ].map((item) => (
                    <div key={item.step} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col gap-4 hover:border-primary transition-colors group">
                      <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform`}>
                        <item.icon size={20} />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border border-white dark:border-slate-800">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-zinc-800 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => router.push("/book-service/category")}
                    className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95 group"
                  >
                    Start A New Booking <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {fetching ? (
                  <OrderSkeleton />
                ) : paginatedOrders.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {paginatedOrders.map((order) => {
                        const dateStr = order.schedule?.preferredDate;
                        const dateDesc = dateStr ? format(new Date(dateStr), "MMM dd, yyyy") : "TBD";

                        return (
                          <motion.div 
                            key={order.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 hover:border-primary/50 transition-all shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center group"
                          >
                            <div className="flex-1 w-full">
                               <div className="flex justify-between items-start mb-4">
                                  <StatusBadge status={order.status} />
                                  <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-black text-zinc-400 font-mono tracking-widest">#{order.id.slice(0,8).toUpperCase()}</span>
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter bg-zinc-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-zinc-100 dark:border-slate-800">
                                      Booked: {order.createdAt?.seconds ? format(new Date(order.createdAt.seconds * 1000), "MMM dd") : "TBD"}
                                    </span>
                                  </div>
                               </div>
                               <h3 className="text-xl sm:text-2xl font-black text-foreground mb-1 capitalize tracking-tight">
                                  {order.service?.serviceType} Service
                               </h3>
                               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                                  {order.service?.serviceSubType?.replace(/_/g, " ")} 
                                  {order.service?.issue?.label && ` • ${order.service.issue.label}`}
                               </p>
                               
                               <div className="flex flex-wrap gap-3">
                                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-zinc-100 dark:border-slate-700 text-[11px] font-black text-zinc-600 dark:text-zinc-300">
                                     <CalendarIcon size={14} className="text-primary" />
                                     {dateDesc}
                                  </div>
                                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-zinc-100 dark:border-slate-700 text-[11px] font-black text-zinc-600 dark:text-zinc-300">
                                     <Clock size={14} className="text-secondary" />
                                     {order.schedule?.timeRange || "TBD"}
                                  </div>
                                  <div className="hidden md:flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-xl border border-primary/10 text-[11px] font-black text-primary uppercase">
                                     <DollarSign size={14} />
                                     {order.service?.estimatedPrice > 0 
                                       ? `${order.service.currency} ${order.service.estimatedPrice}` 
                                       : "Custom Quote"}
                                  </div>
                               </div>
                            </div>
                            <div className="w-full sm:w-auto shrink-0">
                               <button 
                                 onClick={() => router.push(`/orders/${order.id}`)} 
                                 className="w-full sm:w-14 h-14 bg-zinc-50 hover:bg-primary dark:bg-slate-900 dark:hover:bg-primary text-zinc-300 group-hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
                               >
                                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                               </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-8">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(prev => prev - 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 text-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-all"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        
                        <div className="flex items-center gap-1.5 px-4 h-10 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl">
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-7 h-7 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                                currentPage === i + 1 
                                  ? "bg-primary text-white" 
                                  : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(prev => prev + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 text-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-all"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white dark:bg-slate-900/50 border-2 border-dashed border-zinc-200 dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-zinc-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center text-zinc-300 dark:text-slate-700 mb-6 mx-auto">
                      <Package size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-2">No matching orders</h3>
                    <p className="text-sm text-zinc-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                      {filterDate 
                        ? `We couldn't find any orders created on ${format(new Date(filterDate), "MMM dd, yyyy")}. Try a different date.` 
                        : "You haven't booked any services yet. Our certified technicians are ready to help."}
                    </p>
                    <button 
                      onClick={() => {
                        if (filterDate) setFilterDate("");
                        else router.push("/book-service/category");
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-2xl font-black text-xs flex items-center gap-2 mx-auto transition-all shadow-xl shadow-primary/20"
                    >
                      {filterDate ? "Clear Filters" : "Find Your Service"} <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
