let cx = document.querySelector('canvas').getContext('2d');
// cx.fillStyle = 'red';
// cx.fillRect(10, 10, 100, 50);

// cx.strokeStyle = 'blue';
// cx.strokeRect(5, 5, 50, 50);

// cx.strokeStyle = 'black';
// cx.lineWidth = 5;
// cx.strokeRect(120, 5, 50, 50);

// cx.lineWidth = 1;
// cx.beginPath();
// for (let y = 70; y < 250; y += 10) {
//     cx.moveTo(150, y);
//     cx.lineTo(0, y);
// }

// cx.fillStyle = 'black';
// cx.stroke();
// cx.beginPath();
// cx.moveTo(90, 10);
// cx.lineTo(10, 70);
// cx.lineTo(90, 70);
// cx.fill();

// cx.beginPath();
// cx.moveTo(10, 100);
// cx.quadraticCurveTo(60, 10, 100, 100);
// cx.lineTo(60, 10);
// cx.closePath();
// cx.stroke();

// cx.beginPath();
// cx.moveTo(10, 90);
// cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
// cx.lineTo(90, 10);
// cx.lineTo(10, 10);
// cx.closePath();
// cx.stroke();

// cx.beginPath();
// cx.arc(50, 50, 40, 0, 7);
// cx.arc(150, 50, 40, 0, 0.5 * Math.PI);
// cx.stroke();

// Круговая диаграмма
// const results = [
//     {name: 'Удовлетворен', count: 1043, color: 'lightblue'},
//     {name: 'Нормально', count: 563, color: 'lightgreen'},
//     {name: 'Не удовлетворен', count: 510, color: 'pink'},
//     {name: 'Без комментариев', count: 175, color: 'silver'}
// ];

// let total = results.reduce((sum, {count}) => sum + count, 0);
// Начинаем сверху
// let currentAngle = -0.5 * Math.PI;
// for (let result of results) {
//     let sliceAngle = (result.count / total) * 2 * Math.PI;
//     cx.beginPath();
//     // center = 100, 100; radius = 100;
//     // С текущего угла, по часовой стрелке, по размеру каждого сегмента
//     cx.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
//     currentAngle += sliceAngle;
//     cx.lineTo(100, 100);
//     cx.fillStyle = result.color;
//     cx.fill();
// }

// Текст
// cx.font = '28px Georgia';
// cx.fillStyle = 'fuchsia';
// cx.fillText('I can draw text too!', 10, 50);

// Изображения
// let img = document.createElement('img');
// img.src = 'https://pngimg.com/uploads/kebab/kebab_PNG36.png';
// img.addEventListener('load', () => {
//     for (let x = 10; x < 100; x += 50) {
//         cx.drawImage(img, x, 10);
//     }
// });

// // Преобразования
// cx.scale(3, .5);
// cx.beginPath();
// cx.arc(50, 50, 40, 0, 7);
// cx.lineWidth = 3;
// cx.stroke();
