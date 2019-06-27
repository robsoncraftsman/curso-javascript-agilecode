const classicLanguages = ["Fortran", "Lisp", "COBOL"];
const modernLanguages = ["Python", "Ruby", "Java"];
//Spread operator [...]
const languages = [...classicLanguages, ...modernLanguages];

//For in percorre as chaves
for (let i in languages) {
    console.log(languages[i]);
}

//For of percorre os valores
for (let language of languages) {
    console.log(language);
}

//Funciona para Map, Set, String
const language = "COBOL";

for (let char of language) {
    console.log(char);
}

const cobolArray = [...language];
console.log(cobolArray);