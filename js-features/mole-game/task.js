let getHole = index => document.getElementById(`hole${index}`);
let deadElement = document.getElementById('dead');
let lostElement = document.getElementById('lost');
let deadValue = parseInt(deadElement.textContent);
let lostValue = parseInt(lostElement.textContent);

function displayCounters() {
    deadElement.textContent = deadValue.toString();
    lostElement.textContent = lostValue.toString();
}

function onHoleClick(holeElement) {

    if (holeElement.className.includes('hole_has-mole')) {
        deadValue++;
    } else {
        lostValue++;
    }
    displayCounters();
    setTimeout(stopGame, 1);
}

function stopGame() {
    if (lostValue === 5) {
        window.alert('Вы проиграли');
        deadValue = 0;
        lostValue = 0;
    }
    if (deadValue === 10) {
        window.alert('Вы подбедили');
        lostValue = 0;
        deadValue = 0;
    }
    displayCounters();
}

for (let n = 1; n < 10; n++) {
    const element = getHole(n);
    element.onclick = () => onHoleClick(element);
}

