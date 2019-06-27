function sum(a, b) {
    return a + b;
};

function asyncR(gen, result) {
    const iterator = gen.next(result);
    if (iterator.done) return;
    asyncR(gen, iterator.value);
}

asyncR((function* () {
    const a = yield sum(3, 3);
    console.log(a);
    const b = yield sum(2, 2);
    console.log(b);
    const result = yield sum(a, b);
    console.log(result);
})());