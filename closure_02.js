const v1 = 10;

function fn1() {
    console.log(v1);
};

function fn2(fn) {
    const v1 = 100;
    fn();
}

//Imprime 10 pois o valor de v1 na hora da definição da função fn1() era 10 (escope chain estático)
fn2(fn1);