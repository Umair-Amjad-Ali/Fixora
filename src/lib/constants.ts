import { ServiceType, ACType, IssueType, TimeSlot } from "@/types";

// ==========================================
// SERVICE CATEGORIES
// ==========================================

export interface ServiceCategory {
  slug: ServiceType;
  name: string;
  icon: string;
  description: string;
  hasSubTypes: boolean;
  startingPrice?: number;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { slug: "ac", name: "AC Maintenance", icon: "Wind", description: "Expert servicing, repairs, and deep duct cleaning", hasSubTypes: true, startingPrice: 100 },
  { slug: "washing_machine", name: "Washing Machine", icon: "WashingMachine", description: "Automatic & semi-auto repair", hasSubTypes: false },
  { slug: "refrigerator", name: "Refrigerator", icon: "Refrigerator", description: "Cooling repair & gas refill", hasSubTypes: false,},
  { slug: "electrical", name: "Electrical", icon: "Zap", description: "Wiring, switches & fixtures", hasSubTypes: false, },
  { slug: "plumbing", name: "Plumbing", icon: "Droplets", description: "Pipes, leaks & fixtures", hasSubTypes: false },
  { slug: "painting", name: "Painting", icon: "PaintBucket", description: "Interior & exterior painting", hasSubTypes: false },
  { slug: "tile", name: "Tile / Stone Work", icon: "Square", description: "Tile repair & installation", hasSubTypes: false },
  { slug: "cleaning", name: "Cleaning", icon: "Sparkles", description: "Deep cleaning & regular cleaning", hasSubTypes: false },
  { slug: "contractor", name: "Building Contractor", icon: "HardHat", description: "Civil works & renovations", hasSubTypes: false },
];

// ==========================================
// AC TYPES
// ==========================================

export interface ACTypeOption {
  slug: ACType;
  name: string;
  description: string;
  hasIssues: boolean;
}

export const AC_TYPES: ACTypeOption[] = [
  { slug: "split_ac", name: "Split AC", description: "Standard wall-mounted unit", hasIssues: true },
  { slug: "central_ac", name: "Central Air Conditioning", description: "Duct & ceiling systems", hasIssues: true },
  { slug: "window_ac", name: "Window AC", description: "Wall-mounted window units", hasIssues: true },
];

// ==========================================
// AC ISSUES (Split AC for v1)
// ==========================================

export interface IssueOption {
  slug: IssueType;
  label: string;
  description: string;
  price?: number;
}

// ==========================================
// AC ISSUES BY TYPE (Based on Client Pricing Sheets)
// ==========================================

export const SPLIT_AC_ISSUES: IssueOption[] = [
  { slug: "cleaning", label: "Air Conditioner Cleaning", description: "Professional cleaning of the split unit", price: 89 },
  { slug: "repairing_leaks", label: "Reparing leaks", description: "Fixing water or gas leaks", price: 128 },
  { slug: "full_refill", label: "Cleaning All Units + Freon Refill", description: "Full maintenance and gas refill", price: 170 },
  { slug: "installation", label: "Installing New Air Condiner", description: "New split unit installation", price: 244 },
  { slug: "disassembly_outside", label: "Diassamblya nd Assembly Outsdiie", description: "Relocation outside the property", price: 361 },
  { slug: "board_work", label: "Disassembly and Assembly Elector Board", description: "Electronic board maintenance", price: 146 },
  { slug: "fan_work", label: "Diaammablya nd Assembly an Oytdoor Fan", description: "External fan unit service", price: 156 },
  { slug: "dynamo_change", label: "Changing the External Dymanno", description: "Compressor dynamo replacement", price: 146 },
  { slug: "others", label: "Others / Not Listed", description: "Describe your specific problem (Price quoted on-site)" },
];

