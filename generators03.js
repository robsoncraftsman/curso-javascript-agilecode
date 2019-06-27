function sum(a, b) {
    return a + b;
};

function async(gen) {
    const a = gen.next().value;
    const b = gen.next(a).value;
    const result = gen.next(b).value;
    gen.next(result);
};

async((function* () {
    const a = yield sum(3, 3);
    console.log(a);
    const b = yield sum(2, 2);
    console.log(b);
    const result = yield sum(a, b);
    console.log(result);
})());