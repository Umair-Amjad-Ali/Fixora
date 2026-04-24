import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
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
  title: "Dammam Home Service | Home Services Platform",
  description: "Expert home services and electronics maintenance platform in Dubai and Saudi Arabia.",
};


import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { ClientProviders } from "@/components/providers/ClientProviders";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <OrderProvider>
              <BookingProvider>
                <Header />
                <RegionSelector />
                <main className="min-h-screen">
                  <ClientProviders>
                    {children}
                  </ClientProviders>
                </main>
                <Footer />
              </BookingProvider>
            </OrderProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
