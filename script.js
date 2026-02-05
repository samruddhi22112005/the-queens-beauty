/* ================= LIGHTBOX / GALLERY ================= */
const images = [
  "images/bridal1.jpg",
  "images/bridal2.jpg",
  "images/bridal3.jpg",
];

let currentIndex = 0;

window.openLightbox = (index) => {
  currentIndex = index;
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = images[currentIndex];
};

window.closeLightbox = () => {
  document.getElementById("lightbox").style.display = "none";
};

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex];
}

/* Mobile swipe */
let startX = 0;
const lightbox = document.getElementById("lightbox");

if (lightbox) {
  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
  });
}

/* ================= APPOINTMENT FORM SUBMIT ================= */
const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // ❗ prevents page reload

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "http://localhost/beauty-backend/api/book_appointment.php",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.text();

    alert(result);
    form.reset();
  } catch (error) {
    alert("Server error. Please try again.");
    console.error(error);
  }
});

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("http://localhost/beauty-backend/api/book_appointment.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.trim() === "success") {
          alert("Appointment booked successfully!");
          this.reset();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(() => alert("Server error"));
  });
