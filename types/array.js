/*

    This file represents the multi-dimensional array

*/
const vector = require('../lin-alg/vector')
const matrix = require('../lin-alg/matrix')



class NDarray {

    /**
     * Creates an instance of NDarray.
     * @param {vector_or_matrix} ndarray
     * @memberof NDarray
     */
    constructor(ndarray) {
        this.self = ndarray
        this.shape = [
            ndarray.length, 
            Array.isArray(ndarray[0]) 
            ? ndarray[0].length 
            : 1
        ]
    }

    /**
     * 
     * Returns the value at indices
     * 
     * @param {int} i 
     * @param {int} j 
     * 
     * @memberof NDarray
     */
    _(i,j){
        return this.shape[1] > 1
        ? this.self[i][j]
        : this.self[i]
    }

    /**
     * 
     * Subtracts vector v from self
     * 
     * @param {vector} v 
     * @memberof NDarray
     */
    sub(v) {
        return new NDarray(vector.sub(this.self, v))
    }

    /**
     * 
     * Adds vector v to self
     * 
     * @param {vector} v 
     * @memberof NDarray
     */
    add(v) {
        return new NDarray(vector.add(this.self, v))
    }

    /**
     * 
     * Sums self
     * 
     * @memberof NDarray
     */
    sum() {
        return this.self.reduce((t, c) => t + c)
    }

    /**
     * 
     * Multiplies self by scalar
     * 
     * @memberof NDarray
     */
    scale(c) {
        return new NDarray(vector.scalar_mult(this.self, c))
    }

    /**
     * 
     * Computes the mean of self
     * 
     * @memberof NDarray
     */
    mean() {
        return this.self.sum() / this.self.length
    }

    /**
     * 
     * Computes the dot product of self and v
     * 
     * @param {vector} v 
     * 
     * @memberof NDarray
     */
    dot(v) {
        return vector.dot(this.self, v)
    }

    /**
     * 
     * Computes the square elementwise of self
     *  
     * @memberof NDarray
     */
    square() {
        return new NDarray(vector.sum_squares(this.self))
    }

    /**
     * 
     * Computes the magnitude of self
     * 
     * @memberof NDarray
     */
    mag() {
        return new NDarray(vector.magnitude(this.self))
    }


    /**
     * 
     * Computes the direction vector of self
     * 
     * @memberof NDarray
     */
    dir() {
        const mag = this.self.mag()
        return new NDarray(this.self.map(v_i => v_i / mag))
    }

    toString(){
        this.shape[1] > 1
        ? this.self.map(r => console.log(r))
        : console.log(this.self)
    }

    inspect(){
        return this.toString()
    }

}


module.exports = Object.assign({}, vector, { array: (arr) => new NDarray(arr), NDarray })