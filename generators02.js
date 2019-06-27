
function createIterator(...data) {
    return {
        *[Symbol.iterator]() {
            let i = 0;
            while (i < data.length) {
                yield data[i++];
            }
        }
    };
};

const languages = createIterator("Fortan", "Lisp", "COBOL");
console.log(languages);
const iterator = languages[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (let languague of languages) {
    console.log(languague);
}