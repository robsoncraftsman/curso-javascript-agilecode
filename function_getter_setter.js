//Definindo get/set diretor no objeto
const rectangle = {
    set x(x) {
        this._x = x;
    },
    set y(y) {
        this._y = y;
    },
    get area() {
        return this._x * this._y;
    }
};

rectangle.x = 5;
rectangle.y = 7;
console.log(rectangle.area);

//Definindo get/set via object api
const rectangle2 = {};

Object.defineProperty(rectangle2, "x", {
    set(x) {
        this._x = x;
    }
});
Object.defineProperty(rectangle2, "y", {
    set(y) {
        this._y = y;
    }
});
Object.defineProperty(rectangle2, "area", {
    get() {
        return this._x * this._y;
    }
})

rectangle2.x = 3;
rectangle2.y = 4;
console.log(rectangle2.area);
