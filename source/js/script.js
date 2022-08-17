let navToggle = document.querySelector(".nav-toggle");
function menuToggle() {
  document.querySelector(".header__nav").classList.toggle('header__nav--show');
  navToggle.classList.toggle('nav-toggle--close');
  navToggle.classList.toggle('nav-toggle--burger');
}
