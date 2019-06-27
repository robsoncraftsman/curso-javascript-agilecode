function sumComPromise(a, b) {
    return new Promise(function(resolve, reject) {
        if (!a || !b) {reject("Invalid values")};
        setTimeout(function() {
            resolve(a + b);
        }, Math.random() * 1000);
    });    
};

// Await não funciona dentro do forEach por causa do encapsulamento
// da função passada como parâmetro - solução: usar "for of" 
(async function() {
    try {
        const promises = [
            sumComPromise(3, 3),
            sumComPromise(2, 2)
        ];
        const results = [];
        promises.forEach(async function(promisse) {
            const result = await promisse;
            results.push(result);
        });

        const [a, b] = results;
        console.log(a); //undefined
        console.log(b); //undefined
        const result = await sumComPromise(a, b); // Invalid values
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();