export const WINDOW_AC_ISSUES: IssueOption[] = [
  { slug: "cleaning", label: "AC Cleaning", description: "Standard window unit cleaning", price: 55 },
  { slug: "repairing", label: "Reparinig", description: "General window AC repair", price: 150 },
  { slug: "installation", label: "Installing New Air Conditioner", description: "Setup of a new window unit", price: 78 },
  { slug: "disassembly", label: "Disassembly and Assembly (Indoe the Hosue)", description: "Inside house relocation", price: 87 },
  { slug: "drain_cleaning", label: "Drain Cleaning", description: "Fixing clogged water drainage", price: 97 },
  { slug: "dynamo_change", label: "Changing the Dynamo", description: "Unit motor dynamo replacement", price: 113 },
  { slug: "others", label: "Others / Not Listed", description: "Describe your specific problem (Price quoted on-site)" },
];

export const CENTRAL_AC_ISSUES: IssueOption[] = [
  { slug: "cabinet_install", label: "Installations of a Cabnit Air Conditioner", description: "Cabinet unit setup", price: 403 },
  { slug: "board_work", label: "Electronic Board Installation and Removal", description: "PCB board maintenance", price: 250 },
  { slug: "fan_work", label: "Installoling and Removing an Outdoor Fan", description: "External fan unit service", price: 207 },
  { slug: "cassette_install", label: "Cassette Air Condition Installation", description: "Ceiling unit installation", price: 782 },
  { slug: "interior_crystal", label: "Chnage the Split Interior Crystal", description: "Internal cooling element service", price: 230 },
  { slug: "internal_dynamo", label: "Changing the Internal Engine Dynamo", description: "Core motor maintenance", price: 184 },
  { slug: "coil_battery", label: "Changing the Coil - Coil - Battery", description: "Critical coil replacement", price: 104 },
  { slug: "contactor_install", label: "Chaniginh and Installing Contarctir", description: "Electrical contactor service", price: 115 },
  { slug: "others", label: "Others / Not Listed", description: "Describe your specific problem (Price quoted on-site)" },
];

export const AC_TYPE_ISSUES_MAP: Record<string, IssueOption[]> = {
  split_ac: SPLIT_AC_ISSUES,
  window_ac: WINDOW_AC_ISSUES,
  central_ac: CENTRAL_AC_ISSUES,
};

export const AC_ISSUES: IssueOption[] = SPLIT_AC_ISSUES; // Fallback

export const ELECTRICAL_ISSUES: IssueOption[] = [
  { slug: "power_outage", label: "Power Outage", description: "Sudden power trip or loss in home" },
  { slug: "short_circuit", label: "Short Circuit", description: "Burnt smell or visible sparks" },
  { slug: "faulty_socket", label: "Faulty Outlet/Switch", description: "Switches or sockets not working" },
  { slug: "light_fixing", label: "Lighting Issues", description: "Flickering or non-working lights" },
  { slug: "db_trouble", label: "DB / Fuse Panel", description: "Main board tripping or making noise" },
  { slug: "others", label: "Others", description: "Describe your electrical issue" },
];

export const PLUMBING_ISSUES: IssueOption[] = [
  { slug: "water_leakage", label: "Water Leakage", description: "Leaking pipes, faucets or toilets" },
  { slug: "blockage", label: "Drain Blockage", description: "Clogged sink, drain or toilet" },
  { slug: "low_pressure", label: "Low Water Pressure", description: "Weak flow in taps or showers" },
  { slug: "heater_issue", label: "Water Heater", description: "No hot water or heater leaking" },
  { slug: "fixture_install", label: "New Installation", description: "Fit new taps, showers or sinks" },
  { slug: "others", label: "Others", description: "Describe your plumbing issue" },
];

export const CLEANING_ISSUES: IssueOption[] = [
  { slug: "heavy_stains", label: "Heavy Stains", description: "Stubborn dirt or stains on floors and surfaces" },
  { slug: "pet_hair_odor", label: "Pet Hair & Odor", description: "Needs specialized pet odor and hair removal" },
  { slug: "post_construction", label: "Post-Construction Dust", description: "Heavy dust after renovation or painting" },
  { slug: "mold_mildew", label: "Mold & Mildew", description: "Fungus buildup in bathrooms or damp areas" },
  { slug: "move_in_out", label: "Move-In / Move-Out", description: "Thorough sanitization for empty properties" },
  { slug: "others", label: "Others", description: "Describe your cleaning needs" },
];

