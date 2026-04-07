import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Wrench size={18} />
              </div>
              <span className="font-bold text-lg">Fixora</span>
            </Link>
            <p className="text-sm text-zinc-500 mb-6">
              Expert home services and electronics maintenance platform serving Dubai and Saudi Arabia.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>AC Maintenance</li>
              <li>Electrical</li>
              <li>Plumbing</li>
              <li>Cleaning</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>🇦🇪 +971 800 FIXORA</li>
              <li>🇸🇦 +966 9200 FIXORA</li>
              <li>support@fixora.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} Fixora. All rights reserved.
          </p>
          <div className="text-sm font-medium mt-4 md:mt-0 flex gap-4 text-zinc-400">
            <span>🇦🇪 Dubai</span>
            <span>·</span>
            <span>🇸🇦 Saudi Arabia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
