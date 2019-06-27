//=====================================================================
//Executar o arquivo com a diretiva --experimental-modules
//Ex: node --experimental-modules modules.mjs
//Import com alias {Abc as cba} 
//Import {* as xpto} cria um prefixo para todos os itens do módulo
//=====================================================================
import Hello, {AreaCalculator} from './areaCalculator';

const hello = new Hello();
console.log(hello.greeting());

class Circle {
    constructor(size) {
        this.size = size;
    }

    get area() {
        return AreaCalculator.calculateArea(this.size);
    }
};

const circle = new Circle(10);
console.log(circle);
console.log(circle.area);