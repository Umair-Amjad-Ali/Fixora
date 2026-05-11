"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  User, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profileUnsub: Unsubscribe | undefined;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        profileUnsub = onSnapshot(docRef, async (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
            setLoading(false);
          } else {
            const creationTime = firebaseUser.metadata.creationTime;
            const now = new Date().getTime();
            const accountAge = creationTime ? now - new Date(creationTime).getTime() : 0;

            if (accountAge > 10000) { 
              toast.error("Admin accounts cannot use the customer app. Please use the Admin Panel.");
              await signOut(auth);
              setUserProfile(null);
            }
            setLoading(false);
          }
        }, (error) => {
          // console.error("Profile listener error:", error);
          toast.error("Error fetching profile data.");
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        if (profileUnsub) profileUnsub();
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (profileUnsub) profileUnsub();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
