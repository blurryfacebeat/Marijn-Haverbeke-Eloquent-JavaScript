class MultiplicatorUnitFailure extends error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        a * b;
    } else {
        throw new MultiplicatorUnitFailure('Klunk');
    }
}

function reliableMultiply(a, b) {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        } catch (error) {
            if (!(e instanceof MultiplicatorUnitFailure)) {
                throw error;
            }
        }
    }
}

const box = {
    locked: true,
    unlock() {
        this.locked = false;
    },
    lock() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error('Заперто!');
        return this._content;
    }
};

function withBoxUnlocked(body) {
    let locked = box.locked;
    if (!locked) {
      return body();
    }
  
    box.unlock();
    try {
      return body();
    } finally {
      box.lock();
    }
}
