'use strict';
const firstForm = document.forms[0];
console.dir(firstForm);

const toggleErrorField = function(field, show) {
    const errorText = field.nextSibling;
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

// document.querySelector("#loadingTest").addEventListener("click", function() {
//     this.classList.add("element-is-busy");
//     this.disabled = true;
// });

form.addEventListener("submit", e => {
    e.preventDefault()


let formErrors = false;

// check fields

for (const el of inputs ) {
    markFieldAsError(el, false);
    toggleErrorField(el, false);

    if (!el.checkValidity()) {
        markFieldAsError(el, true);
        toggleErrorField(el, true)
        formErrors = true;
    }
}

if (!formErrors) {
        const submit = form.querySelector("[type=submit]");
        submit.disabled = true;
        submit.classList.add("elem-is-busy");
        // data send
        const formData = new FormData();
        elements.forEach(el => formData.append(el.name, el.value));

        const url = form.getAttribute("action"); //adress send from action attr
        const method = form.getAttribute("method");  // methdod too

        fetch(url, {
            method: method,
            body: formData
        })
        .then(res => res.json())
        .then(res =>{
            //answer
            if (res.errors) { //błędne pola
                const selectors = res.errors.map(el => `[name="${el}"]`);
                const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
                for (const el of fieldsWithErrors) {
                    markFieldAsError(el, true);
                    toggleErrorField(el, true);
                }
            } else { //pola są ok - sprawdzamy status wysyłki
                if (res.status === "ok") {
                    //wyświetlamy komunikat powodzenia, cieszymy sie
                    const div = document.createElement("div");
                    div.classList.add("form-send-success");
                    div.innerText = "Wysłanie wiadomości się nie powiodło";

                    form.parentElement.insertBefore(div, form);
                    div.innerHTML = `
                        <strong>Wiadomość została wysłana</strong>
                        <span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>
                    `;
                    form.remove();


                }
                if (res.status === "error") {
                    //komunikat błędu, niepowodzenia
                    const statusError = document.querySelector(".send-error");
                    if (statusError) {
                        statusError.remove();
                }
                const div = document.createElement("div");
                div.classList.add("send-error");
                div.innerText = "Wysłanie wiadomości się nie powiodło";
                submit.parentElement.appendChild(div);
            }
        }
        
        }).finally(() =>{ //gdy zakończy się połączenie chcemy włączyć przycisk submit
            submit.disabled = false;
            submit.classList.remove("elem-is-busy")

        });

        }
    
});
