import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut,
  User 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Friendly error messages for Firebase Authentication codes.
 */
export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    // Login errors
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    // Signup errors
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please log in instead.";
    case "auth/weak-password":
      return "Your password is too weak. It must be at least 6 characters long.";
    case "auth/operation-not-allowed":
      return "Email/Password sign up is not enabled. Please contact support.";
      
    default:
      return "An error occurred. Please try again.";
  }
};

/**
 * Logic for signing in a user with email and password.
 */
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logic for creating a new user account, updating profile, and creating a Firestore user document.
 */
export const registerUser = async ({ name, email, phone, password }: any) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 1. Update Profile Display Name
  await updateProfile(user, {
    displayName: name,
  });

  // 2. Create User Document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    phone,
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    createdAt: serverTimestamp(),
  });

  // 3. Significance: newly created users are logged in by default in Firebase Client SDK.
  // We opt-out of auto-login for safety or redirect flow if needed.
  return user;
};

/**
 * Logic for signing out the current user.
 */
export const logoutUser = async () => {
  return await signOut(auth);
};
