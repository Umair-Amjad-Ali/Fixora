"use client";

import React from "react";
import { Hero } from "@/components/landing/Hero";
import { ServicesGrid } from "@/components/landing/ServicesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesShowcase } from "@/components/landing/FeaturesShowcase";
import { PromotionBanner } from "@/components/landing/PromotionBanner";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background">
      <Hero />
      <PromotionBanner />
      <FeaturesShowcase />
      <ServicesGrid />
      <HowItWorks />
    </main>
  );
}
