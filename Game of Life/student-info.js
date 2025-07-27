import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

window.submitStudentInfo = function () {
  const name = document.getElementById('student-name').value;
  const age = document.getElementById('student-age').value;
  const dob = document.getElementById('student-dob').value;
  const college = document.getElementById('student-college').value;
  const grade = document.getElementById('student-grade').value;
  const phone = document.getElementById('student-phone').value;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "students", uid);
      await setDoc(docRef, {
        name,
        age,
        dob,
        college,
        grade,
        phone
      });
      alert("Student info saved successfully!");
      window.location.href = 'decider.html?from=newlogin';
    } else {
      alert("User not logged in.");
    }
  });
};