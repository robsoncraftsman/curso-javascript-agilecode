const rectangle = {
    x: 0,
    y: 0,
    calculateArea() {
        return this.x * this.y;
    }
}

const rectangle2 = Object.create(rectangle);
rectangle2.x = 10;
rectangle2.y = 2;

console.log(rectangle2.calculateArea());