'use strict';

function save(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function load() {
    return JSON.parse(localStorage.getItem('messages') || '{}');
}

function draw(messages) {
    document.querySelector('#tasks__list').innerHTML = '';
    for (let key of Object.keys(messages)) {
        const taskElem = document.createElement('div');
        const taskTitle = document.createElement('div');
        const removeBtn = document.createElement('a');

        document.querySelector('#tasks__list').appendChild(taskElem);
        taskElem.appendChild(taskTitle);
        taskElem.appendChild(removeBtn);

        taskElem.classList.add('task');
        taskTitle.classList.add('task__title');
        removeBtn.classList.add('task__remove');

        removeBtn.href = '#';
        removeBtn.text = '×';
        taskTitle.append(`${messages[key]}`);

        removeBtn.addEventListener('click', e => remove(messages, key));
    }
}

function createAndAddNote(messages, text) {
    const lastKey = Object.keys(messages).reduce((acc, x) => Math.max(acc, parseInt(x)), 1);
    const newKey = lastKey + 1;
    messages[newKey] = text;

    save(messages);
    draw(messages);
}

function remove(messages, key) {
    delete messages[key];
    save(messages);
    draw(messages);
}

const messages = load();

draw(messages);

{
    const inputElem = document.querySelector('#task__input');
    inputElem.required = true;
    inputElem.addEventListener('change', e => e.target.value = e.target.value.trim());
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    createAndAddNote(messages, e.target.querySelector('input.tasks__input').value);
    e.target.reset();
});



