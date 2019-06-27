const languages = [["Fortran", 1957], ["Lisp", 1958], ["COBOL", 1959]];

//For com destructuring
for (let [language, year] of languages) {
    console.log(language, year);
}