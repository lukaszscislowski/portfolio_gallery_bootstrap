'use strict';
//scroll to top function
const arrow = document.querySelector('.arrow');
let intervalId = 0; 


function scrollSet(){
    if(window.pageYOffset === 0) {
        clearInterval(intervalId)
    }
    window.scroll(0, window.pageYOffset - 50);
}

function scrollTop() {
    intervalId = setInterval(scrollSet, 16.66);
    console.log("klik");
}

arrow.addEventListener('click', scrollTop);



// fade out

function fadeOut(el){
    el.style.opacity = 1;
  
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  
  // fade in
  
  function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";
  
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
  
 function arrowSlide(){
    const siteTop = document.body.scrollTop;
    const pageHeight = document.body.scrollY / 2;
    if (window.pageYOffset < pageHeight ){
      fadeOut(arrow);
    }else {
      fadeIn(arrow); 
    }
 }
  
  window.addEventListener('scroll', arrowSlide);



  // close form-popup

  const close = document.querySelector('.popup-close')
  const newsletter = document.querySelector('.popup-newsletter');
  const btn = document.querySelector('.btn-block-footer');

  function closePopup(e) {
    e.preventDefault()
    if(newsletter.style.display === "block") {
      newsletter.style.display = "none";
    }else {
      newsletter.style.display = "block";
    }
  }

  function openPopup(e) {
    e.preventDefault()
    if(newsletter.style.display === "none") {
      newsletter.style.display = "block";
    }else {
      newsletter.style.display = "none";
    }
  }


  close.addEventListener('click', closePopup);
  btn.addEventListener('click', openPopup);



  