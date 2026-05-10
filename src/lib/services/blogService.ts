import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  orderBy, 
  limit 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost } from "@/types";

const BLOGS_COLLECTION = "blogs";

export const blogService = {
  /**
   * Fetch all blog posts
   */
  async getAllPosts(): Promise<BlogPost[]> {
    const q = query(
      collection(db, BLOGS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];
  },

  /**
   * Fetch a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(
      collection(db, BLOGS_COLLECTION),
      where("slug", "==", slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    const docData = querySnapshot.docs[0];
    return {
      id: docData.id,
      ...docData.data()
    } as BlogPost;
  }
};
