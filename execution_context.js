const obj = {
    p1: 10,
    p2: 5,
    p3: 7,
    getP1: function() {
        return this.p1;
    },
    getP2: function() {
        //this não é repassado para inner function
        const that = this;
        const fn1 = function() {
            return that.p2;
        }
        return fn1();
    },
    getP3: function() {
        //no caso da arrow function ela herda o this da função acima
        const fn1 = () => {
            return this.p3;
        }
        return fn1();
    }
};

console.log(obj.getP1());
console.log(obj.getP2());
console.log(obj.getP3());