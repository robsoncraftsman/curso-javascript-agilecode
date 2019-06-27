
function createIterator(...data) {
    return {
        [Symbol.iterator]() {
            let i = 0;
            return {
                next() {
                    if (i < data.length) {
                        return {
                            value: data[i++],
                            done: false
                        }
                    } else {
                        return {
                            value: undefined,
                            done: true
                        }
                    }
                }
            };
        }
    };
};

const languages = createIterator("Fortan", "Lisp", "COBOL");
console.log(languages[Symbol.iterator]().next());


for (let languague of languages) {
    console.log(languague);
}
