'use strict';

///////////////////////////////////////

// alert("This site is not mobile reponsive (coming soon...), switch to Desktop site on your browser to view it")
// Modal window.

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMore = document.querySelector(".btn--scroll-to")
const featureSec = document.getElementById("section--1")
const navLinks = document.querySelector(".nav__links")


const openModal = function (e) {
  e.target.parentElement.parentElement.scrollIntoView({behavior: 'smooth'});
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scroll behavior

// adding scroll to nav links
navLinks.addEventListener("click", (e)=>{
  e.preventDefault()
   const id = e.target.getAttribute("href");
   if (id === "#" || !id) return
   
  const section = document.querySelector(`${id}`)
  
  if (!e.target.classList.contains('nav__link')) return
  
  if (e.target.classList.contains('nav__link')){
       section.scrollIntoView({behavior: 'smooth'})
  }
})

// adding smooth wheb learnmore is click
learnMore.addEventListener("click", ()=>{
  featureSec.scrollIntoView({behavior: 'smooth'})
})








