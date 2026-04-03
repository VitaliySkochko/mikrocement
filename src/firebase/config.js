import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXFBFHY-XAmdy9fSzbBtWjb9_5Xd0IyB4",
  authDomain: "luxmikrocement-8b6da.firebaseapp.com",
  projectId: "luxmikrocement-8b6da",
  storageBucket: "luxmikrocement-8b6da.firebasestorage.app",
  messagingSenderId: "157165179124",
  appId: "1:157165179124:web:0c92a9a961cf48c28d0ea1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);