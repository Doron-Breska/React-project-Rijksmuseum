import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOfOG6Tx0gL652QelYZUhXvgu3_2IISwc",
  authDomain: "rijksmuseum-react-project.firebaseapp.com",
  projectId: "rijksmuseum-react-project",
  storageBucket: "rijksmuseum-react-project.appspot.com",
  messagingSenderId: "976236781861",
  appId: "1:976236781861:web:112a92c560742d5636facc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
