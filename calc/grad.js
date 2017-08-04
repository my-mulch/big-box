/* 
   
    These methods provide basic gradient checks
   
*/

/**
 * 
 * @param {function} f 
 * @param {float} x 
 * @param {float} h 
 * 
 */
function difference_quotient(f,x,h){
    return (f(x + h) - f(x)) / h
}

console.log(difference_quotient((x) => x * x, 10, 0.000001))