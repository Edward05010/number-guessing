import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBK7LDmXt_hhGR0380bAzmSVRTeBA9Z08o",
  authDomain: "guess-game-multiplayer.firebaseapp.com",
  databaseURL: "https://guess-game-multiplayer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "guess-game-multiplayer",
  storageBucket: "guess-game-multiplayer.appspot.com",
  messagingSenderId: "197395136683",
  appId: "1:197395136683:web:f89b6e0595e3cbf4937ee"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update, onValue };
