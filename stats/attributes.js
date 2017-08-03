/* 

        These methods provide statistical information about our datasets

*/

/**
 * 
 * Computes the mean of vector x, non-elementwise
 * 
 * @param {vector} x 
 * 
 */
function mean(x) {
    return x.reduce((a, v) => a + v) / x.length
}

/**
 * 
 * Computes the value less than which percentage 'p' of our data lies
 * 
 * @param {vector} x 
 * @param {float} p
 * 
 */
function percentile(x) {
    return x.sort()[+(p * x.length)]
}