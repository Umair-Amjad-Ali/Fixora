import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegionSelector } from "@/components/layout/RegionSelector";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixora | Home Services Platform",
  description: "Expert home services and electronics maintenance platform in Dubai and Saudi Arabia.",
};

import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col">
        <AuthProvider>
          <BookingProvider>
            <Header />
            <RegionSelector />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
