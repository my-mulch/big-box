/* 

        These methods provide basic operations for matrices

*/

module.exports = {

    /*     Dependencies     */
    vector: require('./vector'),

    /**
     * 
     * Returns the shape of a given matrix
     * @param {matrix} A
     * 
     */

    shape: function (A) {
        return [A.length, A[0].length]
    },

    /**
     * 
     * Returns the column for a given matrix
     * 
     * @param {matrix} A
     * @param {int} j 
     */
    column: function (A, i) {
        return A.map(a => a[i])
    },

    /**
     * 
     * Creates a rows x cols matrix of zeros
     * 
     * @param {int} rows
     * @param {int} cols
     */
    zeros: function (rows, cols) {
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
     *                                                           A matrix can be used to 
     *                                                           transform a vector dim N to K
     *                                                           and back                                                          
     *  [1,2,3,4,5]          K   
     *                 [[1,2,3,4,5,6],                                   
     *                  [1,2,3,4,5,6],
     *        N         [1,2,3,4,5,6],       =   [15,30,45,60,75,90] 
     *                  [1,2,3,4,5,6],
     *                  [1,2,3,4,5,6]]
     *
     * Multiplies two matrices
     * 
     * @param {matrix} A
     * @param {matrix} B
     */
    dot: function (A, B) {
        return A.map((row, i) => {
            return B[0].map((_, j) => vector.dot(column(B, j), row))
        })
    },
}
