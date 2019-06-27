const obj = {};
for (var v1=0; v1 < 3; v1++) {
    obj[v1] = (function(v2) {
        return function() {
            console.log(v2);
        }
    })(v1);
}

//Imprime o valor 0,1,2 pois a declaração da novação função e a 
//execução da mesma no momento da declarção criar um novo sub-contexto com v2
obj[0]();//0
obj[1]();//1
obj[2]();//2