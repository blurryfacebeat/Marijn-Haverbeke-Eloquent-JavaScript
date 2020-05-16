class HomeWork {
    range(start, end, step = start < end ? 1 : -1) {
        let arr = [];
        if (step > 0) {
            for (let i = start; i <= end; i += step) {
                arr.push(i);
            }
        } else {
            for (let i = start; i >= end; i += step) {
                arr.push(i);
            }
        }
        return arr;
    }

    sum(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    reverseArray(arr) {
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            temp.unshift(arr[i]);
        }
        return temp;
    }

    arrayToList(array) {
        let list = null;
        for (let i = array.length - 1; i >= 0; i--) {
          list = {value: array[i], rest: list};
        }
        return list;
    }
      
    listToArray(list) {
        let array = [];
        for (let node = list; node; node = node.rest) {
          array.push(node.value);
        }
        return array;
    }
      
    prepend(value, list) {
        return {value, rest: list};
    }
      
    nth(list, n) {
        if (!list) return undefined;
        else if (n == 0) return list.value;
        else return nth(list.rest, n - 1);
    }

    deepEqual(a, b) {
        if (a === b) {
            return true;
        }

        if (a == null && typeof a != 'object' ||
            b == null && typeof b != 'object') {
                return false;
        }

        let keysA = Object.keys(a);
        let keysB = Object.keys(b);

        if (keysA.length != keysB.length) {
            return false;
        }

        for (let key of keysA) {
            if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }
}

const test = new HomeWork();
console.log(test.reverseArray(arr));