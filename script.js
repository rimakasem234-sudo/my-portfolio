// 1. Typing Animation matching GitHub Profile
const phrases = [
  "MSc Student in Telecommunications Engineering",
  "IoT & Digital Twin",
  "Edge-Cloud AI | RAG | IoT Security | SDN"
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

  let speed = isDeleting ? 38 : 70;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

// 2. Interactive Animated Network Canvas in Hero Banner
function initNetworkCanvas() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const mouse = { x: null, y: null, radius: 140 };

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const nodeCount = Math.min(65, Math.floor((width * height) / 11000));
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      radius: Math.random() * 2.2 + 1.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Draw node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(147, 197, 253, 0.85)";
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 130) * 0.38})`;
          ctx.lineWidth = 1;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Interactive connection with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mDist / mouse.radius) * 0.7})`;
          ctx.lineWidth = 1.3;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// 3. ScrollSpy for Active Navigation Tab Highlight
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a.nav-item");

  function updateActiveNav() {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // If near bottom of page, activate Contact
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 40) {
      currentSectionId = "contact";
    }

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  initNetworkCanvas();
  initScrollSpy();

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
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
