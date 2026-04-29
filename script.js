const header = document.querySelector("[data-header]");
const heroImage = document.querySelector("[data-hero-image]");
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const updateHeroDepth = () => {
  if (!heroImage || reduceMotion) return;
  const offset = Math.min(window.scrollY * 0.12, 72);
  heroImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
};

const handleScroll = () => {
  updateHeader();
  updateHeroDepth();
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
