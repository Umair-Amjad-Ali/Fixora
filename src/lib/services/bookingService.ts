import { db } from "@/lib/firebase";
import { collection, doc, writeBatch, serverTimestamp, increment } from "firebase/firestore";
import { BookingData } from "@/types";

export interface CreateBookingParams {
  userId: string;
  userEmail: string | null;
  bookingData: BookingData;
}

/**
 * Handles the logic for creating a new booking in Firestore and updating user statistics.
 * Uses an atomic batch write — if any part fails, nothing gets committed.
 */
export const createBooking = async ({ userId, userEmail, bookingData }: CreateBookingParams) => {
  const batch = writeBatch(db);

  // 1. Prepare Order Data
  const orderRef = doc(collection(db, "orders"));
  const orderData = {
    userId,
    userEmail,
    userDetails: bookingData.user,
    location: bookingData.location,
    schedule: bookingData.schedule,
    service: bookingData.service,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  batch.set(orderRef, orderData);

  // 2. Update User Stats (atomic with order creation)
  const userRef = doc(db, "users", userId);
  batch.update(userRef, {
    totalOrders: increment(1)
  });

  // 3. Commit both operations atomically
  await batch.commit();

  return orderRef;
};

