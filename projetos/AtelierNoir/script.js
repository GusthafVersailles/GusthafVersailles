/* =========================================================
   Atelier Noir — Luxury Digital Experience
   Arquivo: script.js
   Função: header dinâmico, reveal on scroll, cursor customizado,
   efeito magnetic e parallax controlado.
   ========================================================= */

const header = document.getElementById('siteHeader');
const reveals = document.querySelectorAll('.reveal');
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const magneticItems = document.querySelectorAll('.magnetic');
const parallaxItems = document.querySelectorAll('.parallax');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;
let cursorX = mouseX;
let cursorY = mouseY;
let currentScroll = 0;
let targetScroll = 0;

const isTouch = window.matchMedia('(pointer: coarse)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

function revealOnView() {
  const trigger = window.innerHeight * 0.9;

  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < trigger) {
      element.classList.add('visible');
    }
  });
}

function animateCursor() {
  if (isTouch || reduceMotion || !cursor || !follower) return;

  cursorX += (mouseX - cursorX) * 0.35;
  cursorY += (mouseY - cursorY) * 0.35;
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);
}

function animateParallax() {
  if (window.innerWidth > 1080 || reduceMotion) {
    parallaxItems.forEach((item) => {
      item.style.transform = '';
    });

    requestAnimationFrame(animateParallax);
    return;
  }

  currentScroll += (targetScroll - currentScroll) * 0.08;

  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed || '0.05');
    const rect = item.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * speed;

    item.style.transform = `translate3d(0, ${offset * -0.35}px, 0)`;
  });

  requestAnimationFrame(animateParallax);
}

if (!isTouch && !reduceMotion) {
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener('mouseleave', () => {
    if (!cursor || !follower) return;

    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (!cursor || !follower) return;

    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  magneticItems.forEach((item) => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });

  animateCursor();
}

window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
  updateHeader();
  revealOnView();
}, { passive: true });

window.addEventListener('resize', () => {
  updateHeader();
  revealOnView();

  if (window.innerWidth > 1080) {
    parallaxItems.forEach((item) => {
      item.style.transform = '';
    });
  }
}, { passive: true });

updateHeader();
revealOnView();
animateParallax();
