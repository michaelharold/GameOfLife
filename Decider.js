

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Redirect if the page is not accessed from new-login
if (!location.search.includes("from=newlogin")) {
  alert("Unauthorized access. Redirecting...");
  window.location.href = "new-login.html";
}

const firebaseConfig = {
  apiKey: "AIzaSyB6Em8uDp3p_8W1Nf1kMhUH0GTXkInmR2c",
  authDomain: "game-of-life-d0cf4.firebaseapp.com",
  projectId: "game-of-life-d0cf4",
  storageBucket: "game-of-life-d0cf4.firebasestorage.app",
  messagingSenderId: "393447467234",
  appId: "1:393447467234:web:9eafe313c78b8610c856bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


onAuthStateChanged(auth, async (user) => {
  if (!user) {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.error("Anonymous sign-in failed:", err);
      alert("Authentication error.");
    }
  }
});

window.register = function () {
  const field = document.getElementById("field").value.trim();
  const duration = document.getElementById("Duration").value.trim();
  const current = document.getElementById("Current").value.trim();

  if (!field || !duration || !current) {
    alert("Please fill in all fields.");
    return;
  }


  onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        // Store Decider form data in a subcollection: students/{uid}/goals/primary
        const goalRef = doc(db, "students", uid);
        await setDoc(goalRef, {
          field,
          duration,
          current,
          timestamp: new Date()
        }, { merge: true });
        alert(" info saved successfully!");
        window.location.href =  "dashboard.html";
      } else {
        alert("User not logged in.");
      }
    });
  };
  

  