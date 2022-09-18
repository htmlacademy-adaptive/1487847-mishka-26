let navToggle = document.querySelector(".nav-toggle");
function menuToggle() {
  document.querySelector(".header__nav").classList.toggle('header__nav--show');
  navToggle.classList.toggle('nav-toggle--close');
  navToggle.classList.toggle('nav-toggle--burger');
}

function openForm() {
  document.querySelector('.modal').classList.add('modal--open-form');
  document.querySelector('.modal__wrapper').classList.add('modal--open-form');
  console.log(123)
  document.querySelector('.modal').addEventListener('click', closeForm)
}

function closeForm(e) {
  console.log("close")
  document.querySelector('.modal').classList.remove('modal--open-form');
  document.querySelector('.modal__wrapper').classList.remove('modal--open-form');
}
