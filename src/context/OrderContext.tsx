"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { isSameDay } from "date-fns";

export type Order = {
  id: string;
  userId: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: any;
  service: any;
  schedule: any;
  location: any;
  userDetails: any;
};

interface OrderContextType {
  orders: Order[];
  filteredOrders: Order[];
  fetching: boolean;
  activeTab: string;
  filterDate: string;
  currentPage: number;
  itemsPerPage: number;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setFilterDate: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setFetching(false);
      return;
    }

    setFetching(true);
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders: Order[] = [];
      snapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });

      // Already sorted by Firestore via orderBy("createdAt", "desc")
      setOrders(fetchedOrders);
      setFetching(false);
    }, (error) => {
      console.error("Error in OrderContext listener:", error);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Keep a manual refresh for manual triggers if needed
  const refreshOrders = async () => {
    // This is now less necessary but kept for interface compatibility
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterDate]);

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || 
      (activeTab === "pending" && ["pending", "in_progress"].includes(order.status)) ||
      (activeTab === "completed" && order.status === "completed");
    
    let matchesDate = true;
    if (filterDate && order.createdAt) {
      const orderDate = order.createdAt.toDate ? order.createdAt.toDate() : new Date((order.createdAt?.seconds || 0) * 1000);
      matchesDate = isSameDay(orderDate, new Date(filterDate));
    }

    return matchesTab && matchesDate;
  });

  return (
    <OrderContext.Provider value={{ 
      orders, 
      filteredOrders, 
      fetching, 
      activeTab, 
      filterDate, 
      currentPage,
      itemsPerPage,
      setActiveTab, 
      setFilterDate, 
      setCurrentPage,
      refreshOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