export const PAINTING_ISSUES: IssueOption[] = [
  { slug: "peeling_paint", label: "Peeling Paint", description: "Paint is chipping, flaking, or peeling off" },
  { slug: "water_damage", label: "Water Damage", description: "Moisture stains, bubbling, or damp walls" },
  { slug: "faded_colors", label: "Faded Colors", description: "Current paint has lost its vibrance" },
  { slug: "wall_cracks", label: "Wall Cracks", description: "Hairline or large cracks needing putty" },
  { slug: "color_change", label: "Color Change", description: "Just looking for a fresh new look" },
  { slug: "others", label: "Others", description: "Describe your painting issue" },
];

export const TILE_ISSUES: IssueOption[] = [
  { slug: "broken_tiles", label: "Broken Tiles", description: "Tiles are physically cracked or chipped" },
  { slug: "loose_tiles", label: "Loose / Hollow", description: "Tiles are popping up or sound hollow" },
  { slug: "missing_grout", label: "Dirty / Missing Grout", description: "The lines between tiles are dirty or empty" },
  { slug: "water_seepage", label: "Water Seepage", description: "Water leaking through the tile joints" },
  { slug: "dull_finish", label: "Dull Finish", description: "Stone or marble has lost its original shine" },
  { slug: "others", label: "Others", description: "Describe your tile/stone issue" },
];

export const WASHING_MACHINE_ISSUES: IssueOption[] = [
  { slug: "not_draining", label: "Not Draining", description: "Water staying in the drum" },
  { slug: "noise", label: "Heavy Noise", description: "Banging or screeching during spin" },
  { slug: "leakage", label: "Water Leakage", description: "Water leaking from bottom or door" },
  { slug: "door_lock", label: "Door Lock Issue", description: "Door won't open or lock properly" },
  { slug: "vibration", label: "Excessive Vibration", description: "Machine moving or shaking wildly" },
  { slug: "others", label: "Others", description: "Describe your washing machine issue" },
];

export const REFRIGERATOR_ISSUES: IssueOption[] = [
  { slug: "not_cooling", label: "Not Cooling", description: "Fridge or freezer not cold enough" },
  { slug: "gas_leak", label: "Gas Leakage", description: "Suspected refrigerant leak" },
  { slug: "noise", label: "Strange Noise", description: "Unusual humming or ticking sounds" },
  { slug: "water_leak", label: "Water Inside", description: "Water pooling at the bottom of the fridge" },
  { slug: "ice_buildup", label: "Excessive Ice", description: "Heavy frost buildup in the freezer" },
  { slug: "others", label: "Others", description: "Describe your refrigerator issue" },
];

export const CONTRACTOR_ISSUES: IssueOption[] = [
  { slug: "civil_works", label: "Civil Works", description: "Concrete, masonry, or structural repairs" },
  { slug: "renovation", label: "Full Renovation", description: "Kitchen, bathroom or home remodeling" },
  { slug: "handyman", label: "General Handyman", description: "Multiple small repairs and fixes" },
  { slug: "interiors", label: "Interior Design", description: "Fit-out and decorative works" },
  { slug: "others", label: "Others", description: "Describe your contracting needs" },
];

export const CATEGORY_ISSUES_MAP: Record<ServiceType, IssueOption[]> = {
  ac: AC_ISSUES,
  electrical: ELECTRICAL_ISSUES,
  plumbing: PLUMBING_ISSUES,
  cleaning: CLEANING_ISSUES,
  painting: PAINTING_ISSUES,
  tile: TILE_ISSUES,
  washing_machine: WASHING_MACHINE_ISSUES,
  refrigerator: REFRIGERATOR_ISSUES,
  contractor: CONTRACTOR_ISSUES,
};

// ==========================================
// SUB SERVICES MAPPING
// ==========================================

export interface SubService {
  id: string;
  name: string;
  description: string;
  features: string[];
  startingPrice?: number;
}

