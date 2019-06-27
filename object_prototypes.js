const functionalLanguage = {
    paradigm: "Funcional"
};

//Primeiro modo de definir um protótipo de um objeto
const scheme = {
    name: "Scheme",
    date: 1975,
    __proto__: functionalLanguage
};

//Segundo modo de definir um protótipo de um objeto
const javaScript = {
    name: "JavaScript",
    date: 1995
};
Object.setPrototypeOf(javaScript, functionalLanguage);

//terceira forma de definir um  protótipo de um objeto
const scala = Object.create(functionalLanguage);
scala.name = "Scala";
scala.date = 2001;

console.log(functionalLanguage);
console.log(scheme); //não imprime paradigm pois o console.log imprime apenas as propriedades diretas do objeto
console.log(javaScript); // idem

for (let key in javaScript) {
    console.log(key, javaScript[key], javaScript.hasOwnProperty(key)); //imprime paradigm pois o comando in pega as propriedades do objeto e seus protótipos
}