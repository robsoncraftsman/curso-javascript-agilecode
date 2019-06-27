const charsets = new Map([["second", 1],["minute", 60]]);
console.log(charsets);

console.log(Array.from(charsets));

charsets.set("hour", 3600);
console.log(charsets);

charsets.forEach(function(value, key) {
    console.log(key, value);
});

console.log(charsets.has("hour"));

console.log(charsets.get("second"));

console.log(charsets.delete("minute"));

console.log(charsets);
