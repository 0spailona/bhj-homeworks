'use strict';

const elemsWithTooltipColl = document.querySelectorAll('.has-tooltip');

for (let el of elemsWithTooltipColl) {

    let tooltipElem = document.createElement('div');
    el.insertAdjacentElement("afterbegin", tooltipElem);
    tooltipElem.classList.add('tooltip');
    tooltipElem.textContent = el.title;
    tooltipElem.style.position = 'absolute';
}

const tooltipColl = document.querySelectorAll('.tooltip');

function showTooltip(e) {
    e.preventDefault();
    const el = e.target;
    let tooltipOfTargetEl = el.querySelector('.tooltip');

    for (let tooltip of tooltipColl) {
        if (tooltip.classList.contains('tooltip_active')) {
            tooltip.classList.remove('tooltip_active');
        }
    }
    tooltipOfTargetEl.classList.add('tooltip_active');

    const tooltipRect = tooltipOfTargetEl.getBoundingClientRect();
    const contentRect = el.getBoundingClientRect();

    const position = el.dataset.position;
    switch (position) {
        case 'top':
            tooltipOfTargetEl.style.top = `${contentRect.top - tooltipRect.height}px`;
            tooltipOfTargetEl.style.left = `${contentRect.left}px`;
            break;
        case 'left':
            tooltipOfTargetEl.style.top = `${contentRect.top}px`;
            tooltipOfTargetEl.style.left = `${contentRect.left - tooltipRect.width}px`;
            break;
        case 'right':
            tooltipOfTargetEl.style.top = `${contentRect.top}px`;
            tooltipOfTargetEl.style.left = `${contentRect.left + contentRect.width}px`;
            break;
        default:
            tooltipOfTargetEl.style.top = `${contentRect.bottom}px`;
            tooltipOfTargetEl.style.left = `${contentRect.left}px`;
            break;
    }
}

for (let el of elemsWithTooltipColl) {
    el.addEventListener('click', showTooltip);
}