//=====================================================================
//ADD sem Closure
//=====================================================================

var add = function () {
    var counter = 0;
    return function () { 
        counter += 1; 
        return counter 
    }
};

console.log(add()());//1
console.log(add()());//1
console.log(add()());//1

//=====================================================================
//ADD com Closure
//=====================================================================

let _add = add();
console.log(_add());//1
console.log(_add());//2
console.log(_add());//3

//=====================================================================
//ADD com Closure (Função autoinvocada)
//=====================================================================

var addClosure = (function () {
    var counter = 0;
    return function () { 
        counter += 1; 
        return counter 
    }
})();

console.log(addClosure());//1
console.log(addClosure());//2
console.log(addClosure());//3
