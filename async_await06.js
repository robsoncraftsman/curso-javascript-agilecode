//Asynchronous generators
async function* createAsyncGenerator(...data) {
    var i = 0;
    while (i < data.length) {
        yield data[i++];
    }
}

const languages = createAsyncGenerator("Fortan", "Lisp", "COBOL");

(async function () {
    for await (let languague of languages) {
        console.log(languague);
    }
})();