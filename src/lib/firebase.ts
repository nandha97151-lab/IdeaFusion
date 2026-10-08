// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD10YqoAOY1jp_7OdrNJ-0nLVCcEhBbtWM",
  authDomain: "ldeafusion.firebaseapp.com",
  projectId: "ldeafusion",
  storageBucket: "ldeafusion.firebasestorage.app",
  messagingSenderId: "447512846073",
  appId: "1:447512846073:web:275e49b5c38233a59f0c28",
  measurementId: "G-V4DCSENQ32"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics is only available in browser environments
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
