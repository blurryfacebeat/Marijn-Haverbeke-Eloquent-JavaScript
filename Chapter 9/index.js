// Теория
let re1 = new RegExp('abc');
let re2 = /abc/;
let nineteenPlus = /nineteen\+/;
console.log(/abc/.test('abxcde'));
console.log(/abc/.test('abcde'));
// indexOf работает так же
const text = 'sabcfg';
console.log(text.indexOf('asbc'));
// Содержит в себе любую цифру от 0 до 9
console.log(/[0-9]/.test('in 1992'));
/*
\d - любая цифра;
\w - любой алфавитно-цифровой символ (словообразующий символ);
\s - любой пробельный символ (пробел, табуляция, новая строка и т.д.);
\D - символ, который не является цифрой;
\W - не алфавитно-цифровой символ;
\S - не пробельный символ;
, - любой символ, кроме новой строки.
*/
let datetime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(datetime.test('19-05-2020 17:47'));
console.log(datetime.test('19-may-2020 17:47'));
// Хоти получить любой символ, кроме символов, входящих
// в данное множество
let notBinary = /[^01]/;
console.log(notBinary.test('010101110100101'));
console.log(notBinary.test('0101011010102010'));
// Если поставить после шаблона +, значит эл.повторится неск.раз
console.log(/\d+/.test("'123'"));
console.log(/\d+/.test("'"));
// Если поставить *, то нулевые повторения тоже зачтутся
console.log(/\d*/.test("''"));
// ? делает часть шаблона не обязательной, 
// она может встретиться один раз или ни разу
let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbouur'));
console.log(neighbor.test('neighbour'));
// {n} {n,m} {n, .} показывает, что шаблон должен повториться n или от n раз
let date = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{1,2}/;
console.log(date.test('22-04-1999 15:43'));
// Повторение нескольких элементов i делает нечувствительным к регистру
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('Booooohoooooohooo'));
// Exec выдает null, если нет совпадение или объект совпадения
let match = /\d+/.exec('нас всего 100');
console.log(match[0]);
// ^ - начало входной строки, $ - ее конец
// /^\d+$/ - Строка, полностью состоящая из 1 или нескольких цифр
// /^!/ - любая строка, начинающаяся с !
// /x^/ - соответствует ни одной строке (x не может стоять перед началом строки)
// | - выбор между шаблонами, расположенными слева и справа
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test('15 pigs'));
console.log(animalCount.test('15 pigschiken'));
// replace
console.log('aapple'.replace('a', 'pen'));
// Если добавить g, то будут заменены все совпадения
console.log('aaple'.replace(/a/g, 'pen'));
console.log('Borobudur'.replace(/[ou]/g, 'pen'));
/* Например, предположим, что у нас
есть длинная строка, содержащая имена людей, по одному имени в строке
в формате Lastname, Firstname (фамилия, имя). Мы хотим поменять местами
имя и фамилию и удалить запятую между ними, чтобы получить формат
Firstname Lastname. Для этого можно применить следующий код: */
console.log(
    'Liskov, Barbara\nMcCarthy, John\nWadler, Philip'
    .replace(/(\w+), (\w+)/g, '$2 $1')
);
/*$1 и $2 в строке замены относятся к группам, которые в шаблоне заключены
в скобки. $1 заменяется текстом, соответствующим первой группе, $2 -
второй и так далее до $9. Для того чтобы сослаться на полное совпадение,
используется комбинация $&.*/
/*Вместо строки в качестве второго аргумента можно передать функцию. Тогда
при каждой замене будет вызываться эта функция, которой в качестве аргументов будут передаваться найденные соответствия для групп (а также полное
соответствие), а ее возвращаемое значение будет вставлено в новую строку.
Вот небольшой пример:
let s = "the cia and fbi";
console.log(s.replace(/\b(fbilcia)\b/g,
str => str.toUpperCase()));
// ~ the CIA and FBI
Вот более интересный пример:
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusone(match, amount, unit) {
}
amount = Number(amount) - 1;
if (amount == 1) { // остался только один, убрать 's'
unit = unit.slice(0, unit.length - 1);
} else if (amount == 0) {
amount = "no";
}
return amount + " " + unit;
console.log(stock.replace(/{\d+) {\w+)/g, minusOne));
// ~ no lemon, 1 cabbage, and 100 eggs
Эта функция принимает строку, находит все вхождения числа, за которым
следует алфавитно-цифровое слово, и возвращает строку, где каждое такое
вхождение уменьшается на единицу.
Группа ( \d+) передается функции как аргумент функции amount, а группа
( \w+) - как аргумент uni t. Функция преобразует amount в число - что всегда
возможно, поскольку оно соответствует шаблону \d+, - и вносит некоторые
коррективы, если остается только один элемент или ноль.*/

// Функция, удаляющая все комментари из фрагмента кода
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}

console.log(stripComments('1 /* a */+/* b */ 1'));

console.log('   слово'.search(/\S/));

// Практика
// 1)
verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the dot"]);

verify(/\w{7}/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(/\b[^\We]+\b/i,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {

if (regexp.source == "...") return;
for (let str of yes) if (!regexp.test(str)) {
 console.log(`Failure to match '${str}'`);
}
for (let str of no) if (regexp.test(str)) {
 console.log(`Unexpected match for '${str}'`);
}
}

// 2)
let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

// 3)
// Fill in this regular expression.
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
