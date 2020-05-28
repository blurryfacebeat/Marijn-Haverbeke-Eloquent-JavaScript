const btn = document.createElement('button');
btn.textContent = 'Нажми меня';
document.body.append(btn);

btn.addEventListener('click', function() {
    this.style.backgroundColor = 'green';
    console.log('poof');
});

btn.addEventListener('mousedown', function(event) {
    if (event.button == '0') {
        console.log('Левая кнопка мыши');
    } else if (event.button == '1') {
        console.log('Средняя кнопка мыши');
    } else if (event.button == '2') {
        console.log('Правая кнопка мыши');
    }
});

// Отключаем тригер на нажатие правой кнопки мыши
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// StopPropagation при нажитии на кнопку, не сработает абзац
let para = document.querySelector('p');
let button = document.querySelector('#button');
para.addEventListener('mousedown', () => {
    console.log('Абзац');
});
button.addEventListener('mousedown', (event) => {
    console.log('КНопка');
    event.stopPropagation();
});

document.body.addEventListener('click', (event) => {
    if (event.target.nodeName == 'BUTTON') {
        console.log('Еще один теест');
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key == 'v') {
        document.body.style.backgroundColor = 'yellow';
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key == 'v') {
        document.body.style.backgroundColor = '';
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key == ' ' && event.ctrlKey) {
        console.log('Продолжаем');
    }
});

// Добавляем точку на страницу при каждом нажатии мыши
// window.addEventListener('click', (event) => {
//     let dot = document.createElement('div');
//     dot.className = 'dot';
//     dot.style.left = (event.pageX - 4) + 'px';
//     dot.style.top = (event.pageY - 4) + 'px';
//     document.body.appendChild(dot);
// });

// Перетаскиваем полосу
let lastX; // Отслеживает X-координату мыши
let bar = document.querySelector('#bar');

bar.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
        lastX = event.clientX;
        window.addEventListener('mousemove', moved);
        event.preventDefault(); // Блокируем возможности выделения
    }
});

function moved(event) {
    if (event.buttons == 0) {
        window.removeEventListener('mousemove', moved);
    } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + 'px';
        lastX = event.clientX;
    }
}

// Те же точки, но со смартфона
// function update(event) {
//     for (let dot; dot = document.querySelector("dot2");) {
//         dot.remove();
//     }
//     for (let i = 0; i < event.touches.length; i++) {
//         let {pageX, pageY} = event.touches[i];
//     }
//     let dot2 = document.createElement("dot2");
//     dot.style.left = (pageX - 50) + "рх";
//     dot.style.top = (pageY - 50) + "рх";
//     document.body.appendChild(dot);
//     }
//     window.addEventListener("touchstart", update);
//     window.addEventListener("touchmove", update);
//     window.addEventListener("touchend", update); 
// }

// scroll
// document.body.appendChild(document.createTextNode('aaa'.repeat(1000)));
// const bar2 = document.querySelector('#progress');
// window.addEventListener('scroll', () => {
//     let max = document.body.scrollHeight - innerHeight;
//     bar2.style.width = `${(pageYOffset / max) * 100}%`;
// });

// focus
const help = document.querySelector('#help');
const fields = document.querySelectorAll('input');
for (let field of Array.from(fields)) {
    field.addEventListener('focus', (event) => {
        const text = event.target.getAttribute('data-help');
        help.textContent = text;
    });
    field.addEventListener('blur', (event) => {
        help.textContent = '';
    });
}
