'use strict';

// console.log(document.cookie);
const modalEl = document.querySelector('#subscribe-modal');

function showModal() {
    modalEl.classList.toggle('modal_active');
    if (!modalEl.classList.contains('modal_active')) {
        document.cookie = 'modalEl.className=modal; expires=';
    }
}

if (document.cookie.indexOf('modalEl.className') === -1) {
    setTimeout(showModal, 1000);
}


document.querySelector('.modal__close').addEventListener('click', showModal);
