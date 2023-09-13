'use strict';

let timerElement = document.getElementById('timer');
let timerValue = parseInt(timerElement.textContent);
timerElement.textContent = createDate(timerValue);

let createTimer = function () {
    if (timerValue > 0) {
        timerValue--;
        timerElement.textContent = createDate(timerValue);
        //timerElement.textContent = timerValue.toString();
    }
    if (timerValue > 0) {
        setTimeout(createTimer, 1000);
    } else {
        window.location.href = 'https://developer.mozilla.org/ru/docs/Web/API/Location';
        setTimeout(() => window.alert('«Вы победили в конкурсе»'), 1);
    }
}

setTimeout(createTimer, 1000);

function createDate(timerValue) {
    let ss = (timerValue % 60).toString();
    timerValue = Math.floor(timerValue / 60);
    let mm = (timerValue % 60).toString();
    timerValue = Math.floor(timerValue / 60);
    let hh = timerValue.toString();

    hh = hh.length < 2 ? `0${hh}` : hh;
    mm = mm.length < 2 ? `0${mm}` : mm;
    ss = ss.length < 2 ? `0${ss}` : ss;

    return `${hh}:${mm}:${ss}`;
}




