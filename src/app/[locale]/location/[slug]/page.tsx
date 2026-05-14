import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Settings, 
  Wrench, 
  HelpCircle,
  MessageSquare,
  Zap,
  Droplets,
  Sparkles,
  MapPin,
  PhoneCall
} from "lucide-react";
import { FAQAccordion } from "@/components/services/FAQAccordion";

const VALID_LOCATIONS: string[] = ["dammam", "alkhobar", "aldhahran"];
const VALID_SERVICES: string[] = ["ac", "electrical", "plumbing", "cleaning", "washing_machine", "refrigerator"];

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function LocationDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!VALID_LOCATIONS.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `locationPages.${slug}` });
  const tg = await getTranslations({ locale, namespace: "globalServiceInfo" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tConstants = await getTranslations({ locale, namespace: "constants" });
  
  const sections = t.raw("sections") as { title: string; content: string }[];
  const faqs = t.raw("faqs") as { question: string; answer: string }[];
  const whyPoints = tg.raw("whyChooseUs.points") as { title: string; desc: string }[];
  const howSteps = tg.raw("howItWorks.steps") as { title: string; desc: string }[];

  const isRtl = locale === 'ar';

  return (
    <div className="bg-background min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020617] text-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>
        
        <div className="container-tight relative z-10">
          <div className="max-w-4xl">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-primary transition-all mb-6 group"
            >
              <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all ${isRtl ? 'rotate-180' : ''}`}>
                <ArrowRight size={14} className="rotate-180" />
              </div>
              {tc("backToServices") || "Back to Services"}
            </Link>

            <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 opacity-60">
              <Link href="/" className="hover:text-primary transition-colors">{tc("backToHome")}</Link>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <Link href="/services" className="hover:text-primary transition-colors">{tc("services")}</Link>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-primary">{t("name")}</span>
            </nav>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
              <MapPin size={14} />
              {t("name")}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium mb-12 max-w-2xl">
              {t("description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href="/services" className="w-full sm:w-auto">
                <span className="flex w-full sm:min-w-[260px] justify-center bg-primary text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] items-center gap-3 shadow-2xl shadow-primary/40 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  {tc("exploreServices")}
                  <ArrowRight size={18} className={isRtl ? 'rotate-180' : ''} />
                </span>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <span className="flex w-full sm:min-w-[260px] justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] items-center gap-3 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                  {tc("checkPrices")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-20">
        <div className="container-tight flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 border-s-4 border-primary ps-6 py-2 italic">
                {t("intro")}
              </p>

              <div className="space-y-16">
                {sections.map((section, i) => (
                  <div key={i} className="group">
                    <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      {section.title}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-24">
              <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <HelpCircle size={28} />
                </div>
                {tg("faqTitle")}
              </h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Why Choose Us */}
              <div className="p-8 rounded-4xl bg-zinc-900 text-white overflow-hidden relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-black mb-8 relative z-10">{tg("whyChooseUs.title")}</h3>
                <div className="space-y-6 relative z-10">
                  {whyPoints.map((point, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="text-primary shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{point.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-8 rounded-4xl border border-zinc-200 dark:border-slate-800 bg-zinc-50 dark:bg-slate-900 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-black mb-3">{tg("contactTitle")}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                  {tg("contactDesc")}
                </p>
                <Link href="/contact" className="w-full">
                  <span className="flex w-full bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest justify-center hover:bg-zinc-100 dark:hover:bg-slate-700 transition-colors">
                    {tc("viewDetails")}
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* How it Works - Horizontal */}
      <section className="py-24 bg-zinc-50 dark:bg-slate-950">
        <div className="container-tight">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-center">{tg("howItWorks.title")}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {howSteps.map((step, i) => (
              <div key={i} className="relative group">
                {i < howSteps.length - 1 && (
                  <div className={`hidden md:block absolute top-10 ${isRtl ? 'right-[60%]' : 'left-[60%]'} w-full h-px border-t-2 border-dashed border-zinc-200 dark:border-slate-800 z-0`} />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-3xl flex items-center justify-center text-2xl font-black text-primary shadow-xl group-hover:scale-110 transition-transform duration-500">
                    {i + 1}
                  </div>
                  <h3 className="mt-8 font-black text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24 pt-20">
        <div className="container-tight">
          <div className="bg-zinc-900 dark:bg-zinc-900/50 p-10 md:p-16 rounded-[2.5rem] text-center text-white relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-black mb-10 leading-[1.1] uppercase tracking-tighter">
                {tc("readyToExperience")}
              </h2>
              <Link href="/services">
                <span className="inline-flex bg-primary text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] items-center gap-3 shadow-2xl shadow-primary/40 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  {tc("exploreServices")}
                  <ArrowRight size={18} className={isRtl ? 'rotate-180' : ''} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
