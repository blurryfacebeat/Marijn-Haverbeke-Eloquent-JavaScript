class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Vec(this.x - other.x, thix.y - other.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class Group {
    constructor() {
        this.members = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.members.push(value);
        }
    }

    delete(value) {
        this.members = this.members.filter(v => v !== value);
    }

    has(value) {
        return this.members.includes(value);
    }

    get check() {
        for (let i = 0; i < this.members.length; i++) {
            console.log(this.members[i]);
        }
    }

    static from(collection) {
        const group = new Group;
        for (let value of collection) {
            group.add(value);
        }
        return group;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
      this.group = group;
      this.position = 0;
    }
  
    next() {
      if (this.position >= this.group.members.length) {
        return {done: true};
    } else {
        let result = {value: this.group.members[this.position],
                      done: false};
        this.position++;
        return result;
        }
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));