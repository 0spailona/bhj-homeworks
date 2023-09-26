'use strict';
window.addEventListener('load', () => {
    let divChangeOpacityArr = document.getElementsByClassName('reveal');

    function changeOpacity() {

        const viewPortHeight = window.innerHeight;
        for (let element of divChangeOpacityArr) {
            const elementBottom = element.getBoundingClientRect().bottom;
            const elementTop = element.getBoundingClientRect().top;
            if (elementBottom < 0 || elementTop > viewPortHeight) {
                element.classList.remove('reveal_active');
            } else {
                element.classList.add('reveal_active');
            }
        }
    }

    window.addEventListener('scroll', changeOpacity);
});