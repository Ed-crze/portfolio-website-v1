import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
  projectId: "graceful-system-473712-a1",
  appId: "1:556744244171:web:9c0f41fa5348eaad01544e",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "graceful-system-473712-a1.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-49a9a9e1-a14f-47cd-9b51-8742bcc80997",
  storageBucket: "graceful-system-473712-a1.firebasestorage.app",
  messagingSenderId: "556744244171",
  measurementId: ""
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
