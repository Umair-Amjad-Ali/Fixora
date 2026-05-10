import { Timestamp } from "firebase/firestore";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  coverImage?: string;
  metaDescription: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  published: boolean;
}
