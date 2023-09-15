let tabElementArr = Array.from(document.getElementsByClassName('tab'));
let tabContentArr = Array.from(document.getElementsByClassName('tab__content'));


function switchTab(tabIndex){
    const elContent = tabContentArr[tabIndex];
    const el = tabElementArr[tabIndex];
    for (let i = 0; i < tabElementArr.length && i < tabContentArr.length; i++){
        tabElementArr[i].classList.remove('tab_active');
        tabContentArr[i].classList.remove('tab__content_active');
    }

    el.classList.toggle('tab_active');
    elContent.classList.toggle('tab__content_active');
}


for (let n = 0; n < tabElementArr.length && n < tabContentArr.length; n++){
    const el = tabElementArr[n];
    el.addEventListener('click', () => switchTab(n));
}