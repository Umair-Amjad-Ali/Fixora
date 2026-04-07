"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { Hammer, Sparkles, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock sub-services mapping
const SUB_SERVICES: Record<string, { id: string; name: string; description: string; features: string[] }[]> = {
  ac: [
    { id: "general_service", name: "General AC Servicing", description: "Filter cleaning, chemical wash of drain tray, and overall health check.", features: ["30 Day Warranty", "Chemical Wash", "Gas Check"] },
    { id: "ac_repair", name: "AC Repair & Breakdown", description: "Emergency repair for non-cooling, noise, or power issues.", features: ["Express Arrival", "Certified Technicians", "6 Month Warranty"] },
    { id: "duct_cleaning", name: "Duct & Coil Cleaning", description: "Deep sterilization of ducts and sanitization of coils.", features: ["Breathe Clean Air", "Removes Allergens", "2 Year Guarantee"] },
    { id: "installation", name: "New Unit Installation", description: "Professional installation of new AC units with copper piping.", features: ["Certified Installers", "Testing & Balancing", "Full Setup"] },
  ],
  electrical: [
    { id: "lights_fix", name: "Lighting & Fixtures", description: "Repairing or replacing light fixtures, LEDs, dimmers, and switches.", features: ["Safety First", "Material Included Option", "Expert Routing"] },
    { id: "socket_repair", name: "Sockets & Wiring", description: "Fixing burnt sockets and faulty residential wiring.", features: ["DEWA Approved Pros", "Safe Wiring Check"] },
    { id: "db_panel", name: "DB Panel & Breakers", description: "Troubleshooting frequent fuse tripping, overloaded breakers, and main boards.", features: ["Full Diagnostics", "Same Day Fix"] },
  ],
  plumbing: [
    { id: "leakage", name: "Leak Detection & Repair", description: "Fixing visible and hidden leaks in bathrooms, ceilings, or kitchens.", features: ["Advanced Equipment", "No Mess Guaranteed", "Pipe Sealing"] },
    { id: "blockage", name: "Drain & Toilet Unblocking", description: "Removing hair, grease and stubborn blocks from main drains or toilets.", features: ["Immediate Relief", "Hydro Jetting Option"] },
    { id: "heater", name: "Water Heater Service", description: "Repairing thermostat issues, leaks, or replacing faulty water heaters entirely.", features: ["Safety Tested", "Parts Warranty"] },
    { id: "fixtures", name: "Sanitary Installation", description: "Installing or replacing taps, bidets, shower heads, and sinks.", features: ["Precision Fit", "100% Water Tight"] },
  ],
  cleaning: [
    { id: "deep_cleaning", name: "Deep Cleaning & Sanitization", description: "Intensive deep clean for apartments or villas including hard-to-reach areas.", features: ["Eco-Friendly Focus", "Trained Team", "100% Satisfaction"] },
    { id: "regular_cleaning", name: "Standard Maid Service", description: "Regular maintenance cleaning of rooms, dusting, and mopping.", features: ["Flexible Hours", "Background Checked"] },
    { id: "sofa_carpet", name: "Sofa & Carpet Shampoo", description: "Deep extraction shampoo cleaning to remove stains and odors.", features: ["Quick Dry", "Stain Removal"] },
  ],
  painting: [
    { id: "full_interior", name: "Full Home Interior Painting", description: "Fresh coat of premium paint across the entire apartment or villa.", features: ["Premium Paint", "Floor Protection", "Post-Paint Cleanup"] },
    { id: "accent_wall", name: "Accent Wall & Touch-up", description: "Painting specific walls or fixing minor water damage and peeling.", features: ["Quick Turnaround", "Color Matching"] },
    { id: "exterior_paint", name: "Exterior Villa Painting", description: "Weather-resistant coating for villa exteriors.", features: ["Scaffolding Included", "Weatherproof"] },
  ],
  tile: [
    { id: "tile_repair", name: "Tile Repair & Replacement", description: "Replacing cracked or hollow floor and wall tiles seamlessly.", features: ["Seamless Match", "High Quality Mortar"] },
    { id: "regrouting", name: "Grout Cleaning & Regrouting", description: "Removing old, dirty grout and applying fresh waterproofing grout.", features: ["Mold Resistant", "Color Options"] },
    { id: "new_installation", name: "New Tile Installation", description: "Laying fresh porcelain, ceramic or marble tiles.", features: ["Laser Leveling", "Expert Masons"] },
  ],
};

function ServiceTypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookingData, updateService, setCurrentStep } = useBooking();
  
  const initialCategory = searchParams.get("service") || bookingData.service.serviceType;
  const [selectedSub, setSelectedSub] = useState<string>(bookingData.service.serviceSubType || "");

  useEffect(() => {
    setCurrentStep(2);
    if (!initialCategory) {
      router.replace("/book-service/category");
      return;
    }
    if (!bookingData.service.serviceType) {
       updateService({ serviceType: initialCategory as any });
    }
  }, [setCurrentStep, initialCategory, bookingData.service.serviceType, updateService, router]);

  const currentCategory = SERVICE_CATEGORIES.find(c => c.slug === initialCategory) || SERVICE_CATEGORIES[0];
  const subs = SUB_SERVICES[initialCategory] || [];

  const handleNext = () => {
    if (selectedSub) {
      updateService({ serviceSubType: selectedSub as any });
      
      // Conditional logic: If AC, go to AC-Type. Else go to Issues.
      if (initialCategory === "ac") {
        router.push("/book-service/ac-type");
      } else {
        router.push("/book-service/issue");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-left">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
               {currentCategory.icon}
            </div>
            <h2 className="text-2xl font-black">{currentCategory.name}</h2>
        </div>
        <p className="text-sm text-zinc-500 font-medium">Select the specific type of service you require from our experts.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {subs.map((sub, i) => {
            const isSelected = selectedSub === sub.id;
            return (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedSub(sub.id)}
                className={`group flex flex-col md:flex-row md:items-center text-left p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden
                  ${isSelected 
                    ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-[1.01]" 
                    : "bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800 hover:border-primary/40"
                  }
                `}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity ${isSelected ? "opacity-30" : "opacity-0 group-hover:opacity-10"}`} />

                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className={`text-lg font-black ${isSelected ? "text-white" : "text-foreground group-hover:text-primary transition-colors"}`}>
                      {sub.name}
                    </h3>
                    {isSelected && (
                       <div className="bg-white/20 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Selected</div>
                    )}
                  </div>
                  <p className={`text-[13px] mb-3 leading-relaxed ${isSelected ? "text-white/80" : "text-zinc-500 font-medium"}`}>
                    {sub.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                     {sub.features.map((feat, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-[11px] font-bold whitespace-nowrap">
                          <CheckCircle2 size={11} className={isSelected ? "text-white" : "text-primary"} />
                          <span className={isSelected ? "text-white/90" : "text-zinc-400"}>{feat}</span>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="mt-5 md:mt-0 md:ml-6 flex flex-col items-end gap-3 justify-center min-w-[120px]">
                   <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                      ${isSelected ? "bg-white text-primary" : "bg-zinc-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white"}
                   `}>
                      <ChevronRight size={18} className={isSelected ? "" : "group-hover:translate-x-0.5 transition-transform"} />
                   </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Empty state if category not implemented yet in mock */}
        {subs.length === 0 && (
           <div className="py-16 text-center border-2 border-dashed border-zinc-200 dark:border-slate-800 rounded-3xl">
              <Sparkles className="mx-auto mb-4 text-zinc-300" size={40} />
              <h4 className="text-lg font-bold mb-1">Almost Ready!</h4>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto font-medium">Specific options for {currentCategory.name} are coming soon.</p>
              <Button onClick={() => setSelectedSub("custom")} className="mt-6 rounded-full h-12">Custom Quote Request</Button>
           </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="w-full md:w-auto h-12 px-6 rounded-xl font-black text-sm gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <Button 
            size="lg" 
            disabled={!selectedSub}
            onClick={handleNext}
            className="w-full md:w-64 h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all gap-2"
          >
            Continue
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceTypePage() {
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <ServiceTypeContent />
    </Suspense>
  );
}
