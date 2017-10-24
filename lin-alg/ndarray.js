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
     * A generator function designed to produce indices 
     * 
     * @param {any} structure 
     * @param {any} path 
     * @memberof NDarray
     */
    *traverse(structure, path = []) {
        for (let i = 0; i < structure.length; i++)
            if (Array.isArray(structure[i]))
                yield* this.traverse(structure[i], path.concat(i))
            else yield path.concat(i)
    }

    transpose() {
        const indices = this.traverse()
        const shape = this.shape.reverse()
        const transpose = NDarray.with(shape)

        let idx
        while (idx = indices.next().value) {
            transpose.assign( // assign the value at the current 
                idx.reverse(), // index to the reversed index in tranpose
                this.retrieve(idx))
        }

        return transpose
    }
    /**
     * 
     * Helper function to seek data-structure
     * to arbitrary point within
     * 
     * @param {any} indices 
     * @param {any} structure 
     * @returns 
     * @memberof NDarray
     */
    seek(indices, structure = this) {
        if (indices.length === 1)
            return [indices, structure]

        const i = indices.shift()
        return seek(indices, structure[i])
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
        if (indices.length > structure.shape.length)
            throw new Error('Indices out of bounds!')

        const [i, structure] = seek(indices)
        structure[i] = value
    }

    /**
     * 
     * Retrieves value from multi-dim array
     * 
     * @param {array} indices
     * @memberof NDarray
     */
    retrieve(indices) {
        const structure = this
        if (indices.length > structure.shape.length)
            throw new Error('Indices out of bounds!')

        const [i] = seek(indices, structure)
        return structure[i]
    }


    static arrayFrom(shape) {
        const A
        for (let i = 0; i < shape[0]; i++) {
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
