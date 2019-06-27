//Funcion declaration
function sum(a, b) {
    return a + b;
};

console.log(sum (2, 2))

//================================================================================

//Function expression
const sumFunction = function(a, b) {
    return a + b;
};

console.log(sumFunction(3, 3));

//================================================================================

//Retornando uma função dentro de uma função
function calculator() {
    return function () {
        return "Função dentro da função";
    }
};

console.log(calculator()()); //Usa dois parêntesis para chamar a função da função :)

//================================================================================

//Retornando função com parâmetros
function calculatorComParams() {
    return function(a, b) {
        return a + b;
    }
};

console.log(calculatorComParams()(4, 4));

//================================================================================

//Valor padrão de parâmetros
function sumParamValorPadrao(a = 0, b = 0) {
    return a + b;
};

//JS permite passar menos ou mais parâmetros que o definido na função
//Caso o parâmetro seja omitido, o valor é undefined
console.log(sumParamValorPadrao(1)); 

//================================================================================

//Inspecionando os argumento de uma função
function sumArgs() {
    let total = 0;
    for (let argument in arguments) {
        total += arguments[argument];
    }
    return total;
};

function sumTwoArgs() {
    return arguments[0] + arguments[1];
};

console.log(sumArgs(1,2));
console.log(sumTwoArgs(2,3));

//================================================================================

//Rest parameters (sempre o último parâmetro da função)
function sumRestArgs(...numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
};

console.log(sumRestArgs(1,2));
console.log(sumRestArgs(2,3));