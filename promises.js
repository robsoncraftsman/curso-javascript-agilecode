//=================================================================================
// Função normal
//=================================================================================

function sum(a, b){
    return a + b;
};

console.log(sum(2, 5));

//=================================================================================
// Retorno atrasado com setTimeout, retorna "undefined" pois o retorno
// da função ocorre antes do timeout 
//=================================================================================

function sumComTimeout(a, b) {
    setTimeout(function() {
        return a + b;
    }, 1000);
};

console.log(sumComTimeout(2, 4));

//=================================================================================
// Retorno atrasado da função com setTimeout, usando callback a ser executado após
// o timeout
//=================================================================================

function sumComCallback(a, b, callback) {
    setTimeout(function() {
        callback(a + b);
    }, 1000);    
};

sumComCallback(2, 3, (result) => console.log(`Callback: ${result}`));

//=================================================================================
// Usando Promise para substituir o callback
//=================================================================================

function sumComPromise(a, b) {
    return new Promise(function(resolve, reject) {
        if (!a || !b) {reject("Invalid values")};
        setTimeout(function() {
            resolve(a + b);
        }, Math.random() * 1000);
    });    
};

sumComPromise(3, 3).then((result) => console.log(`Promisse: ${result}`));

//=================================================================================
// Encadeamento de Promisses e tratamento de erro
//=================================================================================

Promise.all([
    sumComPromise(1,2),
    sumComPromise(3,4)
]).then(function(results) {
    const [a, b] = results;
    return sumComPromise(a, b);
}).then(function(result) {
    console.log(`Promisse (all): ${result}`);
}).catch(function(e){
    console.log(e);
});

//=================================================================================
// Pega o resultado da primeira promisse concluída
//=================================================================================

Promise.race([
    sumComPromise(1,2),
    sumComPromise(3,4)
]).then(function(result) {
    console.log(`Promisse (race): ${result}`);
}).catch(function(e){
    console.log(e);
});
