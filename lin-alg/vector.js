/* 
   
           These methods provide basic operations for vectors
   
*/

const NDarray = require('../types/array').NDarray

module.exports = {

    /**
     * 
     * Inputs must be of an equal dimension
     * @param {vector_or_matrix} a 
     * @param {vector_or_matrix} b 
     */

    add(a, b) {

        let an = a
        let bn = b

        if (typeof an === 'number' && typeof bn === 'number') return an + bn
        else if (!(an instanceof NDarray && bn instanceof NDarray)) {
            an = new NDarray(a)
            bn = new NDarray(b)
        }

        if (an.shape.toString() !== bn.shape.toString()) throw 'ShapeError'

        const sum = []
        for (let i = 0; i < an.shape[0]; i++) {
            if (an.shape[1] > 1) {
                sum[i] = Array(an.shape[1])
                for (let j = 0; j < an.shape[1]; j++) {
                    sum[i][j] = an._(i,j) + bn._(i,j)
                }
            } else sum[i] = an._(i) + bn._(i)
        }

        return new NDarray(sum)
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



