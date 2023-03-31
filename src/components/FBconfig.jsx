import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArd9Cx87AzX8kYLDLrpFN7kYnl_m4Zu0Y",
  authDomain: "rijksmuseum-e5635.firebaseapp.com",
  projectId: "rijksmuseum-e5635",
  storageBucket: "rijksmuseum-e5635.appspot.com",
  messagingSenderId: "831647244635",
  appId: "1:831647244635:web:15996874ea5c4bf5647a7e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };
export { app };
