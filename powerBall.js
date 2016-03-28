'use strict';

const lottery = (balls, range, power) => {
    const arr = [];
    const result = [];
    for (let i=0; i<range; i++) {
        arr.push(i+1);
    }
    var ball = 0;
    while(ball < balls) {
        var index = Math.floor(range * Math.random()) + 1;
        var curr = arr.splice(index, 1);
        result.push(curr);
        ball++;
    }
    index = Math.floor(power * Math.random()) + 1;
    curr = arr.splice(index, 1);
    result.push(curr);
    return result;
};

console.log(lottery(5, 69, 26));