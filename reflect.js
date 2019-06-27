function createArray() {
    return new Proxy({length: 0}, {
        set(target, key, value) {
            Reflect.set(target, key, value);
            target.length++;
        },

        get(target, key) {
            if (Reflect.has(target, key)) {
                return Reflect.get(target, key);
            } else if (typeof key === "string") {
                throw `Property ${key} not found`;
            }
        }
    });
};

const languages = createArray();
languages[0] = "Java";
languages[1] = "Python";
languages[2] = "Elixir";

console.log(languages);
console.log(languages.length);
console.log(languages[0]);
console.log(languages[3]);