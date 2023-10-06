'use strict';


const saveId = load();

const logOutBtn = document.createElement('button');
document.querySelector('#welcome').appendChild(logOutBtn);
logOutBtn.textContent = 'Выйти';
logOutBtn.classList.add('btn');
logOutBtn.style.marginLeft = '5%';
logOutBtn.addEventListener('click', logOut);

function load() {
    return JSON.parse(localStorage.getItem('saveId') || '{}');
}

if (!saveId.userId) {
    drawSignInCard();
} else {
    drawWelcomeCard();
}

function save(saveId) {
    localStorage.setItem('saveId', JSON.stringify(saveId));
}

function drawSignInCard() {
    document.querySelector('#signin').classList.add('signin_active');
    document.querySelector('#welcome').classList.remove('welcome_active');
}

function logOut() {
    delete saveId.userId;
    save(saveId);
    drawSignInCard();
}


function drawWelcomeCard() {
    document.querySelector('#signin').classList.remove('signin_active');
    document.querySelector('#welcome').classList.add('welcome_active');
    document.querySelector('#user_id').textContent = saveId.userId;
}

function saveData(e) {
    const answer = JSON.parse(e.target.responseText);
    for (let control of document.querySelectorAll('.control')) {
        control.value = '';
    }
    if (!answer['success']) {
        alert('Неверный логин/пароль');
    } else {
        saveId.userId = answer['user_id'];
        save(saveId);
        drawWelcomeCard();
    }
}

function sendData(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth', true);
    xhrPost.addEventListener('load', saveData);
    xhrPost.send(data);
}

for (let control of document.querySelectorAll('.control')) {
    control.required = true;
}

document.querySelector('#signin__form').addEventListener('submit', sendData);