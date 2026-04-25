"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const testFirebaseConnection = async () => {
    setStatus("loading");
    setMessage("Attempting to connect to Firestore...");

    try {
      // 1. Try to write a test document
      const testCollection = collection(db, "test_connection");
      const docRef = await addDoc(testCollection, {
        timestamp: new Date().toISOString(),
        message: "Hello from DHS!"
      });

      // 2. Try to read the documents back
      const querySnapshot = await getDocs(testCollection);
      const count = querySnapshot.size;

      setStatus("success");
      setMessage(`Firebase is connected successfully! 🎉 (Wrote doc: ${docRef.id}, Total test docs: ${count})`);
    } catch (error: any) {
      console.error("Firebase connection error:", error);
      setStatus("error");
      
      if (error.code === 'permission-denied') {
        setMessage(`Error: Permission Denied. Your Firebase connection works, but your Firestore Database is not strictly in "Test Mode". You need to update your Firestore security rules to allow reads/writes.`);
      } else {
        setMessage(`Error connecting to Firebase: ${error.message}`);
      }
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">🔥 Firebase Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <p className="text-center text-sm text-zinc-500">
              This will test if your Next.js application can successfully communicate with your Firebase Firestore Database.
            </p>
            
            <Button 
              onClick={testFirebaseConnection} 
              isLoading={status === "loading"}
              className="w-full"
            >
              Run Test
            </Button>

            {status !== "idle" && (
              <div className={`p-4 rounded-lg w-full text-sm font-medium ${
                status === "success" ? "bg-secondary/10 text-secondary" :
                status === "error" ? "bg-error/10 text-error" :
                "bg-zinc-100 text-zinc-600 dark:bg-zinc-800"
              }`}>
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
