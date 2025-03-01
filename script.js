'use strict';

///////////////////////////////////////

// alert("This site is not mobile reponsive (coming soon...), switch to Desktop site on your browser to view it")
// Modal window.

const modal = document.querySelector('.modal');
const header = document.querySelector('.header');
const navBar = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMore = document.querySelector('.btn--scroll-to');
const featureSec = document.getElementById('section--1');
const navLinks = document.querySelector('.nav__links');
const tabsBtnContainer = document.querySelector(".operations__tab-container")
const contentContainer = document.querySelectorAll(".operations__content")
const tabs = document.querySelectorAll(".operations__tab")
const slides = document.querySelectorAll(".slide")
const lazyImage = document.querySelectorAll("img[data-src]")
const sections = document.querySelectorAll(".section")


/* modals window */

// open modal
const openModal = function (e) {
  e.target.parentElement.parentElement.scrollIntoView({ behavior: 'smooth' });
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// implement modals
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

// remove modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// remove modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* scroll behavior */

// adding scroll to nav links
navLinks.addEventListener('click', e => {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (id === '#' || !id) return;

  const section = document.querySelector(`${id}`);

  if (!e.target.classList.contains('nav__link')) return;

  if (e.target.classList.contains('nav__link')) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// adding smooth wheb learnmore is click
learnMore.addEventListener('click', () => {
  featureSec.scrollIntoView({ behavior: 'smooth' });
});

/* add sticky to NavBar */

const navHeight = navBar.getBoundingClientRect().height; // get the dynamic height of the navBar

// callback for the header observer
const observeHeader = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add("sticky")
  else navBar.classList.remove("sticky")
};

const headerObserver = new IntersectionObserver(observeHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

/* tapped component on operation section*/

tabsBtnContainer.addEventListener("click",function(e){
  const btn = e.target.closest(".operations__tab")
  
  if(!btn) return

// remove animation from the previous tabs

tabs.forEach(tab => tab.classList.remove("operations__tab--active"))

// hide the previous content
contentContainer.forEach(c => c.classList.remove("operations__content--active"))

// display the coresponding content
  document.querySelector(`.operations__content--${btn.dataset.tab}`).classList.add("operations__content--active");
  
  // animate the clicked tab
  document.querySelector(`.operations__tab--${btn.dataset.tab}`).classList.add("operations__tab--active");
})



/**
 *
 * @param {node} e  the element to be clicked
 * @param {number} opacity  the opacity to change effect on hover
 * @returns return the function if no hover matches the links <a>
 */
function handleHover(e, opacity) {
  const link = e.target;
  if (!link.classList.contains('nav__link')) return;
  const links = link.closest('.nav').querySelectorAll('.nav__link');

  links.forEach(lin => {
    if (lin !== link) lin.style.opacity = opacity;
  });
}

// add hover effect
navBar.addEventListener('mouseover', e => handleHover(e, 0.5));

// remove hover effect
navBar.addEventListener('mouseout', e => handleHover(e, 1));

/*
 * add slider to the testimonial section
 *
 */ 
const slideBntLeft = document.querySelector(".slider__btn--left")
const slideBntRight = document.querySelector(".slider__btn--right")

let currentslide = 0 // init default slide state
let maxSlide = slides.length - 1
let slideTimer;

const goToSlide = (slide) =>{
  slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i  - slide)}%)`)

}
goToSlide(0)



// next slide Function
const nextMove = ()=>{
if (currentslide === maxSlide) {
  currentslide = 0
} else{
  currentslide++
}
  goToSlide(currentslide)
}

const previousMove = ()=>{
if (currentslide === 0) {
  currentslide = maxSlide
} else{
  currentslide--
}
  goToSlide(currentslide)
}

slideTimer = setInterval(nextMove, 10000);

slideBntRight.addEventListener("click", nextMove)
slideBntLeft.addEventListener("click", previousMove)



// add lazyn loading to images
const observeLazyImage = (entries,observer) =>{
  const [entry] = entries
  
  if(entry.isIntersecting){
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener("load", entry.target.classList.remove("lazy-img"))
  }
  // observer.unobserve(entry.target)
}

const imageObserver = new IntersectionObserver(observeLazyImage,{
  root:null,
  threshold:0,
  rootMargin: '200px'
})
lazyImage.forEach((image) => {  
  imageObserver.observe(image)
});


// add animationb to all section

const observeSections =  (entries,observer) =>{
  const [entry] = entries
  
  if(entry.isIntersecting){
  entry.target.classList.remove("section--hidden")
  }
  // observer.unobserve(entry.target)()
}

const sectionsObserver = new IntersectionObserver(observeSections,{
  root:null,
  threshold:0.15,
})

sections.forEach((section) => {  
  sectionsObserver.observe(section)
  section.classList.add("section--hidden")
});
