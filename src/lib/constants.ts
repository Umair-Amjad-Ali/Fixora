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
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { slug: "ac", name: "AC Maintenance", icon: "❄️", description: "AC repair, servicing & installation", hasSubTypes: true },
  { slug: "electrical", name: "Electrical", icon: "⚡", description: "Wiring, switches & fixtures", hasSubTypes: false },
  { slug: "plumbing", name: "Plumbing", icon: "🔧", description: "Pipes, leaks & fixtures", hasSubTypes: false },
  { slug: "painting", name: "Painting", icon: "🎨", description: "Interior & exterior painting", hasSubTypes: false },
  { slug: "tile", name: "Tile / Stone Work", icon: "🧱", description: "Tile repair & installation", hasSubTypes: false },
  { slug: "cleaning", name: "Cleaning", icon: "🧹", description: "Deep cleaning & regular cleaning", hasSubTypes: false },
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
  { slug: "window_ac", name: "Window AC", description: "Wall-mounted window units", hasIssues: false },
  { slug: "split_ac", name: "Split AC", description: "Wall-mounted split systems", hasIssues: true },
  { slug: "cassette_ac", name: "Cassette AC", description: "Ceiling-mounted cassette units", hasIssues: false },
  { slug: "package_ac", name: "Package AC", description: "Large floor-standing package units", hasIssues: false },
];

// ==========================================
// AC ISSUES (Split AC for v1)
// ==========================================

export interface IssueOption {
  slug: IssueType;
  label: string;
  description: string;
}

export const AC_ISSUES: IssueOption[] = [
  { slug: "not_cooling", label: "Not Cooling", description: "AC running but not cooling properly" },
  { slug: "gas_leak", label: "Gas Leakage", description: "Refrigerant leak suspected" },
  { slug: "noise", label: "Strange Noise", description: "Unusual sounds from the unit" },
  { slug: "water_leak", label: "Water Leaking", description: "Water dripping from indoor unit" },
  { slug: "not_turning_on", label: "Not Turning On", description: "Unit won't power on" },
  { slug: "others", label: "Others", description: "Describe your issue" },
];

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

export const CATEGORY_ISSUES_MAP: Record<ServiceType, IssueOption[]> = {
  ac: AC_ISSUES,
  electrical: ELECTRICAL_ISSUES,
  plumbing: PLUMBING_ISSUES,
  cleaning: CLEANING_ISSUES,
  painting: PAINTING_ISSUES,
  tile: TILE_ISSUES,
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

export const DEFAULT_BOOKING_DATA = {
  user: { name: "", phone: "", countryCode: "+971", email: "" },
  location: { lat: null, lng: null, formattedAddress: "", buildingDetails: "", city: "", country: "" as const },
  schedule: { preferredDate: "", preferredTimeSlot: "" as const, timeRange: "" },
  service: { serviceType: "" as const, serviceSubType: "" as const, issue: { type: "" as const, label: "", customDescription: "" } },
  currentStep: 1,
};
