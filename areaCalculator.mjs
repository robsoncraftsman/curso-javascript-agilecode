//=====================================================================
//Export default de uma classe anômina, o nome da classe é
//atribuído na importação do módulo 
//=====================================================================
export default class {
    greeting() {
        return "Hello";
    }
}

export class AreaCalculator {
    static calculateArea(size) {
        return Math.PI * Math.pow(size, 2);
    }
}