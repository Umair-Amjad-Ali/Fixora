"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons in Next.js environment
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  markerPos: { lat: number; lng: number };
  onMarkerPosChange: (pos: { lat: number; lng: number }) => void;
  language?: "en" | "ar";
}

function LocationUpdater({ markerPos, setMarkerPos }: { markerPos: { lat: number; lng: number }, setMarkerPos: any }) {
  const map = useMapEvents({
    click(e: any) {
      setMarkerPos({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Pan to marker if it is changed externally (like from search)
  useEffect(() => {
    if (markerPos) {
      map.flyTo([markerPos.lat, markerPos.lng], 16, { animate: true });
    }
  }, [markerPos, map]);

  return <Marker position={[markerPos.lat, markerPos.lng]} />;
}

export default function MapComponent({ center, markerPos, onMarkerPosChange, language = "en" }: MapComponentProps) {
  // Use CartoDB Voyager for English (better global labels) and standard OSM for local (Arabic) labels
  const tileUrl = language === "en" 
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution = language === "en"
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';

  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={13} 
      scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      <LocationUpdater markerPos={markerPos} setMarkerPos={onMarkerPosChange} />
    </MapContainer>
  );
}
