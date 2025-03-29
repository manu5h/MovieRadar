import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0dx5HntMiZbT2s56EOkua6iVVzt6W4eo",
  authDomain: "movie-radar-b7bc3.firebaseapp.com",
  projectId: "movie-radar-b7bc3",
  storageBucket: "movie-radar-b7bc3.firebasestorage.app",
  messagingSenderId: "131761165117",
  appId: "1:131761165117:web:a896852ad006deb7736b54",
  measurementId: "G-03MTXLH79H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

// ✅ Function to update total (normal) visits
export const updateVisitorCount = async () => {
  const visitRef = doc(db, "analytics", "visits"); // ✅ Correct Firestore reference

  try {
    await setDoc(visitRef, { count: increment(1) }, { merge: true }); // ✅ Merge updates
  } catch (error) {
    console.error("Error updating visit count:", error);
  }
};

// ✅ Function to update unique visits (only once per session)
export const updateUniqueVisitorCount = async () => {
  const visitRef = doc(db, "analytics", "unique_visits"); // ✅ Fixed reference

  // Check if the user has already been counted as a unique visitor
  if (localStorage.getItem("unique_visited")) {
    return; // Exit without increasing count again
  }

  try {
    const visitDoc = await getDoc(visitRef);
    if (visitDoc.exists()) {
      await setDoc(visitRef, { count: increment(1) }, { merge: true });
    } else {
      await setDoc(visitRef, { count: 1 });
    }

    // Store a flag in local storage so the same user isn't counted again
    localStorage.setItem("unique_visited", "true");
  } catch (error) {
    console.error("Error updating unique visit count:", error);
  }
};
