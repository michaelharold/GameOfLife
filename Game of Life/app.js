import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6Em8uDp3p_8W1Nf1kMhUH0GTXkInmR2c",
  authDomain: "game-of-life-d0cf4.firebaseapp.com",
  projectId: "game-of-life-d0cf4",
  storageBucket: "game-of-life-d0cf4.firebasestorage.app",
  messagingSenderId: "393447467234",
  appId: "1:393447467234:web:9eafe313c78b8610c856bb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showPage(pageId) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

window.login = async function () {
  console.log("Login function triggered");
  const email = document.getElementById('login-user').value;
  const password = document.getElementById('login-pass').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const isFirstLogin = user.metadata.creationTime === user.metadata.lastSignInTime;

    if (isFirstLogin) {
      window.location.href = 'new-login.html';
    } else {
      window.location.href = 'dashboard.html';
    }

  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

window.register = async function () {
  console.log("Login function triggered");

  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-pass').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) {
    alert("Passwords don't match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });
    alert("Registered successfully");
    window.location.href = 'index.html';
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
}


document.getElementById('userForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const field = document.getElementById('field').value;
  const duration = document.getElementById('duration').value;
  const level = document.getElementById('level').value;

  const response = await fetch('/generate-quests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field, duration, level })
  });

  const data = await response.json();
  displayQuests(data.quests);
});

function displayQuests(quests) {
  const display = document.getElementById('questsDisplay');
  display.innerHTML = '';
  quests.forEach((q, i) => {
    display.innerHTML += `
      <div class="glass">
        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
        <textarea id="answer-${i}" class="input" rows="2" placeholder="Your answer..."></textarea>
        <button onclick="submitAnswer(${i}, '${q.question}', '${q.expected_answer}')">Submit Answer</button>
        <div id="feedback-${i}"></div>
      </div>`;
  });
}