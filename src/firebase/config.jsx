import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "haulway-demo-project.firebaseapp.com",
  projectId: "haulway-demo-project",
  storageBucket: "haulway-demo-project.appspot.com",
  messagingSenderId: "647236193573",
  appId: "1:647236193573:web:f3e74c6e90750dc8a95ecc",
};

export const firebaseOptions = {}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



export default app