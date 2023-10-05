'use strict';

const currencyData = load();
for (let val of Object.keys(currencyData)) {
    drawItems(val);
}

function isStatusSuccessful(status) {
    return Math.trunc(status / 100) === 2;
}

function load() {
    return JSON.parse(localStorage.getItem('currencyData') || '{}');
}

function save(currencyData) {
    localStorage.setItem('currencyData', JSON.stringify(currencyData));
}

function drawItems(val) {
    const item = document.createElement('div');
    document.querySelector('#items').appendChild(item);
    item.classList.add('item');
    item.innerHTML = `<div class="item__code">
                    ${currencyData[val].code}
                </div>
                <div class="item__value">
                   ${currencyData[val].value}
                </div>
                <div class="item__currency">
                    руб.
                </div>`
}

function createCurrencyData(allDate) {
    for (let val of Object.keys(allDate.response['Valute'])) {
        currencyData[val] = {
            code: allDate.response['Valute'][val]['CharCode'],
            value: allDate.response['Valute'][val]['Value']
        };
        drawItems(val);
    }
    save(currencyData)

}

function funcAfterLoaded(e) {
    if (!isStatusSuccessful(e.target.status)) {
        return;
    }
    document.querySelector('#loader').classList.remove('loader_active');
    const allDate = JSON.parse(e.target.responseText);
    createCurrencyData(allDate);
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true);
xhr.addEventListener('load', funcAfterLoaded);
xhr.send();
