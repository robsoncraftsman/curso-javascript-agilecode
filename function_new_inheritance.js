const Person = function(name, year) {
    this.name = name;
    this.year = year;
};

Object.defineProperty(Person.prototype, "age", {
    get: function() {
        return (new Date()).getFullYear() - this.year;
    }
});

const Joao = function() {
    Person.call(this, "João", 1990);
};

Joao.prototype = Object.create(Person.prototype);
Joao.prototype.constructor = Joao;

//Criando uma instancia herdada com operador new
const joao = new Joao();
console.log(joao);
console.log(joao.age);
console.log(joao.__proto__ === joao.constructor.prototype);
console.log(joao instanceof Person);
console.log(joao instanceof Joao);
console.log(typeof joao);

const maria = new Person("Maria", 2000);
console.log(maria);
console.log(maria.age);
console.log(typeof maria);

//Se usar o Object.create, o construtor do objeto não é chamado
//Desta forma, este precisa ser chamada na "mão"
const joao2 = Object.create(Joao.prototype);
joao2.constructor.call(joao2);
console.log(joao2);
console.log(joao2.age);
console.log(joao2.__proto__ === joao.__proto__);
console.log(joao2 instanceof Person);
console.log(joao2 instanceof Joao);
console.log(typeof joao2);
