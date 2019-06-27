let count = 0;
console.time("performance");
while (count < 100000) {
    count++;
    new String("JavaScript");
}
console.timeEnd("performance")