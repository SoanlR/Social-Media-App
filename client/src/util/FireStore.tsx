// src/util/firestore.ts (or firebase.ts)
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1FlXUghKsBXc8M6aWk9zswcVVj0QEdVM",
  authDomain: "socialmediaapp-6da5b.firebaseapp.com",
  projectId: "socialmediaapp-6da5b",
  storageBucket: "socialmediaapp-6da5b.firebasestorage.app",
  messagingSenderId: "536647192749",
  appId: "1:536647192749:web:fda733a8a8859d2ae6b624",
  measurementId: "G-1PJS2QW4YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to Firebase Storage
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
