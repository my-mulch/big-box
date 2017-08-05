/* 
   
           These methods provide basic operations for vectors
   
*/

function elementwise(a, b, c = [], f = (a, b) => a - b) {
    for (let i = 0; i < a.length; i++)
        if (Array.isArray(a[i]))
            elementwise(a[i], b[i], c[i] = [])
        else c[i] = f(a[i], b[i])
    return c
}

function addIterative(a, b) {

    for (let i = 0; i < a.length; i++) {

        for (let j = 0; j < a[0].length; j++) {
            a[i][j] + b[i][j]
        }
    }

}


const start = new Date().getTime()
console.log(elementwise([[[1, 2, 3], [1, 2, 3], [1, 2, 3]],
[[1, 2, 3], [1, 2, 3], [1, 2, 3]],
[[1, 2, 3], [1, 2, 3], [1, 2, 3]]],

    [[[89, 7, 5], [2, 7, 5], [2, 7, 5]],
    [[2, 7, 5], [4, 1, 2], [4, 1, 2]],
    [[4, 1, 2], [4, 1, 2], [4, 1, 2]]]))
const end = new Date().getTime()
console.log((end - start) / 1000)


const NDarray = require('../types/array').NDarray

module.exports = {


    /**
     * 
     * Computes f elementwise on two matrices
     * 
     * @param {any} a input matrix
     * @param {any} b input matrix
     * @param {matrix} c result matrix of same size as inputs 
     * @param {function} f function to apply 
     * @returns {matrix} matrix with f applied elementwise
     */
    elementwise(a, b, c = [], f) {
        for (let i = 0; i < a.length; i++)
            if (Array.isArray(a[i]))
                elementwise(a[i], b[i], c[i] = [])
            else c[i] = f(a[i], b[i])
        return c
    },

    /**
     * 
     * Computes elementwise addition on two matrices
     * 
     * @param {matrix} a input matrix
     * @param {matrix} b input matrix
     * @returns {matrix}
     */

    add(a, b) {
        return this.elementwise(a, b, [], (a_i, b_i) => a_i + b_i)
    },

    /**
     * 
     * Vectors must be of an equal dimension
     * It subtracts b from a
     * 
     * @param {vector} a 
     * @param {vector} b 
     */
    sub(a, b) {
        return a.map((a_i, i) => a_i - b[i])
    },

    /**
     * 
     * Vectors must be equal in dimension
     * @param {array} vectors 
     * 
     */
    element_sum(vectors) {
        return vectors.reduce(this.add)
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
        return this.scalar_mult(this.element_sum(vectors), 1 / vectors.length)
    },

    /**
     * 
     * Computes the dot product of two vectors
     * @param {vector} a 
     * @param {vector} b
     */
    dot(a, b) {
        return a.reduce((sum, a_i, i) => sum + a_i * b[i], 0)
    },

    /**
     * 
     * Computes the sum of squares of a vector elementwise
     * @param {vector} v 
     * 
     */
    sum_squares(v) {
        return this.dot(v, v)
    },

    /**
     * 
     * Computes the magnitude of a vector
     * @param {vector} v 
     * 
     */
    magnitude(v) {
        return Math.sqrt(this.sum_squares(v))
    },

    /**
     * 
     * Computes the direction of a vector
     * @param {vector} v 
     * 
     */
    direction(v) {
        const m = this.magnitude(v)
        return v.map(v_i => v_i / m)
    },

    /**
     * 
     * Computes the distance between two vectors
     * @param {vector} a
     * @param {vector} b 
     * 
     */
    distance(a, b) {
        return this.magnitude(this.subtract(a, b))
    }
}



