"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "sonner";
import { Wrench, Loader2, Star, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { user } = useAuth(); // Import useAuth at the top

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password. Please try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return "An error occurred during sign in. Please try again.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Welcome back!");
      router.push(callbackUrl);
    } catch (error: any) {
      console.error("Login error:", error);
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#030712] flex items-center justify-center pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="w-full flex flex-col lg:flex-row rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-slate-800 shadow-2xl bg-white dark:bg-zinc-950">
          
          {/* LEFT: Cinematic Visual Panel (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden items-center justify-center p-10 bg-zinc-950">
            {/* Abstract Glowing Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
              <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-transparent to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full flex flex-col justify-center gap-8 h-full">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight mb-4"
                >
                  Premium Home Services, <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
                    Perfected.
                  </span>
                </motion.h1>
                <p className="text-zinc-400 font-medium text-base leading-relaxed max-w-xs">
                  Manage bookings, track technicians, and access secure payments.
                </p>
              </div>

              {/* Compact Testimonial */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl"
              >
                <p className="text-white text-sm font-medium mb-3 italic leading-relaxed">
                  "Unmatched speed and transparency in Dubai."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <p className="text-white text-xs font-bold">Mohammed K.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Form Panel */}
          <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-10 md:p-12 bg-white dark:bg-[#030712]">
            <div className="w-full max-w-sm mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-black mb-1">Welcome Back</h2>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-8">Sign in to your account</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    {/* Floating Label Email Input */}
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="peer w-full h-14 px-5 bg-transparent border-2 border-zinc-100 dark:border-slate-800 rounded-xl outline-none focus:border-primary transition-colors font-bold text-sm placeholder-transparent"
                        placeholder="Email Address"
                      />
                      <label 
                        htmlFor="email" 
                        className={`absolute left-4 transition-all duration-200 bg-white dark:bg-[#030712] px-1 pointer-events-none font-black uppercase tracking-widest text-zinc-400
                          peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[10px]
                          peer-focus:-top-2 peer-focus:text-[9px] peer-focus:text-primary
                          ${formData.email ? "-top-2 text-[9px] text-zinc-400" : ""}
                        `}
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Floating Label Password Input */}
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="peer w-full h-14 pl-5 pr-12 bg-transparent border-2 border-zinc-100 dark:border-slate-800 rounded-xl outline-none focus:border-primary transition-colors font-bold text-sm placeholder-transparent"
                        placeholder="Password"
                      />
                      <label 
                        htmlFor="password" 
                        className={`absolute left-4 transition-all duration-200 bg-white dark:bg-[#030712] px-1 pointer-events-none font-black uppercase tracking-widest text-zinc-400
                          peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[10px]
                          peer-focus:-top-2 peer-focus:text-[9px] peer-focus:text-primary
                          ${formData.password ? "-top-2 text-[9px] text-zinc-400" : ""}
                        `}
                      >
                        Password
                      </label>
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground transition-colors p-1"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-end">
                    <Link href="#" className="text-[9px] font-black text-primary hover:underline uppercase tracking-widest">
                      Forgot Password?
                    </Link>
                  </div> */}

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-14 text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-xs font-bold text-zinc-500">
                    New to Fixora?{" "}
                    <Link href="/auth/signup" className="text-foreground border-b-2 border-zinc-200 dark:border-slate-800 hover:text-primary hover:border-primary transition-colors pb-0.5">
                      Create Account
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-white dark:bg-[#030712] flex items-center justify-center pt-20 pb-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
