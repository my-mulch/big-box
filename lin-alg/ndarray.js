/* 
   
        Basic definition of n-dim array
   
*/

const vector = require('./vector')
const utils = require('./utils')

class NDarray extends Array {

    /**
     * Creates an instance of NDarray.
     * @memberof NDarray
     */
    constructor(array) {
        super(array)
        this.shape = internalMethods.shape(this)
    }
    /**
     * 
     * Computes f elementwise on two matrices
     * 
     * @param {function} fn function to apply 
     * @param {matrix} A an optional second matrix
     * @returns {matrix} matrix with f applied elementwise
     */
    elementwise(fn, A) {
        if (A) A = new NDarray(A)
        if (A.shape !== this.shape)
            throw new Error('Matrix dimensions must agree')

        function worker(A, indx = []) {
            for (let i = 0; i < A.length; i++) {
                if (Array.isArray(A[i]))
                    worker(A[i], indx.concat(i))
                else {
                    indices = indx.concat(i)
                    fn(indices, A)
                }
            }
        }

    }

    seek(indices, value) {

    }

    seek(indices) {
        if (indices.length === 1)
            return indices

        return seek(indices, structure[indices.shift()])
    }

    /**
     * 
     * Assign a value to position in multi-dim array
     * 
     * @param {array} indices 
     * @param {any} value 
     * @memberof NDarray
     */
    assign(indices, value) {
        
    }

    /**
     * 
     * 
     * @param {array} indices
     * @memberof NDarray
     */
    retrieve(indices) {

    }


    static arrayFrom(shape) {
        for (let i = 0; i < S[0]; i++) {
            A.push([])
            worker(shape.slice(1), A[i])
        }
        return A
    }

    /**
     * 
     * Computes the dot product of two vectors/arrays
     * 
     * @memberof array
     */
    dot(v) {
        const v = new ndarray(v)

        if (this.shape.length > 2 || v.shape.length > 2)
            throw new Error('Dot not defined for dim > 2')
        if (this.shape[0] != v.shape[1])
            throw new Error('Matrix dimensions must agree')
        if (this.shape.length === 1 && v.shape.length === 1)
            return vector.dot(this, v)

        const dotProduct = NDarray.arrayFrom([this.shape[0], v.shape[1]])

        for (let i = 0; i < this.shape[0]; i++) {
            for (let j = 0; j < v.shape[1]; j++) {
                dotProduct[i][j] = vector.dot(this[i], v.cols(j))
            }
        }

        return dotProduct
    }
    /**
     * 
     * Computes frobenius norm of a matrix, L2 of vector
     * @param {matrix} A
     * @returns {matrix}
     */
    norm(A) {
        // the accumulator heads through each element and gathers squares
        const accumulator = (A_i) => accumulator.total += A_i * A_i
        accumulator.total = 0
        this.elementwise(A, null, accumulator)
        // we take the root of these accumulated squares
        // such is the definition of the frobenius
        return Math.sqrt(accumulator.total)
    }

    /**
     * 
     * Computes the distance between two matrices
     * @param {matrix} A
     * @param {matrix} B
     * @returns {scalar} a scalar representing the distance
     * 
     */
    dist(A, B) {
        return this.norm(A) - this.norm(B)
    }


    /**
     * 
     * Creates an identity matrix size rows x cols
     * 
     * @param {int} rows
     * @param {int} cols
     */
    eye(rows, cols) {
        return Array(rows).fill(null).map((_, i) => [
            // spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
            ...Array(cols).fill(null).map((_, j) => (
                i === j ? 1 : 0
            ))
        ])
    }

    /**
     * 
     * Computes the squares of a vector elementwise
     * @param {matrix} A 
     * @returns {matrix} 
     */
    square(A) {
        return this.elementwise(A, null, (A_i) => A_i * A_i)
    }

    /**
     * 
     * Computes the sum of all elements
     * 
     * @param {matrix} A 
     * @returns {scalar} the sum of all elements
     */
    sum(A) {
        // the accumulator heads through each element and gathers each
        const accumulator = (A_i) => accumulator.total += A_i
        accumulator.total = 0
        this.elementwise(A, null, accumulator)
        return accumulator.total
    }

    /**
     * 
     * Mulitplies input matrix by a scalar
     * 
     * @param {matrix} A
     * @param {scalar} c 
     * @returns {matrix} Multiplied elementwise by a scalar
     */
    scale(A, c) {
        return this.elementwise(A, null, (A_i) => A_i * c)
    }

    /**
     * 
     * Computes elementwise addition on two matrices
     * 
     * @param {matrix} A input matrix
     * @param {matrix} B input matrix
     * @returns {matrix}
     */

    add(A, B) {
        return this.elementwise(A, B, (A_i, B_i) => A_i + B_i)
    }

    /**
     * 
     * Computes elementwise subtraction on two matrices
     * 
     * @param {matrix} A input matrix
     * @param {matrix} B input matrix
     * @returns {matrix}
     */

    sub(A, B) {
        return this.elementwise(A, B, (A_i, B_i) => A_i - B_i)
    }

    transpose() {
        const T = NDarray.arrayFrom(this.shape.reverse())
        this.elementwise((indices) => {
            this.assign(indices.reverse(), )
        }, T)

    }

}

const internalMethods = {
    /**
    * 
    * Returns the shape of a given matrix
    * @param {matrix} A
    * @returns {tuple} shape of the matrix
    */

    shape: function (dim, result = []) {
        if (Array.isArray(dim = dim[0])) {
            result.push(dim.length)
            internalMethods.shape(dim[0], result)
        }

        return result
    }
}
