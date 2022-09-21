let navToggle = document.querySelector(".nav-toggle");
let navMenu = document.querySelector(".header__nav");
navToggle.classList.remove ('nav-toggle--notjs');
navMenu.classList.remove ('header__nav--notjs');
menuToggle()

function menuToggle() {
  document.querySelector(".header__nav").classList.toggle('header__nav--show');
  navToggle.classList.toggle('nav-toggle--close');
  navToggle.classList.toggle('nav-toggle--burger');
}

function openForm() {
  document.querySelector('.modal').classList.add('modal--open-form');
  document.querySelector('.overlay').classList.add('modal--open-form');
  document.querySelector('.overlay').addEventListener('click', closeForm)
}

function closeForm(e) {
  document.querySelector('.modal').classList.remove('modal--open-form');
  document.querySelector('.overlay').classList.remove('modal--open-form');
}
