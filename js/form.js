'use strict';


const toggleErrorField = function(field, show) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if(errorText.classList.contains("form-error-text")) {
            errorText.style.display = show ? "block" : "none";
            errorText.setAttribute('aria-hidden', show);
        }
    }
};

const markFieldAsError = function(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        toggleErrorField(field, false);
    }
};

const form = document.querySelector("#contactForm");
const inputs = form.querySelectorAll("[required]");

form.setAttribute("novalidate", true);
//events

for (const el of inputs) {
    el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}

document.querySelector("#loadingTest").addEventListener("click", function() {
    this.classList.add("element-is-busy");
    this.disabled = true;
});

form.addEventListener("submit", e => {
    e.preventDefault()


let formErrors = false;

// check fields

for (const el of inputs ) {
    markFieldAsError(el, false);
    toggleErrorField(el,false);

    if (!el.checkValidity()) {
        markFieldAsError(el, true);
        toggleErrorField(el.true)
        formErrors = true;
    }
}

if (!formErrors) {
        const submit = form.querySelector("[type=submit]");
        submit.disabled = true;
        submit.classList.add("element-is-busy");
        const formData = new FormData();
        elements.forEach(el => formData.append(el.name, el.value));
}

});
