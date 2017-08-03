/* 
   
           These methods provide basic operations for vectors
   
*/

module.exports = {

    /**
     * 
     * Vectors must be of an equal dimension
     * @param {vector} a 
     * @param {vector} b 
     */

    add(a, b) {
        return a.map((a_i, i) => a_i + b[i])
    },

    /**
     * 
     * Vectors must be of an equal dimension
     * It subtracts b from a
     * 
     * @param {vector} a 
     * @param {vector} b 
     */
    subtract(a, b) {
        return a.map((a_i, i) => a_i - b[i])
    },

    /**
     * 
     * Vectors must be equal in dimension
     * @param {array} vectors 
     * 
     */
    element_sum(vectors) {
        return vectors.reduce(add)
    },

    /**
     * 
     * Mulitplies our vector elementwise by a scalar
     * @param {vector} v 
     * @param {scalar} c 
     */
    scalar_mult(v, c) {
        return v.map(v_i => v_i * c)
    },

    /**
     * 
     * Computes the mean elementwise of many vectors all the same dimension
     * @param {array} vectors
     * 
     */
    element_mean(vectors) {
        return scalar_mult(v_elementwise_sum(vectors), 1 / vectors.length)
    },

    /**
     * 
     * Computes the dot product of two vectors
     * @param {vector} a 
     * @param {vector} b
     */
    dot(a, b) {
        return a.reduce((sum, a_i, i) => sum + a_i * b[i])
    },

    /**
     * 
     * Computes the sum of squares of a vector elementwise
     * @param {vector} v 
     * 
     */
    sum_squares(v) {
        return dot(v, v)
    },

    /**
     * 
     * Computes the magnitude of a vector
     * @param {vector} v 
     * 
     */
    magnitude(v) {
        return Math.sqrt(sum_squares(v))
    },

    /**
     * 
     * Computes the distance between two vectors
     * @param {vector} a
     * @param {vector} b 
     * 
     */
    distance(a, b) {
        return magnitude(subtract(a, b))
    }
}



