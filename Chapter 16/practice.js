// 1
function createBalloon(id, size) {
    const div = document.createElement('div');
    div.id = id;
    div.textContent = '🎈';
    div.style.fontSize = `${size}px`;
    return div;
}

const balloon = createBalloon('balloon', 24);
document.body.append(balloon);

function handleArrow() {
    if (parseInt(balloon.style.fontSize) > 50) {
        balloon.textContent = '💥';
        document.body.removeEventListener('keydown', handleArrow);
    }
    if (event.key == 'ArrowUp') {
        balloon.style.fontSize = `${parseInt(balloon.style.fontSize) + (parseInt(balloon.style.fontSize) / 100 * 10)}px`;
    }
    if (event.key == 'ArrowDown') {
        balloon.style.fontSize = `${parseInt(balloon.style.fontSize) - (parseInt(balloon.style.fontSize) / 100 * 10)}px`;
    }
}

document.body.addEventListener('keydown', handleArrow);

//2 
let dots = [];
for (let i = 0; i < 20; i++) {
    let node = document.createElement('div');
    node.className = 'trail';
    document.body.appendChild(node);
    dots.push(node);
}
let currentDot = 0;

window.addEventListener('mousemove', event => {
    let dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + 'px';
    dot.style.top = (event.pageY - 3) + 'px';
    currentDot = (currentDot + 1) % dots.length;
});

// 3
const info = document.querySelector('.info');
const tabs_item = document.querySelectorAll('.tabs__item');
const info_item = document.querySelectorAll('.info__item');

function hideInfo(number) {
    if (number == 0) {
        return;
    }
    for (let i = number - 1; i < info_item.length; i++) {
        info_item[i].style.display = 'none';
    }
}

hideInfo(2);

function showInfo(number) {
    info_item[number].style.display = '';
}

info.addEventListener('click', event => {
    const target = event.target;
    if (target && target.className == 'tabs__item') {
        for (let i = 0; i < tabs_item.length; i++) {
            if (target == tabs_item[i]) {
                hideInfo(1);
                showInfo(i);
                break;
            }
        }
    }
});
