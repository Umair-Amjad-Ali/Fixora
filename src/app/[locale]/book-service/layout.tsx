"use client";

import React, { ReactNode, useEffect, Suspense } from "react";
import { StepProgressBar } from "@/components/booking/StepProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { useTranslations } from "next-intl";

interface BookingLayoutProps {
  children: ReactNode;
}

function BookingLayoutContent({ children }: BookingLayoutProps) {
  const { user, loading } = useAuth();
  const { bookingData } = useBooking();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("bookingLayout");
  const tCommon = useTranslations("common");
  const tServices = useTranslations("constants.services");

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const serviceQuery = searchParams.get("service");
  
  // Logic to determine if we are in an invalid booking state
  const isInvalidState = 
    !loading && 
    user && 
    pathname !== "/book-service/category" && 
    !bookingData.service.serviceType &&
    !(pathname === "/book-service/service-type" && serviceQuery);

  // Guard: If trying to access steps without a selected service, bounce to home safely
  useEffect(() => {
    if (isInvalidState) {
       console.log("Invalid booking state detected, redirecting to home. Path:", pathname);
       router.replace("/");
    }
  }, [isInvalidState, router, pathname]);

  // If invalid, rendering absolutely nothing (a blank background) hides the "flash"
  // of the old booking step while the rewinding chain reaction occurs.
  if (isInvalidState) {
    return <div className="min-h-screen bg-zinc-50 dark:bg-[#030712] fixed inset-0 z-50 pointer-events-none" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not logged in, don't render children (redirect will happen)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#030712] pb-20 overflow-x-hidden">
      {/* Top Banner Decoration */}
      <div className="pt-24 pb-16 bg-zinc-950 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10" />
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-10 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="container-tight relative z-10">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 w-fit group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">{tCommon("backToHome")}</span>
          </Link>
          {(() => {
            const isCategoryStep = pathname === "/book-service/category";
            const selectedCategory = SERVICE_CATEGORIES.find(c => c.slug === bookingData.service.serviceType);
            
            return (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-8">
                {(isCategoryStep || !selectedCategory) 
                  ? t("configureService") 
                  : t("configure", { name: tServices(`${selectedCategory.slug}.name`) })}
              </h1>
            );
          })()}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-12 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl sm:rounded-[2.5rem] shadow-2xl p-4 sm:p-6 md:p-12">
          {/* Progress Section */}
          <div className="mb-10 border-b border-zinc-100 dark:border-slate-800 pb-8">
            <StepProgressBar />
          </div>

          {/* Page Content with Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Support Section Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-8 text-zinc-500 text-sm font-medium">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <span className="text-lg font-black italic">!</span>
             </div>
             <span>{t("urgentHelp")} <span className="text-foreground font-bold" dir="ltr">+971 4 000 0000</span></span>
          </div>
          {/* <div className="flex items-center gap-8">
             <span className="hover:text-primary transition-colors cursor-pointer">Support</span>
             <span className="hover:text-primary transition-colors cursor-pointer">Security Policy</span>
             <span className="hover:text-primary transition-colors cursor-pointer">FAQs</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingLayoutContent>{children}</BookingLayoutContent>
    </Suspense>
  );
}
