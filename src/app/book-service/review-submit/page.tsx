"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp, increment } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  User, 
  CreditCard, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Info,
  Clock,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const { bookingData, setCurrentStep, resetBooking } = useBooking();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentStep(8);
  }, [setCurrentStep]);

  // Pricing handled manually by technicians on-site

  const handleBooking = async () => {
    if (!user) {
      toast.error("Authentication required to complete booking.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Prepare Order Data
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        userDetails: bookingData.user,
        location: bookingData.location,
        schedule: bookingData.schedule,
        service: bookingData.service,

        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // 2. Save to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);

      // 2.1 Update User Stats
      await updateDoc(doc(db, "users", user.uid), {
        totalOrders: increment(1)
      });

      toast.success("Order Placed Successfully!", {
        description: `Your technician will arrive soon. Booking ID: ${docRef.id.slice(0, 8)}`,
      });

      // 3. Cleanup & Redirect to Landing Page (and obliterate ghost history)
      const stepsToPop = bookingData.currentStep || 8;
      
      if (typeof window !== "undefined") {
         window.history.go(-stepsToPop);
      }
      
      // Delay wiping the state so React doesn't crash the router mid-jump
      setTimeout(() => {
         resetBooking();
      }, 500);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error("Failed to complete booking", { description: error.message || "Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = SERVICE_CATEGORIES.find(c => c.slug === bookingData.service.serviceType);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-left">
        <h2 className="text-2xl font-black mb-1">Review & Confirm</h2>
        <p className="text-sm text-zinc-500 font-medium tracking-tight">Quick check before we dispatch your expert.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Column: Data Summary */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Service & Issues */}
          <div className="bg-zinc-50 dark:bg-slate-950 p-5 rounded-3xl border border-zinc-200 dark:border-slate-800 relative overflow-hidden group">
             <div className="absolute -top-4 -right-4 text-primary/5 group-hover:scale-110 transition-transform duration-700">
                <Zap size={80} />
             </div>
             <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                <Sparkles size={10} className="text-primary" />
                Service Breakdown
             </h3>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div>
                  <h4 className="text-lg font-black text-foreground flex items-center gap-2">
                     {selectedCategory?.icon} {selectedCategory?.name}
                  </h4>
                  <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider mt-0.5">
                    {bookingData.service.serviceSubType?.replace(/_/g, " ")} 
                    {bookingData.service.issue?.type && ` • ${bookingData.service.issue.type.replace(/_/g, " ")}`}
                  </p>
                </div>
                {bookingData.service.issue?.customDescription && (
                  <div className="flex-1 max-w-xs sm:text-right">
                     <p className="text-[9px] font-bold text-zinc-400 uppercase mb-0.5">Notes:</p>
                     <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium italic line-clamp-1">
                        "{bookingData.service.issue.customDescription}"
                     </p>
                  </div>
                )}
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                  <User size={10} className="text-primary" />
                  Contact
               </h3>
               <div className="space-y-0.5">
                  <p className="text-[15px] font-black text-foreground">{bookingData.user.name}</p>
                  <p className="text-[11px] text-zinc-500 font-medium">{bookingData.user.email}</p>
                  <p className="text-[11px] font-bold text-primary mt-1">{bookingData.user.countryCode} {bookingData.user.phone}</p>
               </div>
            </div>

            {/* Schedule Details */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl">
               <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3.5 flex items-center gap-1.5">
                  <Calendar size={10} className="text-secondary" />
                  Appointment
               </h3>
               <div className="space-y-0.5">
                  <p className="text-[15px] font-black text-foreground">
                    {(() => {
                      const dateStr = bookingData.schedule.preferredDate;
                      if (!dateStr) return "To be confirmed";
                      const date = new Date(dateStr);
                      return isNaN(date.getTime()) ? "To be confirmed" : format(date, "MMMM dd, yyyy");
                    })()}
                  </p>
                  <div className="flex items-center gap-1.5 text-zinc-500 font-bold uppercase text-[9px] tracking-wider mt-1">
                     <Clock size={10} />
                     {bookingData.schedule.timeRange} Window
                  </div>
               </div>
            </div>
          </div>

          {/* Location Summary */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl flex items-start gap-3.5">
             <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={18} />
             </div>
             <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Service Address</h3>
                <p className="text-[12px] font-black text-foreground leading-tight">
                  {bookingData.location.formattedAddress}{bookingData.location.buildingDetails ? `, ${bookingData.location.buildingDetails}` : ""}
                </p>
                <p className="text-zinc-500 font-normal text-[11px] mt-0.5">{bookingData.location.city}, {bookingData.location.country}</p>
             </div>
          </div>
        </div>

        {/* Right Column: Checkout Sidebar */}
        <div className="lg:col-span-1">
           <div className="sticky top-8 space-y-4">
              
              <div className="bg-zinc-50 dark:bg-slate-950 p-6 rounded-3xl border border-zinc-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-1.5">
                    <Info size={12} className="text-primary" />
                    Summary
                 </h3>

                 <div className="space-y-3 pb-6 mb-6 border-b border-zinc-200 dark:border-slate-800">
                    <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                       Technician will provide an exact, transparent quote on-site before work.
                    </p>
                    <div className="flex items-center gap-2 p-2.5 bg-emerald-500/3 dark:bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                       <CreditCard size={14} className="text-emerald-500" />
                       <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-tight">On-Site Payment</span>
                    </div>
                 </div>

                 <Button 
                   onClick={handleBooking}
                   disabled={isSubmitting}
                   className="w-full h-12 bg-primary text-white hover:bg-primary/90 rounded-xl font-black text-sm shadow-lg shadow-primary/20 relative z-10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                 >
                   {isSubmitting ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                     </>
                   ) : (
                     <>
                       Confirm Booking
                       <CheckCircle2 size={16} />
                     </>
                   )}
                 </Button>

                 <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Verified Fixora Cloud
                 </div>
              </div>

              {/* Modify Selection */}
              <button 
                onClick={() => router.back()}
                className="w-full h-10 border border-zinc-200 dark:border-slate-800 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-slate-800 transition-colors text-zinc-500"
              >
                <ArrowLeft size={12} />
                Modify Selections
              </button>

           </div>
        </div>
      </div>
    </div>
  );
}
