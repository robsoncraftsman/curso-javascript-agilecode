//=====================================================================================
//Criando objetos com conceito de função construtora
//=====================================================================================

const personPrototype = {
    get age() {
        return (new Date()).getFullYear() - this.year;
    }
};

const createPerson = function(name, year) {
    const person = {
        name,
        year
    };

    Object.setPrototypeOf(person, personPrototype);

    return person;
};

const joao = createPerson("João da Silva", 1979);
const maria = createPerson("Maria Silveira", 1999);

console.log(joao.age);
console.log(maria.age);

//=====================================================================================
//Criando objeto com New
//=====================================================================================

const Person = function(name, year) {
    this.name = name;
    this.year = year;
};

Object.defineProperties(Person.prototype, { 
	age: { 
		get: function() {  
			return (new Date()).getFullYear() - this.year;
		} 
    } 
});

/*
Person.prototype = {
    get age() {
        return (new Date()).getFullYear() - this.year;
    }
}
*/
const pedro = new Person("Pedro Cardoso", 1975);
console.log(pedro.age);

//=====================================================================================
//Simulando o new
//=====================================================================================

const _new = function(fn, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, fn.prototype);
    fn.apply(obj, args);
    return obj;
}

const jose = _new(Person, "José Goulart", 2000);
console.log(jose.age);