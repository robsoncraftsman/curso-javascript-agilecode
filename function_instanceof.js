const date = new Date();
console.log(date instanceof Date); //true
console.log(date instanceof Object); //true
console.log({} instanceof Object); //true
console.log(date instanceof Array); //false

console.log(typeof date); //object

function _instanceof(obj, fn) {
    if (obj === null || obj === undefined) return false;
    if (obj.__proto__ === fn.prototype) return true;
    return _instanceof(obj.__proto__, fn);
};

console.log(_instanceof(date, Date)); //true
console.log(_instanceof(date, Object)); //true
console.log(_instanceof({}, Object)); //true
console.log(_instanceof(date, Array)); //false

console.log("----------------------------");
console.log(Date.prototype instanceof Date); //false
console.log(_instanceof(Date.prototype, Date)); //false
console.log(Object.prototype instanceof Object); //false
console.log(_instanceof(Object.prototype, Object)); //false
console.log({}.prototype instanceof Object); //false
console.log(_instanceof({}.prototype, Object)); //false
console.log({}.__proto__ instanceof Object); //false
console.log(_instanceof({}.__proto__, Object)); //false
