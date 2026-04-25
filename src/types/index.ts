import { Timestamp } from "firebase/firestore";

// ==========================================
// SERVICE REQUEST
// ==========================================

export type ServiceStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type ServiceType = "ac" | "electrical" | "plumbing" | "painting" | "tile" | "cleaning" | "washing_machine" | "refrigerator" | "contractor";
export type ACType = "window_ac" | "split_ac" | "central_ac";
export type IssueType = 
  | "not_cooling" | "gas_leak" | "noise" | "water_leak" | "not_turning_on" 
  | "power_outage" | "short_circuit" | "faulty_socket" | "light_fixing" | "db_trouble"
  | "water_leakage" | "blockage" | "low_pressure" | "heater_issue" | "fixture_install"
  | "heavy_stains" | "pet_hair_odor" | "post_construction" | "mold_mildew" | "move_in_out"
  | "peeling_paint" | "water_damage" | "faded_colors" | "wall_cracks" | "color_change"
  | "broken_tiles" | "loose_tiles" | "missing_grout" | "water_seepage" | "dull_finish"
  | "others" | string;
export type TimeSlot = "morning" | "afternoon" | "evening" | "night";
export type Currency = "AED" | "SAR";
export type Country = "UAE" | "KSA";

export interface UserInfo {
  name: string;
  phone: string;
  email?: string;
  uid?: string;
}

export interface LocationInfo {
  lat: number | null;
  lng: number | null;
  formattedAddress: string;
  buildingDetails?: string;
  city: string;
  country: Country;
}

export interface ScheduleInfo {
  preferredDate: string;
  preferredTimeSlot: TimeSlot;
  timeRange: string;
}

export interface IssueInfo {
  selectedIssues: string[];
  label: string;
  customDescription?: string;
}

export interface TechnicianAssignment {
  id: string;
  name: string;
  phone: string;
}


export interface ActivityLogEntry {
  action: "created" | "assigned" | "status_changed";
  details: string;
  performedBy: "user" | "admin" | "system";
  timestamp: Timestamp;
}

export interface ServiceRequest {
  id: string;
  orderNumber: string;
  user: UserInfo;
  location: LocationInfo;
  serviceType: ServiceType;
  serviceSubType?: ACType;
  issue?: IssueInfo;
  schedule: ScheduleInfo;
  status: ServiceStatus;
  assignedTechnician?: TechnicianAssignment;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  activityLog: ActivityLogEntry[];
}



// ==========================================
// USER
// ==========================================

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpent: number;
  country: Country;
  createdAt: Timestamp;
  lastOrderAt?: Timestamp;
}



// ==========================================
// BOOKING CONTEXT (client-side state)
// ==========================================

export interface BookingData {
  user: {
    name: string;
    phone: string;
    countryCode: string;
    email: string;
  };
  location: {
    lat: number | null;
    lng: number | null;
    formattedAddress: string;
    buildingDetails: string;
    city: string;
    area: string;
    country: Country | "";
  };
  schedule: {
    preferredDate: string;
    preferredTimeSlot: TimeSlot | "";
    timeRange: string;
  };
    service: {
      serviceType: ServiceType | "";
      serviceSubType: ACType | string; 
      estimatedPrice: number;
      currency: string;
      issue: {
        selectedIssues: string[];
        label: string;
        customDescription: string;
      };
    };
  currentStep: number;
}
