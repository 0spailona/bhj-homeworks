let clickerCounterElement = document.getElementById('clicker__counter');
let cookieElement = document.getElementById('cookie');
let clickerSpeedElement = document.getElementById('clicker__speed');

let clickerCounterValue = parseInt(clickerCounterElement.textContent);

let startLast = new Date();

function changing() {

    if (clickerCounterValue > 0) {
        const clickerSpeedValue = 1000 / (new Date() - startLast);
        clickerSpeedElement.textContent = clickerSpeedValue.toFixed(2);
    }
    clickerCounterValue++;
    clickerCounterElement.textContent = clickerCounterValue.toString();

    if (cookieElement.width === 200) {
        cookieElement.width = 250;
    } else {
        cookieElement.width = 200;
    }
    startLast = new Date();
}

cookieElement.addEventListener('click', changing);