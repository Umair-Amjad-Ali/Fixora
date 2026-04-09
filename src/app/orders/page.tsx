"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  MapPin, 
  Calendar as CalendarIcon, 
  ArrowRight,
  Sparkles,
  ChevronLeft
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
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setFetching(true);
        // Simple query without orderBy to avoid composite index requirement
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });
        // Sort client-side by createdAt descending
        fetchedOrders.sort((a, b) => {
          const aTime = a.createdAt?.seconds ?? 0;
          const bTime = b.createdAt?.seconds ?? 0;
          return bTime - aTime;
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return ["pending", "in_progress"].includes(order.status);
    if (activeTab === "completed") return order.status === "completed";
    return false;
  });

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-xs font-black uppercase tracking-widest">Pending</span>;
      case "in_progress":
        return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg text-xs font-black uppercase tracking-widest">In Progress</span>;
      case "completed":
        return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-black uppercase tracking-widest">Completed</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-black uppercase tracking-widest">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 rounded-lg text-xs font-black uppercase tracking-widest">{status}</span>;
    }
  };

  const OrderSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden">
          <div className="flex-1 w-full space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-6 w-24 bg-zinc-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4 w-16 bg-zinc-50 dark:bg-slate-800/50 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-7 w-3/4 bg-zinc-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-zinc-50 dark:bg-slate-800/50 rounded-lg animate-pulse" />
            </div>
            <div className="flex gap-3">
              <div className="h-9 w-32 bg-zinc-50 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-9 w-40 bg-zinc-50 dark:bg-slate-800 rounded-xl animate-pulse" />
            </div>
          </div>
          <div className="w-full sm:w-16 h-12 bg-zinc-100 dark:bg-slate-800 rounded-2xl shrink-0 animate-pulse" />
          
          {/* Shimmer overlay effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 dark:via-white/3 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
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
            <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight capitalize mb-2">
              My Orders
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-sm">
              <span className="font-medium">{user?.email}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl -mt-6 relative z-20 pb-20">
        {/* Horizontal Tab Bar */}
        <div className="flex items-center gap-2 mb-8 bg-zinc-100 dark:bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-2xl w-full overflow-x-auto scrollbar-hide border border-zinc-200/80 dark:border-slate-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          {TAB_OPTIONS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-sm whitespace-nowrap ${
                  isActive
                    ? "bg-white dark:bg-slate-800 text-foreground shadow-sm"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
              >
                <Icon size={15} className={isActive ? "text-primary" : ""} />
                {tab.label}
              </button>
            );
          })}
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
                <div className="bg-primary text-white rounded-3xl p-7 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
                  <div className="relative z-10">
                    <h2 className="text-xl font-black mb-1">Getting fixed has never been easier.</h2>
                    <p className="text-white/70 font-medium text-sm max-w-md">We've combined technology with expertise to give you a seamless experience.</p>
                  </div>
                </div>

                {/* Steps — matching HowItWorks on the landing page */}
                {[
                  {
                    step: "01",
                    title: "Pin your location",
                    description: "Getting help is as easy as dropping a pin. Our geolocation service accurately detects your villa or apartment coordinates for precision arrival.",
                    icon: MapPin,
                    details: ["Automatic address detection", "Building & Villa specific details", "Service coverage in UAE & KSA"],
                    color: "bg-blue-500/10 text-blue-500",
                  },
                  {
                    step: "02",
                    title: "Schedule instantly",
                    description: "Say goodbye to 'maybe tomorrow'. Pick a specific date and dynamic time slot that fits your busy life.",
                    icon: CalendarIcon,
                    details: ["Same-day emergency slots", "Next-14 day scheduling", "Instant confirmation SMS"],
                    color: "bg-purple-500/10 text-purple-500",
                  },
                  {
                    step: "03",
                    title: "Fixora Certified",
                    description: "Our vetted experts perform the work efficiently. Relax knowing every job is backed by the Fixora Quality Guarantee.",
                    icon: Sparkles,
                    details: ["Background checked pros", "6-Month service warranty", "100% Cash-back protection"],
                    color: "bg-emerald-500/10 text-emerald-500",
                  },
                ].map((item) => (
                  <div key={item.step} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-6 flex gap-5 items-start hover:border-primary/30 transition-colors">
                    <div className={`w-12 h-12 shrink-0 ${item.color} rounded-2xl flex items-center justify-center relative`}>
                      <item.icon size={20} />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center shadow">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-black text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-3">{item.description}</p>
                      <ul className="space-y-1.5">
                        {item.details.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 size={12} className="text-primary shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => router.push("/book-service/category")}
                    className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
                  >
                    Book a Service Now <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {fetching ? (
                  <OrderSkeleton />
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const dateStr = order.schedule?.preferredDate;
                    const dateDesc = dateStr ? format(new Date(dateStr), "MMM dd, yyyy") : "TBD";

                    return (
                      <div key={order.id} className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 hover:border-primary/30 transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="flex-1 w-full">
                           <div className="flex justify-between items-start mb-3">
                              <StatusBadge status={order.status} />
                              <span className="text-xs font-black text-zinc-400">ID: {order.id.slice(0,8).toUpperCase()}</span>
                           </div>
                           <h3 className="text-lg sm:text-xl font-black text-foreground mb-1 capitalize">
                              {order.service?.serviceType} Service
                           </h3>
                           <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                              {order.service?.serviceSubType?.replace(/_/g, " ")} 
                              {order.service?.issue?.type && ` • ${order.service.issue.type.replace(/_/g, " ")}`}
                           </p>

                           <div className="flex items-center gap-2 mb-4 bg-primary/5 w-fit px-3 py-1 rounded-lg border border-primary/10">
                              <span className="text-[8px] font-black text-primary uppercase tracking-tight">Est. Price:</span>
                              <span className="text-[8px] font-black text-primary">
                                 {order.service?.estimatedPrice > 0 
                                   ? `${order.service.currency} ${order.service.estimatedPrice}` 
                                   : "Not Specified"}
                              </span>
                           </div>
                           
                           <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                              <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-slate-700">
                                 <CalendarIcon size={14} className="text-primary" />
                                 {dateDesc} • {order.schedule?.timeRange || "No time"}
                              </div>
                              <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-slate-700 max-w-[200px] truncate">
                                 <MapPin size={14} className="text-secondary" />
                                 <span className="truncate">{order.location?.formattedAddress || "No address"}</span>
                              </div>
                           </div>
                        </div>
                        <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
                           <button onClick={() => router.push(`/orders/${order.id}`)} className="w-full sm:w-12 h-12 bg-zinc-50 hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary text-zinc-400 rounded-2xl flex items-center justify-center transition-all group">
                              <span className="sm:hidden font-black text-sm mr-2 group-hover:text-white">View Details</span>
                              <ArrowRight size={16} className="sm:group-hover:translate-x-0.5 transition-transform" />
                           </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-zinc-50 dark:bg-slate-900 border-2 border-dashed border-zinc-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-zinc-300 dark:text-slate-600 mb-4">
                      <Package size={24} />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-2">No Orders Found</h3>
                    <p className="text-sm text-zinc-500 font-medium max-w-sm mx-auto mb-8">
                      {activeTab === "all" 
                        ? "You haven't booked any services yet. Start your first request to get your home fixed." 
                        : `You have no ${activeTab} orders at the moment.`}
                    </p>
                    <button 
                      onClick={() => router.push("/book-service/category")}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      Book Your First Service <ArrowRight size={16} />
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
