// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementByClassName('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
