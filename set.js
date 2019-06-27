const charsets = new Set(["ASCII","ISO-8859-1"]);
console.log(charsets);

console.log(Array.from(charsets));

charsets.add("UTF-8");
console.log(charsets);

charsets.forEach(function(value) {
    console.log(value);
});

console.log(charsets.has("ASCII"));

console.log(charsets.delete("UTF-8"));

console.log(charsets);
