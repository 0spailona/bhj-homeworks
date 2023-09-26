'use strict';

const bigConfig = [
        {
            controlSelector: '.book__control_font-size > .font-size',
            classActive: 'font-size_active',
            bookSelector: '.book',
            bookClassPrefix: 'book_fs-',
            dataParameter: 'size',
        },
        {
            controlSelector: '.book__control_color > .color',
            classActive: 'color_active',
            bookSelector: '.book',
            bookClassPrefix: 'book_color-',
            dataParameter: 'textColor',

        },
        {
            controlSelector: '.book__control_background > .color',
            classActive: 'color_active',
            bookSelector: '.book',
            bookClassPrefix: 'bg_color_',
            dataParameter: 'bgColor',
        }
    ];

function change(e, config) {
    e.preventDefault();
    for (let contr of document.querySelectorAll(config.controlSelector)) {
        contr.classList.remove(config.classActive);
    }
    const control = e.target;
    control.classList.add(config.classActive);
    const parameter = control.dataset[config.dataParameter];


    for (let book of document.querySelectorAll(config.bookSelector)) {
        const removeClasses = (el, start) => [...el.classList].filter(className =>
            className.startsWith(start)).forEach(className => el.classList.remove(className));

        removeClasses(book, `${config.bookClassPrefix}`);
        book.classList.add(`${config.bookClassPrefix}${parameter}`);
    }
}

for (let config of bigConfig) {
    for (let control of document.querySelectorAll(config.controlSelector)) {
        control.addEventListener('click', e => change(e, config));
    }
}

