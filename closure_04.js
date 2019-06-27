const obj = {};
for (var v1=0; v1 < 3; v1++) {
    obj[v1] = function() {
        console.log(v1);
    }
}

//Retorna 3 para todas chamadas pois compartilha a variável v1
// que no final do loop tem valor = 3
// se usar "let" no lugar de "var" funciona certinho
obj[0]();//3
obj[1]();//3
obj[2]();//3