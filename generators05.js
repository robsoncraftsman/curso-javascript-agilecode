function sumComPromise(a, b) {
    return new Promise(function(resolve, reject) {
        if (!a || !b) {reject("Invalid values")};
        setTimeout(function() {
            resolve(a + b);
        }, Math.random() * 1000);
    });    
};

//Sum aninhado com promisses
sumComPromise(3, 3).then(function (a) {
    sumComPromise(2,2).then(function (b) {
        sumComPromise(a,b).then(function(result) {
            console.log(`Promisse aninhada: ${result}`);
        })
    })
});

//Versão com generators para liberar o event loop durante os cálculos

function async(gen) {
    gen.next().value.then(function (a) {
        gen.next(a).value.then(function(b) {
            gen.next(b).value.then(function(result) {
                gen.next(result);
            });
        });
    });
};

function asyncR(gen, result) {
    const obj = gen.next(result);
    if (obj.done) return;
    obj.value.then(function (result) {
        asyncR(gen, result);
    });
};

async((function* () {
    const a = yield sumComPromise(3, 3);
    console.log(a);
    const b = yield sumComPromise(2, 2);
    console.log(b);
    const result = yield sumComPromise(a, b);
    console.log(`Generator manual: ${result}`);
})());

asyncR((function* () {
    const a = yield sumComPromise(3, 3);
    console.log(a);
    const b = yield sumComPromise(2, 2);
    console.log(b);
    const result = yield sumComPromise(a, b);
    console.log(`Generator recursivo: ${result}`);
})());