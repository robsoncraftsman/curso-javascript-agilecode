function sumComPromise(a, b) {
    return new Promise(function(resolve, reject) {
        if (!a || !b) {reject("Invalid values")};
        setTimeout(function() {
            resolve(a + b);
        }, Math.random() * 1000);
    });    
};

// Usar "for wait of" para processos assíncronos dentro de um loop
// Tem que usar a opção --harmony-async-iteration (node <= 9)
(async function() {
    try {
        const promises = [
            sumComPromise(3, 3),
            sumComPromise(2, 2)
        ];
        const results = [];
   
        for await (const result of promises) {
            results.push(result);
        }

        const [a, b] = results;
        console.log(a);
        console.log(b);
        const result = await sumComPromise(a, b);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();