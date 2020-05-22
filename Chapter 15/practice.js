// 1
const div = document.querySelector('#mountains');
const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

function buildTable(data) {
    let table = document.createElement('table');
    table.style.margin = '0 auto';
    
    let fields = Object.keys(data[0]);
    let headRow = document.createElement('tr');
    fields.forEach(function(field) {
        let headCell = document.createElement('th');
        headCell.appendChild(document.createTextNode(field));
        headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    data.forEach(function(object) {
        let row = document.createElement('tr');
        fields.forEach(function(field) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(object[field]));
            if (typeof object[field] == 'number') {
                cell.style.textAlign = 'right';
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

div.appendChild(buildTable(MOUNTAINS));

// 2

function byTagName(node, tagName) {
    let found = [];
    tagName = tagName.toUpperCase();
 
    function explore(node) {
        for (let i = 0; i < node.childNodes.length; i++) {
            let child = node.childNodes[i];
            if(child.nodeType == document.ELEMENT_NODE) {
                if (child.nodeName == tagName) {
                    found.push(child);
                }
                explore(child);
            }
        }
    }

    explore(node);
    return found;
}

console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
