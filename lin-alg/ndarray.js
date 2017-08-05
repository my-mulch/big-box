/* 
   
        Basic definition of n-dim array
   
*/



module.exports = {
    /**
     * 
     * Computes f elementwise on two matrices
     * 
     * @param {matrix} A input matrix
     * @param {matrix} B input matrix or null (for elementwise over only A)
     * @param {matrix} C result matrix of same size as inputs or empty
     * @param {function} f function to apply 
     * @returns {matrix} matrix with f applied elementwise
     */

    elementwise(A, B, f, C = []) {
        for (let i = 0; i < A.length; i++)
            if (Array.isArray(A[i]))
                this.elementwise(A[i], B ? B[i] : null, f, C[i] = [])
            else C[i] = f(A[i], B ? B[i] : null)
        return C
    },

    /**
    * 
    * Returns the shape of a given matrix
    * @param {matrix} A
    * @returns {tuple} shape of the matrix
    */
    shape(A) {
        const s = []
        while (A) { s.push(A.length); A = A[0] }
        s.pop()
        return s
    },

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
    },

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
    },

    /**
    * 
    * Creates a rows x cols matrix of zeros
    * 
    * @param {int} rows
    * @param {int} cols
    */
    zeros(rows, cols) {
        return Array(rows).fill(null).map(_ => Array(cols).fill(0))
    },

    /**
     * 
     * Creates an identity matrix size rows x cols
     * 
     * @param {int} rows
     * @param {int} cols
     */
    eye: function (rows, cols) {
        return Array(rows).fill(null).map((_, i) => [
            // spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
            ...Array(cols).fill(null).map((_, j) => (
                i === j ? 1 : 0
            ))
        ])
    },

    /**
     * 
     * Computes the squares of a vector elementwise
     * @param {matrix} A 
     * @returns {matrix} 
     */
    square(A) {
        return this.elementwise(A, null, (A_i) => A_i * A_i)
    },

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
    },

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
    },

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
    },

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
    },

    /**
     * 
     * Computes the transpose of A
     * 
     * @param {ndarray} A 
     * @returns {ndarray} the transpose of A
     */
    transpose(A) {

    }

}