const phrases = [
  "Telecommunications Engineer",
  "IoT & Digital Twin Researcher",
  "Edge-Cloud AI | RAG | Wi-Fi Sensing | SDN"
];

const typedTextElement = document.getElementById("typed-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 75;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Certifications card highlight navigation
  const cards = Array.from(document.querySelectorAll(".cert-card"));
  let activeIndex = 0;

  function highlightCert(idx) {
    cards.forEach((c, i) => {
      c.style.borderColor = i === idx ? "#2563EB" : "#E2E8F0";
    });
  }

  document.getElementById("certNext").addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % cards.length;
    highlightCert(activeIndex);
  });

  document.getElementById("certPrev").addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    highlightCert(activeIndex);
  });
});
