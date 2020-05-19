const roads = [
    'Дом Алисы-Дом Боба',
    'Дом Алисы-Почта',
    'Дом Дарии-Дом Эрни',
    'Дом Эрни-дом Греты',
    'Дом Греты-Магазин',
    'Рынок-Почта',
    'Рынок-Ратуша',
    'Дом Алисы-Склад',
    'Дом Боба-Ратуша',
    'Дом Дарии-Ратуша',
    'Дом Греты-Ферма',
    'Рынок-Ферма',
    'Рынок-Магазин',
    'Магазин-Ратуша'
];

// принимает массив ребер и создает для него объект словаря,
// в котором каждому узлу соответствует массив связанных с ним узлов.
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

// Сначала проверяет, существует ли дорога из текущего места
// в пункт назначения. Если нет, то возвращает старое состояние
// так как это недопустимый ход.
// Затем создает новое состояние с пунктом назначание в качестве
// нового местоположения робота.
// Перемещения выполняются при map, а доставка при filter.
    move(destonation) {
        if (!roadGraph[this.place].includes(destonation)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) {
                    return p;
                }
                return {
                    place: destonation,
                    address: p.address
                };
            }).filter(p => p.place != p.address);
            return new VillageState(destonation, parcels);
        }
    }
}

let first = new VillageState(
    'Почта',
    [{place: 'Почта', address: 'Дом Алисы'}]
);
let next = first.move('Дом Алисы');

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Выполнено за ${turn} ходов`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Переход в направлении ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState('Почта', parcels);
};

runRobot(VillageState.random(), randomRobot);

const mailRoute = [
    "Дом Алисы", "Сарай", "Дом Алисы", "Дом Боба",
    "Ратуша", "Дом Дарии", "Дом Эрни",
    "Дом Греты", "Магазин", "Дом Греты", "Ферма",
    "Рынок", "Почта"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at ==place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

function countSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
      if (state.parcels.length == 0) return steps;
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  
function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++) {
      let state = VillageState.random();
      total1 += countSteps(state, robot1, memory1);
      total2 += countSteps(state, robot2, memory2);
    }
    console.log(`Robot 1 needed ${total1 / 100} steps per task`)
    console.log(`Robot 2 needed ${total2 / 100}`)
}
  
compareRobots(routeRobot, [], goalOrientedRobot, []);

function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {route: findRoute(roadGraph, place, parcel.place),
                  pickUp: true};
        } else {
          return {route: findRoute(roadGraph, place, parcel.address),
                  pickUp: false};
        }
      });
  
    function score({route, pickUp}) {
        return (pickUp ? 0.5 : 0) - route.length;
    }
      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }
  
    return {direction: route[0], memory: route.slice(1)};
}

runRobotAnimation(VillageState.random(), lazyRobot, []);

class PGroup {
    constructor(members) {
      this.members = members;
    }
  
    add(value) {
      if (this.has(value)) return this;
      return new PGroup(this.members.concat([value]));
    }
  
    delete(value) {
      if (!this.has(value)) return this;
      return new PGroup(this.members.filter(m => m !== value));
    }
  
    has(value) {
      return this.members.includes(value);
    }
}
  
PGroup.empty = new PGroup([]);
  
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
