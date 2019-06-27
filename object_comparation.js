const obj1 = {
    name: "João",
    age: 21,
    job: "Contador"
};

const obj2 = {
    name: "João",
    age: 21,
    job: "Contador"
};

let objetcsAreEquals = true;

for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
        objetcsAreEquals = false;
    }
}

for (let key in obj2) {
    if (obj2[key] !== obj1[key]) {
        objetcsAreEquals = false;
    }
}

console.log(objetcsAreEquals);