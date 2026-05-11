import { db } from "@/lib/firebase";
import { collection, doc, writeBatch, serverTimestamp, increment } from "firebase/firestore";
import { BookingData } from "@/types";

export interface CreateBookingParams {
  userId: string;
  userEmail: string | null;
  bookingData: BookingData;
}

export const createBooking = async ({ userId, userEmail, bookingData }: CreateBookingParams) => {
  const batch = writeBatch(db);
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
  const userRef = doc(db, "users", userId);
  batch.update(userRef, {
    totalOrders: increment(1)
  });

  await batch.commit();

  try {
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
    const orderId = orderRef.id;

    await fetch(`${adminApiUrl}/api/notify-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTIFICATION_API_KEY}`
      },
      body: JSON.stringify({
        title: 'New Order Received! 🎉',
        message: `A new booking has been placed by ${bookingData.user.name}.`,
        orderId: orderId
      }),
    });
  } catch (error) {
    console.log('Push notification failed to send, but order was placed:', error);
  }

  return orderRef;
};

