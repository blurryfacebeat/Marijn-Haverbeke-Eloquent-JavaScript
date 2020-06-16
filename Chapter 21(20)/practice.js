// 1
// const { statSync, readdirSync, readFileSync } = require('fs');

const { METHODS } = require('http');
const { stat } = require('fs');

// let searchTerm = new RegExp(process.argv[2]);

// for (let arg of process.argv.slice(3)) {
//     search(arg);
// }

// function search(file) {
//     let stats = statSync(file);
//     if (stats.isDirectory()) {
//         for (let f of readdirync(file)) {
//             search(file + '/' + f);
//         }
//     } else if (searchTerm.test(readFileSync(file, 'utf8'))) {
//         console.log(file);
//     }
// }

// 2
// const { mkdir } = require('fs').promises;

// methods.MKCOL = async function(req) {
//     let path = urlPath(req.url);
//     let stats;
//     try {
//         stats = await stat(path);
//     } catch (error) {
//         if (error.code != 'ENOENT') {
//             throw error;
//         }
//         await mkdir(path);
//         return {
//             status: 204
//         };
//     }
//     if (stats.isDerectory()) {
//         return {
//             status: 204
//         };
//     } else {
//         return {
//             status: 400,
//             body: 'Not a directory'
//         };
//     }
// }
