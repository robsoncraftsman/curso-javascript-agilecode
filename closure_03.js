function fn1() {
    let v1 = 10;
    return {
        m1: function() {
            console.log(++v1);
        },
        m2: function() {
            console.log(--v1);
        }
    };
}

//No caso o objeto compartilha o valor de v1 pois os métodos do objeto 
//compartilham o mesmo contexto de execução
const obj1 = fn1();
obj1.m1(); //11
obj1.m2(); //10

//No caso os valor de v1 é reiniciado pois cada objeto possui um contexto 
//diferente para a variável v1
const obj2 = fn1();
obj2.m1(); //11
const obj3 = fn1();
obj3.m2(); //9