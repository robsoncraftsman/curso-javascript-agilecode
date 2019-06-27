class Shape {
    constructor(size) {
        this.size = size;
    }

    toString() {
        return `Size: ${this.size}. Area: ${this.calculateArea()}`;
    }

};

//============================================================================

class Square extends Shape {
    constructor(size) {
        super(size);
    }

    calculateArea() {
        return Math.pow(this.size, 2);
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

class Circle extends Shape {
    constructor(size) {
        super(size);
    }

    calculateArea() {
        return Math.PI * Math.pow(this.size, 2);
    }

    toString() {
        return `Override: ${super.toString()}`;
    }

    static fromArea(area) {
        return new Circle(Math.sqrt(area / Math.PI));
    }
};

const circle = new Circle(10);
console.log(circle.toString());

const circleFrom = Circle.fromArea(314.1592653589793);
console.log(circleFrom.toString());