export const SUB_SERVICES_MAP: Record<string, SubService[]> = {
  ac: [
    { id: "general_service", name: "General AC Servicing", description: "Filter cleaning, chemical wash of drain tray, and overall health check.", features: ["30 Day Warranty", "Chemical Wash", "Gas Check"]},
    { id: "ac_repair", name: "AC Repair & Breakdown", description: "Emergency repair for non-cooling, noise, or power issues.", features: ["Express Arrival", "Certified Technicians", "1 Month Warranty"]},
    { id: "duct_cleaning", name: "Duct & Coil Cleaning", description: "Deep sterilization of ducts and sanitization of coils.", features: ["Breathe Clean Air", "Removes Allergens", "1 Month Guarantee"]},
    { id: "installation", name: "New Unit Installation", description: "Professional installation of new AC units with copper piping.", features: ["Certified Installers", "Testing & Balancing", "Full Setup"]},
  ],
  electrical: [
    { id: "lights_fix", name: "Lighting & Fixtures", description: "Repairing or replacing light fixtures, LEDs, dimmers, and switches.", features: ["Safety First", "Material Included Option", "Expert Routing"]},
    { id: "socket_repair", name: "Sockets & Wiring", description: "Fixing burnt sockets and faulty residential wiring.", features: ["DEWA Approved Pros", "Safe Wiring Check"]},
    { id: "db_panel", name: "DB Panel & Breakers", description: "Troubleshooting frequent fuse tripping, overloaded breakers, and main boards.", features: ["Full Diagnostics", "Same Day Fix"]},
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
  washing_machine: [
    { id: "wm_repair", name: "Washing Machine Repair", description: "Fixing drainage, noise, and power issues for automatic machines.", features: ["All Brands Covered", "30 Day Warranty"] },
    { id: "wm_install", name: "Installation & Setup", description: "Professional installation and plumbing connection for new units.", features: ["Testing & Calibration", "Leak-Proof Setup"] },
  ],
  refrigerator: [
    { id: "fridge_repair", name: "Refrigerator Repair", description: "Fixing cooling issues, gas leakage, and compressor problems.", features: ["Certified Gas Refill", "Genuine Parts"]},
    { id: "fridge_service", name: "General Maintenance", description: "Internal cleaning, gasket replacement, and overall performance check.", features: ["Energy Save Check", "Deep Interior Clean"]},
  ],
  contractor: [
    { id: "civil_works", name: "Civil & Structural Works", description: "Concrete repairs, wall removals, and masonry work.", features: ["Engineered Solutions", "Permit Assistance"] },
    { id: "renovation", name: "Full Home Renovation", description: "Complete transformation of your villa or apartment.", features: ["Design Consultation", "End-to-End Management"] },
  ],
};

// ==========================================
// TIME SLOTS
// ==========================================

export interface TimeSlotOption {
  slug: TimeSlot;
  label: string;
  timeRange: string;
  icon: string;
}

export const TIME_SLOTS: TimeSlotOption[] = [
  { slug: "morning", label: "Morning", timeRange: "9:00 AM – 12:00 PM", icon: "☀️" },
  { slug: "afternoon", label: "Afternoon", timeRange: "12:00 PM – 3:00 PM", icon: "🌤️" },
  { slug: "evening", label: "Evening", timeRange: "3:00 PM – 6:00 PM", icon: "🌇" },
  { slug: "night", label: "Night", timeRange: "6:00 PM – 9:00 PM", icon: "🌙" },
];

// ==========================================
// COUNTRY CODES
// ==========================================

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
  phonePrefix: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: "UAE", country: "United Arab Emirates", flag: "🇦🇪", phonePrefix: "+971" },
  { code: "KSA", country: "Saudi Arabia", flag: "🇸🇦", phonePrefix: "+966" },
];

// ==========================================
// STATUS CONFIG
// ==========================================

export const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#F59E0B", bgColor: "#FEF3C7", icon: "🟡" },
  in_progress: { label: "In Progress", color: "#3B82F6", bgColor: "#DBEAFE", icon: "🔵" },
  completed: { label: "Completed", color: "#10B981", bgColor: "#D1FAE5", icon: "🟢" },
  cancelled: { label: "Cancelled", color: "#EF4444", bgColor: "#FEE2E2", icon: "🔴" },
} as const;



// ==========================================
// MAP DEFAULTS
// ==========================================

export const MAP_CENTERS = {
  UAE: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  KSA: { lat: 24.7136, lng: 46.6753, label: "Riyadh" },
} as const;

// ==========================================
// BOOKING STEPS
// ==========================================

