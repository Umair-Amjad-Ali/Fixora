"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Wrench, LogIn, UserPlus, LogOut, LayoutDashboard, ChevronDown, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
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
          <span className="font-black text-2xl tracking-tighter text-foreground">
            FIXORA
          </span>
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
              Services
            </Link>
          </nav>

          <div className="h-6 w-px bg-zinc-200 dark:bg-slate-800 hidden md:block" />

          {/* Auth Actions & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            ) : user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-2xl hover:border-primary/40 transition-all active:scale-95"
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
                      className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-2 z-60"
                    >
                      <div className="px-4 py-3 border-b border-zinc-100 dark:border-slate-900 mb-2">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Account</p>
                        <p className="text-xs font-bold truncate text-foreground">{user.email}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-slate-900 text-foreground transition-colors group"
                      >
                        <User size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-black uppercase tracking-tight">My Profile</span>
                      </Link>
                      <Link 
                        href="/orders" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-slate-900 text-foreground transition-colors group"
                      >
                        <LayoutDashboard size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-black uppercase tracking-tight">My Bookings</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-colors group"
                      >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-black uppercase tracking-tight">Sign Out</span>
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
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="hidden sm:block">
                  <Button size="sm" className="h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-primary/20">
                    <UserPlus size={15} />
                    Sign Up
                  </Button>
                </Link>
              </div>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#030712] border-b border-zinc-200 dark:border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                <Link 
                  href="/#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-black uppercase tracking-widest text-foreground py-2 border-b border-zinc-100 dark:border-slate-900"
                >
                  Services
                </Link>
              </nav>

              {!user && (
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-3">
                      <LogIn size={18} />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 shadow-xl shadow-primary/20">
                      <UserPlus size={18} />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
