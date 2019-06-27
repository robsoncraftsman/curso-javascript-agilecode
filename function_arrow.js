//Versão normal da função
const sum = function(a, b) {
    return a + b;
};

//Trocar notação function por arrow
const substract = (a, b) => {
    return a - b;
};

//Suprimindo o return da arrow function
const multiply = (a, b) => a * b;

const calculator = function(fn) {
    return function(a, b) {
        return fn(a, b);
    }
};

console.log(calculator(sum)(3, 3));
console.log(calculator(substract)(3, 3));
console.log(calculator(multiply)(3, 3));

//=============================================================

//Criar objetos com arrow function necessita de () entre a definição do objeto
const createPerson = (name, year) => ({name, year});

const person = createPerson("João da Silva", 1980);

console.log(person);

//==============================================================

//Arrow function não possui this e arguments, 
//no caso de manipulação de objetos e parâmetros 
