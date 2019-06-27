const obj = {};
for (var v1=0; v1 < 3; v1++) {
    obj[v1] = (function() {
        console.log(this.v2);
    }).bind({v2: v1});
}

//Imprime o valor 0,1,2 pois o método bind passa um objeto 
//como parâmetro para ser usado no this dentro do método
obj[0]();//0
obj[1]();//1
obj[2]();//2