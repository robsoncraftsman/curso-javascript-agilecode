
class Square {
    constructor(size) {
        this.size = 4;
    }

    calculateArea() {
        return Math.pow(this.size, 2);
    }

    toString() {
        return `Size: ${this.size}. Area: ${this.calculateArea()}`;
    }

    static fromArea(area) {
        return new Square(Math.sqrt(area));
    }
};

const square = new Square(4);
console.log(square.toString());

const squareFrom = Square.fromArea(16);
console.log(squareFrom.toString());

//============================================================================
// Versão do Square usando função construtora
//============================================================================
/*
function Square(size) {
    this.size = size;
};

Square.prototype.calculateArea = function() {
    return Math.pow(this.size, 2);
};

Square.prototype.toString = function() {
    return `Size: ${this.size}. Area: ${this.calculateArea()}`;
};

Square.fromArea = function(area) {
    return new Square(Math.sqrt(area));
}

const square = new Square(4);
console.log(square.toString());

const squareFrom = Square.fromArea(16);
console.log(squareFrom.toString());
*/