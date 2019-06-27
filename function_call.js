const calculateArea = function(fn) {
    return  fn(Math.PI * Math.pow(this.radius, 2));
};

const circle = {
    radius: 0,
    calculateArea
};

circle.radius = 10;
// Diferença entre call e apply é que um usa rest parameters e a outra usa array para passar os parâmetros
console.log(calculateArea.call(circle, Math.round));
console.log(calculateArea.apply(circle, [Math.round]));

//Bind associa a função ao objeto usado no "this" da mesma
const calculateAreaBind = calculateArea.bind(circle);
console.log(calculateAreaBind(Math.round));