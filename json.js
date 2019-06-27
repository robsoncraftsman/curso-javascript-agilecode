//Exemplos de conversão de tipos para JSON
JSON.stringify(10);
JSON.stringify("Java Script");
JSON.stringify(true);
JSON.stringify({name: "João", idade: 33});
JSON.stringify(["a","b",10]);
JSON.stringify(null);

//Exemplos de parse de tipos do JSON
JSON.parse('10');
JSON.parse('"Java Script"');
JSON.parse('true');
JSON.parse('{"name": "João", "idade": 33}');
JSON.parse('["a","b",10]');
JSON.parse('null');

//Exemplos de manipulação de objetos usando JSON
let joao1 = JSON.parse('{"name": "João", "idade": 33}');

console.log(joao1);

let joao2 = {name: "João", idade: 33};

console.log(joao1 === joao2); //false
console.log(JSON.stringify(joao1) === JSON.stringify(joao2)); //true

let joao3 = JSON.parse(JSON.stringify(joao2)); //clonagem simples de um objeto

console.log(joao3);