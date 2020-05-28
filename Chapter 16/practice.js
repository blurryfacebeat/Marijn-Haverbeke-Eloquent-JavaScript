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
