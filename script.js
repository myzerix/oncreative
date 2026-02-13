const cat = document.getElementById('cat');
const head = document.getElementById('cat-head');
const irises = document.querySelectorAll('.iris');

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const followMouse = (event) => {
  const rect = cat.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;

  const moveX = clamp(dx * 0.045, -15, 15);
  const moveY = clamp(dy * 0.038, -12, 12);
  const tilt = clamp(dx * 0.028, -7, 7);

  head.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${tilt}deg)`;

  const angle = Math.atan2(dy, dx);
  const radius = 7;
  const eyeX = Math.cos(angle) * radius;
  const eyeY = Math.sin(angle) * radius;

  irises.forEach((iris) => {
    iris.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
  });

  const inReachZone = Math.abs(dy) < 180;
  cat.classList.toggle('grab-left', dx < -45 && inReachZone);
  cat.classList.toggle('grab-right', dx > 45 && inReachZone);
};

document.addEventListener('mousemove', followMouse);
