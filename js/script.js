'use strict';
//scroll to top function
const arrow = document.querySelector('.arrow');
let intervalId = 0; 
// let pageHeight = window.height() /2;

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



function showButton() {
    if(pageYOffset > pageHeight) {

    }
}

