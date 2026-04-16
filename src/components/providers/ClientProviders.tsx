"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const WhatsAppButton = dynamic(() => import("@/components/layout/WhatsAppButton").then(mod => mod.WhatsAppButton), {
  ssr: false
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppButton />
      <Toaster position="top-center" richColors />
    </>
  );
}
