const obj = {};
for (var v1=0; v1 < 3; v1++) {
    const fn1 = function() {
        console.log(this.v2);
    }
    obj[v1] = fn1.bind({v2: v1});
}

//Igual ao exemplo 6, mas não usa IIFE
//Imprime o valor 0,1,2 pois o método bind passa um objeto 
//como parâmetro para ser usado no this dentro do método
obj[0]();//0
obj[1]();//1
obj[2]();//2