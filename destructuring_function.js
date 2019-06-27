//Destructuring de parâmetros como array
function sum([a , b]) {
    return a + b;
};

console.log(sum([2,2]));

//Destructuring de parâmetros como objeto
function substract({a, b}) {
    return a - b;
};

console.log(substract({a: 2, b: 1}));