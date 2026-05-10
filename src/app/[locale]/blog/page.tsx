"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { blogService } from "@/lib/services/blogService";
import { BlogPost } from "@/types";
import { format } from "date-fns";

export default function BlogIndexPage() {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-background min-h-screen" dir="ltr">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="container-tight relative z-10 pt-10 pb-0">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group text-[10px] md:text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 md:mb-6 mt-4 md:mt-0 leading-[1.1]">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-20">
        <div className="container-tight">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-3xl mb-6" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full mb-2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group block h-full flex flex-col bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[40px] border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <BookOpen className="text-slate-300" size={48} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                         <span className="text-white font-bold flex items-center gap-2">
                           {t("readMore")} <ArrowRight size={18} />
                         </span>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-[10px] md:text-xs text-slate-400 mb-4 uppercase font-bold tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-primary" />
                          {post.createdAt ? format(post.createdAt.toDate(), "MMM dd, yyyy") : "Recently"}
                        </span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base line-clamp-3 mb-8 flex-1 leading-relaxed">
                        {post.metaDescription}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs md:text-sm font-black text-primary group-hover:gap-4 transition-all uppercase tracking-widest">
                        {t("readMore")}
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">{t("noPosts")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
