"use client";

import React, { useCallback, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { Loader2, AlertTriangle } from "lucide-react";

interface MapComponentProps {
  center: { lat: number; lng: number };
  markerPos: { lat: number; lng: number };
  onMarkerPosChange: (pos: { lat: number; lng: number }) => void;
  language?: "en" | "ar";
}

function MapMarker({
  markerPos,
  onMarkerPosChange,
}: {
  markerPos: { lat: number; lng: number };
  onMarkerPosChange: (pos: { lat: number; lng: number }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (map && markerPos) {
      map.panTo(markerPos);
    }
  }, [map, markerPos]);

  return (
    <AdvancedMarker
      position={markerPos}
      draggable={true}
      onDragEnd={(e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          onMarkerPosChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }
      }}
    >
      <Pin
        background="#000000"
        borderColor="#ffffff"
        glyphColor="#ffffff"
        scale={1.2}
      />
    </AdvancedMarker>
  );
}

function MapContent({ center, markerPos, onMarkerPosChange }: MapComponentProps) {
  const isLoaded = useApiIsLoaded();

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-slate-900">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Initializing Map...</span>
      </div>
    );
  }

  return (
    <Map
      defaultCenter={center}
      defaultZoom={15}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"}
      gestureHandling="greedy"
      disableDefaultUI={true}
      onClick={(e) => {
        if (e.detail.latLng) {
          onMarkerPosChange(e.detail.latLng);
        }
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <MapMarker
        markerPos={markerPos}
        onMarkerPosChange={onMarkerPosChange}
      />
    </Map>
  );
}

export default function MapComponent(props: MapComponentProps) {
  const apiKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "").trim();

  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-slate-900 p-8 text-center text-zinc-500">
        <AlertTriangle className="text-amber-500 mb-2" size={24} />
        <p className="text-xs font-bold uppercase tracking-widest">Maps API Key Missing</p>
      </div>
    );
  }

  return (
    <APIProvider 
      apiKey={apiKey} 
      libraries={['marker', 'maps']}
    >
      <MapContent {...props} />
    </APIProvider>
  );
}
