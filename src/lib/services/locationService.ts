/**
 * Service to handle all location-related operations including geocoding and browser geolocation.
 * Using OpenStreetMap's Nominatim API for free, non-key geocoding.
 */

export interface nominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    suburb?: string;
    neighbourhood?: string;
    district?: string;
    country?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const LocationService = {
  /**
   * Reverse geocoding: coordinates -> address
   */
  async reverseGeocode(lat: number, lng: number, language: string = "en"): Promise<nominatimResult> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=${language}`,
        { headers: { "User-Agent": "Fixora-App" } }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      throw error;
    }
  },

  /**
   * Forward geocoding: search query -> coordinates
   */
  async searchLocation(query: string, countryConstraint: string, language: string = "en"): Promise<nominatimResult[]> {
    try {
      const encodedQuery = encodeURIComponent(`${query}, ${countryConstraint}`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5&addressdetails=1&accept-language=${language}`,
        { headers: { "User-Agent": "Fixora-App" } }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (error) {
      console.error("Search failed:", error);
      throw error;
    }
  },

  /**
   * Browser Geolocation wrapper
   */
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  },

  /**
   * Helper to parse messy Nominatim address objects into our standardized app format
   */
  extractAddressDetails(data: nominatimResult, defaultCity: string = "") {
    const addr = data.address || {};
    return {
      formattedAddress: data.display_name || "",
      city: addr.city || addr.town || addr.village || addr.state || defaultCity,
      area: addr.suburb || addr.neighbourhood || addr.district || "",
    };
  }
};
