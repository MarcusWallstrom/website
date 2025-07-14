// Populates captions, handles lightbox display and navigation, and obfuscates email

document.addEventListener('DOMContentLoaded', () => {
  // Email obfuscation for CONTACT page
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const [user, domain] = ['marcus8704', 'gmail.com'];
    emailLink.href = `mailto:${user}@${domain}`;
    emailLink.textContent = `${user}@${domain}`;
  }

  // Gallery and lightbox
  const worksItems = Array.from(document.querySelectorAll('.work-item'));
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = lightbox.querySelector('.lightbox-image');
  const lbInfo     = lightbox.querySelector('.lightbox-info p');
  let currentIndex = 0;

  // Populate gallery captions from data-caption
  worksItems.forEach(item => {
    const caption = item.dataset.caption || '';
    item.querySelector('.info p').innerHTML = caption;
  });

  // Lightbox functions
  function updateLightbox(idx) {
    const item = worksItems[idx];
    lbImg.src   = item.querySelector('img').src;
    lbInfo.innerHTML = item.dataset.caption || '';
  }

  function showLightbox(idx) {
    currentIndex = idx;
    updateLightbox(idx);
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function hideLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Event listeners
  worksItems.forEach((item, i) => {
    item.querySelector('img').addEventListener('click', () => showLightbox(i));
  });
  lightbox.querySelector('.close').addEventListener('click', hideLightbox);
  lightbox.querySelector('.prev').addEventListener('click', () => {
    showLightbox((currentIndex - 1 + worksItems.length) % worksItems.length);
  });
  lightbox.querySelector('.next').addEventListener('click', () => {
    showLightbox((currentIndex + 1) % worksItems.length);
  });

  document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowLeft')  lightbox.querySelector('.prev').click();
    if (e.key === 'ArrowRight') lightbox.querySelector('.next').click();
  });

  // Optional: touch swipe for mobile
  let startX = 0;
  lightbox.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  lightbox.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      if (endX > startX) lightbox.querySelector('.prev').click();
      else              lightbox.querySelector('.next').click();
    }
  });
});