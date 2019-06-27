const javaScript = Object.create({});

const propsToCopy = {
    author: "Brendan Eich"
}

//Permite a copia de atributos de vários objetos
Object.assign(javaScript, 
    {name: "JavaScript", date: 1995},
    propsToCopy);

console.log(javaScript);

//Define uma nova propriedade do objeto
javaScript.novaPropriedade = "Nova Propriedade";

//Mostra as propriedades de um objeto
console.log(Object.keys(javaScript));

//Mostra os valores das propriedades de um objeto
console.log(Object.values(javaScript));

//Pega chave + valor de cada propriedade de um objeto
console.log(Object.entries(javaScript));

//Define uma nova propriedade no objeto
Object.defineProperty(javaScript, "influencedBy", {
    value: "Java, Scheme, Self",
    configurable: true,
    writable: true,
    enumerable: true
});
console.log(javaScript);

//Formas de tornar um objeto imutável
//Não permite inclusive a alteração do protótipo do mesmo
Object.preventExtensions(javaScript);
Object.seal(javaScript);
Object.freeze(javaScript);

