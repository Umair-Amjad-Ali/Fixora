"use client";

import React, { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Wrench, LogIn, UserPlus, LogOut, LayoutDashboard, ChevronDown, User, Menu, X, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const locale = useLocale();
  const { user, logout, loading } = useAuth();
  const { bookingData, updateLocation, setRegionModalOpen } = useBooking();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = pathname?.startsWith("/auth");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure menus are closed on navigation or auth state change
  useEffect(() => {
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  }, [pathname, user]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("signedOutSuccess"));
      router.push("/");
    } catch (error) {
      toast.error(t("logoutFailed"));
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        ${scrolled 
          ? "h-20 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-lg border-zinc-200 dark:border-white/10 shadow-sm" 
          : "h-20 bg-transparent border-transparent"
        }
      `}
    >
      <div className="container h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[0.98] active:scale-95">
          <div className="bg-primary text-white p-2 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
            <Wrench size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-black text-2xl tracking-tighter text-foreground leading-none">
              DHCP
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary opacity-80">
              Home Care
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/#services" 
              className={`text-sm font-black uppercase tracking-widest transition-colors
                ${pathname === "/#services" ? "text-primary" : "text-zinc-500 hover:text-foreground"}
              `}
            >
              {t("services")}
            </Link>
            <Link 
              href="/pricing"
              className={`text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-2
                ${pathname === "/pricing" ? "text-primary" : "text-zinc-500 hover:text-foreground"}
              `}
            >
              <Tag size={14} className="text-secondary" />
              {tc("checkPrices") || "Check Prices"}
            </Link>
          </nav>

          <div className="h-6 w-px bg-zinc-200 dark:bg-slate-800 hidden md:block" />

          {/* Auth Actions & Mobile Toggle */}
            <div className="flex items-center gap-2">
            {/* Region Switcher */}
            <button 
              onClick={() => setRegionModalOpen(true)}
              className="hidden lg:flex items-center justify-center gap-1.5 h-10 px-2 lg:px-4 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl hover:border-primary/40 transition-all me-1 lg:me-2 group"
            >
              <span className="text-base lg:text-lg leading-none mt-0.5">{bookingData.location.country === "KSA" ? "🇸🇦" : "🇦🇪"}</span>
              <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-tight lg:tracking-widest text-zinc-500 group-hover:text-primary transition-colors">
                {bookingData.location.country || tc("region")}
              </span>
            </button>

            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {!isAuthPage && (
              loading ? (
                <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              ) : user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1.5 pe-3 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl hover:border-primary/40 transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""}`} />
                  </button>
  
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-3 w-56 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-2 z-60"
                      >
                        <div className="px-4 py-3 border-b border-zinc-100 dark:border-slate-900 mb-2 rtl:text-right">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t("activeAccount")}</p>
                          <p className="text-xs font-bold truncate text-foreground">{user.email}</p>
                        </div>
                        <Link 
                          href="/profile" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-slate-900 text-foreground transition-all group"
                        >
                          <User size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                          <span className="text-sm font-black uppercase tracking-tight flex-1 rtl:text-right">{t("myProfile")}</span>
                        </Link>
                        <Link 
                        href="/orders" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-slate-900 text-foreground transition-all group"
                      >
                        <LayoutDashboard size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-black uppercase tracking-tight flex-1 rtl:text-right">{t("myBookings")}</span>
                      </Link>
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-all group"
                        >
                          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-black uppercase tracking-tight flex-1 rtl:text-right">{tc("signOut")}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login" className="hidden lg:block">
                    <Button variant="ghost" size="sm" className="h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px] gap-2">
                      <LogIn size={15} />
                      {tc("signIn")}
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="hidden sm:block">
                    <Button size="sm" className="h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-primary/20">
                      <UserPlus size={15} />
                      {tc("signUp")}
                    </Button>
                  </Link>
                </div>
              )
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden bg-white dark:bg-[#030712] flex flex-col"
          >
            {/* Mobile Header */}
            <div className={`flex items-center justify-between px-6 h-20 border-b border-zinc-100 dark:border-white/5 ${scrolled ? "bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md" : ""}`}>
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20">
                  <Wrench size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col -gap-1">
                  <span className="font-black text-xl tracking-tighter text-foreground leading-none">DHCP</span>
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-primary opacity-80">Home Care</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-zinc-50 dark:bg-white/5 rounded-2xl text-zinc-500 hover:text-foreground transition-all active:scale-95 border border-zinc-200/50 dark:border-white/5"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
              {/* Profile Section (If Logged In) */}
              {user && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-zinc-100 dark:border-white/5"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-inner">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1.5">{t("activeAccount")}</p>
                      <p className="text-sm font-bold truncate text-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href="/profile" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl hover:border-primary/50 transition-colors"
                    >
                      <User size={14} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t("myProfile")}</span>
                    </Link>
                    <Link 
                      href="/orders" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl hover:border-primary/50 transition-colors"
                    >
                      <LayoutDashboard size={14} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t("myBookings")}</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                <p className="px-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">{tc("menu") || "Menu"}</p>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Link 
                    href="/#services" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group"
                  >
                    <span className="text-base font-black uppercase tracking-wider">{t("services")}</span>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all border border-zinc-100 dark:border-white/5">
                      <ChevronDown size={14} className="-rotate-90 rtl:rotate-90" />
                    </div>
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Link 
                    href="/pricing" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-secondary/10 rounded-xl">
                        <Tag size={18} className="text-secondary" />
                      </div>
                      <span className="text-base font-black uppercase tracking-wider">{tc("checkPrices") || "Prices"}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all border border-zinc-100 dark:border-white/5">
                      <ChevronDown size={14} className="-rotate-90 rtl:rotate-90" />
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Region & Language Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2 mb-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{tc("settings") || "Settings"}</p>
                </div>
                
                <div className="space-y-3">
                  {/* Unified Settings Row for Region */}
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setRegionModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-3xl hover:border-primary/30 transition-all active:scale-[0.98] group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-2xl shadow-sm border border-zinc-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                        {bookingData.location.country === "KSA" ? "🇸🇦" : "🇦🇪"}
                      </div>
                      <div className="flex flex-col text-start">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1.5">{tc("region")}</span>
                        <span className="text-sm font-black text-foreground">{bookingData.location.country}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-zinc-400 border border-zinc-100 dark:border-white/5">
                      <ChevronDown size={14} className="-rotate-90 rtl:rotate-90" />
                    </div>
                  </motion.button>

                  {/* Unified Settings Row for Language */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      const nextLocale = locale === "en" ? "ar" : "en";
                      router.replace(pathname, { locale: nextLocale });
                    }}
                    role="button"
                    tabIndex={0}
                    className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-3xl hover:border-primary/30 transition-all active:scale-[0.98] group cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        const nextLocale = locale === "en" ? "ar" : "en";
                        router.replace(pathname, { locale: nextLocale });
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-sm border border-zinc-100 dark:border-white/5 group-hover:rotate-12 transition-transform duration-500">
                        <Globe size={22} />
                      </div>
                      <div className="flex flex-col text-start">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1.5">{tc("language") || "Language"}</span>
                        <span className="text-sm font-black text-foreground uppercase tracking-widest">
                           {locale === "ar" ? "العربية" : "English"}
                        </span>
                      </div>
                    </div>
                    
                    {/* The switcher indicator - we keep it for visual feedback but make it non-interactive to prevent double bubbling if needed */}
                    <div className="pointer-events-none scale-90 origin-right lg:scale-100">
                       <LanguageSwitcher />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Auth Actions (If Not Logged In) */}
              {!user && !isAuthPage && (
                <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-3 shadow-xl shadow-primary/20 active:scale-95">
                        <UserPlus size={18} />
                        {tc("getStarted") || "Get Started"}
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-3 hover:bg-zinc-100 dark:hover:bg-white/5 active:scale-95">
                        <LogIn size={18} />
                        {tc("signIn")}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              )}


              {/* Logout (If Logged In) */}
              {user && (
                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-black uppercase tracking-widest">{tc("signOut")}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
