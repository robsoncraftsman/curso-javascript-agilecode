const name = "Robert C Martin";
const attr = "language";
const language = "English";

const author = {
    title: "Clean Code",
    name, //copia o valor da constante declarada acima
    "number-of-pages": 464,
    [attr]: language
};

for (let key in author) {
    console.log(`Property: ${key} - Value: ${author[key]}`);
}

console.log("title" in author) //verifica se a propriedade existe no objeto

author.age = 42; //cria uma nova propriedade no objeto

const copy = {}; //cria um objeto vazio

for (let key in author) {
    copy[key] = author[key];
}

console.log(copy);

delete copy.age; //apaga um atributo de um objeto

console.log("age" in copy);
