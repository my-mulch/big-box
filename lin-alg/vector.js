/* 

        These methods provide basic operations for vectors

*/

/**
 * 
 * Vectors must be of an equal dimension
 * @param {vector} a 
 * @param {vector} b 
 */

function vec_add(a, b) {
    return a.map((a_i, i) => a_i + b[i])
}

/**
 * 
 * Vectors must be of an equal dimension
 * It subtracts b from a
 * 
 * @param {vector} a 
 * @param {vector} b 
 */
function vec_subtract(a, b) {
    return a.map((a_i, i) => a_i - b[i])
}

/**
 * 
 * Vectors must be equal in dimension
 * @param {array} vectors 
 * 
 */
function vec_elementwise_sum(vectors) {
    return vectors.reduce(v_add)
}

/**
 * 
 * Mulitplies our vector elementwise by a scalar
 * @param {vector} v 
 * @param {scalar} c 
 */
function vec_scalar_multiply(v, c) {
    return v.map(v_i => v_i * c)
}

/**
 * 
 * Computes the mean elementwise of many vectors all the same dimension
 * @param {array} vectors
 * 
 */
function vec_elementwise_mean(vectors) {
    return v_scalar_multiply(v_elementwise_sum(vectors), 1 / vectors.length)
}

/**
 * 
 * Computes the dot product of two vectors
 * @param {vector} a 
 * @param {vector} b
 */
function vec_dot(a, b) {
    return a.reduce((sum, a_i, i) => sum + a_i * b[i])
}

/**
 * 
 * Computes the sum of squares of a vector elementwise
 * @param {vector} v 
 * 
 */
function vec_sum_squares(v) {
    return vec_dot(v,v)
}

/**
 * 
 * Computes the magnitude of a vector
 * @param {vector} v 
 * 
 */
function vec_magnitude(v) {
    return Math.sqrt(vec_sum_squares(v))
}

/**
 * 
 * Computes the distance between two vectors
 * @param {vector} a
 * @param {vector} b 
 * 
 */
function vec_distance(a,b) {
    return Math.sqrt(vec_subtract(a,b))
}



