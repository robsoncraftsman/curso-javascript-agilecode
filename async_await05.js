function createAsyncIterator(...data) {
    return {
        [Symbol.asyncIterator]() {
            return {
                i: 0,
                next() {
                    if (this.i < data.length) {
                        return Promise.resolve({ value: data[this.i++], done: false });
                    }

                    return Promise.resolve({ done: true });
                }
            };
        }
    }
};

const languages = createAsyncIterator("Fortan", "Lisp", "COBOL");

(async function () {
    for await (let languague of languages) {
        console.log(languague);
    }
})();