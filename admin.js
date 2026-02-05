import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firebase Config (SAME AS WEBSITE)
const firebaseConfig = {
  apiKey: "AIzaSyC10GtF_zwtg9_wVZDUzsbor7X7Ddui6Mo",
  authDomain: "the-queens-beauty-parlour.firebaseapp.com",
  projectId: "the-queens-beauty-parlour",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tableBody = document.getElementById("appointmentsTable");

// 🔽 Fetch appointments
async function loadAppointments() {
  try {
    const q = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    tableBody.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const row = `
        <tr>
          <td>${data.name}</td>
          <td>${data.phone}</td>
          <td>${data.date}</td>
          <td>${data.time}</td>
          <td>${data.service}</td>
          <td>${data.status || "pending"}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
  }
}

loadAppointments();
