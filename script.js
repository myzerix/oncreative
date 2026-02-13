const cat = document.querySelector('.cat');
const head = document.getElementById('cat-head');
const pupils = document.querySelectorAll('.pupil');

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.addEventListener('mousemove', (event) => {
  const rect = cat.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;

  const offsetX = clamp(dx * 0.05, -16, 16);
  const offsetY = clamp(dy * 0.04, -12, 12);
  const tilt = clamp(dx * 0.04, -10, 10);

  head.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${tilt}deg)`;

  const angle = Math.atan2(dy, dx);
  const radius = 8;
  const pupilX = Math.cos(angle) * radius;
  const pupilY = Math.sin(angle) * radius;

  pupils.forEach((pupil) => {
    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });

  cat.classList.toggle('grab-left', dx < -20 && Math.abs(dy) < 160);
  cat.classList.toggle('grab-right', dx > 20 && Math.abs(dy) < 160);
});
