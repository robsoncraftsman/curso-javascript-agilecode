const circleInstances = new WeakSet();

function Circle(radius) {
    circleInstances.add(this);
    this.radius = radius;
}

Circle.prototype.calculateArea = function() {
    if (!circleInstances.has(this)) {
        throw "Invalid object";
    }
    return Math.PI * Math.pow(this.radius, 2);
}

const circle1 = new Circle(10);

console.log(circle1.calculateArea());

circle2 = {
    radius: 5
};

console.log(Circle.prototype.calculateArea.call(circle2));