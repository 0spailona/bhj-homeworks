'use strict';

let spanArr = document.getElementsByClassName('rotator__case');
let spanIndex = 0;
for (let span of spanArr) {
    span.style.color = span.dataset.color;
}

function rotator2() {

    spanArr[spanIndex].classList.remove('rotator__case_active');

    spanIndex = spanIndex === spanArr.length - 1 ? 0 : spanIndex + 1;

    spanArr[spanIndex].classList.add('rotator__case_active');

    const interval = +(spanArr[spanIndex].dataset.speed || 1000);

    setTimeout(rotator2, interval);
}

 setTimeout(rotator2, 1000);
