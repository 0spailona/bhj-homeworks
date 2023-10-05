'use strict';

const pollObj = {};

const voteObj = {};


function isStatusSuccessful(status) {
    return Math.trunc(status / 100) === 2;
}

function createVoteObj(allVoteData) {

    for (let ansBtn of document.querySelectorAll('.poll__answer')) {
        ansBtn.style.display = 'none';
    }
    for (let ans of allVoteData.stat) {
        voteObj.answer = ans['answer'];
        voteObj.votes = ans['votes'];
        drawVotes();
    }
}

function drawVotes() {
    const pollAnswers = document.querySelector('#poll__answers');

    const vote = document.createElement('div');
    pollAnswers.appendChild(vote);
    vote.textContent = `${voteObj.answer}: ${voteObj.votes}`;
}

function toGetVotes(e) {
    if (!isStatusSuccessful(e.target.status)) {
        return;
    }

    const allVoteData = JSON.parse(e.target.responseText);
    createVoteObj(allVoteData);
}

//const xhrPost = new XMLHttpRequest();
function onClick(idAnswer, key) {
    alert('Спасибо, ваш голос засчитан!');
    const data = `vote=${key}&answer=${idAnswer}`;
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll', true);
    xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhrPost.addEventListener('load', toGetVotes);
    xhrPost.send(data);
}

function drawItems(key) {
    document.querySelector('#poll__title').textContent = `${pollObj[key].title}`;
    const pollAnswers = document.querySelector('#poll__answers');
    for (let answer of pollObj[key].answers) {
        const idAnswer = pollObj[key].answers.indexOf(answer);
        const ansButton = document.createElement('button');
        pollAnswers.appendChild(ansButton);
        ansButton.classList.add('poll__answer');
        ansButton.textContent = `${answer}`;
        ansButton.addEventListener('click', e => onClick(idAnswer, key));
    }
}

function createPollObj(allPollDate) {
    const key = allPollDate.id;
    pollObj[key] = {
        title: allPollDate.data['title'],
        answers: allPollDate.data['answers'],
    };
    drawItems(key);

}

function toGetPoll(e) {
    if (!isStatusSuccessful(e.target.status)) {
        return;
    }

    const allPollDate = JSON.parse(e.target.responseText);
    createPollObj(allPollDate);
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll', true);
xhr.addEventListener('load', toGetPoll);
xhr.send();
