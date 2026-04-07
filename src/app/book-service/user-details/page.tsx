"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { COUNTRY_CODES } from "@/lib/constants";
import { User, Mail, Phone, ArrowRight, ShieldCheck } from "lucide-react";

const detailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number").max(15, "Invalid phone number"),
  countryCode: z.string(),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

export default function UserDetailsPage() {
  const router = useRouter();
  const { bookingData, updateUser, setCurrentStep } = useBooking();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: bookingData.user.name,
      email: bookingData.user.email,
      phone: bookingData.user.phone,
      countryCode: bookingData.user.countryCode || "+971",
    },
    mode: "onChange",
  });

  const selectedCountryCode = watch("countryCode");

  useEffect(() => {
    setCurrentStep(5);
  }, [setCurrentStep]);

  const onSubmit = (data: DetailsFormValues) => {
    updateUser(data);
    router.push("/book-service/location");
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8 text-left">
        <h2 className="text-2xl font-black mb-1">Customer Details</h2>
        <p className="text-sm text-zinc-500 font-medium">Basic info for your booking updates.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <User size={12} className="text-primary" />
              Full Name
            </label>
            <div className="relative group">
              <input
                {...register("name")}
                placeholder="Ex. John Doe"
                className={`w-full h-12 px-4 bg-zinc-50 dark:bg-slate-950 border rounded-xl outline-none transition-all duration-300 font-medium text-sm
                  ${errors.name ? "border-red-500 focus:ring-1 ring-red-500" : "border-zinc-200 dark:border-slate-800 focus:border-primary focus:ring-2 ring-primary/5"}
                `}
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.name.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Mail size={12} className="text-primary" />
              Email Address
            </label>
            <div className="relative group">
              <input
                {...register("email")}
                placeholder="Ex. john@example.com"
                className={`w-full h-12 px-4 bg-zinc-50 dark:bg-slate-950 border rounded-xl outline-none transition-all duration-300 font-medium text-sm
                  ${errors.email ? "border-red-500 focus:ring-1 ring-red-500" : "border-zinc-200 dark:border-slate-800 focus:border-primary focus:ring-2 ring-primary/5"}
                `}
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Phone Number with Region Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
            <Phone size={12} className="text-primary" />
            Phone Number
          </label>
          <div className="flex gap-2.5">
            <div className="relative w-24 shrink-0">
              <select
                {...register("countryCode")}
                className="w-full h-12 pl-3 pr-8 bg-zinc-50 dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-xl outline-none appearance-none font-bold text-sm focus:border-primary transition-all cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.phonePrefix}>
                    {c.flag} {c.phonePrefix}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <ArrowRight size={12} className="rotate-90" />
              </div>
            </div>
            <div className="flex-1">
              <input
                {...register("phone")}
                placeholder="5X XXX XXXX"
                className={`w-full h-12 px-4 bg-zinc-50 dark:bg-slate-950 border rounded-xl outline-none transition-all duration-300 font-medium text-sm
                  ${errors.phone ? "border-red-500 focus:ring-1 ring-red-500" : "border-zinc-200 dark:border-slate-800 focus:border-primary focus:ring-2 ring-primary/5"}
                `}
              />
              {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col items-center gap-4">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            disabled={!isValid}
          >
            Continue to Location
            <ArrowRight size={16} />
          </Button>

          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure & Encrypted
          </div>
        </div>
      </form>
    </div>
  );
}
