import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1FlXUghKsBXc8M6aWk9zswcVVj0QEdVM",
  authDomain: "socialmediaapp-6da5b.firebaseapp.com",
  projectId: "socialmediaapp-6da5b",
  storageBucket: "socialmediaapp-6da5b.firebasestorage.app",
  messagingSenderId: "536647192749",
  appId: "1:536647192749:web:fda733a8a8859d2ae6b624",
  measurementId: "G-1PJS2QW4YX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, ref, uploadBytes, getDownloadURL };
