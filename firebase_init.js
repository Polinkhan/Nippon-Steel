import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3uUpkOPUQhwKLfj3QRpYEsIZBVt7-KoQ",
  authDomain: "filechecker-7eb8a.firebaseapp.com",
  projectId: "filechecker-7eb8a",
  storageBucket: "filechecker-7eb8a.appspot.com",
  messagingSenderId: "1048795703197",
  appId: "1:1048795703197:web:362e75930752d3e039b174",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
