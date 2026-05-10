import React from "react";
import { blogService } from "@/lib/services/blogService";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);
  
  if (!post) return { title: "Blog Post Not Found" };
  
  return {
    title: `${post.title} | Dammam Home Care`,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background min-h-screen pb-20" dir="ltr">
      {/* Article Header */}
      <header className="relative py-20 md:py-32 bg-[#020617] text-white overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
         
         {/* Decorative Gradients */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

         <div className="container-tight relative z-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 md:mb-12 group text-[10px] md:text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-[1.2] mb-6 md:mb-10 mt-4 md:mt-0">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 md:gap-10 text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-black opacity-50 mb-0.5">Author</p>
                    <p className="text-white font-bold text-sm md:text-base">{post.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-black opacity-50 mb-0.5">Published</p>
                    <p className="text-white font-bold text-sm md:text-base">
                      {post.createdAt ? format(post.createdAt.toDate(), "MMMM dd, yyyy") : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </header>

      {/* Main Content */}
      <div className="container-tight -mt-8 md:-mt-12 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[40px] border border-border/50 shadow-2xl p-6 md:p-16 lg:p-20">
          {post.coverImage && (
            <div className="aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-16 shadow-2xl">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div 
            className="blog-content prose prose-lg md:prose-xl dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground
              prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 md:prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/50
              prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-[1.7] md:prose-p:leading-[1.8] prose-p:mb-6 md:prose-p:mb-8
              prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-li:mb-2
              prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-black
              prose-img:rounded-2xl md:prose-img:rounded-3xl prose-img:shadow-xl
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 md:prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:italic
              marker:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
    </article>
  );
}
