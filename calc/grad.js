/* 
   
    These methods provide basic gradient checks
   
*/

/**
 * 
 * This function computes the approximate derivate of a function with respect to its sole input
 * 
 * @param {function} f 
 * @param {float} x 
 * @param {float} h 
 * 
 */
function dfdx(f, x, h = 0.00001) {
    return (f(x + h) - f(x)) / h
}

/**
 * 
 * This function computes the derivative of our function f with respect to index j of our vector v
 * 
 * @param {function} f 
 * @param {vector} v 
 * @param {int} j 
 * @param {float} h 
 *  
 */
function dfdj(f, v, j, h) {
    const dj = v.map((v_i, i) => i === j ? v_i + h : v_i)
    return (f(dj) - f(v)) / h
}


/**
 * 
 * Computes the gradient of a function (the partial derivative along each dimension of input vector)
 * 
 * @param {function} f 
 * @param {vector} v 
 * @param {float} 
 *  
 */
function grad_est(f, v, h = 0.00001) {
    return v.map((_, j) => dfdj(f, v, j, h))
}