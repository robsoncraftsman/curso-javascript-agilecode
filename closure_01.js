function fn1() {
    const v1 = 10;
    return function() {
        console.log(v1);
    } 
}; 


//Pega sempre o valor do momento da definição da função (scope chain estático)
const fn2 = fn1(); 
const v1 = 100;
fn2();