"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/services/bookingService";
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
  Loader2,
  DollarSign,
  ChevronRight
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
      const docRef = await createBooking({
        userId: user.uid,
        userEmail: user.email,
        bookingData,
      });

      toast.success("Order Placed Successfully!", {
        description: `Your technician will arrive soon.`,
      });

      resetBooking();
      
      setTimeout(() => {
        router.replace("/");
      }, 100);
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
                    {bookingData.service.issue?.label && ` • ${bookingData.service.issue.label}`}
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

          {/* Modify Selection Card */}
          <button 
            onClick={() => router.back()}
            className="group w-full p-4 bg-zinc-50 dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-3xl flex items-center justify-between hover:border-primary/50 transition-all active:scale-[0.99]"
          >
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                   <ArrowLeft size={14} />
                </div>
                <div className="text-left">
                   <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400">Changed your mind?</span>
                   <span className="block text-xs font-black text-foreground group-hover:text-primary transition-colors tracking-tight">Modify Your Selections</span>
                </div>
             </div>
             <ChevronRight size={14} className="text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Right Column: Checkout Sidebar */}
        <div className="lg:col-span-1">
           <div className="sticky top-8 space-y-4">
              
              <div className="bg-zinc-50 dark:bg-slate-950 p-6 rounded-3xl border border-zinc-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-1.5">
                    <Info size={12} className="text-primary" />
                    Summary
                 </h3>

                 <div className="space-y-4 pb-6 mb-6 border-b border-zinc-200 dark:border-slate-800">
                    <div className="flex items-center justify-between px-1">
                       <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Est. Starting Price</span>
                       <span className="text-[10px] font-black text-foreground">
                          {bookingData.service.estimatedPrice > 0 
                            ? `${bookingData.service.currency} ${bookingData.service.estimatedPrice}` 
                            : "Not Specified"}
                       </span>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                        <DollarSign size={12} />
                        Pricing Policy
                      </h4>
                      <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        For complex issues, our technician will provide an exact, transparent quote on-site after inspection. Work begins only after your approval.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                       <CreditCard size={14} className="text-emerald-500" />
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-tight">On-Site Payment</span>
                          <span className="text-[9px] text-zinc-400 font-bold">Secure settlement at your doorstep</span>
                       </div>
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


           </div>
        </div>
      </div>
    </div>
  );
}
