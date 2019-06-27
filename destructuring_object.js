const language = {
    name: "C",
    author: "Dennis Ritchie",
    year: 1972,
    company: {
        name: "Bell Labs"
    }
};

const {name, author, year: creation_year, company: {name: company_name}, other = "-"} = language;
console.log(name, creation_year, company_name, other);