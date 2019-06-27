const areaCache = new WeakMap();

const rectangle1 = {
    x: 10,
    y: 20
};

const rectangle2 = {
    x: 5,
    y: 3
};

function calculateArea(rectangle) {
    const cachedArea = areaCache.get(rectangle);
    if (cachedArea) {
        console.log("Using cache...");
        return cachedArea;
    } else {
        const area = rectangle.x * rectangle.y;
        areaCache.set(rectangle, area);
        return area;
    }
}

console.log(calculateArea(rectangle1));
console.log(calculateArea(rectangle2));
console.log(calculateArea(rectangle1));
console.log(calculateArea(rectangle2));