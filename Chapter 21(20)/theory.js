// const nums = [1, 5, 7];
// const numsNew = nums.map(num => {
//     return num += 'Гена';
// });

// console.log(nums);
// console.log(numsNew);

// Работа с файлами в Node.JS
const { readFile, readFileSync, writeFile } = require('fs');
readFile('file.txt', 'utf8', (error, text) => {
    if (error) {
        throw error;
    }
    console.log('Содержимое файла:', text);
});

writeFile('file1.txt', 'Гена теперь рыба', error => {
    if (error) {
        console.error(`Не удалось записать файл, ${error}`);
    } else {
        console.log('Файл записан.');
    }
});

readFile('file1.txt', 'utf8', (error, text) => {
    if (error) {
        throw error;
    }
    console.log(`Содержимое файла: ${text}`);
});

console.log('Содержиииимое файла:', readFileSync('file.txt', 'utf8'));

// Запуск http-сервера
const { createServer, request } = require('http');

// let server = createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(`
//         <h1>Привет!</h1>
//         <p>Вы искали <code>${req.url}</code></p>
//     `);
//     res.end();
// });
// server.listen(8000);
// console.log('Начинаю слушать! (port 8000)');

// let requestStream = request({
//     hostname: 'eloquentjavascript.net',
//     path:'/20_node.html',
//     method: 'GET',
//     headers: {Accept: 'text/html'}
// }, res => {
//     console.log('Сервер ответил с кодом состояния', res.statusCode);
// });
// requestStream.end();

// Код, читающий тела запросов и возвращающий их клиенту в виде текста,
// все буквы которого заменены прописными
// createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     req.on('data', chunk => res.write(chunk.toString().toUpperCase()));
//     req.on('end', () => res.end());
// }).listen(8000);

// request({
//     hostname: 'localhost',
//     port: 8000,
//     method: 'POST',
// }, res => {
//     res.on('data', chunk => process.stdout.write(chunk.toString()));
// }).end('Hello server');

// Файловый сервер
const methods = Object.create(null);

createServer((req, res) => {
    let handler = methods[req.method] || notAllowed;
    handler(req)
        .catch(error => {
            if (error.status != null) {
                return error;
            }
            return {
                body: String(error),
                status: 500
            }
        })
        .then(({body, status = 200, type = 'text/plain'}) => {
            res.writeHead(status, {'Content-Type': type});
            if (body && body.pipe) {
                body.pipe(res);
            } else {
                res.end(body);
            }
        });
}).listen(8000);

async function notAllowed(req) {
    return {
        status: 405,
        body: `Метод ${req.method} недопустим.`
    };
}

const { parse } = require('url');
const { resolve, sep } = require('path');

const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw {
            status: 403,
            body: 'Forbidden'
        };
    }
    return path;
}
