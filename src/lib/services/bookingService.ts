import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp, increment } from "firebase/firestore";
import { BookingData } from "@/types";

export interface CreateBookingParams {
  userId: string;
  userEmail: string | null;
  bookingData: BookingData;
}

/**
 * Handles the logic for creating a new booking in Firestore and updating user statistics.
 */
export const createBooking = async ({ userId, userEmail, bookingData }: CreateBookingParams) => {
  // 1. Prepare Order Data
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

  // 2. Save to Firestore
  const docRef = await addDoc(collection(db, "orders"), orderData);

  // 3. Update User Stats (e.g., total orders count)
  await updateDoc(doc(db, "users", userId), {
    totalOrders: increment(1)
  });

  return docRef;
};
