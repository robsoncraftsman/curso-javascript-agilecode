//=====================================================================
//Ordenando um array de objetos
//=====================================================================
const languages = [
    {
        name: "Java",
        year: 1995,
        developers: 7300000
    },
    {
        name: "C",
        year: 1972,
        developers: 6300000
    },
    {
        name: "Python",
        year: 1991,
        developers: 8200000
    }
];

languages.sort(function(a, b) {
    return a.name.localeCompare(b.name);
});

console.log(languages);

//=====================================================================
//ForEach
//=====================================================================

const frameworks = ["Angular.js", "React.js", "Vue.js"];

//forEach com função normal
frameworks.forEach(function(framework) {
    console.log(framework);
});

//foreach com arrow function
frameworks.forEach((framework) => console.log(framework));

//=====================================================================
//Filter
//=====================================================================

const filterResult = languages.filter((language) => language.year >= 1990);

console.log(filterResult);

//=====================================================================
//Find
//=====================================================================

const findResult = languages.find((language) => language.name === "Java");

console.log(findResult);

//=====================================================================
//Some
//=====================================================================

const hasReact = frameworks.some((framework) => framework.startsWith("Reac"));

console.log(hasReact);

//=====================================================================
// Every
//=====================================================================

const endsWithJs = frameworks.every((framework) => framework.endsWith(".js"));

console.log(endsWithJs);

//=====================================================================
//Map
//=====================================================================

const languageNames = languages.map((language) => language.name);

console.log(languageNames);

//=====================================================================
//Reduce
//=====================================================================

const totalOfdevelopers = languages.reduce((total, language) => total + language.developers, 0);

console.log(totalOfdevelopers.toLocaleString("pt-BR"));
