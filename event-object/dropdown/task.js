const dropdownListElement = document.getElementsByClassName('dropdown__list')[0];
const dropdownValueElement = document.getElementsByClassName('dropdown__value')[0];
const dropdownLinkArr = Array.from(document.getElementsByClassName('dropdown__link'));

function displaySelectedElement(event) {
    dropdownValueElement.textContent = event.target.textContent;//dropdownValueText;
    dropdownListElement.classList.remove('dropdown__list_active');
    event.preventDefault();
}

function showList() {
    dropdownListElement.classList.toggle('dropdown__list_active');
}

dropdownValueElement.addEventListener('click', showList);

for (let i = 0; i < dropdownLinkArr.length; i++) {
    const selectedElement = dropdownLinkArr[i];
    selectedElement.onclick = displaySelectedElement;
}