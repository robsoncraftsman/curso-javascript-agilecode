const languages = ["Fortan", "Lisp", "COBOL"];
const iterator = languages[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

console.log(Object.getOwnPropertyDescriptors(languages));
console.log(languages["length"]);
