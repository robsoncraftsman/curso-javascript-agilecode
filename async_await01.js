function sumComPromise(a, b) {
    return new Promise(function(resolve, reject) {
        if (!a || !b) {reject("Invalid values")};
        setTimeout(function() {
            resolve(a + b);
        }, Math.random() * 1000);
    });    
};

(async function() {
    try {
        const a = await sumComPromise(3, 3);
        console.log(a);
        const b = await sumComPromise(2, 2);
        console.log(b);
        const result = await sumComPromise(a, b);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();