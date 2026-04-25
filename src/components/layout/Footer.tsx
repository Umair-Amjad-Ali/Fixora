import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-start rtl:text-right">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-slate-800 bg-white group-hover:scale-105 transition-transform">
                <Image 
                  src="/images/dhc-logo.png" 
                  alt="Dammam Home Care Logo" 
                  width={32} 
                  height={32} 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-bold text-sm">{t("companyName")}</span>
            </Link>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              {t("companyDesc")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("sectionServices")}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>{t("acMaintenance")}</li>
              <li>{t("electrical")}</li>
              <li>{t("plumbing")}</li>
              <li>{t("cleaning")}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("sectionCompany")}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">{t("aboutUs")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">{t("contact")}</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">{t("terms")}</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">{t("privacy")}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("sectionContact")}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <span>🇦🇪</span>
                <span dir="ltr">+966 0569633654</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🇸🇦</span>
                <span dir="ltr">+966 0569633654</span>
              </li>
              <li>dammamhomecarepro@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 order-2 md:order-1">
            &copy; {currentYear} {t("companyName")}. {t("copyright")}
          </p>
          <div className="text-sm font-medium order-1 md:order-2 flex gap-4 text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span>🇦🇪</span>
              <span>{t("dubai")}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span>🇸🇦</span>
              <span>{t("saudiArabia")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