export interface BookingStep {
  number: number;
  label: string;
  path: string;
  icon: string;
  conditional?: boolean;
}

export const BOOKING_STEPS: BookingStep[] = [
  { number: 1, label: "Category", path: "/book-service/category", icon: "🛠️" },
  { number: 2, label: "Service", path: "/book-service/service-type", icon: "🔧" },
  { number: 3, label: "AC Type", path: "/book-service/ac-type", icon: "❄️", conditional: true },
  { number: 4, label: "Issue", path: "/book-service/issue", icon: "⚠️", conditional: true },
  { number: 5, label: "Details", path: "/book-service/user-details", icon: "👤" },
  { number: 6, label: "Location", path: "/book-service/location", icon: "📍" },
  { number: 7, label: "Schedule", path: "/book-service/schedule", icon: "📅" },
  { number: 8, label: "Review", path: "/book-service/review-submit", icon: "✅" },
];

// ==========================================
// DEFAULT BOOKING DATA
// ==========================================

// ==========================================
// PRIVACY POLICY CONTENT
// ==========================================

export const PRIVACY_SECTIONS = [
  {
    title: "Data Collection",
    content: "We collect information you provide directly to us, such as when you create an account, book a service, or contact support. This includes your name, email, phone number, and location data required for service delivery."
  },
  {
    title: "How We Use Your Data",
    content: "Your data is used solely to provide and improve Dammam Home care pro's services, including connecting you with technicians, processing bookings, and sending service updates. We do not sell your personal data to third parties."
  },
  {
    title: "Location Privacy",
    content: "Because Dammam Home care pro is a location-based service, we use geolocation data to ensure technicians arrive at the correct address. We only access this data when you are actively using the platform to book or track a service."
  },
  {
    title: "Security Measures",
    content: "We use industry-standard encryption and security protocols to protect your personal information. Our databases are secured following UAE and KSA data protection guidelines."
  },
  {
    title: "Your Rights",
    content: "You have the right to request access to your personal data, ask for corrections, or request deletion of your account and associated data at any time through our app settings or support."
  }
];

// ==========================================
// TERMS OF SERVICE CONTENT
// ==========================================

export const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using the Fixora platform, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions of this agreement, you should not access the website or use any of our services."
  },
  {
    title: "2. Service Scope",
    content: "Fixora provides a platform connecting users with certified home service professionals. While we vet all technicians, the final agreement for work performed is between the user and the professional, backed by our Quality Guarantee."
  },
  {
    title: "3. User Responsibilities",
    content: "Users must provide accurate location and contact information. You are responsible for ensuring that the technician has safe access to the premises at the scheduled time."
  },
  {
    title: "4. Pricing & Payments",
    content: "Final pricing is determined on-site based on the actual scope of work. Payments are made directly to the technician or via the platform as specified during booking. Fixora reserves the right to charge a cancellation fee for appointments cancelled less than 2 hours before the slot."
  },
  {
    title: "5. Region Specifics",
    content: "This agreement is governed by the laws of the United Arab Emirates and the Kingdom of Saudi Arabia, depending on the service location."
  }
];

// ==========================================
// REGIONS
// ==========================================

export const REGIONS = [
  {
    id: "UAE",
    name: "United Arab Emirates",
    description: "Dubai, Abu Dhabi, Sharjah & more",
    currency: "AED",
    icon: "🇦🇪",
    accent: "bg-emerald-500"
  },
  {
    id: "KSA",
    name: "Saudi Arabia",
    description: "Riyadh, Jeddah, Dammam & more",
    currency: "SAR",
    icon: "🇸🇦",
    accent: "bg-emerald-600"
  }
];

export const DEFAULT_BOOKING_DATA = {
  user: { name: "", phone: "", countryCode: "+971", email: "" },
  location: { lat: null, lng: null, formattedAddress: "", buildingDetails: "", city: "", area: "", country: "" as const },
  schedule: { preferredDate: "", preferredTimeSlot: "" as const, timeRange: "" },
  service: { serviceType: "" as const, serviceSubType: "" as const, estimatedPrice: 0, currency: "", issue: { selectedIssues: [], label: "", customDescription: "" } },
  currentStep: 1,
};
