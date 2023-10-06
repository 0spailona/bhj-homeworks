'use strict';

const textSave = load();
const textareaEl = document.querySelector('#editor');
printText();

function printText() {
    textareaEl.value = textSave.text || '';
}

function load() {
    return JSON.parse(localStorage.getItem('textSave') || '{}');
}

function save(textSave) {
    localStorage.setItem('textSave', JSON.stringify(textSave));
}

function addToText(e) {
    textSave.text = e.target.value;
    save(textSave);
}

function clearTextarea() {
    textSave.text = '';
    printText();
    save(textSave);
}

document.querySelector('#editor').addEventListener('input', addToText);
document.querySelector('#clear_button').addEventListener('click', clearTextarea);