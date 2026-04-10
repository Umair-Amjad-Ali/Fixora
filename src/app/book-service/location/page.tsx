"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { MapPin, Building, Navigation, ArrowLeft, ArrowRight, Building2, Search, Crosshair, Map as MapIcon, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MAP_CENTERS } from "@/lib/constants";

// Dynamically import Google Maps component to prevent SSR errors and improve initial bundle size
const MapComponent = dynamic(() => import("@/components/booking/MapComponent"), { ssr: false, loading: () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-slate-900 rounded-[2.5rem]">
    <Loader2 className="animate-spin text-primary mb-2" size={32} />
    <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Loading Map Engine...</span>
  </div>
) });

const locationSchema = z.object({
  formattedAddress: z.string().min(10, "Please provide a more detailed address"),
  buildingDetails: z.string().min(2, "Villa/Apartment number is required"),
  city: z.string().min(2, "City is required"),
  area: z.string().optional(),
  country: z.enum(["UAE", "KSA"]),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
});

type LocationFormData = z.infer<typeof locationSchema>;

export default function LocationPage() {
  const router = useRouter();
  const { bookingData, updateLocation, setCurrentStep } = useBooking();
  const activeCountry = bookingData.user.countryCode === "+971" ? "UAE" : "KSA";
  
  const DEFAULT_CENTER = MAP_CENTERS[activeCountry];
  
  const [markerPos, setMarkerPos] = useState<{lat: number, lng: number}>(
    bookingData.location.lat && bookingData.location.lng 
      ? { lat: bookingData.location.lat, lng: bookingData.location.lng } 
      : DEFAULT_CENTER
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapLanguage, setMapLanguage] = useState<"en" | "ar">("en");

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      formattedAddress: bookingData.location.formattedAddress || "",
      buildingDetails: bookingData.location.buildingDetails || "",
      city: bookingData.location.city || DEFAULT_CENTER.label,
      area: bookingData.location.area || "",
      country: activeCountry,
      lat: bookingData.location.lat,
      lng: bookingData.location.lng,
    },
  });

  useEffect(() => {
    setCurrentStep(6);
  }, [setCurrentStep]);

  // Reverse Geocoding using Nominatim (free, no API key needed)
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=${mapLanguage}`,
        { headers: { "User-Agent": "Fixora-App" } }
      );
      const data = await res.json();

      if (data && data.display_name) {
        setValue("formattedAddress", data.display_name);

        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.state || DEFAULT_CENTER.label;
        const area = addr.suburb || addr.neighbourhood || addr.district || "";

        setValue("city", city);
        setValue("area", area);
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  // Handle marker moving on the map (click or drag)
  const handleMarkerChange = (pos: { lat: number; lng: number }) => {
    setMarkerPos(pos);
    setValue("lat", pos.lat);
    setValue("lng", pos.lng);
    reverseGeocode(pos.lat, pos.lng);
  };

  // Search using Nominatim (free, no API key needed)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const query = encodeURIComponent(`${searchQuery}, ${activeCountry}`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&addressdetails=1&accept-language=${mapLanguage}`,
        { headers: { "User-Agent": "Fixora-App" } }
      );
      const data = await res.json();

      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
        toast.error("No locations found.");
      }
    } catch (error) {
      setSearchResults([]);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: any) => {
    const newPos = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    setMarkerPos(newPos);
    setValue("lat", newPos.lat);
    setValue("lng", newPos.lng);
    setValue("formattedAddress", result.display_name);

    const addr = result.address || {};
    const city = addr.city || addr.town || addr.village || addr.state || DEFAULT_CENTER.label;
    const area = addr.suburb || addr.neighbourhood || addr.district || "";
    setValue("city", city);
    setValue("area", area);

    setSearchQuery(result.display_name);
    setSearchResults([]);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.loading("Finding your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        handleMarkerChange(newPos);
        toast.dismiss();
        toast.success("Location found — map updated!");
      },
      () => {
        toast.dismiss();
        toast.error("Unable to retrieve your location. Please check browser permissions.");
      }
    );
  };

  // Re-geocode current marker position when language changes
  useEffect(() => {
    if (markerPos) {
      reverseGeocode(markerPos.lat, markerPos.lng);
    }
  }, [mapLanguage]);


  const onSubmit = (data: LocationFormData) => {
    updateLocation(data);
    router.push("/book-service/schedule");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-left">
        <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg shadow-inner">
               <MapPin size={18} />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Set Location</h2>
        </div>
        <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500 font-medium">Pinpoint exactly where you need our technicians to arrive.</p>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
              <ShieldCheck size={12} /> Google Maps Secure
            </div>
        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-[550px]">
          
          {/* Map Column */}
          <div className="lg:col-span-3 space-y-3">
            
            <div className="relative z-50">
              <div className="relative group">
                <button 
                  type="button"
                  onClick={(e: any) => handleSearch(e)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors hover:scale-110"
                >
                  {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSearch(e as any))}
                  placeholder={mapLanguage === "en" ? "Search for building, villa or street..." : "ابحث عن مبنى، فيلا أو شارع..."}
                  className="w-full h-11 pl-11 pr-40 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-xl shadow-lg outline-none focus:border-primary transition-all font-medium text-sm"
                />
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {/* Language Toggle */}
                  <div className="flex bg-zinc-100 dark:bg-slate-900 p-1 rounded-xl mr-2">
                    <button 
                      type="button"
                      onClick={() => setMapLanguage("en")}
                      className={`px-2 py-0.5 text-[9px] font-black rounded-lg transition-all ${mapLanguage === "en" ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-zinc-500"}`}
                    >
                      EN
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMapLanguage("ar")}
                      className={`px-2 py-0.5 text-[9px] font-black rounded-lg transition-all ${mapLanguage === "ar" ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-zinc-500"}`}
                    >
                      AR
                    </button>
                  </div>

                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={getUserLocation}
                    className="h-9 px-2 text-primary hover:bg-primary/10 font-bold gap-1.5 rounded-xl text-[9px] uppercase tracking-widest"
                  >
                    <Crosshair size={12} /> <span className="hidden sm:inline">Locate</span>
                  </Button>
                </div>
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-14 left-0 right-0 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectSearchResult(res)}
                        className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-slate-900 border-b border-zinc-100 dark:border-slate-800 last:border-0 transition-colors"
                      >
                        <p className="text-[13px] font-bold text-foreground line-clamp-1">{res.display_name}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map Rendering Area */}
            <div className="w-full h-[280px] lg:h-[calc(100%-3.5rem)] rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 group">
              <MapComponent 
                center={DEFAULT_CENTER} 
                markerPos={markerPos} 
                onMarkerPosChange={handleMarkerChange} 
                language={mapLanguage}
              />
              <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-20" />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-zinc-200 dark:border-slate-800 space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Detected Area</label>
                  <p className="font-bold text-sm text-foreground bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-zinc-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                    <span>
                      {watch("city")}
                      {watch("area") && <span className="text-zinc-400 font-medium ml-1.5">/ {watch("area")}</span>}
                    </span>
                    <MapIcon className="text-zinc-300" size={16} />
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Navigation size={12} className="text-primary" />
                    Street / Area Name
                  </label>
                  <textarea
                    {...register("formattedAddress")}
                    className="w-full min-h-[90px] p-3.5 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-2xl outline-none focus:border-primary focus:ring-4 ring-primary/5 transition-all text-[13px] font-medium resize-none shadow-sm"
                    placeholder="E.g. Street 12, Al Barsha 1..."
                  />
                  {errors.formattedAddress && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 text-right">{errors.formattedAddress.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Building2 size={12} className="text-primary" />
                    Villa / Apartment No.
                  </label>
                  <input
                    {...register("buildingDetails")}
                    type="text"
                    className="w-full h-11 px-4 bg-white dark:bg-slate-950 border border-zinc-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary focus:ring-2 ring-primary/5 transition-all font-bold text-sm shadow-sm"
                    placeholder="E.g. Villa 42 / Apt 405"
                  />
                  {errors.buildingDetails && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 text-right">{errors.buildingDetails.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-200 dark:border-slate-800">
                <div className="flex items-center gap-3 p-3.5 bg-primary/5 border border-primary/20 rounded-2xl">
                   <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck size={16} />
                   </div>
                   <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                     Coordinates (<span className="font-bold text-foreground">{markerPos.lat.toFixed(4)}, {markerPos.lng.toFixed(4)}</span>) will be shared securely.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => router.back()}
            className="w-full md:w-auto h-12 px-8 rounded-xl font-black text-sm gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full md:w-64 h-12 text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 transition-all gap-2 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-black"
          >
            Schedule
            <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
