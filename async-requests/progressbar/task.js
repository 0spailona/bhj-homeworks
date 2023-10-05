'use strict';

function makePost(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector('#form'));
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
    xhrPost.setRequestHeader('Content-type', 'multipart/form-data');
    xhrPost.upload.onprogress = function (e) {
        document.querySelector('#progress').value = e.loaded / e.total;
    }
    xhrPost.send(formData);
}

document.querySelector('#form').addEventListener('submit', makePost);

